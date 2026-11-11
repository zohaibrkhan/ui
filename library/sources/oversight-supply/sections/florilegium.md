---
id: "oversight-supply/florilegium"
name: "Florilegium"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/florilegium"
preview_url: "https://supply.madebyoversight.com/sections?preview=florilegium"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "light"
summary: "A pinned horizontal filmstrip of ten photo plates: vertical scroll slides the strip, the centred plate swells, a big clock ticks through the day, and the last plate expands to a full-bleed finale."
tags: ["editorial", "gallery", "photography", "minimal", "monochrome", "botanical", "calm"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "horizontal-scroll-gallery", "focus-scale-carousel", "card-to-fullscreen-expand", "scroll-velocity-skew", "parallax-layers", "stat-counters", "smooth-scroll", "editorial-serif-display", "mono-label-accents"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "css"]
complexity: "medium"
---

# Florilegium

## What it is

A quiet gallery chapter for a sequence of images that have an order: here ten photographs taken across one day. Vertical scroll becomes a horizontal walk along the strip. Whichever plate is nearest the centre grows to full size while its neighbours shrink, and a large time readout runs smoothly between the plates' timestamps. The final plate grows out of the strip to fill the viewport and becomes the background of the closing headline. It is pure DOM: no canvas.

## Layout anatomy

- A sticky, full-viewport stage inside a tall track. The track length scales with the number of plates, so ten plates give a pin of roughly six viewport heights.
- **Strip:** portrait plates in a single row, vertically centred a little above the middle. The focused plate is roughly half the stage height; neighbours are about half that size and the rest smaller still. The row is continuously re-centred on the focused plate.
- **Chrome** (non-interactive, above the strip): a top bar over a hairline rule; a three-line caption under the focused plate (plate number, italic title, location); a very large time row reading "current time, thin progress line, end time"; a one-line hint at the bottom.
- **Finale:** a full-stage block with kicker, very large title, a short paragraph and a pill button, bottom-aligned over a dark gradient.
- At phone width one plate dominates with slivers of its neighbours either side, the time row shrinks, and part of the top bar is dropped.

## Visual system

- **Type:** Instrument Serif for the wordmark, italic plate titles, the time numerals (tabular figures) and the finale; IBM Plex Mono in tiny uppercase with wide tracking for every label; Inter for the one body paragraph.
- **Colour:** warm grey paper `#eceae4`, ink `#24221e` with lighter tints for labels and rules, cream `#f3efe4` for finale text. Each plate has its own flat tint behind the image while it loads.

## Motion and interaction

- **Scroll:** most of the pin maps linearly onto the walk from first plate to last. The intro paragraph slides away at the very start. In the final stretch the last plate grows from its slot to the full stage, the other plates fade and drift outward, the chrome fades, and the finale text rises in.
- **Inner parallax:** each image is slightly oversized inside its frame and shifts sideways against the direction of travel, so plates appear to have depth.
- **Readouts:** the time interpolates between neighbouring plates' times; the thin line fills with progress; the caption swaps with a short rise-and-deblur each time the focused plate changes.
- **Click and keys:** plates are buttons, with the active one marked as current. Clicking a plate scrolls to it; left and right arrow keys step one plate.
- **Load:** a counted "developing" overlay covers the stage until images are ready (it gives up waiting after a few seconds), then plates unmask outward from the centre and the time digits rise into place. A failed image is replaced by a text card.
- **Reduced motion:** native scrolling, no skew or caption animation, and the last plate does not expand; the chrome simply cross-fades to the finale.

## Techniques worth reusing

- **Bell-curve focus scale** - sizing each item by a smooth falloff of its distance from a fractional focus index, and re-laying the row every frame, gives a fluid carousel with no snapping and no per-item timelines.
- **Track length from data** - deriving pinned distance from the item count keeps scroll speed per item constant as content changes.
- **A strip item becomes the next scene** - interpolating one item's box to the viewport is more satisfying than cross-fading to a separate hero.
- **A second readout tied to the same progress** - the clock gives the scroll a meaning beyond "next image".

## Build brief

```text
Build a pinned horizontal gallery driven by vertical scroll, using DOM and CSS transforms only.

Data: an ordered list of [ITEMS], each with an image, a title, a short label and a numeric
[VALUE] that increases along the sequence (a time, a year, a distance, a price).

Structure: a section whose height grows with the number of items, containing one sticky
full-viewport stage. Inside: a row of image cards that are real buttons; a non-interactive
overlay with a caption for the active card and a large readout of the current [VALUE] against
the final one, joined by a progress line; an optional intro line; and a closing block with
[CLOSING HEADLINE], [BODY] and a "back to start" action.

Behaviour: each frame, convert scroll progress into a fractional focus index. Size every card
by a smooth falloff of its distance from that index so the focused card is clearly largest,
lay the row out again, and keep the focused position centred. Interpolate the readout between
neighbouring values. Optional polish: slight inner-image parallax and a small lean from scroll
velocity. In the last part of the pin, grow the final card to cover the stage, fade everything
else, and bring in the closing block over it. Clicking a card scrolls to it; arrow keys step;
mark the active card as current for assistive tech.

Responsive: on narrow screens let one card dominate with neighbours peeking in; drop the intro.
Reduced motion: native scroll, no lean or parallax, cross-fade to the closing block instead of
the expansion. Loading: a counted preloader that never blocks for long, and a text fallback for
failed images. Performance: animate transform and opacity where possible, decode images
asynchronously, and size them for their largest rendered box.
```

## Adaptation notes

- Works for timelines, lookbooks, case-study sequences and product colourways. The numeric readout is the part to redesign first for your content.
- The plate images have empty alternative text and rely on the button label; write real alternative text if the pictures matter.
