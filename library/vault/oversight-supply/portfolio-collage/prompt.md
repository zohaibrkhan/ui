<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Collage — Portfolio hero

Collage is an immersive, editorial portfolio hero for a photographer, on warm cream paper with a widely tracked wordmark. Sixteen photographs lie like prints on an endless table: drag anywhere, on the paper or on a print, and throw it with momentum; prints wrap around out of sight so the table never ends, and when nobody touches it, it drifts slowly on its own. Bigger prints sit nearer and move faster, they lean with the speed of the table and sink a little while you hold it, and they shift with the pointer. Every print is tied to its category label at the edge of the frame (Interiors, Architecture, Travel, Still life, Portrait) by a hairline that is redrawn every frame, so the whole collage stays connected while it moves; hovering a label, or a print, brings its lines and prints forward and fades the rest. A Linear / Random switch morphs every print, one after another, into an endless filmstrip with the labels lined up above it, still connected. Click any photograph and it flies into a lightbox with a full-size version, caption, camera and film, arrows, keyboard and swipe. Document title: `Collage — Portfolio Hero — Oversight Supply`.

Rebuild it as a full-screen hero section. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Do not reformat, rename, or restyle them. Every visible string, number, colour, and timing in those files is the copy. Do not paraphrase it.

## Stack & dependencies

React 19, TypeScript, and Vite.

Fonts, imported in `src/main.tsx`:

- `@fontsource-variable/jost`

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/jost@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Cream full-screen frame. Header: `Work` (current) on the left, `N O O R  H A L B E R G` tracked in the centre, `About` and `Contact` on the right. Category labels with counts sit at the edges, with hairlines running to their prints. Footer: `Copenhagen 14:32` on the left, the `Linear ◯ Random` switch in the centre, `16 photographs · drag to explore` on the right. About opens a card with role, bio and clients; Contact opens one with `Booking commissions from March`, a copy-email row, `Book a shoot`, `Rates & CV` and social links.

## Interactions & animation

