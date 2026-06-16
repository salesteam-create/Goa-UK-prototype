# Goan Association (UK) — Website Redesign Prototype

A from-scratch redesign of **goauk.com** for the **Goan Association (UK)**, a
volunteer-run community and cultural organisation serving the Goan diaspora in
Britain since **1966**.

This prototype proves a distinctive **Goan visual language** with **clean,
accessible UX** designed for *all* age groups.

## Contents

| File | What it is |
| --- | --- |
| [`REDESIGN-PLAN.md`](REDESIGN-PLAN.md) | The full redesign strategy: audiences, theme, IA, roadmap |
| `index.html` | The redesigned **homepage** |
| `design-system.html` | The living **design system** (colours, type, components) |
| `assets/css/main.css` | Design tokens + reusable component library |
| `assets/js/main.js` | Mobile nav + accessible text-size toggle |

## View it

No build step — just open the files in a browser:

```bash
# from the repo root
open index.html            # macOS
# or serve locally
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Design highlights

- **Goan theme** — laterite, azulejo blue, Arabian-sea teal, marigold; serif
  headings (Fraunces) + legible body (Mulish); subtle tile pattern.
- **Accessible for all ages** — 18px base text, built-in A/A+/A++ size toggle,
  AA contrast, 48px tap targets, full keyboard support, reduced-motion support.
- **Clean navigation** — 6 clear top-level items, persistent *Join Us* CTA,
  accessible mobile drawer.
- **No dependencies** — pure HTML/CSS/vanilla JS; fast and easy to host.

See [`REDESIGN-PLAN.md`](REDESIGN-PLAN.md) for the strategy and phased roadmap.
