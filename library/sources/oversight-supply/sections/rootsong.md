---
id: "oversight-supply/rootsong"
name: "Rootsong"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/rootsong"
preview_url: "https://supply.madebyoversight.com/sections?preview=rootsong"
kind: "scroll-story"
origin: "Studio Original"
access: "free-with-account"
theme: "dark"
summary: "A flower drawn entirely from small words on a 2D canvas; scroll opens the bloom, scatters the words upward and re-forms them into one large word, while a form lets visitors plant their own phrase."
tags: ["typographic", "generative", "poetic", "interactive", "dark", "botanical", "atmospheric"]
techniques: ["scroll-pinned-story", "scroll-scrubbed-animation", "canvas-2d-particles", "text-particles", "particle-morph-to-text", "pointer-tracking", "pointer-repulsion", "form-with-validation", "user-generated-content", "gradient-mesh", "grain-texture", "stat-counters", "smooth-scroll", "editorial-serif-display", "mono-label-accents", "split-text-animation"]
stack: ["react", "gsap", "scrolltrigger", "lenis", "canvas", "css", "localstorage"]
complexity: "high"
---

# Rootsong

## What it is

A typographic particle piece: several hundred short words are positioned along stem curves and petal shapes so that together they draw a flower. The on-page counter read 570 at desktop width and 340 on a phone. The words shy away from the pointer and ripple on click. Scrolling opens the petals, lets the words drift up and apart, then gathers them into the letterforms of a single large word. A small text field lets the visitor add a phrase, which flies from the input into the bloom in the accent colour. It works as an emotional opener for community, memorial, journal or brand-values pages.

## Layout anatomy

- A track a little under four viewport heights tall with one sticky, full-viewport stage.
- **Canvas:** full stage, transparent, above the colour pools. The flower rises from the bottom edge slightly right of centre: a main stem made of several lanes of words, a side branch ending in a bud, two long leaves, and petals radiating from the tip around a dense centre.
- **DOM over the canvas:** a single serif letter in each corner, a centred mono kicker at the top, the headline at left centre with its last line in italic lime, a counter at right centre (a four-digit serif number over a mono label), an underlined one-line form at bottom left, a bobbing scroll hint at bottom centre, and a two-line outro beneath where the final word forms.
- At phone width the headline moves to the top, the counter drops to bottom right above the form, the form spans the width, the hint is hidden and the kicker is shortened.

## Visual system

- **Type:** Instrument Serif nearly everywhere: headline, counter, input text and the canvas words themselves, which are very small. IBM Plex Mono in small uppercase with wide tracking for labels.
- **Colour:** background `#1c2116`; colour pools `#0e1612`, `#8d8b58`, `#c9b777`, `#31402e`; cream text `#efe9c4` with a softer tint for labels; lime `#d6f06b` for the italic headline line and for visitor-planted words. Words vary in opacity, which gives the flower depth.

## Motion and interaction

- **Pointer:** words near the pointer are pushed gently aside and spring back. A click sends an expanding ring through the words.
- **Scroll chapters:** in roughly the first third the petals spread and lengthen. Around the middle the words lift away upward and apart and the headline and counter fade. In the last third each word travels to a place inside the outline of one large word, arriving left to right, straightening and shrinking as it goes. The outro line fades in at the end.
- **Planting:** submitting the form adds the phrase as a lime word that flies from the input into the bloom, bumps the counter and shows a brief confirmation in the form label. Planted phrases reappear on a later visit in the same browser.
- **Reduced motion:** words are placed directly at their targets, the canvas redraws only when something changes, background drift and grain stop, and scroll snaps between the flower, the scattered state and the final word.

## Techniques worth reusing

- **Words as particles via a sprite cache** - each distinct string is rasterised once to a small offscreen canvas and then blitted with a transform, so hundreds of rotated words stay cheap in plain 2D canvas.
- **Recipes, not positions** - each particle stores a parametric recipe (which curve and how far along, or which petal and where within it) and its target is recomputed from current state, so a single "openness" value reshapes the whole figure.
- **Sorted pairing for morphs** - sorting sources and targets along one axis before matching them avoids chaotic cross-overs.
- **Sampling text for targets** - draw the destination word to a hidden canvas and collect its opaque pixels as destination points.

## Build brief

```text
Build a pinned particle section in which many small [UNITS] (words, glyphs, icons, dots)
together draw [FIGURE A], disperse, and re-form as [FIGURE B]. 2D canvas plus DOM.

Structure: a section track about four viewport heights tall with one sticky full-viewport
stage. Layers: an atmospheric [BACKGROUND]; a transparent full-stage canvas hidden from
assistive tech; then real DOM: [HEADLINE], a live count of units announced politely, an
optional one-line form, a scroll hint and a short [OUTRO] sentence that states the meaning in
plain text.

Particles: several hundred units on desktop and clearly fewer on phones. Give each a recipe
that places it on [FIGURE A] parametrically, so that a single control value can reshape the
figure. Pre-render each distinct unit once and draw by blitting. Move every particle toward
its target with a damped spring. Nearby particles yield to the pointer; a click sends a ripple.

Scroll: one scrubbed timeline driving three values in sequence. First: the figure develops
(opens, grows, fills in). Middle: particles disperse. Last: each particle goes to a point
sampled from [FIGURE B] rendered on a hidden canvas; pair particles to points after sorting
both along one axis, and stagger arrivals across it. Fade the headline out mid-way and the
outro in at the end.

Optional contribution: on submit, add the visitor's [ENTRY] as a highlighted particle that
travels from the input into the figure, update the count, confirm briefly, and remember recent
entries locally. Limit length and never render entries as HTML.

Quality bars: reduced motion places particles directly, draws only on change, uses native
scroll and snaps between the three states; bound device pixel ratio and total canvas size;
pause off screen; make sure [FIGURE B] stays legible at phone width.
```

## Adaptation notes

- Canvas text is invisible to assistive technology; the outro sentence and the counter carry the meaning, so keep them as real DOM text.
- At phone width the final word is small and its constituent words are illegible specks; consider a shorter target or fewer, larger particles.
