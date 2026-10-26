import { Fragment, type ReactNode } from "react";
import { ART, FONTS, INSPIRATION, MUSIC } from "@/content/credits";
import { SITE } from "@/content/site";
import { Glyph, Seal, monoCls } from "@/components/ui";

const ext = { target: "_blank", rel: "noreferrer" } as const;
/** quiet underline that brightens on hover — links stay distinguishable without colour */
const linkCls =
  "text-bone underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-ember hover:decoration-ember";

const PATH_GLYPH: Record<string, string> = { Demonic: "魔", Righteous: "正" };

function Column({ glyph, label, children }: { glyph: string; label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 bg-ink p-6">
      <div className="flex items-center gap-3">
        <Glyph className="text-[28px] text-ember">{glyph}</Glyph>
        <h3 className={`m-0 text-[11px] font-normal tracking-[0.22em] text-mist ${monoCls}`}>{label}</h3>
      </div>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line px-4 pb-32 pt-12 md:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <section aria-labelledby="credits-title" className="flex flex-col gap-5">
          <div className="flex items-baseline gap-3">
            <Glyph className="text-2xl text-ember">致谢</Glyph>
            <h2 id="credits-title" className={`m-0 text-[12px] font-normal tracking-[0.24em] text-mist ${monoCls}`}>
              Credits
            </h2>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)] gap-px border border-line bg-line md:grid-cols-[1.2fr_1fr_1fr]">
            <Column glyph="蛊" label="Inspired by">
              <a href={INSPIRATION.url} {...ext} className={`font-display text-[28px] font-bold italic leading-none ${linkCls}`}>
                <cite>{INSPIRATION.work}</cite>
              </a>
              <p className="m-0 text-sm text-bone-dim">The web novel by {INSPIRATION.author}.</p>
              <p className="m-0 text-[13px] leading-relaxed text-mist">{INSPIRATION.note}</p>
            </Column>

            <Column glyph="音" label="Music">
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {MUSIC.map((m) => (
                  <li key={m.title} className="flex gap-3">
                    {m.use && <Glyph className="pt-0.5 text-lg text-mist">{PATH_GLYPH[m.use] ?? "音"}</Glyph>}
                    <div className="flex flex-col gap-1">
                      {m.use && <span className={`text-[10px] tracking-[0.2em] text-mist ${monoCls}`}>{m.use} path</span>}
                      <a href={m.source} {...ext} className={`font-display text-xl leading-tight ${linkCls}`}>
                        {m.title}
                      </a>
                      <span className="text-[13px] text-mist">
                        {m.author} ·{" "}
                        {m.licenceUrl ? (
                          <a href={m.licenceUrl} {...ext} className={linkCls}>
                            {m.licence}
                          </a>
                        ) : (
                          m.licence
                        )}
                      </span>
                      {m.changes && <span className="text-[12px] text-mist">{m.changes}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </Column>

            <Column glyph="炼" label="Craft">
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] tracking-[0.2em] text-mist ${monoCls}`}>Type</span>
                <p className="m-0 text-sm leading-relaxed text-bone-dim">
                  {FONTS.names.map((n, i) => (
                    <Fragment key={n}>
                      {i > 0 && " · "}
                      <span className="whitespace-nowrap">{n}</span>
                    </Fragment>
                  ))}
                </p>
                <a href={FONTS.licenceUrl} {...ext} className={`self-start text-[13px] ${linkCls}`}>
                  {FONTS.licence}
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] tracking-[0.2em] text-mist ${monoCls}`}>Art</span>
                <p className="m-0 text-sm leading-relaxed text-bone-dim">{ART}</p>
              </div>
            </Column>
          </div>
        </section>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-line pt-8 md:flex-row">
          <div className="flex items-center gap-4">
            <Seal glyph="苏" size={36} />
            <span className={`flex flex-col gap-1 text-[12px] tracking-[0.14em] text-mist md:flex-row md:gap-0 ${monoCls}`}>
              <span className="text-bone-dim">{SITE.name}</span>
              <span>
                <span className="hidden md:inline"> · </span>Refined in {SITE.city} · {new Date().getFullYear()}
              </span>
            </span>
          </div>
          <nav aria-label="Elsewhere" className={`flex gap-6 text-[12px] tracking-[0.14em] ${monoCls}`}>
            <a href={SITE.github} {...ext}>
              GitHub
            </a>
            <a href={SITE.linkedin} {...ext}>
              LinkedIn
            </a>
            <a href={SITE.resume} {...ext}>
              Résumé
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
