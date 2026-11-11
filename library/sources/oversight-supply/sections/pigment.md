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

A hero that behaves like a sheet of paper under an airbrush. The cursor leaves stippled, fibrous blots of pigment that slowly drift and never repeat; pressing deepens them; three swatches change the colour. Scrolling runs a three-step story (spray, bloom, certify): the built-in stains swell, the headline blurs away, and the whole painted surface scales down into a rounded card labelled as a certificate, with a button that exports the composition, serial number and timestamp as an image. The pitch it makes for a brand is uniqueness: every visitor leaves with a different piece.

## Layout anatomy

- 340vh track, sticky `100svh` stage on a slightly darker backdrop (`#dcd9d2`). Shortest pin in the family: 3060px at 1440x900, 2870px at 390x844.
- The "sheet" is a full-stage element containing the WebGL canvas and everything printed on the artwork: spaced-caps wordmark top-left, index + italic name top-right, centred display headline (`clamp(58px, 11.4vw, 210px)`, `text-wrap: balance`, one word italic), a 270px two-paragraph note bottom-left, and an italic series number with an underlined serif numeral bottom-right. Because these live inside the sheet they shrink with it later.
- Outside the sheet, fixed to the stage: a centred frosted step nav at the top (three mono items with index numbers; the active one gets small corner brackets), a scroll hint with an animated line, a caption line that appears under the card, and a bottom-centre frosted dock: three 24px round swatches, a divider, "clear" and a solid "save" button.
- End state: the sheet is scaled to `clamp(0.42, (viewportH - 210px) / viewportH, 0.64)` (0.78 max and 230px reserve under 700px), nudged up 3%, with a 16px visual radius and a soft drop shadow. I measured the canvas at 922x576 CSS px in a 1440x900 viewport and 284x614 in 390x844.
- A modal `figure` previews the exported PNG with download and close buttons.

## Visual system

- **Type:** Instrument Serif for the headline, series numeral and name; Inter Variable for wordmark, note and certificate line; IBM Plex Mono 10.5-12px uppercase for nav, dock and captions.
- **Colour:** paper `#ebe8e1`, backdrop `#dcd9d2`, ink `#1b1e16`, moss `#34511a`, lime `#c6e05a`. Pigments as core/edge pairs: moss `#2f4a17`/`#62812d`, ink `#1b2033`/`#46507a`, ochre `#7a3f14`/`#b8762f`.
- **Shape and depth:** flat paper with shader "tooth" and grain; pills are translucent white with a 14px backdrop blur and a wide soft glow; the end card is the only element with a real shadow.

## Motion and interaction

- **Rendering:** three.js used as a thin full-screen-quad runner (orthographic camera, three `ShaderMaterial`s, no geometry beyond the quad). Two half-float render targets ping-pong an accumulation buffer:
  - *Update pass:* reads the previous buffer displaced along a slow rotated noise gradient (a cheap curl-like drift), multiplies by a decay of 0.9993, and adds up to 24 queued splats per pass (position, radius, strength) with a ragged, fibrous falloff.
  - *Display pass:* paper colour plus tooth, six ambient "cloud" blobs whose positions wobble and whose radius is driven from script, then the accumulated pigment with stippled grain.
- **Painting:** pointer movement queues splats interpolated along the path (radius 0.032, strength 0.22 hovering; 0.05 / 0.55 while pressed); holding still while pressed keeps adding. Pointer-down makes one heavy blot. The sheet uses `touch-action: pan-y`, so vertical swipes still scroll.
- **Load:** wordmark letters and headline words fade in from an 18px blur; a `bloom` value eases to 35% and a scripted arc of splats draws a first stroke so the page is never blank.
- **Scroll (scrubbed 0.6s):** 0-50% bloom rises to 100%, growing the ambient blobs; 26-50% headline words blur to 14px, lift and fade with a stagger; 44-84% the sheet scales to its card size with radius and shadow; 66-81% the certificate line sharpens from a 10px blur at the card centre; 78-90% caption. The active nav item switches at 25% and 80%; clicking a nav item scrolls to 0, 40% or 100%.
- **Export:** renders a fresh frame, copies the WebGL canvas to a 2D canvas, sets the wordmark, serial, title and three lines of small print with canvas text, and offers the blob as a PNG download. The serial is a random four-digit number chosen once per visit.
- **Fallback:** if WebGL is unavailable the canvas is hidden and a CSS radial-gradient approximation of the stains is shown.
- **Reduced motion:** no Lenis and no intro; drift and decay are frozen and the loop only renders when something changes; the scroll timeline snaps between sheet and card at 55%.

