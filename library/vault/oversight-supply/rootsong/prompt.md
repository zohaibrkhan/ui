<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Rootsong

Rootsong is a full-page hero on a dark field. Hundreds of short memories, each one a word drawn on a canvas, grow into a flower: a stem, a drooping side bud, two blades, six petals, and a centre. Scroll opens the bloom, lifts the words off like pollen, then gathers them into the lowercase word `remember`. A form at the lower left plants a memory of your own into a petal. That word is drawn in lime, and it is kept in `localStorage` for this browser only. The backdrop is blurred colour blobs. Grain is a tiny noise tile generated in the page, not a file.

Rebuild it as the only thing on the page. Create the files in **Full source code** at the paths in their headings, with those contents exactly.

## Stack & dependencies

React 19, TypeScript, and Vite. The intro and the scroll story are `gsap` with `ScrollTrigger`. Smooth scrolling is `lenis`, only when the visitor has not asked for reduced motion. The flower is Canvas 2D (`WordFlower`). This section does not use `three`.

Fonts, imported in `src/main.tsx`:

- `@fontsource/instrument-serif` at 400 and 400 italic — the corner letters, the headline, the memory count, the outro, the input, and every word on the canvas (the canvas font string is `"Instrument Serif", "Times New Roman", serif`)
- `@fontsource-variable/inter` — the page’s default sans
- `@fontsource/ibm-plex-mono` at 500 — the kicker, the count label, the hint, the form label, the Plant button

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Background `#1c2116` (`--rs-bg`). Cream `#efe9c4` (`--rs-cream`). Soft cream `rgba(239, 233, 196, 0.62)` (`--rs-cream-soft`). Lime `#d6f06b` (`--rs-lime`). Placeholder text `rgba(239, 233, 196, 0.38)`. The form underline is `rgba(239, 233, 196, 0.4)` and turns full cream while the row is focused. A vignette, `.rs-stage::after`, is `radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(8, 12, 8, 0.55))`.

The four backdrop blobs, all `filter: blur(80px)`, `border-radius: 50%`:

- `--a`: `60vmax` × `50vmax`, left `-18%`, top `-14%`, `#0e1612`, opacity 0.9, drift 26s
- `--b`: `46vmax` × `58vmax`, left `30%`, top `10%`, `#8d8b58`, opacity 0.8, drift 32s
- `--c`: `44vmax` × `40vmax`, right `-16%`, bottom `-10%`, `#c9b777`, opacity 0.75, drift 28s
- `--d`: `38vmax` × `46vmax`, left `-12%`, bottom `-18%`, `#31402e`, drift 36s, alternate-reverse

Type:

- `--rs-serif`: `'Instrument Serif', 'Times New Roman', serif`
- `--rs-sans`: `'Inter Variable', 'Inter', system-ui, sans-serif`
- `--rs-mono`: `'IBM Plex Mono', ui-monospace, monospace`

`html` and `body` have no margin. Body colour is cream. Document title: `Rootsong — Oversight Supply`. Theme colour: `#1c2116`.

The track is `380vh`. The stage is sticky: `top: 0; height: 100vh; height: 100svh; overflow: hidden; overflow: clip; touch-action: pan-y; background: #1c2116; isolation: isolate`. The section’s accessible name is `Rootsong — a flower grown from words`.

**Paint order.**

1. `.rs-bg`, `z-index: 0`, `inset: -10%`, `contain: strict`. The four blobs.
2. `<canvas class="rs-canvas">`, `z-index: 1`, `inset: 0`, `aria-hidden="true"`. Opacity 0 until `data-status="ready"`, then opacity 1 over 1.2s. `will-change: transform` so the flower is its own layer, apart from the blobs.
3. `.rs-grain`, `z-index: 2`, `inset: -10%`, `pointer-events: none`, opacity 0.9. Its image is the generated tile in `--rs-grain`. A `steps(6)` animation over 0.9s jumps the tile around (0, then -4%/+3%, +3%/-5%, -6%/-2%, +5%/+4%, -2%/+6%).
4. The vignette, also `z-index: 2`, `pointer-events: none`.
5. Corner letters, kicker, headline, count, outro, hint, form, and the error line. All `position: absolute; z-index: 3`.

**Corners**, serif, `clamp(24px, 2.4vw, 36px)`, `pointer-events: none`, `aria-hidden="true"`. Inset `clamp(16px, 2.4vw, 32px)` from the vertical edges and `clamp(18px, 2.6vw, 36px)` from the sides. They spell ROOT:

- top-left `R`
- top-right `O`
- bottom-left `O`
- bottom-right `T`

**Kicker.** Centred, `top: clamp(22px, 2.8vw, 40px)`. A row, gap 12px, nowrap. Mono 500, 10.5px, uppercase, letter-spacing `0.16em`, soft cream. Text: `Rootsong`, a 28×1px rule, `An anthology of small things — Vol. 01`.

**Headline.** Left `clamp(18px, 6vw, 110px)`, `top: 50%`, `translateY(-40%)`, `pointer-events: none`. Instrument Serif, weight 400, `clamp(44px, 6.4vw, 118px)`, line-height 0.92, letter-spacing `-0.03em`. Three masked lines (each line is `overflow: hidden`):

```
Grown from
the words
we keep.
```

`we keep.` is an `<em>`, italic, colour `#d6f06b`.

**Count** (`aria-live="polite"`). Right `clamp(18px, 6vw, 110px)`, `top: 50%`, `translateY(-50%)`, right-aligned, `pointer-events: none`. The number is serif, `clamp(34px, 3.2vw, 52px)`, cream, letter-spacing 0: `count` padded to 4 digits, so it reads `0000` until the flower exists. Under it, mono 500, 10.5px, uppercase, letter-spacing `0.16em`, soft cream: `memories in bloom`. The number includes every particle, the built flower and anything planted.

**Outro.** `top: 68%`, centred, padding `0 24px`, opacity 0, `pointer-events: none`. `aria-hidden="false"`. First line, serif, `clamp(20px, 2vw, 30px)`: `Every word here is a small memory someone kept.` Second line, margin-top 10px, mono 500, 10.5px, line-height 1.4, uppercase, letter-spacing `0.16em`, soft cream: `Scroll back up to watch them bloom again.`

**Hint** (`aria-hidden="true"`). Bottom centre, `bottom: clamp(22px, 3vw, 38px)`. Mono 500, 10.5px, uppercase, letter-spacing `0.16em`, soft cream: `Scroll to bloom`. The label bobs 5px and fades to opacity 0.55 on a 2.4s ease-in-out loop.

**Form.** Left `clamp(62px, 6vw, 110px)`, bottom `clamp(20px, 3vw, 38px)`, width `min(340px, calc(100vw - 124px))`. It is not rendered if canvas setup failed.

Label, `htmlFor="rs-memory"`, mono 500, 10.5px, line-height 1.3, uppercase, letter-spacing `0.16em`, soft cream, ellipsis if it overflows. Default text: `Plant a memory`. For 3200ms after a successful plant, the label is `Planted: ` plus an `<em>` of curly quotes around the text: `“{planted}”`. The em is lime `#d6f06b`, `font-style: normal`, letter-spacing `0.04em`, `text-transform: none`.

