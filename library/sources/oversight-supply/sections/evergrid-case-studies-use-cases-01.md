---
id: "oversight-supply/evergrid-case-studies-use-cases-01"
name: "Evergrid Case Studies Use Cases 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-case-studies-use-cases-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-case-studies-use-cases-01"
kind: "use-cases"
origin: "Evergrid template"
access: "free-with-account"
theme: "mixed"
summary: "Case-study index: centred serif headline over a three-column grid of tall full-bleed photo cards with client logo and title at the top and a named contact plus round arrow at the bottom."
tags: ["case-studies", "customer-stories", "photo-cards", "saas", "cream-and-green"]
techniques: ["full-bleed-image-cards", "editorial-serif-display", "whole-card-link", "logo-cloud"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "medium"
---

# Evergrid Case Studies Use Cases 01

## What it is

A customer-stories index. Every case study is a tall poster-like card: a dark, moody photograph fills the card, the client's logo and the story headline sit at the top, and the person quoted in the story is credited at the bottom beside a round arrow button. It does the job of a logo wall and a story list at once.

> Evidence basis: this entry is based on a single static public thumbnail (a desktop render); the live preview was unavailable. Colour values are sampled from that screenshot and sizes are estimates or proportions, not measured CSS.

For this section the thumbnail is a 1600px-wide page capture, so the measurements below are close to true desktop pixels.

## Layout anatomy

- Centred header: h1 on a single line (about 60px), then a two-line paragraph (about 16px) held to roughly 640px. About 50px between header and grid.
- Grid at 1600px viewport: content width about 1356px (about 122px side margins), three columns of about 425px with 40px gaps both ways. Two rows are visible (the second is cut off by the thumbnail), so at least six cards.
- Card: about 425 x 580px (roughly 3:4), radius about 16px, with the photograph filling the whole card behind the text.
- Content: two groups pushed to the top and bottom edges, about 32px padding all round. Top group: client logo (white, about 22-28px tall, left-aligned), then about 24px below it the story title as an h4 in serif, three lines, white. Bottom group: a row with name over job title on the left and a 52px white circular arrow button on the right, bottom-aligned.
- The photo is darkened at top and bottom so both text groups stay legible while the middle shows the image's subject.
- The round arrow is the only action drawn on a card, which suggests the whole card is the link (not verified).
- Tablet and mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** h1 in Lora regular with slightly tight tracking, deep green; card titles Lora regular at about 30-32px with about 1.1 leading; names and roles in the grotesque sans at 16px, medium then regular weight.
- **Colour:** page cream #f5f4eb; headline deep green near #0f2917; intro mid grey; card text white; arrow button white with dark arrow. Card imagery is selected and graded dark (forest, dusk, night) so white text works without a heavy flat overlay.
- **Shape and depth:** 16px radius, no border, no shadow. Contrast between cream page and dark cards is the entire effect.

## Motion and interaction

Not determined (live preview unavailable). The only related fact observed is that the template is a Webflow build whose page loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion is plausible, but none of it was seen running. Hover, focus, open/close and reduced-motion behaviour were not observed.

## Techniques worth reusing

- **Top/bottom text with a free middle** - space-between leaves the photograph's subject uncovered and gives each card a poster composition.
- **Attribution on the index card** - crediting a named person and role before the click adds credibility that a logo alone does not.
- **Curated dark imagery instead of heavy overlays** - choosing photos by tonal range keeps images rich; a light gradient at the edges then suffices.
- **Client logo as card eyebrow** - a monochrome logo standardises wildly different marks.

## Build brief

```text
Build a case-study index section for [COMPANY].

Structure: centred header with serif h1 (or h2 when not first on the page) "[HEADLINE]" and intro "[INTRO]"
(max 64ch). Then a <ul> grid: repeat(3, minmax(0, 1fr)), 40px gap. Each item is an <a href="[STORY_URL]">
card with aspect-ratio 3 / 4, 16px radius, overflow hidden, position relative.

Card layers: (1) cover image ([STORY_IMAGE], decorative) absolutely filling the card; (2) a gradient scrim,
dark at the top 35% and bottom 30%, transparent in the middle; (3) content as a flex column with
space-between and 32px padding. Top: client logo ([CLIENT_LOGO], single-colour white, max-height 28px, alt
= client name) and the story title "[STORY_TITLE]" in the serif face, max 3 lines. Bottom row: "[PERSON]"
and "[JOB_TITLE]" stacked on the left, a 52px circular white arrow badge on the right (aria-hidden).

Behaviour: on hover and focus-visible the image scales to 1.04 over 600ms ease-out and the arrow badge
translates 4px right; focus ring sits outside the radius. Offer optional industry filter chips above the
grid if there are more than [N] stories.

Responsive: 2 columns from 640px to 1024px, 1 column below 640px with aspect-ratio 4 / 5 and 24px padding;
title scales with clamp(22px, 2.4vw, 32px).

Motion: cards fade up 24px with a 70ms stagger on first view. prefers-reduced-motion: no translation or
zoom.

Quality: white text must hold 4.5:1 over the scrim for every image, so test the brightest photo; images
lazy-load with sizes about 33vw and a dark placeholder colour; link accessible name = client + title; no
text baked into images.
```

## Adaptation notes

Strongest with six to nine stories and photography you control. If the image supply is mixed, apply a uniform duotone or a stronger scrim rather than trusting each photo. Long titles are the failure mode: three lines at 32px is the ceiling, so clamp and write shorter headlines. Load the first row's images eagerly when this section is at the top of a page. Works equally for portfolio pieces, locations or event recaps.
