---
id: "oversight-supply/joiner"
name: "Joiner"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/joiner"
preview_url: "https://supply.madebyoversight.com/sections?preview=joiner"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "light"
summary: "One photograph shown as a photo-joiner collage of dozens of misregistered prints that react to the pointer and can be re-shot by clicking; scroll aligns them into a seamless image that fills the screen."
tags: ["photography", "collage", "interactive", "editorial", "analog", "landscape", "tactile"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "image-collage", "fragmented-image-assembly", "seeded-procedural-layout", "pointer-tracking", "parallax-layers", "card-to-fullscreen-expand", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "grain-texture"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "css", "canvas"]
complexity: "high"
---

# Joiner

## What it is

A hero image deconstructed in the manner of a photographic "joiner": the same picture cut into several dozen rectangular prints, each slightly shifted, rotated and differently exposed, as if shot a moment apart. Moving the pointer makes the prints disagree about parallax; clicking one "retakes" it with a flash. Scrolling pulls every print into register until the collage is one clean photograph, which then scales up to cover the stage behind the closing headline. Everything visible is DOM.

## Layout anatomy

- A track about four viewport heights tall with one sticky, full-viewport stage.
- **Picture box:** a portrait rectangle, right of centre on desktop and centred beneath the headline on phones. A wrapper around it carries the final scale-up.
- **Fragments:** each fragment is a clipped box showing only its own crop of the one photograph, with a flash overlay and, on a few of the lower pieces, an orange camera-style date stamp.
- At the start only fragments that contain the subject are shown, so the opening collage hugs the subject's silhouette on a plain background; the empty-sky pieces arrive from above during assembly.
- **Interface:** a top bar with an "exposures remaining" counter in an orange chip; headline at top left; helper paragraph and pill dock at lower left; a mid-story caption at left centre; a closing block over a bottom gradient.
- At phone width the headline becomes one line and the helper text centres above a full-width dock. At tablet widths the helper is hidden.

## Visual system

- **Type:** Instrument Serif display with an italic second line; Inter for small body text; IBM Plex Mono in small uppercase for labels; date stamps in tiny mono with an orange glow.
- **Colour:** paper `#f2efe9` / `#f4f1ea`, ink `#1d2117`, lime hover `#d6f06b`, stamp orange `#ff8a2a`. The photograph supplies all other colour.
- **Shape and depth:** fragments have no border; the thin pale gaps between them come from each piece being inset slightly, and close as the pieces join. Each print is tinted a little differently (brightness, saturation, the odd warm cast) so it looks separately developed. Fine grain lies over the stage.

## Motion and interaction

- **Pointer:** pieces slide against one another as the pointer moves, each by a different amount, giving a shallow layered parallax. Touch drags do the same.
- **Click to retake:** before scrolling, clicking a piece gives it a new misalignment with a brief white flash and uses one exposure from the counter; when the roll is used up the dock offers a fresh one. "Shuffle" re-randomises every piece.
- **Scroll chapters:** early, the headline, helper and dock leave. Through the first half every misalignment, gap and tint eases to nothing and the missing pieces fly in, until the image is seamless; a caption marks the moment. In the second half the picture scales up and centres to cover the stage and the top bar inverts to light text. The closing block appears at the end.
- **Reduced motion:** native scrolling, no intro, and the story snaps between fragmented, assembled and full-bleed. How pointer drift behaves in this mode was not determined.

## Techniques worth reusing

- **Same image, many crops** - fragmenting with clipped wrappers around an offset full-size image needs no slicing step and lets the browser reuse one decoded bitmap.
- **Seeded recursive subdivision** - a tiny deterministic random generator and a split rule give an art-directed yet reproducible mosaic.
- **Content-aware reveal** - a tiny downsample of the image and a brightness and hue test are enough to decide which tiles matter first.
- **A single "assemble" scalar** - every imperfection is multiplied by how unassembled the picture is, and scroll drives that one value. Once assembled, a single whole image is faded in on top so no hairline seams remain.

## Build brief

```text
Build a pinned "fragmented image that assembles on scroll" section, using DOM and CSS only.

Structure: a section track about four viewport heights tall with one sticky full-viewport
stage. A picture box holds [IMAGE] divided into several dozen irregular rectangular fragments
generated from a fixed seed so the layout is stable. Each fragment is a clipped box showing its
own crop of the same image file. Place one plain copy of the whole image on top, initially
invisible. Give the box an image role with a real description. Around it: [HEADLINE], a short
instruction, controls to re-randomise and to skip ahead, a mid-story caption, and a closing
block with [CLOSING HEADLINE], [BODY] and a replay action.

Fragmented state: give every fragment small random imperfections in whatever vocabulary suits
the project ([DISTORTION STYLE]: offset, tilt, scale, tone, gaps). Ease them continuously and
add pointer-driven parallax with a different depth per fragment. Clicking a fragment re-rolls
it with brief feedback. Optionally start with only the fragments that contain the subject and
bring the rest in during assembly.

Scroll: one scrubbed timeline driving a single assemble value from 0 to 1 that scales every
imperfection to zero, then swaps to the whole image. After that, scale the picture to cover
the stage, invert any overlaid interface for contrast, and fade in the closing block.

Quality bars: reduced motion uses native scroll and snaps between fragmented, assembled and
full-bleed; use transform, opacity and clipping only and drop per-fragment effects once
assembled; reduce the fragment count on small screens; pause the loop off screen; provide a
keyboard-reachable control for anything pointer-only.
```

## Adaptation notes

- Needs a single strong subject on a simple ground; busy images turn to noise when fragmented.
- Dozens of filtered, clipped layers are heavy on low-end phones. Use fewer fragments and skip per-piece tinting on small screens.
- The collage is exposed as one image; individual fragments are not focusable, so "retake" is pointer-only. The shuffle button is the keyboard equivalent.