The row is a bottom border only. The input is transparent, no border, cream, Instrument Serif 20px, padding `8px 0 10px`, `maxLength={40}`, `autoComplete="off"`, placeholder `e.g. rain on the window` (italic, the soft placeholder colour). It is disabled until status is `ready`. The submit button reads `Plant` plus a span `↵` (`aria-hidden`). Its accessible name is `Plant memory`. Mono 500, 10.5px, uppercase, letter-spacing `0.14em`. Hover, when enabled, turns the label lime. Disabled opacity is 0.35. `:focus-visible` is a 1px cream outline, offset 2px. The button is disabled when the trimmed draft is empty or status is not `ready`.

**Error**, only when status is `failed`. Centred at `top: 60%`, max-width 420px, serif 20px: `This browser can’t draw the word flower. The story still reads top to bottom.` The apostrophe is the right single quotation mark `’`.

**Words on the flower.** Colour `rgb(239, 233, 196)` for the built phrases, `rgb(214, 240, 107)` for anything the visitor planted. The built list, in order, is the `MEMORIES` array:

`Sunday mornings`, `baking bread`, `pillow forts`, `rain on tin`, `her hands`, `first snow`, `bike rides`, `kitchen radio`, `late trains`, `lemon cake`, `old letters`, `summer dust`, `fireflies`, `hide & seek`, `warm socks`, `sea glass`, `the porch light`, `humming`, `birthday candles`, `wet grass`, `cassette tapes`, `long walks`, `cherry pits`, `grandma`, `quiet evenings`, `paper boats`, `sticky jam`, `lullabies`, `cold milk`, `open windows`, `library cards`, `thunder`, `first kiss`, `road trips`, `burnt toast`, `moss`, `daisies`, `sleepovers`, `the garden`, `mud pies`, `fresh sheets`, `photographs`, `slow dances`, `tea steam`, `kites`, `hugs`, `laughter`, `cooking`, `home`, `blankets`, `songs`, `stars`, `acts of care`, `building forts`, `childhood`, `milestones`, `together`, `recipes`, `family`.

Stems and blades use a single word taken from those phrases. Petals and the centre mix full phrases and single words. The exact assignment is `build()` in `src/WordFlower.ts`. The morph target, sampled from an offscreen canvas, is the word `remember` in Instrument Serif.

**Grain tile.** `makeGrain()` builds a 160×160 canvas. Each pixel is either 0 or 255 in RGB (about half the pixels each) with alpha `Math.random() * 22`, then `toDataURL('image/png')` becomes the CSS variable. If that throws, the variable is `none`. There is no `mix-blend-mode`. The tile is regenerated once per mount, not every frame; the CSS animation only translates it.

## Interactions & animation timeline

`smooth(a, b, v)` is a smoothstep.

The flower state passed in from scroll, for progress `p`:

- `bloom = 0.5 + 0.5 * smooth(0.02, 0.42, p)` — 0.5 at the start, 1 once `p >= 0.42`
- `scatter = smooth(0.4, 0.6, p)` — 0 before 0.4, 1 after 0.6
- `morph = smooth(0.56, 0.92, p)` — 0 before 0.56, 1 after 0.92

`apply(0)` runs at setup, so the first painted state is bloom 0.5, scatter 0, morph 0. Inside the flower, bloom 0 holds petals nearly shut and bloom 1 spreads the six petals. Scatter adds a drifting offset and a lift, and it is multiplied by `(1 - morph)` so the word can form again. Morph lerps each particle from its flower point to a point inside the raster of `remember`, staggered by `mDelay = (pointX / width) * 0.45` and eased. User-planted words shrink less during the morph (`1 - morph * 0.25`) than the built words (`1 - morph * 0.5`).

**Intro**, only when motion is allowed. Timeline delay `0.2`, default ease `expo.out`:

- `.rs-corner` from `{ opacity: 0, scale: 0.6 }`, duration `1.6`, stagger `0.12`.
- At `0.3`: `.rs-head .li` from `{ yPercent: 110 }`, duration `1.6`, stagger `0.1`. The line boxes are `overflow: hidden`, so the words rise up into view.
- At `0.8`: `.rs-kicker, .rs-count__n, .rs-form, .rs-hint__in` from `{ opacity: 0, y: 10 }`, duration `1.2`, stagger `0.08`.

The flower’s own growth is separate. Each built particle’s `delay` is based on how far it sits above the root, up to about `1.6 + 0.35` seconds, and it fades in over 0.9 seconds. In static mode that delay is skipped and grow is 1 immediately.

**Scroll.** The track is `380vh`. CSS sticky pins the stage. `ScrollTrigger`: `start: 'top top'`, `end: 'bottom bottom'`, `scrub: 0.8` when motion is allowed. A local object `story` tweens `p` from 0 to 1 over duration 1, and that duration is the whole timeline, so scroll progress and `story.p` match. Ease default `none`.

| From | To | What changes |
| --- | --- | --- |
| 0.00 | 1.00 | `story.p` 0 → 1, and `setState` applies bloom, scatter, and morph on each update. |
| 0.00 | 0.05 | `.rs-hint` opacity → 0. |
| 0.38 | 0.50 | `.rs-head` to `{ opacity: 0, y: -30 }`, duration `0.12`. |
| 0.50 | 0.58 | `.rs-count` opacity → 0, duration `0.08`. |
| 0.88 | 0.96 | `.rs-outro` from `{ opacity: 0, y: 20 }` to `{ opacity: 1, y: 0 }`, duration `0.08`. |

Reading the flower against that same `p`: it is half open at rest, fully open by 0.42, scattering from 0.40 to 0.60, and spelling `remember` from 0.56 to 0.92. The headline is gone before the word has finished forming. The outro arrives as the morph completes.

**Reduced motion** does not scrub. On each ScrollTrigger update the timeline is parked at one of three progress values:

- `progress > 0.55` → timeline progress `1` (bloom 1, scatter 1, morph 1)
- else `progress > 0.25` → timeline progress `0.42` (bloom 1, scatter ≈ 0.028, morph 0)
- else → timeline progress `0` (bloom 0.5, scatter 0, morph 0)

`setStatic(true)` then snaps particles onto their targets, skips sway, skips the scatter offset, and treats morph as fully the word when `morph > 0.5` and fully the flower otherwise. So the three parked states draw as a half-open flower, a fully open flower, and the word `remember`. The DOM at progress `0.42` is whatever that timeline time is: the hint is already gone, and the headline fade (0.38–0.50) is about a third of the way through. Blob drift, grain jitter, the hint bob, and the canvas opacity transition are all `animation: none` / `transition: none`.

**Pointer.** Coordinates are local to the stage’s border box. Events whose target is inside an `input`, `button`, or `form` do not move the flower; the pointer is cleared so the field does not repel words.

- `pointermove`: `setPointer(x, y, active)` where `active` is true for a mouse, or when `buttons > 0`. A mouse repels on hover. A touch repels only while it is down.
- `pointerdown` outside the form: `burst(x, y)` and `setPointer(x, y, true)`.
- `pointerup`: if the pointer type is not `mouse`, the pointer is cleared. A mouse keeps hovering.
- `pointercancel` and `pointerleave` clear the pointer.

Repulsion radius is `max(70, min(width, height) * 0.12)`. Inside it, acceleration falls off with the square of the remaining distance. `burst` stores a shock for 1.2 seconds. A ring expands at 900 pixels per second, and particles within 70px of that ring are pushed out, fading with the shock’s age. `touch-action: pan-y` on the stage lets a vertical drag scroll.

**Plant.** Submit trims the draft and ignores an empty string. The particle is born at the input’s top-left plus 40px in x, in stage-local coordinates, or at the bottom centre if the input box cannot be measured. Text is sliced to 40 characters. It is a user petal: size 14, full opacity, tone 1, lime, with an initial `vy` of -8 so it lifts in. `writeStored` appends that same 40-character string. The visible count updates. The label shows `Planted: “…”` and clears after 3200ms. The input clears.

