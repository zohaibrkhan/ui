<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Herbarium

Herbarium is a full-page hero of twelve pressed sheets on a paper desk. They land in a pile. Throw one and it slides. Click or tap a sheet and it flips to its catalogue back. Scroll sorts them into an index grid, shows “One summer, filed flat.”, then the camera dives into sheet 07, the rose of Sharon, and the finale reads “Kept.” Shuffle throws the pile again.

Rebuild it as the only thing on the page. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Copy `src/assets/sheet-01.webp` through `src/assets/sheet-12.webp` from this section into the new project at those same paths. `src/specimens.ts` imports them as `./assets/sheet-XX.webp`.

## Stack & dependencies

React 19, TypeScript, and Vite. The intro and the scroll story are `gsap` with `ScrollTrigger`. Smooth scrolling is `lenis`, only when reduced motion is off. The desk is DOM cards driven by `DeskEngine`. There is no canvas and no `three`.

Fonts, imported in `src/main.tsx`:

- `@fontsource/instrument-serif` at 400 and 400 italic — the wordmark, the headline, the index title, the Latin names, the finale title
- `@fontsource-variable/inter` — the page’s default sans and the aside
- `@fontsource/ibm-plex-mono` at 500 — the header, the sheet numbers, the dock, the kicker, the button, the loader

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Desk `#e7e1cf` (`--hb-bg`). Sheet `#f6f2e6`. Ink `#1d2117`. Soft ink `rgba(29, 33, 23, 0.62)`. Dim `rgba(29, 33, 23, 0.4)`. Rules `rgba(29, 33, 23, 0.16)`. Lime `#d6f06b`.

Type:

- `--hb-serif`: `'Instrument Serif', 'Times New Roman', serif`
- `--hb-sans`: `'Inter Variable', 'Inter', system-ui, sans-serif`
- `--hb-mono`: `'IBM Plex Mono', ui-monospace, monospace`

Document title: `Herbarium — Oversight Supply`. Theme colour: `#e7e1cf`.

The track is `460vh`. The stage is sticky, `100vh` / `100svh`, `overflow: clip`. Accessible name: `Herbarium — a pile of pressed specimens`. `data-mode` on the stage is `pile`, then whatever `DeskEngine` writes (`onMode`). `data-ready` is set when all twelve images have loaded or failed.

**Headline.**

```
Some things
deserve to
be kept.
```

`kept.` is an `<em>`.

**Header.** `Oversight Supply` · `Herbarium` italic `Vol. III` · `Sheets read` and a count `00`–`12` over `/12`. A sheet counts as read the first time it is flipped, and it stays counted if you flip it back.

**Aside.** `Twelve pressings from one June. ` then either `Drag to throw them around, tap one to read its back.` or `Throw them around. Click one to read its back.`

**Dock.** `Shuffle` (disabled until the images have settled) and `Sort the sheets ↓`.

**Index**, shown mid-scroll: kicker `Index of specimens · 12 sheets`. Title `One summer, ` italic `filed flat.`

**Finale.** Kicker is sheet 07: `No. 07 · Hibiscus syriacus · pressed 14 Jun`. Title `Kept.` Body is that sheet’s note: `The one this whole book is for.` Button `Scatter them again` and `↑`.

**Loader.** `Pressing sheets {nn}/12` until every image has loaded or failed.

**Sheets.** `FEATURE` is index `6` (No. 07). Tape is `top`, `corners`, or `side`. Front: photo, `No. {nn}`, the Latin name, and a tape strip. Back: `Catalogue entry · {nn}/12`, Latin, common name, `Pressed` date, `Found` place, and the note in curly quotes `“…”`. Image alt is `Pressed specimen: {common}`. A failed image leaves the sheet without a photo; the label still shows.

| No. | Latin | Common | Pressed | Place | Note | Tape |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | Symphyotrichum | Aster, violet | 02 Jun | Roadside, north verge | Picked for the colour. Kept for the stems. | top |
| 02 | Papaver cambricum | Welsh poppy | 05 Jun | Garden wall, east | Tissue-thin. Held its yellow a week. | corners |
| 03 | Bellis perennis | Daisy, scattered | 09 Jun | The lawn nobody mowed | Forty heads, one afternoon. | side |
| 04 | Hydrangea macrophylla | Hydrangea, bleached | 11 Jun | Grandmother’s porch | Blue once. Paper now. | top |
| 05 | Composite sheet | Lily, viola, crocus | 12 Jun | Kitchen table | Everything left after the dinner. | corners |
| 06 | Petunia × atkinsiana | Petunia, bronze | 13 Jun | Window box, 3rd floor | Pressed too late. Better for it. | side |
| 07 | Hibiscus syriacus | Rose of Sharon | 14 Jun | Back garden, after rain | The one this whole book is for. | top |
| 08 | Composite sheet | Fern & field daisy | 18 Jun | Train window, eventually | Collected on the way. Arranged at home. | corners |
| 09 | Rosa × centifolia | Rose petals, loose | 21 Jun | A bouquet that outlived its reason | Longest day. Shortest vase life. | side |
| 10 | Field kit | Sage, thistle, seed | 24 Jun | Allotment 14 | Dried, not pressed. Rules bend. | top |
| 11 | Athyrium filix-femina | Lady fern | 27 Jun | Shade by the stream | Unfurled in the press. Nearly. | corners |
| 12 | Rosa ‘Peach’ | Rose, peach | 30 Jun | Last of the season | Closing the book on June. | side |

The apostrophe in Grandmother’s and Rosa ‘Peach’ is a curly quote as in `specimens.ts`. The multiply sign in Petunia is `×`.

## Interactions & animation timeline

`SORTED_AT` is `0.5`.

```
sort = smooth(0.07, 0.46, p)
zoom = smooth(0.6, 0.9, p)
```

**Intro**, delay `0.2`, ease `expo.out`, only if motion is allowed: header, then headline lines at `0.15`, then aside and dock at `0.8`.

**Scroll**, `scrub: 0.6`.

| From | To | What changes |
| --- | --- | --- |
| 0.00 | 1.00 | `setStory(sort, zoom)`. |
| 0.04 | 0.11 | Headline, aside, and dock fade and rise. |
| 0.36 | 0.42 | The index fades in. |
| 0.58 | 0.63 | The index fades out. |
| 0.91 | 0.98 | The finale fades in. |

