# Accent theme switching

A choice the visitor makes (a persona, a mode, a product variant) recolours the whole section by
swapping a pair of CSS variables on its root. Used by two hero entries.

## How it works

- Each option defines **two** colours: the accent and the text colour that sits on it. Both are needed;
  swapping only the accent breaks contrast on half the options.
- Set them as custom properties on the section root and reference only the variables below that.
- Register the properties with `@property` so they interpolate as colours instead of snapping.
- Make the options a real radio group (`role="radiogroup"` or native radios) with arrow-key handling.

```css
/* Our own sketch. */
@property --accent { syntax: "<color>"; inherits: true; initial-value: #ffd447; }
@property --on-accent { syntax: "<color>"; inherits: true; initial-value: #111; }
.hero { transition: --accent 300ms, --on-accent 300ms; }
.hero[data-mode="b"] { --accent: #6ec3ff; --on-accent: #0b1a2a; }
.button { background: var(--accent); color: var(--on-accent); }
```

## Cautions

- Check every pair for AA contrast, including hover and pressed shades derived from them.
- Keep the rest of the palette neutral, so the accent is the only thing that changes.
