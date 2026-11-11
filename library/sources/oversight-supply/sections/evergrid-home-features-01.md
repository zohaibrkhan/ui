---
id: "oversight-supply/evergrid-home-features-01"
name: "Evergrid Home Features 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-home-features-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-home-features-01"
kind: "features"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "Problem-statement feature block: left column with serif heading, three icon-led pain points and a closing line; right side a staggered three-row collage of rounded photos and one text tile."
tags: ["saas", "problem-statement", "collage", "cream-and-green", "features"]
techniques: ["image-collage", "bento-grid", "editorial-serif-display", "lead-term-list"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "medium"
---

# Evergrid Home Features 01

## What it is

The "why this matters" section that follows a home-page hero. The left column names the problem in a two-line heading, itemises three pain points and ends with a consequence statement. The right side is an offset collage of five tiles (photos, one of them a text tile on a blurred green image) arranged in three rows with deliberately misaligned edges, which gives a calm page its one piece of irregular rhythm.

> Evidence basis: this entry is based on a single static public thumbnail (a desktop render); the live preview was unavailable. Colour values are sampled from that screenshot and sizes are estimates or proportions, not measured CSS.

## Layout anatomy

- Two columns inside the container at roughly 38/62. The text column is vertically centred against the collage.
- Text column, top to bottom: h2 (two lines, each a full sentence), muted paragraph (two lines), a large gap (about 110px), a list of three items, another gap (about 70px), a closing paragraph of three lines. The list is the visual centre of the column.
- List item: a 20px line icon on the left, then a paragraph that begins with a bold term and continues in grey after a dash, wrapping to two lines.
- Collage: three stacked rows with a constant gap of about 16px.
  - Row 1: one wide tile (about 11:6), inset from the left and stopping short of the right edge.
  - Row 2: two tiles, a wide one (about 7:5) starting further left than row 1, and a narrower portrait-ish one extending furthest right. This row defines the collage's full width.
  - Row 3: two tiles, both near-square, inset on both sides again.
- Row heights are equal (about 270px at thumbnail scale); offsets between rows are about 55px, so no vertical edges line up across rows.
- Tablet and mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** Lora regular for the h2 (about 1.9x body) and for the tile heading (about 1.6x body, white); grotesque sans for copy. List text is small (about 0.85x body) with the lead term in near-black semibold and the rest mid grey.
- **Colour:** background cream #f5f4eb; text tile a blurred dark green image, sampling around #182e26 at its darkest; icons near-black line art; no accent colour.
- **Shape and depth:** tile radius about 16px; no borders or shadows; the outer section itself has a small radius in the thumbnail. Photos share warm window light and long shadows, which keeps five unrelated scenes coherent.

## Motion and interaction

Not determined (live preview unavailable). The only related fact observed is that the template is a Webflow build whose page loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion is plausible, but none of it was seen running. Hover, focus, open/close and reduced-motion behaviour were not observed.

## Techniques worth reusing

- **Offset-row collage** - equal-height flex rows with different inline insets give a hand-arranged look from trivially simple CSS, with no absolute positioning and no bespoke grid areas.
- **A text tile inside the image set** - one tile carrying a headline on a blurred colour field breaks up the photography and delivers a second message at the visual focal point.
- **Lead-term list items** - bold term, dash, grey explanation: scannable as three words, readable as three sentences.
- **Bento grid** - see `../../../patterns/bento-grid.md` if present; this is its looser, unaligned cousin.

## Build brief

```text
Build a "problem statement" feature section for [PRODUCT].

Structure: 2-column grid (minmax(0, 4fr) minmax(0, 6fr), 64px gap, align-items: center).
Left column: serif h2 "[PROBLEM_HEADLINE]" (two short sentences), muted paragraph "[PROBLEM_INTRO]", then
after 80-110px a <ul> of 3 items, each with a 20px line icon ([ICON_n], aria-hidden) and text
"<strong>[TERM_n]</strong> - [EXPLANATION_n]" with the explanation in muted colour; then after 64px a
closing paragraph "[CONSEQUENCE]".
Right column: a collage built as 3 flex rows with 16px gaps and equal heights (clamp(180px, 19vw, 280px)).
Row 1: one tile, margin-inline 9% 15%. Row 2: two tiles at flex 3 and flex 2, no inset. Row 3: two tiles
at flex 1 and flex 1.15, margin-inline 9% 5%. All tiles: 16px radius, overflow hidden, image
object-fit: cover ([IMAGE_1..4]). One tile in row 2 is a text tile: blurred brand-colour background
([TILE_BACKGROUND]) with a serif heading "[TILE_MESSAGE]" at the top-left, 24px padding.

Responsive: below 960px stack the columns, text first; collage insets shrink to 0 / 6%; below 560px the
collage becomes a 2-column grid with the text tile spanning both columns and row height 160px.

Motion: text blocks fade up on entry; collage tiles fade and scale from 0.96 with a 70ms stagger in
reading order. prefers-reduced-motion: no transforms.

Quality: decorative photos get alt=""; meaningful ones get real alt text; images lazy-loaded with sizes
about 30vw; text tile contrast 4.5:1; list is a real <ul>; no layout shift as images load (row heights
are fixed by CSS, not by image dimensions).
```

## Adaptation notes

Place it second on a landing page to frame the problem before features. The collage needs five images with shared lighting; with weaker imagery, reduce to three tiles or substitute product UI crops. Keep the insets asymmetric: once edges align it turns into an ordinary grid. The list copy in the reference is small and grey, so raise size and contrast.
