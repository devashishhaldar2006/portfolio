"use client";

import { FlaskConical } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface LabExperiment {
  title: string;
  category: string;
  description: string;
  status: string;
  detail: string;
}

const labExperiments: LabExperiment[] = [
  {
    title: "Contiguous Memory Buffer Backtesting in C++20",
    category: "ZERO HEAP ALLOCATION",
    description: "Evaluated runtime memory allocations during execution loops, eliminating dynamic malloc to maximize L1/L2 cache hit rates.",
    status: "1.48M+ ticks/sec",
    detail: "Zero runtime heap allocations across 197 GoogleTest cases.",
  },
  {
    title: "Monaco Sandboxed Code Runner with Piston API",
    category: "SAFE BROWSER COMPILATION",
    description: "Built sandboxed execution pipeline enforcing 5s execution timeouts to sandbox compilation across 10+ languages with regex error line mapping.",
    status: "10+ Languages",
    detail: "Reduced manual interview coordination overhead by 60%.",
  },
  {
    title: "Gemini Structured JSON Output Assessment",
    category: "AI EVALUATION PIPELINES",
    description: "Configured Google Gemini API structured output parsing to automate hackathon submission evaluation and code quality analysis.",
    status: "Sub-200ms API",
    detail: "Maintained 95+ Google Lighthouse score on HackCentral.",
  },
  {
    title: "HMAC SHA-256 Webhook Verification Gateway",
    category: "SYSTEM SECURITY & PAYMENTS",
    description: "Implemented cryptographic HMAC SHA-256 signature verification for Razorpay webhooks to prevent replay attacks and duplicate balance credits.",
    status: "HMAC Verified",
    detail: "Constant-time string comparison preventing timing vulnerabilities.",
  },
];

export function CurrentlyBuildingAndLab() {
  return (
    <section id="lab" className="py-24 px-5 md:px-12 max-w-7xl mx-auto w-full">
      {/* THE LAB & EXPERIMENTS (Actively Building redundant section removed!) */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E4E4E0] gap-4">
          <div>
            <span className="text-xs font-mono text-emerald-700 tracking-wider font-semibold uppercase block mb-1">
              03 / EXPERIMENTAL SYSTEMS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111]">
              THE LAB
            </h2>
            <p className="mt-2 text-base md:text-lg text-[#5F6368] font-sans">
              Hands-on engineering experiments, memory investigations, and safe execution architectures.
            </p>
          </div>

          <div className="text-xs font-mono text-[#5F6368]">
            <span>C++20 · WEBRTC · LANGGRAPH · LLMS</span>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {labExperiments.map((exp, i) => (
          <ScrollReveal key={exp.title} delay={i * 0.08}>
            <div
              data-cursor="INSPECT LAB"
              className="rounded-2xl border border-[#E4E4E0] bg-[#FFFFFF] p-6 shadow-xs hover:border-[#111111] hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                    {exp.status}
                  </span>
                  <FlaskConical className="w-3.5 h-3.5 text-[#888C90]" />
                </div>

                <h3 className="text-sm font-mono font-bold text-[#111111] mb-2">
                  {exp.title}
                </h3>
                <p className="text-xs text-[#5F6368] leading-relaxed mb-4">
                  {exp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2F2EF] text-[11px] font-mono text-[#111111] font-medium">
                {exp.detail}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
