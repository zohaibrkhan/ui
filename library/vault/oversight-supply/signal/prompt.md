<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Signal & Soil

Signal & Soil is a full-page hero. Three figures are typed out of glyph particles: a horse, then poppies, then the word `Oversight` (or `Over` / `sight` on a phone). Scroll crossfades the photographs behind them — a field, a meadow, a blurred window, then the window in focus — and at the end the glyphs release and the finale reads “The past, in focus.” Move through the field and the glyphs scatter. Click, or press Pulse, and a ring goes out from that point.

Rebuild it as the only thing on the page. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Copy the six WebP files listed in **Assets** from this section’s `src/assets/` into the new project at those paths.

## Stack & dependencies

React 19, TypeScript, and Vite. The intro and the scroll story are `gsap` with `ScrollTrigger`. Smooth scrolling is `lenis`, only when reduced motion is off. The figures are Canvas 2D in `GlyphField`. This section does not use `three` or WebGL.

Fonts, imported in `src/main.tsx`:

- `@fontsource/instrument-serif` at 400 and 400 italic — the wordmark, the headline, the finale title, and the wordmark raster (`italic 400` Instrument Serif)
- `@fontsource-variable/inter` — the page’s default sans and the aside
- `@fontsource/ibm-plex-mono` at 500 — the header, the chapter lines, the dock, the kicker, the button, the loader, and the glyph canvas (`500 12px` is loaded so the field can start)

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Background `#2a2418` (`--sg-bg`). Cream `#f4ead2`. Soft cream `rgba(244, 234, 210, 0.72)`. Dim `rgba(244, 234, 210, 0.46)`. Rules `rgba(244, 234, 210, 0.2)`. Ink `#1d2117`. Lime `#d6f06b`.

Type:

- `--sg-serif`: `'Instrument Serif', 'Times New Roman', serif`
- `--sg-sans`: `'Inter Variable', 'Inter', system-ui, sans-serif`
- `--sg-mono`: `'IBM Plex Mono', ui-monospace, monospace`

Document title: `Signal & Soil — Oversight Supply` (`&amp;` in `index.html`). Theme colour: `#2a2418`.

The track is `520vh`. The stage is sticky, `100vh` / `100svh`, `overflow: clip`. Accessible name: `Signal and Soil — old figures typed in new glyphs`. `data-state` is `loading`, `ready`, or `error`.

The canvas `aria-label` is `A horse, then poppies, then the word Oversight, each typed out of glowing text characters`.

Glyphs, dim to bright, are `. - : + = # # % / \ * < > 0 1 ?`. The ramp prefers `#`. Ink on the canvas is `#f4ead2`. Cell size is `max(8, min(11, width / 150))` on desktop and `6.4` on a stage narrower than 700, with height `1.32` times the width.

**Scenes.**

1. `src-horse.webp`, threshold `0.17`. Desktop box: height `0.86` of the stage, width `height × 0.667`, centre `x = 64%`, `y = 53%`. Phone: height `min(62% of the stage, 98% of the width / 0.667)`, centred at `x = 50%`, `y = 55%`.
2. `src-poppy.webp`, threshold `0.2`. Desktop height `0.82` of the stage, width `height × 0.806`, centre `x = 63%`, `y = 52%`. Phone: height `min(60% of the stage, 96% of the width / 0.806)`, centred.
3. A canvas wordmark, threshold `0.45`. Desktop one line `Oversight`, box `86% × 60%` of the stage, centre `y = 47%`. Phone two lines `Over` and `sight`, box `94% × 50%`, centred.

**Backgrounds**, stacked, the later ones fading in on scroll: `bg-field.webp`, `bg-meadow.webp`, `bg-window-blur.webp`, `bg-window.webp`.

**Header.** `Oversight Supply` · `Signal` italic `&` `Soil` · `Glyphs` and a count padded to 5 digits on a cream chip, starting `00000`. The count is `toLocaleString('en-US')`.

**Headline.**

```
Old ground,
new signal.
```

`new signal.` is an `<em>`.

**Aside.**

- Error: `Some images didn’t load. Check your connection and reload.`
- Coarse pointer: `Heirloom seeds, sent by modern means. Drag through the glyphs to scatter them; tap to send a pulse.`
- Otherwise the same sentence with `Move` and `click`.

**Chapters.**

- `I — The horse that ploughed it` (visible at the start; the em dash is `—`)
- `II — The poppies that came back`
- `III — The name on the packet`

Each chapter line has an 8px cream square from `::before`.

**Dock.** `Pulse` (disabled until ready) and `Next figure ↓`.

**Finale.** Kicker `Oversight Supply · heirloom seeds`, with a lime square. Title `The past,` / italic `in focus.` Body: `Seed saved by hand for a hundred summers, catalogued and sent out by people who still read the old notebooks.` Button `Scatter again` and `↑`.

**Loader.** `Typing…`

## Interactions & animation timeline

Stops are `0`, `0.36`, `0.64`, `1`.

```
chapter = smooth(0.12, 0.3, p) + smooth(0.42, 0.6, p)
release = smooth(0.7, 0.9, p)
```

Chapter 0 is the horse, 1 the poppies, 2 the word. Release lifts the particles off their targets.

**Intro**, delay `0.15`, ease `expo.out`: the background from scale `1.12`, header at `0.2`, headline at `0.35`, aside, dock, and the first chapter at `0.9`.

**Scroll**, `scrub: 0.7`.

