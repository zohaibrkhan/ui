<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Joiner

Joiner is a full-page hero of one bare tree, cut into rectangles the way a roll of film would be. Each piece sits a little off, so the tree disagrees with itself. Move across it and the pieces nearest the pointer shift. Click a piece, while you are still at the top of the scroll, to retake it. You start with 36 exposures. At zero the dock becomes `Load a new roll`. Scroll eases the pieces together, then the joined photograph scales up to fill the viewport and the type turns cream: “Planted once. Looked at for good.”

Rebuild it as the only thing on the page. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Copy `src/assets/tree.webp` from this section into the new project at that same path.

## Stack & dependencies

React 19, TypeScript, and Vite. The intro and the scroll story are `gsap` with `ScrollTrigger`. Smooth scrolling is `lenis`, only when reduced motion is off. The pieces are DOM fragments driven by `JoinerEngine`. This section does not use `three`.

Fonts, imported in `src/main.tsx`:

- `@fontsource/instrument-serif` at 400 and 400 italic — the wordmark, the headline, the note, the finale title
- `@fontsource-variable/inter` — the page’s default sans and the aside
- `@fontsource/ibm-plex-mono` at 500 — the header, the date stamps, the dock, the kicker, the button, the loader

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Background `#f2efe9` (`--jn-bg`). Ink `#1d2117`. Soft ink `rgba(29, 33, 23, 0.64)`. Rules `rgba(29, 33, 23, 0.14)`. Paper `#f4f1ea`. Lime `#d6f06b`. Stamp orange `#ff8a2a`.

Type:

- `--jn-serif`: `'Instrument Serif', 'Times New Roman', serif`
- `--jn-sans`: `'Inter Variable', 'Inter', system-ui, sans-serif`
- `--jn-mono`: `'IBM Plex Mono', ui-monospace, monospace`

Document title: `Joiner — Oversight Supply`. Theme colour: `#f2efe9`.

The track is `400vh`. The stage is sticky, `100vh` / `100svh`, `overflow: clip`. Accessible name: `Joiner — one tree, photographed in pieces`. `data-state` is `loading`, `ready`, or `error`.

The photograph’s aspect is `0.8` (width / height). The tile seed is `1987`. `ROLL` is `36`. `JOINED_AT` is `0.48`.

**Desktop box.** Height `min(84% of the stage, 46% of the width / 0.8)`. Width is height × `0.8`. It sits at `x = 64%` of the stage, vertically centred plus 16px.

**Pieces.** `makeTiles(1987, 0.8)` guillotine-cuts the rectangle. A piece is shown when a downscaled sample of the photo finds bark (luma between 22 and 120, blue not above red by 28) or the golden field (below 55% of the height, red above blue by 30). Empty sky is left out. The bottom edge is ragged: pieces whose centre is below `0.9` are dropped about 35% of the time. A few other pieces below `0.22` are kept at random. Date stamps, orange mono, are drawn on some larger pieces below `y = 0.3` (about 16% of those). The stamp reads `’97` or `’98`, a month of 11, 12, 1, or 2, and a day. The apostrophe is `’`.

The box `aria-label` is `A bare tree on a hill under a blue sky, assembled from dozens of separately taken photographs`.

**Header.** `Oversight Supply` · `Joiner` italic `No. 9` · `Exposures` and `{nn}/36` on an orange chip. The count starts at `36` and falls as you retake.

**Headline.**

```
One tree,
many looks.
```

`many looks.` is an `<em>`.

**Aside.**

- Error: `The photograph didn’t load. Check your connection and reload.`
- Roll finished: `That’s the roll finished. Load a new one, or scroll to join the pieces up.`
- Coarse pointer: `Every piece is its own photograph, taken a moment apart. Drag a finger to watch them disagree; tap one to retake it.`
- Otherwise the same sentence with `Move` and `click`.

**Dock.** While exposures remain: `Shuffle the prints`. At zero: `Load a new roll`. Always: `Join them up ↓`.

**Note.** `{tile count} prints, ` italic `one afternoon.` The count is however many tiles `makeTiles` returned, including ones later hidden.

**Finale.** Kicker `Oversight Supply · field-grown trees`. Title `Planted once.` / italic `Looked at for good.` Body: `Bare-root trees, lifted from our own fields in the dormant months and sent out while they sleep.` Button `Take it apart` and `↑`.

**Loader.** `Developing…`

## Interactions & animation timeline

Assemble amount is `smooth(0.08, 0.42, p)`. At 0 the pieces are offset. By `0.42` they have joined.

**Intro**, delay `0.15`, ease `expo.out`: header, headline lines at `0.2`, aside and dock at `0.8`.

**Scroll**, `scrub: 0.6`, `invalidateOnRefresh: true`.

