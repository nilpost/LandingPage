#!/usr/bin/env python3
"""Generate es.html and ja.html from index.html + i18n.json.

index.html is the hand-maintained English source; the other two are build
output and are committed so the deploy workflow can copy plain filenames.
Cloudflare Workers Assets resolves /es -> es.html, so the published URLs
have no extension.

Re-run after ANY edit to index.html or i18n.json:

    python3 build.py

Verify with: python3 build.py --check   (non-zero exit if output is stale)
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).parent
BASE = "https://nil.postiusgroup.com"
LANGS = {"es": "es_ES", "ja": "ja_JP"}


def inner_span(html: str, attr: str):
    """Return (start, end) of the inner HTML of the element carrying `attr`.

    Walks forward counting same-name open/close tags, so nested <div>s inside a
    <div data-i18n> resolve correctly. Regex cannot do this.
    """
    i = html.index(attr)
    tag_open = html.rindex("<", 0, i)
    tag = re.match(r"<([a-zA-Z0-9]+)", html[tag_open:]).group(1)
    start = html.index(">", i) + 1
    depth, pos = 1, start
    open_re = re.compile(rf"<{tag}\b", re.I)
    close_re = re.compile(rf"</{tag}\s*>", re.I)
    while depth:
        nxt_o = open_re.search(html, pos)
        nxt_c = close_re.search(html, pos)
        if not nxt_c:
            raise ValueError(f"unclosed <{tag}> for {attr}")
        if nxt_o and nxt_o.start() < nxt_c.start():
            depth += 1
            pos = nxt_o.end()
        else:
            depth -= 1
            pos = nxt_c.end()
            if depth == 0:
                return start, nxt_c.start()


def render(src: str, lang: str, d: dict) -> str:
    out = src
    for key, value in d.items():
        if key.startswith("meta.") or key.startswith("ui."):
            continue
        attr = f'data-i18n="{key}"'
        if attr not in out:
            print(f"  ! key not in template, skipped: {key}")
            continue
        a, b = inner_span(out, attr)
        out = out[:a] + value + out[b:]

    url = f"{BASE}/{lang}"
    out = out.replace('<html lang="en">', f'<html lang="{lang}">', 1)
    out = re.sub(r"<title>.*?</title>", f"<title>{d['meta.title']}</title>", out, count=1, flags=re.S)
    out = re.sub(r'(<meta name="description" content=")[^"]*(">)',
                 lambda m: m.group(1) + d["meta.desc"] + m.group(2), out, count=1)
    out = out.replace(f'<link rel="canonical" href="{BASE}/">',
                      f'<link rel="canonical" href="{url}">', 1)
    out = out.replace('<meta property="og:locale" content="en_US">',
                      f'<meta property="og:locale" content="{LANGS[lang]}">', 1)
    out = out.replace(f'<meta property="og:url" content="{BASE}/">',
                      f'<meta property="og:url" content="{url}">', 1)
    # move the active marker off EN and onto this language
    out = out.replace('<a href="/" class="is-active" aria-current="page" data-lang="en"',
                      '<a href="/" data-lang="en"', 1)
    out = out.replace(f'<a href="/{lang}" data-lang="{lang}"',
                      f'<a href="/{lang}" class="is-active" aria-current="page" data-lang="{lang}"', 1)
    # these pages are already in their language; the root script must not act here
    out = out.replace('<script src="app.js', '<script src="app.js', 1)
    return out


def main() -> int:
    check = "--check" in sys.argv
    src = (ROOT / "index.html").read_text()
    i18n = json.loads((ROOT / "i18n.json").read_text())
    stale = []
    for lang in LANGS:
        built = render(src, lang, i18n[lang])
        target = ROOT / f"{lang}.html"
        if check:
            if not target.exists() or target.read_text() != built:
                stale.append(target.name)
        else:
            target.write_text(built)
            print(f"  wrote {target.name}  ({len(built):,} bytes)")
    if check and stale:
        print(f"STALE: {', '.join(stale)} — run: python3 build.py")
        return 1
    if check:
        print("  up to date")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
