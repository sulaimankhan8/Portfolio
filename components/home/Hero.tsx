import Image from "next/image";
import Link from "next/link";
import { Button, Glyph, Seal, monoCls } from "@/components/ui";
import { QUOTES } from "@/content/quotes";
import { NAV, SITE } from "@/content/site";
import { RainStarter } from "./RainStarter";

export function Hero() {
  return (
    <section id="top" className="relative h-[720px] overflow-hidden md:h-[820px]">
      <Image
        src="/hero/hero.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="hero-img-demonic object-cover object-[62%_60%]"
      />
      {/* fetched eagerly at low priority so switching paths is instant (~25 KB) */}
      <Image
        src="/hero/hero-righteous.webp"
        alt=""
        aria-hidden
        fill
        loading="eager"
        fetchPriority="low"
        sizes="100vw"
        className="hero-img-righteous object-cover object-[62%_60%]"
      />
      {/* Righteous sky: two layers of drifting cloud at different speeds (parallax) */}
      <div className="clouds clouds-far" aria-hidden />
      <div className="clouds clouds-near" aria-hidden />
      {/* Demonic sky: two red lightning strikes on different rhythms, each with a flash of red light */}
      <div className="fx fx-lightning" aria-hidden>
        <div className="fx-flash fx-flash-a" />
        <div className="fx-flash fx-flash-b" />
        <svg className="fx-bolt fx-bolt-a" viewBox="0 0 120 420" preserveAspectRatio="none">
          <polyline points="70,0 58,70 76,110 44,190 66,232 38,320 52,350 30,420" />
          <polyline points="76,110 98,150 90,200" />
          <polyline points="66,232 88,262" />
          <polyline className="fx-bolt-core" points="70,0 58,70 76,110 44,190 66,232 38,320 52,350 30,420" />
        </svg>
        <svg className="fx-bolt fx-bolt-b" viewBox="0 0 120 420" preserveAspectRatio="none">
          <polyline points="40,0 54,60 30,120 62,180 46,250 74,330 60,420" />
          <polyline points="30,120 10,170 18,210" />
          <polyline className="fx-bolt-core" points="40,0 54,60 30,120 62,180 46,250 74,330 60,420" />
        </svg>
      </div>
      {/* Righteous sky: azure qi that swells and flickers around the sun and through the mist */}
      <div className="fx fx-aura" aria-hidden>
        <div className="fx-aura-a" />
        <div className="fx-aura-b" />
      </div>
      <div className="rain rain-far" aria-hidden />
      <div className="rain rain-near" aria-hidden />
      <RainStarter />
      <div aria-hidden className="hero-fade-x absolute inset-0" />
      <div aria-hidden className="hero-fade-y absolute inset-x-0 bottom-0 h-52" />

      <div className="relative mx-auto flex h-full max-w-[1200px] flex-col px-4 md:px-8">
        <nav aria-label="Primary" className="flex flex-wrap items-center justify-between gap-4 py-7">
          <Link href="#top" aria-label="Home" className="no-underline">
            <Seal glyph="苏" />
          </Link>
          <ul className={`m-0 flex list-none flex-wrap gap-5 p-0 text-[13px] md:gap-7 ${monoCls}`}>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-bone no-underline hover:text-ember">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex max-w-[640px] flex-1 flex-col justify-center gap-6 pb-28">
          <p className={`m-0 text-[12px] tracking-[0.24em] text-ember md:text-[13px] ${monoCls}`}>
            Rank 5 · {SITE.role} · {SITE.city}
          </p>
          <h1 className="m-0 font-display text-[84px] font-bold leading-[0.88] tracking-[-0.02em] md:text-[124px]">
            Sulaiman
            <br />
            Khan
          </h1>
          <p className="m-0 max-w-[520px] text-lg leading-relaxed text-bone-dim md:text-xl">{SITE.tagline}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="#major">Enter the aperture</Button>
            <Button href="#summon" variant="ghost">
              Summon
            </Button>
          </div>
        </div>
      </div>

      {/* Hanging-scroll quotes: three per path, cross-fading (CSS only) */}
      <div className="absolute right-6 top-32 hidden h-[420px] w-[44px] md:block md:right-12">
        {(["demonic", "righteous"] as const).map((path) => (
          <div key={path} className={`quote-set quote-set-${path}`}>
            {QUOTES[path].map((q, i) => (
              <p
                key={q.zh}
                title={q.en}
                className={`quote quote-${i} absolute inset-0 m-0 text-[34px] leading-tight [writing-mode:vertical-rl]`}
              >
                <Glyph>{q.zh}</Glyph>
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
