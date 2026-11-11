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
summary: "A floating cream pill navbar: logo left, a row of text links with sliding underlines and a primary CTA right, collapsing to a hamburger drawer at tablet width."
tags: ["saas", "pill-navbar", "minimal", "webflow"]
techniques: ["sticky-nav", "pill-navbar", "underline-slide-hover", "text-swap-button"]
stack: ["webflow", "css", "gsap"]
complexity: "low"
---

# Evergrid Home - Navigation 01

> **Evidence note.** This section is a Webflow export. Its stylesheet, scripts, fonts and images load from a CDN our sandbox could not reach, so the live preview rendered unstyled. This entry is based on the public preview's DOM (structure, class roles, inline initial animation states) and the vendor's public thumbnail (a 2050px-wide still, colours sampled from it). Hover/click states and the 390px layout were not rendered; anything marked *inferred* follows from markup only.

## What it is

The site header for a conventional SaaS marketing site. A single rounded capsule holds the brand mark on the left and a short list of text links on the right, with a "buy/sign up" button closing the row. The idea is restraint: no dropdowns, no mega-menu, just one bar that reads as an object sitting on the page rather than a full-bleed strip.

## Layout anatomy

- Wrapper is a `role="banner"` nav bar containing a max-width container, then an inner holder that carries the capsule shape. In the thumbnail the capsule spans about 92% of the frame width, is roughly 6% of that width tall, and has fully rounded ends (radius = half height).
- Inside: logo link (leaf glyph + lowercase wordmark) at the left; a `<nav>` at the right holding a flex row of link wrappers followed by one button. Horizontal padding inside the capsule is roughly 2% of its width; links sit about 3-4% apart.
- Each link wrapper is two stacked children: the anchor and a thin empty "line" element directly beneath it (the hover underline).
- The live DOM has seven links plus a CTA button; the vendor thumbnail shows a four-link variant with no button. Treat the count as content, not structure.
- Collapse: the Webflow nav is configured to collapse at the "medium" breakpoint (991px and below) into a hamburger button that opens the same `<nav>` as a drop-down panel, default animation, 400ms ease. The rendered mobile panel was not observed.
- No dropdown or mega-menu markup exists in this section.

## Visual system

- **Type:** sans-serif UI face for links (family not determined; a neutral grotesque in the thumbnail), roughly 16-17px equivalent, regular weight; the current page link is medium/semi-bold. The wordmark is part of the logo image.
- **Colour:** capsule background cream `#f5f4eb`; link ink near-black; brand accent bright green `#3ec41e` (logo leaf); the CTA uses the template's deep green `#234839` family (inferred from the shared button component).
- **Shape and depth:** full pill radius, no visible border or shadow in the thumbnail; the bar relies on contrast with whatever is behind it.

## Motion and interaction

- On page load the navbar and its links are hidden until the interaction runtime initialises, then animate in (a load-in sequence; exact easing not determined).
- Hover on a link: the sibling line element under each link is the animated underline (inferred: scales or slides in from one side).
- The CTA button holds two copies of its label stacked vertically - the standard "text roll" hover where one label slides out as the duplicate slides in.
- Hamburger toggles the menu at <=991px over 400ms.
- Reduced-motion behaviour: not determined.

## Techniques worth reusing

- **Pill navbar as an object** - put the bar inside the page container with a full radius so it can float over a hero image or a flat background alike. See `../../../patterns/evergrid-design-system.md`.
- **Separate underline element** - a sibling line under each link lets you animate `transform: scaleX()` with a chosen origin, which is cheaper and more controllable than animating `text-decoration`.
- **Duplicate-label button** - two stacked labels in an `overflow: hidden` box give a roll-over hover with transforms only.

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

Works on any light marketing site; over photography give the capsule a slight blur or shadow so it separates. Seven links plus a button is the upper limit before the row crowds at 1024px - consider collapsing earlier. If you need dropdowns, this pattern has no provision for them; add a disclosure pattern rather than hover-only menus. Do not hide the bar until JS runs (as the source does) without a no-JS fallback.