| From | To | What changes |
| --- | --- | --- |
| 0.00 | 1.00 | `setStory(chapter, release)`. The background scale goes from `1.08` to `1`. |
| 0.04 | 0.09 | Headline, aside, and dock fade and rise. |
| 0.12 | 0.17 | Chapter I fades out. |
| 0.18 | 0.28 | The meadow fades in. |
| 0.27 | 0.32 | Chapter II fades in. |
| 0.42 | 0.47 | Chapter II fades out. |
| 0.48 | 0.58 | The blurred window fades in. |
| 0.57 | 0.62 | Chapter III fades in. |
| 0.70 | 0.75 | Chapter III fades out. |
| 0.74 | 0.88 | The sharp window fades in and the shade drops to opacity `0.15`. |
| 0.90 | 0.97 | The finale fades in. |

**Reduced motion** parks at `0`, `0.36`, `0.64`, or `1` (`> 0.85` → 1, `> 0.55` → `0.64`, `> 0.2` → `0.36`). No intro. No Lenis.

**Pointer.** Mouse move and touch move blow the glyphs. Pointer down outside a button sends a pulse. `Pulse` pulses at `x = 62%` of the stage on desktop and `50%` on a stage under 700, `y = 55%`, strength `1.2`. **Next figure** scrolls to the next stop, or to `1` if you are already on the last. **Scatter again** scrolls to 0 (2.6s with Lenis; other jumps are 1.8s).

Startup waits for both source images and for Instrument Serif italic and IBM Plex Mono 500, but a font failure is caught and does not block the field.

A resize that only changes height by the phone URL bar (width change under 2px while `mobile` is true) does not rebuild the field.

## Responsive behaviour

**Desktop, wider than 1000px.** Figures sit right of centre. Aside visible. The word is one line.

**700px to 1000px.** The aside is `display: none`. Figures still use the desktop boxes, because `mobile` is `width < 700`.

**699px and under.** Header hides `Signal & Soil`. Headline is one line at `top: 54px`, `clamp(40px, 11vw, 56px)`. Aside is centred. Chapters are centred at `bottom: 120px`. Dock spans the bottom. Finale title `clamp(44px, 12vw, 64px)`. Glyph cells are `6.4` wide. The wordmark is two lines. Figures are centred.

## Accessibility & robustness

- The canvas is `role="img"` with the three-figure description. Background images are `alt=""`.
- If either source image fails, state is `error` and the aside says so. Backgrounds that fail are simply missing.
- The ticker runs only while the track is in view and the document is visible.
- **StrictMode.** Scroll state is a fresh `{ p: 0 }` inside `gsap.context`. A late load checks `alive` before constructing the field.

## Performance notes

- Each source is sampled once into a cell grid. Later frames move particles; they do not resample the photograph.
- Hidden cells fold into the figure and fade instead of being deleted.
- Glyphs are filled in the canvas font at `cellWidth * 1.4 * dpr`.
- The phone URL-bar resize is ignored so the field is not rebuilt on every scroll.

## Full source code

Create these five files exactly. Do not reformat them. Copy the six WebP files into `src/assets/`. Delete unused Vite template files `App.tsx`, `App.css`, `index.css`, and `vite.svg`. Keep `vite.config.ts` and the `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#2a2418" />
    <title>Signal &amp; Soil — Oversight Supply</title>
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
import './signal.css'
import SignalHero from './SignalHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignalHero />
  </StrictMode>,
)
```

### `src/SignalHero.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { GlyphField, type Scene } from './GlyphField'

gsap.registerPlugin(ScrollTrigger)

const asset = (n: string) => new URL(`./assets/${n}.webp`, import.meta.url).href
const SRC_HORSE = asset('src-horse')
const SRC_POPPY = asset('src-poppy')
const BG = { field: asset('bg-field'), meadow: asset('bg-meadow'), windowBlur: asset('bg-window-blur'), window: asset('bg-window') }

const smooth = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const chapterOf = (p: number) => smooth(0.12, 0.3, p) + smooth(0.42, 0.6, p)
const releaseOf = (p: number) => smooth(0.7, 0.9, p)
const STOPS = [0, 0.36, 0.64, 1]

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

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(src))
    img.src = src
  })
}

/** the wordmark, typed white on black so it can be sampled like a photo */
function wordmark(lines: string[]) {
  const fs = 260
  const c = document.createElement('canvas')
  const m = c.getContext('2d')!
  m.font = `italic 400 ${fs}px "Instrument Serif", serif`
  const tw = Math.ceil(Math.max(...lines.map((l) => m.measureText(l).width)))
  const lh = fs * 0.92
  c.width = tw + 40
  c.height = Math.round(lh * lines.length + fs * 0.2)
  const x = c.getContext('2d')!
  x.fillStyle = '#000'
  x.fillRect(0, 0, c.width, c.height)
  x.fillStyle = '#fff'
  x.font = `italic 400 ${fs}px "Instrument Serif", serif`
  x.textBaseline = 'middle'
  x.textAlign = 'center'
  lines.forEach((l, i) => x.fillText(l, c.width / 2, fs * 0.1 + lh * (i + 0.55)))
  return c
}

