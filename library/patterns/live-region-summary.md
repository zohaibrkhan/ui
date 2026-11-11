# Live-region summary

One visually hidden sentence that describes the *outcome* of an interactive widget and is announced
after the visitor's changes settle. Used by all three pricing entries, where many numbers change at
once.

## How it works

- Keep a single `role="status"` (polite) element per widget. Do not make every changing number a live
  region; that produces a burst of fragments.
- Write the sentence the way a person would say the result: "Team plan, yearly, 8 seats: $384 due
  today."
- Update it after a short debounce (a few hundred ms) so holding a stepper button produces one
  announcement, not twenty.
- Keep the visible controls themselves properly labelled; the summary is the result, not a substitute
  for labels.

```js
// Our own sketch.
let t
function announce(text) {
  clearTimeout(t)
  t = setTimeout(() => { statusEl.textContent = text }, 350)
}
```

## Where else it fits

Filters ("24 results"), calculators, cart totals, form auto-save ("Saved"), copy buttons ("Link copied
to clipboard").
