<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Vinyl — Portfolio hero

Vinyl is a portfolio hero for a musician with a record out. A turntable sits on a dark page tinted by the album art. Press play and the record slides out of its sleeve onto the platter, the sleeve leans back behind the deck, the tonearm swings in, the platter spins up and a real beat plays: every track is a small generated arrangement (kick, snare, hats, bass, a pad and a bell) made with WebAudio. Grab the record to scratch it, so speed and pitch follow your hand, then let go and it settles back to 33⅓. Pause and it brakes slowly, closing the filter like a real deck. A ring of bars around the platter and a halo pulse with the music. The tracklist cues the needle to each song, a 33 / 45 switch and a pitch fader change the speed, and the page carries the album, streaming links, the next show with all tour dates, and a booking contact. Document title: `Vinyl — Portfolio Hero — Oversight Supply`.

Rebuild it as a full-screen hero section. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Do not reformat, rename, or restyle them. Every visible string, number, colour, and timing in those files is the copy. Do not paraphrase it.

## Stack & dependencies

React 19, TypeScript, and Vite.

Fonts, imported in `src/main.tsx`:

- `@fontsource-variable/unbounded`
- `@fontsource-variable/onest`

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/unbounded@^5.3.0 @fontsource-variable/onest@^5.3.1
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Header: `Juna Vale` wordmark, `Music` `Tour` `Video` `Shop`, and a `Booking ↗` pill that copies the booking email. Left: `New album · out now`, the title `Glasshouse Weather`, a line of copy, a `Play the record` button, `Listen on Spotify · Apple Music · Bandcamp`, and the six-track list with lengths. Right: the deck (plinth, platter with strobe dots, record, label with a text ring, spindle, tonearm, Start / Stop, 33 / 45 and a pitch fader) with the sleeve beside it and a now-playing line under it. Footer: `Next show 14 Mar · Lisbon · Sala Azul` with an `All dates (3)` pop-up, and a press pill with the artist photo and booking email.

## Interactions & animation

All copy and tracks are constants at the top of `src/App.tsx`. One frame loop eases the platter speed (fast up, slow down), turns the record, moves the tonearm from 20° to 40° across the whole album as time passes, advances to the next track at the end of each one, feeds the speed to the audio engine and draws the bar ring on a canvas from an `AnalyserNode`. `src/audio.ts` schedules notes 120 ms ahead every 25 ms; tempo and every note's frequency are multiplied by the platter speed, so slowing down sounds like a real turntable, and a low-pass filter closes as it stops. Surface crackle and a needle-drop thump are generated noise. While scratching, band-passed noise follows the hand speed. Clicking a track cues the needle there. Every animated element also respects `prefers-reduced-motion`: the last rule in the stylesheet removes motion, and the JavaScript loops skip their idle movement.

## Responsive behaviour

Desktop is one screen (`100svh`, minimum 680px) with the deck sized by `--w`. Below 900px it becomes a column: header, the deck (64vw), album info and tracks, then shows and booking.

## Accessibility & robustness

Every control is a real `<button>` or link with a visible label or an `aria-label`; toggles use `aria-pressed` and the current project uses `aria-current`; text that changes sits in an `aria-live` region. Focus rings are drawn with `:focus-visible`. Decorative layers are `aria-hidden`. Play, Start, 33 / 45 (a radiogroup), the pitch fader and every track are real controls; the now-playing line is `aria-live`. The record is labelled and can be scratched with a pointer only.

## Performance notes

Two images (15 and 38 KB). The record, sleeve and deck are CSS; one 2D canvas for the bars. The audio graph is created on the first press of play.

## Assets

Two images: `src/assets/cover.webp` (sleeve, label and page tint) and `artist.webp` (press photo), loaded with `new URL('./assets/cover.webp', import.meta.url)` and the same for `artist.webp`. Copy the whole folder.

## Putting it in an existing site

The section is the `<main>` returned by `App`. Its classes all share one short prefix, so they will not collide with your styles. The first rules in the stylesheet (`*`, `html, body`, `button`, `a`, `:focus-visible`) are page-level resets: keep them on a standalone page, drop or scope them when the hero goes inside a page that already has its own. Links point to `#` or `/`; change them to your routes. No sound plays until someone presses play, as browsers require.

To drop it into an existing React site, copy the files under `src/` (except `main.tsx`) and `src/assets/` into one folder such as `components/portfolio-vinyl/`, install the dependencies above, move the font imports from `main.tsx` into your app entry, and render the default export of `App.tsx` as the first thing on the page. In Next.js, add `'use client'` at the top of `App.tsx`.

## Full source code

Create these files exactly. `index.html` replaces the Vite template’s `index.html`. The other files sit under `src/`. Delete unused Vite template files (`App.css`, `index.css`, `vite.svg`). Keep the template’s `vite.config.ts` and `tsconfig` files.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0a0c0f" />
    <title>Vinyl — Portfolio Hero — Oversight Supply</title>
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
import '@fontsource-variable/unbounded'
import '@fontsource-variable/onest'
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
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { Deck, type Track } from './audio'

const ARTIST = 'Juna Vale'
const ALBUM = 'Glasshouse Weather'
const TAGLINE = 'Six songs written between a hotel pool and the last night bus. Out now on Lowlight Records.'
const EMAIL = 'booking@junavale.com'
const BOOKING = 'Booking festivals for summer'
const LISTEN = [['Spotify', '#'], ['Apple Music', '#'], ['Bandcamp', '#']]
const SHOWS = [
  ['14 Mar', 'Lisbon', 'Sala Azul'],
  ['22 Mar', 'Berlin', 'Halle Nord'],
  ['02 Apr', 'London', 'The Glasshouse'],
]
const NAV = [['Music', '#music'], ['Tour', '#tour'], ['Video', '#video'], ['Shop', '#shop']]

const cover = new URL('./assets/cover.webp', import.meta.url).href
const portrait = new URL('./assets/artist.webp', import.meta.url).href

