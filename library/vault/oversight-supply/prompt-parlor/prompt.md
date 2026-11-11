<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Parlor — AI prompt hero

Parlor is a loud, friendly, neo-brutalist chat hero: cream dot-grid, thick black outlines, hard offset shadows and bouncy shapes. Instead of one chatbot there are three characters drawn in SVG — Pip the optimist, Mo the skeptic and Juno the poet — whose eyes follow your cursor, glance at the input while you type, blink on their own and talk while they answer. Picking one recolours the whole page. Each replies in its own voice, and every reply can be reacted to with an emoji that bursts out of the click. Document title: `Parlor — AI Prompt Hero — Oversight Supply`.

Rebuild it as a full-screen hero section. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Do not reformat, rename, or restyle them. Every visible string, number, colour, and timing in those files is the copy. Do not paraphrase it.

## Stack & dependencies

React 19, TypeScript, and Vite.

Fonts, imported in `src/main.tsx`:

- `@fontsource-variable/bricolage-grotesque`

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/bricolage-grotesque@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

## Layout & content

Nav: `parlor.` logo, links `Characters` `Make your own` `Pricing`, chunky `Start chatting`. Left: `✦ 3 characters online` tag, headline `Talk to characters, not chatbots.` with `characters` in a tilted marker box, sub-copy, three character cards. Right: chat window with the current face, name and status (`online` / `typing…` / `talking`), the message list, chips `Cheer me up` `Roast my startup idea` `Write me a tiny poem`, and an input with `Send`.

## Interactions & animation

Buttons lift on hover and press flat into their shadow. Messages spring in from their corner. A typing indicator hops before each reply. Hovering a reply shows four reactions; picking one sticks a badge on the bubble. Replies live in `REPLIES` and `fallback` per character. Every animated element also respects `prefers-reduced-motion`: the last rule in the stylesheet removes motion, and the JavaScript loops skip their idle movement.

## Responsive behaviour

Below 900px the two columns stack and the nav links hide.

## Accessibility & robustness

Every button is a real `<button>` with a visible label or an `aria-label`; switches use `role="radio"`/`radiogroup` or `aria-pressed`; text that changes during a run sits in an `aria-live` region. Focus rings are drawn with `:focus-visible`. Decorative layers are `aria-hidden`.

## Performance notes

DOM and SVG only. No images.

## Assets

