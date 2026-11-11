<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Folio — Portfolio hero

Folio is a portfolio hero for a writer and illustrator, built as a little riso-printed magazine you can actually read. It opens closed on its cover in the middle of a cream page; turn the pages by dragging anywhere on them (the cover too, with a throw), clicking the outer edge, the big arrows, the dots or ← →. Each page curls like paper as it turns: its free edge lifts first and leads, then trails as the page lands, with shading that follows the curve and a shadow cast on the page beneath, and a lifted corner teases the next page. Inside are the portfolio's pages: a letter from the desk with availability, a contents page whose entries jump to their spread, an essay opener with a full-bleed illustration, the essay with a drop cap and pull quote, a page of commissioned drawings, a novel with a pre-order button, press quotes and clients, a contact page with copy-email, and a blue back cover with a barcode. Around it: links, a script wordmark, a newsletter field, a save-this-issue heart that bursts, and page dots. Document title: `Folio — Portfolio Hero — Oversight Supply`.

Rebuild it as a full-screen hero section. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Do not reformat, rename, or restyle them. Every visible string, number, colour, and timing in those files is the copy. Do not paraphrase it.

## Stack & dependencies

React 19, TypeScript, and Vite.

Fonts, imported in `src/main.tsx`:

- `@fontsource-variable/literata` (opsz.css and opsz-italic.css)

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/literata@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Cream page, blue ink. Header: `Writing` `Illustration` `Books` `Contact` on the left, the italic wordmark `Juniper Hale` in the middle, an underlined `Newsletter →` field on the right. The magazine sits in the middle between `←` and `→`. Footer: a heart with the current spread name and `Issue N°24 · Spring · Save issue`, six page dots, and `Instagram`. The ten pages are the ten entries of `faces`, two per leaf (front and back).

## Interactions & animation

One number, the reading position `f`, drives everything: leaf `i` turns from 0° to −180° as `f` goes from `i` to `i + 1`, and a spring eases `f` to the target spread. A drag sets `f` directly and its release speed decides whether the page completes; images inside the book ignore the pointer so dragging never picks up a picture. While a leaf turns it swaps to a copy drawn as six hinged strips (`Bend`), each showing its slice of the front and back page: the spine strip carries the turn (−180° × progress) and the others add a curl toward the free edge (up to 34°, by `sin` of the progress, leading or trailing with the direction of travel), and each strip blends its shading from seam to seam by how far it faces away from the light. At rest the flat page is shown again. A closed magazine slides half a page so the cover (or back) sits centred; each stack of pages has its own drop shadow that only appears once a page has landed on it, and a turning page casts a soft shadow on the page below. Only the two pages you can see are focusable (`inert` on the rest). Contents entries call `go(spread)`. The newsletter field validates the address locally and answers `You're on the list ✓`. Copy email turns its label into `Copied ✓`. Every animated element also respects `prefers-reduced-motion`: the last rule in the stylesheet removes motion, and the JavaScript loops skip their idle movement.

## Responsive behaviour

One screen (`100svh`, minimum 640px). Page size follows `--pw` (up to 460px) and every size inside a page is in container units, so the type scales with the page. Below 900px the header links hide. Below 720px the magazine becomes a horizontal swipe deck of the ten pages with scroll-snap, and the dots scroll it.

## Accessibility & robustness

Every control is a real `<button>` or link with a visible label or an `aria-label`; toggles use `aria-pressed` and the current project uses `aria-current`; text that changes sits in an `aria-live` region. Focus rings are drawn with `:focus-visible`. Decorative layers are `aria-hidden`. The magazine is a group with a live label naming the spread; ← → turn pages when focus is not in a field. Hidden pages are `inert`. The dots are a tablist.

## Performance notes

Six illustrations (15–43 KB). CSS 3D only. Each leaf keeps a hidden strip copy of its two pages (`aria-hidden`, `inert`, `display: none` until it turns), and one frame loop writes the transforms of the turning leaf's strips.

## Assets

Six illustrations: `src/assets/i01.webp` … `i06.webp`, loaded with `new URL(`./assets/${n}.webp`, import.meta.url)`. Copy the whole folder.

## Putting it in an existing site

The section is the `<main>` returned by `App`. Its classes all share one short prefix, so they will not collide with your styles. The first rules in the stylesheet (`*`, `html, body`, `button`, `a`, `:focus-visible`) are page-level resets: keep them on a standalone page, drop or scope them when the hero goes inside a page that already has its own. Links point to `#` or `/`; change them to your routes. The arrow keys only turn pages while focus is inside the hero.

To drop it into an existing React site, copy the files under `src/` (except `main.tsx`) and `src/assets/` into one folder such as `components/portfolio-folio/`, install the dependencies above, move the font imports from `main.tsx` into your app entry, and render the default export of `App.tsx` as the first thing on the page. In Next.js, add `'use client'` at the top of `App.tsx`.

## Full source code

Create these files exactly. `index.html` replaces the Vite template’s `index.html`. The other files sit under `src/`. Delete unused Vite template files (`App.css`, `index.css`, `vite.svg`). Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#ebe5c9" />
    <title>Folio — Portfolio Hero — Oversight Supply</title>
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
import '@fontsource-variable/literata/opsz.css'
import '@fontsource-variable/literata/opsz-italic.css'
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
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent, type ReactNode } from 'react'

const NAME = 'Juniper Hale'
const SHORT = 'HALE'
const ROLE = 'Writer & illustrator'
const CITY = 'Bristol'
const EMAIL = 'hello@juniperhale.com'
const AVAILABLE = 'Commissions open from March'
const ISSUE = 'Issue N°24 · Spring'
const LINKS = [['Writing', '#writing'], ['Illustration', '#illustration'], ['Books', '#books'], ['Contact', '#contact']]

const img = (n: string) => new URL(`./assets/${n}.webp`, import.meta.url).href

