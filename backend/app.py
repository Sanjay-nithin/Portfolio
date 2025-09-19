import json
import re
import os
import time
import concurrent.futures
from flask import Flask, request, jsonify
from flask_cors import CORS
import chromadb
from chromadb.api.types import EmbeddingFunction
import cohere
from dotenv import load_dotenv
from groq import Groq
import requests


# -------------------------
# Load environment variables
# -------------------------
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not COHERE_API_KEY:
    raise ValueError("❌ COHERE_API_KEY not set in environment")
if not GROQ_API_KEY:
    raise ValueError("❌ GROQ_API_KEY not set in environment")


# -------------------------
# Initialize clients
# -------------------------
co = cohere.Client(COHERE_API_KEY)
print("⚡ Initializing Groq client...", flush=True)
groq_client = Groq(api_key=GROQ_API_KEY)

# -------------------------
# Text cleaning helpers
# -------------------------
def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    text = text.strip()
    text = text.replace("\u2019", "'").replace("\u201c", '"').replace("\u201d", '"')
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s\.\,\-/:\'"]', '', text)
    return text

def chunk_text_by_words(text: str, chunk_size=100, overlap=30):
    words = text.split()
    if not words:
        return []
    if len(words) <= chunk_size:
        return [" ".join(words)]
    chunks = []
    step = chunk_size - overlap
    for i in range(0, len(words), step):
        chunk = words[i:i + chunk_size]
        chunks.append(" ".join(chunk))
        if i + chunk_size >= len(words):
            break
    return chunks

# -------------------------
# Cohere embedding helpers
# -------------------------
def embed_documents(texts):
    cleaned = [clean_text(t) for t in texts]
    try:
        start = time.time()
        response = co.embed(
            model="embed-english-v3.0",
            texts=cleaned,
            input_type="search_document"
        )
        return response.embeddings
    except Exception as e:
        return [[0.0] * 1024 for _ in cleaned]

def embed_query(text):
    cleaned = clean_text(text)[:300]
    try:
        start = time.time()
        response = co.embed(
            model="embed-english-v3.0",
            texts=[cleaned],
            input_type="search_query"
        )
        return response.embeddings[0]
    except Exception as e:
        return [0.0] * 1024

def safe_embed_query(text, timeout=10):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(embed_query, text)
        try:
            return future.result(timeout=timeout)
        except concurrent.futures.TimeoutError:
            return [0.0] * 1024

# -------------------------
# Initialize Chroma (in-memory)
# -------------------------
client = chromadb.EphemeralClient()
collection_name = "portfolio_rag"

class DocumentEmbeddingFunction(EmbeddingFunction):
    def __call__(self, input):
        return embed_documents(input)

collection = client.create_collection(
    name=collection_name,
    embedding_function=DocumentEmbeddingFunction()
)

# -------------------------
# Load + embed content.json
# -------------------------
with open("content.json", "r", encoding="utf-8") as f:
    data = json.load(f)

all_ids, all_texts, all_metas = [], [], []
for item in data:
    original_id = item.get("id")
    title = item.get("title", "")
    section = item.get("section", "")
    tags_list = item.get("tags", [])
    tags = ", ".join(tags_list) if isinstance(tags_list, list) else str(tags_list)
    source_url = item.get("source_url", "")
    updated_at = item.get("updated_at", "")
    content = item.get("content", "") or ""

    cleaned_content = clean_text(content)
    chunks = chunk_text_by_words(cleaned_content, 100, 30)
    if not chunks and cleaned_content:
        chunks = [cleaned_content]

    for idx, chunk in enumerate(chunks):
        text_for_embedding = f"{title} | {tags} | {chunk}".strip()
        chunk_id = f"{original_id}__chunk__{idx}"
        metadata = {
            "original_id": original_id,
            "chunk_index": idx,
            "title": title,
            "section": section,
            "tags": tags,
            "source_url": source_url,
            "updated_at": updated_at,
            "chunk_text": chunk
        }
        all_ids.append(chunk_id)
        all_texts.append(text_for_embedding)
        all_metas.append(metadata)

collection.add(ids=all_ids, documents=all_texts, metadatas=all_metas)

# -------------------------
# Groq response function
# -------------------------
def generate_answer_with_groq(query, docs):
    context = "\n\n".join(docs)
    prompt = f"""
    You are a helpful assistant. Read the content carefully and respond in first person, as if you personally experienced it. 
    Summarize the key points clearly and concisely in 5–6 sentences, with a touch of humor to keep it light. If any part of 
    the query is irrelevant or cannot be answered from the provided content, mention that the user can reach out through the 
    mobile number or email listed on the contact page. Only include the contact information when the query or data is 
    insufficient—do not add it every time. Ensure the response is natural, engaging, and avoids copying text verbatim.

Context:
{context}

Question:
{query}

Answer (first person, short and clear):
"""
    try:
        start = time.time()
        response = groq_client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            timeout=30
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        return "Sorry, I had trouble reaching Groq API."

# -------------------------
# Flask API
# -------------------------
app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200


@app.route("/api/chat", methods=["POST"])
def query_portfolio():
    start_total = time.time()
    data = request.json
    user_query = data.get("query", "")
    if not user_query:
        return jsonify({"error": "Query text is required."}), 400

    try:
        query_embedding = safe_embed_query(user_query)
        start_chroma = time.time()
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=6,
            include=["documents", "distances"],
        )

        docs = results.get("documents", [[]])[0]
        if not docs:
            return jsonify({"reply": "I could not find relevant information."})

        answer = generate_answer_with_groq(user_query, docs)
        return jsonify({"reply": answer})

    except Exception as e:
        return jsonify({"reply": "An error occurred."}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