Cards sort with a stagger of `0.045` seconds each (`STAGGER` in `DeskEngine`). A thrown sheet slides to rest (`LIN_DRAG` `4.2`, `ANG_DRAG` `5`). A grab that barely moves is a tap and flips the card. Keyboard activation uses the invisible `.hb-card__key` button (`e.detail === 0`), because pointer taps are handled by the desk.

**Reduced motion** parks at `0`, `0.5`, or `1` and calls `render()` so the cards jump. Card flip transitions are `none`.

**Shuffle** re-deals the pile. **Sort the sheets** scrolls to `0.5` (1.6s). **Scatter them again** clears the flipped set, scrolls to 0 (2.2s), and shuffles.

The engine starts only after all twelve images have settled. `deal()` runs once. The ticker runs only while the track is in view and the document is visible.

## Responsive behaviour

**Desktop, wider than 700px.** Headline on the left. Aside visible. Sheet backs show the note.

**700px and under.** Header hides `Herbarium Vol. III`. Headline moves to `top: 66px`, `clamp(44px, 13vw, 68px)`. Aside is `display: none`. Dock spans the bottom. Index title is 26px. `.hb-card__note` is `display: none`.

## Accessibility & robustness

- The desk is `aria-label="Specimen sheets"`. Each flip control is `aria-label="Turn over sheet {nn}, {common}"` and `aria-pressed`.
- The back face is `aria-hidden` until that sheet is flipped.
- A broken image still counts toward dismissing the loader. The sheet remains, without the photograph.
- The cover image used in the dive is `aria-hidden` and has `alt=""`.
- **StrictMode.** Scroll state is a fresh object inside `gsap.context`. The engine is dropped on cleanup.

## Performance notes

- One transform write per card per frame. Positions are centres in stage pixels.
- Images are preloaded before the physics starts, so the first deal is not waiting on decode.
- The loop is removed when the section is off-screen.

## Full source code

Create these six files exactly. Do not reformat them. Copy the twelve WebP files into `src/assets/`. Delete unused Vite template files `App.tsx`, `App.css`, `index.css`, and `vite.svg`. Keep `vite.config.ts` and the `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#e7e1cf" />
    <title>Herbarium — Oversight Supply</title>
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
import './herbarium.css'
import HerbariumHero from './HerbariumHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HerbariumHero />
  </StrictMode>,
)
```

### `src/HerbariumHero.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { DeskEngine, type Mode } from './DeskEngine'
import { FEATURE, SPECIMENS } from './specimens'

gsap.registerPlugin(ScrollTrigger)

const smooth = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
// scroll story: 0 → pile, SORT → index grid, 1 → inside sheet 07
const story = (p: number) => ({ sort: smooth(0.07, 0.46, p), zoom: smooth(0.6, 0.9, p) })
const SORTED_AT = 0.5

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

