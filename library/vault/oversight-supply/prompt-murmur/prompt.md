<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Murmur — AI prompt hero

Murmur is a voice-first hero on a deep night gradient. A three.js orb — an icosphere pushed around by simplex noise, with oil-on-water colour bands and a fresnel rim — sits in the middle. Tap the mic or hold Space: with microphone permission the orb swells with your real voice and, where the browser supports speech recognition, your words are transcribed live; without it, a sample request is "heard" with simulated levels. Then the orb twists while it thinks and pulses on every word of its reply. Turn the sound on and the reply is spoken aloud. Three voices (Ember, Tide, Moss) recolour the orb and the page. Document title: `Murmur — AI Prompt Hero — Oversight Supply`.

Rebuild it as a full-screen hero section. Create the files in **Full source code** at the paths in their headings, with those contents exactly. Do not reformat, rename, or restyle them. Every visible string, number, colour, and timing in those files is the copy. Do not paraphrase it.

## Stack & dependencies

React 19, TypeScript, and Vite. `three` for rendering.

Fonts, imported in `src/main.tsx`:

- `@fontsource-variable/manrope`

After creating a Vite project with the `react-ts` template, install:

```
npm install react@^19.1.0 react-dom@^19.1.0 three@^0.178.0 @fontsource-variable/manrope@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0 @types/three@^0.178.0
```

## Layout & content

Nav: animated waveform logo `murmur`, links `How it works` `Voices` `Privacy`, `Download` pill. Headline `Just say it.` and one line of sub-copy, the orb with a status pill (`Tap to talk`, `Listening`, `Thinking`, `Speaking`), the heard line and the reply, then a row with a sound toggle, the big round mic button and an `or type…` field, a Space hint, and the voice switch.

## Interactions & animation

States are driven by `setPhase` and passed to the orb (`src/Orb.ts`). While listening the mic button shows live level bars and a spinning gradient ring; when idle it sends out a slow ripple. Replies are in `REPLIES`, chosen by keyword. The orb tilts toward the pointer. Clicking the orb also toggles listening. Every animated element also respects `prefers-reduced-motion`: the last rule in the stylesheet removes motion, and the JavaScript loops skip their idle movement.

## Responsive behaviour

One screen (`100svh`, minimum 680px). The orb is `min(46vh, 78vw)`. Below 640px the nav links hide and the typing field moves under the mic.

## Accessibility & robustness

Every button is a real `<button>` with a visible label or an `aria-label`; switches use `role="radio"`/`radiogroup` or `aria-pressed`; text that changes during a run sits in an `aria-live` region. Focus rings are drawn with `:focus-visible`. Decorative layers are `aria-hidden`.

## Performance notes

One three.js mesh (icosphere detail 48) with a custom shader; normals are rebuilt in the vertex shader from two nearby samples. Audio analysis uses one AnalyserNode.

## Assets

No image files.

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
    <meta name="theme-color" content="#07061a" />
    <title>Murmur — AI Prompt Hero — Oversight Supply</title>
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
import '@fontsource-variable/manrope'
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
import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { createOrb } from './Orb'
import type { Orb, OrbState, Palette } from './Orb'

/* Murmur — a voice-first assistant hero. Tap the mic (or hold Space) and the
   orb listens: with microphone access it reacts to your real voice and, where
   the browser supports it, transcribes you live. Without it, a sample request
   is "heard" instead. Murmur then thinks, and answers word by word — out loud
   too if you turn the sound on. */

const VOICES: Record<string, { label: string; palette: Palette; dot: string }> = {
  ember: { label: 'Ember', palette: ['#ff3d7f', '#8a5cff', '#ffd9b0'], dot: 'linear-gradient(135deg,#ff3d7f,#8a5cff)' },
  tide: { label: 'Tide', palette: ['#2b5cff', '#36e0ff', '#dff8ff'], dot: 'linear-gradient(135deg,#2b5cff,#36e0ff)' },
  moss: { label: 'Moss', palette: ['#1aa36b', '#d8f05a', '#f2ffe0'], dot: 'linear-gradient(135deg,#1aa36b,#d8f05a)' },
}
type Voice = keyof typeof VOICES

