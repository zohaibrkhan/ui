---
id: "oversight-supply/evergrid-product-how-it-works-01"
name: "Evergrid Product - How It Works 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-product-how-it-works-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-product-how-it-works-01"
kind: "how-it-works"
origin: "Evergrid template"
access: "free-with-account"
theme: "mixed"
summary: "Three-step process block: centred serif title, a hairline with three numbered dark discs, and three tall dark-green cards each with an icon, step name, short description and a bottom-anchored bullet list."
tags: ["saas", "process", "three-steps", "dark-cards", "stepper"]
techniques: ["timeline-steps", "numbered-stepper-rail", "bottom-anchored-lists", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Product - How It Works 01

## What it is

A "how it works" explainer in three steps. A numbered rail gives sequence and three matching cards give detail. It suits any product whose workflow can be named in three verbs. The idea is separating order (the rail) from content (the cards), so the cards stay simple. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- **Title:** centred serif heading, about 27% of the panel width.
- **Rail:** about 45px (thumbnail scale) under the title, a thin horizontal line with three numbered discs (about 38px diameter). Disc 1 sits above the centre of card 1 and disc 2 just left of the centre of card 2, while disc 3 is drawn right of centre of card 3 and a few pixels lower - the alignment is imprecise in the still, so treat "one disc centred over each card" as the intent.
- **Cards:** three equal columns, each about 25.5% of the panel width, gap about 1.2% (roughly 20px); the group spans about 79% of the panel and is centred. Cards are tall - ratio about 3:4 (width:height).
- **Card anatomy** (padding about 8% of card width): a white glyph icon top-left; step name about 45px below it; a two-line description; then a large empty band (about 40% of the card height); finally three bullets anchored to the bottom, rows about 43px apart.
- About 120px of panel padding remains under the cards.
- Tablet/mobile reflow (and what happens to the rail): not determined (live preview unavailable).

## Visual system

- **Type:** title in a serif (reads as Lora), near-black, about 44-46px equivalent; card text in a neutral sans (family not determined): step name about 23px medium, description and bullets about 16-17px regular, all white.
- **Colour (sampled from a screenshot):** panel cream `#f5f4eb`; cards and number discs deep green `#234839`; rail line light warm grey `#ddded7`; text and icons white.
- **Shape and depth:** card radius about 10-12px; discs fully round with white numerals; standard round bullet markers; no shadows or borders.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Rail above, cards below** - a numbered line carries the sequence so the cards do not need big numerals or arrows. See `../../../patterns/evergrid-design-system.md`.
- **Bottom-anchored list** - pinning bullets to the card's foot with space-between keeps all three lists on one baseline even when descriptions differ in length.
- **Solid colour cards on a light page** - flat brand-colour cards make a text-only section feel substantial without illustration.

## Build brief

```text
Build a three-step "how it works" section with a numbered rail and matching cards.

Section: background [PAGE_COLOUR], padding-block 96px. Centred h2 [SECTION TITLE] in a serif display face,
clamp(32px, 3.4vw, 48px), margin-bottom 48px.

Structure: an <ol> laid out as a 3-column grid (gap 20px, max-width 1140px). Each <li> contains a number
disc and a card, stacked, so the disc is always centred over its own card.

Rail: disc 40px, round, background [BRAND_DARK], white numeral 16px, margin-bottom 32px. Draw the connecting
line as a pseudo-element on the <ol>: 1px, [RULE_COLOUR], running from the centre of the first disc to the
centre of the last, behind the discs.

Card: background [BRAND_DARK], color white, radius 12px, padding 32px, min-height 520px, flex column,
justify space-between.
 Top group: [STEP ICON] 32px white glyph; h3 [STEP NAME] 22px/500, margin-top 24px; p [STEP SUMMARY]
 16px/1.55, max two to three lines.
 Bottom group: <ul> of [3 DETAILS], 16px, disc markers, row gap 20px.

Motion: when the section is 25% in view, draw the rail line left to right (scaleX 0 to 1, 800ms); as the line
reaches each disc, pop the disc (scale .6 to 1, 250ms) and fade/raise its card (24px, 500ms). Once only.

Responsive: <=991px card min-height 420px, padding 24px; <=767px single column - the rail becomes a
vertical line down the left with discs beside each card (grid 40px 1fr), cards lose min-height and the
bottom list follows the summary with a 24px gap.

Reduced motion: rail, discs and cards rendered complete with no animation.
Accessibility: ordered list semantics so the numbers are announced; numerals in discs aria-hidden to avoid
double reading; icons decorative; white on [BRAND_DARK] at 4.5:1 or better.
Performance: CSS only apart from one IntersectionObserver; inline SVG icons.
```

## Adaptation notes

Three or four steps work; five will squeeze the cards. The empty band in each card can host a small illustration or screenshot crop. On mobile the horizontal rail has no meaning - turn it vertical or fold the number into each card. Align discs to card centres with the same grid rather than positioning them by hand.
