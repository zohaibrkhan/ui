# Scroll-pinned story

A tall track with one sticky, full-viewport stage inside it. The page scrolls; the stage stays put and
plays through chapters. All ten scroll-story entries are built this way.

## How it works

- **Track and stage.** The section is several viewport heights tall (the references run roughly three
  and a half to six). Its only child is `position: sticky; top: 0; height: 100svh; overflow: clip`.
  Track height is the pacing control: taller means slower.
- **One timeline, one trigger.** Build a single paused timeline whose positions run 0 to 1, and scrub it
  from one scroll trigger spanning the track. Chapters are positions on that timeline, not separate
  triggers, so order and overlap are decided in one place.
- **Scalars out, not DOM in.** For canvas or WebGL scenes, tween a few plain numbers on the timeline and
  hand them to the renderer on update. The renderer never reads scroll itself.
- **Chapter jumps.** "Skip ahead" and "replay" controls scroll the page to a chapter's position rather
  than seeking the timeline, so scroll and story never disagree.

```js
// Our own minimal sketch of the wiring (GSAP + ScrollTrigger).
const state = { reveal: 0, zoom: 1 }
const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } })
  .to(state, { reveal: 1, duration: 0.4 }, 0.1)
  .to(state, { zoom: 1.3, duration: 0.35 }, 0.55)
ScrollTrigger.create({
  trigger: track, start: "top top", end: "bottom bottom",
  scrub: 0.7, animation: tl, onUpdate: () => renderer.set(state),
})
```

## Pair it with

- [scroll-scrubbed-animation](scroll-scrubbed-animation.md) for the scrub itself
- [smooth-scroll](smooth-scroll.md) for the inertia layer
- [reduced-motion-state-snap](reduced-motion-state-snap.md) for the fallback
- [offscreen-loop-gating](offscreen-loop-gating.md) for render-loop cost
- [play-then-scroll-completes](play-then-scroll-completes.md) for an interactive opening

## Cautions

- Keep real headings and text in the DOM over the stage; a canvas is not content.
- A pinned section several screens tall is a commitment. Give a way out (skip control, visible
  progress) and never trap keyboard focus inside it.
- Use `svh`, not `vh`, so mobile browser chrome does not resize the stage mid-story.
- Working examples to adapt: see `folio-stack` and `scroll-window` via
  [Subframe Motion](../tools/subframe-motion.md).
