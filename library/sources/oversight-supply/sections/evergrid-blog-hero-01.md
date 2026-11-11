---
id: "oversight-supply/evergrid-blog-hero-01"
name: "Evergrid Blog Hero 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-blog-hero-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-blog-hero-01"
kind: "hero"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "Blog landing hero: centred serif title and intro, then one wide featured-post card with the image on the left and title, excerpt and bottom-pinned date on the right."
tags: ["blog", "featured-post", "hero", "cream-and-green", "saas"]
techniques: ["editorial-serif-display", "featured-card", "whole-card-link"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "low"
---

# Evergrid Blog Hero 01

## What it is

The top of a blog page. Rather than a decorative hero, it pairs a short centred title with the newest (or pinned) article presented as one large horizontal card, so the first screen already contains something to read. It is the same card language as the index grid, rotated to landscape and scaled up.

> Evidence basis: this entry is based on a single static public thumbnail (a desktop render); the live preview was unavailable. Colour values are sampled from that screenshot and sizes are estimates or proportions, not measured CSS.

## Layout anatomy

- Hero container with a centred header: h1 on one line, then a two-line paragraph held to roughly 55% of the container width. About 80px of space before the card.
- Featured card: spans the full container. Two columns at roughly 57/43. The image fills the left column edge to edge, top to bottom, with a near-square crop (about 1:1) and rounded corners; the right column is a padded text panel inside a hairline-bordered card.
- Right panel is a flex column with space-between: at the top, serif title (two lines) and grey excerpt (three lines, capped at about 80% of the panel width); at the bottom, a meta group (date, then author).
- Panel padding is about 30px inline, with the title starting about 13% down from the top, so the text does not hug the corner.
- No button is drawn inside the card, which suggests the whole card is the link (not verified).
- Tablet and mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** h1 in Lora regular at the template's largest size, about 3.5x body, slightly open tracking; card title Lora at about 2x body; intro paragraph in the grotesque sans at body size in near-black; excerpt and meta in mid grey.
- **Colour:** page cream #f5f4eb; card panel a touch lighter (#f7f6f2 family) with a 1px warm hairline; no accent colour anywhere, the photograph supplies it.
- **Shape and depth:** card radius about 12px; image radius the same on all corners; no shadow.

## Motion and interaction

Not determined (live preview unavailable). The only related fact observed is that the template is a Webflow build whose page loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion is plausible, but none of it was seen running. Hover, focus, open/close and reduced-motion behaviour were not observed.

## Techniques worth reusing

- **Content as hero** - promoting a real article into the hero gives returning visitors something new each time and removes the need for hero art.
- **Same card, two orientations** - the featured card reuses the grid card's parts (image tile, serif title, grey excerpt, meta) so the page needs one component with a layout modifier.
- **Bottom-pinned meta** - space-between in the text panel ties date and author to the image's bottom edge and makes the card look intentional at any excerpt length.
- **Eager hero image, lazy grid** - a recommendation rather than an observation: split loading priority by position, not by component.

## Build brief

```text
Build a blog landing hero for [SITE].

Structure: a centred header with a serif h1 "[BLOG_TITLE]" and an intro "[BLOG_INTRO]" (max 60ch, 2 lines
at desktop). Below, one featured post rendered as an <article> whose surface is a single
<a href="[POST_URL]">. The article is a 2-column grid (minmax(0, 4fr) minmax(0, 3fr)), with a 1px hairline
border, 12px radius and a fill one step lighter than the page. Left: image ([POST_IMAGE]) filling the
column height, object-fit: cover, 12px radius, min-height 420px. Right: flex column, space-between, 32px
padding (48px top): serif title "[POST_TITLE]" as an h2 with a 3-line clamp and excerpt "[POST_EXCERPT]"
(max 42ch) at the top; <time datetime> "[DATE]" and "[AUTHOR]" at the bottom.

Behaviour: hover/focus-visible scales the image to 1.02 within its clip and underlines the title. If no
post is flagged featured, fall back to the latest post; never render an empty card.

Responsive: below 820px stack image (16:10) above the text panel, reduce h1 with clamp(36px, 7vw, 64px),
and left-align the header if it wraps beyond 3 lines.

Motion: on load, fade up h1, intro and card in sequence (0, 90, 180ms; 500ms each; 16px travel).
prefers-reduced-motion: no animation, and content must be visible without JS (do not hide it pending a
script).

Quality: the featured image is the LCP element: load it eagerly with fetchpriority="high", correct sizes
and explicit dimensions; exactly one h1 on the page; link name is the post title; text contrast 4.5:1.
```

## Adaptation notes

Use it for blogs, resource hubs, case-study indexes or changelogs, anywhere "latest item" is a better hero than a slogan. If you add a load-in animation, do not hide the hero pending a script; prefer progressive enhancement. A near-square featured image is unusual for article art: either enforce a crop in the CMS or use object-position controls. Add a category chip above the title if the blog has sections.
