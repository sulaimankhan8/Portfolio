const { chromium } = require('playwright');
const jobs = [
  ['hero', 'scene=hero&w=2400&h=1360'],
  ['gu_worm', 'scene=worm&w=1100&h=1100'],
  ['gu_netz', 'scene=crystal&c=e0b341&rings=1&w=1000&h=1000'],
  ['gu_seal', 'scene=seal&w=1100&h=1000'],
  ['gu_r1', 'scene=crystal&c=6fbf8a&w=800&h=800'],
  ['gu_r2', 'scene=crystal&c=e0664e&w=800&h=800'],
  ['gu_r3', 'scene=crystal&c=c9cdd3&w=800&h=800'],
  // Lesser Gu, one each
  ['gu_heavens-eye', 'scene=eye&w=900&h=900'],
  ['gu_gold-sniffing', 'scene=sniffer&w=900&h=900'],
  ['gu_truth-seeking', 'scene=scale&w=900&h=900'],
  ['gu_silent-link', 'scene=mesh&w=900&h=900'],
  ['gu_bookworm', 'scene=bookworm&w=900&h=900'],
  ['gu_elimination', 'scene=elimination&w=900&h=900'],
];
// `node render.js eye bookworm` renders only jobs whose name or query matches
const only = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const [name, qs] of jobs.filter(([n, q]) => !only.length || only.some((o) => n.includes(o) || q.includes('scene=' + o + '&')))) {
    const [w, h] = [/w=(\d+)/.exec(qs)[1], /h=(\d+)/.exec(qs)[1]].map(Number);
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.on('console', m => { if (m.type() === 'error') console.log(name, 'ERR', m.text()); });
    p.on('pageerror', e => console.log(name, 'PAGEERR', e.message));
    await p.goto('http://localhost:8811/render.html?' + qs);
    try { await p.waitForFunction(() => window.__done, null, { timeout: 120000 }); } catch (e) { console.log(name, 'timeout'); }
    await p.screenshot({ path: './out/' + name + '.png', omitBackground: name !== 'hero' });
    console.log('ok', name);
    await p.close();
  }
  await b.close();
})();
