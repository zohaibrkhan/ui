<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Choice — Pricing hero

Choice is a dark, mobile-style plan picker for a fictional file-transfer app, Ferry. A frosted phone card floats over a slowly drifting aurora of violet, blue and rose light with grain and a vignette, with `Plans` and the wordmark in the corners. Inside: `Choose a plan` with three radio cards (Personal, Plus, Studio), each with a glossy gradient tile, an eyebrow, the name, its price and a round check. The picked card gets a white ring, its check draws in and it unfolds to show three detail rows, a seat stepper for Studio and a `How it works` link, each row fading in after the last. Below: a Monthly / Yearly switch, a `Due today` box with a rolling total and the saving, the terms line and a large light button that names the plan. Document title: `Choice — Pricing Hero — Oversight Supply`.

Rebuild it as a full-screen pricing hero section. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Do not reformat, rename, or restyle them. Every visible string, number, colour, and timing in those files is the copy. Do not paraphrase it.

## Stack & dependencies

React 19, TypeScript, and Vite.

Fonts, imported in `src/main.tsx`:

- `@fontsource-variable/mona-sans`

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/mona-sans@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Full-height dark section, everything centred. The phone card is max 420px wide with a 40px radius, a frosted translucent background, a hairline edge and a home indicator at the bottom. Sections inside are headed `Choose a plan`, `Billing` and `Due today`.

## Interactions & animation

One pure function, `due(plan, billing, seats)`, returns what is due today (twelve months up front on yearly), the monthly equivalent and the yearly saving. Radio cards unfold by animating their grid row; the ring, check and tile shadows change on selection; the seat stepper presses in and disables at its limits; the billing pill slides with a soft spring; the total rolls digit by digit and glides sideways when it gains a digit; the side note and button label swap with a short rise; the saving pops in; the button presses down. The aurora blobs drift with transform-only keyframes. Every animated element also respects `prefers-reduced-motion`: the last rule in the stylesheet removes transitions and animations (values still change, instantly), and the JavaScript skips the Web Animations and hover effects it would otherwise play.

## Responsive behaviour

Below 760px the corner labels hide. Below 420px the card fills the screen with a smaller radius and the tiles shrink. Tested at 375px with no horizontal scroll.

## Accessibility & robustness

Every input is a real form control (range, number field, radio group) with a visible label, so arrow keys and screen readers work; links have visible labels and the current page uses `aria-current`. Every digit of the price sits in its own fixed-width `tabular-nums` column, and the plan and per-unit price are anchored to the right edge, so nothing around the price shifts as it changes. Focus rings are drawn with `:focus-visible`. Decorative layers are `aria-hidden`. Plans and billing are real radio groups with visible focus rings. A card’s details are `inert` until it is picked, so its stepper and link are only reachable when shown. The seat buttons have `aria-label`s. A polite live region announces the plan and what is due today.

## Performance notes

DOM and CSS only; the aurora is four soft radial gradients moved with transforms (no blur filters). The phone card uses `backdrop-filter`.

## Assets

No images. Tiles and icons are inline SVG; the grain is an inline SVG data URI.

## Putting it in an existing site

The section is the `<main>` returned by `App`. Its classes all share one short prefix, so they will not collide with your styles. The first rules in the stylesheet (`*`, `html, body`, `button`, `a`, `:focus-visible`) are page-level resets: keep them on a standalone page, drop or scope them when the hero goes inside a page that already has its own. Links point to `#` or `/`; change them to your routes. Money is formatted with `Intl.NumberFormat`.

To drop it into an existing React site, copy the files under `src/` (except `main.tsx`) and `src/assets/` into one folder such as `components/pricing-choice/`, install the dependencies above, move the font imports from `main.tsx` into your app entry, and render the default export of `App.tsx` as the first thing on the page. In Next.js, add `'use client'` at the top of `App.tsx`.

## Full source code

