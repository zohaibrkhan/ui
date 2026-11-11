---
id: "oversight-supply/florilegium"
name: "Florilegium"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/florilegium"
preview_url: "https://supply.madebyoversight.com/sections?preview=florilegium"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "mixed"
summary: "A pinned horizontal filmstrip of ten photo plates: vertical scroll slides the strip, the centred plate swells, a big clock ticks through the day, and the last plate expands to a full-bleed finale."
tags: ["editorial", "gallery", "photography", "minimal", "monochrome", "botanical", "calm"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "horizontal-scroll-gallery", "focus-scale-carousel", "card-to-fullscreen-expand", "scroll-velocity-skew", "parallax-layers", "stat-counters", "smooth-scroll", "editorial-serif-display", "mono-label-accents"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "css"]
complexity: "medium"
---

# Florilegium

## What it is

A quiet gallery chapter for a sequence of images that have an order: here ten photographs taken across one day. Vertical scroll is converted into a horizontal walk along the strip; whichever plate is nearest the centre grows to full size while its neighbours shrink, and a large time readout interpolates between the plates' timestamps. The final plate grows out of the strip to fill the viewport and becomes the background of the closing headline. It is pure DOM: no canvas.

## Layout anatomy

- Track height is computed from the item count: `(items x 42 + 170)vh`, so 590vh for ten plates (5310px at 1440x900, 4980px at 390x844). A sticky `100svh` stage sits inside it.
- Strip: every plate is an absolutely positioned `button` at left/top 0, placed each frame with `translate3d` plus explicit width and height.
  - Base plate height `min(48% of stage height, 34% of stage width / 0.75, 620px)`, aspect 3:4, vertical centre at 45% of the stage.
  - Each plate is scaled by a Gaussian of its distance from the fractional focus index: `0.42 + 0.58 * exp(-d^2 / 0.7)`, so the centred plate is 100%, its neighbours about 56%, the rest 42%. Widths are re-summed every frame, with a gap of `max(12px, 1.8% of width)`, and the whole row is shifted so the interpolated focus position is at the horizontal centre.
- Chrome layer (non-interactive, above the strip): top bar with a 1px rule, a three-line caption under the focused plate (mono plate number, italic serif title, mono location), the giant time row (`clamp(56px, 7.6vw, 132px)`: current time, a 1px progress line `clamp(60px, 11vw, 190px)` wide, end time) and a mono hint line at the bottom.
- A left-hand italic intro paragraph (max 300px) sits beside the first plate and is hidden under 900px.
- Final block: full-stage flex column, bottom-aligned, with kicker, `clamp(56px, 10vw, 180px)` title, 420px body, pill button, over a bottom-up dark gradient.
- Under 700px: plate height becomes `min(50% of height, 66% of width / 0.75)`, so one plate dominates with slivers of its neighbours; time row drops to `clamp(44px, 14vw, 70px)`; right side of the top bar is hidden.

## Visual system

- **Type:** Instrument Serif for the wordmark, plate titles (italic), the time numerals (tabular figures, 72% ink) and the finale; IBM Plex Mono 10-10.5px uppercase with 0.14-0.16em tracking for every label; Inter Variable 14px for the single body paragraph.
- **Colour:** warm grey paper `#eceae4`, ink `#24221e` (55% for soft labels, 18% for rules), cream `#f3efe4` for finale text. Each plate carries its own tint behind the image while it loads.
- **Shape and depth:** flat. 2px radius on plates, no shadows. Unfocused images are slightly desaturated (`grayscale(0.25)`) and return to full colour on hover or when active.

## Motion and interaction

