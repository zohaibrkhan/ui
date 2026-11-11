<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Florilegium

Florilegium is a full-page hero: a horizontal strip of ten portrait photographs, one stem each, arranged as a single day from 05:40 to 21:15. Scroll moves a fisheye along the strip — the focused plate is largest, its neighbours fall off — and a large serif clock interpolates the time between plates. Past the last plate the dark allium eases out to fill the viewport and a cream headline reads “Every stem keeps an hour.” Click a plate, or use the arrow keys, to bring it to centre.

Rebuild it as the only thing on the page. Create the files in **Full source code** at the paths in their headings, with those contents exactly. The photographs are not in those files; download them as described in **Assets** and save them at the project root as `assets/stem-01.webp` through `assets/stem-10.webp`. Keep the imports in `src/plates.ts` unchanged: each one is `../assets/stem-XX.webp`, which resolves to that root `assets/` folder. `src/assets/` is the wrong place and will fail the build.

## Stack & dependencies

React 19, TypeScript, and Vite. The intro is `gsap`. Scroll position comes from `ScrollTrigger`, and the per-frame layout is written from the GSAP ticker rather than from a scrubbed tween. Smooth scrolling is `lenis`, only when the visitor has not asked for reduced motion. This section does not use `three`.

Fonts, imported in `src/main.tsx`:

- `@fontsource/instrument-serif` at 400 and 400 italic — the wordmark, plate titles, the clock, the side sentence, the finale headline
- `@fontsource-variable/inter` — the finale body
- `@fontsource/ibm-plex-mono` at 500 — the archive line, plate numbers, the hint, the loader, the finale kicker and button

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Background `#eceae4` (`--fl-bg`). Ink `#24221e` (`--fl-ink`). Soft ink `rgba(36, 34, 30, 0.55)` (`--fl-ink-soft`). Rules `rgba(36, 34, 30, 0.18)` (`--fl-rule`). Finale cream `#f3efe4` (`--fl-cream`). The clock colour is `rgba(36, 34, 30, 0.72)`. The finale scrim is `linear-gradient(to top, rgba(10, 12, 10, 0.55), transparent 55%)`. The finale button hover fills cream and sets the label to `#161816`.

Type:

- `--fl-serif`: `'Instrument Serif', 'Times New Roman', serif`
- `--fl-sans`: `'Inter Variable', 'Inter', system-ui, sans-serif`
- `--fl-mono`: `'IBM Plex Mono', ui-monospace, monospace`

`html` and `body` have no margin. Document title: `Florilegium — Oversight Supply`. Theme colour: `#eceae4`.

The track height is inline: `` `${N * 42 + 170}vh` `` with `N = 10`, so `590vh`. The stage is sticky: `top: 0; height: 100vh; height: 100svh; overflow: hidden; overflow: clip; background: #eceae4`. The section’s accessible name is `Florilegium — one day, ten stems`.

**Paint order.**

1. `.fl-strip`, `z-index: 1`, `inset: 0`. The ten plate buttons live here. They are `position: absolute; left: 0; top: 0` and get their box from JavaScript every frame.
2. `.fl-chrome`, `z-index: 2`, `inset: 0`, `pointer-events: none`, so clicks pass through to the plates. It holds the header, the caption, the clock, the intro sentence, and the scroll hint.
3. `.fl-final`, `z-index: 3`, `inset: 0`, opacity 0 and `pointer-events: none` until the end of the scroll. Flex column, `justify-content: flex-end`, padding `clamp(22px, 4vw, 64px)`, colour cream.
4. `.fl-loader`, `z-index: 5`, `inset: 0`, only while plates are still settling. It covers the stage with the page background.

**Header.** A three-column grid, `1fr auto 1fr`, on a bottom rule. Mono 500, 10.5px, uppercase, letter-spacing `0.14em`, padding `clamp(14px, 1.8vw, 22px) 0 12px`, side inset `clamp(16px, 2.4vw, 32px)`.

- Left: `(Archive)` then italic Instrument Serif `Vol. 01` at 14px, letter-spacing `0.02em`, `text-transform: none`, margin-left 6px.
- Centre: `Florilegium`. Serif, `clamp(22px, 2vw, 30px)`, letter-spacing `-0.01em`, not uppercased.
- Right, `justify-self: end`: `Ten stems · One day` (middle dot `·`).

**Caption** (`aria-live="polite"`). Centred under the strip: `top: calc(45% + min(24vh, 310px) + 18px)`. Three lines, gap 6px.

- `Plate {nn} / 10` — `active + 1` padded to 2 digits. Mono 500, 10px, uppercase, letter-spacing `0.16em`, soft ink.
- The plate title. Italic Instrument Serif, `clamp(18px, 1.5vw, 24px)`, line-height 1.1. A new title remounts (`key={active}`) and plays `fl-roll` for 0.7s, `cubic-bezier(0.2, 0.8, 0.2, 1)`: from opacity 0, `translateY(60%)`, blur 4px.
- The plate note, same mono style as the number.

**Clock** (`aria-hidden="true"`). Centred, `bottom: clamp(44px, 7vh, 90px)`. Instrument Serif, `clamp(56px, 7.6vw, 132px)`, line-height 0.9, letter-spacing `-0.03em`, tabular nums, nowrap. Three pieces in a row, gap `clamp(14px, 1.6vw, 28px)`: the interpolated time (min-width `3.9ch`, right-aligned, starts as `05:40`), a rule `clamp(60px, 11vw, 190px)` wide whose inner `<i>` scales from the left with `scaleX(f / 9)`, and the closing time `21:15`.