const SAMPLES = ['Plan a slow Saturday for me', 'Explain black holes like I’m five', 'How do I say good morning in Japanese?']
const REPLIES: [RegExp, string][] = [
  [/saturday|weekend|plan/i, 'Coffee somewhere with a window, a long walk before noon, and one thing you’ve been putting off — just one. Leave the evening empty on purpose.'],
  [/black hole|space|star|universe/i, 'A black hole is a place where so much stuff is squeezed so tight that nothing can climb back out, not even light. That’s why it looks black.'],
  [/japanese|say|translate|language/i, 'Good morning is “ohayō gozaimasu”. With friends you can drop the end and just say “ohayō”.'],
  [/weather|rain|sun/i, 'I can’t see outside from here, but if it looks grey, bring the good umbrella, not the cute one.'],
  [/hello|hi|hey/i, 'Hey! I’m listening. Ask me anything, or tell me what’s on your mind.'],
]
const reply = (q: string) => REPLIES.find(([r]) => r.test(q))?.[1] ?? 'Good question. Here’s the short version: start small, see what happens, and I’ll help you adjust as you go.'

type Phase = OrbState
type Rec = { lang: string; interimResults: boolean; continuous: boolean; start(): void; stop(): void; abort(): void; onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null; onend: (() => void) | null; onerror: (() => void) | null }

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

