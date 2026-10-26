import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/dossier/Gallery";
import { Footer } from "@/components/Footer";
import { Glyph, RankBadge, StatStrip, monoCls } from "@/components/ui";
import { ESSENCE, PATHS, STATUS } from "@/content/essence";
import { MAJOR_GU, getGu } from "@/content/gu";
import { SITE } from "@/content/site";
import type { RecordKind } from "@/content/types";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MAJOR_GU.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGu((await params).slug);
  if (!g?.dossier) return {};
  const title = `${g.name} — ${g.plain}`;
  const description = `${g.plain}. ${g.dossier.problem} Built by ${SITE.name}.`;
  const url = `/gu/${g.slug}`;
  return {
    title,
    description,
    keywords: [g.plain, ...(g.stack?.split(" · ") ?? []), SITE.name, "case study"],
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description, authors: [SITE.fullName] },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Breadcrumb + project structured data for one dossier page. */
function dossierLd(g: NonNullable<ReturnType<typeof getGu>>) {
  const url = `${SITE.url}/gu/${g.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE.url}/#major` },
          { "@type": "ListItem", position: 3, name: g.name, item: url },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: g.plain,
        alternateName: g.name,
        description: g.dossier?.abilityLong ?? g.ability,
        url,
        image: `${url}/opengraph-image`,
        ...(g.stack ? { keywords: g.stack.split(" · ").join(", ") } : {}),
        ...(g.liveUrl ? { sameAs: g.liveUrl } : {}),
        author: { "@type": "Person", "@id": `${SITE.url}/#person`, name: SITE.fullName, url: SITE.url },
      },
    ],
  };
}

const KIND: Record<RecordKind, { label: string; color: string }> = {
  born: { label: "Raw materials", color: "var(--color-mist)" },
  refine: { label: "Refined", color: "var(--color-jade)" },
  fed: { label: "Fed · proven", color: "var(--color-gold)" },
  next: { label: "Next refinement", color: "var(--color-r5)" },
};

function Heading({ numeral, title, kicker }: { numeral: string; title: string; kicker: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-4 border-b border-line pb-3.5">
      <Glyph className="text-4xl text-ember">{numeral}</Glyph>
      <h2 className="m-0 font-display text-[44px] font-bold leading-none">{title}</h2>
      <span className={`ml-auto text-[12px] text-mist ${monoCls}`}>{kicker}</span>
    </div>
  );
}

