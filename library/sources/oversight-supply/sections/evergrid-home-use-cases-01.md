---
id: "oversight-supply/evergrid-home-use-cases-01"
name: "Evergrid Home - Use Cases 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-home-use-cases-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-home-use-cases-01"
kind: "use-cases"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "Left-aligned serif title and intro above three tall photo cards; each card carries a client logo, a serif outcome headline, a named person and a white circular arrow button."
tags: ["saas", "case-studies", "photo-cards", "serif-headline", "social-proof"]
techniques: ["photo-card-grid", "whole-card-link", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Home - Use Cases 01

## What it is

A teaser row for industry use cases or case studies: three portrait cards, each a full-bleed photograph with text over it. It suits pages where social proof should feel editorial rather than like a logo strip. The single idea: each card is a poster with the outcome as its headline. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- **Header:** left-aligned title, then a two-line muted paragraph about 42% of the panel width. About 55px (thumbnail scale) below, a very faint hairline is drawn per column, then about 20px to the cards.
- **Grid:** three equal columns, each about 29% of the panel width, gap about 1.5% (roughly 22px). Side margins about 5.8% of the panel.
- **Card:** portrait, almost exactly 2:3 (width:height); the photo fills it edge to edge.
- **Content, with about 5.5% inner padding:** top-left a small white client logo; about 50px below it a three-line serif headline; bottom-left a person's name over a job title; bottom-right a white circular arrow button (about 9.5% of card width). The middle of the card is left clear for the photo subject.
- Tablet/mobile reflow and whether the whole card is the link: not determined (live preview unavailable).

## Visual system

- **Type:** section title in a serif (reads as Lora) at about 42-44px equivalent, near-black; card headline in the same serif at about 28-30px, white, regular; intro and name/role in a neutral sans (family not determined) - intro about 17px mid grey, name about 16px, role about 11-12px.
- **Colour (sampled from a screenshot):** panel cream `#f5f4eb`; card text white over naturally dark or darkened photos (storm grey, deep blue, warm brown), each fading darker toward the bottom; arrow disc white with a dark arrow.
- **Shape and depth:** card radius about 16-18px; no borders or shadows.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Poster card with space-between** - logo and headline at the top, attribution at the bottom, photo subject left clear in the middle.
- **Colour variety from photography only** - the cards share one layout and one text colour; each photo's dominant hue differentiates them. See `../../../patterns/evergrid-design-system.md`.
- **Arrow disc as the affordance** - one consistent circular arrow in the same corner signals "open" without a text link.

## Build brief

```text
Build a three-card use-case / case-study teaser section.

Header: left-aligned. h2 [SECTION TITLE] in a serif display face, clamp(32px, 3.4vw, 48px); paragraph
[SECTION INTRO] 17px/1.6, muted ink, max-width 60ch. 48px below, a 1px rule at 8% ink, then 24px to the grid.

Grid: 3 columns, gap 24px. Each item is an <article> whose content is wrapped by a single <a> to
[DETAIL URL]. Card: aspect-ratio 2/3, radius 20px, overflow hidden, position relative. [PHOTO] absolutely
fills the card (object-fit cover). Over it a gradient: rgba(0,0,0,.35) at top to transparent at 40%, then to
rgba(0,0,0,.6) at the bottom.

Content layer: padding 28px, flex column, justify space-between, colour white.
Top: [CLIENT LOGO] (height 24px, monochrome white), 32px gap, h3 [OUTCOME HEADLINE] serif 28px/1.25, max
three lines. Bottom row: left [PERSON NAME] 16px and [ROLE] 12px at 80% opacity; right a 44px white circle
with a 16px arrow icon.

Hover/focus-visible: photo scales to 1.04 over 500ms, arrow disc translates 4px right, focus ring 2px offset.
Scroll: when the grid is 15% in view, cards go from opacity 0 and a 32px rise to rest over
600ms ease-out with a 120ms stagger; once only.

Responsive: <=991px two columns with the third card spanning or wrapping; <=640px horizontal scroll-snap row
with cards at 82vw, or a single column with aspect-ratio 4/5.

Reduced motion: no reveal, no zoom.
Accessibility: link text is the headline (logo alt = client name, arrow aria-hidden); 4.5:1 contrast on all
overlay text. Performance: lazy-load photos with sizes="(max-width: 640px) 82vw, 33vw"; animate only
transform, opacity and filter.
```

## Adaptation notes

The headline should state a result, not a company name - the logo already does that. Pick photos with a calm upper third or the headline will fight the image; add a top gradient regardless. With more than three items, switch to a scroller rather than a second row of tall cards.