export default function App() {
  const reduced = useReduced()
  const canvas = useRef<HTMLCanvasElement>(null)
  const orb = useRef<Orb | null>(null)
  const [noGL, setNoGL] = useState(false)
  const [phase, setPhaseState] = useState<Phase>('idle')
  const phaseRef = useRef<Phase>('idle')
  const [voice, setVoice] = useState<Voice>('ember')
  const [sound, setSound] = useState(false)
  const [heard, setHeard] = useState('')
  const [said, setSaid] = useState('')
  const [typed, setTyped] = useState('')
  const [live, setLive] = useState(false)
  const [level, setLevel] = useState(0)
  const heardRef = useRef('')
  const timers = useRef<number[]>([])
  const audio = useRef<{ stream?: MediaStream; ctx?: AudioContext; raf?: number; rec?: Rec; sim?: number }>({})
  const sample = useRef(0)

  const setPhase = (p: Phase) => {
    phaseRef.current = p
    setPhaseState(p)
    orb.current?.setState(p)
  }
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, reduced ? Math.min(ms, 30) : ms))
  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  useEffect(() => {
    const o = createOrb(canvas.current!)
    if (!o) setNoGL(true)
    orb.current = o
    return () => o?.dispose()
  }, [])
  useEffect(() => orb.current?.setPalette(VOICES[voice].palette), [voice, noGL])
  useEffect(() => orb.current?.setReduced(reduced), [reduced, noGL])

  const stopAudio = () => {
    const a = audio.current
    if (a.raf) cancelAnimationFrame(a.raf)
    if (a.sim) clearInterval(a.sim)
    a.stream?.getTracks().forEach((t) => t.stop())
    a.ctx?.close().catch(() => {})
    try { a.rec?.abort() } catch { /* already stopped */ }
    audio.current = {}
    setLive(false)
    if (orb.current) orb.current.level = 0
    setLevel(0)
  }

  const speak = useCallback((q: string) => {
    clearTimers()
    stopAudio()
    setPhase('thinking')
    setSaid('')
    const text = reply(q)
    later(() => {
      setPhase('speaking')
      if (sound && 'speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text)
        u.rate = 1.02
        u.pitch = voice === 'tide' ? 0.9 : voice === 'moss' ? 1.05 : 1.15
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(u)
      }
      const words = text.split(' ')
      words.forEach((_, i) =>
        later(() => {
          setSaid(words.slice(0, i + 1).join(' '))
          orb.current?.pulse(0.6 + Math.random() * 0.5)
        }, i * 190),
      )
      later(() => setPhase('idle'), words.length * 190 + 900)
    }, 1200)
  }, [sound, voice, reduced]) // the helpers it calls only touch refs

  /** no microphone or no recognition: "hear" a sample, word by word */
  const simulate = (withLevels: boolean) => {
    const text = SAMPLES[sample.current++ % SAMPLES.length]
    const words = text.split(' ')
    if (withLevels) {
      const t0 = performance.now()
      audio.current.sim = window.setInterval(() => {
        const t = (performance.now() - t0) / 1000
        const v = Math.max(0, Math.sin(t * 11) * 0.4 + Math.sin(t * 4.3) * 0.35 + 0.25)
        if (orb.current) orb.current.level = v
        setLevel(v)
      }, 50)
    }
    words.forEach((_, i) => later(() => {
      heardRef.current = words.slice(0, i + 1).join(' ')
      setHeard(heardRef.current)
    }, 350 + i * 230))
    later(() => speak(text), 350 + words.length * 230 + 500)
  }

  const listen = async () => {
    if (phaseRef.current === 'listening') return
    clearTimers()
    window.speechSynthesis?.cancel()
    setHeard('')
    setSaid('')
    heardRef.current = ''
    setPhase('listening')
    let stream: MediaStream | null = null
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      stream = null
    }
    // the user may have stopped while the permission prompt was open
    if ((phaseRef.current as Phase) !== 'listening') {
      stream?.getTracks().forEach((t) => t.stop())
      return
    }
    if (!stream) {
      simulate(true)
      return
    }
    // real microphone: drive the orb from its loudness
    const ctx = new AudioContext()
    const an = ctx.createAnalyser()
    an.fftSize = 512
    ctx.createMediaStreamSource(stream).connect(an)
    const buf = new Uint8Array(an.fftSize)
    const loop = () => {
      an.getByteTimeDomainData(buf)
      let sum = 0
      for (const b of buf) sum += ((b - 128) / 128) ** 2
      const v = Math.min(1, Math.sqrt(sum / buf.length) * 5)
      if (orb.current) orb.current.level = v
      setLevel(v)
      audio.current.raf = requestAnimationFrame(loop)
    }
    audio.current = { stream, ctx, raf: requestAnimationFrame(loop) }
    setLive(true)
    const W = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec }
    const Ctor = W.SpeechRecognition ?? W.webkitSpeechRecognition
    if (!Ctor) {
      simulate(false)
      return
    }
    const rec = new Ctor()
    rec.lang = navigator.language || 'en-US'
    rec.interimResults = true
    rec.continuous = false
    rec.onresult = (e) => {
      heardRef.current = Array.from(e.results).map((r) => r[0].transcript).join(' ')
      setHeard(heardRef.current)
    }
    rec.onend = () => {
      if (phaseRef.current === 'listening') {
        if (heardRef.current) speak(heardRef.current)
        else simulate(false)
      }
    }
    rec.onerror = () => {}
    audio.current.rec = rec
    try { rec.start() } catch { simulate(false) }
  }

  const finish = () => {
    if (phaseRef.current !== 'listening') return
    const rec = audio.current.rec
    if (rec && heardRef.current) {
      rec.stop()
      return
    }
    if (heardRef.current && !rec) {
      // a simulated sample is mid-sentence: let it end on its own
      return
    }
    if (rec) rec.stop()
  }

  const cancel = () => {
    clearTimers()
    stopAudio()
    window.speechSynthesis?.cancel()
    setPhase('idle')
  }

  const toggle = () => {
    if (phaseRef.current === 'listening') finish()
    else if (phaseRef.current === 'speaking' || phaseRef.current === 'thinking') cancel()
    else listen()
  }

  // hold Space to talk
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.repeat || (e.target as Element).closest('input, textarea, button')) return
      e.preventDefault()
      listen()
    }
    const up = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || (e.target as Element).closest('input, textarea, button')) return
      finish()
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  })

  useEffect(() => () => { clearTimers(); stopAudio() }, [])

  const ask = (q: string) => {
    if (!q.trim()) return
    clearTimers()
    stopAudio()
    heardRef.current = q.trim()
    setHeard(q.trim())
    setTyped('')
    speak(q.trim())
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    ask(typed)
  }

  const status = { idle: 'Tap to talk', listening: live ? 'Listening' : 'Listening (demo)', thinking: 'Thinking', speaking: 'Speaking' }[phase]

  return (
    <main className={`mm is-${phase} v-${voice}`} style={{ ['--lvl' as string]: level.toFixed(3) }}>
      <div className="mm-stars" aria-hidden="true" />
      <div className="mm-halo" aria-hidden="true" />

      <header className="mm-nav">
        <a className="mm-logo" href="/">
          <span aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />)}</span>
          murmur
        </a>
        <nav aria-label="Main">
          <a href="#">How it works</a>
          <a href="#">Voices</a>
          <a href="#">Privacy</a>
        </nav>
        <a className="mm-dl" href="#"><span>Download</span></a>
      </header>

      <section className="mm-hero">
        <h1>Just say it.</h1>
        <p>A voice assistant that listens like a friend and answers like an expert. No typing, no menus.</p>
      </section>

      <div className="mm-stage">
        <canvas ref={canvas} className="mm-orb" role="img" aria-label={`Voice orb, ${status}`} onClick={toggle} />
        {noGL && <div className="mm-orb-css" aria-hidden="true" />}
        <p className="mm-status" aria-live="polite"><i />{status}</p>
      </div>

      <div className="mm-words" aria-live="polite">
        <p className="mm-heard">{heard ? `“${heard}”` : <span>Try “{SAMPLES[sample.current % SAMPLES.length]}”</span>}</p>
        <p className="mm-said">{said}</p>
      </div>

      <div className="mm-controls">
        <button type="button" className={`mm-sound ${sound ? 'is-on' : ''}`} aria-pressed={sound} onClick={() => setSound((s) => !s)} aria-label="Speak replies out loud">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9Z" />{sound ? <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" /> : <path d="m16 9 5 6m0-6-5 6" />}</svg>
        </button>
        <button type="button" className="mm-mic" onClick={toggle} aria-label={phase === 'listening' ? 'Stop listening' : phase === 'idle' ? 'Start talking' : 'Stop'}>
          <span className="mm-ring" aria-hidden="true" />
          {phase === 'listening' ? (
            <span className="mm-bars" aria-hidden="true">{[0, 1, 2, 3].map((i) => <i key={i} />)}</span>
          ) : phase === 'idle' ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2.5" /></svg>
          )}
        </button>
        <form className="mm-type" onSubmit={submit}>
          <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="or type…" aria-label="Type instead" />
        </form>
      </div>
      <p className="mm-hint"><kbd>Space</kbd> hold to talk</p>

      <div className="mm-voices" role="radiogroup" aria-label="Voice">
        {(Object.keys(VOICES) as Voice[]).map((v) => (
          <button key={v} type="button" role="radio" aria-checked={voice === v} onClick={() => setVoice(v)}>
            <i style={{ background: VOICES[v].dot }} />
            {VOICES[v].label}
          </button>
        ))}
      </div>
    </main>
  )
}
```

### `src/Orb.ts`

```ts
import * as THREE from 'three'

