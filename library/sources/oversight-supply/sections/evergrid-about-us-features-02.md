---
id: "oversight-supply/evergrid-about-us-features-02"
name: "Evergrid About Us Features 02"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-about-us-features-02"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-about-us-features-02"
kind: "features"
origin: "Evergrid template"
access: "free-with-account"
theme: "dark"
summary: "Dark-green split panel: serif claim top-left, one oversized statistic with a small unit bottom-left, and a large captioned photo on the right."
tags: ["saas", "about", "statistic", "dark-green", "split-layout"]
techniques: ["stat-counters", "editorial-serif-display", "oversized-type"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "low"
---

# Evergrid About Us Features 02

## What it is

A proof block for an about page: one claim, one number, one photograph. The left column is split vertically, with the statement pinned to the top and a single large statistic pinned to the bottom, so the empty space between them does the emphasising. It suits teams that have one strong metric and want it to land without a row of competing counters.

> Evidence basis: this entry is based on a single static public thumbnail (a desktop render); the live preview was unavailable. Colour values are sampled from that screenshot and sizes are estimates or proportions, not measured CSS.

## Layout anatomy

- Full-bleed dark section, inner container, two-column grid at roughly 45/55 with a wide gutter.
- Left column behaves like a space-between column matched to the image height: top group is a serif heading (two lines) and a short paragraph capped near 22ch-wide lines; bottom group is the statistic, a three-line explanatory paragraph and a compact white button.
- Statistic: the number is set very large with the unit ("%") as a small baseline-aligned subscript immediately after it, at about a third of the numeral height.
- Right column: a near-square photo (about 11:10) with square corners in the thumbnail, followed by a one-line caption beneath it, left-aligned to the image edge.
- Section padding is generous: roughly 90px above and below the grid at desktop.
- Tablet and mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** Lora regular for the heading (about 2.2x body). The statistic is in the grotesque sans, light-to-regular weight, tight tracking, about 6x body size: the only place in this set where the sans goes to display size. Body and caption in the same sans, caption one step smaller.
- **Colour:** background deep green #234839; all text white, paragraphs at full white rather than tinted; button white with deep green label.
- **Shape and depth:** flat. No cards, borders or shadows; button radius about 8px (a different, squarer button from the template's pill).

## Motion and interaction

Not determined (live preview unavailable). The only related fact observed is that the template is a Webflow build whose page loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion is plausible, but none of it was seen running. Hover, focus, open/close and reduced-motion behaviour were not observed.

## Techniques worth reusing

- **One statistic, not four** - a single figure with a full sentence of context is more credible than a strip of unexplained counters.
- **Space-between column matched to media height** - letting the image set the row height and pushing the two text groups to opposite ends produces a composed layout with no manual spacing.
- **Unit as subscript** - shrinking the unit keeps the numeral dominant and avoids the awkward width of a full-size percent sign.
- **Captioned image in marketing** - a caption turns a stock-feeling photo into a statement.

## Build brief

```text
Build a "claim + single statistic + photo" section on a dark brand surface ([SURFACE_DARK]).

Structure: 2-column grid (minmax(0,5fr) minmax(0,6fr), 64-96px gap). Left column is a flex column,
justify-content: space-between, stretched to the image height. Top group: serif h2 "[CLAIM]" and a short
paragraph "[SUPPORT]" (max 34ch). Bottom group: the statistic "[VALUE]" with unit "[UNIT]" rendered as a
smaller inline element aligned to the baseline (about 0.35em of the numeral), a paragraph explaining what
the number measures and its source "[STAT_CONTEXT]", and an optional secondary button "[CTA_LABEL]".
Right column: <figure> with a ~11:10 image ([IMAGE]) and a one-line <figcaption> "[CAPTION]".

Type: numeral in the sans at clamp(72px, 9vw, 128px), weight 400, letter-spacing -0.03em,
font-variant-numeric: tabular-nums. Heading clamp(28px, 3vw, 40px).

Responsive: below 900px stack as heading, figure, statistic group; drop space-between and use 40px gaps.

Motion: each group fades up 20px once when 20% visible; caption 150ms after the image. If you add a
count-up, run it once, under 1.2s, and keep the final value in the DOM from the start so it is readable
without JS. With prefers-reduced-motion: no transforms and no count-up.

Quality: mark the statistic up so it reads as one phrase to a screen reader (value + unit + meaning);
contrast at least 4.5:1 on the dark surface; image has explicit dimensions and loading="lazy"; do not
animate layout properties.
```

## Adaptation notes

Drop it between lighter sections as a rhythm break; the dark surface is doing structural work. Only use it with a number you can source: the explanatory sentence should say what was measured. If you have two metrics, stack a second statistic group rather than shrinking both. White body copy on the saturated green is comfortable at 16px but gets thin at caption size, so keep the caption at 14px minimum.
