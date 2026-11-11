<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Phototropism

Phototropism is a full-page hero of an ink meadow on warm paper. Daisies, tulips, bluebells, dandelions, and buds grow up from the bottom edge and bend toward the pointer, which is the light. The headline letters lean the same way, from their baselines. Scroll takes the meadow from 06:40 through dusk into night: flowers close, fireflies come out, and a light near a sleeping flower wakes it. Click the ground, or press Plant a seed, and a seed falls and sprouts. At the end the type reads “Grow toward what you love.”

Rebuild it as the only thing on the page. Create the files in **Full source code** at the paths in their headings, with those contents exactly. There are no image files.

## Stack & dependencies

React 19, TypeScript, and Vite. The intro and the scroll story are `gsap` with `ScrollTrigger`. Smooth scrolling is `lenis`, only when the visitor has not asked for reduced motion. The meadow is Canvas 2D in `Meadow`. This section does not use `three` or WebGL.

Fonts, imported in `src/main.tsx`:

- `@fontsource/instrument-serif` at 400 and 400 italic — the word *tropism*, the headline, the dusk and night notes, the finale title
- `@fontsource-variable/inter` — the page’s default sans and the aside
- `@fontsource/ibm-plex-mono` at 500 — the header, the clock, the dock, the kicker, the button

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Paper `#f7f0e3` (`--pt-paper`). Lime `#d6f06b`. Morning ink `#3b2f22`, also the starting value of `--pt-ink`. The stage colour is `--pt-ink`, rewritten every scroll frame from the meadow palette. Body background is the paper. Default body colour before the stage paints is `#3b2f22`.

Type:

- `--pt-serif`: `'Instrument Serif', 'Times New Roman', serif`
- `--pt-sans`: `'Inter Variable', 'Inter', system-ui, sans-serif`
- `--pt-mono`: `'IBM Plex Mono', ui-monospace, monospace`

Document title: `Phototropism — Oversight Supply`. Theme colour: `#f7f0e3`.

The track is `460vh`. The stage is sticky: `top: 0; height: 100vh; height: 100svh; overflow: hidden; overflow: clip; cursor: crosshair; user-select: none; isolation: isolate`. Accessible name: `Phototropism — a meadow that turns toward you`. `data-night` is `off` until time-of-day passes `0.55`, then `on`.

A paper grain sits over the canvas at `z-index: 1`, `mix-blend-mode: multiply`, opacity `0.5`. It is an inline SVG turbulence tile. At night the grain drops to opacity `0.12` and switches to `screen`.

**Palette**, interpolated by time of day `t` from 0 to 1. Sky is a vertical gradient from `top` to `bot`. Ink is what the DOM text uses.

| t | Top | Bottom | Ink | Fill | Glow |
| --- | --- | --- | --- | --- | --- |
| 0 | `#f7f0e3` | `#f1dfc4` | `#3b2f22` | `#f8f2e6` | `#ffd38a` at 0.8 |
| 0.45 | `#6d5c88` | `#f2a578` | `#2c2231` | `#f3d2bb` | `#ffb07a` at 0.65 |
| 0.75 | `#0c1122` | `#1c2340` | `#ece3cc` | `#121830` | `#b9d0ff` at 0.22 |
| 1 | `#0a0e1c` | `#171d36` | `#ece3cc` | `#10152a` | `#c6d8ff` at 0.2 |

Lime `#d6f06b` stays lime. The night notes’ italics and the finale’s *what you love.* use it once `data-night` is on.

**Header.** Three columns, mono 500, 10.5px, uppercase, letter-spacing `0.14em`. The rule is `color-mix(in srgb, var(--pt-ink) 18%, transparent)`.

- Left: `Oversight Supply`
- Centre: `Photo` then italic Instrument Serif `tropism` at 15px, not uppercased
- Right: a `<b>` clock, then ` · Planted {nn}` where `{nn}` is how many seeds you have planted, padded to 2 digits, starting at `00`

The clock starts at `06:40 ☀`. Minutes are `6 * 60 + 40 + tod * 16 * 60`, wrapped to 24 hours, so a full day of scroll ends at `22:40`. The sun `☀` shows while `tod` is at most `0.52`. After that the moon is `☾`.

**Headline.** `aria-label="Everything here leans toward you."` The visible letters are `aria-hidden`, one `<span class="pt-l">` each, so they can rotate from `transform-origin: 50% 92%`. Three lines:

```
Everything
here leans
toward you.
```

The third line is italic (`.pt-ln--em`). Size `clamp(52px, 7.4vw, 138px)`, line-height `0.9`, letter-spacing `-0.03em`, top `clamp(74px, 11vh, 130px)`.

**Aside.** Coarse pointer: `Plants turn toward the light. Here, the light is your finger. Tap the ground to plant something; it will start leaning too.` Otherwise: `Plants turn toward the light. Here, the light is you. Click anywhere to plant something; it will start leaning too.` It sits under the headline, width `min(330px, 30vw)`, 13px, opacity `0.75`.

**Dock.** Upper right. `Plant a seed` and `Let the sun set ↓`. Hover fills `#d6f06b` and sets the label to `#1d2117`.

**Notes**, right side, serif, `clamp(26px, 3vw, 48px)`, opacity 0 until the timeline:

- Dusk: `By evening they ` italic `close up.`
- Night: `At night they rest. ` italic `Mostly.`

**Finale.** Kicker `Oversight Supply · plants that pay attention`, with an 8px lime square. Title:

```
Grow toward
what you love.
```

`what you love.` is italic lime. Body, max-width 420px: `Houseplants, seedlings and slow-growing things, raised by people who turn them to the window every morning.` Button `Back to morning` and `↑`.

The canvas is `role="img"` with `aria-label="A hand-drawn meadow of daisies, tulips, bluebells and dandelions, every stem bending toward the light"`.

**Meadow.** Ground is `87%` of the stage height, or `86%` when the stage is narrower than 700. The first sow uses seed `20250928`. Desktop grows 48 plants and 170 grass blades. A phone grows 26 plants and 70 blades. Kinds, in the weighted list, are daisy, daisy, tulip, bell, dandelion, bud, daisy, dandelion. Every third plant is in the back row and draws first. User-planted stems are kept across a resize. The planted list is capped at 30; the oldest planted stem is removed, but the header count does not go backwards.

## Interactions & animation timeline

`NIGHT_AT` is `0.7`. Time of day is `smooth(0.06, 0.66, p)`, so by progress `0.66` the clock has reached night and stays there.

Daylight is `1 - smooth(0.35, 0.7, tod)`. Night amount is `smooth(0.55, 0.8, tod)`.

**Intro**, delay `0.15`, ease `expo.out`, only if motion is allowed:

- `.pt-top > *` from `{ opacity: 0, y: -8 }`, duration `1`, stagger `0.08`
- At `0.2`: each `.pt-head .pt-w` from `{ yPercent: 110 }`, duration `1.6`, stagger `0.07`
- At `1`: `.pt-sub__in, .pt-dock__in` from `{ opacity: 0, y: 10 }`, duration `1.2`, stagger `0.1`