/* The voice orb: an icosphere pushed around by 3D simplex noise. Loudness
   swells it, "thinking" twists it, "speaking" makes it pulse on each word.
   Colour is a three-stop palette lit by a fresnel rim. */

const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

const VERT = `
uniform float uTime; uniform float uAmp; uniform float uFreq; uniform float uTwist;
varying vec3 vN; varying vec3 vView; varying float vD; varying vec3 vP;
${NOISE}
float field(vec3 p){
  return snoise(p * uFreq + vec3(0.0, uTime * 0.5, uTime * 0.2)) + 0.3 * snoise(p * uFreq * 2.1 - uTime * 0.35);
}
vec3 shape(vec3 p){
  float a = uTwist * p.y * 2.0;
  p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;
  return p * (1.0 + field(p) * uAmp);
}
void main(){
  vec3 n = normalize(position);
  // displaced normal from two nearby points on the surface
  vec3 t = normalize(cross(n, abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
  vec3 b = cross(n, t);
  float e = 0.012;
  vec3 p0 = shape(n);
  vec3 p1 = shape(normalize(n + t * e));
  vec3 p2 = shape(normalize(n + b * e));
  vec3 dn = normalize(cross(p1 - p0, p2 - p0));
  vD = field(n);
  vP = n;
  vec4 mv = modelViewMatrix * vec4(p0, 1.0);
  vN = normalize(normalMatrix * dn);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`

const FRAG = `
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform float uGlow; uniform float uTime;
varying vec3 vN; varying vec3 vView; varying float vD; varying vec3 vP;
void main(){
  vec3 N = normalize(vN);
  float ndv = max(dot(N, vView), 0.0);
  float f = pow(1.0 - ndv, 2.6);
  // colour flows across the surface, like oil on water
  float band = 0.5 + 0.5 * sin(vP.y * 2.4 + vD * 1.6 + uTime * 0.8);
  vec3 base = mix(uA, uB, band);
  vec3 col = base * (0.08 + 0.42 * pow(ndv, 1.8));
  col += uA * 0.35 * smoothstep(0.2, 1.2, vD);
  // soft key light from the top left and a crisp specular
  vec3 L = normalize(vec3(-0.5, 0.8, 0.6));
  vec3 H = normalize(L + vView);
  col += uC * pow(max(dot(N, H), 0.0), 60.0) * 0.9;
  col += base * max(dot(N, L), 0.0) * 0.25;
  // rim glow, brighter when there is sound
  col += mix(uB, uC, 0.4) * f * (1.5 + uGlow * 1.4);
  gl_FragColor = vec4(col, 1.0);
}`

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking'
export type Palette = [string, string, string]