**Storage.** Key `rootsong:memories`. The value is a JSON array of strings, kept to the last 24. On startup, after fonts are ready, each stored string is `plant`ed from `{ x: stageWidth * 0.5, y: stageHeight * 1.1 }`, just below the stage, so it flies up into the flower. If `localStorage` throws (private mode, or a sandbox that blocks it), the read returns `[]` and the write is ignored. Memories planted in that visit still exist until the page is left.

**Fonts and startup.** Status begins as `loading` (canvas opacity 0). The page waits for `document.fonts.load` of `16px` and `italic 100px` Instrument Serif, but races that with a 2500ms timeout so a slow font does not block the flower. Then it resizes, replays stored memories, sets the count, sets status `ready`, observes resize, starts the intersection observer, and plays. If `getContext('2d')` is missing, status is `failed`, the form is omitted, and the error sentence is shown. The headline and the scroll story still run.

**Lenis**, only if motion is allowed: `{ lerp: 0.085 }`. Scroll events call `ScrollTrigger.update`. The ticker runs `lenis.raf(time * 1000)` and `gsap.ticker.lagSmoothing(0)`.

**Keyboard.** The control is a real form: Tab reaches the input and the Plant button, Enter submits. There is no arrow-key navigation.

## Responsive behaviour

**Desktop, wider than 900px.** Headline up to 118px, vertically centred on the left. Count on the right, vertically centred. Form at the lower left, up to 340px wide. Hint visible at the bottom centre. Flower root at `x = 0.54 * width`, `y = 0.99 * height`. Scale is `min(height * 0.78, width * 0.95)`. Build density is 1. Device-pixel cap before the pixel budget is 2. The morph raster uses 80% of the offscreen width (`0.8` in `computeMorphTargets`).

**Around 820px.** Only `max-width: 900px` applies: the headline becomes `clamp(40px, 8vw, 72px)`. The 700px layout has not started, and the flower still uses the desktop root, density, and pixel cap, because those switch on `width < 700`.

**700px and under** (the CSS query and the JS `w < 700` test).

- Kicker `top: 22px`, font 9px, gap 8px. The last span, `An anthology of small things — Vol. 01`, is `display: none`. `Rootsong` and the rule remain.
- Headline `top: 84px`, `transform: none`, `clamp(40px, 12.5vw, 60px)`.
- Count leaves the vertical centre: `top: auto; bottom: 118px; right: 20px`. The numeral is 30px.
- Form `left: 20px; right: 20px; width: auto; bottom: 58px`.
- Hint `display: none`.
- Outro `top: 64%`.
- Flower: density `0.6`, root `x = 0.52 * width`, scale `min(height * 0.78, width * 1.25)`, device-pixel cap 1.5 before the pixel budget. The morph raster may use 92% of the offscreen width.

## Accessibility & robustness

- **`prefers-reduced-motion`.** Read on first render and on `change`. No intro timeline. No Lenis. Scroll does not scrub; it parks the story at progress 0, 0.42, or 1 as above. `setStatic(true)` snaps the flower, drops sway and scatter, and snaps the morph. Blob, grain, and hint animations stop. The canvas does not fade in; it appears at full opacity once ready.
- **Canvas.** There is no WebGL in this section. If `canvas.getContext('2d')` fails, status is `failed`, the canvas stays at opacity 0 (the ready attribute never arrives), the form is not rendered, and the error sentence is shown. The headline, corners, and scroll copy still render. `makeGrain` failing only removes the noise tile.
- **Images.** There are no image files and no image requests. The grain tile is a data URL. A missing font is covered by `Times New Roman` in the canvas font string, and the 2.5s font race means the flower still builds.
- **Off-screen.** After the flower is ready, an IntersectionObserver on the track plus `visibilitychange` pauses the loop unless the track is intersecting and the document is visible.
- **`overflow: clip`** is set on `.rs-stage` after `overflow: hidden`. The sticky stage clips, and focus cannot scroll it. `touch-action: pan-y` keeps vertical scrolling available.
- **StrictMode.** The scroll effect allocates `const story = { p: 0 }` inside the run and tweens that object inside `gsap.context`. Cleanup `revert()`s that context only. The next run gets a new `story`. The flower itself is created in a normal effect and `dispose()`d on cleanup, with a `disposed` flag so a font callback after unmount does not resize a dead instance.

## Performance notes

- Each distinct word is rasterised once. The cache key is `` `${user ? 1 : 0}|${size}|${text}` ``. The bitmap is filled in Instrument Serif at `size * fontScale * dpr` and then stamped with `drawImage`. Later frames do not call `fillText`. The cache is cleared on every resize, because `fontScale` and `dpr` change the bitmap size.
- The backing store is capped. `dprMax` is `min(devicePixelRatio, width < 700 ? 1.5 : 2)`. Then `dpr = max(1, min(dprMax, sqrt(4.2e6 / (width * height))))`, so the canvas stays under about 4.2 million pixels. A large 2x screen does not paint a 4K canvas every frame.
- Narrow stages (`width < 700`) build the flower at density `0.6` (fewer particles on the curves, petals, bud, and centre). Desktop density is 1.
- The loop skips `step` and `draw` in static mode unless `needsDraw` is set (a resize, a plant, a pointer, a burst, or a state change).
- The blurred blobs are DOM, `contain: strict`, and they are not redrawn by the canvas. The canvas is a separate compositor layer (`will-change: transform`).
- The grain tile is one 160×160 PNG. The animation only changes its transform.
- Fonts are given at most 2.5 seconds. The flower does not wait forever on `document.fonts`.

## Full source code

Create these five files exactly. Do not reformat, rename, or restyle them. `index.html` replaces the Vite template’s `index.html`. The other four replace or sit beside it under `src/`. The template files `App.tsx`, `App.css`, `index.css`, and `vite.svg` are unused; delete them so they are not imported. Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#1c2116" />
    <title>Rootsong — Oversight Supply</title>
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
import './rootsong.css'
import RootsongHero from './RootsongHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootsongHero />
  </StrictMode>,
)
```

### `src/RootsongHero.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { WordFlower } from './WordFlower'

gsap.registerPlugin(ScrollTrigger)

const FONT = '"Instrument Serif", "Times New Roman", serif'
const MORPH_WORD = 'remember'
const STORE_KEY = 'rootsong:memories'

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

function readStored(): string[] {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list.filter((s) => typeof s === 'string').slice(-24) : []
  } catch {
    return []
  }
}
function writeStored(list: string[]) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(list.slice(-24)))
  } catch {
    /* storage unavailable (private mode / sandbox) – memories stay for this visit only */
  }
}

/** Tiny generated noise tile for the film-grain overlay (no image asset needed). */
function makeGrain(): string {
  try {
    const c = document.createElement('canvas')
    c.width = c.height = 160
    const g = c.getContext('2d')!
    const img = g.createImageData(160, 160)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() > 0.5 ? 255 : 0 // light + dark specks, normal blending (no mix-blend-mode)
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v
      img.data[i + 3] = Math.random() * 22
    }
    g.putImageData(img, 0, 0)
    return `url(${c.toDataURL('image/png')})`
  } catch {
    return 'none'
  }
}

