# Pointer tracking

Elements that respond continuously to where the pointer is: eyes that follow, layers that shift,
light that moves, a shader uniform. Used by eleven entries.

## How it works

- Listen once on the stage, store the latest position, and consume it inside the animation frame.
  Do not do work in the event handler.
- Ease toward the target each frame rather than snapping to it; the lag is what makes it feel physical.
- Normalise to -1..1 from the stage centre so the same value can drive parallax offsets, rotations and
  shader uniforms.
- Give each layer its own strength. Small multipliers read as depth; large ones read as a gimmick.

```js
// Our own sketch.
const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 }
stage.addEventListener("pointermove", (e) => {
  const r = stage.getBoundingClientRect()
  target.x = ((e.clientX - r.left) / r.width) * 2 - 1
  target.y = ((e.clientY - r.top) / r.height) * 2 - 1
})
function frame() {
  cur.x += (target.x - cur.x) * 0.1
  cur.y += (target.y - cur.y) * 0.1
  stage.style.setProperty("--px", cur.x); stage.style.setProperty("--py", cur.y)
  requestAnimationFrame(frame)
}
```

## Cautions

- There is no pointer on touch. Decide what the resting state is and make it look finished, or
  substitute a slow ambient drift.
- Under reduced motion, hold the resting state.
- Never put information behind pointer position alone.
