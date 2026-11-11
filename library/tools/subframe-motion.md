# Subframe Motion

- **URL:** https://www.subframe.com/motion
- **Kind:** external motion library with an MCP server (queried live, not mirrored here)
- **Reviewed:** 2026-11-11, through its MCP tools; the website itself was not opened
- **Example pages:** `https://www.subframe.com/motion/<slug>`

## What it is

A library of React animation examples plus written guidance on designing motion. Examples fall into
three categories - "Components & interactions", "Animation & motion", "WebGL & shaders" - and three
runtimes: `react` (React only), `motion` (needs the `motion` package), `webgl`.

Each example returns: complete React source, a description of how it looks and moves, adapt notes
naming the code that drives the motion and what to change, npm packages to install, any image assets
it loads, reduced-motion behaviour, limitations, its licence and upstream credit, related examples and
a preview image.

## Connecting

It is an MCP server. In the session where this was reviewed it was already connected as
`Subframe_Motion`, exposing three tools:

| Tool | Purpose |
| --- | --- |
| `search_motion_examples(query?, category?, runtime?, limit?)` | Plain-language search; empty query browses a category or runtime |
| `get_motion_example(slug)` | Full source and metadata for one example |
| `get_motion_guidance(topics[])` | Guidance by topic (list below) |

The server address was not visible from inside the session, so it is not recorded here: add the
connector from https://www.subframe.com/motion (or your Claude connector settings) in any environment
where the tools are missing. No API key was needed in the reviewed session.

## How to use it on a project

1. **Search before building.** Describe the effect, the element and the feel
   ("glowing border sweeping around a dark pricing card"). Search does not understand negations, so
   put hard constraints in the filters: `runtime: "react"` means no animation library.
2. **Fetch the closest example** and read its adapt notes first: keep the code that drives the motion,
   replace demo copy, data, images and colours.
3. **Map to project tokens.** Swap the demo palette, radii, shadows and fonts for the project's own;
   keep the motion values unless the project already has a motion language.
4. **Match the stack.** If an example needs a package the project lacks, either add it or rewrite
   simple tweens as CSS transitions. Do not add a library for one hover effect.
5. **Keep the licence header** and the reduced-motion and keyboard handling.
6. **If nothing is close,** read the relevant guidance topics, then build from scratch.

Notes on the code: it targets React 19. Under React 18 server rendering, move an example's inline
`<style>` CSS into a stylesheet. Fetching an example writes no files.

## Guidance topics

`principles`, `timing`, `enter-exit`, `feedback`, `scroll`, `ambient`, `text-and-numbers`,
`performance`, `accessibility`, `adapting`.

Working defaults from the server's own instructions, worth having to hand:

| Element | Duration |
| --- | --- |
| Hover, press, toggles | 100-200 ms |
| Tooltips, menus, popovers | 150-250 ms |
| Dialogs, drawers, toasts | 200-350 ms |
| Page transitions | 300-500 ms |

- Exits about a third faster than entrances.
- Menu and tooltip travel 4-12 px; starting scale 0.95-0.98.
- Animate only to explain origin, confirm input, show change or suggest what comes next. Frequent
  actions get little or no animation.
- Respect `prefers-reduced-motion`, including changes at runtime: replace large movement with fades or
  instant changes, keep essential feedback, render ambient motion as a still frame.

## Licensing

Licence is reported per example and can differ, and some examples are adapted from upstream projects.
The one example fetched during review (`copy-button`) is MIT, credited to an upstream source, with the
licence text in the file header. Check the `license` and `adaptedFrom` fields every time, and keep the
header when the code goes into a project.

## Pairing with this library

Entries under `sources/` describe section-level patterns; this server supplies working motion
mechanisms for them. Starting queries for techniques that recur in the catalog:

| Library technique | Search to try | Examples seen in review |
| --- | --- | --- |
| `scroll-pinned-story`, `card-stack` | "sticky scroll card stack" | `folio-stack` |
| `text-reveal-on-scroll` | "scroll text reveal line by line" | `poem-scroll` |
| `scroll-scrubbed-animation` | "scroll-driven image reveal" | `scroll-window`, `scroll-turntable`, `aperture-reveal` |
| `oversized-type`, `marquee` | "scroll velocity text" | `velocity-type` |
| `webgl-shader-background` | browse category "WebGL & shaders" | `flow-memory`, `reaction-lab`, `noise-threshold` |
| `pointer-tracking` | "image effect following the pointer" | `wake-image` |
| `rolling-number` | "odometer digits for a changing price" | `sliding-number`, `animated-number` |
| `draggable-elements` | "draggable cards with inertia" | `sticker-gravity`, `elastic-artboard`, `inertial-launcher` |
| button and form feedback | "press feedback", "copy to clipboard button" | `copy-button`, `loading-button` |

These pairings come from four searches, so treat them as leads rather than a survey.

## Shortlist

| Example | Why | Licence |
| --- | --- | --- |
| _add as you use them_ | | |