const TRACKS: Track[] = [
  { title: 'Low Sun', length: 222, bpm: 86, root: 57, chords: [[0, 3, 7], [-4, 0, 3], [-7, -3, 0], [-2, 2, 5]], kick: 'x.....x.x.......', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.xx', bass: [0, -1, -1, 0, -1, -1, 7, -1, 0, -1, -1, -1, 3, -1, -1, -1] },
  { title: 'Salt Air', length: 198, bpm: 92, root: 62, chords: [[0, 3, 7], [5, 8, 12], [3, 7, 10], [-2, 2, 5]], kick: 'x.......x.x.....', snare: '....x.......x..x', hat: '..x...x...x...x.', bass: [0, -1, 0, -1, -1, -1, 0, -1, 12, -1, -1, 0, -1, -1, 7, -1] },
  { title: 'Afterimage', length: 245, bpm: 78, root: 53, chords: [[0, 4, 11], [2, 5, 9], [-3, 0, 7], [-5, 2, 5]], kick: 'x.........x.....', snare: '....x.......x...', hat: 'x.xxx.x.x.xxx.x.', bass: [0, -1, -1, -1, -1, -1, -1, 7, 0, -1, -1, -1, -1, -1, 5, -1] },
  { title: 'Neon Tide', length: 231, bpm: 104, root: 52, chords: [[0, 3, 7], [0, 3, 7], [-4, 0, 3], [-2, 2, 5]], kick: 'x...x...x...x...', snare: '....x.......x...', hat: '..x...x...x...x.', bass: [0, -1, 0, 12, -1, 0, -1, 0, 0, -1, 0, 12, -1, 0, 7, -1] },
  { title: 'Small Hours', length: 178, bpm: 72, root: 60, chords: [[0, 4, 11], [-3, 0, 7], [5, 9, 12], [2, 5, 9]], kick: 'x.......x.......', snare: '........x.......', hat: 'x...x...x...x...', bass: [0, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1] },
  { title: 'Last Ferry', length: 262, bpm: 96, root: 55, chords: [[0, 3, 7], [-2, 2, 5], [-4, 0, 3], [-5, -2, 2]], kick: 'x.....x...x.....', snare: '....x.......x...', hat: 'xxx.xxx.xxx.xxx.', bass: [0, -1, -1, 0, -1, -1, 0, -1, -1, -1, 0, -1, 3, -1, 5, -1] },
]
const TOTAL = TRACKS.reduce((s, t) => s + t.length, 0)
const ARM_REST = -2
const ARM_START = 20
const ARM_END = 40
const OMEGA = Math.PI * 2 * (100 / 3 / 60) // 33⅓ rpm in rad/s

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

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

export default function App() {
  const root = useRef<HTMLElement>(null)
  const disc = useRef<HTMLDivElement>(null)
  const arm = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const deck = useRef<Deck | null>(null)
  const copyTimer = useRef(0)
  const [phase, setPhase] = useState<'sleeve' | 'playing' | 'paused'>('sleeve')
  const [track, setTrack] = useState(0)
  const [time, setTime] = useState(0)
  const [rpm45, setRpm45] = useState(false)
  const [pitch, setPitch] = useState(0)
  const [copied, setCopied] = useState<'' | 'ok' | 'fail'>('')
  const [tour, setTour] = useState(false)
  const [scratching, setScratching] = useState(false)

  // Animation state shared with the frame loop.
  const s = useRef({ phase: 'sleeve' as typeof phase, track: 0, t: 0, speed: 0, target: 0, angle: 0, arm: ARM_REST, drag: null as null | { a: number; t: number; v: number }, reduced: false, landed: 0 })
  s.current.phase = phase
  s.current.target = phase === 'playing' ? (rpm45 ? 1.35 : 1) * (1 + pitch) : 0

  useEffect(() => {
    const st = s.current
    st.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let last = performance.now()
    let shownT = -1
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const d = deck.current
      const armDown = st.phase === 'playing' && now > st.landed
      // Spin up quickly, brake slowly, like a direct-drive deck.
      if (st.drag) {
        st.drag.v *= Math.exp(-dt * 8)
        st.speed = st.drag.v
      } else {
        const k = st.target > st.speed ? 3.2 : 1.6
        st.speed += (st.target - st.speed) * Math.min(1, dt * k)
        if (!armDown && st.target === 0 && Math.abs(st.speed) < 0.002) st.speed = 0
      }
      if (!st.drag) st.angle += st.speed * OMEGA * dt
      if (disc.current) disc.current.style.transform = `rotate(${st.angle.toFixed(4)}rad)`

      // Play position moves the needle inward across the record.
      if (armDown && !st.drag) {
        st.t += dt * Math.max(0, st.speed)
        if (st.t >= TRACKS[st.track].length) {
          st.t = 0
          st.track = (st.track + 1) % TRACKS.length
          setTrack(st.track)
          d?.setTrack(TRACKS[st.track])
        }
      }
      const before = TRACKS.slice(0, st.track).reduce((a, x) => a + x.length, 0)
      const armTarget = st.phase === 'sleeve' || st.phase === 'paused' ? ARM_REST : ARM_START + ((before + st.t) / TOTAL) * (ARM_END - ARM_START)
      st.arm += (armTarget - st.arm) * (st.reduced ? 1 : Math.min(1, dt * 3.5))
      if (arm.current) arm.current.style.transform = `rotate(${st.arm.toFixed(3)}deg)`

      d?.setSpeed(armDown || st.drag ? st.speed : 0, st.drag ? Math.min(1, Math.abs(st.speed - 1) * 0.6) : 0)

      // Halo and the ring of bars around the record follow the music.
      const c = canvas.current
      if (c && d) {
        const lvl = d.level()
        root.current!.style.setProperty('--lvl', lvl.toFixed(3))
        const ctx = c.getContext('2d')!
        const w = c.clientWidth
        const h = c.clientHeight
        if (c.width !== Math.round(w * 2)) {
          c.width = Math.round(w * 2)
          c.height = Math.round(h * 2)
        }
        ctx.setTransform(2, 0, 0, 2, 0, 0)
        ctx.clearRect(0, 0, w, h)
        const bins = d.spectrum()
        const cx = w / 2
        const cy = h / 2
        const r = Math.min(w, h) * 0.405
        const n = 72
        ctx.strokeStyle = getComputedStyle(root.current!).getPropertyValue('--accent') || '#5ee6e6'
        ctx.lineCap = 'round'
        ctx.lineWidth = 2
        for (let i = 0; i < n; i++) {
          const v = bins[Math.floor((i < n / 2 ? i : n - i) * 0.9) + 1] / 255
          if (v < 0.04) continue
          const a = (i / n) * Math.PI * 2 - Math.PI / 2
          const len = v * r * 0.16
          ctx.globalAlpha = 0.25 + v * 0.75
          ctx.beginPath()
          ctx.moveTo(cx + Math.cos(a) * (r + 6), cy + Math.sin(a) * (r + 6))
          ctx.lineTo(cx + Math.cos(a) * (r + 6 + len), cy + Math.sin(a) * (r + 6 + len))
          ctx.stroke()
        }
        ctx.globalAlpha = 1
      }

      const whole = Math.floor(st.t)
      if (whole !== shownT) {
        shownT = whole
        setTime(st.t)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      deck.current?.dispose()
      deck.current = null
    }
  }, [])
  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const ensureDeck = () => {
    if (deck.current) return deck.current
    try {
      deck.current = new Deck(TRACKS[s.current.track])
    } catch {
      deck.current = null
    }
    return deck.current
  }

  const play = () => {
    const d = ensureDeck()
    if (phase === 'playing') {
      setPhase('paused')
      d?.stop()
      return
    }
    // From the sleeve the record first slides onto the platter, then the needle drops.
    s.current.landed = performance.now() + (phase === 'sleeve' ? 1500 : 650)
    setPhase('playing')
    d?.start()
    window.setTimeout(() => d?.setTrack(TRACKS[s.current.track]), phase === 'sleeve' ? 1500 : 650)
  }

  const cue = (i: number) => {
    s.current.track = i
    s.current.t = 0
    setTrack(i)
    setTime(0)
    if (phase !== 'playing') play()
    else {
      s.current.landed = performance.now() + 500
      window.setTimeout(() => deck.current?.setTrack(TRACKS[i]), 500)
    }
  }

  // Drag the record to scratch it: the hand sets the speed directly.
  const angleAt = (e: PointerEvent) => {
    const r = disc.current!.getBoundingClientRect()
    return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2))
  }
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (phase === 'sleeve' || e.button !== 0) return
    ensureDeck()
    s.current.drag = { a: angleAt(e), t: performance.now(), v: s.current.speed }
    e.currentTarget.setPointerCapture(e.pointerId)
    setScratching(true)
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const dr = s.current.drag
    if (!dr) return
    const a = angleAt(e)
    let da = a - dr.a
    if (da > Math.PI) da -= Math.PI * 2
    if (da < -Math.PI) da += Math.PI * 2
    const now = performance.now()
    const dt = Math.max(0.008, (now - dr.t) / 1000)
    dr.v = Math.max(-4, Math.min(4, da / dt / OMEGA))
    s.current.angle += da
    dr.a = a
    dr.t = now
  }
  const onUp = () => {
    s.current.drag = null
    setScratching(false)
  }

  const copy = async () => {
    const ok = await copyText(EMAIL)
    setCopied(ok ? 'ok' : 'fail')
    clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(''), ok ? 2000 : 6000)
  }

  const cur = TRACKS[track]
  return (
    <main ref={root} className={`vy is-${phase}${scratching ? ' is-scratching' : ''}`}>
      <div className="vy-bg" aria-hidden="true" style={{ backgroundImage: `url(${cover})` }} />
      <header className="vy-top">
        <a className="vy-logo" href="/">{ARTIST}</a>
        <nav aria-label="Main">{NAV.map(([t, h]) => <a key={t} href={h}>{t}</a>)}</nav>
        <button className={`vy-book${copied ? ` is-${copied}` : ''}`} type="button" onClick={copy}>
          <span>{copied === 'ok' ? 'Email copied' : copied === 'fail' ? EMAIL : 'Booking'}</span>
          <i aria-hidden="true">{copied === 'ok' ? '✓' : '↗'}</i>
        </button>
      </header>

      <section className="vy-info" aria-label="New album">
        <p className="vy-kicker"><i aria-hidden="true" /> New album · out now</p>
        <h1 className="vy-title">{ALBUM}</h1>
        <p className="vy-tag">{TAGLINE}</p>
        <div className="vy-ctl">
          <button className="vy-play" type="button" onClick={play} aria-pressed={phase === 'playing'}>
            <span className="vy-play-icon" aria-hidden="true" />
            <span className="vy-play-label">{phase === 'playing' ? 'Pause' : phase === 'paused' ? 'Resume' : 'Play the record'}</span>
          </button>
          <div className="vy-listen">
            <span>Listen on</span>
            {LISTEN.map(([t, h]) => <a key={t} href={h}>{t}</a>)}
          </div>
        </div>
        <ol className="vy-tracks" aria-label="Tracklist">
          {TRACKS.map((t, i) => (
            <li key={t.title} style={{ '--n': i } as CSSProperties}>
              <button type="button" aria-current={i === track ? 'true' : undefined} onClick={() => cue(i)}>
                <span className="vy-tn">{i === track && phase === 'playing' ? <span className="vy-eq" aria-hidden="true"><i /><i /><i /></span> : String(i + 1).padStart(2, '0')}</span>
                <span className="vy-tt">{t.title}</span>
                <span className="vy-td">{i === track && phase !== 'sleeve' ? `${mmss(time)} / ` : ''}{mmss(t.length)}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <div className="vy-stage">
        <div className="vy-deck">
          <div className="vy-halo" aria-hidden="true" />
          <div className="vy-plinth" aria-hidden="true">
            <span className="vy-brand">LOWLIGHT · DD-1</span>
            <span className="vy-led" />
          </div>
          <div className="vy-platter" aria-hidden="true"><span /></div>
          <canvas ref={canvas} className="vy-viz" aria-hidden="true" />
          <div className="vy-record" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} role="img" aria-label={`${ALBUM} on vinyl${phase !== 'sleeve' ? ', drag it to scratch' : ''}`}>
            <div ref={disc} className="vy-disc">
              <div className="vy-label" style={{ backgroundImage: `url(${cover})` }}>
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <defs><path id="vy-ring" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
                  <text><textPath href="#vy-ring">{`${ARTIST.toUpperCase()} · ${ALBUM.toUpperCase()} · SIDE A · 33⅓ RPM ·`}</textPath></text>
                </svg>
              </div>
            </div>
            <div className="vy-sheen" />
          </div>
          <span className="vy-spindle" aria-hidden="true" />
          <div className="vy-sleeve" style={{ backgroundImage: `url(${cover})` }} aria-hidden="true">
            <span>{ARTIST}<br /><b>{ALBUM}</b></span>
          </div>
          <div ref={arm} className="vy-arm" aria-hidden="true"><span className="vy-arm-rod" /><span className="vy-arm-head" /></div>
          <span className="vy-arm-base" aria-hidden="true" />
          <div className="vy-controls">
            <button type="button" className="vy-start" onClick={play} aria-label={phase === 'playing' ? 'Stop' : 'Start'}>{phase === 'playing' ? 'Stop' : 'Start'}</button>
            <div className="vy-rpm" role="radiogroup" aria-label="Speed">
              <button type="button" role="radio" aria-checked={!rpm45} onClick={() => setRpm45(false)}>33</button>
              <button type="button" role="radio" aria-checked={rpm45} onClick={() => setRpm45(true)}>45</button>
            </div>
          </div>
          <label className="vy-pitch">
            <span>Pitch {pitch > 0 ? '+' : ''}{(pitch * 100).toFixed(0)}%</span>
            <input type="range" min={-0.08} max={0.08} step={0.01} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} onDoubleClick={() => setPitch(0)} />
          </label>
        </div>
        <p className="vy-now" aria-live="polite">{phase === 'sleeve' ? 'Press play to take the record out' : `${String(track + 1).padStart(2, '0')} — ${cur.title}${rpm45 ? ' · 45 rpm' : ''}`}</p>
      </div>

      <footer className="vy-bottom">
        <div className="vy-show">
          <p className="vy-show-next"><b>Next show</b> {SHOWS[0][0]} · {SHOWS[0][1]} · {SHOWS[0][2]}</p>
          <button type="button" aria-expanded={tour} onClick={() => setTour((t) => !t)}>All dates ({SHOWS.length})</button>
          <ul className={`vy-tour${tour ? ' is-open' : ''}`} inert={!tour}>
            {SHOWS.map(([d, c, v]) => (
              <li key={d}><span>{d}</span><b>{c}</b><em>{v}</em><a href="#tickets">Tickets</a></li>
            ))}
          </ul>
        </div>
        <div className="vy-press">
          <img src={portrait} alt={`${ARTIST}, press photo`} />
          <div>
            <p className="vy-press-t">{BOOKING}</p>
            <button type="button" onClick={copy}>{copied === 'ok' ? 'Copied ✓' : EMAIL}</button>
          </div>
        </div>
      </footer>
    </main>
  )
}
```

### `src/audio.ts`

```ts
// A small WebAudio "record": every track is a generated beat (kick, snare,
// hats, bass, a pad and a bell) scheduled a little ahead of time. The record's
// speed scales tempo and pitch together, like a real turntable, and a filter
// closes as it slows down. Nothing plays until start() is called from a click.

