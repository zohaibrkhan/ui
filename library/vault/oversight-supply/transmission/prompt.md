<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Transmission

Transmission is a full-page hero on a near-black field. A lily exists only as mathematics: a signed-distance field, raymarched in WebGL, then redrawn every frame as a grid of monospace glyphs. Scroll tightens that grid, opens the bloom, lifts the camera, and grows a decoder lens until the flower is the render and the type reads “Decoded.” Move the pointer to open a circular lens on the true picture. Drag sideways to turn the flower. Click, or tap, to send a pulse through the grid. A dock switches the glyph set between ascii, binary, and blocks. A live log prints cell size, bloom, yaw, pitch, march scale, frame rate, and decode. Nothing is a model file or a photograph.

Rebuild it as the only thing on the page. Create the files in **Full source code** at the paths in their headings, with those contents exactly.

## Stack & dependencies

React 19, TypeScript, and Vite. The intro and the scroll story are `gsap` with `ScrollTrigger`. Smooth scrolling is `lenis`, only when the visitor has not asked for reduced motion. The lily and the glyph grid are `three`: one orthographic quad, two shader passes. `three` is required for this section.

Fonts, imported in `src/main.tsx`:

- `@fontsource/instrument-serif` at 400 and 400 italic — the `№ 004`, the headline, the finale title
- `@fontsource-variable/inter` — the page’s default sans, the aside, the finale body
- `@fontsource/ibm-plex-mono` at 500 — the header, the live log, the hint, the dock, the finale kicker and button, the loader, and the glyph atlas (the canvas font string is `500 50px "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace`)

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 three@^0.178.0 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @types/three@^0.178.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Background `#0a0b09` (`--tx-bg`). Ink `#e9e6d8` (`--tx-ink`). Soft ink `rgba(233, 230, 216, 0.55)` (`--tx-soft`). Dim ink `rgba(233, 230, 216, 0.32)` (`--tx-dim`). Lime `#d6f06b` (`--tx-lime`). Rules `rgba(233, 230, 216, 0.14)` (`--tx-rule`). The active dock label is `#10120c` on lime. The finale button border is `rgba(233, 230, 216, 0.4)`. The finale scrim is `linear-gradient(to top, rgba(8, 9, 7, 0.75), transparent 50%)`. The headline shadow is `0 0 40px rgba(10, 11, 9, 0.8)`. Shader ink is `vec3(0.91, 0.9, 0.84)` and shader accent is `vec3(0.84, 0.94, 0.42)`, which is the same lime.

Type:

- `--tx-serif`: `'Instrument Serif', 'Times New Roman', serif`
- `--tx-sans`: `'Inter Variable', 'Inter', system-ui, sans-serif`
- `--tx-mono`: `'IBM Plex Mono', ui-monospace, monospace`

`html` and `body` have no margin. Body colour is ink. Document title: `Transmission — Oversight Supply`. Theme colour: `#0a0b09`.

The track is `420vh`. The stage is sticky: `top: 0; height: 100vh; height: 100svh; overflow: hidden; overflow: clip; touch-action: pan-y; cursor: crosshair; user-select: none; background: #0a0b09`. The section’s accessible name is `Transmission — a lily rendered as live text`.

**Paint order.**

1. `<canvas class="tx-canvas">`, `inset: 0`, no z-index, `aria-hidden="true"`. Opacity 0 until `data-status="ready"`, then opacity 1 over 1.4s.
2. Header, log, headline, aside, hint, dock, finale, and loader. All `position: absolute; z-index: 2`.

**Header.** A three-column grid, `1fr auto 1fr`, on a bottom rule. Mono 500, 10.5px, uppercase, letter-spacing `0.14em`, padding `clamp(14px, 1.8vw, 22px) 0 12px`, side inset `clamp(16px, 2.4vw, 32px)`, `pointer-events: none`.

- Left: `Signal/Flora`.
- Centre: `Transmission` then italic Instrument Serif `№ 004` at 15px, letter-spacing `0.02em`, `text-transform: none`, colour `#d6f06b`. The character before `004` is the numero sign `№`.
- Right, `justify-self: end`, gap 8px, soft ink: a 6px lime dot (`box-shadow: 0 0 10px var(--tx-lime)`, blinks to opacity 0.25 on a 1.6s `steps(2)` loop) then `Live · ` and a span. The span starts as an em dash `—`. Once the engine is ready it reads `{cell}px · {fps} fps`, cell rounded to a whole number. The middle dot is `·`.

**Log** (`aria-hidden="true"`). A `<pre>`, left inset the same as the header, `top: 76px`, margin 0. Mono 500, 10px, line-height 1.7, letter-spacing `0.04em`, dim ink, `white-space: pre`, `pointer-events: none`. A mask fades the top: `linear-gradient(to bottom, transparent, #000 40%)`. It stays empty until status is `ready`. Then an interval appends one line and keeps the last 14. The interval is 180ms, or 1000ms when reduced motion is on. Which of the four lines is written depends on `Math.floor(performance.now() / 180) % 4`, not on the interval. `{secs}` is seconds since the log started, two decimals, padded with zeros to 6 characters (`000.18`). Two spaces follow `>`.

- `> t+{secs}  cell {cell}px  bloom {bloom}` — cell to 1 decimal, bloom to 2.
- `> t+{secs}  yaw {yaw}°  pitch {pitch}°` — yaw in degrees, wrapped to 0–360, rounded, padded to 3 digits. Pitch in degrees, rounded, not padded.
- `> t+{secs}  march {scale}%  {fps} fps` — `stats.scale * 100`, rounded.
- `> t+{secs}  decode {decode}%  lens {open|idle}` — decode percent rounded and padded to 3 digits. `open` when `state.lensR` is non-zero, otherwise `idle`.

**Headline.** Left inset as the header, `bottom: clamp(24px, 4vw, 56px)`, `pointer-events: none`. Instrument Serif, weight 400, `clamp(52px, 8.6vw, 156px)`, line-height 0.88, letter-spacing `-0.035em`. Two masked lines (each line is `overflow: hidden`):

```
Every flower
is a signal.
```

`is a signal.` is an `<em>`, colour `#d6f06b`. The em is not given `font-style: italic` in CSS; Instrument Serif’s italic file is loaded, and the browser’s italic synthesis is what the element asks for. Leave the markup as an `<em>`.

**Aside.** Right inset as the header, `bottom: clamp(88px, 9vw, 120px)`, width `min(290px, 40vw)`, `pointer-events: none`. 13px, line-height 1.5, soft ink. One paragraph:

`A lily, grown from mathematics and rendered as text, live, sixty times a second.`

Then a space and one of these, from React state:

- WebGL failed: `This browser can’t run WebGL, so the signal is off air.` The apostrophe is the right single quotation mark `’`.
- `(pointer: coarse)` was true on first render: `Touch and hold to decode. Drag to turn it. Tap to pulse.`
- Otherwise: `Move to decode. Drag to turn it. Click to pulse.`

The coarse-pointer check does not update if a mouse is plugged in later.

**Hint** (`aria-hidden="true"`). `left: 50%; top: 50%; transform: translate(-50%, 0); margin-top: min(34vh, 320px)`. Mono 500, 10px, uppercase, letter-spacing `0.18em`, soft ink: `Scroll to tune in`. The label bobs 5px and fades to opacity 0.5 on a 2.4s ease-in-out loop.

**Dock** (`role="radiogroup"` `aria-label="Glyph set"`). Right inset, `bottom: clamp(24px, 4vw, 56px)`. It is always in the DOM so the scroll timeline can fade it, and `hidden` is set until status is `ready`. CSS is `display: flex`, which would ignore the user-agent `[hidden]` rule, so `.tx-dock[hidden] { display: none; }` is required. Pill, padding 3px, gap 2px, border `1px solid var(--tx-rule)`, radius 999px, background `rgba(10, 11, 9, 0.6)`, blur 8px. Three radio buttons. The markup text is the set id, and CSS uppercases it:

