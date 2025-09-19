# embed_contents_cohere.py
import json
import re
from math import ceil
import chromadb
from chromadb.api.types import EmbeddingFunction
import cohere
import os
from dotenv import load_dotenv

# -------------------------
# CONFIG
# -------------------------
COLLECTION_NAME = "portfolio_rag"
CHUNK_SIZE_WORDS = 150      # words per chunk
CHUNK_OVERLAP = 30          # overlapping words between chunks
RESET_COLLECTION = False    # set True to delete & recreate collection each run

# -------------------------
# Load environment variables
# -------------------------
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
if not COHERE_API_KEY:
    raise ValueError("COHERE_API_KEY not set in environment")

co = cohere.Client(COHERE_API_KEY)

# -------------------------
# Step 1: Load JSON content
# -------------------------
with open("content.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Loaded {len(data)} entries from JSON.")

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

def sentence_split(text: str):
    text = text.strip()
    if not text:
        return []
    sentences = re.split(r'(?<=[\.\?\!])\s+', text)
    return [s.strip() for s in sentences if s.strip()]

def chunk_text_by_words(text: str, chunk_size=CHUNK_SIZE_WORDS, overlap=CHUNK_OVERLAP):
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
# Step 2: Define Cohere embedding function
# -------------------------
class CohereEmbeddingFunction(EmbeddingFunction):
    def __init__(self, client):
        self.client = client

    def name(self) -> str:
        return "cohere-embeddings"

    def __call__(self, texts):
        cleaned_texts = [clean_text(t) for t in texts]
        response = self.client.embed(
            model="embed-v4.0",
            texts=cleaned_texts
        )
        return response.embeddings

embedding_function = CohereEmbeddingFunction(co)

# -------------------------
# Step 3: Initialize Chroma DB
# -------------------------
client = chromadb.PersistentClient()
existing_collections = [c.name for c in client.list_collections()]

if RESET_COLLECTION and COLLECTION_NAME in existing_collections:
    client.delete_collection(name=COLLECTION_NAME)
    existing_collections = [c.name for c in client.list_collections()]

if COLLECTION_NAME in existing_collections:
    collection = client.get_collection(name=COLLECTION_NAME, embedding_function=embedding_function)
else:
    collection = client.create_collection(name=COLLECTION_NAME, embedding_function=embedding_function)

# -------------------------
# Step 4: Build chunked dataset
# -------------------------
all_ids = []
all_texts_for_embedding = []
all_metadatas = []

for item in data:
    original_id = item.get("id")
    title = item.get("title", "")
    section = item.get("section", "")
    tags_list = item.get("tags", [])
    tags = ", ".join(tags_list) if isinstance(tags_list, list) else str(tags_list)
    source_url = item.get("source_url", "")
    updated_at = item.get("updated_at", "")
    content = item.get("content", "") or ""

    original_content = content.strip()
    cleaned_content = clean_text(content)
    chunks = chunk_text_by_words(cleaned_content, chunk_size=CHUNK_SIZE_WORDS, overlap=CHUNK_OVERLAP)

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
            "original_content": original_content,
            "chunk_text": chunk
        }

        all_ids.append(chunk_id)
        all_texts_for_embedding.append(text_for_embedding)
        all_metadatas.append(metadata)

print(f"Prepared {len(all_texts_for_embedding)} chunks for embedding from {len(data)} documents.")

# -------------------------
# Step 5: Deduplicate
# -------------------------
seen_texts = {}
unique_ids, unique_texts, unique_metadatas = [], [], []
for iid, txt, meta in zip(all_ids, all_texts_for_embedding, all_metadatas):
    key = txt
    if key in seen_texts:
        continue
    seen_texts[key] = True
    unique_ids.append(iid)
    unique_texts.append(txt)
    unique_metadatas.append(meta)

print(f"After deduplication: {len(unique_texts)} unique chunks remain.")

# -------------------------
# Step 6: Add to Chroma in batches
# -------------------------
BATCH_SIZE = 256
total = len(unique_texts)
for i in range(0, total, BATCH_SIZE):
    j = min(i + BATCH_SIZE, total)
    batch_ids = unique_ids[i:j]
    batch_texts = unique_texts[i:j]
    batch_metas = unique_metadatas[i:j]
    collection.add(ids=batch_ids, documents=batch_texts, metadatas=batch_metas)
    print(f"Inserted batch {i // BATCH_SIZE + 1} — items {i}..{j-1}")

print("All chunks successfully added and saved to Chroma vector database!")
