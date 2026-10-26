import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { LesserGu } from "@/components/home/LesserGu";
import { Arsenal, Ascent, Battles, Highlights, MajorGu, Sects } from "@/components/home/sections";
import { Summon } from "@/components/home/Summon";
import { Reveal } from "@/components/Reveal";
import { StickyNav } from "@/components/StickyNav";
import { LESSER_GU } from "@/content/gu";
import { SITE } from "@/content/site";

/** Structured data: who this is (Person), the site, and that the page is a profile —
 *  lets search engines show a name/knowledge panel and link GitHub + LinkedIn. */
const personLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.fullName,
      alternateName: SITE.name,
      jobTitle: SITE.role,
      description: SITE.description,
      url: SITE.url,
      image: `${SITE.url}/opengraph-image`,
      email: `mailto:${SITE.email}`,
      address: { "@type": "PostalAddress", addressLocality: SITE.city, addressCountry: "IN" },
      worksFor: { "@type": "Organization", name: SITE.worksFor },
      alumniOf: { "@type": "CollegeOrUniversity", name: SITE.alumniOf },
      knowsAbout: SITE.knowsAbout,
      sameAs: [SITE.github, SITE.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: `${SITE.name} · Portfolio`,
      inLanguage: "en",
      publisher: { "@id": `${SITE.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE.url}/#profile`,
      url: SITE.url,
      name: `${SITE.name} — ${SITE.role}`,
      isPartOf: { "@id": `${SITE.url}/#website` },
      mainEntity: { "@id": `${SITE.url}/#person` },
    },
  ],
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
