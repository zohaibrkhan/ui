---
id: "oversight-supply/phototropism"
name: "Phototropism"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/phototropism"
preview_url: "https://supply.madebyoversight.com/sections?preview=phototropism"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "mixed"
summary: "A line-drawn canvas meadow whose stems, grass and even the headline letters lean toward the cursor-as-sun; click to plant, and scroll runs the day from cream morning through dusk to a firefly night."
tags: ["botanical", "generative", "illustrative", "interactive", "day-night", "playful", "line-art"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "canvas-2d-procedural-drawing", "pointer-tracking", "pointer-as-light-source", "day-night-palette-interpolation", "per-letter-pointer-lean", "split-text-animation", "canvas-2d-particles", "seeded-procedural-layout", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "grain-texture"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "canvas", "css"]
complexity: "high"
---

# Phototropism

## What it is

A generative illustration used as a hero. A field of procedurally drawn plants grows in on load, and every stem bends toward a glowing light that follows the pointer. The headline joins in: each letter tilts toward the light too. Clicking drops a seed that sprouts a new plant. Scrolling does not move anything; it advances a clock from early morning to late evening, re-colouring the sky, closing the flowers at dusk and releasing fireflies at night before the closing headline appears. One 2D canvas, no WebGL.

## Layout anatomy

- A track between four and five viewport heights tall with one sticky, full-viewport stage and a crosshair cursor throughout.
- A full-stage canvas, exposed as an image with a description, under a paper-grain overlay that is strong by day and faint at night.
- **Interface:** a top bar with brand, title and a live clock showing a sun or moon glyph and a count of things planted; a three-line headline at top left with the last line italic; a helper paragraph beneath it; a two-button pill dock at top right under the bar; two short chapter captions on the right (dusk, night); and a closing block that replaces the headline in the same top-left position.
- At phone width the dock moves to the bottom centre over the soil band and the captions sit left-aligned under the headline.

## Visual system

- **Type:** Instrument Serif display; Inter for the helper; IBM Plex Mono in small uppercase for labels. Text colour is not fixed: it follows the scene, shifting from brown to cream as night falls.
- **Colour:** a handful of time-of-day palettes blended continuously, each with a sky top, sky bottom, ink and glow:
  - morning: `#f7f0e3` to `#f1dfc4`, ink `#3b2f22`, glow `#ffd38a`
  - dusk: `#6d5c88` to `#f2a578`, ink `#2c2231`, glow `#ffb07a`
  - night: `#0c1122` to `#1c2340`, ink `#ece3cc`, glow `#b9d0ff`
  - Fireflies and the closing italic use lime `#d6f06b`.

## Motion and interaction

- **Plants:** a few dozen on desktop and roughly half that on phones, the same meadow on every visit. Each has its own height, curve, leaves and one of several flower heads. They grow upward in a left-to-right sweep after load, then bloom.
- **Leaning:** every plant bends toward the light at its own pace and up to its own limit, with the tip moving most; a gentle sway continues underneath. Grass blades lean the same way, more weakly.
- **Light:** follows the pointer closely; after a few idle seconds it wanders slowly by itself so the scene never looks dead.
- **Headline:** each letter pivots near its baseline toward the light, so the type behaves like the plants.
- **Planting:** a click, or the dock button, drops a seed that falls and sprouts where it lands. Dandelion heads shed drifting seeds when the pointer sweeps past quickly.
- **Scroll chapters:** the first two thirds of the pin run the clock through the day. Flowers close through dusk, a caption marks it, the sky turns to night and fireflies fade in, drifting and gathering near the light; flowers near the light reopen. Late on, the headline fades and the closing block takes its place. Planting is switched off near the end.
- **Reduced motion:** native scrolling, no intro; plants are drawn fully grown with no sway or wandering light, and the story snaps between three times of day.

## Techniques worth reusing

- **Pointer as light source** - one smoothed point drives stems, grass, particles, glow and typography, so a single simple rule reads as a living scene.
- **Scroll as time, not position** - the pinned picture stays put while scroll moves through a table of palette keyframes with smooth interpolation between them.
- **Ink colour shared between canvas and DOM** - writing the current ink colour to a CSS variable keeps text contrasting with a drawn background that changes.

## Build brief

```text
Build a pinned generative hero in which a field of drawn [OBJECTS] orients toward the pointer,
and scroll changes the [AMBIENT STATE] of the scene rather than moving it. One 2D canvas plus
DOM text.

Structure: a section track four to five viewport heights tall with one sticky full-viewport
stage containing a full-size canvas with an image role and description, an optional texture
overlay, a [HEADLINE] whose letters are individually wrapped, one line of instruction, a
control to add an object and a control to skip ahead, one caption per chapter, and a closing
block with [CLOSING HEADLINE], [BODY] and a return action.

Scene: generate the objects from a fixed seed so the composition is stable; use noticeably
fewer on narrow screens. Keep one "attractor" point that eases toward the pointer and drifts
slowly when idle. Each frame every object eases its orientation toward the attractor at its
own rate and within its own limit, with a little ambient motion on top. Let the headline
letters respond to the same attractor. Clicking adds a new object with a short arrival
animation; cap how many can be added.

Ambient state: define a few keyframes for [AMBIENT STATE] (time of day, season, weather,
temperature), each with background colours, an ink colour and an accent. Interpolate by scroll
progress and publish the ink colour as a CSS variable used by all overlaid text. Introduce one
new behaviour per chapter, announce it with a caption, and swap the headline for the closing
block near the end.

Quality bars: check text contrast at every keyframe; reduced motion draws the finished scene
with no ambient movement, uses native scroll and snaps between keyframes; cap device pixel
ratio, batch drawing by layer, pause the loop off screen; controls are real buttons.
```

## Adaptation notes

- The "leans toward you" rule transfers to anything with stalks or strands: wheat, hair, cables, lettering, crowd figures, needles on a gauge.
- Text over a changing sky needs checking at every stage: dusk, with dark ink on purple-to-orange, is the lowest-contrast moment.