Stems sprout on their own. Each plant’s delay is `0.25 + (x / width) * 1.3` plus up to `0.5` seconds, then it grows over `2` to `3.6` seconds and blooms over `0.9` seconds. Reduced motion skips the delay and starts them grown and open.

**Scroll**, track `460vh`, `scrub: 0.6`.

| From | To | What changes |
| --- | --- | --- |
| 0.00 | 1.00 | `applyTime` sets the meadow clock, `--pt-ink`, `data-night`, and the header clock. |
| 0.05 | 0.10 | Aside and dock fade and rise 16px. |
| 0.26 | 0.31 | The dusk note fades in. |
| 0.42 | 0.47 | The dusk note fades out. |
| 0.58 | 0.63 | The night note fades in. |
| 0.78 | 0.83 | The night note fades out. |
| 0.80 | 0.86 | The headline fades and rises 24px. |
| 0.88 | 0.95 | The finale fades in and receives pointer events. |

**Reduced motion** parks at `0`, `0.7`, or `1` (`progress > 0.8` → 1, `> 0.25` → `0.7`). No intro. No Lenis. Plants start fully grown. The idle sun does not drift.

**Light.** Pointer move, and touch move, set the light target. If the pointer has been still for 4 seconds, and motion is allowed, the target becomes a slow sun: `x = width * (0.55 + 0.32 * sin(t * 0.11))`, `y = height * (0.26 + 0.08 * cos(t * 0.17))`. The light eases toward the target. Stems bend toward it, less at night (`reach = 0.35 + 0.65 * day`). Flowers open more when the light is near, and a live pointer at night wakes nearby ones (`wake`). A light below the ground does not bend them. Headline letters rotate toward the light, clamped, weaker with distance, and weaker at night than by day.

**Planting.** A click that is not on a button, and while progress is at most `0.86`, drops a seed from that point. It falls (`vy` gains `900` per second) and the stem’s grow delay starts when it hits the ground. **Plant a seed** drops one at a random `x` between 15% and 85% of the width, `y` at 40% of the height. A plant within 80px of a dandelion head blows up to 8 of its seeds. A fast pointer (faster than 350 px/s) within 46px of a bloomed dandelion blows 4. Dandelion clocks refill toward 26 seeds. Loose seeds drift off. Planted seeds fall and sprout.

**Fireflies** appear with night, up to 60 on desktop and 28 on a phone. A live pointer within 260px pulls them.

**Let the sun set** scrolls to progress `0.7` (2.2 seconds with Lenis). **Back to morning** scrolls to 0 (2.6 seconds). Without Lenis, both jump with `behavior: 'auto'`.

**Lenis** `{ lerp: 0.085 }` when motion is allowed.

A phone resize that changes width by less than 2px and height by less than 120px does not resow the meadow. That is the URL bar. A real resize does resow, and keeps the stems you planted.

## Responsive behaviour

**Desktop, wider than 1000px.** Headline up to 138px at the upper left. Aside under it. Dock at the upper right. Notes on the right at `top: 40%`. 48 plants. Ground at `0.87` of the height. Device pixel ratio capped at `1.5`.

**700px to 1000px.** The aside is `display: none`. The meadow is still the desktop sow, because `mobile` is `width < 700`.

**699px and under.** Header is two columns. `Phototropism` and the planted count are hidden. The clock remains. Headline `top: 56px`, `clamp(42px, 12vw, 60px)`. Aside is full width under the headline, 12px. Dock is centred near the lower edge (`bottom: calc(14% - 8px)`). Notes are left-aligned at `top: 34%`. Finale `top: 70px`, title `clamp(44px, 12vw, 60px)`, body 12.5px. 26 plants, 70 blades, ground at `0.86` of the height, plant size `0.75`, pixel ratio capped at `2`. Up to 28 fireflies.

## Accessibility & robustness

- The canvas description names the four flowers and the bending. The headline’s accessible name is the full sentence; the per-letter spans are hidden from the tree so they are not spelled one character at a time.
- Dock buttons and the finale button are real buttons with `:focus-visible` outlines.
- Clicks on `button` or `a` do not plant.
- If `getContext('2d')` fails, the meadow constructor throws. There is no second renderer.
- The ticker runs only while the track intersects and the document is visible.
- **`overflow: clip`** is set after `overflow: hidden`.
- **StrictMode.** Scroll state is a fresh `{ p: 0 }` inside `gsap.context`. Cleanup reverts that context and drops the meadow. Letter measurement runs again when `document.fonts.ready` resolves.

## Performance notes

- One canvas, capped at `1.5` device pixels on desktop and `2` on a phone. `step` clamps delta to `1/30` of a second.
- The meadow is sown once per real resize, not per frame. Planted stems survive that resow.
- Fireflies and seeds are capped by the night amount and by life. Extra planted stems stop at 30.
- The paper grain is one SVG data URL. It is not redrawn.

## Full source code

Create these four files exactly. Do not reformat, rename, or restyle them. `index.html` replaces the Vite template’s `index.html`. The other three sit under `src/`. The template files `App.tsx`, `App.css`, `index.css`, and `vite.svg` are unused; delete them. Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f7f0e3" />
    <title>Phototropism — Oversight Supply</title>
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
import './phototropism.css'
import PhototropismHero from './PhototropismHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PhototropismHero />
  </StrictMode>,
)
```

### `src/PhototropismHero.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Meadow } from './Meadow'

gsap.registerPlugin(ScrollTrigger)

const smooth = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const todOf = (p: number) => smooth(0.06, 0.66, p)
const NIGHT_AT = 0.7

const HEAD = [['Everything'], ['here', 'leans'], ['toward', 'you.']]

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

