# Sulaiman's Aperture

Portfolio of Sulaiman Khan — backend software engineer — inspired by _Reverend Insanity_.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

The contact section has no backend: "Open in mail app" opens the visitor's own mail app with their subject and message filled in, and "Copy email" copies the address. Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) once you have a domain, so share links and the sitemap use it.

## Checks

```bash
npm run lint            # ESLint
npm run format:check    # Prettier
npx playwright install chromium   # once
npm test                # smoke + accessibility tests (both themes), desktop and mobile
npm run lhci            # Lighthouse CI (needs a build first)
```

The same checks run on every push and pull request via `.github/workflows/ci.yml`.

Deploy: push to GitHub and import the repo on Vercel. Edit content in `content/`. See `CLAUDE.md` for structure and design rules.

## Credits

Inspired by [_Reverend Insanity_](https://en.wikipedia.org/wiki/Reverend_Insanity), the web novel by Gu Zhen Ren. This is an unofficial fan tribute, not affiliated with the author or publishers; the Chinese quotes are original lines written in its spirit.

The footer credits live in `content/credits.ts`. Every track the site plays must be listed there; CC BY tracks need title, author, source and licence shown for as long as they are used.

| Use       | Track      | Author         | Licence   | Source                                         | Changes                                                                | File                                 |
| --------- | ---------- | -------------- | --------- | ---------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------ |
| Righteous | Lotus Pond | Bite Me Games  | CC0       | https://bitemegames.itch.io/chinese-game-music | Loop version, level-matched                                            | `public/audio/lotus-pond.{webm,m4a}` |
| Demonic   | Dark Zen   | Tsorthan Grove | CC BY 4.0 | https://opengameart.org/content/dark-zen       | 90 s excerpt from 2:40, crossfaded into a seamless loop, level-matched | `public/audio/dark-zen.{webm,m4a}`   |

Music is on by default. Browsers don't allow sound before the visitor interacts, so it starts on their first click, tap or key press (or straight away where the browser allows autoplay, e.g. Firefox with autoplay enabled). The floating 音 button at the bottom-right mutes it, and muting is remembered on later visits. Nothing is downloaded until playback starts, and only the current path's track (about 0.6–0.9 MB) is fetched; switching path crossfades to the other track.

Fonts (Cormorant Garamond, Inter, IBM Plex Mono, Ma Shan Zheng) are under the SIL Open Font License. 3D renders and hero scenes were made for this site with three.js (`tools/render-3d`).

## Chinese characters used

Every character on the site is decorative and sits next to an English label (screen readers skip them). They are drawn in Ma Shan Zheng brush script. After adding a new one, run `python3 scripts/subset-brush-font.py` so the font includes it.

### Identity and theme

| Character | Pinyin  | Meaning                                                | Where                                                                                                                                                                                   |
| --------- | ------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 蛊        | gǔ      | Gu, the magical worm/insect of _Reverend Insanity_     | Red seal in the favicon (`app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `public/icon-*.png`) and in every share image; also in two quotes; "Inspired by" credit in the footer |
| 苏        | sū      | "Su", the first sound of Sulaiman, used as a name seal | Seal in the sticky nav and the hero, and in the footer                                                                                                                                  |
| 魔        | mó      | demon, demonic                                         | Theme switch: Demonic cultivator; marks the demonic track in the footer music credits                                                                                                   |
| 正        | zhèng   | upright, righteous                                     | Theme switch: Righteous cultivator; marks the righteous track in the footer music credits                                                                                               |
| 本命      | běnmìng | "life-bound", the vital Gu tied to its owner's life    | Badge on Myriad Voices Gu (home and its dossier)                                                                                                                                        |
| 境        | jìng    | realm, a cultivation stage                             | "The ascent" section header (Rank 1 → 5)                                                                                                                                                |
| 爆        | bào     | burst, explode                                         | 404 page; "Self-detonated" project status                                                                                                                                               |
| 全        | quán    | all                                                    | "All" filter in Lesser Gu                                                                                                                                                               |
| 致谢      | zhìxiè  | thanks, acknowledgements                               | Footer "Credits" heading                                                                                                                                                                |
| 音        | yīn     | sound, music                                           | Floating music button (bottom-right); footer "Music" credits                                                                                                                            |
| 炼        | liàn    | refine, craft                                          | Footer "Craft" credits (type and art); see Paths for its other uses                                                                                                                     |

### Numerals (section and chapter markers)

| Character | Pinyin | Meaning | Home page section                                                       | Dossier page chapter |
| --------- | ------ | ------- | ----------------------------------------------------------------------- | -------------------- |
| 一        | yī     | one     | Major Gu                                                                | Ability              |
| 二        | èr     | two     | Lesser Gu                                                               | Feeding              |
| 三        | sān    | three   | Sects joined                                                            | Gu recipe            |
| 四        | sì     | four    | Battle record                                                           | Refinement record    |
| 五        | wǔ     | five    | Cultivation (education); also the "Top 5 — Smart India Hackathon" badge | Killer move          |
| 六        | liù    | six     | Gu arsenal                                                              | —                    |
| 七        | qī     | seven   | Summon (contact)                                                        | —                    |

### Paths (project domains), in `content/essence.ts`

| Character | Pinyin | Meaning             | Path → domain                  | Used on                                                                    |
| --------- | ------ | ------------------- | ------------------------------ | -------------------------------------------------------------------------- |
| 力        | lì     | strength, force     | Strength → distributed systems | Myriad Voices Gu (Discord platform)                                        |
| 信        | xìn    | message, trust      | Information → EdTech / web     | Numeral Insight Gu (Netz)                                                  |
| 律        | lǜ     | law, rule           | Rule → security & legal-tech   | Blood Seal Gu (Signaturly / PactDoc)                                       |
| 智        | zhì    | wisdom              | Wisdom → AI / ML               | Heaven's Eye Gu (traffic), Truth-Seeking Gu (RAG)                          |
| 偷        | tōu    | steal               | Theft → scraping               | Gold-Sniffing Gu (jewellery scraper), Bookworm Gu (novel scraper)          |
| 宇        | yǔ     | space, the universe | Space → networks               | Silent Link Gu (BLE mesh); also the DevOps group in the arsenal            |
| 炼        | liàn   | refine, smelt       | Refinement → tools             | Elimination Gu (Gaussian extension); also the Backend group in the arsenal |

### Project status, in `content/essence.ts`

| Character | Pinyin | Meaning | Status                      |
| --------- | ------ | ------- | --------------------------- |
| 活        | huó    | alive   | Alive (live and maintained) |
| 眠        | mián   | sleep   | Dormant                     |
| 炼        | liàn   | refine  | In refinement (being built) |
| 爆        | bào    | explode | Self-detonated (abandoned)  |

### Killer moves (project pairings on the dossier pages)

| Character | Pinyin | Meaning       | Paired with                                                         |
| --------- | ------ | ------------- | ------------------------------------------------------------------- |
| 宇        | yǔ     | space         | Silent Link Gu, in Myriad Voices' "Unbroken Chorus"                 |
| 炼        | liàn   | refine        | Elimination Gu, in Numeral Insight's "Ten Thousand Solutions"       |
| 财        | cái    | wealth, money | Payment infrastructure (Docnish), in Blood Seal's "Sealed Contract" |

### Battle record (achievements), in `content/profile.ts`

| Character | Pinyin | Meaning           | Achievement                                            |
| --------- | ------ | ----------------- | ------------------------------------------------------ |
| 创        | chuàng | create, found     | Co-founder, Binary Battalions                          |
| 五        | wǔ     | five              | Top 5, Smart India Hackathon 2025 (internal)           |
| 战        | zhàn   | battle            | Semi-finalist, HackFiesta 6.0                          |
| 题        | tí     | question, problem | Organiser and question setter, Integral Prompt War 1.0 |

### Gu arsenal (skill groups), in `content/profile.ts`

| Character | Pinyin | Meaning          | Skill group              |
| --------- | ------ | ---------------- | ------------------------ |
| 炼        | liàn   | refine           | Backend                  |
| 宇        | yǔ     | space            | DevOps                   |
| 库        | kù     | storehouse       | Data (databases, queues) |
| 幻        | huàn   | illusion         | Frontend                 |
| 言        | yán    | speech, language | Languages                |
| 试        | shì    | test, try        | Testing & payments       |

### Hanging-scroll quotes (hero), in `content/quotes.ts`

These are original lines in the style of the novel, not quotes from it. Three show per theme, one at a time.

| Theme     | Quote             | Pinyin                              | Meaning                                                        |
| --------- | ----------------- | ----------------------------------- | -------------------------------------------------------------- |
| Demonic   | 炼蛊 炼人 炼天地  | liàn gǔ, liàn rén, liàn tiāndì      | Refine Gu. Refine people. Refine heaven and earth.             |
| Demonic   | 永生之路 唯我独行 | yǒngshēng zhī lù, wéi wǒ dú xíng    | On the road to eternal life, I walk alone.                     |
| Demonic   | 逆天而行 不问正邪 | nì tiān ér xíng, bú wèn zhèng xié   | Walk against heaven; ask not who is righteous or demonic.      |
| Righteous | 以蛊护道 以道护人 | yǐ gǔ hù dào, yǐ dào hù rén         | Gu guard the path; the path guards the people.                 |
| Righteous | 天意昭昭 正道长存 | tiānyì zhāozhāo, zhèngdào cháng cún | Heaven's will is plain; the righteous path endures.            |
| Righteous | 福地洞天 守护苍生 | fúdì dòngtiān, shǒuhù cāngshēng     | Blessed lands and grotto-heavens, kept for every living being. |

### Phrases, word by word

How each quote (and 本命) breaks down. Chinese has no spaces, so each line is split into its words; a word's characters are glossed in brackets.

**炼蛊 炼人 炼天地**: "Refine Gu. Refine people. Refine heaven and earth." (Demonic)

| Word   | Pinyin      | Meaning                                             |
| ------ | ----------- | --------------------------------------------------- |
| 炼蛊   | liàn gǔ     | refine Gu (炼 refine, smelt + 蛊 Gu)                |
| 炼人   | liàn rén    | refine people (人 person)                           |
| 炼天地 | liàn tiāndì | refine heaven and earth (天 heaven, sky + 地 earth) |

**永生之路 唯我独行**: "On the road to eternal life, I walk alone." (Demonic)

| Word | Pinyin    | Meaning                             |
| ---- | --------- | ----------------------------------- |
| 永生 | yǒngshēng | eternal life (永 forever + 生 life) |
| 之   | zhī       | of (links 永生 to 路)               |
| 路   | lù        | road                                |
| 唯   | wéi       | only                                |
| 我   | wǒ        | I, me                               |
| 独行 | dúxíng    | walk alone (独 alone + 行 walk, go) |

**逆天而行 不问正邪**: "Walk against heaven; ask not who is righteous or demonic." (Demonic)

| Word | Pinyin    | Meaning                                                   |
| ---- | --------- | --------------------------------------------------------- |
| 逆天 | nì tiān   | defy heaven (逆 go against + 天 heaven)                   |
| 而   | ér        | and so, thereby                                           |
| 行   | xíng      | walk, act                                                 |
| 不问 | bú wèn    | do not ask, do not care (不 not + 问 ask)                 |
| 正邪 | zhèng xié | righteous and heretical (正 upright + 邪 evil, heretical) |

**以蛊护道 以道护人**: "Gu guard the path; the path guards the people." (Righteous)

| Word | Pinyin | Meaning           |
| ---- | ------ | ----------------- |
| 以   | yǐ     | by means of, with |
| 蛊   | gǔ     | Gu                |
| 护   | hù     | protect, guard    |
| 道   | dào    | the path, the Dao |
| 人   | rén    | people            |

**天意昭昭 正道长存**: "Heaven's will is plain; the righteous path endures." (Righteous)

| Word | Pinyin   | Meaning                                                      |
| ---- | -------- | ------------------------------------------------------------ |
| 天意 | tiānyì   | the will of heaven (天 heaven + 意 intent, will)             |
| 昭昭 | zhāozhāo | clear, bright, plain for all to see                          |
| 正道 | zhèngdào | the righteous path (the Righteous Path faction in the novel) |
| 长存 | chángcún | endure forever (长 long + 存 exist)                          |

**福地洞天 守护苍生**: "Blessed lands and grotto-heavens, kept for every living being." (Righteous)

| Word | Pinyin    | Meaning                                                                                   |
| ---- | --------- | ----------------------------------------------------------------------------------------- |
| 福地 | fúdì      | blessed land (福 blessing, fortune + 地 land); a Gu Immortal's private realm in the novel |
| 洞天 | dòngtiān  | grotto-heaven (洞 cave + 天 heaven); a hidden paradise in Daoist lore                     |
| 守护 | shǒuhù    | guard, protect (守 keep watch + 护 protect)                                               |
| 苍生 | cāngshēng | all living beings, the common people (苍 vast, azure + 生 life)                           |

**致谢**: "Credits" (footer heading)

| Word | Pinyin | Meaning                                            |
| ---- | ------ | -------------------------------------------------- |
| 致谢 | zhìxiè | to express thanks (致 to send, extend + 谢 thanks) |

**本命**: "Vital" (badge on Myriad Voices Gu)

| Word | Pinyin  | Meaning                                                                                               |
| ---- | ------- | ----------------------------------------------------------------------------------------------------- |
| 本命 | běnmìng | life-bound, one's own life (本 root, origin + 命 life, fate); a vital Gu is bound to its owner's life |

### Characters inside images

| Character | Pinyin | Meaning   | Image                                                                                                                                                                                                                                           |
| --------- | ------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 律        | lǜ     | law, rule | Red imprint beside the silver seal in the Blood Seal Gu render: `public/gu/seal.webp`, plus `assets/og/seal.png` used by its share image (drawn by `tools/render-3d/render.html`)                                                               |
| 蛊        | gǔ     | Gu        | Favicon and app icons (`app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `public/icon-maskable-512.png`); seal in the generated share images (`/opengraph-image`, `/gu/*/opengraph-image`) |

The hero images, Gu crystal renders and app screenshots contain no Chinese text.

## Lore terms (English)

The site's English vocabulary is borrowed from _Reverend Insanity_. Every lore term has a plain-English line beside it on the page; this is the full map.

### Core ideas

| Term                         | In the novel                                                                                                     | On this site                                         | Where                                                                                                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gu                           | A living magical creature (worm, insect) that a Gu Master refines, feeds and uses; each one has a single ability | A project                                            | Everywhere                                                                                                                                               |
| Gu Master / cultivator       | Someone who raises and uses Gu to grow stronger                                                                  | Me, the engineer                                     | Theme switch, hero                                                                                                                                       |
| Aperture                     | The space inside a Gu Master's body where Gu live and essence is stored                                          | This site, my workspace                              | "Enter the aperture" (hero button), "Back to the aperture" (dossier and 404), "Outside the aperture" (hobbies box), "Linked apertures" (Blood Seal stat) |
| Rank 1–5                     | The ladder of mortal Gu Masters and Gu                                                                           | Career level, or a project's scope                   | The ascent, Gu cards, badges                                                                                                                             |
| Rank 6 · Immortal            | Beyond mortal ranks; Gu Immortals                                                                                | My flagship project, Myriad Voices                   | Vital Gu card and its dossier                                                                                                                            |
| Primeval essence             | The energy a Gu Master spends; its colour shows the rank                                                         | The colour of each rank                              | Rank badges, card glows                                                                                                                                  |
| Vital Gu (本命)              | The Gu bound to its owner's life                                                                                 | The flagship project                                 | Home "Major Gu", Myriad Voices dossier                                                                                                                   |
| Path                         | A school of power and its rules (Strength, Rule, Wisdom…)                                                        | A project's domain                                   | Gu cards, Lesser Gu filter                                                                                                                               |
| Refine / refinement          | Combining materials to create or upgrade a Gu                                                                    | Building and improving software                      | Tagline, statuses, dossiers                                                                                                                              |
| Feeding / starved            | A Gu must eat its specific food or it starves                                                                    | Inputs a system needs, and what happens without them | Dossier "Feeding", "Feeds on" on Lesser Gu cards                                                                                                         |
| Gu recipe                    | The materials a refinement needs                                                                                 | The tech stack                                       | Dossier chapter 三                                                                                                                                       |
| Killer move                  | Several Gu used together for one powerful effect                                                                 | Two projects combined                                | Dossier chapter 五                                                                                                                                       |
| Self-detonate                | A Gu destroying itself                                                                                           | An abandoned project; a missing page                 | Status tag, 404 page                                                                                                                                     |
| Sect                         | A clan or school that Gu Masters join                                                                            | An employer                                          | "Sects joined" (Experience)                                                                                                                              |
| Primeval stones              | The novel's currency                                                                                             | Money: production payments                           | Highlights                                                                                                                                               |
| Demonic / Righteous          | The novel's two great factions                                                                                   | The dark and light themes                            | Theme switch, quotes                                                                                                                                     |
| Blessed land / grotto-heaven | An Immortal's private realm                                                                                      | Only in a righteous quote                            | Hero quotes                                                                                                                                              |

### Ranks and essence colours

| Rank | Essence        | Colour on site | Ascent (career)                             | Projects at this rank                            |
| ---- | -------------- | -------------- | ------------------------------------------- | ------------------------------------------------ |
| 1    | Green Copper   | green          | Intern, Docnish (Jun 2025)                  | Bookworm Gu, Elimination Gu                      |
| 2    | Red Steel      | red            | Full-time Developer, Docnish (2025)         | Truth-Seeking Gu, Silent Link Gu                 |
| 3    | White Silver   | silver         | Project Co-Lead, Docnish (to Dec 2025)      | Blood Seal Gu, Heaven's Eye Gu, Gold-Sniffing Gu |
| 4    | Yellow Gold    | gold           | Backend Developer, Techdock Labs (Apr 2026) | Numeral Insight Gu                               |
| 5    | Purple Crystal | violet         | Backend Engineer, distributed systems (now) | —                                                |
| 6    | Immortal       | gold           | "Rank 6 is next"                            | Myriad Voices Gu (vital)                         |

### Paths

| Path        | Domain                | Projects                          |
| ----------- | --------------------- | --------------------------------- |
| Strength    | Distributed systems   | Myriad Voices Gu                  |
| Information | EdTech / web          | Numeral Insight Gu                |
| Rule        | Security & legal-tech | Blood Seal Gu                     |
| Wisdom      | AI / ML               | Heaven's Eye Gu, Truth-Seeking Gu |
| Theft       | Scraping              | Gold-Sniffing Gu, Bookworm Gu     |
| Space       | Networks              | Silent Link Gu                    |
| Refinement  | Tools                 | Elimination Gu                    |

### Project statuses

| Status         | Meaning                         |
| -------------- | ------------------------------- |
| Alive          | Live and maintained             |
| Dormant        | Finished or paused; not running |
| In refinement  | Being built                     |
| Self-detonated | Abandoned                       |

### The Gu (projects)

| Gu name            | Why the name                    | Real project                                  | Rank · path · status         |
| ------------------ | ------------------------------- | --------------------------------------------- | ---------------------------- |
| Myriad Voices Gu   | Thousands of voices at once     | Discord-style platform: chat, voice and video | 6 (vital) · Strength · Alive |
| Numeral Insight Gu | Sees through numbers            | Netz, interactive maths learning              | 4 · Information · Alive      |
| Blood Seal Gu      | A contract sealed in blood      | Signaturly → PactDoc, e-signatures            | 3 · Rule · In refinement     |
| Heaven's Eye Gu    | An eye watching from above      | Smart traffic intelligence                    | 3 · Wisdom · Dormant         |
| Gold-Sniffing Gu   | Sniffs out gold                 | Jewellery price scraper                       | 3 · Theft · Alive            |
| Truth-Seeking Gu   | Finds the truth between sources | RAG conflict-resolution assistant             | 2 · Wisdom · In refinement   |
| Silent Link Gu     | Connects without a network      | BLE emergency-vehicle mesh                    | 2 · Space · Dormant          |
| Bookworm Gu        | Eats books                      | Web-novel scraper                             | 1 · Theft · Dormant          |
| Elimination Gu     | Gaussian elimination            | Gaussian solver browser extension             | 1 · Refinement · Dormant     |

### Killer moves

| Killer move            | Combines                                    | Meaning                                                               |
| ---------------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| Unbroken Chorus        | Myriad Voices + Silent Link                 | Chat that keeps working without internet, over the BLE mesh (planned) |
| Ten Thousand Solutions | Numeral Insight + Elimination               | The extension's solver became the core of Netz                        |
| Sealed Contract        | Blood Seal + Docnish payment infrastructure | Rupee-priced plans built on the earlier payments work                 |

### Section names

| Lore name            | Plain meaning                              | Page              |
| -------------------- | ------------------------------------------ | ----------------- |
| The ascent           | Career progression, Rank 1 → 5             | Home              |
| Major Gu             | Main projects                              | Home              |
| Lesser Gu            | Smaller builds and experiments             | Home              |
| Sects joined         | Work experience                            | Home              |
| Battle record        | Achievements and hackathons                | Home              |
| Cultivation          | Education                                  | Home              |
| Outside the aperture | Hobbies (gaming ranks, Minecraft redstone) | Home              |
| Gu arsenal           | Skills                                     | Home              |
| Summon               | Contact                                    | Home, hero button |
| Dossier              | Project case-study page                    | `/gu/[slug]`      |
| Ability              | What it does                               | Dossier           |
| Feeding              | Inputs and upkeep                          | Dossier           |
| Gu recipe            | Tech stack                                 | Dossier           |
| Refinement record    | How it was built                           | Dossier           |
| Killer move          | Pairing with another project               | Dossier           |
| Activate · live demo | Open the live app                          | Dossier           |
| Next Gu →            | Next project                               | Dossier           |

### Inside the dossiers

| Term                      | Plain meaning                         |
| ------------------------- | ------------------------------------- |
| Main material             | Core technology                       |
| Auxiliary                 | Supporting technology                 |
| Feeds on / This one needs | What the system takes in              |
| Upkeep                    | What keeps it running                 |
| If starved                | What happens when an input is missing |
| Raw materials             | Starting point of the build           |
| Refined                   | A milestone that was built            |
| Fed · proven              | Tested or used in practice            |
| Next refinement           | Planned next step                     |

### Stat labels

| Lore label            | Value   | Plain meaning                                               |
| --------------------- | ------- | ----------------------------------------------------------- |
| Primeval stones moved | 32K+    | Production payments through Cashfree & Razorpay in 4 months |
| Masters served        | 300K    | Monthly users the Docnish system was built to handle        |
| Voices per second     | ~16K    | Messages/sec sustained in load tests of the chat platform   |
| Disciples             | 5,000+  | Monthly learners on Netz at its peak                        |
| Snowflake marks       | 64-bit  | Distributed, time-ordered message IDs                       |
| Ripple window         | 250 ms  | Reaction fan-out coalescing under heavy load                |
| Scrolls written       | 8       | Deep-dive design docs                                       |
| Sect master           | Founder | Built and run Netz solo since Aug 2024                      |
| Always at hand        | PWA     | Installable, works like an app                              |
| Found by seekers      | SEO     | Tuned for search, speed and engagement                      |
| Linked apertures      | 3       | API, signing app and operator admin                         |
| Tongues               | 2       | Signing in English and Hindi                                |
| India-first           | ₹       | Rupee pricing; templates for rentals, societies, HR         |
| Tested in battle      | E2E     | Browser tests drive the real app in Chrome                  |

### Other lines

| Line                                                                                          | Where                | Meaning                                                                   |
| --------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------- |
| "I refine backends the way Gu are refined: under pressure, until only what survives remains." | Hero tagline         | I build backends through load and iteration and keep what holds up        |
| "Keeping only what earned its place"                                                          | The ascent           | Skills kept from each career step                                         |
| "This Gu self-detonated."                                                                     | 404 page             | The page doesn't exist                                                    |
| "State the problem — if it's worth refining, I'll answer."                                    | Summon               | Contact me about a backend problem                                        |
| "Immortal in MLBB. Grandmaster in League."                                                    | Outside the aperture | Real game ranks (Mobile Legends, League of Legends), a joke on "Immortal" |