export default async function DossierPage({ params }: Props) {
  const g = getGu((await params).slug);
  if (!g?.dossier) notFound();
  const d = g.dossier;
  const essence = ESSENCE[g.rank].color;
  const status = STATUS[g.status];
  const next = getGu(d.next)!;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dossierLd(g)) }} />
      <main id="main" className="mx-auto flex max-w-[1200px] flex-col gap-20 px-4 pb-24 md:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-7">
          <Link href="/#major" className={`inline-flex min-h-11 items-center text-[13px] text-bone no-underline ${monoCls}`}>
            ← Back to the aperture
          </Link>
          <span className={`text-[13px] text-mist ${monoCls}`}>{d.index}</span>
        </nav>

        <header className="grid items-center gap-12 md:grid-cols-[400px_minmax(0,1fr)] md:gap-16">
          <div className="relative mx-auto flex size-[320px] items-center justify-center md:size-[400px]">
            <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 size-full">
              <circle cx="200" cy="200" r="194" fill="none" stroke="var(--color-line)" />
              <circle cx="200" cy="200" r="176" fill="none" stroke={essence} strokeDasharray="2 10" />
            </svg>
            {g.emblem && (
              <Image
                src={g.emblem.src}
                alt={g.emblem.alt}
                width={g.emblem.width}
                height={g.emblem.height}
                priority
                sizes="340px"
                className="relative max-h-[280px] w-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.65)] md:max-h-[340px]"
              />
            )}
            <Glyph className="absolute left-1.5 top-1.5 text-[56px]" color={essence}>
              {g.glyph}
            </Glyph>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2.5">
              <RankBadge rank={g.rank} label={g.vital ? "本命 · Rank 6 Immortal" : `Rank ${g.rank} · ${ESSENCE[g.rank].name}`} />
              <span className={`border border-line-strong px-3 py-1 text-[12px] ${monoCls}`}>
                {PATHS[g.path].name} path · {PATHS[g.path].domain}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 border px-3 py-1 text-[12px] ${monoCls}`}
                style={{ borderColor: status.color, color: status.color }}
              >
                <Glyph className="text-base">{status.glyph}</Glyph>
                {d.statusLabel}
              </span>
            </div>
            <h1 className="m-0 font-display text-[64px] font-bold leading-[0.92] md:text-[96px]">{g.name}</h1>
            <p className={`m-0 text-sm text-gold ${monoCls}`}>{g.plain}</p>
            <p className="m-0 font-display text-[26px] italic leading-snug text-bone-dim md:text-[28px]">{d.problem}</p>
            {g.liveUrl && (
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={g.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex min-h-12 items-center bg-blood px-6 text-[13px] text-bone no-underline hover:bg-blood-hover hover:text-bone ${monoCls}`}
                >
                  Activate · live demo
                </a>
                <Link
                  href="/#major"
                  className={`inline-flex min-h-12 items-center border border-line-strong px-6 text-[13px] text-bone no-underline hover:border-bone hover:text-bone ${monoCls}`}
                >
                  All Gu
                </Link>
              </div>
            )}
          </div>
        </header>

        <StatStrip items={d.stats} accent={essence} />

        <Gallery shots={d.shots} host={d.shotsHost} note={d.shotsNote} accent={essence} />

        <section className="grid gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Heading numeral="一" title="Ability" kicker="What it does" />
            <p className="m-0 text-[17px] leading-[1.7] text-bone-dim">{d.abilityLong}</p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {d.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-normal">
                  <span aria-hidden style={{ color: essence }}>
                    ◆
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <Heading numeral="二" title="Feeding" kicker="Inputs & upkeep" />
            <p className="m-0 text-[17px] leading-[1.7] text-bone-dim">A Gu that isn’t fed starves. This one needs:</p>
            <dl className="m-0 flex flex-col gap-px bg-line">
              {(
                [
                  ["Eats", d.feeding.eats],
                  ["Upkeep", d.feeding.upkeep],
                  ["If starved", d.feeding.starved],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 bg-ink p-4">
                  <dt className={`text-[12px] text-mist ${monoCls}`}>{k}</dt>
                  <dd className="m-0 text-[15px] leading-normal">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <Heading numeral="三" title="Gu recipe" kicker="The stack" />
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {d.recipe.map((r) => (
              <li key={r.name} className="flex flex-col gap-2.5 border border-line bg-void p-6">
                <span className={`text-[11px] ${monoCls}`} style={{ color: r.role === "main" ? "var(--color-gold)" : "var(--color-mist)" }}>
                  {r.role === "main" ? "Main material" : "Auxiliary"}
                </span>
                <span className="font-display text-[26px] font-bold leading-tight">{r.name}</span>
                <span className="text-sm leading-normal text-mist">{r.why}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <Heading numeral="四" title="Refinement record" kicker="How it was built" />
          <ol className="ml-3 flex list-none flex-col border-l border-line p-0">
            {d.record.map((e, n) => {
              const k = KIND[e.kind];
              return (
                <li key={e.title} className="relative grid gap-2 pb-9 pl-10 md:grid-cols-[100px_200px_minmax(0,1fr)] md:gap-6">
                  <span
                    aria-hidden
                    className="absolute -left-[9px] top-0.5 size-4 rounded-full border-2 bg-ink"
                    style={{ borderColor: k.color }}
                  />
                  <span className={`text-[12px] text-mist ${monoCls}`}>Stage {n + 1}</span>
                  <span className={`text-[12px] ${monoCls}`} style={{ color: k.color }}>
                    {k.label}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display text-[26px] font-bold">{e.title}</span>
                    <span className="text-[15px] leading-normal text-mist">{e.desc}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="grid gap-12 md:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex flex-col gap-5 border border-blood p-8">
            <span className={`text-[12px] tracking-[0.2em] text-ember ${monoCls}`}>五 · Killer move</span>
            <span className="font-display text-[40px] font-bold italic">{d.killerMove.name}</span>
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-line bg-void px-3.5 py-2.5 text-[15px]">
                <Glyph color={essence}>{g.glyph}</Glyph> {g.name}
              </span>
              <span className="font-mono text-ember" aria-hidden>
                +
              </span>
              <span className="border border-line bg-void px-3.5 py-2.5 text-[15px]">
                <Glyph color={d.killerMove.withColor}>{d.killerMove.withGlyph}</Glyph> {d.killerMove.withName}
              </span>
            </div>
            <p className="m-0 text-base leading-relaxed text-mist">{d.killerMove.effect}</p>
          </div>
          <Link
            href={`/gu/${next.slug}`}
            className="flex flex-col justify-between gap-5 border border-line bg-void p-8 text-bone no-underline hover:border-line-strong hover:text-bone"
          >
            <span className={`text-[12px] tracking-[0.2em] text-mist ${monoCls}`}>Next Gu →</span>
            <Glyph className="text-[64px]" color={ESSENCE[next.rank].color}>
              {next.glyph}
            </Glyph>
            <span className="font-display text-[34px] font-bold">{next.name}</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
