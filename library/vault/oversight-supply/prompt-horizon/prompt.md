<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Horizon — AI prompt hero

Horizon is a cinematic, dark hero for a prediction model, set over a misty valley at sunrise with slow god-rays and a glowing perspective grid on the ground. The prompt panel has corner brackets that spread when focused. You can drop a real CSV anywhere on the page (or load a sample): it finds the last numeric column and, when you press Predict, draws the history in white and a forecast in amber with a widening 90% band right across the horizon, with numbers that count up and a crosshair that reads values under the pointer. The forecast is a small trend + seasonality fit computed in the browser. Document title: `Horizon — AI Prompt Hero — Oversight Supply`.

Rebuild it as a full-screen hero section. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Do not reformat, rename, or restyle them. Every visible string, number, colour, and timing in those files is the copy. Do not paraphrase it.

## Stack & dependencies

React 19, TypeScript, and Vite.

Fonts, imported in `src/main.tsx`:

- `@fontsource-variable/geist`
- `@fontsource-variable/geist-mono`

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/geist@^5.3.0 @fontsource-variable/geist-mono@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Top bar: model menu `Augur-1 · 30 days` (7 / 30 / 90 day horizons), centred `AUGUR`, light `Try API for free` button. Centre: `The forecasting lab` eyebrow, `Predict anything.` headline, dark glass panel with a typewriter placeholder, `Upload CSV`, `or use sample` and `Predict ›`. Under it: `The foundation model for prediction.` / `No training. No pipelines.` After a prediction the chart takes the bottom third of the screen with two stats.

## Interactions & animation

The valley fades up from dark and follows the pointer. The grid speeds up while predicting and the brackets pulse. Dragging a file over the page shows a dashed drop zone. Errors for non-CSV files or files with no numbers appear under the panel. The headline shrinks and the tagline fades when a chart is showing. Every animated element also respects `prefers-reduced-motion`: the last rule in the stylesheet removes motion, and the JavaScript loops skip their idle movement.

## Responsive behaviour

One screen (`100svh`, minimum 640px). Below 640px the centre brand and the hover tooltip hide and the panel row wraps.

## Accessibility & robustness

Every button is a real `<button>` with a visible label or an `aria-label`; switches use `role="radio"`/`radiogroup` or `aria-pressed`; text that changes during a run sits in an `aria-live` region. Focus rings are drawn with `:focus-visible`. Decorative layers are `aria-hidden`.

## Performance notes

One 2400px WebP background, CSS effects, one SVG chart. The CSV is parsed locally with `File.text()`.

## Assets

One photograph: `src/assets/valley.webp`, loaded with `new URL('./assets/valley.webp', import.meta.url)`.

## Putting it in an existing site

The section is the `<main>` returned by `App`. Its classes all share one short prefix, so they will not collide with your styles. The first rules in the stylesheet (`*`, `html, body`, `button`, `a`, `:focus-visible`) are page-level resets: keep them on a standalone page, drop or scope them when the hero goes inside a page that already has its own. Links point to `#` or `/`; change them to your routes.

## Full source code

Create these files exactly. `index.html` replaces the Vite template’s `index.html`. The other files sit under `src/`. Delete unused Vite template files (`App.css`, `index.css`, `vite.svg`). Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#1b1816" />
    <title>Horizon — AI Prompt Hero — Oversight Supply</title>
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
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
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
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, DragEvent, FormEvent, PointerEvent as RPointerEvent } from 'react'

/* Horizon — a prediction-model hero over a misty valley at dawn. Type what to
   predict (or drop a real CSV) and a forecast is drawn across the horizon:
   history in white, the forecast in amber with a widening confidence band.
   The forecast is a small trend + seasonality fit, computed in the browser. */

const valley = new URL('./assets/valley.webp', import.meta.url).href

const HORIZONS = { '7d': { label: '7 days', n: 7 }, '30d': { label: '30 days', n: 14 }, '90d': { label: '90 days', n: 22 } } as const
type Horizon = keyof typeof HORIZONS
const LINES = ['Predict customer churn for next quarter', 'Predict weekly demand for oat milk', 'Predict which leads will convert', 'Predict server load on launch day']

