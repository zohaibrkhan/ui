<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Cyanotype

Cyanotype is a full-page hero of a sun-print table. Seven procedural cuttings — fern, ginkgo, Queen Anne’s lace, oxeye daisy, wild oat, maidenhair, and English oak — sit on and around a coated sheet. Drag one onto the paper. Click or tap it to turn it 30 degrees. Hold the sun and the sheet exposes wherever a cutting does not shade it, at `0.3` of full exposure per second, up toward 12 minutes on the ring. Scroll rinses the sheet: the water rises, the yellow-green sensitiser runs off, and Prussian blue `#173b8a` stays. The paper then hangs on a dark blue wall with two pegs. If you scroll before you have exposed it, the sheet is given 9 minutes of sun so it does not go into the water blank.

Rebuild it as the only thing on the page. Create the files in **Full source code** at the paths in their headings, with those contents exactly. There are no image files.

## Stack & dependencies

React 19, TypeScript, and Vite. The intro and the scroll story are `gsap` with `ScrollTrigger`. Smooth scrolling is `lenis`, only when the visitor has not asked for reduced motion. The print is Canvas 2D (`PrintEngine`), 800×1000. The cuttings are SVG paths from `specimens.ts`, and the same paths are `Path2D` shadows on the print. This section does not use `three` or WebGL.

Fonts, imported in `src/main.tsx`:

- `@fontsource/instrument-serif` at 400 and 400 italic — the wordmark, the headline, the note, the finale title
- `@fontsource-variable/inter` — the page’s default sans and the aside
- `@fontsource/ibm-plex-mono` at 500 — the header, the sun label, the dock, the kicker, the buttons

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Table `#cbc3ae` (`--cy-table`). Ink `#1d2117`. Soft ink `rgba(29, 33, 23, 0.66)`. Rules `rgba(29, 33, 23, 0.16)`. Paper `#f5f1e6`. Prussian blue `#173b8a`. Lime `#d6f06b`. Sensitiser coat `#cfc56b`. Exposed, unrinsed bronze-blue `#566b73`.

Type:

- `--cy-serif`: `'Instrument Serif', 'Times New Roman', serif`
- `--cy-sans`: `'Inter Variable', 'Inter', system-ui, sans-serif`
- `--cy-mono`: `'IBM Plex Mono', ui-monospace, monospace`

Document title: `Cyanotype — Oversight Supply`. Theme colour: `#cbc3ae`.

The track is `420vh`. The stage is sticky, `100vh` / `100svh`, `overflow: clip`. Accessible name: `Cyanotype — make a sun print`. `data-sun` is `on` or `off`.

**Desktop paper.** Height is `min(74% of the stage, 36% of the width × 1.25)`. Width is `0.8 × height`. It sits at `x = 58.5% of the width`, vertically centred plus 22px.

**Cuttings**, in order, with fill colour and shade (how much light they block):

| id | Name | Latin | Colour | Shade |
| --- | --- | --- | --- | --- |
| fern | Lady fern | Athyrium filix-femina | `#4c5a2a` | 0.96 |
| ginkgo | Ginkgo | Ginkgo biloba | `#c39a2c` | 0.9 |
| umbel | Queen Anne’s lace | Daucus carota | `#efe8d6` | 0.8 |
| daisy | Oxeye daisy | Leucanthemum vulgare | `#f1ece0` | 0.72 |
| grass | Wild oat | Avena fatua | `#9d8a55` | 0.85 |
| maidenhair | Maidenhair fern | Adiantum capillus-veneris | `#3f5a2e` | 0.9 |
| oak | English oak | Quercus robur | `#8a5a31` | 0.96 |

The apostrophe in Queen Anne’s lace is `’`. Starting places are `START_DESK` in `specimens.ts` (u/v in paper-heights from the paper centre, rotation in degrees, size in paper heights). Fern, ginkgo, and umbel start on the paper. The other four start off it.

**Header.** `Oversight Supply` · `Cyanotype` italic `No. 8` · `Sun` and a `<b>` that reads `00 min`, then whole minutes of exposure, on a blue chip.

**Headline.**

```
Printed by
the sun.
```

`the sun.` is italic and `#173b8a`.

**Aside.** Coarse pointer: `Drag the cuttings onto the coated paper, tap one to turn it, then hold the sun. Whatever you cover stays white.` Otherwise the same sentence with `click` instead of `tap`.

**Sun button.** A  ring, `pathLength={1}`, dash offset `1 - min(1, seconds / 12)`. Label `Hold the sun`, or `Exposing…` while held. `aria-pressed` follows that.

**Dock.** `New sheet` and `Rinse it ↓`.

**Note.** `Into cold water. ` then italic blue `The yellow runs off; the blue stays.`

**Finale.** Kicker `Oversight Supply · sun prints`. Title `Yours, in` / italic `Prussian blue.` If the sheet was auto-exposed, the body starts `Your sheet went in unexposed, so we gave it 9 minutes of sun. ` Then: `Iron salts, paper and sunlight. We print a sheet of everything we grow, the same way.` Buttons: `Save your print` (or `Saving…`) and `Make another` with `↑`.

The canvas `aria-label` is `Your cyanotype print: cuttings leave white silhouettes wherever they blocked the sun`.

## Interactions & animation timeline

`RINSED_AT` is `0.5`. `AUTO_SECONDS` is `9`. `MOBILE` is `700`.

Rinse amount is `smooth(0.13, 0.36, p)`.

**Intro**, delay `0.15`, ease `expo.out`, only if motion is allowed:

- Header children, then at `0.2` the headline lines (`yPercent: 110`)
- At `0.3` the paper from `{ opacity: 0, y: 30, rotate: -2 }`
- At `0.55` each cutting from `{ opacity: 0, y: -40, rotate: -8 }`, stagger `0.07`
- At `0.9` the aside and the dock

**Scroll**, `scrub: 0.6`, `invalidateOnRefresh: true`.

| From | To | What changes |
| --- | --- | --- |
| 0.00 | 1.00 | Rinse amount follows `p`. Past `0.09`, if mean exposure is under `0.1`, the sheet is exposed for 9 seconds instantly and the finale copy says so. |
| 0.03 | 0.09 | Headline, aside, dock, and sun button fade up and away. |
| 0.05 | 0.12 | Cuttings fly up (`yPercent: -110`), rotate ±12 or ±14, and fade. |
| 0.08 | 0.12 | The tray fades in. |
| 0.10 | 0.30 | The water rises from `yPercent: 100` to `0`. |
| 0.18 | 0.44 | The note fades in, then out at `0.44`. |
| 0.40 | 0.48 | The water drops and the tray fades. |
| 0.54 | 0.72 | The stage background becomes `#0f1830` and the table fades. |
| 0.55 | 0.85 | The paper moves to the hung position and scales. Desktop: scale so the paper height is `0.8` of the stage, centre at 66% across and 50% down. Mobile: width `0.78` of the stage, centre at 50% across and 36% down. |
| 0.60 | 0.70 | The header colour becomes `#f5f1e6`. |
| 0.80 | 0.86 | The two pegs drop in. |
| 0.90 | 0.97 | The finale fades in. |

**Reduced motion** parks at `0`, `0.5`, or `1` (`> 0.75` → 1, `> 0.25` → `0.5`). Water, turning, and the sun wash have `animation` / `transition: none`.

**Dragging.** Pointer down on `[data-spec]` lifts it (highest z-index, class `is-lifted`). Movement past 6px drags. A press that does not move calls `turn(i, 30)`. Keyboard on a focused cutting: arrows move `u`/`v` by `0.02`, or `0.08` with Shift. `R` turns 30 degrees, Shift+R turns −30.