export default function HerbariumHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<DeskEngine | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const progressRef = useRef(0)
  const reduced = usePrefersReducedMotion()

  const [loaded, setLoaded] = useState(0)
  const [broken, setBroken] = useState<Set<number>>(() => new Set())
  const [flipped, setFlipped] = useState<Set<number>>(() => new Set())
  const [read, setRead] = useState<Set<number>>(() => new Set())
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
  const ready = loaded >= SPECIMENS.length

  /* ------------------------------------------------ preload every sheet */
  useEffect(() => {
    let alive = true
    SPECIMENS.forEach((s, i) => {
      const img = new Image()
      img.onload = () => alive && setLoaded((n) => n + 1)
      img.onerror = () => {
        if (!alive) return
        setBroken((b) => new Set(b).add(i)) // the sheet still shows, just without its photo
        setLoaded((n) => n + 1)
      }
      img.src = s.src
    })
    return () => {
      alive = false
    }
  }, [])

  /* ------------------------------------------------------------- engine */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !ready) return
    const els = Array.from(stage.querySelectorAll<HTMLElement>('[data-card]'))
    const engine = new DeskEngine(stage, els, coverRef.current, FEATURE)
    engineRef.current = engine
    engine.reduced = reduced
    engine.onMode = (m: Mode) => {
      stage.dataset.mode = m
    }
    engine.resize(stage.clientWidth, stage.clientHeight)
    const s = story(progressRef.current)
    engine.setStory(s.sort, s.zoom)
    engine.deal()
    engine.render()

    let running = false
    let inView = true
    const tick = (_t: number, dtMs: number) => engine.step(dtMs / 1000)
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
    document.addEventListener('visibilitychange', sync)
    sync()
    const ro = new ResizeObserver(() => engine.resize(stage.clientWidth, stage.clientHeight))
    ro.observe(stage)

    return () => {
      gsap.ticker.remove(tick)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', sync)
      engineRef.current = null
    }
  }, [ready]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (engineRef.current) engineRef.current.reduced = reduced
  }, [reduced, ready])

  /* ------------------------------------------------ pointer: throw & tap */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !ready) return
    const local = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const down = (e: PointerEvent) => {
      if (e.button > 0) return
      const p = local(e)
      if (engineRef.current?.grab(e.target as Element, e.pointerId, p.x, p.y)) {
        stage.setPointerCapture(e.pointerId)
        e.preventDefault()
      }
    }
    const move = (e: PointerEvent) => {
      const p = local(e)
      engineRef.current?.move(e.pointerId, p.x, p.y)
    }
    const up = (e: PointerEvent) => {
      const eng = engineRef.current
      if (!eng) return
      const target = document.elementFromPoint(e.clientX, e.clientY)
      const tap = eng.release(e.pointerId)
      const card = eng.cardAt(target)
      if (tap && card) flip(eng.cards.indexOf(card))
    }
    const cancel = () => engineRef.current?.cancel()
    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerup', up)
    stage.addEventListener('pointercancel', cancel)
    return () => {
      stage.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerup', up)
      stage.removeEventListener('pointercancel', cancel)
    }
  }, [ready])

  const flip = (i: number) => {
    setFlipped((f) => {
      const n = new Set(f)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })
    setRead((r) => (r.has(i) ? r : new Set(r).add(i)))
  }

  /* -------------------------------------------------------- smooth scroll */
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
        gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.2 })
          .from('.hb-top > *', { opacity: 0, y: -8, duration: 1, stagger: 0.08 })
          .from('.hb-head .li', { yPercent: 110, duration: 1.6, stagger: 0.09 }, 0.15)
          .from('.hb-aside__in, .hb-dock__in', { opacity: 0, y: 10, duration: 1.2, stagger: 0.1 }, 0.8)
      }

      const target = { p: 0 } // fresh per run: a StrictMode revert can't zero a shared object
      const apply = (p: number) => {
        progressRef.current = p
        const s = story(p)
        const eng = engineRef.current
        if (eng) {
          eng.setStory(s.sort, s.zoom)
          if (reduced) eng.render()
        }
      }
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      tl.to(target, { p: 1, duration: 1, onUpdate: () => apply(target.p) }, 0)
        .to('.hb-head, .hb-aside, .hb-dock', { opacity: 0, y: -20, duration: 0.07, stagger: 0.015 }, 0.04)
        .fromTo('.hb-index', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.06 }, 0.36)
        .to('.hb-index', { opacity: 0, y: -16, duration: 0.05 }, 0.58)
        .fromTo('.hb-final', { opacity: 0, y: 30, pointerEvents: 'none' }, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.91)

      stRef.current = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        animation: reduced ? undefined : tl,
        scrub: reduced ? false : 0.6,
        onUpdate(self) {
          if (!reduced) return
          // discrete states only: pile → index → sheet
          const p = self.progress > 0.75 ? 1 : self.progress > 0.25 ? SORTED_AT : 0
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

  const scrollToProgress = (p: number, then?: () => void) => {
    const st = stRef.current
    if (!st) return
    const y = st.start + (st.end - st.start) * p
    if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: p === 0 ? 2.2 : 1.6, onComplete: then })
    else {
      window.scrollTo({ top: y, behavior: 'auto' })
      then?.()
    }
  }
  const scatterAgain = () => {
    setFlipped(new Set())
    scrollToProgress(0, () => engineRef.current?.shuffle())
  }

  const count = String(read.size).padStart(2, '0')

  return (
    <main className="hb-root" data-ready={ready}>
      <section ref={trackRef} className="hb-track" aria-label="Herbarium — a pile of pressed specimens">
        <div ref={stageRef} className="hb-stage" data-mode="pile">
          <div className="hb-paper" aria-hidden="true" />

          <h1 className="hb-head">
            <span className="ln"><span className="li">Some things</span></span>
            <span className="ln"><span className="li">deserve to</span></span>
            <span className="ln"><span className="li">be <em>kept.</em></span></span>
          </h1>

          <div className="hb-desk" aria-label="Specimen sheets">
            {SPECIMENS.map((s, i) => (
              <div
                key={s.no}
                data-card
                className={`hb-card${flipped.has(i) ? ' is-flipped' : ''}${i === FEATURE ? ' is-feature' : ''}`}
              >
                <div className="hb-card__inner">
                  <div className="hb-card__face hb-card__front">
                    <div className="hb-card__photo">
                      {!broken.has(i) && <img src={s.src} alt={`Pressed specimen: ${s.common}`} draggable={false} />}
                    </div>
                    <div className="hb-card__label">
                      <span className="hb-card__no">No. {s.no}</span>
                      <span className="hb-card__name">{s.latin}</span>
                    </div>
                    <i className={`hb-tape hb-tape--${s.tape}`} aria-hidden="true" />
                  </div>
                  <div className="hb-card__face hb-card__back" aria-hidden={!flipped.has(i)}>
                    <span className="hb-card__kicker">Catalogue entry · {s.no}/12</span>
                    <span className="hb-card__latin">{s.latin}</span>
                    <span className="hb-card__common">{s.common}</span>
                    <dl>
                      <dt>Pressed</dt><dd>{s.pressed}</dd>
                      <dt>Found</dt><dd>{s.place}</dd>
                    </dl>
                    <p className="hb-card__note">“{s.note}”</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="hb-card__key"
                  aria-pressed={flipped.has(i)}
                  aria-label={`Turn over sheet ${s.no}, ${s.common}`}
                  onClick={(e) => e.detail === 0 && flip(i)} /* keyboard only; pointer taps are handled by the desk */
                />
              </div>
            ))}
          </div>

          <div ref={coverRef} className="hb-cover" aria-hidden="true">
            <img src={SPECIMENS[FEATURE].src} alt="" draggable={false} />
          </div>

          <header className="hb-top">
            <span>Oversight Supply</span>
            <span className="hb-top__c">Herbarium <em>Vol. III</em></span>
            <span className="hb-top__r">Sheets read <b>{count}</b>/12</span>
          </header>

          <div className="hb-aside">
            <p className="hb-aside__in">
              Twelve pressings from one June.{' '}
              {isTouch ? 'Drag to throw them around, tap one to read its back.' : 'Throw them around. Click one to read its back.'}
            </p>
          </div>

          <div className="hb-dock">
            <div className="hb-dock__in">
              <button type="button" onClick={() => engineRef.current?.shuffle()} disabled={!ready}>Shuffle</button>
              <button type="button" onClick={() => scrollToProgress(SORTED_AT)} disabled={!ready}>Sort the sheets ↓</button>
            </div>
          </div>

          <div className="hb-index" aria-hidden="true">
            <p className="hb-index__kicker">Index of specimens · 12 sheets</p>
            <p className="hb-index__title">One summer, <em>filed flat.</em></p>
          </div>

          <div className="hb-final">
            <p className="hb-final__kicker">No. {SPECIMENS[FEATURE].no} · {SPECIMENS[FEATURE].latin} · pressed {SPECIMENS[FEATURE].pressed}</p>
            <h2 className="hb-final__title">Kept.</h2>
            <p className="hb-final__body">{SPECIMENS[FEATURE].note}</p>
            <button type="button" className="hb-final__btn" onClick={scatterAgain}>
              Scatter them again <span aria-hidden="true">↑</span>
            </button>
          </div>

          {!ready && (
            <div className="hb-loader" role="status">
              Pressing sheets {String(loaded).padStart(2, '0')}/12
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
```

### `src/DeskEngine.ts`

```ts
/**
 * DeskEngine — paper-on-a-table physics for a pile of DOM cards, plus the
 * scroll choreography (pile → index grid → camera dive into one sheet).
 *
 * Cards are plain DOM elements; every frame the engine writes a single
 * transform per card. Positions are card centres in stage pixels.
 */

// card geometry, as fractions of card width (must match herbarium.css)
export const CARD_H = 1.4
const PHOTO_W = 0.88
const PHOTO_H = 1.1
const PHOTO_CY = 0.06 + PHOTO_H / 2 - CARD_H / 2 // photo centre relative to card centre

const LIN_DRAG = 4.2 // 1/s — how quickly a thrown sheet slides to rest
const ANG_DRAG = 5
const STAGGER = 0.045 // sort: each card leaves the pile a little after the previous one

type Card = {
  el: HTMLElement
  x: number
  y: number
  a: number
  vx: number
  vy: number
  va: number
  hx: number // pile home (normalised 0..1)
  hy: number
  ha: number
  gx: number // index-grid slot (px)
  gy: number
  spawnAt: number // seconds; card is off-table until then
  inside: boolean
  z: number
}

type Drag = {
  card: Card
  id: number
  lx: number // grab point in card-local coords
  ly: number
  px: number
  py: number
  sx: number // start point, for tap detection
  sy: number
  moved: number
  t: number
  svx: number
  svy: number
  sva: number
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const rnd = (a: number, b: number) => a + Math.random() * (b - a)

export type Mode = 'pile' | 'index' | 'zoom'

export class DeskEngine {
  cards: Card[] = []
  w = 1
  h = 1
  cw = 200
  gridScale = 1
  sort = 0
  zoom = 0
  feature: number
  reduced = false
  mode: Mode = 'pile'
  onMode?: (m: Mode) => void
  private drag: Drag | null = null
  private topZ = 20
  private clock = 0
  private cover: HTMLElement | null
  private stage: HTMLElement

  constructor(stage: HTMLElement, els: HTMLElement[], cover: HTMLElement | null, feature: number) {
    this.stage = stage
    this.cover = cover
    this.feature = feature
    this.cards = els.map((el, i) => ({
      el, x: 0, y: 0, a: 0, vx: 0, vy: 0, va: 0, hx: 0.5, hy: 0.5, ha: 0,
      gx: 0, gy: 0, spawnAt: 0, inside: false, z: i + 1,
    }))
    this.pickHomes()
  }

  /* ------------------------------------------------------------ layout */
  private get mobile() {
    return this.w < 700
  }

  /** scattered but even: one jittered cell per card inside the table area */
  private pickHomes() {
    const n = this.cards.length
    const cols = this.w < 700 ? 3 : 4
    const rows = Math.ceil(n / cols)
    const order = this.cards.map((_, i) => i).sort(() => Math.random() - 0.5)
    order.forEach((ci, k) => {
      const c = this.cards[ci]
      const col = k % cols
      const row = Math.floor(k / cols)
      c.hx = (col + 0.5 + rnd(-0.32, 0.32)) / cols
      c.hy = (row + 0.5 + rnd(-0.3, 0.3)) / rows
      c.ha = rnd(-0.38, 0.38)
    })
  }

  /** pile area in px (desktop leaves the headline corner mostly clear) */
  private homePx(c: Card) {
    const { w, h } = this
    if (this.mobile) return { x: w * (0.14 + c.hx * 0.72), y: h * (0.36 + c.hy * 0.42) }
    return { x: w * (0.36 + c.hx * 0.57), y: h * (0.2 + c.hy * 0.6) }
  }

  resize(w: number, h: number) {
    const ow = this.w
    const oh = this.h
    this.w = w
    this.h = h
    this.cw = this.mobile ? clamp(w * 0.3, 96, 150) : clamp(Math.min(w * 0.13, h * 0.22), 130, 230)
    this.stage.style.setProperty('--cw', `${this.cw}px`)
    // keep thrown cards where they were, proportionally
    for (const c of this.cards) {
      c.x *= w / ow
      c.y *= h / oh
    }
    this.layoutGrid()
    this.layoutCover()
  }

  private layoutGrid() {
    const n = this.cards.length
    const { w, h } = this
    const top = this.mobile ? 118 : 150
    const bottom = this.mobile ? 40 : 56
    const side = this.mobile ? 16 : Math.max(32, w * 0.06)
    const gap = this.mobile ? 10 : 18
    const availW = w - side * 2
    const availH = h - top - bottom
    let best = { cols: 4, size: 0 }
    for (let cols = 2; cols <= 8; cols++) {
      const rows = Math.ceil(n / cols)
      const size = Math.min((availW - gap * (cols - 1)) / cols, (availH - gap * (rows - 1)) / rows / CARD_H)
      if (size > best.size) best = { cols, size }
    }
    const { cols, size } = best
    const rows = Math.ceil(n / cols)
    const gridW = cols * size + (cols - 1) * gap
    const gridH = rows * size * CARD_H + (rows - 1) * gap
    const x0 = (w - gridW) / 2 + size / 2
    const y0 = top + (availH - gridH) / 2 + (size * CARD_H) / 2
    this.gridScale = size / this.cw
    this.cards.forEach((c, i) => {
      c.gx = x0 + (i % cols) * (size + gap)
      c.gy = y0 + Math.floor(i / cols) * (size * CARD_H + gap)
    })
  }

  /** the final full-bleed image sits exactly where the zoomed photo lands */
  private get coverScale() {
    const pw = PHOTO_W * this.cw * this.gridScale
    const ph = PHOTO_H * this.cw * this.gridScale
    return Math.max(this.w / pw, this.h / ph) * 1.002
  }

  private layoutCover() {
    if (!this.cover) return
    const s = this.coverScale
    const pw = PHOTO_W * this.cw * this.gridScale * s
    const ph = PHOTO_H * this.cw * this.gridScale * s
    Object.assign(this.cover.style, {
      width: `${pw}px`,
      height: `${ph}px`,
      left: `${(this.w - pw) / 2}px`,
      top: `${(this.h - ph) / 2}px`,
    })
  }

  /* ----------------------------------------------------------- tossing */
  /** throw every sheet onto the table from below the fold */
  deal() {
    this.clock = 0
    this.cards.forEach((c, i) => {
      const home = this.homePx(c)
      const sx = home.x + rnd(-0.2, 0.2) * this.w
      const sy = this.h + this.cw * CARD_H
      if (this.reduced) {
        Object.assign(c, { x: home.x, y: home.y, a: c.ha, vx: 0, vy: 0, va: 0, inside: true, spawnAt: 0 })
        return
      }
      c.x = sx
      c.y = sy
      c.inside = false
      c.spawnAt = 0.15 + i * 0.075
      this.launch(c, home.x, home.y, c.ha)
    })
  }

  /** re-scatter from wherever the cards are now */
  shuffle() {
    this.drag = null
    this.pickHomes()
    this.cards.forEach((c, i) => {
      const home = this.homePx(c)
      if (this.reduced) {
        Object.assign(c, { x: home.x, y: home.y, a: c.ha, vx: 0, vy: 0, va: 0 })
        return
      }
      c.spawnAt = this.clock + i * 0.03
      this.launch(c, home.x, home.y, c.ha + rnd(-0.6, 0.6))
    })
  }

  /** velocity that makes exponential drag bring the card to rest exactly at (tx, ty, ta) */
  private launch(c: Card, tx: number, ty: number, ta: number) {
    c.vx = (tx - c.x) * LIN_DRAG
    c.vy = (ty - c.y) * LIN_DRAG
    const spin = rnd(-1.4, 1.4)
    c.a = ta - spin
    c.va = spin * ANG_DRAG
  }

  /* ---------------------------------------------------------- dragging */
  get interactive() {
    return this.sort < 0.002
  }

  cardAt(el: Element | null) {
    const node = el?.closest<HTMLElement>('[data-card]')
    return node ? this.cards.find((c) => c.el === node) ?? null : null
  }

  grab(el: Element | null, id: number, px: number, py: number) {
    if (!this.interactive) return false
    const c = this.cardAt(el)
    if (!c) return false
    const dx = px - c.x
    const dy = py - c.y
    const cos = Math.cos(-c.a)
    const sin = Math.sin(-c.a)
    this.drag = {
      card: c, id, px, py, sx: px, sy: py, moved: 0, t: performance.now(),
      lx: dx * cos - dy * sin, ly: dx * sin + dy * cos, svx: 0, svy: 0, sva: 0,
    }
    c.vx = c.vy = c.va = 0
    c.inside = true
    c.spawnAt = 0
    c.z = ++this.topZ
    c.el.classList.add('is-held')
    return true
  }

  move(id: number, px: number, py: number) {
    const d = this.drag
    if (!d || d.id !== id) return
    const c = d.card
    const now = performance.now()
    const dt = Math.max(1, now - d.t) / 1000
    const mx = px - d.px
    const my = py - d.py
    d.moved += Math.abs(mx) + Math.abs(my)
    // torque: pulling a sheet off-centre swings it around the grab point
    const rx = d.px - c.x
    const ry = d.py - c.y
    const lever = this.cw * 0.9
    const da = clamp(((rx * my - ry * mx) / (rx * rx + ry * ry + lever * lever)) * 0.9, -0.25, 0.25)
    const ox = c.x
    const oy = c.y
    c.a += da
    const cos = Math.cos(c.a)
    const sin = Math.sin(c.a)
    c.x = px - (d.lx * cos - d.ly * sin)
    c.y = py - (d.lx * sin + d.ly * cos)
    const k = 1 - Math.exp(-dt * 18) // smoothed release velocity
    d.svx += ((c.x - ox) / dt - d.svx) * k
    d.svy += ((c.y - oy) / dt - d.svy) * k
    d.sva += (da / dt - d.sva) * k
    d.px = px
    d.py = py
    d.t = now
  }

  /** returns true when the gesture was a tap (so the card should flip) */
  release(id: number) {
    const d = this.drag
    if (!d || d.id !== id) return false
    const c = d.card
    c.el.classList.remove('is-held')
    this.drag = null
    // a pause before letting go kills the throw, like real paper
    const idle = performance.now() - d.t > 90
    if (!this.reduced && !idle) {
      const max = 4200
      const sp = Math.hypot(d.svx, d.svy)
      const f = sp > max ? max / sp : 1
      c.vx = d.svx * f
      c.vy = d.svy * f
      c.va = clamp(d.sva, -14, 14)
    }
    return d.moved < 7
  }

  cancel() {
    if (this.drag) this.drag.card.el.classList.remove('is-held')
    this.drag = null
  }

  /* ------------------------------------------------------------- frame */
  setStory(sort: number, zoom: number) {
    this.sort = sort
    this.zoom = zoom
    if (!this.interactive) this.cancel()
    const mode: Mode = zoom > 0.02 ? 'zoom' : sort > 0.002 ? 'index' : 'pile'
    if (mode !== this.mode) {
      this.mode = mode
      this.onMode?.(mode)
    }
  }

  step(dt: number) {
    dt = Math.min(dt, 1 / 30)
    this.clock += dt
    const { w, h, cw } = this
    const m = cw * 0.32
    for (const c of this.cards) {
      if (this.drag?.card === c || this.clock < c.spawnAt) continue
      c.x += c.vx * dt
      c.y += c.vy * dt
      c.a += c.va * dt
      const lin = Math.exp(-LIN_DRAG * dt)
      c.vx *= lin
      c.vy *= lin
      c.va *= Math.exp(-ANG_DRAG * dt)
      if (!c.inside) {
        if (c.y < h - m && c.x > m && c.x < w - m) c.inside = true
        continue
      }
      // table edges: sheets bounce softly and may hang over a little
      if (c.x < m) { c.x = m; c.vx = Math.abs(c.vx) * 0.45; c.va += c.vy * 0.002 }
      if (c.x > w - m) { c.x = w - m; c.vx = -Math.abs(c.vx) * 0.45; c.va -= c.vy * 0.002 }
      if (c.y < m + 50) { c.y = m + 50; c.vy = Math.abs(c.vy) * 0.45; c.va -= c.vx * 0.002 }
      if (c.y > h - m) { c.y = h - m; c.vy = -Math.abs(c.vy) * 0.45; c.va += c.vx * 0.002 }
    }
    this.render()
  }

  render() {
    const { w, h, cw, cards, feature } = this
    const n = cards.length
    const span = 1 - STAGGER * (n - 1)
    // camera dive (exponential zoom so it feels even from start to finish)
    const ez = ease(this.zoom)
    const S1 = this.coverScale
    const S = Math.pow(S1, ez)
    const f = cards[feature]
    const fx = f.gx
    const fy = f.gy + PHOTO_CY * cw * this.gridScale
    const pull = S1 > 1.0001 ? (1 - 1 / S) / (1 - 1 / S1) : 0
    const tx = w / 2 + (fx - w / 2) * pull
    const ty = h / 2 + (fy - h / 2) * pull
    const fade = 1 - clamp((ez - 0.15) / 0.4, 0, 1)

    cards.forEach((c, i) => {
      const t = ease(clamp((this.sort - i * STAGGER) / span, 0, 1))
      // shortest way back to upright
      const a0 = Math.atan2(Math.sin(c.a), Math.cos(c.a))
      let x = c.x + (c.gx - c.x) * t
      let y = c.y + (c.gy - c.y) * t
      const a = a0 * (1 - t)
      let s = 1 + (this.gridScale - 1) * t
      s *= 1 + Math.sin(Math.PI * t) * 0.12 // lifted off the table on the way
      x = w / 2 + (x - tx) * S
      y = h / 2 + (y - ty) * S
      s *= S
      const style = c.el.style
      style.transform = `translate3d(${(x - cw / 2).toFixed(1)}px, ${(y - (cw * CARD_H) / 2).toFixed(1)}px, 0) rotate(${a.toFixed(4)}rad) scale(${s.toFixed(4)})`
      style.zIndex = String(i === feature && this.zoom > 0 ? 999 : t > 0 && t < 1 ? 500 + i : c.z)
      style.opacity = i === feature ? '1' : fade.toFixed(3)
      style.visibility = this.clock < c.spawnAt && !c.inside ? 'hidden' : 'visible'
    })
    if (this.cover) this.cover.style.opacity = clamp((this.zoom - 0.86) / 0.1, 0, 1).toFixed(3)
  }
}
```

### `src/specimens.ts`

```ts
import s01 from './assets/sheet-01.webp'
import s02 from './assets/sheet-02.webp'
import s03 from './assets/sheet-03.webp'
import s04 from './assets/sheet-04.webp'
import s05 from './assets/sheet-05.webp'
import s06 from './assets/sheet-06.webp'
import s07 from './assets/sheet-07.webp'
import s08 from './assets/sheet-08.webp'
import s09 from './assets/sheet-09.webp'
import s10 from './assets/sheet-10.webp'
import s11 from './assets/sheet-11.webp'
import s12 from './assets/sheet-12.webp'

export type Specimen = {
  no: string
  latin: string
  common: string
  src: string
  pressed: string
  place: string
  note: string
  tape: 'top' | 'corners' | 'side'
}

export const SPECIMENS: Specimen[] = [
  { no: '01', latin: 'Symphyotrichum', common: 'Aster, violet', src: s01, pressed: '02 Jun', place: 'Roadside, north verge', note: 'Picked for the colour. Kept for the stems.', tape: 'top' },
  { no: '02', latin: 'Papaver cambricum', common: 'Welsh poppy', src: s02, pressed: '05 Jun', place: 'Garden wall, east', note: 'Tissue-thin. Held its yellow a week.', tape: 'corners' },
  { no: '03', latin: 'Bellis perennis', common: 'Daisy, scattered', src: s03, pressed: '09 Jun', place: 'The lawn nobody mowed', note: 'Forty heads, one afternoon.', tape: 'side' },
  { no: '04', latin: 'Hydrangea macrophylla', common: 'Hydrangea, bleached', src: s04, pressed: '11 Jun', place: 'Grandmother’s porch', note: 'Blue once. Paper now.', tape: 'top' },
  { no: '05', latin: 'Composite sheet', common: 'Lily, viola, crocus', src: s05, pressed: '12 Jun', place: 'Kitchen table', note: 'Everything left after the dinner.', tape: 'corners' },
  { no: '06', latin: 'Petunia × atkinsiana', common: 'Petunia, bronze', src: s06, pressed: '13 Jun', place: 'Window box, 3rd floor', note: 'Pressed too late. Better for it.', tape: 'side' },
  { no: '07', latin: 'Hibiscus syriacus', common: 'Rose of Sharon', src: s07, pressed: '14 Jun', place: 'Back garden, after rain', note: 'The one this whole book is for.', tape: 'top' },
  { no: '08', latin: 'Composite sheet', common: 'Fern & field daisy', src: s08, pressed: '18 Jun', place: 'Train window, eventually', note: 'Collected on the way. Arranged at home.', tape: 'corners' },
  { no: '09', latin: 'Rosa × centifolia', common: 'Rose petals, loose', src: s09, pressed: '21 Jun', place: 'A bouquet that outlived its reason', note: 'Longest day. Shortest vase life.', tape: 'side' },
  { no: '10', latin: 'Field kit', common: 'Sage, thistle, seed', src: s10, pressed: '24 Jun', place: 'Allotment 14', note: 'Dried, not pressed. Rules bend.', tape: 'top' },
  { no: '11', latin: 'Athyrium filix-femina', common: 'Lady fern', src: s11, pressed: '27 Jun', place: 'Shade by the stream', note: 'Unfurled in the press. Nearly.', tape: 'corners' },
  { no: '12', latin: 'Rosa ‘Peach’', common: 'Rose, peach', src: s12, pressed: '30 Jun', place: 'Last of the season', note: 'Closing the book on June.', tape: 'side' },
]

/** the sheet the camera dives into at the end of the scroll */
export const FEATURE = 6
```

### `src/herbarium.css`

```css
/* Herbarium — pressed sheets on a paper desk */
:root {
  --hb-bg: #e7e1cf;
  --hb-sheet: #f6f2e6;
  --hb-ink: #1d2117;
  --hb-soft: rgba(29, 33, 23, 0.62);
  --hb-dim: rgba(29, 33, 23, 0.4);
  --hb-rule: rgba(29, 33, 23, 0.16);
  --hb-lime: #d6f06b;
  --hb-serif: 'Instrument Serif', 'Times New Roman', serif;
  --hb-sans: 'Inter Variable', 'Inter', system-ui, sans-serif;
  --hb-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: var(--hb-bg); color: var(--hb-ink); }
body { font-family: var(--hb-sans); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

.hb-track { position: relative; height: 460vh; }
.hb-stage {
  --cw: 200px;
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  overflow: clip; /* focus can never scroll the pinned stage */
  background: var(--hb-bg);
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  isolation: isolate;
}

/* paper grain + a soft desk-lamp falloff, all inline */
.hb-paper {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(120% 90% at 62% 40%, transparent 40%, rgba(60, 52, 30, 0.2)),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .2 0 0 0 0 .18 0 0 0 0 .1 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ----------------------------------------------------------------- cards */
.hb-desk { position: absolute; inset: 0; z-index: 2; }
.hb-card {
  position: absolute;
  left: 0;
  top: 0;
  width: var(--cw);
  height: calc(var(--cw) * 1.4);
  font-size: calc(var(--cw) * 0.05);
  transform-origin: 50% 50%;
  will-change: transform;
  cursor: grab;
  visibility: hidden;
}
[data-mode='pile'] .hb-card { touch-action: none; }
[data-mode='index'] .hb-card { cursor: pointer; }
[data-mode='zoom'] .hb-card { cursor: default; pointer-events: none; }
.hb-card.is-held { cursor: grabbing; }

/* a flat flip (scaleX through zero): real 3D faces make Chrome hang when a
   sheet straddles the clipped stage edge mid-throw */
.hb-card__inner {
  position: absolute;
  inset: 0;
  transition: transform 0.7s cubic-bezier(0.65, 0, 0.35, 1);
}
.hb-card.is-flipped .hb-card__inner { transform: scaleX(-1); }
[data-mode='zoom'] .hb-card.is-feature .hb-card__inner { transform: none; }

.hb-card__face {
  position: absolute;
  inset: 0;
  background: var(--hb-sheet);
  box-shadow: 0 1px 1px rgba(40, 32, 12, 0.12), 0 6px 18px -6px rgba(40, 32, 12, 0.35);
  transition: box-shadow 0.3s ease, visibility 0s linear 0.35s;
}
.hb-card.is-flipped .hb-card__front, .hb-card:not(.is-flipped) .hb-card__back { visibility: hidden; }
.hb-card.is-held .hb-card__face { box-shadow: 0 2px 2px rgba(40, 32, 12, 0.1), 0 26px 40px -14px rgba(40, 32, 12, 0.5); }

.hb-card__photo {
  position: absolute;
  left: 6%;
  top: calc(var(--cw) * 0.06);
  width: 88%;
  height: calc(var(--cw) * 1.1);
  overflow: hidden;
  background: #ddd6c2;
}
.hb-card__photo img { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; }

.hb-card__label {
  position: absolute;
  left: 6%;
  right: 6%;
  bottom: 0;
  height: calc(var(--cw) * 0.24);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35em;
}
.hb-card__no { font: 500 1.4em/1 var(--hb-mono); letter-spacing: 0.08em; color: var(--hb-soft); white-space: nowrap; }
.hb-card__name { font: italic 400 2.15em/1 var(--hb-serif); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* lime tape */
.hb-tape { position: absolute; pointer-events: none; }
.hb-tape--top::before, .hb-tape--corners::before, .hb-tape--corners::after, .hb-tape--side::before {
  content: '';
  position: absolute;
  width: calc(var(--cw) * 0.36);
  height: calc(var(--cw) * 0.1);
  background: rgba(214, 240, 107, 0.78);
  box-shadow: 0 1px 2px rgba(40, 32, 12, 0.15);
  mix-blend-mode: multiply;
}
.hb-tape--top { left: 50%; top: 0; }
.hb-tape--top::before { transform: translate(-50%, -45%) rotate(-3deg); }
.hb-tape--corners { inset: 0; }
.hb-tape--corners::before { left: -6%; top: 2%; transform: rotate(-38deg); width: calc(var(--cw) * 0.26); }
.hb-tape--corners::after { right: -6%; bottom: 20%; transform: rotate(-38deg); width: calc(var(--cw) * 0.26); }
.hb-tape--side { right: 0; top: 30%; }
.hb-tape--side::before { transform: translate(-50%, -50%) rotate(84deg); }

.hb-card__back {
  transform: scaleX(-1);
  padding: 9% 8% 8%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  overflow: hidden;
  background:
    repeating-linear-gradient(to bottom, transparent 0 calc(var(--cw) * 0.1 - 1px), rgba(29, 33, 23, 0.07) calc(var(--cw) * 0.1 - 1px) calc(var(--cw) * 0.1)),
    var(--hb-sheet);
}
.hb-card__kicker { font: 500 1.35em/1.2 var(--hb-mono); letter-spacing: 0.12em; text-transform: uppercase; color: var(--hb-dim); }
.hb-card__latin { font: italic 400 3.2em/0.95 var(--hb-serif); margin-top: 0.3em; }
.hb-card__common { font: 400 1.75em/1.2 var(--hb-sans); color: var(--hb-soft); }
.hb-card__back dl { margin: auto 0 0; display: grid; grid-template-columns: auto 1fr; gap: 0.4em 1em; font: 500 1.4em/1.3 var(--hb-mono); }
.hb-card__back dt { color: var(--hb-dim); text-transform: uppercase; letter-spacing: 0.1em; }
.hb-card__back dd { margin: 0; }
.hb-card__note { margin: 0.4em 0 0; padding-top: 0.7em; border-top: 1px solid var(--hb-rule); font: italic 400 2em/1.12 var(--hb-serif); }

/* keyboard access without a hit area: the desk handles pointer taps */
.hb-card__key {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: 0;
  border: 0;
  opacity: 0;
  overflow: hidden;
}
.hb-card:focus-within .hb-card__face { outline: 2px solid var(--hb-ink); outline-offset: 3px; }

/* the full-bleed photo the camera lands on (crisp, laid out at real size) */
.hb-cover { position: absolute; z-index: 3; opacity: 0; pointer-events: none; }
.hb-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* --------------------------------------------------------------- overlay */
.hb-head { position: absolute; z-index: 1; } /* under the cards: move them to read it */
.hb-top, .hb-aside, .hb-dock, .hb-index, .hb-final, .hb-loader { position: absolute; z-index: 4; }

.hb-top {
  top: 0;
  left: clamp(16px, 2.4vw, 32px);
  right: clamp(16px, 2.4vw, 32px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: clamp(14px, 1.8vw, 22px) 0 12px;
  border-bottom: 1px solid var(--hb-rule);
  font: 500 10.5px/1 var(--hb-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  pointer-events: none;
}
.hb-top__c em { font-family: var(--hb-serif); font-size: 15px; letter-spacing: 0.02em; text-transform: none; }
.hb-top__r { justify-self: end; color: var(--hb-soft); }
.hb-top__r b { font-weight: 500; color: var(--hb-ink); background: var(--hb-lime); padding: 2px 4px; }
[data-mode='zoom'] .hb-top { color: #f6f2e6; border-color: rgba(246, 242, 230, 0.25); transition: color 0.4s ease; }
[data-mode='zoom'] .hb-top__r { color: rgba(246, 242, 230, 0.7); }

.hb-head {
  left: clamp(16px, 3vw, 44px);
  bottom: clamp(24px, 5vw, 72px);
  margin: 0;
  font-family: var(--hb-serif);
  font-weight: 400;
  font-size: clamp(56px, 8.4vw, 150px);
  line-height: 0.86;
  letter-spacing: -0.035em;
  pointer-events: none;
}
.hb-head .ln { display: block; overflow: hidden; padding-bottom: 0.07em; }
.hb-head .li { display: inline-block; }
.hb-head em { font-style: italic; }

.hb-aside {
  left: clamp(16px, 3vw, 44px);
  top: clamp(76px, 9vw, 110px);
  width: min(270px, 30vw);
  pointer-events: none;
}
.hb-aside__in { margin: 0; font-size: 13px; line-height: 1.5; color: var(--hb-soft); }

.hb-dock { right: clamp(16px, 2.4vw, 32px); bottom: clamp(20px, 3vw, 40px); }
.hb-dock__in {
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--hb-rule);
  border-radius: 999px;
  background: rgba(246, 242, 230, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.hb-dock button, .hb-final__btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--hb-ink);
  font: 500 10.5px/1 var(--hb-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 11px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease;
}
.hb-dock button:hover:not(:disabled) { background: var(--hb-lime); }
.hb-dock button:disabled { opacity: 0.4; cursor: default; }
.hb-dock button:focus-visible, .hb-final__btn:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }

.hb-index {
  left: 0;
  right: 0;
  top: clamp(70px, 7vw, 92px);
  text-align: center;
  opacity: 0;
  pointer-events: none;
}
.hb-index__kicker { margin: 0 0 8px; font: 500 10.5px/1 var(--hb-mono); letter-spacing: 0.16em; text-transform: uppercase; color: var(--hb-soft); }
.hb-index__title { margin: 0; font: 400 clamp(26px, 2.8vw, 42px)/1 var(--hb-serif); letter-spacing: -0.02em; }
.hb-index__title em { font-style: italic; }

.hb-final {
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(22px, 4vw, 64px);
  color: #f6f2e6;
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(20, 16, 8, 0.6), transparent 55%);
}
.hb-final__kicker { margin: 0 0 12px; font: 500 10.5px/1.4 var(--hb-mono); letter-spacing: 0.16em; text-transform: uppercase; }
.hb-final__kicker::before { content: ''; display: inline-block; width: 8px; height: 8px; margin-right: 10px; background: var(--hb-lime); vertical-align: 0; }
.hb-final__title { margin: 0; font: 400 clamp(84px, 17vw, 300px)/0.8 var(--hb-serif); letter-spacing: -0.05em; }
.hb-final__body { margin: 18px 0 22px; font: italic 400 clamp(18px, 1.6vw, 24px)/1.3 var(--hb-serif); }
.hb-final__btn { align-self: flex-start; color: #f6f2e6; border: 1px solid rgba(246, 242, 230, 0.5); padding: 13px 18px; }
.hb-final__btn:hover { background: var(--hb-lime); border-color: var(--hb-lime); color: var(--hb-ink); }

.hb-loader {
  inset: 0;
  display: grid;
  place-items: center;
  font: 500 10.5px/1 var(--hb-mono);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hb-soft);
}

/* ----------------------------------------------------------- responsive */
@media (max-width: 700px) {
  .hb-top { grid-template-columns: 1fr auto; }
  .hb-top__c { display: none; }
  .hb-head { top: 66px; bottom: auto; font-size: clamp(44px, 13vw, 68px); }
  .hb-aside { display: none; }
  .hb-dock { left: 16px; right: 16px; bottom: 16px; display: flex; justify-content: center; }
  .hb-index { top: 60px; }
  .hb-index__title { font-size: 26px; }
  .hb-card__note { display: none; } /* too small to read on a phone-sized sheet */
}

@media (prefers-reduced-motion: reduce) {
  .hb-card__inner, .hb-card__face { transition: none; }
}
[data-mode='zoom'] .hb-card.is-feature .hb-card__front { visibility: visible; }
[data-mode='zoom'] .hb-card.is-feature .hb-card__back { visibility: hidden; }
```

## Assets

Twelve pressed-flower photographs. `src/specimens.ts` imports them. Put them here:

- `src/assets/sheet-01.webp` through `src/assets/sheet-12.webp`

They are not fetched from a URL. Copy the files from this section’s `src/assets/` folder.

## Build / run

```
npm create vite@latest herbarium -- --template react-ts
cd herbarium
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files and the twelve WebP files, then `npm run dev`. `src/main.tsx` mounts `<HerbariumHero />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- If a sheet file is missing, that card has no photograph. The catalogue text still flips.
- Thrown positions are not stored.
- No APIs, keys, or accounts are needed.


## Image assets
IMPORTANT: Do NOT hotlink these URLs in the final site. Download every image below into
the project's own assets folder (e.g. /public/images/<section-name>/) and reference the
local copies. These links are only for fetching the files and may stop working.

- sheet-01.webp: pressed sheet, Aster violet. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-01.webp
- sheet-02.webp: pressed sheet, Welsh poppy. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-02.webp
- sheet-03.webp: pressed sheet, Daisy scattered. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-03.webp
- sheet-04.webp: pressed sheet, Hydrangea bleached. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-04.webp
- sheet-05.webp: pressed sheet, Lily viola and crocus. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-05.webp
- sheet-06.webp: pressed sheet, Petunia bronze. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-06.webp
- sheet-07.webp: pressed sheet, Rose of Sharon. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-07.webp
- sheet-08.webp: pressed sheet, Fern and field daisy. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-08.webp
- sheet-09.webp: pressed sheet, Rose petals loose. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-09.webp
- sheet-10.webp: pressed sheet, Sage thistle and seed. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-10.webp
- sheet-11.webp: pressed sheet, Lady fern. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-11.webp
- sheet-12.webp: pressed sheet, Rose peach. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/herbarium/sheet-12.webp