**Intro sentence.** Absolute, `left: clamp(16px, 4vw, 64px)`, `top: 45%`, `translate3d(0, -50%, 0)`, `max-width: min(300px, 24vw)`. Serif, `clamp(18px, 1.6vw, 26px)`, line-height 1.15, soft ink. The span is full ink and italic: `A florilegium is a gathering of flowers.` The rest, roman, soft: `This one keeps a single day — ten stems, photographed from first light to after dark.` It is not part of the GSAP intro. The first 5% of scroll fades it and shifts it 40px left.

**Hint.** Centred, `bottom: clamp(18px, 3vh, 34px)`. Mono 500, 10px, uppercase, letter-spacing `0.16em`, soft ink: `Scroll to explore · ← → to step`. The arrows are `←` and `→`.

**Plates.** Each is a `<button>` with `border-radius: 2px` (the last plate’s radius eases toward 0 as it goes fullscreen), `overflow: hidden`, no border, background set to its tint. `aria-label` is `Plate {n}: {title}, {time}`. The active plate has `aria-current="true"` and class `is-active`. Inside, `.fl-card__clip` holds either an `<img>` or, after an error, a fallback.

Images: `alt=""`, `decoding="async"`, `loading="eager"`, `draggable={false}`, `object-fit: cover`. They start at opacity 0 and fade in over 0.8s once `is-loaded` is set. Filter is `grayscale(0.25) contrast(0.98)` until the pointer hovers that card or the card is `.is-active`, when the filter clears. Plate 10 also sets `object-position: 50% 68%`. `:focus-visible` on a card is a 1px ink outline, offset 6px.

The error fallback replaces the image with centred mono 500, 10px, line-height 1.6, uppercase, letter-spacing `0.14em`, soft ink, on the tint:

```
Plate {n}
{time}
```

Tint, time, title, and note, in plate order. Plate 7’s file is `stem-10.webp` and plate 10’s file is `stem-07.webp`. That swap is explained in **Assets**. Do not reorder these strings.

| Plate | Time | Title | Note | Tint | Focus |
| --- | --- | --- | --- | --- | --- |
| 1 | `05:40` | `Anemone, first light` | `Window, east` | `#e3e2de` | |
| 2 | `07:05` | `Jasmine before breakfast` | `Kitchen table` | `#4a3f33` | |
| 3 | `08:30` | `Cosmos in the stairwell` | `Landing` | `#dcdad6` | |
| 4 | `10:15` | `Peony, half asleep` | `Study` | `#2a2725` | |
| 5 | `11:50` | `Poppy, in grey` | `Hallway` | `#e8e8e6` | |
| 6 | `13:10` | `Lily at noon` | `Garden room` | `#d9d7d1` | |
| 7 | `14:45` | `A stem in glass` | `Bathroom sill` | `#e6e6e4` | |
| 8 | `16:20` | `Anemone, again` | `Window, west` | `#d5d4d1` | |
| 9 | `18:05` | `Everlasting` | `Mantelpiece` | `#d9cfc4` | |
| 10 | `21:15` | `Allium after dark` | `Bedside` | `#161816` | `50% 68%` |

**Finale.** Kicker, mono 500, 10.5px, uppercase, letter-spacing `0.16em`, opacity 0.75, margin-bottom 18px: `Plate 10 · 21:15 · Bedside`.

Headline, Instrument Serif, weight 400, `clamp(56px, 10vw, 180px)`, line-height `0.86`, letter-spacing `-0.035em`:

```
Every stem
keeps an hour.
```

`keeps an hour.` is an `<em>` (italic). Body, max-width 420px, 14px, line-height 1.5, opacity 0.8, margin `22px 0`: `Florilegium, Vol. 01 — ten photographs of flowers, taken across a single day, from first light to after dark.`

Button: `Back to first light` and a span `↑` (`aria-hidden`). Mono 500, 11px, uppercase, letter-spacing `0.14em`, padding `13px 18px`, radius 999px, border `1px solid rgba(243, 239, 228, 0.45)`, transparent fill, cream text. Hover: background `#f3efe4`, text `#161816`. `:focus-visible` outline is 1px cream, offset 3px.

**Loader** (`role="status"`). Centred mono 500, 10.5px, uppercase, letter-spacing `0.16em`, soft ink: `Developing plates {nn} / 10`, where `{nn}` is how many plates have either loaded or failed, padded to 2 digits. It unmounts when that count reaches 10, or after 6000ms, whichever comes first. `data-ready` is set on `<main>` at that moment. No CSS rule reads `data-ready`.

## Interactions & animation timeline

`STRIP_END` is `0.84`. Let `p` be ScrollTrigger progress from 0 to 1 across the `590vh` track (`start: 'top top'`, `end: 'bottom bottom'`). The gallery index is

```
f = clamp(p / 0.84, 0, 1) * 9
```

So the ten plates are traversed entirely while `p` goes from 0 to 0.84. At `p >= 0.84`, `f` stays at 9. Plate `i` is the focus when `f = i`, which is `p = (i / 9) * 0.84`. The active index stored in React, and therefore the caption, is `Math.round(f)`.

`smooth(a, b, v)` is a smoothstep: `t = clamp((v - a) / (b - a))`, then `t * t * (3 - 2 * t)`.

**While motion is allowed:**

- Expansion `e = smooth(0.86, 0.995, p)`. From 0.84 to 0.86 you are already on plate 10 and the card has not started growing. By 0.995 it is fullscreen.
- Chrome fade uses the same `e`. Header, caption, clock, and hint share `.fl-chrome`, so they fade together. The intro sentence has its own fade, below.
- Intro sentence: `t = smooth(0, 0.05, p)`. Opacity `1 - t`. Transform `translate3d(-40t px, -50%, 0)`.
- Finale: `t = smooth(0.93, 1, p)`. Opacity is `t`. Transform `translate3d(0, (1 - t) * 30px, 0)`. `pointer-events` becomes `auto` when `t > 0.5`.

