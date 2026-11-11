# Draggable elements

Things the visitor can pick up and move: photos on a collage, the pages of a book, a record on a
platter. Used by the three portfolio-hero entries.

## How it works

- **Separate click from drag.** Only start dragging after the pointer has moved a few pixels; below
  that, treat the release as a click. Otherwise every click nudges the item.
- **Capture the pointer** (`setPointerCapture`) on pointer-down so the drag survives leaving the
  element or the window edge.
- **Track release velocity** from the last few pointer samples, and let the item coast with friction
  after release. That throw is what makes it feel physical.
- **One progress value.** For constrained drags (a page turn, a rotation), reduce the gesture to a
  single 0-1 or angle value and let that drive every visual: rotation, shadow, the next item's reveal.
- Set `touch-action` on the draggable area so the browser does not scroll the page mid-drag.

## Cautions

- Dragging cannot be the only way to do anything. Provide buttons or keyboard controls for the same
  outcome (next page, rotate, shuffle).
- Bound the movement so nothing can be thrown permanently off-screen; offer a reset.
- Under reduced motion, keep direct manipulation but drop the coasting and bounce.
- Working examples: `sticker-gravity` (physics bodies), `elastic-artboard` (springs back into place),
  `inertial-launcher` (bounded pull and release) via [Subframe Motion](../tools/subframe-motion.md).