// Contents: spread numbers are the spread each entry opens on.
const CONTENTS = [
  { title: 'From the desk', kind: 'Letter', page: 2, spread: 1 },
  { title: 'The Slow Kitchen', kind: 'Essay', page: 4, spread: 2 },
  { title: 'Field notes', kind: 'Drawings', page: 6, spread: 3 },
  { title: 'Small Weathers', kind: 'Novel', page: 7, spread: 3 },
  { title: 'Kind words', kind: 'Press', page: 8, spread: 4 },
  { title: 'Write to me', kind: 'Contact', page: 9, spread: 4 },
]
const PRESS = [
  ['“Hale writes the way light moves across a kitchen table: slowly, and then all at once.”', 'Halde Magazine'],
  ['“Drawings that feel like a deep breath.”', 'The Northern Review'],
  ['“A small, perfect book about large feelings.”', 'Paper & Ink Weekly'],
]
const CLIENTS = ['Halde Magazine', 'Oak Lane Books', 'The Northern Review', 'Salt Kitchen', 'Little Fern Press']
const SPREADS = ['Cover', 'From the desk', 'The Slow Kitchen', 'Field notes · Small Weathers', 'Kind words · Write to me', 'Back cover']

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

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const smooth = (t: number) => t * t * (3 - 2 * t)

// While a page turns it is drawn as a chain of hinged vertical strips, each
// showing its slice of the front and back page, so the paper can curl.
const STRIPS = 6
const BEND = 34 // degrees of curl at the free edge, at the middle of a turn

function Bend({ front, back, k = 0 }: { front: ReactNode; back: ReactNode; k?: number }) {
  return (
    <div className="fo-strip">
      <div className="fo-strip-f"><div className="fo-strip-c" style={{ left: `${-k * 100}%` }}>{front}</div></div>
      <div className="fo-strip-b"><div className="fo-strip-c" style={{ left: `${-(STRIPS - 1 - k) * 100}%` }}>{back}</div></div>
      {k < STRIPS - 1 && <Bend front={front} back={back} k={k + 1} />}
    </div>
  )
}

function Page({ n, side, children, className = '', bleed }: { n: number; side: 'l' | 'r'; children: ReactNode; className?: string; bleed?: boolean }) {
  return (
    <div className={`fo-page is-${side}${bleed ? ' is-bleed' : ''}`}>
      {/* The outer box is the size container; type and padding live inside it. */}
      <div className={`fo-page-in ${className}`}>
        {!bleed && n > 0 && <p className="fo-run" aria-hidden="true">{side === 'l' ? `${SHORT} — ${ISSUE}` : ROLE}</p>}
        {children}
        {!bleed && n > 0 && <p className="fo-folio" aria-hidden="true">{n}</p>}
      </div>
      <span className="fo-shade" aria-hidden="true" />
    </div>
  )
}