| From | To | What changes |
| --- | --- | --- |
| 0.00 | 1.00 | `setAssemble`. |
| 0.03 | 0.09 | Headline, aside, and dock fade and rise. |
| 0.38 | 0.43 | The note fades in. |
| 0.56 | 0.61 | The note fades out. |
| 0.58 | 0.88 | The box scales to cover the stage (`max(stageW / boxW, stageH / boxH) * 1.02`) and moves to centre, ease `power2.inOut`. |
| 0.74 | 0.82 | The header colour becomes `#f4f1ea`. |
| 0.90 | 0.97 | The finale fades in. |

**Reduced motion** parks at `0`, `0.48`, or `1` (`> 0.75` → 1, `> 0.25` → `0.48`).

**Pointer.** Mouse move and touch move set the pointer in box-local pixels. Mouse leave clears it. A click retakes the piece under the pointer only while progress is at most `0.06` and exposures remain. Each retake spends one frame of the roll.

**Shuffle the prints** re-offsets the pieces. **Load a new roll** sets the count back to 36. **Join them up** scrolls to `0.48`. **Take it apart** scrolls to 0 and shuffles.

**Lenis** `{ lerp: 0.085 }`. Scrolls last 2 seconds, or 2.4 when returning to the top.

## Responsive behaviour

**Desktop, wider than 1000px.** The tree sits right of centre. The aside is visible.

**700px to 1000px.** The aside is `display: none`. The box still uses the desktop size, because that switches at `width < 700`.

**699px and under.** Header hides `Joiner No. 9`. Headline is one line at `top: 54px`, `clamp(40px, 11vw, 56px)`. Aside is centred at the bottom. Dock spans the bottom edge; buttons are 9.5px. Stamps are 7px. The note moves to `bottom: 12%`, centred. The box is `min(94% of the width, 60% of the height × 0.8)` wide, centred, `top: 15%`. Finale title `clamp(44px, 12vw, 64px)`.

## Accessibility & robustness

- The joiner is one `role="img"` with the tree description. Fragment images are `alt=""`.
- If `tree.webp` fails, state is `error` and the aside says so. The loader unmounts because state is no longer `loading`.
- The ticker runs only while the track is in view and the document is visible.
- **StrictMode.** Scroll state is a fresh `{ p: 0 }` inside `gsap.context`.

## Performance notes

- Visibility is sampled once, on a 120×180 canvas, not every frame.
- Each fragment is one DOM node with a transform. The whole photograph sits underneath and is revealed as the pieces join.
- Tile geometry is memoised from the seed, so a re-render does not recut the picture.

## Full source code

Create these five files exactly. Do not reformat them. Copy `src/assets/tree.webp` in beside them. Delete unused Vite template files `App.tsx`, `App.css`, `index.css`, and `vite.svg`. Keep `vite.config.ts` and the `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f2efe9" />
    <title>Joiner — Oversight Supply</title>
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
import './joiner.css'
import JoinerHero from './JoinerHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JoinerHero />
  </StrictMode>,
)
```

### `src/JoinerHero.tsx`

