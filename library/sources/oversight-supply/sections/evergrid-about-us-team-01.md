---
id: "oversight-supply/evergrid-about-us-team-01"
name: "Evergrid About Us Team 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-about-us-team-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-about-us-team-01"
kind: "team"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "Three-column team grid of tall rounded portraits with a row of circular social buttons overlaid on the photo and a serif name plus small role line beneath."
tags: ["team", "about", "portraits", "cream-and-green", "saas"]
techniques: ["overlay-social-links", "editorial-serif-display"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "low"
---

# Evergrid About Us Team 01

## What it is

A people grid for an about page: six members in two rows of three, with no section heading in the thumbnail. Each member is a tall, softly lit portrait with name and role set beneath it, outside the image. Social links are not listed under the name: they sit as a row of small round buttons over the lower part of the photo, which keeps the caption to two quiet lines.

> Evidence basis: this entry is based on a single static public thumbnail (a desktop render); the live preview was unavailable. Colour values are sampled from that screenshot and sizes are estimates or proportions, not measured CSS.

## Layout anatomy

- A centred container on the cream page with about 50px of padding around the grid.
- Grid: three equal columns, column gap about 24px, row gap about 100px including the caption.
- Card: a portrait image of roughly 5:6 with rounded corners. On the first card a centred row of four social buttons overlays the photo about 12% up from its bottom edge.
- Caption below the image with about 20px gap: name on one line, role on the next, both left-aligned to the image edge.
- Tablet and mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** names in Lora regular, about 1.25x body; role in the grotesque sans, small (about 0.85x body), near-black rather than grey.
- **Colour:** page cream #f5f4eb; social buttons white discs with dark glyphs; a subtle dark gradient at the bottom of the first photo to seat the buttons.
- **Shape and depth:** image radius about 16px; social buttons about 38px circles with about 10px gaps; no card background, border or shadow, so the photos are the only blocks on the page. Consistent photographic treatment (window light, neutral clothing, muted backgrounds) is what makes the grid cohere.

## Motion and interaction

Not determined (live preview unavailable). The only related fact observed is that the template is a Webflow build whose page loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion is plausible, but none of it was seen running. Hover, focus, open/close and reduced-motion behaviour were not observed.

## Techniques worth reusing

- **Overlay actions on the portrait** - moves secondary links off the caption, keeping name and role clean; needs a contrast scrim behind the buttons.
- **Caption outside the image** - text never fights the photograph, and names remain selectable and legible on any crop.
- **Art-directed portrait set** - the grid needs no chrome because the photos share light, palette and crop ratio; budget for that when adapting.

## Build brief

```text
Build a team grid section for [COMPANY].

Structure: optional centred header (h2 "[HEADING]", intro "[INTRO]" max 55ch). Then a <ul> grid with
repeat(3, minmax(0, 1fr)), 24px column gap, 64px row gap. Each <li> is a card: a figure with a 5:6
rounded (16px) image ([PHOTO_n], alt = the person's name), and beneath it the name "[NAME_n]" in the serif
face and the role "[ROLE_n]" in small sans text.

Social links: inside the image wrapper, an absolutely-positioned row centred 12% above the bottom edge with
up to four 40px circular white buttons ([SOCIAL_LINKS_n]), each an <a> with an aria-label such as
"[NAME_n] on [NETWORK]". Put a bottom-up dark gradient (0 -> 35% black) behind the row.

Behaviour: on devices that support hover, the row and gradient are hidden until the card is hovered or
any link inside receives focus (use :hover and :focus-within), fading in over 200ms and rising 8px. On
touch devices (hover: none) show the row permanently.

Responsive: 2 columns from 560px to 900px, 1 column below 560px with the image capped at 420px wide.

Motion: cards fade up with a 60ms stagger when the grid enters the viewport. With prefers-reduced-motion,
no transforms and the social row appears without transition.

Quality: reserve image aspect ratio to prevent layout shift, serve responsive sources (sizes about 33vw
desktop), lazy-load below the fold, 44px touch targets on touch devices, links reachable by keyboard in DOM
order, names as headings only if the page outline needs them.
```

## Adaptation notes

Best for teams of three to twelve with commissioned or at least consistently graded photos; mixed-quality headshots will break it faster than any CSS problem. In the thumbnail only the first portrait shows the social row; whether that is a hover state or a per-member setting was not determined, but either way do not ship hover-only social links, since touch users would never see them. Give portraits and social icons meaningful alt text and labels. If members have bios, link the name rather than adding more overlay content.