All copy is in constants at the top of `src/App.tsx`. Each entry in `PHOTOS` has its title, category, year, film, pixel size and its place in an endless tile (`u`, `v` from 0 to 1, and `size` as a share of the screen width). One `requestAnimationFrame` loop owns all motion and writes each print's position, size and opacity straight to the DOM: the pan has momentum and an idle drift; each print is offset by the pan times its depth and wrapped around the screen centre within a tile 1.45× the screen, so it reappears on the other side out of view; in linear mode prints follow each other in a strip that wraps the same way. Switching layouts eases every print from where it is to its new place with a 35 ms stagger. The lean and the press are CSS variables on the stage used by each print's inner frame, so the print centres (and the lines) stay exact. Each frame also measures the five labels and moves one SVG line per print from its label to the print centre; lines to prints off screen are hidden. Hovering a print fades the others and shows its caption; hovering or clicking a label (click locks it) highlights its category. A drag never counts as a click. The lightbox (FLIP from the print's rectangle) shows the small image at once and fades in the full one when it has loaded; ← → step, Escape closes. Every animated element also respects `prefers-reduced-motion`: the last rule in the stylesheet removes motion, and the JavaScript loops skip their idle movement.

## Responsive behaviour

One screen (`100svh`, minimum 620px). Below 720px prints are 2.2× larger relative to the width on a narrower tile, the wordmark tightens, the footer stacks, the lightbox arrows move to the bottom, and in linear mode the labels spread across the top. On touch, vertical swipes in linear mode still scroll the page.

## Accessibility & robustness

Every control is a real `<button>` or link with a visible label or an `aria-label`; toggles use `aria-pressed` and the current project uses `aria-current`; text that changes sits in an `aria-live` region. Focus rings are drawn with `:focus-visible`. Decorative layers are `aria-hidden`. Prints are buttons named with title, category and year. The table is focusable and the arrow keys push it in that direction. The layout switch is a `role="switch"`. Category labels are toggle buttons with `aria-pressed`. The lightbox is a modal `dialog` that moves focus to Close and announces the caption.

## Performance notes

Sixteen thumbnails at 520px on the long side (3–28 KB) for the collage, and sixteen 1400px versions (10–113 KB) that are only requested when a photo is opened in the lightbox. DOM, CSS and one SVG; the loop pauses while the lightbox is open.

## Assets

Thumbnails `src/assets/c01.webp` … `c16.webp` and full-size versions `src/assets/full/c01.webp` … `c16.webp`, loaded with `new URL(`./assets/${n}.webp`, import.meta.url)` and `new URL(`./assets/full/${n}.webp`, import.meta.url)`. Copy the whole folder including `full/`.

## Putting it in an existing site

The section is the `<main>` returned by `App`. Its classes all share one short prefix, so they will not collide with your styles. The first rules in the stylesheet (`*`, `html, body`, `button`, `a`, `:focus-visible`) are page-level resets: keep them on a standalone page, drop or scope them when the hero goes inside a page that already has its own. Links point to `#` or `/`; change them to your routes. Only horizontal wheel and trackpad movement (or Shift + wheel) pans the table; vertical scrolling is left to the page, so visitors can always scroll past the hero.

To drop it into an existing React site, copy the files under `src/` (except `main.tsx`) and `src/assets/` into one folder such as `components/portfolio-collage/`, install the dependencies above, move the font imports from `main.tsx` into your app entry, and render the default export of `App.tsx` as the first thing on the page. In Next.js, add `'use client'` at the top of `App.tsx`.

## Full source code

Create these files exactly. `index.html` replaces the Vite template’s `index.html`. The other files sit under `src/`. Delete unused Vite template files (`App.css`, `index.css`, `vite.svg`). Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#e7dfcb" />
    <title>Collage — Portfolio Hero — Oversight Supply</title>
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
import '@fontsource-variable/jost'
import './style.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### `src/App.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'

const NAME = 'Noor Halberg'
const ROLE = 'Photographer & director'
const CITY = 'Copenhagen'
const ZONE = 'Europe/Copenhagen'
const EMAIL = 'studio@noorhalberg.com'
const AVAILABLE = 'Booking commissions from March'
const BIO = 'Noor Halberg photographs rooms, light and the people who live in them. Interiors and travel stories for magazines, hotels and furniture makers, shot mostly on film.'
const CLIENTS = ['Halde Magazine', 'Atelier Nord', 'Maison Ferrand', 'Salt & Stone Hotels']
const SOCIAL = [['Instagram', '#'], ['LinkedIn', '#'], ['Prints', '#']]

type Cat = 'Interiors' | 'Architecture' | 'Travel' | 'Still life' | 'Portrait'
// Label positions around the frame, as in a printed contact sheet.
const CATS: { cat: Cat; pos: CSSProperties }[] = [
  { cat: 'Interiors', pos: { left: 'var(--gut)', top: '30%' } },
  { cat: 'Architecture', pos: { left: '50%', top: '13%', translate: '-50% 0' } },
  { cat: 'Travel', pos: { right: 'var(--gut)', top: '46%' } },
  { cat: 'Still life', pos: { left: 'var(--gut)', top: '70%' } },
  { cat: 'Portrait', pos: { right: 'var(--gut)', top: '78%' } },
]

// The table is an endless tile. u / v place a photo in the tile (0–1);
// size is its width as a share of the screen width. Bigger prints sit nearer
// and move faster, which gives the table its depth.
type Photo = { n: string; title: string; cat: Cat; year: string; film: string; w: number; h: number; u: number; v: number; size: number }
const PHOTOS: Photo[] = [
  { n: 'c04', title: 'Sideboard, late light', cat: 'Interiors', year: '2025', film: 'Pentax 67 · Portra 160', w: 520, h: 392, u: 0.12, v: 0.14, size: 0.15 },
  { n: 'c02', title: 'Green room, Porto', cat: 'Interiors', year: '2025', film: 'Leica M6 · Portra 400', w: 392, h: 520, u: 0.38, v: 0.1, size: 0.1 },
  { n: 'c06', title: 'Morning blinds', cat: 'Still life', year: '2024', film: 'Hasselblad 500 · Ektar', w: 520, h: 520, u: 0.63, v: 0.17, size: 0.12 },
  { n: 'c09', title: 'Low tide', cat: 'Portrait', year: '2024', film: 'Leica M6 · Gold 200', w: 292, h: 520, u: 0.88, v: 0.09, size: 0.1 },
  { n: 'c01', title: 'Studio window', cat: 'Interiors', year: '2024', film: 'Leica M6 · HP5', w: 346, h: 520, u: 0.05, v: 0.42, size: 0.07 },
  { n: 'c03', title: 'Pink stair, Mexico City', cat: 'Architecture', year: '2024', film: 'Pentax 67 · Portra 400', w: 346, h: 520, u: 0.3, v: 0.38, size: 0.09 },
  { n: 'c05', title: 'Reading corner', cat: 'Interiors', year: '2024', film: 'Hasselblad 500 · Portra 160', w: 346, h: 520, u: 0.55, v: 0.45, size: 0.075 },
  { n: 'c07', title: 'Hotel Alma, corridor', cat: 'Interiors', year: '2023', film: 'Pentax 67 · Portra 400', w: 416, h: 520, u: 0.79, v: 0.36, size: 0.09 },
  { n: 'c08', title: 'Rose light', cat: 'Still life', year: '2023', film: 'Leica M6 · Portra 160', w: 346, h: 520, u: 0.16, v: 0.66, size: 0.065 },
  { n: 'c10', title: 'Drying, Fanø', cat: 'Travel', year: '2023', film: 'Hasselblad 500 · Ektar', w: 442, h: 520, u: 0.42, v: 0.7, size: 0.1 },
  { n: 'c11', title: 'Posts, Skagen', cat: 'Travel', year: '2023', film: 'Leica M6 · HP5', w: 346, h: 520, u: 0.67, v: 0.63, size: 0.065 },
  { n: 'c12', title: 'Lifeguard house', cat: 'Architecture', year: '2022', film: 'Pentax 67 · Portra 400', w: 520, h: 392, u: 0.91, v: 0.67, size: 0.12 },
  { n: 'c13', title: 'Left on the sand', cat: 'Travel', year: '2022', film: 'Leica M6 · Portra 400', w: 390, h: 520, u: 0.08, v: 0.9, size: 0.08 },
  { n: 'c14', title: 'Walking home', cat: 'Portrait', year: '2022', film: 'Leica M6 · Tri-X', w: 520, h: 520, u: 0.33, v: 0.93, size: 0.095 },
  { n: 'c15', title: 'Vase study', cat: 'Still life', year: '2022', film: 'Hasselblad 500 · Portra 160', w: 416, h: 520, u: 0.58, v: 0.88, size: 0.06 },
  { n: 'c16', title: 'Plaster bust', cat: 'Still life', year: '2021', film: 'Pentax 67 · Portra 400', w: 346, h: 520, u: 0.82, v: 0.92, size: 0.075 },
]
const thumb = (n: string) => new URL(`./assets/${n}.webp`, import.meta.url).href
const full = (n: string) => new URL(`./assets/full/${n}.webp`, import.meta.url).href

const pad = (n: number) => String(n).padStart(2, '0')
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const wrap = (v: number, size: number) => ((v % size) + size) % size
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text })
    ta.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(id)
  }, [])
  return new Intl.DateTimeFormat('en-GB', { timeZone: ZONE, hour: '2-digit', minute: '2-digit', hour12: false }).format(now)
}

