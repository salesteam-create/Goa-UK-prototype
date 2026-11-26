"""Assemble index.html and product.html from src-*.html + shared partials."""
from pathlib import Path
here = Path(__file__).parent
parts = {k: (here / f"partials-{k.lower()}.html").read_text() for k in ("SPRITE", "HEADER", "FOOTER")}
for name in ("index", "product"):
    html = (here / f"src-{name}.html").read_text()
    for k, v in parts.items():
        html = html.replace(f"<!--{k}-->", v)
    (here / f"{name}.html").write_text(html)
    print("built", name + ".html", len(html) // 1024, "KB")