export default function RootsongHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const flowerRef = useRef<WordFlower | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const reduced = usePrefersReducedMotion()

  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [count, setCount] = useState(0)
  const [draft, setDraft] = useState('')
  const [planted, setPlanted] = useState<string | null>(null)
  const [grain] = useState(makeGrain)

  /* ------------------------------------------------------------ engine */
  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return
    let disposed = false
    let flower: WordFlower
    try {
      flower = new WordFlower(canvas, { word: MORPH_WORD, font: FONT })
    } catch {
      setStatus('failed')
      return
    }
    flowerRef.current = flower

    const fontsReady = Promise.race([
      Promise.all([
        document.fonts.load(`16px ${FONT}`),
        document.fonts.load(`italic 100px ${FONT}`),
      ]),
      new Promise((r) => setTimeout(r, 2500)), // never block on fonts
    ])

    let ro: ResizeObserver | null = null
    let io: IntersectionObserver | null = null
    let inView = true
    const onVis = () => (document.hidden || !inView ? flower.pause() : flower.play())

    fontsReady.then(() => {
      if (disposed) return
      flower.resize(stage.clientWidth, stage.clientHeight)
      readStored().forEach((m) => flower.plant(m, { x: stage.clientWidth * 0.5, y: stage.clientHeight * 1.1 }))
      setCount(flower.count)
      setStatus('ready')
      ro = new ResizeObserver(() => flower.resize(stage.clientWidth, stage.clientHeight))
      ro.observe(stage)
      io = new IntersectionObserver(([e]) => {
        inView = e.isIntersecting
        onVis()
      })
      if (trackRef.current) io.observe(trackRef.current)
      document.addEventListener('visibilitychange', onVis)
      flower.play()
    })

    return () => {
      disposed = true
      ro?.disconnect()
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      flower.dispose()
      flowerRef.current = null
    }
  }, [])

  useEffect(() => {
    flowerRef.current?.setStatic(reduced)
  }, [reduced, status])

  /* ----------------------------------------------------------- pointer */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || status !== 'ready') return
    const local = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const isUi = (e: PointerEvent) => !!(e.target as HTMLElement).closest('input, button, form')
    const move = (e: PointerEvent) => {
      if (isUi(e)) return flowerRef.current?.setPointer(0, 0, false)
      const p = local(e)
      flowerRef.current?.setPointer(p.x, p.y, e.pointerType === 'mouse' || e.buttons > 0)
    }
    const down = (e: PointerEvent) => {
      if (isUi(e)) return
      const p = local(e)
      flowerRef.current?.burst(p.x, p.y)
      flowerRef.current?.setPointer(p.x, p.y, true)
    }
    const up = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') flowerRef.current?.setPointer(0, 0, false)
    }
    const leave = () => flowerRef.current?.setPointer(0, 0, false)
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointerup', up)
    stage.addEventListener('pointercancel', leave)
    stage.addEventListener('pointerleave', leave)
    return () => {
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointerup', up)
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

  /* ------------------------------------------------- intro + scroll story */
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.2 })
          .from('.rs-corner', { opacity: 0, scale: 0.6, duration: 1.6, stagger: 0.12 })
          .from('.rs-head .li', { yPercent: 110, duration: 1.6, stagger: 0.1 }, 0.3)
          .from('.rs-kicker, .rs-count__n, .rs-form, .rs-hint__in', { opacity: 0, y: 10, duration: 1.2, stagger: 0.08 }, 0.8)
      }

      const story = { p: 0 }
      const apply = (p: number) => {
        flowerRef.current?.setState({
          bloom: 0.5 + 0.5 * smooth(0.02, 0.42, p),
          scatter: smooth(0.4, 0.6, p),
          morph: smooth(0.56, 0.92, p),
        })
      }
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      tl.to(story, { p: 1, duration: 1, onUpdate: () => apply(story.p) }, 0)
        .to('.rs-hint', { opacity: 0, duration: 0.05 }, 0)
        .to('.rs-head', { opacity: 0, y: -30, duration: 0.12 }, 0.38)
        .to('.rs-count', { opacity: 0, duration: 0.08 }, 0.5)
        .fromTo('.rs-outro', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08 }, 0.88)

      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        animation: reduced ? undefined : tl,
        scrub: reduced ? false : 0.8,
        onUpdate(self) {
          if (reduced) {
            // discrete states only: flower or word, no in-between motion
            const p = self.progress > 0.55 ? 1 : self.progress > 0.25 ? 0.42 : 0
            tl.progress(p)
          }
        },
      })
      apply(0)
    }, stageRef)
    return () => ctx.revert()
  }, [reduced])

  /* ---------------------------------------------------------- planting */
  const onPlant = (e: FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    const flower = flowerRef.current
    const stage = stageRef.current
    if (!text || !flower || !stage) return
    const ir = inputRef.current?.getBoundingClientRect()
    const sr = stage.getBoundingClientRect()
    flower.plant(text, ir ? { x: ir.left - sr.left + 40, y: ir.top - sr.top } : { x: sr.width / 2, y: sr.height })
    writeStored([...readStored(), text.slice(0, 40)])
    setCount(flower.count)
    setPlanted(text.slice(0, 40))
    setDraft('')
  }

  useEffect(() => {
    if (!planted) return
    const t = setTimeout(() => setPlanted(null), 3200)
    return () => clearTimeout(t)
  }, [planted])

  return (
    <main className="rs-root" data-status={status} style={{ ['--rs-grain' as string]: grain }}>
      <section ref={trackRef} className="rs-track" aria-label="Rootsong — a flower grown from words">
        <div ref={stageRef} className="rs-stage">
          <div className="rs-bg" aria-hidden="true">
            <span className="rs-blob rs-blob--a" />
            <span className="rs-blob rs-blob--b" />
            <span className="rs-blob rs-blob--c" />
            <span className="rs-blob rs-blob--d" />
          </div>

          <canvas ref={canvasRef} className="rs-canvas" aria-hidden="true" />
          <div className="rs-grain" aria-hidden="true" />

          <span className="rs-corner rs-corner--tl" aria-hidden="true">R</span>
          <span className="rs-corner rs-corner--tr" aria-hidden="true">O</span>
          <span className="rs-corner rs-corner--bl" aria-hidden="true">O</span>
          <span className="rs-corner rs-corner--br" aria-hidden="true">T</span>

          <p className="rs-kicker">
            <span>Rootsong</span>
            <span className="rs-kicker__sep" />
            <span>An anthology of small things — Vol. 01</span>
          </p>

          <h1 className="rs-head">
            <span className="ln"><span className="li">Grown from</span></span>
            <span className="ln"><span className="li">the words</span></span>
            <span className="ln"><span className="li"><em>we keep.</em></span></span>
          </h1>

          <p className="rs-count" aria-live="polite">
            <span className="rs-count__n">{String(count).padStart(4, '0')}</span>
            <span>memories in bloom</span>
          </p>

          <div className="rs-outro" aria-hidden="false">
            <p>Every word here is a small memory someone kept.</p>
            <p className="rs-outro__sub">Scroll back up to watch them bloom again.</p>
          </div>

          <div className="rs-hint" aria-hidden="true">
            <span className="rs-hint__in">Scroll to bloom</span>
          </div>

          {status !== 'failed' && (
            <form className="rs-form" onSubmit={onPlant}>
              <label htmlFor="rs-memory" className="rs-form__label">
                {planted ? <>Planted: <em>“{planted}”</em></> : 'Plant a memory'}
              </label>
              <div className="rs-form__row">
                <input
                  id="rs-memory"
                  ref={inputRef}
                  value={draft}
                  maxLength={40}
                  autoComplete="off"
                  placeholder="e.g. rain on the window"
                  onChange={(e) => setDraft(e.target.value)}
                  disabled={status !== 'ready'}
                />
                <button type="submit" disabled={!draft.trim() || status !== 'ready'} aria-label="Plant memory">
                  Plant <span aria-hidden="true">↵</span>
                </button>
              </div>
            </form>
          )}

          {status === 'failed' && (
            <p className="rs-error">This browser can’t draw the word flower. The story still reads top to bottom.</p>
          )}
        </div>
      </section>
    </main>
  )
}
```

### `src/WordFlower.ts`

```ts
/**
 * WordFlower
 * Canvas-2D particle system where every particle is a word. Particles are "grown" into a
 * procedurally generated flower (stems, blades, petals, a drooping bud), follow a spring
 * towards targets that change with scroll (bloom → scatter → morph into a typographic word),
 * and are pushed away by the pointer.
 */