export default function App() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const items = useRef<(HTMLButtonElement | null)[]>([])
  const lines = useRef<(SVGLineElement | null)[]>([])
  const fig = useRef<HTMLDivElement>(null)
  const copyTimer = useRef(0)
  const time = useClock()

  const [mode, setMode] = useState<'random' | 'linear'>('random')
  const [hover, setHover] = useState(-1)
  const [cat, setCat] = useState<Cat | ''>('')
  const [lockCat, setLockCat] = useState<Cat | ''>('')
  const [open, setOpen] = useState<number | null>(null)
  const [closing, setClosing] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [pop, setPop] = useState<'' | 'about' | 'contact'>('')
  const [copied, setCopied] = useState<'' | 'ok' | 'fail'>('')
  const [grabbing, setGrabbing] = useState(false)

  const activeCat = cat || lockCat || (hover >= 0 ? PHOTOS[hover].cat : '')

  // Everything that moves lives in this ref and is written to the DOM each frame.
  const st = useRef({
    x: 0, y: 0, vx: 0, vy: 0, px: 0, py: 0, tilt: 0, press: 0,
    mode: 'random' as 'random' | 'linear', switchedAt: -9999, born: performance.now(),
    drag: null as null | { id: number; sx: number; sy: number; lx: number; ly: number; lt: number; moved: boolean },
    dragEnd: 0, hover: -1, paused: false, reduced: false, activeCat: '' as Cat | '',
    from: PHOTOS.map(() => ({ x: 0, y: 0, w: 0 })), last: PHOTOS.map(() => ({ x: 0, y: 0, w: 0 })),
  })
  st.current.hover = hover
  st.current.activeCat = activeCat
  st.current.paused = open !== null

  useLayoutEffect(() => {
    st.current.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Switching layouts: every print starts from where it is now and glides, one after another.
  useEffect(() => {
    const s = st.current
    if (s.mode === mode) return
    s.from = s.last.map((p) => ({ ...p }))
    s.mode = mode
    s.switchedAt = performance.now()
    s.vy = 0
  }, [mode])

  useEffect(() => {
    const s = st.current
    let raf = 0
    let prev = performance.now()
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const el = stage.current
      if (!el || s.paused) {
        prev = now
        return
      }
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      const W = el.clientWidth
      const H = el.clientHeight
      const narrow = W < 720
      const rm = s.reduced

      // Momentum after a throw, and a slow drift when nobody is touching the table.
      if (!s.drag) {
        const f = Math.exp(-dt * 2.6)
        s.vx *= f
        s.vy *= f
        if (!rm && s.hover < 0) {
          const drift = s.mode === 'linear' ? [-22, 0] : [-14, -8]
          s.vx += (drift[0] - s.vx) * Math.min(1, dt * 0.6)
          s.vy += (drift[1] - s.vy) * Math.min(1, dt * 0.6)
        }
        s.x += s.vx * dt
        s.y += s.vy * dt
      }
      if (s.mode === 'linear') s.y += (0 - s.y) * Math.min(1, dt * 4)
      // The table leans into the direction of travel and pulls back a little while held.
      const speed = s.drag ? s.vx : s.vx * 0.6
      s.tilt += (clamp(speed / 900, -1, 1) - s.tilt) * Math.min(1, dt * 6)
      s.press += ((s.drag?.moved ? 1 : 0) - s.press) * Math.min(1, dt * 7)
      el.style.setProperty('--tilt', s.tilt.toFixed(3))
      el.style.setProperty('--press', s.press.toFixed(3))

      const k = narrow ? 2.2 : 1.25
      // The tile is a little larger than the screen so prints wrap out of sight.
      const TW = W * (narrow ? 1.9 : 1.45)
      const TH = H * (narrow ? 1.2 : 1.45)
      const stripH = H * (narrow ? 0.42 : 0.46)
      const gap = narrow ? 10 : 18
      const widths = PHOTOS.map((p) => (stripH * p.w) / p.h)
      const stripW = widths.reduce((a, b) => a + b + gap, 0)
      let cursor = 0
      // Where each category label sits right now (they move between layouts).
      const sr = el.getBoundingClientRect()
      const anchors = new Map<string, [number, number]>()
      root.current?.querySelectorAll<HTMLElement>('[data-cat]').forEach((lab) => {
        const r = lab.getBoundingClientRect()
        anchors.set(lab.dataset.cat!, [r.left - sr.left + r.width / 2, r.top - sr.top + r.height / 2])
      })

      PHOTOS.forEach((p, i) => {
        const node = items.current[i]
        if (!node) return
        const depth = 0.72 + (p.size - 0.06) * 5.5
        // Random: wrap each print around the screen centre so the table never ends.
        const rw = clamp(p.size * k * W, 70, 560)
        const rx = wrap(p.u * TW + s.x * depth - W / 2 + TW / 2, TW) - TW / 2 + W / 2 + s.px * (depth - 1) * 40
        const ry = wrap(p.v * TH + s.y * depth - H / 2 + TH / 2, TH) - TH / 2 + H / 2 + s.py * (depth - 1) * 30
        // Linear: an endless strip, centred vertically.
        const lw = widths[i]
        const lx = wrap(cursor + lw / 2 + s.x - W / 2 + stripW / 2, stripW) - stripW / 2 + W / 2
        cursor += lw + gap
        const ly = H / 2
        const target = s.mode === 'random' ? { x: rx, y: ry, w: rw } : { x: lx, y: ly, w: lw }
        const t = rm ? 1 : ease(clamp((now - s.switchedAt - i * 35) / 1000, 0, 1))
        const from = s.from[i]
        const cur = t >= 1 ? target : { x: from.x + (target.x - from.x) * t, y: from.y + (target.y - from.y) * t, w: from.w + (target.w - from.w) * t }
        s.last[i] = cur
        const e = rm ? 1 : ease(clamp((now - s.born - 200 - i * 55) / 900, 0, 1))
        const h = (cur.w * p.h) / p.w
        node.style.width = `${cur.w.toFixed(1)}px`
        node.style.height = `${h.toFixed(1)}px`
        node.style.transform = `translate3d(${(cur.x - cur.w / 2).toFixed(1)}px, ${(cur.y - h / 2).toFixed(1)}px, 0) scale(${(0.6 + 0.4 * e).toFixed(3)})`
        node.style.opacity = e.toFixed(3)
        node.style.zIndex = String(i === s.hover ? 50 : Math.round(depth * 10))

        // A hairline from the photo's category label to the photo, every frame.
        const ln = lines.current[i]
        const anchor = anchors.get(p.cat)
        if (ln && anchor) {
          const [ax, ay] = anchor
          const inView = cur.x > -40 && cur.x < W + 40 && cur.y > -40 && cur.y < H + 40
          ln.setAttribute('x1', ax.toFixed(1))
          ln.setAttribute('y1', ay.toFixed(1))
          ln.setAttribute('x2', cur.x.toFixed(1))
          ln.setAttribute('y2', cur.y.toFixed(1))
          const on = s.activeCat === p.cat
          ln.style.opacity = inView ? (on ? '0.9' : s.activeCat ? '0.06' : '0.28') : '0'
        }
      })
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Pointer parallax: nearer prints shift more.
  useEffect(() => {
    const onMove = (e: globalThis.PointerEvent) => {
      const r = root.current?.getBoundingClientRect()
      if (!r || st.current.reduced) return
      st.current.px = (e.clientX - r.left) / r.width - 0.5
      st.current.py = (e.clientY - r.top) / r.height - 0.5
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // Drag anywhere, on the paper or on a print. A press that does not move is a click.
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const now = performance.now()
    st.current.drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, lx: e.clientX, ly: e.clientY, lt: now, moved: false }
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = st.current
    const d = s.drag
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.lx
    const dy = e.clientY - d.ly
    if (!d.moved) {
      const tx = e.clientX - d.sx
      const ty = e.clientY - d.sy
      if (Math.hypot(tx, ty) < 6) return
      // On touch in the strip, vertical swipes still scroll the page.
      if (e.pointerType === 'touch' && s.mode === 'linear' && Math.abs(ty) > Math.abs(tx)) {
        s.drag = null
        return
      }
      d.moved = true
      setGrabbing(true)
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        // Capture can fail for synthetic pointers; dragging still works without it.
      }
    }
    const now = performance.now()
    const dtm = Math.max(0.008, (now - d.lt) / 1000)
    s.x += dx
    s.y += s.mode === 'random' ? dy : 0
    s.vx = s.vx * 0.5 + (dx / dtm) * 0.5
    s.vy = s.mode === 'random' ? s.vy * 0.5 + (dy / dtm) * 0.5 : 0
    d.lx = e.clientX
    d.ly = e.clientY
    d.lt = now
  }
  const onUp = () => {
    const s = st.current
    if (s.drag?.moved) s.dragEnd = performance.now()
    s.drag = null
    setGrabbing(false)
  }

  // Horizontal wheel and trackpad swipes pan the table; vertical scrolling is left to the page.
  useEffect(() => {
    const el = stage.current!
    const onWheel = (e: WheelEvent) => {
      const dx = e.shiftKey ? e.deltaY : e.deltaX
      if (!dx || Math.abs(e.deltaX) < Math.abs(e.deltaY) * 0.5 && !e.shiftKey) return
      e.preventDefault()
      st.current.x -= dx
      st.current.vx = -dx * 8
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Lightbox: the photo flies out of its spot on the table.
  const flight = (from: DOMRect, to: DOMRect) => `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`
  const openPhoto = (i: number) => {
    if (performance.now() - st.current.dragEnd < 120) return
    setLoaded(false)
    setOpen(i)
  }
  useLayoutEffect(() => {
    if (open === null || closing || !fig.current) return
    const from = items.current[open]?.getBoundingClientRect()
    if (from && !st.current.reduced) {
      const to = fig.current.getBoundingClientRect()
      fig.current.animate([{ transform: flight(from, to) }, { transform: 'none' }], { duration: 650, easing: 'cubic-bezier(0.7, 0, 0.2, 1)' })
    }
    root.current?.querySelector<HTMLElement>('.cl-lb-close')?.focus()
  }, [open])
  const closePhoto = () => {
    if (open === null || closing) return
    const i = open
    const from = items.current[i]?.getBoundingClientRect()
    if (!from || !fig.current || st.current.reduced) {
      setOpen(null)
      return
    }
    setClosing(true)
    const to = fig.current.getBoundingClientRect()
    fig.current.animate([{ transform: 'none' }, { transform: flight(from, to) }], { duration: 520, easing: 'cubic-bezier(0.7, 0, 0.2, 1)' }).finished.then(() => {
      setOpen(null)
      setClosing(false)
      items.current[i]?.focus({ preventScroll: true })
    }, () => setOpen(null))
  }
  const step = (dir: number) => {
    if (open === null) return
    setLoaded(false)
    setOpen((open + dir + PHOTOS.length) % PHOTOS.length)
  }
  useEffect(() => {
    if (open === null && !pop) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') pop ? setPop('') : closePhoto()
      else if (open !== null && e.key === 'ArrowRight') step(1)
      else if (open !== null && e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })
  useEffect(() => {
    if (!pop) return
    const onDown = (e: globalThis.PointerEvent) => {
      if (!(e.target as Element).closest('.cl-pop, .cl-nav button')) setPop('')
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [pop])
  useEffect(() => () => clearTimeout(copyTimer.current), [])

  // Keyboard: arrow keys pan the table when it has focus.
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const s = st.current
    const map: Record<string, [number, number]> = { ArrowLeft: [1, 0], ArrowRight: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }
    const m = map[e.key]
    if (!m) return
    e.preventDefault()
    s.vx = m[0] * 700
    s.vy = s.mode === 'random' ? m[1] * 700 : 0
  }

  const swipe = useRef<{ x: number } | null>(null)

  const copy = async () => {
    const ok = await copyText(EMAIL)
    setCopied(ok ? 'ok' : 'fail')
    clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(''), ok ? 2000 : 6000)
  }

  const p = open !== null ? PHOTOS[open] : null
  const letters = [...NAME.toUpperCase()]

  return (
    <main ref={root} className={`cl is-${mode}${activeCat ? ' has-cat' : ''}${open !== null ? ' is-open' : ''}`}>
      <header className="cl-top">
        <nav className="cl-nav" aria-label="Main">
          <a href="#work" aria-current="page">Work</a>
        </nav>
        <h1 className="cl-mark" aria-label={`${NAME}, ${ROLE.toLowerCase()}`}>
          {letters.map((ch, i) => (
            <span key={i} aria-hidden="true" style={{ '--i': i } as CSSProperties}>{ch === ' ' ? ' ' : ch}</span>
          ))}
        </h1>
        <nav className="cl-nav is-right" aria-label="Studio">
          <button type="button" aria-expanded={pop === 'about'} onClick={() => setPop((v) => (v === 'about' ? '' : 'about'))}>About</button>
          <button type="button" aria-expanded={pop === 'contact'} onClick={() => setPop((v) => (v === 'contact' ? '' : 'contact'))}>Contact</button>
        </nav>
        <div className={`cl-pop${pop === 'about' ? ' is-open' : ''}`} role="dialog" aria-label="About" inert={pop !== 'about'}>
          <p className="cl-pop-role">{ROLE} · {CITY}</p>
          <p>{BIO}</p>
          <p className="cl-pop-label">Recent clients</p>
          <ul className="cl-list">{CLIENTS.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <div className={`cl-pop${pop === 'contact' ? ' is-open' : ''}`} role="dialog" aria-label="Contact" inert={pop !== 'contact'}>
          <p className="cl-pop-role"><i className="cl-dot" aria-hidden="true" /> {AVAILABLE}</p>
          <button className={`cl-copy${copied ? ` is-${copied}` : ''}`} type="button" onClick={copy}>
            <span>{EMAIL}</span>
            <em aria-live="polite">{copied === 'ok' ? 'Copied' : copied === 'fail' ? 'Select to copy' : 'Copy'}</em>
          </button>
          <div className="cl-row">
            <a className="cl-btn is-solid" href="#book">Book a shoot</a>
            <a className="cl-btn" href="#cv" download>Rates & CV</a>
          </div>
          <ul className="cl-list is-inline">{SOCIAL.map(([n, h]) => <li key={n}><a href={h}>{n}</a></li>)}</ul>
        </div>
      </header>

      <div
        ref={stage}
        className={`cl-stage${grabbing ? ' is-grabbing' : ''}`}
        tabIndex={0}
        aria-label="Photographs on an endless table. Drag, or use the arrow keys, to explore."
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onDragStart={(e) => e.preventDefault()}
        onKeyDown={onKey}
      >
        <svg className="cl-lines" aria-hidden="true">
          {PHOTOS.map((ph, i) => <line key={ph.n} ref={(el) => { lines.current[i] = el }} />)}
        </svg>
        <div className="cl-canvas">
          {PHOTOS.map((ph, i) => (
            <button
              key={ph.n}
              ref={(el) => { items.current[i] = el }}
              type="button"
              className={`cl-ph${hover === i ? ' is-hover' : ''}${activeCat === ph.cat ? ' is-cat' : ''}${open === i ? ' is-flying' : ''}`}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(i)}
              onPointerLeave={() => setHover(-1)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(-1)}
              onClick={() => openPhoto(i)}
              aria-label={`${ph.title}, ${ph.cat}, ${ph.year}`}
            >
              <span className="cl-ph-in">
                <img src={thumb(ph.n)} alt="" draggable={false} />
              </span>
              <span className="cl-ph-cap" aria-hidden="true">{pad(i + 1)} · {ph.title}</span>
            </button>
          ))}
        </div>
      </div>

      {CATS.map(({ cat: c, pos }) => (
        <button
          key={c}
          type="button"
          className="cl-cat"
          data-cat={c}
          style={pos}
          aria-pressed={lockCat === c}
          onPointerEnter={() => setCat(c)}
          onPointerLeave={() => setCat('')}
          onFocus={() => setCat(c)}
          onBlur={() => setCat('')}
          onClick={() => setLockCat((l) => (l === c ? '' : c))}
        >
          {c}<sup>{PHOTOS.filter((x) => x.cat === c).length}</sup>
        </button>
      ))}

      <footer className="cl-bottom">
        <p className="cl-meta">{CITY} {time}</p>
        <div className="cl-switch">
          <span aria-hidden="true" className={mode === 'linear' ? 'is-on' : ''}>Linear</span>
          <button type="button" role="switch" aria-checked={mode === 'random'} aria-label="Random layout" onClick={() => setMode((m) => (m === 'random' ? 'linear' : 'random'))}>
            <i />
          </button>
          <span aria-hidden="true" className={mode === 'random' ? 'is-on' : ''}>Random</span>
        </div>
        <p className="cl-meta is-right">{PHOTOS.length} photographs · drag to explore</p>
      </footer>

      {p && open !== null && (
        <div
          className={`cl-lb${closing ? ' is-closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={p.title}
          onPointerDown={(e) => (swipe.current = { x: e.clientX })}
          onPointerUp={(e) => {
            const s = swipe.current
            swipe.current = null
            if (s && Math.abs(e.clientX - s.x) > 60) step(e.clientX < s.x ? 1 : -1)
          }}
        >
          <button className="cl-lb-close" type="button" onClick={closePhoto} aria-label="Close">Close <span aria-hidden="true">×</span></button>
          <div ref={fig} className="cl-lb-fig" style={{ aspectRatio: `${p.w} / ${p.h}`, '--r': p.w / p.h } as CSSProperties}>
            <img src={thumb(p.n)} alt="" key={`t-${p.n}`} draggable={false} />
            <img className={loaded ? 'is-loaded' : ''} src={full(p.n)} alt={p.title} key={`f-${p.n}`} onLoad={() => setLoaded(true)} draggable={false} />
          </div>
          <button className="cl-lb-arrow is-prev" type="button" onClick={() => step(-1)} aria-label="Previous photograph"><span /></button>
          <button className="cl-lb-arrow is-next" type="button" onClick={() => step(1)} aria-label="Next photograph"><span /></button>
          <div className="cl-lb-cap" key={p.n} aria-live="polite">
            <p className="cl-lb-no">{pad(open + 1)} / {pad(PHOTOS.length)}</p>
            <p className="cl-lb-title">{p.title}</p>
            <p className="cl-lb-meta">{p.cat} · {p.year} · {p.film}</p>
          </div>
        </div>
      )}
    </main>
  )
}
```

### `src/style.css`

```css
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: #e7dfcb; -webkit-font-smoothing: antialiased; }
button { font: inherit; color: inherit; }
a { color: inherit; }
:focus-visible { outline: 1px solid currentColor; outline-offset: 4px; }

.cl { --bg: #e7dfcb; --ink: #211d17; --mute: rgb(33 29 23 / 0.55); --line: rgb(33 29 23 / 0.16); --ease: cubic-bezier(0.22, 1, 0.36, 1); --spring: cubic-bezier(0.34, 1.4, 0.64, 1); --gut: clamp(14px, 1.6vw, 24px); --px: 0; --py: 0;
  position: relative; height: 100vh; height: 100svh; min-height: 620px; overflow: hidden; overflow: clip; isolation: isolate; background: var(--bg); color: var(--ink);
  font-family: 'Jost Variable', 'Jost', system-ui, sans-serif; font-size: 12px; font-weight: 400; line-height: 1.5; }
.cl::before { content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(70% 60% at 50% 50%, rgb(255 251 240 / 0.55), transparent 70%); }

/* Header: tracked wordmark in the middle, small caps links at the edges */
.cl-top { position: absolute; z-index: 20; top: 0; left: 0; right: 0; background: linear-gradient(var(--bg), rgb(231 223 203 / 0.85) 45%, rgb(231 223 203 / 0)); display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: calc(var(--gut) + 4px) var(--gut) 36px; }
.cl-mark { margin: 0; font-size: clamp(15px, 1.7vw, 22px); font-weight: 300; letter-spacing: 0.62em; margin-right: -0.62em; white-space: nowrap; }
.cl-mark span { display: inline-block; animation: cl-letter 1.1s calc(0.2s + var(--i) * 45ms) var(--ease) backwards; }
@keyframes cl-letter { from { opacity: 0; transform: translateY(-10px); filter: blur(4px); } }
.cl-nav { display: flex; gap: clamp(14px, 2.4vw, 32px); animation: cl-fade 1s 0.5s var(--ease) backwards; }
.cl-nav.is-right { justify-content: flex-end; }
.cl-nav a, .cl-nav button { padding: 4px 0; border: 0; background: none; font-size: 11px; font-weight: 450; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; cursor: pointer; background-image: linear-gradient(currentColor, currentColor); background-size: 0 1px; background-position: 100% 100%; background-repeat: no-repeat; transition: background-size 0.45s var(--ease); }
.cl-nav a:hover, .cl-nav button:hover, .cl-nav [aria-expanded='true'], .cl-nav [aria-current] { background-size: 100% 1px; background-position: 0 100%; }

.cl-pop { position: absolute; top: 58px; right: var(--gut); width: min(330px, calc(100vw - 28px)); padding: 18px; background: #f3eddd; border: 1px solid var(--line); box-shadow: 0 30px 60px -30px rgb(60 40 20 / 0.35); opacity: 0; translate: 0 -8px; visibility: hidden; transition: opacity 0.3s, translate 0.5s var(--ease), visibility 0s 0.5s; }
.cl-pop.is-open { opacity: 1; translate: 0 0; visibility: visible; transition: opacity 0.3s, translate 0.5s var(--ease), visibility 0s; }
.cl-pop p { margin: 0 0 12px; font-size: 13px; }
.cl-pop-role { display: flex; align-items: center; gap: 8px; font-size: 10.5px !important; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mute); }
.cl-pop-label { font-size: 10.5px !important; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mute); margin-bottom: 6px !important; }
.cl-dot { width: 6px; height: 6px; border-radius: 50%; background: #5d9a5b; box-shadow: 0 0 0 3px rgb(93 154 91 / 0.2); }
.cl-list { margin: 0; padding: 0; list-style: none; font-size: 13px; }
.cl-list.is-inline { display: flex; gap: 16px; margin-top: 14px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; }
.cl-list a { text-decoration: none; color: var(--mute); transition: color 0.2s; }
.cl-list a:hover { color: var(--ink); }
.cl-copy { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; width: 100%; margin: 0 0 12px; padding: 12px 0; border: 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: none; font-size: 15px; text-align: left; cursor: pointer; }
.cl-copy em { font-style: normal; font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mute); transition: color 0.25s; }
.cl-copy:hover em { color: var(--ink); }
.cl-copy.is-ok em { color: #3f7d3d; }
.cl-copy.is-fail span { user-select: all; }
.cl-row { display: flex; flex-wrap: wrap; gap: 6px; }
.cl-btn { position: relative; overflow: hidden; isolation: isolate; padding: 10px 16px; border: 1px solid var(--ink); font-size: 10.5px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; transition: color 0.4s var(--ease); }
.cl-btn::before { content: ''; position: absolute; inset: 0; z-index: -1; background: var(--ink); transform: scaleX(0); transform-origin: right; transition: transform 0.5s var(--ease); }
.cl-btn:hover { color: var(--bg); }
.cl-btn:hover::before { transform: scaleX(1); transform-origin: left; }
.cl-btn.is-solid { background: var(--ink); color: var(--bg); }
.cl-btn.is-solid::before { background: #8a5a2b; }

/* Stage: an endless table. Prints are placed by the frame loop; drag anywhere. */
.cl-stage { position: absolute; inset: 0; z-index: 2; cursor: grab; touch-action: pan-y; outline: none; user-select: none; -webkit-user-select: none; --tilt: 0; --press: 0; }
.cl-stage.is-grabbing, .cl-stage.is-grabbing .cl-ph { cursor: grabbing; }
.cl-stage:focus-visible::after { content: ''; position: absolute; inset: 70px var(--gut) 60px; border: 1px dashed var(--mute); pointer-events: none; }
.cl-canvas { position: absolute; inset: 0; }
.cl-ph { position: absolute; left: 0; top: 0; padding: 0; border: 0; background: none; cursor: pointer; opacity: 0; will-change: transform; }
/* The print leans with the speed of the table and sinks a little while it is held. */
.cl-ph-in { display: block; width: 100%; height: 100%; overflow: hidden; background: #d6ccb4; box-shadow: 0 18px 30px -22px rgb(60 40 20 / 0.55); transform: perspective(900px) rotateY(calc(var(--tilt) * 16deg)) scale(calc(1 - var(--press) * 0.07)); transition: opacity 0.25s, filter 0.25s, box-shadow 0.35s; }
.cl-ph img { display: block; width: 100%; height: 100%; object-fit: cover; pointer-events: none; user-select: none; -webkit-user-drag: none; transition: transform 0.8s var(--ease); }
.cl-ph.is-hover img, .cl-ph:focus-visible img { transform: scale(1.07); }
.cl-ph.is-hover .cl-ph-in { box-shadow: 0 34px 50px -24px rgb(60 40 20 / 0.6); }
.cl-stage:has(.is-hover) .cl-ph:not(.is-hover) .cl-ph-in, .cl.has-cat .cl-ph:not(.is-cat) .cl-ph-in { opacity: 0.32; filter: grayscale(0.7); }
.cl-ph.is-flying { visibility: hidden; }
.cl-ph-cap { position: absolute; left: 0; top: calc(100% + 6px); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; color: var(--ink); opacity: 0; translate: 0 -4px; transition: opacity 0.25s, translate 0.35s var(--ease); pointer-events: none; }
.cl-ph.is-hover .cl-ph-cap, .cl-ph:focus-visible .cl-ph-cap, .cl.is-linear .cl-ph-cap { opacity: 1; translate: 0 0; }
.cl.is-linear .cl-ph:not(.is-hover) .cl-ph-cap { color: var(--mute); }

/* Category labels, and the hairlines that tie every print to its label (redrawn each frame) */
.cl-cat { position: absolute; z-index: 15; text-shadow: 0 0 6px var(--bg), 0 0 12px var(--bg); padding: 4px 0; border: 0; background: none; font-size: 10.5px; font-weight: 450; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; animation: cl-fade 1s 0.9s var(--ease) backwards; transition: color 0.3s; }
.cl-cat sup { font-size: 8px; margin-left: 3px; color: var(--mute); }
.cl-cat::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 0.45s var(--ease); }
.cl-cat:hover::after, .cl-cat[aria-pressed='true']::after { transform: scaleX(1); }
.cl.has-cat .cl-cat:not(:hover):not([aria-pressed='true']) { color: var(--mute); }
.cl-lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; animation: cl-fade 1.2s 1s backwards; }
.cl-lines line { stroke: var(--ink); stroke-width: 0.75px; opacity: 0; transition: opacity 0.3s; }

/* In linear mode the labels line up above the strip. */
.cl.is-linear .cl-cat { top: 19% !important; right: auto !important; translate: -50% 0 !important; transition: left 0.9s var(--ease), top 0.9s var(--ease), color 0.3s; }
.cl.is-linear .cl-cat[data-cat='Interiors'] { left: 30% !important; }
.cl.is-linear .cl-cat[data-cat='Architecture'] { left: 40% !important; }
.cl.is-linear .cl-cat[data-cat='Travel'] { left: 50% !important; }
.cl.is-linear .cl-cat[data-cat='Still life'] { left: 60% !important; }
.cl.is-linear .cl-cat[data-cat='Portrait'] { left: 70% !important; }

/* Footer: local time, layout switch, count */
.cl-bottom { position: absolute; z-index: 20; left: 0; right: 0; bottom: 0; padding: 70px var(--gut) calc(var(--gut) + 2px); background: linear-gradient(rgb(231 223 203 / 0), rgb(231 223 203 / 0.85) 55%, var(--bg)); display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; pointer-events: none; animation: cl-fade 1s 0.8s var(--ease) backwards; }
.cl-bottom > * { pointer-events: auto; }
.cl-meta { margin: 0; font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mute); }
.cl-meta.is-right { text-align: right; }
.cl-switch { display: flex; align-items: center; gap: 10px; font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; }
.cl-switch span { color: var(--mute); transition: color 0.3s; }
.cl-switch span.is-on { color: var(--ink); }
.cl-switch button { position: relative; width: 34px; height: 14px; padding: 0; border: 1px solid var(--ink); border-radius: 99px; background: none; cursor: pointer; }
.cl-switch button i { position: absolute; top: 2px; left: 2px; width: 8px; height: 8px; border-radius: 50%; background: var(--ink); transition: left 0.5s var(--spring), width 0.25s; }
.cl-switch button:active i { width: 13px; }
.cl-switch button[aria-checked='true'] i { left: calc(100% - 10px); }
.cl-switch button[aria-checked='true']:active i { left: calc(100% - 15px); }

/* Lightbox */
.cl-lb { position: absolute; inset: 0; z-index: 40; display: grid; place-items: center; padding: 64px 70px 96px; background: rgb(231 223 203 / 0.96); animation: cl-fade 0.45s var(--ease); touch-action: pan-y; }
.cl-lb.is-closing { animation: cl-out 0.52s var(--ease) forwards; }
@keyframes cl-out { to { background-color: rgb(231 223 203 / 0); } }
.cl-lb.is-closing > :not(.cl-lb-fig) { opacity: 0; transition: opacity 0.2s; }
.cl-lb-fig { position: relative; width: min(72vw, calc((100svh - 190px) * var(--r))); max-height: calc(100svh - 160px); transform-origin: 0 0; box-shadow: 0 40px 80px -40px rgb(60 40 20 / 0.6); background: #d6ccb4; }
.cl-lb-fig img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.cl-lb-fig img + img { opacity: 0; transition: opacity 0.5s; }
.cl-lb-fig img.is-loaded { opacity: 1; }
.cl-lb-close { position: absolute; top: var(--gut); right: var(--gut); display: flex; gap: 8px; align-items: center; padding: 6px 0; border: 0; background: none; font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; }
.cl-lb-close span { font-size: 18px; line-height: 1; transition: rotate 0.5s var(--spring); }
.cl-lb-close:hover span { rotate: 90deg; }
.cl-lb-arrow { position: absolute; top: 50%; width: 48px; height: 48px; margin-top: -24px; border: 1px solid var(--line); border-radius: 50%; background: none; cursor: pointer; transition: border-color 0.3s, transform 0.4s var(--spring); }
.cl-lb-arrow:hover { border-color: var(--ink); transform: scale(1.08); }
.cl-lb-arrow.is-prev { left: var(--gut); }
.cl-lb-arrow.is-next { right: var(--gut); }
.cl-lb-arrow span { position: absolute; left: 50%; top: 50%; width: 10px; height: 10px; margin: -5px 0 0 -3px; border-left: 1px solid currentColor; border-bottom: 1px solid currentColor; rotate: 45deg; }
.cl-lb-arrow.is-next span { rotate: -135deg; margin-left: -7px; }
.cl-lb-cap { position: absolute; left: 0; right: 0; bottom: calc(var(--gut) + 6px); text-align: center; animation: cl-rise 0.6s 0.15s var(--ease) backwards; }
@keyframes cl-rise { from { opacity: 0; transform: translateY(8px); } }
.cl-lb-cap p { margin: 0; }
.cl-lb-no, .cl-lb-meta { font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mute); }
.cl-lb-title { font-size: 18px; font-weight: 400; letter-spacing: 0.02em; }

@keyframes cl-fade { from { opacity: 0; } }

@media (max-width: 720px) {
  .cl-top { grid-template-columns: auto 1fr auto; gap: 10px; }
  .cl-mark { font-size: 13px; letter-spacing: 0.32em; margin-right: -0.32em; text-align: center; }
  .cl-cat { font-size: 9.5px; letter-spacing: 0.12em; }
  .cl-cat[data-cat='Architecture'] { top: 12% !important; }
  .cl.is-linear .cl-cat { top: 20% !important; }
  .cl.is-linear .cl-cat[data-cat='Interiors'] { left: 12% !important; }
  .cl.is-linear .cl-cat[data-cat='Architecture'] { left: 33% !important; top: 20% !important; }
  .cl.is-linear .cl-cat[data-cat='Travel'] { left: 55% !important; }
  .cl.is-linear .cl-cat[data-cat='Still life'] { left: 72% !important; }
  .cl.is-linear .cl-cat[data-cat='Portrait'] { left: 89% !important; }
  .cl-bottom { grid-template-columns: 1fr; justify-items: center; gap: 8px; }
  .cl-meta.is-right { display: none; }
  .cl-lb { padding: 64px 12px 110px; }
  .cl-lb-fig { width: min(calc(100vw - 24px), calc((100svh - 200px) * var(--r))); }
  .cl-lb-arrow { top: auto; bottom: 18px; margin: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .cl *, .cl *::before, .cl *::after { animation: none !important; transition-duration: 0.01ms !important; }
  .cl-ph-in { transform: none !important; }
}
```

## Build / run

```
npm create vite@latest portfolio-collage -- --template react-ts
cd portfolio-collage
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/jost@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files and the assets, then:

```
npm run dev
```

`src/main.tsx` mounts `<App />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- No APIs, keys, accounts, or payment code.
- Links, booking and CV point to `#` placeholders.
- The photographer and clients are fictional.
