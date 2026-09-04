"use client";

import { useState } from "react";
import { Cpu, Database, Server, Terminal, Shield, Zap, Workflow, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface NodeDetail {
  id: string;
  name: string;
  category: string;
  tech: string;
  purpose: string;
  decision: string;
  benchmark: string;
}

const nodes: NodeDetail[] = [
  {
    id: "engine",
    name: "C++20 Zero-Allocation Quant Engine",
    category: "EXECUTION RUNTIME",
    tech: "C++20, AWS EC2, CMake, GoogleTest",
    purpose: "Processes 1.48M+ ticks/sec on AWS EC2 via contiguous memory buffers and zero runtime heap allocations during execution loops.",
    decision: "Contiguous memory layouts and pre-allocated buffers prevent dynamic heap allocations and TLB cache misses during high-frequency execution.",
    benchmark: "1.48M+ ticks/sec verified by 197 GoogleTest cases.",
  },
  {
    id: "agents",
    name: "LangGraph Multi-Agent System (Mistral AI)",
    category: "AI ORCHESTRATION",
    tech: "LangGraph, Mistral AI, Python",
    purpose: "Uses cyclic state reflection to parse natural language strategies, validate parameter bounds, and iteratively tune Sharpe and drawdown before memo synthesis.",
    decision: "Cyclic state reflection evaluates strategy validity through automated simulation iterations rather than raw one-shot generation.",
    benchmark: "Iteratively tuned Sharpe and drawdown across 7 strategy models.",
  },
  {
    id: "bias",
    name: "Intrabar Execution & Anti-Lookahead Layer",
    category: "QUANT ACCURACY",
    tech: "C++20, Event Queue, Microstructure",
    purpose: "Eliminates look-ahead bias via timestamp order execution and conservative intrabar stop-loss rules across 7 strategy models.",
    decision: "Strict timestamp priority ordering with conservative intrabar execution rules guarantees zero realistic simulation drift.",
    benchmark: "Zero look-ahead bias verified across 7 distinct strategy models.",
  },
  {
    id: "storage",
    name: "Virtualized S3 Tick Dataset Store",
    category: "DATA PERSISTENCE",
    tech: "Supabase S3, PostgreSQL, Contiguous Streams",
    purpose: "Virtualized tick datasets via Supabase S3 for instant memory streaming to the C++20 backtester.",
    decision: "Streaming virtualized tick chunks straight into contiguous buffers minimizes memory overhead on EC2 instances.",
    benchmark: "Seamless tick virtualization & sub-millisecond data feed ingestion.",
  },
  {
    id: "security",
    name: "HMAC SHA-256 Razorpay Webhook Gateway",
    category: "COMMERCE & INTEGRITY",
    tech: "Node.js, Crypto, Razorpay API",
    purpose: "Secures subscription checkout and transaction verification with cryptographic HMAC SHA-256 webhook signatures.",
    decision: "Constant-time signature verification prevents timing attacks and ensures zero duplicate or forged transaction allocations.",
    benchmark: "100% cryptographic payment verification & idempotency.",
  },
];

export function Architecture() {
  const [selectedNode, setSelectedNode] = useState<NodeDetail>(nodes[0]);

  return (
    <section id="architecture" className="py-24 px-5 md:px-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E4E4E0] gap-4">
          <div>
            <span className="text-xs font-mono text-emerald-700 tracking-wider font-semibold uppercase block mb-1">
              02 / SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111]">
              UNDER THE HOOD
            </h2>
            <p className="mt-2 text-base md:text-lg text-[#5F6368] font-sans">
              Exact architectural decisions from Devashish's C++20 and LangGraph implementations.
            </p>
          </div>

          <div className="text-xs font-mono text-[#5F6368]">
            <span>CLICK NODES TO REVEAL EXACT ENGINEERING CHOICES</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Interactive System Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Nodes Flow List */}
        <div className="lg:col-span-6 space-y-3">
          {nodes.map((node, i) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <ScrollReveal key={node.id} delay={i * 0.08}>
                <div
                  onClick={() => setSelectedNode(node)}
                  data-cursor="INSPECT NODE"
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-[#FFFFFF] border-emerald-500 shadow-md translate-x-2"
                      : "bg-[#FAFAF8] border-[#E4E4E0] hover:bg-[#FFFFFF] hover:border-[#D1D1CB]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {node.category}
                    </span>
                    <span className="text-xs font-mono text-[#888C90]">NODE 0{i + 1}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#111111] font-mono">{node.name}</h4>
                  <div className="text-xs font-mono text-[#5F6368] mt-1">{node.tech}</div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Selected Node Detailed Inspector Card */}
        <div className="lg:col-span-6 sticky top-24">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="rounded-3xl border border-[#E4E4E0] bg-[#FFFFFF] p-6 md:p-8 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EBEBE7]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#5F6368]">
                  ARCHITECTURE INSPECTOR
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#EDEDE9] text-[#111111] font-semibold">
                  RESUME SPECIFICATION
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#888C90] block mb-1">
                    COMPONENT NAME
                  </span>
                  <h3 className="text-2xl font-bold font-mono text-[#111111]">
                    {selectedNode.name}
                  </h3>
                  <span className="inline-block mt-1 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {selectedNode.tech}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#111111] font-bold block mb-1">
                    SYSTEM PURPOSE
                  </span>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    {selectedNode.purpose}
                  </p>
                </div>

                <div className="bg-[#F7F7F4] p-4 rounded-xl border border-[#EBEBE7]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                    KEY DESIGN DECISION & LOW-LEVEL TRADE-OFF
                  </span>
                  <p className="text-xs md:text-sm text-[#111111] leading-relaxed">
                    {selectedNode.decision}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#888C90] block mb-1">
                    VERIFIED BENCHMARK
                  </span>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-mono text-emerald-900 font-semibold">
                    ✓ {selectedNode.benchmark}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
