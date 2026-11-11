<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Condensation

Condensation is a full-page hero of a greenhouse seen through a fogged pane. The glass starts misted. The word `come in` is traced into the fog in italic Instrument Serif, and a few drips fall from the bottoms of those letters. A squeegee blade travels down the three window bars as you scroll, clearing the pane; the view then zooms through the glass into a cream finale, “Come in, it’s warm.” Move the pointer to wipe a path. Hold the button down and the wipe is wider. A finger both scrolls and wipes. The clear percentage in the header is how much of the mask is open.

Rebuild it as the only thing on the page. Create the files in **Full source code** at the paths in their headings, with those contents exactly. The two photographs are not in those files. Copy them from this section’s `src/assets/` into the new project at the same paths: `src/assets/greenhouse.webp` and `src/assets/greenhouse-fog.webp`.

## Stack & dependencies

React 19, TypeScript, and Vite. The intro and the scroll story are `gsap` with `ScrollTrigger`. Smooth scrolling is `lenis`, only when the visitor has not asked for reduced motion. The pane is WebGL2, written in `GlassEngine` without `three`: one fullscreen triangle, a float mask, a drip normal map, and two photographs.

Fonts, imported in `src/main.tsx`:

- `@fontsource/instrument-serif` at 400 and 400 italic — the wordmark *Glasshouse*, the headline, the note, the finale title, and the word written into the fog
- `@fontsource-variable/inter` — the page’s default sans and the aside
- `@fontsource/ibm-plex-mono` at 500 — the header, the dock, the kicker, the button, the loader

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Background `#cdd5cb` (`--cd-bg`). Ink `#1d2117` (`--cd-ink`). Soft ink `rgba(29, 33, 23, 0.66)`. Rules `rgba(29, 33, 23, 0.16)`. Paper `#f3f2ea`. Lime `#d6f06b`. Steel `#1a2419`. The bar thickness is `clamp(7px, 0.8vw, 12px)`.

Type:

- `--cd-serif`: `'Instrument Serif', 'Times New Roman', serif`
- `--cd-sans`: `'Inter Variable', 'Inter', system-ui, sans-serif`
- `--cd-mono`: `'IBM Plex Mono', ui-monospace, monospace`

`html` and `body` have no margin. Document title: `Condensation — Oversight Supply`. Theme colour: `#cdd5cb`.

The track is `420vh`. The stage is sticky: `top: 0; height: 100vh; height: 100svh; overflow: hidden; overflow: clip`. The section’s accessible name is `Condensation — a fogged greenhouse window`. `data-state` on `<main>` is `loading`, `ready`, `nogl`, or `error`.

**Window.** `.cd-frame` is a steel inset frame. Two vertical muntins sit at 33.33% and 66.66%. One horizontal muntin sits at 31%. The blade (`.cd-blade`) is a horizontal squeegee whose `translate3d` y is written every scroll frame. It is `visibility: hidden` until the sweep has started and hides again when the sweep finishes.

**Header.** Three columns, `1fr auto 1fr`, mono 500, 10.5px, uppercase, letter-spacing `0.14em`, bottom rule.

- Left: `Oversight Supply`
- Centre: `The` then italic `Glasshouse`
- Right: `Glass clear` and a `<b>` that starts at `00%` and is rewritten from the engine as a zero-padded percent

**Headline.** Two masked lines:

```
Grown behind
glass.
```

`glass.` is an `<em>`.

**Aside.** One of these, from state:

- WebGL2 missing: `Your browser can’t draw the fogged glass (WebGL2 is off), so here is the clear view.` The apostrophe is `’`.
- Image failed: `The greenhouse photo didn’t load. Check your connection and reload.`
- Coarse pointer: `It’s 14 °C inside and 3 °C out. Drag a finger across the glass to look in.` The degree sign is `°`.
- Otherwise: `It’s 14 °C inside and 3 °C out. Move across the glass to wipe it; hold to wipe wider.`

**Dock.** `Fog it up` (disabled until the engine is ready) and `Clear the glass ↓`.

**Note**, opacity 0 until the scroll timeline: `Every morning, ` then italic `before the doors open.`

**Finale.** Kicker `Oversight Supply · the glasshouse`. Title:

```
Come in,
it’s warm.
```

`warm.` is an `<em>`. Body: `Everything on our benches was raised right here, under this glass, a few degrees warmer than wherever you are.` Button: `Fog it up again` and `↑`.

**Loader** (`role="status"`), only while `loading`: `Warming the glass…` The ellipsis is `…`.

If WebGL2 fails, `.cd-fallback` shows `greenhouse.webp`. If the image request fails, the fallback is empty and the aside says so.

## Interactions & animation timeline

`smooth` is a smoothstep. `CLEARED_AT` is `0.52`.

```
sweep = smooth(0.1, 0.48, p)
zoom  = 1 + 0.35 * smooth(0.55, 0.92, p)
```

The blade’s y is `-40 + (stageHeight + 80) * sweep`. While `sweep` is between 0 and 1 the blade is visible. The engine’s blade is that y, or `-1` before the sweep starts. Zoom is passed to the shader.

**Intro**, only when motion is allowed. Delay `0.15`, ease `expo.out`:

- `.cd-top > *` from `{ opacity: 0, y: -8 }`, duration `1`, stagger `0.08`
- At `0.2`: `.cd-head .li` from `{ yPercent: 110 }`, duration `1.6`, stagger `0.1`
- At `0.8`: `.cd-sub__in, .cd-dock__in` from `{ opacity: 0, y: 10 }`, duration `1.2`, stagger `0.1`

**Scroll.** Track `420vh`. `scrub: 0.6`. A local `target` tweens `p` from 0 to 1.

| From | To | What changes |
| --- | --- | --- |
| 0.00 | 1.00 | `apply(p)` writes the blade and the zoom. |
| 0.04 | 0.10 | Headline, aside, and dock fade and rise 20px. Duration `0.06`, stagger `0.015`. |
| 0.16 | 0.22 | The note fades in from `y: 14`. |
| 0.44 | 0.49 | The note fades out to `y: -14`. |
| 0.55 | 0.85 | `.cd-frame` scales to `2.6` and fades, ease `power2.in`. |
| 0.90 | 0.97 | The finale fades in and receives pointer events. |

