# Reduced-motion state snap

A reduced-motion fallback for scroll stories that keeps the story but drops the travel: the same
timeline exists, and progress jumps between a few fixed, fully composed states as the reader crosses
scroll thresholds. Seen in all ten scroll-story entries.

## How it works

- Keep one timeline for both modes. Under `prefers-reduced-motion: reduce`, disable scrub and smooth
  scrolling and set progress directly to one of two to four resting states (start, middle, end).
- Each resting state must be a complete, legible frame: text in place, nothing mid-transition.
- Switch continuous renderers to draw only when something changed.
- Suppress ambient extras (spawned particles, idle drift, intro sequences).
- Listen for the preference changing at runtime, not only at load.

```js
// Our own sketch.
const mq = matchMedia("(prefers-reduced-motion: reduce)")
const STOPS = [0, 0.5, 1]
function onScroll(p) {            // p = raw 0-1 progress through the track
  if (!mq.matches) return         // scrub handles it
  tl.progress(STOPS[Math.min(STOPS.length - 1, Math.floor(p * STOPS.length))])
}
```

## Why this instead of "just turn it off"

Removing the animation often removes the content, because later chapters only exist as timeline
states. Snapping preserves every chapter while removing the motion that causes trouble.
