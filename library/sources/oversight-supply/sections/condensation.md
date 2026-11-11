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
summary: "A fogged window over a photograph that the pointer wipes clear; scrolling completes the wipe, then pushes through the window frame into the sharp image and a closing headline."
tags: ["botanical", "photographic", "interactive", "atmospheric", "webgl", "editorial", "tactile"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "webgl-shader-background", "pointer-tracking", "wipe-to-reveal-mask", "procedural-water-drops", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "glassmorphism", "split-text-animation"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "webgl2", "glsl", "canvas", "css"]
complexity: "high"
---

# Condensation

## What it is

A photographic hero hidden behind steamed-up glass. The visitor rubs the glass with the cursor to peek at the scene, a short phrase appears as if finger-written in the fog, and droplets run down from wherever the glass was touched. Scrolling finishes the job across the whole pane, then moves through the window frame to the clear photograph and a closing headline. It suits any page whose pitch is "come and look inside".

## Layout anatomy

- A track about four viewport heights tall containing one sticky, full-viewport stage. Nothing else scrolls; the stage is pinned for the whole story.
- Layer order, back to front:
  1. A full-stage WebGL canvas carrying the photograph and the fog.
  2. A window frame drawn in CSS: a thin dark border with two vertical bars and one horizontal bar dividing the pane.
  3. A full-width wiper bar that travels down the glass during the middle chapter.
  4. Interface: a top bar (brand, title, a live "glass clear" percentage), a large headline at lower left with a small frosted helper card beneath it, a two-button pill dock at lower right, a centred caption pill for the middle chapter, and a full-stage closing block.
- At phone width the frame simplifies to one vertical bar, the headline moves up under the horizontal bar, and the helper card and dock stack across the bottom.

## Visual system

- **Type:** Instrument Serif for display (tight leading, italic second line); Inter for small body text; IBM Plex Mono in small uppercase with wide tracking for labels and buttons. The fog writing uses the same italic serif.
- **Colour:** fog and page base `#cdd5cb`, ink `#1d2117`, paper `#f3f2ea`, dark steel-green frame `#1a2419`, lime accent `#d6f06b` on the readout chip, hover states and the closing kicker marker. Closing text is paper-coloured over a dark bottom-up gradient.

## Motion and interaction

- **Wipe:** moving the pointer clears a soft trail in the fog; holding a button widens it; on touch a finger drag does the same. Cleared areas slowly mist over again if left alone.
- **Drops:** droplets form where the glass was wiped, at random in fogged areas, and under the written letters. They run down in fits and starts, leave a clear streak, and refract the scene behind them.
- **Scroll chapters:** early, the headline, helper and dock leave. Through the first half a wiper bar travels top to bottom and everything above it becomes clear, with a caption pill shown. In the third quarter the window frame scales up past the viewport and fades while the photograph zooms slightly, so the viewer seems to pass through. At the end the closing block fades in.
- **Fallbacks:** without WebGL2 the sharp photo is shown as a plain image and the helper text explains why; an image load failure shows an error line.
- **Reduced motion:** native scrolling, no intro animation, no drops, and the story snaps between three states (fogged, cleared, final) rather than scrubbing.

## Techniques worth reusing

- **CPU mask, GPU look** - interaction state lives in a small low-resolution grid in plain memory that is easy to stamp, fade and measure, and is uploaded as a single-channel texture each frame. A shader turns it into something lush. This avoids render-target ping-pong for what is really a simple brush.
- **Pre-blurred copy instead of shader blur** - the fog samples a second, already-blurred version of the photograph, so there is no blur cost at runtime.
- **Scroll completes what play started** - one extra shader input (an edge position) lets scroll clear the whole surface regardless of how much the visitor explored, and a DOM element follows the same value so the cause is visible.
- **Zoom through a CSS frame** - scaling a bordered overlay past the viewport while nudging texture zoom gives a cheap dolly-in.

## Build brief

```text
Build a pinned "wipe to reveal" section: an [IMAGE] sits behind an obscuring layer that the
pointer clears, and scroll then completes the reveal and transitions out of it.

Structure: a section track roughly four viewport heights tall with one sticky full-viewport
stage. Back to front: a canvas showing [IMAGE] under [OBSCURING TREATMENT] (frost, dust, paint,
static, paper: your choice); an optional decorative frame; then real DOM for [HEADLINE], a short
instruction, a control to reset the layer, a control to skip ahead, and a closing block with
[CLOSING HEADLINE], [BODY] and a replay action.

Mechanism: keep a low-resolution mask of "how clear is this spot" on the CPU. Stamp a soft brush
along the pointer path (interpolate between samples so fast strokes stay continuous) and let
values relax back over time so the layer slowly returns. Upload the mask as a texture each frame
and have one full-screen shader blend the clear image with the obscured version. Prefer a
pre-processed obscured copy of the image over expensive per-pixel effects. Optionally rasterise
[SHORT PHRASE] into the mask and reveal it on load.

Scroll: one scrubbed timeline. Early: interface exits. Middle: a visible edge sweeps the stage
and everything behind it is treated as clear. Late: transition out of the frame toward the
clear image, then fade in the closing block.

Quality bars: a live readout of percent cleared; works with mouse and touch without blocking
vertical page scroll; reduced motion uses native scroll and snaps between obscured, clear and
final states; a plain <img> fallback when WebGL is unavailable; cap device pixel ratio; pause
rendering off screen and when the tab is hidden; meaningful text alternative for the image.
```

## Adaptation notes

- The photograph does the heavy lifting: pick one with depth and a focal point a little below centre.
- The canvas is hidden from assistive technology, so the scene is described only by the section label and copy. Add real alternative text if the image carries meaning.
