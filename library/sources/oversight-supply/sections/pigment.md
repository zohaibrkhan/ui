---
id: "oversight-supply/pigment"
name: "Pigment"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/pigment"
preview_url: "https://supply.madebyoversight.com/sections?preview=pigment"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "light"
summary: "A paper-toned hero you spray with grainy pigment by moving the pointer; scroll blooms the ambient stains, shrinks the surface into a rounded certificate card, and lets you download the result as a PNG."
tags: ["generative", "painterly", "interactive", "editorial", "minimal", "webgl", "craft"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "webgl-shader-background", "three-js-scene", "framebuffer-ping-pong", "pointer-tracking", "pointer-painting", "grain-texture", "stage-to-card-shrink", "user-generated-artifact", "sticky-nav", "glassmorphism", "split-text-animation", "smooth-scroll", "editorial-serif-display", "mono-label-accents"]
stack: ["react", "three", "webgl", "glsl", "gsap", "scrolltrigger", "lenis", "canvas", "css"]
complexity: "high"
---

# Pigment

## What it is

A hero that behaves like a sheet of paper under an airbrush. The cursor leaves stippled, fibrous blots of pigment that slowly drift and never repeat; pressing deepens them; three swatches change the colour. Scrolling runs a three-step story (spray, bloom, certify): the built-in stains swell, the headline blurs away, and the whole painted surface scales down into a rounded card presented as a certificate, with a button that exports the composition, a serial number and a timestamp as an image. The pitch it makes for a brand is uniqueness: every visitor leaves with a different piece.

## Layout anatomy

- A track a little over three viewport heights tall, the shortest pin in this family, with one sticky full-viewport stage on a backdrop slightly darker than the paper.
- **The sheet:** a full-stage element holding the WebGL canvas and everything printed on the artwork: a spaced-caps wordmark at top left, an index and italic name at top right, a very large centred headline with one word in italic, a short two-paragraph note at bottom left and an italic series number at bottom right. Because these live inside the sheet, they shrink with it later.
- **Outside the sheet,** fixed to the stage: a centred frosted step navigation at the top (three numbered mono items; the active one gains small corner brackets), a scroll hint with an animated line, a caption that appears under the card, and a frosted dock at bottom centre with three round colour swatches, a divider, "clear" and a solid "save" button.

## Visual system

- **Type:** Instrument Serif for the headline, series numeral and name; Inter for the wordmark, note and certificate line; IBM Plex Mono in small uppercase for navigation, dock and captions.
- **Colour:** paper `#ebe8e1`, backdrop `#dcd9d2`, ink `#1b1e16`, moss `#34511a`, lime `#c6e05a`. Pigments come as a dark core and lighter edge: moss `#2f4a17` / `#62812d`, ink blue `#1b2033` / `#46507a`, ochre `#7a3f14` / `#b8762f`.

## Motion and interaction

- **Painting:** moving the pointer lays a light continuous spray; pressing makes it larger and denser, and holding still while pressed keeps building. A press lands one heavy blot. Paint spreads and drifts very slowly after it lands. Vertical swipes still scroll the page on touch.
- **Scroll chapters:** in the first half the ambient stains grow to full size and the headline words blur, lift and fade one after another. Around the middle the sheet scales down to its card size, gaining rounded corners and a shadow. Late on, a certificate line sharpens into focus at the card centre and a dated caption appears beneath. The navigation highlights the current step, and clicking a step scrolls to it.
- **Fallback:** if WebGL is unavailable, a static gradient approximation of the stains is shown instead.
- **Reduced motion:** native scrolling, no intro, paint stays where it lands, frames are drawn only when something changes, and the story snaps between sheet and card.

## Techniques worth reusing

- **Feedback buffer with drift and fade** - the standard recipe for paint, smoke or trails: two render targets swap roles each frame; the update pass samples the previous frame slightly displaced by a slow noise field, fades it a touch, and adds new input. Batching the frame's brush marks into one uniform array keeps it to a single pass.
- **Hero becomes an object** - scaling the whole stage into a card reframes "background effect" as "thing you made" and sets up an export or share step.
- **Canvas-composited export** - copy the WebGL frame into a 2D canvas and typeset labels there rather than trying to capture the DOM.

## Build brief

```text
Build a pinned "mark the hero, then keep it" section with a three-step scroll story.

Structure: a section track about three viewport heights tall with one sticky full-viewport
stage. A full-stage "sheet" holds a canvas plus whatever is printed on the piece: [WORDMARK],
a large [HEADLINE] split into words, a short note and an [EDITION LABEL]. Outside the sheet:
a three-step progress navigation ([STEP 1], [STEP 2], [STEP 3]) that tracks scroll and jumps
on click, a small set of [MEDIUM OPTIONS] to choose from, and "clear" and "save" actions.

Rendering: a full-screen pass over two swapping render targets. Each frame, take the previous
buffer, optionally displace and fade it slightly, and add marks along the pointer path in the
project's own [MARK STYLE] (ink, light, thread, chalk, pixels), stronger while pressed. A
display pass draws [SURFACE], a few ambient shapes whose size follows a scroll-driven value,
and the accumulated marks. Draw one scripted mark on load so the surface is never empty. Keep
vertical touch scrolling working.

Scroll: one scrubbed timeline. First: ambient shapes intensify and the headline clears.
Middle: the sheet scales down into a card with rounded corners and a shadow. Last: a
[CERT TITLE] and a caption with date and time appear.

Save: render a fresh frame, copy it to a 2D canvas, typeset the labels and a generated edition
number, and offer a PNG through a preview dialog with download and close.

Quality bars: reduced motion uses native scroll, freezes drift, renders only when dirty and
snaps between sheet and card; a CSS fallback when WebGL is missing; the navigation marks the
current step for assistive tech; options are labelled buttons; the dialog manages focus; cap
device pixel ratio and pause off screen; check legibility of overlaid text on small screens.
```

## Adaptation notes

- Suits editions, prints, perfume, wine, ceramics: anything sold on "no two alike".
- Check small screens. In my phone-width capture the ambient stains at full strength covered most of the card and the dark certificate line became unreadable against them (the test pointer was parked mid-stage and may have added to it).
- three.js is used only as a runner for full-screen passes; a lighter WebGL helper or raw WebGL would cut most of the bundle.
