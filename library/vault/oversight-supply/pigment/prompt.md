<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Pigment

Pigment is a full-page hero that treats the viewport as a sheet of warm paper. Moving the pointer sprays colour; holding deepens it. Ambient moss clouds bloom in on load and open further as you scroll. The headline clears, the sheet shrinks into a floating card, and “Certificate of Originality” appears on the print. A dock changes pigment, clears the sheet, and saves a PNG. Nothing is a photograph: paper, grain, and paint are WebGL shaders.

Rebuild it as the only thing on the page. Create the files in **Full source code** at the paths in their headings, with those contents exactly.

## Stack & dependencies

React 19, TypeScript, and Vite. Scroll animation is `gsap` with `ScrollTrigger`. Smooth scrolling is `lenis`, and only when the visitor has not asked for reduced motion. Live paint is `three`: one orthographic quad, two shader passes. Fonts are imported in `src/main.tsx` (no stylesheet link):

- `@fontsource/instrument-serif` at 400 and 400 italic — the headline, the italic name “Mosswork”, the series numeral, and the series line on the PNG
- `@fontsource-variable/inter` — body copy, the certificate line, buttons’ fallback, and the rest of the PNG text
- `@fontsource/ibm-plex-mono` at 500 — chapter nav, hint, caption, dock buttons, the `[04]` index

`three` is required for this section.

After creating a Vite project with the `react-ts` template, install these versions:

```
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 three@^0.178.0 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @types/three@^0.178.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

The page background is `#dcd9d2` (`--pg-bg`). The sheet is `#ebe8e1` (`--pg-paper`). Ink is `#1b1e16` (`--pg-ink`); secondary text is `rgba(27, 30, 22, 0.62)` (`--pg-ink-soft`). Moss is `#34511a` (`--pg-moss`). `--pg-lime` is `#c6e05a` and is not used by any rule. The nav pill is `rgba(250, 249, 242, 0.62)` with `inset 0 0 0 1px rgba(255, 255, 255, 0.6)` and a cream glow `0 0 40px 12px rgba(250, 249, 242, 0.55)`. The dock is `rgba(250, 249, 242, 0.7)` with `inset 0 0 0 1px rgba(255, 255, 255, 0.7)` and shadow `0 10px 30px -12px rgba(30, 34, 20, 0.25)`. The modal scrim is `rgba(220, 217, 210, 0.72)`.

Type:

- `--pg-serif`: `'Instrument Serif', 'Times New Roman', serif`
- `--pg-sans`: `'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif`
- `--pg-mono`: `'IBM Plex Mono', ui-monospace, 'SFMono-Regular', monospace`

`html` and `body` have no margin. Body text is the sans stack, antialiased. Document title: `Pigment — Oversight Supply`. Theme colour: `#dcd9d2`.

One scroll track, class `pg-track`, height `340vh`. Inside it, `pg-stage` is `position: sticky; top: 0; height: 100vh; height: 100svh; overflow: hidden; overflow: clip` and painted `--pg-bg`. The section’s accessible name is `Pigment — an interactive, paintable hero`.

**Paint order.** The sheet is `position: absolute; inset: 0` with no z-index, so it sits under anything that sets one.

1. Chapter nav, `z-index: 5`, centred on the top edge.
2. The sheet. Inside it, in DOM order: WebGL `<canvas class="pg-canvas">` (`aria-hidden`), the fallback div (hidden until WebGL fails), the wordmark, the meta block, the `h1`, the certificate line, the copy, the series line. Those type layers are `pointer-events: none`. The sheet itself is `cursor: crosshair`, `user-select: none`, `touch-action: pan-y`, `transform-origin: 50% 50%`.
3. Hint, `z-index: 4`, bottom centre.
4. Caption, `z-index: 4`, bottom centre, opacity 0 until the scroll timeline.
5. Dock, `z-index: 5`, bottom centre.
6. Preview modal, `position: fixed; inset: 0; z-index: 50`, mounted only while a PNG preview exists.

**Chapter nav** (`aria-label="Section chapters"`). A pill, padding 6px, radius 999px, backdrop blur 14px. Three buttons, mono 500, 12px, uppercase, letter-spacing `0.14em`. The text in the markup is title case; CSS uppercases it. Each button has a 9px index at 50% opacity:

- `01` `Spray` — jump target progress `0`
- `02` `Bloom` — jump target progress `0.4`
- `03` `Certify` — jump target progress `1`

The active button has `aria-current="step"` and moss corner brackets: 5×5px, 1.5px borders, colour `#34511a`, top-left and bottom-right. Hover fills the item with `rgba(27, 30, 22, 0.06)`. `:focus-visible` is a 1px ink outline, offset 2px.

**Wordmark.** Markup text `HALDE`, one span per letter, group `aria-label="HALDE"`. Top-left, `clamp(20px, 3.4vw, 40px)` from the top and `clamp(20px, 3.4vw, 44px)` from the left. Sans, weight 450, `clamp(15px, 1.35vw, 20px)`, letter-spacing `0.04em`, gap `0.9em`.

**Meta.** Top-right, the same insets, right-aligned. `[04]` in mono 11px, letter-spacing `0.08em`. Beneath it, `Mosswork` in italic Instrument Serif, `clamp(20px, 1.9vw, 28px)`.

**Headline.** Centred, `top: 50%; transform: translate(-50%, -54%)`, width `min(94vw, 1500px)`. Instrument Serif, weight 400, `clamp(58px, 11.4vw, 210px)`, line-height `0.86`, letter-spacing `-0.035em`, `text-wrap: balance`. Words, in order, with a line break after `two`:

`No` `two`
`marks` `are` `alike.`

`marks` is italic: it is the third word, and `.pg-head span:nth-child(3) .wi` sets `font-style: italic`.

**Certificate line.** `Certificate of Originality`. Centred on the sheet (`translate(-50%, -50%)`). Sans, weight 400, `clamp(22px, 2.6vw, 44px)`, letter-spacing `-0.01em`, `white-space: nowrap`. Opacity starts at 0. `aria-hidden` is true until the chapter index is 2.

**Copy.** Bottom-left, `bottom: 100px`, width `min(270px, 60vw)`, 12.5px, line-height 1.38. Two paragraphs. The second uses `--pg-ink-soft`.

1. `This surface is painted live, by hand — yours.`
2. One of these, chosen from engine state:
   - WebGL failed: `Live pigment needs WebGL, which is unavailable in this browser. This is a printed proof.`
   - `(pointer: coarse)` was true on first render: `Tap and hold to spray, drag sideways to draw. Each piece is uniquely composed.`
   - Otherwise: `Move to spray pigment, press and hold to deepen it. Each piece is uniquely composed.`

The coarse-pointer check does not update if a mouse is plugged in later.

**Series.** Bottom-right, `bottom: 100px`. Italic sans, weight 600, `clamp(13px, 1.1vw, 16px)`, nowrap: `Original Series No.` then an `<em>` with the number. The em is Instrument Serif, weight 400, `1.9em`, letter-spacing `0.02em`, `border-bottom: 1px solid currentColor`, horizontal padding `0.15em`, margin-left `0.2em`. The number is chosen once per mount: `Math.floor(Math.random() * 9000) + 1000`, so 1000–9999.

**Hint** (`aria-hidden="true"`). Bottom `88px`, centred. Mono 500, 10.5px, uppercase, letter-spacing `0.16em`, soft ink: `Scroll to certify`. A 36×1px line on its left runs `pg-line` over 2.4s, `cubic-bezier(0.7, 0, 0.3, 1)`, infinite: scaleX from the left 0→1 over the first half, then from the right 1→0.

**Caption.** Full width, `bottom: 86px`, centred, opacity 0, `pointer-events: none`. Mono 500, 10.5px, line-height 1.4, uppercase, letter-spacing `0.14em`, soft ink. Text: `Composed by you · ` plus a stamp frozen at mount: `DD.MM.YYYY — HH:MM` (day, month, full year, hours, minutes, zero-padded, em dash `—`). `aria-hidden` until chapter 2.

**Dock** (`role="toolbar"` `aria-label="Pigment controls"`). Centred, `bottom: clamp(16px, 2.4vw, 26px)`, pill, blur 14px, nowrap. While `data-webgl="ok"`:

