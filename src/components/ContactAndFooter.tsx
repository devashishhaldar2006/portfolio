"use client";

import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { ScrollReveal } from "./ScrollReveal";

export function ContactAndFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#EDEDE9]/50 border-t border-[#E4E4E0] mt-16">
      {/* MASSIVE STATEMENT CONTACT SECTION */}
      <section id="contact" className="py-24 px-5 md:px-12 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <div className="rounded-3xl border border-[#E4E4E0] bg-[#FFFFFF] p-8 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

            <div className="max-w-4xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>LET'S CONNECT</span>
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.95] text-[#111111] uppercase mb-6">
                LET'S BUILD
                <br />
                <span className="text-emerald-800">SOMETHING.</span>
              </h2>

              <p className="text-lg md:text-xl text-[#5F6368] font-sans max-w-2xl leading-relaxed mb-10">
                Have an ambitious technical problem, quantitative research project, or engineering role?
                I'm always excited to collaborate on high-stakes systems and products.
              </p>

              {/* Direct Contact Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:workfordevashishhaldar@gmail.com"
                  data-cursor="EMAIL"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#111111] text-white text-sm font-mono font-semibold tracking-wide hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>EMAIL ME</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/devashishhaldar2006"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GITHUB"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#FFFFFF] border border-[#E4E4E0] text-[#111111] text-sm font-mono font-medium hover:border-[#111111] hover:bg-[#F2F2EF] transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/devashish-haldar-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="LINKEDIN"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#FFFFFF] border border-[#E4E4E0] text-[#111111] text-sm font-mono font-medium hover:border-[#111111] hover:bg-[#F2F2EF] transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="tel:+919336009951"
                  data-cursor="CALL"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#FFFFFF] border border-[#E4E4E0] text-[#111111] text-sm font-mono font-medium hover:border-[#111111] hover:bg-[#F2F2EF] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 9336009951</span>
                </a>
              </div>

              {/* Location & Time Indicator */}
              <div className="mt-12 pt-6 border-t border-[#EBEBE7] flex flex-wrap items-center justify-between text-xs font-mono text-[#888C90] gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#5F6368]" />
                  <span className="text-[#111111] font-semibold">Lucknow, Uttar Pradesh, India 226012</span>
                  <span>(IST / UTC+5:30)</span>
                </div>
                <div>RESPONSE TIME: &lt; 12 HOURS</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* MINIMAL EDITORIAL FOOTER */}
      <footer className="py-12 px-5 md:px-12 max-w-7xl mx-auto w-full border-t border-[#E4E4E0]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="font-mono font-bold text-sm tracking-wider text-[#111111]">
                DEVASHISH HALDAR
              </span>
            </div>
            <p className="text-xs font-mono text-[#5F6368] mt-1">
              Software Engineer · Quant Developer · Builder · © 2026
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[#5F6368]">
            <a
              href="https://github.com/devashishhaldar2006"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111111] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/devashish-haldar-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111111] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:workfordevashishhaldar@gmail.com"
              className="hover:text-[#111111] transition-colors"
            >
              Email
            </a>
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className="flex items-center gap-1 text-[#111111] font-bold hover:text-emerald-700 transition-colors ml-2"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
