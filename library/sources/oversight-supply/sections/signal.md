---
id: "oversight-supply/signal"
name: "Signal & Soil"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/signal"
preview_url: "https://supply.madebyoversight.com/sections?preview=signal"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "dark"
summary: "Glowing monospace glyphs form a horse, then poppies, then a wordmark over blurred pastoral photos; the pointer scatters them, and at the end they lift away as the last photo snaps into focus."
tags: ["ascii", "photographic", "pastoral", "interactive", "cinematic", "typographic", "dark"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "canvas-2d-particles", "ascii-glyph-rendering", "image-to-particles", "particle-morph-between-shapes", "glyph-atlas", "pointer-tracking", "pointer-repulsion", "background-crossfade", "blur-to-focus-reveal", "stat-counters", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "grain-texture", "split-text-animation"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "canvas", "css"]
complexity: "high"
---

# Signal & Soil

## What it is

A three-figure particle story drawn in text characters. Over a thousand glowing glyphs are arranged as a halftone of a source picture; as the visitor scrolls they swirl and re-settle into a second picture and then into a wordmark, while soft-focus photographs cross-fade behind them. In the last chapter the glyphs drift upward and vanish, the final photograph becomes sharp, and the closing headline arrives. It contrasts old imagery with a new rendering language, which suits heritage brands with a technical delivery.

## Layout anatomy

- A track about five viewport heights tall, the longest pin in this family, with one sticky full-viewport stage.
- **Back to front:** a slightly oversized group of stacked, cover-fitted photographs (one per scene, plus a blurred and a sharp version of the last); a dark shade layer; the glyph canvas, full stage, exposed as an image with a description of all three figures; a grain overlay; then the interface.
- **Interface:** a top bar with brand, title and a live glyph count in a chip; headline at top left; a mono chapter label with a square bullet at lower left, roman-numbered and swapped per figure; a helper paragraph; a pill dock at bottom left with "pulse" and "next figure"; a closing block over a bottom gradient.
- At phone width the headline becomes one line, and the chapter label and helper centre above a centred dock. At tablet widths the helper is hidden.

## Visual system

- **Type:** Instrument Serif display with an italic second line, and italic serif for the glyph-drawn wordmark; Inter for small body text; IBM Plex Mono for labels and for the glyphs themselves.
- **Colour:** base `#2a2418`, cream `#f4ead2` with softer tints, ink `#1d2117`, lime `#d6f06b` only on the closing kicker marker. Glyphs are cream with a warm glow. The photographs are slightly desaturated and darkened so the glyphs stay legible.

## Motion and interaction

- **Figures:** brighter areas of each source become denser characters at higher opacity; darker areas thin out to dots or nothing. The on-page counter read about 1,200 glyphs for the first figure at both desktop and phone widths.
- **Pointer:** glyphs near the pointer are pushed away and carried a little in its direction; while moving fast they flicker through noisier characters. A click or tap sends a radial pulse through the field.
- **Scroll chapters:** the first figure holds briefly, then morphs to the second in the first third, and to the wordmark around the middle, with the background photograph and chapter label changing each time. In the last third the glyphs wobble, lift and fade a few at a time, the blurred final photograph gives way to its sharp version, and the shade lightens. The closing block appears at the end. The background eases back from a slight zoom across the whole pin.
- **Reduced motion:** native scrolling, no intro, direct travel with no swirl, wobble or flicker, and the story snaps between four stops.

## Techniques worth reusing

- **Sprite-atlas glyphs** - the characters are pre-rendered once, glow included, into a strip, and each particle is a blit from it. Drawing text with a blur shadow per particle per frame would be far too slow.
- **Image to particles** - trim the source to its bright area, downsample so one pixel is one character cell, and emit a particle per bright cell. Normalising against a high percentile rather than the maximum gives a usable density range from almost any image.
- **Angular sort for shape-to-shape morphs** - sorting each shape's points around its centre and assigning particles by index gives coherent, swirling transitions with no matching solver.
- **Blur-to-focus as resolution** - keeping every background soft until the last beat makes the final sharp photograph feel like an event.

## Build brief

```text
Build a pinned particle story in which small [MARKS] (characters, dots, icons) form a sequence
of figures over changing backgrounds. 2D canvas plus DOM.

Assets: two or three [SOURCE FIGURES] with clear silhouettes on a dark ground, a [WORD OR MARK]
for the final figure, and one [BACKGROUND] per chapter, with soft and sharp versions of the
last.

Structure: a section track about five viewport heights tall with one sticky full-viewport
stage. Layers: stacked cover-fitted backgrounds, a contrast shade, a full-stage canvas with an
image role and a description of the figures, then DOM: a live particle count, [HEADLINE], a
label per chapter, one line of instruction, controls to trigger a pulse and to advance, and a
closing block with [CLOSING HEADLINE], [BODY] and a replay action.

Particles: pre-render the set of marks once into a sprite strip. Convert each source into a
list of points by downsampling to one pixel per cell and keeping the bright cells, mapping
brightness to mark density and opacity. Sort every list the same way (for example by angle
around its centre) and give each particle one target per figure by index. Move particles with
a damped spring and curve their paths between figures. The pointer pushes nearby particles;
a click sends a pulse.

Scroll: one scrubbed timeline. Step from figure to figure with a hold at each, cross-fading
the background and chapter label alongside. Finally release the particles with a staggered
fade, resolve the last background from soft to sharp, and bring in the closing block.

Quality bars: reduced motion uses native scroll, direct travel and snaps between stops; show a
loader until images and fonts are ready and a message if they fail; rebuild particles only
when width changes; cap device pixel ratio; pause off screen and when hidden.
```

## Adaptation notes

- Source images need a clear silhouette and strong highlights; flat or busy pictures turn to mush at this resolution.
- A thousand or so sprites per frame is light for 2D canvas, but the wordmark chapter uses more than the picture figures, so test that beat on low-end devices.
