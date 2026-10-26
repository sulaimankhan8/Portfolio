# Sulaiman's Aperture — portfolio

Personal portfolio for Sulaiman Khan (backend engineer), themed on the web novel _Reverend Insanity_: every project is a **Gu**, ranked 1–9 by scope, coloured by its "essence", grouped by "path" (domain).

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4 (`@theme` tokens in `app/globals.css`)
- Fonts via `next/font/local` in `app/layout.tsx`: Cormorant, Inter and Plex Mono from the `@fontsource` packages; Ma Shan Zheng is a ~25 KB subset in `app/fonts/` (rebuild with `python3 scripts/subset-brush-font.py` whenever you add new Chinese characters)
- Static site: `/`, `/gu/[slug]` and their share images are prerendered
- Client components only: `LesserGu` (filter), `Gallery` (dossier screens), `Summon` (mailto + copy email), `StickyNav`, `Reveal`, `RainStarter`
- Vercel Analytics + Speed Insights in the layout (only report on Vercel)

## Commands

- `npm run dev` — local dev on :3000
- `npm run build` — must pass before any commit
- `npm run lint`, `npm run format:check`
- `npm test` — Playwright smoke + axe accessibility tests (both themes), desktop and Pixel 7 (needs `npx playwright install chromium` once; builds must exist: runs `npm run start` on :3100)
- `npm run lhci` — Lighthouse CI on `/` and `/gu/myriad-voices`
- CI: `.github/workflows/ci.yml` runs all of the above on push/PR

## Where things live

- `content/` — ALL copy and data. `gu.ts` (projects; entries with `dossier` get a page), `profile.ts` (highlights, ascent ranks, experience, battles, education, skills), `essence.ts` (rank colours, paths, statuses), `site.ts` (name, links, email, nav)
- `components/ui.tsx` — Button, RankBadge, StatusTag, Glyph, SectionHeader, Seal, BrowserFrame, StatStrip
- `components/home/` — home sections; `components/dossier/Gallery.tsx`; `components/Reveal.tsx`, `components/StickyNav.tsx`
- `app/opengraph-image.tsx`, `app/gu/[slug]/opengraph-image.tsx` + `lib/og.tsx` — share images (satori can't read WebP: PNG/JPEG sources live in `assets/og/`)
- `public/hero` (hero + rain tiles), `public/gu` (3D renders), `public/shots` (app screenshots)
- `tests/` — `smoke.spec.ts`, `a11y.spec.ts`
- `tools/render-3d/` — the three.js scene that produced the hero and Gu renders (see its README)

## Themes — "cultivation paths"

- Two themes, switched by the floating `ThemeSwitch` at the bottom of every page: **Demonic cultivator** (default, dark: ink, blood red, red-moon hero with rain) and **Righteous cultivator** (light: mist ground, ink text, gold fills, azure/jade accents, daylight ink-wash hero, no rain).
- Implemented as CSS variables: the `@theme` block in `app/globals.css` holds the demonic values; `:root[data-theme="righteous"]` overrides them. Never hard-code hex in components — use tokens or `var(--color-…)` (essence/status colours in `content/essence.ts` are CSS vars; `hex` there is only for OG images).
- Choice is stored in `localStorage["cultivation-path"]`; `themeScript` in `<head>` applies it before first paint (no flash).
- Hero images: `public/hero/hero.webp` (demonic) and `hero-righteous.webp` (render with `?scene=hero&norain=1&pal=righteous`).
- Hero motion per path: demonic = rain + red lightning (`.fx-lightning`); righteous = drifting cloud layers (`public/hero/clouds-*.png`, `.clouds`) + pulsing azure qi (`.fx-aura`). All opacity/transform-only, started after load by `RainStarter`, off under reduced motion.
- Hanging-scroll quotes: `content/quotes.ts`, three per path, cross-fading every 8 s. New characters → re-run `scripts/subset-brush-font.py`.
- Both themes are covered by the axe tests; keep text ≥ 4.5:1 on `--color-ink`, `--color-void` and `--color-ash`.

## Design rules (Gu Ink)

- Colours only from tokens: ink/void/ash/line grounds, bone/mist text, blood (fills), ember (red text), jade (alive/focus), gold (rank 7+ / vital), r1–r5 essence colours. Body text never red.
- Type: `font-display` (Cormorant) for headings, `font-sans` (Inter) body, `font-mono` caps for labels, `font-brush` (Ma Shan Zheng) for 1–4 decorative hanzi — always `aria-hidden` with English beside it.
- Every lore term sits next to a plain-English line (recruiters haven't read the novel).
- Sharp corners (radius 0), hairline borders, glows instead of shadows, one accent per view.
- Motion respects `prefers-reduced-motion`. Animate only transform/opacity (the rain once animated background-position and cost ~2 s of main thread on mobile).

## Performance notes

- Lighthouse (local, simulated mobile): ~84–89 performance, 100 accessibility, 100 SEO; desktop 100. CI warns below 90 but doesn't fail. Re-measure on the deployed Vercel URL with PageSpeed Insights.
- Rain starts after load + idle (`RainStarter`); below-fold sections use `content-visibility: auto` via `.reveal`.

## SEO & sharing

- Metadata lives in `app/layout.tsx` (site-wide) and `generateMetadata` in `app/gu/[slug]/page.tsx`. Search/preview text is `SITE.description` (plain English); the lore tagline is only on the page.
- `SITE.url`: `NEXT_PUBLIC_SITE_URL` → Vercel's production URL → localhost. Canonicals, sitemap and share-image URLs are built from it.
- JSON-LD: Person + WebSite + ProfilePage on `/`, BreadcrumbList + CreativeWork on each dossier.
- Icons: `app/icon.svg` (the 蛊 seal), `app/favicon.ico` (16/32/48, RGBA), `app/apple-icon.png`, `public/icon-{192,512,maskable-512}.png` for `app/manifest.ts`.
- Share images: `app/opengraph-image.tsx`, `app/gu/[slug]/opengraph-image.tsx`; `twitter-image.tsx` re-exports them. Check them with `curl localhost:3000/opengraph-image -o og.png`.

## Credits

- Music: `lib/music.ts` (Web Audio, gapless loops, crossfade on path switch) + `components/SoundToggle.tsx` (floating button, bottom-right; rendered in `app/layout.tsx`). Tracks are read from `MUSIC` in `content/credits.ts` (`path` + `file`), so anything that plays is credited. Each file needs `.webm` (Opus 64k) and `.m4a` (AAC 96k) in `public/audio/`, loudness-matched to about -20 LUFS. On by default but starts only on the first click/tap/key (browser autoplay rules) unless `navigator.getAutoplayPolicy` says sound is allowed; muting is saved in `localStorage["cultivation-sound"]`. Nothing loads until playback starts.
- Footer credits come from `content/credits.ts`: the Reverend Insanity fan-tribute note, music, fonts, art. Any music file added to the site must have an entry; keep CC BY credits visible.

## Facts policy

Only real numbers from the résumé/projects. Discord screenshots use sample chat data (the dossier says so). Don't invent metrics.

## Still open

- Rank 2 date in `content/profile.ts` (month intern → full-time) is still just "2025"
- Custom domain → set `NEXT_PUBLIC_SITE_URL`
- Stretch: live React Three Fiber hero (only if mobile Lighthouse stays ≥ 90), Gu Codex page
