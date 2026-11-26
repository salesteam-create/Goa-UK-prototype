# Delmarva Buildings · Shopify prototype (Wonder theme, Nook preset)

Clickable HTML prototype of the new Delmarva Buildings store. Layout, spacing and interactions follow the
Wonder theme's Nook preset section by section; content, photos and brand are Delmarva's.

Open `index.html` (home) or `product.html` (30' x 40' x 12' garage) in a browser.

## Files
- `src-index.html`, `src-product.html` — page bodies. Edit these, then run `python3 build.py`.
- `partials-*.html` — shared header, footer, icon sprite.
- `assets/css/styles.css`, `assets/js/main.js` — styles and interactions.
- `assets/img/` — local copies cropped from ilovepolebuildings.com. Each `<img>` also points (`data-hi`) at
  Delmarva's original full-size file and upgrades to it when reachable.

## Nook section → Delmarva section
| Nook | Delmarva | CRO plan action |
|---|---|---|
| Announcement bar / localization | Offer bar + "Build site zip" drawer | 3 Zip first |
| Hero slider | Leak-free promise, barndo homes, farm & commercial | 4 Trust |
| Shop by department | Shop by building, with "from" prices | 1 Prices |
| Bento tiles | Get it built / Buy a kit / Barndo homes | 5 Kit vs build |
| The Design Edit (tabbed rail) | Popular sizes with built + kit prices | 1 Prices |
| Sale banner + countdown | Black Friday $1,000 off + R10 wrap | — |
| Interior Essentials | 8 barndo models with prices | 1, 6 |
| Pumpkin Sofa feature | The Delmarva Difference (4 guarantees) | 4 Trust |
| TikTok inspiration | "See them built" YouTube reels | 7 Contact |
| Brand logos | Google, BBB A+, Nextdoor, Angi, Pella, C.H.I. | 4 Trust |
| Shop the room | Hotspots on what goes into every building | 2 |
| Check over 10,000 | 9,311 buildings since 1999 | 4 |
| Metropolitan icons | Where we build (7 states) | 3 Zip |
| Find your fit chips | Shortcuts + 3-question building finder | 2 Guided selection |
| AD press quote | Google review quotes | 4 |
| Atelier | 3D designer | 2 |
| Product page buy box | Kit vs built, size, Standard/Premium, color, add-ons, zip, running total, $500 refundable reserve, trust row | 1–7 |
| Define your mood | Standard vs Premium before/after slider + table | 1 |
| Store map | Visit HQ model building | 4 |

## Before this goes to Shopify
- Kit and built prices (except barndo prices) are **samples**. Replace with Delmarva's real pricing.
- Deposit amount, install windows, freight costs and zip-to-state logic are placeholders to confirm.
- Re-export photos from the originals at full size; local copies are screenshot crops.

## Stock photo credits (Unsplash License, free for commercial use)
Category cards in `assets/img/cat/`: Garages, Salvo Media LLC · Workshops, Mathias Reding · Farm & Ag, Holly Landkammer ·
Equestrian, Brian Wangenheim · Commercial, Syahfira Puri · Barndo Homes, Cole Ankney.