**Sun.** Pointer down or Space/Enter starts exposure. Pointer up, blur, or key up stops it. Hiding the tab also stops it. The header minutes and the ring update from `onSeconds`.

**New sheet** resets the engine. **Rinse it** scrolls to `0.5`. **Make another** scrolls to 0 and resets. **Save your print** downloads `oversight-supply-cyanotype.png`.

**Lenis** `{ lerp: 0.085 }` when motion is allowed. Programmatic scrolls last 2 seconds, or 2.4 when returning to 0.

## Responsive behaviour

**Desktop, wider than 1000px.** Paper on the right. Aside visible. Sun button and dock sit in the desktop positions from the CSS.

**700px to 1000px.** The aside is `display: none`. Paper layout is still the desktop formula, because that switches at `width < 700`.

**699px and under.** Header hides `Cyanotype No. 8`. Headline is one wrapping line at the top, `clamp(40px, 11vw, 56px)`. Aside sits to the right of the sun button. Sun button is 80×80 at the lower left. Dock is on the lower right. Paper uses the mobile size and `START_MOBILE` (the off-sheet cuttings move below the paper). Hung position uses the mobile centre.

## Accessibility & robustness

- Each cutting is `role="button"` and tabbable. Its accessible name names the plant, the Latin, and the keyboard.
- The print canvas is `role="img"` with the silhouette description.
- The sun control is a real button with `aria-pressed`.
- There is no WebGL. A 2D canvas is assumed.
- The exposure loop pauses when the document is hidden, and exposure is forced off.
- **StrictMode.** The scroll object `{ p: 0 }` is created inside the effect. Cleanup reverts the GSAP context.

## Performance notes

- The print is a fixed 800×1000, not the screen size. Exposure accumulates on an offscreen canvas and is composited when dirty.
- Cuttings are DOM/SVG. Their shadows are redrawn into the print from the same paths when the sheet is exposed.
- The ticker runs only while the track is in view.

## Full source code

Create these six files exactly. Do not reformat them. Delete the unused Vite template files `App.tsx`, `App.css`, `index.css`, and `vite.svg`. Keep `vite.config.ts` and the `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#cbc3ae" />
    <title>Cyanotype — Oversight Supply</title>
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
import './cyanotype.css'
import CyanotypeHero from './CyanotypeHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CyanotypeHero />
  </StrictMode>,
)
```

### `src/CyanotypeHero.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { PrintEngine } from './PrintEngine'
import { SPECIMENS, START_DESK, START_MOBILE, type Place } from './specimens'

gsap.registerPlugin(ScrollTrigger)

const smooth = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const RINSED_AT = 0.5
const MOBILE = 700
const AUTO_SECONDS = 9

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

type Rect = { x: number; y: number; w: number; h: number }

const PATHS = SPECIMENS.map((s) => ({
  fill: new Path2D(s.fill),
  strokes: s.strokes.map((k) => ({ p: new Path2D(k.d), w: k.w })),
}))

