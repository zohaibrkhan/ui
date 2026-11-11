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
summary: "Alternating two-column feature rows on cream: a square photo tile with a frosted chart card floating on it, opposite a serif heading, muted paragraph and three green-check bullets."
tags: ["saas", "zigzag", "feature-rows", "glass-card", "checklist"]
techniques: ["alternating-feature-rows", "glassmorphism", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Home - Features 02

## What it is

A classic zigzag feature block: two rows, each pairing one benefit with one illustrative graphic, mirrored on the second row. It suits products explained in two or three outcome statements. Its distinguishing move is the media tile - a moody photograph with a frosted-glass chart floating over it instead of a raw screenshot. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- Two rows inside a cream panel; no section header is visible in the still.
- **Row 1:** media left, text right. **Row 2:** text left, media right. The media tile takes about 48% of the panel width and the text about 35%, with a gap of about 5%.
- **Media tile:** square (1:1), radius about 3% of its width, three layers: background photo, dark-green wash, and a centred frosted card about 72% of the tile width holding a chart (a donut in row 1, a bar-and-line chart in row 2).
- **Text column:** heading (two lines) and paragraph (four lines) grouped at the top, about 12% of the tile height down from its top edge; the three-item checklist sits lower, starting about 60% down. The empty band between prose and list is deliberate.
- **Bullets:** small filled check badge plus one sentence; rows about 34-43px apart at thumbnail scale.
- Vertical gap between the two tiles is only about 9% of a tile's height, so the tiles nearly interlock diagonally.
- Tablet/mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** serif (reads as Lora) for row headings, about 26-28px equivalent, regular; sans body (family not determined), about 14-15px, mid grey for paragraphs and near-black for bullets.
- **Colour (sampled from a screenshot):** cream `#f5f4eb`; heading ink near-black; accent green `#3ec41e` (check badges, highlighted chart segment and line); tile wash in the deep-green family around `#234839`.
- **Shape and depth:** tile radius ~14-16px; frosted card radius ~24px, white at roughly 20% opacity; no drop shadows. Row 1 uses round check badges and row 2 rounded-square ones - an inconsistency worth normalising.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Photo + wash + frosted UI tile** - a repeatable recipe for feature art that does not need a polished product screenshot. See `../../../patterns/evergrid-design-system.md`.
- **Split text column** - heading block at the top, bullets anchored lower, so the text column fills the height of a square tile without stretching type.
- **One accent per chart** - charts are drawn in translucent white with a single green highlight, which keeps data art on-brand.

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

Add a third row and the rhythm still holds; beyond four, switch to a grid. The muted paragraph grey on cream is near the contrast limit - darken it. The frosted card needs a solid translucent fallback where `backdrop-filter` is unsupported. Keep chart graphics simple; they render small on phones.
