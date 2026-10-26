"use client";

import { useEffect, useState } from "react";
import { Seal } from "@/components/ui";
import { NAV } from "@/content/site";

/** Slim bar that slides in once the hero has scrolled away. */
export function StickyNav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/95 transition-transform duration-300 ease-ink motion-reduce:transition-none ${
        shown ? "translate-y-0" : "-translate-y-full"
      }`}
      inert={!shown}
    >
      <nav aria-label="Sections" className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-2.5 md:px-8">
        <a href="#top" aria-label="Back to top" className="no-underline">
          <Seal glyph="苏" size={36} />
        </a>
        <ul className="m-0 flex list-none gap-4 p-0 font-mono text-[12px] uppercase tracking-[0.12em] md:gap-7">
          {NAV.map((n) => (
            <li key={n.href} className={n.mobile ? "" : "hidden sm:block"}>
              <a href={n.href} className="inline-flex min-h-11 items-center text-bone no-underline hover:text-ember">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
