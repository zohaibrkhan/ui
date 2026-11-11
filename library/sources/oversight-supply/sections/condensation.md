---
id: "oversight-supply/condensation"
name: "Condensation"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/condensation"
preview_url: "https://supply.madebyoversight.com/sections?preview=condensation"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "light"
summary: "A fogged greenhouse window you wipe clear with the pointer; scrolling drags a squeegee down the glass, then pushes through the frame into the sharp photo behind it."
tags: ["botanical", "photographic", "interactive", "atmospheric", "webgl", "editorial", "tactile"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "webgl-shader-background", "pointer-tracking", "wipe-to-reveal-mask", "procedural-water-drops", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "glassmorphism", "split-text-animation"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "webgl2", "glsl", "canvas", "css"]
complexity: "high"
---

# Condensation

## What it is

A photographic hero hidden behind a steamed-up window. The visitor rubs the glass with the cursor to peek at the scene, a short phrase appears "finger-written" in the fog, and droplets run down from wherever the glass was touched. Scrolling finishes the job with a full-width squeegee, then zooms through the window frame to the clear photo and a closing headline. It suits any brand whose pitch is "come and look inside".

## Layout anatomy

- A 420vh track with a sticky `100svh` stage (`overflow: clip`). Measured scroll height 3780px at 1440x900 and 3545px at 390x844.
- Layer order, back to front:
  1. Full-stage WebGL2 canvas (the photo plus fog).
  2. A window frame drawn in CSS: an inset `box-shadow` border `clamp(7px, 0.8vw, 12px)` thick plus two vertical mullions at 33.3% and 66.6% and one horizontal bar at 31%.
  3. The squeegee: a zero-height, full-width element with a 16px metal bar and a centred handle, moved by `translate3d`.
  4. UI: top bar (brand / title / live "glass clear NN%" readout), headline bottom-left (`clamp(56px, 8vw, 146px)`), a frosted helper card under it (380px max), a two-button pill dock bottom-right, a centred pill caption for the middle chapter, and a full-stage closing block with a bottom-up dark gradient.
- Under 700px: one mullion at 50% instead of two, horizontal bar at 25%, headline moves to just under that bar (`clamp(44px, 12.5vw, 64px)`), helper card and dock stack full width at the bottom.

## Visual system

- **Type:** Instrument Serif display (0.86 line-height, -0.035em, italic second line); Inter Variable 13-14px body; IBM Plex Mono 10.5px uppercase labels with 0.14em tracking. The fog writing is the same italic serif, rasterised.
- **Colour:** fog/base `#cdd5cb`, ink `#1d2117`, paper `#f3f2ea`, frame steel `#1a2419` with `#2c3a29` highlights, lime accent `#d6f06b` (readout chip, hover, kicker square). Closing text is paper on a `rgba(12,18,10,0.72)` gradient.
- **Shape and depth:** frosted pills and cards (`backdrop-filter: blur(8-10px)` over 62-72% paper), 999px radius buttons, crosshair cursor over the glass, inner glow on the frame.

## Motion and interaction

- **Rendering:** a single full-screen triangle in raw WebGL2 (no 3D library). Four textures: sharp photo, pre-blurred photo, a low-resolution "clear" mask, and a half-resolution drops layer. The fragment shader mixes sharp and blurred-plus-whitened photo by the mask, adds animated value-noise density, a procedural bead grid (hashed circles that act as tiny lenses and vanish where wiped), refracting drops, and a vignette. Device pixel ratio is capped at 1.75.
- **Wipe:** pointer positions are stamped as soft discs (38px radius, 58px while a button is held, 40px for touch) into a CPU `Float32Array` grid with 3-6px cells, interpolated along the path so fast strokes do not dot. Every frame each cell decays (about 0.13 per second), so the glass slowly fogs over again. The grid is uploaded as an R8 texture each frame.
- **Drops:** a small CPU particle list (max 70 drops, 260 trail beads). Drops spawn while wiping, at random in fogged areas, and from the bottom edges of the written letters; they accelerate, stick and release at random, wobble sideways, and stamp a clear trail into the mask. They are drawn as normal-map sprites on a 2D canvas that the shader reads for refraction and highlights.
- **Writing:** the phrase is rasterised once into the mask grid and revealed left to right over 2.4s after load.
- **Scroll (scrubbed 0.6s, one timeline):** 4-10% headline, helper and dock fade up and out; 10-48% the squeegee travels top to bottom and the shader clears everything above its edge; 16-49% caption pill; 55-92% shader zoom 1 -> 1.35 while the CSS frame scales to 2.6x and fades (55-85%), so the viewer passes through the window; 90%+ closing block.
- The readout percentage is sampled from the mask four times a second.
- **Fallbacks:** no WebGL2 shows the sharp photo as an `img` and changes the helper copy; image failure shows an error line. **Reduced motion:** no Lenis, no intro; the timeline snaps to start / wiped (52%) / end; drops are not spawned and re-fogging slows.
- Ticker pauses when the stage leaves the viewport or the tab is hidden.

