"""Build the icon sprite from Phosphor Icons (MIT). Feature icons use the duotone weight;
the duotone layer gets class="d" so CSS can tint it Delmarva yellow."""
import re, sys
from pathlib import Path
A = Path(sys.argv[1])  # .../package/assets
M = {
 "i-search": ("magnifying-glass", "regular"), "i-user": ("user-circle", "regular"),
 "i-cart": ("shopping-cart-simple", "regular"), "i-pin": ("map-pin", "regular"),
 "i-down": ("caret-down", "regular"), "i-right": ("arrow-right", "regular"),
 "i-left": ("arrow-left", "regular"), "i-up": ("arrow-up", "regular"),
 "i-phone": ("phone", "regular"), "i-check": ("check", "bold"), "i-x": ("x", "regular"),
 "i-menu": ("list", "regular"), "i-play": ("play", "fill"), "i-chat": ("chat-circle", "duotone"),
 "i-shield": ("shield-check", "duotone"), "i-truck": ("truck", "duotone"),
 "i-tag": ("scales", "duotone"), "i-drop": ("umbrella", "duotone"),
 "i-card": ("hand-coins", "duotone"), "i-cube": ("cube-focus", "duotone"),
 "i-ruler": ("columns", "duotone"), "i-hammer": ("hard-hat", "duotone"),
 "i-home": ("house", "duotone"), "i-calendar": ("calendar-check", "duotone"),
 "i-doc": ("blueprint", "duotone"), "i-pdf": ("file-pdf", "duotone"), "i-award": ("seal-check", "duotone"),
 "i-fb": ("facebook-logo", "regular"), "i-yt": ("youtube-logo", "regular"),
 "i-ig": ("instagram-logo", "regular"), "i-pin2": ("pinterest-logo", "regular"),
}
# Outline-only variants for feature icons: thin (8/256) shown at 48px and light (12/256) at 32px
#  both render a 1.5px line.
FEAT = {k: v[0] for k, v in M.items() if v[1] == "duotone"}
for sid, name in FEAT.items():
    M[sid + "-t"] = (name, "thin")
    M[sid + "-l"] = (name, "light")
out = ['<svg xmlns="http://www.w3.org/2000/svg" style="display:none">']
for sid, (name, w) in M.items():
    f = A / w / (f"{name}.svg" if w == "regular" else f"{name}-{w}.svg")
    body = re.search(r"<svg[^>]*>(.*)</svg>", f.read_text(), re.S).group(1)
    body = body.replace('opacity="0.2"', 'class="d" opacity="0.2"')
    out.append(f'  <symbol id="{sid}" viewBox="0 0 256 256">{body}</symbol>')
out.append("</svg>\n")
Path("partials-sprite.html").write_text("\n".join(out))
print(len(M), "icons")