function useReduced() {
  const [r, setR] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const f = () => setR(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  return r
}

function useTypewriter(lines: string[], active: boolean, reduced: boolean) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (!active) return
    if (reduced) {
      setText(lines[0])
      return
    }
    let line = 0, i = 0, dir = 1, id = 0
    const tick = () => {
      const full = lines[line]
      i += dir
      setText(full.slice(0, i))
      let wait = dir > 0 ? 45 + Math.random() * 45 : 18
      if (dir > 0 && i >= full.length) { dir = -1; wait = 2000 }
      else if (dir < 0 && i <= 0) { dir = 1; line = (line + 1) % lines.length; wait = 400 }
      id = window.setTimeout(tick, wait)
    }
    id = window.setTimeout(tick, 900)
    return () => clearTimeout(id)
  }, [lines, active, reduced])
  return text
}

/** a seeded, plausible-looking series for when no CSV is given */
function synth(seed: string, n = 40) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  const rnd = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296
  const base = 40 + rnd() * 60
  const slope = (rnd() - 0.35) * 1.2
  const amp = 4 + rnd() * 10
  return Array.from({ length: n }, (_, t) => base + slope * t + amp * Math.sin((t / 12) * Math.PI * 2 + rnd() * 0.3) + (rnd() - 0.5) * amp * 0.7)
}

/** the last mostly-numeric column of a CSV */
function parseCsv(text: string): { name: string; values: number[] } | null {
  const rows = text.trim().split(/\r?\n/).map((r) => r.split(/[,;\t]/).map((c) => c.trim().replace(/^"|"$/g, '')))
  if (rows.length < 4) return null
  const header = rows[0].some((c) => c && isNaN(Number(c))) ? rows.shift()! : null
  const cols = Math.max(...rows.map((r) => r.length))
  for (let c = cols - 1; c >= 0; c--) {
    const vals = rows.map((r) => Number(r[c])).filter((v) => Number.isFinite(v))
    if (vals.length >= rows.length * 0.8 && vals.length >= 4) return { name: header?.[c] || `column ${c + 1}`, values: vals.slice(-60) }
  }
  return null
}

/** trend + seasonality, with a band that widens with distance */
function forecast(y: number[], k: number) {
  const n = y.length
  const w = Math.min(n, 24)
  const xs = y.slice(-w).map((_, i) => n - w + i)
  const ys = y.slice(-w)
  const mx = xs.reduce((a, b) => a + b) / w
  const my = ys.reduce((a, b) => a + b) / w
  let num = 0, den = 0
  xs.forEach((x, i) => { num += (x - mx) * (ys[i] - my); den += (x - mx) ** 2 })
  const b = den ? num / den : 0
  const a = my - b * mx
  const P = 12
  const season = Array(P).fill(0)
  const cnt = Array(P).fill(0)
  if (n >= P * 2) y.forEach((v, t) => { season[t % P] += v - (a + b * t); cnt[t % P]++ })
  season.forEach((_, i) => (season[i] = cnt[i] ? season[i] / cnt[i] : 0))
  const resid = y.map((v, t) => v - (a + b * t + season[t % P]))
  const sd = Math.sqrt(resid.reduce((s, r) => s + r * r, 0) / Math.max(1, n - 2)) || 1
  return Array.from({ length: k }, (_, i) => {
    const t = n + i
    const m = a + b * t + season[t % P]
    const band = 1.64 * sd * Math.sqrt(1 + (i + 1) / 4)
    return { m, lo: m - band, hi: m + band }
  })
}

type Data = { name: string; values: number[]; file?: string }
type Phase = 'idle' | 'running' | 'done'

