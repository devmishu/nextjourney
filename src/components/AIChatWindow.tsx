import React, { useState, useRef, useEffect } from "react";
import { Send, X, Loader2 } from "lucide-react";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

interface ChatWindowProps {
  onClose: () => void;
}

const AIChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "ai", text: "How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null); // অটো-স্ক্রল লজিকের জন্য

  // নতুন মেসেজ আসলে অটোমেটিক নিচে স্ক্রল হবে
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${baseurl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Server Error");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "দুঃখিত, এই মুহূর্তে সার্ভারে সমস্যা হচ্ছে।" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 max-h-[80vh] min-h-[300px] card-primary z-[10000] p-4 flex flex-col shadow-2xl rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h3 className="font-bold text-sm">AI Assistant</h3>
        <button
          onClick={onClose}
          className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 p-1 rounded-full"
        >
          <X size={16} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <p
              className={`text-sm p-3 rounded-lg max-w-[85%] ${
                m.role === "user"
                  ? "bg-[#028A65] text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <Loader2 className="animate-spin text-zinc-400" size={20} />
          </div>
        )}
      </div>

      <div className="relative flex items-end gap-2 shrink-0">
        <textarea
          ref={textareaRef}
          className="input-primary w-full resize-none overflow-hidden py-2.5 pr-10 bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-2"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="cursor-pointer absolute right-2 bottom-2 text-[#028A65]"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

export default AIChatWindow;
