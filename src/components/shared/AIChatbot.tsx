"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Bot,
  User,
  Phone,
  MessageCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGE: Message = {
  id: "init-1",
  role: "assistant",
  content:
    "Namaste! 🙏 Welcome to **Vijay Interior & Construction** (Jabalpur).\n\nI am your AI Architectural Concierge. How can I assist you today?\n\n• **Interior Design & Modular Kitchens**\n• **Turnkey Civil Construction**\n• **Renovation & Remodeling**\n• **Book a Free Site Consultation**",
  timestamp: "Just now",
};

const SUGGESTIONS = [
  "What services do you provide?",
  "Cost estimate for 3BHK interior?",
  "Where is your studio in Jabalpur?",
  "Book a free site consultation",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate reply");
      }

      if (data.leadCaptured) {
        setLeadCaptured(true);
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "I apologize, but our connection was briefly interrupted. You can also reach our principal team directly at **+91 97543 95862** or on **WhatsApp: +91 70003 01077**.",
        timestamp: "Now",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setLeadCaptured(false);
  };

  return (
    <>
      {/* Floating Toggle Button on Bottom-Right */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Architectural Concierge Chat"
          className="group relative flex items-center gap-2.5 px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-full bg-[#181614] border-2 border-[#C5A880] text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:border-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Subtle Ambient Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#C5A880]/30 animate-pulse pointer-events-none" />

          {/* Icon */}
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#C5A880] text-[#141414] flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-[11px] font-bold tracking-wider uppercase text-white font-mono-tech leading-none">
              AI Concierge
            </div>
            <div className="text-[9px] text-[#C5A880] font-mono-tech flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Studio Online</span>
            </div>
          </div>
        </button>
      </div>

      {/* Floating Chat Modal Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[85vh] h-[580px] bg-[#141414] border border-[#C5A880]/40 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="bg-[#1C1A18] border-b border-white/10 px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#141414] border border-[#C5A880] flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/logo-transparent.png"
                  alt="Vijay Studio"
                  width={32}
                  height={32}
                  className="w-6 h-auto object-contain"
                />
              </div>
              <div>
                <div className="font-serif-heading text-xs sm:text-sm font-bold text-white tracking-wide">
                  Vijay Studio AI Concierge
                </div>
                <div className="text-[10px] font-mono-tech text-[#C5A880] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Jabalpur • Powered by Gemini AI</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lead Capture Banner (Shown when lead is saved to CRM) */}
          {leadCaptured && (
            <div className="bg-emerald-950/70 border-b border-emerald-600/40 px-3.5 py-2 flex items-center gap-2 text-emerald-200 text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-mono-tech text-[10px] tracking-wide">
                Enquiry synchronized with Studio CRM ✓ Our team will contact you.
              </span>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-stone-200 scroll-smooth">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#1C1A18] border border-[#C5A880]/60 flex items-center justify-center shrink-0 mt-0.5 text-[#C5A880]">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-lg leading-relaxed whitespace-pre-wrap break-words ${
                      isUser
                        ? "bg-[#C5A880] text-[#121212] font-medium rounded-tr-none shadow-md"
                        : "bg-[#1E1C1A] text-stone-200 border border-white/10 rounded-tl-none shadow-md"
                    }`}
                  >
                    {m.content}
                    <div
                      className={`text-[9px] font-mono-tech mt-1 text-right ${
                        isUser ? "text-stone-800" : "text-stone-500"
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#C5A880] text-[#121212] flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#1C1A18] border border-[#C5A880]/60 flex items-center justify-center shrink-0 text-[#C5A880]">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#1E1C1A] text-stone-400 border border-white/10 px-3.5 py-2.5 rounded-lg rounded-tl-none flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C5A880]" />
                  <span className="text-[11px] font-mono-tech">AI is consulting studio archive...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-[#121110] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                onClick={() => handleSend(sug)}
                disabled={loading}
                className="px-2.5 py-1 text-[10px] font-mono-tech text-stone-300 bg-white/5 hover:bg-[#C5A880]/15 hover:text-[#C5A880] border border-white/10 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#181614] border-t border-white/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about design, budget, or site visit..."
                className="flex-1 bg-[#121110] border border-white/15 px-3 py-2 text-xs text-white placeholder-stone-500 rounded focus:outline-none focus:border-[#C5A880] transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded bg-[#C5A880] text-[#121212] hover:bg-white transition-colors disabled:opacity-40 cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick studio touch bar */}
            <div className="flex items-center justify-between pt-2 px-1 text-[10px] font-mono-tech text-stone-500">
              <span className="truncate">Garha, Jabalpur (M.P.)</span>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="tel:+919754395862"
                  className="hover:text-[#C5A880] transition-colors flex items-center gap-1"
                >
                  <Phone className="w-2.5 h-2.5" />
                  <span>Call</span>
                </a>
                <a
                  href="https://wa.me/917000301077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors flex items-center gap-1"
                >
                  <MessageCircle className="w-2.5 h-2.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