export default function App() {
  const reduced = useReduced()
  const [value, setValue] = useState('')
  const [horizon, setHorizon] = useState<Horizon>('30d')
  const [menu, setMenu] = useState(false)
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [question, setQuestion] = useState('')
  const [hover, setHover] = useState<number | null>(null)
  const [count, setCount] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)
  const scene = useRef<HTMLElement>(null)
  const ghost = useTypewriter(LINES, !value && phase === 'idle', reduced)

  useEffect(() => {
    if (reduced) return
    const move = (e: PointerEvent) => {
      scene.current?.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3))
      scene.current?.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3))
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [reduced])

  useEffect(() => {
    if (!menu) return
    const close = (e: PointerEvent) => { if (!(e.target as Element).closest('.hz-model')) setMenu(false) }
    window.addEventListener('pointerdown', close)
    return () => window.removeEventListener('pointerdown', close)
  }, [menu])

  const series = useMemo(() => {
    if (phase === 'idle') return null
    const hist = data?.values ?? synth(question)
    return { hist, fc: forecast(hist, HORIZONS[horizon].n), name: data?.name ?? question.replace(/^predict\s+/i, '') }
  }, [phase, data, question, horizon])

  const change = series ? ((series.fc.reduce((s, p) => s + p.m, 0) / series.fc.length - series.hist[series.hist.length - 1]) / Math.abs(series.hist[series.hist.length - 1] || 1)) * 100 : 0
  const conf = series ? Math.max(62, Math.min(97, Math.round(100 - ((series.fc[series.fc.length - 1].hi - series.fc[series.fc.length - 1].lo) / Math.abs(series.fc[series.fc.length - 1].m || 1)) * 60))) : 0

  // numbers count up when the forecast lands
  useEffect(() => {
    if (phase !== 'done') return
    if (reduced) { setCount(1); return }
    let raf = 0
    const t0 = performance.now()
    const f = (now: number) => {
      const p = Math.min(1, (now - t0) / 1200)
      setCount(1 - (1 - p) ** 3)
      if (p < 1) raf = requestAnimationFrame(f)
    }
    raf = requestAnimationFrame(f)
    return () => cancelAnimationFrame(raf)
  }, [phase, reduced, series])

  const run = (q: string) => {
    const text = q.trim() || (ghost && LINES.find((l) => l.startsWith(ghost))) || LINES[0]
    setQuestion(text)
    setValue(text)
    setPhase('running')
    setCount(0)
    window.setTimeout(() => setPhase('done'), reduced ? 0 : 1400)
  }
  const submit = (e: FormEvent) => { e.preventDefault(); run(value) }

  const readFile = (f: File | undefined) => {
    if (!f) return
    if (!/\.(csv|tsv|txt)$/i.test(f.name) && f.type !== 'text/csv') { setError('That doesn’t look like a CSV.'); return }
    f.text().then((t) => {
      const p = parseCsv(t)
      if (!p) { setError('Couldn’t find a numeric column in that file.'); return }
      setError('')
      setData({ ...p, file: f.name })
      if (!value) setValue(`Predict ${p.name}`)
    })
  }
  const onFile = (e: ChangeEvent<HTMLInputElement>) => { readFile(e.target.files?.[0]); e.target.value = '' }
  const onDrop = (e: DragEvent) => { e.preventDefault(); setDragging(false); readFile(e.dataTransfer.files?.[0]) }
  const sample = () => {
    const rows = ['week,signups', ...synth('sample', 36).map((v, i) => `${i + 1},${v.toFixed(1)}`)]
    setData({ ...parseCsv(rows.join('\n'))!, file: 'sample-signups.csv' })
    setValue('Predict weekly signups')
    setError('')
  }

  // chart geometry
  const chart = useMemo(() => {
    if (!series) return null
    const all = [...series.hist, ...series.fc.flatMap((p) => [p.lo, p.hi])]
    const min = Math.min(...all), max = Math.max(...all)
    const N = series.hist.length + series.fc.length
    const X = (i: number) => (i / (N - 1)) * 1000
    const Y = (v: number) => 270 - ((v - min) / (max - min || 1)) * 240
    const h = series.hist.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join('')
    const last = series.hist.length - 1
    const f = `M${X(last)},${Y(series.hist[last])}` + series.fc.map((p, i) => `L${X(last + 1 + i).toFixed(1)},${Y(p.m).toFixed(1)}`).join('')
    const band = `M${X(last)},${Y(series.hist[last])}` + series.fc.map((p, i) => `L${X(last + 1 + i).toFixed(1)},${Y(p.hi).toFixed(1)}`).join('') + series.fc.slice().reverse().map((p, i) => `L${X(N - 1 - i).toFixed(1)},${Y(p.lo).toFixed(1)}`).join('') + 'Z'
    const area = h + `L${X(last)},300L0,300Z`
    return { h, f, band, area, X, Y, N, last }
  }, [series])

  const onChartMove = (e: RPointerEvent<SVGSVGElement>) => {
    if (!chart) return
    const r = e.currentTarget.getBoundingClientRect()
    setHover(Math.max(0, Math.min(chart.N - 1, Math.round(((e.clientX - r.left) / r.width) * (chart.N - 1)))))
  }
  const hoverVal = series && hover !== null ? (hover <= chart!.last ? { v: series.hist[hover], f: false } : { v: series.fc[hover - chart!.last - 1].m, f: true }) : null
  const fmt = (v: number) => (Math.abs(v) >= 1000 ? v.toLocaleString(undefined, { maximumFractionDigits: 0 }) : v.toFixed(1))

  return (
    <main
      ref={scene}
      className={`hz is-${phase} ${dragging ? 'is-drag' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={(e) => { if (e.currentTarget === e.target) setDragging(false) }}
      onDrop={onDrop}
    >
      <div className="hz-bg" aria-hidden="true">
        <div className="hz-photo" style={{ backgroundImage: `url(${valley})` }} />
        <div className="hz-rays" />
        <div className="hz-grid"><i /></div>
        <div className="hz-shade" />
      </div>

      <header className="hz-top">
        <div className="hz-model">
          <button type="button" aria-haspopup="listbox" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
            <span className="hz-dot" /> Augur-1 · {HORIZONS[horizon].label}
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
          </button>
          <ul role="listbox" className={menu ? 'is-open' : ''} aria-label="Forecast horizon">
            {(Object.keys(HORIZONS) as Horizon[]).map((k) => (
              <li key={k} role="option" aria-selected={k === horizon} tabIndex={menu ? 0 : -1} onClick={() => { setHorizon(k); setMenu(false) }} onKeyDown={(e) => { if (e.key === 'Enter') { setHorizon(k); setMenu(false) } }}>
                {HORIZONS[k].label}<small>{k === '7d' ? 'fastest' : k === '30d' ? 'default' : 'widest band'}</small>
              </li>
            ))}
          </ul>
        </div>
        <a className="hz-brand" href="/">AUGUR</a>
        <a className="hz-api" href="#"><span>Try API for free</span><i aria-hidden="true">›</i></a>
      </header>

      <section className="hz-hero">
        <p className="hz-eyebrow">The forecasting lab</p>
        <h1>Predict anything.</h1>

        <form className="hz-panel" onSubmit={submit}>
          <i className="hz-c hz-c1" /><i className="hz-c hz-c2" /><i className="hz-c hz-c3" /><i className="hz-c hz-c4" />
          <div className="hz-field">
            <textarea
              rows={2}
              value={value}
              aria-label="What should Augur predict?"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); run(value) } }}
            />
            {!value && <span className="hz-ghost" aria-hidden="true">{ghost}<i /></span>}
          </div>
          <div className="hz-row">
            <input ref={fileRef} type="file" accept=".csv,.tsv,.txt,text/csv" hidden onChange={onFile} />
            {data ? (
              <span className="hz-file">
                <b>{data.file}</b> {data.values.length} rows · {data.name}
                <button type="button" aria-label="Remove file" onClick={() => setData(null)}>×</button>
              </span>
            ) : (
              <>
                <button type="button" className="hz-ghostbtn" onClick={() => fileRef.current?.click()}><span aria-hidden="true">⊕</span> Upload CSV</button>
                <button type="button" className="hz-link" onClick={sample}>or use sample</button>
              </>
            )}
            <button type="submit" className="hz-go" disabled={phase === 'running'}>
              <span>{phase === 'running' ? 'Predicting' : 'Predict'}</span>
              <i aria-hidden="true">{phase === 'running' ? <b className="hz-spin" /> : '›'}</i>
            </button>
          </div>
          {error && <p className="hz-err" role="alert">{error}</p>}
        </form>

        <p className="hz-tag">The foundation model for prediction.<br />No training. No pipelines.</p>
      </section>

      {series && chart && (
        <section className="hz-chart" aria-label={`Forecast for ${series.name}`}>
          <div className="hz-stats">
            <div>
              <small>{series.name}</small>
              <b className={change >= 0 ? 'is-up' : 'is-down'}>{change >= 0 ? '+' : ''}{(change * count).toFixed(1)}%</b>
              <span>next {HORIZONS[horizon].label}</span>
            </div>
            <div>
              <small>confidence</small>
              <b>{Math.round(conf * count)}%</b>
              <span>90% band shown</span>
            </div>
            {hoverVal && (
              <div className="hz-tip">
                <small>{hoverVal.f ? 'forecast' : 'actual'} · t{hover! - chart.last >= 0 ? '+' : ''}{hover! - chart.last}</small>
                <b>{fmt(hoverVal.v)}</b>
              </div>
            )}
          </div>
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" onPointerMove={onChartMove} onPointerLeave={() => setHover(null)}>
            <defs>
              <linearGradient id="hz-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".16" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
              <linearGradient id="hz-band" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffb257" stopOpacity=".05" /><stop offset="1" stopColor="#ffb257" stopOpacity=".32" /></linearGradient>
            </defs>
            <path className="hz-area" d={chart.area} fill="url(#hz-area)" />
            <path className="hz-hist" d={chart.h} pathLength={1} />
            {phase === 'done' && (
              <>
                <path className="hz-band" d={chart.band} fill="url(#hz-band)" />
                <path className="hz-fc" d={chart.f} pathLength={1} />
                <line className="hz-now" x1={chart.X(chart.last)} x2={chart.X(chart.last)} y1="0" y2="300" />
              </>
            )}
            {hover !== null && hoverVal && <line className="hz-cross" x1={chart.X(hover)} x2={chart.X(hover)} y1="0" y2="300" />}
          </svg>
          {phase === 'done' && <span className="hz-nowlabel" style={{ left: `${(chart.X(chart.last) / 1000) * 100}%` }}>now</span>}
        </section>
      )}

      <div className="hz-drop" aria-hidden={!dragging}><p>Drop your CSV anywhere</p></div>
    </main>
  )
}
```

### `src/style.css`

```css
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; background: #1b1816; color: #f6f1ea; font-family: 'Geist Variable', Geist, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
button, textarea { font: inherit; color: inherit; }
a { color: inherit; }
:focus-visible { outline: 1.5px solid #ffb257; outline-offset: 3px; }

.hz { --px: 0; --py: 0; --mono: 'Geist Mono Variable', ui-monospace, monospace; --amber: #ffb257; --ease: cubic-bezier(0.22, 1, 0.36, 1); --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative; height: 100vh; height: 100svh; min-height: 640px; overflow: hidden; overflow: clip; isolation: isolate; display: flex; flex-direction: column; }
.hz-bg { position: absolute; inset: 0; z-index: -1; overflow: hidden; }
.hz-photo { position: absolute; inset: -4%; background: center 60% / cover no-repeat; transform: translate3d(calc(var(--px) * -18px), calc(var(--py) * -10px), 0) scale(1.06); transition: filter 1.4s var(--ease); animation: hz-dawn 3s var(--ease) both; }
@keyframes hz-dawn { from { filter: brightness(0.2) saturate(0.4); transform: scale(1.14); } }
.hz.is-done .hz-photo { filter: brightness(0.75) saturate(0.85); }
.hz-shade { position: absolute; inset: 0; background: radial-gradient(80% 55% at 50% 40%, rgb(20 16 14 / 0.15), rgb(20 16 14 / 0.6) 100%), linear-gradient(180deg, rgb(20 16 14 / 0.55), transparent 30%, transparent 55%, rgb(20 16 14 / 0.85)); }
.hz-rays { position: absolute; left: 50%; top: 52%; width: 200vmax; height: 200vmax; translate: -50% -50%; background: repeating-conic-gradient(from 0deg, rgb(255 210 150 / 0.06) 0deg 4deg, transparent 4deg 13deg); -webkit-mask: radial-gradient(circle, #000 0%, transparent 45%); mask: radial-gradient(circle, #000 0%, transparent 45%); mix-blend-mode: screen; animation: hz-rot 120s linear infinite; }
@keyframes hz-rot { to { rotate: 360deg; } }
.hz-grid { position: absolute; left: 0; right: 0; bottom: 0; height: 46%; perspective: 340px; perspective-origin: 50% 0%; -webkit-mask: linear-gradient(180deg, transparent, #000 40%); mask: linear-gradient(180deg, transparent, #000 40%); opacity: 0.28; transition: opacity 1.2s var(--ease); }
.hz.is-running .hz-grid, .hz.is-done .hz-grid { opacity: 0.6; }
.hz-grid i { position: absolute; left: -50%; right: -50%; top: 0; height: 200%; transform-origin: 50% 0; transform: rotateX(72deg); background-image: linear-gradient(rgb(255 200 140 / 0.7) 1px, transparent 1px), linear-gradient(90deg, rgb(255 200 140 / 0.7) 1px, transparent 1px); background-size: 64px 64px; animation: hz-scroll 4s linear infinite; }
.hz.is-running .hz-grid i { animation-duration: 0.8s; }
@keyframes hz-scroll { to { background-position: 0 64px; } }

/* top bar */
.hz-top { position: relative; z-index: 5; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 16px clamp(16px, 3vw, 28px); animation: hz-fade 1.2s 0.6s var(--ease) both; }
.hz-model { position: relative; justify-self: start; }
.hz-model > button { white-space: nowrap; display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 6px; border: 1px solid rgb(255 255 255 / 0.12); background: rgb(20 16 14 / 0.55); font: 500 12px/1 var(--mono); letter-spacing: 0.04em; cursor: pointer; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); transition: background 0.2s, border-color 0.2s; }
.hz-model > button:hover { border-color: rgb(255 178 87 / 0.5); }
.hz-model svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 1.6; transition: transform 0.35s var(--spring); }
.hz-model > button[aria-expanded='true'] svg { transform: rotate(180deg); }
.hz-dot { width: 7px; height: 7px; border-radius: 50%; background: #6dffb0; box-shadow: 0 0 8px #6dffb0; }
.hz-model ul { position: absolute; top: calc(100% + 6px); left: 0; min-width: 200px; margin: 0; padding: 4px; list-style: none; border-radius: 8px; border: 1px solid rgb(255 255 255 / 0.12); background: rgb(28 23 20 / 0.92); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); transform-origin: top left; transform: scale(0.92) translateY(-4px); opacity: 0; pointer-events: none; transition: transform 0.35s var(--spring), opacity 0.2s; }
.hz-model ul.is-open { transform: none; opacity: 1; pointer-events: auto; }
.hz-model li { display: flex; justify-content: space-between; gap: 14px; padding: 9px 10px; border-radius: 5px; font: 500 12px/1 var(--mono); cursor: pointer; }
.hz-model li small { opacity: 0.45; font-size: 10.5px; }
.hz-model li:hover, .hz-model li:focus-visible { background: rgb(255 255 255 / 0.08); outline: 0; }
.hz-model li[aria-selected='true'] { color: var(--amber); }
.hz-brand { font: 600 13px/1 var(--mono); letter-spacing: 0.5em; text-decoration: none; opacity: 0.85; }
.hz-api { justify-self: end; display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 4px; background: #f6f1ea; color: #1b1816; font: 600 11.5px/1 var(--mono); letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; transition: transform 0.35s var(--spring), box-shadow 0.3s; }
.hz-api i { font-style: normal; transition: transform 0.35s var(--spring); }
.hz-api:hover { transform: translateY(-1px); box-shadow: 0 0 0 4px rgb(255 178 87 / 0.25), 0 10px 24px -8px rgb(255 178 87 / 0.6); }
.hz-api:hover i { transform: translateX(4px); }

/* hero */
.hz-hero { position: relative; z-index: 3; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 16px 14vh; transition: transform 1s var(--ease), padding 1s var(--ease); }
.hz:not(.is-idle) .hz-hero { padding-bottom: 36vh; }
.hz-eyebrow { margin: 0 0 14px; font: 500 11px/1 var(--mono); letter-spacing: 0.32em; text-transform: uppercase; color: rgb(246 241 234 / 0.62); animation: hz-rise 1.2s 0.5s var(--ease) both; }
.hz h1 { margin: 0; font-weight: 500; font-size: clamp(44px, 7vw, 84px); letter-spacing: -0.05em; line-height: 1; text-shadow: 0 4px 40px rgb(0 0 0 / 0.4); animation: hz-rise 1.3s 0.6s var(--ease) both; transition: font-size 1s var(--ease); }
.hz:not(.is-idle) h1 { font-size: clamp(32px, 4.6vw, 56px); }

.hz-panel { position: relative; width: min(600px, 100%); margin-top: clamp(22px, 4vh, 36px); padding: 16px; background: rgb(24 20 17 / 0.62); border: 1px solid rgb(255 255 255 / 0.1); backdrop-filter: blur(18px) saturate(1.2); -webkit-backdrop-filter: blur(18px) saturate(1.2); text-align: left; box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.8); animation: hz-rise 1.3s 0.75s var(--ease) both; transition: border-color 0.4s; }
.hz-panel:focus-within { border-color: rgb(255 178 87 / 0.35); }
.hz-c { position: absolute; width: 12px; height: 12px; border: 1.5px solid rgb(246 241 234 / 0.7); transition: transform 0.5s var(--spring), border-color 0.3s; }
.hz-c1 { left: -7px; top: -7px; border-right: 0; border-bottom: 0; }
.hz-c2 { right: -7px; top: -7px; border-left: 0; border-bottom: 0; }
.hz-c3 { left: -7px; bottom: -7px; border-right: 0; border-top: 0; }
.hz-c4 { right: -7px; bottom: -7px; border-left: 0; border-top: 0; }
.hz-panel:focus-within .hz-c, .hz.is-running .hz-c { border-color: var(--amber); }
.hz-panel:focus-within .hz-c1 { transform: translate(-4px, -4px); }
.hz-panel:focus-within .hz-c2 { transform: translate(4px, -4px); }
.hz-panel:focus-within .hz-c3 { transform: translate(-4px, 4px); }
.hz-panel:focus-within .hz-c4 { transform: translate(4px, 4px); }
.hz.is-running .hz-c { animation: hz-lock 0.6s ease-in-out infinite alternate; }
@keyframes hz-lock { to { transform: scale(0.6); } }
.hz-field { position: relative; }
.hz-field textarea { display: block; width: 100%; resize: none; border: 0; outline: 0; background: none; font-size: 17px; line-height: 1.45; min-height: 56px; }
.hz-ghost { position: absolute; inset: 0 0 auto 0; font-size: 17px; line-height: 1.45; color: rgb(246 241 234 / 0.5); pointer-events: none; }
.hz-ghost i { display: inline-block; width: 8px; height: 1.05em; margin-left: 2px; vertical-align: -0.16em; background: var(--amber); animation: hz-blink 1s steps(1) infinite; }
@keyframes hz-blink { 50% { opacity: 0; } }
.hz-row { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
.hz-ghostbtn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 11px; border-radius: 4px; border: 1px solid rgb(255 255 255 / 0.16); background: rgb(255 255 255 / 0.04); font: 500 11px/1 var(--mono); letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, border-color 0.2s, transform 0.3s var(--spring); }
.hz-ghostbtn:hover { background: rgb(255 255 255 / 0.1); border-color: rgb(255 178 87 / 0.5); transform: translateY(-1px); }
.hz-ghostbtn span { font-size: 13px; }
.hz-link { border: 0; background: none; padding: 0; font: 500 11px/1 var(--mono); color: rgb(246 241 234 / 0.5); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.hz-link:hover { color: var(--amber); }
.hz-file { display: inline-flex; align-items: center; gap: 8px; min-width: 0; padding: 6px 6px 6px 10px; border-radius: 4px; background: rgb(255 178 87 / 0.12); border: 1px solid rgb(255 178 87 / 0.35); font: 500 11px/1.2 var(--mono); color: #ffd9a8; animation: hz-pop 0.45s var(--spring) both; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.hz-file button { border: 0; width: 18px; height: 18px; border-radius: 3px; background: rgb(255 255 255 / 0.1); cursor: pointer; line-height: 1; }
.hz-go { margin-left: auto; display: inline-flex; align-items: center; gap: 10px; padding: 9px 10px 9px 14px; border-radius: 4px; border: 0; background: #f6f1ea; color: #1b1816; font: 600 11.5px/1 var(--mono); letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: transform 0.35s var(--spring), box-shadow 0.3s; }
.hz-go i { display: grid; place-items: center; width: 16px; font-style: normal; font-size: 15px; transition: transform 0.35s var(--spring); }
.hz-go:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 0 0 4px rgb(255 178 87 / 0.25), 0 12px 28px -8px rgb(255 178 87 / 0.65); }
.hz-go:hover:not(:disabled) i { transform: translateX(3px); }
.hz-go:active { transform: scale(0.96); }
.hz-go:disabled { cursor: progress; }
.hz-spin { width: 11px; height: 11px; border-radius: 50%; border: 1.5px solid #1b1816; border-right-color: transparent; animation: hz-rot 0.7s linear infinite; }
.hz-err { margin: 8px 0 0; font: 500 11px/1.4 var(--mono); color: #ff9a8a; }
.hz-tag { margin: 26px 0 0; font-size: 15px; line-height: 1.45; color: rgb(246 241 234 / 0.85); animation: hz-rise 1.2s 0.95s var(--ease) both; transition: opacity 0.6s, transform 0.6s var(--ease); }
.hz:not(.is-idle) .hz-tag { animation: none; opacity: 0; transform: translateY(12px); }

/* chart */
.hz-chart { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; height: 34vh; min-height: 220px; padding: 0 clamp(16px, 4vw, 48px) 22px; animation: hz-fade 0.6s var(--ease) both; }
.hz-chart svg { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 76%; overflow: visible; cursor: crosshair; }
.hz-hist { fill: none; stroke: #f6f1ea; stroke-width: 1.6; vector-effect: non-scaling-stroke; stroke-dasharray: 1; stroke-dashoffset: 1; animation: hz-draw 1.3s var(--ease) forwards; filter: drop-shadow(0 0 6px rgb(255 255 255 / 0.4)); }
.hz-fc { fill: none; stroke: var(--amber); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-dasharray: 1; stroke-dashoffset: 1; animation: hz-draw 1.2s var(--ease) forwards; filter: drop-shadow(0 0 8px rgb(255 178 87 / 0.8)); }
@keyframes hz-draw { to { stroke-dashoffset: 0; } }
.hz-area { opacity: 0; animation: hz-fade 1s 0.6s forwards; }
.hz-band { opacity: 0; animation: hz-band 1.2s 0.3s var(--ease) forwards; transform-origin: 0 50%; }
@keyframes hz-band { from { opacity: 0; transform: scaleX(0.6); } to { opacity: 1; transform: none; } }
.hz-now { stroke: rgb(246 241 234 / 0.4); stroke-width: 1; stroke-dasharray: 3 4; vector-effect: non-scaling-stroke; }
.hz-cross { stroke: var(--amber); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0.8; }
.hz-nowlabel { position: absolute; bottom: calc(76% + 4px); translate: -50% 0; font: 500 10px/1 var(--mono); letter-spacing: 0.18em; text-transform: uppercase; color: rgb(246 241 234 / 0.6); }
.hz-stats { position: relative; display: flex; gap: clamp(20px, 5vw, 56px); align-items: flex-end; padding-top: 4px; }
.hz-stats > div { display: grid; gap: 4px; animation: hz-rise 0.7s var(--ease) both; }
.hz-stats > div:nth-child(2) { animation-delay: 0.1s; }
.hz-stats small { font: 500 10.5px/1 var(--mono); letter-spacing: 0.16em; text-transform: uppercase; color: rgb(246 241 234 / 0.55); max-width: 26ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hz-stats b { font-size: clamp(26px, 3.4vw, 40px); font-weight: 500; letter-spacing: -0.04em; font-variant-numeric: tabular-nums; }
.hz-stats b.is-up { color: #9dffc9; }
.hz-stats b.is-down { color: #ffa48f; }
.hz-stats span { font: 500 10.5px/1 var(--mono); color: rgb(246 241 234 / 0.45); }
.hz-tip { margin-left: auto; padding: 8px 12px; border-left: 1px solid var(--amber); background: rgb(24 20 17 / 0.6); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); animation: none !important; }
.hz-tip b { font-size: 20px; }

.hz-drop { position: absolute; inset: 12px; z-index: 20; display: grid; place-items: center; border: 1.5px dashed var(--amber); background: rgb(20 16 14 / 0.72); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); opacity: 0; pointer-events: none; transition: opacity 0.25s; }
.hz.is-drag .hz-drop { opacity: 1; }
.hz-drop p { font: 500 13px/1 var(--mono); letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); }

@keyframes hz-rise { from { opacity: 0; transform: translateY(18px); filter: blur(8px); } to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes hz-fade { from { opacity: 0; } }
@keyframes hz-pop { from { opacity: 0; transform: scale(0.7); } }

@media (max-width: 640px) {
  .hz-top { grid-template-columns: 1fr auto; }
  .hz-brand { display: none; }
  .hz-row { flex-wrap: wrap; }
  .hz-tip { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

## Build / run

```
npm create vite@latest prompt-horizon -- --template react-ts
cd prompt-horizon
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/geist@^5.3.0 @fontsource-variable/geist-mono@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files and the assets, then:

```
npm run dev
```

`src/main.tsx` mounts `<App />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- No APIs, keys, accounts, or payment code.
- The forecast is a simple statistical fit for show, not a real model.
- Files never leave the browser.
