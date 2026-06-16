# Goan Association (UK) — Website Redesign Plan

> A from-scratch redesign strategy for **goauk.com**, the home of the Goan
> Association (UK) — a voluntary community and cultural organisation founded in
> **1966**, serving the Goan diaspora across the United Kingdom.

---

## 1. Who we are designing for

The Goan Association (UK) is a **volunteer-run, not-for-profit community body**.
It promotes Goan language and culture, runs feasts/events, shares community
news, supports welfare, and connects generations of Goans living in Britain.

### Audiences

| Audience | Needs | Design implication |
| --- | --- | --- |
| **Elders (60+)** | Big text, simple navigation, familiarity, trust | Large fonts, high contrast, no jargon, phone numbers visible |
| **Working adults / families** | Events, membership, news, fast answers | Clear CTAs, mobile-first, scannable cards |
| **Youth (16–30)** | Identity, belonging, modern feel, social | Vibrant visuals, Instagram feed, youth wing section |
| **Newcomers to the UK** | "How do I connect? How do I join?" | Prominent "Join us" + "Get involved" journeys |
| **Press / partners / donors** | Credibility, history, contact | About, heritage story, charity/governance info |

**Design north star:** *susegad* — the Goan spirit of warm, unhurried
contentment. The site should feel **welcoming, proud, and effortless**, like
being invited into a Goan home.

---

## 2. Problems with the current site (and goals)

Typical issues for a long-running WordPress community site, and what we fix:

| Problem | Goal |
| --- | --- |
| Dated, template look; weak brand identity | A distinctive, ownable **Goan visual language** |
| Cluttered navigation, hard to find events/membership | **Clean IA** — max 6 top-level items, obvious journeys |
| Not optimised for older users or phones | **Accessible, mobile-first, AA-contrast** |
| Generic stock imagery | Authentic Goan culture, people, and heritage |
| Slow / heavy | Fast, lightweight, image-optimised |

**Success metrics:** more membership sign-ups, more event attendance,
lower bounce on mobile, positive feedback from older members.

---

## 3. The Goan design language (theme)

A respectful, modern interpretation of Indo-Portuguese Goan heritage —
**not** clichéd tourist branding.

### Visual inspiration
- **Laterite stone & red soil** — warm terracotta tones.
- **Azulejos** — blue-and-white Portuguese ceramic tile patterns.
- **The Arabian Sea & beaches** — teal, turquoise, sand.
- **Kunbi saree** — the iconic red-and-white Goan check.
- **Feasts & Carnival** — marigold, saffron, festive joy.
- **Old Goa churches & colonial villas** — elegant arches, ornament.
- **Palms & coconut groves** — lush greens.

### Colour palette (design tokens)

| Token | Hex | Use |
| --- | --- | --- |
| `--c-laterite` | `#C0573B` | Primary brand / accents (warm Goan earth) |
| `--c-azulejo` | `#1C5C8C` | Secondary / links / headings (Portuguese tile blue) |
| `--c-sea` | `#2E9E96` | Tertiary highlights (Arabian Sea teal) |
| `--c-marigold` | `#F2A413` | Festive CTA / energy |
| `--c-sand` | `#FAF4E8` | Page background (warm cream) |
| `--c-ink` | `#2B2724` | Body text (soft near-black) |
| `--c-palm` | `#3E7C59` | Success / nature accents |

### Typography
- **Headings:** an elegant high-contrast serif (*Fraunces* / *Playfair*)
  — evokes colonial heritage and gives warmth and character.
- **Body:** a clean, highly legible humanist sans (*Inter* / *Mulish*)
  — chosen for readability across all ages.
- **Base body size 18px** (not 16px) for older readers; generous line-height.

### Motifs & texture
- A subtle **azulejo tile pattern** as section dividers and footer.
- **Kunbi check** accent on buttons/borders used sparingly.
- Arch shapes (Old Goa) for image frames and cards.

---

## 4. Information architecture (site map)

Flat, intuitive, 6 top-level items — easy for any age to scan.

```
Home
├─ About            → Our story (since 1966), mission, the team/board, governance
├─ Events           → Upcoming + past, feasts, calendar, tickets
├─ News             → Community news, newsletter archive, member spotlights
├─ Membership       → Why join, benefits, plans, join/renew form
├─ Gallery          → Photos & video from events and feasts
└─ Contact          → Enquiries, location, social, volunteer with us
```

**Persistent CTAs (in header & footer):** **Join Us** and **Upcoming Events**.

**Key user journeys**
1. *"I want to come to an event"* → Home → Events → event detail → add to calendar.
2. *"I want to join"* → any page → Join Us → Membership → form.
3. *"I'm new — how do I connect?"* → Home hero → Get involved → Contact/Membership.

---

## 5. Homepage blueprint

1. **Header** — logo + "Est. 1966", nav, *Join Us* button, text-size toggle.
2. **Hero** — warm welcome ("A home away from home"), short susegad line,
   two CTAs (*Become a Member*, *See Upcoming Events*), azulejo/palm motif.
3. **Heritage strip** — "Serving Goans in Britain since 1966" + key stats.
4. **What we do** — 4 pillars: Culture · Community · Youth · Welfare.
5. **Upcoming events** — 3 event cards with date chips + "View all".
6. **Featured news / spotlight** — 1 feature + 2 secondary.
7. **Gallery teaser** — masonry/arched image grid.
8. **Membership band** — strong CTA on a coloured/azulejo background.
9. **Newsletter signup** — simple email capture.
10. **Footer** — sitemap, contact, socials, charity/governance, back-to-top.

---

## 6. UX & accessibility principles (all ages)

- **WCAG 2.2 AA** minimum: contrast ≥ 4.5:1, visible focus states.
- **Large tap targets** (≥ 44px), generous spacing — easier for elders & touch.
- **One primary action per section** — never make people hunt.
- **Plain English** labels; no insider abbreviations in nav.
- **Mobile-first**, then scale up; nav collapses to an accessible drawer.
- **Built-in text-size toggle** (A / A+ / A++) for older readers.
- **Reduced-motion support** — respect `prefers-reduced-motion`.
- **Keyboard navigable**, semantic HTML, skip-to-content link, alt text.
- **Fast**: optimised/lazy-loaded images, system-friendly fonts, no heavy libs.

---

## 7. Technology

**This prototype:** static **HTML + CSS + vanilla JS**, no build step —
fast to preview and share, and proves the design direction.

- `index.html` — the homepage.
- `design-system.html` — living style guide (tokens + components).
- `assets/css/main.css` — design tokens + component library.
- `assets/js/main.js` — nav, text-size toggle, small interactions.

**Recommended path to production (later):** migrate the design system into a
**component-based CMS** so volunteers can edit content without developers —
either a modern WordPress block theme (lowest retraining cost) or Next.js +
a headless CMS if richer interactivity is wanted.

---

## 8. Phased roadmap

| Phase | Deliverable |
| --- | --- |
| **1 — Foundation (this prototype)** | Design system + homepage |
| **2 — Core pages** | About, Events (list + detail), Membership, Contact |
| **3 — Content & community** | News/blog, Gallery, newsletter, social feeds |
| **4 — Functionality** | Online membership join/renew, event tickets/RSVP |
| **5 — Production & handover** | CMS migration, content load, training, launch |

---

## 9. What's in this repo now

- `index.html` — the redesigned **homepage** (Goan theme, accessible, responsive).
- `design-system.html` — the **design system** showcase (colours, type, components).
- `assets/css/main.css` — tokens + reusable components.
- `assets/js/main.js` — interactions.

Open `index.html` in a browser to view the prototype.
