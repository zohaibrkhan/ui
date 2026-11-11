---
id: "oversight-supply/evergrid-blog-blog-01"
name: "Evergrid Blog Blog 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-blog-blog-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-blog-blog-01"
kind: "blog"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "Three-column blog index of bordered cards: square rounded image flush to the top, serif two-line title, grey excerpt and a small text footer, with a slide-up reveal."
tags: ["blog", "article-grid", "cream-and-green", "saas"]
techniques: ["editorial-serif-display", "whole-card-link", "inset-image-tile"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "low"
---

# Evergrid Blog Blog 01

## What it is

The article index for a blog page: a plain grid of six post cards, each with image, title, excerpt and a footer line. There is no filter bar, no featured slot and no pagination in this section; it is the repeatable unit and nothing else.

> Evidence basis: this entry is based on a single static public thumbnail (a desktop render); the live preview was unavailable. Colour values are sampled from that screenshot and sizes are estimates or proportions, not measured CSS.

## Layout anatomy

- A centred container, noticeably narrower than the template's other sections in the thumbnail.
- Grid: three equal columns, about 20px column gap, about 48px row gap. Rendered as a list with list-item roles.
- Card: the image sits at the top edge to edge, 1:1, with its own rounded corners; the card outline continues below it. Text block padding is about 16px inline, with roughly 28px above the title.
- Text order: serif title clamped to two lines; grey excerpt, three lines; a gap; footer (two stacked small lines: date, then author). Footers align across each row.
- No separate button or link is drawn inside the card, which suggests the whole card is the link (not verified).
- Tablet and mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** title in Lora regular, about 1.5x body with tight leading (about 1.15); excerpt in the grotesque sans at small size (about 12-13px at thumbnail scale) in mid grey; footer the same size in near-black.
- **Colour:** page cream #f5f4eb; card fill a slightly lighter, less yellow off-white #f7f6f2; card border a 1px warm hairline #e9e8e2; title near-black.
- **Shape and depth:** card radius about 12px, image radius matching at all four corners (the image reads as an inset tile, not a clipped header); no shadow. The card is distinguished from the page by about 1% of lightness and the hairline: deliberately quiet.

## Motion and interaction

Not determined (live preview unavailable). The only related fact observed is that the template is a Webflow build whose page loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion is plausible, but none of it was seen running. Hover, focus, open/close and reduced-motion behaviour were not observed.

## Techniques worth reusing

- **Whole-card link with one anchor** - a single wrapping link is the simplest correct structure for a card with one destination; no click-target puzzles, no nested interactive elements.
- **Image as inset tile with its own radius** - rounding all four image corners inside a bordered card looks more deliberate than clipping only the top two.
- **Near-invisible card surface** - a 1px hairline plus a hair of tonal shift organises the grid without boxing it in; useful when photography should carry the colour.
- **Footer pinned with flex** - margin-top auto on the meta line keeps baselines aligned across uneven titles.

## Build brief

```text
Build a blog index grid for [SITE].

Structure: a <ul> grid, repeat(3, minmax(0, 1fr)), 20px column gap, 48px row gap. Each <li> contains an
<article> whose whole surface is one <a href="[POST_URL]">: a 1:1 image ([POST_IMAGE], 12px radius on all
corners, object-fit: cover), then a padded body (16px inline, 24px top, 20px bottom) laid out as a flex
column: serif title "[POST_TITLE]" clamped to 2 lines, excerpt "[POST_EXCERPT]" clamped to 3 lines in muted
small text, then a footer pushed down with margin-top: auto showing <time datetime> "[DATE]" and
"[AUTHOR]". Card: 1px hairline border, 12px radius, fill one step lighter than the page.

Behaviour: on hover and focus-visible the image scales to 1.03 inside its clipped tile over 400ms and the
border darkens one step; the title gets an underline. Provide [EMPTY_STATE] and a "load more" control if
the collection exceeds [PAGE_SIZE].

Responsive: 2 columns from 600px to 960px; 1 column below 600px, where the card may switch to a horizontal
layout (96px square thumb left, text right) to keep the list scannable.

Motion: cards translate up 40px and fade in once as they enter the viewport, staggered 80ms per column.
prefers-reduced-motion: no translation, no zoom.

Quality: image width/height or aspect-ratio set to avoid layout shift; sizes="(min-width: 960px) 33vw,
(min-width: 600px) 50vw, 100vw"; lazy-load all but the first row; the link's accessible name should be the
title only (mark the image decorative when it adds nothing); muted text still meets 4.5:1.
```

## Adaptation notes

A dependable default for any CMS-backed listing (posts, resources, changelog highlights). First change is usually adding category labels or reading time to the footer line. The excerpt size in the reference is small; set it to 14px or more. Square thumbnails need art direction, as landscape hero images will crop badly, so either supply a dedicated thumbnail field or switch the tile to 4:3.