No image files. The faces are SVG in `Face()`.

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
    <meta name="theme-color" content="#fff4e0" />
    <title>Parlor — AI Prompt Hero — Oversight Supply</title>
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
import '@fontsource-variable/bricolage-grotesque'
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
import { useEffect, useRef, useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'

/* Parlor — a chat hero with characters instead of a chatbot. Three faces
   watch your cursor, lean in to read while you type, and talk while they
   answer. Pick one and the whole page takes on their colour; react to any
   reply with an emoji burst. */

type Kind = 'pip' | 'mo' | 'juno'
const CAST: Record<Kind, { name: string; role: string; color: string; ink: string; hello: string }> = {
  pip: { name: 'Pip', role: 'the optimist', color: '#ffd23f', ink: '#2b2100', hello: 'Hiii! Whatever it is, we’re figuring it out together. What’s up?' },
  mo: { name: 'Mo', role: 'the skeptic', color: '#5ec8ff', ink: '#002537', hello: 'Mo here. Tell me the plan and I’ll tell you what breaks first.' },
  juno: { name: 'Juno', role: 'the poet', color: '#ff7eb6', ink: '#3a0020', hello: 'Hello, traveller. Bring me a small thing and I’ll make it sing.' },
}
const CHIPS = ['Cheer me up', 'Roast my startup idea', 'Write me a tiny poem']
const REACTIONS = ['❤️', '😂', '🔥', '👀']

const REPLIES: Record<Kind, [RegExp, string][]> = {
  pip: [
    [/cheer|sad|tired|bad day/i, 'Okay listen: you got out of bed, you opened this, you asked for help. That’s three wins before lunch! 🌞'],
    [/startup|idea|business/i, 'An idea?! I LOVE it already. Tell your first ten users and watch their faces — that’s your roadmap.'],
    [/poem|write/i, 'Roses are loud, violets are bold, you’re doing great — that’s all, I’m told!'],
  ],
  mo: [
    [/cheer|sad|tired|bad day/i, 'Honestly? Bad days are data. Drink water, sleep eight hours, then we’ll see if it’s still a bad week.'],
    [/startup|idea|business/i, 'Uber for houseplants? Who pays, how often, and why don’t they just… water it? Convince me.'],
    [/poem|write/i, 'Fine. “Deadline near, coffee cold. Scope crept in. Nobody told.” Happy?'],
  ],
  juno: [
    [/cheer|sad|tired|bad day/i, 'Even the moon has a dark side, and still the tide comes back for her. Rest, little moon.'],
    [/startup|idea|business/i, 'A seed in a pocket, carried through rain — call it a startup, call it a name.'],
    [/poem|write/i, 'A kettle hums, the window glows; somewhere a small idea grows.'],
  ],
}
const fallback: Record<Kind, (q: string) => string> = {
  pip: (q) => `“${q}” — oh, that’s a fun one! I say go for it, and tell me how it goes 🎉`,
  mo: (q) => `“${q}”? Interesting. What’s the evidence? Give me one number and I’ll take it seriously.`,
  juno: (q) => `“${q}” — I’ll fold it like paper and float it downstream, to see where it lands.`,
}

type Msg = { id: number; from: 'you' | Kind; text: string; react?: string }

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

let uid = 1

export default function App() {
  const reduced = useReduced()
  const [who, setWho] = useState<Kind>('pip')
  const [msgs, setMsgs] = useState<Msg[]>([{ id: uid++, from: 'pip', text: CAST.pip.hello }])
  const [value, setValue] = useState('')
  const [typing, setTyping] = useState(false)
  const [talking, setTalking] = useState(false)
  const [focus, setFocus] = useState(false)
  const [ptr, setPtr] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const [bursts, setBursts] = useState<{ id: number; e: string; x: number; y: number }[]>([])
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    let raf = 0
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setPtr({ x: e.clientX, y: e.clientY }))
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  useEffect(() => {
    const el = list.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [msgs, typing, reduced])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // while you type, every face reads the input
  const inputBox = input.current?.getBoundingClientRect()
  const look = focus && value && inputBox ? { x: inputBox.left + inputBox.width * Math.min(1, value.length / 40), y: inputBox.top } : ptr

  const pick = (k: Kind) => {
    if (k === who) return
    timers.current.forEach(clearTimeout)
    setTyping(false)
    setTalking(false)
    setWho(k)
    setMsgs((m) => [...m.slice(-6), { id: uid++, from: k, text: CAST[k].hello }])
  }

  const send = (raw: string) => {
    const q = raw.trim()
    if (!q || typing) return
    setValue('')
    setMsgs((m) => [...m.slice(-6), { id: uid++, from: 'you', text: q }])
    const text = REPLIES[who].find(([r]) => r.test(q))?.[1] ?? fallback[who](q.length > 40 ? q.slice(0, 38) + '…' : q)
    const k = who
    timers.current.push(window.setTimeout(() => setTyping(true), reduced ? 0 : 350))
    timers.current.push(window.setTimeout(() => {
      setTyping(false)
      setTalking(true)
      setMsgs((m) => [...m, { id: uid++, from: k, text }])
      timers.current.push(window.setTimeout(() => setTalking(false), reduced ? 0 : Math.min(2600, text.length * 32)))
    }, reduced ? 50 : 1300 + Math.min(900, text.length * 8)))
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    send(value)
  }

  const react = (id: number, e: string, ev: MouseEvent) => {
    setMsgs((m) => m.map((x) => (x.id === id ? { ...x, react: x.react === e ? undefined : e } : x)))
    const b = { id: uid++, e, x: ev.clientX, y: ev.clientY }
    setBursts((s) => [...s, b])
    window.setTimeout(() => setBursts((s) => s.filter((y) => y.id !== b.id)), 1200)
  }

  const c = CAST[who]

  return (
    <main className="pl" style={{ ['--accent' as string]: c.color, ['--accent-ink' as string]: c.ink }}>
      <div className="pl-shapes" aria-hidden="true"><i /><i /><i /><i /></div>

      <header className="pl-nav">
        <a className="pl-logo" href="/">parlor<span>.</span></a>
        <nav aria-label="Main">
          <a href="#">Characters</a>
          <a href="#">Make your own</a>
          <a href="#">Pricing</a>
        </nav>
        <a className="pl-btn pl-btn-sm" href="#"><span>Start chatting</span></a>
      </header>

      <div className="pl-grid">
        <section className="pl-left">
          <p className="pl-tag">✦ 3 characters online</p>
          <h1>
            Talk to <mark>characters</mark>,<br />not chatbots.
          </h1>
          <p className="pl-sub">Every friend in Parlor has a voice of their own — one cheers, one questions, one rhymes. Pick who you need today.</p>
          <div className="pl-cast" role="radiogroup" aria-label="Who do you want to talk to?">
            {(Object.keys(CAST) as Kind[]).map((k) => (
              <button key={k} type="button" role="radio" aria-checked={who === k} className={`pl-card pl-card-${k}`} style={{ ['--c' as string]: CAST[k].color }} onClick={() => pick(k)}>
                <Face kind={k} look={look} talking={who === k && talking} reading={focus && !!value} />
                <b>{CAST[k].name}</b>
                <span>{CAST[k].role}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="pl-chat" aria-label={`Chat with ${c.name}`}>
          <header>
            <span className="pl-mini"><Face kind={who} look={look} talking={talking} reading={focus && !!value} /></span>
            <div>
              <b>{c.name}</b>
              <small>{typing ? 'typing…' : talking ? 'talking' : 'online'}</small>
            </div>
            <button type="button" className="pl-dots" aria-label="Clear chat" onClick={() => setMsgs([{ id: uid++, from: who, text: c.hello }])}>↺</button>
          </header>
          <div ref={list} className="pl-list" aria-live="polite">
            {msgs.map((m) => (
              <div key={m.id} className={`pl-msg ${m.from === 'you' ? 'is-you' : 'is-bot'}`} style={m.from !== 'you' ? { ['--c' as string]: CAST[m.from].color } : undefined}>
                <p>{m.text}</p>
                {m.react && <span className="pl-badge" aria-label={`You reacted ${m.react}`}>{m.react}</span>}
                {m.from !== 'you' && (
                  <span className="pl-reacts">
                    {REACTIONS.map((e) => (
                      <button key={e} type="button" aria-label={`React ${e}`} onClick={(ev) => react(m.id, e, ev)}>{e}</button>
                    ))}
                  </span>
                )}
              </div>
            ))}
            {typing && <div className="pl-msg is-bot pl-typing" style={{ ['--c' as string]: c.color }} aria-label={`${c.name} is typing`}><p><i /><i /><i /></p></div>}
          </div>
          <div className="pl-chips">
            {CHIPS.map((s) => (
              <button key={s} type="button" onClick={() => send(s)} disabled={typing}>{s}</button>
            ))}
          </div>
          <form className="pl-form" onSubmit={submit}>
            <input ref={input} value={value} onChange={(e) => setValue(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder={`Say something to ${c.name}…`} aria-label={`Message ${c.name}`} />
            <button type="submit" className="pl-btn pl-send" disabled={!value.trim() || typing} aria-label="Send">
              <span>Send</span>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
            </button>
          </form>
        </section>
      </div>

      {bursts.map((b) => (
        <span key={b.id} className="pl-burst" style={{ left: b.x, top: b.y }} aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }}>{b.e}</i>)}
        </span>
      ))}
    </main>
  )
}

/* faces: drawn in SVG; pupils follow a point on screen, lids blink on their own */
function Face({ kind, look, talking, reading }: { kind: Kind; look: { x: number; y: number }; talking: boolean; reading: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  const [blink, setBlink] = useState(false)
  useEffect(() => {
    let id = 0
    const loop = () => {
      id = window.setTimeout(() => {
        setBlink(true)
        window.setTimeout(() => setBlink(false), 130)
        loop()
      }, 2200 + Math.random() * 3200)
    }
    loop()
    return () => clearTimeout(id)
  }, [])
  const r = ref.current?.getBoundingClientRect()
  let dx = 0, dy = 0
  if (r) {
    const cx = r.left + r.width / 2, cy = r.top + r.height * 0.42
    const a = Math.atan2(look.y - cy, look.x - cx)
    const d = Math.min(1, Math.hypot(look.x - cx, look.y - cy) / 260)
    dx = Math.cos(a) * 5 * d
    dy = Math.sin(a) * 4 * d
  }
  const body = {
    pip: <circle cx="50" cy="52" r="42" />,
    mo: <rect x="10" y="12" width="80" height="80" rx="22" />,
    juno: <path d="M50 8c9 0 14 9 14 9s10-5 17 2 2 17 2 17 9 5 9 14-9 14-9 14 5 10-2 17-17 2-17 2-5 9-14 9-14-9-14-9-10 5-17-2-2-17-2-17-9-5-9-14 9-14 9-14-5-10 2-17 17-2 17-2 5-9 14-9Z" />,
  }[kind]
  const brow = kind === 'mo' ? 'M28 30l14 3M58 33l14-5' : kind === 'juno' ? 'M28 33q7-5 14 0M58 33q7-5 14 0' : 'M28 32q7-6 14-1M58 31q7-5 14 1'
  return (
    <svg ref={ref} viewBox="0 0 100 100" className={`pl-face is-${kind} ${talking ? 'is-talk' : ''} ${reading ? 'is-read' : ''}`} aria-hidden="true">
      <g className="pl-body">{body}</g>
      <path className="pl-brow" d={brow} />
      {[36, 64].map((x) => (
        <g key={x}>
          <ellipse className="pl-white" cx={x} cy="46" rx="10" ry={blink ? 1 : 11} />
          {!blink && <circle className="pl-pupil" cx={x + dx} cy={46 + dy} r={reading ? 5.5 : 4.5} />}
          {!blink && <circle cx={x + dx + 1.6} cy={44 + dy} r="1.4" fill="#fff" />}
        </g>
      ))}
      {kind === 'juno' && <><circle className="pl-cheek" cx="24" cy="62" r="5" /><circle className="pl-cheek" cx="76" cy="62" r="5" /></>}
      <path className="pl-mouth" d={kind === 'mo' ? 'M40 70h20' : 'M38 66q12 10 24 0'} />
    </svg>
  )
}
```

### `src/style.css`

```css
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; background: #fff4e0; color: #141414; font-family: 'Bricolage Grotesque Variable', 'Bricolage Grotesque', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
button, input { font: inherit; color: inherit; }
a { color: inherit; }
:focus-visible { outline: 3px solid #141414; outline-offset: 3px; border-radius: 8px; }

.pl { --accent: #ffd23f; --accent-ink: #2b2100; --ink: #141414; --line: 2.5px solid var(--ink); --shadow: 5px 5px 0 var(--ink); --ease: cubic-bezier(0.22, 1, 0.36, 1); --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative; min-height: 100vh; min-height: 100svh; overflow: hidden; overflow: clip; isolation: isolate; display: flex; flex-direction: column; background: #fff4e0; transition: background 0.6s; }
.pl::before { content: ''; position: absolute; inset: 0; z-index: -2; background: radial-gradient(circle at 1px 1px, rgb(20 20 20 / 0.14) 1px, transparent 0) 0 0 / 22px 22px; }
.pl-shapes i { position: absolute; z-index: -1; border: var(--line); transition: background 0.6s var(--ease); }
.pl-shapes i:nth-child(1) { width: 180px; height: 180px; border-radius: 50%; right: -50px; top: 90px; background: var(--accent); animation: pl-float 9s ease-in-out infinite; }
.pl-shapes i:nth-child(2) { width: 90px; height: 90px; left: 4%; bottom: 8%; background: #b9f27c; rotate: 14deg; border-radius: 18px; animation: pl-float 7s -2s ease-in-out infinite; }
.pl-shapes i:nth-child(3) { width: 0; height: 0; border: 0; left: 46%; top: 14%; border-left: 26px solid transparent; border-right: 26px solid transparent; border-bottom: 44px solid #ff7a4d; filter: drop-shadow(3px 3px 0 var(--ink)); animation: pl-spin 18s linear infinite; }
.pl-shapes i:nth-child(4) { width: 46px; height: 46px; border-radius: 50%; right: 34%; bottom: 6%; background: #9d8cff; animation: pl-float 6s -4s ease-in-out infinite; }
@keyframes pl-float { 50% { transform: translateY(-14px) rotate(6deg); } }
@keyframes pl-spin { to { rotate: 360deg; } }

.pl-nav { display: flex; align-items: center; gap: 24px; padding: 18px clamp(16px, 4vw, 44px); animation: pl-drop 0.8s var(--ease) both; }
.pl-logo { font-size: 26px; font-weight: 800; letter-spacing: -0.05em; text-decoration: none; }
.pl-logo span { color: var(--accent); -webkit-text-stroke: 2px var(--ink); transition: color 0.5s; }
.pl-nav nav { display: flex; gap: 22px; margin-left: auto; }
.pl-nav nav a { font-size: 14px; font-weight: 600; text-decoration: none; background: linear-gradient(var(--accent), var(--accent)) 0 100% / 0 40% no-repeat; transition: background-size 0.35s var(--ease); }
.pl-nav nav a:hover { background-size: 100% 40%; }

/* the chunky button */
.pl-btn { position: relative; display: inline-flex; align-items: center; gap: 8px; padding: 11px 18px; border: var(--line); border-radius: 12px; background: var(--accent); color: var(--accent-ink); font-weight: 700; text-decoration: none; box-shadow: var(--shadow); cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.5s; }
.pl-btn:hover { transform: translate(-2px, -2px); box-shadow: 7px 7px 0 var(--ink); }
.pl-btn:active { transform: translate(5px, 5px); box-shadow: 0 0 0 var(--ink); }
.pl-btn:disabled { cursor: default; filter: saturate(0.4); transform: none; box-shadow: 3px 3px 0 var(--ink); }
.pl-btn-sm { padding: 8px 14px; font-size: 14px; }
.pl-btn svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.35s var(--spring); }
.pl-btn:hover:not(:disabled) svg { transform: translateX(3px); }

.pl-grid { flex: 1; display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(24px, 4vw, 64px); align-items: center; width: min(1180px, 100%); margin: 0 auto; padding: 8px clamp(16px, 4vw, 44px) 32px; }
.pl-tag { display: inline-block; margin: 0 0 16px; padding: 5px 12px; border: var(--line); border-radius: 99px; background: #fff; font-size: 13px; font-weight: 700; box-shadow: 3px 3px 0 var(--ink); animation: pl-rise 0.8s 0.1s var(--ease) both; }
.pl h1 { margin: 0; font-size: clamp(42px, 6vw, 82px); line-height: 0.95; font-weight: 800; letter-spacing: -0.05em; animation: pl-rise 0.9s 0.2s var(--ease) both; }
.pl mark { position: relative; display: inline-block; padding: 0 0.12em; color: var(--accent-ink); background: var(--accent); border: var(--line); border-radius: 0.18em; box-shadow: 4px 4px 0 var(--ink); rotate: -2deg; transition: background 0.5s, color 0.5s; animation: pl-wobble 4s 1.4s ease-in-out infinite; }
@keyframes pl-wobble { 50% { rotate: 1.5deg; } }
.pl-sub { max-width: 430px; margin: 20px 0 0; font-size: 16px; line-height: 1.5; font-weight: 500; color: rgb(20 20 20 / 0.72); animation: pl-rise 0.9s 0.3s var(--ease) both; }

.pl-cast { display: flex; gap: 14px; margin-top: 28px; }
.pl-card { flex: 1; max-width: 150px; display: grid; justify-items: center; gap: 2px; padding: 14px 10px 12px; border: var(--line); border-radius: 18px; background: #fff; box-shadow: var(--shadow); cursor: pointer; animation: pl-rise 0.8s var(--ease) both; transition: transform 0.4s var(--spring), box-shadow 0.2s, background 0.3s; }
.pl-card:nth-child(1) { animation-delay: 0.4s; }
.pl-card:nth-child(2) { animation-delay: 0.5s; }
.pl-card:nth-child(3) { animation-delay: 0.6s; }
.pl-card:hover { transform: translateY(-6px) rotate(-2deg); }
.pl-card[aria-checked='true'] { background: var(--c); transform: translateY(-8px) rotate(2deg) scale(1.04); box-shadow: 7px 9px 0 var(--ink); }
.pl-card .pl-face { width: 78px; height: 78px; }
.pl-card b { font-size: 18px; font-weight: 800; margin-top: 4px; }
.pl-card span { font-size: 12.5px; font-weight: 600; opacity: 0.65; }

/* faces */
.pl-face { overflow: visible; }
.pl-body > * { stroke: var(--ink); stroke-width: 3.5; transition: transform 0.4s var(--spring); transform-origin: 50% 60%; }
.pl-face.is-pip .pl-body > * { fill: #ffd23f; }
.pl-face.is-mo .pl-body > * { fill: #5ec8ff; }
.pl-face.is-juno .pl-body > * { fill: #ff7eb6; }
.pl-face.is-juno .pl-body > * { animation: pl-spin 30s linear infinite; transform-box: fill-box; transform-origin: center; }
.pl-white { fill: #fff; stroke: var(--ink); stroke-width: 3; transition: ry 0.08s; }
.pl-pupil { fill: var(--ink); transition: r 0.3s var(--spring); }
.pl-brow { fill: none; stroke: var(--ink); stroke-width: 3.5; stroke-linecap: round; transition: transform 0.3s var(--spring); }
.pl-face.is-read .pl-brow { transform: translateY(-4px); }
.pl-cheek { fill: #ff4f8f; opacity: 0.5; }
.pl-mouth { fill: none; stroke: var(--ink); stroke-width: 3.5; stroke-linecap: round; transform-box: fill-box; transform-origin: center; }
.pl-face.is-talk .pl-mouth { fill: #7a1530; animation: pl-talk 0.22s ease-in-out infinite alternate; }
@keyframes pl-talk { from { transform: scaleY(0.6); } to { transform: scaleY(2.2) scaleX(0.85); } }
.pl-face.is-talk .pl-body > * { animation: pl-bounce 0.44s ease-in-out infinite alternate; }
.pl-face.is-juno.is-talk .pl-body > * { animation: pl-bounce 0.44s ease-in-out infinite alternate; }
@keyframes pl-bounce { to { transform: scale(1.04, 0.97); } }

/* chat */
.pl-chat { display: flex; flex-direction: column; height: min(560px, 72vh); border: var(--line); border-radius: 22px; background: #fff; box-shadow: 9px 9px 0 var(--ink); overflow: hidden; animation: pl-in 1s 0.35s var(--spring) both; }
@keyframes pl-in { from { opacity: 0; transform: translateY(40px) rotate(3deg); } }
.pl-chat > header { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-bottom: var(--line); background: var(--accent); color: var(--accent-ink); transition: background 0.5s; }
.pl-mini { display: grid; place-items: center; width: 44px; height: 44px; border: var(--line); border-radius: 50%; background: #fff; }
.pl-mini .pl-face { width: 36px; height: 36px; }
.pl-chat > header b { display: block; font-size: 17px; font-weight: 800; }
.pl-chat > header small { font-size: 12px; font-weight: 600; opacity: 0.75; }
.pl-dots { margin-left: auto; width: 34px; height: 34px; border: var(--line); border-radius: 10px; background: #fff; font-size: 16px; font-weight: 800; cursor: pointer; transition: transform 0.4s var(--spring); }
.pl-dots:hover { transform: rotate(-200deg); }
.pl-list { flex: 1; display: flex; flex-direction: column; gap: 12px; padding: 16px 14px; overflow-y: auto; scrollbar-width: thin; }
.pl-msg { position: relative; max-width: 82%; animation: pl-bubble 0.5s var(--spring) both; }
.pl-msg p { margin: 0; padding: 10px 14px; border: var(--line); border-radius: 16px; font-size: 14.5px; line-height: 1.4; font-weight: 500; box-shadow: 3px 3px 0 var(--ink); }
.pl-msg.is-bot { align-self: flex-start; transform-origin: 0 100%; }
.pl-msg.is-bot p { background: var(--c, var(--accent)); border-bottom-left-radius: 4px; }
.pl-msg.is-you { align-self: flex-end; transform-origin: 100% 100%; }
.pl-msg.is-you p { background: var(--ink); color: #fff; border-bottom-right-radius: 4px; box-shadow: 3px 3px 0 var(--accent); }
@keyframes pl-bubble { from { opacity: 0; transform: scale(0.4) translateY(10px); } }
.pl-badge { position: absolute; right: -8px; bottom: -10px; display: grid; place-items: center; width: 26px; height: 26px; border: 2px solid var(--ink); border-radius: 50%; background: #fff; font-size: 13px; animation: pl-pop 0.4s var(--spring) both; }
.pl-reacts { position: absolute; left: 8px; top: -16px; display: flex; gap: 2px; padding: 2px 4px; border: 2px solid var(--ink); border-radius: 99px; background: #fff; box-shadow: 2px 2px 0 var(--ink); opacity: 0; transform: translateY(6px) scale(0.8); pointer-events: none; transition: opacity 0.2s, transform 0.3s var(--spring); }
.pl-msg.is-bot:hover .pl-reacts, .pl-msg.is-bot:focus-within .pl-reacts { opacity: 1; transform: none; pointer-events: auto; }
.pl-reacts button { border: 0; background: none; padding: 1px 3px; font-size: 14px; cursor: pointer; transition: transform 0.25s var(--spring); }
.pl-reacts button:hover { transform: scale(1.4) translateY(-2px); }
.pl-typing p { display: flex; gap: 5px; padding: 14px 16px; }
.pl-typing i { width: 8px; height: 8px; border-radius: 50%; background: var(--ink); animation: pl-hop 0.9s infinite; }
.pl-typing i:nth-child(2) { animation-delay: 0.12s; }
.pl-typing i:nth-child(3) { animation-delay: 0.24s; }
@keyframes pl-hop { 0%, 60%, 100% { transform: none; } 30% { transform: translateY(-6px); } }
.pl-chips { display: flex; gap: 6px; padding: 0 14px 10px; overflow-x: auto; scrollbar-width: none; }
.pl-chips button { flex: none; padding: 6px 12px; border: 2px solid var(--ink); border-radius: 99px; background: #fff; font-size: 13px; font-weight: 700; cursor: pointer; box-shadow: 2px 2px 0 var(--ink); transition: transform 0.12s, box-shadow 0.12s, background 0.2s; }
.pl-chips button:hover:not(:disabled) { background: var(--accent); }
.pl-chips button:active:not(:disabled) { transform: translate(2px, 2px); box-shadow: none; }
.pl-chips button:disabled { opacity: 0.5; cursor: default; }
.pl-form { display: flex; gap: 10px; padding: 12px 14px 14px; border-top: var(--line); background: #fffaf0; }
.pl-form input { flex: 1; min-width: 0; padding: 11px 14px; border: var(--line); border-radius: 12px; background: #fff; outline: 0; font-size: 15px; font-weight: 500; transition: box-shadow 0.2s; }
.pl-form input:focus { box-shadow: 3px 3px 0 var(--accent), 0 0 0 0 var(--ink); }

.pl-burst { position: fixed; z-index: 30; width: 0; height: 0; pointer-events: none; }
.pl-burst i { position: absolute; left: -10px; top: -10px; font-style: normal; font-size: 20px; --a: calc(var(--i) * 51deg - 150deg); animation: pl-fly 1.1s cubic-bezier(0.15, 0.8, 0.3, 1) both; }
@keyframes pl-fly { from { transform: rotate(var(--a)) translateY(0) rotate(calc(var(--a) * -1)) scale(0.4); opacity: 1; } to { transform: rotate(var(--a)) translateY(-80px) rotate(calc(var(--a) * -1)) scale(1.2); opacity: 0; } }

@keyframes pl-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes pl-drop { from { opacity: 0; transform: translateY(-14px); } }
@keyframes pl-pop { from { opacity: 0; transform: scale(0.3); } }

@media (max-width: 900px) {
  .pl-grid { grid-template-columns: 1fr; }
  .pl-nav nav { display: none; }
  .pl-nav .pl-btn { margin-left: auto; }
  .pl-chat { height: 520px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

## Build / run

```
npm create vite@latest prompt-parlor -- --template react-ts
cd prompt-parlor
npm install react@^19.1.0 react-dom@^19.1.0 @fontsource-variable/bricolage-grotesque@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0
```

Add the source files, then:

```
npm run dev
```

`src/main.tsx` mounts `<App />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- No APIs, keys, accounts, or payment code.
- No AI calls: replies are scripted per character.
