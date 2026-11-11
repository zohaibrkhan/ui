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
summary: "Left-aligned section header above three tall photo cards; each card is one link with a client logo, serif headline, named person and a circular arrow, rising in with a blur on scroll."
tags: ["saas", "case-studies", "photo-cards", "cms-list", "serif-headline"]
techniques: ["photo-card-grid", "text-reveal-on-scroll", "blur-rise-reveal", "editorial-serif-display", "whole-card-link"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Home - Use Cases 01

> **Evidence note.** This section is a Webflow export. Its stylesheet, scripts, fonts and images load from a CDN our sandbox could not reach, so the live preview rendered unstyled. This entry is based on the public preview's DOM (structure, class roles, inline initial animation states) and the vendor's public thumbnail (a 2050px-wide still, colours sampled from it). Hover/click states and the 390px layout were not rendered; anything marked *inferred* follows from markup only.

## What it is

A teaser row for case studies or industry use cases: three portrait cards, each a full-bleed photograph with text over it, linking to a detail page. It works wherever social proof needs to feel editorial rather than like a logo strip. The single idea: each card is a poster with the outcome as its headline.

## Layout anatomy

- **Header:** left-aligned `h2` and a two-line muted paragraph limited to about 45% of the container width; a faint hairline sits between header and cards in the thumbnail.
- **Grid:** three equal columns from a CMS-driven list, gap about 1.5% of container width (roughly 20-24px).
- **Card:** portrait, close to 2:3 (width:height). The whole card is one anchor. The photo is an absolutely placed cover image behind a content layer.
- **Content layer:** flex column with space between two groups and padding of about 5.5% of card width:
  - Top: client logo (white, small) then an `h3` headline of up to three lines.
  - Bottom: person name over job title on the left, a white circular arrow button on the right.
- Reflow at tablet/mobile not observed; three portrait cards normally become a horizontal scroller or a single column.

## Visual system

- **Type:** section title in Lora at about 44px equivalent; card headline in Lora at about 28px (the template's h4 size) in white, regular weight; body and name/role in a neutral sans (family not determined), name about 16px, role about 12px.
- **Colour:** section on cream `#f5f4eb`; title near-black; paragraph mid grey; card text white over photos that are darkened or naturally dark; arrow disc white with a dark arrow.
- **Shape and depth:** card radius about 16-20px; arrow disc about 44px; no borders, no shadows. Photos carry a bottom darkening so the name stays legible.

## Motion and interaction

- **Scroll reveal:** each card's initial inline state is translateY(45px), blur(10px), opacity 0; all three share one trigger and resolve to rest when the grid enters view (stagger not determined). The header text uses the same fade-in wrappers.
- **Hover:** the card is a single link with an arrow disc; the specific hover treatment (image zoom, arrow shift) was not determined.
- Reduced-motion handling: not determined.

## Techniques worth reusing

- **Blur-rise reveal** - combining a short upward move with a blur-to-sharp transition feels softer than a plain fade; keep the blur at or below 10px and the distance under 50px. See `../../../patterns/evergrid-design-system.md`.
- **Poster card with space-between** - logo and headline at the top, attribution at the bottom, photo subject in the middle left clear.
- **Whole-card link** - one anchor per card avoids nested interactive elements and gives a large target.

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
Scroll: when the grid is 15% in view, cards go from opacity 0, translateY 45px, blur 10px to rest over
700ms ease-out with a 120ms stagger; once only.

Responsive: <=991px two columns with the third card spanning or wrapping; <=640px horizontal scroll-snap row
with cards at 82vw, or a single column with aspect-ratio 4/5.

Reduced motion: no reveal, no zoom.
Accessibility: link text is the headline (logo alt = client name, arrow aria-hidden); 4.5:1 contrast on all
overlay text. Performance: lazy-load photos with sizes="(max-width: 640px) 82vw, 33vw"; animate only
transform, opacity and filter.
```

## Adaptation notes

The headline should state a result, not a company name - the logo already does that. Pick photos with a calm upper third or the headline will fight the image. `filter: blur` on three large images can drop frames on low-end phones; drop the blur there and keep the rise. With more than three items, switch to a scroller rather than a second row of tall cards.