Create these files exactly. `index.html` replaces the Vite template’s `index.html`. The other files sit under `src/`. Delete unused Vite template files (`App.css`, `index.css`, `vite.svg`). Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#07070a" />
    <title>Choice — Pricing Hero — Oversight Supply</title>
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
import '@fontsource-variable/mona-sans'
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
import type { CSSProperties, ReactElement } from 'react'

/* ─────────────────────────────────────────────────────────────
   PRICING — three plans, monthly or yearly, Studio per seat.
   ───────────────────────────────────────────────────────────── */
type PlanId = 'personal' | 'plus' | 'studio'
type Billing = 'monthly' | 'yearly'
type Plan = {
  id: PlanId
  name: string
  eyebrow: string
  price: { monthly: number; yearly: number } // per month (per seat for Studio); yearly = monthly equivalent
  perSeat?: boolean
  rows: [string, string][]
  cta: string
}

const PRICING = {
  locale: 'en-US',
  currency: 'USD',
  yearlyOff: 0.2,
  seats: { min: 2, max: 50, start: 4 },
  plans: [
    {
      id: 'personal',
      name: 'Personal',
      eyebrow: 'For quick sends',
      price: { monthly: 0, yearly: 0 },
      rows: [
        ['Free', 'Up to 2 GB per transfer, no card needed'],
        ['Simple', 'Links stay live for 3 days'],
        ['Private', 'Password-protect any transfer'],
      ],
      cta: 'Start for free',
    },
    {
      id: 'plus',
      name: 'Plus',
      eyebrow: 'Picked most by creators',
      price: { monthly: 9, yearly: 7.2 },
      rows: [
        ['200 GB', 'Per transfer, as many as you like'],
        ['Branded', 'Your logo and colours on every page'],
        ['Tracked', 'See who opened and downloaded'],
      ],
      cta: 'Continue with Plus',
    },
    {
      id: 'studio',
      name: 'Studio',
      eyebrow: 'For teams that send daily',
      price: { monthly: 16, yearly: 12.8 },
      perSeat: true,
      rows: [
        ['1 TB', 'Per transfer, shared team storage'],
        ['Together', 'Shared inbox, roles and approvals'],
        ['Fast', 'Priority routing and live support'],
      ],
      cta: 'Continue with Studio',
    },
  ] as Plan[],
}

const PRODUCT = 'Ferry'

/* ───────────────────────── pricing logic ───────────────────────── */
type Due = { today: number; perMonth: number; renews: string; saving: number }

/** The one pure pricing function: what you pay today for a plan. */
export function due(plan: Plan, billing: Billing, seats: number): Due {
  const n = plan.perSeat ? seats : 1
  const perMonth = Math.round(plan.price[billing] * n * 100) / 100
  const today = billing === 'yearly' ? Math.round(perMonth * 12 * 100) / 100 : perMonth
  const saving = billing === 'yearly' ? Math.round((plan.price.monthly - plan.price.yearly) * n * 12 * 100) / 100 : 0
  return { today, perMonth, renews: billing === 'yearly' ? 'yearly' : 'monthly', saving }
}

const fmt = (n: number) => new Intl.NumberFormat(PRICING.locale, { style: 'currency', currency: PRICING.currency, minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })
const money = (n: number) => fmt(n).format(n)
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

