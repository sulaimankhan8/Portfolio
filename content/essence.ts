import type { Path, Rank, Status } from "./types";

/** `color` is a CSS variable so it follows the theme; `hex` is the demonic value (used by OG images). */
export const ESSENCE: Record<Rank, { name: string; color: string; hex: string; crystal?: string }> = {
  1: { name: "Green Copper", color: "var(--color-r1)", hex: "#6fbf8a", crystal: "/gu/r1.webp" },
  2: { name: "Red Steel", color: "var(--color-r2)", hex: "#e0664e", crystal: "/gu/r2.webp" },
  3: { name: "White Silver", color: "var(--color-r3)", hex: "#c9cdd3", crystal: "/gu/r3.webp" },
  4: { name: "Yellow Gold", color: "var(--color-r4)", hex: "#e0b341", crystal: "/gu/netz.webp" },
  5: { name: "Purple Crystal", color: "var(--color-r5)", hex: "#a88beb" },
  6: { name: "Immortal", color: "var(--color-gold)", hex: "#d6a54a" },
};

export const PATHS: Record<Path, { glyph: string; name: string; domain: string }> = {
  strength: { glyph: "力", name: "Strength", domain: "Distributed systems" },
  information: { glyph: "信", name: "Information", domain: "EdTech / web" },
  rule: { glyph: "律", name: "Rule", domain: "Security & legal-tech" },
  wisdom: { glyph: "智", name: "Wisdom", domain: "AI / ML" },
  theft: { glyph: "偷", name: "Theft", domain: "Scraping" },
  space: { glyph: "宇", name: "Space", domain: "Networks" },
  refinement: { glyph: "炼", name: "Refinement", domain: "Tools" },
};

export const STATUS: Record<Status, { label: string; glyph: string; color: string }> = {
  alive: { label: "Alive", glyph: "活", color: "var(--color-jade)" },
  dormant: { label: "Dormant", glyph: "眠", color: "var(--color-mist)" },
  refining: { label: "In refinement", glyph: "炼", color: "var(--color-gold)" },
  detonated: { label: "Self-detonated", glyph: "爆", color: "var(--color-ember)" },
};
