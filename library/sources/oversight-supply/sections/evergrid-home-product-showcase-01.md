---
id: "oversight-supply/evergrid-home-product-showcase-01"
name: "Evergrid Home - Product Showcase 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-home-product-showcase-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-home-product-showcase-01"
kind: "product-showcase"
origin: "Evergrid template"
access: "free-with-account"
theme: "dark"
summary: "Image wall on dark green: three rows of rounded landscape photos with staggered seams and edge-cropped tiles, and a large washed centre tile carrying a two-line serif statement."
tags: ["image-wall", "statement", "photography", "brand-moment", "sustainability"]
techniques: ["image-collage", "offset-rows", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "medium"
---

# Evergrid Home - Product Showcase 01

## What it is

A brand interlude rather than a literal product demo: a wall of photography with one sentence of mission copy on the middle tile. It breaks up a run of feature sections and gives the page an emotional beat. The idea is a brick-bond mosaic that runs past the frame edges so it feels larger than the screen. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- Three horizontal rows on a dark-green ground; the ground shows through as uniform gutters of about 1% of the wall width (roughly 16px).
- **Top row:** two visible photos split about 44% / 56%. **Bottom row:** two visible photos split about 61% / 39%. The differing splits stagger the vertical seams like brickwork. Both rows are cropped by the top/bottom edge.
- **Middle row:** about 2.3x the height of the outer rows. A centre tile takes about 77% of the width; narrow slivers (about 10% each) of neighbouring photos show left and right, cropped by the edges.
- **Centre tile:** photo under a grey-green wash, with a centred two-line serif statement occupying about 38% of the wall width.
- Whether the rows continue beyond the visible crop, and tablet/mobile behaviour: not determined (live preview unavailable).

## Visual system

- **Type:** serif (reads as Lora), white, about 2.2% of wall width in size (roughly 34-40px on a 1440 layout), regular weight, centred, slightly open tracking, leading about 1.35.
- **Colour (sampled from a screenshot):** ground deep green `#163629`-`#183529`; centre wash a desaturated green at roughly 60%; surrounding photography left in saturated natural colour (meadow, sea, sky, wheat).
- **Shape and depth:** every tile has a radius of about 16-20px; no borders or shadows; edge cropping does the framing.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Staggered-seam rows** - give each row different tile ratios so no gutter lines up vertically; the result reads as a mosaic rather than a table.
- **Muted centre, vivid edges** - wash only the tile that carries text so legibility is guaranteed while the surrounding photos stay colourful.
- **Gutter as background** - use `gap` over a coloured section instead of borders; one colour re-themes the wall. See `../../../patterns/evergrid-design-system.md`.

## Build brief

```text
Build a full-bleed "image wall" statement section.

Section: background [BRAND_DARK], padding-block 16px, overflow hidden, height about 100vh (min 640px).
Inside, three rows stacked with a 16px gap. Each row is a flex row with 16px gap, width 130vw, centred with
margin-left -15vw so both ends are cropped.

Row 1 and row 3 (each ~22% of section height): three images with flex ratios that differ between rows
(e.g. 5:6:4 and 7:5:4) so vertical seams never line up. Row 2 (~56% of height): [IMAGE], a statement tile
with flex-basis ~60vw, [IMAGE].

All tiles: radius 20px, overflow hidden, images object-fit cover. Statement tile: [IMAGE] plus a
[BRAND_DARK] overlay at 60%, and a centred h2 [STATEMENT] in a serif display face, white,
clamp(26px, 2.8vw, 44px), line-height 1.3, max-width 20ch.

Scroll behaviour: link row translation to the section's scroll progress (0 when its top enters the viewport,
1 when its bottom leaves). Rows 1 and 3 move from -4vw to +4vw; row 2 moves the opposite way by 2vw. Use
transforms only; prefer CSS scroll-driven animations (animation-timeline: view()) with a small JS fallback.

Responsive: <=991px rows become 160vw wide and section height 80vh; <=600px keep three rows but show the
statement tile at 88vw with slivers either side, heading 24px.

Reduced motion: rows static at their centre position.
Accessibility: the statement is real text, not baked into an image; surrounding photos are decorative
(empty alt); overlay must give 4.5:1 contrast for the heading.
Performance: 8 images - lazy-load, size to rendered dimensions, AVIF/WebP, fixed aspect boxes to avoid
layout shift; will-change only while the section is in view.
```

## Adaptation notes

Use once per page at most. It needs seven or eight photographs with a consistent grade. For a literal product showcase, replace the outer photos with UI crops and keep the centre for the claim. The scroll-linked row drift in the brief is our own suggestion (the layout invites it); keep the travel small or drop it.
