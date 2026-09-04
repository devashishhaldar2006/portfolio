"use client";

import { useEffect } from "react";

export function ScrollToTopOnRefresh() {
  useEffect(() => {
    // Disable automatic browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Immediately remove hash if present in URL on page load
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    // Force immediate scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Ensure it stays at top even after initial layout calculation
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
