"""Build ONE self-contained HTML file (home + product page) with every image embedded.

    python3 build_single.py   ->  dist/Delmarva-Buildings-Prototype.html

Home and product page live in the same file as two views; links switch views (#product / #home).
Images are recompressed to WebP and embedded once each (deduplicated), so the file works offline."""
import base64, io, json, re
from pathlib import Path
from PIL import Image

HERE = Path(__file__).parent
read = lambda p: (HERE / p).read_text()

def body(src):
    s = read(src)
    return s[s.index("<main"):s.rindex("<!--FOOTER-->")]

home_main = body("src-index.html")
prod_main = body("src-product.html").replace('<main id="main" data-builder>', '<main id="main-product" data-builder>', 1)
head = read("src-index.html")
head = head[head.index("<head>") + 6:head.index("</head>")]
head = re.sub(r'<link rel="stylesheet" href="assets/css/styles.css">', "", head)
head = head.replace("<title>Delmarva Buildings · Pole Barns, Garages &amp; Barndo Homes</title>",
                    "<title>Delmarva Buildings · Shopify Prototype</title>")

css = read("assets/css/styles.css")
js = read("assets/js/main.js")
html = (read("partials-sprite.html") + read("partials-header.html")
        + '\n<div data-view="home">\n' + home_main + "</div>\n"
        + '<div data-view="product" hidden>\n' + prod_main + "</div>\n"
        + read("partials-footer.html").replace('<script src="assets/js/main.js"></script>', ""))

# ---- links: separate pages -> views
html = html.replace('href="product.html"', 'href="#product"').replace('href="index.html#', 'href="#').replace('href="index.html"', 'href="#home"')
js = js.replace('u: "product.html"', 'u: "#product"').replace('u: "index.html#', 'u: "#').replace('h: "product.html"', 'h: "#product"')
js = js.replace('"product.html"', '"#product"')

# ---- drop remote hi-res upgrade attributes (everything is embedded)
html = re.sub(r'\s(data-hi|data-wm)="[^"]*"', "", html)

# ---- collect + embed images once
paths = set(re.findall(r"assets/img/[A-Za-z0-9_./-]+\.(?:jpg|jpeg|png|webp)", html + js))
paths |= {f"assets/img/gallery/g{n:02d}.jpg" for n in range(1, 61) if f"g{n:02d}" in js}
IMG = {}
def encode(p):
    im = Image.open(HERE / p)
    alpha = im.mode in ("RGBA", "LA", "P") and p.endswith(".png")
    im = im.convert("RGBA" if alpha else "RGB")
    big = "/hd/" in p or "/stock/" in p or p.endswith("-wide.jpg")
    im.thumbnail((1680 if big else 860, 1680 if big else 860), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, "WEBP", quality=70 if big else 68, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()
for p in sorted(paths):
    IMG[p] = encode(p)

# html: src -> data-k, data-img -> data-k-img (resolved at runtime)
html = re.sub(r'src="(assets/img/[^"]+)"', r'src="data:," data-k="\1"', html)
html = re.sub(r'data-img="(assets/img/[^"]+)"', r'data-img-k="\1"', html)
html = re.sub(r'data-logo="(assets/img/[^"]+)"', r'data-logo-k="\1"', html)
# js: string literals -> lookups
js = re.sub(r'G \+ "(g\d\d\.jpg)"', r'__IMG["assets/img/gallery/\1"]', js)
js = re.sub(r'"(assets/img/[A-Za-z0-9_./-]+\.(?:jpg|png|webp))"', r'__IMG["\1"]', js)

# YouTube: only reveal the player once it is actually PLAYING (works offline / file://)
js = js.replace('const onMsg = (e) => { if (e.source !== fr.contentWindow || !/youtube/.test(e.origin)) return; fr.classList.add("is-on");',
                'const onMsg = (e) => { if (e.source !== fr.contentWindow || !/youtube/.test(e.origin)) return; let d = {}; try { d = JSON.parse(e.data); } catch (x) {} if (!(d.info && d.info.playerState === 1)) return; fr.classList.add("is-on");')

router = r"""
<script>
/* Resolve embedded images, then wire the two views together. */
(function () {
  document.querySelectorAll("[data-k]").forEach(function (el) { var v = __IMG[el.getAttribute("data-k")]; if (v) el.src = v; });
  document.querySelectorAll("[data-img-k]").forEach(function (el) { var v = __IMG[el.getAttribute("data-img-k")]; if (v) el.setAttribute("data-img", v); });
  document.querySelectorAll("[data-logo-k]").forEach(function (el) { var v = __IMG[el.getAttribute("data-logo-k")]; if (v) el.setAttribute("data-logo", v); });
  var views = { home: document.querySelector('[data-view="home"]'), product: document.querySelector('[data-view="product"]') };
  function show(name, target) {
    var changed = views[name].hidden;
    views.home.hidden = name !== "home"; views.product.hidden = name !== "product";
    document.title = name === "product" ? "30' x 40' x 12' Garage & Workshop · Delmarva Buildings" : "Delmarva Buildings · Pole Barns, Garages & Barndo Homes";
    document.querySelectorAll(".drawer.is-open,.modal.is-open").forEach(function (d) { d.classList.remove("is-open"); });
    var s = document.querySelector(".scrim"); if (s) s.classList.remove("is-on");
    var sp = document.getElementById("search-panel"); if (sp && !sp.hidden) { sp.hidden = true; document.body.style.overflow = ""; }
    requestAnimationFrame(function () {
      if (target) { var y = target.getBoundingClientRect().top + scrollY - 130; window.scrollTo({ top: Math.max(0, y), behavior: changed ? "auto" : "smooth" }); }
      else window.scrollTo(0, 0);
      window.dispatchEvent(new Event("resize"));
      document.querySelectorAll(".rail__track,.reels__track").forEach(function (t) { t.dispatchEvent(new Event("scroll")); });
    });
  }
  function route() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (h === "product") return show("product");
    if (!h || h === "home") return show("home");
    var el = document.getElementById(h);
    if (!el) return;
    show(views.product.contains(el) ? "product" : "home", el);
  }
  /* dummy links must not change the view */
  document.addEventListener("click", function (e) { var a = e.target.closest('a[href="#"]'); if (a) e.preventDefault(); }, true);
  window.addEventListener("hashchange", route);
  route();
})();
</script>"""

out = f"""<!doctype html>
<html lang="en">
<head>{head}
<style>
{css}
html {{ scroll-behavior: auto; }}
</style>
</head>
<body>
<script>window.__IMG = {json.dumps(IMG)};</script>
{html}
{router}
<script>
{js}
</script>
</body>
</html>
"""
dist = HERE / "dist"; dist.mkdir(exist_ok=True)
f = dist / "Delmarva-Buildings-Prototype.html"
f.write_text(out)
print(len(IMG), "images embedded;", round(f.stat().st_size / 1e6, 2), "MB ->", f)
