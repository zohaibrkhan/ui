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
summary: "Dark forest-green footer with a newsletter sign-up and social icons on the left, four link columns on the right, and a hairline-divided credits bar, all on a tall photo-backed panel."
tags: ["saas", "footer", "newsletter", "link-columns", "dark"]
techniques: ["footer-link-columns", "newsletter-inline-form", "underline-slide-hover", "form-with-validation"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Home - Footer 01

> **Evidence note.** This section is a Webflow export. Its stylesheet, scripts, fonts and images load from a CDN our sandbox could not reach, so the live preview rendered unstyled. This entry is based on the public preview's DOM (structure, class roles, inline initial animation states) and the vendor's public thumbnail (a 2050px-wide still, colours sampled from it). Hover/click states and the 390px layout were not rendered; anything marked *inferred* follows from markup only.

## What it is

The closing section of the template: a dark, calm footer that collects an email address, lists every page, and credits the makers. It is conventional on purpose; the value is a clean split between one action (subscribe) and navigation.

## Layout anatomy

- A dark panel fills the section. In the vendor thumbnail the footer is shown fused with a photographic call-to-action above it (aerial image fading into the dark green); in the live DOM this section is only the footer block, so treat the photo as an optional top treatment.
- **Main row (two zones):**
  - Left, the sign-up zone: a small title, a single-field email form (input plus submit button side by side), inline success and error message blocks that replace the form, and a row of three square social icon links.
  - Right, the link zone: four columns, each a small title followed by a vertical list of links. Column lengths differ (7, 3, 4 and 5 links); the last link in the final column is styled as an emphasised call-out.
  - In the thumbnail the left zone takes roughly 40% and the columns share the remaining 60%, with link rows about 21px apart at thumbnail scale.
- **Divider bar:** a hairline rule, then two short credit lines (maker and platform) with inline text links.
- Each footer link reuses the navbar's wrapper: anchor plus a sibling underline element.
- Mobile layout not observed; expected to stack sign-up above a two-column link grid.

## Visual system

- **Type:** sans throughout (family not determined). Column titles are small and slightly lighter than links; links about 13-14px equivalent. Credit links are uppercase.
- **Colour:** footer background very dark green `#1a3029`; hairline `#1e342c`-ish, only a few percent lighter than the background; text off-white at reduced opacity; accent `#3ec41e` in the logo; light button surface `#f9f6ea`.
- **Shape and depth:** flat. Input uses the template's dark text-field variant; button is the pill button from the pricing cards. No shadows.

## Motion and interaction

- Link hover: sibling underline animates in (same component as the header).
- Form: native email validation, a "please wait" label on the submit button while sending, then the form is swapped for a success message; a failure message appears below on error.
- No scroll animation markers were found inside this block. Reduced-motion handling: not determined.

## Techniques worth reusing

- **One action plus sitemap** - give the footer a single form and keep everything else as plain links.
- **Shared link component** - reuse the header's underline link so hover language is identical top and bottom. See `../../../patterns/evergrid-design-system.md`.
- **Low-contrast hairline** - a divider only 3-4% lighter than the surface separates credits without adding a visible line.

## Build brief

```text
Build a dark site footer with newsletter sign-up and link columns.

Container: full-width band, background [BRAND_DARKEST], text [OFF_WHITE] at 80% opacity, padding 96px top /
40px bottom, inner max-width 1280px with 24px gutters.

Main grid: 12 columns, gap 32px. Columns 1-5: [LOGO], a 14px label [NEWSLETTER TITLE], then a form with one
email input and a submit button on the same line (input: transparent, 1px border at 20% white, radius 999px,
height 48px, padding 0 20px; button: pill, light surface, dark label [SUBSCRIBE LABEL]). Below: a row of
[3 SOCIAL LINKS] as 40px icon buttons with accessible names. Columns 7-12: four link groups, each a
<nav aria-labelledby> with a 13px muted heading and a <ul> of [3-7 LINKS], 14px, row gap 12px.

Bottom bar: 1px rule at 8% white, margin-top 72px, then a flex row with [COPYRIGHT] left and [CREDITS] right,
12px, uppercase links with 0.04em tracking.

Interaction: links show a 1px underline that grows from the left on hover and focus-visible (200ms).
Form: validate email on submit, disable the button and change its label while pending, then replace the
form with a success message in an aria-live="polite" region; show errors inline, linked with
aria-describedby, and keep the typed value.

Responsive: <=991px sign-up spans full width above a 2x2 grid of link groups; <=560px link groups become a
single column or two narrow columns, input and button stack at full width, bottom bar stacks and centres.

Reduced motion: underline appears without transition.
Accessibility: <footer> landmark, labelled input (visible or sr-only label, not placeholder-only), 44px
touch targets, 4.5:1 contrast for muted text. Performance: no JS beyond form handling; inline SVG icons.
```

## Adaptation notes

Swap the template-housekeeping column for product or resources links. The source relies on a placeholder as the only field label and generic alt text on social icons - fix both. Muted text on dark green fails contrast quickly below 70% opacity. If you pair it with a photographic CTA above, fade the image into the footer colour with a gradient rather than a hard edge.
