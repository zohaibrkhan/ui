---
id: "oversight-supply/herbarium"
name: "Herbarium"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/herbarium"
preview_url: "https://supply.madebyoversight.com/sections?preview=herbarium"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "mixed"
summary: "A desk of twelve throwable, flippable specimen cards that scroll sorts from a loose pile into a tidy index grid, then zooms one card to a full-bleed closing image."
tags: ["botanical", "collage", "archive", "interactive", "tactile", "editorial", "playful"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "draggable-elements", "throw-physics", "pile-to-grid-sort", "card-flip", "card-to-fullscreen-expand", "image-collage", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "grain-texture"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "css"]
complexity: "high"
---

# Herbarium

## What it is

A collection presented as a messy pile you can play with before the page tidies it for you. Twelve taped photo cards are dealt onto a paper desk; they can be dragged, thrown and flipped to read a catalogue entry on the back. Scrolling sorts them into a labelled index grid, then one featured card grows until its photo fills the viewport and carries the one-word closing headline. All DOM and CSS transforms, no canvas.

## Layout anatomy

- 460vh track, sticky `100svh` stage (4140px total at 1440x900; 3882px at 390x844).
- Stage layers: paper background (radial vignette + SVG turbulence grain), headline (bottom-left, z-index below the cards so cards can cover it), the card desk, a "cover" image used for the last zoom, then UI (top bar with a "sheets read NN/12" counter, a 270px helper paragraph top-left, a pill dock bottom-right, a centred index title, the closing block).
- Cards: absolutely positioned at 0,0 and moved with `translate3d + rotate + scale`. Width comes from a CSS variable set by script: `clamp(130px, min(13% of width, 22% of height), 230px)` on desktop, `clamp(96px, 30% of width, 150px)` under 700px; height is 1.4x width. All inner type is sized in `em` from `font-size: calc(var(--cw) * 0.05)`, so a card is one scalable unit.
- Card front: photo inset 6% (88% wide, 1.1x card-width tall), a label strip with mono number and italic Latin name, and one of three tape arrangements (top, two corners, side) as lime multiply-blended strips. Card back: ruled lines, kicker, name, a two-column `dl` of facts and an italic note.
- Pile homes: a jittered 4-column grid (3 on mobile) inside the right 57% of the stage (desktop) or the lower-middle (mobile), each with a random rotation of roughly +/-22deg.
- Index: an even grid (6x2 at 1440px, 3x4 at 390px in my captures) fitted between a 150px header band and bottom padding.

## Visual system

- **Type:** Instrument Serif display (`clamp(56px, 8.4vw, 150px)`, 0.86 line-height; the closing word is `clamp(84px, 17vw, 300px)`), italic serif for names and notes; IBM Plex Mono for numbers and labels; Inter for helper text.
- **Colour:** desk `#e7e1cf`, sheet `#f6f2e6`, ink `#1d2117` (62% / 40% tints), tape and highlight lime `#d6f06b`. The closing chapter inverts the top bar to sheet-white over the photo with a `rgba(20,16,8,0.6)` bottom gradient.
- **Shape and depth:** square-cornered cards with a two-layer shadow that deepens and spreads while a card is held; tape strips overlap card edges.

## Motion and interaction

