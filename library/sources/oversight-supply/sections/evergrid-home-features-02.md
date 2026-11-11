---
id: "oversight-supply/evergrid-home-features-02"
name: "Evergrid Home - Features 02"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-home-features-02"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-home-features-02"
kind: "features"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "Alternating two-column feature rows on cream: a square photo tile with a frosted UI graphic that fades in, opposite a serif heading, short paragraph and three green-check bullets."
tags: ["saas", "zigzag", "feature-rows", "glass-card", "checklist"]
techniques: ["alternating-feature-rows", "glassmorphism", "text-reveal-on-scroll", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Home - Features 02

> **Evidence note.** This section is a Webflow export. Its stylesheet, scripts, fonts and images load from a CDN our sandbox could not reach, so the live preview rendered unstyled. This entry is based on the public preview's DOM (structure, class roles, inline initial animation states) and the vendor's public thumbnail (a 2050px-wide still, colours sampled from it). Hover/click states and the 390px layout were not rendered; anything marked *inferred* follows from markup only.

## What it is

A classic "zigzag" feature block: two rows, each pairing one benefit with one illustrative graphic, mirrored on the second row. It suits products that can be explained in two or three outcome statements, and its distinguishing move is the media tile - a moody photograph with a frosted-glass chart floating over it instead of a raw screenshot.

## Layout anatomy

- Section header: a centred `h3`-level statement above the rows.
- Each row is a two-column grid. In the thumbnail the media tile takes about 54% of the row and the text about 40%, with a gap near 5-6% of the row. Row two carries a "flipped" modifier: text first, media second in the source order as well as visually.
- **Media tile:** square (1:1), radius about 2% of tile width, three layers: background photo, dark-green overlay, and a centred frosted card (about 72% of tile width) holding a transparent chart graphic.
- **Text column:** top-aligned heading and paragraph grouped together; the bullet list is pushed to the lower part of the column, leaving a deliberate gap (about a quarter of the tile height) between prose and list.
- **Bullets:** three rows, each a small filled check badge plus one sentence; row gap about 1.6x the text size.
- Vertical gap between rows is small (about 4% of row width), much tighter than the section's outer padding.
- Mobile reflow not observed; the grid is a standard two-column Webflow grid and is expected to stack.

## Visual system

- **Type:** Lora serif for row headings (about 28-30px equivalent, regular, two lines); sans body (family not determined) at about 15px in a mid grey for paragraphs and near-black for bullets.
- **Colour:** cream `#f5f4eb` surface; ink near-black; paragraph grey around `#6b6b66` (estimated); accent green `#3ec41e` for check badges and chart highlights; tile overlay deep green `#234839`.
- **Shape and depth:** tile radius ~16px; frosted card radius ~24px, white at roughly 20% opacity; no drop shadows. The first row uses round check badges, the second uses rounded-square ones.

## Motion and interaction

- Headings and paragraphs sit in "fade in on scroll" wrappers: they enter when scrolled into view (site-wide start state is 45px down, blurred 10px, transparent).
- The chart graphic inside each tile starts at opacity 0 with its own scroll trigger, so the photo is visible first and the UI fades in over it.
- No hover or click behaviour. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Photo + overlay + frosted UI tile** - a repeatable recipe for feature art that does not need a polished product screenshot. See `../../../patterns/evergrid-design-system.md`.
- **Split text column** - heading block at the top, bullets anchored lower, so the text column matches the height of a square tile without stretching type.
- **Two-stage reveal** - container first, inner graphic second; cheap depth from two opacity transitions.

## Build brief

```text
Build an alternating feature-rows section.

Header: centred statement [SECTION STATEMENT], serif, 28-32px, max-width 22ch, margin-bottom 64px.

Rows: [2-3 FEATURES]. Each row is a CSS grid, columns 1.15fr 1fr, gap 64px, align-items stretch. Odd rows
put media first; even rows swap with `order` (keep DOM order heading-first for screen readers).

Media tile: aspect-ratio 1/1, radius 16px, overflow hidden. Layers: [PHOTO] as cover image, a [BRAND_DARK]
overlay at 45%, and a centred frosted card (width 72%, radius 24px, rgba(255,255,255,.2),
backdrop-filter blur 14px) containing [CHART OR UI GRAPHIC] as transparent SVG/PNG.

Text column: flex column, justify space-between, padding-block 48px. Top group: h3 [FEATURE TITLE] in the
serif face, 30px/1.25; paragraph [FEATURE BODY] 16px/1.6 in a muted ink, max-width 38ch. Bottom group: a
<ul> of [3 BULLETS], each with a 16px accent check badge and 15px text, gap 20px.

Scroll behaviour: when a row is 20% in view, reveal heading then paragraph (opacity 0, y 40px to rest,
500ms, 100ms stagger); 200ms later fade the frosted graphic in (600ms). Run once.

Responsive: <=991px gap 40px; <=767px single column, media always above text, tile capped at 480px wide,
text padding 0, bullets directly under the paragraph.

Reduced motion: everything visible immediately.
Accessibility: decorative photo gets empty alt, the graphic gets a short description; bullets are a real
list; contrast 4.5:1 for the muted paragraph.
Performance: lazy-load tiles, set width/height, serve the photo at 2x the tile size at most.
```

## Adaptation notes

Add a third row and the rhythm still holds; beyond four, switch to a grid. The muted paragraph grey on cream is close to the contrast limit - darken it. The frosted card depends on `backdrop-filter`; provide a solid translucent fallback. Keep the chart graphics simple, since they render small on phones.
