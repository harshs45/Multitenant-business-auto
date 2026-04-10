import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Send, Bot, Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export default function ChatWidget() {
  const { publicKey } = useParams();
  const [config, setConfig] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    async function initChat() {
      try {
        // Fetch config
        const confRes = await fetch(`${API_URL}/widget/config/${publicKey}`);
        const confData = await confRes.json();
        if (confData.success) {
          setConfig(confData.data);
          
          // Optionally add welcome message first
          if (confData.data.welcomeMessage) {
            setMessages([{ role: "assistant", content: confData.data.welcomeMessage }]);
          }

          // Start session
          const sessRes = await fetch(`${API_URL}/chat/${publicKey}/session`, {
            method: "POST"
          });
          const sessData = await sessRes.json();
          if (sessData.success) {
            setSessionId(sessData.data.sessionId);
          }
        }
      } catch (err) {
        console.error("Error initializing chat:", err);
      } finally {
        setLoading(false);
      }
    }
    initChat();
  }, [publicKey]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setSending(true);

    try {
      const res = await fetch(`${API_URL}/chat/${publicKey}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: userMsg })
      });
      const data = await res.json();
      
      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I had trouble processing that request." }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error encountered." }]);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-white dark:bg-gray-900 rounded-2xl">
        <p className="text-red-500 font-semibold mb-2">Failed to load chatbot configuration.</p>
        <p className="text-sm text-gray-500">Please verify your public key.</p>
      </div>
    );
  }

  const primaryColor = config.theme?.customPrimaryColor || "#2563eb";

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white dark:bg-[#1a1a1a] font-sans">
      {/* Header */}
      <div 
        className="flex items-center gap-3 p-4 shadow-md z-10 text-white" 
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-semibold text-lg leading-tight">{config.botName || "Virtual Assistant"}</h2>
          <p className="text-xs text-white/90">{config.language === 'en' ? 'Online and ready to help' : 'Online'}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-zinc-900">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div 
              className={cn(
                "relative max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                msg.role === "user" 
                  ? "text-white" 
                  : "bg-white text-gray-800 dark:bg-zinc-800 dark:text-zinc-200 border border-gray-100 dark:border-zinc-700/50"
              )}
              style={msg.role === "user" ? { backgroundColor: primaryColor } : {}}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex w-full justify-start">
             <div className="max-w-[85%] rounded-2xl bg-white px-4 py-2.5 text-sm text-gray-500 shadow-sm dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/50">
                <Loader2 className="h-4 w-4 animate-spin" />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 pt-4">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-full border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:text-white"
            style={{ outlineColor: primaryColor }}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105 disabled:opacity-50 shadow-md"
            style={{ backgroundColor: primaryColor }}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