- `ascii`
- `binary`
- `blocks`

Mono 500, 10.5px, letter-spacing `0.14em`, padding `10px 13px`, radius 999px, soft ink. Hover sets the colour to ink. The checked button has class `is-active`: background `#d6f06b`, text `#10120c`. `:focus-visible` is a 1px lime outline, offset 2px.

The strings those buttons select, including the leading space on each, are the atlas:

- ascii: ` .:-=+*oxX#%@`
- binary: ` .·:01` — space, `.`, middle dot `·`, `:`, `0`, `1`
- blocks: ` ·░▒▓█` — space, middle dot `·`, `░`, `▒`, `▓`, `█`

**Finale.** `inset: 0`, flex column, `justify-content: flex-end`, padding `clamp(22px, 4vw, 64px)`, opacity 0, `pointer-events: none`, under the scrim above.

Kicker, mono 500, 10.5px, uppercase, letter-spacing `0.18em`, lime, margin-bottom 14px: `Signal decoded · 100%`.

Title, an `h2`, Instrument Serif, weight 400, `clamp(72px, 15vw, 260px)`, line-height 0.82, letter-spacing `-0.045em`: `Decoded.`

Body, margin `18px 0 22px`, 14px, soft ink: `What you saw as text was always a flower.`

Button: `Replay transmission` and a span `↑` (`aria-hidden`). Mono 500, 11px, uppercase, letter-spacing `0.14em`, padding `13px 18px`, radius 999px, transparent fill, ink text, border as above. Hover fills `#d6f06b`, border becomes lime, text `#10120c`. `:focus-visible` outline is 1px lime, offset 3px.

**Loader**, only while status is `loading` (`role="status"`). `inset: 0`, centred. Mono 500, 10.5px, uppercase, letter-spacing `0.18em`, soft ink: `Tuning in…` The ellipsis is the single character `…`. It unmounts when status becomes `ready` or `failed`. There is no separate error screen. Failure is the aside sentence, an invisible canvas, and no dock.

## Interactions & animation timeline

`smooth(a, b, v)` is a smoothstep: `t = clamp((v - a) / (b - a))`, then `t * t * (3 - 2 * t)`.

Let `p` be the story progress, 0 to 1, across the `420vh` track. `mobile` means `window.innerWidth < 700`. The engine state written from scroll is only `cell`, `bloom`, `pitch`, and `decode`. Yaw is not part of the scroll story.

```
res = smooth(0, 0.34, p)
cell   = (mobile ? 15 : 20) - res * (mobile ? 7 : 11)
bloom  = 0.3 + 0.7 * smooth(0.12, 0.58, p)
pitch  = 0.28 + 0.9 * smooth(0.3, 0.72, p)
decode = smooth(0.66, 0.93, p)
```

Desktop cell goes from 20px to 9px while `p` goes from 0 to 0.34, then holds. Narrow cell goes from 15px to 8px over the same span. Bloom starts at 0.3 and reaches 1 at `p = 0.58`. Pitch starts at 0.28 radians and reaches 1.18 at `p = 0.72`. Decode stays 0 until 0.66 and reaches 1 at 0.93. The engine’s own initial `cell` of 16 is overwritten by `apply(0)` as soon as the scroll effect runs, and again when status becomes `ready`, because the engine is created after the font race.

**Intro**, only when motion is allowed. Timeline delay `0.3`, default ease `expo.out`, inside `gsap.context` on the stage:

- `.tx-top > *` from `{ opacity: 0, y: -8 }`, duration `1`, stagger `0.08`.
- At `0.2`: `.tx-head .li` from `{ yPercent: 110 }`, duration `1.6`, stagger `0.1`. The line boxes are `overflow: hidden`, so the words rise into view.
- At `0.7`: `.tx-aside__in, .tx-dock button, .tx-hint__in` from `{ opacity: 0 }`, duration `1.2`, stagger `0.08`.

**Scroll.** CSS sticky pins the stage. `ScrollTrigger`: `trigger: track`, `start: 'top top'`, `end: 'bottom bottom'`, `scrub: 0.7` when motion is allowed. A local object `story` tweens `p` from 0 to 1 over duration 1, and `onUpdate` calls `apply`. Ease default `none`.

| From | To | What changes |
| --- | --- | --- |
| 0.00 | 1.00 | `story.p` 0 → 1, and `apply` writes cell, bloom, pitch, and decode. |
| 0.00 | 0.05 | `.tx-hint` opacity → 0. |
| 0.20 | 0.30 | `.tx-head, .tx-aside` to `{ opacity: 0, y: -24 }`, duration `0.1`, stagger `0.02`. |
| 0.80 | 0.88 | `.tx-log, .tx-dock` opacity → 0, duration `0.08`. |
| 0.92 | 0.99 | `.tx-final` from `{ opacity: 0, y: 30, pointerEvents: 'none' }` to `{ opacity: 1, y: 0, pointerEvents: 'auto' }`, duration `0.07`. |

Reading the flower against that same `p`: the grid is tightening through the first third, the bloom is open by 0.58, the camera has risen by 0.72, and the decoder lens fills the stage from 0.66 to 0.93. The headline is gone before the lens has started. The log and the dock fade just before the finale.

**Reduced motion** does not scrub. `animation` on the ScrollTrigger is omitted. On each update the timeline is parked and `apply` is called with one of three values:

- `progress > 0.8` → `1` (tight grid, bloom 1, pitch 1.18, decode 1, finale visible)
- else `progress > 0.35` → `0.6` (tight grid, bloom 1, pitch part way, decode 0)
- else → `0` (open grid, bloom 0.3, pitch 0.28, decode 0)

`setStatic(true)` freezes shader time at 0, sets flicker to 0, stops the idle yaw, and snaps the lens smoothing. The dot blink, the hint bob, and the canvas opacity transition are `animation: none` / `transition: none`. The intro timeline does not run.

**Pointer.** Coordinates are local to the stage’s border box. A drag only uses horizontal movement: `nudgeYaw(dx * 0.008)` radians. Vertical movement counts toward the drag distance but does not pitch the flower.

- `pointermove`: if a drag is in progress, add the x delta to yaw. The lens is active for a mouse when the target is not inside a `button` or `a`. A touch lens is active only while the pointer is down.
- `pointerdown` outside a button or link: start the drag and open the lens.
- `pointerup` on `window`: if the pointer moved less than 8px, `pulseAt` at the release point. A non-mouse pointer then closes the lens. A mouse keeps it open.
- `pointercancel` and `pointerleave` drop the drag and close the lens at the point where the pointer left.

Lens target radius, in CSS pixels, is 128 when the stage width is 700 or more, and 88 when it is under 700. Inactive radius is 0. Decode then pulls the lens center toward the stage center and its radius toward `0.6 * hypot(width, height)`, so by `decode = 1` the true render covers the grid regardless of the pointer.

**Replay transmission** scrolls to `ScrollTrigger.start`. Lenis `scrollTo` uses duration `2`. Without Lenis, `window.scrollTo` uses `behavior: 'auto'` when reduced motion is on and `'smooth'` otherwise.

**Lenis**, only if motion is allowed: `{ lerp: 0.085 }`. Scroll events call `ScrollTrigger.update`. The ticker runs `lenis.raf(time * 1000)` and `gsap.ticker.lagSmoothing(0)`.

**Keyboard.** The dock radios and the replay button are focusable, with `:focus-visible` outlines. There is no key that turns the flower or fires a pulse.

**Engine.** `TransmissionEngine` in the source below. Short version, so the timeline above has somewhere to land:

