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

A generative illustration used as a hero. A field of procedurally drawn plants grows in on load, and every stem bends toward a glowing light that follows the pointer. The headline joins in: each letter tilts toward the light too. Clicking drops a seed that sprouts a new plant. Scrolling does not move anything; it advances a clock from 06:40 to 22:40, re-colouring the sky, closing the flowers at dusk and releasing fireflies at night before the closing headline appears. One 2D canvas, no WebGL.

## Layout anatomy

- 460vh track, sticky `100svh` stage (4140px at 1440x900; 3882px at 390x844). Crosshair cursor over the whole stage.
- Full-stage `canvas` (given `role="img"` and a descriptive label) with a paper-grain overlay above it (multiply at 50% by day, screen at 12% at night).
- Ground line at 87% of the stage height (86% on mobile); plants root on it and a textured soil band fills the rest.
- UI: top bar (brand / title / live clock with a sun or moon glyph and a "planted NN" count), headline top-left in three lines (`clamp(52px, 7.4vw, 138px)`, third line italic), a 330px helper paragraph below it, a two-button pill dock top-right under the bar, two right-aligned chapter captions (dusk, night) and a closing block that replaces the headline in the same top-left position.
- On mobile the dock moves to the bottom centre over the soil band and the captions sit left-aligned under the headline.

## Visual system

- **Type:** Instrument Serif display (0.9 line-height, -0.03em); Inter 13px helper; IBM Plex Mono 10.5px uppercase labels. Text colour is not fixed: the stage's ink variable is driven from the canvas palette, so type shifts from brown to cream as night falls.
- **Colour:** four palette keyframes interpolated by time of day, each with sky top, sky bottom, ink, leaf fill and glow:
  - morning (0): `#f7f0e3` / `#f1dfc4`, ink `#3b2f22`, glow `#ffd38a`
  - dusk (0.45): `#6d5c88` / `#f2a578`, ink `#2c2231`, glow `#ffb07a`
  - night (0.75-1): `#0c1122` / `#1c2340` then `#0a0e1c` / `#171d36`, ink `#ece3cc`, glow `#b9d0ff`
  - Fireflies and the closing italic use lime `#d6f06b`.
- **Shape and depth:** everything is 1px-ish ink outline with a flat fill slightly lighter than the sky; back-row plants are drawn at half opacity for depth. The light is a radial gradient about a third of the stage wide with a small bright core.

## Motion and interaction

- **Plants:** 48 on desktop, 26 on mobile, generated from a fixed seed so the meadow is the same every visit. Each has a 14-segment stem with its own curvature, bend limit, response speed, 1-3 leaves and one of several heads (daisy, tulip, bell, dandelion, bud). They grow segment by segment over 2-3.6s with delays sweeping left to right, then bloom.
- **Leaning:** each frame a plant computes the angle from its mid-stem to the light, clamps it to its bend limit, and eases toward it at its own rate; the bend is distributed along the stem with a power curve so the tip moves most. A small two-frequency sine adds sway. 170 grass blades (70 on mobile) lean the same way, more weakly.
- **Light:** follows the pointer with a fast exponential ease; after 4s without input it wanders on a slow Lissajous path so the scene never looks dead.
- **Headline:** letters are individual inline-blocks with `transform-origin: 50% 92%`; script rotates each toward the light (formula not transcribed), so the type behaves like the plants.
- **Planting:** a click (or the dock button, at a random x) drops a seed that falls with gravity and sprouts where it lands; planted plants are capped at 30, oldest removed. Dandelion heads shed drifting seeds when the pointer passes quickly (over about 350px/s) or when something is planted nearby.
- **Scroll (scrubbed 0.6s):** progress 6-66% maps to time of day 0-1. Flower openness falls between 35% and 70% of the day; from 55-80% fireflies fade in (up to 60 desktop, 28 mobile), drawn additively, drifting and attracted to the light within 260px. At night flowers near the light reopen. DOM beats: 5% helper and dock out; dusk caption 26-47%; night caption 58-83%; headline out at 80%; closing block at 88%. Planting is disabled past 86%.
- **Reduced motion:** no Lenis, no intro; plants are drawn fully grown, sway and wandering light are off, and the timeline snaps to morning / 70% / end.
- DPR capped at 1.5 on desktop and 2 on mobile; the loop pauses off screen and when the tab is hidden.

## Techniques worth reusing

- **Pointer as light source** - one smoothed point drives stems, grass, fireflies, glow and typography, which makes a simple rule read as a living scene.
- **Scroll as time, not position** - the pinned picture stays put while scroll scrubs a palette-keyframe function. A table of keyframes plus smoothstep interpolation is all it takes.
- **Ink colour shared between canvas and DOM** - write the interpolated ink colour to a CSS variable so text always contrasts with the drawn sky.
- **Seeded genomes** - generate each plant from a PRNG "genome" (height, curvature, leaves, head type) for variety without assets.
- **Idle behaviour** - a wandering default target avoids a dead scene on touch devices and for keyboard users.

## Build brief

```text
Build a pinned, generative line-art hero where the scene leans toward the pointer and scroll
changes the time of day. One 2D canvas plus DOM text.

Structure: a <section> track ~4.6 viewport heights tall with a sticky 100svh stage containing a
full-size <canvas role="img" aria-label="[SCENE DESCRIPTION]">, a grain overlay, a top bar
([BRAND], [TITLE], live clock + counter), a three-line display [HEADLINE] with every letter wrapped
in an inline-block span, helper text, a pill dock ("Add one", "Skip to night"), two chapter
captions, and a closing block ([KICKER], [CLOSING HEADLINE], [BODY], "Back to start").

Scene: from a fixed seed generate ~48 [OBJECTS] (26 under 700px) rooted on a ground line at 87%
height. Each is a 14-segment polyline with random curvature, bend limit, response rate and a head
shape. Animate growth on load, left to right. Keep a "light" point that eases to the pointer and
wanders slowly after 4s idle. Each frame every object eases its bend toward
clamp(angle to light, +/-limit), distributing the bend along its length; add gentle sine sway.
Rotate each headline letter a few degrees toward the light around its baseline. Clicking drops a
seed that falls and grows a new object (cap 30).

Palette: define 4 keyframes {t, skyTop, skyBottom, ink, fill, glow} for morning, dusk, night and
late night; interpolate by t and write the ink colour to a CSS variable used by all text.

Scroll: one scrubbed timeline; map progress 6-66% to t 0-1. Close the heads through dusk, fade in
additive glowing particles at night that drift toward the light, show captions at dusk and night,
swap the headline for the closing block at ~88%.

Reduced motion: draw everything fully grown, no sway or idle wander, native scroll, snap between
three times of day. Performance: cap DPR at 1.5, batch strokes per layer, pause the loop off
screen. Accessibility: buttons are real buttons; the canvas label describes the scene.
```

## Adaptation notes

- The "leans toward you" rule transfers to anything with stalks or strands: wheat, hair, cables, typography, crowd figures, needles on a gauge.
- The whole section is on brand only if the line-art style suits it; change head shapes and palette keyframes before touching behaviour.
- The clickable stage means stray clicks plant things; that is charming here but would be noise on a page with nearby links.
- Text over a changing sky needs checking at every keyframe: dusk (dark ink on purple-to-orange) is the lowest-contrast moment.
- Keyboard users can plant with the dock button but cannot steer the light; the idle wander covers that case.
