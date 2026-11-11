<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# License — Pricing hero

License is a light, tactile pricing section for a fictional icon library, Inkwell Icons, sold as one-time licences. Under the headline `Every icon. Every style. Pay once.` an `Active users` stepper (minus, a typed number, plus) prices three cards: Solo (light), Team (dark, with an animated iridescent `Most Popular` badge) and Enterprise (light, with Buy and Contact). Each card is a panel inside a card: name and audience, a big price whose digits roll, the price per user paid once, glossy pill buttons, then feature rows that restate the user count and a `+` that opens more. The cheapest licence that fits gets a `Best fit` tag and lifts a little; a licence that is too small turns its note red and greys its button. A soft iridescent glow behind the cards leans toward the pointer. Document title: `License — Pricing Hero — Oversight Supply`.

Rebuild it as a full-screen pricing hero section. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Do not reformat, rename, or restyle them. Every visible string, number, colour, and timing in those files is the copy. Do not paraphrase it.

## Stack & dependencies

React 19, TypeScript, and Vite.

Fonts, imported in `src/main.tsx`:

- `@fontsource-variable/rethink-sans`

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/rethink-sans@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Light grey page with a white wash at the top, film grain and the iridescent glow behind the middle card. Nav: wordmark with an iridescent mark and a `Browse icons` pill. Centred: a small kicker, the two-tone headline and the stepper pill. Three cards (max 1120px), each an outer card with an inner panel (head, price, note, buttons) and the feature list, a divider with a round `+` button and the hidden extras below.

## Interactions & animation

One pure function, `quote(plan, users)`, returns whether a plan fits, the users it covers (at least the included ones), the one-time price (base plus extra users) and the price per user; `bestFor(users)` picks the cheapest plan that fits. The stepper buttons press in and disable at the limits; the field takes exact numbers and shows an error for empty, fractional or out-of-range input, restoring the last valid value on blur. Prices roll digit by digit and glide sideways when they gain a digit; notes swap with a short rise; the `Best fit` tag pops in; the badge border is a rotating conic gradient; the `+` turns into an `×` while the extras open by animating their grid row, with each line fading in after the last; the glow follows the pointer with easing, written as two CSS variables in one animation frame. Every animated element also respects `prefers-reduced-motion`: the last rule in the stylesheet removes transitions and animations (values still change, instantly), and the JavaScript skips the Web Animations and hover effects it would otherwise play.

## Responsive behaviour

Below 980px the cards stack in one column (max 520px) with the best-fit card first. Below 560px the stepper stacks its label above the control and prices get smaller. Tested at 375px with no horizontal scroll.

## Accessibility & robustness

Every input is a real form control (range, number field, radio group) with a visible label, so arrow keys and screen readers work; links have visible labels and the current page uses `aria-current`. Every digit of the price sits in its own fixed-width `tabular-nums` column, and the plan and per-unit price are anchored to the right edge, so nothing around the price shifts as it changes. Focus rings are drawn with `:focus-visible`. Decorative layers are `aria-hidden`. The stepper is a labelled number field with buttons that have `aria-label`s and an error linked with `aria-describedby`. Each card is a labelled `article`; disabled buy buttons use `aria-disabled`; the `+` button uses `aria-expanded` and `aria-controls`, and the extras are `inert` while closed. A polite live region announces the best fit and its price.

## Performance notes

DOM and CSS only. The pointer glow writes two CSS variables per animation frame and stops when it settles. Every animation is transform or opacity, except the extras panel (grid rows, once per toggle).

## Assets

No images. Icons are inline SVG; the grain is an inline SVG data URI.

## Putting it in an existing site

The section is the `<main>` returned by `App`. Its classes all share one short prefix, so they will not collide with your styles. The first rules in the stylesheet (`*`, `html, body`, `button`, `a`, `:focus-visible`) are page-level resets: keep them on a standalone page, drop or scope them when the hero goes inside a page that already has its own. Links point to `#` or `/`; change them to your routes. Money is formatted with `Intl.NumberFormat`.

To drop it into an existing React site, copy the files under `src/` (except `main.tsx`) and `src/assets/` into one folder such as `components/pricing-license/`, install the dependencies above, move the font imports from `main.tsx` into your app entry, and render the default export of `App.tsx` as the first thing on the page. In Next.js, add `'use client'` at the top of `App.tsx`.

## Full source code

