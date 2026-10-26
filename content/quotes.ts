/** Vertical scroll quotes in the hero. Each path cycles through its own three
 *  (see .quote-* in globals.css). Original lines written in Reverend Insanity's vocabulary
 *  (Gu, refinement, apertures, blessed lands) — not quotations from the novel.
 *  After adding characters, re-run scripts/subset-brush-font.py. */
export const QUOTES = {
  demonic: [
    { zh: "炼蛊 炼人 炼天地", en: "Refine Gu. Refine people. Refine heaven and earth." },
    { zh: "永生之路 唯我独行", en: "On the road to eternal life, I walk alone." },
    { zh: "逆天而行 不问正邪", en: "Walk against heaven; ask not who is righteous or demonic." },
  ],
  righteous: [
    { zh: "以蛊护道 以道护人", en: "Gu guard the path; the path guards the people." },
    { zh: "天意昭昭 正道长存", en: "Heaven’s will is plain; the righteous path endures." },
    { zh: "福地洞天 守护苍生", en: "Blessed lands and grotto-heavens — kept for every living being." },
  ],
} as const;
