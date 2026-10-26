export const SITE = {
  name: "Sulaiman Khan",
  fullName: "Mohd Sulaiman Khan",
  role: "Backend Software Engineer",
  city: "Lucknow",
  email: "sulaimanclass12b@gmail.com",
  github: "https://github.com/sulaimankhan8",
  linkedin: "https://www.linkedin.com/in/suleman-khan-b4ab2b275",
  /** drop the current PDF into public/resume.pdf */
  resume: "/resume.pdf",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline:
    "I refine backends the way Gu are refined: under pressure, until only what survives remains. Real-time chat, payments, and the queues that hold them together.",
};

export const NAV = [
  { href: "#major", label: "Gu", mobile: true },
  { href: "#sects", label: "Sects", mobile: true },
  { href: "#battles", label: "Battles", mobile: false },
  { href: "#arsenal", label: "Arsenal", mobile: false },
  { href: "#summon", label: "Summon", mobile: true },
];
