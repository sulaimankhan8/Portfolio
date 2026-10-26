"""Rebuild app/fonts/ma-shan-zheng-subset.woff2 from the Chinese characters used in the source.

Ma Shan Zheng ships as ~100 unicode-range slices (~800 KB for this site's glyphs).
This script finds every CJK character in app/, components/ and content/, pulls only
those glyphs out of the @fontsource/ma-shan-zheng slices, and merges them into one
small WOFF2.

    pip install fonttools brotli
    npm i -D @fontsource/ma-shan-zheng   # source slices only, not imported by the app
    python3 scripts/subset-brush-font.py
"""

import glob
import re
from pathlib import Path

from fontTools import subset
from fontTools.merge import Merger
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "node_modules/@fontsource/ma-shan-zheng"
OUT = ROOT / "app/fonts/ma-shan-zheng-subset.woff2"
TMP = ROOT / ".font-tmp"

chars = set()
for pattern in ("app/**/*.ts*", "components/**/*.tsx", "content/*.ts"):
    for f in glob.glob(str(ROOT / pattern), recursive=True):
        chars |= set(re.findall(r"[㐀-鿿]", Path(f).read_text(encoding="utf-8")))
need = {ord(c) for c in chars} | {0x20}
print(f"{len(chars)} characters: {''.join(sorted(chars))}")

css = (SRC / "index.css").read_text()
TMP.mkdir(exist_ok=True)
parts = []
for block in re.findall(r"@font-face\s*{(.*?)}", css, re.S):
    url = re.search(r"url\(\./files/([^)]+\.woff2)\)", block)
    rng = re.search(r"unicode-range:\s*([^;]+);", block)
    if not url or not rng:
        continue
    cps = set()
    for part in rng.group(1).split(","):
        part = part.strip().replace("U+", "")
        if "-" in part:
            a, b = part.split("-")
            cps |= set(range(int(a, 16), int(b, 16) + 1))
        else:
            cps.add(int(part, 16))
    hit = need & cps
    if not hit:
        continue
    font = TTFont(SRC / "files" / url.group(1))
    font.flavor = None
    opts = subset.Options()
    opts.layout_features = []
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=hit)
    sub.subset(font)
    out = TMP / url.group(1).replace(".woff2", ".ttf")
    font.save(out)
    parts.append(str(out))

merged = Merger().merge(parts)
merged.flavor = "woff2"
OUT.parent.mkdir(parents=True, exist_ok=True)
merged.save(OUT)
for p in parts:
    Path(p).unlink()
TMP.rmdir()
print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")
