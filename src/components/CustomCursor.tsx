"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const interactiveEl = el?.closest("[data-cursor]") as HTMLElement | null;
      const clickableEl = el?.closest("a, button, [role='button'], input") as HTMLElement | null;

      if (interactiveEl) {
        setCursorText(interactiveEl.getAttribute("data-cursor") || "");
        setIsHovered(true);
      } else if (clickableEl) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let animationFrameId: number;

    const render = () => {
      // Fluid damped lerp
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`transition-opacity duration-300 pointer-events-none ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {/* Lead micro dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block will-change-transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            cursorText ? "opacity-0 scale-0" : "w-1.5 h-1.5 bg-[#111111]"
          }`}
        />
      </div>

      {/* Trailing smooth magnetic ring or badge */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block will-change-transform -translate-x-1/2 -translate-y-1/2"
      >
        {cursorText ? (
          <div className="flex items-center justify-center px-3 py-1.5 rounded-full bg-[#111111] text-white text-[11px] font-mono tracking-wider font-semibold shadow-2xl border border-white/20 whitespace-nowrap scale-100 transition-all duration-150">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-ping" />
            {cursorText}
          </div>
        ) : (
          <div
            className={`rounded-full transition-all duration-150 ${
              isHovered
                ? "w-9 h-9 bg-emerald-500/10 border border-emerald-600/40 backdrop-blur-[1px] scale-110"
                : "w-6 h-6 border border-[#111111]/25 bg-transparent"
            }`}
          />
        )}
      </div>
    </div>
  );
}
