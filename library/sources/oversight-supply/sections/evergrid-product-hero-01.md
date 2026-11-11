---
id: "oversight-supply/evergrid-product-hero-01"
name: "Evergrid Product - Hero 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-product-hero-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-product-hero-01"
kind: "hero"
origin: "Evergrid template"
access: "free-with-account"
theme: "dark"
summary: "Dark-green rounded hero panel with nav inside it, a centred serif headline, a light pill CTA, a dashboard screenshot rising from the bottom edge, floating circular icon badges, and a logo strip beneath."
tags: ["saas", "product-hero", "dashboard-mockup", "floating-icons", "logo-strip"]
techniques: ["editorial-serif-display", "floating-icon-badges", "logo-cloud", "screenshot-rising-from-edge"]
stack: ["webflow", "css"]
complexity: "medium"
---

# Evergrid Product - Hero 01

## What it is

The hero for a product or features page. Everything sits inside one inset dark-green panel: navigation, headline, button and a screenshot that emerges from the panel's bottom edge, flanked by round icon badges that suggest an ecosystem. A row of customer logos follows directly underneath. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- **Panel:** inset about 2.3% from the cream page on left, right and top; radius about 20px; about 59% as tall as it is wide in the still.
- **Nav (inside the panel, on the dark surface):** white logo left, four white links right, aligned to an inner container about 86% of the panel width.
- **Text stack, centred:** two-line serif headline (about 51% of panel width), one-line subhead, then a light pill button (about 15% of panel width) with a dark circular arrow disc at its right end. Stack gaps about 30-35px at thumbnail scale.
- **Screenshot:** centred, about 70% of panel width, wrapped in a translucent frame about 12px thick; it starts about 65px below the button and is cut off by the panel's bottom edge.
- **Icon badges:** eight translucent circles, four each side of the screenshot, arranged as two loose arcs that fan outward toward the bottom; diameters grow from about 3.7% to about 6% of panel width going down.
- **Logo strip:** one row of five grey wordmark logos on the cream page under the panel, the outermost fading out at the edges.
- Tablet/mobile behaviour and whether the logo row scrolls: not determined (live preview unavailable).

## Visual system

- **Type:** serif (reads as Lora) headline, white, about 4% of panel width (~55px on 1440), leading about 1.1; neutral sans (family not determined) for subhead (~17px), nav and button label (semi-bold).
- **Colour (sampled from a screenshot):** panel deep green `#234839`; page cream `#f5f4eb`; button surface `#f3f5eb` with dark label; arrow disc darker green `#19402c` with a light-green arrow; icon badges `#516c61` (white at low opacity over the panel) with white glyphs; logos mid grey.
- **Shape and depth:** panel radius ~20px; screenshot frame radius ~16px on the top corners; badges are perfect circles; no shadows.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Nav inside the hero panel** - insetting the whole hero, header included, as one rounded slab gives a strong first screen and lets the page colour act as a frame. See `../../../patterns/evergrid-design-system.md`.
- **Screenshot rising from the edge** - clipping the product shot at the panel's bottom removes the need for a full-height image and pulls the eye down the page.
- **Size-graded floating badges** - circles that grow toward the bottom create fake perspective around a flat screenshot.
- **Edge-faded logo row** - a mask on the strip's ends implies more logos than are shown.

## Build brief

```text
Build a dark, inset product hero with an emerging screenshot and floating icon badges.

Panel: margin 16-24px from the viewport edges, radius 20px, background [BRAND_DARK], color white, overflow
hidden, padding 24px 24px 0. Place the site nav inside the panel at the top (logo left, [4-6 LINKS] right,
transparent background), aligned to an inner container of max-width 1120px.

Text stack: centred, margin-top 80px, max-width 760px. h1 [HEADLINE] in a serif display face,
clamp(38px, 4.4vw, 64px), line-height 1.1, two lines; p [SUBHEAD] 17-18px at 90% white; a pill button
[CTA LABEL] with a light surface, dark label and a 40px dark circular arrow disc on the right.

Screenshot: 64px below the button, centred, width min(72%, 940px). Wrap [PRODUCT SCREENSHOT] in a frame
with 12px padding, rgba(255,255,255,.3) background and radius 16px 16px 0 0; let the panel's bottom edge
clip it so roughly the top 45% of the screenshot is visible.

Badges: [6-8 ICONS] as absolutely positioned circles (rgba(255,255,255,.2), white glyph) on both sides of
the screenshot, sizes stepping 48, 60, 72, 80px from top to bottom and fanning outward. aria-hidden.

Logo strip: below the panel, padding-block 32px, a row of [5-7 CUSTOMER LOGOS] in monochrome at 60%
opacity, gap 64px, with a horizontal mask fading both ends; add a visually hidden heading for the list.

Motion: on load, fade/raise the text stack (staggered 80ms), slide the screenshot up 40px, then pop badges
in from scale .8 with 60ms stagger; afterwards float each badge +-6px on a slow 6-8s loop with offset phases.
Optionally scroll the logo row as a marquee, paused on hover.

Responsive: <=991px hide the outer badge pair, screenshot width 88%; <=640px hide all badges, headline
34px over three lines, button full width, logos wrap into two rows or scroll-snap.

Reduced motion: no entrance, float or marquee. Accessibility: 4.5:1 for white on [BRAND_DARK], real h1,
descriptive alt on the screenshot, logos with alt names. Performance: prioritise the screenshot image,
inline SVG icons, animate transforms and opacity only.
```

## Adaptation notes

Good for a secondary hero where the home page already used a light one. The badges are decorative: hide them from assistive tech and remove them below tablet width where they would collide with the screenshot. Keep the light button; a green-on-green CTA would vanish. Make the screenshot the prioritised LCP image.
