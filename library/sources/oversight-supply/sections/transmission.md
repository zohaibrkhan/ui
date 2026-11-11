---
id: "oversight-supply/transmission"
name: "Transmission"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/transmission"
preview_url: "https://supply.madebyoversight.com/sections?preview=transmission"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "dark"
summary: "A ray-marched 3D lily shown as live ASCII on black; the pointer opens a circular lens onto the true render, and scroll refines the characters, blooms and tilts the flower, then decodes the whole screen."
tags: ["ascii", "3d", "generative", "terminal", "dark", "interactive", "webgl", "botanical"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "webgl-shader-background", "three-js-scene", "raymarched-sdf", "ascii-post-process", "glyph-atlas", "pointer-lens-reveal", "pointer-tracking", "adaptive-resolution", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "split-text-animation"]
stack: ["react", "three", "webgl", "glsl", "gsap", "scrolltrigger", "lenis", "canvas", "css"]
complexity: "high"
---

# Transmission

## What it is

A dark, terminal-flavoured hero in which a procedural flower is not shown directly at first: it is rendered off screen and redrawn as a grid of monospace characters. Wherever the pointer goes, a round "decoder lens" shows the real, shaded render underneath. Scrolling shrinks the character cells so the picture resolves, opens the bloom, raises the camera to look down into the flower, and finally grows the lens until the whole viewport is decoded behind a one-word closing headline. The idea transfers to any "raw data becomes the real thing" story.

## Layout anatomy

- A track about four viewport heights tall with one sticky, full-viewport stage on near-black and a crosshair cursor.
- One full-stage WebGL canvas, which fades in once fonts are ready. Everything else is DOM on top:
  - A top bar: brand, a title with a lime italic numeral, and a status cluster with a blinking lime dot, the word "live", the current character-cell size and the measured frame rate.
  - A short helper paragraph at bottom right above a dock of three glyph-set options (ASCII, binary, blocks); the active option is a lime pill.
- At phone width the headline is raised, the helper spans the width beneath it, the dock moves to bottom left, the hint is hidden and the log is clipped short.

## Visual system

- **Type:** Instrument Serif for the two headlines; IBM Plex Mono for bar, log, dock and the rendered characters; Inter for the helper.
- **Colour:** background `#0a0b09`, ink `#e9e6d8` with dimmer tints for secondary text and the log, and lime `#d6f06b` as the single accent (dot, italic line, active pill, lens rim, kicker). Glyphs are ink-coloured with a trace of the scene's own colour; the decoded flower is ivory with a green throat, freckles and orange anthers.

## Motion and interaction

- **Lens:** on desktop the lens follows the mouse with a slight lag; on touch it opens while a finger is held down. Inside it the true render shows, with colour fringing near the rim.
- **Turn and pulse:** dragging rotates the flower; a click or tap without movement sends an expanding ring through the character grid. The flower also turns slowly without input.
- **Scroll chapters:** in the first third the characters shrink from coarse to fine, so the figure goes from a blocky silhouette to a detailed one, and the headline and helper fade. Through the middle the flower opens and the viewpoint rises from side-on to looking into it. In the last third the lens moves to the centre and grows past the edges of the viewport until everything is the true render; the log and dock fade and the closing block appears.
- **Reduced motion:** native scrolling, no intro, no auto-rotation or flicker, frames drawn only when something changes, a slower log, and the story snaps between three states.

## Techniques worth reusing

- **Two-pass character rendering** - draw anything (here a ray-marched distance-field flower, with three.js used only to run full-screen passes) into a reduced-resolution target, then in a second pass divide the screen into cells, sample each cell's brightness and pick a character from an atlas texture. It works equally for video, 3D scenes or stills.
- **Lens as the narrative device** - the same centre-and-radius pair serves both the hover toy and the scroll finale, so the ending feels earned rather than a cross-fade.
- **Cell size as progress** - going from coarse to fine characters is a legible "tuning in" metaphor that costs one shader input.
- **Frame-time governed resolution** - the expensive scene pass is scaled up or down according to measured frame time while the cheap character pass stays at full resolution, so the grid is always crisp.

## Build brief

```text
Build a pinned hero in which [SUBJECT] is first shown through an encoded rendering and scroll
"decodes" it into the real thing.

Structure: a section track about four viewport heights tall with one sticky full-viewport
stage. One full-stage WebGL canvas, hidden from assistive tech, with DOM on top: [HEADLINE],
a sentence that describes the subject and how to interact, an optional live readout of
renderer state, a labelled radio group for [ENCODING VARIANTS], a scroll hint, and a closing
block with [CLOSING HEADLINE], [BODY] and a replay action.

Rendering in two full-screen passes. Pass one draws [SUBJECT] (a 3D model, a shader scene, a
video or a still) into a reduced-resolution target. Pass two re-encodes that target in the
project's own [ENCODING STYLE] (characters, halftone dots, mosaic tiles, stitches): divide the
screen into cells, sample the target per cell, and look the result up in an atlas texture.
Inside a circular lens defined by a centre and radius, output the true render instead.

Interaction: the lens follows the pointer with easing on desktop and opens on touch-hold;
dragging turns the subject; a click sends a visible ripple through the cells.

Scroll: one scrubbed timeline. First: cells go from coarse to fine. Middle: the subject itself
changes (opens, rotates, assembles) and the camera moves to its best angle. Last: the lens
travels to the centre and expands past the viewport so the whole stage is decoded, then the
closing block fades in.

Quality bars: measure frame time and scale the first pass's resolution within sensible bounds;
reduced motion freezes ambient movement, renders on demand, uses native scroll and snaps
between three states; show a static message or image when WebGL is unavailable; pause off
screen; keep overlaid text legible over the busiest frame.
```

## Adaptation notes

- The procedural flower is the hard part and is specific to this piece; the pattern works just as well with a model, a product turntable video or a photograph in the first pass.
- The canvas is hidden from assistive technology and the subject is described only in the helper text; add a proper text alternative if the subject matters.
