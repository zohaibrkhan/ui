---
id: "oversight-supply/joiner"
name: "Joiner"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/joiner"
preview_url: "https://supply.madebyoversight.com/sections?preview=joiner"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "mixed"
summary: "One photograph shown as a photo-joiner collage of dozens of misregistered prints that react to the pointer and can be re-shot by clicking; scroll aligns them into a seamless image that fills the screen."
tags: ["photography", "collage", "interactive", "editorial", "analog", "landscape", "tactile"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "image-collage", "fragmented-image-assembly", "seeded-procedural-layout", "pointer-tracking", "parallax-layers", "card-to-fullscreen-expand", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "grain-texture"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "css", "canvas"]
complexity: "high"
---

# Joiner

## What it is

A hero image deconstructed in the manner of a photographic "joiner": the same picture cut into about 67 rectangular prints, each slightly shifted, rotated, re-exposed and offset as if shot a moment apart. Moving the pointer makes the prints disagree about parallax; clicking one "retakes" it with a flash. Scrolling pulls every print into register until the collage is one clean photograph, which then scales up to cover the stage behind the closing headline. Everything visible is DOM: each fragment is a clipped `div` containing the full image.

## Layout anatomy

- 400vh track, sticky `100svh` stage (3600px at 1440x900; 3376px at 390x844).
- The picture box is a 2:3-ish portrait (0.8 aspect in the tiling maths) placed right of centre on desktop and centred, below the headline, on mobile. A wrapper around it carries the final scale/translate, with its transform origin set to the box centre.
- Tiling: a seeded recursive split (fixed seed, so the layout is identical on every visit). A cell keeps splitting while it is wider than about 21% or taller than 17% of the box, and sometimes below that, alternating direction by aspect with a random 32-68% cut, to a maximum depth of 14. The result is a mix of large and small rectangles.
- Each fragment is `position: absolute; overflow: hidden` at its tile rect and holds an `img` sized to the whole box and offset by `-tile.x, -tile.y`, so it shows only its own crop. A flash overlay and, on some lower tiles, an orange date stamp sit inside it.
- At load the image is drawn to a 120x180 canvas and each tile is scored for how much "subject" it contains (dark, non-blue pixels, or warm pixels in the lower half). Empty sky tiles start hidden, so the opening collage hugs the silhouette of the subject; those tiles fly in from above during assembly.
- UI: top bar with an "exposures NN/36" counter (orange chip), headline top-left (`clamp(56px, 7vw, 132px)`), helper paragraph and pill dock bottom-left, a mid-story caption at left centre, closing block over a bottom gradient.
- Under 700px the headline becomes one line (`clamp(40px, 11vw, 56px)`), helper text centres above a full-width dock.

## Visual system

- **Type:** Instrument Serif display with italic second line; Inter 13-14px body; IBM Plex Mono 10.5px uppercase labels; date stamps are 10px mono in `#ff8a2a` with an orange glow.
- **Colour:** paper `#f2efe9` / `#f4f1ea`, ink `#1d2117`, lime hover `#d6f06b`, stamp orange `#ff8a2a`. The photograph supplies all other colour.
- **Shape and depth:** fragments have no border; the white gaps between them come from a per-tile `clip-path: inset()` of 1.5-4px that shrinks to nothing as they join. Per-tile `brightness`, `saturate` and occasional `sepia` filters make each print look separately developed. Fine SVG grain over the stage.

## Motion and interaction

