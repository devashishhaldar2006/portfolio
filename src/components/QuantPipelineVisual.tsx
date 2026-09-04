"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Cpu, Database, Play, RefreshCw, Zap } from "lucide-react";

interface NodeData {
  id: string;
  label: string;
  sublabel: string;
  metric: string;
  status: "active" | "streaming" | "ready";
}

const pipelineNodes: NodeData[] = [
  { id: "market", label: "MARKET DATA", sublabel: "L2/L3 Tick Feed", metric: "1.48M ticks/s", status: "streaming" },
  { id: "signals", label: "SIGNALS", sublabel: "Alpha Generators", metric: "32 Factors", status: "active" },
  { id: "strategy", label: "STRATEGY", sublabel: "C++20 Model Logic", metric: "7 Core Algos", status: "active" },
  { id: "backtest", label: "BACKTEST", sublabel: "Zero-Heap Loop", metric: "0.42ms / run", status: "streaming" },
  { id: "analytics", label: "ANALYTICS", sublabel: "Sharpe & Drawdown", metric: "Sharpe 2.84", status: "ready" },
];

export function QuantPipelineVisual() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [tickCount, setTickCount] = useState(1482930);
  const [latency, setLatency] = useState(1.18);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % pipelineNodes.length);
      setTickCount((prev) => prev + Math.floor(Math.random() * 4500) + 1200);
      setLatency((prev) => +(1.15 + Math.random() * 0.12).toFixed(2));
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      data-cursor="EXPLORE"
      className="w-full rounded-2xl border border-[#E4E4E0] bg-[#FFFFFF] p-5 md:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] relative overflow-hidden"
    >
      {/* Background Micro Grid */}
      <div className="absolute inset-0 tech-grid-dense opacity-40 pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EBEBE7] pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>LIVE QUANT PIPELINE</span>
          </div>
          <span className="text-xs font-mono text-[#5F6368] hidden sm:inline-block">
            ARCH: x86_64 / C++20 Contiguous Loop
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#5F6368]">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[#111111] font-semibold">{tickCount.toLocaleString()}</span>
            <span className="text-[10px]">ticks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[#111111] font-semibold">{latency}µs</span>
            <span className="text-[10px]">p99</span>
          </div>
        </div>
      </div>

      {/* Pipeline Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-2 relative z-10">
        {pipelineNodes.map((node, i) => {
          const isSelected = activeIdx === i;
          return (
            <div
              key={node.id}
              onClick={() => setActiveIdx(i)}
              className={`group cursor-pointer p-3.5 rounded-xl border transition-all duration-300 relative ${
                isSelected
                  ? "bg-[#F7F7F4] border-emerald-500 shadow-sm translate-y-[-2px]"
                  : "bg-[#FFFFFF] border-[#E4E4E0] hover:border-[#D1D1CB] hover:bg-[#FAF9F6]"
              }`}
            >
              {/* Active Step Indicator Pill */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#888C90]">0{i + 1}</span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected
                      ? "bg-emerald-100 text-emerald-800 font-semibold"
                      : "bg-[#EDEDE9] text-[#5F6368]"
                  }`}
                >
                  {node.metric}
                </span>
              </div>

              <div className="text-xs font-mono font-bold tracking-tight text-[#111111] mb-0.5">
                {node.label}
              </div>
              <div className="text-[11px] text-[#5F6368] font-sans truncate">{node.sublabel}</div>

              {/* Progress beam for desktop */}
              {isSelected && (
                <div className="mt-3 w-full bg-[#EDEDE9] h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-3/4 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Real-time Order Book / Execution Visualizer Strip */}
      <div className="mt-5 pt-4 border-t border-[#EBEBE7] flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#5F6368] relative z-10 bg-[#FAFAFA] -mx-5 -mb-5 p-4 rounded-b-2xl border-x-0 border-b-0">
        <div className="flex items-center gap-3">
          <span className="text-[#111111] font-semibold">ACTIVE EXECUTION:</span>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            BUY 250 ESZ6 @ 5,912.25 [FILLED 0.4ms]
          </span>
          <span className="hidden lg:inline-block text-[#888C90]">|</span>
          <span className="hidden lg:inline-block">INTRABAR STOP: 5,904.50 (-0.13%)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] uppercase text-[#111111] font-bold tracking-wider">
            Zero Look-Ahead Bias Verified
          </span>
        </div>
      </div>
    </div>
  );
}
