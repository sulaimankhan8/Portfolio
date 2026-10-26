import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-line px-4 pb-24 pt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-mist">
      <span>
        {SITE.name} · Refined in {SITE.city} · {new Date().getFullYear()}
      </span>
      <a href={SITE.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href={SITE.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
    </footer>
  );
}