**Reduced motion** parks the timeline at `0`, `0.52`, or `1` (`progress > 0.75` → 1, `> 0.25` → `0.52`). No Lenis. No intro. The word is written into the fog in `0.01` seconds instead of `2.4`.

**Pointer.** A mouse wipe uses radius `38`, or `58` while the button is down. Touch uses radius `40` and is not blocked by scrolling (`passive: true`). Leaving the stage with a mouse lifts the wipe. Buttons and links are ignored.

**Fog it up** calls `fogAll()`. **Clear the glass** scrolls to progress `0.52` over 2 seconds with Lenis. **Fog it up again** scrolls to 0 over 2.4 seconds, then fogs the mask and drips from the writing.

**Engine.** WebGL2. The mask refogs slowly. `come in` is rasterised once and wiped in over the writing tween (delay `0.5`, duration `2.4`, ease `power1.inOut`), then five drips start from the letter bottoms. Beads are procedural in the fragment shader. The sharp photo is `greenhouse.webp`; the milky plate is `greenhouse-fog.webp`. Cover-fit, framed a little below centre. Context loss sets state `nogl`. The ticker runs only while the track intersects and the document is visible.

## Responsive behaviour

**Desktop, wider than 700px.** Three muntins. The centre wordmark shows. Headline sits in the lower pane.

**700px and under.** One vertical muntin, centred. The second vertical bar is `display: none`. The horizontal bar moves to `top: 25%`. Header becomes two columns and hides `The Glasshouse`. Headline `top: calc(25% + 20px)`, `clamp(44px, 12.5vw, 64px)`. Aside and dock stretch across the bottom. Finale title `clamp(48px, 14vw, 72px)`.

There is no separate 900px rule.

## Accessibility & robustness

- **`prefers-reduced-motion`.** No intro, no Lenis, three parked scroll states, the writing tween is nearly instant.
- **WebGL2.** Missing context or a lost context shows the sharp photograph and the off-air aside. There is no `three` fallback path.
- **Images.** Both files are required for the live pane. A failed load sets `error` and the connection sentence. The canvas is `aria-hidden`.
- **Off-screen.** The GSAP ticker is removed when the track leaves the viewport or the document is hidden.
- **`overflow: clip`** is set on the stage after `overflow: hidden`.
- **StrictMode.** The scroll timeline targets a fresh `{ p: 0 }` inside `gsap.context`. Cleanup reverts that context. The engine is disposed on unmount, and a late image callback checks `alive`.

## Performance notes

- The fog mask is a small float buffer, not the device-pixel size of the stage.
- Drips are drawn into a small 2D canvas and sampled as a normal map.
- The shader does the beads, the mist grain, and the refraction. React does not re-render per wipe.
- `devicePixelRatio` is read in the engine as `uDpr`. Antialias is off.

## Full source code

Create these five files exactly. Do not reformat, rename, or restyle them. `index.html` replaces the Vite template’s `index.html`. The other four sit under `src/`. Also copy the two WebP files into `src/assets/` as named in **Assets**. The template files `App.tsx`, `App.css`, `index.css`, and `vite.svg` are unused; delete them. Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#cdd5cb" />
    <title>Condensation — Oversight Supply</title>
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
import './condensation.css'
import CondensationHero from './CondensationHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CondensationHero />
  </StrictMode>,
)
```

### `src/CondensationHero.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { GlassEngine } from './GlassEngine'

gsap.registerPlugin(ScrollTrigger)

const SHARP = new URL('./assets/greenhouse.webp', import.meta.url).href
const FOG = new URL('./assets/greenhouse-fog.webp', import.meta.url).href

const smooth = (a: number, b: number, v: number) => {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const sweepOf = (p: number) => smooth(0.1, 0.48, p)
const zoomOf = (p: number) => 1 + 0.35 * smooth(0.55, 0.92, p)
const CLEARED_AT = 0.52

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
    img.onerror = () => reject(new Error(`failed to load ${src}`))
    img.src = src
  })
}

