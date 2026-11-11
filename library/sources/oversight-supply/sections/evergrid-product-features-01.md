---
id: "oversight-supply/evergrid-product-features-01"
name: "Evergrid Product - Features 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-product-features-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-product-features-01"
kind: "features"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "Alternating feature rows for a product page: square photo tiles hold either a corner-cropped dashboard screenshot or a frosted stack of metric cards, beside a serif heading, paragraph and check-list."
tags: ["saas", "zigzag", "feature-rows", "dashboard-crop", "checklist"]
techniques: ["alternating-feature-rows", "cropped-screenshot-tile", "glassmorphism", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Product - Features 01

## What it is

The product-page version of the template's zigzag feature block. Each row explains one capability and shows real interface: either a screenshot bleeding off the tile's corner or a few metric cards lifted out of the UI. It suits products whose interface is the argument. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- Two rows visible on a cream panel, mirrored: media left / text right, then text left / media right. Media tile about 48% of panel width, text about 35%, gap about 5%; panel side padding about 5%.
- **Tile A (cropped screenshot):** square tile with a photo ground; a white dashboard screenshot is anchored bottom-right, inset about 7% from the left and top and bleeding off the right and bottom edges, so only its top-left region (sidebar, first cards, chart) is seen.
- **Tile B (metric stack):** square tile with a photo ground; a centred frosted panel about 72% of the tile width holds three white metric cards stacked vertically with about 6px gaps, each with a label, a large value and a small trend figure.
- **Text column:** heading and three-line paragraph at the top (about 9% down from the tile top); a three-item checklist anchored lower (starting about 63% down). Checklist rows about 31px apart.
- Rows are separated by about 75px (thumbnail scale) - looser than the home-page variant.
- A third row and tablet/mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** serif (reads as Lora) headings at about 24-26px equivalent, regular; neutral sans (family not determined) for paragraph (about 13-14px, mid grey) and bullets (near-black).
- **Colour (sampled from a screenshot):** cream `#f5f4eb` surface; accent green `#3ec41e` round check badges; tile grounds are green-toned landscape photos, darker and washed in tile A, sunlit in tile B; UI cards white to light grey.
- **Shape and depth:** tile radius about 12-14px; screenshot radius about 10px on its visible corner; frosted panel radius about 20px with white cards (radius about 10px) that carry a subtle top-to-bottom grey gradient; no drop shadows on the tiles.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Corner-cropped screenshot** - anchoring a screenshot to one corner and letting two sides bleed shows it at a legible scale and implies a bigger product than the tile can hold.
- **Lifted UI fragments** - pulling three real cards out of the interface onto a frosted panel focuses attention on the metric being discussed. See `../../../patterns/evergrid-design-system.md`.
- **Split text column** - prose at the top, checklist anchored low, matching the square tile's height.

## Build brief

```text
Build an alternating product-feature section that shows real interface in square tiles.

Section: background [PAGE_COLOUR], padding-block 96px, container max-width 1120px.
Rows: [2-4 FEATURES], vertical gap 80px. Each row is a grid (1.2fr 1fr, gap 64px); even rows swap the visual
order with `order` while the DOM keeps text first.

Media tile: aspect-ratio 1/1, radius 14px, overflow hidden, [PHOTO] as cover background with a [BRAND_DARK]
wash at 30-50%. Two tile variants, alternated:
 A) Cropped screenshot - [PRODUCT SCREENSHOT] positioned absolutely at left 7%, top 7%, width 130%, with
    radius 10px on its top-left corner, so it bleeds off the right and bottom edges.
 B) Lifted cards - a centred frosted panel (width 72%, radius 20px, rgba(255,255,255,.22), backdrop blur
    14px, padding 16px) holding [3 METRIC CARDS] stacked with 6px gaps; each card is white, radius 10px,
    padding 16px 20px, with [LABEL] 12px, [VALUE] 22px/600 and [TREND] 11px right-aligned.

Text column: flex column, justify space-between, padding-block 40px. Top: h3 [FEATURE TITLE], serif,
28px/1.25; paragraph [FEATURE BODY] 15-16px/1.6, muted ink, max-width 36ch. Bottom: <ul> of [3 BULLETS]
with a 16px round accent check badge and 15px text, row gap 16px.

Motion: when a row is 20% in view, fade and raise the text group (24px, 500ms), then slide the screenshot
in 24px from its bleed direction or stagger the metric cards by 80ms. Once only.

Responsive: <=991px gap 40px and smaller type; <=767px single column, media above text, bullets directly
after the paragraph, tile capped at 480px.

Reduced motion: all content visible at rest immediately.
Accessibility: screenshots get concise alt text describing what the feature shows; metric cards built as
real text; lists are real lists; 4.5:1 contrast. Performance: lazy-load tiles, explicit dimensions,
screenshots as WebP/AVIF at no more than 2x rendered size.
```

## Adaptation notes

Alternate the two tile types so the section does not look like a screenshot gallery. Crop screenshots so that no text is cut mid-word at the bleeding edges. Darken the muted paragraph for contrast. On phones a bleeding screenshot becomes tiny; swap in a tighter crop via `<picture>`.
