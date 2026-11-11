---
id: "oversight-supply/evergrid-product-integrations-01"
name: "Evergrid Product - Integrations 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-product-integrations-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-product-integrations-01"
kind: "integrations"
origin: "Evergrid template"
access: "free-with-account"
theme: "dark"
summary: "Integrations banner on a misty forest photo: a frosted panel with a green app-icon tile, serif title, one-line pitch and a light pill CTA, above two offset rows of frosted logo tiles cropped at the edges."
tags: ["saas", "integrations", "logo-tiles", "glass-panel", "photography"]
techniques: ["glassmorphism", "logo-cloud", "offset-rows", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "medium"
---

# Evergrid Product - Integrations 01

## What it is

A compact integrations teaser: one sentence, one button and a wall of partner icons, staged on atmospheric photography. It suits product pages that need to say "works with your stack" without a full directory. The idea is frosted glass on glass - a translucent panel containing translucent tiles. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- **Backdrop:** a rounded photo panel (radius about 12px) about 83% of the frame wide, ratio about 2.3:1, with a green wash that darkens toward the bottom.
- **Frosted panel:** centred, about 81% of the backdrop width and about 64% of its height, radius about 16px, clipping its contents.
- **Header row** (about 46px inner padding at thumbnail scale): a square bright-green app-icon tile (about 10% of panel width, radius about 22%) with a white glyph; beside it a serif title and a two-line muted sentence; at the far right a light pill button with a dark circular arrow disc.
- **Icon rows:** two rows of square frosted tiles (about 70px at thumbnail scale, gap about 24px), each with a white logo glyph. The rows run the full panel width with no side padding, are cropped at both edges, and are offset from each other by about a third of a tile, so they do not form columns. About 15 tiles are visible per row, cycling through six distinct glyphs.
- About 50px of panel remains under the second row.
- Whether the rows move, and tablet/mobile behaviour: not determined (live preview unavailable).

## Visual system

- **Type:** title in a serif (reads as Lora), white, about 34-36px equivalent with slightly open tracking; sentence in a neutral sans (family not determined) at about 17px, white at reduced opacity; button label semi-bold sans.
- **Colour (sampled from a screenshot):** app tile accent green `#3ec41e`; button surface cream `#f5f4eb` with dark label; arrow disc `#19402e` with light-green arrow; panel and tiles are white at low opacity over a grey-green photo; backdrop base in the deep-green family.
- **Shape and depth:** nested radii (backdrop ~12px, panel ~16px, tiles ~10px, app tile ~28px); tiles are slightly lighter than the panel; no hard shadows.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Glass on glass** - two translucency levels (panel, then lighter tiles) create hierarchy over a photo without any solid fills. See `../../../patterns/evergrid-design-system.md`.
- **Edge-cropped, offset rows** - letting rows run off both sides with a horizontal offset implies an endless catalogue and is the natural base for a two-direction marquee.
- **One solid accent tile** - the only opaque, saturated element is the product's own icon, which anchors the composition.

## Build brief

```text
Build an integrations teaser with a frosted panel and two rows of logo tiles.

Backdrop: container-width block, radius 16px, overflow hidden, min-height 560px, [ATMOSPHERIC PHOTO] as
cover with a [BRAND_DARK] gradient wash (40% at top to 75% at bottom), content centred both ways.

Panel: width min(82%, 1080px), radius 20px, background rgba(255,255,255,.18), backdrop-filter blur 16px,
overflow hidden, padding-block 40px.

Header row (padding-inline 40px, flex, align centre, gap 24px): [PRODUCT ICON] on a 96px square tile,
radius 22px, background [ACCENT]; a text block with h2 [TITLE] in a serif display face, 34px, white, and
p [ONE-LINE PITCH] 17px at 80% white, max-width 34ch; margin-left auto; a pill button [CTA LABEL] with light
surface, dark label and a 40px dark arrow disc.

Tile rows: 48px below, two rows with 24px between them and no inline padding. Each row is a flex track of
[12-20 PARTNER LOGOS] as 64px squares, radius 12px, background rgba(255,255,255,.18), white monochrome
glyph 32px, gap 24px. Offset row two by half a tile.

Motion: duplicate each track's content once and animate translateX 0 to -50% linearly over 40s; run row two
in reverse. Pause both on hover and on focus-within. Mark duplicates aria-hidden.

Responsive: <=991px header wraps so the button sits under the text; <=640px panel width 100% minus 32px,
app tile 64px above the title, tiles 48px with 16px gaps, button full width.

Reduced motion: tracks static, centred, no duplication needed.
Accessibility: logo list is a <ul> with each logo named via alt or aria-label; text contrast 4.5:1 against
the lightest region of the photo (add a scrim if needed); solid rgba fallback where backdrop-filter is
unsupported. Performance: SVG logos in one sprite, lazy-loaded photo with explicit dimensions, animate
transform only and stop the animation when the section is off-screen.
```

## Adaptation notes

Use real partner logos in monochrome white; six repeating glyphs read as filler. Text on frosted glass over a photo needs a contrast check at the lightest part of the image. Any marquee must pause on hover/focus and stop under reduced motion; the motion in the brief is our suggestion, not something seen in the source. On phones, shrink tiles to 48px and drop the app tile above the title.
