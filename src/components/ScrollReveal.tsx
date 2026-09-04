"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // once: true completely stops shaking / re-triggering when scrolling up!
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 25, opacity: 0 };
      case "down":
        return { y: -25, opacity: 0 };
      case "left":
        return { x: 25, opacity: 0 };
      case "right":
        return { x: -25, opacity: 0 };
      case "none":
        return { opacity: 0 };
      default:
        return { y: 25, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={
        isInView
          ? { y: 0, x: 0, opacity: 1 }
          : getInitialPosition()
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
