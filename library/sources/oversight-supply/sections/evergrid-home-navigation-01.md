---
id: "oversight-supply/evergrid-home-navigation-01"
name: "Evergrid Home - Navigation 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-home-navigation-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-home-navigation-01"
kind: "navigation"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "A floating cream pill navbar: leaf logo and wordmark on the left, four plain text links on the right, the current page in a heavier weight. No button, no dropdowns in the still."
tags: ["saas", "pill-navbar", "minimal", "webflow"]
techniques: ["sticky-nav", "pill-navbar"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Home - Navigation 01

## What it is

The site header for a conventional SaaS marketing site: one rounded capsule holding the brand on the left and a short row of text links on the right. The idea is restraint - the bar reads as an object placed on the page, not a full-bleed strip. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- One capsule spanning about 92% of the frame width (about 4% margin each side); height about 6.6% of its own width (roughly 85px if the capsule were 1290px wide); ends fully rounded (radius = half the height).
- Left: leaf glyph plus lowercase wordmark, inset about 2.2% of the capsule width from the edge.
- Right: four text links in a row, right-aligned with the same inset. Spacing is uneven in the still (about 100px, 80px and 60px gaps at thumbnail scale), which suggests equal-width link boxes or padding rather than a fixed gap.
- Nothing else: no call-to-action button, no icons, no search, no dropdown carets.
- Tablet/mobile collapse, menu panel and any dropdown behaviour: not determined (live preview unavailable).

## Visual system

- **Type:** neutral sans for links (family not determined), about 16-17px equivalent, regular; the current-page link is semi-bold. The wordmark is a tight, lowercase geometric sans inside the logo.
- **Colour (sampled from a screenshot):** capsule cream `#f5f4eb`; link ink near-black; logo leaf bright green `#3ec41e`; wordmark deep green close to `#1d382b`.
- **Shape and depth:** full pill radius; no visible border or shadow; separation comes purely from contrast with the backdrop.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Pill navbar as an object** - keep the bar inside the page container with a full radius so it can sit over a flat colour or a photo alike. See `../../../patterns/evergrid-design-system.md`.
- **Weight, not colour, for the current page** - a semi-bold current link keeps the bar monochrome and still marks location.
- **Logo carries the only colour** - one accent in the mark, everything else ink, makes the header recede.

## Build brief

```text
Build a responsive site header as a floating pill navbar.

Structure: a <header> containing a centred container (max-width ~1280px, 16-24px side gutters). Inside it a
single bar with full border-radius (999px), height ~64-72px, horizontal padding 24-40px, background
[SURFACE_COLOUR]. Left: [LOGO] linking home. Right: a <nav aria-label="Primary"> with [4-7 NAV LINKS] in a
flex row (gap ~32px) followed by one primary button [CTA LABEL].

Links: 16px, regular weight, [INK_COLOUR]; current page gets font-weight 600 and aria-current="page". Under
each link render a 1px line that is scaleX(0) by default and scaleX(1) on hover and focus-visible
(transform-origin left, 250ms ease-out).

Button: pill, [PRIMARY_COLOUR] background, label duplicated in an overflow-hidden wrapper so that on hover the
first label translates up -100% and the second rises into place (300ms ease). Hide the duplicate from
assistive tech with aria-hidden.

Behaviour: position sticky at top with ~16px offset. On first load fade/slide the bar in over 500ms.

Responsive: at <=991px hide the link row and show a 44x44px menu button (aria-expanded, aria-controls). The
menu opens as a rounded panel directly below the bar with links stacked at 48px row height and the CTA
full width; close on Escape, on link click and on outside click; trap nothing but return focus to the button.

Reduced motion: no load-in, no label roll, underline appears instantly.
Accessibility: visible focus rings, 4.5:1 text contrast, skip-link before the header.
Performance: no JS required except the menu toggle; logo as inline SVG; zero layout shift.
```

## Adaptation notes

Works on any light marketing site; over photography add a faint shadow or backdrop blur so the capsule separates. Four links is comfortable; past six, collapse earlier than 991px. The still shows no CTA - the brief adds one because most product sites need it; drop it for a faithful minimal bar. If you need dropdowns, add a click-driven disclosure pattern rather than hover-only menus.