export default function SignalHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const countRef = useRef<HTMLElement>(null)
  const fieldRef = useRef<GlyphField | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const progressRef = useRef(0)
  const reduced = usePrefersReducedMotion()

  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)

  /* ------------------------------------------------ load + engine */
  useEffect(() => {
    let alive = true
    let cleanup = () => {}
    Promise.all([
      loadImage(SRC_HORSE),
      loadImage(SRC_POPPY),
      document.fonts?.load('italic 100px "Instrument Serif"').catch(() => null),
      document.fonts?.load('500 12px "IBM Plex Mono"').catch(() => null),
    ])
      .then(([horse, poppy]) => {
        const stage = stageRef.current
        const canvas = canvasRef.current
        if (!alive || !stage || !canvas) return
        const wordDesk = wordmark(['Oversight'])
        const wordMob = wordmark(['Over', 'sight'])
        const scenes: Scene[] = [
          {
            source: horse,
            threshold: 0.17,
            rect: (w, h, m) => {
              const hh = m ? Math.min(h * 0.62, (w * 0.98) / 0.667) : h * 0.86
              return { cx: m ? w * 0.5 : w * 0.64, cy: h * (m ? 0.55 : 0.53), w: hh * 0.667, h: hh }
            },
          },
          {
            source: poppy,
            threshold: 0.2,
            rect: (w, h, m) => {
              const hh = m ? Math.min(h * 0.6, (w * 0.96) / 0.806) : h * 0.82
              return { cx: m ? w * 0.5 : w * 0.63, cy: h * (m ? 0.55 : 0.52), w: hh * 0.806, h: hh }
            },
          },
          {
            source: (m) => (m ? wordMob : wordDesk),
            threshold: 0.45,
            rect: (w, h, m) => {
              return m ? { cx: w * 0.5, cy: h * 0.5, w: w * 0.94, h: h * 0.5 } : { cx: w * 0.5, cy: h * 0.47, w: w * 0.86, h: h * 0.6 }
            },
          },
        ]
        const field = new GlyphField(canvas, scenes)
        field.reduced = reduced
        field.onCount = (n) => {
          if (countRef.current) countRef.current.textContent = n.toLocaleString('en-US').padStart(5, '0')
        }
        fieldRef.current = field
        field.resize(stage.clientWidth, stage.clientHeight)
        field.setStory(chapterOf(progressRef.current), releaseOf(progressRef.current))
        setState('ready')

        let running = false
        let inView = true
        const tick = (_t: number, dtMs: number) => field.step(dtMs / 1000)
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
        let rw = stage.clientWidth
        const ro = new ResizeObserver(() => {
          // ignore the phone URL bar sliding in and out; rebuild on real resizes
          if (Math.abs(stage.clientWidth - rw) < 2 && field.mobile) return
          rw = stage.clientWidth
          field.resize(stage.clientWidth, stage.clientHeight)
        })
        ro.observe(stage)
        cleanup = () => {
          gsap.ticker.remove(tick)
          io.disconnect()
          ro.disconnect()
          document.removeEventListener('visibilitychange', sync)
          fieldRef.current = null
        }
      })
      .catch((err) => {
        console.warn('[signal]', err)
        if (alive) setState('error')
      })
    return () => {
      alive = false
      cleanup()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (fieldRef.current) fieldRef.current.reduced = reduced
  }, [reduced, state])

  /* ------------------------------------------------ pointer: wind + pulses */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const local = (x: number, y: number) => {
      const r = stage.getBoundingClientRect()
      return { x: x - r.left, y: y - r.top }
    }
    const onUi = (t: EventTarget | null) => t instanceof Element && !!t.closest('button, a')
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const p = local(e.clientX, e.clientY)
      fieldRef.current?.pointer(p.x, p.y)
    }
    const down = (e: PointerEvent) => {
      if (onUi(e.target)) return
      const p = local(e.clientX, e.clientY)
      fieldRef.current?.pulse(p.x, p.y)
    }
    const touch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t || onUi(e.target)) return
      const p = local(t.clientX, t.clientY)
      fieldRef.current?.pointer(p.x, p.y)
    }
    const leave = (e: PointerEvent) => e.pointerType !== 'touch' && fieldRef.current?.leave()
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointerleave', leave)
    stage.addEventListener('touchstart', touch, { passive: true })
    stage.addEventListener('touchmove', touch, { passive: true })
    return () => {
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointerleave', leave)
      stage.removeEventListener('touchstart', touch)
      stage.removeEventListener('touchmove', touch)
    }
  }, [])

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
    if (!track) return
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })
          .from('.sg-bg__in', { scale: 1.12, opacity: 0, duration: 2.4 }, 0)
          .from('.sg-top > *', { opacity: 0, y: -8, duration: 1, stagger: 0.08 }, 0.2)
          .from('.sg-head .li', { yPercent: 110, duration: 1.6, stagger: 0.1 }, 0.35)
          .from('.sg-sub__in, .sg-dock__in, .sg-ch__in', { opacity: 0, y: 10, duration: 1.2, stagger: 0.1 }, 0.9)
      }

      const target = { p: 0 } // fresh per run: a StrictMode revert can't zero a shared object
      const apply = (p: number) => {
        progressRef.current = p
        fieldRef.current?.setStory(chapterOf(p), releaseOf(p))
      }
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      tl.to(target, { p: 1, duration: 1, onUpdate: () => apply(target.p) }, 0)
        .to('.sg-head, .sg-sub, .sg-dock', { opacity: 0, y: -20, duration: 0.05, stagger: 0.012 }, 0.04)
        // backgrounds: field → meadow → window (blurred) → window, in focus
        .to('.sg-bg--meadow', { opacity: 1, duration: 0.1 }, 0.18)
        .to('.sg-bg--wblur', { opacity: 1, duration: 0.1 }, 0.48)
        .to('.sg-bg--window', { opacity: 1, duration: 0.14 }, 0.74)
        .fromTo('.sg-bg', { scale: 1.08 }, { scale: 1, duration: 1 }, 0)
        // chapter captions
        .to('.sg-ch--1', { opacity: 0, y: -12, duration: 0.05 }, 0.12)
        .fromTo('.sg-ch--2', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.05 }, 0.27)
        .to('.sg-ch--2', { opacity: 0, y: -12, duration: 0.05 }, 0.42)
        .fromTo('.sg-ch--3', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.05 }, 0.57)
        .to('.sg-ch--3', { opacity: 0, y: -12, duration: 0.05 }, 0.7)
        .to('.sg-shade', { opacity: 0.15, duration: 0.14 }, 0.74)
        .fromTo('.sg-final', { opacity: 0, y: 30, pointerEvents: 'none' }, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.9)

      stRef.current = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        animation: reduced ? undefined : tl,
        scrub: reduced ? false : 0.7,
        onUpdate(self) {
          if (!reduced) return
          // discrete states only: horse → poppies → name → in focus
          const p = self.progress > 0.85 ? 1 : self.progress > 0.55 ? STOPS[2] : self.progress > 0.2 ? STOPS[1] : 0
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

  const scrollToProgress = (p: number) => {
    const st = stRef.current
    if (!st) return
    const y = st.start + (st.end - st.start) * p
    if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: p === 0 ? 2.6 : 1.8 })
    else window.scrollTo({ top: y, behavior: 'auto' })
  }
  const next = () => {
    const p = progressRef.current
    const n = STOPS.find((s) => s > p + 0.02) ?? 1
    scrollToProgress(n)
  }
  const pulseCentre = () => {
    const s = stageRef.current
    if (s) fieldRef.current?.pulse(s.clientWidth * (s.clientWidth < 700 ? 0.5 : 0.62), s.clientHeight * 0.55, 1.2)
  }

  return (
    <main className="sg-root" data-state={state}>
      <section ref={trackRef} className="sg-track" aria-label="Signal and Soil — old figures typed in new glyphs">
        <div ref={stageRef} className="sg-stage">
          <div className="sg-bg" aria-hidden="true">
            <div className="sg-bg__in">
              <img className="sg-bg__img sg-bg--field" src={BG.field} alt="" />
              <img className="sg-bg__img sg-bg--meadow" src={BG.meadow} alt="" />
              <img className="sg-bg__img sg-bg--wblur" src={BG.windowBlur} alt="" />
              <img className="sg-bg__img sg-bg--window" src={BG.window} alt="" />
            </div>
          </div>
          <div className="sg-shade" aria-hidden="true" />
          <canvas
            ref={canvasRef}
            className="sg-glyphs"
            role="img"
            aria-label="A horse, then poppies, then the word Oversight, each typed out of glowing text characters"
          />
          <div className="sg-grain" aria-hidden="true" />

          <header className="sg-top">
            <span>Oversight Supply</span>
            <span className="sg-top__c">Signal <em>&amp;</em> Soil</span>
            <span className="sg-top__r">
              Glyphs <b ref={countRef}>00000</b>
            </span>
          </header>

          <h1 className="sg-head">
            <span className="ln"><span className="li">Old ground,</span></span>
            <span className="ln"><span className="li"><em>new signal.</em></span></span>
          </h1>

          <div className="sg-sub">
            <p className="sg-sub__in">
              {state === 'error'
                ? 'Some images didn’t load. Check your connection and reload.'
                : isTouch
                  ? 'Heirloom seeds, sent by modern means. Drag through the glyphs to scatter them; tap to send a pulse.'
                  : 'Heirloom seeds, sent by modern means. Move through the glyphs to scatter them; click to send a pulse.'}
            </p>
          </div>

          <p className="sg-ch sg-ch--1"><span className="sg-ch__in">I — The horse that ploughed it</span></p>
          <p className="sg-ch sg-ch--2" aria-hidden="true">II — The poppies that came back</p>
          <p className="sg-ch sg-ch--3" aria-hidden="true">III — The name on the packet</p>

          <div className="sg-dock">
            <div className="sg-dock__in">
              <button type="button" onClick={pulseCentre} disabled={state !== 'ready'}>Pulse</button>
              <button type="button" onClick={next}>Next figure ↓</button>
            </div>
          </div>

          <div className="sg-final">
            <p className="sg-final__kicker">Oversight Supply · heirloom seeds</p>
            <h2 className="sg-final__title">
              The past, <br />
              <em>in focus.</em>
            </h2>
            <p className="sg-final__body">Seed saved by hand for a hundred summers, catalogued and sent out by people who still read the old notebooks.</p>
            <button type="button" className="sg-final__btn" onClick={() => scrollToProgress(0)}>
              Scatter again <span aria-hidden="true">↑</span>
            </button>
          </div>

          {state === 'loading' && (
            <div className="sg-loader" role="status">
              Typing…
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
```

### `src/GlyphField.ts`

```ts
// Signal & Soil — figures typed out of glyph particles.
// Each scene (horse, poppies, wordmark) is sampled into a grid of cells; every
// particle owns one cell per scene, springs toward it, and can be blown about.

export type Scene = {
  /** source drawn white-on-black; brightness decides whether a cell is typed and which glyph */
  source: HTMLCanvasElement | HTMLImageElement | ((mobile: boolean) => HTMLCanvasElement)
  threshold: number
  /** figure box in stage px */
  rect: (w: number, h: number, mobile: boolean) => { cx: number; cy: number; w: number; h: number }
}

type Cell = { x: number; y: number; g: number; a: number }
type P = {
  x: number
  y: number
  vx: number
  vy: number
  t: (Cell | null)[] // one target per scene (null = folds into the figure and fades)
  fold: Cell[] // where hidden particles tuck in, per scene
  seed: number
  swirl: number
  drift: number
}

const GLYPHS = ['.', '-', ':', '+', '=', '#', '#', '%', '/', '\\', '*', '<', '>', '0', '1', '?']
const RAMP = [0, 1, 3, 4, 5, 5, 6] // indices into GLYPHS, dim → bright (mostly #, like a line printer)
const SCRAMBLE = [7, 8, 9, 10, 11, 12, 13, 14, 15]
const INK = '#f4ead2'

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

const smooth = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export class GlyphField {
  reduced = false
  count = 0
  onCount?: (n: number) => void

  private ctx: CanvasRenderingContext2D
  private atlas = document.createElement('canvas')
  private cellW = 10
  private cellH = 13
  private tile = 20
  private w = 1
  private h = 1
  private dpr = 1
  private ps: P[] = []
  private chapter = 0 // 0 … scenes-1 (fractional while morphing)
  private release = 0 // 0 → 1: the glyphs lift off like seed
  private time = 0
  private ptr = { x: -9999, y: -9999, vx: 0, vy: 0, t: -99 }

  constructor(
    private canvas: HTMLCanvasElement,
    private scenes: Scene[],
  ) {
    this.ctx = canvas.getContext('2d')!
  }

  get mobile() {
    return this.w < 700
  }

  resize(w: number, h: number) {
    this.w = Math.max(1, w)
    this.h = Math.max(1, h)
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.canvas.width = Math.round(this.w * this.dpr)
    this.canvas.height = Math.round(this.h * this.dpr)
    this.cellW = this.mobile ? 6.4 : Math.max(8, Math.min(11, this.w / 150))
    this.cellH = this.cellW * 1.32
    this.makeAtlas()
    this.build()
  }

  /** glyphs pre-drawn once, with their glow baked in */
  private makeAtlas() {
    const fs = this.cellW * 1.4 * this.dpr
    const T = Math.ceil(fs * 1.9)
    this.tile = T
    this.atlas.width = T * GLYPHS.length
    this.atlas.height = T
    const a = this.atlas.getContext('2d')!
    a.clearRect(0, 0, this.atlas.width, T)
    a.font = `500 ${fs}px "IBM Plex Mono", ui-monospace, monospace`
    a.textAlign = 'center'
    a.textBaseline = 'middle'
    a.fillStyle = INK
    GLYPHS.forEach((g, i) => {
      a.shadowColor = 'rgba(255, 236, 200, 0.75)'
      a.shadowBlur = fs * 0.45
      a.fillText(g, i * T + T / 2, T / 2)
      a.shadowBlur = 0
      a.fillText(g, i * T + T / 2, T / 2)
    })
  }

  /** the bright part of a source, so black margins don't shrink the figure */
  private src(s: Scene) {
    return typeof s.source === 'function' ? s.source(this.mobile) : s.source
  }

  private bounds(s: Scene) {
    const src = this.src(s)
    const W0 = 'naturalWidth' in src ? src.naturalWidth : src.width
    const H0 = 'naturalHeight' in src ? src.naturalHeight : src.height
    const pw = 160
    const ph = Math.max(1, Math.round((pw * H0) / W0))
    const c = document.createElement('canvas')
    c.width = pw
    c.height = ph
    const x = c.getContext('2d', { willReadFrequently: true })!
    x.drawImage(src, 0, 0, pw, ph)
    const d = x.getImageData(0, 0, pw, ph).data
    let top = 0
    for (let k = 0; k < d.length; k += 4) top = Math.max(top, d[k] * 0.3 + d[k + 1] * 0.59 + d[k + 2] * 0.11)
    const lim = top * s.threshold
    let x0 = pw, y0 = ph, x1 = 0, y1 = 0
    for (let j = 0; j < ph; j++)
      for (let i = 0; i < pw; i++) {
        const k = (j * pw + i) * 4
        if (d[k] * 0.3 + d[k + 1] * 0.59 + d[k + 2] * 0.11 < lim) continue
        if (i < x0) x0 = i
        if (i > x1) x1 = i
        if (j < y0) y0 = j
        if (j > y1) y1 = j
      }
    if (x1 <= x0 || y1 <= y0) return { x: 0, y: 0, w: W0, h: H0 }
    const sx = W0 / pw, sy = H0 / ph
    const pad = 2
    const bx = Math.max(0, x0 - pad), by = Math.max(0, y0 - pad)
    const bw = Math.min(pw, x1 + pad + 1) - bx, bh = Math.min(ph, y1 + pad + 1) - by
    return { x: bx * sx, y: by * sy, w: bw * sx, h: bh * sy }
  }

  /** sample each scene into cells, then deal every particle one cell per scene */
  private build() {
    const sceneCells: Cell[][] = this.scenes.map((s, si) => {
      const crop = this.bounds(s)
      const box = s.rect(this.w, this.h, this.mobile)
      // fit the cropped figure inside its box, keeping its proportions
      const ar = crop.w / crop.h
      const fitW = Math.min(box.w, box.h * ar)
      const r = { cx: box.cx, cy: box.cy, w: fitW, h: fitW / ar }
      const cols = Math.max(4, Math.round(r.w / this.cellW))
      const rows = Math.max(4, Math.round(r.h / this.cellH))
      const c = document.createElement('canvas')
      c.width = cols
      c.height = rows
      const cx = c.getContext('2d', { willReadFrequently: true })!
      cx.imageSmoothingEnabled = true
      cx.imageSmoothingQuality = 'high'
      cx.drawImage(this.src(s), crop.x, crop.y, crop.w, crop.h, 0, 0, cols, rows)
      const d = cx.getImageData(0, 0, cols, rows).data
      // auto-levels: stretch so the brightest few percent of the figure read as full ink
      const lums: number[] = []
      for (let k = 0; k < d.length; k += 4) lums.push((d[k] * 0.3 + d[k + 1] * 0.59 + d[k + 2] * 0.11) / 255)
      const sorted = lums.slice().sort((x, y) => x - y)
      const top = Math.max(0.05, sorted[Math.floor(sorted.length * 0.985)])
      const rnd = rng(17 + si * 101)
      const x0 = r.cx - (cols * this.cellW) / 2
      const y0 = r.cy - (rows * this.cellH) / 2
      const out: Cell[] = []
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) {
          const k = (j * cols + i) * 4
          const lum = Math.min(1, lums[k / 4] / top)
          if (lum < s.threshold) continue
          const v = (lum - s.threshold) / (1 - s.threshold)
          if (v < 0.12 && rnd() < 0.55) continue // ragged, speckled edges
          const level = Math.min(RAMP.length - 1, Math.floor(Math.pow(v, 0.45) * RAMP.length + (rnd() - 0.5) * 1.4))
          out.push({ x: x0 + (i + 0.5) * this.cellW, y: y0 + (j + 0.5) * this.cellH, g: RAMP[Math.max(0, level)], a: 0.55 + 0.45 * Math.min(1, v * 1.6) })
        }
      // order around the figure's centre so morphs swirl instead of criss-crossing
      out.sort((p, q) => Math.atan2(p.y - r.cy, p.x - r.cx) - Math.atan2(q.y - r.cy, q.x - r.cx))
      return out
    })

    const N = Math.max(...sceneCells.map((c) => c.length))
    const rnd = rng(5)
    const old = this.ps
    this.ps = []
    for (let n = 0; n < N; n++) {
      const t = sceneCells.map((cells) => {
        // spread a smaller scene's cells evenly across all particles
        const idx = Math.floor((n / N) * cells.length)
        return (n * cells.length) % N < cells.length ? cells[idx] ?? null : null
      })
      const fold = sceneCells.map((cells) => cells[Math.floor((n / N) * cells.length)] ?? { x: this.w / 2, y: this.h / 2, g: 0, a: 0 })
      const prev = old[n]
      const start = t[0] ?? fold[0]
      this.ps.push({
        x: prev ? prev.x : start.x + (rnd() - 0.5) * this.w * 0.6,
        y: prev ? prev.y : start.y + this.h * (0.3 + rnd() * 0.5),
        vx: 0,
        vy: 0,
        t,
        fold,
        seed: rnd(),
        swirl: (rnd() - 0.5) * 2,
        drift: 0.5 + rnd(),
      })
    }
    this.count = sceneCells[0].length
    this.onCount?.(Math.round(this.visibleCount()))
  }

  private visibleCount() {
    const a = Math.floor(this.chapter)
    const b = Math.min(this.scenes.length - 1, a + 1)
    const e = this.chapter - a
    const ca = this.ps.filter((p) => p.t[a]).length
    const cb = this.ps.filter((p) => p.t[b]).length
    return (ca + (cb - ca) * e) * (1 - this.release)
  }

  setStory(chapter: number, release: number) {
    const changed = Math.abs(chapter - this.chapter) > 0.01 || Math.abs(release - this.release) > 0.01
    this.chapter = Math.max(0, Math.min(this.scenes.length - 1, chapter))
    this.release = Math.max(0, Math.min(1, release))
    if (changed) this.onCount?.(Math.round(this.visibleCount()))
  }

  pointer(x: number, y: number) {
    const dt = Math.max(0.008, this.time - this.ptr.t)
    if (this.time - this.ptr.t < 0.2) {
      this.ptr.vx = (x - this.ptr.x) / dt
      this.ptr.vy = (y - this.ptr.y) / dt
    }
    this.ptr.x = x
    this.ptr.y = y
    this.ptr.t = this.time
  }

  leave() {
    this.ptr.x = this.ptr.y = -9999
  }

  /** a ring-shaped shove outward from (x, y) */
  pulse(x: number, y: number, strength = 1) {
    for (const p of this.ps) {
      const dx = p.x - x, dy = p.y - y
      const d = Math.hypot(dx, dy) + 1
      const f = strength * 1300 * Math.exp(-d / 220)
      p.vx += (dx / d) * f
      p.vy += (dy / d) * f
    }
  }

  step(dt: number) {
    dt = Math.min(dt, 1 / 30)
    this.time += dt
    const S = this.scenes.length
    const a = Math.floor(this.chapter)
    const b = Math.min(S - 1, a + 1)
    const e = smooth(0, 1, this.chapter - a)
    const bend = Math.sin(Math.PI * e)
    const rel = this.release
    const ptrLive = this.time - this.ptr.t < 1.5
    const pv = Math.hypot(this.ptr.vx, this.ptr.vy)
    const R = this.mobile ? 70 : 110
    const k = this.reduced ? 120 : 55
    const damp = this.reduced ? 18 : 9

    const ctx = this.ctx
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const T = this.tile
    const half = T / 2 / this.dpr
    const size = T / this.dpr

    for (const p of this.ps) {
      const A = p.t[a] ?? p.fold[a]
      const B = p.t[b] ?? p.fold[b]
      const alphaA = p.t[a] ? A.a : 0
      const alphaB = p.t[b] ? B.a : 0
      let tx = A.x + (B.x - A.x) * e
      let ty = A.y + (B.y - A.y) * e
      // swirl sideways mid-morph
      if (!this.reduced && bend > 0.001) {
        const dx = B.x - A.x, dy = B.y - A.y
        const len = Math.hypot(dx, dy) || 1
        tx += (-dy / len) * bend * p.swirl * Math.min(160, len * 0.45)
        ty += (dx / len) * bend * p.swirl * Math.min(160, len * 0.45)
      }
      // seed release: lift and wander off
      const r = Math.max(0, Math.min(1, (rel - p.seed * 0.35) / 0.65))
      if (r > 0) {
        tx += Math.sin(this.time * 0.7 + p.seed * 20) * 60 * r + p.swirl * 120 * r
        ty -= r * r * this.h * 0.9 * p.drift
      }
      // a slow breath while idle
      if (!this.reduced) {
        tx += Math.sin(this.time * 0.8 + p.seed * 40) * 0.9
        ty += Math.cos(this.time * 0.7 + p.seed * 30) * 0.9
      }

      // spring to target
      p.vx += ((tx - p.x) * k - p.vx * damp) * dt
      p.vy += ((ty - p.y) * k - p.vy * damp) * dt
      // pointer: shove glyphs aside, and drag them along with fast strokes
      if (ptrLive) {
        const dx = p.x - this.ptr.x, dy = p.y - this.ptr.y
        const d2 = dx * dx + dy * dy
        if (d2 < R * R) {
          const d = Math.sqrt(d2) + 0.001
          const f = Math.pow(1 - d / R, 2)
          p.vx += (dx / d) * f * 5200 * dt + this.ptr.vx * f * 3 * dt
          p.vy += (dy / d) * f * 5200 * dt + this.ptr.vy * f * 3 * dt
        }
      }
      p.x += p.vx * dt
      p.y += p.vy * dt

      let alpha = (alphaA + (alphaB - alphaA) * e) * (1 - smooth(0.35, 1, r))
      if (alpha < 0.02) continue
      const speed = Math.abs(p.vx) + Math.abs(p.vy)
      let g = e < 0.5 ? A.g : B.g
      if (speed > 260 && !this.reduced) {
        g = SCRAMBLE[Math.floor((p.seed * 97 + this.time * 14) % SCRAMBLE.length)] // decoding flicker
        alpha = Math.min(1, alpha * 1.1)
      }
      ctx.globalAlpha = alpha
      ctx.drawImage(this.atlas, g * T, 0, T, T, (p.x - half) * this.dpr, (p.y - half) * this.dpr, size * this.dpr, size * this.dpr)
    }
    ctx.globalAlpha = 1
    this.ptr.vx *= Math.exp(-dt * 6)
    this.ptr.vy *= Math.exp(-dt * 6)
    void pv
  }
}
```

### `src/signal.css`

```css
/* Signal & Soil — old paintings, new glyphs */
:root {
  --sg-bg: #2a2418;
  --sg-cream: #f4ead2;
  --sg-soft: rgba(244, 234, 210, 0.72);
  --sg-dim: rgba(244, 234, 210, 0.46);
  --sg-rule: rgba(244, 234, 210, 0.2);
  --sg-ink: #1d2117;
  --sg-lime: #d6f06b;
  --sg-serif: 'Instrument Serif', 'Times New Roman', serif;
  --sg-sans: 'Inter Variable', 'Inter', system-ui, sans-serif;
  --sg-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: var(--sg-bg); color: var(--sg-cream); }
body { font-family: var(--sg-sans); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

.sg-track { position: relative; height: 520vh; }
.sg-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  overflow: clip;
  background: var(--sg-bg);
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
}

/* the paintings, soft as memory */
.sg-bg { position: absolute; inset: -2%; z-index: 0; will-change: transform; }
.sg-bg__in { position: absolute; inset: 0; }
.sg-bg__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0; }
.sg-bg--field { opacity: 1; filter: saturate(0.85) contrast(0.95); }
.sg-bg--meadow { filter: saturate(0.8) brightness(0.85); }
.sg-bg--wblur { filter: saturate(0.9) brightness(0.9); }
.sg-shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 1;
  background:
    radial-gradient(120% 100% at 50% 50%, rgba(20, 16, 8, 0.1), rgba(20, 16, 8, 0.55)),
    linear-gradient(180deg, rgba(20, 16, 8, 0.35), transparent 30%, transparent 70%, rgba(20, 16, 8, 0.45));
}
.sg-glyphs { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; display: block; pointer-events: none; }
.sg-grain {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  opacity: 0.55;
  mix-blend-mode: overlay;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 .95 0 0 0 0 .85 0 0 0 .4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* --------------------------------------------------------------- overlay */
.sg-top, .sg-head, .sg-sub, .sg-dock, .sg-ch, .sg-final, .sg-loader { position: absolute; z-index: 5; }

.sg-top {
  top: 0;
  left: clamp(16px, 2.4vw, 32px);
  right: clamp(16px, 2.4vw, 32px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: clamp(14px, 1.8vw, 22px) 0 12px;
  border-bottom: 1px solid var(--sg-rule);
  font: 500 10.5px/1 var(--sg-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  pointer-events: none;
}
.sg-top__c em { font-family: var(--sg-serif); font-size: 15px; text-transform: none; }
.sg-top__r { justify-self: end; color: var(--sg-soft); }
.sg-top__r b { font-weight: 500; color: var(--sg-ink); background: var(--sg-cream); padding: 2px 5px; font-variant-numeric: tabular-nums; }

.sg-head {
  left: clamp(16px, 3vw, 44px);
  top: clamp(80px, 13vh, 150px);
  margin: 0;
  font-family: var(--sg-serif);
  font-weight: 400;
  font-size: clamp(56px, 7.2vw, 136px);
  line-height: 0.86;
  letter-spacing: -0.035em;
  text-shadow: 0 2px 40px rgba(20, 16, 8, 0.4);
  pointer-events: none;
}
.sg-head .ln { display: block; overflow: hidden; padding-bottom: 0.07em; }
.sg-head .li { display: inline-block; }
.sg-head em { font-style: italic; }

.sg-sub { left: clamp(16px, 3vw, 44px); bottom: clamp(96px, 12vh, 130px); width: min(320px, 28vw); pointer-events: none; }
.sg-sub__in { margin: 0; font-size: 13px; line-height: 1.5; color: var(--sg-soft); }

.sg-ch {
  left: clamp(16px, 3vw, 44px);
  bottom: clamp(200px, 26vh, 260px);
  margin: 0;
  font: 500 10.5px/1.4 var(--sg-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sg-soft);
  pointer-events: none;
}
.sg-ch::before { content: ''; display: inline-block; width: 8px; height: 8px; margin-right: 10px; background: var(--sg-cream); vertical-align: 0; }
.sg-ch__in { display: inline; }
.sg-ch--2, .sg-ch--3 { opacity: 0; }

.sg-dock { left: clamp(16px, 3vw, 44px); bottom: clamp(24px, 3.2vw, 44px); }
.sg-dock__in {
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--sg-rule);
  border-radius: 999px;
  background: rgba(30, 25, 16, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.sg-dock button, .sg-final__btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--sg-cream);
  font: 500 10.5px/1 var(--sg-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 11px 14px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.25s ease, color 0.25s ease;
}
.sg-dock button:hover:not(:disabled) { background: var(--sg-cream); color: var(--sg-ink); }
.sg-dock button:disabled { opacity: 0.4; cursor: default; }
.sg-dock button:focus-visible, .sg-final__btn:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }

.sg-final {
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(24px, 4vw, 64px);
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(20, 16, 8, 0.7), transparent 55%);
}
.sg-final__kicker { margin: 0 0 14px; font: 500 10.5px/1.4 var(--sg-mono); letter-spacing: 0.16em; text-transform: uppercase; }
.sg-final__kicker::before { content: ''; display: inline-block; width: 8px; height: 8px; margin-right: 10px; background: var(--sg-lime); vertical-align: 0; }
.sg-final__title { margin: 0; font: 400 clamp(56px, 9vw, 168px)/0.86 var(--sg-serif); letter-spacing: -0.04em; }
.sg-final__title em { font-style: italic; }
.sg-final__body { max-width: 440px; margin: 18px 0 22px; font-size: 14px; line-height: 1.5; color: var(--sg-soft); }
.sg-final__btn { align-self: flex-start; border: 1px solid rgba(244, 234, 210, 0.5); padding: 13px 18px; }
.sg-final__btn:hover { background: var(--sg-cream); border-color: var(--sg-cream); color: var(--sg-ink); }

.sg-loader {
  inset: 0;
  display: grid;
  place-items: center;
  font: 500 10.5px/1 var(--sg-mono);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sg-dim);
}

