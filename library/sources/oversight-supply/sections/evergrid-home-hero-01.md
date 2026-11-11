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
summary: "Centred serif-headline SaaS hero on cream: star row, status pill, two-line headline, one pill CTA, then a wide photo panel holding a frosted-framed dashboard shot beside a tall stat card."
tags: ["saas", "centred-hero", "dashboard-mockup", "serif-headline", "sustainability"]
techniques: ["editorial-serif-display", "glassmorphism", "stat-counters", "pill-navbar"]
stack: ["webflow", "css"]
complexity: "medium"
---

# Evergrid Home - Hero 01

## What it is

The opening section of a SaaS home page. A calm, centred text stack states the proposition and a large image panel below proves it with a product screenshot and a big-number stat. The carrying idea is contrast between an editorial serif headline on warm cream and a dark photographic stage for the product. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- **Header row:** logo left, four text links right, on the same cream surface (the navbar is drawn flush here rather than as a separate capsule).
- **Text stack (centred):** five-star row; a small pill tag with an accent dot and a one-line claim; headline on two lines spanning about 52% of the frame; a two-line paragraph about 30% of the frame wide; one pill button (about 14% of frame width) with a white circular arrow disc at its right end. Gaps between items are tight - about 25-45px at thumbnail scale.
- **Stage panel:** starts about 70px (thumbnail scale) below the button and spans about 97% of the section width with a radius near 20px. It is an aerial photo under a dark-green wash.
- **Inside the stage:** left, a translucent frosted frame about 65% of the panel width with about 36px inner padding, holding a white dashboard screenshot; right, a frosted card about 27% wide with a small leaf icon and a two-line label at the top and an oversized number at the bottom (cropped by the fold).
- The section is taller than the still; what sits below the fold and how it reflows on tablet/mobile: not determined (live preview unavailable).

## Visual system

- **Type:** display serif (reads as Lora), headline about 3.8% of frame width in size (~55px on 1440), tight leading (~1.1), title case. Body/UI in a neutral sans (family not determined); paragraph about 17-18px. Stat number is the largest glyph on the page in a light weight.
- **Colour (sampled from a screenshot):** page cream `#f5f4eb`; headline ink deep forest `#1d382b`; button green `#254636`; accent bright green `#3ec41e` (stars, pill dot, logo); tag pill tan `#e3dfcc`; card text white.
- **Shape and depth:** frosted frames are white at low opacity over the photo with a larger radius than the screenshot inside; the button is a full pill with a thin lighter ring; no hard shadows.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Proof panel under a centred hero** - keep copy flat and quiet, then give the product one saturated, rounded stage. See `../../../patterns/evergrid-design-system.md`.
- **Frosted frame around a screenshot** - a translucent padded wrapper makes a plain screenshot feel designed and separates it from a busy photo.
- **Screenshot plus one big number** - pairing UI with a single oversized stat gives both "what it looks like" and "what it achieves" above the fold.

## Build brief

```text
Build a centred SaaS hero with a product "stage" beneath it.

Top stack, centred, max-width 900px: (1) a row of five small rating icons; (2) a pill tag with an 8px accent
dot and [SHORT CLAIM]; (3) an h1 [HEADLINE] in a serif display face, clamp(40px, 5.2vw, 76px), line-height
1.1, max two lines on desktop; (4) a paragraph [SUBHEAD], 18-20px, max-width 46ch; (5) one pill button
[CTA LABEL] with a 40px circular arrow disc on its right. Gaps 24-32px. Background [PAGE_COLOUR].

Stage: 48-64px below, a container-width panel, radius 20px, min-height 520px, background [PHOTO] covered
with a [BRAND_DARK] overlay at ~55%. Inside use a two-column grid (2.4fr 1fr, gap 32px, padding 48px):
left, a frosted frame (rgba(255,255,255,.25), backdrop-filter blur 12px, radius 24px, padding 32px)
holding [DASHBOARD SCREENSHOT] with radius 12px; right, a frosted stat card with [ICON], [ONE-LINE LABEL]
at the top and [NUMBER][UNIT] at the bottom, the number 96-120px in a light weight.

Optional: cycle [3-4 STATS] in the right card with a cross-fade every 5s; pause on hover and focus, expose
all values to assistive tech as a list.

Load: reveal stack items in order (opacity 0 and 32px rise to rest, 600ms, 80ms stagger), then the stage.

Responsive: <=991px single column with the stat card under the screenshot as a row of stats; <=600px stats
stack, button full width, stage padding 16px, headline may wrap to three lines.

Reduced motion: no reveal, no cycling (show stats statically).
Accessibility: real h1, alt text on the screenshot, rating row has a text alternative, 4.5:1 contrast on
overlay text. Performance: screenshot is the LCP candidate - responsive srcset, fetchpriority=high, explicit
dimensions, no layout shift.
```

## Adaptation notes

Best for dashboards and data products with one good screenshot. Replace the stars with a real, attributable rating or drop them. Make the screenshot the prioritised LCP image and keep text visible without JavaScript. Check white-on-photo contrast in the stat card, and give any cycling stat a pause control.