export type Track = {
  title: string
  length: number // seconds at normal speed
  bpm: number
  root: number // MIDI note
  chords: number[][] // four bars, semitones from the root
  kick: string // 16 steps, 'x' = hit
  snare: string
  hat: string
  bass: number[] // 16 steps, -1 = rest, otherwise semitones above the chord root
}

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12)

export class Deck {
  readonly ctx: AudioContext
  readonly analyser: AnalyserNode
  private out: GainNode
  private tone: BiquadFilterNode
  private noise: AudioBuffer
  private crackle: GainNode
  private scratchGain: GainNode
  private scratchFilter: BiquadFilterNode
  private timer = 0
  private next = 0
  private step = 0
  private track: Track
  private bins: Uint8Array<ArrayBuffer>
  speed = 0

  constructor(track: Track) {
    const ctx = (this.ctx = new AudioContext())
    this.track = track
    this.out = ctx.createGain()
    this.out.gain.value = 0
    this.tone = ctx.createBiquadFilter()
    this.tone.type = 'lowpass'
    this.tone.frequency.value = 400
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -16
    comp.ratio.value = 3
    this.analyser = ctx.createAnalyser()
    this.analyser.fftSize = 256
    this.analyser.smoothingTimeConstant = 0.78
    this.bins = new Uint8Array(new ArrayBuffer(this.analyser.frequencyBinCount))
    this.out.connect(this.tone).connect(comp).connect(this.analyser).connect(ctx.destination)

    this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const d = this.noise.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1

    // Surface noise: a quiet hiss with the odd pop, looped.
    const crackleBuf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate)
    const c = crackleBuf.getChannelData(0)
    for (let i = 0; i < c.length; i++) c[i] = (Math.random() * 2 - 1) * 0.04 + (Math.random() < 0.0004 ? (Math.random() * 2 - 1) * 0.9 : 0)
    const crackleSrc = ctx.createBufferSource()
    crackleSrc.buffer = crackleBuf
    crackleSrc.loop = true
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 900
    this.crackle = ctx.createGain()
    this.crackle.gain.value = 0
    crackleSrc.connect(hp).connect(this.crackle).connect(this.analyser)
    crackleSrc.start()

