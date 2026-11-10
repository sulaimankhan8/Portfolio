"""Refreshes the live parts of the profile README.

- assets/card-dark.svg, assets/card-light.svg: the system-info card (static facts + live GitHub numbers)
- README.md, between the shipping markers: the latest real commits on my main projects

Runs daily in .github/workflows/update.yml. Locally: GITHUB_TOKEN=$(gh auth token) python scripts/update.py
Standard library only.
"""

import base64
import datetime as dt
import html
import json
import os
import re
import urllib.request
from pathlib import Path

USER = "sulaimankhan8"
ROOT = Path(__file__).resolve().parent.parent
TOKEN = os.environ.get("GITHUB_TOKEN", "")

# repos that feed "Recently shipped", with the names they go by on the portfolio
PROJECTS = {
    "demo-discord": "Myriad Voices",
    "Netz": "Netz",
    "Signaturly": "PactDoc",
    "Portfolio": "Portfolio",
    "smart_traffic": "Smart Traffic",
}

# static facts: only real numbers from the résumé
FACTS = [
    ("Role", "Backend Software Engineer"),
    ("Company", "Techdock Labs · since Apr 2026"),
    ("Location", "Lucknow, India"),
    ("Focus", "Real-time systems, payments, queues"),
    ("Languages", "TypeScript, JavaScript, Python, Go, C++"),
    ("Stack.Backend", "Node.js, Express, FastAPI, Socket.IO"),
    ("Stack.Data", "PostgreSQL, MongoDB, Redis, BullMQ"),
    ("Stack.Ops", "Docker, GitHub Actions, AWS, Nginx"),
    None,
    "Shipped",
    ("Payments", "32K+ in 4 months (Cashfree, Razorpay)"),
    ("Chat throughput", "~16K msg/s in load tests"),
    ("Learners", "5,000+ a month on Netz at its peak"),
    None,
    "Contact",
    ("Email", "sulaimanclass12b@gmail.com"),
    ("LinkedIn", "in/suleman-khan-b4ab2b275"),
    ("Portfolio", "portfolio-five-navy-sdnb8nj53u.vercel.app"),
]

THEMES = {
    "dark": dict(bg="#121315", border="#2c2a28", art="#e5554a", key="#e5554a", value="#ece4d4",
                 dots="#4a443f", head="#a8a196", live="#5fd3a0", muted="#a8a196"),
    "light": dict(bg="#f9fbf7", border="#c9d1ca", art="#7a5810", key="#1e6e8c", value="#16201b",
                  dots="#8e9a92", head="#4a5751", live="#1a6b4c", muted="#4a5751"),
}

WIDTH_CHARS = 78  # right-hand column width, in monospace characters


def get(url: str, body: dict | None = None):
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode() if body else None,
        headers={"User-Agent": f"{USER}-profile", "Accept": "application/vnd.github+json"},
    )
    if TOKEN:
        req.add_header("Authorization", f"Bearer {TOKEN}")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def short_date(iso: str) -> str:
    d = dt.date.fromisoformat(iso[:10])
    return f"{d:%b} {d.day}"


def live_stats() -> dict:
    user = get(f"https://api.github.com/users/{USER}")
    stats = {"repos": user["public_repos"], "contributions": None, "last_push": None}
    if TOKEN:
        q = {"query": f'{{user(login:"{USER}"){{contributionsCollection{{contributionCalendar{{totalContributions}}}}}}}}'}
        data = get("https://api.github.com/graphql", q)
        stats["contributions"] = data["data"]["user"]["contributionsCollection"]["contributionCalendar"]["totalContributions"]
    for repo in get(f"https://api.github.com/users/{USER}/repos?sort=pushed&per_page=10"):
        if not repo["fork"] and repo["name"] != USER:
            name = PROJECTS.get(repo["name"], repo["name"])
            stats["last_push"] = f"{name} · {short_date(repo['pushed_at'])}"
            break
    return stats


CONVENTIONAL = re.compile(r"^(feat|fix|perf|refactor)(\([^)]*\))?!?:\s*(.+)$", re.I)


def shipped(limit: int = 6, per_repo: int = 2) -> list[dict]:
    items = []
    for repo, name in PROJECTS.items():
        taken = 0
        for c in get(f"https://api.github.com/repos/{USER}/{repo}/commits?per_page=30"):
            msg = c["commit"]["message"].split("\n")[0].strip()
            msg = re.sub(r"^[\d.]+:?\s*", "", msg)  # drop version prefixes like "1.05.090:" or "94 "
            m = CONVENTIONAL.match(msg)
            if not m:
                continue
            text = m.group(3).strip()
            text = text[0].upper() + text[1:]
            if len(text) > 90:
                text = text[:87].rstrip() + "…"
            items.append({"project": name, "repo": repo, "text": text, "url": c["html_url"],
                          "date": c["commit"]["author"]["date"]})
            taken += 1
            if taken == per_repo:
                break
    items.sort(key=lambda i: i["date"], reverse=True)
    return items[:limit]


