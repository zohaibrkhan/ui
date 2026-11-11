# Rolling number

A changing figure (a price, a total, a count) where each digit rolls vertically to its new value like
an odometer, so the reader sees *that* it changed and roughly by how much. Used by all three pricing
entries.

## How it works

- Render each digit as a clipped window one character tall over a vertical strip of 0-9. Changing the
  digit translates the strip by `-digit × 1em`.
- **Key columns by place value counted from the right**, not by array index. Then 99 → 100 adds a new
  hundreds column on the left instead of re-animating every existing column.
- Use tabular figures (`font-variant-numeric: tabular-nums`) so widths do not jump.
- Keep separators, currency symbols and decimal points as static characters between columns.
- **Hide the animated columns from assistive technology** (`aria-hidden`) and put the real value beside
  them as visually hidden text. A screen reader should hear "$48", not ten digits.

```css
/* Our own sketch. */
.digit { display: inline-block; height: 1em; overflow: hidden; line-height: 1; }
.digit > .strip {
  display: flex; flex-direction: column;
  transform: translateY(calc(var(--d) * -1em));
  transition: transform 450ms cubic-bezier(.2, .8, .2, 1);
}
@media (prefers-reduced-motion: reduce) { .digit > .strip { transition: none; } }
```

## Cautions

- Roll for changes the visitor caused (a toggle, a stepper). Rolling on page load is decoration.
- When several figures change together, stagger them slightly from left to right or they read as noise.
- Pair with [live-region-summary](live-region-summary.md) so the change is announced once, in words.
- Working examples: `sliding-number` (shortest path around the wheel, springs) and `animated-number` via
  [Subframe Motion](../tools/subframe-motion.md).
