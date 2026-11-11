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

A single pinned stage that turns a hero into a small toy with a payoff. The visitor arranges plant silhouettes on a sheet of "coated" paper, holds a sun button to expose it, and then the scroll takes over: the sheet drops into a tray of water, the yellow coating wipes to blue, the room goes dark and the finished print is pegged up next to the closing headline and a "save your print" button. The idea that carries it is that the thing you scroll through is something you just made.

## Layout anatomy

- One `section` track 420vh tall holding a `position: sticky; top: 0; height: 100svh` stage with `overflow: clip`. Page scroll height at 1440x900 was 3780px (2880px of travel); at 390x844 it was 3545px.
- Everything inside the stage is absolutely positioned and sized by script from the stage box, not by CSS grid:
  - Paper: 4:5 sheet. Desktop height is `min(74% of stage height, 45% of stage width)`, centred at 58.5% of the width. The print canvas has a fixed 800x1000 backing store stretched to that box.
  - Seven cuttings (inline SVG) each stored as `{u, v, rot, size}` in units of paper height relative to the paper centre, so the arrangement survives resize. Three start on the paper, four on the table around it.
  - Top bar: 3-column grid (brand / title / live "Sun NN min" readout) with a 1px bottom rule.
  - Headline top-left (`clamp(54px, 6.6vw, 124px)`), 300px helper paragraph under it, 108px round sun button bottom-left, pill dock with two text buttons bottom-right.
  - Closing block bottom-left, 460px max, hidden until the end.
- Under 700px a second layout table is used: paper is 70% of width at 21% from the top, the four spare cuttings are laid out in a row beneath it, the headline collapses to one line (`clamp(40px, 11vw, 56px)`), the sun button shrinks to 80px and the helper text sits beside it. Between 700 and 1000px the helper paragraph is hidden. The closing block goes full width under the print.

## Visual system

- **Type:** Instrument Serif for display (line-height 0.86, tracking -0.035em, italic second line in the accent blue); Inter Variable 13-14px for body; IBM Plex Mono 10.5px uppercase with 0.14em tracking for bar, buttons and kicker.
- **Colour:** table `#cbc3ae`, ink `#1d2117`, paper `#f5f1e6`, unexposed coating `#cfc56b`, exposed-but-unrinsed `#566b73`, Prussian blue `#173b8a`, end wall `#0f1830`, hover lime `#d6f06b`, sun button gold gradient `#fff7c9 -> #f4d35e -> #e0a93a`, end-title italic `#8fb0ff`.
- **Shape and depth:** the table is layered CSS gradients plus an inline SVG `feTurbulence` grain; the paper has its own multiply-blended grain; cuttings carry a `drop-shadow` that lengthens while the sun is on and grows when lifted; tray is a 14px-radius pale box with inset highlights; pegs are small wood-gradient bars.

## Motion and interaction

- **Load:** GSAP timeline, `expo.out`: bar items fade down, headline lines rise from a clipped mask (`yPercent: 110`), paper settles from a -2deg tilt, cuttings drop in with stagger.
- **Drag:** pointer events with pointer capture on each cutting; a move under 6px counts as a tap and rotates the cutting 30deg (350ms transition). Arrow keys nudge (Shift for bigger steps), `R` rotates. Each cutting is a focusable `role="button"` with a full instruction label.
- **Hold to expose:** while the button (pointer, Space or Enter) is held, a soft-light "sun" overlay fades in and an offscreen exposure layer accumulates in 0.1s ticks with alpha `1 - exp(-dt * 0.3)`. Each tick draws white through the brush-stroke coating mask and punches out the cuttings' current silhouettes (`destination-out`), so moving a cutting mid-exposure leaves a ghost. A ring on the button fills over 12 "minutes"; the readout in the top bar counts up. The ticker only runs while the stage is intersecting and the tab is visible.
- **Scroll (scrubbed, 0.6s smoothing, one timeline across the whole track):** roughly 3-10% UI and cuttings fly off; 8-30% tray fades in and a water layer rises; 13-36% a horizontal "rinse front" moves up the canvas, redrawing everything below the line in blue; 40-50% water drains; 54-72% stage background tweens to navy and the bar text inverts; 55-85% the paper translates and scales to its end position (66% across on desktop, centred on mobile); 80%+ pegs drop in; 90%+ closing block fades up and becomes clickable.
- If the visitor scrolls past 9% with a nearly blank sheet, the script exposes it instantly for 9 minutes and says so in the closing copy.
- **Save:** composes the print at 2x onto a fresh canvas with a mono caption and downloads a PNG.
- **Reduced motion:** no Lenis, no intro, no scrub. The same timeline is snapped to three states by scroll progress (start, rinsed at 25%, final at 75%); the wave and rotate transitions are disabled.