export const MEMORIES = [
  'Sunday mornings', 'baking bread', 'pillow forts', 'rain on tin', 'her hands', 'first snow',
  'bike rides', 'kitchen radio', 'late trains', 'lemon cake', 'old letters', 'summer dust',
  'fireflies', 'hide & seek', 'warm socks', 'sea glass', 'the porch light', 'humming',
  'birthday candles', 'wet grass', 'cassette tapes', 'long walks', 'cherry pits', 'grandma',
  'quiet evenings', 'paper boats', 'sticky jam', 'lullabies', 'cold milk', 'open windows',
  'library cards', 'thunder', 'first kiss', 'road trips', 'burnt toast', 'moss', 'daisies',
  'sleepovers', 'the garden', 'mud pies', 'fresh sheets', 'photographs', 'slow dances',
  'tea steam', 'kites', 'hugs', 'laughter', 'cooking', 'home', 'blankets', 'songs', 'stars',
  'acts of care', 'building forts', 'childhood', 'milestones', 'together', 'recipes', 'family',
]

type Recipe =
  | { kind: 'curve'; curve: number; t: number; lane: number }
  | { kind: 'petal'; petal: number; u: number; v: number; bud: boolean }
  | { kind: 'center'; ang: number; rad: number }

type Particle = {
  text: string
  size: number
  recipe: Recipe
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  alpha: number
  delay: number // growth stagger (s)
  seed: number
  user: boolean
  tone: number // per-word opacity variation, precomputed
  // cached targets
  fx: number
  fy: number
  frot: number
  mx: number
  my: number
  mDelay: number
}

type Vec = { x: number; y: number }
type Bezier = [Vec, Vec, Vec, Vec]

const bez = (c: Bezier, t: number): Vec => {
  const it = 1 - t
  const a = it * it * it, b = 3 * it * it * t, d = 3 * it * t * t, e = t * t * t
  return {
    x: a * c[0].x + b * c[1].x + d * c[2].x + e * c[3].x,
    y: a * c[0].y + b * c[1].y + d * c[2].y + e * c[3].y,
  }
}
const bezTan = (c: Bezier, t: number): Vec => {
  const it = 1 - t
  return {
    x: 3 * it * it * (c[1].x - c[0].x) + 6 * it * t * (c[2].x - c[1].x) + 3 * t * t * (c[3].x - c[2].x),
    y: 3 * it * it * (c[1].y - c[0].y) + 6 * it * t * (c[2].y - c[1].y) + 3 * t * t * (c[3].y - c[2].y),
  }
}

// Flower in "flower units": origin at root, +y is up, total height ≈ 1.
const STEM: Bezier = [{ x: 0, y: 0 }, { x: -0.03, y: 0.28 }, { x: 0.07, y: 0.5 }, { x: 0.035, y: 0.74 }]
const SIDE_FROM_T = 0.6
const CURVES: { c: Bezier; width: number; lanes: number; density: number; from?: number }[] = [
  { c: STEM, width: 0.013, lanes: 3, density: 1 },
  // left branch with drooping bud (start point patched at runtime from STEM)
  { c: [{ x: 0, y: 0 }, { x: -0.08, y: 0.66 }, { x: -0.2, y: 0.73 }, { x: -0.27, y: 0.72 }], width: 0.007, lanes: 2, density: 0.8, from: SIDE_FROM_T },
  // long blades
  { c: [{ x: 0.01, y: 0 }, { x: 0.09, y: 0.16 }, { x: 0.16, y: 0.33 }, { x: 0.25, y: 0.5 }], width: 0.012, lanes: 2, density: 0.9 },
  { c: [{ x: -0.01, y: 0 }, { x: -0.06, y: 0.12 }, { x: -0.1, y: 0.24 }, { x: -0.09, y: 0.37 }], width: 0.011, lanes: 2, density: 0.8 },
]
{
  const s = bez(STEM, SIDE_FROM_T)
  CURVES[1].c[0] = s
}
const HEAD = bez(STEM, 1)
const BUD = CURVES[1].c[3]
const PETALS = 6

const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export type FlowerState = {
  bloom: number // 0 closed bud → 1 fully open
  scatter: number // 0 → 1 words lift off like pollen
  morph: number // 0 flower → 1 typographic word
}

export class WordFlower {
  private ctx: CanvasRenderingContext2D
  private particles: Particle[] = []
  private W = 1
  private H = 1
  private dpr = 1
  private scale = 1 // flower units → px
  private fontScale = 1
  private sprites = new Map<string, { c: HTMLCanvasElement; hw: number; hh: number }>()
  private root: Vec = { x: 0, y: 0 }
  private pointer: Vec & { active: boolean } = { x: -9999, y: -9999, active: false }
  private shock: { x: number; y: number; t: number } | null = null
  private raf = 0
  private running = false
  private start = performance.now()
  private last = performance.now()
  private word: string
  private font: string
  private staticMode = false
  private needsDraw = true
  state: FlowerState = { bloom: 0.5, scatter: 0, morph: 0 }
  color = '239, 233, 196'
  accent = '214, 240, 107'

  constructor(private canvas: HTMLCanvasElement, opts: { word: string; font: string }) {
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas 2D unavailable')
    this.ctx = ctx
    this.word = opts.word
    this.font = opts.font
  }

  get count() {
    return this.particles.length
  }

  setStatic(v: boolean) {
    this.staticMode = v
    this.needsDraw = true
  }

  setState(s: Partial<FlowerState>) {
    Object.assign(this.state, s)
    this.needsDraw = true
  }

