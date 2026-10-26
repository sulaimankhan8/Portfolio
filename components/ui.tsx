import Link from "next/link";
import type { ReactNode } from "react";
import { ESSENCE, STATUS } from "@/content/essence";
import type { Rank, Status } from "@/content/types";

const mono = "font-mono uppercase tracking-[0.12em]";

export function Button({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "ghost" }) {
  const external = href.startsWith("http");
  const cls =
    variant === "primary"
      ? "bg-blood text-bone hover:bg-blood-hover hover:text-bone"
      : "border border-line-strong text-bone hover:border-bone hover:text-bone";
  const className = `inline-flex min-h-12 items-center px-6 text-[13px] no-underline transition-colors ${mono} ${cls}`;
  return external ? (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function RankBadge({ rank, label }: { rank: Rank; label?: string }) {
  const e = ESSENCE[rank];
  return (
    <span
      className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[11px] ${mono}`}
      style={{ borderColor: e.color, color: e.color }}
    >
      <span className="size-2 rounded-full" style={{ background: e.color }} aria-hidden />
      {label ?? `R${rank} · ${e.name}`}
    </span>
  );
}

export function StatusTag({ status, label }: { status: Status; label?: string }) {
  const s = STATUS[status];
  return (
    <span className="inline-flex items-center gap-2 text-[13px]" style={{ color: s.color }}>
      <span className="font-brush text-lg leading-none" aria-hidden lang="zh">
        {s.glyph}
      </span>
      {label ?? s.label}
    </span>
  );
}

export function Glyph({ children, className = "", color }: { children: string; className?: string; color?: string }) {
  return (
    <span aria-hidden lang="zh" className={`font-brush leading-none ${className}`} style={color ? { color } : undefined}>
      {children}
    </span>
  );
}

export function SectionHeader({ numeral, title, kicker, id }: { numeral: string; title: string; kicker?: string; id?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-baseline gap-4 border-b border-line pb-4">
      <Glyph className="text-[40px] text-ember">{numeral}</Glyph>
      <h2 id={id} className="m-0 font-display text-[40px] font-bold leading-none md:text-[56px]">
        {title}
      </h2>
      {kicker && <span className={`ml-auto text-[12px] text-mist ${mono}`}>{kicker}</span>}
    </div>
  );
}

export function Seal({ glyph, variant = "solid", size = 48 }: { glyph: string; variant?: "solid" | "outline"; size?: number }) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center ${
        variant === "solid" ? "-rotate-[4deg] bg-blood text-bone" : "rotate-[3deg] border-2 border-blood text-ember"
      }`}
      style={{ width: size, height: size }}
    >
      <span lang="zh" className="font-brush leading-none" style={{ fontSize: size * 0.6 }}>
        {glyph}
      </span>
    </span>
  );
}

export function BrowserFrame({ host, caption, children }: { host: string; caption?: string; children: ReactNode }) {
  return (
    <div className="border border-line bg-ink shadow-[0_40px_80px_var(--shadow-deep)]">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-3.5 truncate font-mono text-[12px] text-mist">{host}</span>
        {caption && <span className={`ml-auto hidden text-[12px] text-gold sm:inline ${mono}`}>{caption}</span>}
      </div>
      {children}
    </div>
  );
}

export function StatStrip({
  items,
  accent = "var(--color-gold)",
}: {
  items: { value: string; lore: string; plain: string }[];
  accent?: string;
}) {
  return (
    <dl className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.lore} className="flex flex-col gap-2 bg-ink px-6 py-7">
          <dt className="sr-only">{s.plain}</dt>
          <dd className="m-0 font-display text-[44px] font-bold leading-none md:text-[56px]">{s.value}</dd>
          <dd className={`m-0 text-[11px] ${mono}`} style={{ color: accent }}>
            {s.lore}
          </dd>
          <dd className="m-0 text-sm leading-normal text-mist">{s.plain}</dd>
        </div>
      ))}
    </dl>
  );
}

export const monoCls = mono;
