---
id: "oversight-supply/evergrid-home-hero-01"
name: "Evergrid Home - Hero 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-home-hero-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-home-hero-01"
kind: "hero"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "Centred serif-headline SaaS hero on cream: star row, status pill, headline, one pill CTA, then a wide photo panel holding a frosted dashboard shot beside a vertically cycling stack of stat cards."
tags: ["saas", "centred-hero", "dashboard-mockup", "serif-headline", "sustainability"]
techniques: ["editorial-serif-display", "glassmorphism", "vertical-card-ticker", "stat-counters", "text-swap-button", "load-in-sequence"]
stack: ["webflow", "css", "gsap"]
complexity: "medium"
---

# Evergrid Home - Hero 01

> **Evidence note.** This section is a Webflow export. Its stylesheet, scripts, fonts and images load from a CDN our sandbox could not reach, so the live preview rendered unstyled. This entry is based on the public preview's DOM (structure, class roles, inline initial animation states) and the vendor's public thumbnail (a 2050px-wide still, colours sampled from it). Hover/click states and the 390px layout were not rendered; anything marked *inferred* follows from markup only.

## What it is

The opening section of a SaaS home page. A calm, centred text stack sells the proposition, and a large image panel below proves it with a product screenshot and big-number stat cards. The carrying idea is contrast between an editorial serif headline on warm cream and a dark, photographic "stage" for the product.

## Layout anatomy

- **Text stack (centred, top ~55% of the first screen):** five-star image row; a small pill tag with a coloured dot and a one-line claim; an `h1` set on two lines; a two-line paragraph constrained to a medium measure (about 30% of frame width); one pill button with a circular arrow disc. Vertical gaps are tight - roughly 24-32px between elements at the thumbnail's scale.
- **Showcase panel (below, nearly full container width):** a rounded rectangle filled with an aerial landscape photo plus a dark-green overlay. Inside, left ~65%: a translucent frosted frame (padding around 3% of panel width) containing the dashboard screenshot. Right ~27%: a tall frosted card column.
- **Stat-card column:** one "card wrapper" holding four stat cards (icon, one-sentence label, then a very large number with a smaller unit beside it). The wrapper is duplicated twice more (three copies total; the extra copies are hidden at tablet) so the column can loop vertically.
- The panel is cropped by the fold: the screenshot continues below the first viewport.
- Tablet: duplicate card wrappers are hidden (class naming says so); mobile stacking was not observed.

## Visual system

- **Type:** display in Lora (serif, weights 300-700 loaded), headline roughly 4.5% of frame width in size with tight leading (~1.1), title case. Body and UI in a neutral sans (family not determined). Stat numbers are the largest glyphs on the page, light weight, with a small unit suffix.
- **Colour:** page cream `#f5f4eb`; headline ink deep forest `#1d382b`; button and overlay green `#234839`-`#254636`; accent bright green `#3ec41e` (stars, pill dot); tag pill tan `#e3dfcc`; card text white.
- **Shape and depth:** panel radius ~16-20px; frosted frames are white at low opacity over the photo with a larger radius; screenshot has its own smaller radius; no hard shadows.

## Motion and interaction

- **Load:** every text element is wrapped in an "animate on load" container that is hidden until the runtime starts, then revealed in sequence (the site-wide reveal starts from translateY 45px, blur 10px, opacity 0).
- **Stat column:** at >=992px the card wrapper starts translated -102% vertically and is animated continuously, producing an endless vertical ticker of stat cards (direction and duration not determined).
- **Button hover:** label duplicated for a roll-over swap; an overlay disc expands from the arrow holder; a second arrow holder waits off-side (inferred from structure).
- GSAP, SplitText and ScrollTrigger are loaded on the page; which of them this section uses was not determined. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Proof panel under a centred hero** - keep copy flat and quiet, then give the product one saturated, rounded stage. See `../../../patterns/evergrid-design-system.md`.
- **Frosted frame around a screenshot** - a translucent padded wrapper makes any plain screenshot feel designed and separates it from a busy photo.
- **Duplicated-track vertical ticker** - repeat the card list and translate by exactly one list height for a seamless loop.

## Build brief

```text
Build a centred SaaS hero with a product "stage" beneath it.

Top stack, centred, max-width 900px: (1) a row of five small rating icons; (2) a pill tag with an 8px accent
dot and [SHORT CLAIM]; (3) an h1 [HEADLINE] in a serif display face, clamp(40px, 5.2vw, 76px), line-height
1.1, max two lines on desktop; (4) a paragraph [SUBHEAD], 18-20px, max-width 46ch; (5) one pill button
[CTA LABEL] with a 40px circular arrow disc on its right. Gaps 24-32px. Background [PAGE_COLOUR].

Stage: 48-64px below, a container-width panel, radius 20px, min-height 520px, background [PHOTO] covered
with a [BRAND_DARK] overlay at ~55%. Inside use a two-column grid (2fr 1fr, gap 32px, padding 48px):
left, a frosted frame (rgba(255,255,255,.25), backdrop-filter blur 12px, radius 24px, padding 32px)
holding [DASHBOARD SCREENSHOT] with radius 12px; right, a frosted column that clips a vertical ticker of
4 stat cards: [ICON], [ONE-LINE LABEL], and [NUMBER][UNIT] where the number is 96-120px light weight.

Ticker: duplicate the card list once, animate translateY from 0 to -50% linearly over ~24s, infinite;
pause on hover and focus-within. Mark the duplicate aria-hidden.

Load: reveal stack items in order (opacity 0, y 40px, blur 8px to rest, 600ms, 80ms stagger), then the stage.

Responsive: <=991px single column, ticker becomes a static 2x2 grid of stats; <=600px stats stack, button
full width, stage padding 16px.

Reduced motion: no reveal, no ticker (show the four stats statically).
Accessibility: real h1, alt text on the screenshot, rating row has a text alternative, 4.5:1 contrast on
overlay text. Performance: hero image responsive with srcset and fetchpriority=high; no layout shift.
```

## Adaptation notes

Best for dashboards and data products that have one good screenshot. Replace the stars with a real, attributable rating or drop them. The source lazy-loads the hero screenshot and hides text until JS initialises; do the opposite for LCP. Check white-on-photo contrast for the stat cards, and give the ticker a pause control if it carries real information.