Create these files exactly. `index.html` replaces the Vite template’s `index.html`. The other files sit under `src/`. Delete unused Vite template files (`App.css`, `index.css`, `vite.svg`). Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#efefef" />
    <title>License — Pricing Hero — Oversight Supply</title>
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
import '@fontsource-variable/rethink-sans'
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
import type { ChangeEvent, CSSProperties } from 'react'

/* ─────────────────────────────────────────────────────────────
   PRICING — one-time licences, priced by active users.
   ───────────────────────────────────────────────────────────── */
type PlanId = 'solo' | 'team' | 'enterprise'
type Plan = {
  id: PlanId
  name: string
  audience: string
  base: number // one-time price
  includes: number // active users included in the base price
  maxUsers: number
  perExtra: number // one-time price per user beyond `includes`
  popular?: boolean
  dark?: boolean
  buy: string
  contact?: boolean
  priority: boolean
}

const PRICING = {
  locale: 'en-US',
  currency: 'USD',
  users: { min: 1, max: 200, start: 8 },
  plans: [
    { id: 'solo', name: 'Solo', audience: 'For Freelancers', base: 59, includes: 1, maxUsers: 1, perExtra: 0, buy: 'Buy', priority: false },
    { id: 'team', name: 'Team', audience: 'For Startups', base: 149, includes: 8, maxUsers: 24, perExtra: 15, popular: true, dark: true, buy: 'Buy', priority: true },
    { id: 'enterprise', name: 'Enterprise', audience: 'For Organisations', base: 299, includes: 24, maxUsers: 200, perExtra: 9, buy: 'Buy', contact: true, priority: true },
  ] as Plan[],
  more: ['5 styles per icon: line, solid and three duotones', '2,400 icons, with new ones every month', 'SVG, PNG, React and Vue exports'],
}

const PRODUCT = 'Inkwell Icons'

/* ───────────────────────── pricing logic ───────────────────────── */
type Quote = { fits: boolean; covered: number; price: number; perUser: number; reason: string | null }

/** The one pure pricing function: a plan's one-time price for `users` active users. */
export function quote(plan: Plan, users: number): Quote {
  const u = Math.max(PRICING.users.min, Math.floor(users))
  if (u > plan.maxUsers) {
    const price = plan.base + Math.max(0, plan.maxUsers - plan.includes) * plan.perExtra
    return { fits: false, covered: plan.maxUsers, price, perUser: price / plan.maxUsers, reason: plan.maxUsers === 1 ? 'Single user only' : `Up to ${plan.maxUsers} users` }
  }
  const covered = Math.max(u, plan.includes)
  const price = plan.base + Math.max(0, u - plan.includes) * plan.perExtra
  return { fits: true, covered, price, perUser: price / covered, reason: null }
}

/** The cheapest plan that fits. */
export function bestFor(users: number): PlanId {
  return PRICING.plans
    .map((p) => ({ p, q: quote(p, users) }))
    .filter((x) => x.q.fits)
    .sort((a, b) => a.q.price - b.q.price)[0].p.id
}

