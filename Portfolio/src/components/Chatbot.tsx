import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages([
      {
        id: Date.now().toString(),
        text: "👋 Hi there! I'm your assistant. Ask me anything about my portfolio, projects, or experience!",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, []);
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inputValue }),
      });

      const data = await res.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "Sorry, I couldn’t process that.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error fetching chatbot response:", err);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "⚠️ Error connecting to server.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 group relative overflow-hidden"
        >
          <MessageCircle size={24} className="text-white" />
        </Button>
      )}
  
      {/* Chat Window */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-card/95 backdrop-blur-sm border-l border-primary/40 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Chat Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 p-0 hover:bg-primary/10"
            >
              <X size={16} />
            </Button>
          </div>
  
          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.isBot ? "" : "flex-row-reverse space-x-reverse"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.isBot ? "bg-primary/20" : "bg-accent/20"
                    }`}
                  >
                    {message.isBot ? (
                      <Bot size={12} className="text-primary" />
                    ) : (
                      <User size={12} className="text-accent" />
                    )}
                  </div>
                  <div
                    className={`p-2 rounded-lg text-sm ${
                      message.isBot
                        ? "bg-primary/10 text-foreground"
                        : "bg-accent/10 text-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
  
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <Bot size={12} className="text-primary" />
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg text-sm text-foreground">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
  
          {/* Input */}
          <div className="p-3 border-t border-primary/20 bg-card/80">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 text-sm bg-background/50 border-primary/20 focus:border-primary/40"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="w-10 h-10 p-0 bg-primary hover:bg-primary/90"
                disabled={!inputValue.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Chatbot;