def kv(key: str, value: str) -> tuple[str, str, str]:
    dots = max(2, WIDTH_CHARS - len(key) - len(value) - 3)
    return key + ":", " " + "." * dots + " ", value


def card(theme: str, stats: dict, today: dt.date) -> str:
    t = THEMES[theme]
    font = base64.b64encode((ROOT / "assets/fonts/plex-mono-400.woff2").read_bytes()).decode()
    art = (ROOT / "assets/ascii.txt").read_text(encoding="utf-8").splitlines()

    lines: list = [("title",)]
    lines += [kv(*f) if isinstance(f, tuple) else (("blank",) if f is None else ("head", f)) for f in FACTS]
    lines += [("blank",), ("head", "GitHub · live")]
    lines.append(kv("Public repos", str(stats["repos"])) + ("live",))
    if stats["contributions"] is not None:
        lines.append(kv("Contributions", f"{stats['contributions']:,} in the last 12 months") + ("live",))
    if stats["last_push"]:
        lines.append(kv("Last push", stats["last_push"]) + ("live",))

    lh, fs, x0, y0 = 22, 15, 470, 52
    h = y0 + lh * len(lines) + 46
    out = []
    for i, ln in enumerate(lines):
        y = y0 + i * lh
        if ln[0] == "title":
            out.append(f'<text x="{x0}" y="{y}"><tspan fill="{t["key"]}">sulaiman</tspan><tspan fill="{t["muted"]}">@</tspan>'
                       f'<tspan fill="{t["key"]}">khan</tspan> <tspan fill="{t["dots"]}">{"-" * (WIDTH_CHARS - 14)}</tspan></text>')
        elif ln[0] == "blank":
            continue
        elif ln[0] == "head":
            label = f"- {ln[1]} "
            out.append(f'<text x="{x0}" y="{y}"><tspan fill="{t["head"]}">{html.escape(label)}</tspan>'
                       f'<tspan fill="{t["dots"]}">{"-" * (WIDTH_CHARS - len(label))}</tspan></text>')
        else:
            key, dots, value = ln[:3]
            vcol = t["live"] if len(ln) > 3 else t["value"]
            out.append(f'<text x="{x0}" y="{y}"><tspan fill="{t["key"]}">{html.escape(key)}</tspan>'
                       f'<tspan fill="{t["dots"]}">{dots}</tspan><tspan fill="{vcol}">{html.escape(value)}</tspan></text>')

    # the seal is drawn smaller than the text so each character cell stays close to square
    alh = 13.5
    art_top = (h - alh * len(art)) / 2 + 8
    art_svg = "".join(
        f'<text x="56" y="{art_top + i * alh:.1f}" class="a" fill="{t["art"]}">{html.escape(row)}</text>' for i, row in enumerate(art)
    )
    stamp = f"refreshed {today:%b} {today.day}, {today.year} by GitHub Actions"
    summary = "; ".join(f"{k}: {v}" for k, v in (f for f in FACTS if isinstance(f, tuple)))
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 {h}" width="1280" height="{h}" role="img" aria-labelledby="t">
<title id="t">Sulaiman Khan. {html.escape(summary)}. {stats['repos']} public repos.</title>
<style>
@font-face{{font-family:M;src:url(data:font/woff2;base64,{font}) format('woff2')}}
text{{font-family:M,ui-monospace,Consolas,monospace;font-size:{fs}px;white-space:pre}}
.s{{font-size:12px}}
.a{{font-size:11px}}
</style>
<rect x=".5" y=".5" width="1279" height="{h - 1}" fill="{t['bg']}" stroke="{t['border']}"/>
<rect x="0" y="0" width="1280" height="2" fill="{t['key']}"/>
{art_svg}
{''.join(out)}
<text x="{x0}" y="{h - 22}" class="s" fill="{t['muted']}">{stamp}</text>
</svg>
"""


def readme_section(items: list[dict], today: dt.date) -> str:
    rows = [f"- **[{i['project']}](https://github.com/{USER}/{i['repo']})** — [{html.escape(i['text'])}]({i['url']}) <sub>{short_date(i['date'])}</sub>"
            for i in items]
    return "\n".join(rows) + f"\n\n<sub>Pulled from my commits by a GitHub Action · last refreshed {today:%b} {today.day}, {today.year}</sub>"


def main():
    today = dt.date.today()
    stats = live_stats()
    for theme in THEMES:
        (ROOT / f"assets/card-{theme}.svg").write_text(card(theme, stats, today), encoding="utf-8")

    readme = ROOT / "README.md"
    text = readme.read_text(encoding="utf-8")
    new = re.sub(r"(<!-- shipping:start -->).*?(<!-- shipping:end -->)",
                 lambda m: m.group(1) + "\n" + readme_section(shipped(), today) + "\n" + m.group(2), text, flags=re.S)
    readme.write_text(new, encoding="utf-8")
    print("stats:", stats)


if __name__ == "__main__":
    main()
