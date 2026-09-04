"use client";

import { Award, BookOpen, CheckCircle, Code2, GraduationCap, Trophy } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface TimelineItem {
  year: string;
  category: "EDUCATION" | "ACHIEVEMENT" | "PROJECT";
  title: string;
  organization: string;
  metrics?: string;
  description: string;
  link?: { label: string; url: string };
}

// REAL RESUME ONLY: PSIT B.Tech in CSE (AI & ML), Deviathon Winner, LeetCode, CodeChef, QuantFlow, HackCentral, Career Connect
const timelineData: TimelineItem[] = [
  {
    year: "Jul 2026 — Sep 2026",
    category: "PROJECT",
    title: "QuantFlow — Quantitative Backtesting & Multi-Agent Platform",
    organization: "C++20, Next.js, LangGraph, Mistral AI, AWS EC2",
    metrics: "1.48M+ ticks/sec · 197 GoogleTest Cases",
    description:
      "Engineered a quantitative backtesting engine in C++20 processing 1.48M+ ticks/sec on AWS EC2 via contiguous memory buffers and zero runtime heap allocations during execution loops. Architected a LangGraph multi-agent system with Mistral AI using cyclic state reflection to parse natural language strategies and tune Sharpe/drawdown.",
    link: { label: "QuantFlow Live", url: "https://quantflow.hackcentral.me" },
  },
  {
    year: "Mar 2026 — Jun 2026",
    category: "PROJECT",
    title: "HackCentral — Event Discovery & AI Evaluation Platform",
    organization: "React, Node.js, Express, MongoDB, Socket.IO, AWS EC2",
    metrics: "Sub-200ms API · 95+ Google Lighthouse",
    description:
      "Architected an event discovery platform delivering sub-200ms API response times. Optimized database performance using compound indexing on {userId, eventId}. Implemented real-time bidirectional messaging via Socket.IO and integrated Gemini API with structured JSON output parsing to automate submission evaluation. Containerized with Docker and deployed to AWS EC2.",
    link: { label: "HackCentral Live", url: "https://hackcentral.me" },
  },
  {
    year: "Dec 2025",
    category: "PROJECT",
    title: "Career Connect — Real-Time Collaborative Interview Platform",
    organization: "React 19, Stream.io, Clerk, Monaco Editor, Piston API",
    metrics: "Sub-100ms Latency · 10+ Languages · -60% Overhead",
    description:
      "Built a collaborative coding platform with WebRTC video conferencing and live chat via Stream.io (<100ms latency). Integrated Monaco code editor with Piston API execution with 5s execution timeouts to sandbox compilation across 10+ languages. Automated interview tracking with Clerk and Inngest background jobs, reducing coordination overhead by 60%.",
    link: { label: "Live Platform", url: "https://career-connect-4gbj.onrender.com" },
  },
  {
    year: "2025",
    category: "ACHIEVEMENT",
    title: "Deviathon National Hackathon Winner (1st Place)",
    organization: "GLA University / BlockseBlock",
    metrics: "1st Place Category Winner",
    description:
      "Secured 1st place in the problem statement category at Deviathon national hackathon for developing an AI-powered meeting analysis platform.",
    link: {
      label: "View Certificate",
      url: "https://blockseblock.com/certificate_preview/BSB-QYZDA2-MGKGE9QEr",
    },
  },
  {
    year: "Sep 2024 — Apr 2028",
    category: "EDUCATION",
    title: "B.Tech. in Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    organization: "Pranveer Singh Institute of Technology, Kanpur, Uttar Pradesh",
    metrics: "Cumulative GPA: 8.1 / 10.0",
    description:
      "Specialized in Artificial Intelligence, Machine Learning, Data Structures & Algorithms, Object-Oriented Programming, System Design, and Low-Latency Architecture.",
  },
];

const certifications = [
  {
    title: "Generative AI and LLMs: Architecture and Data Preparation",
    issuer: "IBM (Coursera)",
    grade: "100% Grade",
    desc: "Specialized in Transformer architectures, LLM tokenization, and NLP pipelines.",
    url: "https://coursera.org/share/ed2e8d698c630fbc0906d82514f61ca5",
  },
  {
    title: "Decode C++ with DSA",
    issuer: "Physics Wallah",
    grade: "Comprehensive Certification",
    desc: "Completed comprehensive training in C++, memory management, and data structures.",
    url: "https://pwskills.com/learn/certificate/1972add0-f5d0-4dad-8b4d-a80581724280/",
  },
];

const stats = [
  { label: "LeetCode", value: "400+ Solved", sub: "1562 Contest Rating" },
  { label: "CodeChef", value: "3-Star Rating", sub: "Peak 1602 · Global Rank 392" },
  { label: "Quant Engine", value: "1.48M+ ticks/sec", sub: "C++20 Zero Heap Allocation" },
  { label: "National Hackathon", value: "1st Place Winner", sub: "Deviathon Category Winner" },
];

