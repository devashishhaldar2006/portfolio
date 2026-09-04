"use client";

import { ArrowUpRight, Terminal, Sparkles } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { QuantPipelineVisual } from "./QuantPipelineVisual";
import { MetaMesh3D } from "./MetaMesh3D";
import { ScrollReveal } from "./ScrollReveal";
import { AnimatedTitle, AnimatedWords } from "./AnimatedText";
import { FloatingDataBadges } from "./FloatingDataBadges";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex flex-col justify-between pt-28 md:pt-36 pb-12 px-5 md:px-12 max-w-7xl mx-auto w-full overflow-hidden"
    >
      {/* Subtle warm lighting ambient background */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-emerald-500/[0.05] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-blue-500/[0.04] blur-3xl pointer-events-none" />

      {/* Top Tagline & Status */}
      <ScrollReveal direction="down" delay={0.1}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E4E4E0] shadow-xs text-xs font-mono text-[#5F6368]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[#111111] font-semibold">SOFTWARE ENGINEER · FULL STACK DEVELOPER</span>
            <span className="text-[#888C90]">/</span>
            <span>PSIT CSE (AI & ML)</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-[#5F6368]">
            <span className="text-[#111111] font-bold">REACT / NEXT.JS</span>
            <span>•</span>
            <span className="text-[#111111] font-bold">NODE / EXPRESS</span>
            <span>•</span>
            <span className="text-[#111111] font-bold">C++20</span>
            <span>•</span>
            <span className="text-[#111111] font-bold">AI AGENTS</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Kinetic Editorial Typography & 3D Spatial Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        <div className="lg:col-span-7">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[98px] font-black tracking-[-0.04em] leading-[0.92] text-[#111111] uppercase select-none flex flex-col">
            <AnimatedTitle text="DEVASHISH" delay={0.1} />
            <AnimatedTitle text="HALDAR" delay={0.25} className="text-[#111111] hover:text-emerald-800 transition-colors" />
          </h1>

          <div className="mt-6 flex items-center gap-3 text-sm md:text-lg font-mono font-medium text-[#5F6368]">
            <AnimatedWords text="Software Engineer · Full Stack Developer · Builder" delay={0.35} />
          </div>

          <p className="mt-4 text-lg md:text-2xl text-[#111111] font-sans font-normal max-w-2xl leading-snug tracking-tight">
            Building high-performance systems at the intersection of{" "}
            <span className="font-semibold underline decoration-emerald-400 decoration-2 underline-offset-4">
              full-stack architectures
            </span>
            ,{" "}
            <span className="font-semibold underline decoration-emerald-400 decoration-2 underline-offset-4">
              C++20 systems
            </span>
            , and{" "}
            <span className="font-semibold underline decoration-emerald-400 decoration-2 underline-offset-4">
              autonomous AI agents
            </span>
            .
          </p>

          {/* Action Buttons */}
          <ScrollReveal delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                data-cursor="VIEW WORK"
                className="group inline-flex items-center justify-between gap-3 px-6 py-4 rounded-xl bg-[#111111] text-white text-sm font-mono font-medium tracking-wide shadow-md hover:bg-emerald-700 transition-all duration-200"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <a
                href="https://github.com/devashishhaldar2006"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="group inline-flex items-center justify-between gap-3 px-6 py-4 rounded-xl bg-[#FFFFFF] border border-[#E4E4E0] text-[#111111] text-sm font-mono font-medium tracking-wide shadow-xs hover:border-[#111111] hover:bg-[#F2F2EF] transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4" />
                  <span>GITHUB PROFILE</span>
                </div>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* 3D Spatial Canvas */}
        <div className="lg:col-span-5">
          <ScrollReveal delay={0.25} direction="left">
            <MetaMesh3D />
          </ScrollReveal>
        </div>
      </div>

      {/* Dynamic Continuous Metric Stream */}
      <FloatingDataBadges />

      {/* Abstract Quantitative Pipeline Visualizer */}
      <ScrollReveal delay={0.4}>
        <div className="w-full">
          <QuantPipelineVisual />
        </div>
      </ScrollReveal>
    </section>
  );
}
