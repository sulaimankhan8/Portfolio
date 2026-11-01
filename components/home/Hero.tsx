import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Button, Glyph, Seal, monoCls } from "@/components/ui";
import { QUOTES } from "@/content/quotes";
import { NAV, SITE } from "@/content/site";
import { HERO_MOBILE } from "@/lib/hero-mobile";
import { RainStarter } from "./RainStarter";

const HERO_DESKTOP = getImageProps({ src: "/hero/hero.webp", alt: "", fill: true, sizes: "100vw" }).props;

export function Hero() {
  return (
    <section id="top" className="relative h-[720px] overflow-hidden md:h-[820px]">
      {/* Demonic hero (the LCP). Phones get a 6 KB portrait crop inlined in the HTML, so it paints
          with the first frame; wider screens get the optimised full image (art direction). */}
      <link rel="preload" as="image" imageSrcSet={HERO_DESKTOP.srcSet} imageSizes="100vw" media="(min-width: 768px)" fetchPriority="high" />
      <picture>
        <source media="(min-width: 768px)" srcSet={HERO_DESKTOP.srcSet} sizes="100vw" />
        <img
          src={HERO_MOBILE.src}
          width={HERO_MOBILE.width}
          height={HERO_MOBILE.height}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="hero-img-demonic absolute inset-0 size-full object-cover object-center md:object-[62%_60%]"
        />
      </picture>
      {/* lazy: hidden (display:none) on the demonic path, so it costs nothing until the
          righteous path is chosen; then it loads at once because it is in view */}
      <Image
        src="/hero/hero-righteous.webp"
        alt=""
        aria-hidden
        fill
        loading="lazy"
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