export default function CyanotypeHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const specRefs = useRef<(HTMLDivElement | null)[]>([])
  const sunRef = useRef<HTMLElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const engineRef = useRef<PrintEngine | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const deskRef = useRef<Rect>({ x: 0, y: 0, w: 1, h: 1 })
  const placesRef = useRef<Place[]>(START_DESK.map((p) => ({ ...p })))
  const modeRef = useRef<'desk' | 'mobile' | null>(null)
  const zRef = useRef(SPECIMENS.map((_, i) => i + 1))
  const autoRef = useRef(false)
  const reduced = usePrefersReducedMotion()

  const [exposing, setExposing] = useState(false)
  const [autoExposed, setAutoExposed] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)

  /* ------------------------------------------------ layout */
  const place = (i: number) => {
    const el = specRefs.current[i]
    if (!el) return
    const d = deskRef.current
    const p = placesRef.current[i]
    const s = SPECIMENS[i]
    const hPx = p.size * d.h
    const wPx = hPx * (s.w / s.h)
    const cx = d.x + d.w / 2 + p.u * d.h
    const cy = d.y + d.h / 2 + p.v * d.h
    el.style.width = `${wPx}px`
    el.style.height = `${hPx}px`
    el.style.transform = `translate3d(${(cx - wPx / 2).toFixed(1)}px, ${(cy - hPx / 2).toFixed(1)}px, 0) rotate(${p.rot}deg)`
    ;(el.parentElement as HTMLElement).style.zIndex = String(10 + zRef.current[i])
  }

  const layout = () => {
    const stage = stageRef.current
    const paper = paperRef.current
    if (!stage || !paper) return
    const w = stage.clientWidth
    const h = stage.clientHeight
    const mode = w < MOBILE ? 'mobile' : 'desk'
    if (mode !== modeRef.current) {
      modeRef.current = mode
      placesRef.current = (mode === 'mobile' ? START_MOBILE : START_DESK).map((p) => ({ ...p }))
    }
    let pw: number, ph: number, x: number, y: number
    if (mode === 'mobile') {
      pw = Math.min(w * 0.7, h * 0.34)
      ph = pw * 1.25
      x = (w - pw) / 2
      y = h * 0.21
    } else {
      ph = Math.min(h * 0.74, w * 0.36 * 1.25)
      pw = ph * 0.8
      x = w * 0.585 - pw / 2
      y = (h - ph) / 2 + 22
    }
    deskRef.current = { x, y, w: pw, h: ph }
    paper.style.left = `${x}px`
    paper.style.top = `${y}px`
    paper.style.width = `${pw}px`
    paper.style.height = `${ph}px`
    SPECIMENS.forEach((_, i) => place(i))
  }

  /* shadows of the cuttings, in print pixels */
  const drawShadows = (ctx: CanvasRenderingContext2D) => {
    const d = deskRef.current
    const k = PrintEngine.W / d.w
    placesRef.current.forEach((p, i) => {
      const s = SPECIMENS[i]
      const hPx = p.size * d.h
      const sc = hPx / s.h
      const cx = d.x + d.w / 2 + p.u * d.h
      const cy = d.y + d.h / 2 + p.v * d.h
      ctx.setTransform(k, 0, 0, k, -d.x * k, -d.y * k)
      ctx.translate(cx, cy)
      ctx.rotate((p.rot * Math.PI) / 180)
      ctx.scale(sc, sc)
      ctx.translate(-s.w / 2, -s.h / 2)
      ctx.globalAlpha = s.shade
      ctx.fill(PATHS[i].fill)
      ctx.lineCap = 'round'
      for (const st of PATHS[i].strokes) {
        ctx.lineWidth = st.w
        ctx.strokeStyle = '#000'
        ctx.stroke(st.p)
      }
    })
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
  }

  /* ------------------------------------------------ engine */
  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return
    layout()
    const engine = new PrintEngine(canvas, drawShadows)
    engineRef.current = engine
    engine.onSeconds = (s) => {
      if (sunRef.current) sunRef.current.textContent = `${String(Math.floor(s)).padStart(2, '0')} min`
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(1 - Math.min(1, s / 12))
    }

    let running = false
    let inView = true
    const tick = (_t: number, dtMs: number) => engine.step(Math.min(0.1, dtMs / 1000))
    const sync = () => {
      const want = inView && !document.hidden
      if (want && !running) gsap.ticker.add(tick)
      if (!want && running) gsap.ticker.remove(tick)
      running = want
    }
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
      sync()
    })
    if (trackRef.current) io.observe(trackRef.current)
    const hide = () => {
      if (document.hidden) engine.exposing = false
      sync()
    }
    document.addEventListener('visibilitychange', hide)
    sync()
    const ro = new ResizeObserver(() => {
      layout()
      ScrollTrigger.refresh()
    })
    ro.observe(stage)
    return () => {
      gsap.ticker.remove(tick)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', hide)
      engineRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ------------------------------------------------ the sun */
  const sun = (on: boolean) => {
    const eng = engineRef.current
    if (!eng) return
    eng.exposing = on
    setExposing(on)
  }
  useEffect(() => {
    const stop = () => sun(false)
    window.addEventListener('pointerup', stop)
    window.addEventListener('blur', stop)
    return () => {
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('blur', stop)
    }
  }, [])

  /* ------------------------------------------------ dragging cuttings */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let drag: { i: number; id: number; dx: number; dy: number; sx: number; sy: number; moved: boolean } | null = null
    const local = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const down = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('[data-spec]')
      if (!el || e.button > 0) return
      const i = Number(el.dataset.spec)
      const d = deskRef.current
      const p = placesRef.current[i]
      const m = local(e)
      const cx = d.x + d.w / 2 + p.u * d.h
      const cy = d.y + d.h / 2 + p.v * d.h
      drag = { i, id: e.pointerId, dx: m.x - cx, dy: m.y - cy, sx: m.x, sy: m.y, moved: false }
      zRef.current[i] = Math.max(...zRef.current) + 1
      el.classList.add('is-lifted')
      el.setPointerCapture(e.pointerId)
      place(i)
      e.preventDefault()
    }
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const m = local(e)
      if (Math.hypot(m.x - drag.sx, m.y - drag.sy) > 6) drag.moved = true
      if (!drag.moved) return
      const d = deskRef.current
      const w = stage.clientWidth, h = stage.clientHeight
      const x = Math.max(0, Math.min(w, m.x - drag.dx))
      const y = Math.max(0, Math.min(h, m.y - drag.dy))
      placesRef.current[drag.i].u = (x - d.x - d.w / 2) / d.h
      placesRef.current[drag.i].v = (y - d.y - d.h / 2) / d.h
      place(drag.i)
    }
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const el = specRefs.current[drag.i]
      el?.classList.remove('is-lifted')
      if (!drag.moved) turn(drag.i, 30)
      drag = null
    }
    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerup', up)
    stage.addEventListener('pointercancel', up)
    return () => {
      stage.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerup', up)
      stage.removeEventListener('pointercancel', up)
    }
  }, [])

  const turn = (i: number, deg: number) => {
    const el = specRefs.current[i]
    placesRef.current[i].rot += deg
    if (el && !reduced) {
      el.classList.add('is-turning')
      window.setTimeout(() => el.classList.remove('is-turning'), 360)
    }
    place(i)
  }
  const nudge = (i: number, e: KeyboardEvent) => {
    const step = e.shiftKey ? 0.08 : 0.02
    const p = placesRef.current[i]
    const k = e.key
    if (k === 'ArrowLeft') p.u -= step
    else if (k === 'ArrowRight') p.u += step
    else if (k === 'ArrowUp') p.v -= step
    else if (k === 'ArrowDown') p.v += step
    else if (k === 'r' || k === 'R') return turn(i, e.shiftKey ? -30 : 30)
    else return
    e.preventDefault()
    place(i)
  }

  /* ------------------------------------------------ smooth scroll */
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
    const stage = stageRef.current
    if (!track || !stage) return
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })
          .from('.cy-top > *', { opacity: 0, y: -8, duration: 1, stagger: 0.08 })
          .from('.cy-head .li', { yPercent: 110, duration: 1.6, stagger: 0.1 }, 0.2)
          .from('.cy-paper__in', { opacity: 0, y: 30, rotate: -2, duration: 1.6 }, 0.3)
          .from('.cy-spec__in', { opacity: 0, y: -40, rotate: -8, duration: 1.3, stagger: 0.07 }, 0.55)
          .from('.cy-sub__in, .cy-dock__in', { opacity: 0, y: 10, duration: 1.2, stagger: 0.1 }, 0.9)
      }

      const target = { p: 0 } // fresh per run: a StrictMode revert can't zero a shared object
      const apply = (p: number) => {
        const eng = engineRef.current
        if (!eng) return
        if (p > 0.09 && !autoRef.current) {
          autoRef.current = true
          if (eng.exposureMean() < 0.1) {
            eng.exposing = false
            eng.exposeInstant(AUTO_SECONDS) // it can't go in the water blank
            setAutoExposed(true)
          }
        } else if (p < 0.03 && autoRef.current) autoRef.current = false
        eng.setRinse(smooth(0.13, 0.36, p))
      }
      const hung = () => {
        const d = deskRef.current
        const w = stage.clientWidth, h = stage.clientHeight
        const mobile = w < MOBILE
        const s = mobile ? (w * 0.78) / d.w : (h * 0.8) / d.h
        const cx = mobile ? w * 0.5 : w * 0.66
        const cy = mobile ? h * 0.36 : h * 0.5
        return { s, x: cx - (d.x + d.w / 2), y: cy - (d.y + d.h / 2) }
      }
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      tl.to(target, { p: 1, duration: 1, onUpdate: () => apply(target.p) }, 0)
        .to('.cy-head, .cy-sub, .cy-dock, .cy-sunbtn', { opacity: 0, y: -20, duration: 0.06, stagger: 0.012 }, 0.03)
        .to('.cy-specwrap', { yPercent: -110, rotate: (i) => (i % 2 ? 14 : -12), opacity: 0, duration: 0.07, stagger: 0.006, ease: 'power2.in' }, 0.05)
        .fromTo('.cy-tray', { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.08)
        .fromTo('.cy-water', { yPercent: 100 }, { yPercent: 0, duration: 0.2, ease: 'power1.inOut' }, 0.1)
        .fromTo('.cy-note', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.05 }, 0.18)
        .to('.cy-note', { opacity: 0, y: -14, duration: 0.05 }, 0.44)
        .to('.cy-water', { yPercent: 100, duration: 0.08, ease: 'power1.in' }, 0.4)
        .to('.cy-tray', { opacity: 0, duration: 0.04 }, 0.48)
        .to(stage, { backgroundColor: '#0f1830', duration: 0.18 }, 0.54)
        .to('.cy-table', { opacity: 0, duration: 0.14 }, 0.54)
        .to('.cy-top', { color: '#f5f1e6', borderColor: 'rgba(245,241,230,0.2)', duration: 0.1 }, 0.6)
        .to('.cy-paper', {
          x: () => hung().x,
          y: () => hung().y,
          scale: () => hung().s,
          duration: 0.3,
          ease: 'power2.inOut',
        }, 0.55)
        .fromTo('.cy-peg', { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.06, stagger: 0.02 }, 0.8)
        .fromTo('.cy-final', { opacity: 0, y: 30, pointerEvents: 'none' }, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.9)

      stRef.current = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        animation: reduced ? undefined : tl,
        scrub: reduced ? false : 0.6,
        invalidateOnRefresh: true,
        onUpdate(self) {
          if (!reduced) return
          // discrete states only: table → rinsed → hung
          const p = self.progress > 0.75 ? 1 : self.progress > 0.25 ? RINSED_AT : 0
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
  }, [reduced]) // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToProgress = (p: number, then?: () => void) => {
    const st = stRef.current
    if (!st) return
    const y = st.start + (st.end - st.start) * p
    if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: p === 0 ? 2.4 : 2, onComplete: then })
    else {
      window.scrollTo({ top: y, behavior: 'auto' })
      then?.()
    }
  }

  const newSheet = () => {
    engineRef.current?.reset()
    setAutoExposed(false)
  }
  const again = () => scrollToProgress(0, newSheet)

  const save = async () => {
    const eng = engineRef.current
    if (!eng || saving) return
    setSaving(true)
    try {
      const blob = await eng.toBlob()
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'oversight-supply-cyanotype.png'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 4000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="cy-root">
      <section ref={trackRef} className="cy-track" aria-label="Cyanotype — make a sun print">
        <div ref={stageRef} className="cy-stage" data-sun={exposing ? 'on' : 'off'}>
          <div className="cy-table" aria-hidden="true" />

          <div ref={paperRef} className="cy-paper">
            <div className="cy-paper__in">
              <div className="cy-tray" aria-hidden="true" />
              <canvas
                ref={canvasRef}
                className="cy-print"
                role="img"
                aria-label="Your cyanotype print: cuttings leave white silhouettes wherever they blocked the sun"
              />
              <div className="cy-waterbox" aria-hidden="true">
                <div className="cy-water"><i className="cy-water__surface" /></div>
              </div>
              <i className="cy-peg cy-peg--l" aria-hidden="true" />
              <i className="cy-peg cy-peg--r" aria-hidden="true" />
            </div>
          </div>

          {SPECIMENS.map((s, i) => (
            <div key={s.id} className="cy-specwrap">
              <div
                ref={(el) => {
                  specRefs.current[i] = el
                }}
                data-spec={i}
                className="cy-spec"
                tabIndex={0}
                role="button"
                aria-label={`${s.name}, ${s.latin}. Drag to move, tap to turn. With the keyboard: arrow keys move it, R turns it.`}
                onKeyDown={(e) => nudge(i, e)}
              >
                <div className="cy-spec__in">
                  <svg viewBox={`0 0 ${s.w} ${s.h}`} aria-hidden="true">
                    <path d={s.fill} fill={s.color} />
                    {s.strokes.map((k, j) => (
                      <path key={j} d={k.d} fill="none" stroke={s.color} strokeWidth={k.w} strokeLinecap="round" />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          ))}

          <div className="cy-sun" aria-hidden="true" />

          <header className="cy-top">
            <span>Oversight Supply</span>
            <span className="cy-top__c">Cyanotype <em>No. 8</em></span>
            <span className="cy-top__r">
              Sun <b ref={sunRef}>00 min</b>
            </span>
          </header>

          <h1 className="cy-head">
            <span className="ln"><span className="li">Printed by</span></span>
            <span className="ln"><span className="li"><em>the sun.</em></span></span>
          </h1>

          <div className="cy-sub">
            <p className="cy-sub__in">
              {isTouch
                ? 'Drag the cuttings onto the coated paper, tap one to turn it, then hold the sun. Whatever you cover stays white.'
                : 'Drag the cuttings onto the coated paper, click one to turn it, then hold the sun. Whatever you cover stays white.'}
            </p>
          </div>

          <button
            type="button"
            className={`cy-sunbtn${exposing ? ' is-on' : ''}`}
            aria-pressed={exposing}
            onPointerDown={(e) => {
              e.preventDefault()
              sun(true)
            }}
            onKeyDown={(e) => {
              if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
                e.preventDefault()
                sun(true)
              }
            }}
            onKeyUp={(e) => (e.key === ' ' || e.key === 'Enter') && sun(false)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" className="cy-sunbtn__track" />
              <circle ref={ringRef} cx="50" cy="50" r="46" pathLength={1} className="cy-sunbtn__ring" />
            </svg>
            <span className="cy-sunbtn__label">{exposing ? 'Exposing…' : 'Hold the sun'}</span>
          </button>

          <div className="cy-dock">
            <div className="cy-dock__in">
              <button type="button" onClick={newSheet}>New sheet</button>
              <button type="button" onClick={() => scrollToProgress(RINSED_AT)}>Rinse it ↓</button>
            </div>
          </div>

          <p className="cy-note" aria-hidden="true">
            Into cold water. <em>The yellow runs off; the blue stays.</em>
          </p>

          <div className="cy-final">
            <p className="cy-final__kicker">Oversight Supply · sun prints</p>
            <h2 className="cy-final__title">
              Yours, in <br />
              <em>Prussian blue.</em>
            </h2>
            <p className="cy-final__body">
              {autoExposed
                ? `Your sheet went in unexposed, so we gave it ${AUTO_SECONDS} minutes of sun. `
                : ''}
              Iron salts, paper and sunlight. We print a sheet of everything we grow, the same way.
            </p>
            <div className="cy-final__row">
              <button type="button" className="cy-final__btn cy-final__btn--solid" onClick={save} disabled={saving}>
                {saving ? 'Saving…' : 'Save your print'}
              </button>
              <button type="button" className="cy-final__btn" onClick={again}>
                Make another <span aria-hidden="true">↑</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
```

### `src/PrintEngine.ts`

```ts
// The print itself: a fixed-resolution sheet that accumulates UV exposure
// wherever the cuttings don't cover it, then gets rinsed from yellow-green
// sensitiser to Prussian blue.

const W = 800
const H = 1000
const K = 0.3 // exposure rate per second of "sun"
const PAPER = '#f5f1e6'
const COAT = '#cfc56b'
const RAW_BLUE = '#566b73' // exposed, unrinsed: a greyish bronze-blue
const PRUSSIAN = '#173b8a'

function canvas(w = W, h = H) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type ShadowDrawer = (ctx: CanvasRenderingContext2D) => void

export class PrintEngine {
  static W = W
  static H = H
  exposing = false
  seconds = 0
  onSeconds?: (s: number) => void

  private exposure = canvas()
  private coatMask = canvas()
  private coat = canvas()
  private frame = canvas()
  private tmp = canvas()
  private acc = 0
  private front = 0
  private dirty = true
  private ex = this.exposure.getContext('2d')!

  constructor(
    private display: HTMLCanvasElement,
    private drawShadows: ShadowDrawer,
  ) {
    display.width = W
    display.height = H
    this.makeCoat()
    this.compose()
  }

  /** brushed-on sensitiser with ragged, bristly edges */
  private makeCoat() {
    const r = rng(42)
    const m = this.coatMask.getContext('2d')!
    m.lineCap = 'butt'
    for (let y = 100; y <= H - 100; y += 10) {
      const x0 = 70 + (r() - 0.5) * 46
      const x1 = W - 70 + (r() - 0.5) * 46
      m.strokeStyle = `rgba(255,255,255,${0.7 + r() * 0.3})`
      m.lineWidth = 18 + r() * 12
      m.beginPath()
      m.moveTo(x0, y + (r() - 0.5) * 6)
      m.bezierCurveTo(W * 0.35, y + (r() - 0.5) * 10, W * 0.65, y + (r() - 0.5) * 10, x1, y + (r() - 0.5) * 6)
      m.stroke()
    }
    // dry bristle streaks running past the edges
    for (let i = 0; i < 140; i++) {
      const y = 70 + r() * (H - 140)
      const left = r() < 0.5
      const x0 = left ? 28 + r() * 40 : W - 70 - r() * 60
      m.strokeStyle = `rgba(255,255,255,${0.15 + r() * 0.35})`
      m.lineWidth = 1 + r() * 3
      m.beginPath()
      m.moveTo(x0, y)
      m.lineTo(x0 + 40 + r() * 70, y + (r() - 0.5) * 4)
      m.stroke()
    }
    const c = this.coat.getContext('2d')!
    c.drawImage(this.coatMask, 0, 0)
    c.globalCompositeOperation = 'source-in'
    c.fillStyle = COAT
    c.fillRect(0, 0, W, H)
    c.globalCompositeOperation = 'source-atop'
    for (let i = 0; i < 220; i++) {
      c.strokeStyle = `rgba(150,140,60,${0.06 + r() * 0.12})`
      c.lineWidth = 1 + r() * 2
      const y = r() * H
      c.beginPath()
      c.moveTo(0, y)
      c.lineTo(W, y + (r() - 0.5) * 8)
      c.stroke()
    }
    c.globalCompositeOperation = 'source-over'
  }

  /** one slice of sunlight: light only reaches the coat where nothing covers it */
  private accumulate(dt: number) {
    const fr = this.frame.getContext('2d')!
    fr.setTransform(1, 0, 0, 1, 0, 0)
    fr.globalCompositeOperation = 'source-over'
    fr.globalAlpha = 1
    fr.clearRect(0, 0, W, H)
    fr.fillStyle = '#fff'
    fr.fillRect(0, 0, W, H)
    fr.globalCompositeOperation = 'destination-in'
    fr.drawImage(this.coatMask, 0, 0)
    fr.globalCompositeOperation = 'destination-out'
    this.drawShadows(fr)
    fr.setTransform(1, 0, 0, 1, 0, 0)
    fr.globalAlpha = 1
    fr.globalCompositeOperation = 'source-over'
    this.ex.globalAlpha = 1 - Math.exp(-dt * K)
    this.ex.drawImage(this.frame, 0, 0)
    this.ex.globalAlpha = 1
    this.dirty = true
  }

  step(dt: number) {
    if (this.exposing) {
      this.seconds += dt
      this.acc += dt
      // 10 Hz slices keep each 8-bit alpha step big enough to keep darkening
      while (this.acc >= 0.1) {
        this.acc -= 0.1
        this.accumulate(0.1)
      }
      this.onSeconds?.(this.seconds)
    }
    if (this.dirty) this.compose()
  }

  /** expose in one go (used when the sheet goes into the water unexposed) */
  exposeInstant(seconds: number) {
    for (let t = 0; t < seconds; t += 0.1) this.accumulate(0.1)
    this.seconds += seconds
    this.onSeconds?.(this.seconds)
  }

  /** mean exposure over the coated area, 0..1 */
  exposureMean() {
    const e = this.ex.getImageData(0, 0, W, H).data
    const m = this.coatMask.getContext('2d')!.getImageData(0, 0, W, H).data
    let s = 0, n = 0
    for (let i = 3; i < e.length; i += 4 * 37) {
      if (m[i] < 128) continue
      s += e[i] / 255
      n++
    }
    return n ? s / n : 0
  }

  reset() {
    this.ex.clearRect(0, 0, W, H)
    this.seconds = 0
    this.acc = 0
    this.onSeconds?.(0)
    this.dirty = true
  }

  /** rinse front, 0 → 1 from the bottom of the sheet up */
  setRinse(front: number) {
    if (Math.abs(front - this.front) < 1e-4) return
    this.front = front
    this.dirty = true
  }

  private tint(color: string) {
    const t = this.tmp.getContext('2d')!
    t.globalCompositeOperation = 'source-over'
    t.clearRect(0, 0, W, H)
    t.fillStyle = color
    t.fillRect(0, 0, W, H)
    t.globalCompositeOperation = 'destination-in'
    t.drawImage(this.exposure, 0, 0)
    t.globalCompositeOperation = 'source-over'
    return this.tmp
  }

  private drawVersion(ctx: CanvasRenderingContext2D, rinsed: boolean) {
    if (!rinsed) {
      ctx.globalAlpha = 0.92
      ctx.drawImage(this.coat, 0, 0)
      ctx.globalAlpha = 1
      ctx.drawImage(this.tint(RAW_BLUE), 0, 0)
    } else {
      const blue = this.tint(PRUSSIAN)
      ctx.drawImage(blue, 0, 0)
      ctx.globalAlpha = 0.85 // a second pass deepens the dense areas more than the thin ones
      ctx.drawImage(blue, 0, 0)
      ctx.globalAlpha = 1
    }
  }

  private paint(ctx: CanvasRenderingContext2D, front: number) {
    ctx.fillStyle = PAPER
    ctx.fillRect(0, 0, W, H)
    const split = Math.round(H * (1 - front))
    if (split > 0) {
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, W, split)
      ctx.clip()
      this.drawVersion(ctx, false)
      ctx.restore()
    }
    if (split < H) {
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, split, W, H - split)
      ctx.clip()
      this.drawVersion(ctx, true)
      ctx.restore()
    }
  }

  private compose() {
    this.dirty = false
    this.paint(this.display.getContext('2d')!, this.front)
  }

  /** the finished, rinsed print as a PNG */
  toBlob(): Promise<Blob | null> {
    const out = canvas(W * 2, H * 2)
    const o = out.getContext('2d')!
    const sheet = canvas()
    this.paint(sheet.getContext('2d')!, 1)
    o.imageSmoothingQuality = 'high'
    o.drawImage(sheet, 0, 0, W * 2, H * 2)
    o.fillStyle = 'rgba(23,59,138,0.75)'
    o.font = '500 22px "IBM Plex Mono", monospace'
    o.fillText('OVERSIGHT SUPPLY · CYANOTYPE', 132, H * 2 - 110)
    o.textAlign = 'right'
    o.fillText(`${Math.round(this.seconds)} MIN OF SUN`, W * 2 - 132, H * 2 - 110)
    return new Promise((res) => out.toBlob(res, 'image/png'))
  }
}
```

### `src/specimens.ts`

```ts
// Procedural pressed botanicals, as SVG path data. The same paths draw the
// cuttings on the table (SVG) and their shadows on the print (Path2D).

export type Specimen = {
  id: string
  name: string
  latin: string
  w: number
  h: number
  fill: string
  strokes: { d: string; w: number }[]
  color: string
  /** how much light the cutting blocks, 0..1 (petals let some through) */
  shade: number
}

type P = [number, number]
const f = (n: number) => n.toFixed(1)
const { sin, cos, PI, pow, exp } = Math

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const poly = (pts: P[]) => 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join('L') + 'Z'
const circle = (cx: number, cy: number, r: number) =>
  `M${f(cx - r)} ${f(cy)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0Z`

/** a leaf along an axis from (x, y) at angle `a`: optional lobes for ferny / oaky edges */
function leaf(x: number, y: number, a: number, len: number, wid: number, lobes = 0, lobeAmt = 0, steps = 28) {
  const dx = cos(a), dy = sin(a)
  const nx = -dy, ny = dx
  const L: P[] = [], R: P[] = []
  for (let i = 0; i <= steps; i++) {
    const s = i / steps
    let hw = wid * pow(sin(PI * s), 0.7) * (1 - 0.25 * s)
    if (lobes) hw *= 1 + lobeAmt * sin(s * PI * lobes * 2 - PI / 2) * sin(PI * s)
    const cx = x + dx * len * s, cy = y + dy * len * s
    L.push([cx + nx * hw, cy + ny * hw])
    R.push([cx - nx * hw, cy - ny * hw])
  }
  return poly([...L, ...R.reverse()])
}

/** a small fan (ginkgo, maidenhair pinnule) opening along direction `a` */
function fan(x: number, y: number, a: number, R: number, spread: number, notch: number, wobble: number, freq: number) {
  const pts: P[] = [[x, y]]
  const n = 40
  for (let i = 0; i <= n; i++) {
    const t = -spread + (2 * spread * i) / n
    let r = R * (1 + wobble * sin(t * freq))
    r *= 1 - notch * exp(-pow(t / 0.09, 2))
    pts.push([x + cos(a + t) * r, y + sin(a + t) * r])
  }
  return poly(pts)
}

function quad(p0: P, c: P, p1: P) {
  return {
    at: (t: number): P => [
      (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p1[0],
      (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p1[1],
    ],
    dir: (t: number) => {
      const x = 2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0])
      const y = 2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1])
      return Math.atan2(y, x)
    },
    d: `M${f(p0[0])} ${f(p0[1])}Q${f(c[0])} ${f(c[1])} ${f(p1[0])} ${f(p1[1])}`,
  }
}

function fern(): Specimen {
  const st = quad([200, 990], [168, 520], [214, 40])
  const parts: string[] = []
  const N = 26
  for (let i = 0; i < N; i++) {
    const t = 0.07 + (i / N) * 0.9
    const [x, y] = st.at(t)
    const side = i % 2 ? 1 : -1
    const len = 180 * pow(1 - t, 0.75) + 16
    parts.push(leaf(x, y, st.dir(t) + side * 1.05, len, len * 0.15 + 3, 7, 0.38, 36))
  }
  const [tx, ty] = st.at(0.985)
  parts.push(leaf(tx, ty, st.dir(0.98), 34, 7))
  return {
    id: 'fern', name: 'Lady fern', latin: 'Athyrium filix-femina', w: 400, h: 1000,
    fill: parts.join(''), strokes: [{ d: st.d, w: 7 }], color: '#4c5a2a', shade: 0.96,
  }
}

function ginkgo(): Specimen {
  const parts = [fan(300, 560, -PI / 2, 300, 1.15, 0.4, 0.03, 23)]
  return {
    id: 'ginkgo', name: 'Ginkgo', latin: 'Ginkgo biloba', w: 600, h: 820,
    fill: parts.join(''), strokes: [{ d: 'M300 552 Q304 690 312 815', w: 8 }], color: '#c39a2c', shade: 0.9,
  }
}

function grass(): Specimen {
  const st = quad([180, 995], [206, 600], [168, 70])
  const parts: string[] = []
  const N = 18
  for (let i = 0; i < N; i++) {
    const t = 0.6 + (i / N) * 0.38
    const [x, y] = st.at(t)
    const side = i % 2 ? 1 : -1
    parts.push(leaf(x, y, st.dir(t) + side * 0.5, 62 - i * 1.4, 12))
  }
  parts.push(leaf(186, 905, -1.95, 520, 15))
  parts.push(leaf(190, 780, -1.18, 380, 12))
  return {
    id: 'grass', name: 'Wild oat', latin: 'Avena fatua', w: 360, h: 1000,
    fill: parts.join(''), strokes: [{ d: st.d, w: 4.5 }], color: '#9d8a55', shade: 0.85,
  }
}

function umbel(): Specimen {
  const r = rng(7)
  const cx = 350, cy = 400
  const strokes = [{ d: 'M350 915 Q336 650 350 400', w: 7 }]
  const dots: string[] = []
  const rays = 13
  let rayD = ''
  for (let i = 0; i < rays; i++) {
    const a = -2.55 + (i / (rays - 1)) * 1.96
    const len = 210 + r() * 60
    const ex = cx + cos(a) * len, ey = cy + sin(a) * len
    rayD += `M${cx} ${cy}L${f(ex)} ${f(ey)}`
    for (let k = 0; k < 9; k++) {
      const b = a - 0.9 + (k / 8) * 1.8
      const l2 = 34 + r() * 16
      const dx = ex + cos(b) * l2, dy = ey + sin(b) * l2
      rayD += `M${f(ex)} ${f(ey)}L${f(dx)} ${f(dy)}`
      dots.push(circle(dx, dy, 6 + r() * 3))
    }
    dots.push(circle(ex, ey, 5))
  }
  strokes.push({ d: rayD, w: 2.6 })
  return {
    id: 'umbel', name: 'Queen Anne’s lace', latin: 'Daucus carota', w: 700, h: 920,
    fill: dots.join(''), strokes, color: '#efe8d6', shade: 0.8,
  }
}

function daisy(): Specimen {
  const cx = 262, cy = 240
  const parts = [circle(cx, cy, 44)]
  const n = 22
  for (let i = 0; i < n; i++) {
    const a = (i / n) * PI * 2 + 0.1
    parts.push(leaf(cx + cos(a) * 36, cy + sin(a) * 36, a, 150 + (i % 3) * 10, 17, 0, 0, 16))
  }
  parts.push(leaf(250, 720, -2.55, 180, 26, 4, 0.3))
  parts.push(leaf(258, 560, -0.55, 150, 22, 3, 0.3))
  return {
    id: 'daisy', name: 'Oxeye daisy', latin: 'Leucanthemum vulgare', w: 520, h: 940,
    fill: parts.join(''), strokes: [{ d: 'M260 935 Q238 600 262 290', w: 6 }], color: '#f1ece0', shade: 0.72,
  }
}

function maidenhair(): Specimen {
  const r = rng(11)
  const st = quad([310, 855], [296, 520], [330, 110])
  let branches = ''
  const parts: string[] = []
  for (let b = 0; b < 7; b++) {
    const t = 0.25 + b * 0.105
    const [x, y] = st.at(t)
    const side = b % 2 ? 1 : -1
    const a0 = st.dir(t) + side * 1.15
    const len = 230 - b * 22
    const ex = x + cos(a0) * len, ey = y + sin(a0) * len - 40
    const c: P = [x + cos(a0) * len * 0.5, y + sin(a0) * len * 0.5 - 60]
    const br = quad([x, y], c, [ex, ey])
    branches += br.d
    for (let k = 1; k <= 5; k++) {
      const u = k / 5.4
      const [px, py] = br.at(u)
      const dir = br.dir(u)
      parts.push(fan(px, py, dir + (k % 2 ? 0.9 : -0.9), 30 + r() * 12, 1.0, 0.12, 0.14, 9))
    }
    parts.push(fan(ex, ey, br.dir(1), 36, 1.0, 0.12, 0.14, 9))
  }
  return {
    id: 'maidenhair', name: 'Maidenhair fern', latin: 'Adiantum capillus-veneris', w: 620, h: 860,
    fill: parts.join(''), strokes: [{ d: st.d, w: 3.4 }, { d: branches, w: 2.2 }], color: '#3f5a2e', shade: 0.9,
  }
}

function oak(): Specimen {
  return {
    id: 'oak', name: 'English oak', latin: 'Quercus robur', w: 520, h: 860,
    fill: leaf(260, 735, -PI / 2, 690, 175, 4.5, 0.5, 90),
    strokes: [{ d: 'M260 850 L260 700', w: 8 }], color: '#8a5a31', shade: 0.96,
  }
}

export const SPECIMENS: Specimen[] = [fern(), ginkgo(), umbel(), daisy(), grass(), maidenhair(), oak()]

/** where each cutting starts: u/v in paper heights from the paper centre, size in paper heights */
export type Place = { u: number; v: number; rot: number; size: number }
export const START_DESK: Place[] = [
  { u: -0.13, v: 0.02, rot: -9, size: 0.66 }, // fern, on the paper
  { u: 0.16, v: -0.25, rot: 14, size: 0.3 }, // ginkgo, on the paper
  { u: 0.14, v: 0.22, rot: -6, size: 0.36 }, // umbel, on the paper
  { u: -0.98, v: 0.24, rot: 18, size: 0.42 }, // daisy
  { u: 0.78, v: 0.06, rot: -12, size: 0.6 }, // grass
  { u: 0.72, v: -0.3, rot: 22, size: 0.36 }, // maidenhair
  { u: -0.66, v: 0.36, rot: -24, size: 0.34 }, // oak
]
export const START_MOBILE: Place[] = [
  { u: -0.12, v: 0.02, rot: -9, size: 0.66 },
  { u: 0.16, v: -0.25, rot: 14, size: 0.3 },
  { u: 0.14, v: 0.22, rot: -6, size: 0.36 },
  { u: -0.34, v: 0.8, rot: 70, size: 0.34 },
  { u: 0.36, v: 0.84, rot: -76, size: 0.46 },
  { u: 0.04, v: 0.86, rot: 12, size: 0.28 },
  { u: -0.02, v: 0.66, rot: -96, size: 0.26 },
]
```

### `src/cyanotype.css`

```css
/* Cyanotype — a sun print you make yourself */
:root {
  --cy-table: #cbc3ae;
  --cy-ink: #1d2117;
  --cy-soft: rgba(29, 33, 23, 0.66);
  --cy-rule: rgba(29, 33, 23, 0.16);
  --cy-paper: #f5f1e6;
  --cy-blue: #173b8a;
  --cy-lime: #d6f06b;
  --cy-serif: 'Instrument Serif', 'Times New Roman', serif;
  --cy-sans: 'Inter Variable', 'Inter', system-ui, sans-serif;
  --cy-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: var(--cy-table); color: var(--cy-ink); }
body { font-family: var(--cy-sans); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

.cy-track { position: relative; height: 420vh; }
.cy-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  overflow: clip;
  background-color: var(--cy-table);
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
}

/* linen: woven grain + a soft window light */
.cy-table {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(90% 70% at 70% 20%, rgba(255, 250, 235, 0.35), transparent 60%),
    radial-gradient(120% 100% at 50% 50%, transparent 50%, rgba(60, 50, 30, 0.22)),
    repeating-linear-gradient(0deg, rgba(90, 80, 55, 0.05) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(90deg, rgba(90, 80, 55, 0.045) 0 1px, transparent 1px 4px),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .3 0 0 0 0 .26 0 0 0 0 .15 0 0 0 .12 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ------------------------------------------------------------ the sheet */
.cy-paper { position: absolute; z-index: 2; transform-origin: 50% 50%; will-change: transform; }
.cy-paper__in { position: absolute; inset: 0; }
.cy-print {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  box-shadow: 0 1px 1px rgba(40, 34, 20, 0.2), 0 18px 40px -16px rgba(40, 34, 20, 0.45);
}
.cy-paper__in::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: multiply;
  opacity: 0.55;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .5 0 0 0 0 .47 0 0 0 0 .4 0 0 0 .22 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* rinse tray + water (moves with the sheet) */
.cy-tray {
  position: absolute;
  inset: -7% -9%;
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(180deg, #e9ecef, #d4dadf);
  box-shadow: inset 0 0 0 6px #f3f5f7, inset 0 4px 20px rgba(30, 40, 50, 0.25), 0 24px 50px -20px rgba(30, 40, 50, 0.5);
  opacity: 0;
}
.cy-water {
  position: absolute;
  inset: 0;
  z-index: 3;
  background:
    radial-gradient(40% 12% at 30% 30%, rgba(255, 255, 255, 0.28), transparent 70%),
    radial-gradient(30% 10% at 70% 60%, rgba(255, 255, 255, 0.2), transparent 70%),
    linear-gradient(180deg, rgba(150, 185, 205, 0.42), rgba(95, 140, 170, 0.5));
}
.cy-waterbox { position: absolute; inset: -7% -9%; border-radius: 14px; overflow: hidden; z-index: 1; pointer-events: none; }
.cy-water__surface {
  position: absolute;
  left: -50%;
  top: -10px;
  width: 200%;
  height: 20px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='20'%3E%3Cpath d='M0 10 Q30 2 60 10 T120 10 V20 H0Z' fill='rgba(150,185,205,0.42)'/%3E%3Cpath d='M0 10 Q30 2 60 10 T120 10' fill='none' stroke='rgba(255,255,255,0.7)' stroke-width='1.5'/%3E%3C/svg%3E") repeat-x;
  animation: cy-wave 2.4s linear infinite;
}
@keyframes cy-wave { to { transform: translateX(120px); } }
/* the water sits over the sheet, the tray sits under it */
.cy-paper__in { isolation: isolate; }
.cy-tray { z-index: -1; }

/* clothes pegs for the hung print */
.cy-peg {
  position: absolute;
  top: -5%;
  width: 5%;
  height: 12%;
  border-radius: 3px;
  background: linear-gradient(90deg, #b88a55, #dcb27a 45%, #a47844);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.35);
  opacity: 0;
}
.cy-peg::after { content: ''; position: absolute; left: 15%; right: 15%; top: 38%; height: 12%; background: #7c7f86; border-radius: 2px; }
.cy-peg--l { left: 14%; }
.cy-peg--r { right: 14%; }

/* ------------------------------------------------------------ cuttings */
.cy-specwrap { position: absolute; inset: 0; pointer-events: none; }
.cy-spec {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: auto;
  cursor: grab;
  touch-action: none;
  outline: none;
}
.cy-spec.is-turning { transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1); }
.cy-spec.is-lifted { cursor: grabbing; }
.cy-spec__in { width: 100%; height: 100%; }
.cy-spec svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
  filter: drop-shadow(1px 3px 2px rgba(40, 34, 20, 0.3));
  transition: filter 0.4s ease, transform 0.25s ease;
}
.cy-spec.is-lifted svg { filter: drop-shadow(10px 18px 10px rgba(40, 34, 20, 0.28)); transform: scale(1.04); }
.cy-spec:focus-visible svg { filter: drop-shadow(0 0 0 var(--cy-blue)) drop-shadow(0 0 3px var(--cy-blue)); }
[data-sun='on'] .cy-spec svg { filter: drop-shadow(5px 9px 1.5px rgba(40, 30, 10, 0.4)); }

/* sunlight */
.cy-sun {
  position: absolute;
  inset: 0;
  z-index: 30;
  pointer-events: none;
  opacity: 0;
  mix-blend-mode: soft-light;
  background:
    radial-gradient(70% 60% at 75% 0%, rgba(255, 244, 200, 0.95), transparent 70%),
    linear-gradient(115deg, transparent 30%, rgba(255, 240, 190, 0.35) 45%, transparent 60%);
  transition: opacity 0.6s ease;
}
[data-sun='on'] .cy-sun { opacity: 1; }

/* --------------------------------------------------------------- overlay */
.cy-top, .cy-head, .cy-sub, .cy-dock, .cy-sunbtn, .cy-note, .cy-final { position: absolute; z-index: 40; }

.cy-top {
  top: 0;
  left: clamp(16px, 2.4vw, 32px);
  right: clamp(16px, 2.4vw, 32px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: clamp(14px, 1.8vw, 22px) 0 12px;
  border-bottom: 1px solid var(--cy-rule);
  font: 500 10.5px/1 var(--cy-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  pointer-events: none;
}
.cy-top__c em { font-family: var(--cy-serif); font-size: 15px; letter-spacing: 0.02em; text-transform: none; }
.cy-top__r { justify-self: end; opacity: 0.8; }
.cy-top__r b { font-weight: 500; color: #fff; background: var(--cy-blue); padding: 2px 5px; font-variant-numeric: tabular-nums; }

.cy-head {
  left: clamp(16px, 3vw, 44px);
  top: clamp(70px, 9vh, 110px);
  margin: 0;
  font-family: var(--cy-serif);
  font-weight: 400;
  font-size: clamp(54px, 6.6vw, 124px);
  line-height: 0.86;
  letter-spacing: -0.035em;
  pointer-events: none;
}
.cy-head .ln { display: block; overflow: hidden; padding-bottom: 0.07em; }
.cy-head .li { display: inline-block; }
.cy-head em { font-style: italic; color: var(--cy-blue); }

.cy-sub { left: clamp(16px, 3vw, 44px); top: calc(clamp(70px, 9vh, 110px) + clamp(54px, 6.6vw, 124px) * 1.9); width: min(300px, 26vw); pointer-events: none; }
.cy-sub__in { margin: 0; font-size: 13px; line-height: 1.5; color: var(--cy-soft); }

.cy-sunbtn {
  left: clamp(16px, 3vw, 44px);
  bottom: clamp(20px, 3vw, 40px);
  width: 108px;
  height: 108px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 40% 35%, #fff7c9, #f4d35e 55%, #e0a93a);
  color: var(--cy-ink);
  cursor: pointer;
  touch-action: none;
  -webkit-touch-callout: none;
  box-shadow: 0 10px 30px -8px rgba(200, 140, 30, 0.7), 0 0 0 0 rgba(255, 220, 120, 0.5);
  transition: box-shadow 0.4s ease, transform 0.2s ease;
}
.cy-sunbtn.is-on { transform: scale(0.96); box-shadow: 0 10px 40px -6px rgba(230, 160, 30, 0.9), 0 0 0 16px rgba(255, 220, 120, 0.25), 0 0 80px 20px rgba(255, 220, 120, 0.4); }
.cy-sunbtn:focus-visible { outline: 2px solid var(--cy-blue); outline-offset: 4px; }
.cy-sunbtn svg { position: absolute; inset: -8px; width: calc(100% + 16px); height: calc(100% + 16px); transform: rotate(-90deg); pointer-events: none; }
.cy-sunbtn__track { fill: none; stroke: rgba(29, 33, 23, 0.12); stroke-width: 2; }
.cy-sunbtn__ring { fill: none; stroke: var(--cy-blue); stroke-width: 3; stroke-dasharray: 1; stroke-dashoffset: 1; stroke-linecap: round; }
.cy-sunbtn__label { position: relative; font: 500 10px/1.2 var(--cy-mono); letter-spacing: 0.12em; text-transform: uppercase; text-align: center; width: 70px; }

.cy-dock { right: clamp(16px, 2.4vw, 32px); bottom: clamp(20px, 3vw, 40px); }
.cy-dock__in {
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--cy-rule);
  border-radius: 999px;
  background: rgba(245, 241, 230, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.cy-dock button, .cy-final__btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--cy-ink);
  font: 500 10.5px/1 var(--cy-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 11px 14px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.25s ease, color 0.25s ease;
}
.cy-dock button:hover { background: var(--cy-lime); }
.cy-dock button:focus-visible, .cy-final__btn:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }

.cy-note {
  left: 0;
  right: 0;
  bottom: clamp(26px, 6vh, 60px);
  width: fit-content;
  max-width: calc(100% - 32px);
  margin: 0 auto;
  padding: 12px 22px;
  border-radius: 999px;
  background: rgba(245, 241, 230, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  text-align: center;
  font: 400 clamp(20px, 2.2vw, 32px)/1.1 var(--cy-serif);
  opacity: 0;
  pointer-events: none;
}
.cy-note em { font-style: italic; color: var(--cy-blue); }

.cy-final {
  left: clamp(20px, 4vw, 64px);
  bottom: clamp(24px, 6vh, 72px);
  width: min(460px, 38vw);
  color: var(--cy-paper);
  opacity: 0;
  pointer-events: none;
}
.cy-final__kicker { margin: 0 0 14px; font: 500 10.5px/1.4 var(--cy-mono); letter-spacing: 0.16em; text-transform: uppercase; }
.cy-final__kicker::before { content: ''; display: inline-block; width: 8px; height: 8px; margin-right: 10px; background: var(--cy-lime); vertical-align: 0; }
.cy-final__title { margin: 0; font: 400 clamp(52px, 6.4vw, 118px)/0.86 var(--cy-serif); letter-spacing: -0.04em; }
.cy-final__title em { font-style: italic; color: #8fb0ff; }
.cy-final__body { margin: 18px 0 22px; font-size: 14px; line-height: 1.5; color: rgba(245, 241, 230, 0.75); }
.cy-final__row { display: flex; flex-wrap: wrap; gap: 8px; }
.cy-final__btn { color: var(--cy-paper); border: 1px solid rgba(245, 241, 230, 0.5); padding: 13px 18px; }
.cy-final__btn:hover { background: var(--cy-lime); border-color: var(--cy-lime); color: var(--cy-ink); }
.cy-final__btn--solid { background: var(--cy-paper); color: var(--cy-blue); border-color: var(--cy-paper); }
.cy-final__btn:disabled { opacity: 0.6; cursor: default; }

/* ----------------------------------------------------------- responsive */
@media (max-width: 699px) {
  .cy-top { grid-template-columns: 1fr auto; }
  .cy-top__c { display: none; }
  .cy-head { top: 54px; font-size: clamp(40px, 11vw, 56px); }
  .cy-head .ln:first-child { display: inline-block; margin-right: 0.22em; }
  .cy-head .ln { display: inline-block; }
  .cy-sub { top: auto; bottom: 104px; left: 108px; right: 16px; width: auto; }
  .cy-sub__in { font-size: 11.5px; line-height: 1.4; }
  .cy-sunbtn { left: 16px; bottom: 18px; width: 80px; height: 80px; }
  .cy-sunbtn__label { font-size: 9px; width: 56px; }
  .cy-dock { left: 112px; right: 12px; bottom: 30px; display: flex; justify-content: flex-end; }
  .cy-dock button { padding: 11px 10px; font-size: 9.5px; letter-spacing: 0.1em; }
  .cy-final { left: 20px; right: 20px; width: auto; bottom: 22px; }
  .cy-final__title { font-size: clamp(40px, 11vw, 56px); }
  .cy-final__body { font-size: 12.5px; margin: 10px 0 14px; }
}
@media (min-width: 700px) and (max-width: 1000px) {
  .cy-sub { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .cy-water__surface { animation: none; }
  .cy-spec.is-turning { transition: none; }
  .cy-sun { transition: none; }
}
```

## Assets

Cyanotype has no image files. The cuttings are the SVG paths in `src/specimens.ts`. The paper, the coat, and the blue are painted by `PrintEngine`.

## Build / run

```
npm create vite@latest cyanotype -- --template react-ts
cd cyanotype
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the six source files, then `npm run dev`. `src/main.tsx` mounts `<CyanotypeHero />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- Saving the PNG can be blocked in a sandboxed iframe that does not allow downloads. The print is still on the page.
- The 9-minute auto exposure only happens if you rinse before the mean exposure reaches `0.1`.
- No APIs, keys, or accounts are needed.
