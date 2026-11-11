<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Studio — Pricing hero

Studio is a light pricing section for a fictional design studio, Northside, selling subscriptions and sprints. A huge two-tone `Plans & Pricing` sits beside a Monthly / Quarterly switch on a soft grey page with drifting lilac and peach light and grain. A white A La Carte card and a dark Prix Fixe card each hold a panel with the name, a status pill, a two-tone line, the price, a button and a small testimonial, with two-column features below; a wide Sprints card has a big two-tone line, a one-time price, a `Fast delivery (7 days)` switch and a button. The signature moment is live availability: five dots show the A La Carte spots for next month, `Reserve for Dec` fills the next dot with a pop, turns the button green with a drawn check and offers `Undo`; when the last spot goes, the pill turns red with `Fully booked until` the 3rd of the month after, and the button becomes `Join the waitlist`. Month names come from today’s date. Document title: `Studio — Pricing Hero — Oversight Supply`.

Rebuild it as a full-screen pricing hero section. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Do not reformat, rename, or restyle them. Every visible string, number, colour, and timing in those files is the copy. Do not paraphrase it.

## Stack & dependencies

React 19, TypeScript, and Vite.

Fonts, imported in `src/main.tsx`:

- `@fontsource-variable/schibsted-grotesk`

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/schibsted-grotesk@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Max 1100px. Nav: wordmark with a split-circle mark, links Work / Services / Pricing, and a dark `Let’s talk` pill. Head: the headline (first line grey) and the frosted billing switch. Grid: A La Carte and Prix Fixe side by side, Sprints across the full width.

## Interactions & animation

Prices come from two pure helpers, `subscription(price, billing)` and `sprintPrice(fast)`. The billing pill slides with a soft spring and prices roll digit by digit; the per-month label and the turn-around pill swap with a short rise; the fast-delivery switch slides and squashes; reserving pops the next dot, swaps the button to `Reserved` with a drawn check for 1.8s and shows `Undo`; at five of five the pill and button change as above, and the waitlist click confirms the same way; the sprint button confirms with `Sprint requested`. Buttons press down; the background light drifts slowly. Every animated element also respects `prefers-reduced-motion`: the last rule in the stylesheet removes transitions and animations (values still change, instantly), and the JavaScript skips the Web Animations and hover effects it would otherwise play.

## Responsive behaviour

Below 960px the cards stack and the Sprints panel stacks its price under the copy. Below 640px the nav links hide, the switch moves under the headline, testimonials go full width under the price and features become one column. Tested at 375px with no horizontal scroll.

## Accessibility & robustness

Every input is a real form control (range, number field, radio group) with a visible label, so arrow keys and screen readers work; links have visible labels and the current page uses `aria-current`. Every digit of the price sits in its own fixed-width `tabular-nums` column, and the plan and per-unit price are anchored to the right edge, so nothing around the price shifts as it changes. Focus rings are drawn with `:focus-visible`. Decorative layers are `aria-hidden`. Billing is a radio group and fast delivery a checkbox with `role="switch"`. Reserve and sprint buttons are real buttons whose labels change to confirm. Each offer is a labelled `article` and testimonials are `figure`s with captions. A polite live region announces how many spots are left or when it is fully booked.

## Performance notes

DOM and CSS only. Background light is two soft radial gradients moved with transforms. Every animation is transform or opacity.

## Assets

No images. Avatars are initials on gradients; marks and icons are inline SVG; the grain is an inline SVG data URI.

## Putting it in an existing site

The section is the `<main>` returned by `App`. Its classes all share one short prefix, so they will not collide with your styles. The first rules in the stylesheet (`*`, `html, body`, `button`, `a`, `:focus-visible`) are page-level resets: keep them on a standalone page, drop or scope them when the hero goes inside a page that already has its own. Links point to `#` or `/`; change them to your routes. Month names use `toLocaleString` with the locale in `PRICING`.

To drop it into an existing React site, copy the files under `src/` (except `main.tsx`) and `src/assets/` into one folder such as `components/pricing-studio/`, install the dependencies above, move the font imports from `main.tsx` into your app entry, and render the default export of `App.tsx` as the first thing on the page. In Next.js, add `'use client'` at the top of `App.tsx`.