    // Scratch: band-passed noise whose pitch follows how fast the hand moves.
    const scratchSrc = ctx.createBufferSource()
    scratchSrc.buffer = this.noise
    scratchSrc.loop = true
    this.scratchFilter = ctx.createBiquadFilter()
    this.scratchFilter.type = 'bandpass'
    this.scratchFilter.Q.value = 4
    this.scratchGain = ctx.createGain()
    this.scratchGain.gain.value = 0
    scratchSrc.connect(this.scratchFilter).connect(this.scratchGain).connect(this.analyser)
    scratchSrc.start()
  }

  start() {
    void this.ctx.resume()
    clearInterval(this.timer)
    this.next = this.ctx.currentTime + 0.05
    this.timer = window.setInterval(() => this.schedule(), 25)
  }

  stop() {
    clearInterval(this.timer)
  }

  setTrack(t: Track) {
    this.track = t
    this.step = 0
    this.next = this.ctx.currentTime + 0.12
    this.drop()
  }

  /** Called every frame with the platter speed (1 = 33⅓ rpm). */
  setSpeed(speed: number, scratch = 0) {
    const t = this.ctx.currentTime
    this.speed = speed
    const s = Math.min(1.4, Math.abs(speed))
    this.out.gain.setTargetAtTime(Math.min(1, s * 1.6) * 0.9, t, 0.03)
    this.tone.frequency.setTargetAtTime(180 + 16000 * Math.min(1, s * s), t, 0.04)
    this.crackle.gain.setTargetAtTime(Math.min(1, s) * 0.35, t, 0.1)
    this.scratchGain.gain.setTargetAtTime(scratch * 0.55, t, 0.02)
    this.scratchFilter.frequency.setTargetAtTime(500 + Math.min(4, Math.abs(speed)) * 1400, t, 0.02)
  }

  /** Overall loudness of the low end, 0–1, for the halo. */
  level() {
    this.analyser.getByteFrequencyData(this.bins)
    let sum = 0
    for (let i = 1; i < 9; i++) sum += this.bins[i]
    return sum / (8 * 255)
  }

  spectrum() {
    this.analyser.getByteFrequencyData(this.bins)
    return this.bins
  }

  dispose() {
    clearInterval(this.timer)
    void this.ctx.close()
  }

  // Needle drop: a soft thump and a crackle burst.
  private drop() {
    const t = this.ctx.currentTime
    const src = this.ctx.createBufferSource()
    src.buffer = this.noise
    const f = this.ctx.createBiquadFilter()
    f.type = 'lowpass'
    f.frequency.value = 1200
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.5, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12)
    src.connect(f).connect(g).connect(this.analyser)
    src.start(t, Math.random(), 0.15)
  }

  private schedule() {
    const sp = this.speed
    const now = this.ctx.currentTime
    if (sp < 0.08) {
      this.next = now + 0.05
      return
    }
    const stepDur = 60 / (this.track.bpm * sp) / 4
    while (this.next < now + 0.12) {
      this.play(this.step, this.next, sp, stepDur)
      this.next += stepDur
      this.step = (this.step + 1) % 64
    }
  }

  private play(step: number, t: number, sp: number, stepDur: number) {
    const tr = this.track
    const s = step % 16
    const chord = tr.chords[Math.floor(step / 16) % tr.chords.length]
    if (tr.kick[s] === 'x') this.kick(t, sp)
    if (tr.snare[s] === 'x') this.snare(t, sp)
    if (tr.hat[s] === 'x') this.hat(t, s % 4 === 2 ? 0.16 : 0.09)
    if (tr.bass[s] >= 0) this.voice('triangle', midi(tr.root - 12 + chord[0] + tr.bass[s]) * sp, t, stepDur * 1.8, 0.32, 0.005)
    if (s === 0) chord.forEach((n) => this.pad(midi(tr.root + n) * sp, t, stepDur * 16))
    if (s % 4 === 3 && (step * 7) % 5 < 2) this.voice('sine', midi(tr.root + 12 + chord[(step >> 2) % chord.length]) * sp, t, 0.6, 0.12, 0.002)
  }

  private kick(t: number, sp: number) {
    const o = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    o.frequency.setValueAtTime(130 * sp, t)
    o.frequency.exponentialRampToValueAtTime(42 * sp, t + 0.18)
    g.gain.setValueAtTime(0.95, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.42)
    o.connect(g).connect(this.out)
    o.start(t)
    o.stop(t + 0.45)
  }

  private snare(t: number, sp: number) {
    const src = this.ctx.createBufferSource()
    src.buffer = this.noise
    const f = this.ctx.createBiquadFilter()
    f.type = 'bandpass'
    f.frequency.value = 1900 * sp
    f.Q.value = 0.7
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.42, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2)
    src.connect(f).connect(g).connect(this.out)
    src.start(t, Math.random(), 0.22)
    this.voice('triangle', 190 * sp, t, 0.08, 0.2, 0.001)
  }

  private hat(t: number, gain: number) {
    const src = this.ctx.createBufferSource()
    src.buffer = this.noise
    const f = this.ctx.createBiquadFilter()
    f.type = 'highpass'
    f.frequency.value = 7200
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(gain, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.05)
    src.connect(f).connect(g).connect(this.out)
    src.start(t, Math.random(), 0.06)
  }

  private voice(type: OscillatorType, freq: number, t: number, dur: number, gain: number, attack: number) {
    const o = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + attack + 0.001)
    g.gain.exponentialRampToValueAtTime(0.001, t + dur)
    o.connect(g).connect(this.out)
    o.start(t)
    o.stop(t + dur + 0.05)
  }

  private pad(freq: number, t: number, dur: number) {
    const f = this.ctx.createBiquadFilter()
    f.type = 'lowpass'
    f.frequency.value = 1100
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.4)
    g.gain.setValueAtTime(0.05, t + dur * 0.8)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    f.connect(g).connect(this.out)
    for (const cents of [-9, 9]) {
      const o = this.ctx.createOscillator()
      o.type = 'sawtooth'
      o.frequency.value = freq
      o.detune.value = cents
      o.connect(f)
      o.start(t)
      o.stop(t + dur + 0.05)
    }
  }
}
```

### `src/style.css`

```css
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; background: #0a0c0f; -webkit-font-smoothing: antialiased; }
button, input { font: inherit; color: inherit; }
a { color: inherit; }
:focus-visible { outline: 2px solid #5ee6e6; outline-offset: 3px; border-radius: 6px; }

.vy { --accent: #5ee6e6; --bg: #0a0c0f; --fg: #eef3f4; --mute: rgb(238 243 244 / 0.56); --line: rgb(238 243 244 / 0.12); --lvl: 0; --ease: cubic-bezier(0.22, 1, 0.36, 1); --spring: cubic-bezier(0.34, 1.56, 0.64, 1); --gut: clamp(16px, 3vw, 44px);
  --w: min(46vw, calc((100svh - 190px) / 0.78), 760px); --d: calc(var(--w) * 0.655);
  position: relative; height: 100vh; height: 100svh; min-height: 680px; overflow: hidden; overflow: clip; isolation: isolate; background: var(--bg); color: var(--fg);
  font-family: 'Onest Variable', Onest, system-ui, sans-serif; font-size: 14px; line-height: 1.45; }
.vy-bg { position: absolute; inset: -20%; z-index: -1; background: center / cover no-repeat; filter: blur(70px) saturate(1.4); opacity: 0.32; transform: scale(1.1); transition: opacity 1.2s var(--ease); }
.vy.is-playing .vy-bg { opacity: 0.45; }
.vy::after { content: ''; position: absolute; inset: 0; z-index: -1; background: radial-gradient(80% 70% at 70% 50%, transparent, rgb(10 12 15 / 0.75)); pointer-events: none; }

/* Header */
.vy-top { position: absolute; z-index: 10; top: 0; left: 0; right: 0; display: flex; align-items: center; gap: 28px; padding: 22px var(--gut); animation: vy-fade 1s 0.2s var(--ease) backwards; }
.vy-logo { font-family: 'Unbounded Variable', Unbounded, sans-serif; font-weight: 800; font-size: 17px; letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none; }
.vy-top nav { display: flex; gap: 22px; margin-right: auto; }
.vy-top nav a { font-size: 13px; color: var(--mute); text-decoration: none; transition: color 0.2s; }
.vy-top nav a:hover { color: var(--fg); }
.vy-book { position: relative; overflow: hidden; isolation: isolate; display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border: 1px solid var(--line); border-radius: 99px; background: rgb(255 255 255 / 0.04); font-size: 13px; font-weight: 600; cursor: pointer; transition: color 0.35s var(--ease), border-color 0.3s; }
.vy-book::before { content: ''; position: absolute; inset: 0; z-index: -1; background: var(--accent); transform: translateY(101%); transition: transform 0.45s var(--ease); }
.vy-book:hover { color: #071214; border-color: var(--accent); }
.vy-book:hover::before { transform: none; }
.vy-book i { font-style: normal; transition: transform 0.4s var(--spring); }
.vy-book:hover i { transform: translate(2px, -2px); }
.vy-book.is-ok { border-color: var(--accent); }

/* Album info and tracklist */
.vy-info { position: absolute; z-index: 6; left: var(--gut); top: clamp(90px, 14vh, 140px); width: min(34vw, 460px); }
.vy-kicker { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 14px; font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); animation: vy-rise 0.9s 0.3s var(--ease) backwards; }
.vy-kicker i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); animation: vy-blink 1.4s ease-in-out infinite; }
@keyframes vy-blink { 50% { opacity: 0.3; } }
.vy-title { margin: 0; font-family: 'Unbounded Variable', Unbounded, sans-serif; font-size: clamp(34px, 4.4vw, 70px); font-weight: 600; line-height: 0.95; letter-spacing: -0.04em; animation: vy-rise 1s 0.4s var(--ease) backwards; }
.vy-tag { margin: 16px 0 22px; max-width: 380px; font-size: 15px; color: var(--mute); animation: vy-rise 1s 0.5s var(--ease) backwards; }
.vy-ctl { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 22px; margin-bottom: 22px; animation: vy-rise 1s 0.6s var(--ease) backwards; }
.vy-play { display: inline-flex; align-items: center; gap: 12px; padding: 6px 20px 6px 6px; border: 0; border-radius: 99px; background: var(--fg); color: #0a0c0f; font-size: 14px; font-weight: 700; cursor: pointer; transition: transform 0.4s var(--spring), box-shadow 0.4s; box-shadow: 0 0 0 0 rgb(94 230 230 / 0); }
.vy-play:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--accent); }
.vy-play:active { transform: scale(0.96); }
.vy-play-icon { position: relative; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--accent); }
.vy-play-icon::before { content: ''; width: 0; height: 0; margin-left: 3px; border-left: 12px solid #0a0c0f; border-top: 7px solid transparent; border-bottom: 7px solid transparent; transition: transform 0.3s; }
.vy.is-playing .vy-play-icon::before { width: 12px; height: 14px; margin: 0; border: 0; border-left: 4px solid #0a0c0f; border-right: 4px solid #0a0c0f; }
.vy.is-sleeve .vy-play-icon { animation: vy-call 2.2s 1.6s ease-out infinite; }
@keyframes vy-call { 0% { box-shadow: 0 0 0 0 rgb(94 230 230 / 0.6); } 70%, 100% { box-shadow: 0 0 0 14px rgb(94 230 230 / 0); } }
.vy-listen { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 12.5px; color: var(--mute); }
.vy-listen a { color: var(--fg); text-decoration: none; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size 0.35s var(--ease); }
.vy-listen a:hover { background-size: 100% 1px; }
.vy-tracks { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--line); }
.vy-tracks li { border-bottom: 1px solid var(--line); animation: vy-rise 0.8s calc(0.7s + var(--n, 0) * 50ms) var(--ease) backwards; }
.vy-tracks button { display: grid; grid-template-columns: 34px 1fr auto; align-items: center; gap: 10px; width: 100%; padding: 9px 2px; border: 0; background: none; text-align: left; cursor: pointer; color: var(--mute); transition: color 0.25s, padding 0.35s var(--ease); }
.vy-tracks button:hover { color: var(--fg); padding-left: 8px; }
.vy-tracks button[aria-current] { color: var(--fg); }
.vy-tn { font-size: 11px; font-variant-numeric: tabular-nums; }
.vy-tt { font-size: 15px; font-weight: 500; }
.vy-tracks button[aria-current] .vy-tt { color: var(--accent); }
.vy-td { font-size: 12px; font-variant-numeric: tabular-nums; }
.vy-eq { display: inline-flex; align-items: flex-end; gap: 2px; height: 12px; }
.vy-eq i { width: 3px; height: 40%; background: var(--accent); animation: vy-eq 0.7s ease-in-out infinite alternate; }
.vy-eq i:nth-child(2) { animation-delay: -0.3s; }
.vy-eq i:nth-child(3) { animation-delay: -0.55s; }
@keyframes vy-eq { to { height: 100%; } }

/* Turntable */
.vy-stage { position: absolute; z-index: 4; right: var(--gut); top: 50%; translate: 0 -48%; display: grid; justify-items: center; gap: 16px; }
.vy-deck { position: relative; width: var(--w); height: calc(var(--w) * 0.78); animation: vy-deck 1.2s 0.2s var(--ease) backwards; }
@keyframes vy-deck { from { opacity: 0; transform: translateY(40px) scale(0.96); } }
.vy-halo { position: absolute; z-index: 0; left: calc(var(--w) * 0.44 - var(--w) * 0.5); top: calc(var(--w) * 0.39 - var(--w) * 0.5); width: var(--w); height: var(--w); border-radius: 50%; background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 55%, transparent), transparent 75%); opacity: calc(0.08 + var(--lvl) * 0.9); transform: scale(calc(0.9 + var(--lvl) * 0.35)); filter: blur(30px); pointer-events: none; transition: opacity 0.1s linear, transform 0.1s linear; }
.vy-plinth { position: absolute; z-index: 1; inset: 0; border-radius: calc(var(--w) * 0.025); background: linear-gradient(150deg, #2b2e33 0%, #17191c 55%, #101114 100%); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.12), inset 0 -2px 0 rgb(0 0 0 / 0.5), 0 50px 80px -40px rgb(0 0 0 / 0.9), 0 0 0 1px rgb(255 255 255 / 0.04); }
.vy-brand { position: absolute; left: 4%; top: 5%; font-family: 'Unbounded Variable', Unbounded, sans-serif; font-size: calc(var(--w) * 0.016); font-weight: 600; letter-spacing: 0.2em; color: rgb(238 243 244 / 0.4); }
.vy-led { position: absolute; left: 4%; bottom: 23%; width: calc(var(--w) * 0.012); height: calc(var(--w) * 0.012); border-radius: 50%; background: #442; transition: background-color 0.3s, box-shadow 0.3s; }
.vy.is-playing .vy-led { background: #ff4d3a; box-shadow: 0 0 10px #ff4d3a; }
.vy-platter { position: absolute; z-index: 1; left: calc(var(--w) * 0.44 - var(--d) / 2 - var(--w) * 0.014); top: calc(var(--w) * 0.39 - var(--d) / 2 - var(--w) * 0.014); width: calc(var(--d) + var(--w) * 0.028); height: calc(var(--d) + var(--w) * 0.028); border-radius: 50%; background: repeating-conic-gradient(#8d939a 0 1.2deg, #3a3e43 1.2deg 3deg); box-shadow: 0 10px 30px rgb(0 0 0 / 0.6), inset 0 0 0 1px rgb(255 255 255 / 0.15); }
.vy-platter span { position: absolute; inset: calc(var(--w) * 0.008); border-radius: 50%; background: radial-gradient(circle, #1d1f22, #121315); }
.vy-viz { position: absolute; left: calc(var(--w) * 0.44 - var(--w) * 0.5); top: calc(var(--w) * 0.39 - var(--w) * 0.5); width: var(--w); height: var(--w); pointer-events: none; z-index: 1; }

.vy-record { position: absolute; z-index: 2; left: calc(var(--w) * 0.44 - var(--d) / 2); top: calc(var(--w) * 0.39 - var(--d) / 2); width: var(--d); height: var(--d); border-radius: 50%; cursor: grab; touch-action: none; transition: transform 1.4s cubic-bezier(0.65, 0, 0.25, 1); }
.vy.is-sleeve .vy-record { transform: translateX(calc(var(--w) * -0.24)); cursor: default; }
.vy.is-scratching .vy-record { cursor: grabbing; }
.vy-disc { position: absolute; inset: 0; border-radius: 50%; will-change: transform;
  background:
    radial-gradient(circle, transparent 0 30.5%, rgb(255 255 255 / 0.06) 31% 31.5%, transparent 32% 49%, rgb(255 255 255 / 0.05) 49.3% 49.6%, transparent 50%),
    repeating-radial-gradient(circle, #121214 0 1px, #1c1c1f 1px 2px, #141416 2px 3px),
    #121214;
  box-shadow: 0 18px 40px -10px rgb(0 0 0 / 0.8), inset 0 0 0 2px #0b0b0c; }
.vy-disc::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: repeating-radial-gradient(circle, transparent 0 calc(var(--d) * 0.06), rgb(255 255 255 / 0.035) calc(var(--d) * 0.06) calc(var(--d) * 0.062)); mask: radial-gradient(circle, transparent 36%, #000 37%, #000 96%, transparent 97%); }
.vy-label { position: absolute; inset: 32%; border-radius: 50%; background: center / cover; box-shadow: 0 0 0 2px rgb(0 0 0 / 0.4); }
.vy-label svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.vy-label text { font-family: 'Unbounded Variable', Unbounded, sans-serif; font-size: 5.6px; font-weight: 600; letter-spacing: 0.08em; fill: #fff; }
.vy-label::after { content: ''; position: absolute; left: 50%; top: 50%; width: 8%; height: 8%; margin: -4% 0 0 -4%; border-radius: 50%; background: #0a0c0f; }
.vy-sheen { position: absolute; inset: 0; border-radius: 50%; pointer-events: none; background: conic-gradient(from 20deg, transparent 0deg, rgb(255 255 255 / 0.14) 18deg, transparent 40deg, transparent 180deg, rgb(255 255 255 / 0.1) 200deg, transparent 225deg); mask: radial-gradient(circle, transparent 33%, #000 34%); }
.vy-spindle { position: absolute; z-index: 3; left: calc(var(--w) * 0.44 - var(--w) * 0.007); top: calc(var(--w) * 0.39 - var(--w) * 0.007); width: calc(var(--w) * 0.014); height: calc(var(--w) * 0.014); border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff, #8c9196 60%, #4b4f53); pointer-events: none; }

.vy-sleeve { position: absolute; z-index: 3; left: calc(var(--w) * -0.28); top: calc(var(--w) * 0.11); width: calc(var(--w) * 0.56); height: calc(var(--w) * 0.56); background: center / cover; box-shadow: 0 30px 60px -20px rgb(0 0 0 / 0.85), inset 0 0 0 1px rgb(255 255 255 / 0.1); transform: rotate(-4deg); transition: transform 1.4s cubic-bezier(0.65, 0, 0.25, 1), opacity 0.6s; }
.vy-sleeve::after { content: ''; position: absolute; inset: 0; background: linear-gradient(115deg, rgb(255 255 255 / 0.18), transparent 35%); }
.vy-sleeve span { position: absolute; left: 7%; bottom: 7%; font-family: 'Unbounded Variable', Unbounded, sans-serif; font-size: calc(var(--w) * 0.018); font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.3; }
.vy-sleeve b { font-weight: 700; }
/* Once the record is out, the sleeve leans behind the deck. */
.vy:not(.is-sleeve) .vy-sleeve { z-index: 0; transform: translate(calc(var(--w) * -0.07), calc(var(--w) * -0.1)) rotate(-12deg) scale(0.9); }

.vy-arm-base { position: absolute; z-index: 5; left: calc(var(--w) * 0.86 - var(--w) * 0.05); top: calc(var(--w) * 0.12 - var(--w) * 0.05); width: calc(var(--w) * 0.1); height: calc(var(--w) * 0.1); border-radius: 50%; background: radial-gradient(circle at 40% 35%, #d5d9dd, #7d8287 55%, #3a3d41); box-shadow: 0 8px 18px rgb(0 0 0 / 0.6); pointer-events: none; }
.vy-arm { position: absolute; z-index: 6; left: calc(var(--w) * 0.86); top: calc(var(--w) * 0.12); width: 0; height: 0; transform-origin: 0 0; will-change: transform; pointer-events: none; filter: drop-shadow(6px 10px 6px rgb(0 0 0 / 0.55)); }
.vy-arm-rod { position: absolute; left: calc(var(--w) * -0.006); top: 0; width: calc(var(--w) * 0.012); height: calc(var(--w) * 0.47); border-radius: 99px; background: linear-gradient(90deg, #6c7176, #e6e9ec 45%, #8b9095); }
.vy-arm-head { position: absolute; left: calc(var(--w) * -0.022); top: calc(var(--w) * 0.455); width: calc(var(--w) * 0.044); height: calc(var(--w) * 0.075); border-radius: 3px; background: linear-gradient(90deg, #1b1c1f, #3b3e43); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.2); transform: rotate(22deg); transform-origin: 50% 0; }
.vy-arm-head::after { content: ''; position: absolute; left: 50%; bottom: -12%; width: 18%; height: 22%; margin-left: -9%; background: var(--accent); border-radius: 2px; }

.vy-controls { position: absolute; z-index: 6; left: 3.5%; bottom: 6%; display: flex; align-items: center; gap: calc(var(--w) * 0.014); }
.vy-start { width: calc(var(--w) * 0.11); height: calc(var(--w) * 0.075); border: 0; border-radius: 4px; background: linear-gradient(#3a3d42, #25272b); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.15), 0 3px 0 #0c0d0f; font-size: calc(var(--w) * 0.017); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mute); cursor: pointer; transition: transform 0.1s, box-shadow 0.1s, color 0.2s; }
.vy-start:active { transform: translateY(2px); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.1), 0 1px 0 #0c0d0f; }
.vy-start:hover { color: var(--fg); }
.vy-rpm { display: flex; gap: 4px; }
.vy-rpm button { width: calc(var(--w) * 0.05); height: calc(var(--w) * 0.036); border: 0; border-radius: 3px; background: #24262a; box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.1), 0 2px 0 #0c0d0f; font-size: calc(var(--w) * 0.015); font-weight: 700; color: var(--mute); cursor: pointer; }
.vy-rpm button[aria-checked='true'] { color: var(--accent); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.1), 0 0 10px -2px var(--accent); }
.vy-pitch { position: absolute; z-index: 6; right: 3.5%; bottom: 8%; display: grid; justify-items: center; gap: 6px; font-size: calc(var(--w) * 0.014); letter-spacing: 0.1em; text-transform: uppercase; color: var(--mute); }
.vy-pitch input { width: calc(var(--w) * 0.24); accent-color: var(--accent); }
.vy-now { margin: 0; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--mute); min-height: 1.4em; }

/* Footer: next show and press / booking */
.vy-bottom { position: absolute; z-index: 7; left: var(--gut); right: var(--gut); bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; pointer-events: none; animation: vy-fade 1s 0.9s var(--ease) backwards; }
.vy-bottom > * { pointer-events: auto; }
.vy-show { position: relative; display: flex; align-items: center; gap: 14px; font-size: 12.5px; }
.vy-show-next { margin: 0; color: var(--mute); }
.vy-show-next b { color: var(--fg); font-weight: 600; margin-right: 6px; }
.vy-show > button { padding: 0; border: 0; background: none; font-size: 12.5px; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.vy-tour { position: absolute; left: 0; bottom: calc(100% + 10px); width: min(420px, calc(100vw - 32px)); margin: 0; padding: 8px; list-style: none; border: 1px solid var(--line); border-radius: 14px; background: rgb(18 20 24 / 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); opacity: 0; translate: 0 8px; visibility: hidden; transition: opacity 0.25s, translate 0.4s var(--spring), visibility 0s 0.4s; }
.vy-tour.is-open { opacity: 1; translate: 0 0; visibility: visible; transition: opacity 0.25s, translate 0.4s var(--spring), visibility 0s; }
.vy-tour li { display: grid; grid-template-columns: 64px 80px 1fr auto; align-items: center; gap: 10px; padding: 9px 8px; border-radius: 8px; }
.vy-tour li:hover { background: rgb(255 255 255 / 0.05); }
.vy-tour span { font-variant-numeric: tabular-nums; color: var(--accent); }
.vy-tour em { font-style: normal; color: var(--mute); }
.vy-tour a { padding: 5px 10px; border: 1px solid var(--line); border-radius: 99px; font-size: 11.5px; text-decoration: none; transition: background-color 0.25s, color 0.25s; }
.vy-tour a:hover { background: var(--fg); color: #0a0c0f; }
.vy-press { display: flex; align-items: center; gap: 12px; padding: 6px 14px 6px 6px; border: 1px solid var(--line); border-radius: 99px; background: rgb(255 255 255 / 0.04); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.vy-press img { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
.vy-press p { margin: 0; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mute); }
.vy-press button { padding: 0; border: 0; background: none; font-size: 13px; font-weight: 600; cursor: pointer; }
.vy-press button:hover { color: var(--accent); }

@keyframes vy-fade { from { opacity: 0; } }
@keyframes vy-rise { from { opacity: 0; transform: translateY(16px); } }

/* Phones and tablets: the deck sits on top, info underneath. */
@media (max-width: 900px) {
  .vy { --w: min(64vw, 520px); height: auto; min-height: 0; display: flex; flex-direction: column; padding-bottom: 28px; }
  .vy-top { position: relative; padding-bottom: 8px; }
  .vy-top nav { display: none; }
  .vy-logo { margin-right: auto; }
  .vy-stage { position: relative; right: auto; top: auto; translate: none; order: 1; margin: 24px 0 8px calc(var(--w) * 0.24); align-self: center; }
  .vy-info { position: relative; left: auto; top: auto; width: auto; order: 2; padding: 16px var(--gut) 0; }
  .vy-bottom { position: relative; left: auto; right: auto; bottom: auto; order: 3; flex-direction: column; align-items: flex-start; padding: 22px var(--gut) 0; }
  .vy-show { flex-wrap: wrap; }
  .vy-pitch span { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .vy *, .vy *::before, .vy *::after { animation: none !important; transition-duration: 0.01ms !important; }
}
```

## Build / run

```
npm create vite@latest portfolio-vinyl -- --template react-ts
cd portfolio-vinyl
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/unbounded@^5.3.0 @fontsource-variable/onest@^5.3.1
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files and the assets, then:

```
npm run dev
```

`src/main.tsx` mounts `<App />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- No APIs, keys, accounts, or payment code.
- The music is generated in the browser; to play your real songs, replace the scheduler in `src/audio.ts` with an `<audio>` element and use the platter speed as its `playbackRate`.
- Streaming, tickets and shop links point to `#` placeholders.
- The artist, label, venues and songs are fictional.