  resize(w: number, h: number) {
    const isSmall = w < 700
    // cap the backing store at ~4.2M pixels: big 2x screens otherwise paint a 4K canvas every frame
    const dprMax = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2)
    this.dpr = Math.max(1, Math.min(dprMax, Math.sqrt(4.2e6 / Math.max(1, w * h))))
    this.sprites.clear()
    this.W = w
    this.H = h
    this.canvas.width = Math.round(w * this.dpr)
    this.canvas.height = Math.round(h * this.dpr)
    this.scale = Math.min(h * 0.78, w * (isSmall ? 1.25 : 0.95))
    this.fontScale = Math.max(0.8, Math.min(1.45, this.scale / 620))
    this.root = { x: w * (isSmall ? 0.52 : 0.54), y: h * 0.99 }
    const fresh = this.particles.length === 0
    if (fresh) this.build(isSmall ? 0.6 : 1)
    this.computeMorphTargets()
    if (fresh) {
      // each word starts just below its own spot; staggered delays make the flower draw upwards
      for (const p of this.particles) {
        p.x = p.fx + (rand(p.seed) - 0.5) * 30
        p.y = p.fy + 30 + rand(p.seed + 1) * 50
      }
    }
    this.needsDraw = true
  }

  /* ---------------------------------------------------------- generation */
  private build(density: number) {
    let wi = 0
    const nextWord = () => MEMORIES[wi++ % MEMORIES.length]
    const shortWord = (i: number) => {
      const w = MEMORIES[(i * 7) % MEMORIES.length].split(' ')
      return w[i % w.length]
    }
    CURVES.forEach((cv, ci) => {
      const perLane = Math.round(34 * cv.density * density)
      for (let lane = 0; lane < cv.lanes; lane++) {
        for (let i = 0; i < perLane; i++) {
          const t = (i + (lane % 2) * 0.5) / perLane
          this.add({ kind: 'curve', curve: ci, t, lane: cv.lanes === 1 ? 0 : lane / (cv.lanes - 1) - 0.5 }, shortWord(i + lane * 13 + ci * 5), 11)
        }
      }
    })
    const perPetal = Math.round(38 * density)
    for (let p = 0; p < PETALS; p++) {
      for (let i = 0; i < perPetal; i++) {
        const s = p * 1000 + i
        this.add({ kind: 'petal', petal: p, u: Math.pow(rand(s), 0.8), v: i % 2 ? rand(s + 0.5) * 2 - 1 : (rand(s + 0.7) > 0.5 ? 1 : -1) * (0.75 + rand(s + 0.5) * 0.25), bud: false }, i % 3 === 0 ? nextWord() : shortWord(i + p * 7), 12.5)
      }
    }
    for (let i = 0; i < Math.round(40 * density); i++) {
      this.add({ kind: 'petal', petal: i % 3, u: rand(i + 77), v: rand(i + 78) * 2 - 1, bud: true }, shortWord(i + 3), 9)
    }
    for (let i = 0; i < Math.round(30 * density); i++) {
      this.add({ kind: 'center', ang: rand(i + 400) * Math.PI * 2, rad: Math.sqrt(rand(i + 401)) }, nextWord(), 10.5)
    }
  }

  private add(recipe: Recipe, text: string, size: number, user = false) {
    const seed = this.particles.length + 1 + (user ? 5000 + Math.random() * 1000 : 0)
    const p: Particle = {
      text, size, recipe, user, seed,
      tone: user ? 1 : 0.62 + rand(seed + 6) * 0.38,
      x: 0, y: 0, vx: 0, vy: 0, rot: 0, alpha: 0,
      delay: 0,
      fx: 0, fy: 0, frot: 0, mx: 0, my: 0, mDelay: 0,
    }
    this.particles.push(p)
    // grow from the root upwards
    this.flowerTarget(p, 0)
    p.delay = clamp01((this.root.y - p.fy) / (this.scale * 1.05)) * 1.6 + rand(seed + 9) * 0.35
    return p
  }

  /** Plant a user memory into a random petal; it flies in from (x, y). */
  plant(text: string, from: Vec) {
    const clean = text.trim().slice(0, 40)
    if (!clean) return
    const r = Math.random()
    const p = this.add({ kind: 'petal', petal: Math.floor(r * PETALS), u: 0.3 + Math.random() * 0.6, v: Math.random() * 1.6 - 0.8, bud: false }, clean, 14, true)
    p.x = from.x
    p.y = from.y
    p.delay = 0
    p.alpha = 1
    p.vy = -8
    this.computeMorphTargets()
    this.needsDraw = true
  }

  /* ------------------------------------------------------------- targets */
  private toScreen(v: Vec): Vec {
    return { x: this.root.x + v.x * this.scale, y: this.root.y - v.y * this.scale }
  }

  private flowerTarget(p: Particle, time: number) {
    const { bloom } = this.state
    const sway = (y: number) => (this.staticMode ? 0 : Math.sin(time * 0.55 + y * 2.2) * 0.012 * y)
    const r = p.recipe
    let pos: Vec
    let ang = 0
    if (r.kind === 'curve') {
      const cv = CURVES[r.curve]
      const q = bez(cv.c, r.t)
      const tan = bezTan(cv.c, r.t)
      const len = Math.hypot(tan.x, tan.y) || 1
      const nx = -tan.y / len, ny = tan.x / len
      const w = cv.width * (1 - r.t * 0.55) * 2
      pos = { x: q.x + nx * r.lane * w + sway(q.y), y: q.y + ny * r.lane * w }
      ang = -Math.atan2(tan.y, tan.x) // screen space (y flipped)
    } else if (r.kind === 'center') {
      const c = HEAD
      pos = { x: c.x + Math.cos(r.ang) * r.rad * 0.025 + sway(c.y), y: c.y + Math.sin(r.ang) * r.rad * 0.02 }
      ang = (r.ang - Math.PI) * 0.08
    } else {
      const b = r.bud ? 0.12 : bloom
      const n = r.bud ? 3 : PETALS
      const c = r.bud ? BUD : HEAD
      // closed: petals point up (or droop, for the bud); open: radial spread
      const baseUp = r.bud ? -Math.PI / 2 - 0.5 : Math.PI / 2
      const spread = (r.petal - (n - 1) / 2) * ((Math.PI * 2) / n)
      const a = baseUp + spread * (0.18 + 0.82 * ease(b)) * (r.bud ? 0.25 : 1)
      const L = r.bud ? 0.05 : 0.08 + 0.13 * b
      const curl = r.u * 0.35 * (spread >= 0 ? 1 : -1) * b
      const dir = { x: Math.cos(a + curl), y: Math.sin(a + curl) }
      const nrm = { x: -dir.y, y: dir.x }
      const width = Math.sin(Math.PI * Math.pow(r.u, 0.75)) * (r.bud ? 0.014 : 0.03 + 0.02 * b)
      pos = {
        x: c.x + dir.x * r.u * L + nrm.x * r.v * width + sway(c.y),
        y: c.y + dir.y * r.u * L + nrm.y * r.v * width,
      }
      ang = -(a + curl)
      if (Math.cos(ang) < 0) ang += Math.PI // keep words readable, never upside down
    }
    const s = this.toScreen(pos)
    p.fx = s.x
    p.fy = s.y
    p.frot = r.kind === 'curve' ? ang : ang
  }

  /** Sample the typographic word and assign points to particles in left→right order. */
  private computeMorphTargets() {
    const W = this.W, H = this.H
    if (!this.particles.length) return
    const k = 0.5
    const off = document.createElement('canvas')
    off.width = Math.max(2, Math.round(W * k))
    off.height = Math.max(2, Math.round(H * k))
    const g = off.getContext('2d')
    if (!g) return
    let fs = 100
    g.font = `${fs}px ${this.font}`
    const mw = g.measureText(this.word).width
    fs = Math.min((off.width * (W < 700 ? 0.92 : 0.8) / mw) * fs, off.height * 0.5)
    g.font = `${fs}px ${this.font}`
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillStyle = '#fff'
    g.fillText(this.word, off.width / 2, off.height * 0.46)
    const data = g.getImageData(0, 0, off.width, off.height).data
    const pts: Vec[] = []
    const step = 2
    for (let y = 0; y < off.height; y += step) {
      for (let x = 0; x < off.width; x += step) {
        if (data[(y * off.width + x) * 4 + 3] > 140) pts.push({ x: x / k, y: y / k })
      }
    }
    if (!pts.length) return
    // pick an even subset
    const n = this.particles.length
    const picked: Vec[] = []
    for (let i = 0; i < n; i++) {
      const j = Math.floor(((i + rand(i) * 0.9) / n) * pts.length) % pts.length
      picked.push(pts[j])
    }
    picked.sort((a, b) => a.x - b.x)
    const order = this.particles.map((p, i) => ({ p, i, x: p.fx })).sort((a, b) => a.x - b.x)
    order.forEach(({ p }, i) => {
      const q = picked[i]
      p.mx = q.x + (rand(p.seed + 3) - 0.5) * 3
      p.my = q.y + (rand(p.seed + 4) - 0.5) * 3
      p.mDelay = (q.x / W) * 0.45
    })
  }

  /* ----------------------------------------------------------- pointer */
  setPointer(x: number, y: number, active: boolean) {
    this.pointer.x = x
    this.pointer.y = y
    this.pointer.active = active
    this.needsDraw = true
  }

  burst(x: number, y: number) {
    this.shock = { x, y, t: performance.now() }
    this.needsDraw = true
  }

  /* ------------------------------------------------------------- frame */
  private step(now: number) {
    const dt = Math.min(0.05, (now - this.last) / 1000)
    this.last = now
    const time = (now - this.start) / 1000
    const { scatter, morph } = this.state
    const R = Math.max(70, Math.min(this.W, this.H) * 0.12)
    const shockAge = this.shock ? (now - this.shock.t) / 1000 : 99
    if (shockAge > 1.2) this.shock = null

    for (const p of this.particles) {
      this.flowerTarget(p, time)
      const grow = this.staticMode ? 1 : clamp01((time - p.delay) / 0.9)
      if (grow <= 0) continue

      const m = this.staticMode ? (morph > 0.5 ? 1 : 0) : ease(clamp01((morph * 1.45 - p.mDelay)))
      let tx = p.fx + (p.mx - p.fx) * m
      let ty = p.fy + (p.my - p.fy) * m
      const trot = p.frot * (1 - m)

      if (scatter > 0 && !this.staticMode) {
        const s = scatter * (1 - m)
        tx += Math.sin(time * 0.6 + p.seed) * 60 * s + (rand(p.seed + 1) - 0.5) * this.W * 0.5 * s
        ty += -s * (120 + rand(p.seed + 2) * this.H * 0.45) + Math.cos(time * 0.5 + p.seed) * 30 * s
      }

      if (this.staticMode) {
        p.x = tx
        p.y = ty
        p.rot = trot
        p.alpha = 1
        continue
      }

      let ax = (tx - p.x) * 0.055
      let ay = (ty - p.y) * 0.055
      if (this.pointer.active) {
        const dx = p.x - this.pointer.x
        const dy = p.y - this.pointer.y
        const d = Math.hypot(dx, dy)
        if (d < R && d > 0.01) {
          const f = Math.pow(1 - d / R, 2) * 9
          ax += (dx / d) * f
          ay += (dy / d) * f
        }
      }
      if (this.shock) {
        const dx = p.x - this.shock.x
        const dy = p.y - this.shock.y
        const d = Math.hypot(dx, dy) || 1
        const ring = shockAge * 900
        const band = Math.abs(d - ring)
        if (band < 70) {
          const f = (1 - band / 70) * 6 * (1 - shockAge / 1.2)
          ax += (dx / d) * f
          ay += (dy / d) * f
        }
      }
      p.vx = (p.vx + ax) * 0.8
      p.vy = (p.vy + ay) * 0.8
      p.x += p.vx * dt * 60
      p.y += p.vy * dt * 60
      p.rot += (trot - p.rot) * 0.12
      p.alpha += (grow - p.alpha) * 0.08
    }
  }

  /**
   * Each word is rasterised once into a small bitmap (at device resolution) and then
   * stamped with drawImage. That is far cheaper than fillText, and it removes the font
   * re-parsing that happened every time the size changed while scrolling.
   */
  private sprite(p: Particle) {
    const key = `${p.user ? 1 : 0}|${p.size}|${p.text}`
    let s = this.sprites.get(key)
    if (s) return s
    const px = p.size * this.fontScale * this.dpr
    const c = document.createElement('canvas')
    const g = c.getContext('2d')!
    g.font = `${px}px ${this.font}`
    c.width = Math.max(1, Math.ceil(g.measureText(p.text).width + 4))
    c.height = Math.max(1, Math.ceil(px * 1.35))
    g.font = `${px}px ${this.font}` // resizing the canvas resets its state
    g.textBaseline = 'middle'
    g.fillStyle = `rgb(${p.user ? this.accent : this.color})`
    g.fillText(p.text, 2, c.height / 2)
    s = { c, hw: c.width / 2, hh: c.height / 2 }
    this.sprites.set(key, s)
    return s
  }

  private draw() {
    const { ctx, dpr } = this
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const m = this.state.morph
    const kBase = 1 - m * 0.5
    const kUser = 1 - m * 0.25
    for (const p of this.particles) {
      if (p.alpha < 0.01) continue
      const sp = this.sprite(p)
      const k = p.user ? kUser : kBase
      const c = Math.cos(p.rot) * k
      const s = Math.sin(p.rot) * k
      ctx.setTransform(c, s, -s, c, p.x * dpr, p.y * dpr)
      ctx.globalAlpha = p.alpha * p.tone
      ctx.drawImage(sp.c, -sp.hw, -sp.hh)
    }
    ctx.globalAlpha = 1
  }

  renderOnce() {
    const now = performance.now()
    this.step(now)
    this.draw()
    this.needsDraw = false
  }

  private loop = (now: number) => {
    if (!this.running) return
    if (!this.staticMode || this.needsDraw) {
      this.step(now)
      this.draw()
      this.needsDraw = false
    }
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
    this.particles = []
  }
}
```

### `src/rootsong.css`

```css
/* Rootsong — a flower grown from words */
:root {
  --rs-bg: #1c2116;
  --rs-cream: #efe9c4;
  --rs-cream-soft: rgba(239, 233, 196, 0.62);
  --rs-lime: #d6f06b;
  --rs-serif: 'Instrument Serif', 'Times New Roman', serif;
  --rs-sans: 'Inter Variable', 'Inter', system-ui, sans-serif;
  --rs-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: var(--rs-bg); color: var(--rs-cream); }
