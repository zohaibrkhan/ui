# Scroll-scrubbed animation

Animation whose progress is a function of scroll position rather than of time. Scroll forward and it
advances; scroll back and it reverses.

## How it works

- Map a scroll range to a 0-1 progress value and drive a timeline (or a few variables) from it.
- Add a short catch-up lag (well under a second) so wheel steps do not read as stutter. Too much lag
  feels like the page is ignoring the reader.
- Use linear easing on the scrubbed tweens. Easing belongs to time-based motion; under scrub it makes
  progress feel uneven for equal scroll distances.
- Stagger chapters with small overlaps so there is never a dead stretch where scrolling changes nothing.

## Choosing a tool

| Need | Reach for |
| --- | --- |
| Fade, slide or scale tied to an element entering view | CSS scroll-driven animations (`animation-timeline: view()`), with a static fallback |
| Several coordinated chapters, pinning, canvas uniforms | A timeline library with a scroll trigger |
| One value for a shader or canvas | A scroll listener computing progress, read inside the render loop |

## Cautions

- Scrubbed motion must leave content readable at every scroll position, since a reader can stop
  anywhere.
- Never hide essential content at progress 0 with no non-animated path to it.
- See [reduced-motion-state-snap](reduced-motion-state-snap.md) and
  [scroll-pinned-story](scroll-pinned-story.md).