- Radiogroup `aria-label="Pigment colour"`. Three 24px circles, gap 6px. Fill is `radial-gradient(circle at 35% 35%, var(--e), var(--c) 70%)`. The active swatch’s shadow is `0 0 0 2px var(--pg-paper), 0 0 0 3.5px var(--c)`. Hover scales to 1.08. `:focus-visible` outline offset 4px.
  - Moss — core `#2f4a17`, edge `#62812d`
  - Ink — core `#1b2033`, edge `#46507a`
  - Ochre — core `#7a3f14`, edge `#b8762f`
- A 1×20px separator, `rgba(27, 30, 22, 0.15)`.
- Button `Clear`.
- Button `Save certificate`, class `pg-btn--solid` (ink fill, paper text; hover becomes moss `#34511a`). While a PNG is encoding, the label is `Rendering…` (ellipsis character `…`) and the button is disabled at opacity 0.6, `cursor: progress`.

Buttons are mono 500, 11px, uppercase, letter-spacing `0.12em`, padding `11px 14px`, radius 999px, border `1px solid rgba(27, 30, 22, 0.2)`.

While WebGL is `pending`, the dock has no children. When it is `failed`, the only child is `Static proof — WebGL unavailable` (mono 500, 10.5px, uppercase, letter-spacing `0.1em`).

**Static proof.** `[data-webgl='failed']` hides `.pg-canvas` and shows `.pg-fallback`:

- `radial-gradient(22vmax 18vmax at 4% 8%, rgba(52, 81, 26, 0.9), transparent 70%)`
- `radial-gradient(10vmax 9vmax at 70% 80%, rgba(52, 81, 26, 0.85), transparent 70%)`
- `radial-gradient(12vmax 14vmax at 98% 62%, rgba(95, 127, 44, 0.85), transparent 70%)`
- paper `#ebe8e1`
- `filter: blur(2px)`

Ambient colours inside the display shader, separate from CSS: paper `#ebe8e1`, core `#34511a`, edge `#5f7f2c`.

**Modal.** Scrim click closes. The card stops that click. Fade-in 0.4s; the card rises 24px and scales from 0.98 over 0.6s, `cubic-bezier(0.2, 0.8, 0.2, 1)`. Card width `min(900px, 100%)`. The image is `width: 100%`, `max-height: 72vh`, `object-fit: contain`, radius 12px, shadow `0 40px 90px -30px rgba(30, 34, 20, 0.45)`. Alt text: `Certificate of Originality, series number {series}`. Figcaption is a row, space-between, mono 500, 11px, uppercase, letter-spacing `0.12em`: `Series No. {series}`, then `Download PNG` (an `<a class="pg-btn pg-btn--solid" download="certificate-{series}.png">`) and `Close` (button, `autoFocus`). `Close` and the scrim both revoke the blob URL.

## Interactions & animation timeline

Displayed bloom is always `intro * (0.35 + 0.65 * scroll)`. Both channels live on one object created inside the scroll effect.

**Intro.** Default ease `expo.out`. It does not run when reduced motion is on; that path sets `intro` to 1 immediately and sprays nothing.

- At `0`: each `.pg-wordmark span` from `{ opacity: 0, y: 12 }`, duration `1.2`, stagger `0.08`.
- At `0.1`: each `.pg-head .wi` from `{ opacity: 0, filter: 'blur(18px)', y: 30 }`, duration `1.8`, stagger `0.09`.
- At `0.5`: `.pg-meta, .pg-copy, .pg-series, .pg-nav, .pg-dock, .pg-hint__in` from `{ opacity: 0 }`, duration `1.2`, stagger `0.05`.
- At `0`, duration `2.6`, ease `power2.out`: `intro` from 0 to 1, calling `setBloom` on every update.
- At `0.9`, duration `1.8`, ease `power1.inOut`: a ghost stroke. For `t` in 0..1, call `splat(x, y, 0.028, 0.3)` with `x = 0.56 + t * 0.3` and `y = 0.26 + Math.sin(t * Math.PI * 1.4) * 0.09 + t * 0.12`.

After the intro, with scroll still 0, displayed bloom is `0.35`.

**Scroll.** CSS sticky does the pinning. GSAP only scrubs a paused timeline. `ScrollTrigger` uses `trigger: track`, `start: 'top top'`, `end: 'bottom bottom'`, `scrub: 0.6`, `invalidateOnRefresh: true`. Scroll progress `p` is the timeline progress. The timeline ease default is `none`. Its length is 1, because the last tween is a 0.1 hold placed at the end of everything before it (that end is 0.90).

| From | To | What changes |
| --- | --- | --- |
| 0.00 | 0.50 | `scroll` bloom 0 → 1. With intro already at 1, displayed bloom goes 0.35 → 1. |
| 0.00 | 0.08 | `.pg-hint` opacity → 0. |
| 0.26 | 0.56 | Each `.pg-head .w` to `{ opacity: 0, filter: 'blur(14px)', yPercent: -35 }`. Duration `0.2`, stagger `0.025`. Five words, so the group lasts `0.2 + 0.025 * 4 = 0.3` and ends at 0.56. |
| 0.44 | 0.84 | The sheet, ease `power2.inOut`, duration `0.4`: scale to the function below, `yPercent: -3`, `borderRadius` of `16 / scale` (so the visual radius stays 16px after scaling), shadow `0 40px 90px -30px rgba(30, 34, 20, 0.35)`. |
| 0.66 | 0.81 | `.pg-cert` from `{ opacity: 0, filter: 'blur(10px)' }` to `{ opacity: 1, filter: 'blur(0px)' }`, duration `0.15`. |
| 0.78 | 0.90 | `.pg-caption` from `{ opacity: 0, y: 16 }` to `{ opacity: 1, y: 0 }`, duration `0.12`. |
| 0.90 | 1.00 | Empty tween, duration `0.1`. The certificate holds. |

Card scale, read on each refresh because `invalidateOnRefresh` is set:

```
const byHeight = (viewportHeight - (width < 700 ? 230 : 210)) / viewportHeight
const scale = Math.max(0.42, Math.min(width < 700 ? 0.78 : 0.64, byHeight))
```

**Chapter highlight** uses scroll progress, which is a different set of thresholds from the nav jump targets:

- `p > 0.8` → Certify (index 2)
- else `p > 0.25` → Bloom (index 1)
- else Spray (index 0)

**Chapter buttons** scroll to `trigger.start + at * (trigger.end - trigger.start)` with `at` of `0`, `0.4`, or `1`. Lenis `scrollTo` uses duration `1.6`. Without Lenis, `window.scrollTo({ behavior: reduced ? 'auto' : 'smooth' })`.

**Pointer.** UV comes from the sheet’s `getBoundingClientRect`, which is the box after the card transform, so paint stays aligned once the sheet has scaled. `x = (clientX - left) / width`, `y = 1 - (clientY - top) / height`. `pointerdown` returns immediately when the target is inside a `button` or `a`.

Engine response, in UV units, y up:

- Move, button up: radius `0.032`, strength `0.22`.
- Move, button down: radius `0.05`, strength `0.55`.
- Pointer down: one splat at radius `0.06`, strength `0.9`. While the button stays down, every frame adds another splat at the same point, radius `0.055`, strength `0.35`.
- A move whose aspect-corrected distance from the last point is greater than `0.3` does not draw a connecting stroke (the pointer re-entered).
- Otherwise the segment is split into at most 10 steps, `ceil(distance / (radius * 0.35))`.
- `pointerup` on `window`, and `pointercancel` or `pointerleave` on the sheet, end the stroke and forget the last point. `pointercancel` is how a touch becomes a scroll and stops painting.

`touch-action: pan-y` lets a vertical drag scroll the page. A sideways drag stays on the sheet and paints.

**Keyboard.** Nav, swatches, Clear, Save, Download, and Close are focusable controls with `:focus-visible` outlines. `Escape` closes the preview. There is no key that sprays pigment.

**Clear** zeroes both accumulation targets and draws once if the loop is paused.

**Save certificate.**

