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

## Chinese characters used

Every character on the site is decorative and sits next to an English label (screen readers skip them). They are drawn in Ma Shan Zheng brush script. After adding a new one, run `python3 scripts/subset-brush-font.py` so the font includes it.

### Identity and theme

| Character | Pinyin  | Meaning                                                | Where                                                                                                                                               |
| --------- | ------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 蛊        | gǔ      | Gu, the magical worm/insect of _Reverend Insanity_     | Red seal in the favicon (`app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `public/icon-*.png`) and in every share image; also in two quotes |
| 苏        | sū      | "Su", the first sound of Sulaiman, used as a name seal | Seal in the sticky nav and the hero                                                                                                                 |
| 魔        | mó      | demon, demonic                                         | Theme switch: Demonic cultivator                                                                                                                    |
| 正        | zhèng   | upright, righteous                                     | Theme switch: Righteous cultivator                                                                                                                  |
| 本命      | běnmìng | "life-bound", the vital Gu tied to its owner's life    | Badge on Myriad Voices Gu (home and its dossier)                                                                                                    |
| 境        | jìng    | realm, a cultivation stage                             | "The ascent" section header (Rank 1 → 5)                                                                                                            |
| 爆        | bào     | burst, explode                                         | 404 page; "Self-detonated" project status                                                                                                           |
| 全        | quán    | all                                                    | "All" filter in Lesser Gu                                                                                                                           |

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
