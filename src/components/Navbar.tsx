"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "work", "quantflow", "architecture", "lab", "about", "experience", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 transition-all duration-300 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-6 px-4 md:px-6 py-2.5 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-[#FFFFFF]/90 backdrop-blur-md border-[#E4E4E0] shadow-sm py-2"
            : "bg-[#FFFFFF]/75 backdrop-blur-sm border-[#E4E4E0]/80 shadow-none"
        }`}
      >
        {/* Brand */}
        <a
          href="#hero"
          data-cursor="TOP"
          className="flex items-center gap-2 group text-xs md:text-sm font-semibold tracking-tight text-[#111111]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 group-hover:scale-125 transition-transform" />
          <span className="font-mono tracking-wider text-[11px] md:text-xs">DEVASHISH</span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-[#5F6368] font-normal border-l border-[#E4E4E0] pl-2">
            FULL STACK DEV
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1 text-xs font-medium text-[#5F6368]">
          {[
            { id: "work", label: "WORK" },
            { id: "quantflow", label: "QUANTFLOW" },
            { id: "architecture", label: "UNDER THE HOOD" },
            { id: "lab", label: "LAB" },
            { id: "about", label: "ABOUT" },
            { id: "experience", label: "EXPERIENCE" },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-cursor="JUMP"
                className={`px-3 py-1 rounded-full font-mono text-[11px] tracking-wide transition-all ${
                  isActive
                    ? "bg-[#111111] text-white font-semibold"
                    : "hover:text-[#111111] hover:bg-[#F2F2EF]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            data-cursor="CONTACT"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] text-white text-[11px] md:text-xs font-mono font-medium hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <span>CONTACT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
