# Grid-rows height animation

Animate an element open and closed to its natural height with CSS only, by transitioning a grid row
from `0fr` to `1fr`. Used by two pricing entries for plan cards that unfold.

## How it works

- Wrap the collapsible content in a one-row grid and transition `grid-template-rows`.
- The child needs `min-height: 0` (and `overflow: hidden`) so it can shrink below its content.
- Mark collapsed content `inert` so its links and inputs leave the tab order and the accessibility tree.

```css
/* Our own sketch. */
.panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 280ms ease; }
.panel[data-open] { grid-template-rows: 1fr; }
.panel > .inner { min-height: 0; overflow: hidden; }
@media (prefers-reduced-motion: reduce) { .panel { transition: none; } }
```

```html
<div class="panel" data-open><div class="inner">…</div></div>
<div class="panel"><div class="inner" inert>…</div></div>
```

## Why this instead of the alternatives

- `max-height` needs a guessed ceiling and its easing is wrong for short content.
- Measuring with JavaScript works but costs layout reads on every toggle.
- `interpolate-size: allow-keywords` with `height: auto` is the newer route; use it where supported and
  keep this as the fallback.
