# Audio-reactive visual

A visual (an orb, a waveform, particles, a glow) that responds to sound. Used by two entries: a voice
assistant and a record player.

## How it works

- Analyse the audio with a Web Audio `AnalyserNode`, reduce it to **one smoothed level** (0-1) per
  frame, and publish that single value to everything that needs it: a CSS custom property for DOM
  effects, a uniform for a shader, a parameter for a canvas.
- Smooth with a fast attack and slower release, so peaks register but the visual does not flicker.
- When there is no real audio (no permission, autoplay blocked, demo mode), drive the same level from a
  simulated envelope. The visual code does not need to know the difference.

```js
// Our own sketch.
const data = new Uint8Array(analyser.fftSize)
let level = 0
function tick() {
  analyser.getByteTimeDomainData(data)
  let sum = 0
  for (const v of data) sum += ((v - 128) / 128) ** 2
  const rms = Math.sqrt(sum / data.length)
  level += (rms - level) * (rms > level ? 0.5 : 0.08)
  root.style.setProperty("--level", level.toFixed(3))
  requestAnimationFrame(tick)
}
```

## Cautions

- Audio cannot start without a user gesture. Design the idle state to look complete.
- Microphone access needs a clear reason on screen before the browser prompt, and a working path when
  it is refused.
- Under reduced motion, keep the level as a quiet indicator (a meter, an opacity change) rather than
  large movement.
