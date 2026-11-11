# Evergrid design system

The shared visual system behind the 22 `evergrid-*` entries: a calm, editorial SaaS look built from a
serif display face, a cream page, deep green surfaces and no shadows.

**Evidence basis:** static public thumbnails only. The live previews were not available, so colours are
sampled from screenshots (two independent samplings are given where they differ), sizes are estimates,
and motion, hover states and mobile layouts were not determined.

## Type

- **Display:** a serif that reads as Lora, regular weight, tight leading (about 1.1). Used for every
  heading, card title and person name. A request for Lora was seen when the listing page loaded an
  Evergrid preview.
- **Body and UI:** a neutral grotesque sans. Family not determined.
- **Scale at about 1440px wide:** hero heading 55-60px, section heading about 46px, card titles about
  28px, body about 16px, meta about 13px. One exception: a large statistic set in the sans at roughly
  six times body size.

## Colour roles

| Role | Sampled value |
| --- | --- |
| Page background (cream) | `#f5f4eb` |
| Card, white | `#ffffff` |
| Card, off-white, with hairline | `#f7f6f2`, hairline `#e9e8e2` |
| Field border | `#edece3` |
| Deep green surface and primary button | `#234839` |
| Darkest green (footer, image-wall ground) | `#1a3029`, `#163629` |
| Heading ink | `#173225` to `#1d382b` |
| Accent green (dots, ticks) | `#3ac31c` to `#3ec41e` |
| Tag pill (beige) | `#e3dfcc` |
| Rule inside dark cards | `#345648` |
| Arrow disc on light buttons | `#19402c` |

## Shape and depth

- Radii: image tiles and panels 16-20px, blog and dark cards 8-12px, FAQ bars about 8px, inputs about
  4px, one inset panel about 28px, buttons and the navbar fully pill-shaped.
- No shadows anywhere. Depth comes from tonal layering: cream page, white or off-white card, green
  panel.

## Spacing

Three-column grids with 20-40px gaps. The one section captured at a known width (case studies, 1600px)
measured a 1356px content column, 425px grid columns, 40px gaps and 32px card padding.

## Buttons

1. Green pill with a circular arrow chip (the chip sits at the trailing or the leading end). Dark on
   light surfaces, light on dark.
2. Outline pill, full width, with a white chip.
3. Compact white or off-white rectangle, 6-8px radius.
4. Plain white pill inside dark pricing cards.

Build the chip as its own element so it can move or swap independently on hover.

## Recurring structures

- **Whole-card link:** one anchor per card, with the title as its accessible name.
- **Photo with tint:** cover image plus a CSS tint or gradient layer driven by tokens.
- **Glass on photo tile:** photo, green wash, then a frosted panel holding UI. The wash gives
  legibility; the translucency gives hierarchy.
- **Space-between column:** text groups pinned to the top and bottom of a column whose height is set by
  adjacent media.
- **Alternating feature rows:** square media tile beside a text column, prose at the top, checklist
  anchored low.
- **Slot-aligned dark cards:** flat brand-colour cards with identical slots and bottom-anchored lists so
  rows line up across cards.
- **Offset, edge-cropped rows:** rows that run past the viewport edges with staggered seams, implying a
  larger canvas.

## Using it

Treat the values as a starting palette for a "warm editorial SaaS" direction, not as a specification.
Define them as tokens (`--surface-page`, `--surface-deep`, `--ink-heading`, `--accent`), pick your own
serif and sans pairing, and keep the two rules that give the look its character: serif for every
heading, and tonal layering instead of shadows.