export default function CondensationHero() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bladeRef = useRef<HTMLDivElement>(null)
  const clearRef = useRef<HTMLElement>(null)
  const engineRef = useRef<GlassEngine | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const progressRef = useRef(0)
  const writeRef = useRef(0)
  const reduced = usePrefersReducedMotion()

  const [state, setState] = useState<'loading' | 'ready' | 'nogl' | 'error'>('loading')
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)

  const apply = (p: number) => {
    progressRef.current = p
    const stage = stageRef.current
    const eng = engineRef.current
    const h = stage?.clientHeight ?? 800
    const s = sweepOf(p)
    const y = -40 + (h + 80) * s
    if (bladeRef.current) {
      bladeRef.current.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
      bladeRef.current.style.visibility = s > 0 && s < 1 ? 'visible' : 'hidden'
    }
    if (eng) {
      eng.setBlade(s > 0 ? y : -1)
      eng.setZoom(zoomOf(p))
    }
  }

  /* ------------------------------------------------ load + engine */
  useEffect(() => {
    let alive = true
    let cleanup = () => {}
    Promise.all([loadImage(SHARP), loadImage(FOG), document.fonts?.load('italic 100px "Instrument Serif"').catch(() => null)])
      .then(([sharp, fog]) => {
        const stage = stageRef.current
        const canvas = canvasRef.current
        if (!alive || !stage || !canvas) return
        const engine = new GlassEngine(canvas, sharp, fog)
        if (!engine.ok) {
          setState('nogl')
          return
        }
        engineRef.current = engine
        engine.reduced = reduced
        engine.onClear = (f) => {
          if (clearRef.current) clearRef.current.textContent = `${String(Math.round(f * 100)).padStart(2, '0')}%`
        }
        engine.resize(stage.clientWidth, stage.clientHeight)
        engine.setWriting(writeRef.current)
        apply(progressRef.current)
        setState('ready')

        let running = false
        let inView = true
        const tick = (_t: number, dtMs: number) => {
          engine.step(dtMs / 1000)
          if (!engine.ok) setState('nogl')
        }
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
        const ro = new ResizeObserver(() => {
          engine.resize(stage.clientWidth, stage.clientHeight)
          apply(progressRef.current)
        })
        ro.observe(stage)

        // trace the word into the fog, then let it run
        const w = { p: writeRef.current }
        const tw = gsap.to(w, {
          p: 1,
          duration: reduced ? 0.01 : 2.4,
          delay: reduced ? 0 : 0.5,
          ease: 'power1.inOut',
          onUpdate: () => {
            writeRef.current = w.p
            engine.setWriting(w.p)
          },
          onComplete: () => engine.dripFromWriting(5),
        })

        cleanup = () => {
          tw.kill()
          gsap.ticker.remove(tick)
          io.disconnect()
          ro.disconnect()
          document.removeEventListener('visibilitychange', sync)
          engine.dispose()
          engineRef.current = null
        }
      })
      .catch((err) => {
        console.warn('[condensation]', err)
        if (alive) setState('error')
      })
    return () => {
      alive = false
      cleanup()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (engineRef.current) engineRef.current.reduced = reduced
  }, [reduced, state])

  /* ------------------------------------------------ wiping */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let down = false
    const local = (x: number, y: number) => {
      const r = stage.getBoundingClientRect()
      return { x: x - r.left, y: y - r.top }
    }
    const onUi = (t: EventTarget | null) => t instanceof Element && !!t.closest('button, a')
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || onUi(e.target)) return
      const p = local(e.clientX, e.clientY)
      engineRef.current?.wipe(p.x, p.y, down ? 58 : 38)
    }
    const press = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') down = true
    }
    const release = () => {
      down = false
    }
    const leave = (e: PointerEvent) => e.pointerType !== 'touch' && engineRef.current?.lift()
    // touch uses touch events: they keep firing while the page scrolls, so a
    // finger both scrolls and wipes, the way it would on real glass
    const tStart = (e: TouchEvent) => {
      if (onUi(e.target)) return
      engineRef.current?.lift()
      tMove(e)
    }
    const tMove = (e: TouchEvent) => {
      if (onUi(e.target)) return
      const t = e.touches[0]
      if (!t) return
      const p = local(t.clientX, t.clientY)
      engineRef.current?.wipe(p.x, p.y, 40)
    }
    const tEnd = () => engineRef.current?.lift()
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    stage.addEventListener('pointerleave', leave)
    stage.addEventListener('touchstart', tStart, { passive: true })
    stage.addEventListener('touchmove', tMove, { passive: true })
    stage.addEventListener('touchend', tEnd, { passive: true })
    return () => {
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      stage.removeEventListener('pointerleave', leave)
      stage.removeEventListener('touchstart', tStart)
      stage.removeEventListener('touchmove', tMove)
      stage.removeEventListener('touchend', tEnd)
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
          .from('.cd-top > *', { opacity: 0, y: -8, duration: 1, stagger: 0.08 })
          .from('.cd-head .li', { yPercent: 110, duration: 1.6, stagger: 0.1 }, 0.2)
          .from('.cd-sub__in, .cd-dock__in', { opacity: 0, y: 10, duration: 1.2, stagger: 0.1 }, 0.8)
      }

      const target = { p: 0 } // fresh per run: a StrictMode revert can't zero a shared object
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      tl.to(target, { p: 1, duration: 1, onUpdate: () => apply(target.p) }, 0)
        .to('.cd-head, .cd-sub, .cd-dock', { opacity: 0, y: -20, duration: 0.06, stagger: 0.015 }, 0.04)
        .fromTo('.cd-note', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.06 }, 0.16)
        .to('.cd-note', { opacity: 0, y: -14, duration: 0.05 }, 0.44)
        .to('.cd-frame', { scale: 2.6, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.55)
        .fromTo('.cd-final', { opacity: 0, y: 30, pointerEvents: 'none' }, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.9)

      stRef.current = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        animation: reduced ? undefined : tl,
        scrub: reduced ? false : 0.6,
        onUpdate(self) {
          if (!reduced) return
          // discrete states only: fogged → clear → inside
          const p = self.progress > 0.75 ? 1 : self.progress > 0.25 ? CLEARED_AT : 0
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
  const fogAgain = () =>
    scrollToProgress(0, () => {
      engineRef.current?.fogAll()
      engineRef.current?.dripFromWriting(4)
    })

  const glass = state === 'ready'

  return (
    <main className="cd-root" data-state={state}>
      <section ref={trackRef} className="cd-track" aria-label="Condensation — a fogged greenhouse window">
        <div ref={stageRef} className={`cd-stage${glass ? ' is-live' : ''}`}>
          <canvas ref={canvasRef} className="cd-gl" aria-hidden="true" />
          {(state === 'nogl' || state === 'error') && (
            <div className="cd-fallback" aria-hidden="true">
              {state === 'nogl' && <img src={SHARP} alt="" />}
            </div>
          )}

          <div className="cd-frame" aria-hidden="true">
            <i className="cd-bar cd-bar--v1" />
            <i className="cd-bar cd-bar--v2" />
            <i className="cd-bar cd-bar--h" />
          </div>

          <div ref={bladeRef} className="cd-blade" aria-hidden="true">
            <i className="cd-blade__handle" />
            <i className="cd-blade__bar" />
          </div>

          <header className="cd-top">
            <span>Oversight Supply</span>
            <span className="cd-top__c">The <em>Glasshouse</em></span>
            <span className="cd-top__r">
              Glass clear <b ref={clearRef}>00%</b>
            </span>
          </header>

          <h1 className="cd-head">
            <span className="ln"><span className="li">Grown behind</span></span>
            <span className="ln"><span className="li"><em>glass.</em></span></span>
          </h1>

          <div className="cd-sub">
            <p className="cd-sub__in">
              {state === 'nogl'
                ? 'Your browser can’t draw the fogged glass (WebGL2 is off), so here is the clear view.'
                : state === 'error'
                  ? 'The greenhouse photo didn’t load. Check your connection and reload.'
                  : isTouch
                    ? 'It’s 14 °C inside and 3 °C out. Drag a finger across the glass to look in.'
                    : 'It’s 14 °C inside and 3 °C out. Move across the glass to wipe it; hold to wipe wider.'}
            </p>
          </div>

          <div className="cd-dock">
            <div className="cd-dock__in">
              <button type="button" onClick={() => engineRef.current?.fogAll()} disabled={!glass}>Fog it up</button>
              <button type="button" onClick={() => scrollToProgress(CLEARED_AT)}>Clear the glass ↓</button>
            </div>
          </div>

          <p className="cd-note" aria-hidden="true">
            Every morning, <em>before the doors open.</em>
          </p>

          <div className="cd-final">
            <p className="cd-final__kicker">Oversight Supply · the glasshouse</p>
            <h2 className="cd-final__title">
              Come in, <br />
              it’s <em>warm.</em>
            </h2>
            <p className="cd-final__body">Everything on our benches was raised right here, under this glass, a few degrees warmer than wherever you are.</p>
            <button type="button" className="cd-final__btn" onClick={fogAgain}>
              Fog it up again <span aria-hidden="true">↑</span>
            </button>
          </div>

          {state === 'loading' && (
            <div className="cd-loader" role="status">
              Warming the glass…
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
```

### `src/GlassEngine.ts`

```ts
// Condensation — a fogged greenhouse pane you can wipe.
//
// The fog is a low-res Float32 mask (1 = wiped clear) that slowly fogs back
// over. Drips are simulated here and drawn into a small 2D canvas as a
// normal map (RG = normal, A = coverage); the shader refracts the sharp
// photo through them. Beads of condensation are procedural (screen space).

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;
uniform sampler2D uSharp;
uniform sampler2D uFog;
uniform sampler2D uMask;
uniform sampler2D uDrops;
uniform vec2 uRes;     // device px
uniform vec2 uImg;     // photo size
uniform float uZoom;
uniform float uDpr;
uniform float uTime;
uniform float uBlade;  // squeegee edge, 0 top → 1 bottom (-1 = none)
out vec4 o;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p) { return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}

vec2 cover(vec2 f) {
  float ra = uRes.x / uRes.y, ia = uImg.x / uImg.y;
  vec2 s = ra > ia ? vec2(1.0, ia / ra) : vec2(ra / ia, 1.0);
  vec2 uv = (f - 0.5) * s / uZoom + 0.5;
  uv.y += (0.56 - 0.5) * (1.0 - s.y);           // frame a little below centre
  return uv;
}

void main() {
  vec2 f = vec2(gl_FragCoord.x / uRes.x, 1.0 - gl_FragCoord.y / uRes.y); // y down
  vec2 uv = cover(f);
  vec3 sharpC = texture(uSharp, uv).rgb;

  float clear = texture(uMask, f).r;
  if (uBlade >= 0.0) clear = max(clear, smoothstep(uBlade + 0.006, uBlade - 0.006, f.y));
  vec2 px = gl_FragCoord.xy / uDpr;              // css px, y up
  float dens = 0.82 + 0.18 * vnoise(px * 0.012 + vec2(0.0, uTime * 0.02)) ;
  float fog = (1.0 - smoothstep(0.0, 1.0, clear)) * dens;

  vec3 fogC = texture(uFog, uv).rgb;
  vec3 fogRaw = fogC;
  fogC = mix(fogC, vec3(0.9, 0.92, 0.9), 0.55);
  fogC *= 0.97 + 0.05 * vnoise(px * 0.35);        // fine mist grain

  // condensation beads (they live in the fog; wiping takes them too)
  float cs = 8.0;
  vec2 g = px / cs, gi = floor(g), gf = fract(g);
  float bead = 0.0;
  vec2 bn = vec2(0.0);
  for (int j = -1; j <= 1; j++)
  for (int i = -1; i <= 1; i++) {
    vec2 oo = vec2(float(i), float(j));
    vec2 c = oo + hash22(gi + oo);
    if (hash(gi + oo + 9.1) < 0.4) continue;
    float rr = 0.1 + 0.3 * pow(hash(gi + oo + 3.7), 2.5);
    vec2 d = gf - c;
    float dl = length(d) / rr;
    if (dl < 1.0 && 1.0 - dl > bead) { bead = smoothstep(1.0, 0.75, dl); bn = d / rr; }
  }
  float beadA = bead * smoothstep(0.25, 0.9, fog);
  // a bead is a tiny clear lens: it shows the room (softly), bright on top, a thin dark lower rim
  vec3 beadC = mix(texture(uSharp, uv - vec2(bn.x, -bn.y) * 0.008 / uZoom).rgb, fogRaw, 0.45) * 1.08;
  float bl = length(bn);
  beadC *= 1.0 - 0.28 * smoothstep(0.7, 1.0, bl) * smoothstep(-0.3, 0.6, dot(bn, vec2(0.3, -0.9)));
  beadC += 0.5 * smoothstep(0.35, 0.75, dot(bn, vec2(-0.5, 0.7))) * smoothstep(1.0, 0.7, bl);

  vec3 col = mix(sharpC, fogC, fog);
  col = mix(col, mix(beadC, fogC, 0.3), beadA * 0.6);

  // drips
  vec4 dt = texture(uDrops, f);
  if (dt.a > 0.01) {
    vec2 n = (dt.rg - 0.5) * 2.0;                  // canvas space: y down
    float nl = min(1.0, length(n));
    vec3 dc = texture(uSharp, uv - n * 0.03 / uZoom).rgb;  // a drop is a little lens: flipped, magnified
    dc *= 0.82 + 0.3 * (1.0 - nl);
    dc += 0.7 * smoothstep(0.55, 0.95, dot(n, vec2(-0.55, -0.75)));
    dc *= 1.0 - 0.5 * smoothstep(0.7, 1.0, nl) * smoothstep(-0.2, 0.8, dot(n, vec2(0.4, 0.9)));
    col = mix(col, dc, smoothstep(0.05, 0.5, dt.a));
  }

  // glass: faint tint + corner falloff
  vec2 q = f - 0.5;
  col *= 1.0 - 0.18 * dot(q, q) * 2.0;
  o = vec4(col, 1.0);
}`

type Drop = { x: number; y: number; r: number; v: number; wait: number; stick: number; seed: number; trail: number }
type Bead = { x: number; y: number; r: number; life: number; max: number }

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

export class GlassEngine {
  ok = false
  reduced = false
  onClear?: (fraction: number) => void

  private gl: WebGL2RenderingContext | null = null
  private u: Record<string, WebGLUniformLocation | null> = {}
  private tex: Record<string, WebGLTexture | null> = {}
  private imgSize = [1, 1]
  private w = 1
  private h = 1
  private sc = 1

  // fog mask grid
  private cell = 5
  private gw = 1
  private gh = 1
  private mask = new Float32Array(1)
  private writing = new Float32Array(1)
  private bytes = new Uint8Array(1)
  private writeBox = { x0: 0, x1: 1 }
  private writeP = 0
  private blade = -1
  private zoom = 1

  // drips
  private drops: Drop[] = []
  private beads: Bead[] = []
  private dc = document.createElement('canvas')
  private dctx = this.dc.getContext('2d')!
  private sprite = document.createElement('canvas')
  private nextAmbient = 1.5
  private wipeAcc = 0
  private time = 0
  private clearT = 0
  private last: { x: number; y: number } | null = null
  private text = 'come in'

  constructor(private canvas: HTMLCanvasElement, sharp: HTMLImageElement, fog: HTMLImageElement) {
    this.makeSprite()
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, premultipliedAlpha: false })
    if (!gl) return
    try {
      const sh = (type: number, src: string) => {
        const s = gl.createShader(type)!
        gl.shaderSource(s, src)
        gl.compileShader(s)
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader')
        return s
      }
      const prog = gl.createProgram()!
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'link')
      gl.useProgram(prog)
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, 'aPos')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      for (const n of ['uSharp', 'uFog', 'uMask', 'uDrops', 'uRes', 'uImg', 'uZoom', 'uDpr', 'uTime', 'uBlade'])
        this.u[n] = gl.getUniformLocation(prog, n)
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
      this.tex.sharp = this.texFrom(gl, 0, sharp, true)
      this.tex.fog = this.texFrom(gl, 1, fog, false)
      this.tex.mask = this.newTex(gl, 2)
      this.tex.drops = this.newTex(gl, 3)
      gl.uniform1i(this.u.uSharp, 0)
      gl.uniform1i(this.u.uFog, 1)
      gl.uniform1i(this.u.uMask, 2)
      gl.uniform1i(this.u.uDrops, 3)
      this.imgSize = [sharp.naturalWidth, sharp.naturalHeight]
      this.gl = gl
      this.ok = true
    } catch (err) {
      console.warn('[condensation] WebGL2 setup failed', err)
    }
    canvas.addEventListener('webglcontextlost', this.onLost)
  }

  private onLost = (e: Event) => {
    e.preventDefault()
    this.ok = false
  }

  private texFrom(gl: WebGL2RenderingContext, unit: number, img: HTMLImageElement, mips: boolean) {
    const t = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, t)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
    if (mips) gl.generateMipmap(gl.TEXTURE_2D)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mips ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return t
  }

  private newTex(gl: WebGL2RenderingContext, unit: number) {
    const t = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, t)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return t
  }

  /** a drop as a normal map: RG = normal (0.5 ± 0.5), A = coverage */
  private makeSprite() {
    const S = 64
    this.sprite.width = this.sprite.height = S
    const ctx = this.sprite.getContext('2d')!
    const d = ctx.createImageData(S, S)
    for (let y = 0; y < S; y++)
      for (let x = 0; x < S; x++) {
        const dx = ((x + 0.5) / S) * 2 - 1
        const dy = ((y + 0.5) / S) * 2 - 1
        const l = Math.hypot(dx, dy)
        const i = (y * S + x) * 4
        if (l > 1) continue
        d.data[i] = 128 + 127 * dx
        d.data[i + 1] = 128 + 127 * dy
        d.data[i + 2] = 0
        d.data[i + 3] = 255 * clamp((1 - l) / 0.12, 0, 1)
      }
    ctx.putImageData(d, 0, 0)
  }

  get mobile() {
    return this.w < 700
  }

  resize(w: number, h: number) {
    this.w = Math.max(1, w)
    this.h = Math.max(1, h)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    this.sc = dpr
    this.canvas.width = Math.round(this.w * dpr)
    this.canvas.height = Math.round(this.h * dpr)
    this.dc.width = Math.ceil(this.w / 2)
    this.dc.height = Math.ceil(this.h / 2)
    this.cell = clamp(this.w / 260, 3, 6)
    this.gw = Math.ceil(this.w / this.cell)
    this.gh = Math.ceil(this.h / this.cell)
    this.mask = new Float32Array(this.gw * this.gh)
    this.bytes = new Uint8Array(this.gw * this.gh)
    this.drops = []
    this.beads = []
    this.rasterWriting()
  }

  /** "come in", written into the fog with a fingertip */
  private rasterWriting() {
    const c = document.createElement('canvas')
    c.width = this.gw
    c.height = this.gh
    const ctx = c.getContext('2d')!
    const fontPx = (this.mobile ? Math.min(this.w * 0.25, 120) : Math.min(this.w * 0.13, this.h * 0.26, 230)) / this.cell
    ctx.font = `italic 400 ${fontPx}px "Instrument Serif", serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = Math.max(1.2, fontPx * (this.mobile ? 0.045 : 0.07))
    ctx.strokeStyle = ctx.fillStyle = '#fff'
    const cx = this.gw * (this.mobile ? 0.5 : 0.5)
    const cy = this.gh * (this.mobile ? 0.47 : 0.5)
    ctx.fillText(this.text, cx, cy)
    ctx.strokeText(this.text, cx, cy)
    const tw = ctx.measureText(this.text).width
    this.writeBox = { x0: cx - tw / 2 - 2, x1: cx + tw / 2 + 2 }
    const img = ctx.getImageData(0, 0, this.gw, this.gh).data
    this.writing = new Float32Array(this.gw * this.gh)
    for (let i = 0; i < this.writing.length; i++) this.writing[i] = img[i * 4 + 3] / 255
  }

  /** 0 → 1: the word is traced left to right */
  setWriting(p: number) {
    this.writeP = clamp(p, 0, 1)
  }

  /** a few letters of the word start to run */
  dripFromWriting(n = 4) {
    if (this.reduced) return
    const cands: number[] = []
    for (let j = 1; j < this.gh - 1; j++)
      for (let i = 0; i < this.gw; i++) {
        const k = j * this.gw + i
        if (this.writing[k] > 0.6 && this.writing[k + this.gw] < 0.1) cands.push(k)
      }
    for (let s = 0; s < n && cands.length; s++) {
      const k = cands.splice(Math.floor(Math.random() * cands.length), 1)[0]
      const i = k % this.gw
      const j = (k - i) / this.gw
      this.spawn((i + 0.5) * this.cell, (j + 1) * this.cell, 2.4 + Math.random() * 1.6, s * 0.7 + Math.random() * 0.8)
    }
  }

  /** squeegee edge in css px from the top (negative = not on the glass) */
  setBlade(y: number) {
    this.blade = y
  }

  setZoom(z: number) {
    this.zoom = z
  }

  /** fog everything back up */
  fogAll() {
    this.mask.fill(0)
    this.drops = []
    this.beads = []
  }

  private stamp(x: number, y: number, r: number, v = 1.35) {
    const gx = x / this.cell
    const gy = y / this.cell
    const R = r / this.cell
    const x0 = Math.max(0, Math.floor(gx - R)), x1 = Math.min(this.gw - 1, Math.ceil(gx + R))
    const y0 = Math.max(0, Math.floor(gy - R)), y1 = Math.min(this.gh - 1, Math.ceil(gy + R))
    for (let j = y0; j <= y1; j++)
      for (let i = x0; i <= x1; i++) {
        const d = Math.hypot(i + 0.5 - gx, j + 0.5 - gy) / R
        if (d >= 1) continue
        const f = d < 0.5 ? 1 : 1 - (d - 0.5) / 0.5
        const k = j * this.gw + i
        const val = f * f * (3 - 2 * f) * v
        if (val > this.mask[k]) this.mask[k] = val
      }
  }

  /** wipe along the pointer path (css px, stage space) */
  wipe(x: number, y: number, radius: number) {
    const l = this.last
    this.last = { x, y }
    if (!l) {
      this.stamp(x, y, radius)
      return
    }
    const dist = Math.hypot(x - l.x, y - l.y)
    if (dist > 220) {
      this.stamp(x, y, radius) // pointer re-entered somewhere else: don't draw a line across
      return
    }
    const n = Math.max(1, Math.ceil(dist / (radius * 0.25)))
    for (let s = 1; s <= n; s++) this.stamp(l.x + ((x - l.x) * s) / n, l.y + ((y - l.y) * s) / n, radius)
    // pushed water gathers and runs
    this.wipeAcc += dist
    if (this.wipeAcc > 130 && !this.reduced && this.blade < 0) {
      this.wipeAcc = 0
      this.spawn(x + (Math.random() - 0.5) * radius, y + radius * 0.75, 3.5 + Math.random() * 3, 0.1 + Math.random() * 0.6)
    }
  }

  lift() {
    this.last = null
  }

  private spawn(x: number, y: number, r: number, wait: number) {
    if (this.drops.length > 70) return
    this.drops.push({ x, y, r, v: 0, wait, stick: 0, seed: Math.random() * 100, trail: 0 })
  }

  private clearAt(x: number, y: number) {
    const i = clamp(Math.floor(x / this.cell), 0, this.gw - 1)
    const j = clamp(Math.floor(y / this.cell), 0, this.gh - 1)
    return Math.max(this.mask[j * this.gw + i], this.writing[j * this.gw + i] * this.writeP)
  }

  step(dt: number) {
    dt = Math.min(dt, 0.05)
    this.time += dt
    const bladeOn = this.blade >= 0

    // ---- fog creeps back (values above 1 are a short "still wet" hold)
    const decay = dt * (this.reduced ? 0.08 : 0.13)
    const m = this.mask
    for (let i = 0; i < m.length; i++) if (m[i] > 0) m[i] = Math.max(0, m[i] - decay)

    // ---- ambient drips + the word's letters dripping
    if (!this.reduced && !bladeOn && this.time > this.nextAmbient) {
      this.nextAmbient = this.time + 0.9 + Math.random() * 1.6
      const x = Math.random() * this.w
      const y = Math.random() * this.h * 0.7
      if (this.clearAt(x, y) < 0.2) this.spawn(x, y, 2.5 + Math.random() * 2.5, 0.3 + Math.random() * 2.5)
    }

    // ---- drips
    const live: Drop[] = []
    for (const d of this.drops) {
      if (bladeOn && d.y < this.blade + 6) continue // the squeegee takes it
      if (d.wait > 0) {
        d.wait -= dt
        live.push(d)
        continue
      }
      if (d.stick > 0) {
        d.stick -= dt
        d.v *= Math.exp(-dt * 20)
      } else {
        const vmax = 35 + d.r * 32
        d.v = Math.min(vmax, d.v + 700 * dt)
        if (Math.random() < dt * 1.1) d.stick = 0.06 + Math.random() * 0.45
      }
      const py = d.y
      const px = d.x
      d.y += d.v * dt
      d.x += Math.sin(d.y * 0.045 + d.seed) * d.v * dt * 0.12
      // clear trail behind it, and leave little beads
      const n = Math.max(1, Math.ceil((d.y - py) / 3))
      for (let s = 1; s <= n; s++) this.stamp(px + ((d.x - px) * s) / n, py + ((d.y - py) * s) / n, d.r * 1.25, 1.25)
      d.trail += d.y - py
      if (d.trail > 12 + Math.random() * 10) {
        d.trail = 0
        if (this.beads.length < 260) {
          const br = d.r * (0.28 + Math.random() * 0.2)
          this.beads.push({ x: d.x + (Math.random() - 0.5) * d.r * 0.6, y: d.y - d.r * 1.6, r: br, life: 3 + Math.random() * 3, max: 0 })
          this.beads[this.beads.length - 1].max = this.beads[this.beads.length - 1].life
        }
        d.r *= 0.985 // loses a little water to every bead
      }
      if (d.y < this.h + 30 && d.r > 1.2) live.push(d)
    }
    this.drops = live
    this.beads = this.beads.filter((b) => {
      b.life -= dt
      return b.life > 0 && !(bladeOn && b.y < this.blade + 4)
    })

    this.draw()

    this.clearT -= dt
    if (this.clearT <= 0 && this.onClear) {
      this.clearT = 0.25
      let s = 0
      const bladeRow = bladeOn ? this.blade / this.cell : -1
      for (let j = 0; j < this.gh; j++) {
        if (j < bladeRow) {
          s += this.gw
          continue
        }
        for (let i = 0; i < this.gw; i++) s += Math.min(1, Math.max(m[j * this.gw + i], this.writing[j * this.gw + i] * this.writeP))
      }
      this.onClear(s / (this.gw * this.gh))
    }
  }

  /** the word, drawn in from left to right */
  private writingAt(i: number, k: number) {
    const w = this.writing[k]
    if (w <= 0) return 0
    const span = this.writeBox.x1 - this.writeBox.x0
    const head = this.writeBox.x0 + span * this.writeP
    return w * clamp((head - i) / 6, 0, 1)
  }

  private draw() {
    const gl = this.gl
    if (!gl || !this.ok) return

    // mask → bytes
    const b = this.bytes
    const m = this.mask
    for (let j = 0, k = 0; j < this.gh; j++)
      for (let i = 0; i < this.gw; i++, k++) {
        let v = m[k]
        if (this.writeP > 0) v = Math.max(v, this.writingAt(i, k))
        b[k] = v >= 1 ? 255 : (v * 255) | 0
      }
    gl.activeTexture(gl.TEXTURE2)
    gl.bindTexture(gl.TEXTURE_2D, this.tex.mask)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, this.gw, this.gh, 0, gl.RED, gl.UNSIGNED_BYTE, b)

    // drips → normal-map canvas (half res)
    const ctx = this.dctx
    ctx.clearRect(0, 0, this.dc.width, this.dc.height)
    for (const bd of this.beads) {
      const r = bd.r * Math.min(1, (bd.life / bd.max) * 2) * 0.5
      if (r > 0.3) ctx.drawImage(this.sprite, bd.x / 2 - r, bd.y / 2 - r, r * 2, r * 2)
    }
    for (const d of this.drops) {
      const r = d.r / 2
      const stretch = 1 + Math.min(0.5, d.v / 260)
      ctx.drawImage(this.sprite, d.x / 2 - r * 0.62, d.y / 2 - r * 2.1 * stretch, r * 1.24, r * 1.5 * stretch) // tail
      ctx.drawImage(this.sprite, d.x / 2 - r, d.y / 2 - r * stretch, r * 2, r * 2 * stretch)
    }
    gl.activeTexture(gl.TEXTURE3)
    gl.bindTexture(gl.TEXTURE_2D, this.tex.drops)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.dc)

    const u = this.u
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height)
    gl.uniform2f(u.uImg, this.imgSize[0], this.imgSize[1])
    gl.uniform1f(u.uZoom, this.zoom)
    gl.uniform1f(u.uDpr, this.sc)
    gl.uniform1f(u.uTime, this.time)
    gl.uniform1f(u.uBlade, this.blade >= 0 ? this.blade / this.h : -1)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  dispose() {
    this.canvas.removeEventListener('webglcontextlost', this.onLost)
    this.gl = null
    this.ok = false
  }
}
```

### `src/condensation.css`

```css
/* Condensation — a fogged glasshouse pane */
:root {
  --cd-bg: #cdd5cb;
  --cd-ink: #1d2117;
  --cd-soft: rgba(29, 33, 23, 0.66);
  --cd-rule: rgba(29, 33, 23, 0.16);
  --cd-paper: #f3f2ea;
  --cd-lime: #d6f06b;
  --cd-steel: #1a2419;
  --cd-serif: 'Instrument Serif', 'Times New Roman', serif;
  --cd-sans: 'Inter Variable', 'Inter', system-ui, sans-serif;
  --cd-mono: 'IBM Plex Mono', ui-monospace, monospace;
  --cd-bar: clamp(7px, 0.8vw, 12px);
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: var(--cd-bg); color: var(--cd-ink); }
body { font-family: var(--cd-sans); -webkit-font-smoothing: antialiased; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

.cd-track { position: relative; height: 420vh; }
.cd-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  overflow: clip;
  background: var(--cd-bg);
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
}
.cd-stage.is-live { cursor: crosshair; }

