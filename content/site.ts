/** Public URL of the site. Set NEXT_PUBLIC_SITE_URL once you have a custom domain;
 *  on Vercel it falls back to the production URL automatically, so share images
 *  and canonical links are absolute even before a domain is set. */
function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return "https://www.sulaimankhan.site";
}

export const SITE = {
  name: "Sulaiman Khan",
  fullName: "Mohd Sulaiman Khan",
  role: "Backend Software Engineer",
  city: "Lucknow",
  country: "India",
  email: "sulaimanclass12b@gmail.com",
  github: "https://github.com/sulaimankhan8",
  linkedin: "https://www.linkedin.com/in/suleman-khan-b4ab2b275",
  /** 2-page résumé at public/resume_sulaiman.pdf; 4-page CV at public/cv_sulaiman.pdf */
  resume: "/resume_sulaiman.pdf",
  cv: "/cv_sulaiman.pdf",
  url: siteUrl(),
  tagline:
    "I refine backends the way Gu are refined: under pressure, until only what survives remains. Real-time chat, payments, and the queues that hold them together.",
  /** plain-English summary for search results and link previews (the tagline is for the page) */
  description:
    "Sulaiman Khan is a backend software engineer in Lucknow, India, building real-time chat, payments and queue-driven systems with Node.js, Socket.IO, Redis, BullMQ and PostgreSQL.",
  /** one short line for share images */
  shareLine: "Real-time chat, payments, and the queues that hold them together.",
  keywords: [
    "Sulaiman Khan",
    "Mohd Sulaiman Khan",
    "backend software engineer",
    "backend developer Lucknow",
    "Node.js developer",
    "Socket.IO",
    "Redis",
    "BullMQ",
    "PostgreSQL",
    "real-time systems",
    "portfolio",
  ],
  worksFor: "Techdock Labs",
  alumniOf: "Integral University",
  knowsAbout: [
    "Node.js",
    "TypeScript",
    "Go",
    "Socket.IO",
    "WebRTC",
    "Redis",
    "BullMQ",
    "PostgreSQL",
    "Docker",
    "System design",
    "Real-time systems",
    "Payment gateway integration",
    "Bluetooth Low Energy mesh networking",
  ],
};

/** Last significant content update per page (used by the sitemap and structured data). */
export const UPDATED: Record<string, string> = {
  root: "2026-11-16",
  "myriad-voices": "2026-11-15",
  "numeral-insight": "2026-11-15",
  "blood-seal": "2026-10-26",
};

/** `plain` keeps the lore labels readable for visitors who haven't read the novel. */
export const NAV = [
  { href: "#major", label: "Gu", plain: "Projects", mobile: true },
  { href: "#sects", label: "Sects", plain: "Experience", mobile: true },
  { href: "#battles", label: "Battles", plain: "Wins", mobile: false },
  { href: "#arsenal", label: "Arsenal", plain: "Skills", mobile: false },
  { href: "#summon", label: "Summon", plain: "Contact", mobile: true },
  { href: SITE.resume, label: "Résumé", plain: "PDF", mobile: false },
];