1. Return if there is no engine or a save is already running.
2. `await document.fonts.ready`.
3. `snapshot()` renders one frame and copies the WebGL canvas into a 2D canvas of the same pixel size.
4. `u = shotWidth / sheet.offsetWidth` converts CSS pixels to device pixels. Margin `m = 32 * u`. Fill `#1b1e16`.
5. Top-left, `500 ${18 * u}px "Inter Variable"`, letter-spacing `${14 * u}px`, baseline top: `HALDE`.
6. Bottom-right, `italic ${26 * u}px "Instrument Serif"`, align right: `Series No. {series}`.
7. Centre, `400 ${Math.max(22, Math.min(40, cssWidth / 26)) * u}px "Inter Variable"`, align center, baseline middle: `Certificate of Originality`.
8. Bottom-left, `400 ${12 * u}px "Inter Variable"`, three lines starting at `H - m - 48 * u`, step `17 * u`:
   - `Composed by hand in a live session.`
   - the same `DD.MM.YYYY — HH:MM` stamp
   - `No identical reproductions exist.`
9. `toBlob(..., 'image/png')`. The object URL opens the modal. Lenis `stop()`s while the URL is set and `start()`s when it clears. Failure is logged as `[pigment] export failed` and does not open a modal.

**Lenis.** Created only when reduced motion is off: `{ lerp: 0.09, smoothWheel: true }`. Its `scroll` event calls `ScrollTrigger.update`. A ticker callback runs `lenis.raf(time * 1000)`, and `gsap.ticker.lagSmoothing(0)` is set. Cleanup removes the ticker and destroys Lenis.

**Engine.** `PigmentEngine` in the source below. Short version, so the timeline above has somewhere to land:

- Pass one, ping-pong: splats accumulate into a premultiplied colour buffer. A curl of value noise drifts that buffer (`uDrift` `0.00035`) and it evaporates (`uDecay` `0.9993`). At most 24 splats per pass, at most 3 passes per frame. The queue drops splats past 200.
- Pass two: the buffer plus six ambient blobs become a thresholded, speckled print on a paper colour that already has a little hash grain. Blob radius is `b.r * (0.5 + bloom * 1.2)`. The display uniform `uBloom` is `min(1, bloom * 1.6)`. The six blobs start near the corners (see `BLOBS` in the engine) and drift on sine and cosine unless static mode freezes time at 0.
- `setStatic(true)` sets drift to 0, decay to 1, freezes time, and skips frames unless the queue, the bloom dirty flag, or a held pointer needs a draw.
- The loop plays when the track intersects the viewport and `document.hidden` is false. Otherwise it pauses. Constructor failure logs `[pigment] WebGL unavailable, falling back to static print.` and sets WebGL to `failed`. `webglcontextlost` is prevented and does the same.

Pigment starts as Moss. Changing the swatch updates `uCore` and `uEdge` for new splats. Pigment already on the sheet keeps the colour it was sprayed with.

## Responsive behaviour

There is no breakpoint at 820px. Widths are covered by `max-width: 900px`, `max-width: 640px`, and a JS test `window.innerWidth < 700` inside the card-scale function.

**Desktop, wider than 900px.** Headline can reach 210px. Both copy paragraphs show, bottom-left, up to 270px wide. Series is bottom-right. Nav indexes show. Card scale caps at `0.64` and the height budget subtracts `210px`.

**Around 820px.** This width is under 900 and over 700, so only the 900px query applies: copy becomes `min(240px, 56vw)` at 12px. Positions stay on the desktop layout. The card-scale function still uses the desktop cap (`0.64`, subtract `210`). From 699px down to 641px the CSS is still that 900px layout, while card scale has switched to the narrow formula (cap `0.78`, subtract `230`).

**640px and under.** Nav `top: 14px`, pill padding 4px, items `9px 10px` at 10.5px, letter-spacing `0.1em`, indexes `display: none`. Wordmark `top: 74px`, gap `0.7em`. Meta `top: 70px`. Headline `clamp(54px, 17vw, 96px)`, `translate(-50%, -60%)`. Copy `bottom: 150px`, width `62vw`, and the first paragraph is `display: none`. Series moves to the left inset, `bottom: 112px`. Hint `bottom: 82px`. Caption `bottom: 80px` with `padding: 0 20px`. Dock gap 6px. Swatches 22px. Buttons `10px 11px`, font 10px, letter-spacing `0.08em`.

A coarse pointer changes the second sentence at any width. It is not tied to these breakpoints.

## Accessibility & robustness

- **`prefers-reduced-motion: reduce`.** A matchMedia listener keeps React state current, including later changes. The intro timeline and the ghost stroke do not run; `intro` is set to 1. Lenis is not created. The ScrollTrigger gets `scrub: false` and no animation. On update, and once at setup, `p > 0.55` sets the timeline to 1 (certificate card) and any other progress sets it to 0 (full sheet). `.pg-hint__line` has `animation: none`. Modal fade and rise have `animation: none`. The engine’s `setStatic(true)` stops drift and evaporation and freezes the clouds.
- **WebGL.** `data-webgl` is `pending`, then `ok` or `failed`. Failure hides the canvas, shows the gradient proof, swaps the second paragraph, and replaces the dock with the static-proof note. Swatches, Clear, and Save render only when WebGL is `ok`, so a dead context cannot offer an export.
- **Images.** There are none to load. The preview is a blob URL. Closing it revokes the URL. If `toBlob` returns null, the modal stays closed.
- **Off-screen.** An IntersectionObserver on the track, plus `visibilitychange`, pauses the engine unless the track is intersecting and the document is visible.
- **`overflow: clip`** is set on `.pg-stage` after `overflow: hidden`. It clips the sticky stage the way `hidden` does, and focus cannot scroll that stage.
- **StrictMode.** The layout effect builds a new `{ intro: 0, scroll: 0 }` on every run and assigns it to `bloomRef` before any tween. Tweens target that object, inside `gsap.context`. Cleanup `revert()`s only that context. A development remount cannot revert the object the live timeline is using.

## Performance notes

- Accumulation targets are `THREE.HalfFloatType`, RGBA, linear filter, no depth, no stencil. Two of them ping-pong. On resize the old target is copied into the new one so existing paint survives.
- `devicePixelRatio` is capped at 2 for the drawing buffer. Accumulation width and height are the CSS pixel size of the sheet, so a droplet stays a similar fraction of the sheet on a phone and on a 2x display. Display grain is `Math.max(1, dpr * 0.85)`.
- The renderer is `antialias: false`, `alpha: false`, `powerPreference: 'high-performance'`, `autoClear: false`, `outputColorSpace: LinearSRGBColorSpace`.
- At most three update passes per frame, 24 splats each. The queue refuses new splats once it holds more than 200.
- Static mode draws on demand. The intersection and visibility pauses cancel the animation frame entirely. A resize or a clear still paints one frame if the loop is stopped.

## Full source code

Create these five files exactly. Do not reformat, rename, or restyle them. `index.html` replaces the Vite template’s `index.html`. The other four replace or sit beside it under `src/`. The template files `App.tsx`, `App.css`, `index.css`, and `vite.svg` are unused; delete them so they are not imported. Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#dcd9d2" />
    <title>Pigment — Oversight Supply</title>
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
import './pigment.css'
import PigmentHero from './PigmentHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PigmentHero />
  </StrictMode>,
)
```

### `src/PigmentHero.tsx`

```tsx
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { PIGMENTS, PigmentEngine, type Pigment } from './PigmentEngine'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  { id: 'spray', label: 'Spray', at: 0 },
  { id: 'bloom', label: 'Bloom', at: 0.4 },
  { id: 'certify', label: 'Certify', at: 1 },
] as const

const WORDMARK = 'HALDE'

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

const pad = (n: number) => String(n).padStart(2, '0')