.cd-gl { position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 0; }
.cd-fallback { position: absolute; inset: 0; z-index: 0; background: var(--cd-bg); }
.cd-fallback img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 56%; display: block; }

/* the greenhouse glazing bars */
.cd-frame {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  transform-origin: 50% 56%;
  box-shadow: inset 0 0 0 var(--cd-bar) var(--cd-steel), inset 0 0 0 calc(var(--cd-bar) + 1px) rgba(255, 255, 255, 0.18), inset 0 0 60px rgba(20, 30, 18, 0.25);
  will-change: transform, opacity;
}
.cd-bar { position: absolute; background: linear-gradient(90deg, #111810, #2c3a29 45%, #121a11); box-shadow: 0 0 18px rgba(20, 30, 18, 0.35); }
.cd-bar--v1, .cd-bar--v2 { top: 0; bottom: 0; width: var(--cd-bar); }
.cd-bar--v1 { left: calc(33.33% - var(--cd-bar) / 2); }
.cd-bar--v2 { left: calc(66.66% - var(--cd-bar) / 2); }
.cd-bar--h { left: 0; right: 0; top: 31%; height: var(--cd-bar); background: linear-gradient(180deg, #2c3a29, #111810); }

/* the squeegee (its bottom edge is the line the glass is cleared to) */
.cd-blade { position: absolute; left: 0; right: 0; top: 0; height: 0; z-index: 3; pointer-events: none; visibility: hidden; will-change: transform; }
.cd-blade__bar {
  position: absolute;
  left: -2%;
  right: -2%;
  bottom: 0;
  height: 16px;
  background: linear-gradient(180deg, #9aa39a 0 5px, #3b433a 5px 7px, #121611 7px);
  border-radius: 2px 2px 3px 3px;
  box-shadow: 0 6px 14px rgba(10, 16, 10, 0.35), 0 1px 0 rgba(255, 255, 255, 0.5) inset;
}
.cd-blade__bar::after { content: ''; position: absolute; left: 0; right: 0; bottom: -3px; height: 3px; background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), transparent); }
.cd-blade__handle {
  position: absolute;
  left: calc(50% - 11px);
  bottom: 14px;
  width: 22px;
  height: clamp(90px, 16vh, 150px);
  border-radius: 11px 11px 3px 3px;
  background: linear-gradient(90deg, #1c231b, #46523f 45%, #1a2019);
  box-shadow: 0 8px 20px rgba(10, 16, 10, 0.35);
}

/* --------------------------------------------------------------- overlay */
.cd-top, .cd-head, .cd-sub, .cd-dock, .cd-note, .cd-final, .cd-loader { position: absolute; z-index: 4; }

.cd-top {
  top: calc(var(--cd-bar) + 2px);
  left: clamp(20px, 2.8vw, 40px);
  right: clamp(20px, 2.8vw, 40px);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: clamp(12px, 1.6vw, 20px) 0 12px;
  border-bottom: 1px solid var(--cd-rule);
  font: 500 10.5px/1 var(--cd-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  pointer-events: none;
}
.cd-top__c em { font-family: var(--cd-serif); font-size: 15px; letter-spacing: 0.02em; text-transform: none; }
.cd-top__r { justify-self: end; color: var(--cd-soft); }
.cd-top__r b { font-weight: 500; color: var(--cd-ink); background: var(--cd-lime); padding: 2px 4px; font-variant-numeric: tabular-nums; }

.cd-head {
  left: clamp(22px, 3.2vw, 48px);
  bottom: clamp(86px, 9vw, 130px);
  margin: 0;
  font-family: var(--cd-serif);
  font-weight: 400;
  font-size: clamp(56px, 8vw, 146px);
  line-height: 0.86;
  letter-spacing: -0.035em;
  pointer-events: none;
}
.cd-head .ln { display: block; overflow: hidden; padding-bottom: 0.07em; }
.cd-head .li { display: inline-block; }
.cd-head em { font-style: italic; }

.cd-sub { left: clamp(22px, 3.2vw, 48px); bottom: clamp(28px, 3.2vw, 44px); width: min(380px, 36vw); pointer-events: none; }
.cd-sub__in { margin: 0; padding: 10px 14px; border-radius: 12px; background: rgba(243, 242, 234, 0.62); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); font-size: 13px; line-height: 1.5; color: var(--cd-soft); }

.cd-dock { right: clamp(20px, 2.8vw, 40px); bottom: clamp(24px, 3.2vw, 44px); }
.cd-dock__in {
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--cd-rule);
  border-radius: 999px;
  background: rgba(243, 242, 234, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.cd-dock button, .cd-final__btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--cd-ink);
  font: 500 10.5px/1 var(--cd-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 11px 14px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.25s ease, color 0.25s ease;
}
.cd-dock button:hover:not(:disabled) { background: var(--cd-lime); }
.cd-dock button:disabled { opacity: 0.4; cursor: default; }
.cd-dock button:focus-visible, .cd-final__btn:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }

.cd-note {
  left: 0;
  right: 0;
  width: fit-content;
  margin: 0 auto;
  bottom: clamp(40px, 7vh, 80px);
  padding: 12px 22px;
  border-radius: 999px;
  background: rgba(243, 242, 234, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font: 400 clamp(22px, 2.4vw, 34px)/1 var(--cd-serif);
  letter-spacing: -0.01em;
  opacity: 0;
  pointer-events: none;
}
.cd-note em { font-style: italic; }

.cd-final {
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(24px, 4vw, 64px);
  color: var(--cd-paper);
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(12, 18, 10, 0.72), transparent 60%);
}
.cd-final__kicker { margin: 0 0 14px; font: 500 10.5px/1.4 var(--cd-mono); letter-spacing: 0.16em; text-transform: uppercase; }
.cd-final__kicker::before { content: ''; display: inline-block; width: 8px; height: 8px; margin-right: 10px; background: var(--cd-lime); vertical-align: 0; }
.cd-final__title { margin: 0; font: 400 clamp(56px, 10vw, 180px)/0.84 var(--cd-serif); letter-spacing: -0.04em; }
.cd-final__title em { font-style: italic; }
.cd-final__body { max-width: 440px; margin: 18px 0 22px; font-size: 14px; line-height: 1.5; color: rgba(243, 242, 234, 0.78); }
.cd-final__btn { align-self: flex-start; color: var(--cd-paper); border: 1px solid rgba(243, 242, 234, 0.5); padding: 13px 18px; }
.cd-final__btn:hover { background: var(--cd-lime); border-color: var(--cd-lime); color: var(--cd-ink); }

.cd-loader {
  inset: 0;
  display: grid;
  place-items: center;
  font: 500 10.5px/1 var(--cd-mono);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cd-soft);
}

/* ----------------------------------------------------------- responsive */
@media (max-width: 700px) {
  .cd-bar--v1 { left: calc(50% - var(--cd-bar) / 2); }
  .cd-bar--v2 { display: none; }
  .cd-bar--h { top: 25%; }
  .cd-top { grid-template-columns: 1fr auto; }
  .cd-top__c { display: none; }
  .cd-head { top: calc(25% + 20px); bottom: auto; font-size: clamp(44px, 12.5vw, 64px); }
  .cd-sub { left: 22px; right: 22px; width: auto; bottom: 84px; }
  .cd-dock { left: 16px; right: 16px; bottom: 22px; display: flex; justify-content: center; }
  .cd-final__title { font-size: clamp(48px, 14vw, 72px); }
}
```

## Assets

Copy these two files from this section into the new project. They are ordinary photographs of a greenhouse, one sharp and one fogged. The page does not fetch them from a URL. `src/CondensationHero.tsx` loads them with `new URL('./assets/…', import.meta.url)`.

- `src/assets/greenhouse.webp` — the clear view, also the fallback `<img>` when WebGL2 is missing
- `src/assets/greenhouse-fog.webp` — the milky plate mixed in wherever the mask is still fogged

## Build / run

```
npm create vite@latest condensation -- --template react-ts
cd condensation
npm install react@^19.1.0 react-dom@^19.1.0 gsap@^3.13.0 lenis@^1.3.4 @fontsource/instrument-serif@^5.1.0 @fontsource-variable/inter@^5.1.0 @fontsource/ibm-plex-mono@^5.1.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files and the two WebP files, then:

```
npm run dev
```

`src/main.tsx` mounts `<CondensationHero />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- The live pane needs WebGL2. Without it, the page shows the sharp photograph and the aside that says so.
- If either WebP is missing, state becomes `error` and the greenhouse sentence is replaced.
- No APIs, keys, or accounts are needed.


## Image assets
IMPORTANT: Do NOT hotlink these URLs in the final site. Download every image below into
the project's own assets folder (e.g. /public/images/<section-name>/) and reference the
local copies. These links are only for fetching the files and may stop working.

- greenhouse-fog.webp: fogged greenhouse photo on the glass. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/condensation/greenhouse-fog.webp
- greenhouse.webp: sharp greenhouse photo behind the glass. https://nemqzqjyhpanframrepw.supabase.co/storage/v1/object/public/prompt-assets/condensation/greenhouse.webp
