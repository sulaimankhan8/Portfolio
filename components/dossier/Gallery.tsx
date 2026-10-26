"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import { BrowserFrame, monoCls } from "@/components/ui";
import type { Shot } from "@/content/types";

export function Gallery({ shots, host, note, accent }: { shots: Shot[]; host: string; note: string; accent: string }) {
  const [i, setI] = useState(0);
  const shot = shots[i];
  const move = (d: number) => setI((v) => (v + d + shots.length) % shots.length);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") move(1);
    if (e.key === "ArrowLeft") move(-1);
  };
  const tall = shot.height > shot.width;

  return (
    <section aria-label="Screens" className="flex flex-col gap-4" onKeyDown={onKey}>
      <BrowserFrame host={host} caption={shot.caption}>
        <div className={tall ? "flex justify-center bg-void py-6" : ""}>
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.caption}
            width={shot.width}
            height={shot.height}
            sizes="(max-width: 1200px) 100vw, 1136px"
            className={tall ? "h-[560px] w-auto" : "block h-auto w-full"}
          />
        </div>
      </BrowserFrame>
      <div role="group" aria-label="Choose a screen" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {shots.map((s, n) => {
          const on = n === i;
          return (
            <button
              key={s.src}
              type="button"
              aria-pressed={on}
              aria-label={s.caption}
              onClick={() => setI(n)}
              className="flex cursor-pointer flex-col gap-2 border bg-ink p-0 text-left transition-opacity"
              style={{ borderColor: on ? accent : "var(--color-line)", opacity: on ? 1 : 0.7 }}
            >
              <Image
                src={s.src}
                alt=""
                width={s.width}
                height={s.height}
                sizes="280px"
                className="block h-[110px] w-full object-cover object-top"
              />
              <span className={`px-2.5 pb-2.5 text-[11px] text-bone ${monoCls}`}>{s.caption}</span>
            </button>
          );
        })}
      </div>
      <p className={`m-0 text-[11px] normal-case tracking-normal text-mist`}>{note} Use ← → to switch screens.</p>
    </section>
  );
}
