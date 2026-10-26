import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { LesserGu } from "@/components/home/LesserGu";
import { Arsenal, Ascent, Battles, Highlights, MajorGu, Sects } from "@/components/home/sections";
import { Summon } from "@/components/home/Summon";
import { Reveal } from "@/components/Reveal";
import { StickyNav } from "@/components/StickyNav";
import { LESSER_GU } from "@/content/gu";
import { SITE } from "@/content/site";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.fullName,
  alternateName: SITE.name,
  jobTitle: SITE.role,
  email: `mailto:${SITE.email}`,
  address: { "@type": "PostalAddress", addressLocality: SITE.city, addressCountry: "IN" },
  sameAs: [SITE.github, SITE.linkedin],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <StickyNav />
      <Hero />
      <main id="main" className="mx-auto flex max-w-[1200px] flex-col gap-28 px-4 pb-20 md:px-8">
        <Highlights />
        <Reveal>
          <Ascent />
        </Reveal>
        <Reveal>
          <MajorGu />
        </Reveal>
        <Reveal>
          <LesserGu gu={LESSER_GU} />
        </Reveal>
        <Reveal>
          <Sects />
        </Reveal>
        <Reveal>
          <Battles />
        </Reveal>
        <Reveal>
          <Arsenal />
        </Reveal>
        <Reveal>
          <Summon />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