## Full source code

Create these files exactly. `index.html` replaces the Vite template’s `index.html`. The other files sit under `src/`. Delete unused Vite template files (`App.css`, `index.css`, `vite.svg`). Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#ebebea" />
    <title>Studio — Pricing Hero — Oversight Supply</title>
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
import '@fontsource-variable/schibsted-grotesk'
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
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

/* ─────────────────────────────────────────────────────────────
   PRICING — a design studio’s subscriptions and sprints.
   ───────────────────────────────────────────────────────────── */
type Billing = 'monthly' | 'quarterly'
type Voice = { name: string; role: string; quote: string; hue: number }

const PRICING = {
  locale: 'en-US',
  currency: 'USD',
  quarterlyOff: 0.1,
  spots: { total: 5, booked: 3 },
  alacarte: {
    name: 'A La Carte',
    lines: ['5 spots monthly.', 'First come, first serve.'],
    price: 6_000,
    features: ['Full-service creative', 'Async + Slack', 'Monthly consulting call', 'Updates every 2 days', 'Simple, monthly subscription', 'Cancel anytime', 'Scales with your needs', '50 design hours per month'],
    voice: { name: 'Ines Varga', role: 'Founder, Pilotwave', quote: '“The rebrand landed in two weeks, flat.”', hue: 18 } as Voice,
  },
  prixfixe: {
    name: 'Prix Fixe',
    pill: 'Limited availability',
    lines: ['For brands ready to go', 'zero to one & beyond.'],
    price: 15_000,
    cta: 'Book an intro call',
    features: ['Fully managed project', 'Access our entire team', 'Creative strategy', 'Updates every 2 days', 'Weekly consulting call', 'Cancel anytime', 'Everything included'],
    voice: { name: 'Theo Marsh', role: 'COO, Halden', quote: '“Like hiring a whole studio overnight.”', hue: 262 } as Voice,
  },
  sprint: {
    name: 'Sprints',
    lines: ['Great for those who', 'want quality + speed.'],
    price: 10_000,
    fast: { price: 2_500, label: 'Fast delivery (7 days)' },
    turnaround: { normal: '2 week turn-around', fast: '1 week turn-around' },
  },
}

const STUDIO = 'Northside'

/* ───────────────────────── logic ───────────────────────── */
/** Monthly price of a subscription on the chosen billing. */
export const subscription = (price: number, billing: Billing) => Math.round(price * (billing === 'quarterly' ? 1 - PRICING.quarterlyOff : 1))
/** One-time sprint price. */
export const sprintPrice = (fast: boolean) => PRICING.sprint.price + (fast ? PRICING.sprint.fast.price : 0)

const money = new Intl.NumberFormat(PRICING.locale, { maximumFractionDigits: 0 })
const monthName = (offset: number, style: 'long' | 'short' = 'long') => {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() + offset)
  return d.toLocaleString(PRICING.locale, { month: style })
}
const EASE = 'cubic-bezier(.2,.8,.2,1)'