export default function PigmentHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<PigmentEngine | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const bloomRef = useRef({ intro: 0, scroll: 0 })
  const reduced = usePrefersReducedMotion()

  const [webgl, setWebgl] = useState<'pending' | 'ok' | 'failed'>('pending')
  const [pigment, setPigment] = useState<Pigment>(PIGMENTS[0])
  const [chapter, setChapter] = useState(0)
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
  const [preview, setPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const series = useMemo(() => String(Math.floor(Math.random() * 9000) + 1000), [])
  const stamp = useMemo(() => {
    const d = new Date()
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} — ${pad(d.getHours())}:${pad(d.getMinutes())}`
  }, [])

  const applyBloom = useCallback(() => {
    const { intro, scroll } = bloomRef.current
    engineRef.current?.setBloom(intro * (0.35 + 0.65 * scroll))
  }, [])

  /* ---------------------------------------------------------------- engine */
  useEffect(() => {
    const canvas = canvasRef.current
    const sheet = sheetRef.current
    if (!canvas || !sheet) return
    let engine: PigmentEngine
    try {
      engine = new PigmentEngine(canvas)
    } catch (err) {
      console.warn('[pigment] WebGL unavailable, falling back to static print.', err)
      setWebgl('failed')
      return
    }
    engineRef.current = engine
    setWebgl('ok')
    const { intro, scroll } = bloomRef.current
    engine.setBloom(intro * (0.35 + 0.65 * scroll))

    const ro = new ResizeObserver(() => engine.resize(sheet.offsetWidth, sheet.offsetHeight))
    ro.observe(sheet)
    engine.resize(sheet.offsetWidth, sheet.offsetHeight)

    // only animate while visible
    let inView = true
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
      if (inView && !document.hidden) engine.play()
      else engine.pause()
    })
    if (trackRef.current) io.observe(trackRef.current)
    const onVis = () => (document.hidden || !inView ? engine.pause() : engine.play())
    document.addEventListener('visibilitychange', onVis)
    engine.play()

    const onLost = (e: Event) => {
      e.preventDefault()
      setWebgl('failed')
    }
    canvas.addEventListener('webglcontextlost', onLost)

    return () => {
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('webglcontextlost', onLost)
      engine.dispose()
      engineRef.current = null
    }
  }, [])

  useEffect(() => {
    engineRef.current?.setStatic(reduced)
  }, [reduced, webgl])

  useEffect(() => {
    engineRef.current?.setPigment(pigment)
  }, [pigment, webgl])

  /* --------------------------------------------------------------- pointer */
  useEffect(() => {
    const sheet = sheetRef.current
    if (!sheet || webgl !== 'ok') return
    const toUv = (e: PointerEvent) => {
      const r = sheet.getBoundingClientRect() // post-transform rect, so painting works on the card too
      return { x: (e.clientX - r.left) / r.width, y: 1 - (e.clientY - r.top) / r.height }
    }
    let down = false
    const move = (e: PointerEvent) => {
      const p = toUv(e)
      engineRef.current?.pointerMove(p.x, p.y, down)
    }
    const press = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('button, a')) return
      down = true
      const p = toUv(e)
      engineRef.current?.pointerDown(p.x, p.y)
    }
    const release = () => {
      down = false
      engineRef.current?.pointerUp()
    }
    const leave = () => {
      down = false
      engineRef.current?.pointerLeave()
    }
    sheet.addEventListener('pointermove', move)
    sheet.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    sheet.addEventListener('pointercancel', leave) // touch turned into a scroll
    sheet.addEventListener('pointerleave', leave)
    return () => {
      sheet.removeEventListener('pointermove', move)
      sheet.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      sheet.removeEventListener('pointercancel', leave)
      sheet.removeEventListener('pointerleave', leave)
    }
  }, [webgl])

  /* ------------------------------------------------- smooth scroll (Lenis) */
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  /* ------------------------------------------------ intro + scroll timeline */
  useLayoutEffect(() => {
    const track = trackRef.current
    const sheet = sheetRef.current
    if (!track || !sheet) return

    // fresh tween target per run: StrictMode's revert of a previous run must not touch the live one
    const bloom = { intro: 0, scroll: 0 }
    bloomRef.current = bloom

    const ctx = gsap.context(() => {
      // ---- intro
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
      const ghost = { t: 0 }
      if (reduced) {
        bloom.intro = 1
        applyBloom()
      } else {
        intro
          .from('.pg-wordmark span', { opacity: 0, y: 12, duration: 1.2, stagger: 0.08 })
          .from('.pg-head .wi', { opacity: 0, filter: 'blur(18px)', y: 30, duration: 1.8, stagger: 0.09 }, 0.1)
          .from('.pg-meta, .pg-copy, .pg-series, .pg-nav, .pg-dock, .pg-hint__in', { opacity: 0, duration: 1.2, stagger: 0.05 }, 0.5)
          .to(bloom, { intro: 1, duration: 2.6, ease: 'power2.out', onUpdate: applyBloom }, 0)
          // a ghost "signature" stroke hints that the surface can be painted
          .to(
            ghost,
            {
              t: 1,
              duration: 1.8,
              ease: 'power1.inOut',
              onUpdate() {
                const t = ghost.t
                const x = 0.56 + t * 0.3
                const y = 0.26 + Math.sin(t * Math.PI * 1.4) * 0.09 + t * 0.12
                engineRef.current?.splat(x, y, 0.028, 0.3)
              },
            },
            0.9,
          )
      }

      // ---- scroll timeline (pinned by CSS sticky; GSAP only scrubs values)
      const cardScale = () => {
        const w = window.innerWidth
        const h = window.innerHeight
        const byHeight = (h - (w < 700 ? 230 : 210)) / h
        return Math.max(0.42, Math.min(w < 700 ? 0.78 : 0.64, byHeight))
      }

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      tl.to(bloom, { scroll: 1, duration: 0.5, onUpdate: applyBloom }, 0)
        .to('.pg-hint', { opacity: 0, duration: 0.08 }, 0)
        .to('.pg-head .w', { opacity: 0, filter: 'blur(14px)', yPercent: -35, duration: 0.2, stagger: 0.025 }, 0.26)
        .to(sheet, {
          scale: cardScale,
          yPercent: -3,
          borderRadius: () => 16 / cardScale(),
          boxShadow: '0 40px 90px -30px rgba(30, 34, 20, 0.35)',
          duration: 0.4,
          ease: 'power2.inOut',
        }, 0.44)
        .fromTo('.pg-cert', { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.15 }, 0.66)
        .fromTo('.pg-caption', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.12 }, 0.78)
        .to({}, { duration: 0.1 }) // hold on the certificate

      const st = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        animation: reduced ? undefined : tl,
        scrub: reduced ? false : 0.6,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress
          setChapter(p > 0.8 ? 2 : p > 0.25 ? 1 : 0)
          if (reduced) tl.progress(p > 0.55 ? 1 : 0) // discrete states, no motion
        },
      })
      triggerRef.current = st
      if (reduced) tl.progress(st.progress > 0.55 ? 1 : 0)
    }, stageRef)

    return () => {
      triggerRef.current = null
      ctx.revert()
    }
  }, [reduced, applyBloom])

  /* --------------------------------------------------------------- actions */
  const goTo = (at: number) => {
    const st = triggerRef.current
    if (!st) return
    const y = st.start + at * (st.end - st.start)
    if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: 1.6 })
    else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' })
  }

  const clear = () => engineRef.current?.clear()

  const saveCertificate = async () => {
    const engine = engineRef.current
    if (!engine || saving) return
    setSaving(true)
    try {
      await document.fonts.ready
      const shot = engine.snapshot()
      const W = shot.width
      const H = shot.height
      const u = W / (sheetRef.current?.offsetWidth || W) // css px → device px
      const out = document.createElement('canvas')
      out.width = W
      out.height = H
      const g = out.getContext('2d')!
      g.drawImage(shot, 0, 0)
      g.fillStyle = '#1b1e16'
      g.textBaseline = 'top'
      const m = 32 * u
      g.font = `500 ${18 * u}px "Inter Variable", system-ui, sans-serif`
      g.letterSpacing = `${14 * u}px`
      g.fillText(WORDMARK, m, m)
      g.letterSpacing = '0px'
      g.textAlign = 'right'
      g.font = `italic ${26 * u}px "Instrument Serif", Georgia, serif`
      g.fillText(`Series No. ${series}`, W - m, H - m - 26 * u)
      g.textAlign = 'center'
      g.textBaseline = 'middle'
      g.font = `400 ${Math.max(22, Math.min(40, W / u / 26)) * u}px "Inter Variable", system-ui, sans-serif`
      g.fillText('Certificate of Originality', W / 2, H / 2)
      g.textAlign = 'left'
      g.textBaseline = 'top'
      g.font = `400 ${12 * u}px "Inter Variable", system-ui, sans-serif`
      ;['Composed by hand in a live session.', stamp, 'No identical reproductions exist.'].forEach((line, i) =>
        g.fillText(line, m, H - m - 48 * u + i * 17 * u),
      )
      const blob = await new Promise<Blob | null>((res) => out.toBlob(res, 'image/png'))
      if (!blob) throw new Error('Could not encode image')
      setPreview(URL.createObjectURL(blob))
    } catch (err) {
      console.error('[pigment] export failed', err)
    } finally {
      setSaving(false)
    }
  }

  const closePreview = () => {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
  }

  useEffect(() => {
    if (!preview) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closePreview()
    window.addEventListener('keydown', onKey)
    lenisRef.current?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      lenisRef.current?.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview])

  const headline = ['No', 'two', 'marks', 'are', 'alike.']

  return (
    <main className="pg-root" data-webgl={webgl}>
      <section ref={trackRef} className="pg-track" aria-label="Pigment — an interactive, paintable hero">
        <div ref={stageRef} className="pg-stage">
          <nav className="pg-nav" aria-label="Section chapters">
            <div className="pg-nav__pill">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  className={`pg-nav__item${chapter === i ? ' is-active' : ''}`}
                  aria-current={chapter === i ? 'step' : undefined}
                  onClick={() => goTo(c.at)}
                >
                  <span className="pg-nav__idx">0{i + 1}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </nav>

          <div ref={sheetRef} className="pg-sheet">
            <canvas ref={canvasRef} className="pg-canvas" aria-hidden="true" />
            <div className="pg-fallback" aria-hidden="true" />

            <div className="pg-wordmark" aria-label={WORDMARK}>
              {WORDMARK.split('').map((l, i) => (
                <span key={i} aria-hidden="true">{l}</span>
              ))}
            </div>
            <div className="pg-meta">
              <span className="pg-meta__idx">[04]</span>
              <span className="pg-meta__name">Mosswork</span>
            </div>

            <h1 className="pg-head">
              {headline.map((w, i) => (
                <span key={i}>
                  <span className="w"><span className="wi">{w}</span></span>
                  {i === 1 ? <br /> : ' '}
                </span>
              ))}
            </h1>
            <p className="pg-cert" aria-hidden={chapter < 2}>Certificate of Originality</p>

            <div className="pg-copy">
              <p>This surface is painted live, by hand — yours.</p>
              <p>
                {webgl === 'failed'
                  ? 'Live pigment needs WebGL, which is unavailable in this browser. This is a printed proof.'
                  : isTouch
                    ? 'Tap and hold to spray, drag sideways to draw. Each piece is uniquely composed.'
                    : 'Move to spray pigment, press and hold to deepen it. Each piece is uniquely composed.'}
              </p>
            </div>
            <div className="pg-series">
              Original Series No. <em>{series}</em>
            </div>
          </div>

          <div className="pg-hint" aria-hidden="true">
            <span className="pg-hint__in">
              <span className="pg-hint__line" />
              Scroll to certify
            </span>
          </div>

          <div className="pg-caption" aria-hidden={chapter < 2}>
            Composed by you · {stamp}
          </div>

          <div className="pg-dock" role="toolbar" aria-label="Pigment controls">
            {webgl === 'ok' && (
              <>
                <div className="pg-swatches" role="radiogroup" aria-label="Pigment colour">
                  {PIGMENTS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={pigment.id === p.id}
                      aria-label={p.label}
                      title={p.label}
                      className={`pg-swatch${pigment.id === p.id ? ' is-active' : ''}`}
                      style={{ ['--c' as string]: p.core, ['--e' as string]: p.edge }}
                      onClick={() => setPigment(p)}
                    />
                  ))}
                </div>
                <span className="pg-dock__sep" />
                <button type="button" className="pg-btn" onClick={clear}>Clear</button>
                <button type="button" className="pg-btn pg-btn--solid" onClick={saveCertificate} disabled={saving}>
                  {saving ? 'Rendering…' : 'Save certificate'}
                </button>
              </>
            )}
            {webgl === 'failed' && <span className="pg-dock__note">Static proof — WebGL unavailable</span>}
          </div>
        </div>
      </section>

      {preview && (
        <div className="pg-modal" role="dialog" aria-modal="true" aria-label="Your certificate" onClick={closePreview}>
          <figure className="pg-modal__card" onClick={(e) => e.stopPropagation()}>
            <img src={preview} alt={`Certificate of Originality, series number ${series}`} />
            <figcaption>
              <span>Series No. {series}</span>
              <span className="pg-modal__actions">
                <a className="pg-btn pg-btn--solid" href={preview} download={`certificate-${series}.png`}>Download PNG</a>
                <button type="button" className="pg-btn" onClick={closePreview} autoFocus>Close</button>
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  )
}
```

### `src/PigmentEngine.ts`

```ts
import * as THREE from 'three'

/**
 * PigmentEngine
 * A two-pass WebGL renderer that imitates airbrushed / spray-painted pigment on paper.
 *  1. "accumulate" pass (ping-pong render targets): pointer splats are added into a
 *     premultiplied colour buffer that slowly drifts (curl-ish noise) and evaporates.
 *  2. "display" pass: user pigment + ambient pigment clouds are turned into a stochastic,
 *     speckled print (per-pixel threshold) on top of a grainy paper colour.
 */

export type Pigment = { id: string; label: string; core: string; edge: string }

export const PIGMENTS: Pigment[] = [
  { id: 'moss', label: 'Moss', core: '#2f4a17', edge: '#62812d' },
  { id: 'ink', label: 'Ink', core: '#1b2033', edge: '#46507a' },
  { id: 'ochre', label: 'Ochre', core: '#7a3f14', edge: '#b8762f' },
]

const MAX_SPLATS = 24

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`

const COMMON = /* glsl */ `
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x),
             mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return v;
}`

const UPDATE_FRAG = /* glsl */ `
${COMMON}
uniform sampler2D uPrev;
uniform vec2 uRes;
uniform float uTime;
uniform float uDecay;
uniform float uDrift;
uniform float uAspect;
uniform float uFrame;
uniform vec4 uSplats[${MAX_SPLATS}];
uniform int uCount;
uniform vec3 uCore;
uniform vec3 uEdge;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  // wet drift: rotated gradient of a slow noise field (cheap curl noise)
  vec2 q = uv * vec2(uAspect, 1.0) * 2.2 + uTime * 0.025;
  float e = 0.01;
  float nx1 = vnoise(q + vec2(e, 0.0)), nx2 = vnoise(q - vec2(e, 0.0));
  float ny1 = vnoise(q + vec2(0.0, e)), ny2 = vnoise(q - vec2(0.0, e));
  vec2 curl = vec2(ny1 - ny2, -(nx1 - nx2)) / (2.0 * e);
  vec4 prev = texture2D(uPrev, uv - curl * uDrift / vec2(uAspect, 1.0));
  prev *= uDecay;

  vec2 px = uv * uRes;
  for (int i = 0; i < ${MAX_SPLATS}; i++) {
    if (i >= uCount) break;
    vec4 s = uSplats[i];              // xy = position (uv), z = radius, w = strength
    vec2 d = (uv - s.xy) * vec2(uAspect, 1.0);
    float r = s.z;
    float dd = dot(d, d);
    float core = exp(-dd / (r * r));
    core *= 0.55 + 0.9 * vnoise(px * 0.06 + s.xy * 40.0);       // ragged, fibrous edge
    float mistMask = exp(-dd / (r * r * 7.0));
    float droplet = step(0.985 - 0.02 * s.w, hash12(floor(px) + uFrame * 17.31 + float(i) * 3.1));
    float add = (core * 0.22 + mistMask * droplet * 0.9) * s.w;
    vec3 col = mix(uEdge, uCore, clamp(core * 1.3, 0.0, 1.0));
    prev.rgb += col * add;
    prev.a += add;
  }
  if (prev.a > 1.6) prev *= 1.6 / prev.a;
  gl_FragColor = prev;
}`

const DISPLAY_FRAG = /* glsl */ `
${COMMON}
uniform sampler2D uAccum;
uniform float uTime;
uniform float uBloom;
uniform float uAspect;
uniform float uGrain;
uniform vec4 uBlobs[6];
uniform vec3 uPaper;
uniform vec3 uAmbCore;
uniform vec3 uAmbEdge;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 px = floor(gl_FragCoord.xy / uGrain);
  vec4 acc = texture2D(uAccum, uv);
  float ua = acc.a;
  vec3 ucol = acc.rgb / max(ua, 1e-4);

  // ambient pigment clouds (driven from JS: position, radius, strength)
  vec2 p = uv * vec2(uAspect, 1.0);
  float warp = fbm(p * 3.2 + vec2(uTime * 0.015, -uTime * 0.01));
  float amb = 0.0;
  for (int i = 0; i < 6; i++) {
    vec4 b = uBlobs[i];
    vec2 d = (uv - b.xy) * vec2(uAspect, 1.0);
    float r = b.z * (0.65 + warp * 0.9);
    amb += exp(-dot(d, d) / (r * r)) * b.w;
  }
  amb *= uBloom;

  float h1 = hash12(px);
  float h2 = hash12(px + 91.7);
  float ambCover = step(h1, smoothstep(0.03, 0.95, amb));
  float userCover = step(h2 * 0.9 + 0.02, ua);

  vec3 col = uPaper * (1.0 + (hash12(px * 1.37 + 7.0) - 0.5) * 0.05);  // paper tooth
  vec3 ambCol = mix(uAmbEdge, uAmbCore, smoothstep(0.35, 1.1, amb));
  col = mix(col, mix(col, ambCol, 0.14), clamp(amb, 0.0, 1.0));        // faint wash
  col = mix(col, ambCol, ambCover * 0.94);
  col = mix(col, mix(col, ucol, 0.2), clamp(ua * 1.5, 0.0, 1.0));
  col = mix(col, ucol, userCover * 0.95);
  gl_FragColor = vec4(col, 1.0);
}`

const COPY_FRAG = /* glsl */ `
uniform sampler2D uSrc;
varying vec2 vUv;
void main() { gl_FragColor = texture2D(uSrc, vUv); }`

type Blob = { x: number; y: number; r: number; s: number; ax: number; ay: number; sp: number; ph: number }

// Ambient composition, loosely placed like a hand-sprayed print (uv, y up).
const BLOBS: Blob[] = [
  { x: 0.03, y: 0.5, r: 0.15, s: 1.15, ax: 0.02, ay: 0.015, sp: 0.11, ph: 0.0 },
  { x: 0.22, y: 0.97, r: 0.08, s: 0.55, ax: 0.03, ay: 0.01, sp: 0.09, ph: 1.3 },
  { x: 0.7, y: 0.2, r: 0.1, s: 1.0, ax: 0.015, ay: 0.02, sp: 0.13, ph: 2.1 },
  { x: 0.95, y: 0.36, r: 0.12, s: 1.05, ax: 0.02, ay: 0.02, sp: 0.1, ph: 3.7 },
  { x: 0.99, y: 0.58, r: 0.07, s: 0.8, ax: 0.01, ay: 0.03, sp: 0.12, ph: 4.4 },
  { x: 0.42, y: 0.93, r: 0.05, s: 0.35, ax: 0.04, ay: 0.01, sp: 0.08, ph: 5.2 },
]

const hexToVec3 = (hex: string) => {
  const c = new THREE.Color(hex)
  return new THREE.Vector3(c.r, c.g, c.b)
}

export class PigmentEngine {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private quad: THREE.Mesh
  private rtA: THREE.WebGLRenderTarget
  private rtB: THREE.WebGLRenderTarget
  private updateMat: THREE.ShaderMaterial
  private displayMat: THREE.ShaderMaterial
  private copyMat: THREE.ShaderMaterial
  private queue: THREE.Vector4[] = []
  private last: { x: number; y: number } | null = null
  private pressed = false
  private pressPoint: { x: number; y: number } | null = null
  private raf = 0
  private running = false
  private start = performance.now()
  private frame = 0
  private width = 1
  private height = 1
  private bloom = 0
  private staticMode = false
  private dirty = true
  pigment: Pigment = PIGMENTS[0]

  constructor(private canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    })
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    this.renderer.autoClear = false

    this.rtA = this.makeTarget(2, 2)
    this.rtB = this.makeTarget(2, 2)

    this.updateMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: UPDATE_FRAG,
      uniforms: {
        uPrev: { value: null },
        uRes: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uDecay: { value: 0.9993 },
        uDrift: { value: 0.00035 },
        uAspect: { value: 1 },
        uFrame: { value: 0 },
        uSplats: { value: Array.from({ length: MAX_SPLATS }, () => new THREE.Vector4()) },
        uCount: { value: 0 },
        uCore: { value: hexToVec3(this.pigment.core) },
        uEdge: { value: hexToVec3(this.pigment.edge) },
      },
      depthTest: false,
      depthWrite: false,
    })

    this.displayMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: DISPLAY_FRAG,
      uniforms: {
        uAccum: { value: null },
        uTime: { value: 0 },
        uBloom: { value: 0 },
        uAspect: { value: 1 },
        uGrain: { value: 1 },
        uBlobs: { value: BLOBS.map(() => new THREE.Vector4()) },
        uPaper: { value: hexToVec3('#ebe8e1') },
        uAmbCore: { value: hexToVec3('#34511a') },
        uAmbEdge: { value: hexToVec3('#5f7f2c') },
      },
      depthTest: false,
      depthWrite: false,
    })

    this.copyMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: COPY_FRAG,
      uniforms: { uSrc: { value: null } },
      depthTest: false,
      depthWrite: false,
    })

    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.displayMat)
    this.scene.add(this.quad)
  }

  private makeTarget(w: number, h: number) {
    return new THREE.WebGLRenderTarget(w, h, {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    })
  }

  /** Resize drawing buffer; existing pigment is carried over into the new buffers. */
  resize(width: number, height: number) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.width = Math.max(1, Math.round(width))
    this.height = Math.max(1, Math.round(height))
    this.renderer.setPixelRatio(dpr)
    this.renderer.setSize(this.width, this.height, false)

    // accumulation buffer at CSS-pixel resolution (droplets stay a consistent size)
    const aw = Math.max(2, Math.round(this.width))
    const ah = Math.max(2, Math.round(this.height))
    const nextA = this.makeTarget(aw, ah)
    const nextB = this.makeTarget(aw, ah)
    this.copyMat.uniforms.uSrc.value = this.rtA.texture
    this.pass(this.copyMat, nextA)
    this.rtA.dispose()
    this.rtB.dispose()
    this.rtA = nextA
    this.rtB = nextB

    const aspect = this.width / this.height
    this.updateMat.uniforms.uRes.value.set(aw, ah)
    this.updateMat.uniforms.uAspect.value = aspect
    this.displayMat.uniforms.uAspect.value = aspect
    this.displayMat.uniforms.uGrain.value = Math.max(1, dpr * 0.85)
    this.dirty = true
    if (!this.running) this.renderFrame(performance.now())
  }

  private pass(mat: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget | null) {
    this.quad.material = mat
    this.renderer.setRenderTarget(target)
    this.renderer.render(this.scene, this.camera)
  }

  setPigment(p: Pigment) {
    this.pigment = p
    this.updateMat.uniforms.uCore.value = hexToVec3(p.core)
    this.updateMat.uniforms.uEdge.value = hexToVec3(p.edge)
  }

  setBloom(v: number) {
    this.bloom = v
    this.dirty = true
  }

  /** Reduced motion: no drift, frozen clouds, render only when something changes. */
  setStatic(isStatic: boolean) {
    this.staticMode = isStatic
    this.updateMat.uniforms.uDrift.value = isStatic ? 0 : 0.00035
    this.updateMat.uniforms.uDecay.value = isStatic ? 1 : 0.9993
    this.dirty = true
  }

  /** Pointer in uv space (0..1, y up). `down` = pressed / touching. */
  pointerMove(x: number, y: number, down: boolean) {
    this.pressed = down
    const radius = down ? 0.05 : 0.032
    const strength = down ? 0.55 : 0.22
    if (this.last) {
      const dx = (x - this.last.x) * (this.width / this.height)
      const dy = y - this.last.y
      const dist = Math.hypot(dx, dy)
      if (dist > 0.3) {
        // a jump (e.g. pointer re-entering) – don't draw a line across the sheet
        this.last = { x, y }
        return
      }
      const steps = Math.min(10, Math.ceil(dist / (radius * 0.35)))
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        this.splat(this.last.x + (x - this.last.x) * t, this.last.y + (y - this.last.y) * t, radius, strength)
      }
    }
    this.last = { x, y }
    this.pressPoint = down ? { x, y } : null
  }

  pointerDown(x: number, y: number) {
    this.pressed = true
    this.pressPoint = { x, y }
    this.last = { x, y }
    this.splat(x, y, 0.06, 0.9)
  }

  pointerUp() {
    this.pressed = false
    this.pressPoint = null
  }

  pointerLeave() {
    this.last = null
    this.pointerUp()
  }

  splat(x: number, y: number, radius: number, strength: number) {
    if (this.queue.length > 200) return
    this.queue.push(new THREE.Vector4(x, y, radius, strength))
    this.dirty = true
  }

  clear() {
    for (const rt of [this.rtA, this.rtB]) {
      this.renderer.setRenderTarget(rt)
      this.renderer.setClearColor(0x000000, 0)
      this.renderer.clear()
    }
    this.renderer.setRenderTarget(null)
    this.dirty = true
    if (!this.running) this.renderFrame(performance.now())
  }

  private renderFrame(now: number) {
    const t = this.staticMode ? 0 : (now - this.start) / 1000
    this.frame++

    // holding still while pressed keeps deepening the colour
    if (this.pressed && this.pressPoint) {
      this.splat(this.pressPoint.x, this.pressPoint.y, 0.055, 0.35)
    }

    const needsUpdate = !this.staticMode || this.queue.length > 0
    if (needsUpdate) {
      // run as many update passes as needed to flush queued splats (max 3 per frame)
      let passes = 0
      do {
        const batch = this.queue.splice(0, MAX_SPLATS)
        const u = this.updateMat.uniforms
        batch.forEach((s, i) => u.uSplats.value[i].copy(s))
        u.uCount.value = batch.length
        u.uPrev.value = this.rtA.texture
        u.uTime.value = t
        u.uFrame.value = this.frame + passes
        this.pass(this.updateMat, this.rtB)
        const tmp = this.rtA
        this.rtA = this.rtB
        this.rtB = tmp
        passes++
      } while (this.queue.length > 0 && passes < 3)
    }

    const d = this.displayMat.uniforms
    BLOBS.forEach((b, i) => {
      const k = t * b.sp + b.ph
      d.uBlobs.value[i].set(
        b.x + Math.sin(k) * b.ax,
        b.y + Math.cos(k * 0.8) * b.ay,
        b.r * (0.5 + this.bloom * 1.2),
        b.s,
      )
    })
    d.uBloom.value = Math.min(1, this.bloom * 1.6)
    d.uTime.value = t
    d.uAccum.value = this.rtA.texture
    this.pass(this.displayMat, null)
    this.dirty = false
  }

  private loop = (now: number) => {
    if (!this.running) return
    if (!this.staticMode || this.dirty || this.pressed) this.renderFrame(now)
    this.raf = requestAnimationFrame(this.loop)
  }

  play() {
    if (this.running) return
    this.running = true
    this.raf = requestAnimationFrame(this.loop)
  }

  pause() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  /** Render once and return the current frame as a canvas (for exporting). */
  snapshot(): HTMLCanvasElement {
    this.renderFrame(performance.now())
    const out = document.createElement('canvas')
    out.width = this.canvas.width
    out.height = this.canvas.height
    out.getContext('2d')!.drawImage(this.canvas, 0, 0)
    return out
  }

  dispose() {
    this.pause()
    this.rtA.dispose()
    this.rtB.dispose()
    this.updateMat.dispose()
    this.displayMat.dispose()
    this.copyMat.dispose()
    this.quad.geometry.dispose()
    this.renderer.dispose()
  }
}
```

### `src/pigment.css`

```css
/* Pigment — interactive airbrush hero */
:root {
  --pg-paper: #ebe8e1;
  --pg-bg: #dcd9d2;
  --pg-ink: #1b1e16;
  --pg-ink-soft: rgba(27, 30, 22, 0.62);
  --pg-moss: #34511a;
  --pg-lime: #c6e05a;
  --pg-serif: 'Instrument Serif', 'Times New Roman', serif;
  --pg-sans: 'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif;
  --pg-mono: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', monospace;
}