**Card geometry, every frame.** `mobile` means the stage’s `clientWidth < 700`.

```
H0 = min(vh * (mobile ? 0.5 : 0.48), (vw * (mobile ? 0.66 : 0.34)) / 0.75, 620)
gap = max(12, vw * 0.018)
centerY = vh * (mobile ? 0.44 : 0.45)
```

For each plate `i`, with `d = i - f`:

```
s = 0.42 + 0.58 * exp(-(d * d) / 0.7)
height = H0 * s
width = height * 0.75
```

Widths are packed left to right with `gap` between them. The focus point is the lerp of the two surrounding centres, and the whole strip is shifted so that point sits at `vw / 2`.

Lenis velocity (pixels per frame) drives skew: target `clamp(velocity * 0.12, -6, 6)` degrees, eased toward with factor `0.1`, then multiplied by `(1 - e)`. Reduced motion forces skew to 0.

The last plate, while `e > 0`, lerps its centre to the viewport centre, its size to `vw` × `vh`, and its radius from 2px to 0. Every other plate’s opacity becomes `clamp(1 - e * 1.6)` (gone once `e` passes 0.625) and its x is pushed outward by `e * vw * 0.2`, left plates left, right plates right.

Each image:

```
translateX = clamp(-(i - f) * 7, -10, 10) * (1 - e)   // percent
scale = lerp(1.22, 1, i === 9 ? e : 0)
```

Neighbours stay at scale 1.22. Plate 10 eases from 1.22 to 1 as it fills the screen. Combined with `object-fit: cover`, that is the parallax inside the card.

The clock shows minutes lerped between the two surrounding plate times, then rounded to `HH:MM`. The rule’s `scaleX` is `f / 9`.

**Reduced motion** forces `e` to 0, so the last plate never grows and the others never slide away. Chrome opacity and the finale’s opacity use `fade = smooth(0.86, 0.95, p)` instead. The finale’s vertical offset still follows `smooth(0.93, 1, p)`. Pointer events turn on when `fade > 0.5`. Skew stays 0. The caption’s roll animation and the image opacity/filter transitions are `none`. The GSAP intro below does not run.

**Intro**, only once `ready` is true and motion is allowed. Default ease `expo.out`, inside `gsap.context` on the stage:

- `.fl-card__clip` from `clipPath: 'inset(100% 0% 0% 0%)'`, duration `1.6`, stagger `0.06` from `'center'`.
- At `0.3`: `.fl-top > *` from `{ opacity: 0, y: -10 }`, duration `1`, stagger `0.08`.
- At `0.4`: `.fl-time > *` from `{ yPercent: 100, opacity: 0 }`, duration `1.4`, stagger `0.08`.
- At `0.8`: `.fl-caption, .fl-sub` from `{ opacity: 0 }`, duration `1`.

**Click.** `goTo(i)` scrolls to progress `(clamp(i, 0, 9) / 9) * 0.84`.

**Arrow keys.** While the ScrollTrigger `isActive` (the track is covering the viewport) and the event target is not inside an `input` or `textarea`: `ArrowRight` goes to `active + 1`, `ArrowLeft` to `active - 1`, both `preventDefault`. The index is clamped.

**Back to first light** scrolls to progress `0`.

**Lenis**, only if motion is allowed: `{ lerp: 0.08 }`. Scroll events call `ScrollTrigger.update`. The ticker runs `lenis.raf(time * 1000)` and `gsap.ticker.lagSmoothing(0)`. Programmatic scrolls last `1.4` seconds. Without Lenis, `window.scrollTo` uses `behavior: 'auto'` when reduced motion is on and `'smooth'` otherwise.

The layout frame is on `gsap.ticker` for as long as the section is mounted. It is not paused when the section is off-screen.

## Responsive behaviour

**Desktop, wider than 900px.** The intro sentence is visible at the left of the strip. Header shows all three cells, including `Ten stems · One day`. Cards use the desktop `H0` (48% of height, or 34% of width divided by 0.75, capped at 620). Vertical centre of the strip is `0.45 * vh`. Caption sits at `calc(45% + min(24vh, 310px) + 18px)`. Clock can reach 132px. Finale headline can reach 180px.

**Around 820px.** The `max-width: 900px` rule applies, so `.fl-intro` is `display: none`. The stage is still wider than 700, so card sizes, header columns, caption position, and the clock stay on the desktop rules. `Ten stems · One day` is still shown.

**700px and under** (CSS query and the JS `vw < 700` test, same threshold).

- Header becomes `grid-template-columns: 1fr auto`. `.fl-top__r` (`Ten stems · One day`) is `display: none`.
- Caption `top: calc(44% + 25vh + 14px)`.
- Clock `clamp(44px, 14vw, 70px)`, `bottom: 48px`. The rule is 40px wide.
- Finale headline `clamp(52px, 15vw, 90px)`.
- Cards: `H0` uses `0.5 * vh` and `0.66 * vw / 0.75`, still capped at 620. Strip centre is `0.44 * vh`.

## Accessibility & robustness