- Pass one draws a raymarched lily into a render target whose size is CSS pixels times `scale`. `scale` starts at `0.6`. Its cap is `0.75`, or `0.55` when the stage width is under 700. Every 40 frames, if the average delta is above `0.021` and scale is above `0.34`, scale drops by `0.08`. If the average is below `0.0135` and scale is under the cap, scale rises by `0.04`. March steps are `96`, or `70` when scale is below `0.45`. The march starts at `t = 0.5`, advances by `0.75` of the distance, hits when the distance is under `0.0012 * t`, and gives up past `t = 7.5`, with a hard loop cap of 110.
- The lily is two rings of three tepals, a receptacle, a stem, six filaments with anthers, and a pistil. `bloom` moves tepal tilt from `1.3` toward `0.12` and curl from `0` toward `0.75`. Pitch raises the orbit: distance `mix(4.1, 5.0, k)`, look-at height `mix(0.3, 0.12, k)`, with `k = smoothstep(0.3, 1.2, pitch)`. Yaw is `state.yaw` (it starts at `0.6`) plus an idle spin of `0.12` radians per second, unless static mode is on. A pulse decays with `pow(0.12, dt)` and flutters the tepals.
- Pass two samples that picture on a cell grid. Cell height is `state.cell` times device pixel ratio. Cell width is `0.62` of that, so the glyphs are taller than they are wide. Luminance picks a glyph. A click starts a ring at `0.55 * max(width, height)` pixels per second; amplitude decays with `pow(0.3, dt)`. Inside the ring, glyphs scramble. The lens shows the true render, with a chromatic split of 6 device pixels toward the rim and a lime rim.
- The atlas is one canvas row. Each glyph is a 40×64 cell, white on black, drawn with `500 50px` of the mono string, baseline shifted down 2px. Changing the dock rebuilds that texture. It is not redrawn per frame.
- The loop plays when the track intersects the viewport and `document.hidden` is false. Static mode draws only when state is dirty, the lens radius is still settling (more than 0.5px from its target), or a ring amplitude is above `0.01`. Constructor failure logs `[transmission] WebGL unavailable` and sets status to `failed`. `webglcontextlost` is prevented and does the same.

Startup waits for `document.fonts.load('500 50px …')` of the mono stack, raced with a 2000ms timeout, then constructs the engine, resizes, observes resize and intersection, and plays.

## Responsive behaviour

There is no breakpoint at 820px or 900px. The only width query is `max-width: 700px`. JavaScript uses `window.innerWidth < 700` for the cell size in `apply`, and the engine’s own width for the lens radius (`128` or `88`) and the raymarch cap (`0.75` or `0.55`).

**Desktop, wider than 700px.** The header shows all three cells, including `Transmission № 004`. The log sits at `top: 76px` in 10px type. The headline can reach 156px, sitting on the lower left. The aside is on the lower right, up to 290px wide. The hint is visible under the flower. The dock is on the lower right. Cell size runs from 20px down to 9px. The pointer lens is 128 CSS pixels. Raymarch scale caps at 0.75. The finale title can reach 260px.

**Around 820px.** No query applies. Header, type sizes, aside, hint, dock, cell formula, lens radius, and raymarch cap all stay on the desktop rules.

**700px and under.**

- Header becomes `grid-template-columns: 1fr auto`. `.tx-top__c` (`Transmission № 004`) is `display: none`.
- Log `top: 64px`, font-size 9px, `max-height: 30vh`, `overflow: hidden`.
- Headline `bottom: 128px`, `clamp(46px, 14vw, 76px)`.
- Aside `left: 16px; right: 16px; width: auto; bottom: 72px`. The paragraph is 12px.
- Dock `left: 16px; right: auto; bottom: 20px`. Buttons `padding: 9px 11px`.
- Hint `display: none`.
- Cell size runs from 15px down to 8px. Pointer lens is 88 CSS pixels. Raymarch scale caps at 0.55.

A coarse pointer changes the aside sentence at any width. It is not tied to the 700px breakpoint.

## Accessibility & robustness

- **`prefers-reduced-motion`.** Read on first render and on `change`. No intro timeline. No Lenis. Scroll does not scrub; it parks the story at progress 0, 0.6, or 1 as above. `setStatic(true)` freezes the shader clock, the idle yaw, and the glyph flicker, and snaps lens smoothing. The dot, the hint, and the canvas fade stop. The log interval becomes 1 second. Scrolls from Replay jump with `behavior: 'auto'` when Lenis is absent.
- **WebGL.** Status is `loading`, then `ready` or `failed`. Failure leaves the canvas at opacity 0, unmounts the loader, keeps the dock `hidden`, and swaps the aside to the off-air sentence. The headline and the scroll finale still run. There is no canvas fallback image.
- **Images.** There are none. The glyph atlas is a canvas texture built in the page.
- **Off-screen.** After the engine exists, an IntersectionObserver on the track plus `visibilitychange` pauses the loop unless the track is intersecting and the document is visible.
- **`overflow: clip`** is set on `.tx-stage` after `overflow: hidden`. The sticky stage clips, and focus cannot scroll it. `touch-action: pan-y` keeps vertical scrolling available. A sideways drag turns the flower.
- **StrictMode.** The scroll effect allocates `const story = { p: 0 }` inside the run and tweens that object inside `gsap.context`. Cleanup `revert()`s that context and clears `stRef`. The engine is created in a normal effect after the font race, with a `disposed` flag so a late font callback does not construct into an unmounted tree. Cleanup calls `dispose()`.

## Performance notes

- The raymarch target is `scale` times the CSS pixel size, not the device-pixel size. The glyph pass is the only full-resolution draw. `devicePixelRatio` on that pass is capped at 2.
- The renderer is `antialias: false`, `alpha: false`, `powerPreference: 'high-performance'`, `outputColorSpace: LinearSRGBColorSpace`. The scene target is linear filtered and has no depth buffer.
- Scale adapts from the average of 40 frame deltas, floored at `0.34` and capped at `0.75` or `0.55`. Below `0.45`, march steps drop from 96 to 70.
- Static mode skips `frame` unless something is dirty, the lens is still easing, or a pulse ring is still visible. The intersection and visibility pauses cancel the animation frame entirely.
- The atlas is rebuilt only when the glyph set changes.
- Fonts are given at most 2 seconds. The engine does not wait forever on `document.fonts`.

## Full source code

Create these five files exactly. Do not reformat, rename, or restyle them. `index.html` replaces the Vite template’s `index.html`. The other four replace or sit beside it under `src/`. The template files `App.tsx`, `App.css`, `index.css`, and `vite.svg` are unused; delete them so they are not imported. Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0a0b09" />
    <title>Transmission — Oversight Supply</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>
```

### `src/main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/inter'
import '@fontsource/ibm-plex-mono/500.css'
import './transmission.css'
import TransmissionHero from './TransmissionHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TransmissionHero />
  </StrictMode>,
)
```

### `src/TransmissionHero.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { GLYPH_SETS, TransmissionEngine, type GlyphSet } from './TransmissionEngine'

gsap.registerPlugin(ScrollTrigger)

const MONO = '"IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace'
const SETS = Object.keys(GLYPH_SETS) as GlyphSet[]