/* ----------------------------------------------------------- responsive */
@media (max-width: 699px) {
  .sg-top { grid-template-columns: 1fr auto; }
  .sg-top__c { display: none; }
  .sg-head { top: 54px; font-size: clamp(40px, 11vw, 56px); }
  .sg-head .ln { display: inline-block; }
  .sg-head .ln:first-child { margin-right: 0.22em; }
  .sg-sub { left: 16px; right: 16px; width: auto; bottom: 74px; }
  .sg-sub__in { font-size: 12px; text-align: center; }
  .sg-ch { left: 0; right: 0; text-align: center; bottom: 120px; }
  .sg-dock { left: 12px; right: 12px; bottom: 18px; display: flex; justify-content: center; }
  .sg-final__title { font-size: clamp(44px, 12vw, 64px); }
}
@media (min-width: 700px) and (max-width: 1000px) {
  .sg-sub { display: none; }
}
```

## Assets

Copy these from this section’s `src/assets/`. `SignalHero.tsx` loads them with `new URL('./assets/{name}.webp', import.meta.url)`.

- `src/assets/src-horse.webp` — the horse figure
- `src/assets/src-poppy.webp` — the poppy figure
- `src/assets/bg-field.webp` — the first background
- `src/assets/bg-meadow.webp`
- `src/assets/bg-window-blur.webp`
- `src/assets/bg-window.webp` — the sharp window at the end

The word `Oversight` is drawn in the page. It is not a file.

## Build / run

```
npm create vite@latest signal -- --template react-ts
cd signal
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files and the six WebP files, then `npm run dev`. `src/main.tsx` mounts `<SignalHero />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- If `src-horse.webp` or `src-poppy.webp` fails, the field does not start.
- The background crossfade still runs if a background file is missing; that layer is simply blank.
- No APIs, keys, or accounts are needed.


## Image assets
IMPORTANT: Do NOT hotlink these URLs in the final site. Download every image below into
the project's own assets folder (e.g. /public/images/<section-name>/) and reference the
local copies. These links are only for fetching the files and may stop working.

- bg-field.webp: opening field background. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/signal/bg-field.webp
- bg-meadow.webp: meadow background. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/signal/bg-meadow.webp
- bg-window-blur.webp: blurred window background. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/signal/bg-window-blur.webp
- bg-window.webp: window background in focus. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/signal/bg-window.webp
- src-horse.webp: photo sampled into the horse. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/signal/src-horse.webp
- src-poppy.webp: photo sampled into the poppies. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/signal/src-poppy.webp