export function AboutAndExperience() {
  return (
    <section className="py-24 px-5 md:px-12 max-w-7xl mx-auto w-full space-y-28">
      {/* ABOUT SECTION */}
      <div id="about">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E4E4E0] gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-700 tracking-wider font-semibold uppercase block mb-1">
                05 / PHILOSOPHY & BACKGROUND
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111]">
                ABOUT ME
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#5F6368]">
              <span>IDEAS → SYSTEMS → PRODUCTS</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <ScrollReveal delay={0.1}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif md:font-sans font-normal text-[#111111] leading-tight tracking-tight">
                "I like turning difficult ideas into systems that people can actually use."
              </h3>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-4 text-base md:text-lg text-[#5F6368] font-sans leading-relaxed">
                <p>
                  I am a computer science student and software builder based in Lucknow, India,
                  pursuing my B.Tech in CSE (Artificial Intelligence & Machine Learning) at PSIT (8.1 CGPA).
                  My work centers on the mechanics of high-performance software: understanding where
                  nanoseconds are spent in memory hierarchies, orchestrating autonomous AI agents
                  reliably without hallucinations, and wrapping complex quantitative algorithms inside frictionless products.
                </p>
                <p>
                  Rather than treating software as a collection of frameworks, I build from first
                  principles—whether writing contiguous buffer allocators in C++20 to eliminate cache misses
                  in market backtests, or designing real-time WebRTC collaborative environments.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="pt-4 flex flex-wrap gap-3 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E4E4E0] text-[#111111] font-semibold">
                  CURIOUS BY DEFAULT.
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E4E4E0] text-emerald-800 font-semibold">
                  BUILDING ALWAYS.
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E4E4E0] text-[#5F6368]">
                  C++20 · NEXT.JS · SYSTEM DESIGN
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Competitive Stats Card */}
          <div className="lg:col-span-4">
            <ScrollReveal delay={0.2} direction="left">
              <div className="rounded-3xl border border-[#E4E4E0] bg-[#FFFFFF] p-6 md:p-8 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#888C90] uppercase tracking-wider block mb-4">
                    VERIFIED COMPETITIVE METRICS
                  </span>
                  <div className="space-y-4">
                    {stats.map((s) => (
                      <div key={s.label} className="p-3.5 rounded-xl bg-[#F7F7F4] border border-[#EBEBE7]">
                        <div className="text-xs font-mono text-[#5F6368]">{s.label}</div>
                        <div className="text-xl font-mono font-bold text-[#111111] mt-0.5">
                          {s.value}
                        </div>
                        <div className="text-[11px] font-mono text-emerald-700 mt-0.5">{s.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EBEBE7] text-[11px] font-mono text-[#888C90]">
                  LEETCODE · CODECHEF · GOOGLETEST
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* EXPERIENCE & EDUCATION TIMELINE */}
      <div id="experience">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E4E4E0] gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-700 tracking-wider font-semibold uppercase block mb-1">
                06 / TRACK RECORD
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111]">
                EXPERIENCE & EDUCATION
              </h2>
              <p className="mt-2 text-base md:text-lg text-[#5F6368] font-sans">
                Timeline of technical projects, university training, and verified achievements.
              </p>
            </div>

            <div className="text-xs font-mono text-[#5F6368]">
              <span>CHRONOLOGICAL CHRONICLE</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline Stream */}
        <div className="relative pl-6 md:pl-10 border-l border-[#E4E4E0] space-y-12">
          {timelineData.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="relative group">
                {/* Timeline marker */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1 w-4 h-4 rounded-full bg-[#FFFFFF] border-2 border-[#111111] group-hover:border-emerald-600 transition-colors flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111111] group-hover:bg-emerald-600 transition-colors" />
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="text-xs font-mono font-bold text-[#111111] bg-[#EDEDE9] px-2 py-0.5 rounded">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.category}
                  </span>
                  {item.metrics && (
                    <span className="text-xs font-mono text-[#5F6368] font-medium">
                      · {item.metrics}
                    </span>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#111111] font-mono tracking-tight mt-1">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-[#5F6368] mt-0.5">{item.organization}</div>

                <p className="mt-2 text-sm md:text-base text-[#5F6368] font-sans leading-relaxed max-w-3xl">
                  {item.description}
                </p>

                {item.link && (
                  <div className="mt-3">
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-800 hover:text-emerald-950 font-semibold underline underline-offset-4 decoration-emerald-300"
                    >
                      <span>{item.link.label}</span>
                      <span className="text-sm">↗</span>
                    </a>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Verified Certifications Sub-Section */}
        <div className="mt-16 pt-12 border-t border-[#E4E4E0]">
          <ScrollReveal>
            <span className="text-xs font-mono text-emerald-700 tracking-wider font-semibold uppercase block mb-2">
              VERIFIED TECHNICAL CERTIFICATIONS
            </span>
            <h3 className="text-2xl font-bold text-[#111111] font-mono mb-6">
              SPECIALIZED TRAINING
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.1}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="CERTIFICATE"
                  className="p-6 rounded-2xl border border-[#E4E4E0] bg-[#FFFFFF] hover:border-[#111111] transition-all flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {c.issuer}
                      </span>
                      <span className="text-xs font-mono text-[#111111] font-semibold">
                        {c.grade}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#111111] font-mono group-hover:text-emerald-700 transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-xs text-[#5F6368] mt-2 leading-relaxed">{c.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F2F2EF] text-xs font-mono text-emerald-800 flex items-center justify-between font-semibold">
                    <span>VERIFY CREDENTIAL</span>
                    <span>↗</span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