const smooth = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export default function TransmissionHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<TransmissionEngine | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const logRef = useRef<HTMLPreElement>(null)
  const statRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef(0)
  const reduced = usePrefersReducedMotion()

  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [glyphs, setGlyphs] = useState<GlyphSet>('ascii')
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)

  /* ------------------------------------------------------------ engine */
  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return
    let disposed = false
    let engine: TransmissionEngine | null = null
    let ro: ResizeObserver | null = null
    let io: IntersectionObserver | null = null
    let inView = true
    const onVis = () => (document.hidden || !inView ? engine?.pause() : engine?.play())

    Promise.race([document.fonts.load(`500 50px ${MONO}`), new Promise((r) => setTimeout(r, 2000))]).then(() => {
      if (disposed) return
      try {
        engine = new TransmissionEngine(canvas, { font: MONO })
      } catch (err) {
        console.warn('[transmission] WebGL unavailable', err)
        setStatus('failed')
        return
      }
      engineRef.current = engine
      engine.resize(stage.clientWidth, stage.clientHeight)
      ro = new ResizeObserver(() => engine?.resize(stage.clientWidth, stage.clientHeight))
      ro.observe(stage)
      io = new IntersectionObserver(([e]) => {
        inView = e.isIntersecting
        onVis()
      })
      if (trackRef.current) io.observe(trackRef.current)
      document.addEventListener('visibilitychange', onVis)
      canvas.addEventListener('webglcontextlost', onLost)
      engine.play()
      setStatus('ready')
    })
    const onLost = (e: Event) => {
      e.preventDefault()
      setStatus('failed')
    }

    return () => {
      disposed = true
      ro?.disconnect()
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('webglcontextlost', onLost)
      engine?.dispose()
      engineRef.current = null
    }
  }, [])

  useEffect(() => {
    engineRef.current?.setStatic(reduced)
  }, [reduced, status])

  useEffect(() => {
    engineRef.current?.setGlyphs(glyphs)
  }, [glyphs, status])

  /* ---------------------------------------------- pointer: lens, drag, pulse */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || status !== 'ready') return
    const local = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const isUi = (e: PointerEvent) => !!(e.target as HTMLElement).closest('button, a')
    let down: { x: number; y: number; moved: number } | null = null

    const move = (e: PointerEvent) => {
      const p = local(e)
      const eng = engineRef.current
      if (!eng) return
      if (down) {
        const dx = p.x - down.x
        down.moved += Math.abs(dx) + Math.abs(p.y - down.y)
        down.x = p.x
        down.y = p.y
        eng.nudgeYaw(dx * 0.008)
      }
      const active = e.pointerType === 'mouse' ? !isUi(e) : !!down
      eng.setPointer(p.x, p.y, active)
    }
    const press = (e: PointerEvent) => {
      if (isUi(e)) return
      const p = local(e)
      down = { x: p.x, y: p.y, moved: 0 }
      engineRef.current?.setPointer(p.x, p.y, true)
    }
    const release = (e: PointerEvent) => {
      if (!down) return
      const p = local(e)
      if (down.moved < 8) engineRef.current?.pulseAt(p.x, p.y) // a click, not a drag
      down = null
      if (e.pointerType !== 'mouse') engineRef.current?.setPointer(p.x, p.y, false)
    }
    const leave = (e: PointerEvent) => {
      down = null
      const p = local(e)
      engineRef.current?.setPointer(p.x, p.y, false) // lens closes where the pointer left
    }
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    stage.addEventListener('pointercancel', leave)
    stage.addEventListener('pointerleave', leave)
    return () => {
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      stage.removeEventListener('pointercancel', leave)
      stage.removeEventListener('pointerleave', leave)
    }
  }, [status])

  /* ------------------------------------------------------ smooth scroll */
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.085 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  /* ------------------------------------------------ intro + scroll story */
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.3 })
          .from('.tx-top > *', { opacity: 0, y: -8, duration: 1, stagger: 0.08 })
          .from('.tx-head .li', { yPercent: 110, duration: 1.6, stagger: 0.1 }, 0.2)
          .from('.tx-aside__in, .tx-dock button, .tx-hint__in', { opacity: 0, duration: 1.2, stagger: 0.08 }, 0.7)
      }

      const story = { p: 0 }
      const apply = (p: number) => {
        progressRef.current = p
        const mobile = window.innerWidth < 700
        const res = smooth(0, 0.34, p)
        engineRef.current?.setState({
          cell: (mobile ? 15 : 20) - res * (mobile ? 7 : 11),
          bloom: 0.3 + 0.7 * smooth(0.12, 0.58, p),
          pitch: 0.28 + 0.9 * smooth(0.3, 0.72, p),
          decode: smooth(0.66, 0.93, p),
        })
      }
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      tl.to(story, { p: 1, duration: 1, onUpdate: () => apply(story.p) }, 0)
        .to('.tx-hint', { opacity: 0, duration: 0.05 }, 0)
        .to('.tx-head, .tx-aside', { opacity: 0, y: -24, duration: 0.1, stagger: 0.02 }, 0.2)
        .to('.tx-log, .tx-dock', { opacity: 0, duration: 0.08 }, 0.8)
        .fromTo('.tx-final', { opacity: 0, y: 30, pointerEvents: 'none' }, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.92)

      stRef.current = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        animation: reduced ? undefined : tl,
        scrub: reduced ? false : 0.7,
        onUpdate(self) {
          if (!reduced) return
          // discrete states only: signal → bloom → decoded
          const p = self.progress > 0.8 ? 1 : self.progress > 0.35 ? 0.6 : 0
          tl.progress(p)
          apply(p)
        },
      })
      apply(0)
    }, stageRef)
    return () => {
      stRef.current = null
      ctx.revert()
    }
  }, [reduced])

  // keep the engine in sync once it exists (it's created after fonts load)
  useEffect(() => {
    if (status !== 'ready') return
    stRef.current?.update()
    const p = progressRef.current
    const mobile = window.innerWidth < 700
    engineRef.current?.setState({
      cell: (mobile ? 15 : 20) - smooth(0, 0.34, p) * (mobile ? 7 : 11),
      bloom: 0.3 + 0.7 * smooth(0.12, 0.58, p),
      pitch: 0.28 + 0.9 * smooth(0.3, 0.72, p),
      decode: smooth(0.66, 0.93, p),
    })
  }, [status])

  /* ------------------------------------ live log: real numbers from the engine */
  useEffect(() => {
    if (status !== 'ready') return
    const lines: string[] = []
    const t0 = performance.now()
    const id = setInterval(() => {
      const eng = engineRef.current
      if (!eng) return
      const s = eng.state
      const secs = ((performance.now() - t0) / 1000).toFixed(2).padStart(6, '0')
      const yaw = ((((s.yaw * 180) / Math.PI) % 360) + 360) % 360
      const pick = Math.floor(performance.now() / 180) % 4
      const line =
        pick === 0
          ? `> t+${secs}  cell ${s.cell.toFixed(1)}px  bloom ${s.bloom.toFixed(2)}`
          : pick === 1
            ? `> t+${secs}  yaw ${yaw.toFixed(0).padStart(3, '0')}°  pitch ${((s.pitch * 180) / Math.PI).toFixed(0)}°`
            : pick === 2
              ? `> t+${secs}  march ${(eng.stats.scale * 100).toFixed(0)}%  ${eng.stats.fps} fps`
              : `> t+${secs}  decode ${(s.decode * 100).toFixed(0).padStart(3, '0')}%  lens ${s.lensR ? 'open' : 'idle'}`
      lines.push(line)
      if (lines.length > 14) lines.shift()
      if (logRef.current) logRef.current.textContent = lines.join('\n')
      if (statRef.current) statRef.current.textContent = `${s.cell.toFixed(0)}px · ${eng.stats.fps} fps`
    }, reduced ? 1000 : 180)
    return () => clearInterval(id)
  }, [status, reduced])

  const replay = () => {
    const st = stRef.current
    if (!st) return
    if (lenisRef.current) lenisRef.current.scrollTo(st.start, { duration: 2 })
    else window.scrollTo({ top: st.start, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <main className="tx-root" data-status={status}>
      <section ref={trackRef} className="tx-track" aria-label="Transmission — a lily rendered as live text">
        <div ref={stageRef} className="tx-stage">
          <canvas ref={canvasRef} className="tx-canvas" aria-hidden="true" />

          <header className="tx-top">
            <span>Signal/Flora</span>
            <span className="tx-top__c">Transmission <em>№ 004</em></span>
            <span className="tx-top__r">
              <i className="tx-dot" aria-hidden="true" /> Live · <span ref={statRef}>—</span>
            </span>
          </header>

          <pre ref={logRef} className="tx-log" aria-hidden="true" />

          <h1 className="tx-head">
            <span className="ln"><span className="li">Every flower</span></span>
            <span className="ln"><span className="li"><em>is a signal.</em></span></span>
          </h1>

          <div className="tx-aside">
            <p className="tx-aside__in">
              A lily, grown from mathematics and rendered as text, live, sixty times a second.{' '}
              {status === 'failed'
                ? 'This browser can’t run WebGL, so the signal is off air.'
                : isTouch
                  ? 'Touch and hold to decode. Drag to turn it. Tap to pulse.'
                  : 'Move to decode. Drag to turn it. Click to pulse.'}
            </p>
          </div>

          <div className="tx-hint" aria-hidden="true">
            <span className="tx-hint__in">Scroll to tune in</span>
          </div>

          {/* always mounted so the scroll timeline can target it; hidden by CSS until WebGL is ready */}
          <div className="tx-dock" role="radiogroup" aria-label="Glyph set" hidden={status !== 'ready'}>
            {SETS.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={glyphs === s}
                className={glyphs === s ? 'is-active' : ''}
                onClick={() => setGlyphs(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="tx-final">
            <p className="tx-final__kicker">Signal decoded · 100%</p>
            <h2 className="tx-final__title">Decoded.</h2>
            <p className="tx-final__body">What you saw as text was always a flower.</p>
            <button type="button" className="tx-final__btn" onClick={replay}>
              Replay transmission <span aria-hidden="true">↑</span>
            </button>
          </div>

          {status === 'loading' && <div className="tx-loader" role="status">Tuning in…</div>}
        </div>
      </section>
    </main>
  )
}
```

### `src/TransmissionEngine.ts`

```ts
import * as THREE from 'three'

/**
 * TransmissionEngine
 *  pass 1 — a raymarched, signed-distance-field lily (no model files) rendered into a
 *           lower-resolution target (adaptive: drops resolution if frames get slow).
 *  pass 2 — the scene is re-drawn as a grid of monospace glyphs sampled from a runtime
 *           glyph atlas. A circular "decoder lens" around the pointer shows the true render
 *           with chromatic aberration; a click sends a scrambling shockwave through the grid.
 */

export const GLYPH_SETS = {
  ascii: ' .:-=+*oxX#%@',
  binary: ' .·:01',
  blocks: ' ·░▒▓█',
} as const
export type GlyphSet = keyof typeof GLYPH_SETS

const VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`

const SCENE_FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uBloom;
uniform float uYaw;
uniform float uPitch;
uniform float uPulse;
uniform int uSteps;
varying vec2 vUv;

#define PI 3.14159265

vec2 rotv(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }
float hash21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float sdEllipsoid(vec3 p, vec3 r) { float k0 = length(p / r); float k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / k1; }
float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}
float smin(float a, float b, float k) { float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }

// One ring of n tepals via polar repetition. Returns distance; 'along' = 0 at base, 1 at tip.
float tepals(vec3 p, float n, float offs, float L, float W, float tilt, float curl, out float along, out float side) {
  float sector = 2.0 * PI / n;
  float a = atan(p.z, p.x) + offs;
  float id = floor(a / sector + 0.5);
  a -= id * sector;
  float r = length(p.xz);
  vec3 q = vec3(r * cos(a), p.y, r * sin(a));   // x: outward, y: up, z: across
  float flutter = sin(uTime * 1.3 + id * 1.7) * 0.03 + uPulse * 0.12 * sin(uTime * 22.0 + id);
  q.xy = rotv(q.xy, -(tilt + flutter));         // into petal frame
  q.y += curl * q.x * q.x;                      // recurved tips (lily)

  along = clamp(q.x / L, 0.0, 1.0);
  side = q.z / W;
  float thick = 0.024 * (1.0 - along * 0.45);
  float d = sdEllipsoid(q - vec3(L * 0.52, 0.0, 0.0), vec3(L * 0.52, thick, W));
  d /= sqrt(1.0 + pow(2.0 * curl * q.x, 2.0));            // undo the bend's stretch so marching stays exact
  return d;
}

// .x distance, .y material (1 tepal, 2 filament, 3 anther, 4 stem/base), .z along, .w side
vec4 map(vec3 p) {
  p.y -= 0.15;
  float b = uBloom;
  float tilt = mix(1.3, 0.12, b);
  float curl = mix(0.0, 0.75, b);
  float al1, sd1, al2, sd2;
  float d1 = tepals(p, 3.0, 0.0, 0.98, 0.24, tilt, curl, al1, sd1);
  float d2 = tepals(p, 3.0, PI / 3.0, 0.92, 0.28, tilt + 0.1, curl * 0.9, al2, sd2);
  vec4 res = d1 < d2 ? vec4(d1, 1.0, al1, sd1) : vec4(d2, 1.0, al2, sd2);

  // receptacle + stem
  float base = sdEllipsoid(p - vec3(0.0, -0.06, 0.0), vec3(0.11, 0.16, 0.11));
  vec3 sp = p; sp.x += 0.08 * sin(sp.y * 1.2);
  float stem = sdCapsule(sp, vec3(0.0, -0.1, 0.0), vec3(0.0, -3.2, 0.0), 0.035);
  float bs = smin(base, stem, 0.08);
  res.x = smin(res.x, bs, 0.07);
  if (bs < d1 && bs < d2) res.yzw = vec3(4.0, 0.0, 0.0);

  // six filaments with anthers (polar repetition)
  float sector = PI / 3.0;
  float a = atan(p.z, p.x) + 0.5;
  a -= floor(a / sector + 0.5) * sector;
  float r = length(p.xz);
  vec3 q = vec3(r * cos(a), p.y, r * sin(a));
  vec3 tip = vec3(mix(0.08, 0.34, b), mix(0.45, 0.58, b), 0.0);
  float fil = sdCapsule(q, vec3(0.0), tip, 0.007);
  float ant = sdEllipsoid(q - tip - vec3(0.0, 0.015, 0.0), vec3(0.018, 0.02, 0.055));
  float pistil = sdCapsule(p, vec3(0.0), vec3(0.03, 0.66, 0.0), 0.01);
  pistil = min(pistil, length(p - vec3(0.03, 0.67, 0.0)) - 0.028);
  fil = min(fil, pistil);
  if (fil < res.x) res = vec4(fil, 2.0, 0.0, 0.0);
  if (ant < res.x) res = vec4(ant, 3.0, 0.0, 0.0);
  return res;
}

vec3 calcNormal(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  const float h = 0.0015;
  return normalize(k.xyy * map(p + k.xyy * h).x + k.yyx * map(p + k.yyx * h).x +
                   k.yxy * map(p + k.yxy * h).x + k.xxx * map(p + k.xxx * h).x);
}

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0, sca = 1.0;
  for (int i = 0; i < 4; i++) {
    float h = 0.02 + 0.09 * float(i);
    occ += (h - map(p + h * n).x) * sca;
    sca *= 0.75;
  }
  return clamp(1.0 - 2.2 * occ, 0.0, 1.0);
}

void main() {
  vec2 frag = vUv * uRes;
  vec2 uv = (frag - 0.5 * uRes) / uRes.y;

  // orbit camera
  float k = smoothstep(0.3, 1.2, uPitch);                 // frame the head as the camera rises
  float dist = mix(4.1, 5.0, k);
  vec3 target = vec3(0.0, mix(0.3, 0.12, k), 0.0);
  vec3 ro = target + dist * vec3(cos(uPitch) * sin(uYaw), sin(uPitch), cos(uPitch) * cos(uYaw));
  vec3 ww = normalize(target - ro);
  vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
  vec3 vv = cross(uu, ww);
  vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.9 * ww);

  // background: deep, faintly lit
  vec3 col = vec3(0.012, 0.014, 0.011) + 0.03 * vec3(0.8, 0.9, 0.6) * (1.0 - length(uv));

  float t = 0.5;
  vec4 hit = vec4(-1.0);
  for (int i = 0; i < 110; i++) {
    if (i >= uSteps) break;
    vec4 h = map(ro + rd * t);
    if (h.x < 0.0012 * t) { hit = vec4(t, h.yzw); break; }
    t += h.x * 0.75;
    if (t > 7.5) break;
  }

  if (hit.x > 0.0) {
    vec3 p = ro + rd * hit.x;
    vec3 n = calcNormal(p);
    float ao = calcAO(p, n);
    vec3 l1 = normalize(vec3(0.6, 0.9, 0.5));
    vec3 l2 = normalize(vec3(-0.7, 0.3, -0.6));
    float dif = clamp(dot(n, l1), 0.0, 1.0);
    float back = clamp(dot(-n, l1), 0.0, 1.0);           // light through thin petals
    float rim = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 3.0);
    float spec = pow(clamp(dot(reflect(rd, n), l1), 0.0, 1.0), 24.0);

    vec3 alb;
    if (hit.y < 1.5) {
      // ivory tepal, green throat, freckles near the base
      alb = mix(vec3(0.62, 0.72, 0.32), vec3(0.93, 0.91, 0.84), smoothstep(0.05, 0.4, hit.z));
      float fr = step(0.86, hash21(floor(vec2(hit.z * 60.0, hit.w * 18.0))));
      alb = mix(alb, vec3(0.45, 0.12, 0.1), fr * smoothstep(0.55, 0.2, hit.z) * smoothstep(0.08, 0.2, hit.z) * 0.8);
      alb *= 0.9 + 0.1 * smoothstep(0.0, 0.25, abs(hit.w));          // midrib
    } else if (hit.y < 2.5) {
      alb = vec3(0.78, 0.8, 0.62);
    } else if (hit.y < 3.5) {
      alb = vec3(0.62, 0.24, 0.08);
    } else {
      alb = vec3(0.22, 0.34, 0.12);
    }
    vec3 lin = vec3(0.0);
    lin += 1.35 * dif * vec3(1.0, 0.95, 0.85);
    lin += 0.55 * back * vec3(0.95, 0.9, 0.6) * (hit.y < 1.5 ? 1.0 : 0.2);
    lin += 0.25 * clamp(dot(n, l2), 0.0, 1.0) * vec3(0.55, 0.7, 1.0);
    lin += 0.12 * vec3(0.7, 0.8, 0.6);
    col = alb * lin * (0.35 + 0.65 * ao);
    col += spec * 0.25 * vec3(1.0, 0.98, 0.9);
    col += rim * vec3(0.84, 0.94, 0.42) * 0.35;                    // lime pearl rim
  }

  col = pow(col, vec3(0.4545));
  col += (hash21(frag + fract(uTime)) - 0.5) * 0.015;
  gl_FragColor = vec4(col, 1.0);
}`

const ASCII_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uScene;
uniform sampler2D uAtlas;
uniform vec2 uRes;
uniform float uGlyphs;
uniform float uCell;
uniform vec2 uPointer;
uniform float uGlowR;
uniform vec2 uLensC;
uniform float uLensR;
uniform float uRing;
uniform float uRingAmp;
uniform float uTime;
uniform float uFlicker;
uniform vec3 uInk;
uniform vec3 uAccent;
varying vec2 vUv;

float hash21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 cs = vec2(uCell * 0.62, uCell);
  vec2 cell = floor(frag / cs);
  vec2 center = (cell + 0.5) * cs;
  vec2 local = fract(frag / cs);

  vec3 sc = texture2D(uScene, center / uRes).rgb;
  float lum = dot(sc, vec3(0.299, 0.587, 0.114));
  lum = smoothstep(0.05, 0.95, lum);

  float dp = length(center - uPointer);
  float glow = uGlowR > 0.0 ? smoothstep(uGlowR * 2.2, uGlowR * 0.6, dp) : 0.0;
  float ring = exp(-pow((dp - uRing) / (uCell * 4.0), 2.0)) * uRingAmp;

  float tick = floor(uTime * 14.0);
  float h = hash21(cell + tick * 0.37);
  float scramble = step(1.0 - clamp(ring * 0.95 + uFlicker * lum * 0.08, 0.0, 1.0), h);

  float idx = floor(clamp(lum + glow * 0.1, 0.0, 1.0) * (uGlyphs - 1.0) + 0.5);
  float rnd = 1.0 + floor(hash21(cell * 1.7 + tick) * (uGlyphs - 1.0));
  idx = mix(idx, rnd, scramble);

  vec2 auv = vec2((idx + local.x) / uGlyphs, local.y);
  float g = texture2D(uAtlas, auv).r;
  float heat = clamp(glow * 0.75 + ring * 1.2 + scramble * 0.6, 0.0, 1.0);
  vec3 tint = mix(uInk, uAccent, heat);
  tint = mix(tint, sc * 1.25, 0.18);                       // keep a trace of the real colour
  vec3 col = tint * g * (0.28 + lum * 0.95 + glow * 0.25);

  // decoder lens: the true render, with chromatic aberration near the rim
  vec2 lv = frag - uLensC;
  float ld = length(lv);
  if (uLensR > 0.5) {
    float inside = 1.0 - smoothstep(uLensR - 1.5, uLensR + 1.5, ld);
    vec2 dir = lv / max(ld, 1e-3);
    float edge = smoothstep(uLensR * 0.55, uLensR, ld);
    vec2 uv = frag / uRes;
    vec2 off = dir * edge * 6.0 / uRes;
    vec3 real = vec3(texture2D(uScene, uv - off).r, texture2D(uScene, uv).g, texture2D(uScene, uv + off).b);
    col = mix(col, real, inside);
    float rim = smoothstep(1.6, 0.0, abs(ld - uLensR));
    col += uAccent * rim * 0.7;
  }

  // CRT whisper: faint scanlines + vignette
  col *= 0.94 + 0.06 * sin(frag.y * 1.6);
  vec2 q = frag / uRes - 0.5;
  col *= 1.0 - dot(q, q) * 0.9;
  gl_FragColor = vec4(col, 1.0);
}`

export type EngineStats = { fps: number; scale: number; cell: number }

export class TransmissionEngine {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private quad: THREE.Mesh
  private sceneRT: THREE.WebGLRenderTarget
  private sceneMat: THREE.ShaderMaterial
  private asciiMat: THREE.ShaderMaterial
  private atlas: THREE.CanvasTexture | null = null
  private raf = 0
  private running = false
  private start = performance.now()
  private last = performance.now()
  private frameTimes: number[] = []
  private dpr = 1
  private w = 1
  private h = 1
  private scale = 0.6 // raymarch resolution relative to CSS pixels
  private maxScale = 0.75
  private staticMode = false
  private dirty = true
  private font: string

  // inputs (CSS px unless noted), smoothed internally
  state = {
    bloom: 0.3,
    yaw: 0.6,
    pitch: 0.28,
    cell: 16, // CSS px
    lensR: 0, // target lens radius (CSS px)
    decode: 0, // 0..1 lens grows to fill the screen
  }
  private pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, r: 0 }
  private ring = { r: 0, amp: 0 }
  private pulse = 0
  private autoYaw = 0
  stats: EngineStats = { fps: 60, scale: 0.6, cell: 16 }

  constructor(private canvas: HTMLCanvasElement, opts: { font: string }) {
    this.font = opts.font
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' })
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.sceneRT = new THREE.WebGLRenderTarget(2, 2, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
    })
    this.sceneMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: SCENE_FRAG,
      uniforms: {
        uRes: { value: new THREE.Vector2(2, 2) },
        uTime: { value: 0 },
        uBloom: { value: 0.3 },
        uYaw: { value: 0 },
        uPitch: { value: 0.3 },
        uPulse: { value: 0 },
        uSteps: { value: 96 },
      },
      depthTest: false,
      depthWrite: false,
    })
    this.asciiMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: ASCII_FRAG,
      uniforms: {
        uScene: { value: this.sceneRT.texture },
        uAtlas: { value: null },
        uRes: { value: new THREE.Vector2(2, 2) },
        uGlyphs: { value: 1 },
        uCell: { value: 16 },
        uPointer: { value: new THREE.Vector2(-9999, -9999) },
        uGlowR: { value: 0 },
        uLensC: { value: new THREE.Vector2() },
        uLensR: { value: 0 },
        uRing: { value: 0 },
        uRingAmp: { value: 0 },
        uTime: { value: 0 },
        uFlicker: { value: 1 },
        uInk: { value: new THREE.Vector3(0.91, 0.9, 0.84) },
        uAccent: { value: new THREE.Vector3(0.84, 0.94, 0.42) },
      },
      depthTest: false,
      depthWrite: false,
    })
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.asciiMat)
    this.scene.add(this.quad)
    this.setGlyphs('ascii')
  }

  /** Build the glyph atlas: one row of cells, white glyphs on black. */
  setGlyphs(set: GlyphSet) {
    const chars = [...GLYPH_SETS[set]]
    const cw = 40
    const ch = 64
    const c = document.createElement('canvas')
    c.width = cw * chars.length
    c.height = ch
    const g = c.getContext('2d')!
    g.fillStyle = '#000'
    g.fillRect(0, 0, c.width, c.height)
    g.fillStyle = '#fff'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.font = `500 50px ${this.font}`
    chars.forEach((chr, i) => g.fillText(chr, i * cw + cw / 2, ch / 2 + 2))
    this.atlas?.dispose()
    this.atlas = new THREE.CanvasTexture(c)
    this.atlas.minFilter = THREE.LinearFilter
    this.atlas.magFilter = THREE.LinearFilter
    this.atlas.generateMipmaps = false
    this.asciiMat.uniforms.uAtlas.value = this.atlas
    this.asciiMat.uniforms.uGlyphs.value = chars.length
    this.dirty = true
  }

  resize(w: number, h: number) {
    this.w = Math.max(1, w)
    this.h = Math.max(1, h)
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.maxScale = w < 700 ? 0.55 : 0.75
    this.scale = Math.min(this.scale, this.maxScale)
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.w, this.h, false)
    this.asciiMat.uniforms.uRes.value.set(this.w * this.dpr, this.h * this.dpr)
    this.sizeSceneTarget()
    this.dirty = true
  }

  private sizeSceneTarget() {
    const sw = Math.max(2, Math.round(this.w * this.scale))
    const sh = Math.max(2, Math.round(this.h * this.scale))
    this.sceneRT.setSize(sw, sh)
    this.sceneMat.uniforms.uRes.value.set(sw, sh)
  }

  setStatic(v: boolean) {
    this.staticMode = v
    this.asciiMat.uniforms.uFlicker.value = v ? 0 : 1
    this.dirty = true
  }

  setState(s: Partial<TransmissionEngine['state']>) {
    Object.assign(this.state, s)
    this.dirty = true
  }

  setPointer(x: number, y: number, active: boolean) {
    this.pointer.x = x
    this.pointer.y = y
    if (this.pointer.sx < -999) {
      this.pointer.sx = x
      this.pointer.sy = y
    }
    this.state.lensR = active ? (this.w < 700 ? 88 : 128) : 0
    this.dirty = true
  }

  /** Drag-to-turn: yaw offset in radians. */
  nudgeYaw(dx: number) {
    this.state.yaw += dx
    this.dirty = true
  }

  pulseAt(x: number, y: number) {
    this.pointer.x = x
    this.pointer.y = y
    this.ring.r = 0
    this.ring.amp = 1
    this.pulse = 1
    this.dirty = true
  }

  private frame(now: number) {
    const dt = Math.min(0.05, (now - this.last) / 1000)
    this.last = now
    const t = (now - this.start) / 1000

    // adaptive resolution: watch the last 40 frames
    this.frameTimes.push(dt)
    if (this.frameTimes.length > 40) {
      const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
      this.frameTimes.length = 0
      this.stats.fps = Math.round(1 / Math.max(avg, 1e-3))
      if (!this.staticMode) {
        if (avg > 0.021 && this.scale > 0.34) {
          this.scale = Math.max(0.34, this.scale - 0.08)
          this.sizeSceneTarget()
        } else if (avg < 0.0135 && this.scale < this.maxScale) {
          this.scale = Math.min(this.maxScale, this.scale + 0.04)
          this.sizeSceneTarget()
        }
      }
      this.stats.scale = this.scale
    }

    const ease = this.staticMode ? 1 : 1 - Math.pow(0.001, dt) // frame-rate independent smoothing
    const p = this.pointer
    p.sx += (p.x - p.sx) * ease
    p.sy += (p.y - p.sy) * ease
    p.r += (this.state.lensR - p.r) * (this.staticMode ? 1 : 1 - Math.pow(0.02, dt))
    if (!this.staticMode) this.autoYaw += dt * 0.12
    this.ring.r += dt * Math.max(this.w, this.h) * 0.55
    this.ring.amp *= Math.pow(0.3, dt)
    this.pulse *= Math.pow(0.12, dt)

    const s = this.sceneMat.uniforms
    s.uTime.value = this.staticMode ? 0 : t
    s.uBloom.value = this.state.bloom
    s.uYaw.value = this.state.yaw + this.autoYaw
    s.uPitch.value = this.state.pitch
    s.uPulse.value = this.pulse
    s.uSteps.value = this.scale < 0.45 ? 70 : 96

    const d = this.dpr
    const decode = this.state.decode
    const diag = Math.hypot(this.w, this.h)
    const cx = p.sx < -999 ? this.w / 2 : p.sx
    const cy = p.sy < -999 ? this.h / 2 : p.sy
    const lensX = cx + (this.w / 2 - cx) * decode
    const lensY = cy + (this.h / 2 - cy) * decode
    const lensR = p.r + (diag * 0.6 - p.r) * decode

    const a = this.asciiMat.uniforms
    a.uTime.value = this.staticMode ? 0 : t
    a.uCell.value = this.state.cell * d
    a.uPointer.value.set(p.sx * d, (this.h - p.sy) * d)
    a.uGlowR.value = p.r * d
    a.uLensC.value.set(lensX * d, (this.h - lensY) * d)
    a.uLensR.value = lensR * d
    a.uRing.value = this.ring.r * d
    a.uRingAmp.value = this.ring.amp
    this.stats.cell = this.state.cell

    this.quad.material = this.sceneMat
    this.renderer.setRenderTarget(this.sceneRT)
    this.renderer.render(this.scene, this.camera)
    this.quad.material = this.asciiMat
    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scene, this.camera)
    this.dirty = false
  }

  private loop = (now: number) => {
    if (!this.running) return
    const settling = Math.abs(this.pointer.r - this.state.lensR) > 0.5 || this.ring.amp > 0.01
    if (!this.staticMode || this.dirty || settling) this.frame(now)
    else this.last = now
    this.raf = requestAnimationFrame(this.loop)
  }

  play() {
    if (this.running) return
    this.running = true
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.loop)
  }

  pause() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  dispose() {
    this.pause()
    this.sceneRT.dispose()
    this.sceneMat.dispose()
    this.asciiMat.dispose()
    this.atlas?.dispose()
    this.quad.geometry.dispose()
    this.renderer.dispose()
  }
}
```

### `src/transmission.css`

```css
/* Transmission — a lily rendered as live text */
:root {
  --tx-bg: #0a0b09;
  --tx-ink: #e9e6d8;
  --tx-soft: rgba(233, 230, 216, 0.55);
  --tx-dim: rgba(233, 230, 216, 0.32);
  --tx-lime: #d6f06b;
  --tx-rule: rgba(233, 230, 216, 0.14);
  --tx-serif: 'Instrument Serif', 'Times New Roman', serif;
  --tx-sans: 'Inter Variable', 'Inter', system-ui, sans-serif;
  --tx-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: var(--tx-bg); color: var(--tx-ink); }
body { font-family: var(--tx-sans); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

.tx-track { position: relative; height: 420vh; }
.tx-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  overflow: clip; /* focus can never scroll the pinned stage */
  background: var(--tx-bg);
  touch-action: pan-y; /* vertical swipes scroll; taps and sideways drags interact */
  cursor: crosshair;
  user-select: none;
  -webkit-user-select: none;
}

.tx-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; opacity: 0; transition: opacity 1.4s ease; }
[data-status='ready'] .tx-canvas { opacity: 1; }

.tx-top, .tx-log, .tx-head, .tx-aside, .tx-hint, .tx-dock, .tx-final, .tx-loader { position: absolute; z-index: 2; }

.tx-top {
  top: 0;
  left: clamp(16px, 2.4vw, 32px);
  right: clamp(16px, 2.4vw, 32px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: clamp(14px, 1.8vw, 22px) 0 12px;
  border-bottom: 1px solid var(--tx-rule);
  font: 500 10.5px/1 var(--tx-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  pointer-events: none;
}
.tx-top__c em { font-family: var(--tx-serif); font-size: 15px; letter-spacing: 0.02em; text-transform: none; color: var(--tx-lime); }
.tx-top__r { justify-self: end; display: inline-flex; align-items: center; gap: 8px; color: var(--tx-soft); }
.tx-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--tx-lime); box-shadow: 0 0 10px var(--tx-lime); animation: tx-blink 1.6s steps(2) infinite; }
@keyframes tx-blink { 50% { opacity: 0.25; } }

.tx-log {
  left: clamp(16px, 2.4vw, 32px);
  top: 76px;
  margin: 0;
  font: 500 10px/1.7 var(--tx-mono);
  letter-spacing: 0.04em;
  color: var(--tx-dim);
  white-space: pre;
  pointer-events: none;
  mask-image: linear-gradient(to bottom, transparent, #000 40%);
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 40%);
}

.tx-head {
  left: clamp(16px, 2.4vw, 32px);
  bottom: clamp(24px, 4vw, 56px);
  margin: 0;
  font-family: var(--tx-serif);
  font-weight: 400;
  font-size: clamp(52px, 8.6vw, 156px);
  line-height: 0.88;
  letter-spacing: -0.035em;
  pointer-events: none;
  text-shadow: 0 0 40px rgba(10, 11, 9, 0.8);
}
.tx-head .ln { display: block; overflow: hidden; padding-bottom: 0.07em; }
.tx-head .li { display: inline-block; }
.tx-head em { color: var(--tx-lime); }

.tx-aside {
  right: clamp(16px, 2.4vw, 32px);
  bottom: clamp(88px, 9vw, 120px);
  width: min(290px, 40vw);
  pointer-events: none;
}
.tx-aside__in { margin: 0; font-size: 13px; line-height: 1.5; color: var(--tx-soft); }

.tx-hint { left: 50%; top: 50%; transform: translate(-50%, 0); margin-top: min(34vh, 320px); pointer-events: none; }
.tx-hint__in { display: block; font: 500 10px/1 var(--tx-mono); letter-spacing: 0.18em; text-transform: uppercase; color: var(--tx-soft); animation: tx-bob 2.4s ease-in-out infinite; }
@keyframes tx-bob { 50% { transform: translateY(5px); opacity: 0.5; } }

.tx-dock {
  right: clamp(16px, 2.4vw, 32px);
  bottom: clamp(24px, 4vw, 56px);
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--tx-rule);
  border-radius: 999px;
  background: rgba(10, 11, 9, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.tx-dock button {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--tx-soft);
  font: 500 10.5px/1 var(--tx-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 10px 13px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease;
}
.tx-dock button:hover { color: var(--tx-ink); }
.tx-dock button.is-active { background: var(--tx-lime); color: #10120c; }
.tx-dock button:focus-visible { outline: 1px solid var(--tx-lime); outline-offset: 2px; }

.tx-final {
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(22px, 4vw, 64px);
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(8, 9, 7, 0.75), transparent 50%);
}
.tx-final__kicker { margin: 0 0 14px; font: 500 10.5px/1 var(--tx-mono); letter-spacing: 0.18em; text-transform: uppercase; color: var(--tx-lime); }
.tx-final__title { margin: 0; font-family: var(--tx-serif); font-weight: 400; font-size: clamp(72px, 15vw, 260px); line-height: 0.82; letter-spacing: -0.045em; }
.tx-final__body { margin: 18px 0 22px; font-size: 14px; color: var(--tx-soft); }
.tx-final__btn {
  align-self: flex-start;
  appearance: none;
  border: 1px solid rgba(233, 230, 216, 0.4);
  background: transparent;
  color: var(--tx-ink);
  font: 500 11px/1 var(--tx-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 13px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
}
.tx-final__btn:hover { background: var(--tx-lime); border-color: var(--tx-lime); color: #10120c; }
.tx-final__btn:focus-visible { outline: 1px solid var(--tx-lime); outline-offset: 3px; }

.tx-loader {
  inset: 0;
  display: grid;
  place-items: center;
  font: 500 10.5px/1 var(--tx-mono);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--tx-soft);
}

@media (max-width: 700px) {
  .tx-top { grid-template-columns: 1fr auto; }
  .tx-top__c { display: none; }
  .tx-log { top: 64px; font-size: 9px; }
  .tx-log { max-height: 30vh; overflow: hidden; }
  .tx-head { bottom: 128px; font-size: clamp(46px, 14vw, 76px); }
  .tx-aside { left: 16px; right: 16px; width: auto; bottom: 72px; }
  .tx-aside__in { font-size: 12px; }
  .tx-dock { left: 16px; right: auto; bottom: 20px; }
  .tx-dock button { padding: 9px 11px; }
  .tx-hint { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .tx-dot, .tx-hint__in { animation: none; }
  .tx-canvas { transition: none; }
}
.tx-dock[hidden] { display: none; }
```

## Assets

Transmission has no image assets. Do not download or generate any. The lily is the signed-distance field in `src/TransmissionEngine.ts`. The glyph atlas is a canvas built at runtime from the three strings in `GLYPH_SETS`. Nothing is fetched.

## Build / run

```
npm create vite@latest transmission -- --template react-ts
cd transmission
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 three@^0.178.0 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @types/three@^0.178.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Drop in the five files from **Full source code**, then:

```
npm run dev
```

`src/main.tsx` mounts `<TransmissionHero />` inside `<StrictMode>` as the only child of `#root`. The hero is the whole page, so the dev URL works on its own or inside an iframe.

## Limitations

- The signal needs WebGL. If the context cannot be created, or it is lost, the canvas stays hidden, the dock stays hidden, and the aside says the signal is off air. The headline and the finale copy still scroll.
- The glyph set, the turn, and the pulse are local to that visit. Nothing is stored.
- No APIs, keys, or accounts are needed.