/* ───────────────────────── rolling money ───────────────────────── */
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
function Roll({ value }: { value: number }) {
  const reduced = useReducedMotion()
  const row = useRef<HTMLSpanElement>(null)
  const prev = useRef(new Map<string, number>())
  const toks = useMemo(() => {
    const parts = fmt(value).formatToParts(value)
    const intLen = parts.filter((p) => p.type === 'integer' || p.type === 'group').reduce((n, p) => n + p.value.length, 0)
    let seen = 0
    let frac = 0
    const out: { k: string; ch: string; digit: boolean; cls: string }[] = []
    for (const p of parts)
      for (const ch of p.value) {
        if (p.type === 'integer' || p.type === 'group') out.push({ k: (p.type === 'group' ? 'g' : 'i') + (intLen - seen++), ch, digit: p.type === 'integer', cls: 'int' })
        else if (p.type === 'fraction') out.push({ k: 'f' + frac++, ch, digit: true, cls: 'frac' })
        else out.push({ k: `${p.type}-${ch}`, ch, digit: false, cls: p.type })
      }
    return out
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
  }, [toks, reduced])
  return (
    <span className="ch-roll" ref={row} aria-hidden="true">
      {toks.map((t, i) =>
        t.digit ? (
          <span key={t.k} data-k={t.k} className={`ch-roll-col is-${t.cls}`} style={{ '--n': i } as CSSProperties}>
            <span className="ch-roll-sizer">0</span>
            <span className="ch-roll-strip" style={{ transform: `translateY(${-Number(t.ch) * 10}%)` }}>
              {DIGITS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={t.k} data-k={t.k} className={`ch-roll-sym is-${t.cls}`}>
            {t.ch}
          </span>
        ),
      )}
    </span>
  )
}

/* ───────────────────────── glyph tiles ───────────────────────── */
const GLYPH: Record<PlanId, ReactElement> = {
  personal: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 17.5 26 7l-6.5 19-4.2-7.3L6 17.5Z" fill="currentColor" />
      <path d="m15.3 18.7 4.2-5.2" stroke="rgba(0,0,0,.25)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="9" width="20" height="15" rx="4" fill="currentColor" />
      <path d="M11 9V7.5A2.5 2.5 0 0 1 13.5 5h5A2.5 2.5 0 0 1 21 7.5V9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 13v7M12.5 16.5h7" stroke="rgba(0,0,0,.28)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  studio: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="11.5" cy="12" r="4" fill="currentColor" />
      <circle cx="21" cy="12.5" r="3.4" fill="currentColor" opacity=".75" />
      <path d="M4.5 25c.6-4.4 3.4-7 7-7s6.4 2.6 7 7Z" fill="currentColor" />
      <path d="M17.5 18.8c.9-.5 2.1-.8 3.4-.8 3 0 5.4 2.3 5.9 6.2h-6.6" fill="currentColor" opacity=".75" />
    </svg>
  ),
}

