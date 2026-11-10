"use client";

import { useEffect, useRef, useState } from "react";

/** "~16K" → prefix "~", number "16", suffix "K". No number (e.g. "₹", "Founder") → no match. */
const PARTS = /^([^0-9]*)([\d,]+(?:\.\d+)?)([^0-9]*)$/;

/**
 * Counts a stat up from 0 the first time it scrolls into view, keeping any
 * prefix/suffix ("~", "K+", "%") and the original grouping and decimals.
 * Server HTML and no-JS/reduced-motion visitors always see the final value.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const m = PARTS.exec(value);
    if (!el || !m) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const grouped = num.includes(",");
    const fmt = (n: number) =>
      pre + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouped }) + post;

    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 900);
        const eased = 1 - (1 - p) ** 3;
        setText(p < 1 ? fmt(target * eased) : value);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}
