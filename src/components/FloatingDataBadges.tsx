"use client";

import { motion } from "framer-motion";

export function FloatingDataBadges() {
  const badges = [
    { label: "1.48M+ TICKS/S", color: "text-emerald-700 bg-emerald-50/80 border-emerald-200" },
    { label: "ZERO-HEAP C++20", color: "text-[#111111] bg-white/80 border-[#E4E4E0]" },
    { label: "SUB-200MS API", color: "text-blue-700 bg-blue-50/80 border-blue-200" },
    { label: "LANGGRAPH MULTI-AGENT", color: "text-emerald-800 bg-emerald-100/60 border-emerald-300" },
    { label: "WEBRTC < 100MS", color: "text-[#111111] bg-white/80 border-[#E4E4E0]" },
  ];

  return (
    <div className="w-full overflow-hidden py-4 border-y border-[#E4E4E0] bg-[#FFFFFF]/50 backdrop-blur-xs my-8">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        className="flex gap-4 w-max"
      >
        {[...badges, ...badges, ...badges].map((b, i) => (
          <div
            key={i}
            className={`px-4 py-1.5 rounded-full border text-xs font-mono font-semibold tracking-wider flex items-center gap-2 shadow-xs ${b.color}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            {b.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
