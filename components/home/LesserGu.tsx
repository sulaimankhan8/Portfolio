"use client";

import Image from "next/image";
import { useState } from "react";
import { Glyph, SectionHeader, StatusTag, monoCls } from "@/components/ui";
import { ESSENCE, PATHS } from "@/content/essence";
import type { Gu, Path } from "@/content/types";

export function LesserGu({ gu }: { gu: Gu[] }) {
  const paths = Array.from(new Set(gu.map((g) => g.path)));
  const [path, setPath] = useState<Path | "all">("all");
  const shown = gu.filter((g) => path === "all" || g.path === path);

  return (
    <section aria-labelledby="lesser-title" id="lesser" className="scroll-mt-8">
      <SectionHeader numeral="二" title="Lesser Gu" id="lesser-title" kicker="Quirky builds · ML · scrapers · experiments" />

      <div role="group" aria-label="Filter by path" className="mb-7 flex flex-wrap gap-2">
        {(["all", ...paths] as const).map((k) => {
          const on = k === path;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={on}
              onClick={() => setPath(k)}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 border px-4 text-[13px] transition-colors ${monoCls} ${
                on ? "border-bone bg-bone text-ink" : "border-line-strong bg-transparent text-bone hover:border-bone"
              }`}
            >
              <Glyph className="text-xl">{k === "all" ? "全" : PATHS[k].glyph}</Glyph>
              {k === "all" ? "All" : PATHS[k].name}
            </button>
          );
        })}
      </div>

      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((g) => {
          const e = ESSENCE[g.rank];
          return (
            <li
              key={g.slug}
              className="flex flex-col gap-3 border border-line bg-void p-7 transition-shadow hover:shadow-[0_0_40px_rgba(95,211,160,0.12)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {e.crystal && (
                    <Image
                      src={e.crystal}
                      alt=""
                      aria-hidden
                      width={460}
                      height={520}
                      sizes="64px"
                      className="-my-2 -ml-2.5 h-[72px] w-16 object-contain"
                    />
                  )}
                  <Glyph className="text-[40px]" color={e.color}>
                    {g.glyph}
                  </Glyph>
                </div>
                <span
                  className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[11px] ${monoCls}`}
                  style={{ borderColor: e.color, color: e.color }}
                >
                  <span className="size-2 rounded-full" style={{ background: e.color }} aria-hidden />R{g.rank} · {e.name}
                </span>
              </div>
              <h3 className="m-0 font-display text-[30px] font-bold leading-none">{g.name}</h3>
              <span className="text-[15px]">{g.plain}</span>
              <p className="m-0 text-sm leading-relaxed text-mist">{g.ability}</p>
              <span className="text-[13px] leading-normal text-mist">Feeds on: {g.diet}</span>
              <div className="mt-auto flex items-center justify-between border-t border-line pt-2.5">
                <StatusTag status={g.status} />
                <span className={`text-[11px] text-mist ${monoCls}`}>
                  {PATHS[g.path].name} · {PATHS[g.path].domain}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
