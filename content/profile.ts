import type { Rank, Stat } from "./types";

export const HIGHLIGHTS: Stat[] = [
  { value: "32K+", lore: "Primeval stones moved", plain: "Production payments through Cashfree & Razorpay in 4 months" },
  { value: "300K", lore: "Masters served", plain: "Monthly users the Docnish system was built to handle" },
  { value: "~16K", lore: "Voices per second", plain: "Messages/sec sustained in load tests of the chat platform" },
  { value: "5,000+", lore: "Disciples", plain: "Monthly learners on Netz at its peak" },
];

export const ASCENT: { rank: Rank; title: string; where: string; when: string; gain: string }[] = [
  { rank: 1, title: "Intern", where: "Docnish", when: "Jun 2025", gain: "Walked in to learn. Started shipping production features." },
  {
    rank: 2,
    title: "Full-time Developer",
    where: "Docnish",
    when: "2025",
    gain: "Converted to full-time. Architected backend and frontend from scratch.",
  },
  {
    rank: 3,
    title: "Project Co-Lead",
    where: "Docnish",
    when: "to Dec 2025",
    gain: "Co-led nine products. 32K+ payments through infrastructure I designed.",
  },
  {
    rank: 4,
    title: "Backend Developer",
    where: "Techdock Labs",
    when: "Apr 2026",
    gain: "Production backends, CI/CD, Docker deployments and monitoring.",
  },
  {
    rank: 5,
    title: "Backend Engineer",
    where: "Distributed systems",
    when: "Now",
    gain: "Real-time systems at scale — ~16K msg/s in load tests. Rank 6 is next.",
  },
];

export const SECTS = [
  {
    when: "Apr 2026 — present",
    org: "Techdock Labs",
    role: "Backend Developer",
    points: [
      "Backend systems for several production apps, including a creator collaboration platform.",
      "Designed and maintain CI/CD pipelines, Docker deployments, production monitoring and analytics.",
      "Backend architecture, API design, deployment automation and performance work.",
    ],
  },
  {
    when: "Jun 2025 — Dec 2025",
    org: "Docnish",
    role: "Full-stack Developer & Project Co-Lead · intern → full-time",
    points: [
      "Architected backend and frontend from scratch.",
      "Designed the Cashfree & Razorpay payment infrastructure — 32K+ production payments in four months.",
      "Co-led engineering across nine production products: booking, CRM, CMS, recommendations, search, orders.",
      "Built for 5,000+ concurrent and 300K monthly users; load, unit and E2E tested; Docker, GitHub Actions, AWS.",
    ],
  },
];

export const BATTLES = [
  { glyph: "创", title: "Co-founder, Binary Battalions", detail: "Coding club under the HOD, Computer Applications, Integral University" },
  { glyph: "五", title: "Top 5 — Smart India Hackathon 2025 (internal)", detail: "Team lead, Binary Battalions" },
  { glyph: "战", title: "Semi-finalist — HackFiesta 6.0", detail: "Team lead of ASA · organised by IIIT Lucknow" },
  { glyph: "题", title: "Organiser & question setter — Integral Prompt War 1.0", detail: "Designed the challenges" },
];

export const EDUCATION = [
  { title: "BCA, Computer Applications", detail: "Integral University, Lucknow · 2023–2026" },
  { title: "ISC · 93.75%", detail: "City Montessori School · 2021" },
  { title: "ICSE · 92.00%", detail: "City Montessori School · 2019" },
];

export const ARSENAL = [
  { glyph: "炼", color: "var(--color-r4)", group: "Backend", items: ["Node.js", "Express", "FastAPI", "Socket.IO", "REST", "JWT / OAuth"] },
  { glyph: "宇", color: "var(--color-jade)", group: "DevOps", items: ["Docker", "GitHub Actions", "AWS", "Nginx", "PM2"] },
  {
    glyph: "库",
    color: "var(--color-r3)",
    group: "Data",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Redis Streams", "BullMQ", "Drizzle"],
  },
  { glyph: "幻", color: "var(--color-r5)", group: "Frontend", items: ["React", "Next.js", "Redux", "Tailwind", "D3.js", "PWA"] },
  { glyph: "言", color: "var(--color-r2)", group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "C++", "Bash"] },
  {
    glyph: "试",
    color: "var(--color-r1)",
    group: "Testing & payments",
    items: ["Artillery", "k6", "Jest", "Postman", "Cashfree", "Razorpay"],
  },
];
