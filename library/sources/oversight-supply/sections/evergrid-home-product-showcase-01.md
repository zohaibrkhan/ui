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
summary: "Full-bleed image wall on dark green: three rows of rounded landscape photos, offset like brickwork, with a centre tile carrying a serif statement; rows are driven by a scroll-linked interaction."
tags: ["image-wall", "statement", "photography", "brand-moment", "sustainability"]
techniques: ["image-collage", "scroll-scrubbed-animation", "offset-rows", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "medium"
---

# Evergrid Home - Product Showcase 01

> **Evidence note.** This section is a Webflow export. Its stylesheet, scripts, fonts and images load from a CDN our sandbox could not reach, so the live preview rendered unstyled. This entry is based on the public preview's DOM (structure, class roles, inline initial animation states) and the vendor's public thumbnail (a 2050px-wide still, colours sampled from it). Hover/click states and the 390px layout were not rendered; anything marked *inferred* follows from markup only.

## What it is

A brand interlude rather than a literal product demo: a wall of photography that fills the viewport, with one sentence of mission copy on the middle tile. It breaks up a run of feature sections and gives the page an emotional beat. The idea is a brick-bond mosaic that extends past the viewport edges so it feels larger than the screen.

## Layout anatomy

- Outer wrapper spans the full section width with no container; an inner element clips overflow.
- Three horizontal rows ("top", "middle", "bottom"), each holding three tiles in a row that is wider than the viewport, so the outer tiles are cropped by the edges.
- **Top and bottom rows:** three photos each; in the thumbnail only two are visible per row, split unevenly (about 44% / 56% on top, 61% / 39% on the bottom), which staggers the vertical seams like brickwork.
- **Middle row:** photo, statement tile, photo. The statement tile is the hero: about 77% of the visible width and roughly 2.3x the height of the outer rows; side tiles show only about 10% slivers.
- **Statement tile:** photo at full width, a dark-green overlay, and a centred `h2` constrained to a max-width so it wraps onto two lines.
- Gutters are uniform, about 1% of the frame width (roughly 16px), and are simply the dark background showing through.
- Mobile behaviour not observed.

## Visual system

- **Type:** Lora serif, white, about 2.2% of frame width in size (roughly 40px on a 1440 layout), regular weight, centred, generous tracking.
- **Colour:** gutter/background deep green `#163629`-`#183529`; overlay on the centre tile a desaturated green at around 60%; photography is saturated natural colour (meadow, sea, sky, wheat) which contrasts with the muted centre.
- **Shape and depth:** every tile has a radius of about 16-20px; no borders or shadows; the cropping at the edges does the framing.

## Motion and interaction

- The wrapper carries one interaction trigger covering the whole wall. With three rows named top/middle/bottom inside an overflow-hidden parent, the intended effect is rows sliding horizontally in opposing directions as the section scrolls through the viewport (inferred; exact distances and whether it is scrubbed or timed were not determined because the interaction script was unreachable).
- No hover or click behaviour. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Overscaled rows** - make each row 120-150% of the viewport width and centre it; the cropped edges imply a bigger canvas and give you room to translate rows without exposing gaps.
- **Muted centre, vivid edges** - overlay only the tile that carries text so legibility is guaranteed while the surrounding photos stay colourful.
- **Gutter as background** - use `gap` over a coloured section instead of borders; changing one colour re-themes the wall. See `../../../patterns/evergrid-design-system.md`.

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

Use once per page at most. It needs seven or eight photographs with a consistent grade; mixed stock will look like a collage accident. For a literal product showcase, replace the outer photos with UI crops and keep the centre for the claim. Horizontal movement must stay small or it reads as a carousel that cannot be controlled.
