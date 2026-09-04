"use client";

import { useState } from "react";
import { ArrowUpRight, Activity, TrendingUp, Sliders, ShieldCheck, Zap, BarChart3, DollarSign, Layers } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface StrategyOption {
  name: string;
  category: string;
  sharpe: number;
  cagr: number;
  drawdown: number;
  winRate: number;
  volatility: number;
  totalPnL: string;
  path: string;
}

const strategies: Record<string, StrategyOption> = {
  statArb: {
    name: "Statistical Arbitrage / Cointegration",
    category: "High Frequency Pair Alpha",
    sharpe: 2.84,
    cagr: 34.2,
    drawdown: -4.1,
    winRate: 68.4,
    volatility: 9.8,
    totalPnL: "+$248,920.00",
    path: "M0,160 Q60,150 120,130 T240,110 T360,85 T480,60 T600,42 T720,25 T840,12",
  },
  momentum: {
    name: "Order Flow Momentum & Intrabar EMA",
    category: "Trend Following Volatility Filter",
    sharpe: 2.31,
    cagr: 28.6,
    drawdown: -6.4,
    winRate: 61.2,
    volatility: 12.4,
    totalPnL: "+$184,310.50",
    path: "M0,170 Q70,180 140,150 T280,140 T420,95 T560,80 T700,50 T840,30",
  },
  meanReversion: {
    name: "VWAP Bands with Microstructure Bias",
    category: "Intraday Liquidity Harvesting",
    sharpe: 2.55,
    cagr: 31.8,
    drawdown: -5.2,
    winRate: 65.7,
    volatility: 10.9,
    totalPnL: "+$212,440.00",
    path: "M0,165 Q80,140 160,135 T320,105 T480,95 T640,65 T800,40 T840,20",
  },
};