- **`prefers-reduced-motion`.** Read on first render and on `change`. No Lenis. No clip-path intro. No velocity skew. The fullscreen expansion amount `e` stays 0, so the last photograph stays a card; the finale copy still fades in across progress 0.86–0.95. Plate-title animation and image transitions are disabled. Scrolls from clicks and arrow keys jump with `behavior: 'auto'` when Lenis is absent.
- **WebGL / canvas.** This section has neither. There is nothing to fall back from except images.
- **Images.** Every plate is `loading="eager"`. Until `onLoad`, the image stays at opacity 0 and the plate’s tint shows through. `onError` removes the image and renders `Plate {n}` plus the time on that tint. A plate that loaded and a plate that failed both count toward dismissing the loader. The 6 second timer dismisses the loader even if some requests are still in flight; those images can still fade in afterwards.
- **Off-screen.** The frame loop is not paused. The section is the whole page, and the ticker keeps writing positions.
- **`overflow: clip`** is set on `.fl-stage` after `overflow: hidden`, so the sticky stage clips and focus cannot scroll it.
- **StrictMode.** The intro timeline is created inside `gsap.context` and `ctx.revert()` runs on cleanup, so a development remount does not leave the first timeline driving the DOM. The scroll effect creates its `ScrollTrigger` locally and calls `st.kill()` on cleanup. There is no shared tween-target ref in this section; positions are imperative writes on each tick.

## Performance notes

- Layout is one ticker callback: ten style writes for the cards, plus the clock, the rule, chrome opacity, the intro sentence, and the finale. No scroll listener of its own; Lenis forwards into `ScrollTrigger.update`, and the ticker reads `st.progress`.
- Images are decoded asynchronously and start invisible, so a late decode does not flash an unstyled bitmap. They are eager because all ten are on screen in the strip.
- The velocity skew reads `lenis.velocity` and damps it (`lerp` factor 0.1, clamp ±6 degrees) instead of skewing by raw wheel delta.
- Card measurements use the stage’s `clientWidth` / `clientHeight` via a `ResizeObserver`, not `window` size, so the fisheye matches the sticky stage.

## Full source code

Create these files exactly. Do not reformat, rename, or restyle them. `index.html` replaces the Vite template’s `index.html`. Add the `src` files beside it. Also add the ten WebP files from **Assets** at the project root, `assets/stem-01.webp` through `assets/stem-10.webp`, as a sibling of `src/` — not inside it. `src/plates.ts` imports `../assets/stem-XX.webp`, including the plate-7 / plate-10 swap, so `src/assets/` does not match those imports and the build will fail. The template files `App.tsx`, `App.css`, `index.css`, and `vite.svg` are unused; delete them. Keep the template’s `vite.config.ts` and `tsconfig` files. Vite turns a `.webp` import into a URL with the default asset handling. No extra config.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#eceae4" />
    <title>Florilegium — Oversight Supply</title>
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
import './florilegium.css'
import FlorilegiumHero from './FlorilegiumHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FlorilegiumHero />
  </StrictMode>,
)
```

### `src/FlorilegiumHero.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { PLATES, fmt, toMinutes } from './plates'

gsap.registerPlugin(ScrollTrigger)

const N = PLATES.length
const STRIP_END = 0.84 // share of the scroll used by the gallery; the rest expands the last plate
const MINUTES = PLATES.map((p) => toMinutes(p.time))

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
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