```tsx
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { JoinerEngine, makeTiles, rng } from './JoinerEngine'

gsap.registerPlugin(ScrollTrigger)

const SRC = new URL('./assets/tree.webp', import.meta.url).href
const ASPECT = 0.8 // photo width / height
const SEED = 1987
const ROLL = 36
const MOBILE = 700
const JOINED_AT = 0.48

const smooth = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const assembleOf = (p: number) => smooth(0.08, 0.42, p)

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

/** which pieces show in the joiner: anything with tree or field in it, the empty sky stays out */
function pickVisible(img: HTMLImageElement, tiles: ReturnType<typeof makeTiles>) {
  const W = 120, H = 180
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d', { willReadFrequently: true })
  if (!ctx) return tiles.map(() => true)
  ctx.drawImage(img, 0, 0, W, H)
  const d = ctx.getImageData(0, 0, W, H).data
  const r = rng(SEED + 3)
  return tiles.map((t) => {
    let n = 0, solid = 0
    for (let y = Math.floor(t.y * H); y < Math.ceil((t.y + t.h) * H); y++)
      for (let x = Math.floor(t.x * W); x < Math.ceil((t.x + t.w) * W); x++) {
        const i = (y * W + x) * 4
        const R = d[i], G = d[i + 1], B = d[i + 2]
        const luma = 0.3 * R + 0.59 * G + 0.11 * B
        const branch = luma > 22 && luma < 120 && B < R + 28 // dark, not blue: bark and twigs
        const field = y / H > 0.55 && R > B + 30 // the golden field
        n++
        if (branch || field) solid++
      }
    const f = n ? solid / n : 0
    const cy = t.y + t.h / 2
    if (cy > 0.9 && r() < 0.35) return false // a ragged bottom edge
    return f > 0.022 || (cy > 0.22 && r() < 0.1)
  })
}

export default function JoinerHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<JoinerEngine | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const progressRef = useRef(0)
  const boxRect = useRef({ x: 0, y: 0, w: 1, h: 1 })
  const reduced = usePrefersReducedMotion()

  const tiles = useMemo(() => makeTiles(SEED, ASPECT), [])
  const stamps = useMemo(() => {
    const r = rng(SEED + 9)
    const m = new Map<number, string>()
    tiles.forEach((t, i) => {
      if (t.w * ASPECT > 0.09 && t.y > 0.3 && r() < 0.16) {
        const mm = [11, 12, 1, 2][Math.floor(r() * 4)]
        m.set(i, `’${mm > 10 ? 97 : 98} ${String(mm).padStart(2, ' ')} ${String(1 + Math.floor(r() * 28)).padStart(2, '0')}`)
      }
    })
    return m
  }, [tiles])

  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [left, setLeft] = useState(ROLL)
  const leftRef = useRef(ROLL)
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)

  /* ------------------------------------------------ layout */
  const layout = () => {
    const stage = stageRef.current
    const box = boxRef.current
    const wrap = wrapRef.current
    if (!stage || !box || !wrap) return
    const w = stage.clientWidth
    const h = stage.clientHeight
    let bw: number, bh: number, x: number, y: number
    if (w < MOBILE) {
      bw = Math.min(w * 0.94, h * 0.6 * ASPECT)
      bh = bw / ASPECT
      x = (w - bw) / 2
      y = h * 0.15
    } else {
      bh = Math.min(h * 0.84, (w * 0.46) / ASPECT)
      bw = bh * ASPECT
      x = w * 0.64 - bw / 2
      y = (h - bh) / 2 + 16
    }
    boxRect.current = { x, y, w: bw, h: bh }
    box.style.left = `${x}px`
    box.style.top = `${y}px`
    box.style.width = `${bw}px`
    box.style.height = `${bh}px`
    wrap.style.transformOrigin = `${x + bw / 2}px ${y + bh / 2}px`
    engineRef.current?.resize(bw, bh)
  }

  /* ------------------------------------------------ load + engine */
  useEffect(() => {
    let alive = true
    let cleanup = () => {}
    const img = new Image()
    img.onload = () => {
      const box = boxRef.current
      if (!alive || !box) return
      const els = Array.from(box.querySelectorAll<HTMLElement>('[data-frag]'))
      const engine = new JoinerEngine(els, tiles, box.querySelector<HTMLElement>('[data-whole]'))
      engine.reduced = reduced
      engine.setVisibility(pickVisible(img, tiles))
      engineRef.current = engine
      layout()
      engine.setAssemble(assembleOf(progressRef.current))
      setState('ready')

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
      cleanup = () => {
        gsap.ticker.remove(tick)
        io.disconnect()
        document.removeEventListener('visibilitychange', sync)
        engineRef.current = null
      }
    }
    img.onerror = () => alive && setState('error')
    img.src = SRC
    const ro = new ResizeObserver(() => {
      layout()
      ScrollTrigger.refresh()
    })
    if (stageRef.current) ro.observe(stageRef.current)
    return () => {
      alive = false
      ro.disconnect()
      cleanup()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (engineRef.current) engineRef.current.reduced = reduced
  }, [reduced, state])

  /* ------------------------------------------------ pointer + retakes */
  useEffect(() => {
    const stage = stageRef.current
    const box = boxRef.current
    if (!stage || !box) return
    const local = (x: number, y: number) => {
      const r = boxRect.current
      const s = stage.getBoundingClientRect()
      return { x: x - s.left - r.x, y: y - s.top - r.y }
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const p = local(e.clientX, e.clientY)
      engineRef.current?.pointer(p.x, p.y)
    }
    const touch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      const p = local(t.clientX, t.clientY)
      engineRef.current?.pointer(p.x, p.y)
    }
    const leave = (e: PointerEvent) => e.pointerType !== 'touch' && engineRef.current?.leave()
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerleave', leave)
    stage.addEventListener('touchstart', touch, { passive: true })
    stage.addEventListener('touchmove', touch, { passive: true })
    return () => {
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerleave', leave)
      stage.removeEventListener('touchstart', touch)
      stage.removeEventListener('touchmove', touch)
    }
  }, [])

  const onBoxClick = (e: MouseEvent) => {
    const eng = engineRef.current
    const stage = stageRef.current
    if (!eng || !stage || progressRef.current > 0.06) return
    const r = boxRect.current
    const s = stage.getBoundingClientRect()
    const i = eng.hit(e.clientX - s.left - r.x, e.clientY - s.top - r.y)
    if (i < 0) return
    if (leftRef.current <= 0) return
    eng.retake(i)
    leftRef.current -= 1
    setLeft(leftRef.current)
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
          .from('.jn-top > *', { opacity: 0, y: -8, duration: 1, stagger: 0.08 })
          .from('.jn-head .li', { yPercent: 110, duration: 1.6, stagger: 0.1 }, 0.2)
          .from('.jn-sub__in, .jn-dock__in', { opacity: 0, y: 10, duration: 1.2, stagger: 0.1 }, 0.8)
      }

      const target = { p: 0 } // fresh per run: a StrictMode revert can't zero a shared object
      const apply = (p: number) => {
        progressRef.current = p
        engineRef.current?.setAssemble(assembleOf(p))
      }
      const cover = () => {
        const r = boxRect.current
        const w = stage.clientWidth, h = stage.clientHeight
        return {
          s: Math.max(w / r.w, h / r.h) * 1.02,
          x: w / 2 - (r.x + r.w / 2),
          y: h / 2 - (r.y + r.h / 2),
        }
      }
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      tl.to(target, { p: 1, duration: 1, onUpdate: () => apply(target.p) }, 0)
        .to('.jn-head, .jn-sub, .jn-dock', { opacity: 0, y: -20, duration: 0.06, stagger: 0.012 }, 0.03)
        .fromTo('.jn-note', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.05 }, 0.38)
        .to('.jn-note', { opacity: 0, y: -14, duration: 0.05 }, 0.56)
        .to('.jn-boxwrap', { x: () => cover().x, y: () => cover().y, scale: () => cover().s, duration: 0.3, ease: 'power2.inOut' }, 0.58)
        .to('.jn-top', { color: '#f4f1ea', borderColor: 'rgba(244,241,234,0.25)', duration: 0.08 }, 0.74)
        .fromTo('.jn-final', { opacity: 0, y: 30, pointerEvents: 'none' }, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.9)

      stRef.current = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        animation: reduced ? undefined : tl,
        scrub: reduced ? false : 0.6,
        invalidateOnRefresh: true,
        onUpdate(self) {
          if (!reduced) return
          // discrete states only: joiner → joined → inside
          const p = self.progress > 0.75 ? 1 : self.progress > 0.25 ? JOINED_AT : 0
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
    if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: p === 0 ? 2.4 : 2, onComplete: then })
    else {
      window.scrollTo({ top: y, behavior: 'auto' })
      then?.()
    }
  }

  const ready = state === 'ready'
  const shots = String(left).padStart(2, '0')

  return (
    <main className="jn-root" data-state={state}>
      <section ref={trackRef} className="jn-track" aria-label="Joiner — one tree, photographed in pieces">
        <div ref={stageRef} className="jn-stage">
          <div ref={wrapRef} className="jn-boxwrap">
            <div
              ref={boxRef}
              className="jn-box"
              onClick={onBoxClick}
              role="img"
              aria-label="A bare tree on a hill under a blue sky, assembled from dozens of separately taken photographs"
            >
              <img data-whole className="jn-whole" src={SRC} alt="" draggable={false} />
              {tiles.map((_, i) => (
                <div key={i} data-frag className="jn-frag">
                  <img data-img src={SRC} alt="" draggable={false} />
                  <i data-flash className="jn-flash" />
                  {stamps.has(i) && <span data-stamp className="jn-stamp">{stamps.get(i)}</span>}
                </div>
              ))}
            </div>
          </div>

          <header className="jn-top">
            <span>Oversight Supply</span>
            <span className="jn-top__c">Joiner <em>No. 9</em></span>
            <span className="jn-top__r">
              Exposures <b>{shots}</b>/{ROLL}
            </span>
          </header>

          <h1 className="jn-head">
            <span className="ln"><span className="li">One tree,</span></span>
            <span className="ln"><span className="li"><em>many looks.</em></span></span>
          </h1>

          <div className="jn-sub">
            <p className="jn-sub__in">
              {state === 'error'
                ? 'The photograph didn’t load. Check your connection and reload.'
                : left === 0
                  ? 'That’s the roll finished. Load a new one, or scroll to join the pieces up.'
                  : isTouch
                    ? 'Every piece is its own photograph, taken a moment apart. Drag a finger to watch them disagree; tap one to retake it.'
                    : 'Every piece is its own photograph, taken a moment apart. Move to watch them disagree; click one to retake it.'}
            </p>
          </div>

          <div className="jn-dock">
            <div className="jn-dock__in">
              {left === 0 ? (
                <button type="button" onClick={() => {
                  leftRef.current = ROLL
                  setLeft(ROLL)
                }} disabled={!ready}>Load a new roll</button>
              ) : (
                <button type="button" onClick={() => engineRef.current?.shuffle()} disabled={!ready}>Shuffle the prints</button>
              )}
              <button type="button" onClick={() => scrollToProgress(JOINED_AT)}>Join them up ↓</button>
            </div>
          </div>

          <p className="jn-note" aria-hidden="true">
            {tiles.length} prints, <em>one afternoon.</em>
          </p>

          <div className="jn-final">
            <p className="jn-final__kicker">Oversight Supply · field-grown trees</p>
            <h2 className="jn-final__title">
              Planted once. <br />
              <em>Looked at for good.</em>
            </h2>
            <p className="jn-final__body">Bare-root trees, lifted from our own fields in the dormant months and sent out while they sleep.</p>
            <button
              type="button"
              className="jn-final__btn"
              onClick={() => scrollToProgress(0, () => engineRef.current?.shuffle())}
            >
              Take it apart <span aria-hidden="true">↑</span>
            </button>
          </div>

          {state === 'loading' && (
            <div className="jn-loader" role="status">
              Developing…
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
```