export function createOrb(canvas: HTMLCanvasElement) {
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  } catch {
    return null
  }
  renderer.setClearColor(0x000000, 0)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
  camera.position.z = 5.2
  const uniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.12 },
    uFreq: { value: 1.3 },
    uTwist: { value: 0 },
    uGlow: { value: 0 },
    uA: { value: new THREE.Color('#ff3d7f') },
    uB: { value: new THREE.Color('#8a5cff') },
    uC: { value: new THREE.Color('#ffe1f0') },
  }
  const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
  const geo = new THREE.IcosahedronGeometry(1, 48)
  const mesh = new THREE.Mesh(geo, mat)
  scene.add(mesh)

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)

  const target = { level: 0, state: 'idle' as OrbState, pulse: 0, reduced: false }
  const sm = { level: 0, amp: 0.12, freq: 1.3, twist: 0, speed: 0.35, scale: 1 }
  const want = { a: new THREE.Color('#ff5f8f'), b: new THREE.Color('#ffb15c'), c: new THREE.Color('#ffe1f0') }
  const ptr = { x: 0, y: 0 }
  const move = (e: PointerEvent) => {
    ptr.x = e.clientX / window.innerWidth - 0.5
    ptr.y = e.clientY / window.innerHeight - 0.5
  }
  window.addEventListener('pointermove', move)

  let raf = 0
  let t = 0
  let prev = performance.now()
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, (now - prev) / 1000)
    prev = now
    const k = 1 - Math.exp(-dt * 6)
    const s = target.state
    target.pulse *= Math.exp(-dt * 7)
    sm.level += (target.level - sm.level) * (1 - Math.exp(-dt * 14))
    const amp = s === 'listening' ? 0.09 + sm.level * 0.28 : s === 'speaking' ? 0.08 + target.pulse * 0.18 : s === 'thinking' ? 0.13 : 0.065
    const freq = s === 'thinking' ? 1.9 : s === 'listening' ? 1.3 + sm.level * 0.8 : 1.05
    const twist = s === 'thinking' ? 0.9 : 0
    const speed = s === 'thinking' ? 1.6 : s === 'listening' ? 0.9 : s === 'speaking' ? 0.7 : 0.35
    sm.amp += (amp - sm.amp) * k
    sm.freq += (freq - sm.freq) * k * 0.5
    sm.twist += (twist - sm.twist) * k * 0.6
    sm.speed += (speed - sm.speed) * k
    const scale = 1 + (s === 'listening' ? sm.level * 0.14 : 0) + target.pulse * 0.06
    sm.scale += (scale - sm.scale) * k
    if (!target.reduced) t += dt * sm.speed
    uniforms.uTime.value = t
    uniforms.uAmp.value = target.reduced ? 0.05 : sm.amp
    uniforms.uFreq.value = sm.freq
    uniforms.uTwist.value = Math.sin(t * 0.8) * sm.twist
    uniforms.uGlow.value = sm.level + target.pulse
    uniforms.uA.value.lerp(want.a, k * 0.5)
    uniforms.uB.value.lerp(want.b, k * 0.5)
    uniforms.uC.value.lerp(want.c, k * 0.5)
    mesh.scale.setScalar(sm.scale)
    mesh.rotation.y += dt * 0.15
    mesh.rotation.x += (ptr.y * 0.5 - mesh.rotation.x) * 0.04
    mesh.rotation.z += (-ptr.x * 0.4 - mesh.rotation.z) * 0.04
    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(frame)

  return {
    set level(v: number) { target.level = v },
    setState(s: OrbState) { target.state = s },
    setReduced(r: boolean) { target.reduced = r },
    pulse(v = 1) { target.pulse = Math.max(target.pulse, v) },
    setPalette(p: Palette) { want.a.set(p[0]); want.b.set(p[1]); want.c.set(p[2]) },
    dispose() {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', move)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    },
  }
}
export type Orb = NonNullable<ReturnType<typeof createOrb>>
```

### `src/style.css`

```css
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; background: #07061a; color: #f1eefc; font-family: 'Manrope Variable', Manrope, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
button, input { font: inherit; color: inherit; }
a { color: inherit; }
:focus-visible { outline: 2px solid var(--c2, #ffb15c); outline-offset: 3px; border-radius: 10px; }

.mm { --lvl: 0; --ease: cubic-bezier(0.22, 1, 0.36, 1); --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative; height: 100vh; height: 100svh; min-height: 680px; overflow: hidden; overflow: clip; isolation: isolate; display: flex; flex-direction: column; align-items: center;
  background: radial-gradient(120% 80% at 50% 0%, #1a1550 0%, #0c0a2a 45%, #07061a 80%); transition: background 1s; }
.mm.v-ember { --c1: #ff3d7f; --c2: #8a5cff; }
.mm.v-tide { --c1: #2b5cff; --c2: #36e0ff; }
.mm.v-moss { --c1: #1aa36b; --c2: #d8f05a; }
.mm-stars { position: absolute; inset: 0; z-index: -2; background-image: radial-gradient(1px 1px at 12% 22%, #fff8, transparent), radial-gradient(1px 1px at 72% 12%, #fff6, transparent), radial-gradient(1.5px 1.5px at 84% 64%, #fff5, transparent), radial-gradient(1px 1px at 30% 78%, #fff6, transparent), radial-gradient(1px 1px at 56% 36%, #fff4, transparent), radial-gradient(1.5px 1.5px at 8% 58%, #fff5, transparent), radial-gradient(1px 1px at 92% 30%, #fff7, transparent); animation: mm-twinkle 6s ease-in-out infinite alternate; }
@keyframes mm-twinkle { to { opacity: 0.5; } }
.mm-halo { position: absolute; left: 50%; top: 50%; z-index: -1; width: 80vmin; height: 80vmin; translate: -50% -52%; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--c1) 45%, transparent) 0%, color-mix(in srgb, var(--c2) 18%, transparent) 35%, transparent 65%); filter: blur(20px); transform: scale(calc(0.9 + var(--lvl) * 0.5)); opacity: 0.8; transition: transform 0.12s linear, background 0.8s; }
.mm.is-thinking .mm-halo { animation: mm-breath 1.4s ease-in-out infinite; }
@keyframes mm-breath { 50% { transform: scale(1.12); opacity: 1; } }

.mm-nav { position: relative; z-index: 3; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; width: 100%; padding: 18px clamp(16px, 4vw, 40px); animation: mm-fade 1s 0.2s var(--ease) both; }
.mm-logo { display: inline-flex; align-items: center; gap: 10px; font-weight: 700; font-size: 20px; letter-spacing: -0.03em; text-decoration: none; }
.mm-logo span { display: inline-flex; align-items: center; gap: 2px; height: 18px; }
.mm-logo i { width: 3px; height: 40%; border-radius: 2px; background: linear-gradient(var(--c2), var(--c1)); animation: mm-wave 1.1s ease-in-out infinite; }
@keyframes mm-wave { 50% { height: 100%; } }
.mm-nav nav { display: flex; gap: 28px; }
.mm-nav nav a { font-size: 13.5px; font-weight: 500; text-decoration: none; opacity: 0.7; transition: opacity 0.2s; }
.mm-nav nav a:hover { opacity: 1; }
.mm-dl { justify-self: end; position: relative; padding: 9px 18px; border-radius: 99px; font-size: 13px; font-weight: 700; text-decoration: none; background: rgb(255 255 255 / 0.06); border: 1px solid rgb(255 255 255 / 0.14); overflow: hidden; transition: transform 0.35s var(--spring), border-color 0.3s; }
.mm-dl::before { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, var(--c1), var(--c2)); opacity: 0; transition: opacity 0.35s; }
.mm-dl:hover { transform: translateY(-2px); border-color: transparent; }
.mm-dl:hover::before { opacity: 1; }
.mm-dl span { position: relative; }

.mm-hero { position: relative; z-index: 2; text-align: center; padding: clamp(4px, 2vh, 22px) 16px 0; }
.mm-hero h1 { margin: 0; font-size: clamp(36px, 5.4vw, 64px); font-weight: 700; letter-spacing: -0.05em; line-height: 1; background: linear-gradient(180deg, #fff 40%, rgb(241 238 252 / 0.55)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: mm-rise 1.1s 0.3s var(--ease) both; }
.mm-hero p { max-width: 420px; margin: 12px auto 0; font-size: 14.5px; line-height: 1.5; color: rgb(241 238 252 / 0.6); animation: mm-rise 1.1s 0.45s var(--ease) both; }

.mm-stage { position: relative; flex: 1 1 auto; min-height: 0; width: 100%; display: grid; place-items: center; }
.mm-orb { width: min(46vh, 78vw); height: min(46vh, 78vw); max-height: 100%; aspect-ratio: 1; animation: mm-orbin 1.6s 0.4s var(--ease) both; cursor: pointer; }
@keyframes mm-orbin { from { opacity: 0; transform: scale(0.4); filter: blur(20px); } }
.mm-orb-css { position: absolute; width: min(34vh, 60vw); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff8, transparent 30%), radial-gradient(circle, var(--c2), var(--c1)); transform: scale(calc(1 + var(--lvl) * 0.2)); box-shadow: 0 0 80px var(--c1); }
.mm-status { position: absolute; bottom: 4%; display: inline-flex; align-items: center; gap: 8px; margin: 0; padding: 6px 12px; border-radius: 99px; background: rgb(255 255 255 / 0.06); border: 1px solid rgb(255 255 255 / 0.1); font-size: 11.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgb(241 238 252 / 0.75); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.mm-status i { width: 7px; height: 7px; border-radius: 50%; background: rgb(241 238 252 / 0.4); }
.mm.is-listening .mm-status i { background: #ff4d5e; box-shadow: 0 0 0 0 #ff4d5e; animation: mm-rec 1s ease-out infinite; }
.mm.is-thinking .mm-status i { background: var(--c2); animation: mm-blink 0.6s steps(1) infinite; }
.mm.is-speaking .mm-status i { background: var(--c1); }
@keyframes mm-rec { to { box-shadow: 0 0 0 8px rgb(255 77 94 / 0); } }
@keyframes mm-blink { 50% { opacity: 0.2; } }

.mm-words { position: relative; z-index: 2; width: min(640px, calc(100% - 32px)); min-height: 84px; text-align: center; }
.mm-heard { margin: 0; font-size: clamp(16px, 2vw, 20px); font-weight: 600; letter-spacing: -0.01em; color: rgb(241 238 252 / 0.92); }
.mm-heard span { color: rgb(241 238 252 / 0.38); font-weight: 500; }
.mm-said { margin: 8px 0 0; font-size: 15px; line-height: 1.5; color: rgb(241 238 252 / 0.66); min-height: 1.5em; }
.mm.is-speaking .mm-said::after { content: ''; display: inline-block; width: 6px; height: 6px; margin-left: 6px; border-radius: 50%; background: var(--c2); vertical-align: 2px; animation: mm-blink 0.5s steps(1) infinite; }

.mm-controls { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 18px; width: min(560px, calc(100% - 32px)); margin-top: 10px; }
.mm-sound { justify-self: end; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgb(255 255 255 / 0.14); background: rgb(255 255 255 / 0.05); cursor: pointer; transition: transform 0.35s var(--spring), background 0.3s, border-color 0.3s; }
.mm-sound svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.mm-sound:hover { transform: scale(1.08); }
.mm-sound.is-on { background: rgb(255 255 255 / 0.14); border-color: var(--c2); }
.mm-mic { position: relative; display: grid; place-items: center; width: 76px; height: 76px; border-radius: 50%; border: 0; background: linear-gradient(145deg, #fff, #dcd6f5); color: #120f2e; cursor: pointer; box-shadow: 0 18px 40px -12px color-mix(in srgb, var(--c1) 70%, transparent), inset 0 -3px 6px rgb(0 0 0 / 0.12); transition: transform 0.4s var(--spring), box-shadow 0.4s; }
.mm-mic:hover { transform: scale(1.07); }
.mm-mic:active { transform: scale(0.93); }
.mm-mic svg { width: 28px; height: 28px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
.mm-mic svg rect { fill: currentColor; stroke: none; }
.mm.is-idle .mm-mic svg rect { fill: none; stroke: currentColor; }
.mm-ring { position: absolute; inset: -7px; border-radius: 50%; padding: 2px; background: conic-gradient(from var(--r, 0deg), var(--c1), var(--c2), transparent 70%, var(--c1)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity 0.3s, transform 0.12s linear; }
.mm.is-listening .mm-ring { opacity: 1; animation: mm-turn 1.4s linear infinite; transform: scale(calc(1 + var(--lvl) * 0.25)); }
.mm.is-idle .mm-mic::after { content: ''; position: absolute; inset: 0; border-radius: 50%; border: 1px solid rgb(255 255 255 / 0.5); animation: mm-call 2.4s 2s ease-out infinite; }
@keyframes mm-call { from { transform: scale(1); opacity: 0.8; } to { transform: scale(1.7); opacity: 0; } }
@property --r { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
@keyframes mm-turn { to { --r: 360deg; } }
.mm-bars { display: flex; align-items: center; gap: 3px; height: 26px; }
.mm-bars i { width: 4px; height: calc(30% + var(--lvl) * 70%); border-radius: 2px; background: #120f2e; transition: height 0.08s; }
.mm-bars i:nth-child(2) { height: calc(45% + var(--lvl) * 55%); }
.mm-bars i:nth-child(3) { height: calc(25% + var(--lvl) * 75%); }
.mm-type input { width: 100%; max-width: 170px; padding: 11px 14px; border-radius: 99px; border: 1px solid rgb(255 255 255 / 0.12); background: rgb(255 255 255 / 0.05); outline: 0; font-size: 13.5px; transition: border-color 0.25s, background 0.25s, max-width 0.5s var(--ease); }
.mm-type input:focus { border-color: var(--c2); background: rgb(255 255 255 / 0.09); max-width: 220px; }
.mm-type input::placeholder { color: rgb(241 238 252 / 0.4); }
.mm-hint { margin: 12px 0 0; font-size: 11.5px; color: rgb(241 238 252 / 0.38); }
.mm-hint kbd { padding: 2px 7px; border-radius: 5px; border: 1px solid rgb(255 255 255 / 0.18); font: inherit; font-weight: 700; }

.mm-voices { position: relative; z-index: 2; display: flex; gap: 4px; margin: 14px 0 clamp(16px, 3vh, 28px); padding: 4px; border-radius: 99px; background: rgb(255 255 255 / 0.05); border: 1px solid rgb(255 255 255 / 0.08); }
.mm-voices button { display: inline-flex; align-items: center; gap: 7px; padding: 7px 14px; border-radius: 99px; border: 0; background: none; font-size: 12.5px; font-weight: 700; color: rgb(241 238 252 / 0.55); cursor: pointer; transition: background 0.3s, color 0.3s; }
.mm-voices button[aria-checked='true'] { background: rgb(255 255 255 / 0.1); color: #fff; }
.mm-voices i { width: 12px; height: 12px; border-radius: 50%; transition: transform 0.4s var(--spring); }
.mm-voices button:hover i, .mm-voices button[aria-checked='true'] i { transform: scale(1.25); }

@keyframes mm-rise { from { opacity: 0; transform: translateY(16px); filter: blur(8px); } to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes mm-fade { from { opacity: 0; } }

@media (max-width: 640px) {
  .mm-nav { grid-template-columns: 1fr auto; }
  .mm-nav nav { display: none; }
  .mm-controls { grid-template-columns: auto auto; justify-content: center; }
  .mm-type { grid-column: 1 / -1; justify-self: center; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

## Build / run

```
npm create vite@latest prompt-murmur -- --template react-ts
cd prompt-murmur
npm install react@^19.1.0 react-dom@^19.1.0 three@^0.178.0 @fontsource-variable/manrope@^5.3.0
npm install -D @types/react@^19.1.0 @types/react-dom@^19.1.0 @vitejs/plugin-react@^4.6.0 typescript@~5.8.3 vite@^7.0.0 @types/three@^0.178.0
```

Add the source files, then:

```
npm run dev
```

`src/main.tsx` mounts `<App />` inside `<StrictMode>` as the only child of `#root`.

## Limitations

- No APIs, keys, accounts, or payment code.
- No AI calls: replies are scripted.
- Microphone and speech recognition need permission and a supporting browser; inside sandboxed iframes it falls back to the simulated sample.
- Needs WebGL for the orb; without it a CSS gradient orb is shown.
