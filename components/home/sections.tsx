import Image from "next/image";
import Link from "next/link";
import { Glyph, RankBadge, SectionHeader, Seal, StatStrip, StatusTag, monoCls } from "@/components/ui";
import { ESSENCE, PATHS } from "@/content/essence";
import { MAJOR_GU } from "@/content/gu";
import { ARSENAL, ASCENT, BATTLES, EDUCATION, HIGHLIGHTS, SECTS } from "@/content/profile";

export function Highlights() {
  return (
    <section aria-label="Highlights" className="-mt-px">
      <StatStrip items={HIGHLIGHTS} />
    </section>
  );
}

export function Ascent() {
  return (
    <section aria-labelledby="ascent-title">
      <SectionHeader numeral="境" title="The ascent" id="ascent-title" kicker="Rank 1 to Rank 5 · keeping only what earned its place" />
      <ol className="m-0 grid list-none gap-10 p-0 md:grid-cols-5 md:gap-0">
        {ASCENT.map((r) => {
          const e = ESSENCE[r.rank];
          return (
            <li
              key={r.rank}
              className="relative flex flex-col gap-2.5 border-l-2 pl-6 md:border-l-0 md:border-t-2 md:pl-0 md:pr-5"
              style={{ borderColor: e.color }}
            >
              <span
                aria-hidden
                className="absolute -left-[9px] top-0 size-4 rounded-full md:-top-[9px] md:left-0"
                style={{ background: e.color, boxShadow: `0 0 16px ${e.color}` }}
              />
              <span className={`text-[11px] md:pt-5 ${monoCls}`} style={{ color: e.color }}>
                Rank {r.rank} · {e.name}
              </span>
              <span className="font-display text-[28px] font-bold leading-[1.05]">{r.title}</span>
              <span className="text-sm text-bone">{r.where}</span>
              <span className={`text-[11px] text-mist ${monoCls}`}>{r.when}</span>
              <span className="text-sm leading-normal text-mist">{r.gain}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function MajorGu() {
  const [vital, ...rest] = MAJOR_GU;
  return (
    <section aria-labelledby="major-title" id="major" className="scroll-mt-8">
      <SectionHeader numeral="一" title="Major Gu" id="major-title" kicker="Three projects · open the dossier" />

      <Link
        href={`/gu/${vital.slug}`}
        className="grid items-center gap-8 border border-gold vital-card p-6 text-bone no-underline hover:text-bone md:grid-cols-[280px_minmax(0,1fr)_auto] md:p-10"
      >
        {vital.emblem && (
          <Image
            src={vital.emblem.src}
            alt={vital.emblem.alt}
            width={vital.emblem.width}
            height={vital.emblem.height}
            sizes="280px"
            className="mx-auto h-[260px] w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.6)] md:h-[300px]"
          />
        )}
        <div className="flex flex-col gap-3">
          <span className={`text-[12px] text-gold ${monoCls}`}>
            <span lang="zh">本命</span> · Vital Gu · Rank 6 Immortal · {PATHS[vital.path].name} path
          </span>
          <span className="font-display text-5xl font-bold leading-none md:text-6xl">{vital.name}</span>
          <span className="text-[17px]">{vital.plain}</span>
          <span className="text-base leading-relaxed text-mist">{vital.ability}</span>
          <span className={`text-[12px] text-mist ${monoCls}`}>{vital.stack}</span>
        </div>
        <span
          className={`inline-flex min-h-12 items-center justify-self-start bg-blood px-6 text-[13px] text-bone md:justify-self-end ${monoCls}`}
        >
          Dossier →
        </span>
      </Link>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {rest.map((g) => {
          const e = ESSENCE[g.rank];
          return (
            <Link
              key={g.slug}
              href={`/gu/${g.slug}`}
              className="group flex flex-col gap-3.5 border border-line bg-void p-8 text-bone no-underline transition-colors hover:border-line-strong hover:text-bone"
            >
              <div
                className="flex h-[220px] items-center justify-center"
                style={{
                  background: `radial-gradient(ellipse at 50% 55%, color-mix(in srgb, ${e.color} 14%, transparent), transparent 65%)`,
                }}
              >
                {g.emblem && (
                  <Image
                    src={g.emblem.src}
                    alt=""
                    aria-hidden
                    width={g.emblem.width}
                    height={g.emblem.height}
                    sizes="300px"
                    className="max-h-[210px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-ink group-hover:-translate-y-1"
                  />
                )}
              </div>
              <div className="flex items-center justify-between">
                <Glyph className="text-[56px]" color={e.color}>
                  {g.glyph}
                </Glyph>
                <RankBadge rank={g.rank} />
              </div>
              <span className="font-display text-[40px] font-bold leading-none">{g.name}</span>
              <span className="text-base">{g.plain}</span>
              <span className="text-[15px] leading-relaxed text-mist">{g.ability}</span>
              <div className="mt-auto flex justify-between border-t border-line pt-3 text-[13px]">
                <StatusTag status={g.status} />
                <span className={`text-mist ${monoCls}`}>
                  {PATHS[g.path].name} path · {PATHS[g.path].domain}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function Sects() {
  return (
    <section aria-labelledby="sects-title" id="sects" className="scroll-mt-8">
      <SectionHeader numeral="三" title="Sects joined" id="sects-title" kicker="Experience" />
      {SECTS.map((s) => (
        <div key={s.org} className="grid gap-6 border-b border-line pb-10 pt-2 md:grid-cols-[280px_minmax(0,1fr)] md:gap-12">
          <div className="flex flex-col gap-2">
            <span className={`text-[12px] text-gold ${monoCls}`}>{s.when}</span>
            <span className="font-display text-[40px] font-bold leading-none">{s.org}</span>
            <span className="text-[15px] text-mist">{s.role}</span>
          </div>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {s.points.map((p) => (
              <li key={p} className="flex gap-3.5 text-base leading-relaxed text-bone-dim">
                <span className="text-ember" aria-hidden>
                  ◆
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export function Battles() {
  return (
    <section id="battles" className="grid scroll-mt-8 gap-12 md:grid-cols-[1.4fr_1fr]">
      <div>
        <SectionHeader numeral="四" title="Battle record" />
        <ul className="m-0 flex list-none flex-col gap-5 p-0">
          {BATTLES.map((b) => (
            <li key={b.title} className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-5 border-b border-line pb-5">
              <Seal glyph={b.glyph} variant="outline" size={60} />
              <div className="flex flex-col gap-1">
                <span className="font-display text-[26px] font-bold leading-tight">{b.title}</span>
                <span className="text-sm text-mist">{b.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SectionHeader numeral="五" title="Cultivation" />
        <div className="flex flex-col gap-px bg-line">
          {EDUCATION.map((e) => (
            <div key={e.title} className="flex flex-col gap-1 bg-ink p-[18px]">
              <span className="text-[17px] font-semibold">{e.title}</span>
              <span className="text-sm text-mist">{e.detail}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 border border-gold p-6">
          <span className={`text-[11px] tracking-[0.2em] text-gold ${monoCls}`}>Outside the aperture</span>
          <span className="font-display text-2xl italic leading-snug">
            Immortal in MLBB. Grandmaster in League. The only immortality reached so far.
          </span>
          <span className="text-sm leading-normal text-mist">
            Also builds large-scale Redstone automation in Minecraft — distributed systems, by other means.
          </span>
        </div>
      </div>
    </section>
  );
}

export function Arsenal() {
  return (
    <section aria-labelledby="arsenal-title" id="arsenal" className="scroll-mt-8">
      <SectionHeader numeral="六" title="Gu arsenal" id="arsenal-title" kicker="Skills" />
      <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {ARSENAL.map((a) => (
          <div key={a.group} className="flex flex-col gap-3.5 bg-ink p-6">
            <div className="flex items-center gap-3">
              <Glyph className="text-[32px]" color={a.color}>
                {a.glyph}
              </Glyph>
              <h3 className={`m-0 text-[12px] font-normal text-mist ${monoCls}`}>{a.group}</h3>
            </div>
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
              {a.items.map((it) => (
                <li key={it} className="border border-line px-2.5 py-1 text-[13px]">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