- **Deal-in:** cards start below the stage and fly to their homes one after another (about 75ms apart).
- **Drag and throw:** pointer capture on the stage; the grabbed card comes to the top of the z-order and, on release, keeps its velocity and spin and coasts to a stop. Exact friction constants not recorded. Dragging is only active in the pile state (`touch-action: none` on cards there, `pan-y` elsewhere).
- **Flip:** a click or tap without a drag toggles a 0.7s `scaleX(-1)` flip (faces swap visibility halfway, so no 3D perspective is needed). A visually hidden button inside each card gives keyboard users the same action, with a focus outline on the card. Flipping increments the "sheets read" counter.
- **Scroll (scrubbed 0.6s):** 4-11% headline, helper and dock fade out; 7-46% `sort` eases every card from its current pile pose to its grid slot with rotation to 0; 36-63% the index title is shown; 60-90% `zoom` scales the featured card from its slot until it covers the stage while the rest fade; at about 86% of the zoom a full-resolution cover image cross-fades over the card so the enlargement stays sharp; 91%+ closing block.
- The stage exposes its state as `data-mode` (`pile` / `index` / `zoom`), which CSS uses to change cursors, pointer events and bar colours.
- Dock buttons: "shuffle" re-randomises pile homes; "sort" smooth-scrolls to the 50% mark. The closing button scrolls to the top and reshuffles.
- **Reduced motion:** no Lenis, no deal animation (cards placed directly), and the timeline snaps to pile / index / final at 25% and 75% progress.
- A counted preloader gates the stage until all twelve images have loaded or failed.

## Techniques worth reusing

- **Two layouts, one blend factor** - give every item a "free" pose owned by physics and a "sorted" pose owned by a grid function, and let scroll interpolate between them. The pile stays interactive up to the moment scroll takes over.
- **Mode attribute** - derive a coarse state name from continuous progress and hang CSS behaviour off it.
- **Em-scaled card** - set one width variable and size all inner type in `em`, so the same card works at 96px and full-screen.
- **Sharp zoom swap** - cross-fade to a separate cover image near the end of a big scale-up instead of scaling a thumbnail 8x.
- **Flat flip** - `scaleX(-1)` with a visibility swap is cheaper and more robust than `rotateY` with `backface-visibility`.

## Build brief

```text
Build a pinned "pile to index to hero" section from a set of 9-12 image cards. DOM + transforms only.

Data: [{id, image, title, subtitle, facts: [[label, value]...], note}], plus the index of one
featured item.

Structure: a <section> track ~4.6 viewport heights tall with a sticky 100svh stage. Layers:
textured background; display headline bottom-left (cards may overlap it); the card layer; a hidden
full-size cover image of the featured item; UI on top: top bar with [BRAND], [COLLECTION NAME] and
an "NN/total viewed" counter, short helper text, a pill dock ("Shuffle", "Sort"), a centred index
title, and a closing block ([KICKER], one-word [CLOSING HEADLINE], [NOTE], replay button).

Cards: width = clamp(130px, min(13vw, 22vh), 230px), height 1.4x, all inner type in em. Front =
inset photo, number + name strip, decorative tape. Back = facts list and note. Click/tap flips with
a 0.7s scaleX flip; a visually hidden button per card provides keyboard access and focus styling.

Pile state: deal cards in from below with a stagger to jittered homes with random rotation. Drag
with pointer capture; on release keep velocity and angular velocity with friction; raise z-index
on grab.

Scroll (one scrubbed timeline): 7-46% blend each card from its pile pose to an even grid slot
(columns chosen to fit the stage; 3 columns under 700px); show the index title; 60-90% scale the
featured card to cover the stage, fade the others, cross-fade to the cover image near the end;
91%+ fade in the closing block over a dark bottom gradient. Expose data-mode = pile | index | zoom
and disable dragging outside pile.

Reduced motion: no smooth scroll or deal animation; snap between the three states.
Performance: preload images behind a counted loader, run the physics loop only while the stage is
visible, animate transform and opacity only.
```

## Adaptation notes

- Good for collections with a hero item: team, portfolio, menu, product range, archive.
- With more than about 16 cards the pile becomes noise and the grid cells get small; paginate or shrink the set.
- On touch, card dragging competes with page scroll. The preview confines the pile to part of the stage and leaves gaps to scroll from; keep that breathing room.
- The card backs are `aria-hidden` until flipped, so make sure the flip button's label announces what will be revealed.
- Twelve inlined images made this the heaviest preview in the family (about 2.1MB); use thumbnails for cards and load the cover image on demand.