export default function App() {
  const root = useRef<HTMLElement>(null)
  const book = useRef<HTMLDivElement>(null)
  const leaves = useRef<(HTMLDivElement | null)[]>([])
  const copyTimer = useRef(0)
  const [spread, setSpread] = useState(0)
  const [narrow, setNarrow] = useState(false)
  const [copied, setCopied] = useState<'' | 'ok' | 'fail'>('')
  const [sub, setSub] = useState<'' | 'ok' | 'bad'>('')
  const [mail, setMail] = useState('')
  const [saved, setSaved] = useState(false)
  const [burst, setBurst] = useState(0)

  const copy = async () => {
    const ok = await copyText(EMAIL)
    setCopied(ok ? 'ok' : 'fail')
    clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(''), ok ? 2200 : 6000)
  }
  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const subscribe = (e: FormEvent) => {
    e.preventDefault()
    setSub(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) ? 'ok' : 'bad')
  }

  // The ten faces of the five leaves, in reading order.
  const faces: ReactNode[] = [
    <Page key="cover" n={0} side="r" className="fo-cover" bleed>
      <img src={img('i01')} alt="" className="fo-cover-img" />
      <p className="fo-cover-top"><span>{ISSUE}</span><span>USD 20</span></p>
      <h2 className="fo-mast">{SHORT}</h2>
      <p className="fo-cover-sub">Essays, drawings<br />&amp; other weather</p>
      <p className="fo-cover-by">by {NAME}</p>
    </Page>,
    <Page key="desk" n={2} side="l" className="fo-desk">
      <p className="fo-kicker">From the desk</p>
      <h3 className="fo-h">Hello. I write about small things and draw the rest.</h3>
      <p>I'm {NAME}, a {ROLE.toLowerCase()} in {CITY}. I write essays about kitchens, weather and the people who sit at long tables, and I draw for magazines, packaging and children's books.</p>
      <p>This little issue is my portfolio. Turn the pages, or jump straight to the part you came for.</p>
      <p className="fo-sign">— Juniper</p>
      <img src={img('i03')} alt="" className="fo-spot" />
      <p className="fo-chip"><i aria-hidden="true" /> {AVAILABLE}</p>
    </Page>,
    <Page key="contents" n={3} side="r" className="fo-toc">
      <p className="fo-kicker">Contents</p>
      <ol>
        {CONTENTS.map((c) => (
          <li key={c.title}>
            <button type="button" onClick={() => go(c.spread)}>
              <span className="fo-toc-n">{String(c.page).padStart(2, '0')}</span>
              <span className="fo-toc-t">{c.title}</span>
              <span className="fo-toc-k">{c.kind}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="fo-note">Tip: drag or swipe a page, or use ← →.</p>
    </Page>,
    <Page key="essay-open" n={4} side="l" className="fo-open" bleed>
      <img src={img('i04')} alt="A notebook of painted wildflowers" />
      <div className="fo-open-title">
        <p className="fo-kicker">Essay · Halde Magazine, 2025</p>
        <h3>The Slow Kitchen</h3>
      </div>
    </Page>,
    <Page key="essay" n={5} side="r" className="fo-essay">
      <p className="fo-lede"><span className="fo-drop">O</span>n Sundays my grandmother cooked one thing all day. Not a feast — one pot, one wooden spoon, and a window that slowly changed colour while the onions went from white to gold to the brown of an old violin.</p>
      <blockquote>“Patience is just attention that has stopped checking the clock.”</blockquote>
      <p>I have spent most of my working life trying to write the way she cooked: with the heat low and the door open, letting the small things take as long as they need.</p>
      <a className="fo-link" href="#essay">Read the full essay <span aria-hidden="true">→</span></a>
    </Page>,
    <Page key="field" n={6} side="l" className="fo-field">
      <p className="fo-kicker">Field notes · Drawings</p>
      <div className="fo-grid">
        <figure><img src={img('i06')} alt="Watercolour leaves" /><figcaption>Hedgerow, for Salt Kitchen</figcaption></figure>
        <figure><img src={img('i05')} alt="Pastel leaf shapes" /><figcaption>Spring menu, 2025</figcaption></figure>
        <figure className="is-wide"><img src={img('i03')} alt="Ink drawing of a young tree" /><figcaption>Cover study, Little Fern Press</figcaption></figure>
      </div>
    </Page>,
    <Page key="book" n={7} side="r" className="fo-book">
      <p className="fo-kicker">Novel · Oak Lane Books</p>
      <div className="fo-book-row">
        <div className="fo-book-cover">
          <img src={img('i02')} alt="" />
          <span>Small<br />Weathers</span>
        </div>
        <div>
          <h3 className="fo-h">Small Weathers</h3>
          <p>A novel in twelve forecasts: one family, one seaside house, one year of quietly changing skies.</p>
          <p className="fo-out">Out 12 March</p>
          <a className="fo-btn" href="#order">Pre-order a signed copy</a>
        </div>
      </div>
    </Page>,
    <Page key="press" n={8} side="l" className="fo-press">
      <p className="fo-kicker">Kind words</p>
      {PRESS.map(([q, by]) => (
        <figure key={by}><blockquote>{q}</blockquote><figcaption>{by}</figcaption></figure>
      ))}
      <p className="fo-kicker is-small">Drawn and written for</p>
      <p className="fo-clients">{CLIENTS.join(' · ')}</p>
    </Page>,
    <Page key="contact" n={9} side="r" className="fo-contact">
      <p className="fo-kicker">Write to me</p>
      <h3 className="fo-h">Got a story, a menu or a book that needs drawing?</h3>
      <p className="fo-chip"><i aria-hidden="true" /> {AVAILABLE}</p>
      <button className={`fo-copy${copied ? ` is-${copied}` : ''}`} type="button" onClick={copy}>
        <span>{EMAIL}</span>
        <em>{copied === 'ok' ? 'Copied ✓' : copied === 'fail' ? 'Select to copy' : 'Copy'}</em>
      </button>
      <div className="fo-row">
        <a className="fo-btn" href="#call">Book a call</a>
        <a className="fo-btn is-line" href="#cv" download>Portfolio PDF</a>
      </div>
      <p className="fo-socials"><a href="#">Instagram</a> · <a href="#">Substack</a> · <a href="#">Bluesky</a></p>
    </Page>,
    <Page key="back" n={10} side="l" className="fo-back" bleed>
      <p className="fo-back-big">Thanks for<br />reading.</p>
      <p className="fo-back-small">Printed on a riso in {CITY}. All words and drawings © {NAME}.</p>
      <div className="fo-barcode" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ width: [1, 2, 1, 3, 1, 2][i % 6] }} />)}</div>
      <p className="fo-back-price">{ISSUE} · USD 20</p>
    </Page>,
  ]
  const L = faces.length / 2

  // f is the reading position: 0 = closed cover, L = closed back. Leaf i turns as f goes from i to i + 1.
  const m = useRef({ f: 0, target: 0, v: 0, dir: 1, drag: null as null | { x: number; start: number; t: number; vx: number; moved: boolean }, reduced: false, pw: 300 })

  useLayoutEffect(() => {
    const check = () => setNarrow(root.current!.clientWidth < 720)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(root.current!)
    m.current.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (narrow) return
    const s = m.current
    let raf = 0
    let last = performance.now()
    let shown = -1
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!s.drag) {
        if (s.reduced) s.f = s.target
        else {
          s.v += ((s.target - s.f) * 90 - s.v * 19.5) * dt
          s.f += s.v * dt
          if (Math.abs(s.target - s.f) < 0.0005 && Math.abs(s.v) < 0.001) s.f = s.target
        }
      }
      const b = book.current
      if (!b) return
      s.pw = b.clientWidth / 2
      const f = s.f
      // A closed magazine sits centred: shift by half a page at either end.
      const shift = -0.5 * (1 - clamp(f, 0, 1)) + 0.5 * clamp(f - (L - 1), 0, 1)
      b.style.setProperty('--shift', shift.toFixed(4))
      // Which way the paper is travelling decides whether its edge leads or trails.
      const motion = s.drag ? s.drag.vx : s.target - s.f
      if (Math.abs(motion) > 0.001) s.dir = Math.sign(motion)
      // Each stack casts its own shadow, so nothing shows where there are no pages.
      // A shadow with no page on it reads as a ghost page, so each one only
      // appears in the last moment of the landing (and leaves as the last page lifts).
      b.style.setProperty('--stack-l', smooth(clamp((f - 0.82) / 0.18, 0, 1)).toFixed(3))
      b.style.setProperty('--stack-r', (1 - smooth(clamp((f - (L - 1)) / 0.18, 0, 1))).toFixed(3))
      const pt = f - Math.floor(f)
      const air = f > 0 && f < L && pt > 0.001 && pt < 0.999 ? Math.sin(Math.PI * pt) : 0
      // Cast shadows only fall where a page lies underneath.
      b.style.setProperty('--cast-r', (f <= L - 1 ? air * (1 - pt) : 0).toFixed(3))
      b.style.setProperty('--cast-l', (f >= 1 ? air * pt : 0).toFixed(3))
      b.style.setProperty('--pt', pt.toFixed(3))
      leaves.current.forEach((leaf, i) => {
        if (!leaf) return
        const p = clamp(f - i, 0, 1)
        const turning = p > 0.001 && p < 0.999
        leaf.style.zIndex = String(turning ? L + 5 : p >= 0.5 ? i + 1 : L - i)
        leaf.classList.toggle('is-turning', turning)
        if (!turning) {
          leaf.style.transform = `perspective(2600px) rotateY(${p >= 0.5 ? -180 : 0}deg)`
          return
        }
        // The spine strip carries the turn; the others add curl toward the free edge.
        leaf.style.transform = 'perspective(2600px)'
        const curl = -BEND * Math.sin(Math.PI * p) * s.dir
        const sum = (STRIPS * (STRIPS - 1)) / 2
        const strips = leaf.querySelectorAll<HTMLElement>('.fo-strip')
        const local = Array.from(strips, (_, k) => (k === 0 ? -180 * p : (curl * k) / sum))
        const total: number[] = []
        local.reduce((acc, a, k) => (total[k] = acc + a), 0)
        // Light falls from the front: paper turned away from it darkens. Each strip
        // blends from the shade at its left seam to the shade at its right seam.
        const shade = (deg: number) => Math.abs(Math.sin((deg * Math.PI) / 180)) * 0.34
        strips.forEach((st, k) => {
          st.style.transform = `rotateY(${local[k].toFixed(2)}deg)`
          const left = k === 0 ? total[0] : (total[k - 1] + total[k]) / 2
          const right = k === strips.length - 1 ? total[k] : (total[k] + total[k + 1]) / 2
          st.style.setProperty('--d0', shade(left).toFixed(3))
          st.style.setProperty('--d1', shade(right).toFixed(3))
        })
      })
      const r = Math.round(clamp(f, 0, L))
      if (r !== shown) {
        shown = r
        setSpread(r)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [narrow, L])

  const go = (n: number) => {
    const t = clamp(n, 0, L)
    m.current.target = t
    if (narrow) {
      const deck = root.current?.querySelector('.fo-deck')
      const page = deck?.children[Math.max(0, t * 2 - 1)] as HTMLElement | undefined
      // The scroll handler updates the current spread as the deck moves.
      if (deck && page) deck.scrollTo({ left: page.offsetLeft - (deck.clientWidth - page.offsetWidth) / 2, behavior: m.current.reduced ? 'auto' : 'smooth' })
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea')) return
      if (e.key === 'ArrowRight') go(Math.round(m.current.target) + 1)
      else if (e.key === 'ArrowLeft') go(Math.round(m.current.target) - 1)
      else return
      e.preventDefault()
    }
    const el = root.current!
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  })

  // Drag a page to turn it. Grabbing the right half turns forward, the left half back.
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest('a, button, input')) return
    m.current.drag = { x: e.clientX, start: Math.round(m.current.target), t: performance.now(), vx: 0, moved: false }
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = m.current
    const d = s.drag
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved) {
      if (Math.abs(dx) < 6) return
      d.moved = true
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        // Capture can fail for synthetic pointers; dragging still works without it.
      }
    }
    const now = performance.now()
    const f = clamp(d.start - dx / (s.pw * 1.6), Math.max(0, d.start - 1), Math.min(L, d.start + 1))
    d.vx = (f - s.f) / Math.max(0.008, (now - d.t) / 1000)
    d.t = now
    s.f = f
    s.v = 0
  }
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const s = m.current
    const d = s.drag
    s.drag = null
    if (!d) return
    if (d.moved) {
      const proj = s.f + clamp(d.vx * 0.15, -0.6, 0.6)
      s.target = clamp(Math.round(proj), Math.max(0, d.start - 1), Math.min(L, d.start + 1))
      s.v = d.vx
      return
    }
    // A plain click on the outer edge of a page turns it.
    const r = book.current!.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    if (x > 0.72) go(d.start + 1)
    else if (x < 0.28) go(d.start - 1)
  }

  const visible = (face: number) => face === spread * 2 || face === spread * 2 - 1

  return (
    <main ref={root} className={`fo${narrow ? ' is-narrow' : ''}`} style={{ '--spreads': L } as CSSProperties}>
      <header className="fo-top">
        <nav className="fo-links" aria-label="Main">
          {LINKS.map(([t, h]) => <a key={t} href={h}>{t}</a>)}
        </nav>
        <h1 className="fo-mark"><a href="/">{NAME}</a><span className="fo-sr">, {ROLE.toLowerCase()} in {CITY}</span></h1>
        <form className={`fo-sub${sub ? ` is-${sub}` : ''}`} onSubmit={subscribe} noValidate>
          {sub === 'ok' ? (
            <p role="status">You're on the list ✓</p>
          ) : (
            <>
              <label className="fo-sr" htmlFor="fo-mail">Email for the newsletter</label>
              <input id="fo-mail" type="email" placeholder="Newsletter" value={mail} onChange={(e) => { setMail(e.target.value); setSub('') }} aria-invalid={sub === 'bad'} />
              <button type="submit" aria-label="Subscribe">→</button>
            </>
          )}
        </form>
      </header>

      {narrow ? (
        <div className="fo-deck" onScroll={(e) => {
          const d = e.currentTarget
          const mid = d.scrollLeft + d.clientWidth / 2
          let i = 0
          Array.from(d.children).forEach((c, k) => {
            const el = c as HTMLElement
            if (el.offsetLeft <= mid) i = k
          })
          setSpread(Math.floor((i + 1) / 2))
        }}>
          {faces}
        </div>
      ) : (
        <div className="fo-stage">
          <button className="fo-arrow is-prev" type="button" onClick={() => go(spread - 1)} disabled={spread === 0} aria-label="Previous page">←</button>
          <div ref={book} className="fo-book-3d" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onDragStart={(e) => e.preventDefault()} role="group" aria-roledescription="magazine" aria-label={`${SPREADS[spread]}. Use the arrow keys to turn the pages.`}>
            <div className="fo-stack is-l" aria-hidden="true" />
            <div className="fo-stack is-r" aria-hidden="true" />
            <div className="fo-cast is-l" aria-hidden="true" />
            <div className="fo-cast is-r" aria-hidden="true" />
            {Array.from({ length: L }, (_, i) => (
              <div key={i} ref={(el) => { leaves.current[i] = el }} className="fo-leaf">
                <div className="fo-face is-front" inert={!visible(i * 2)}>{faces[i * 2]}</div>
                <div className="fo-face is-back" inert={!visible(i * 2 + 1)}>{faces[i * 2 + 1]}</div>
                <div className="fo-bend" aria-hidden="true" inert><Bend front={faces[i * 2]} back={faces[i * 2 + 1]} /></div>
              </div>
            ))}
            {spread < L && <span className="fo-corner" aria-hidden="true" />}
          </div>
          <button className="fo-arrow is-next" type="button" onClick={() => go(spread + 1)} disabled={spread === L} aria-label="Next page">→</button>
        </div>
      )}

      <footer className="fo-bottom">
        <div className="fo-save">
          <button type="button" className={`fo-heart${saved ? ' is-on' : ''}`} aria-pressed={saved} aria-label="Save this issue" onClick={() => { setSaved((v) => !v); if (!saved) setBurst((b) => b + 1) }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
            {burst > 0 && <span className="fo-burst" key={burst} aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--a': `${i * 45}deg` } as CSSProperties} />)}</span>}
          </button>
          <div>
            <p className="fo-save-t">{SPREADS[spread]}</p>
            <p className="fo-save-s">{ISSUE} · {saved ? 'Saved' : 'Save issue'}</p>
          </div>
        </div>
        <div className="fo-dots" role="tablist" aria-label="Spreads">
          {SPREADS.map((t, i) => (
            <button key={t} type="button" role="tab" aria-selected={spread === i} aria-label={t} onClick={() => go(i)} />
          ))}
        </div>
        <a className="fo-insta" href="#">Instagram</a>
      </footer>
      <p className="fo-sr" aria-live="polite">{SPREADS[spread]}{copied === 'ok' ? '. Email copied.' : ''}</p>
    </main>
  )
}
```

### `src/style.css`

```css
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: #ebe5c9; -webkit-font-smoothing: antialiased; }
button, input { font: inherit; color: inherit; }
a { color: inherit; }
:focus-visible { outline: 2px solid #2340d8; outline-offset: 3px; border-radius: 4px; }

.fo { --bg: #ebe5c9; --blue: #2340d8; --paper: #fbf8ee; --ink: #1f1c16; --mute: rgb(31 28 22 / 0.58); --ease: cubic-bezier(0.22, 1, 0.36, 1); --spring: cubic-bezier(0.34, 1.56, 0.64, 1); --gut: clamp(16px, 3vw, 44px);
  --pw: min(29vw, calc((100svh - 230px) * 0.75), 460px);
  position: relative; height: 100vh; height: 100svh; min-height: 640px; overflow: hidden; overflow: clip; isolation: isolate; background: var(--bg); color: var(--blue);
  font-family: 'Literata Variable', Literata, Georgia, serif; font-optical-sizing: auto; font-size: 14px; line-height: 1.45; }
.fo::before { content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none; background: radial-gradient(60% 55% at 50% 52%, rgb(255 252 236 / 0.7), transparent 75%); }

/* Header: links, script-ish wordmark, newsletter field */
.fo-top { position: absolute; z-index: 10; top: 0; left: 0; right: 0; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; padding: 20px var(--gut); animation: fo-fade 1s 0.2s var(--ease) backwards; }
.fo-links { display: flex; gap: clamp(12px, 2vw, 28px); }
.fo-links a { font-size: 14px; text-decoration: none; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size 0.4s var(--ease); }
.fo-links a:hover { background-size: 100% 1px; }
.fo-mark { margin: 0; font-size: clamp(24px, 2.6vw, 36px); font-weight: 500; font-style: italic; letter-spacing: -0.03em; line-height: 1; }
.fo-mark a { text-decoration: none; display: inline-block; transition: transform 0.6s var(--spring); }
.fo-mark a:hover { transform: rotate(-3deg) scale(1.04); }
.fo-sub { justify-self: end; display: flex; align-items: center; gap: 8px; width: min(220px, 100%); padding-bottom: 4px; border-bottom: 1px solid currentColor; transition: border-color 0.3s; }
.fo-sub input { flex: 1; min-width: 0; border: 0; background: none; outline: none; font-size: 14px; color: var(--blue); }
.fo-sub input::placeholder { color: var(--blue); opacity: 0.8; }
.fo-sub button { border: 0; background: none; font-size: 16px; cursor: pointer; transition: transform 0.4s var(--spring); }
.fo-sub button:hover { transform: translateX(4px); }
.fo-sub.is-bad { border-color: #d6392c; animation: fo-shake 0.4s; }
.fo-sub p { margin: 0; font-size: 14px; animation: fo-fade 0.5s; }
@keyframes fo-shake { 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }

/* Book: five leaves hinged on the spine, turned by one reading position */
.fo-stage { position: absolute; inset: 70px 0 70px; display: flex; align-items: center; justify-content: center; }
.fo-book-3d { position: relative; width: calc(var(--pw) * 2); height: calc(var(--pw) * 1.33); transform: translateX(calc(var(--shift, -0.5) * 50%)); touch-action: pan-y; user-select: none; -webkit-user-select: none; cursor: grab; animation: fo-in 1.2s 0.1s var(--ease) backwards; }
.fo-book-3d:active { cursor: grabbing; }
@keyframes fo-in { from { opacity: 0; transform: translateX(-25%) translateY(30px) rotate(-4deg); } }
.fo-book-3d img { pointer-events: none; -webkit-user-drag: none; user-select: none; }
/* Shadows: one under each stack of pages, plus the shadow a turning page casts on the page below. */
.fo-stack { position: absolute; top: 1.5%; bottom: -1.5%; width: 50%; border-radius: 4px; box-shadow: 0 40px 60px -30px rgb(40 30 10 / 0.5), 0 8px 18px -10px rgb(40 30 10 / 0.25); pointer-events: none; }
.fo-stack.is-l { left: 0; opacity: var(--stack-l, 0); }
.fo-stack.is-r { left: 50%; opacity: var(--stack-r, 1); }
.fo-cast { position: absolute; z-index: 8; top: 0; bottom: 0; pointer-events: none; }
.fo-cast.is-r { left: 50%; width: calc(50% * (1 - var(--pt, 0) * 0.85)); opacity: var(--cast-r, 0); background: linear-gradient(90deg, rgb(30 20 0 / 0.42), rgb(30 20 0 / 0.12) 55%, transparent); }
.fo-cast.is-l { right: 50%; width: calc(50% * (0.15 + var(--pt, 0) * 0.85)); opacity: var(--cast-l, 0); background: linear-gradient(270deg, rgb(30 20 0 / 0.42), rgb(30 20 0 / 0.12) 55%, transparent); }
.fo-leaf { position: absolute; left: 50%; top: 0; width: 50%; height: 100%; transform-origin: 0 50%; transform-style: preserve-3d; will-change: transform; }
.fo-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.fo-face.is-back { transform: rotateY(180deg); }
/* The curling copy of a leaf, shown only mid-turn: hinged strips of the front and back page */
.fo-bend { position: absolute; inset: 0; display: none; transform-style: preserve-3d; }
.fo-leaf.is-turning .fo-bend { display: block; }
.fo-leaf.is-turning > .fo-face { visibility: hidden; }
.fo-strip { position: absolute; left: 0; top: 0; width: calc(100% / 6); height: 100%; transform-origin: 0 50%; transform-style: preserve-3d; }
.fo-strip .fo-strip { left: 100%; width: 100%; }
.fo-strip-f, .fo-strip-b { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; clip-path: inset(0 -1px 0 0); }
.fo-strip-b { clip-path: inset(0 0 0 -1px); }
.fo-strip-b { transform: rotateY(180deg); }
.fo-strip-c { position: absolute; top: 0; width: 600%; height: 100%; }
.fo-strip-f::after, .fo-strip-b::after { content: ''; position: absolute; inset: 0 -1px; pointer-events: none; background: linear-gradient(90deg, rgb(30 22 0 / var(--d0, 0)), rgb(30 22 0 / var(--d1, 0))); }
.fo-strip-b::after { background: linear-gradient(270deg, rgb(30 22 0 / var(--d0, 0)), rgb(30 22 0 / var(--d1, 0))); }
.fo-arrow { position: absolute; top: 50%; z-index: 5; width: 54px; height: 54px; margin-top: -27px; border: 0; background: none; font-size: 30px; line-height: 1; color: var(--blue); cursor: pointer; transition: transform 0.4s var(--spring), opacity 0.3s; }
.fo-arrow.is-prev { left: var(--gut); }
.fo-arrow.is-next { right: var(--gut); }
.fo-arrow:hover:not(:disabled) { transform: translateX(var(--dx, 6px)); }
.fo-arrow.is-prev:hover:not(:disabled) { --dx: -6px; }
.fo-arrow:disabled { opacity: 0.25; cursor: default; }
.fo-corner { position: absolute; right: 0; bottom: 0; z-index: 30; width: 28px; height: 28px; background: linear-gradient(135deg, transparent 50%, #e2dcc4 50%, #f6f2e2 70%, #d8d1b6 100%); box-shadow: -3px -3px 6px rgb(40 30 10 / 0.12); pointer-events: none; transition: width 0.4s var(--spring), height 0.4s var(--spring); }
.fo-book-3d:hover .fo-corner { width: 46px; height: 46px; }

/* Pages: sized with container units so the type scales with the page */
.fo-page { position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--paper); color: var(--ink); container-type: size; }
.fo-page-in { position: relative; width: 100%; height: 100%; padding: 9cqw 8cqw 10cqw; font-size: 3.4cqw; line-height: 1.5; }
.fo-page.is-r { border-radius: 0 3px 3px 0; box-shadow: inset 14px 0 18px -14px rgb(40 30 10 / 0.35); }
.fo-page.is-l { border-radius: 3px 0 0 3px; box-shadow: inset -14px 0 18px -14px rgb(40 30 10 / 0.35); }
.fo-page.is-bleed .fo-page-in { padding: 0; }
.fo-shade { position: absolute; inset: 0; pointer-events: none; opacity: calc(var(--turn, 0) * 0.55); background: linear-gradient(90deg, rgb(30 20 0 / 0.35), transparent 60%); }
.fo-page.is-l .fo-shade { background: linear-gradient(270deg, rgb(30 20 0 / 0.35), transparent 60%); }
.fo-page p { margin: 0 0 3.2cqw; }
.fo-run, .fo-folio { position: absolute; left: 8cqw; right: 8cqw; margin: 0 !important; font-size: 2.3cqw; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue); }
.fo-run { top: 4.5cqw; }
.fo-folio { bottom: 4.5cqw; }
.fo-page.is-r .fo-run, .fo-page.is-r .fo-folio { text-align: right; }
.fo-kicker { font-size: 2.5cqw; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); }
.fo-kicker.is-small { margin-top: 5cqw !important; }
.fo-h { margin: 0 0 4cqw; font-size: 6.6cqw; font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; }
.fo-note { position: absolute; bottom: 11cqw; left: 8cqw; right: 8cqw; font-size: 2.6cqw; font-style: italic; color: var(--mute); }

.fo-cover { background: var(--blue); color: #fff; }
.fo-open { background: var(--paper); }
.fo-cover-img { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 66%; object-fit: cover; object-position: 50% 30%; }
.fo-cover-top { position: absolute; top: 5cqw; left: 6cqw; right: 6cqw; display: flex; justify-content: space-between; font-size: 2.6cqw; letter-spacing: 0.1em; text-transform: uppercase; }
.fo-mast { position: absolute; top: 9cqw; left: 4cqw; margin: 0; font-size: 33cqw; font-weight: 800; line-height: 0.8; letter-spacing: -0.06em; color: #fff; }
.fo-cover-sub { position: absolute; left: 6cqw; bottom: 14cqw; margin: 0 !important; font-size: 5.6cqw; font-style: italic; line-height: 1.1; text-shadow: 0 1px 12px rgb(0 0 0 / 0.25); }
.fo-cover-by { position: absolute; left: 6cqw; bottom: 6cqw; margin: 0 !important; font-size: 2.6cqw; letter-spacing: 0.12em; text-transform: uppercase; }
.fo-desk .fo-sign { font-size: 6cqw; font-style: italic; color: var(--blue); }
.fo-spot { position: absolute; right: 4cqw; bottom: 9cqw; width: 30cqw; mix-blend-mode: multiply; }
.fo-chip { display: inline-flex; align-items: center; gap: 2cqw; padding: 1.4cqw 3cqw; border: 1px solid var(--blue); border-radius: 99px; color: var(--blue); font-size: 2.6cqw; }
.fo-chip i { width: 1.8cqw; height: 1.8cqw; border-radius: 50%; background: #2bb36a; animation: fo-blink 1.6s ease-in-out infinite; }
@keyframes fo-blink { 50% { opacity: 0.3; } }
.fo-desk .fo-chip { position: absolute; left: 8cqw; bottom: 11cqw; }
.fo-toc ol { margin: 6cqw 0 0; padding: 0; list-style: none; border-top: 1px solid rgb(35 64 216 / 0.25); }
.fo-toc li { border-bottom: 1px solid rgb(35 64 216 / 0.25); }
.fo-toc button { display: grid; grid-template-columns: 9cqw 1fr auto; align-items: baseline; gap: 2cqw; width: 100%; padding: 3cqw 0; border: 0; background: none; text-align: left; cursor: pointer; transition: padding 0.4s var(--ease), color 0.3s; }
.fo-toc button:hover { padding-left: 2cqw; color: var(--blue); }
.fo-toc-n { font-size: 2.6cqw; color: var(--blue); }
.fo-toc-t { font-size: 5.2cqw; letter-spacing: -0.02em; }
.fo-toc-k { font-size: 2.4cqw; font-style: italic; color: var(--mute); }
.fo-open img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.fo-open-title { position: absolute; left: 6cqw; right: 6cqw; bottom: 6cqw; padding: 5cqw; background: var(--paper); }
.fo-open-title h3 { margin: 0; font-size: 9cqw; font-weight: 500; font-style: italic; line-height: 1; letter-spacing: -0.03em; color: var(--blue); }
.fo-lede { font-size: 4cqw; line-height: 1.5; }
.fo-drop { float: left; margin: 1cqw 2cqw 0 0; font-size: 15cqw; line-height: 0.8; font-weight: 600; color: var(--blue); }
.fo-essay blockquote { margin: 4cqw 0; padding: 3cqw 0; border-top: 1px solid var(--blue); border-bottom: 1px solid var(--blue); font-size: 5.4cqw; font-style: italic; line-height: 1.2; color: var(--blue); }
.fo-link { display: inline-flex; gap: 2cqw; font-size: 3.2cqw; color: var(--blue); text-decoration: none; border-bottom: 1px solid currentColor; }
.fo-link span { transition: transform 0.4s var(--spring); }
.fo-link:hover span { transform: translateX(1.5cqw); }
.fo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3cqw; margin-top: 4cqw; }
.fo-grid figure { margin: 0; }
.fo-grid img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; background: #eee8d4; }
.fo-grid .is-wide { grid-column: span 2; }
.fo-grid .is-wide img { aspect-ratio: 2.1; object-position: 50% 40%; }
.fo-grid figcaption { margin-top: 1cqw; font-size: 2.3cqw; font-style: italic; color: var(--mute); }
.fo-book-row { display: grid; grid-template-columns: 38cqw 1fr; gap: 5cqw; align-items: start; margin-top: 6cqw; }
.fo-book-cover { position: relative; aspect-ratio: 0.68; overflow: hidden; box-shadow: 4px 6px 0 rgb(31 28 22 / 0.15), 0 20px 30px -18px rgb(31 28 22 / 0.5); transform: rotate(-3deg); transition: transform 0.6s var(--spring); }
.fo-book-cover:hover { transform: rotate(0) scale(1.03); }
.fo-book-cover img { width: 100%; height: 100%; object-fit: cover; }
.fo-book-cover span { position: absolute; left: 4cqw; top: 4cqw; font-size: 6cqw; font-style: italic; line-height: 1; color: #fff; }
.fo-out { font-size: 2.6cqw; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue); }
.fo-btn { position: relative; isolation: isolate; overflow: hidden; display: inline-block; padding: 2.4cqw 4cqw; border: 1px solid var(--blue); border-radius: 99px; background: var(--blue); color: #fff; font-size: 2.8cqw; text-decoration: none; transition: color 0.35s var(--ease); }
.fo-btn::before { content: ''; position: absolute; inset: 0; z-index: -1; background: var(--paper); transform: translateY(101%); transition: transform 0.45s var(--ease); }
.fo-btn:hover { color: var(--blue); }
.fo-btn:hover::before { transform: none; }
.fo-btn.is-line { background: none; color: var(--blue); }
.fo-btn.is-line::before { background: var(--blue); }
.fo-btn.is-line:hover { color: #fff; }
.fo-press figure { margin: 4cqw 0 0; }
.fo-press blockquote { margin: 0; font-size: 4.8cqw; font-style: italic; line-height: 1.25; }
.fo-press figcaption { margin-top: 1.2cqw; font-size: 2.4cqw; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue); }
.fo-clients { font-size: 3cqw; color: var(--mute); }
.fo-copy { display: flex; justify-content: space-between; align-items: baseline; gap: 3cqw; width: 100%; margin: 5cqw 0 4cqw; padding: 3.4cqw 0; border: 0; border-top: 1px solid var(--blue); border-bottom: 1px solid var(--blue); background: none; text-align: left; font-size: 4.2cqw; cursor: pointer; }
.fo-copy em { font-size: 2.5cqw; font-style: normal; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue); }
.fo-copy:hover span { color: var(--blue); }
.fo-copy.is-ok em { color: #1f8f50; }
.fo-copy.is-fail span { user-select: all; }
.fo-row { display: flex; flex-wrap: wrap; gap: 2cqw; }
.fo-contact .fo-chip { margin-top: 1cqw; }
.fo-socials { position: absolute; left: 8cqw; bottom: 11cqw; font-size: 3cqw; }
.fo-socials a { color: var(--blue); }
.fo-page.is-bleed .fo-back { display: grid; align-content: space-between; padding: 9cqw 8cqw; background: var(--blue); color: #fff; }
.fo-back-big { font-size: 13cqw; font-style: italic; line-height: 0.95; letter-spacing: -0.04em; }
.fo-back-small { font-size: 2.8cqw; opacity: 0.8; }
.fo-barcode { display: flex; gap: 0.8cqw; height: 12cqw; padding: 2cqw; width: max-content; background: #fff; }
.fo-barcode i { background: #111; }
.fo-back-price { font-size: 2.6cqw; letter-spacing: 0.12em; text-transform: uppercase; }

/* Phones: the pages become a swipeable row */
.fo-deck { position: absolute; inset: 104px 0 92px; display: flex; gap: 16px; padding: 0 11vw; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; align-items: center; }
.fo-deck::-webkit-scrollbar { display: none; }
.fo-deck .fo-page { flex: none; width: min(78vw, calc((100svh - 230px) * 0.75)); height: auto; aspect-ratio: 3 / 4; scroll-snap-align: center; border-radius: 3px; box-shadow: 0 24px 40px -26px rgb(40 30 10 / 0.5); }

/* Footer: save, page dots, Instagram */
.fo-bottom { position: absolute; z-index: 10; left: var(--gut); right: var(--gut); bottom: 22px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; animation: fo-fade 1s 0.4s var(--ease) backwards; }
.fo-save { display: flex; align-items: center; gap: 12px; min-width: 0; }
.fo-save p { margin: 0; }
.fo-save-t { font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fo-save-s { font-size: 12px; opacity: 0.8; }
.fo-heart { position: relative; width: 30px; height: 30px; padding: 0; border: 0; background: none; cursor: pointer; flex: none; }
.fo-heart svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.6; transition: transform 0.45s var(--spring), fill 0.2s; }
.fo-heart:hover svg { transform: scale(1.12); }
.fo-heart.is-on svg { fill: currentColor; animation: fo-pop 0.5s var(--spring); }
@keyframes fo-pop { 40% { transform: scale(1.4); } }
.fo-burst i { position: absolute; left: 50%; top: 50%; width: 4px; height: 4px; margin: -2px; border-radius: 50%; background: var(--blue); animation: fo-burst 0.6s var(--ease) forwards; }
@keyframes fo-burst { to { transform: rotate(var(--a)) translateY(-22px) scale(0.3); opacity: 0; } }
.fo-dots { display: flex; gap: 14px; }
.fo-dots button { width: 18px; height: 18px; padding: 0; border: 1.5px solid currentColor; border-radius: 50%; background: none; cursor: pointer; transition: background-color 0.3s, transform 0.4s var(--spring); }
.fo-dots button:hover { transform: scale(1.15); }
.fo-dots button[aria-selected='true'] { background: currentColor; }
.fo-insta { justify-self: end; font-size: 14px; letter-spacing: 0.04em; text-transform: uppercase; text-underline-offset: 4px; }

.fo-sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes fo-fade { from { opacity: 0; } }

@media (max-width: 900px) { .fo-links { display: none; } .fo-top { grid-template-columns: 1fr auto 1fr; } }
@media (max-width: 720px) {
  .fo-top { grid-template-columns: 1fr; justify-items: center; gap: 10px; padding-top: 16px; }
  .fo-sub { justify-self: center; }
  .fo-bottom { grid-template-columns: 1fr auto; }
  .fo-dots { order: -1; grid-column: span 2; justify-self: center; gap: 10px; }
  .fo-dots button { width: 12px; height: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .fo *, .fo *::before, .fo *::after { animation: none !important; transition-duration: 0.01ms !important; }
}
```

## Build / run

```
npm create vite@latest portfolio-folio -- --template react-ts
cd portfolio-folio
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/literata@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files and the assets, then:

```
npm run dev
```

`src/main.tsx` mounts `<App />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- No APIs, keys, accounts, or payment code.
- The newsletter form only validates locally; connect it to your email provider.
- Links point to `#` placeholders.
- The writer, publications and books are fictional.