body { font-family: var(--rs-sans); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

.rs-track { position: relative; height: 380vh; }

.rs-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  overflow: clip; /* like hidden, but focus can never scroll the pinned stage */
  touch-action: pan-y;
  background: var(--rs-bg);
  isolation: isolate;
}

/* ------------------------------------------------------ blurred backdrop */
.rs-bg { position: absolute; inset: -10%; z-index: 0; contain: strict; }
.rs-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.9;
  will-change: transform;
}
.rs-blob--a { width: 60vmax; height: 50vmax; left: -18%; top: -14%; background: #0e1612; animation: rs-drift-a 26s ease-in-out infinite alternate; }
.rs-blob--b { width: 46vmax; height: 58vmax; left: 30%; top: 10%; background: #8d8b58; opacity: 0.8; animation: rs-drift-b 32s ease-in-out infinite alternate; }
.rs-blob--c { width: 44vmax; height: 40vmax; right: -16%; bottom: -10%; background: #c9b777; opacity: 0.75; animation: rs-drift-c 28s ease-in-out infinite alternate; }
.rs-blob--d { width: 38vmax; height: 46vmax; left: -12%; bottom: -18%; background: #31402e; animation: rs-drift-a 36s ease-in-out infinite alternate-reverse; }
@keyframes rs-drift-a { to { transform: translate3d(8vw, 6vh, 0) scale(1.1); } }
@keyframes rs-drift-b { to { transform: translate3d(-10vw, -4vh, 0) scale(0.92); } }
@keyframes rs-drift-c { to { transform: translate3d(-6vw, -8vh, 0) scale(1.12); } }

.rs-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  will-change: transform; /* own compositor layer, independent of the backdrop */
  opacity: 0;
  transition: opacity 1.2s ease;
}
[data-status='ready'] .rs-canvas { opacity: 1; }

.rs-grain {
  position: absolute;
  inset: -10%;
  z-index: 2;
  pointer-events: none;
  background-image: var(--rs-grain);
  will-change: transform;
  opacity: 0.9;
  animation: rs-grain 0.9s steps(6) infinite;
}
@keyframes rs-grain {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-4%, 3%); }
  40% { transform: translate(3%, -5%); }
  60% { transform: translate(-6%, -2%); }
  80% { transform: translate(5%, 4%); }
  100% { transform: translate(-2%, 6%); }
}
.rs-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(8, 12, 8, 0.55));
}

