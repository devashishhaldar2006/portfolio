"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send, Sparkles, Bot, User, Minimize2, Maximize2, RefreshCw, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ScrollReveal } from "./ScrollReveal";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  time: string;
}

const suggestedPrompts = [
  "How fast is QuantFlow's C++20 engine?",
  "What is Devashish's education and GPA?",
  "Explain HackCentral's sub-200ms architecture",
  "What are Devashish's competitive programming stats?",
];

export function RecruiterTerminalChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content:
        "**DEVASHISH-CORE v2.4 (Mistral AI engine)**\nSystem initialized. Loaded candidate knowledge graph: PSIT CSE (8.1 CGPA) · QuantFlow (1.48M ticks/s C++20) · HackCentral · LeetCode 400+.\nAsk any technical, architectural, or recruitment question.",
      time: "",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll strictly inside the terminal box, NEVER scrolling the whole browser window
  const scrollTerminalToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollTerminalToBottom();
  }, [messages, loading]);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: textToSend, time: "" };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput("");
    setLoading(true);

    try {
      // Pass full conversation history for context-aware multi-turn ChatGPT experience
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: historyPayload,
        }),
      });

      const data = await res.json();
      const replyStr = data.reply || "Unable to retrieve response from candidate inference engine.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: replyStr, time: "" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error establishing connection with candidate profile core.",
          time: "",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="terminal" className="py-24 px-5 md:px-12 max-w-7xl mx-auto w-full">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[#E4E4E0] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>CANDIDATE INTELLIGENCE TERMINAL</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111]">
              ASK DEVASHISH-CORE
            </h2>
            <p className="mt-2 text-base md:text-lg text-[#5F6368] font-sans">
              Interactive 3D terminal assistant built with Mistral AI specifications for engineering recruiters and hiring managers.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5F6368]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>MODEL: MISTRAL-SMALL-2506</span>
          </div>
        </div>
      </ScrollReveal>

      {/* 3D Glass Terminal Workstation Card */}
      <ScrollReveal delay={0.2}>
        <div
          data-cursor="TERMINAL"
          className="rounded-3xl border border-[#E4E4E0] bg-[#FFFFFF] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBEBE7] bg-[#FAFAFA]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#EDEDE9] border border-[#D5D5CF]" />
                <div className="w-3 h-3 rounded-full bg-[#EDEDE9] border border-[#D5D5CF]" />
                <div className="w-3 h-3 rounded-full bg-[#EDEDE9] border border-[#D5D5CF]" />
              </div>
              <div className="h-4 w-[1px] bg-[#E4E4E0] mx-1" />
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#111111]" />
                <span className="text-xs font-mono font-bold text-[#111111]">
                  devashish@workstation:~$ ./recruit-eval --interactive
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-[#888C90]">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>

          {/* Terminal Output Scroll Area */}
          <div
            ref={chatContainerRef}
            className="p-6 md:p-8 h-[380px] overflow-y-auto font-mono text-xs md:text-sm bg-[#FAFAF8] space-y-4 scroll-smooth"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl max-w-2xl ${
                  m.role === "user"
                    ? "ml-auto bg-[#111111] text-white"
                    : m.role === "system"
                    ? "bg-[#F2F2EF] text-[#5F6368] border border-[#E4E4E0]"
                    : "bg-[#FFFFFF] text-[#111111] border border-[#E4E4E0] shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-70 mb-1.5 pb-1 border-b border-white/10">
                  <span className="font-bold uppercase tracking-wider">
                    {m.role === "user" ? "YOU (RECRUITER / VISITOR)" : m.role === "system" ? "SYSTEM KERNEL" : "DEVASHISH-CORE"}
                  </span>
                </div>
                <div className="leading-relaxed font-mono text-xs md:text-[13px] prose prose-sm max-w-none text-inherit prose-headings:text-inherit prose-headings:font-bold prose-p:my-1.5 prose-ul:my-1.5 prose-ul:pl-4 prose-li:my-0.5 prose-strong:text-inherit prose-strong:font-bold prose-code:text-emerald-700 prose-code:bg-emerald-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-a:text-emerald-700 prose-a:underline">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="p-3.5 rounded-2xl max-w-xs bg-[#FFFFFF] border border-[#E4E4E0] shadow-xs flex items-center gap-2 text-xs text-[#5F6368]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>EVALUATING QUERY WITH MISTRAL AI...</span>
              </div>
            )}
          </div>

          {/* Preset Suggested Prompts */}
          <div className="p-4 border-t border-[#EBEBE7] bg-[#FFFFFF] flex flex-wrap gap-2 text-xs font-mono">
            <span className="text-[10px] uppercase text-[#888C90] py-1">SUGGESTIONS:</span>
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-lg bg-[#F7F7F4] hover:bg-[#EDEDE9] text-[#111111] border border-[#E4E4E0] text-[11px] transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Terminal Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 border-t border-[#EBEBE7] bg-[#FAFAFA] flex items-center gap-3"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about QuantFlow, C++20, HackCentral, LeetCode, or hiring availability..."
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-[#FFFFFF] border border-[#E4E4E0] text-xs md:text-sm font-mono text-[#111111] placeholder:text-[#888C90] focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !input.trim()}
              data-cursor="QUERY"
              className="px-5 py-3 rounded-xl bg-[#111111] hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>SEND</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
}
