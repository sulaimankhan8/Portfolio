/** Public URL of the site. Set NEXT_PUBLIC_SITE_URL once you have a custom domain;
 *  on Vercel it falls back to the production URL automatically, so share images
 *  and canonical links are absolute even before a domain is set. */
function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
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
  /** the current PDF lives at public/resume_sulaiman.pdf */
  resume: "/resume_sulaiman.pdf",
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
  knowsAbout: ["Node.js", "TypeScript", "Socket.IO", "Redis", "BullMQ", "PostgreSQL", "Docker", "System design", "Real-time systems"],
};

export const NAV = [
  { href: "#major", label: "Gu", mobile: true },
  { href: "#sects", label: "Sects", mobile: true },
  { href: "#battles", label: "Battles", mobile: false },
  { href: "#arsenal", label: "Arsenal", mobile: false },
  { href: "#summon", label: "Summon", mobile: true },
];