### `src/JoinerEngine.ts`

```ts
// Joiner — one photograph cut into rectangles, each laid down a little off,
// like prints taken a moment apart. Drives the fragments' DOM directly.

export type Tile = { x: number; y: number; w: number; h: number } // 0..1 of the photo

export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** guillotine cuts: big pieces always split, medium ones sometimes */
export function makeTiles(seed: number, aspect: number): Tile[] {
  const r = rng(seed)
  const out: Tile[] = []
  const go = (t: Tile, depth: number) => {
    const pw = t.w * aspect
    const ph = t.h
    const big = pw > 0.21 || ph > 0.17
    const may = pw > 0.11 && ph > 0.085 && r() < 0.45
    if (depth < 14 && (big || may)) {
      const cutX = pw > ph * 1.1 ? true : pw * 1.1 < ph ? false : r() < 0.5
      const k = 0.32 + r() * 0.36
      if (cutX) {
        go({ x: t.x, y: t.y, w: t.w * k, h: t.h }, depth + 1)
        go({ x: t.x + t.w * k, y: t.y, w: t.w * (1 - k), h: t.h }, depth + 1)
      } else {
        go({ x: t.x, y: t.y, w: t.w, h: t.h * k }, depth + 1)
        go({ x: t.x, y: t.y + t.h * k, w: t.w, h: t.h * (1 - k) }, depth + 1)
      }
    } else out.push(t)
  }
  go({ x: 0, y: 0, w: 1, h: 1 }, 0)
  return out
}

type Pose = { ox: number; oy: number; rot: number; sc: number; cx: number; cy: number; inset: number; b: number; s: number; sep: number }

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

type Frag = {
  el: HTMLElement
  img: HTMLElement
  flash: HTMLElement | null
  stamp: HTMLElement | null
  tile: Tile
  vis: boolean
  depth: number
  delay: number
  cur: Pose
  tgt: Pose
  flashT: number
  out: { x: number; y: number }
}

export class JoinerEngine {
  reduced = false
  private bw = 1
  private bh = 1
  private a = 0
  private t = 0
  private ptr = { x: 0, y: 0 }
  private ptrS = { x: 0, y: 0 }
  private ptrOn = 0
  private ptrSeen = -99
  private lastA = -1
  private frags: Frag[]
  private whole: HTMLElement | null = null
  private r = rng(Date.now() % 100000)

  constructor(els: HTMLElement[], tiles: Tile[], whole: HTMLElement | null = null) {
    this.whole = whole
    this.frags = els.map((el, i) => {
      const tile = tiles[i]
      const cxN = tile.x + tile.w / 2 - 0.5
      const cyN = tile.y + tile.h / 2 - 0.5
      const len = Math.hypot(cxN, cyN) || 1
      const f: Frag = {
        el,
        img: el.querySelector<HTMLElement>('[data-img]')!,
        flash: el.querySelector<HTMLElement>('[data-flash]'),
        stamp: el.querySelector<HTMLElement>('[data-stamp]'),
        tile,
        vis: true,
        depth: this.r() * 2 - 1,
        delay: 0.25 + (1 - (tile.y + tile.h)) * 1.1 + this.r() * 0.25, // laid down from the ground up
        cur: this.jitter(),
        tgt: this.jitter(),
        flashT: 0,
        out: { x: cxN / len, y: cyN / len },
      }
      f.cur = { ...f.tgt }
      return f
    })
  }

  private jitter(): Pose {
    const r = this.r
    return {
      ox: (r() - 0.5) * 0.026,
      oy: (r() - 0.5) * 0.02,
      rot: (r() - 0.5) * 4.4,
      sc: 0.975 + r() * 0.05,
      cx: (r() - 0.5) * 0.03,
      cy: (r() - 0.5) * 0.024,
      inset: 1.5 + r() * 2.5,
      b: 0.9 + r() * 0.22,
      s: 0.82 + r() * 0.4,
      sep: r() < 0.3 ? r() * 0.18 : 0,
    }
  }

  /** which pieces make it into the joiner (the rest wait off the page until it's joined up) */
  setVisibility(vis: boolean[]) {
    this.frags.forEach((f, i) => (f.vis = vis[i]))
    this.lastA = -1
  }

  resize(bw: number, bh: number) {
    this.bw = Math.max(1, bw)
    this.bh = Math.max(1, bh)
    for (const f of this.frags) {
      const { x, y, w, h } = f.tile
      f.el.style.left = `${x * this.bw}px`
      f.el.style.top = `${y * this.bh}px`
      f.el.style.width = `${w * this.bw}px`
      f.el.style.height = `${h * this.bh}px`
      f.img.style.width = `${this.bw}px`
      f.img.style.height = `${this.bh}px`
    }
    this.lastA = -1
  }

  setAssemble(a: number) {
    this.a = clamp(a, 0, 1)
  }

  pointer(x: number, y: number) {
    this.ptr = { x, y }
    this.ptrSeen = this.t
  }

  leave() {
    this.ptrSeen = -99
  }

  /** index of the visible piece under a box-local point */
  hit(x: number, y: number) {
    for (let i = this.frags.length - 1; i >= 0; i--) {
      const f = this.frags[i]
      if (!f.vis && this.a < 0.5) continue
      const { x: tx, y: ty, w, h } = f.tile
      if (x >= tx * this.bw && x <= (tx + w) * this.bw && y >= ty * this.bh && y <= (ty + h) * this.bh) return i
    }
    return -1
  }

  retake(i: number) {
    const f = this.frags[i]
    if (!f) return
    f.tgt = this.jitter()
    f.flashT = 1
    this.lastA = -1
  }

  shuffle() {
    this.frags.forEach((f, i) => {
      f.tgt = this.jitter()
      f.flashT = 0.6 + (i % 5) * 0.08
    })
    this.lastA = -1
  }

  step(dt: number) {
    dt = Math.min(dt, 0.05)
    this.t += dt
    const a = this.a
    const loose = 1 - a
    const active = this.t - this.ptrSeen < 3
    this.ptrOn += ((active ? 1 : 0) - this.ptrOn) * (1 - Math.exp(-dt * 4))

    // pointer, normalised to the box; drifts gently when idle
    let px = 0, py = 0
    if (active) {
      px = clamp((this.ptr.x - this.bw / 2) / (this.bw / 2), -1.4, 1.4)
      py = clamp((this.ptr.y - this.bh / 2) / (this.bh / 2), -1.4, 1.4)
    } else if (!this.reduced) {
      px = Math.sin(this.t * 0.35) * 0.35
      py = Math.cos(this.t * 0.27) * 0.25
    }
    const k = 1 - Math.exp(-dt * 6)
    this.ptrS.x += (px - this.ptrS.x) * k
    this.ptrS.y += (py - this.ptrS.y) * k

    // filters / insets only need re-writing when the look changes noticeably
    const refreshLook = Math.abs(a - this.lastA) > 0.02
    if (refreshLook) this.lastA = a

    // once joined, one seamless photo replaces the pieces (no hairline seams)
    const wholeA = Math.min(1, Math.max(0, (a - 0.9) / 0.08))
    if (this.whole) this.whole.style.opacity = wholeA.toFixed(3)
    const spring = 1 - Math.exp(-dt * 7)
    for (const f of this.frags) {
      let settling = false
      for (const key of Object.keys(f.cur) as (keyof Pose)[]) {
        const d = f.tgt[key] - f.cur[key]
        if (Math.abs(d) > 1e-4) {
          f.cur[key] += d * spring
          settling = true
        }
      }
      const intro = this.reduced ? 1 : easeOut(clamp((this.t - f.delay) / 0.9, 0, 1))
      const c = f.cur
      const bw = this.bw, bh = this.bh
      const fcx = (f.tile.x + f.tile.w / 2) * bw
      const fcy = (f.tile.y + f.tile.h / 2) * bh

      // lift the pieces near the pointer
      const dd = Math.hypot(this.ptr.x - fcx, this.ptr.y - fcy) / Math.max(bw, bh)
      const lift = active ? Math.exp(-dd * dd * 30) * this.ptrOn : 0

      // hidden pieces wait off-page and fly in as it's joined up
      const show = f.vis ? 1 : a
      const away = f.vis ? 0 : (1 - a) * 0.5
      const par = f.depth * loose

      const tx = (c.ox * loose + f.out.x * away) * bw + par * this.ptrS.x * 5
      const ty = (c.oy * loose + f.out.y * away) * bh + par * this.ptrS.y * 5 - (1 - intro) * 40
      const rot = c.rot * loose + (1 - intro) * 8 * f.depth
      const sc = lerp(1, c.sc, loose) * (1 + 0.035 * lift * loose) * (f.vis ? 1 : lerp(0.92, 1, a))
      f.el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${rot.toFixed(3)}deg) scale(${sc.toFixed(4)})`
      f.el.style.opacity = String(Math.min(intro, show).toFixed(3))

      // the photo inside each piece is "re-aimed" a little, and follows the pointer by its own depth
      const ix = -f.tile.x * bw + (c.cx * bw + par * this.ptrS.x * 9) * loose
      const iy = -f.tile.y * bh + (c.cy * bh + par * this.ptrS.y * 9) * loose
      f.img.style.transform = `translate3d(${ix.toFixed(2)}px, ${iy.toFixed(2)}px, 0)`

      if (refreshLook || settling) {
        const ins = Math.max(-0.5, c.inset * loose - 0.5 * a)
        f.el.style.clipPath = `inset(${ins.toFixed(2)}px)`
        f.img.style.filter =
          a > 0.98
            ? 'none'
            : `brightness(${lerp(c.b, 1, a).toFixed(3)}) saturate(${lerp(c.s, 1, a).toFixed(3)}) sepia(${(c.sep * loose).toFixed(3)})`
        if (f.stamp) f.stamp.style.opacity = String(clamp(1 - a * 3, 0, 1))
      }
      if (f.flash) {
        if (f.flashT > 0) {
          f.flashT = Math.max(0, f.flashT - dt * 2.6)
          f.flash.style.opacity = String((f.flashT * f.flashT).toFixed(3))
        } else if (f.flash.style.opacity !== '0') f.flash.style.opacity = '0'
      }
    }
  }
}
```

### `src/joiner.css`

```css
/* Joiner — one tree, photographed in pieces */
:root {
  --jn-bg: #f2efe9;
  --jn-ink: #1d2117;
  --jn-soft: rgba(29, 33, 23, 0.64);
  --jn-rule: rgba(29, 33, 23, 0.14);
  --jn-paper: #f4f1ea;
  --jn-lime: #d6f06b;
  --jn-stamp: #ff8a2a;
  --jn-serif: 'Instrument Serif', 'Times New Roman', serif;
  --jn-sans: 'Inter Variable', 'Inter', system-ui, sans-serif;
  --jn-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: var(--jn-bg); color: var(--jn-ink); }