export default function FlorilegiumHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([])
  const imgsRef = useRef<(HTMLImageElement | null)[]>([])
  const timeRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLElement>(null)
  const chromeRef = useRef<HTMLDivElement>(null)
  const finalRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const reduced = usePrefersReducedMotion()

  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<boolean[]>(() => PLATES.map(() => false))
  const [failed, setFailed] = useState<boolean[]>(() => PLATES.map(() => false))
  const loadedCount = loaded.filter(Boolean).length + failed.filter(Boolean).length
  const [ready, setReady] = useState(false)

  // Reveal once every plate settled (loaded or failed) – or after 6s, whichever first.
  useEffect(() => {
    if (loadedCount >= N) setReady(true)
  }, [loadedCount])
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 6000)
    return () => clearTimeout(t)
  }, [])

  /* ------------------------------------------------------ smooth scroll */
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.08 })
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

  /* ------------------------------------------- per-frame fisheye layout */
  useLayoutEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return

    const st = ScrollTrigger.create({ trigger: track, start: 'top top', end: 'bottom bottom' })
    stRef.current = st

    let vw = stage.clientWidth
    let vh = stage.clientHeight
    const ro = new ResizeObserver(() => {
      vw = stage.clientWidth
      vh = stage.clientHeight
    })
    ro.observe(stage)

    let skew = 0
    let lastActive = -1
    const X = new Array<number>(N).fill(0)
    const W = new Array<number>(N).fill(0)
    const H = new Array<number>(N).fill(0)

    const frame = () => {
      const p = st.progress
      const f = clamp(p / STRIP_END) * (N - 1)
      const e = reduced ? 0 : smooth(STRIP_END + 0.02, 0.995, p)
      const fade = reduced ? smooth(STRIP_END + 0.02, 0.95, p) : e
      const mobile = vw < 700
      const H0 = Math.min(vh * (mobile ? 0.5 : 0.48), (vw * (mobile ? 0.66 : 0.34)) / 0.75, 620)
      const gap = Math.max(12, vw * 0.018)
      const centerY = vh * (mobile ? 0.44 : 0.45)

      // sizes: gaussian falloff around the focused (continuous) index
      let acc = 0
      for (let i = 0; i < N; i++) {
        const d = i - f
        const s = 0.42 + 0.58 * Math.exp(-(d * d) / 0.7)
        H[i] = H0 * s
        W[i] = H[i] * 0.75
        X[i] = acc + W[i] / 2
        acc += W[i] + gap
      }
      const i0 = Math.floor(f)
      const i1 = Math.min(N - 1, i0 + 1)
      const focusX = lerp(X[i0], X[i1], f - i0)
      const offset = vw / 2 - focusX

      // velocity skew (Lenis velocity is px/frame)
      const v = lenisRef.current?.velocity ?? 0
      skew = lerp(skew, reduced ? 0 : clamp(v * 0.12, -6, 6), 0.1)

      for (let i = 0; i < N; i++) {
        const el = cardsRef.current[i]
        if (!el) continue
        let x = X[i] + offset
        let y = centerY
        let w = W[i]
        let h = H[i]
        let op = 1
        if (i === N - 1 && e > 0) {
          x = lerp(x, vw / 2, e)
          y = lerp(y, vh / 2, e)
          w = lerp(w, vw, e)
          h = lerp(h, vh, e)
        } else if (e > 0) {
          op = 1 - e * 1.6
          x += (x < vw / 2 ? -1 : 1) * e * vw * 0.2
        }
        el.style.width = `${w}px`
        el.style.height = `${h}px`
        el.style.opacity = `${clamp(op)}`
        el.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, 0) skewX(${(skew * (1 - e)).toFixed(2)}deg)`
        el.style.borderRadius = i === N - 1 ? `${lerp(2, 0, e)}px` : '2px'
        const img = imgsRef.current[i]
        if (img) img.style.transform = `translate3d(${clamp(-(i - f) * 7, -10, 10) * (1 - e)}%, 0, 0) scale(${lerp(1.22, 1, i === N - 1 ? e : 0)})`
      }

      // clock: interpolate minutes between plates
      const m = lerp(MINUTES[i0], MINUTES[i1], f - i0)
      if (timeRef.current) timeRef.current.textContent = fmt(m)
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${f / (N - 1)})`
      if (chromeRef.current) chromeRef.current.style.opacity = `${1 - fade}`
      if (introRef.current) {
        const t = smooth(0, 0.05, p)
        introRef.current.style.opacity = `${1 - t}`
        introRef.current.style.transform = `translate3d(${-t * 40}px, -50%, 0)`
      }
      if (finalRef.current) {
        const t = smooth(0.93, 1, p)
        finalRef.current.style.opacity = `${reduced ? fade : t}`
        finalRef.current.style.transform = `translate3d(0, ${(1 - t) * 30}px, 0)`
        finalRef.current.style.pointerEvents = (reduced ? fade : t) > 0.5 ? 'auto' : 'none'
      }

      const idx = Math.round(f)
      if (idx !== lastActive) {
        lastActive = idx
        setActive(idx)
      }
    }

    gsap.ticker.add(frame)
    frame()
    return () => {
      gsap.ticker.remove(frame)
      ro.disconnect()
      st.kill()
      stRef.current = null
    }
  }, [reduced])

  /* ------------------------------------------------------------- intro */
  useLayoutEffect(() => {
    if (!ready || reduced) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.fl-card__clip', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, stagger: { each: 0.06, from: 'center' } })
        .from('.fl-top > *', { opacity: 0, y: -10, duration: 1, stagger: 0.08 }, 0.3)
        .from('.fl-time > *', { yPercent: 100, opacity: 0, duration: 1.4, stagger: 0.08 }, 0.4)
        .from('.fl-caption, .fl-sub', { opacity: 0, duration: 1 }, 0.8)
    }, stageRef)
    return () => ctx.revert()
  }, [ready, reduced])

  /* ------------------------------------------------------------ actions */
  const scrollToProgress = (p: number) => {
    const st = stRef.current
    if (!st) return
    const y = st.start + p * (st.end - st.start)
    if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: 1.4 })
    else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' })
  }
  const goTo = (i: number) => scrollToProgress((clamp(i, 0, N - 1) / (N - 1)) * STRIP_END)

  // arrow keys step through plates while the section is on screen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const st = stRef.current
      if (!st || !st.isActive) return
      if ((e.target as HTMLElement).closest('input, textarea')) return
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const plate = PLATES[active]

  return (
    <main className="fl-root" data-ready={ready}>
      <section ref={trackRef} className="fl-track" style={{ height: `${N * 42 + 170}vh` }} aria-label="Florilegium — one day, ten stems">
        <div ref={stageRef} className="fl-stage">
          <div ref={chromeRef} className="fl-chrome">
            <header className="fl-top">
              <span className="fl-top__l">(Archive) <em>Vol. 01</em></span>
              <span className="fl-logo">Florilegium</span>
              <span className="fl-top__r">Ten stems · One day</span>
            </header>

            <div className="fl-caption" aria-live="polite">
              <span className="fl-caption__no">Plate {String(active + 1).padStart(2, '0')} / {N}</span>
              <span key={active} className="fl-caption__title">{plate.title}</span>
              <span className="fl-caption__note">{plate.note}</span>
            </div>

            <div className="fl-time" aria-hidden="true">
              <span className="fl-time__now" ref={timeRef}>{PLATES[0].time}</span>
              <span className="fl-time__line"><i ref={fillRef} /></span>
              <span className="fl-time__end">{PLATES[N - 1].time}</span>
            </div>
            <p ref={introRef} className="fl-intro">
              <span>A florilegium is a gathering of flowers.</span> This one keeps a single day — ten stems, photographed from first light to after dark.
            </p>
            <p className="fl-sub">Scroll to explore · ← → to step</p>
          </div>

          <div className="fl-strip">
            {PLATES.map((p, i) => (
              <button
                key={i}
                type="button"
                ref={(el) => { cardsRef.current[i] = el }}
                className={`fl-card${i === active ? ' is-active' : ''}`}
                style={{ background: p.tint }}
                aria-label={`Plate ${i + 1}: ${p.title}, ${p.time}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => goTo(i)}
              >
                <span className="fl-card__clip">
                  {!failed[i] ? (
                    <img
                      ref={(el) => { imgsRef.current[i] = el }}
                      src={p.src}
                      alt=""
                      decoding="async"
                      loading="eager"
                      draggable={false}
                      style={p.focus ? { objectPosition: p.focus } : undefined}
                      className={loaded[i] ? 'is-loaded' : ''}
                      onLoad={() => setLoaded((l) => l.map((v, j) => (j === i ? true : v)))}
                      onError={() => setFailed((l) => l.map((v, j) => (j === i ? true : v)))}
                    />
                  ) : (
                    <span className="fl-card__fallback">Plate {i + 1}<br />{p.time}</span>
                  )}
                </span>
              </button>
            ))}
          </div>

          <div ref={finalRef} className="fl-final">
            <p className="fl-final__kicker">Plate 10 · 21:15 · Bedside</p>
            <h1 className="fl-final__title">Every stem<br /><em>keeps an hour.</em></h1>
            <p className="fl-final__body">Florilegium, Vol. 01 — ten photographs of flowers, taken across a single day, from first light to after dark.</p>
            <button type="button" className="fl-final__btn" onClick={() => scrollToProgress(0)}>
              Back to first light <span aria-hidden="true">↑</span>
            </button>
          </div>

          {!ready && (
            <div className="fl-loader" role="status">
              Developing plates {String(loadedCount).padStart(2, '0')} / {N}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
```

### `src/plates.ts`

```ts
import stem01 from '../assets/stem-01.webp'
import stem02 from '../assets/stem-02.webp'
import stem03 from '../assets/stem-03.webp'
import stem04 from '../assets/stem-04.webp'
import stem05 from '../assets/stem-05.webp'
import stem06 from '../assets/stem-06.webp'
import stem07 from '../assets/stem-10.webp'
import stem08 from '../assets/stem-08.webp'
import stem09 from '../assets/stem-09.webp'
import stem10 from '../assets/stem-07.webp'

export type Plate = {
  src: string
  time: string // HH:MM the photograph "was taken"
  title: string
  note: string
  tint: string // placeholder colour while the image loads
  focus?: string // object-position when the plate is expanded full screen
}

// Photographs: Lummi (lummi.ai) — free licence. Resized to 1200×1600 WebP.
export const PLATES: Plate[] = [
  { src: stem01, time: '05:40', title: 'Anemone, first light', note: 'Window, east', tint: '#e3e2de' },
  { src: stem02, time: '07:05', title: 'Jasmine before breakfast', note: 'Kitchen table', tint: '#4a3f33' },
  { src: stem03, time: '08:30', title: 'Cosmos in the stairwell', note: 'Landing', tint: '#dcdad6' },
  { src: stem04, time: '10:15', title: 'Peony, half asleep', note: 'Study', tint: '#2a2725' },
  { src: stem05, time: '11:50', title: 'Poppy, in grey', note: 'Hallway', tint: '#e8e8e6' },
  { src: stem06, time: '13:10', title: 'Lily at noon', note: 'Garden room', tint: '#d9d7d1' },
  { src: stem07, time: '14:45', title: 'A stem in glass', note: 'Bathroom sill', tint: '#e6e6e4' },
  { src: stem08, time: '16:20', title: 'Anemone, again', note: 'Window, west', tint: '#d5d4d1' },
  { src: stem09, time: '18:05', title: 'Everlasting', note: 'Mantelpiece', tint: '#d9cfc4' },
  { src: stem10, time: '21:15', title: 'Allium after dark', note: 'Bedside', tint: '#161816', focus: '50% 68%' },
]

export const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
export const fmt = (mins: number) => {
  const m = Math.round(mins)
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}
```

### `src/florilegium.css`

```css
/* Florilegium — fisheye gallery hero */
:root {
  --fl-bg: #eceae4;
  --fl-ink: #24221e;
  --fl-ink-soft: rgba(36, 34, 30, 0.55);
  --fl-rule: rgba(36, 34, 30, 0.18);
  --fl-cream: #f3efe4;
  --fl-serif: 'Instrument Serif', 'Times New Roman', serif;
  --fl-sans: 'Inter Variable', 'Inter', system-ui, sans-serif;
  --fl-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: var(--fl-bg); color: var(--fl-ink); }
body { font-family: var(--fl-sans); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

.fl-track { position: relative; }
.fl-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  overflow: clip; /* like hidden, but focus can never scroll the pinned stage */
  background: var(--fl-bg);
}

/* ------------------------------------------------------------- chrome */
.fl-chrome { position: absolute; inset: 0; z-index: 2; pointer-events: none; }

.fl-top {
  position: absolute;
  top: 0;
  left: clamp(16px, 2.4vw, 32px);
  right: clamp(16px, 2.4vw, 32px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: clamp(14px, 1.8vw, 22px) 0 12px;
  border-bottom: 1px solid var(--fl-rule);
  font: 500 10.5px/1 var(--fl-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.fl-top__l em { font-family: var(--fl-serif); font-size: 14px; letter-spacing: 0.02em; text-transform: none; margin-left: 6px; }
.fl-top__r { justify-self: end; }
.fl-logo {
  font-family: var(--fl-serif);
  font-size: clamp(22px, 2vw, 30px);
  letter-spacing: -0.01em;
  text-transform: none;
}

.fl-caption {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(45% + min(24vh, 310px) + 18px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
}
.fl-caption__no, .fl-caption__note {
  font: 500 10px/1 var(--fl-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fl-ink-soft);
}
.fl-caption__title {
  font-family: var(--fl-serif);
  font-style: italic;
  font-size: clamp(18px, 1.5vw, 24px);
  line-height: 1.1;
  animation: fl-roll 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@keyframes fl-roll { from { opacity: 0; transform: translateY(60%); filter: blur(4px); } }

.fl-time {
  position: absolute;
  left: 50%;
  bottom: clamp(44px, 7vh, 90px);
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: clamp(14px, 1.6vw, 28px);
  font-family: var(--fl-serif);
  font-size: clamp(56px, 7.6vw, 132px);
  line-height: 0.9;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  color: rgba(36, 34, 30, 0.72);
  white-space: nowrap;
  overflow: hidden;
  padding-bottom: 0.05em;
}
.fl-time > * { display: inline-block; }
.fl-time__now { min-width: 3.9ch; text-align: right; }
.fl-time__line {
  position: relative;
  width: clamp(60px, 11vw, 190px);
  height: 1px;
  background: var(--fl-rule);
  overflow: hidden;
}
.fl-time__line i {
  position: absolute;
  inset: 0;
  background: var(--fl-ink);
  transform-origin: left;
  transform: scaleX(0);
}
.fl-sub {
  position: absolute;
  left: 0;
  right: 0;
  bottom: clamp(18px, 3vh, 34px);
  margin: 0;
  text-align: center;
  font: 500 10px/1 var(--fl-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fl-ink-soft);
}

/* -------------------------------------------------------------- strip */
.fl-strip { position: absolute; inset: 0; z-index: 1; }
.fl-card {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  border: 0;
  cursor: pointer;
  overflow: hidden;
  will-change: transform, width, height;
  transform-origin: 50% 50%;
  appearance: none;
}
.fl-card:focus-visible { outline: 1px solid var(--fl-ink); outline-offset: 6px; }
.fl-card__clip { position: absolute; inset: 0; overflow: hidden; clip-path: inset(0% 0% 0% 0%); }
.fl-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease, filter 0.6s ease;
  filter: grayscale(0.25) contrast(0.98);
  user-select: none;
}
.fl-card img.is-loaded { opacity: 1; }
.fl-card:hover img, .fl-card.is-active img { filter: none; }
.fl-card__fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  text-align: center;
  font: 500 10px/1.6 var(--fl-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fl-ink-soft);
}

/* ------------------------------------------------------------- finale */
.fl-final {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(22px, 4vw, 64px);
  color: var(--fl-cream);
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(10, 12, 10, 0.55), transparent 55%);
}
.fl-final__kicker {
  margin: 0 0 18px;
  font: 500 10.5px/1 var(--fl-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.75;
}
.fl-final__title {
  margin: 0;
  font-family: var(--fl-serif);
  font-weight: 400;
  font-size: clamp(56px, 10vw, 180px);
  line-height: 0.86;
  letter-spacing: -0.035em;
}
.fl-final__body {
  max-width: 420px;
  margin: 22px 0;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.8;
}
.fl-final__btn {
  align-self: flex-start;
  appearance: none;
  border: 1px solid rgba(243, 239, 228, 0.45);
  background: transparent;
  color: var(--fl-cream);
  font: 500 11px/1 var(--fl-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 13px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
}
.fl-final__btn:hover { background: var(--fl-cream); color: #161816; }
.fl-final__btn:focus-visible { outline: 1px solid var(--fl-cream); outline-offset: 3px; }

.fl-loader {
  position: absolute;
  z-index: 5;
  inset: 0;
  display: grid;
  place-items: center;
  background: var(--fl-bg);
  font: 500 10.5px/1 var(--fl-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fl-ink-soft);
}

/* --------------------------------------------------------- responsive */
@media (max-width: 700px) {
  .fl-top { grid-template-columns: 1fr auto; }
  .fl-top__r { display: none; }
  .fl-caption { top: calc(44% + 25vh + 14px); }
  .fl-time { font-size: clamp(44px, 14vw, 70px); bottom: 48px; }
  .fl-time__line { width: 40px; }
  .fl-final__title { font-size: clamp(52px, 15vw, 90px); }
}

@media (prefers-reduced-motion: reduce) {
  .fl-caption__title { animation: none; }
  .fl-card img { transition: none; }
}

.fl-intro {
  position: absolute;
  left: clamp(16px, 4vw, 64px);
  top: 45%;
  transform: translate3d(0, -50%, 0);
  max-width: min(300px, 24vw);
  margin: 0;
  font-family: var(--fl-serif);
  font-size: clamp(18px, 1.6vw, 26px);
  line-height: 1.15;
  color: var(--fl-ink-soft);
}
.fl-intro span { color: var(--fl-ink); font-style: italic; }
@media (max-width: 900px) { .fl-intro { display: none; } }
```

## Assets

Download these ten photographs from Lummi. They are free-licence images. The public URL for each is `https://assets.lummi.ai/assets/<ID>?w=1400`.

They were turned into 1200×1600 WebP with `sharp`: `fit: 'cover'`, `position: 'attention'`, `quality: 78`. Save that result at the project root, in `assets/` next to `src/`, using the file name in the table. `src/plates.ts` imports `../assets/stem-XX.webp`. Do not save the files under `src/assets/`. A one-file version of that crop:

```
sharp(input).resize(1200, 1600, { fit: 'cover', position: 'attention' }).webp({ quality: 78 })
```

Any similar 3:4, neutral, single-stem photograph also works in a slot. Plate 10 has to be a dark image, because the finale type is cream `#f3efe4`.

**Keep the swap.** `src/plates.ts` imports `stem-10.webp` under the name `stem07` (plate 7, “A stem in glass”) and imports `stem-07.webp` under the name `stem10` (plate 10, “Allium after dark”). The dark allium is the full-screen finale on purpose. Do not point plate 10 at the glass vase, and do not edit those two import lines to “match” the numbers.

| Save as | Lummi ID | What it is | Which plate uses it |
| --- | --- | --- | --- |
| `assets/stem-01.webp` | `QmWGvq648hsQwSCNk86CCaJfGU65LzUaU2p5hgUNR9oW5b` | stem | Plate 1, via `import stem01` |
| `assets/stem-02.webp` | `QmagMQBuEru6nT9uFMkgDv4UNL1HZ1VeFrMEzQa5e2wgxy` | stem | Plate 2, via `import stem02` |
| `assets/stem-03.webp` | `QmRc478jPAsB2Wj7h8JBSY71DFFX9wuPmQu4tSGSV2KneT` | stem | Plate 3, via `import stem03` |
| `assets/stem-04.webp` | `QmdBi3NT56r6JPn36T2tkfAbDafEXhm2TJqp4ibxLaF2YU` | stem | Plate 4, via `import stem04` |
| `assets/stem-05.webp` | `QmVJHqSi3aVj3dcdFmmyKNPfjbyEvVTpFZYtf4eBrYczUp` | stem | Plate 5, via `import stem05` |
| `assets/stem-06.webp` | `QmPSQXrbFrud47kqPDFFBCe7yRXi5GqXcQuLyn1weXyXhs` | stem | Plate 6, via `import stem06` |
| `assets/stem-07.webp` | `QmQNeH6o88u5oHr6JH4Ueg92yZu7ePZ59jtcibUroP1Vw7` | dark allium | Plate 10, via `import stem10 from '../assets/stem-07.webp'` |
| `assets/stem-08.webp` | `QmSYGauQNbEUAkeTbfJ3irPnBH19DZKEAHu2Pu76S24Q6i` | stem | Plate 8, via `import stem08` |
| `assets/stem-09.webp` | `Qmbqi4jjBoKdEXu1AzLustxvYs2J774FBshAXGrzfNjLZe` | stem | Plate 9, via `import stem09` |
| `assets/stem-10.webp` | `QmY59zfWHa3qNuPekCk2zN9Uhau8PPPDDo15uDS2xc5WfT` | glass vase | Plate 7, via `import stem07 from '../assets/stem-10.webp'` |

Full URLs:

- Save as `assets/stem-01.webp`: `https://assets.lummi.ai/assets/QmWGvq648hsQwSCNk86CCaJfGU65LzUaU2p5hgUNR9oW5b?w=1400`
- Save as `assets/stem-02.webp`: `https://assets.lummi.ai/assets/QmagMQBuEru6nT9uFMkgDv4UNL1HZ1VeFrMEzQa5e2wgxy?w=1400`
- Save as `assets/stem-03.webp`: `https://assets.lummi.ai/assets/QmRc478jPAsB2Wj7h8JBSY71DFFX9wuPmQu4tSGSV2KneT?w=1400`
- Save as `assets/stem-04.webp`: `https://assets.lummi.ai/assets/QmdBi3NT56r6JPn36T2tkfAbDafEXhm2TJqp4ibxLaF2YU?w=1400`
- Save as `assets/stem-05.webp`: `https://assets.lummi.ai/assets/QmVJHqSi3aVj3dcdFmmyKNPfjbyEvVTpFZYtf4eBrYczUp?w=1400`
- Save as `assets/stem-06.webp`: `https://assets.lummi.ai/assets/QmPSQXrbFrud47kqPDFFBCe7yRXi5GqXcQuLyn1weXyXhs?w=1400`
- Save as `assets/stem-07.webp` (dark allium, used as plate 10): `https://assets.lummi.ai/assets/QmQNeH6o88u5oHr6JH4Ueg92yZu7ePZ59jtcibUroP1Vw7?w=1400`
- Save as `assets/stem-08.webp`: `https://assets.lummi.ai/assets/QmSYGauQNbEUAkeTbfJ3irPnBH19DZKEAHu2Pu76S24Q6i?w=1400`
- Save as `assets/stem-09.webp`: `https://assets.lummi.ai/assets/Qmbqi4jjBoKdEXu1AzLustxvYs2J774FBshAXGrzfNjLZe?w=1400`
- Save as `assets/stem-10.webp` (glass vase, used as plate 7): `https://assets.lummi.ai/assets/QmY59zfWHa3qNuPekCk2zN9Uhau8PPPDDo15uDS2xc5WfT?w=1400`

## Build / run

```
npm create vite@latest florilegium -- --template react-ts
cd florilegium
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files, and put the ten WebP files in project-root `assets/` (sibling of `src/`), then:

```
npm run dev
```

`src/main.tsx` mounts `<FlorilegiumHero />` inside `<StrictMode>` as the only child of `#root`. The hero is the whole page, so the dev URL works on its own or inside an iframe.

## Limitations

- The photographs are files you add at the project root under `assets/`. `src/plates.ts` imports `../assets/...`, so `src/assets/` does not resolve and the build fails. The page does not fetch the Lummi URLs at runtime.
- If a file is missing or fails to decode, that plate shows its tint and the `Plate {n}` / time label. The rest of the strip still runs.
- Plate 10 is the dark allium (`stem-07.webp`). A light image in that slot will sit under cream type.
- No APIs, keys, or accounts are needed.


## Image assets
IMPORTANT: Do NOT hotlink these URLs in the final site. Download every image below into
the project's own assets folder (e.g. /public/images/<section-name>/) and reference the
local copies. These links are only for fetching the files and may stop working.

- stem-01.webp: plate, Anemone first light. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/florilegium/stem-01.webp
- stem-02.webp: plate, Jasmine before breakfast. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/florilegium/stem-02.webp
- stem-03.webp: plate, Cosmos in the stairwell. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/florilegium/stem-03.webp
- stem-04.webp: plate, Peony half asleep. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/florilegium/stem-04.webp
- stem-05.webp: plate, Poppy in grey. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/florilegium/stem-05.webp
- stem-06.webp: plate, Lily at noon. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/florilegium/stem-06.webp
- stem-07.webp: plate, Allium after dark. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/florilegium/stem-07.webp
- stem-08.webp: plate, Anemone again. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/florilegium/stem-08.webp
- stem-09.webp: plate, Everlasting. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/florilegium/stem-09.webp
- stem-10.webp: plate, a stem in glass. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/florilegium/stem-10.webp