- **Per-fragment jitter:** each tile has a random offset (about +/-1.3% of the box), rotation (+/-2.2deg), scale (0.975-1.025), an inner image shift (about +/-1.5%) and exposure variation. Current values ease toward targets every frame.
- **Pointer:** a smoothed pointer vector shifts each tile and its inner image by an amount scaled by a random per-tile depth, so neighbours slide against each other. Touch drags do the same.
- **Click to retake:** clicking a tile (only before 6% scroll) gives it a fresh random jitter and a white flash that decays in about 0.4s, and uses one of 36 exposures; at zero the dock offers "load a new roll". "Shuffle" re-randomises all tiles.
- **Scroll (scrubbed 0.6s):** 3-9% headline, helper and dock leave; 8-42% an `assemble` factor (smoothstep) scales every jitter, inset and filter toward zero and brings the hidden tiles in; when fully assembled a single un-fragmented `img` is faded in on top so there are no hairline seams; 38-61% caption; 58-88% the wrapper scales to cover the stage (`max(stageW/boxW, stageH/boxH) * 1.02`) and centres; 74-82% top bar inverts to light; 90%+ closing block.
- **Load:** tiles appear with staggered delays ordered from the bottom of the picture upward.
- **Reduced motion:** no Lenis and no intro; timeline snaps to start / assembled (48%) / final. Details of how pointer drift is damped in this mode were not determined.
- Ticker runs only while the stage is visible and the tab is focused.

## Techniques worth reusing

- **Same image, many crops** - fragmenting with `overflow: hidden` wrappers plus an offset full-size `img` needs no slicing step and keeps the browser's one decoded bitmap.
- **Seeded recursive subdivision** - a tiny PRNG and a split rule give an art-directed but reproducible mosaic.
- **Content-aware reveal** - a 120px downsample and a luminance/hue test are enough to decide which tiles matter first.
- **Single "assemble" scalar** - multiply every imperfection by `1 - a`; scroll drives `a`. Swap to the whole image at `a = 1`.
- **Scarcity as play** - a small counter of remaining "exposures" turns idle clicking into a game with an end.

## Build brief

```text
Build a pinned "fragmented photo that assembles on scroll" section. DOM and CSS transforms only.

Structure: a <section> track 4 viewport heights tall with a sticky 100svh stage. A picture box
(portrait, ~74% of stage height, right of centre; centred under the headline on mobile) sits inside
a wrapper that will later scale. Fill the box with 50-70 fragments produced by a seeded recursive
split of the unit square (split the longer side at a random 32-68% until cells are under ~20% of
the box). Each fragment = absolutely positioned div with overflow hidden containing the full
[PHOTO] sized to the box and offset so only its crop shows, plus a white flash overlay. Add one
plain <img> of the whole photo on top at opacity 0. Give the box role="img" and a real description.

Per fragment keep random jitter: offset +/-1.3%, rotation +/-2deg, scale 0.975-1.025, inner image
shift +/-1.5%, brightness 0.9-1.12, saturation 0.82-1.22, clip inset 1.5-4px, and a depth -1..1.
Each frame ease current toward target and add pointer parallax = smoothed pointer * depth.
Clicking a fragment re-rolls its jitter and plays a 400ms flash; show a counter of remaining
clicks ([N] total) and a reset. Optionally hide fragments with no subject content at first
(analyse a 120px downsample) and bring them in during assembly.

UI: top bar ([BRAND], [TITLE], counter), display [HEADLINE], helper text, pill dock ("Shuffle",
"Join them up"), mid caption, closing block ([KICKER], [CLOSING HEADLINE], [BODY], replay button).

Scroll (one scrubbed timeline): 8-42% assemble factor 0->1 multiplies all jitter, inset and
filters to zero, then fade in the whole image; 58-88% scale and centre the wrapper to cover the
stage; invert the top bar; 90%+ show the closing block on a dark bottom gradient.

Reduced motion: no smooth scroll or intro; snap between fragmented, assembled and full-bleed.
Performance: transform, opacity, clip-path and filter only; drop filters once assembled; pause the
loop off screen. Use one image URL for every fragment so it is decoded once.
```

## Adaptation notes

- Needs a single strong subject on a simple ground; busy images turn to noise when fragmented.
- 67 filtered, clipped layers are GPU-heavy on low-end phones. Halve the fragment count and skip per-tile filters under 700px.
- The click counter is a flourish; the piece works without it.
- The collage box is exposed as one `role="img"`; individual fragments are not focusable, so "retake" is pointer-only. Offer the shuffle button as the keyboard equivalent.
- For brand use, the date stamps and exposure counter can carry real metadata (location, batch, edition).
