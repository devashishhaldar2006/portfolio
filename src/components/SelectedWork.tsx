"use client";

import { ArrowUpRight, CheckCircle2, Shield, Sparkles, Terminal, Activity } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { ScrollReveal } from "./ScrollReveal";

interface ProjectItem {
  id: string;
  title: string;
  role: string;
  period: string;
  tagline: string;
  what: string;
  why: string;
  how: string;
  result: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

// 100% Exact Resume Details
const projects: ProjectItem[] = [
  {
    id: "hackcentral",
    title: "HackCentral",
    role: "Full Stack & Distributed Architect",
    period: "Mar 2026 — Jun 2026",
    tagline: "Event discovery, real-time collaboration, and automated hackathon evaluation platform",
    what: "Architected an event discovery and hackathon management platform delivering sub-200ms API response times and a 95+ Google Lighthouse score.",
    why: "Event organizers require fast participant team formation, reliable real-time channels, and an automated, unbiased method to parse and evaluate hackathon submissions.",
    how: "Optimized database queries with compound indexing on {userId, eventId} and lean MongoDB aggregations. Implemented real-time bidirectional messaging via Socket.IO and integrated Gemini API with structured JSON output parsing to automate submission evaluation. Containerized with multi-stage Docker builds deployed to AWS EC2.",
    result: "Delivered sub-200ms API response times, achieved a 95+ Google Lighthouse performance score, and securely isolated user vs organizer roles with httpOnly cookie JWT sessions.",
    metrics: [
      { label: "API Latency", value: "< 200ms" },
      { label: "Lighthouse Score", value: "95+" },
      { label: "Architecture", value: "Docker / EC2" },
      { label: "AI Evaluation", value: "Gemini Structured JSON" },
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "AWS EC2", "Docker", "Gemini API"],
    githubUrl: "https://github.com/devashishhaldar2006/HackCentral",
    liveUrl: "https://hackcentral.me",
  },
  {
    id: "careerconnect",
    title: "Career Connect",
    role: "Collaborative Systems Engineer",
    period: "Dec 2025",
    tagline: "Real-time collaborative technical interview platform with sandboxed code execution",
    what: "Built a real-time collaborative coding platform with WebRTC video conferencing and live chat via Stream.io with sub-100ms latency.",
    why: "Technical interviews require low-latency video, zero-latency code editor synchronization, and secure multi-language sandboxed execution without malicious exploitation.",
    how: "Integrated an interactive Monaco code editor with Piston API execution, enforcing 5s execution timeouts to sandbox compilation across 10+ programming languages with regex error line mapping. Engineered event-driven interview tracking workflows using Clerk and Inngest background jobs.",
    result: "Sub-100ms latency streaming with automated reconnection, automated post-interview score recording, reducing manual coordination overhead by 60%.",
    metrics: [
      { label: "WebRTC Latency", value: "< 100ms" },
      { label: "Languages", value: "10+ Sandboxed" },
      { label: "Execution Limit", value: "5.0s Timeout" },
      { label: "Coordination", value: "-60% Overhead" },
    ],
    tags: ["React 19", "Stream.io", "Clerk", "Monaco Editor", "Piston API", "Inngest", "TypeScript"],
    githubUrl: "https://github.com/devashishhaldar2006/career-connect",
    liveUrl: "https://career-connect-4gbj.onrender.com",
  },
];

export function SelectedWork() {
  return (
    <section id="work" className="py-24 px-5 md:px-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E4E4E0] gap-4">
          <div>
            <span className="text-xs font-mono text-emerald-700 tracking-wider font-semibold uppercase block mb-1">
              01 / PRODUCTION SYSTEMS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111]">
              SELECTED WORK
            </h2>
            <p className="mt-2 text-base md:text-lg text-[#5F6368] font-sans">
              Verified production systems engineered with zero mock metrics.
            </p>
          </div>

          <div className="text-xs font-mono text-[#5F6368]">
            <span>VERIFIED ARTIFACTS & ACTIVE DEPLOYMENTS</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Project Cards */}
      <div className="space-y-12">
        {projects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 0.15}>
            <div
              data-cursor="VIEW SYSTEM"
              className="rounded-3xl border border-[#E4E4E0] bg-[#FFFFFF] p-6 md:p-10 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03)] hover:border-[#D1D1CB] transition-all duration-300"
            >
              {/* Card Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EBEBE7] pb-6 mb-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#F2F2EF] text-[#5F6368] font-bold">
                    0{idx + 2}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#111111] tracking-tight">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-[#5F6368] block mt-0.5">
                      {project.role} · {project.period}
                    </span>
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="VISIT"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] text-white text-xs font-mono font-medium hover:bg-emerald-700 transition-colors shadow-xs"
                    >
                      <span>LIVE DEMO</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="GITHUB"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#E4E4E0] text-[#111111] text-xs font-mono font-medium hover:bg-[#F2F2EF] transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>CODE</span>
                  </a>
                </div>
              </div>

              {/* WHAT / WHY / HOW / RESULT Editorial Flow */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                <div className="lg:col-span-8 space-y-5">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                      WHAT IT DOES
                    </span>
                    <p className="text-sm md:text-base text-[#111111] font-sans leading-relaxed">
                      {project.what}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#5F6368] font-bold block mb-1">
                        WHY IT WAS BUILT
                      </span>
                      <p className="text-xs md:text-sm text-[#5F6368] font-sans leading-relaxed">
                        {project.why}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#5F6368] font-bold block mb-1">
                        HOW IT WORKS
                      </span>
                      <p className="text-xs md:text-sm text-[#5F6368] font-sans leading-relaxed">
                        {project.how}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#111111] font-bold block mb-1">
                      RESULT & IMPACT
                    </span>
                    <p className="text-xs md:text-sm text-[#111111] font-sans leading-relaxed font-medium bg-[#F7F7F4] p-3.5 rounded-xl border border-[#EBEBE7]">
                      {project.result}
                    </p>
                  </div>
                </div>

                {/* Verified Metrics Column */}
                <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-[#FAFAF8] border border-[#EBEBE7] p-5">
                  <div>
                    <span className="text-[10px] font-mono text-[#888C90] uppercase tracking-wider block mb-3">
                      VERIFIED SYSTEM BENCHMARKS
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E4E4E0]">
                          <div className="text-[10px] font-mono text-[#5F6368]">{m.label}</div>
                          <div className="text-base font-mono font-bold text-[#111111] mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech tags */}
                  <div className="mt-6 pt-4 border-t border-[#EBEBE7]">
                    <span className="text-[10px] font-mono text-[#888C90] uppercase tracking-wider block mb-2">
                      CORE TECHNOLOGY
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FFFFFF] text-[#5F6368] border border-[#E4E4E0]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
