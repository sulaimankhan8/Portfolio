export type Rank = 1 | 2 | 3 | 4 | 5 | 6;
export type Path = "strength" | "information" | "rule" | "wisdom" | "theft" | "space" | "refinement";
export type Status = "alive" | "dormant" | "refining" | "detonated";
export type RecordKind = "born" | "refine" | "fed" | "next";

export interface Stat {
  value: string;
  lore: string;
  plain: string;
}

export interface Shot {
  src: string;
  caption: string;
  width: number;
  height: number;
}

export interface Gu {
  slug: string;
  name: string;
  plain: string;
  rank: Rank;
  path: Path;
  status: Status;
  vital?: boolean;
  glyph: string;
  /** 3D render shown on cards and the dossier header */
  emblem?: { src: string; alt: string; width: number; height: number };
  liveUrl?: string;
  repoUrl?: string;
  /** one-line ability, used on cards */
  ability: string;
  diet: string;
  stack?: string;
  /** dossier-only fields */
  dossier?: {
    index: string;
    statusLabel: string;
    problem: string;
    abilityLong: string;
    bullets: string[];
    stats: Stat[];
    feeding: { eats: string; upkeep: string; starved: string };
    recipe: { role: "main" | "aux"; name: string; why: string }[];
    record: { kind: RecordKind; title: string; desc: string }[];
    shots: Shot[];
    shotsHost: string;
    shotsNote: string;
    killerMove: { name: string; withName: string; withGlyph: string; withColor: string; effect: string };
    next: string;
  };
}