## Techniques worth reusing

- **CPU mask, GPU look** - keep interaction state in a tiny typed-array grid that is trivial to stamp, decay and measure, and let a shader turn it into something lush. Avoids framebuffer ping-pong entirely.
- **Two-texture blur** - ship a pre-blurred copy of the photo instead of blurring in the shader.
- **Scroll-driven wiper** - one uniform (edge position) lets scroll "complete" an effect the user may only have partly explored; a DOM element tracks the same number so the tool is visible.
- **Zoom through a CSS frame** - scale an inset-shadow frame past the viewport while nudging texture zoom for a cheap dolly-in.
- **Text as mask** - rasterise a font into the same grid to get writing-in-fog for free.

## Build brief

```text
Build a pinned "fogged glass" reveal section over a photograph.

Structure: a <section> track 4.2 viewport heights tall with a sticky 100svh stage (overflow clip).
Layers: (1) full-stage WebGL canvas, aria-hidden; (2) a CSS window frame made from an inset border
and 2 vertical + 1 horizontal bars (1 vertical bar under 700px); (3) a full-width "wiper" bar element;
(4) UI: top bar with [BRAND], [TITLE] and a live "cleared NN%" readout; display headline bottom-left;
a small frosted helper card; a pill dock with "re-fog" and "clear it" buttons; a centred caption for
the middle chapter; a closing block with [KICKER], [CLOSING HEADLINE], [BODY] and a replay button.

Rendering: one full-screen shader pass with a sharp [PHOTO], a pre-blurred copy, and a low-res mask
texture. Colour = mix(sharp, whitened blur, fog) where fog = 1 - mask, modulated by slow noise; add
small procedural beads that only show where fog remains. Keep the mask on the CPU as a Float32Array
grid (~5px cells): stamp soft discs along the pointer path (bigger while pressed), decay every cell
each frame so the glass re-fogs, upload as a single-channel texture. Optional: a capped list of drops
that fall with stick-slip motion and clear a trail. Rasterise [SHORT PHRASE] into the grid and
reveal it left to right on load.

Scroll: one scrubbed timeline. 0-10% UI exits; 10-48% wiper edge moves top to bottom and the shader
treats everything above it as clear; then the frame scales up ~2.6x and fades while the photo zooms
to 1.35; closing block fades in at 90%.

Reduced motion: native scroll, no intro, snap between fogged / cleared / final states, no drops.
Fallback: if WebGL2 is missing show the sharp photo as an <img> and say so in the helper text.
Performance: cap DPR at 1.75, pause the loop off screen and when the tab is hidden, handle context
loss. Accessibility: the section needs a text label describing the scene; all controls are buttons.
```

## Adaptation notes

- The photo does the heavy lifting: pick an image with depth and a strong focal point just below centre (the shader frames at about 56% height).
- Wiping is hover-driven on desktop and drag-driven on touch; because the stage captures touch moves for wiping, test that vertical page scroll still works on phones.
- Both photos were inlined as base64 in the preview (about 0.8MB); serve them as normal responsive files instead.
- The canvas is `aria-hidden`, so the scene is only described by the section label and the copy; add real alt text if the image carries meaning.
- The decay rate decides the mood: faster re-fogging feels playful, slower feels calm.