- **Driver:** a ScrollTrigger with no animation attached supplies progress; a function on the GSAP ticker reads it every frame and writes inline styles. Lenis (lerp 0.08) smooths the scroll, which is what makes the strip glide.
- **Progress map:** 0-84% maps linearly onto focus index 0-9. 0-5% the intro paragraph slides 40px left and fades. 86-99.5% the last plate interpolates its centre, width and height from its strip slot to the full stage, its radius goes 2px -> 0, the other plates fade and drift 20% of the width outward, and the chrome fades. 93-100% the finale block rises 30px and becomes clickable.
- **Velocity skew:** plates take a `skewX` proportional to Lenis scroll velocity, clamped to +/-6deg and eased back at 10% per frame.
- **Inner parallax:** each image is scaled 1.22 inside its clip and shifted up to +/-10% horizontally by its distance from focus; the last image settles to scale 1 as it expands.
- **Readouts:** the time is linearly interpolated in minutes between adjacent plate times; the progress line is `scaleX(focus / 9)`; the caption remounts on each index change and plays a 0.7s rise-and-deblur keyframe.
- **Click / keys:** plates are buttons with `aria-current` on the active one; clicking scrolls to that plate (1.4s). Left/Right arrow keys step one plate while the section is the active trigger.
- **Load:** once images are ready, plates unmask with a `clip-path` inset reveal staggered outward from the centre plate, and the time digits rise into place.
- **Loading:** a full-stage "developing plates NN / 10" overlay counts image loads and is force-dismissed after 6s; failed images show a text fallback card.
- **Reduced motion:** no Lenis, no skew, no caption keyframe; the last plate does not expand, the chrome simply cross-fades to the finale between 86% and 95%.

## Techniques worth reusing

- **Gaussian focus scale** - size items by a bell curve of distance from a fractional index and re-lay the row each frame. Smoother than a snap carousel and needs no per-item timeline.
- **Track height from data** - derive the pinned distance from the item count so adding plates keeps the scroll speed per item constant.
- **Strip item becomes the next scene** - interpolate one item's box to the viewport instead of cross-fading to a separate hero.
- **A second readout tied to the same progress** - the clock gives the scroll a meaning beyond "next image".

## Build brief

```text
Build a pinned horizontal gallery section driven by vertical scroll, DOM and CSS transforms only.

Data: an ordered array of 8-12 items {image, title, label, value} where value is numeric and
increases along the sequence ([e.g. time of day, year, altitude]).

Structure: a <section> whose height is (items * 42 + 170)vh, containing a sticky 100svh stage.
Inside: a strip of absolutely positioned <button> cards (3:4, object-fit cover images), a
pointer-events-none chrome layer (top bar, caption for the active card, a very large numeric readout
"current — end" with a thin progress line between, a one-line hint), an intro paragraph beside the
first card, and a closing block ([KICKER], [CLOSING HEADLINE], [BODY], "back to start" button).

Behaviour: each frame read scroll progress p. Focus index f = clamp(p / 0.84) * (n - 1). Card size
= base * (0.42 + 0.58 * exp(-(i - f)^2 / 0.7)); base height = min(48% stage height, 620px). Lay the
cards out left to right with a ~1.8vw gap and translate the row so the interpolated focus sits at
centre, 45% down. Add inner image parallax (scale 1.2, shift up to 10% opposite to offset) and a
small skewX from scroll velocity (max 6deg). Interpolate the readout between neighbouring values.
From p = 0.86 to 1 grow the LAST card to fill the stage, fade the others and the chrome, then fade
in the closing block over it. Clicking a card scrolls to its position; mark the active card with
aria-current; arrow keys step between cards.

Responsive: under 700px base height = min(50% height, 88vw); hide the intro paragraph under 900px.
Reduced motion: native scroll, no skew or parallax, cross-fade to the closing block instead of the
expansion. Loading: show a counted preloader, never block longer than 6s, give failed images a text
fallback. Performance: only transform/opacity/size on the cards, will-change on the strip, images
decoded async and sized to at most 2x their largest rendered box.
```

## Adaptation notes

- Works for timelines, lookbooks, case-study sequences and product colourways. The numeric readout is the part to redesign first for your content.
- The preview inlines all ten images; with real assets, lazy-decode everything beyond the first three and keep the last one high-resolution because it goes full-bleed.
- Writing `width`/`height` every frame triggers layout; with ten cards it is fine, but for long strips switch to `scale` transforms on fixed-size cards.
- The plate images have empty alt text and rely on the button label for meaning; write real alternative text if the pictures matter.
- The last image needs room for white text bottom-left: choose a dark, low-detail frame.
