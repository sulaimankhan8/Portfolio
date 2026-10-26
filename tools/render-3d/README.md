# render-3d

The three.js scene behind `public/hero/hero.webp` and `public/gu/*.webp`.

```bash
cd tools/render-3d
npm init -y && npm i three@0.169.0 playwright
npx playwright install chromium
python3 -m http.server 8811 &      # serves render.html + node_modules
node render.js                     # writes PNGs to ../assets/
```

Scenes: `?scene=hero` (add `&norain=1` — the site animates rain in CSS), `?scene=worm`, `?scene=crystal&c=<hex>[&rings=1]`, `?scene=seal`.
Convert outputs to WebP before putting them in `public/`.
