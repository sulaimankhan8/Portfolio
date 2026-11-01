"""Shrink the Latin web fonts to the characters this site uses (about -40% bytes).

Fonts are the biggest thing a phone downloads before first paint, so smaller files
mean a faster Largest Contentful Paint. Writes app/fonts/*.woff2 (used by app/layout.tsx).
Re-run after adding text with new symbols:

    pip install fonttools brotli
    python3 scripts/subset-latin-fonts.py
"""

import glob
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NM = ROOT / "node_modules"
OUT = ROOT / "app/fonts"

FONTS = {
    # out name: (source, variable-axis limits or None)
    "inter-var.woff2": ("@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", "wght=400:700"),
    "cormorant-700.woff2": ("@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff2", None),
    "cormorant-500.woff2": ("@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2", None),
    "cormorant-500-italic.woff2": ("@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2", None),
    "plex-mono-400.woff2": ("@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", None),
    "plex-mono-500.woff2": ("@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", None),
}

# Basic Latin + Latin-1 always; plus every other non-CJK symbol found in the source
extra = set()
for pattern in ("app/**/*.ts*", "components/**/*.tsx", "content/*.ts", "lib/*.ts*"):
    for f in glob.glob(str(ROOT / pattern), recursive=True):
        extra |= {c for c in Path(f).read_text(encoding="utf-8") if ord(c) > 0xFF and not re.match(r"[㐀-鿿]", c)}
codes = ["U+0020-007E", "U+00A0-00FF", "U+2018-201D", "U+2026"] + [f"U+{ord(c):04X}" for c in sorted(extra)]
unicodes = ",".join(codes)
features = "kern,liga,calt,ccmp,locl,mark,mkmk"

OUT.mkdir(exist_ok=True)
for name, (src, axes) in FONTS.items():
    path = NM / src
    if not path.exists():
        sys.exit(f"missing {path} — run npm install")
    with tempfile.TemporaryDirectory() as tmp:
        if axes:
            inst = Path(tmp) / "inst.ttf"
            subprocess.run([sys.executable, "-m", "fontTools.varLib.instancer", str(path), axes, "-o", str(inst), "-q"], check=True)
            path = inst
        subprocess.run(
            [sys.executable, "-m", "fontTools.subset", str(path), f"--unicodes={unicodes}", f"--layout-features={features}",
             "--flavor=woff2", f"--output-file={OUT / name}"],
            check=True,
        )
    print(f"{name}: {(OUT / name).stat().st_size // 1024} KB")
print("characters beyond Latin-1:", "".join(sorted(extra)))