*,
*::before,
*::after { box-sizing: border-box; }

html, body { margin: 0; background: var(--pg-bg); color: var(--pg-ink); }
body { font-family: var(--pg-sans); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

.pg-root { position: relative; }

.pg-track {
  position: relative;
  height: 340vh;
}

.pg-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  overflow: clip; /* like hidden, but focus can never scroll the pinned stage */
  background: var(--pg-bg);
}

/* ------------------------------------------------------------------ sheet */
.pg-sheet {
  position: absolute;
  inset: 0;
  background: var(--pg-paper);
  overflow: hidden;
  transform-origin: 50% 50%;
  will-change: transform;
  cursor: crosshair;
  touch-action: pan-y;         /* vertical drags scroll, taps / sideways drags paint */
  user-select: none;
  -webkit-user-select: none;
}

.pg-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.pg-fallback { display: none; }
[data-webgl='failed'] .pg-canvas { display: none; }
[data-webgl='failed'] .pg-fallback {
  display: block;
  position: absolute;
  inset: 0;
  background:
    radial-gradient(22vmax 18vmax at 4% 8%, rgba(52, 81, 26, 0.9), transparent 70%),
    radial-gradient(10vmax 9vmax at 70% 80%, rgba(52, 81, 26, 0.85), transparent 70%),
    radial-gradient(12vmax 14vmax at 98% 62%, rgba(95, 127, 44, 0.85), transparent 70%),
    var(--pg-paper);
  filter: blur(2px);
}