## Techniques worth reusing

- **Ping-pong accumulation with drift and decay** - the standard recipe for paint, smoke or trails: sample the last frame slightly displaced, fade it, add new input. Batching splats into a uniform array keeps it to one pass per frame.
- **Ambient blobs driven from script** - a handful of animated uniforms guarantees a good-looking composition even if the visitor never touches it.
- **Hero becomes an object** - scaling the entire stage into a card reframes "background effect" as "thing you made", and sets up an export or share step.
- **Canvas-composited export** - draw the GL frame into a 2D canvas and typeset labels there, rather than trying to screenshot the DOM.
- **Render on demand** - a dirty flag lets the reduced-motion version reuse the same renderer without a running loop.

## Build brief

```text
Build a pinned "paint the hero, then keep it" section with a three-step scroll story.

Structure: a <section> track ~3.4 viewport heights tall with a sticky 100svh stage on [BACKDROP
COLOUR]. Inside, a full-stage "sheet" (transform-origin centre) holds a WebGL canvas plus printed
details: [WORDMARK] top-left, [INDEX + NAME] top-right, a huge centred [HEADLINE] split into word
spans, a short note bottom-left, a series number bottom-right, and a hidden centred [CERT TITLE].
Outside the sheet: a frosted 3-step nav top-centre ([STEP 1] [STEP 2] [STEP 3]) that tracks scroll
and jumps on click, a caption line, and a frosted dock with 3 colour swatches, "Clear" and "Save".

Rendering: full-screen quad, two float render targets. Update pass = previous buffer sampled with
a small noise-based drift, multiplied by ~0.999 decay, plus up to 24 new splats (x, y, radius,
strength) with a noisy fibrous edge, tinted between the active swatch's core and edge colours.
Display pass = paper colour + grain + 5-6 soft ambient stains whose radius follows a `bloom`
uniform + the accumulated pigment. Queue splats along the pointer path; larger and stronger while
pressed. touch-action: pan-y on the sheet. Draw a short scripted stroke on load.

Scroll (one scrubbed timeline): 0-50% bloom 0.35->1; 26-50% headline words blur and fade; 44-84%
scale the sheet to clamp(0.42, (vh-210px)/vh, 0.64) with rounded corners and a soft shadow;
66-81% reveal the certificate title; then show a caption with date and time.

Save: render a frame, copy the canvas into a 2D canvas, draw wordmark, title, a random series
number and small print, export PNG, preview it in a modal with Download and Close.

Reduced motion: native scroll, no drift or decay, render only when dirty, snap sheet <-> card.
Fallback: CSS gradient stains if WebGL fails. Accessibility: nav uses aria-current="step", swatches
are labelled buttons, modal traps focus. Performance: cap DPR at 2, pause the loop off screen.
```

## Adaptation notes

- Suits editions, prints, perfume, wine, ceramics: anything sold on "no two alike".
- Check small screens. In my 390px capture the ambient stains at full bloom covered most of the card and the dark certificate line became unreadable against them; scale blob radius by viewport width or place the title on a paper-coloured plate.
- three.js adds roughly 470KB of unminified-equivalent bundle for what is three fragment shaders on a quad; a raw WebGL or OGL implementation would be far lighter.
- Half-float render targets need `EXT_color_buffer_half_float` on some mobile GPUs; keep the CSS fallback.
- The headline is live text over the canvas, which is good for SEO and selection; keep it out of the canvas.