export function QuantFlowShowcase() {
  const [selectedStrategyKey, setSelectedStrategyKey] = useState<string>("statArb");
  const strat = strategies[selectedStrategyKey];

  return (
    <section id="quantflow" className="py-24 px-5 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E4E4E0] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>FLAGSHIP PRODUCT & RESEARCH ENGINE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111]">
              QuantFlow
            </h2>
            <p className="mt-2 text-base md:text-lg text-[#5F6368] font-sans max-w-2xl">
              A quantitative research and backtesting platform. Engineered in{" "}
              <strong className="text-[#111111] font-mono font-medium">C++20</strong> processing{" "}
              <span className="text-emerald-700 font-semibold font-mono">1.48M+ ticks/sec</span> with zero runtime heap allocations during execution loops, coupled with a{" "}
              <strong className="text-[#111111] font-mono font-medium">LangGraph</strong> multi-agent tuning layer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://quantflow.hackcentral.me"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="ENTER APP"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111111] text-white text-xs font-mono font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <span>ENTER QUANTFLOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/devashishhaldar2006/QuantFlow"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="C++ SOURCE"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#E4E4E0] text-[#111111] text-xs font-mono font-medium hover:bg-[#F2F2EF] transition-colors"
            >
              <span>SOURCE CODE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* Flagship Light-Mode Institutional Dashboard Card */}
      <ScrollReveal delay={0.2}>
        <div
          data-cursor="EXPLORE DASHBOARD"
          className="rounded-3xl border border-[#E4E4E0] bg-[#FFFFFF] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:border-[#D1D1CB]"
        >
          {/* Dashboard Top Application Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-[#EBEBE7] bg-[#FAFAFA]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#EDEDE9] border border-[#D5D5CF]" />
                <div className="w-3 h-3 rounded-full bg-[#EDEDE9] border border-[#D5D5CF]" />
                <div className="w-3 h-3 rounded-full bg-[#EDEDE9] border border-[#D5D5CF]" />
              </div>
              <div className="h-4 w-[1px] bg-[#E4E4E0] mx-1" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#111111] tracking-tight">
                  QUANTFLOW WORKSTATION v2.4
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 font-semibold">
                  AWS EC2 C6i.2xlarge
                </span>
              </div>
            </div>

            {/* Strategy Tabs */}
            <div className="flex items-center gap-1 bg-[#EDEDE9] p-1 rounded-xl">
              {Object.entries(strategies).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSelectedStrategyKey(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedStrategyKey === key
                      ? "bg-[#FFFFFF] text-[#111111] font-semibold shadow-xs"
                      : "text-[#5F6368] hover:text-[#111111]"
                  }`}
                >
                  {key === "statArb" ? "STAT-ARB" : key === "momentum" ? "MOMENTUM" : "MEAN-REV"}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b border-[#EBEBE7] bg-[#FFFFFF] divide-x divide-[#EBEBE7]">
            <div className="p-5">
              <span className="text-[11px] font-mono text-[#5F6368] uppercase tracking-wider block mb-1">
                Portfolio PnL
              </span>
              <div className="text-xl md:text-2xl font-mono font-bold text-emerald-700">
                {strat.totalPnL}
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-medium">
                +{strat.cagr}% CAGR
              </span>
            </div>

            <div className="p-5">
              <span className="text-[11px] font-mono text-[#5F6368] uppercase tracking-wider block mb-1">
                Sharpe Ratio
              </span>
              <div className="text-xl md:text-2xl font-mono font-bold text-[#111111]">
                {strat.sharpe}
              </div>
              <span className="text-[10px] font-mono text-[#5F6368]">Benchmark: 1.15</span>
            </div>

            <div className="p-5">
              <span className="text-[11px] font-mono text-[#5F6368] uppercase tracking-wider block mb-1">
                Max Drawdown
              </span>
              <div className="text-xl md:text-2xl font-mono font-bold text-[#111111]">
                {strat.drawdown}%
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                Risk: Low Intrabar
              </span>
            </div>

            <div className="p-5">
              <span className="text-[11px] font-mono text-[#5F6368] uppercase tracking-wider block mb-1">
                Win Rate
              </span>
              <div className="text-xl md:text-2xl font-mono font-bold text-[#111111]">
                {strat.winRate}%
              </div>
              <span className="text-[10px] font-mono text-[#5F6368]">1,842 trades</span>
            </div>

            <div className="p-5">
              <span className="text-[11px] font-mono text-[#5F6368] uppercase tracking-wider block mb-1">
                Engine Throughput
              </span>
              <div className="text-xl md:text-2xl font-mono font-bold text-[#111111]">
                1.48M/s
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                C++20 Zero-Heap
              </span>
            </div>

            <div className="p-5">
              <span className="text-[11px] font-mono text-[#5F6368] uppercase tracking-wider block mb-1">
                Test Coverage
              </span>
              <div className="text-xl md:text-2xl font-mono font-bold text-[#111111]">
                197 / 197
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                GoogleTest Passed
              </span>
            </div>
          </div>

          {/* Dashboard Main Interactive Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EBEBE7]">
            {/* Main Chart Column */}
            <div className="lg:col-span-8 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#111111]">
                    CUMULATIVE PERFORMANCE (EQUITY CURVE)
                  </span>
                  <span className="block text-xs text-[#5F6368]">
                    {strat.name} — Tick Order Execution Engine
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <span className="w-2.5 h-0.5 bg-emerald-600 inline-block" />
                    Strategy Curve
                  </span>
                  <span className="flex items-center gap-1 text-[#888C90]">
                    <span className="w-2.5 h-0.5 bg-[#888C90] inline-block" />
                    S&P 500
                  </span>
                </div>
              </div>

              {/* SVG Chart Graphic */}
              <div className="relative h-64 md:h-72 w-full rounded-xl border border-[#EBEBE7] bg-[#FAFAF8] p-4 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 tech-grid-dense opacity-30 pointer-events-none" />

                <svg
                  viewBox="0 0 840 200"
                  className="w-full h-full overflow-visible z-10"
                  preserveAspectRatio="none"
                >
                  {/* S&P 500 Baseline */}
                  <path
                    d="M0,170 Q140,165 280,150 T560,130 T840,110"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  {/* Emerald Equity Curve */}
                  <path
                    d={strat.path}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3"
                    className="transition-all duration-700 ease-out"
                  />
                  {/* Accent Fill under curve */}
                  <path
                    d={`${strat.path} L840,200 L0,200 Z`}
                    fill="url(#emeraldGradient)"
                    opacity="0.15"
                    className="transition-all duration-700 ease-out"
                  />
                  <defs>
                    <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Chart footer metadata */}
                <div className="flex justify-between items-center text-[10px] font-mono text-[#888C90] pt-2 border-t border-[#EBEBE7] z-10">
                  <span>START: 2026-01-01</span>
                  <span>INTRABAR RESOLUTION: 100ms</span>
                  <span>END: 2026-09-01</span>
                </div>
              </div>

              {/* Key Technical Highlights Badges */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#EBEBE7]">
                  <div className="text-[11px] font-mono font-bold text-[#111111] mb-0.5">
                    ZERO LOOK-AHEAD BIAS
                  </div>
                  <div className="text-[11px] text-[#5F6368] leading-tight">
                    Timestamp order execution & conservative intrabar stop-loss rules across 7 strategy models.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#EBEBE7]">
                  <div className="text-[11px] font-mono font-bold text-[#111111] mb-0.5">
                    LANGGRAPH AGENT TUNING
                  </div>
                  <div className="text-[11px] text-[#5F6368] leading-tight">
                    Cyclic state reflection with Mistral AI to optimize Sharpe and drawdown.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#EBEBE7]">
                  <div className="text-[11px] font-mono font-bold text-[#111111] mb-0.5">
                    VIRTUALIZED S3 TICK STORE
                  </div>
                  <div className="text-[11px] text-[#5F6368] leading-tight">
                    Contiguous streaming buffers via Supabase S3 bucket virtualization.
                  </div>
                </div>
              </div>
            </div>

            {/* Engine Parameters & Order Execution Feed */}
            <div className="lg:col-span-4 p-6 bg-[#FFFFFF] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#EBEBE7] mb-4">
                  <span className="text-xs font-mono font-bold text-[#111111]">
                    ACTIVE STRATEGY PARAMETERS
                  </span>
                  <Sliders className="w-3.5 h-3.5 text-[#5F6368]" />
                </div>

                <div className="space-y-3 font-mono text-xs mb-6">
                  <div className="flex justify-between py-1.5 border-b border-[#F2F2EF]">
                    <span className="text-[#5F6368]">Lookback Window</span>
                    <span className="font-semibold text-[#111111]">400 Ticks</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F2F2EF]">
                    <span className="text-[#5F6368]">Z-Score Threshold</span>
                    <span className="font-semibold text-[#111111]">±2.14 σ</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F2F2EF]">
                    <span className="text-[#5F6368]">Intrabar Stop Loss</span>
                    <span className="font-semibold text-emerald-700">0.85% Static</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F2F2EF]">
                    <span className="text-[#5F6368]">Execution Loops</span>
                    <span className="font-semibold text-[#111111]">Zero Heap Allocation</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#F2F2EF]">
                    <span className="text-[#5F6368]">Checkout Security</span>
                    <span className="font-semibold text-[#111111]">HMAC SHA-256 Razorpay</span>
                  </div>
                </div>

                {/* Real-time Order Log */}
                <div className="rounded-xl bg-[#F7F7F4] border border-[#EBEBE7] p-3 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-[#888C90] text-[10px] mb-2 pb-1 border-b border-[#EBEBE7]">
                    <span>RECENT FILLS</span>
                    <span>LATENCY</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-emerald-700">
                      <span>BUY +120 NQ1! @ 18,410.25</span>
                      <span className="text-[#5F6368]">0.38ms</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>BUY +80 ES1! @ 5,510.50</span>
                      <span className="text-[#5F6368]">0.41ms</span>
                    </div>
                    <div className="flex justify-between text-[#111111]">
                      <span>CLOSE +120 NQ1! @ 18,432.00</span>
                      <span className="text-[#5F6368]">0.39ms</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Call to Action */}
              <div className="mt-6 pt-4 border-t border-[#EBEBE7]">
                <a
                  href="https://quantflow.hackcentral.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-mono font-semibold transition-colors shadow-sm"
                >
                  <span>OPEN LIVE PLATFORM PREVIEW</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