.pg-wordmark {
  position: absolute;
  top: clamp(20px, 3.4vw, 40px);
  left: clamp(20px, 3.4vw, 44px);
  display: flex;
  gap: 0.9em;
  font-size: clamp(15px, 1.35vw, 20px);
  font-weight: 450;
  letter-spacing: 0.04em;
  pointer-events: none;
}
.pg-wordmark span { display: inline-block; }

.pg-meta {
  position: absolute;
  top: clamp(18px, 3.2vw, 38px);
  right: clamp(20px, 3.4vw, 44px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1;
  pointer-events: none;
}
.pg-meta__idx { font-family: var(--pg-mono); font-size: 11px; letter-spacing: 0.08em; margin-bottom: 4px; }
.pg-meta__name { font-family: var(--pg-serif); font-style: italic; font-size: clamp(20px, 1.9vw, 28px); }

.pg-head {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -54%);
  width: min(94vw, 1500px);
  margin: 0;
  text-align: center;
  font-family: var(--pg-serif);
  font-weight: 400;
  font-size: clamp(58px, 11.4vw, 210px);
  line-height: 0.86;
  letter-spacing: -0.035em;
  pointer-events: none;
  text-wrap: balance;
}
.pg-head .w,
.pg-head .wi { display: inline-block; will-change: transform, filter, opacity; }
.pg-head span:nth-child(3) .wi { font-style: italic; }