function clock(tod: number) {
  const m = Math.round(6 * 60 + 40 + tod * 16 * 60)
  return `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

export default function PhototropismHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const clockRef = useRef<HTMLElement>(null)
  const meadowRef = useRef<Meadow | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const progressRef = useRef(0)
  const reduced = usePrefersReducedMotion()

  const [planted, setPlanted] = useState(0)
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)

  const measureLetters = () => {
    const stage = stageRef.current
    const m = meadowRef.current
    if (!stage || !m || !headRef.current) return
    const s = stage.getBoundingClientRect()
    const els = Array.from(headRef.current.querySelectorAll<HTMLElement>('.pt-l'))
    m.letters = els.map((el, i) => {
      const prev = el.style.transform
      el.style.transform = 'none'
      const r = el.getBoundingClientRect()
      el.style.transform = prev
      return { el, x: r.left + r.width / 2 - s.left, y: r.bottom - s.top, a: m.letters[i]?.a ?? 0 }
    })
  }

  const applyTime = (p: number) => {
    progressRef.current = p
    const m = meadowRef.current
    const tod = todOf(p)
    m?.setTime(tod)
    const stage = stageRef.current
    if (stage && m) stage.style.setProperty('--pt-ink', m.inkCss())
    if (stage) stage.dataset.night = tod > 0.55 ? 'on' : 'off'
    if (clockRef.current) clockRef.current.textContent = `${clock(tod)} ${tod > 0.52 ? '☾' : '☀'}`
  }

  /* ------------------------------------------------ engine */
  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return
    const m = new Meadow(canvas)
    m.reduced = reduced
    m.onPlanted = (n) => setPlanted(n)
    meadowRef.current = m
    m.resize(stage.clientWidth, stage.clientHeight)
    applyTime(progressRef.current)
    measureLetters()
    document.fonts?.ready.then(measureLetters).catch(() => {})

    let running = false
    let inView = true
    const tick = (_t: number, dtMs: number) => m.step(dtMs / 1000)
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
    let rh = stage.clientHeight
    const ro = new ResizeObserver(() => {
      // a phone's URL bar sliding in and out shouldn't regrow the whole meadow
      const w = stage.clientWidth, h = stage.clientHeight
      if (Math.abs(w - rw) < 2 && Math.abs(h - rh) < 120 && m.mobile) return
      rw = w
      rh = h
      m.resize(w, h)
      measureLetters()
    })
    ro.observe(stage)
    return () => {
      gsap.ticker.remove(tick)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', sync)
      meadowRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (meadowRef.current) meadowRef.current.reduced = reduced
  }, [reduced])

  /* ------------------------------------------------ pointer = the light; taps plant */
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
      meadowRef.current?.pointer(p.x, p.y)
    }
    const touch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t || onUi(e.target)) return
      const p = local(t.clientX, t.clientY)
      meadowRef.current?.pointer(p.x, p.y)
    }
    const click = (e: MouseEvent) => {
      if (onUi(e.target) || progressRef.current > 0.86) return
      const p = local(e.clientX, e.clientY)
      meadowRef.current?.pointer(p.x, p.y)
      meadowRef.current?.plant(p.x, p.y)
    }
    stage.addEventListener('pointermove', move)
    stage.addEventListener('touchstart', touch, { passive: true })
    stage.addEventListener('touchmove', touch, { passive: true })
    stage.addEventListener('click', click)
    return () => {
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('touchstart', touch)
      stage.removeEventListener('touchmove', touch)
      stage.removeEventListener('click', click)
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
          .from('.pt-top > *', { opacity: 0, y: -8, duration: 1, stagger: 0.08 })
          .from('.pt-head .pt-w', { yPercent: 110, duration: 1.6, stagger: 0.07 }, 0.2)
          .from('.pt-sub__in, .pt-dock__in', { opacity: 0, y: 10, duration: 1.2, stagger: 0.1 }, 1)
      }
      const target = { p: 0 } // fresh per run: a StrictMode revert can't zero a shared object
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      tl.to(target, { p: 1, duration: 1, onUpdate: () => applyTime(target.p) }, 0)
        .to('.pt-sub, .pt-dock', { opacity: 0, y: -16, duration: 0.05, stagger: 0.012 }, 0.05)
        .fromTo('.pt-note--dusk', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.05 }, 0.26)
        .to('.pt-note--dusk', { opacity: 0, y: -14, duration: 0.05 }, 0.42)
        .fromTo('.pt-note--night', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.05 }, 0.58)
        .to('.pt-note--night', { opacity: 0, y: -14, duration: 0.05 }, 0.78)
        .to('.pt-head', { opacity: 0, y: -24, duration: 0.06 }, 0.8)
        .fromTo('.pt-final', { opacity: 0, y: 30, pointerEvents: 'none' }, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.88)

      stRef.current = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        animation: reduced ? undefined : tl,
        scrub: reduced ? false : 0.6,
        onUpdate(self) {
          if (!reduced) return
          // discrete states only: morning → night → the end
          const p = self.progress > 0.8 ? 1 : self.progress > 0.25 ? NIGHT_AT : 0
          tl.progress(p)
          applyTime(p)
        },
      })
      applyTime(0)
    }, stageRef)
    return () => {
      stRef.current = null
      ctx.revert()
    }
  }, [reduced]) // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToProgress = (p: number) => {
    const st = stRef.current
    if (!st) return
    const y = st.start + (st.end - st.start) * p
    if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: p === 0 ? 2.6 : 2.2 })
    else window.scrollTo({ top: y, behavior: 'auto' })
  }
  const plantSomewhere = () => {
    const s = stageRef.current
    if (!s) return
    const x = s.clientWidth * (0.15 + Math.random() * 0.7)
    meadowRef.current?.plant(x, s.clientHeight * 0.4)
  }

  let li = 0
  return (
    <main className="pt-root">
      <section ref={trackRef} className="pt-track" aria-label="Phototropism — a meadow that turns toward you">
        <div ref={stageRef} className="pt-stage" data-night="off">
          <canvas
            ref={canvasRef}
            className="pt-gl"
            role="img"
            aria-label="A hand-drawn meadow of daisies, tulips, bluebells and dandelions, every stem bending toward the light"
          />
          <div className="pt-paper" aria-hidden="true" />

          <header className="pt-top">
            <span>Oversight Supply</span>
            <span className="pt-top__c">Photo<em>tropism</em></span>
            <span className="pt-top__r">
              <b ref={clockRef}>06:40 ☀</b>
              <span className="pt-top__n"> · Planted {String(planted).padStart(2, '0')}</span>
            </span>
          </header>

          <h1 ref={headRef} className="pt-head" aria-label="Everything here leans toward you.">
            {HEAD.map((line, i) => (
              <span key={i} className={`pt-ln${i === 2 ? ' pt-ln--em' : ''}`} aria-hidden="true">
                {line.map((word, j) => (
                  <span key={j} className="pt-wwrap">
                    <span className="pt-w">
                      {word.split('').map((ch) => (
                        <span key={li++} className="pt-l">{ch}</span>
                      ))}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="pt-sub">
            <p className="pt-sub__in">
              {isTouch
                ? 'Plants turn toward the light. Here, the light is your finger. Tap the ground to plant something; it will start leaning too.'
                : 'Plants turn toward the light. Here, the light is you. Click anywhere to plant something; it will start leaning too.'}
            </p>
          </div>

          <div className="pt-dock">
            <div className="pt-dock__in">
              <button type="button" onClick={plantSomewhere}>Plant a seed</button>
              <button type="button" onClick={() => scrollToProgress(NIGHT_AT)}>Let the sun set ↓</button>
            </div>
          </div>

          <p className="pt-note pt-note--dusk" aria-hidden="true">
            By evening they <em>close up.</em>
          </p>
          <p className="pt-note pt-note--night" aria-hidden="true">
            At night they rest. <em>Mostly.</em>
          </p>

          <div className="pt-final">
            <p className="pt-final__kicker">Oversight Supply · plants that pay attention</p>
            <h2 className="pt-final__title">
              Grow toward <br />
              <em>what you love.</em>
            </h2>
            <p className="pt-final__body">Houseplants, seedlings and slow-growing things, raised by people who turn them to the window every morning.</p>
            <button type="button" className="pt-final__btn" onClick={() => scrollToProgress(0)}>
              Back to morning <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
```

### `src/Meadow.ts`

```ts
// Phototropism — an ink-drawn meadow that turns toward the light (you).
// Plain canvas 2D. Time of day comes from scroll; the light comes from the pointer.

type Kind = 'daisy' | 'tulip' | 'bell' | 'dandelion' | 'bud'
type Leaf = { k: number; side: 1 | -1; len: number; wid: number; ang: number }
type Plant = {
  x: number
  front: boolean
  N: number
  seg: number
  curv: number
  phase: number
  bendMax: number
  resp: number
  g: number
  dur: number
  delay: number
  leaves: Leaf[]
  kind: Kind
  size: number
  open: number
  bloom: number
  dir: number
  seeds: number
  planted: boolean
  tip: { x: number; y: number; a: number }
}
type Blade = { x: number; h: number; lean: number; phase: number; front: boolean }
type Fly = { x: number; y: number; vx: number; vy: number; phase: number; life: number }
type Seed = { x: number; y: number; vx: number; vy: number; life: number; rot: number; falling?: { to: number; plant: Plant } }

const TAU = Math.PI * 2
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
const damp = (dt: number, r: number) => 1 - Math.exp(-dt * r)

type RGB = [number, number, number]
const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
const css = (c: RGB, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`

// morning → dusk → night
const KEYS: { t: number; top: RGB; bot: RGB; ink: RGB; fill: RGB; glow: RGB; ga: number }[] = [
  { t: 0, top: hex('#f7f0e3'), bot: hex('#f1dfc4'), ink: hex('#3b2f22'), fill: hex('#f8f2e6'), glow: hex('#ffd38a'), ga: 0.8 },
  { t: 0.45, top: hex('#6d5c88'), bot: hex('#f2a578'), ink: hex('#2c2231'), fill: hex('#f3d2bb'), glow: hex('#ffb07a'), ga: 0.65 },
  { t: 0.75, top: hex('#0c1122'), bot: hex('#1c2340'), ink: hex('#ece3cc'), fill: hex('#121830'), glow: hex('#b9d0ff'), ga: 0.22 },
  { t: 1, top: hex('#0a0e1c'), bot: hex('#171d36'), ink: hex('#ece3cc'), fill: hex('#10152a'), glow: hex('#c6d8ff'), ga: 0.2 },
]
const LIME: RGB = hex('#d6f06b')

function palette(t: number) {
  let i = 0
  while (i < KEYS.length - 2 && t > KEYS[i + 1].t) i++
  const a = KEYS[i], b = KEYS[i + 1]
  const k = smooth(a.t, b.t, t)
  return {
    top: mix(a.top, b.top, k),
    bot: mix(a.bot, b.bot, k),
    ink: mix(a.ink, b.ink, k),
    fill: mix(a.fill, b.fill, k),
    glow: mix(a.glow, b.glow, k),
    ga: a.ga + (b.ga - a.ga) * k,
  }
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

export class Meadow {
  reduced = false
  planted = 0
  onPlanted?: (n: number) => void
  /** letters that lean too: element + its resting centre in stage px */
  letters: { el: HTMLElement; x: number; y: number; a: number }[] = []

  private ctx: CanvasRenderingContext2D
  private w = 1
  private h = 1
  private dpr = 1
  private ground = 1
  private plants: Plant[] = []
  private blades: Blade[] = []
  private flies: Fly[] = []
  private seeds: Seed[] = []
  private time = 0
  private tod = 0 // time of day 0 morning → 1 night
  private light = { x: 0, y: 0 }
  private target = { x: 0, y: 0 }
  private ptrSeen = -99
  private ptrV = 0
  private last = { x: 0, y: 0, t: 0 }
  private r = rng(11)

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
  }

  get mobile() {
    return this.w < 700
  }

  resize(w: number, h: number) {
    const first = this.w === 1
    this.w = Math.max(1, w)
    this.h = Math.max(1, h)
    this.dpr = Math.min(window.devicePixelRatio || 1, this.mobile ? 2 : 1.5)
    this.canvas.width = Math.round(this.w * this.dpr)
    this.canvas.height = Math.round(this.h * this.dpr)
    this.ground = this.h * (this.mobile ? 0.86 : 0.87)
    if (first) {
      this.light = { x: this.w * 0.7, y: this.h * 0.28 }
      this.target = { ...this.light }
    }
    this.sow()
  }

  /** a fresh meadow, sprouting left to right */
  private sow() {
    const r = rng(20250928)
    const n = this.mobile ? 26 : 48
    const keep = this.plants.filter((p) => p.planted)
    this.plants = []
    for (let i = 0; i < n; i++) {
      const front = i % 3 !== 0
      const x = ((i + r() * 0.9) / n) * this.w * 1.04 - this.w * 0.02
      const p = this.genome(x, front, r)
      p.delay = (this.reduced ? 0 : 0.25) + (x / this.w) * (this.reduced ? 0 : 1.3) + r() * 0.5
      this.plants.push(p)
    }
    // back row first so the front row draws over it
    this.plants.sort((a, b) => Number(a.front) - Number(b.front))
    for (const p of keep) {
      p.x = Math.min(p.x, this.w)
      this.plants.push(p)
    }
    this.blades = []
    const nb = this.mobile ? 70 : 170
    for (let i = 0; i < nb; i++) {
      this.blades.push({
        x: r() * this.w,
        h: (this.mobile ? 16 : 22) + r() * (this.mobile ? 34 : 50),
        lean: (r() - 0.5) * 0.5,
        phase: r() * TAU,
        front: r() < 0.55,
      })
    }
  }

  private genome(x: number, front: boolean, r: () => number): Plant {
    const kinds: Kind[] = ['daisy', 'daisy', 'tulip', 'bell', 'dandelion', 'bud', 'daisy', 'dandelion']
    const kind = kinds[Math.floor(r() * kinds.length)]
    const H = this.h * (front ? 0.2 + r() * (this.mobile ? 0.26 : 0.34) : 0.14 + r() * 0.2)
    const N = 14
    const leaves: Leaf[] = []
    const nl = 1 + Math.floor(r() * 3)
    for (let j = 0; j < nl; j++) {
      leaves.push({
        k: 2 + Math.floor(r() * 6) + j * 2,
        side: j % 2 ? 1 : -1,
        len: H * (0.14 + r() * 0.1),
        wid: 0.26 + r() * 0.12,
        ang: 0.7 + r() * 0.5,
      })
    }
    return {
      x,
      front,
      N,
      seg: H / N,
      curv: (r() - 0.5) * 0.5,
      phase: r() * TAU,
      bendMax: 0.55 + r() * 0.45,
      resp: 0.7 + r() * 1.3,
      g: this.reduced ? 1 : 0,
      dur: 2 + r() * 1.6,
      delay: 0,
      leaves: leaves.filter((l) => l.k < N - 2),
      kind,
      size: (front ? 1 : 0.75) * (this.mobile ? 0.75 : 1) * (8 + r() * 7),
      open: 0,
      bloom: this.reduced ? 1 : 0,
      dir: 0,
      seeds: 26,
      planted: false,
      tip: { x, y: this.ground, a: 0 },
    }
  }

  setTime(t: number) {
    this.tod = clamp(t, 0, 1)
  }

  pointer(x: number, y: number) {
    const dt = Math.max(0.008, this.time - this.last.t)
    this.ptrV = Math.hypot(x - this.last.x, y - this.last.y) / dt
    this.last = { x, y, t: this.time }
    this.target = { x, y }
    this.ptrSeen = this.time
  }

  /** drop a seed from (x, y); it sprouts where it lands */
  plant(x: number, y: number) {
    const r = this.r
    const p = this.genome(clamp(x, 8, this.w - 8), true, r)
    p.g = 0
    p.bloom = 0
    p.planted = true
    p.delay = 1e9 // waits for its seed to land
    this.seeds.push({ x, y: Math.min(y, this.ground - 4), vx: 0, vy: 0, life: 1, rot: 0, falling: { to: this.ground, plant: p } })
    this.plants.push(p)
    const extra = this.plants.filter((q) => q.planted)
    if (extra.length > 30) this.plants.splice(this.plants.indexOf(extra[0]), 1)
    this.planted++
    this.onPlanted?.(this.planted)
    // also shake loose any dandelion seeds nearby
    for (const q of this.plants) if (q.kind === 'dandelion' && Math.hypot(q.tip.x - x, q.tip.y - y) < 80) this.blow(q, 8)
  }

  private blow(p: Plant, n: number) {
    const k = Math.min(n, Math.floor(p.seeds))
    for (let i = 0; i < k; i++) {
      const a = this.r() * TAU
      this.seeds.push({
        x: p.tip.x + Math.cos(a) * p.size,
        y: p.tip.y + Math.sin(a) * p.size,
        vx: (this.r() - 0.3) * 40,
        vy: -20 - this.r() * 30,
        life: 1,
        rot: this.r() * TAU,
      })
    }
    p.seeds -= k
  }

  step(dt: number) {
    dt = Math.min(dt, 1 / 30)
    this.time += dt
    const t = this.time
    const day = 1 - smooth(0.35, 0.7, this.tod) // how much sun there is
    const night = smooth(0.55, 0.8, this.tod)

    // ---- the light: pointer, or a slow drifting sun when idle
    const live = t - this.ptrSeen < 4
    if (!live && !this.reduced) {
      this.target = {
        x: this.w * (0.55 + 0.32 * Math.sin(t * 0.11)),
        y: this.h * (0.26 + 0.08 * Math.cos(t * 0.17)),
      }
    }
    const k = damp(dt, live ? 7 : 1.2)
    this.light.x += (this.target.x - this.light.x) * k
    this.light.y += (this.target.y - this.light.y) * k
    const L = this.light

    // ---- plants
    for (const p of this.plants) {
      if (t > p.delay && p.g < 1) p.g = Math.min(1, p.g + dt / p.dur)
      if (p.g >= 1 && p.bloom < 1) p.bloom = Math.min(1, p.bloom + dt / 0.9)
      const H = p.seg * p.N
      const mx = p.x, my = this.ground - H * 0.55
      let want = Math.atan2(L.x - mx, my - L.y) // angle from vertical toward the light
      if (L.y > this.ground) want = 0
      const reach = 0.35 + 0.65 * day // at night they relax
      want = clamp(want, -p.bendMax, p.bendMax) * reach
      p.dir += (want - p.dir) * damp(dt, this.reduced ? 6 : p.resp)
      const d = Math.hypot(p.tip.x - L.x, p.tip.y - L.y) / Math.max(this.w, this.h)
      const near = Math.exp(-d * d * 18)
      const wake = night * near * (live ? 1 : 0) // "mostly" asleep: the lantern wakes them
      const openT = clamp(day * (0.45 + 0.55 * near) + wake * 0.8, 0, 1)
      p.open += (openT - p.open) * damp(dt, 2.2)
      if (p.kind === 'dandelion') {
        p.seeds = Math.min(26, p.seeds + dt * 0.25)
        if (live && this.ptrV > 350 && Math.hypot(p.tip.x - L.x, p.tip.y - L.y) < 46 && p.bloom > 0.9) this.blow(p, 4)
      }
    }

    // ---- fireflies after dark
    const want = Math.round(night * (this.mobile ? 28 : 60))
    while (this.flies.length < want) {
      this.flies.push({ x: this.r() * this.w, y: this.ground - this.r() * this.h * 0.5, vx: 0, vy: 0, phase: this.r() * TAU, life: 0 })
    }
    this.flies = this.flies.filter((f, i) => {
      if (i >= want) f.life -= dt * 0.8
      else f.life = Math.min(1, f.life + dt * 0.6)
      const ang = Math.sin(t * 0.7 + f.phase) * 3 + f.phase
      f.vx += Math.cos(ang) * 30 * dt
      f.vy += Math.sin(ang * 1.3) * 22 * dt
      if (live) {
        const dx = L.x - f.x, dy = L.y - f.y
        const dd = Math.hypot(dx, dy) + 1
        if (dd < 260) {
          f.vx += (dx / dd) * 60 * dt
          f.vy += (dy / dd) * 60 * dt
        }
      }
      f.vx *= Math.exp(-dt * 1.2)
      f.vy *= Math.exp(-dt * 1.2)
      f.x += f.vx * dt
      f.y += f.vy * dt
      if (f.y > this.ground - 6) f.vy -= 40 * dt
      return f.life > 0
    })

    // ---- seeds (falling ones sprout; dandelion ones drift off)
    this.seeds = this.seeds.filter((s) => {
      if (s.falling) {
        s.vy += 900 * dt
        s.y += s.vy * dt
        if (s.y >= s.falling.to) {
          s.falling.plant.delay = t
          return false
        }
        return true
      }
      s.vx += (Math.sin(t * 1.3 + s.rot) * 18 + 10) * dt
      s.vy += (-8 + Math.cos(t + s.rot) * 6) * dt
      s.x += s.vx * dt
      s.y += s.vy * dt
      s.rot += dt
      s.life -= dt * 0.12
      return s.life > 0 && s.y > -40 && s.x < this.w + 40
    })

    this.draw(day, night)
    this.leanLetters(dt, day, night)
  }

  private leanLetters(dt: number, day: number, night: number) {
    const L = this.light
    const k = damp(dt, 3)
    for (const l of this.letters) {
      const dx = L.x - l.x, dy = L.y - l.y
      const d = Math.hypot(dx, dy)
      let a = Math.atan2(dx, -dy)
      a = clamp(a, -0.5, 0.5) * (0.25 + 0.75 * Math.exp(-d / 700)) * (0.3 + 0.7 * Math.max(day, night * 0.5))
      l.a += (a * 0.32 - l.a) * k
      l.el.style.transform = `rotate(${((l.a * 180) / Math.PI).toFixed(2)}deg)`
    }
  }

  /** current ink colour, for the DOM text */
  inkCss() {
    return css(palette(this.tod).ink)
  }

  // --------------------------------------------------------------- drawing
  private draw(day: number, night: number) {
    const ctx = this.ctx
    const pal = palette(this.tod)
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

    // sky
    const g = ctx.createLinearGradient(0, 0, 0, this.ground)
    g.addColorStop(0, css(pal.top))
    g.addColorStop(1, css(pal.bot))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, this.w, this.h)

    // the light (sun by day, lantern by night)
    const L = this.light
    const R = Math.max(this.w, this.h) * (0.32 - 0.12 * night)
    const lg = ctx.createRadialGradient(L.x, L.y, 0, L.x, L.y, R)
    lg.addColorStop(0, css(pal.glow, pal.ga))
    lg.addColorStop(0.35, css(pal.glow, pal.ga * 0.35))
    lg.addColorStop(1, css(pal.glow, 0))
    ctx.fillStyle = lg
    ctx.fillRect(0, 0, this.w, this.h)
    // the light's own disc
    ctx.fillStyle = css(mix(pal.glow, [255, 255, 255], 0.5), 0.55 + 0.3 * day)
    ctx.beginPath()
    ctx.arc(L.x, L.y, 5 + 3 * day, 0, TAU)
    ctx.fill()

    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    for (const p of this.plants) if (!p.front) this.drawPlant(p, pal, 0.5)
    this.drawGrass(pal, false, day)
    for (const p of this.plants) if (p.front) this.drawPlant(p, pal, 1)
    this.drawGrass(pal, true, day)

    // soil
    const sg = ctx.createLinearGradient(0, this.ground, 0, this.h)
    const loam: RGB = [52, 40, 28]
    sg.addColorStop(0, css(mix(pal.bot, loam, 0.16)))
    sg.addColorStop(1, css(mix(pal.bot, loam, 0.3)))
    ctx.fillStyle = sg
    ctx.fillRect(0, this.ground, this.w, this.h - this.ground)
    ctx.strokeStyle = css(pal.ink, 0.8)
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(0, this.ground)
    ctx.lineTo(this.w, this.ground)
    ctx.stroke()
    ctx.strokeStyle = css(pal.ink, 0.22)
    ctx.lineWidth = 1
    ctx.beginPath()
    const rr = rng(3)
    for (let i = 0; i < (this.mobile ? 40 : 110); i++) {
      const x = rr() * this.w, y = this.ground + 6 + rr() * (this.h - this.ground - 10)
      const l = 4 + rr() * 12
      ctx.moveTo(x, y)
      ctx.lineTo(x + l, y + 1)
    }
    ctx.stroke()

    // drifting seeds
    for (const s of this.seeds) {
      const a = s.falling ? 1 : s.life
      ctx.save()
      ctx.translate(s.x, s.y)
      ctx.rotate(s.rot)
      ctx.strokeStyle = css(pal.ink, a)
      ctx.fillStyle = css(night > 0.5 ? LIME : pal.ink, a)
      ctx.lineWidth = 0.8
      if (s.falling) {
        ctx.beginPath()
        ctx.ellipse(0, 0, 2.2, 3.4, 0, 0, TAU)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -9)
        for (let i = 0; i < 6; i++) {
          const b = -Math.PI / 2 + (i - 2.5) * 0.35
          ctx.moveTo(0, -9)
          ctx.lineTo(Math.cos(b) * 5, -9 + Math.sin(b) * 5)
        }
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(0, 1, 1.2, 0, TAU)
        ctx.fill()
      }
      ctx.restore()
    }

    // fireflies
    if (this.flies.length) {
      ctx.globalCompositeOperation = 'lighter'
      for (const f of this.flies) {
        const blink = 0.5 + 0.5 * Math.sin(this.time * 2.3 + f.phase * 3)
        const a = f.life * (0.25 + 0.75 * blink * blink)
        const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 14)
        fg.addColorStop(0, css(LIME, 0.9 * a))
        fg.addColorStop(0.25, css(LIME, 0.35 * a))
        fg.addColorStop(1, css(LIME, 0))
        ctx.fillStyle = fg
        ctx.fillRect(f.x - 14, f.y - 14, 28, 28)
      }
      ctx.globalCompositeOperation = 'source-over'
    }
  }

  private drawGrass(pal: ReturnType<typeof palette>, front: boolean, day: number) {
    const ctx = this.ctx
    const L = this.light
    ctx.strokeStyle = css(pal.ink, front ? 0.85 : 0.45)
    ctx.lineWidth = front ? 1.1 : 0.8
    ctx.beginPath()
    for (const b of this.blades) {
      if (b.front !== front) continue
      const toward = clamp(Math.atan2(L.x - b.x, this.ground - 60 - L.y), -0.5, 0.5) * 0.5 * (0.4 + 0.6 * day)
      const sway = this.reduced ? 0 : Math.sin(this.time * 1.1 + b.phase) * 0.08
      const a = b.lean + toward + sway
      const tx = b.x + Math.sin(a) * b.h
      const ty = this.ground - Math.cos(a) * b.h
      ctx.moveTo(b.x, this.ground + 1)
      ctx.quadraticCurveTo(b.x + Math.sin(a * 0.4) * b.h * 0.5, this.ground - b.h * 0.55, tx, ty)
    }
    ctx.stroke()
  }

  private drawPlant(p: Plant, pal: ReturnType<typeof palette>, alpha: number) {
    if (p.g <= 0) return
    const ctx = this.ctx
    const sway = this.reduced ? 0 : Math.sin(this.time * 0.9 + p.phase) * 0.035 + Math.sin(this.time * 2.1 + p.phase * 2) * 0.012
    const vis = p.g * p.N
    const pts: { x: number; y: number; a: number }[] = [{ x: p.x, y: this.ground, a: 0 }]
    let x = p.x, y = this.ground
    for (let i = 0; i < p.N && i < vis; i++) {
      const u = (i + 1) / p.N
      const a = p.curv * u + (p.dir + sway) * Math.pow(u, 1.25) * 1.15
      const len = p.seg * Math.min(1, vis - i)
      x += Math.sin(a) * len
      y -= Math.cos(a) * len
      pts.push({ x, y, a })
    }
    const tip = pts[pts.length - 1]
    p.tip = { x: tip.x, y: tip.y, a: tip.a }

    const ink = css(pal.ink, alpha)
    const fill = css(pal.fill, 1)
    const wBase = p.front ? 2.2 : 1.4

    // stem, tapering in three runs
    ctx.strokeStyle = ink
    const last = pts.length - 1
    if (last < 1) return
    const thirds = [0, Math.min(last, Math.ceil(pts.length / 3)), Math.min(last, Math.ceil((pts.length * 2) / 3)), last]
    for (let s = 0; s < 3; s++) {
      const a = thirds[s], b = thirds[s + 1]
      if (b <= a) continue
      ctx.lineWidth = wBase * (1 - s * 0.28)
      ctx.beginPath()
      ctx.moveTo(pts[a].x, pts[a].y)
      for (let i = a + 1; i <= b; i++) {
        const m = pts[i - 1], n = pts[i]
        ctx.quadraticCurveTo(m.x, m.y, (m.x + n.x) / 2, (m.y + n.y) / 2)
      }
      ctx.lineTo(pts[b].x, pts[b].y)
      ctx.stroke()
    }

    // leaves unfurl as the stem passes them
    for (const lf of p.leaves) {
      const unf = clamp((vis - lf.k - 1) / 2.5, 0, 1)
      if (unf <= 0 || !pts[lf.k]) continue
      const at = pts[lf.k]
      const ang = at.a + lf.side * lf.ang * (0.6 + 0.4 * unf) - Math.PI / 2
      this.leaf(at.x, at.y, ang, lf.len * unf, lf.wid, ink, fill, alpha)
    }

    // the flower
    if (p.g >= 1 && p.bloom > 0) this.flower(p, tip, pal, ink, fill, alpha)
  }

  private leaf(x: number, y: number, a: number, len: number, wid: number, ink: string, fill: string, alpha: number) {
    const ctx = this.ctx
    const w = len * wid
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(a)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.quadraticCurveTo(len * 0.35, -w, len, 0)
    ctx.quadraticCurveTo(len * 0.35, w * 0.9, 0, 0)
    ctx.fillStyle = fill
    ctx.globalAlpha = alpha
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.strokeStyle = ink
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(len * 0.05, 0)
    ctx.quadraticCurveTo(len * 0.5, -w * 0.12, len * 0.9, 0)
    // a few veins, engraving-style
    for (let i = 1; i <= 3; i++) {
      const u = i / 4.2
      ctx.moveTo(len * u, -w * 0.05)
      ctx.lineTo(len * (u + 0.12), -w * 0.55 * Math.sin(Math.PI * u))
    }
    ctx.lineWidth = 0.6
    ctx.stroke()
    ctx.restore()
  }

  private flower(p: Plant, tip: { x: number; y: number; a: number }, pal: ReturnType<typeof palette>, ink: string, fill: string, alpha: number) {
    const ctx = this.ctx
    const s = p.size * (0.3 + 0.7 * p.bloom)
    const o = p.open
    ctx.save()
    ctx.translate(tip.x, tip.y)
    ctx.rotate(tip.a)
    ctx.strokeStyle = ink
    ctx.lineWidth = 1
    ctx.fillStyle = fill
    const accent = css(mix(LIME, pal.ink, 0.15), alpha)
    switch (p.kind) {
      case 'daisy': {
        const n = 13
        for (let i = 0; i < n; i++) {
          const full = (i / n) * TAU
          const shut = -Math.PI / 2 + (i / (n - 1) - 0.5) * 0.9
          const ang = shut + (full - shut) * o
          const len = s * (0.9 + 1.2 * o)
          ctx.beginPath()
          ctx.ellipse(Math.cos(ang) * len * 0.55, Math.sin(ang) * len * 0.55 - s * 0.2, len * 0.5, s * 0.22, ang, 0, TAU)
          ctx.fill()
          ctx.stroke()
        }
        ctx.beginPath()
        ctx.arc(0, -s * 0.2, s * 0.38, 0, TAU)
        ctx.fillStyle = accent
        ctx.fill()
        ctx.stroke()
        break
      }
      case 'tulip': {
        const spread = 0.12 + 0.55 * o
        for (const side of [-1, 1, 0]) {
          ctx.save()
          ctx.rotate(side * spread)
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.bezierCurveTo(-s * 0.9, -s * 0.4, -s * 0.7, -s * 1.9, 0, -s * 2.3)
          ctx.bezierCurveTo(s * 0.7, -s * 1.9, s * 0.9, -s * 0.4, 0, 0)
          ctx.fill()
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(0, -s * 0.3)
          ctx.lineTo(0, -s * 1.8)
          ctx.lineWidth = 0.6
          ctx.stroke()
          ctx.lineWidth = 1
          ctx.restore()
        }
        if (o > 0.4) {
          ctx.beginPath()
          ctx.arc(0, -s * 0.9, s * 0.22 * o, 0, TAU)
          ctx.fillStyle = accent
          ctx.fill()
        }
        break
      }
      case 'bell': {
        // a curled pedicel, the bell hanging from it
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(s * 1.2, -s * 1.1, s * 1.5, s * 0.2)
        ctx.stroke()
        ctx.translate(s * 1.5, s * 0.2)
        ctx.rotate(-tip.a * 0.6)
        const flare = s * (0.55 + 0.45 * o)
        ctx.beginPath()
        ctx.moveTo(-s * 0.35, 0)
        ctx.quadraticCurveTo(-s * 0.55, s * 1.1, -flare, s * 1.6)
        for (let i = 0; i < 4; i++) {
          const x0 = -flare + ((i + 0.5) / 4) * flare * 2
          ctx.quadraticCurveTo(x0, s * (1.45 + 0.25 * o), -flare + ((i + 1) / 4) * flare * 2, s * 1.6)
        }
        ctx.quadraticCurveTo(s * 0.55, s * 1.1, s * 0.35, 0)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        if (o > 0.3) {
          ctx.beginPath()
          ctx.moveTo(0, s * 1.2)
          ctx.lineTo(0, s * (1.6 + 0.4 * o))
          ctx.strokeStyle = accent
          ctx.lineWidth = 1.4
          ctx.stroke()
        }
        break
      }
      case 'dandelion': {
        const n = Math.floor(p.seeds)
        const rad = s * (1.3 + 0.2 * o)
        ctx.beginPath()
        for (let i = 0; i < 26; i++) {
          if (i >= n) continue
          const a = (i / 26) * TAU + 0.1
          const ex = Math.cos(a) * rad, ey = Math.sin(a) * rad - rad * 0.9
          ctx.moveTo(0, -rad * 0.9)
          ctx.lineTo(ex, ey)
          for (let j = -1; j <= 1; j++) {
            const b = a + j * 0.35
            ctx.moveTo(ex, ey)
            ctx.lineTo(ex + Math.cos(b) * s * 0.35, ey + Math.sin(b) * s * 0.35)
          }
        }
        ctx.lineWidth = 0.6
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(0, -rad * 0.9, s * 0.22, 0, TAU)
        ctx.fillStyle = accent
        ctx.fill()
        break
      }
      case 'bud': {
        const star = o
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(-s * 0.7, -s * 0.8, 0, -s * 1.7)
        ctx.quadraticCurveTo(s * 0.7, -s * 0.8, 0, 0)
        ctx.fill()
        ctx.stroke()
        if (star > 0.2) {
          for (let i = 0; i < 5; i++) {
            const a = -Math.PI / 2 + (i - 2) * 0.5 * star
            ctx.beginPath()
            ctx.moveTo(0, -s * 1.5)
            ctx.lineTo(Math.cos(a) * s * 1.1 * star, -s * 1.5 + Math.sin(a) * s * 1.1 * star)
            ctx.strokeStyle = accent
            ctx.stroke()
          }
        }
        break
      }
    }
    ctx.restore()
  }
}
```

### `src/phototropism.css`

```css
/* Phototropism — everything here leans toward you */
:root {
  --pt-paper: #f7f0e3;
  --pt-lime: #d6f06b;
  --pt-serif: 'Instrument Serif', 'Times New Roman', serif;
  --pt-sans: 'Inter Variable', 'Inter', system-ui, sans-serif;
  --pt-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: var(--pt-paper); color: #3b2f22; }
body { font-family: var(--pt-sans); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

.pt-track { position: relative; height: 460vh; }
.pt-stage {
  --pt-ink: #3b2f22;
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  overflow: clip;
  background: var(--pt-paper);
  color: var(--pt-ink);
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
  cursor: crosshair;
}
.pt-gl { position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 0; }
/* laid paper: a faint grain so the ink sits on something */
.pt-paper {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: multiply;
  opacity: 0.5;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .4 0 0 0 0 .32 0 0 0 .16 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  transition: opacity 0.6s ease;
}
[data-night='on'] .pt-paper { opacity: 0.12; mix-blend-mode: screen; }

/* --------------------------------------------------------------- overlay */
.pt-top, .pt-head, .pt-sub, .pt-dock, .pt-note, .pt-final { position: absolute; z-index: 4; }

.pt-top {
  top: 0;
  left: clamp(16px, 2.4vw, 32px);
  right: clamp(16px, 2.4vw, 32px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: clamp(14px, 1.8vw, 22px) 0 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--pt-ink) 18%, transparent);
  font: 500 10.5px/1 var(--pt-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  pointer-events: none;
}
.pt-top__c em { font-family: var(--pt-serif); font-size: 15px; letter-spacing: 0.02em; text-transform: none; }
.pt-top__r { justify-self: end; font-variant-numeric: tabular-nums; }
.pt-top__r b { font-weight: 500; }

.pt-head {
  left: clamp(16px, 3vw, 44px);
  top: clamp(74px, 11vh, 130px);
  margin: 0;
  font-family: var(--pt-serif);
  font-weight: 400;
  font-size: clamp(52px, 7.4vw, 138px);
  line-height: 0.9;
  letter-spacing: -0.03em;
  pointer-events: none;
}
.pt-ln { display: block; }
.pt-ln--em { font-style: italic; }
.pt-wwrap { display: inline-block; margin-right: 0.22em; padding-bottom: 0.06em; }
.pt-w { display: inline-block; }
/* each letter leans from its baseline, like a stem */
.pt-l { display: inline-block; transform-origin: 50% 92%; will-change: transform; }

.pt-sub { left: clamp(16px, 3vw, 44px); top: calc(clamp(74px, 11vh, 130px) + clamp(52px, 7.4vw, 138px) * 2.9); width: min(330px, 30vw); pointer-events: none; }
.pt-sub__in { margin: 0; font-size: 13px; line-height: 1.5; opacity: 0.75; }

.pt-dock { right: clamp(16px, 2.4vw, 32px); top: calc(clamp(14px, 1.8vw, 22px) + 44px); }
.pt-dock__in {
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid color-mix(in srgb, var(--pt-ink) 18%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--pt-paper) 70%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.pt-dock button, .pt-final__btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--pt-ink);
  font: 500 10.5px/1 var(--pt-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 11px 14px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.25s ease, color 0.25s ease;
}
.pt-dock button:hover { background: var(--pt-lime); color: #1d2117; }
.pt-dock button:focus-visible, .pt-final__btn:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }

.pt-note {
  right: clamp(16px, 3vw, 44px);
  top: 40%;
  margin: 0;
  text-align: right;
  font: 400 clamp(26px, 3vw, 48px)/1 var(--pt-serif);
  letter-spacing: -0.02em;
  opacity: 0;
  pointer-events: none;
}
.pt-note em { font-style: italic; }
[data-night='on'] .pt-note em { color: var(--pt-lime); }

.pt-final {
  left: clamp(16px, 3vw, 44px);
  top: clamp(90px, 14vh, 150px);
  width: min(620px, 60vw);
  opacity: 0;
  pointer-events: none;
}
.pt-final__kicker { margin: 0 0 14px; font: 500 10.5px/1.4 var(--pt-mono); letter-spacing: 0.16em; text-transform: uppercase; }
.pt-final__kicker::before { content: ''; display: inline-block; width: 8px; height: 8px; margin-right: 10px; background: var(--pt-lime); vertical-align: 0; }
.pt-final__title { margin: 0; font: 400 clamp(52px, 7.4vw, 138px)/0.88 var(--pt-serif); letter-spacing: -0.035em; }
.pt-final__title em { font-style: italic; color: var(--pt-lime); }
.pt-final__body { max-width: 420px; margin: 18px 0 22px; font-size: 14px; line-height: 1.5; opacity: 0.8; }
.pt-final__btn { border: 1px solid color-mix(in srgb, var(--pt-ink) 50%, transparent); padding: 13px 18px; }
.pt-final__btn:hover { background: var(--pt-lime); border-color: var(--pt-lime); color: #1d2117; }

/* ----------------------------------------------------------- responsive */
@media (max-width: 699px) {
  .pt-top { grid-template-columns: 1fr auto; }
  .pt-top__c { display: none; }
  .pt-top__n { display: none; }
  .pt-head { top: 56px; font-size: clamp(42px, 12vw, 60px); }
  .pt-sub { top: auto; bottom: auto; top: calc(56px + clamp(42px, 12vw, 60px) * 2.95); left: 16px; right: 16px; width: auto; }
  .pt-sub__in { font-size: 12px; }
  .pt-dock { top: auto; right: auto; left: 12px; right: 12px; bottom: calc(14% - 8px); display: flex; justify-content: center; transform: translateY(50%); }
  .pt-dock__in { background: color-mix(in srgb, var(--pt-paper) 80%, transparent); }
  .pt-dock button { padding: 11px 11px; font-size: 9.5px; letter-spacing: 0.1em; }
  .pt-note { left: 16px; right: 16px; top: 34%; text-align: left; }
  .pt-final { left: 16px; right: 16px; width: auto; top: 70px; }
  .pt-final__title { font-size: clamp(44px, 12vw, 60px); }
  .pt-final__body { font-size: 12.5px; margin: 10px 0 14px; }
}
@media (min-width: 700px) and (max-width: 1000px) {
  .pt-sub { display: none; }
}
```

## Assets

Phototropism has no image files. The meadow, the grain, and the sky are drawn in the page. Do not add photographs.

## Build / run

```
npm create vite@latest phototropism -- --template react-ts
cd phototropism
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the four source files, then:

```
npm run dev
```

`src/main.tsx` mounts `<PhototropismHero />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- The meadow needs a 2D canvas. There is no still-image fallback.
- Planted stems last for the visit. A real resize keeps up to 30 of them. Reloading the page grows a new meadow from seed `20250928`.
- Clicks do not plant once scroll progress is past `0.86`, which is the finale.
- No APIs, keys, or accounts are needed.
