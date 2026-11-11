---
id: "oversight-supply/cyanotype"
name: "Cyanotype"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/cyanotype"
preview_url: "https://supply.madebyoversight.com/sections?preview=cyanotype"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "mixed"
summary: "A pinned sun-print workbench: drag plant cuttings onto coated paper, hold a button to expose it on a 2D canvas, then scroll to rinse the print blue and hang it on a dark wall."
tags: ["botanical", "interactive", "craft", "editorial", "print-making", "tactile", "playful"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "canvas-2d-compositing", "draggable-elements", "press-and-hold-control", "user-generated-artifact", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "grain-texture", "split-text-animation"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "canvas", "svg", "css"]
complexity: "high"
---

# Cyanotype

## What it is

A single pinned stage that turns a hero into a small toy with a payoff. The visitor arranges plant silhouettes on a sheet of coated paper and holds a sun button to expose it. Scroll then takes over: the sheet drops into a tray of water, the yellow coating turns blue, the room goes dark and the finished print is pegged up beside the closing headline and a "save" button. The idea that carries it is that the thing you scroll through is something you just made.

## Layout anatomy

- A track about four viewport heights tall with one sticky, full-viewport stage.
- Inside the stage everything is absolutely positioned and sized by script relative to the stage, not by a CSS grid:
  - A portrait sheet of paper, right of centre, containing the print canvas.
  - Seven plant cuttings as inline SVG, a few starting on the paper and the rest on the table around it.
  - A top bar: brand, title, and a live exposure-time readout, over a hairline rule.
  - Headline and a short instruction at top left, a round sun button at bottom left, a small pill dock with two text buttons at bottom right.
  - A closing block at bottom left, hidden until the end.
- At phone width the paper is centred in the upper half, the spare cuttings sit in a row beneath it, the headline collapses to one line, and the closing block spans the width under the print. At tablet widths the instruction paragraph is hidden.

## Visual system

- **Type:** Instrument Serif for display (tight leading, italic second line in the accent blue); Inter for small body text; IBM Plex Mono in small uppercase for the bar, buttons and kicker.
- **Colour:** table `#cbc3ae`, ink `#1d2117`, paper `#f5f1e6`, unexposed coating `#cfc56b`, exposed but unrinsed grey-blue `#566b73`, Prussian blue `#173b8a`, end wall `#0f1830`, hover lime `#d6f06b`, and a gold gradient on the sun button.

## Motion and interaction

- **Drag and rotate:** each cutting can be dragged anywhere on the stage; a tap or click without movement rotates it by a fixed step. Cuttings are focusable, with arrow keys to nudge and a key to rotate, and carry spoken instructions.
- **Hold to expose:** while the sun button is held (pointer or keyboard), warm light washes over the stage and the coating gradually changes wherever it is not covered. Moving a cutting mid-exposure leaves a ghost. A ring around the button fills and the top-bar readout counts up.
- **Scroll chapters:** early, the interface and loose cuttings fly off and a tray with rising water appears. In the first third a horizontal line moves up the sheet and everything below it turns from the raw palette to blue. Around the middle the water drains. In the second half the background darkens to navy, the top bar inverts, and the print moves and scales to its display position; pegs drop in and the closing block appears at the end.
- **Reduced motion:** native scrolling, no intro, and the story snaps between three states (start, rinsed, final).

## Techniques worth reusing

- **Canvas layers as a darkroom** - separate offscreen canvases hold a mask, the accumulated exposure and a tint, and the visible frame is built with compositing modes. Accumulating a little each tick through a mask gives a believable gradual process and is trivially exportable.
- **Reveal line as a clip** - two versions of the same image are drawn into two clip regions split at a scroll-driven line, so one number produces a convincing material change.
- **Safety net for skippers** - when the interactive step is skipped, the page completes it at a scroll threshold so the story still pays off, and admits it.
- **One paused timeline, one scroll trigger** - every chapter is a position on a single timeline, which also makes the reduced-motion version a simple three-position snap.

## Build brief

```text
Build a pinned "make something, then watch it finish" section.

Structure: a section track roughly four viewport heights tall with one sticky full-viewport
stage. Inside: a hero work surface holding a canvas, a handful of draggable [ITEMS], a
press-and-hold [ACTION] control with visible progress, a way to reset and a way to skip ahead,
a [HEADLINE] with one line of instruction, and a closing block with [CLOSING HEADLINE], [BODY],
a "save" action and a "start again" action. Position stage contents from script in units
relative to the work surface so the arrangement survives resizing; provide a separate default
arrangement for narrow screens.

Play phase: items can be dragged and rotated by pointer and by keyboard, with visible focus.
While [ACTION] is held, an effect accumulates gradually on the canvas everywhere the items are
not covering, so the result records the visitor's arrangement. Build this from a few offscreen
layers and compositing rather than per-pixel loops.

Scroll phase: one scrubbed timeline. Early: controls and items clear away. Middle: a visible
edge sweeps the work surface, swapping its [RAW LOOK] for its [FINISHED LOOK], framed by
whatever process metaphor suits the project. Late: the stage background shifts from
[LIGHT COLOUR] to [DARK COLOUR] while the finished piece moves to a display position and the
closing block fades in. If the visitor never used [ACTION], complete it for them at an early
threshold and say so in the copy.

Quality bars: the canvas has an image role and description; decorative layers are hidden from
assistive tech; reduced motion uses native scroll and snaps between start, finished and final
states; the canvas loop runs only while visible; export a higher-resolution PNG on demand.
```

## Adaptation notes

- Fits stories where a physical process is the pitch: print, ceramics, coffee, film, dyeing. Replace the process metaphor first; the accumulate-through-a-mask loop works for stamping, etching or scratch-off.
- The instruction text is hidden at tablet widths, which leaves the mechanic unexplained there. Keep a short hint visible at every width.