.pg-cert {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: clamp(22px, 2.6vw, 44px);
  font-weight: 400;
  letter-spacing: -0.01em;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
}

.pg-copy {
  position: absolute;
  left: clamp(20px, 3.4vw, 44px);
  bottom: 100px;
  width: min(270px, 60vw);
  font-size: 12.5px;
  line-height: 1.38;
  pointer-events: none;
}
.pg-copy p { margin: 0 0 0.9em; }
.pg-copy p:last-child { margin: 0; color: var(--pg-ink-soft); }

.pg-series {
  position: absolute;
  right: clamp(20px, 3.4vw, 44px);
  bottom: 100px;
  font-size: clamp(13px, 1.1vw, 16px);
  font-weight: 600;
  font-style: italic;
  pointer-events: none;
  white-space: nowrap;
}
.pg-series em {
  font-family: var(--pg-serif);
  font-weight: 400;
  font-size: 1.9em;
  letter-spacing: 0.02em;
  border-bottom: 1px solid currentColor;
  padding: 0 0.15em;
  margin-left: 0.2em;
}

/* -------------------------------------------------------------------- nav */
.pg-nav {
  position: absolute;
  z-index: 5;
  top: clamp(16px, 2.6vw, 30px);
  left: 50%;
  transform: translateX(-50%);
}
.pg-nav__pill {
  display: flex;
  gap: 4px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(250, 249, 242, 0.62);
  box-shadow: 0 0 40px 12px rgba(250, 249, 242, 0.55), inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
}
.pg-nav__item {
  position: relative;
  appearance: none;
  border: 0;
  background: transparent;
  font: 500 12px/1 var(--pg-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pg-ink);
  padding: 10px 14px;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  transition: background 0.3s ease;
}
.pg-nav__idx { font-size: 9px; opacity: 0.5; }
.pg-nav__item:hover { background: rgba(27, 30, 22, 0.06); }
.pg-nav__item:focus-visible { outline: 1px solid var(--pg-ink); outline-offset: 2px; }
/* lime corner brackets on the active chapter */
.pg-nav__item::before,
.pg-nav__item::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.pg-nav__item::before { left: 2px; top: 2px; border-left: 1.5px solid var(--pg-moss); border-top: 1.5px solid var(--pg-moss); transform: translate(-4px, -4px); }
.pg-nav__item::after { right: 2px; bottom: 2px; border-right: 1.5px solid var(--pg-moss); border-bottom: 1.5px solid var(--pg-moss); transform: translate(4px, 4px); }
.pg-nav__item.is-active::before,
.pg-nav__item.is-active::after { opacity: 1; transform: none; }

