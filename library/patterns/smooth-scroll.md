# Smooth scroll

An inertia layer that eases the page toward the scroll target instead of jumping, so scrubbed
animation receives a continuous signal from a stepped mouse wheel. All ten scroll-story entries use
Lenis for this.

## How it works

- Run the smooth-scroll library from the same ticker as the animation library and have it notify the
  scroll trigger each frame. One clock means scroll position and animation cannot drift apart.
- Use its programmatic scroll for chapter buttons ("skip ahead", "replay").
- Turn it off entirely under `prefers-reduced-motion`.

```js
// Our own sketch: one ticker drives both.
const lenis = new Lenis()
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((t) => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)
```

## Cautions

- It changes how the whole page scrolls, not just one section. On a content site that is a real cost:
  test trackpads, keyboard paging, find-in-page, anchor links and nested scroll areas.
- Scope it to pages that are mostly a scroll experience. A marketing page with one modest reveal does
  not need it.
- Touch devices already scroll with inertia; keep native touch scrolling.
