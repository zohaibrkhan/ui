---
id: "oversight-supply/evergrid-home-footer-01"
name: "Evergrid Home - Footer 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-home-footer-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-home-footer-01"
kind: "footer"
origin: "Evergrid template"
access: "free-with-account"
theme: "dark"
summary: "Closing block on one dark-green surface: an aerial photo band with a centred serif headline and button that fades down into a quiet footer of logo plus three link columns."
tags: ["saas", "footer", "cta-band", "link-columns", "dark", "photography"]
techniques: ["footer-link-columns", "photo-fade-into-footer", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Home - Footer 01

## What it is

The end of the page: a photographic call-to-action that dissolves into the site footer, so the last pitch and the sitemap read as one rounded block. The idea is the gradient hand-off - cream page into photo, photo into near-black green. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- One rounded block about 55% of the frame wide in the still (radius about 12-14px at thumbnail scale), roughly square overall.
- **Photo band (top ~57% of the block):** aerial image; its top edge fades to the cream page colour and its bottom fades to the footer colour. Centred on it: a two-line serif headline (about 36% of block width), a two-line supporting sentence, and a small rounded-rectangle button.
- **Footer body (bottom ~43%):** a hairline rule spanning about 81% of the block width, then one row: logo at the left; three link columns starting about 44% across. Column titles sit above lists of 4, 7 and 3 links.
- Link rows are about 21px apart at thumbnail scale; the title-to-list gap is about 30px. About 110px of empty dark space remains under the longest column.
- No newsletter form, social icons or copyright line are visible in the still.
- Tablet/mobile stacking: not determined (live preview unavailable).

## Visual system

- **Type:** serif (reads as Lora) for the headline, white, about 46px equivalent; everything else in a neutral sans (family not determined): supporting text about 12-13px, column titles and links about 11-12px at thumbnail scale (small).
- **Colour (sampled from a screenshot):** footer surface very dark green `#1a3029`; hairline `#1e342c`, only a few percent lighter; link text off-white at reduced opacity; button light cream `#f9f6ea` with dark label; logo leaf `#3ec41e` with a white wordmark.
- **Shape and depth:** button radius about 6-8px (not a pill, unlike the hero button); flat surface; depth comes only from the photo fade.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Photo fade into the footer** - two gradients (page colour at the top, footer colour at the bottom) turn a rectangular image into a transition between sections. See `../../../patterns/evergrid-design-system.md`.
- **Low-contrast hairline** - a divider a few percent lighter than the surface separates zones without drawing a visible line.
- **Unequal columns, empty left** - leaving the logo alone on the left and letting columns run to different lengths looks calmer than forcing a full grid.

## Build brief

```text
Build a combined closing call-to-action and footer on one dark surface.

Wrapper: one block with radius 20px (or full-bleed), background [BRAND_DARKEST], overflow hidden.

CTA band (top ~55% of the block, min-height 480px): [PHOTO] as a cover background with two gradients over
it - [PAGE_COLOUR] to transparent across the top 12%, and transparent to [BRAND_DARKEST] across the bottom
25% - so the image melts into the page above and the footer below. Centred content, max-width 560px:
h2 [CTA HEADLINE] in a serif display face, white, clamp(32px, 3.6vw, 52px), line-height 1.1, two lines;
paragraph [CTA SUPPORT] 15px white, max-width 36ch; button [CTA LABEL], light surface, dark label, radius
8px, height 44px. Add a soft dark scrim behind the text if the photo is busy.

Footer body: inner max-width 1120px, 24px gutters. A 1px rule at 8% white, then 48px padding. Grid of 12
columns: [LOGO] in columns 1-4; three link groups in columns 6-12, each a <nav aria-labelledby> with a 13px
heading and a <ul> of [3-7 LINKS], 13-14px at 80% white, row gap 10px. Bottom padding 96px. Optionally add
a final row with [COPYRIGHT] at 12px.

Interaction: links brighten to 100% white and gain a 1px underline on hover and focus-visible (150ms);
button darkens slightly on hover.

Responsive: <=991px logo on its own row above a three-column link grid; <=560px link groups in two columns
then one, CTA headline 30px, band min-height 380px, button full width.

Reduced motion: no transitions needed beyond colour.
Accessibility: <footer> landmark; the CTA sits in its own <section> with the h2; text over the photo must
reach 4.5:1 (use the scrim); 44px touch targets on links. Performance: lazy-load the photo with explicit
dimensions and a dominant-colour placeholder; no JavaScript required.
```

## Adaptation notes

Good for sites that want the footer to feel like part of the story. The supporting sentence sits directly on a detailed photo and is hard to read in the still - add a scrim. Link text is very small; use 14px minimum. Add a copyright/legal row, which the still lacks. The demo copy does not match the product theme, so treat all text as placeholder.