body { font-family: var(--jn-sans); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

.jn-track { position: relative; height: 400vh; }
.jn-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  overflow: clip;
  background: var(--jn-bg);
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
}
.jn-stage::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .3 0 0 0 0 .28 0 0 0 0 .22 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.jn-boxwrap { position: absolute; inset: 0; z-index: 1; will-change: transform; pointer-events: none; }
.jn-box { position: absolute; pointer-events: auto; cursor: pointer; }
.jn-frag {
  position: absolute;
  overflow: hidden;
  opacity: 0;
  transform-origin: 50% 50%;
  will-change: transform;
}
.jn-frag img {
  position: absolute;
  left: 0;
  top: 0;
  max-width: none;
  display: block;
  pointer-events: none;
  will-change: transform;
}
.jn-whole { position: absolute; inset: 0; width: 100%; height: 100%; display: block; opacity: 0; z-index: 2; pointer-events: none; }
.jn-flash { position: absolute; inset: 0; background: #fffdf6; opacity: 0; pointer-events: none; }
.jn-stamp {
  position: absolute;
  right: 7%;
  bottom: 6%;
  font: 500 10px/1 var(--jn-mono);
  letter-spacing: 0.08em;
  color: var(--jn-stamp);
  text-shadow: 0 0 4px rgba(255, 120, 20, 0.7);
  white-space: pre;
  pointer-events: none;
}

/* --------------------------------------------------------------- overlay */
.jn-top, .jn-head, .jn-sub, .jn-dock, .jn-note, .jn-final, .jn-loader { position: absolute; z-index: 4; }

.jn-top {
  top: 0;
  left: clamp(16px, 2.4vw, 32px);
  right: clamp(16px, 2.4vw, 32px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: clamp(14px, 1.8vw, 22px) 0 12px;
  border-bottom: 1px solid var(--jn-rule);
  font: 500 10.5px/1 var(--jn-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  pointer-events: none;
}
.jn-top__c em { font-family: var(--jn-serif); font-size: 15px; letter-spacing: 0.02em; text-transform: none; }
.jn-top__r { justify-self: end; opacity: 0.85; font-variant-numeric: tabular-nums; }
.jn-top__r b { font-weight: 500; color: #fff; background: var(--jn-stamp); padding: 2px 5px; }

.jn-head {
  left: clamp(16px, 3vw, 44px);
  top: clamp(76px, 12vh, 140px);
  margin: 0;
  font-family: var(--jn-serif);
  font-weight: 400;
  font-size: clamp(56px, 7vw, 132px);
  line-height: 0.86;
  letter-spacing: -0.035em;
  pointer-events: none;
}
.jn-head .ln { display: block; overflow: hidden; padding-bottom: 0.07em; }
.jn-head .li { display: inline-block; }
.jn-head em { font-style: italic; }

.jn-sub { left: clamp(16px, 3vw, 44px); bottom: clamp(96px, 12vh, 130px); width: min(320px, 28vw); pointer-events: none; }
.jn-sub__in { margin: 0; font-size: 13px; line-height: 1.5; color: var(--jn-soft); }

.jn-dock { left: clamp(16px, 3vw, 44px); bottom: clamp(24px, 3.2vw, 44px); }
.jn-dock__in {
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--jn-rule);
  border-radius: 999px;
  background: rgba(244, 241, 234, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.jn-dock button, .jn-final__btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--jn-ink);
  font: 500 10.5px/1 var(--jn-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 11px 14px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.25s ease, color 0.25s ease;
}
.jn-dock button:hover:not(:disabled) { background: var(--jn-lime); }
.jn-dock button:disabled { opacity: 0.4; cursor: default; }
.jn-dock button:focus-visible, .jn-final__btn:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }

.jn-note {
  left: clamp(16px, 3vw, 44px);
  top: 50%;
  margin: 0;
  font: 400 clamp(28px, 3.2vw, 52px)/1 var(--jn-serif);
  letter-spacing: -0.02em;
  opacity: 0;
  pointer-events: none;
}
.jn-note em { font-style: italic; }

.jn-final {
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(24px, 4vw, 64px);
  color: var(--jn-paper);
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(14, 18, 10, 0.7), transparent 58%);
}
.jn-final__kicker { margin: 0 0 14px; font: 500 10.5px/1.4 var(--jn-mono); letter-spacing: 0.16em; text-transform: uppercase; }
.jn-final__kicker::before { content: ''; display: inline-block; width: 8px; height: 8px; margin-right: 10px; background: var(--jn-lime); vertical-align: 0; }
.jn-final__title { margin: 0; font: 400 clamp(52px, 8.4vw, 156px)/0.86 var(--jn-serif); letter-spacing: -0.04em; }
.jn-final__title em { font-style: italic; }
.jn-final__body { max-width: 440px; margin: 18px 0 22px; font-size: 14px; line-height: 1.5; color: rgba(244, 241, 234, 0.8); }
.jn-final__btn { align-self: flex-start; color: var(--jn-paper); border: 1px solid rgba(244, 241, 234, 0.5); padding: 13px 18px; }
.jn-final__btn:hover { background: var(--jn-lime); border-color: var(--jn-lime); color: var(--jn-ink); }

.jn-loader {
  inset: 0;
  display: grid;
  place-items: center;
  font: 500 10.5px/1 var(--jn-mono);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--jn-soft);
}

/* ----------------------------------------------------------- responsive */
@media (max-width: 699px) {
  .jn-top { grid-template-columns: 1fr auto; }
  .jn-top__c { display: none; }
  .jn-head { top: 54px; font-size: clamp(40px, 11vw, 56px); }
  .jn-head .ln { display: inline-block; }
  .jn-head .ln:first-child { margin-right: 0.22em; }
  .jn-sub { left: 16px; right: 16px; width: auto; bottom: 76px; }
  .jn-sub__in { font-size: 12px; text-align: center; }
  .jn-dock { left: 12px; right: 12px; bottom: 18px; display: flex; justify-content: center; }
  .jn-dock button { padding: 11px 11px; font-size: 9.5px; letter-spacing: 0.1em; }
  .jn-stamp { font-size: 7px; }
  .jn-note { left: 0; right: 0; top: auto; bottom: 12%; text-align: center; }
  .jn-final__title { font-size: clamp(44px, 12vw, 64px); }
}
@media (min-width: 700px) and (max-width: 1000px) {
  .jn-sub { display: none; }
}
```

## Assets

One photograph. Copy it from this section:

- `src/assets/tree.webp`

`src/JoinerHero.tsx` loads it with `new URL('./assets/tree.webp', import.meta.url)`. The page does not fetch another URL.

## Build / run

```
npm create vite@latest joiner -- --template react-ts
cd joiner
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files and `tree.webp`, then `npm run dev`. `src/main.tsx` mounts `<JoinerHero />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- Retakes only register while scroll progress is at most `0.06`. Once the pieces have started to join, clicks do not spend the roll.
- If `tree.webp` is missing, the aside shows the connection sentence and the pieces never start.
- No APIs, keys, or accounts are needed.


## Image assets
IMPORTANT: Do NOT hotlink these URLs in the final site. Download every image below into
the project's own assets folder (e.g. /public/images/<section-name>/) and reference the
local copies. These links are only for fetching the files and may stop working.

- tree.webp: the tree photograph cut into pieces. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/joiner/tree.webp
