---
id: "oversight-supply/evergrid-about-us-other-01"
name: "Evergrid About Us Other 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-about-us-other-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-about-us-other-01"
kind: "other"
origin: "Evergrid template"
access: "free-with-account"
theme: "dark"
summary: "Open-roles careers block: centred heading over a 2x2 grid of translucent frosted cards on a green-washed landscape photo, each with title, terms, blurb and a full-width outline pill."
tags: ["careers", "job-listings", "saas", "photo-background", "frosted-cards"]
techniques: ["glassmorphism", "editorial-serif-display", "pill-button-with-arrow-chip", "photo-background-with-tint"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "low"
---

# Evergrid About Us Other 01

## What it is

A careers listing presented as four cards rather than a table. It lives on an about page, catalogued as "other" because it is a job-openings block. The background is a full-bleed nature photograph under a green tint, and the cards are translucent panels on top, so the listing feels like part of the brand story instead of an HR widget.

> Evidence basis: this entry is based on a single static public thumbnail (a desktop render); the live preview was unavailable. Colour values are sampled from that screenshot and sizes are estimates or proportions, not measured CSS.

## Layout anatomy

- Full-bleed section with a landscape photograph behind the content under a green tint; content sits above in a centred container.
- Centred header: serif h2 and a one-line paragraph, then about 90px of space.
- 2-column, 2-row grid of equal cards with a gap of roughly 32px; cards are about 5:3.
- Card anatomy, top to bottom: a header row with the role title on the left (serif) and employment terms on the right (sans, same baseline, right-aligned); a large flexible gap; a footer group with a two-line description (max about 75% of card width) and a full-width pill button.
- The button is an outline pill spanning the card's inner width, label centred, with a solid white circular arrow chip docked at the right end.
- Card padding is about 40px; the header-to-footer gap is what gives the card its height.
- Tablet and mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** Lora regular for the section title (about 2.2x body) and role titles (about 1.5x body); grotesque sans for terms, description and button label (label medium weight).
- **Colour:** photo washed with deep green, sampling around #426051 near the top and darkening downwards; card fill a lighter desaturated green around #708479 at partial opacity, so the photo ghosts through; all text white; outline about 1.5px white at reduced opacity; arrow chip white with dark arrow.
- **Shape and depth:** card radius about 16px; no border; no drop shadow. Depth comes only from translucency. Whether a backdrop blur is applied was not determined: the thumbnail shows soft, low-contrast imagery behind the cards, which is consistent with either blur or simple alpha.

## Motion and interaction

Not determined (live preview unavailable). The only related fact observed is that the template is a Webflow build whose page loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion is plausible, but none of it was seen running. Hover, focus, open/close and reduced-motion behaviour were not observed.

## Techniques worth reusing

- **Title/terms split row** - putting contract type and location on the title's baseline, right-aligned, lets a reader scan terms down one edge of the grid.
- **Two-layer background (image + tint overlay)** - building the tint as a separate CSS layer makes the tint adjustable without re-exporting the photo and keeps text contrast predictable.
- **Full-width outline action inside a card** - reads as secondary to page CTAs while still giving a large target.
- **Glassmorphism** - see `../../../patterns/glassmorphism.md` if present; here it is restrained to one fill and no border.

## Build brief

```text
Build an "open roles" section for [COMPANY].

Structure: a section with position: relative and a background layer containing a cover image
([BACKGROUND_IMAGE], decorative, alt="") and a tint overlay (brand colour at ~65% opacity, slightly darker
toward the bottom). Above it, a centred header (serif h2 "[HEADING]", one-line intro "[INTRO]") and a
<ul> grid of role cards, 2 columns with 32px gap.

Card: translucent panel (white at 18-22% over the tint, optional backdrop-filter: blur(12px)), 16px radius,
40px padding, flex column with space-between, min-height 300px. Top row: role title "[ROLE_TITLE]" (serif
h3) left and terms "[TYPE] / [LOCATION]" right, baseline-aligned, wrapping below the title when space runs
out. Bottom group: a 2-line summary "[ROLE_SUMMARY]" and a full-width outline pill link "[VIEW_LABEL]" with
a filled circular arrow chip at the trailing edge.

Behaviour: the pill is a real <a> to the role page; on hover and focus-visible the outline fills to ~15%
white and the arrow chip nudges 4px right. Include an empty state ("[NO_ROLES_MESSAGE]" plus a general
application link) because job lists are often empty.

Responsive: single column below 760px; card min-height drops to auto with 24px gaps; padding 24px.

Motion: header fades up on entry; cards fade up with a 70ms stagger. prefers-reduced-motion: no transforms.

Quality: verify 4.5:1 contrast for the smallest text against the lightest part of the card over the
brightest part of the photo; provide a solid-colour fallback when backdrop-filter is unsupported; lazy-load
the background and give it a dominant-colour placeholder; link text must be unique for screen readers
(visually hidden role name inside each link).
```

## Adaptation notes

Reusable for any short list of same-shaped items over imagery: service tiers, locations, event sessions. Past six items switch to a compact list, because large cards waste space when people are scanning for one title. The weakest point is contrast: white text on a mid-green translucent card over a photo can dip below AA, so darken the tint before lightening the text. Repeating "View role" four times is ambiguous out of context: add accessible names.