function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(query).matches)
  useEffect(() => {
    const m = matchMedia(query)
    const on = () => setReduced(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return reduced
}

/* ───────────────────────── rolling number ───────────────────────── */
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
function Roll({ value }: { value: number }) {
  const reduced = useReducedMotion()
  const row = useRef<HTMLSpanElement>(null)
  const prev = useRef(new Map<string, number>())
  const chars = useMemo(() => {
    const s = money.format(value)
    return [...s].map((ch, i) => ({ ch, k: (/\d/.test(ch) ? 'd' : 'g') + (s.length - i) }))
  }, [value])
  useLayoutEffect(() => {
    const el = row.current
    if (!el) return
    const next = new Map<string, number>()
    const first = prev.current.size === 0
    el.querySelectorAll<HTMLElement>('[data-k]').forEach((n) => {
      const k = n.dataset.k!
      const x = n.offsetLeft
      next.set(k, x)
      if (first || reduced) return
      const was = prev.current.get(k)
      if (was === undefined) n.animate([{ opacity: 0, transform: 'translateY(40%)' }, { opacity: 1, transform: 'none' }], { duration: 340, easing: EASE })
      else if (was !== x) n.animate([{ transform: `translateX(${was - x}px)` }, { transform: 'none' }], { duration: 400, easing: EASE })
    })
    prev.current = next
  }, [chars, reduced])
  return (
    <span className="sd-roll" ref={row} aria-hidden="true">
      {chars.map((c, i) =>
        /\d/.test(c.ch) ? (
          <span key={c.k} data-k={c.k} className="sd-roll-col" style={{ '--n': i } as CSSProperties}>
            <span className="sd-roll-sizer">0</span>
            <span className="sd-roll-strip" style={{ transform: `translateY(${-Number(c.ch) * 10}%)` }}>
              {DIGITS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={c.k} data-k={c.k} className="sd-roll-sym">
            {c.ch}
          </span>
        ),
      )}
    </span>
  )
}

/* ───────────────────────── small pieces ───────────────────────── */
const Arrow = () => (
  <svg className="sd-arrow" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function VoiceCard({ v }: { v: Voice }) {
  const initials = v.name
    .split(' ')
    .map((w) => w[0])
    .join('')
  return (
    <figure className="sd-voice">
      <div className="sd-voice-head">
        <span className="sd-avatar" style={{ '--h': v.hue } as CSSProperties} aria-hidden="true">
          {initials}
        </span>
        <figcaption>
          {v.name}
          <span>{v.role}</span>
        </figcaption>
        <svg className="sd-voice-mark" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2 3h4v4H2zM10 9h4v4h-4zM6 7h4v2H6z" />
        </svg>
      </div>
      <blockquote>{v.quote}</blockquote>
    </figure>
  )
}

function Features({ items }: { items: string[] }) {
  return (
    <ul className="sd-feats">
      {items.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  )
}

/* ───────────────────────── section ───────────────────────── */
export default function App() {
  const uid = useId()
  const [billing, setBilling] = useState<Billing>('monthly')
  const [booked, setBooked] = useState(PRICING.spots.booked)
  const [justBooked, setJustBooked] = useState<number | null>(null)
  const [ack, setAck] = useState<'idle' | 'done'>('idle')
  const [fast, setFast] = useState(false)
  const [sprintAck, setSprintAck] = useState(false)
  const total = PRICING.spots.total
  const left = total - booked
  const full = left <= 0
  const next = monthName(1)
  const after = monthName(2)

  useEffect(() => {
    if (ack === 'idle') return
    const t = setTimeout(() => setAck('idle'), 1800)
    return () => clearTimeout(t)
  }, [ack])
  useEffect(() => {
    if (!sprintAck) return
    const t = setTimeout(() => setSprintAck(false), 1800)
    return () => clearTimeout(t)
  }, [sprintAck])

  const reserve = () => {
    if (full) {
      setAck('done')
      return
    }
    setJustBooked(booked)
    setBooked((b) => b + 1)
    setAck('done')
  }
  // A booking only counts as "just booked" for its acknowledgement; later waitlist clicks are not bookings.
  useEffect(() => {
    if (ack === 'idle' && full) setJustBooked(null)
  }, [ack, full])
  const undo = () => {
    setBooked((b) => Math.max(PRICING.spots.booked, b - 1))
    setJustBooked(null)
    setAck('idle')
  }

  const a = PRICING.alacarte
  const p = PRICING.prixfixe
  const s = PRICING.sprint
  const pct = Math.round(PRICING.quarterlyOff * 100)
  const per = billing === 'quarterly' ? '/mo, billed quarterly' : '/mo'

  const [announce, setAnnounce] = useState('')
  useEffect(() => {
    setAnnounce(full ? `A La Carte is fully booked until ${after} 3rd.` : `${left} of ${total} A La Carte spots left for ${next}.`)
  }, [left, full, total, next, after])

  return (
    <main className="sd">
      <div className="sd-bg" aria-hidden="true">
        <span className="is-a" />
        <span className="is-b" />
      </div>
      <header className="sd-nav">
        <a href="#" className="sd-brand">
          <span className="sd-brand-mark" aria-hidden="true" />
          {STUDIO}
        </a>
        <nav className="sd-links" aria-label="Main">
          <a href="#">Work</a>
          <a href="#">Services</a>
          <a href="#" aria-current="page">
            Pricing
          </a>
        </nav>
        <a href="#" className="sd-nav-cta">
          Let’s talk
        </a>
      </header>

      <div className="sd-head">
        <h1 className="sd-title">
          <span>Plans &amp;</span> Pricing
        </h1>
        <fieldset className="sd-seg" style={{ '--i': billing === 'quarterly' ? 1 : 0 } as CSSProperties}>
          <legend className="sd-sr">Billing</legend>
          <span className="sd-seg-pill" aria-hidden="true" />
          {(['monthly', 'quarterly'] as Billing[]).map((b) => (
            <label key={b} className={`sd-seg-opt${billing === b ? ' is-on' : ''}`}>
              <input type="radio" name={`${uid}-b`} checked={billing === b} onChange={() => setBilling(b)} />
              {b === 'monthly' ? 'Monthly' : 'Quarterly'}
              {b === 'quarterly' && <em>−{pct}%</em>}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="sd-grid">
        {/* A La Carte */}
        <article className="sd-card" aria-labelledby={`${uid}-a`}>
          <div className="sd-panel">
            <div className="sd-panel-head">
              <h2 id={`${uid}-a`}>{a.name}</h2>
              <span className={`sd-pill${full ? ' is-full' : ' is-open'}`}>
                <span key={full ? 'full' : `left-${left}`} className="sd-swap">
                  {full ? `Fully booked until ${monthName(2, 'short')} 3rd` : `${left} of ${total} spots left in ${next}`}
                </span>
              </span>
            </div>
            <div className="sd-spots" aria-hidden="true">
              {Array.from({ length: total }, (_, i) => (
                <span key={i} className={`sd-spot${i < booked ? ' is-booked' : ''}${i === justBooked ? ' is-new' : ''}`} />
              ))}
            </div>
            <p className="sd-lines">
              {a.lines[0]} <span>{a.lines[1]}</span>
            </p>
            <div className="sd-panel-foot">
              <div className="sd-buy">
                <p className="sd-price">
                  <span className="sd-cur">$</span>
                  <Roll value={subscription(a.price, billing)} />
                  <span className="sd-per">
                    <span key={billing} className="sd-swap">
                      {per}
                    </span>
                  </span>
                </p>
                <span className="sd-sr">{`$${money.format(subscription(a.price, billing))} ${per.replace('/', 'per ')}`}</span>
                <div className="sd-cta-row">
                  <button type="button" className={`sd-btn is-dark${ack === 'done' ? ' is-done' : ''}`} onClick={reserve}>
                    <span key={`${ack}-${full}`} className="sd-swap">
                      {ack === 'done' ? (full && justBooked === null ? 'On the waitlist' : 'Reserved') : full ? 'Join the waitlist' : `Reserve for ${monthName(1, 'short')}`}
                    </span>
                    {ack === 'done' ? (
                      <svg className="sd-tick" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M3.6 8.4 6.6 11.2 12.4 5" pathLength={1} />
                      </svg>
                    ) : (
                      <Arrow />
                    )}
                  </button>
                  {booked > PRICING.spots.booked && (
                    <button type="button" className="sd-undo" onClick={undo}>
                      Undo
                    </button>
                  )}
                </div>
              </div>
              <VoiceCard v={a.voice} />
            </div>
          </div>
          <Features items={a.features} />
        </article>

        {/* Prix Fixe */}
        <article className="sd-card is-dark" aria-labelledby={`${uid}-p`}>
          <div className="sd-panel">
            <div className="sd-panel-head">
              <h2 id={`${uid}-p`}>{p.name}</h2>
              <span className="sd-pill is-muted">{p.pill}</span>
            </div>
            <p className="sd-lines">
              <span>{p.lines[0]}</span> {p.lines[1]}
            </p>
            <div className="sd-panel-foot">
              <div className="sd-buy">
                <p className="sd-price">
                  <span className="sd-cur">$</span>
                  <Roll value={subscription(p.price, billing)} />
                  <span className="sd-per">
                    <span key={billing} className="sd-swap">
                      {per}
                    </span>
                  </span>
                </p>
                <span className="sd-sr">{`$${money.format(subscription(p.price, billing))} ${per.replace('/', 'per ')}`}</span>
                <a href="#" className="sd-btn is-light">
                  {p.cta}
                </a>
              </div>
              <VoiceCard v={p.voice} />
            </div>
          </div>
          <Features items={p.features} />
        </article>

        {/* Sprints */}
        <article className="sd-card is-wide" aria-labelledby={`${uid}-s`}>
          <div className="sd-panel">
            <div className="sd-sprint-copy">
              <div className="sd-panel-head is-start">
                <h2 id={`${uid}-s`}>{s.name}</h2>
                <span className="sd-pill is-green">
                  <span key={String(fast)} className="sd-swap">
                    {fast ? s.turnaround.fast : s.turnaround.normal}
                  </span>
                </span>
              </div>
              <p className="sd-lines is-big">
                <span>{s.lines[0]}</span> {s.lines[1]}
              </p>
            </div>
            <div className="sd-sprint-buy">
              <p className="sd-price">
                <span className="sd-cur">$</span>
                <Roll value={sprintPrice(fast)} />
                <span className="sd-per">one-time fee</span>
              </p>
              <span className="sd-sr">{`$${money.format(sprintPrice(fast))} one-time fee`}</span>
              <label className={`sd-switch${fast ? ' is-on' : ''}`}>
                <input type="checkbox" role="switch" checked={fast} onChange={(e) => setFast(e.currentTarget.checked)} />
                <span className="sd-switch-track" aria-hidden="true">
                  <span />
                </span>
                {s.fast.label}
                <em>+${money.format(s.fast.price)}</em>
              </label>
              <button type="button" className={`sd-btn is-dark${sprintAck ? ' is-done' : ''}`} onClick={() => setSprintAck(true)}>
                <span key={String(sprintAck)} className="sd-swap">
                  {sprintAck ? 'Sprint requested' : `Reserve for ${monthName(1, 'long')}`}
                </span>
                {sprintAck ? (
                  <svg className="sd-tick" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3.6 8.4 6.6 11.2 12.4 5" pathLength={1} />
                  </svg>
                ) : (
                  <Arrow />
                )}
              </button>
            </div>
          </div>
        </article>
      </div>
      <p className="sd-fine">Prices in {PRICING.currency}. Subscriptions pause or cancel anytime; quarterly billing saves {pct}%.</p>
      <p className="sd-sr" aria-live="polite">
        {announce}
      </p>
    </main>
  )
}
```

### `src/style.css`

```css
/* Page-level resets — drop or scope these when embedding in an existing site. */
*,
*::before,
*::after {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  background: #ebebea;
}
button,
input {
  font: inherit;
  color: inherit;
}
a {
  color: inherit;
  text-decoration: none;
}
:focus-visible {
  outline: 2px solid #111;
  outline-offset: 3px;
}

/* ───────────────────────── section ───────────────────────── */
.sd {
  --bg: #ebebea;
  --ink: #111111;
  --ink-2: #4d4d4d;
  --ink-3: #9a9a9a;
  --line: rgba(17, 17, 17, 0.08);
  --red: #e5484d;
  --green: #2d9a5a;
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --spring: cubic-bezier(0.34, 1.4, 0.64, 1);

  position: relative;
  min-height: 100svh;
  overflow: clip;
  padding: 0 24px 72px;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Schibsted Grotesk Variable', ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
.sd > :not(.sd-bg) {
  position: relative;
  z-index: 1;
}
.sd-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.sd-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.sd-bg span {
  position: absolute;
  border-radius: 50%;
  animation: sd-drift 24s ease-in-out infinite alternate;
}
.sd-bg .is-a {
  top: 120px;
  right: -12vw;
  width: 62vw;
  height: 62vw;
  max-width: 900px;
  max-height: 900px;
  background: radial-gradient(closest-side, rgba(214, 190, 255, 0.55), rgba(255, 196, 226, 0.25) 50%, transparent 72%);
}
.sd-bg .is-b {
  bottom: -20vw;
  left: -16vw;
  width: 54vw;
  height: 54vw;
  background: radial-gradient(closest-side, rgba(255, 216, 196, 0.5), transparent 70%);
  animation-duration: 30s;
  animation-delay: -10s;
}
.sd-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.5;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ───────────────────────── nav + head ───────────────────────── */
.sd-nav {
  width: min(100%, 1100px);
  height: 76px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 28px;
}
.sd-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  border-radius: 8px;
}
.sd-brand-mark {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: conic-gradient(from 210deg, #111 0 25%, #bdbdbd 0 50%, #111 0 75%, #bdbdbd 0);
}
.sd-links {
  display: flex;
  gap: 2px;
  margin-right: auto;
}
.sd-links a {
  padding: 7px 12px;
  border-radius: 99px;
  color: var(--ink-3);
  font-size: 14px;
  font-weight: 500;
  transition: color 180ms var(--ease);
}
.sd-links a:hover,
.sd-links a[aria-current='page'] {
  color: var(--ink);
}
.sd-nav-cta {
  padding: 9px 16px;
  border-radius: 99px;
  background: var(--ink);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  transition: transform 160ms var(--ease);
}
.sd-nav-cta:active {
  transform: scale(0.97);
}
.sd-head {
  width: min(100%, 1100px);
  margin: clamp(28px, 7vh, 72px) auto 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}
.sd-title {
  margin: 0;
  font-size: clamp(64px, 10vw, 136px);
  font-weight: 600;
  line-height: 0.88;
  letter-spacing: -0.055em;
}
.sd-title span {
  display: block;
  color: #b4b4b4;
}
.sd-seg {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-inline-size: 0;
  margin: 0 0 8px;
  padding: 4px;
  border: 0;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow:
    inset 0 0 0 1px var(--line),
    0 6px 16px -10px rgba(17, 17, 17, 0.25);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.sd-seg-pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  border-radius: 99px;
  background: var(--ink);
  transform: translateX(calc(var(--i) * 100%));
  transition: transform 420ms var(--spring);
}
.sd-seg-opt {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 38px;
  padding: 0 18px;
  border-radius: 99px;
  color: var(--ink-2);
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: color 240ms var(--ease);
}
.sd-seg-opt.is-on {
  color: #fff;
}
.sd-seg-opt input,
.sd-switch input {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
.sd-seg-opt:has(input:focus-visible),
.sd-switch:has(input:focus-visible) .sd-switch-track {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}
.sd-seg-opt em {
  color: var(--green);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  transition: color 240ms var(--ease);
}
.sd-seg-opt.is-on em {
  color: #8fe3b0;
}

/* ───────────────────────── cards ───────────────────────── */
.sd-grid {
  width: min(100%, 1100px);
  margin: 40px auto 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.sd-card {
  --outer: rgba(250, 250, 249, 0.9);
  --panel: #ffffff;
  --text: var(--ink);
  --muted: var(--ink-3);
  --dot: #c4c4c4;
  padding: 8px;
  border-radius: 30px;
  background: var(--outer);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.9),
    0 30px 60px -44px rgba(17, 17, 17, 0.35);
  color: var(--text);
}
.sd-card.is-dark {
  --outer: #151515;
  --panel: linear-gradient(180deg, #2a2a2a, #222);
  --text: #f5f5f5;
  --muted: #8a8a8a;
  --dot: #555;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    0 40px 70px -40px rgba(17, 17, 17, 0.6);
}
.sd-card.is-wide {
  grid-column: 1 / -1;
}
.sd-panel {
  display: flex;
  flex-direction: column;
  padding: 22px;
  border-radius: 24px;
  background: var(--panel);
  box-shadow:
    0 1px 2px rgba(17, 17, 17, 0.06),
    0 12px 26px -18px rgba(17, 17, 17, 0.25);
}
.sd-card.is-dark .sd-panel {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.sd-panel-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.sd-panel-head h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}
.sd-pill {
  display: inline-flex;
  overflow: clip;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 12.5px;
  font-weight: 550;
  transition: background-color 300ms var(--ease), color 300ms var(--ease);
}
.sd-pill.is-open {
  background: #eef0ee;
  color: var(--ink-2);
}
.sd-pill.is-full {
  background: #fde8e8;
  color: var(--red);
}
.sd-pill.is-muted {
  background: rgba(255, 255, 255, 0.1);
  color: #bdbdbd;
}
.sd-pill.is-green {
  background: #e2f4e8;
  color: var(--green);
}
.sd-spots {
  display: flex;
  gap: 6px;
  margin-top: 14px;
}
.sd-spot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1.5px #cfcfcf;
  transition: background-color 300ms var(--ease), box-shadow 300ms var(--ease);
}
.sd-spot.is-booked {
  background: var(--ink);
  box-shadow: none;
}
.sd-spot.is-new {
  animation: sd-pop 520ms var(--spring);
}
.sd-lines {
  margin: 18px 0 0;
  font-size: clamp(24px, 2.4vw, 30px);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -0.03em;
}
.sd-lines span {
  display: block;
  color: var(--muted);
}
.sd-card.is-dark .sd-lines {
  color: #fff;
}
.sd-panel-foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-top: 56px;
}
.sd-buy {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}
.sd-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: 0;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}
.sd-cur {
  font-size: 0.6em;
}
.sd-per {
  display: inline-flex;
  overflow: clip;
  margin-left: 4px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
}
.sd-cta-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow: clip;
  height: 44px;
  padding: 0 20px;
  border: 0;
  border-radius: 99px;
  font-size: 14.5px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 160ms var(--ease),
    background-color 260ms var(--ease),
    box-shadow 240ms var(--ease);
}
.sd-btn:active {
  transform: scale(0.96);
}
.sd-btn.is-dark {
  background: linear-gradient(180deg, #2c2c2c, #0f0f0f);
  color: #fff;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 10px 20px -10px rgba(17, 17, 17, 0.7);
}
.sd-btn.is-dark:hover {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 14px 26px -10px rgba(17, 17, 17, 0.75);
}
.sd-btn.is-done {
  background: linear-gradient(180deg, #33a564, #23854d);
}
.sd-btn.is-light {
  background: linear-gradient(180deg, #ffffff, #e7e7e7);
  color: var(--ink);
  box-shadow:
    inset 0 1px 0 #fff,
    0 8px 18px -10px rgba(0, 0, 0, 0.7);
}
.sd-arrow,
.sd-tick {
  flex: none;
  width: 15px;
  height: 15px;
  transition: transform 220ms var(--ease);
}
.sd-btn:hover .sd-arrow {
  transform: translateX(3px);
}
.sd-tick {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  animation: sd-draw 360ms var(--ease) 80ms backwards;
}
.sd-undo {
  padding: 6px 4px;
  border: 0;
  background: none;
  color: var(--ink-3);
  font-size: 13.5px;
  font-weight: 550;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  animation: sd-in 300ms var(--ease);
}
.sd-undo:hover {
  color: var(--ink);
}

/* testimonial */
.sd-voice {
  flex: none;
  width: 220px;
  margin: 0;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(17, 17, 17, 0.03);
  box-shadow: inset 0 0 0 1px var(--line);
}
.sd-card.is-dark .sd-voice {
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
}
.sd-voice-head {
  display: flex;
  align-items: center;
  gap: 9px;
}
.sd-avatar {
  display: grid;
  place-items: center;
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, hsl(var(--h) 80% 70%), hsl(calc(var(--h) + 40) 70% 45%));
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}
.sd-voice figcaption {
  display: flex;
  flex-direction: column;
  min-width: 0;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.2;
}
.sd-voice figcaption span {
  color: var(--muted);
  font-weight: 450;
}
.sd-voice-mark {
  width: 14px;
  height: 14px;
  margin-left: auto;
  fill: var(--muted);
  opacity: 0.6;
}
.sd-voice blockquote {
  margin: 10px 0 0;
  font-size: 13px;
  font-style: italic;
  line-height: 1.35;
}

.sd-feats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 20px;
  margin: 0;
  padding: 22px 22px 18px;
  list-style: none;
  color: var(--muted);
  font-size: 14px;
}
.sd-card.is-dark .sd-feats {
  color: #a3a3a3;
}
.sd-feats li {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sd-feats li::before {
  content: '';
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--dot);
}

/* sprint row */
.sd-card.is-wide .sd-panel {
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  padding: 28px;
}
.sd-panel-head.is-start {
  justify-content: flex-start;
}
.sd-lines.is-big {
  margin-top: 26px;
  font-size: clamp(34px, 5vw, 62px);
  line-height: 1;
  letter-spacing: -0.045em;
}
.sd-sprint-buy {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  flex: none;
}
.sd-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--ink-2);
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
}
.sd-switch em {
  color: var(--ink-3);
  font-style: normal;
}
.sd-switch-track {
  position: relative;
  width: 36px;
  height: 22px;
  border-radius: 99px;
  background: #dcdcdc;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12);
  transition: background-color 220ms var(--ease);
}
.sd-switch-track span {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: transform 380ms var(--spring), scale 160ms var(--ease);
}
.sd-switch.is-on .sd-switch-track {
  background: var(--green);
}
.sd-switch.is-on .sd-switch-track span {
  transform: translateX(14px);
}
.sd-switch:active .sd-switch-track span {
  scale: 1.12 0.92;
}
.sd-fine {
  width: min(100%, 1100px);
  margin: 28px auto 0;
  color: var(--ink-3);
  font-size: 13px;
}
.sd-swap {
  display: inline-block;
  animation: sd-in 300ms var(--ease);
}

/* rolling number */
.sd-roll {
  --lh: 1em;
  display: inline-flex;
  font-variant-numeric: tabular-nums;
}
.sd-roll-col,
.sd-roll-sym {
  position: relative;
  display: block;
  height: var(--lh);
  line-height: var(--lh);
}
.sd-roll-col {
  overflow: clip;
}
.sd-roll-sym {
  font-variant-numeric: normal;
}
.sd-roll-sizer {
  visibility: hidden;
}
.sd-roll-strip {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: transform 540ms var(--ease) calc(var(--n) * 14ms);
}
.sd-roll-strip > span {
  height: var(--lh);
}

@keyframes sd-drift {
  to {
    transform: translate3d(-4vw, 3vw, 0) scale(1.08);
  }
}
@keyframes sd-pop {
  0% {
    transform: scale(0.3);
  }
  60% {
    transform: scale(1.35);
  }
}
@keyframes sd-draw {
  from {
    stroke-dashoffset: 1;
  }
}
@keyframes sd-in {
  from {
    opacity: 0;
    transform: translateY(60%);
  }
}

/* ───────────────────────── responsive ───────────────────────── */
@media (max-width: 960px) {
  .sd-grid {
    grid-template-columns: 1fr;
  }
  .sd-card.is-wide .sd-panel {
    flex-direction: column;
    align-items: stretch;
  }
  .sd-sprint-buy {
    align-items: flex-start;
  }
}
@media (max-width: 640px) {
  .sd {
    padding: 0 14px 56px;
  }
  .sd-links {
    display: none;
  }
  .sd-nav {
    justify-content: space-between;
  }
  .sd-head {
    flex-direction: column;
    align-items: flex-start;
  }
  .sd-panel-foot {
    flex-direction: column;
    align-items: stretch;
    margin-top: 36px;
  }
  .sd-voice {
    width: 100%;
  }
  .sd-feats {
    grid-template-columns: 1fr;
  }
}

/* ───────────────────────── reduced motion ───────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .sd *,
  .sd *::before,
  .sd *::after {
    transition-duration: 0ms !important;
    transition-delay: 0ms !important;
    animation: none !important;
  }
}
```

## Build / run

```
npm create vite@latest pricing-studio -- --template react-ts
cd pricing-studio
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/schibsted-grotesk@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files, then:

```
npm run dev
```

`src/main.tsx` mounts `<App />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- No APIs, keys, accounts, or payment code.
- The studio, people, quotes and prices are fictional.
- Reserving is a local demo: it does not send anything and resets on reload. Wire the buttons to your booking flow.