/* ------------------------------------------------------------- overlay */
.rs-corner, .rs-kicker, .rs-head, .rs-count, .rs-outro, .rs-hint, .rs-form, .rs-error { position: absolute; z-index: 3; }

.rs-corner {
  font-family: var(--rs-serif);
  font-size: clamp(24px, 2.4vw, 36px);
  line-height: 1;
  pointer-events: none;
}
.rs-corner--tl { top: clamp(16px, 2.4vw, 32px); left: clamp(18px, 2.6vw, 36px); }
.rs-corner--tr { top: clamp(16px, 2.4vw, 32px); right: clamp(18px, 2.6vw, 36px); }
.rs-corner--bl { bottom: clamp(16px, 2.4vw, 32px); left: clamp(18px, 2.6vw, 36px); }
.rs-corner--br { bottom: clamp(16px, 2.4vw, 32px); right: clamp(18px, 2.6vw, 36px); }

.rs-kicker {
  top: clamp(22px, 2.8vw, 40px);
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font: 500 10.5px/1 var(--rs-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--rs-cream-soft);
  white-space: nowrap;
}
.rs-kicker__sep { width: 28px; height: 1px; background: currentColor; }

.rs-head {
  left: clamp(18px, 6vw, 110px);
  top: 50%;
  transform: translateY(-40%);
  margin: 0;
  font-family: var(--rs-serif);
  font-weight: 400;
  font-size: clamp(44px, 6.4vw, 118px);
  line-height: 0.92;
  letter-spacing: -0.03em;
  pointer-events: none;
}
.rs-head .ln { display: block; overflow: hidden; padding-bottom: 0.06em; }
.rs-head .li { display: inline-block; }
.rs-head em { font-style: italic; color: var(--rs-lime); }

.rs-count {
  right: clamp(18px, 6vw, 110px);
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  font: 500 10.5px/1 var(--rs-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--rs-cream-soft);
  pointer-events: none;
}
.rs-count__n { font-family: var(--rs-serif); font-size: clamp(34px, 3.2vw, 52px); letter-spacing: 0; color: var(--rs-cream); }

.rs-outro {
  left: 0;
  right: 0;
  top: 68%;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  padding: 0 24px;
}
.rs-outro p { margin: 0; font-family: var(--rs-serif); font-size: clamp(20px, 2vw, 30px); }
.rs-outro .rs-outro__sub { margin-top: 10px; font: 500 10.5px/1.4 var(--rs-mono); letter-spacing: 0.16em; text-transform: uppercase; color: var(--rs-cream-soft); }

.rs-hint {
  left: 50%;
  bottom: clamp(22px, 3vw, 38px);
  transform: translateX(-50%);
  pointer-events: none;
}
.rs-hint__in {
  display: block;
  font: 500 10.5px/1 var(--rs-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--rs-cream-soft);
  animation: rs-bob 2.4s ease-in-out infinite;
}
@keyframes rs-bob { 50% { transform: translateY(5px); opacity: 0.55; } }

/* ---------------------------------------------------------------- form */
.rs-form {
  left: clamp(62px, 6vw, 110px);
  bottom: clamp(20px, 3vw, 38px);
  width: min(340px, calc(100vw - 124px));
}
.rs-form__label {
  display: block;
  margin-bottom: 8px;
  font: 500 10.5px/1.3 var(--rs-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--rs-cream-soft);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rs-form__label em { font-style: normal; color: var(--rs-lime); letter-spacing: 0.04em; text-transform: none; }
.rs-form__row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(239, 233, 196, 0.4);
  transition: border-color 0.3s ease;
}
.rs-form__row:focus-within { border-color: var(--rs-cream); }
.rs-form input {
  flex: 1;
  min-width: 0;
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--rs-cream);
  font: 400 20px/1 var(--rs-serif);
  padding: 8px 0 10px;
  outline: none;
}
.rs-form input::placeholder { color: rgba(239, 233, 196, 0.38); font-style: italic; }
.rs-form button {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--rs-cream);
  font: 500 10.5px/1 var(--rs-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 10px 0 10px 12px;
  cursor: pointer;
  transition: color 0.25s ease, opacity 0.25s ease;
}
.rs-form button:hover:not(:disabled) { color: var(--rs-lime); }
.rs-form button:disabled { opacity: 0.35; cursor: default; }
.rs-form button:focus-visible { outline: 1px solid var(--rs-cream); outline-offset: 2px; }

.rs-error {
  left: 50%;
  top: 60%;
  transform: translateX(-50%);
  max-width: 420px;
  text-align: center;
  font-family: var(--rs-serif);
  font-size: 20px;
}

/* ---------------------------------------------------------- responsive */
@media (max-width: 900px) {
  .rs-head { font-size: clamp(40px, 8vw, 72px); }
}
@media (max-width: 700px) {
  .rs-kicker { top: 22px; font-size: 9px; gap: 8px; }
  .rs-kicker span:last-child { display: none; }
  .rs-head { top: 84px; transform: none; font-size: clamp(40px, 12.5vw, 60px); }
  .rs-count { top: auto; bottom: 118px; right: 20px; transform: none; }
  .rs-count__n { font-size: 30px; }
  .rs-form { left: 20px; right: 20px; width: auto; bottom: 58px; }
  .rs-hint { display: none; }
  .rs-outro { top: 64%; }
}

@media (prefers-reduced-motion: reduce) {
  .rs-blob, .rs-grain, .rs-hint__in { animation: none; }
  .rs-canvas { transition: none; }
}
```

## Assets

Rootsong has no image assets. Do not add any. The flower is Canvas 2D text. The film grain is the 160×160 tile from `makeGrain()` in `src/RootsongHero.tsx`, painted into a data URL at runtime. The coloured field is four blurred CSS blobs. Nothing is fetched.

## Build / run

```
npm create vite@latest rootsong -- --template react-ts
cd rootsong
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Drop in the five files from **Full source code**, then:

```
npm run dev
```

`src/main.tsx` mounts `<RootsongHero />` inside `<StrictMode>` as the only child of `#root`. The hero is the whole page, so the dev URL works on its own or inside an iframe.

## Limitations

- The flower needs a 2D canvas. If the context is missing, the error sentence replaces the form and the type still scrolls.
- Planted memories are stored in `localStorage` under `rootsong:memories` for the current browser only, capped at the last 24 strings. Another visitor does not see them. If storage is blocked, they last for that visit and are gone on reload.
- No APIs, keys, or accounts are needed.
