"use client";

import { useEffect, useState } from "react";

export type Path = "demonic" | "righteous";
export const THEME_KEY = "cultivation-path";

/** Inline script for <head>: applies the saved path before first paint, so there is no flash. */
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="righteous")document.documentElement.dataset.theme=t}catch(e){}`;

const OPTIONS: { value: Path; glyph: string; label: string }[] = [
  { value: "demonic", glyph: "魔", label: "Demonic cultivator" },
  { value: "righteous", glyph: "正", label: "Righteous cultivator" },
];

/** Floating switch, bottom of the screen: Demonic path (dark) ↔ Righteous path (light). */
export function ThemeSwitch() {
  const [path, setPath] = useState<Path>("demonic");

  useEffect(() => {
    // sync with what the head script applied (it runs before React hydrates)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPath(document.documentElement.dataset.theme === "righteous" ? "righteous" : "demonic");
  }, []);

  function choose(next: Path) {
    setPath(next);
    if (next === "righteous") document.documentElement.setAttribute("data-theme", "righteous");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "righteous" ? "#eef1ec" : "#0a0a0b");
  }

  return (
    <div
      role="radiogroup"
      aria-label="Choose your path (colour theme)"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 border border-line-strong bg-void/95 p-1 shadow-[0_12px_40px_var(--shadow-deep)] md:bottom-6"
    >
      {OPTIONS.map((o) => {
        const on = path === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => choose(o.value)}
            className={`inline-flex min-h-11 cursor-pointer items-center gap-2 border-0 px-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-[12px] ${
              on ? "bg-blood text-bone" : "bg-transparent text-mist hover:text-bone"
            }`}
          >
            <span aria-hidden lang="zh" className="font-brush text-lg normal-case leading-none">
              {o.glyph}
            </span>
            <span>
              {o.label.split(" ")[0]}
              <span className="hidden sm:inline"> cultivator</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
