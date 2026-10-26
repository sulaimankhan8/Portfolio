"use client";

import { useEffect } from "react";

/** Turns the hero rain and sky effects (lightning / aura) on once the page is idle,
 *  so they never compete with first paint. */
export function RainStarter() {
  useEffect(() => {
    const start = () => {
      document.querySelectorAll(".rain").forEach((el) => el.classList.add("rain-on"));
      document.getElementById("top")?.classList.add("fx-on");
    };
    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb, { timeout: 2500 });
      else setTimeout(cb, 1200);
    };
    if (document.readyState === "complete") idle(start);
    else window.addEventListener("load", () => idle(start), { once: true });
  }, []);
  return null;
}