/* ------------------------------------------------------------- hint/dock */
.pg-hint {
  position: absolute;
  z-index: 4;
  left: 50%;
  bottom: 88px;
  transform: translateX(-50%);
  pointer-events: none;
}
.pg-hint__in {
  display: flex;
  align-items: center;
  gap: 10px;
  font: 500 10.5px/1 var(--pg-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--pg-ink-soft);
}
.pg-hint__line {
  width: 36px;
  height: 1px;
  background: currentColor;
  transform-origin: left;
  animation: pg-line 2.4s cubic-bezier(0.7, 0, 0.3, 1) infinite;
}
@keyframes pg-line {
  0% { transform: scaleX(0); transform-origin: left; }
  50% { transform: scaleX(1); transform-origin: left; }
  51% { transform-origin: right; }
  100% { transform: scaleX(0); transform-origin: right; }
}

.pg-caption {
  position: absolute;
  z-index: 4;
  left: 0;
  right: 0;
  bottom: 86px;
  text-align: center;
  font: 500 10.5px/1.4 var(--pg-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pg-ink-soft);
  opacity: 0;
  pointer-events: none;
}

.pg-dock {
  position: absolute;
  z-index: 5;
  left: 50%;
  bottom: clamp(16px, 2.4vw, 26px);
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 6px 6px 10px;
  border-radius: 999px;
  background: rgba(250, 249, 242, 0.7);
  box-shadow: 0 10px 30px -12px rgba(30, 34, 20, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  white-space: nowrap;
}
.pg-dock__sep { width: 1px; height: 20px; background: rgba(27, 30, 22, 0.15); margin: 0 2px; }
.pg-dock__note { font: 500 10.5px/1 var(--pg-mono); letter-spacing: 0.1em; text-transform: uppercase; padding: 10px 8px; }

.pg-swatches { display: flex; gap: 6px; }
.pg-swatch {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 0;
  padding: 0;
  cursor: pointer;
  background: radial-gradient(circle at 35% 35%, var(--e), var(--c) 70%);
  box-shadow: 0 0 0 2px transparent, 0 0 0 3px transparent;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.pg-swatch:hover { transform: scale(1.08); }
.pg-swatch.is-active { box-shadow: 0 0 0 2px var(--pg-paper), 0 0 0 3.5px var(--c); }
.pg-swatch:focus-visible { outline: 1px solid var(--pg-ink); outline-offset: 4px; }

.pg-btn {
  appearance: none;
  border: 1px solid rgba(27, 30, 22, 0.2);
  background: transparent;
  color: var(--pg-ink);
  font: 500 11px/1 var(--pg-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 11px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.pg-btn:hover { background: rgba(27, 30, 22, 0.07); }
.pg-btn:focus-visible { outline: 1px solid var(--pg-ink); outline-offset: 2px; }
.pg-btn--solid { background: var(--pg-ink); color: var(--pg-paper); border-color: var(--pg-ink); }
.pg-btn--solid:hover { background: var(--pg-moss); border-color: var(--pg-moss); }
.pg-btn:disabled { opacity: 0.6; cursor: progress; }

/* ------------------------------------------------------------------ modal */
.pg-modal {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(220, 217, 210, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  animation: pg-fade 0.4s ease both;
}
.pg-modal__card {
  margin: 0;
  width: min(900px, 100%);
  animation: pg-rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.pg-modal__card img {
  display: block;
  width: 100%;
  max-height: 72vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 40px 90px -30px rgba(30, 34, 20, 0.45);
}
.pg-modal__card figcaption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
  font: 500 11px/1 var(--pg-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.pg-modal__actions { display: flex; gap: 8px; }
@keyframes pg-fade { from { opacity: 0; } }
@keyframes pg-rise { from { opacity: 0; transform: translateY(24px) scale(0.98); } }

/* ------------------------------------------------------------- responsive */
@media (max-width: 900px) {
  .pg-copy { width: min(240px, 56vw); font-size: 12px; }
}

@media (max-width: 640px) {
  .pg-nav { top: 14px; }
  .pg-nav__pill { padding: 4px; }
  .pg-nav__item { padding: 9px 10px; font-size: 10.5px; letter-spacing: 0.1em; }
  .pg-nav__idx { display: none; }
  .pg-wordmark { top: 74px; gap: 0.7em; }
  .pg-meta { top: 70px; }
  .pg-head { font-size: clamp(54px, 17vw, 96px); transform: translate(-50%, -60%); }
  .pg-copy { bottom: 150px; width: 62vw; }
  .pg-copy p:first-child { display: none; }
  .pg-series { bottom: 112px; right: auto; left: clamp(20px, 3.4vw, 44px); }
  .pg-hint { bottom: 82px; }
  .pg-caption { bottom: 80px; padding: 0 20px; }
  .pg-dock { gap: 6px; padding: 5px 5px 5px 8px; }
  .pg-swatch { width: 22px; height: 22px; }
  .pg-btn { padding: 10px 11px; font-size: 10px; letter-spacing: 0.08em; }
}

@media (prefers-reduced-motion: reduce) {
  .pg-hint__line { animation: none; transform: none; }
  .pg-modal, .pg-modal__card { animation: none; }
}
```

## Assets

Pigment has no image assets. Do not download or generate any. The sheet, the paper tooth, the ambient clouds, and the visitor’s paint are the shaders in `src/PigmentEngine.ts`. There is no grain image and no photograph.

## Build / run

```
npm create vite@latest pigment -- --template react-ts
cd pigment
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 three@^0.178.0 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @types/three@^0.178.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Drop in the five files from **Full source code**, then:

```
npm run dev
```

`src/main.tsx` mounts `<PigmentHero />` inside `<StrictMode>` as the only child of `#root`. The hero is the whole page, so the dev URL works on its own or inside an iframe.

## Limitations

- Live paint needs WebGL. If the context cannot be created, or it is lost, the page shows the static gradient proof, the type, and the scroll to the certificate line. Clear, the swatches, and Save are not shown.
- `Download PNG` can be blocked in a sandboxed iframe that does not set `allow-downloads`. The modal still shows the image, so it can be saved from the preview.
- The series number and the time stamp are created in the browser for that visit. They are not stored.
- No APIs, keys, or accounts are needed.
