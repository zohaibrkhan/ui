# Offscreen loop gating

Stop a canvas or WebGL render loop whenever nobody can see it. Seen in every canvas-based scroll story.

## How it works

- Add the render tick when the stage intersects the viewport and remove it when it leaves
  (`IntersectionObserver`).
- Also stop on `visibilitychange` when the tab is hidden.
- Cap device pixel ratio (somewhere between 1.5 and 2 is usual): a 3x phone screen costs far more fill
  rate for little visible gain.
- When nothing is animating, draw only on change (pointer input, resize, scroll progress).

```js
// Our own sketch.
let running = false
const start = () => { if (!running) { running = true; requestAnimationFrame(frame) } }
const stop = () => { running = false }
function frame(t) { if (!running) return; draw(t); requestAnimationFrame(frame) }
new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())).observe(stage)
document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()))
```

## Cautions

- On restart, reset the frame clock so the first delta is not the whole time the loop was paused.
- Provide a static fallback (an image) when the graphics context is unavailable or is lost.
