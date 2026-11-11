---
id: "oversight-supply/herbarium"
name: "Herbarium"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/herbarium"
preview_url: "https://supply.madebyoversight.com/sections?preview=herbarium"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "light"
summary: "A desk of twelve throwable, flippable specimen cards that scroll sorts from a loose pile into a tidy index grid, then zooms one card to a full-bleed closing image."
tags: ["botanical", "collage", "archive", "interactive", "tactile", "editorial", "playful"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "draggable-elements", "throw-physics", "pile-to-grid-sort", "card-flip", "card-to-fullscreen-expand", "image-collage", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "grain-texture"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "css"]
complexity: "high"
---

# Herbarium

## What it is

A collection presented as a messy pile you can play with before the page tidies it for you. Twelve taped photo cards are dealt onto a paper desk; they can be dragged, thrown and flipped to read a catalogue entry on the back. Scrolling sorts them into a labelled index grid, then one featured card grows until its photograph fills the viewport and carries a one-word closing headline. All DOM and CSS transforms, no canvas.

## Layout anatomy

- A track between four and five viewport heights tall with one sticky, full-viewport stage.
- **Stage layers:** a paper background with vignette and grain; the headline at lower left, deliberately beneath the cards so they can cover it; the card layer; a hidden full-size copy of the featured photograph used for the final zoom; then interface: a top bar with a "sheets read" counter, a short helper paragraph at top left, a pill dock at lower right, a centred index title, and the closing block.
- **Cards:** portrait cards whose size is set by script from the stage size, with all inner type scaled from that one width so a card is a single scalable unit. Front: an inset photograph, a strip with a number and an italic Latin name, and one of a few tape arrangements in translucent lime. Back: ruled lines, kicker, name, a short two-column list of facts and an italic note.
- **Index:** an even grid, six by two at desktop width and three by four at phone width in my captures.

## Visual system

- **Type:** Instrument Serif for a very large display headline and an even larger closing word, italic serif for names and notes; IBM Plex Mono for numbers and labels; Inter for helper text.
- **Colour:** desk `#e7e1cf`, card sheet `#f6f2e6`, ink `#1d2117` with lighter tints, tape and highlight lime `#d6f06b`. In the closing chapter the top bar inverts to sheet-white over the photograph, with a dark bottom-up gradient.

## Motion and interaction

- **Drag and throw:** a grabbed card comes to the top; on release it keeps its speed and spin and coasts to a stop. Dragging is only available while the cards are a pile.
- **Flip:** a click or tap without a drag turns the card over to its written back. Each card also contains a visually hidden button so keyboard users can flip it, with a focus outline on the card. The counter in the top bar records how many have been read.
- **Scroll chapters:** early, the headline, helper and dock fade out. Through the first half every card eases from wherever it was left to its slot in the grid and straightens, and an index title appears. In the second half the featured card scales up from its slot to cover the stage while the others fade; near the end a full-resolution image takes over so the enlargement stays sharp; then the closing block appears.
- **Reduced motion:** native scrolling, cards placed directly rather than dealt, and the story snaps between pile, index and final.

## Techniques worth reusing

- **Two layouts, one blend factor** - every item has a "free" pose owned by simple physics and a "sorted" pose owned by a grid function; scroll interpolates between them. The pile stays interactive right up to the moment scroll takes over.
- **One-variable card** - set a single width and size all inner type relative to it, so the same card works as a thumbnail and nearly full-screen.
- **Sharp zoom swap** - cross-fade to a separate high-resolution image near the end of a large scale-up instead of magnifying a thumbnail.
- **Flat flip** - mirroring the card horizontally and swapping which face is visible midway is cheaper and more robust than a 3D rotation.

## Build brief

```text
Build a pinned "pile, then index, then hero" section from a set of image cards, using DOM and
CSS transforms only.

Data: around a dozen [ITEMS], each with an image, a title, a subtitle and a few facts for the
reverse side, plus one item marked as featured.

Structure: a section track four to five viewport heights tall with one sticky full-viewport
stage. Layers: a [SURFACE] background; a display [HEADLINE] that cards may overlap; the card
layer; a hidden full-size image of the featured item; and interface on top: a counter of items
viewed, a short instruction, controls to re-scatter and to skip to the index, an index title,
and a closing block with [CLOSING HEADLINE], [NOTE] and a replay action.

Cards: one size variable drives the whole card, including type. Each card has a front (image
and label) and a back (facts). Activating a card flips it; provide a real button per card for
keyboard and screen-reader users with a visible focus state.

Pile state: scatter cards with random position and tilt. Cards can be dragged and thrown with
simple inertia and friction, and rise to the top when grabbed.

Scroll: one scrubbed timeline. First half: blend every card from its current pile pose to an
even grid slot that fits the stage (fewer columns on narrow screens) and show the index title.
Second half: scale the featured card to cover the stage, fade the rest, swap to the full-size
image near the end, and fade in the closing block. Expose the current chapter as a state
attribute and disable dragging outside the pile.

Quality bars: reduced motion uses native scroll, no deal-in, and snaps between the three
states; images preload behind a counted loader; physics runs only while the stage is visible;
animate transform and opacity only; touch dragging must not trap page scroll.
```

## Adaptation notes

- Good for collections with a hero item: team, portfolio, menu, product range, archive.
- On touch, card dragging competes with page scroll. The preview keeps the pile to part of the stage and leaves gaps to scroll from; preserve that breathing room.