/* ───────────────────────── section ───────────────────────── */
export default function App() {
  const uid = useId()
  const [picked, setPicked] = useState<PlanId>('plus')
  const [billing, setBilling] = useState<Billing>('yearly')
  const [seats, setSeats] = useState(PRICING.seats.start)
  const plan = PRICING.plans.find((p) => p.id === picked)!
  const d = due(plan, billing, seats)
  const pct = Math.round(PRICING.yearlyOff * 100)

  const [announce, setAnnounce] = useState('')
  useEffect(() => {
    const t = setTimeout(
      () =>
        setAnnounce(
          d.today === 0
            ? `${plan.name} selected, free.`
            : `${plan.name}${plan.perSeat ? ` for ${seats} seats` : ''}: ${money(d.today)} due today, renews ${d.renews}.`,
        ),
      400,
    )
    return () => clearTimeout(t)
  }, [picked, billing, seats, d.today]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="ch">
      <div className="ch-aurora" aria-hidden="true">
        <span className="is-a" />
        <span className="is-b" />
        <span className="is-c" />
        <span className="is-d" />
      </div>
      <p className="ch-corner is-left" aria-hidden="true">
        Plans
      </p>
      <p className="ch-corner is-right" aria-hidden="true">
        <span className="ch-mark" />
        {PRODUCT}
      </p>

      <section className="ch-phone" aria-labelledby={`${uid}-h`}>
        <h1 id={`${uid}-h`} className="ch-title">
          Choose a plan
        </h1>

        <fieldset className="ch-plans">
          <legend className="ch-sr">Plan</legend>
          {PRICING.plans.map((p) => {
            const on = p.id === picked
            const pr = p.price[billing]
            return (
              <div key={p.id} className={`ch-plan is-${p.id}${on ? ' is-on' : ''}`}>
                <label className="ch-plan-top">
                  <input type="radio" name={`${uid}-plan`} value={p.id} checked={on} onChange={() => setPicked(p.id)} />
                  <span className="ch-tile" aria-hidden="true">
                    {GLYPH[p.id]}
                  </span>
                  <span className="ch-plan-text">
                    <span className="ch-eyebrow">{p.eyebrow}</span>
                    <span className="ch-plan-name">{p.name}</span>
                  </span>
                  <span className="ch-plan-price">
                    {pr === 0 ? 'Free' : `${money(pr)}`}
                    {pr > 0 && <small>{p.perSeat ? '/seat' : '/mo'}</small>}
                  </span>
                  <span className="ch-radio" aria-hidden="true">
                    <svg viewBox="0 0 16 16">
                      <path d="M4 8.3 6.8 11 12 5.4" pathLength={1} />
                    </svg>
                  </span>
                </label>
                <div className="ch-plan-body" inert={!on}>
                  <div className="ch-plan-inner">
                    {p.rows.map(([k, v], i) => (
                      <span key={k} className="ch-row" style={{ '--i': i } as CSSProperties}>
                        <b>{k}</b>
                        <span>{v}</span>
                      </span>
                    ))}
                    {p.perSeat && (
                      <span className="ch-seats" style={{ '--i': 3 } as CSSProperties}>
                        <b>Seats</b>
                        <span className="ch-stepper">
                          <button type="button" onClick={() => setSeats((s) => Math.max(PRICING.seats.min, s - 1))} disabled={seats <= PRICING.seats.min} aria-label="One seat fewer">
                            −
                          </button>
                          <output aria-live="off">{seats}</output>
                          <button type="button" onClick={() => setSeats((s) => Math.min(PRICING.seats.max, s + 1))} disabled={seats >= PRICING.seats.max} aria-label="One seat more">
                            +
                          </button>
                        </span>
                      </span>
                    )}
                    <a href="#" className="ch-how" style={{ '--i': 4 } as CSSProperties}>
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M8 1.5 9.3 6.7 14.5 8 9.3 9.3 8 14.5 6.7 9.3 1.5 8 6.7 6.7Z" />
                      </svg>
                      How it works
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </fieldset>

        <fieldset className="ch-billing" style={{ '--i': billing === 'yearly' ? 1 : 0 } as CSSProperties}>
          <legend className="ch-section">Billing</legend>
          <div className="ch-seg">
            <span className="ch-seg-pill" aria-hidden="true" />
            {(['monthly', 'yearly'] as Billing[]).map((b) => (
              <label key={b} className={`ch-seg-opt${billing === b ? ' is-on' : ''}`}>
                <input type="radio" name={`${uid}-bill`} checked={billing === b} onChange={() => setBilling(b)} />
                {b === 'monthly' ? 'Monthly' : 'Yearly'}
                {b === 'yearly' && <em>−{pct}%</em>}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="ch-total">
          <p className="ch-section">Due today</p>
          <div className="ch-total-box">
            <span className="ch-total-num">{d.today === 0 ? <span className="ch-free">Free</span> : <Roll value={d.today} />}</span>
            <span className="ch-total-side">
              <span key={`${billing}-${picked}`} className="ch-swap">
                {d.today === 0 ? 'No card needed' : billing === 'yearly' ? `${money(d.perMonth)} a month, billed yearly` : 'Billed monthly'}
              </span>
              {d.saving > 0 && <em className="ch-save">You save {money(d.saving)}</em>}
            </span>
          </div>
        </div>
        <p className="ch-terms">
          By continuing you agree to the <a href="#">terms of service</a>. Cancel anytime from settings.
        </p>
        <a href="#" className="ch-btn">
          <span key={picked} className="ch-swap">
            {plan.cta}
          </span>
        </a>
        <span className="ch-home" aria-hidden="true" />
        <p className="ch-sr" aria-live="polite">
          {announce}
        </p>
      </section>
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
  background: #07070a;
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
  outline: 2px solid #8ab4ff;
  outline-offset: 3px;
}

/* ───────────────────────── section ───────────────────────── */
.ch {
  --bg: #07070a;
  --phone: rgba(20, 20, 23, 0.82);
  --card: #212125;
  --card-on: #26262b;
  --ink: #f5f5f7;
  --ink-2: #b9b9c1;
  --ink-3: #85858e;
  --line: rgba(255, 255, 255, 0.07);
  --link: #6aa8ff;
  --save: #5ee0a0;
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --spring: cubic-bezier(0.34, 1.4, 0.64, 1);

  position: relative;
  min-height: 100svh;
  overflow: clip;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 72px 16px;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Mona Sans Variable', ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
.ch-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* drifting aurora: soft radial blobs, moved with transforms only */
.ch-aurora {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.ch-aurora span {
  position: absolute;
  width: 70vmax;
  height: 70vmax;
  border-radius: 50%;
  opacity: 1;
  animation: ch-drift 26s ease-in-out infinite alternate;
}
.ch-aurora .is-a {
  left: -20vmax;
  top: 20%;
  background: radial-gradient(closest-side, rgba(140, 110, 255, 0.7), rgba(140, 110, 255, 0) 70%);
}
.ch-aurora .is-b {
  right: -24vmax;
  top: 30%;
  background: radial-gradient(closest-side, rgba(96, 130, 255, 0.55), rgba(96, 130, 255, 0) 70%);
  animation-duration: 32s;
  animation-delay: -8s;
}
.ch-aurora .is-c {
  left: -10vmax;
  bottom: -40vmax;
  background: radial-gradient(closest-side, rgba(255, 82, 104, 0.62), rgba(255, 82, 104, 0) 70%);
  animation-duration: 22s;
  animation-delay: -4s;
}
.ch-aurora .is-d {
  right: 0;
  bottom: -46vmax;
  background: radial-gradient(closest-side, rgba(210, 170, 255, 0.45), rgba(210, 170, 255, 0) 70%);
  animation-duration: 30s;
  animation-delay: -14s;
}
.ch-aurora::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0, rgba(7, 7, 10, 0.4) 100%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.ch-corner {
  position: absolute;
  top: 40px;
  margin: 0;
  color: rgba(255, 255, 255, 0.16);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.ch-corner.is-left {
  left: max(32px, 6vw);
}
.ch-corner.is-right {
  right: max(32px, 6vw);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.ch-mark {
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
}

/* ───────────────────────── phone ───────────────────────── */
.ch-phone {
  position: relative;
  z-index: 1;
  width: min(100%, 420px);
  padding: 28px 16px 12px;
  border-radius: 40px;
  background: var(--phone);
  -webkit-backdrop-filter: blur(30px) saturate(140%);
  backdrop-filter: blur(30px) saturate(140%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 40px 100px -30px rgba(0, 0, 0, 0.8);
}
.ch-title,
.ch-section {
  margin: 0 4px;
  padding: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.ch-plans {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-inline-size: 0;
  margin: 18px 0 0;
  padding: 0;
  border: 0;
}
.ch-plan {
  border-radius: 22px;
  background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line);
  transition: background-color 260ms var(--ease), box-shadow 260ms var(--ease), transform 160ms var(--ease);
}
.ch-plan:hover:not(.is-on) {
  background: #26262a;
}
.ch-plan.is-on {
  background: var(--card-on);
  box-shadow:
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.92),
    0 14px 30px -18px rgba(0, 0, 0, 0.8);
}
.ch-plan:has(.ch-plan-top:active):not(.is-on) {
  transform: scale(0.985);
}
.ch-plan:has(input:focus-visible) {
  outline: 2px solid #8ab4ff;
  outline-offset: 3px;
}
.ch-plan-top {
  position: relative;
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) auto 24px;
  align-items: center;
  gap: 12px;
  padding: 12px 14px 12px 12px;
  cursor: pointer;
}
.ch-plan-top input {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
.ch-tile {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 15px;
  color: #fff;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.5),
    inset 0 -4px 8px rgba(0, 0, 0, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.6);
}
.ch-tile svg {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
}
.is-personal .ch-tile {
  background: linear-gradient(145deg, #8fdcff, #3474ff);
}
.is-plus .ch-tile {
  background: linear-gradient(145deg, #ffb18f, #ff4f8b);
}
.is-studio .ch-tile {
  background: linear-gradient(145deg, #c7b2ff, #6a4dff);
}
.ch-plan-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.ch-eyebrow {
  overflow: hidden;
  color: var(--ink-3);
  font-size: 12.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ch-plan-name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.ch-plan-price {
  font-size: 14px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.ch-plan-price small {
  margin-left: 2px;
  color: var(--ink-3);
  font-size: 12px;
  font-weight: 500;
}
.ch-radio {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.28);
  transition: background-color 220ms var(--ease), box-shadow 220ms var(--ease), transform 300ms var(--spring);
}
.ch-radio svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: #111;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 120ms var(--ease);
}
.ch-plan.is-on .ch-radio {
  background: #fff;
  box-shadow: none;
  transform: scale(1.06);
}
.ch-plan.is-on .ch-radio svg {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 300ms var(--ease) 80ms;
}
.ch-plan-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 420ms var(--ease);
}
.ch-plan.is-on .ch-plan-body {
  grid-template-rows: 1fr;
}
.ch-plan-inner {
  min-height: 0;
  overflow: hidden;
  padding: 0 16px;
}
.ch-row,
.ch-seats,
.ch-how {
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 160ms var(--ease), transform 200ms var(--ease);
}
.ch-plan.is-on .ch-row,
.ch-plan.is-on .ch-seats,
.ch-plan.is-on .ch-how {
  opacity: 1;
  transform: none;
  transition:
    opacity 260ms var(--ease) calc(120ms + var(--i) * 55ms),
    transform 320ms var(--ease) calc(120ms + var(--i) * 55ms);
}
.ch-row,
.ch-seats {
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 11px 0;
  border-top: 1px solid var(--line);
  font-size: 13.5px;
}
.ch-row b,
.ch-seats b {
  font-weight: 650;
}
.ch-row span {
  color: var(--ink-2);
}
.ch-stepper {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  justify-self: start;
  padding: 3px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.06);
}
.ch-stepper button {
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 160ms var(--ease), background-color 200ms var(--ease);
}
.ch-stepper button:hover {
  background: rgba(255, 255, 255, 0.16);
}
.ch-stepper button:active {
  transform: scale(0.88);
}
.ch-stepper button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.ch-stepper output {
  min-width: 2.4ch;
  text-align: center;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.ch-how {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin: 4px 0 16px;
  color: var(--link);
  font-size: 13.5px;
  font-weight: 550;
  border-radius: 6px;
}
.ch-how svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}
.ch-how:hover {
  color: #94c0ff;
}

/* billing + total */
.ch-billing {
  min-inline-size: 0;
  margin: 26px 0 0;
  padding: 0;
  border: 0;
}
.ch-seg {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 12px;
  padding: 4px;
  border-radius: 16px;
  background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line);
}
.ch-seg-pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  border-radius: 12px;
  background: #3a3a41;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transform: translateX(calc(var(--i) * 100%));
  transition: transform 420ms var(--spring);
}
.ch-seg-opt {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 40px;
  border-radius: 12px;
  color: var(--ink-3);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: color 200ms var(--ease);
}
.ch-seg-opt.is-on {
  color: var(--ink);
}
.ch-seg-opt input {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
.ch-seg-opt:has(input:focus-visible) {
  outline: 2px solid #8ab4ff;
  outline-offset: 1px;
}
.ch-seg-opt em {
  color: var(--save);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
}
.ch-total {
  margin-top: 26px;
}
.ch-total-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 64px;
  margin-top: 12px;
  padding: 10px 16px;
  border-radius: 16px;
  background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line);
}
.ch-total-num {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.ch-free {
  display: inline-block;
  animation: ch-in 300ms var(--ease);
}
.ch-total-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: clip;
  color: var(--ink-3);
  font-size: 12.5px;
  text-align: right;
}
.ch-save {
  color: var(--save);
  font-style: normal;
  font-weight: 650;
  animation: ch-pop 420ms var(--spring);
}
.ch-terms {
  margin: 14px 6px 0;
  color: var(--ink-3);
  font-size: 12.5px;
}
.ch-terms a {
  text-decoration: underline;
  text-underline-offset: 2px;
}
.ch-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: clip;
  height: 56px;
  margin-top: 16px;
  border-radius: 18px;
  background: linear-gradient(180deg, #f6f6f8, #d6d6dc);
  color: #111114;
  font-size: 16px;
  font-weight: 650;
  box-shadow:
    inset 0 1px 0 #fff,
    0 10px 24px -12px rgba(255, 255, 255, 0.35);
  transition: transform 160ms var(--ease), box-shadow 220ms var(--ease);
}
.ch-btn:hover {
  box-shadow:
    inset 0 1px 0 #fff,
    0 14px 30px -12px rgba(255, 255, 255, 0.45);
}
.ch-btn:active {
  transform: scale(0.97);
}
.ch-home {
  display: block;
  width: 120px;
  height: 5px;
  margin: 14px auto 0;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.32);
}
.ch-swap {
  display: inline-block;
  animation: ch-in 300ms var(--ease);
}

/* rolling number */
.ch-roll {
  --lh: 1.12em;
  display: inline-flex;
  align-items: flex-start;
  font-variant-numeric: tabular-nums;
}
.ch-roll-col,
.ch-roll-sym {
  position: relative;
  display: block;
  height: var(--lh);
  line-height: var(--lh);
}
.ch-roll-col {
  overflow: clip;
  -webkit-mask-image: linear-gradient(transparent 0, #000 14%, #000 86%, transparent 100%);
  mask-image: linear-gradient(transparent 0, #000 14%, #000 86%, transparent 100%);
}
.ch-roll-sizer {
  visibility: hidden;
}
.ch-roll-strip {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: transform 520ms var(--ease) calc(var(--n) * 14ms);
}
.ch-roll-strip > span {
  height: var(--lh);
}
.ch-roll .is-currency,
.ch-roll .is-decimal,
.ch-roll .is-frac {
  margin-top: 0.1em;
  font-size: 0.6em;
  color: var(--ink-2);
}

@keyframes ch-drift {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(6vmax, -4vmax, 0) scale(1.08);
  }
  100% {
    transform: translate3d(-4vmax, 5vmax, 0) scale(0.95);
  }
}
@keyframes ch-in {
  from {
    opacity: 0;
    transform: translateY(60%);
  }
}
@keyframes ch-pop {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
}

@media (max-width: 760px) {
  .ch-corner {
    display: none;
  }
}
@media (max-width: 420px) {
  .ch {
    padding: 16px 10px;
  }
  .ch-phone {
    border-radius: 34px;
    padding: 24px 12px 12px;
  }
  .ch-plan-top {
    grid-template-columns: 46px minmax(0, 1fr) auto 22px;
    gap: 10px;
  }
  .ch-tile {
    width: 46px;
    height: 46px;
  }
}

/* ───────────────────────── reduced motion ───────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .ch *,
  .ch *::before,
  .ch *::after {
    transition-duration: 0ms !important;
    transition-delay: 0ms !important;
    animation: none !important;
  }
}
```

## Build / run

```
npm create vite@latest pricing-choice -- --template react-ts
cd pricing-choice
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/mona-sans@^5.3.0
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