## Techniques worth reusing

- **Canvas layers as a darkroom** - keep separate offscreen canvases for mask, accumulated exposure and tint, and build the visible frame with `source-in` / `destination-in` / `destination-out`. Cheap, resolution-independent of the DOM, and exportable.
- **Rinse front as a clip** - draw "before" and "after" versions of the same image into two clip rects split at a scroll-driven line. One number drives a convincing material change.
- **Layout in normalised units** - store draggable positions relative to the hero object (in units of its height) and re-project on resize; swap in a second table of defaults at the mobile breakpoint.
- **Safety net for skippers** - if the interactive step was skipped, auto-complete it at a scroll threshold so the story still pays off, and be honest about it in the copy.
- **One paused timeline + one ScrollTrigger** - every chapter is a label position on a single 0-1 timeline, which also makes the reduced-motion version a three-position snap.

## Build brief

```text
Build a full-viewport, scroll-pinned "make something, then watch it finish" section.

Structure: one <section> track about 4.2 viewport heights tall containing a sticky 100svh stage
(overflow clip). Inside the stage, absolutely position: a top bar (brand, title, live counter), a
display headline with a short instruction, a hero "work surface" (4:5, about 74% of stage height,
right of centre), 5-7 draggable [ITEM] SVG shapes, a round press-and-hold button, a small pill dock
with "reset" and "skip ahead" buttons, and a closing block ([KICKER], [CLOSING HEADLINE], [BODY],
primary "save" and secondary "start again" buttons) that is hidden until the end.

Interaction: items drag with pointer capture, tap to rotate 30deg, and are keyboard operable (arrow
keys move, R rotates, visible focus). Holding the button accumulates an effect on a fixed-resolution
2D canvas: every 100ms draw a white layer through a mask and erase the items' current silhouettes,
blending with alpha 1 - exp(-k*dt). Show progress as an SVG ring and a counter.

Scroll: a single paused GSAP timeline scrubbed by one ScrollTrigger over the track. Chapters:
(1) controls and items exit, (2) a container fades in and a liquid layer rises, (3) a horizontal
reveal line sweeps the canvas swapping the "raw" palette for the "finished" one, (4) liquid drains,
(5) background tweens from [LIGHT COLOUR] to [DARK COLOUR] while the work scales and moves to its
display position, (6) closing block fades in. If the user never used the button, auto-complete the
effect when they pass 9% and mention it in the closing copy.

Responsive: compute all positions in JS from the stage size; under 700px centre the work surface
at 70% width, lay spare items in a row below it, shrink the button, stack the closing block.

Reduced motion: no smooth scrolling, no intro; snap the timeline to start / middle / end states.
Accessibility: canvas has role="img" and a label; decorative layers aria-hidden; buttons are real
buttons. Performance: run the canvas ticker only while the stage is on screen and the tab is
visible; export the result as PNG at 2x on demand.
```

## Adaptation notes

- Fits product stories where a physical process is the pitch (print, ceramics, coffee, film). Replace the exposure metaphor first: the accumulate-through-a-mask loop works for stamping, dyeing, etching or scratch-off.
- 420vh of pin for six beats felt right; do not go shorter than about 60vh per chapter.
- The stage disables text selection and uses `touch-action: none` on draggables; make sure the page can still be scrolled by touch from empty areas of the stage.
- `getImageData` is used once to test whether the sheet is blank; keep that off the per-frame path.
- The helper text is hidden at tablet widths, which leaves the mechanic unexplained there; keep a short hint visible at every width.
