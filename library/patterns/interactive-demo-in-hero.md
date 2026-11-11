# Interactive demo in the hero

The hero *is* a small working version of the product: a chat you can talk to, a dashboard you can poke,
a player you can drag. It runs entirely offline with scripted or generated output. Used by four
entries (a character chat, an analytics surface, a voice assistant, a record player).

## How it works

- **Script, don't call.** Replies, data and results come from local rules (keyword matching with a
  fallback, seeded random data, canned sequences). No network requests, no API keys, no waiting on a
  backend.
- **One state machine on the root.** A single state attribute or class (idle, listening, thinking,
  playing) drives layout, copy and ambient intensity through CSS. Logic changes the state; CSS decides
  what each state looks like.
- **Suggested inputs.** A row of three or four chips gives a visitor something to press in the first
  second, and guarantees the scripted path looks good.
- **Label it.** Say it is a demo, close to the interface, so nobody mistakes canned output for the real
  product.

## Cautions

- Every control must work by keyboard and be announced; a demo that only works with a mouse is a
  screenshot with extra steps.
- Capabilities like the microphone, audio or WebGL need a fallback path that still demonstrates the
  idea, triggered automatically when permission is denied or the API is missing.
- Keep the demo's weight in proportion: it is in the first viewport, so it competes with the page's
  load time.
- Do not let the demo's text input capture focus on load.
