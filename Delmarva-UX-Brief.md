# Delmarva Buildings: UI/UX Design Brief

Internal brief for the Shopify redesign. Based on the live site (ilovepolebuildings.com) checked on 26 Nov 2026.

## 1. Business and audience

**What they are:** a design-and-build post-frame company with headquarters in Wyoming, DE (a 5-acre site with a 40,000 sq ft warehouse and manufacturing facility, plus a model building on site) and a field office in Urbana, OH. They claim 25+ years in business, 9,311 projects and 397 Google reviews (about 4.5 stars). The current site runs on WordPress with Elementor.

**What they sell:**
- Built-for-you pole buildings: residential, farm/ag, commercial and equestrian.
- 8 turnkey barndo models, priced from $129K (Bohemia) to $625K (Chester), built with Bumblebee Construction.
- Materials only: an option on the quote form, plus retail and contractor pickup from the DE yard.
- "Gold Standard" 26-gauge steel panels.
- A 3D designer (by ON THE Z) and financing.
- Two tiers: The Standard and The Premium.
- Guarantees: 5-year workmanship, 20-year leak-free, lifetime structural and price match.

**Service area:** the Locations page lists DE, MD, VA, PA, NJ, IN and OH.

| Buyer | What they need from the site |
|---|---|
| Homeowner (garage, workshop) | A ballpark price, proof the company is good, how long it takes |
| Farm/ag | Function, durability, value, sizes |
| DIY or contractor (materials) | Price, delivery to their zip code, speed |
| Barndo home buyer | Floor plans, all-in price, financing, a low-risk next step |
| Commercial | Process, specs, references, a quote |

Today every one of these buyers gets the same answer: "Get a quote".

## 2. Key UX findings (ranked)

**1. The hero says nothing specific.** It's a 6-slide carousel that repeats "Experience the Delmarva Difference / Get the building you deserve". There's no price, no proof and no clear offer.
*Laws:* Nielsen #2 (match the real world); banner blindness on carousels; Jakob's Law (Hansen, Keen's and Alan's all lead with prices).
*Fix:* one static hero with a concrete promise (for example, "Guaranteed leak-free for 20 years"), a 4.5-star / 397-review badge, and 2 to 3 entry paths.

**2. One CTA for every buyer.** "Get a quote" appears 9 times on the homepage, and there's no split between a kit, a built project and a barndo home.
*Laws:* Hick's Law works in reverse here: there is one choice, but it doesn't fit anyone. The goal of each buyer is ignored.
*Fix:* "Buy a kit / Get it built / Barndo homes" as the first decision, each leading to its own short flow.

**3. The quote form asks for too much, too early.** It's a 4-step form with about 22 fields, and step 1 asks for 7 contact fields, including street address, before any project details.
*Laws:* the goal-gradient effect, foot-in-the-door, and Tesler's Law (the business absorbs complexity, not the user).
*Fix:* ask about the project first (type, size, zip), show a price range, then ask for contact details. Keep it to 4 fields upfront.

**4. Form errors hurt credibility.** The homepage form's call-time options read "12am - 3pm" and "3am - 6pm". Five fields rely on a placeholder as their only label, and reCAPTCHA v2 adds a checkbox step.
*Laws:* Nielsen #5 (error prevention); the aesthetic-usability effect.

**5. Trust is far from the decision point.** The reviews widget sits mid-page, and the warranties live in the menu. Neither appears next to a CTA or a price.
*Laws:* Gestalt proximity; the serial position effect.
*Fix:* a trust row under every primary button (rating, 4 guarantees, financing).

**6. The service area is stated four different ways.**
- The hero says DE, MD, VA and OH.
- The meta description says DE, MD and VA.
- The barndo page says DE, MD and NJ.
- The Locations page says 7 states.

*Laws:* Nielsen #4 (consistency and standards).
*Fix:* one source of truth, plus a zip check.

**7. The homepage is too long and repeats itself.** It has 184 headings, 297 links and 211 images. The "building types" block is rendered 2 to 3 times (tabs repeated), and the heading "Barndominimums" is misspelled 6 times.
*Laws:* Miller's Law and cognitive load; Occam's razor.
*Fix:* cut the homepage to about 8 sections (see the CRO plan) and move the depth to category pages.

**8. Pricing is uneven.** Barndo pages show "Starting at" prices, but buildings, kits, materials and the 3D designer show none.
*Laws:* Jakob's Law. Competitors set the expectation that a price is shown.
*Fix:* add "from" prices on cards, a Standard vs Premium table, and a live total in the 3D designer.

**What works and should be kept:** real project photos, the strength of the 4 guarantees, a 3D designer that already has Save and Share, priced barndo models with specs and floor plans, and phone numbers in the header.

## 3. Accessibility and performance

| Check | Result |
|---|---|
| Page language set | Yes (`en-US`) |
| Image alt attributes | All 211 images have one. 94 are empty; check that project and building photos are not among them. |
| Headings | 3 H1s, all of them blog post titles. The page has no H1 of its own, and the hero headings are H2s duplicated 6 times by the carousel. |
| Form labels | 5 of 12 fields use a placeholder as their only label |
| Page weight | 659 KB of HTML (a good target is under 100 KB), 38 stylesheets, 30 external scripts, 211 images (168 lazy-loaded) |
| Lighthouse | Not run: the PageSpeed API quota was used up today. Run pagespeed.web.dev manually before kickoff to get a baseline. |
| Colour contrast | Not measured. Audit it in the design phase against WCAG AA (4.5:1 for body text). |

On the Shopify build, these targets apply:
- One H1 per page.
- Visible labels on every form field.
- A static hero, not a carousel.
- WebP images with explicit sizes.
- A mobile LCP under 2.5 seconds.

## 4. Competitor UX benchmark

| | Shows price | Delivery / zip | Online next step | Pattern to borrow |
|---|---|---|---|---|
| Hansen | "Starting at" for each size | No | Quote | A "from" price on every size card |
| Keen's | Exact kit prices | Fixed list of states | Buy, reserve, financing | A call or text button on product pages |
| Alan's | After zip code | Zip code required | 10 to 20% deposit | Zip code first, then price |
| My Barndo Plans | Every option priced | No checker | $2,000 refundable deposit | Refund terms printed next to the button |
| Mueller | No | Zip code | Save cart as a quote | Cart-to-quote for complex orders |
| **Delmarva** | Barndos only | No | 22-field form | |

The lesson is that a price comes first, a zip code second and a small commitment third. No competitor combines all three with strong trust signals, so Delmarva can own that position.

## 5. Design priorities (in order)

1. **Paths, not one funnel:** kit / built / barndo, from the homepage down.
2. **Show a price everywhere:** "from" prices, the Standard vs Premium table, and a live total in the configurator.
3. **Trust row next to every CTA:** the rating, the 4 guarantees and a monthly payment estimate.
4. **Short lead capture:** 4 fields, with project details before contact details.
5. **Zip check on product pages,** showing service area, freight and lead time.
6. **One consistent service-area message** across the site.
7. **Cleaner build:** a shorter homepage, correct heading order, labelled form fields and fast images.

**Theme recommendation:** use Wonder (start from the Nook preset and re-skin it to look more rugged). It has 151 reviews (99% positive), about 4,400 stores, a built-in quiz, trust badges, product tabs and fast support. Barcelona is a reasonable backup, with 18 reviews and about 320 stores, but it has no built-in quiz. Neither theme solves the configurator, zip check or deposits, so plan apps or custom work for those whichever theme is chosen.
