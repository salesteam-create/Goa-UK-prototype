"""One-off: swap low-res images for the high-res Delmarva originals in assets/img/hd."""
import re
from pathlib import Path

H = "assets/img/hd/"

def swap(html, anchor, src, alt=None, nth=1):
    """Rewrite the nth <img> tag that contains `anchor`: new src, drop data-hi/data-wm."""
    start = 0
    for _ in range(nth):
        i = html.index(anchor, start)
        start = i + 1
    a = html.rindex("<img", 0, i + 1) if not html.startswith("<img", i) else i
    b = html.index(">", a) + 1
    tag = html[a:b]
    new = re.sub(r'\s(data-hi|data-wm)="[^"]*"', "", tag)
    new = re.sub(r'src="[^"]*"', f'src="{src}"', new, count=1)
    if alt is not None:
        new = re.sub(r'alt="[^"]*"', f'alt="{alt}"', new, count=1)
    new = new.replace(' style="object-fit:contain;background:var(--soft)"', "")
    return html[:a] + new + html[b:]

idx = Path("src-index.html").read_text()
S = [
    ('alt="Red 40 by 40 pole barn', H + "garage-delmarva-car.jpg", "Delmarva garage with the branded Delmarva car out front"),
    ('alt="Covered porch of a Delmarva barndo home"', H + "chester-8k-bonus.jpg", "The Chester barndo home with wraparound porch"),
    ('alt="50 by 96 farm building', H + "moving-co.jpg", "White steel commercial building for The Moving Co."),
    ('<span>Commercial</span>', None, None),
]
for anchor, src, alt in S[:3]:
    idx = swap(idx, anchor, src, alt)
# dept circles (anchor = the img right before the label)
def swap_before(html, label, src):
    i = html.index(label)
    a = html.rindex("<img", 0, i)
    b = html.index(">", a) + 1
    tag = re.sub(r'\s(data-hi|data-wm)="[^"]*"', "", html[a:b])
    tag = re.sub(r'src="[^"]*"', f'src="{src}"', tag, count=1)
    return html[:a] + tag + html[b:]
idx = swap_before(idx, "<span>Commercial</span>", H + "dewey-beer-co.jpg")
idx = swap_before(idx, "<span>Barndo Homes</span>", H + "chester-8k-front.jpg")
for anchor, src, alt in [
    ('alt="Blue 30 by 50 garage', H + "white-barn-long.jpg", "Long white pole barn with porch and cupola"),
    ('alt="Crew framing a pole building"', H + "construction-posts.jpg", "Posts set for a new pole building"),
    ('alt="Barndo home with stone front and timber porch"', H + "bohemia-x-front.jpg", "The Bohemia X barndo with attached garage"),
    ('alt="Tall 40 by 40 by 20 pole building"', H + "grey-shop-stone.jpg", "Grey steel shop with stone wainscot"),
    ('alt="The Chester barndo"', H + "chester-8k-front.jpg", None),
    ('alt="40 by 100 farm building with red trim"', H + "chester-8k-rear.jpg", "The Chester barndo from the back yard"),
    ('alt="Navy 3-door garage with cupola built by Delmarva"', H + "bohemia-x-porch.jpg", "The Bohemia X barndo with porch and two-car garage"),
    ('alt="Commercial pole building at dusk"', H + "dewey-beer-co.jpg", "Dewey Beer Co. brewery building"),
    ('alt="Barndo home porch"', H + "chester-8k-front.jpg", "The Chester barndo home"),
]:
    idx = swap(idx, anchor, src, alt)
# Delaware region card, financing / options / how-it-works tiles
idx = swap_before(idx, "<h3>Delaware</h3>", H + "dewey-beer-co.jpg")
idx = swap_before(idx, "<h3>Financing</h3>", H + "garage-delmarva-car.jpg")
idx = swap_before(idx, "<h3>Options &amp; upgrades</h3>", H + "steel-leanto.jpg")
idx = swap_before(idx, "<h3>How it works</h3>", H + "construction-frame.jpg")
# reels: better local stills where the video matches
idx = swap_before(idx, '<span class="reel__label">Residential garage</span>', H + "garage-delmarva-car.jpg")
idx = swap_before(idx, '<span class="reel__label">Customer story · Ep. 2</span>', H + "dewey-beer-co.jpg")
idx = swap_before(idx, '<span class="reel__label">StraightTalk: Concrete</span>', H + "construction-frame.jpg")
idx = swap_before(idx, '<span class="reel__label">StraightTalk: Site prep</span>', H + "construction-posts.jpg")
# hotspots repositioned for the Bohemia X render (container crops 16:9 to 16:7)
idx = idx.replace('<div class="spot" style="left:41%;top:18%"><button class="spot__dot" aria-label="Cupola"></button><div class="spot__card"><b>Cupolas &amp; weathervanes</b>One of 10 exterior options. Vents the roof and finishes the look.</div></div>',
                  '<div class="spot" style="left:82%;top:62%"><button class="spot__dot" aria-label="Siding"></button><div class="spot__card"><b>Board-and-batten steel siding</b>Vertical-rib panels in 20 colors, plus wainscot and stone options.</div></div>')
idx = idx.replace('style="left:62%;top:36%"><button class="spot__dot" aria-label="Roof steel">', 'style="left:66%;top:28%"><button class="spot__dot" aria-label="Roof steel">')
idx = idx.replace('style="left:30%;top:66%"><button class="spot__dot" aria-label="Overhead doors">', 'style="left:68%;top:68%"><button class="spot__dot" aria-label="Overhead doors">')
idx = idx.replace('style="left:83%;top:62%"><button class="spot__dot" aria-label="Posts">', 'style="left:26%;top:76%"><button class="spot__dot" aria-label="Posts">')
Path("src-index.html").write_text(idx)

hdr = Path("partials-header.html").read_text()
hdr = swap(hdr, 'quality-85-scaled.jpg" alt=""', H + "chester-8k-front.jpg")
hdr = swap_before(hdr, "<p>Pick up in Wyoming, DE or get it delivered</p>", H + "construction-posts.jpg")
hdr = swap_before(hdr, "<span>Commercial</span>", H + "dewey-beer-co.jpg")
Path("partials-header.html").write_text(hdr)

pdp = Path("src-product.html").read_text()
pdp = swap(pdp, 'alt="White 30 by 40 by 12 garage built by Delmarva"', H + "garage-delmarva-car.jpg", "Delmarva-built garage with two overhead doors")
pdp = swap(pdp, 'alt="Workshop with an open lean-to equipment shelter"', H + "steel-leanto.jpg", "Steel building with an open lean-to")
pdp = swap(pdp, 'alt="Delmarva model building"', H + "construction-frame.jpg", "Delmarva crew framing a building")
pdp = swap_before(pdp, '<span class="reel__label">Site prep</span>', H + "construction-posts.jpg")
pdp = swap_before(pdp, '<span class="reel__label">Concrete</span>', H + "construction-frame.jpg")
pdp = swap_before(pdp, '<span class="reel__label">The build</span>', H + "garage-delmarva-car.jpg")
Path("src-product.html").write_text(pdp)
print("done")