const money = new Intl.NumberFormat(PRICING.locale, { style: 'currency', currency: PRICING.currency, maximumFractionDigits: 0 })
const money2 = new Intl.NumberFormat(PRICING.locale, { style: 'currency', currency: PRICING.currency, minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num = new Intl.NumberFormat(PRICING.locale)
const EASE = 'cubic-bezier(.2,.8,.2,1)'

/* ───────────────────────── hooks ───────────────────────── */
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
    const s = num.format(value)
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
    <span className="lc-roll" ref={row} aria-hidden="true">
      {chars.map((c, i) =>
        /\d/.test(c.ch) ? (
          <span key={c.k} data-k={c.k} className="lc-roll-col" style={{ '--n': i } as CSSProperties}>
            <span className="lc-roll-sizer">0</span>
            <span className="lc-roll-strip" style={{ transform: `translateY(${-Number(c.ch) * 10}%)` }}>
              {DIGITS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={c.k} data-k={c.k} className="lc-roll-sym">
            {c.ch}
          </span>
        ),
      )}
    </span>
  )
}

/* ───────────────────────── icons ───────────────────────── */
const Users = ({ many }: { many?: boolean }) => (
  <svg viewBox="0 0 20 20" className="lc-ico" aria-hidden="true">
    <circle cx="8" cy="6.5" r="3.2" fill="currentColor" />
    <path d="M2 17c.4-3.4 3-5.4 6-5.4s5.6 2 6 5.4z" fill="currentColor" />
    {many && (
      <>
        <circle cx="14.6" cy="7.2" r="2.5" fill="currentColor" opacity=".7" />
        <path d="M13.4 11.9c2.4.2 4.2 1.9 4.6 4.6h-3" fill="currentColor" opacity=".7" />
      </>
    )}
  </svg>
)
const Check = () => (
  <svg viewBox="0 0 18 18" className="lc-check" aria-hidden="true">
    <circle cx="9" cy="9" r="8" />
    <path d="M5.6 9.2 7.9 11.4 12.4 6.8" />
  </svg>
)

/* ───────────────────────── card ───────────────────────── */
function PlanCard({ plan, users, best }: { plan: Plan; users: number; best: boolean }) {
  const uid = useId()
  const [more, setMore] = useState(false)
  const q = quote(plan, users)
  const n = q.covered
  const rows: [string, string][] = [
    [`License for ${num.format(n)} Active ${n === 1 ? 'User' : 'Users'}`, ''],
    ['Figma Plugin access', `for ${num.format(n)} ${n === 1 ? 'user' : 'users'}`],
    ['Web App access', `for ${num.format(n)} ${n === 1 ? 'user' : 'users'}`],
    ['CLI Access', `for ${num.format(n)} ${n === 1 ? 'user' : 'users'}`],
    plan.priority ? ['Priority Trouble-shooting', 'support from creator'] : ['Email support', 'within two days'],
  ]
  return (
    <article className={`lc-card${plan.dark ? ' is-dark' : ''}${q.fits ? '' : ' is-out'}${best ? ' is-best' : ''}`} aria-label={`${plan.name}${best ? ', best for your team' : ''}`}>
      <div className="lc-panel">
        <div className="lc-head">
          <span className="lc-name">
            <Users many={plan.id !== 'solo'} />
            {plan.name}
            <span className="lc-audience">{plan.audience}</span>
          </span>
          {plan.popular ? (
            <span className="lc-popular">
              <span>Most Popular</span>
            </span>
          ) : (
            <span className={`lc-best${best ? ' is-on' : ''}`}>Best fit</span>
          )}
        </div>
        <div className="lc-price">
          <span className="lc-cur">$</span>
          <Roll value={q.price} />
          <span className="lc-term">/ life time updates</span>
        </div>
        <p className="lc-note">
          <span key={q.reason ?? String(Math.round(q.perUser * 100))} className="lc-swap">
            {q.reason ? `${q.reason}. Pick a bigger licence.` : `${money2.format(q.perUser)} per user, paid once`}
          </span>
        </p>
        <span className="lc-sr">{`${money.format(q.price)} one time${q.reason ? `, ${q.reason}` : ''}.`}</span>
        <div className={`lc-actions${plan.contact ? ' has-two' : ''}`}>
          <a href="#" className={`lc-btn${plan.dark ? ' is-light' : plan.contact ? ' is-dark' : ' is-light'}`} aria-disabled={!q.fits || undefined} tabIndex={q.fits ? undefined : -1}>
            {plan.buy}
          </a>
          {plan.contact && (
            <a href="#" className="lc-btn is-light">
              Contact
            </a>
          )}
        </div>
      </div>
      <ul className="lc-feats">
        {rows.map(([a, b]) => (
          <li key={a}>
            <Check />
            <span>
              <strong>{a}</strong> {b}
            </span>
          </li>
        ))}
      </ul>
      <div className="lc-more">
        <span className="lc-rule" aria-hidden="true" />
        <button type="button" className="lc-plus" aria-expanded={more} aria-controls={`${uid}-m`} onClick={() => setMore((m) => !m)}>
          <span className="lc-sr">{more ? 'Hide' : 'Show'} everything included</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 3.5v9M3.5 8h9" />
          </svg>
        </button>
        <span className="lc-rule" aria-hidden="true" />
      </div>
      <div className={`lc-extra${more ? ' is-open' : ''}`} id={`${uid}-m`} inert={!more}>
        <ul>
          {PRICING.more.map((m, i) => (
            <li key={m} style={{ '--i': i } as CSSProperties}>
              <Check />
              <span>
                <strong>{m.split(':')[0]}</strong>
                {m.includes(':') ? `:${m.split(':')[1]}` : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

/* ───────────────────────── section ───────────────────────── */
export default function App() {
  const uid = useId()
  const { min, max, start } = PRICING.users
  const [users, setUsers] = useState(start)
  const [draft, setDraft] = useState(String(start))
  const [error, setError] = useState<string | null>(null)
  const best = bestFor(users)
  const stage = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // The iridescent glow behind the cards leans toward the pointer.
  useEffect(() => {
    const el = stage.current
    if (!el || reduced) return
    let raf = 0
    const tx = { x: 0, y: 0, cx: 0, cy: 0 }
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx.x = ((e.clientX - r.left) / r.width - 0.5) * 80
      tx.y = ((e.clientY - r.top) / r.height - 0.5) * 50
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const tick = () => {
      tx.cx += (tx.x - tx.cx) * 0.08
      tx.cy += (tx.y - tx.cy) * 0.08
      el.style.setProperty('--gx', `${tx.cx.toFixed(1)}px`)
      el.style.setProperty('--gy', `${tx.cy.toFixed(1)}px`)
      raf = Math.abs(tx.x - tx.cx) + Math.abs(tx.y - tx.cy) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  const set = (n: number) => {
    const v = Math.min(max, Math.max(min, n))
    setUsers(v)
    setDraft(String(v))
    setError(null)
  }
  const onField = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value
    setDraft(v)
    if (v.trim() === '') return setError('How many people?')
    const n = Number(v)
    if (!Number.isInteger(n)) return setError('Whole people only')
    if (n < min) return setError(`At least ${min}`)
    if (n > max) return setError(`Over ${max}? Contact us`)
    setError(null)
    setUsers(n)
  }

  const [announce, setAnnounce] = useState('')
  useEffect(() => {
    const t = setTimeout(() => {
      const p = PRICING.plans.find((x) => x.id === best)!
      setAnnounce(`${users} active ${users === 1 ? 'user' : 'users'}: ${p.name} fits best at ${money.format(quote(p, users).price)}, paid once.`)
    }, 400)
    return () => clearTimeout(t)
  }, [users, best])

  return (
    <main className="lc">
      <div className="lc-bg" aria-hidden="true" />
      <header className="lc-nav">
        <a href="#" className="lc-brand">
          <span className="lc-mark" aria-hidden="true" />
          {PRODUCT}
        </a>
        <a href="#" className="lc-nav-link">
          Browse icons
        </a>
      </header>

      <div className="lc-head-block">
        <p className="lc-kicker">One licence · lifetime updates</p>
        <h1 className="lc-title">
          Every icon. Every style. <span>Pay once.</span>
        </h1>
        <div className="lc-stepper-row">
          <label htmlFor={`${uid}-u`} className="lc-stepper-label">
            Active users
          </label>
          <div className={`lc-stepper${error ? ' is-error' : ''}`}>
            <button type="button" onClick={() => set(users - 1)} disabled={users <= min} aria-label="One user fewer">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8h9" />
              </svg>
            </button>
            <input
              id={`${uid}-u`}
              type="number"
              inputMode="numeric"
              min={min}
              max={max}
              value={draft}
              onChange={onField}
              onBlur={() => {
                if (!error) return
                setDraft(String(users))
                setError(null)
              }}
              aria-invalid={!!error}
              aria-describedby={`${uid}-e`}
            />
            <button type="button" onClick={() => set(users + 1)} disabled={users >= max} aria-label="One user more">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 3.5v9M3.5 8h9" />
              </svg>
            </button>
            <span id={`${uid}-e`} className="lc-err" role="alert">
              {error}
            </span>
          </div>
        </div>
      </div>

      <div className="lc-stage" ref={stage}>
        <div className="lc-glow" aria-hidden="true" />
        <div className="lc-cards">
          {PRICING.plans.map((p) => (
            <PlanCard key={p.id} plan={p} users={users} best={p.id === best} />
          ))}
        </div>
      </div>
      <p className="lc-fine">One-time payment in {PRICING.currency}, before tax. Every licence includes all future icons and updates.</p>
      <p className="lc-sr" aria-live="polite">
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
  background: #efefef;
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
  outline: 2px solid #6b5cff;
  outline-offset: 3px;
}

/* ───────────────────────── section ───────────────────────── */
.lc {
  --bg: #efefef;
  --ink: #0e0e11;
  --ink-2: #55555c;
  --ink-3: #8f8f97;
  --line: rgba(14, 14, 17, 0.08);
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --spring: cubic-bezier(0.34, 1.4, 0.64, 1);
  --iris: conic-gradient(from 0deg, #ff7a9a, #ffb36b, #fff27a, #7ef0c5, #6fb8ff, #a58bff, #ff7a9a);

  position: relative;
  min-height: 100svh;
  overflow: clip;
  padding: 0 24px 72px;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Rethink Sans Variable', ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
.lc > :not(.lc-bg) {
  position: relative;
  z-index: 1;
}
.lc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.lc-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(70% 50% at 50% 0%, #ffffff 0%, rgba(255, 255, 255, 0) 70%),
    radial-gradient(40% 30% at 50% 100%, rgba(255, 255, 255, 0.8), transparent 70%);
  pointer-events: none;
}
.lc-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.35;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ───────────────────────── nav + heading ───────────────────────── */
.lc-nav {
  width: min(100%, 1120px);
  height: 72px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lc-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  border-radius: 8px;
}
.lc-mark {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: var(--iris);
  box-shadow:
    inset 0 0 0 5px var(--ink),
    0 2px 6px rgba(14, 14, 17, 0.2);
}
.lc-nav-link {
  padding: 9px 16px;
  border-radius: 99px;
  background: #fff;
  box-shadow:
    0 0 0 1px var(--line),
    0 2px 4px rgba(14, 14, 17, 0.05);
  font-size: 14px;
  font-weight: 600;
  transition: transform 160ms var(--ease);
}
.lc-nav-link:active {
  transform: scale(0.97);
}
.lc-head-block {
  margin: clamp(36px, 8vh, 80px) auto 0;
  text-align: center;
}
.lc-kicker {
  margin: 0;
  color: var(--ink-3);
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.lc-title {
  max-width: 13em;
  margin: 14px auto 0;
  font-size: clamp(40px, 6vw, 74px);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.045em;
  text-wrap: balance;
}
.lc-title span {
  color: var(--ink-3);
}
.lc-stepper-row {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 32px;
  padding: 6px 6px 6px 18px;
  border-radius: 99px;
  background: #fff;
  box-shadow:
    0 0 0 1px var(--line),
    0 10px 24px -14px rgba(14, 14, 17, 0.25);
}
.lc-stepper-label {
  color: var(--ink-2);
  font-size: 14px;
  font-weight: 600;
}
.lc-stepper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 99px;
  background: #f2f2f3;
}
.lc-stepper button {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(14, 14, 17, 0.14);
  cursor: pointer;
  transition: transform 160ms var(--ease), opacity 200ms var(--ease);
}
.lc-stepper button:hover {
  box-shadow: 0 2px 6px rgba(14, 14, 17, 0.18);
}
.lc-stepper button:active {
  transform: scale(0.9);
}
.lc-stepper button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none;
}
.lc-stepper svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
}
.lc-stepper input {
  width: 4ch;
  height: 36px;
  border: 0;
  background: none;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  outline: none;
  appearance: textfield;
  -moz-appearance: textfield;
}
.lc-stepper input::-webkit-inner-spin-button,
.lc-stepper input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lc-stepper:has(input:focus-visible) {
  box-shadow: 0 0 0 2px #6b5cff;
}
.lc-stepper.is-error {
  box-shadow: 0 0 0 2px #e5484d;
}
.lc-err {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  translate: -50% 0;
  color: #d2353b;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
}
.lc-err:empty {
  display: none;
}

/* ───────────────────────── cards ───────────────────────── */
.lc-stage {
  --gx: 0px;
  --gy: 0px;
  position: relative;
  width: min(100%, 1120px);
  margin: 56px auto 0;
}
.lc-glow {
  position: absolute;
  top: -60px;
  left: 50%;
  width: 560px;
  height: 460px;
  translate: calc(-50% + var(--gx)) var(--gy);
  border-radius: 50%;
  background:
    radial-gradient(closest-side at 30% 40%, rgba(255, 122, 154, 0.45), transparent),
    radial-gradient(closest-side at 70% 35%, rgba(111, 184, 255, 0.45), transparent),
    radial-gradient(closest-side at 50% 70%, rgba(126, 240, 197, 0.35), transparent),
    radial-gradient(closest-side at 60% 60%, rgba(255, 179, 107, 0.3), transparent);
  pointer-events: none;
}
.lc-cards {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 18px;
}
.lc-card {
  --panel: #fff;
  --card: #f9f9f9;
  --muted: var(--ink-3);
  --strong: var(--ink);
  --rule: rgba(14, 14, 17, 0.1);
  --tick: #8f8f97;
  padding: 8px 8px 0;
  border-radius: 32px;
  background: var(--card);
  box-shadow:
    0 0 0 1px rgba(14, 14, 17, 0.07),
    inset 0 1px 0 #fff,
    0 30px 60px -40px rgba(14, 14, 17, 0.35);
  transition: transform 360ms var(--ease), box-shadow 360ms var(--ease);
}
.lc-card.is-dark {
  --panel: linear-gradient(180deg, #2e2e33, #232327);
  --card: #1b1b1e;
  --muted: #8d8d95;
  --strong: #f4f4f6;
  --rule: rgba(255, 255, 255, 0.12);
  --tick: #8d8d95;
  color: #f4f4f6;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 40px 70px -36px rgba(14, 14, 17, 0.6);
}
.lc-card.is-best {
  transform: translateY(-6px);
}
.lc-panel {
  padding: 22px 22px 22px;
  border-radius: 26px;
  background: var(--panel);
  box-shadow:
    0 1px 2px rgba(14, 14, 17, 0.06),
    0 10px 24px -16px rgba(14, 14, 17, 0.25);
}
.lc-card.is-dark .lc-panel {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 12px 24px -14px rgba(0, 0, 0, 0.6);
}
.lc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 30px;
}
.lc-name {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 17px;
  font-weight: 650;
  white-space: nowrap;
}
.lc-ico {
  width: 18px;
  height: 18px;
}
.lc-audience {
  padding-left: 9px;
  margin-left: 2px;
  border-left: 1px solid var(--rule);
  color: var(--muted);
  font-weight: 450;
}
.lc-popular {
  position: relative;
  overflow: hidden;
  padding: 1.5px;
  border-radius: 99px;
  isolation: isolate;
}
.lc-popular::before {
  content: '';
  position: absolute;
  inset: -40px;
  z-index: -1;
  background: var(--iris);
  animation: lc-spin 6s linear infinite;
}
.lc-popular span {
  display: block;
  padding: 4px 12px;
  border-radius: 99px;
  background: rgba(30, 30, 34, 0.55);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
.lc-best {
  padding: 4px 11px;
  border-radius: 99px;
  background: #eef0ff;
  color: #4b3df0;
  font-size: 12.5px;
  font-weight: 650;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 200ms var(--ease), transform 320ms var(--spring);
}
.lc-best.is-on {
  opacity: 1;
  transform: none;
}
.lc-price {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  margin-top: 26px;
  font-size: 72px;
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.9;
}
.lc-cur {
  margin-bottom: 0.12em;
  font-size: 0.42em;
  letter-spacing: 0;
}
.lc-term {
  margin: 0 0 0.3em 0.3em;
  color: var(--muted);
  font-size: 18px;
  font-weight: 450;
  letter-spacing: 0;
  white-space: nowrap;
}
.lc-note {
  display: flex;
  overflow: clip;
  min-height: 20px;
  margin: 10px 0 18px;
  color: var(--muted);
  font-size: 13.5px;
  font-variant-numeric: tabular-nums;
}
.lc-card.is-out .lc-note {
  color: #e5484d;
}
.lc-actions {
  display: grid;
  gap: 10px;
}
.lc-actions.has-two {
  grid-template-columns: 1.4fr 1fr;
}
.lc-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  border-radius: 99px;
  font-size: 18px;
  font-weight: 600;
  transition:
    transform 160ms var(--ease),
    box-shadow 220ms var(--ease),
    opacity 220ms var(--ease);
}
.lc-btn:active {
  transform: scale(0.97);
}
.lc-btn.is-light {
  background: linear-gradient(180deg, #ffffff, #ececee);
  color: var(--ink);
  box-shadow:
    inset 0 1px 0 #fff,
    0 0 0 1px rgba(14, 14, 17, 0.08),
    0 6px 14px -8px rgba(14, 14, 17, 0.4);
}
.lc-btn.is-light:hover {
  box-shadow:
    inset 0 1px 0 #fff,
    0 0 0 1px rgba(14, 14, 17, 0.12),
    0 10px 20px -10px rgba(14, 14, 17, 0.45);
}
.lc-btn.is-dark {
  background: linear-gradient(180deg, #34343a, #141417);
  color: #fff;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 8px 16px -8px rgba(14, 14, 17, 0.6);
}
.lc-btn[aria-disabled] {
  opacity: 0.4;
  pointer-events: none;
}

.lc-feats,
.lc-extra ul {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 24px 18px 0;
  list-style: none;
  color: var(--muted);
  font-size: 15px;
  font-variant-numeric: tabular-nums;
}
.lc-feats li,
.lc-extra li {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lc-feats strong,
.lc-extra strong {
  color: var(--strong);
  font-weight: 550;
}
.lc-check {
  flex: none;
  width: 20px;
  height: 20px;
}
.lc-check circle {
  fill: var(--tick);
}
.lc-check path {
  fill: none;
  stroke: var(--card);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lc-more {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
  padding: 0 18px;
}
.lc-rule {
  flex: 1;
  height: 1px;
  background: var(--rule);
}
.lc-plus {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border: 0;
  border-radius: 8px;
  background: var(--panel);
  box-shadow: 0 1px 3px rgba(14, 14, 17, 0.18);
  color: var(--strong);
  cursor: pointer;
  transition: transform 260ms var(--spring);
}
.lc-plus:active {
  scale: 0.9;
}
.lc-plus svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
}
.lc-plus[aria-expanded='true'] {
  transform: rotate(45deg);
}
.lc-extra {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 380ms var(--ease);
}
.lc-extra.is-open {
  grid-template-rows: 1fr;
}
.lc-extra ul {
  min-height: 0;
  overflow: hidden;
  padding-bottom: 0;
}
.lc-extra li {
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 180ms var(--ease), transform 240ms var(--ease);
}
.lc-extra.is-open li {
  opacity: 1;
  transform: none;
  transition-delay: calc(80ms + var(--i) * 50ms);
}
.lc-card > :last-child {
  margin-bottom: 22px;
}
.lc-extra.is-open ul {
  padding-bottom: 4px;
}
.lc-fine {
  margin: 40px 0 0;
  color: var(--ink-3);
  font-size: 13px;
  text-align: center;
}
.lc-swap {
  display: inline-block;
  animation: lc-in 300ms var(--ease);
}

/* rolling number */
.lc-roll {
  --lh: 1em;
  display: inline-flex;
  font-variant-numeric: tabular-nums;
}
.lc-roll-col,
.lc-roll-sym {
  position: relative;
  display: block;
  height: var(--lh);
  line-height: var(--lh);
}
.lc-roll-col {
  overflow: clip;
}
.lc-roll-sizer {
  visibility: hidden;
}
.lc-roll-strip {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: transform 560ms var(--ease) calc(var(--n) * 16ms);
}
.lc-roll-strip > span {
  height: var(--lh);
}
.lc-card.is-dark .lc-roll-strip span,
.lc-card.is-dark .lc-roll-sym {
  color: #fff;
}
.lc-card:not(.is-dark) .lc-roll-strip span,
.lc-card:not(.is-dark) .lc-roll-sym {
  color: var(--ink);
}

@keyframes lc-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes lc-in {
  from {
    opacity: 0;
    transform: translateY(60%);
  }
}

/* ───────────────────────── responsive ───────────────────────── */
@media (max-width: 980px) {
  .lc-cards {
    grid-template-columns: minmax(0, 520px);
    justify-content: center;
  }
  .lc-card.is-best {
    order: -1;
    transform: none;
  }
}
@media (max-width: 560px) {
  .lc {
    padding: 0 14px 56px;
  }
  .lc-stepper-row {
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 24px;
  }
  .lc-price {
    font-size: 60px;
  }
  .lc-term {
    font-size: 15px;
  }
  .lc-btn {
    height: 50px;
    font-size: 16px;
  }
  .lc-glow {
    width: 360px;
  }
}

/* ───────────────────────── reduced motion ───────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .lc *,
  .lc *::before,
  .lc *::after {
    transition-duration: 0ms !important;
    transition-delay: 0ms !important;
    animation: none !important;
  }
}
```

## Build / run

```
npm create vite@latest pricing-license -- --template react-ts
cd pricing-license
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/rethink-sans@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files, then:

```
npm run dev
```

`src/main.tsx` mounts `<App />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- No APIs, keys, accounts, or payment code.
- The product, plans and prices are fictional.
- Buttons and links point to `#`.
