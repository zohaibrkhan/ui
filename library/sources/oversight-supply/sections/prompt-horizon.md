---
id: "oversight-supply/prompt-horizon"
name: "Horizon"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/prompt-horizon"
preview_url: "https://supply.madebyoversight.com/sections?preview=prompt-horizon"
kind: "hero"
origin: "Studio Original"
access: "free-with-account"
theme: "dark"
summary: "Cinematic prompt-box hero for a forecasting product: type a question or drop a CSV and the headline shrinks while a history line and an amber forecast band draw along the bottom of a sunrise photo."
tags: ["cinematic", "ai-product", "data", "forecasting", "prompt-box", "photo-background", "mono-labels"]
techniques: ["interactive-demo-in-hero", "svg-line-drawing", "glassmorphism", "parallax-layers", "pointer-tracking", "mono-label-accents", "typewriter-placeholder", "file-drop-zone", "stat-counters", "perspective-grid-floor", "hero-state-machine"]
stack: ["react", "css", "svg"]
complexity: "high"
---

# Horizon

## What it is

A single-screen hero built around one prompt box. Idle, it is a classic centred headline over a photograph; once the visitor submits a prompt or a data file, the hero rearranges itself into a result view with an animated forecast chart. It shows the product's core loop (ask, wait, get a prediction) inside the first viewport, entirely in the browser.

## Layout anatomy

- Root fills the viewport with no scroll. A state class on the root (idle, running, done) drives the whole composition.
- Background stack, bottom to top: an oversized landscape photo; a very large, slowly rotating fan of faint light rays masked to a soft disc; a perspective grid "floor" in the lower half that fades toward the horizon; a dark vignette.
- Top bar in three columns: an options dropdown (model name plus forecast horizon), a letter-spaced wordmark, a solid CTA.
- Centre block: small mono eyebrow, large headline (84px at 1440 wide), a 600px prompt panel, a two-line tagline.
- Prompt panel: translucent dark glass with a hairline border, square corners and four small L-shaped brackets just outside its corners. It contains a two-row textarea with an animated ghost placeholder, then a row with an upload button, a "use sample data" link and the submit button on the right.
- Result chart: pinned to the bottom edge, roughly a third of the viewport tall and full width: two stat blocks top-left, then an edge-to-edge line chart with a dashed "now" divider.
- At 640px and below the wordmark hides and the action row wraps so submit drops to its own line. At 390x844 the result state still fits without scrolling.

## Visual system

- **Type:** Geist for headline and body (medium weight, tight tracking); Geist Mono for every label, button and menu item, small, uppercase and widely tracked.
- **Colour:** base `#1b1816`, text `#f6f1ea`, one accent amber `#ffb257`. Supporting: status dot green `#6dffb0`, positive stat `#9dffc9`, negative stat `#ffa48f`, error `#ff9a8a`. Primary buttons are warm off-white with dark text.
- **Shape and depth:** square or barely rounded corners, hairline light borders, backdrop blur on every floating surface, amber glow rings on button hover.

## Motion and interaction

Exercised in the live preview:

- **Load:** the photo brightens and settles from a slight zoom, like a dawn; text rises out of a blur in sequence.
- **Pointer:** the photo shifts a few pixels against the cursor for depth.
- **Ghost placeholder:** types out and erases a rotating set of example prompts with a blinking block caret; it vanishes as soon as the textarea has content.
- **Focus:** the corner brackets turn amber and step outward; the panel border warms.
- **Dropdown:** a button with `aria-haspopup="listbox"`; the menu springs open from its corner and offers three horizons (7, 30, 90 days), each with a short hint; the current one is amber. Changing it after a result recomputes the chart at once (both stats changed in testing).
- **Submit** (Enter in the textarea, or the button): for about a second and a half the hero is "running": the button label changes and shows a spinner, the brackets pulse, the grid floor scrolls faster and brightens, the headline shrinks to about two-thirds size, the content block moves up and the tagline fades. Then "done": the photo dims, the history line draws left to right, the forecast line draws in glowing amber, a shaded uncertainty band grows from the divider, and two stats (percentage change over the horizon, and a confidence figure) count up.
- **Data:** with no file, the chart is synthetic but stable: the same prompt produced the same series. With a file (chosen or dropped anywhere on the hero) a numeric column is read, its header becomes the series name and a chip shows file name, row count and column, with a remove button. A non-CSV file produced an inline alert message. The forecast is computed locally; no requests are made.
- **Drag-over:** a dashed amber overlay covers the hero.
- **Chart hover:** the stylesheet includes a crosshair and value readout, but in the preview the centre block overlaps the chart and intercepts the pointer, so it never appeared.
- **Reduced motion:** no typing placeholder (one static example), no parallax, the running phase is skipped and the result appears with final numbers; CSS animation is collapsed.

## Techniques worth reusing

- **Hero state machine on the root class** - idle / running / done change type scale, spacing, background intensity and visibility purely in CSS, so the layout makes room for output with no route change.
- **Resolution-independent line drawing** - normalise path length to 1 and animate the dash offset from 1 to 0; pair with non-scaling strokes so a chart stretched to any width keeps thin lines.
- **Seeded demo data** - derive the fake series from the input text so the demo feels responsive to what was typed and is repeatable.
- **CSS perspective grid** - a single plane with two hairline gradients tilted back in perspective; scroll its background by exactly one cell for a seamless loop and change the speed to signal "working".
- **Corner brackets as focus affordance** on a composite input, in place of a generic ring.
- **Accept input three ways** (typed, file picker, drop anywhere) with a one-click sample so nobody is blocked by not having data to hand.

## Build brief

```text
Build a single-viewport hero for [PRODUCT], a tool that turns a plain-language request or an uploaded data file into [RESULT, e.g. a chart or summary], with the result shown inside the hero.

Idle state: full-bleed background ([IMAGE OR GENERATED BACKDROP]) with enough overlay for AA text contrast. A top bar with an options dropdown ([OPTION A/B/C]), the wordmark and a CTA. Centred: eyebrow, headline [HEADLINE], a prompt panel about 600px wide, and a short tagline. The panel holds a two-row textarea whose placeholder cycles through [3-5 EXAMPLE REQUESTS], an upload control, a "use sample" shortcut and a submit button.

Running state (one to two seconds, or real latency): submit is disabled and shows progress, an ambient element visibly speeds up, the headline scales down and the content block shifts up to free the lower third.

Done state: the result rises into the freed space. For a time series: a history line, a projected line in the accent colour, a shaded uncertainty band, a divider marking the present, and two headline numbers that count up. Changing the dropdown recomputes the result without resubmitting.

Data handling: accept drag-and-drop anywhere on the hero (show a clear drop overlay) and parse the file client-side; show the accepted file as a removable chip; give specific, announced error messages for unusable files. With no file, generate plausible sample output seeded from the request text.

Responsive: on narrow screens hide secondary top-bar items, wrap the panel's action row, keep the result readable at a sensible minimum height.

Motion and accessibility: draw lines via normalised dash offset. Under prefers-reduced-motion skip the running choreography, show a static placeholder and final numbers. The dropdown must be a fully keyboard-operable listbox; the result needs a text equivalent; make sure nothing overlaps the result so its hover or focus details are reachable. Visual style: [PROJECT STYLE], one accent colour.
```

## Adaptation notes

- Fits any "input in, artefact out" product: analytics, generators, search, calculators. Swap the chart for the relevant artefact and keep the three-state choreography.
- The photograph carries the mood; budget for a well-compressed image and a solid fallback colour, and check text contrast against its brightest region.
- Fix the stacking problem noted above: raise the result layer or stop the centre block's empty area from capturing pointer events.
- The reference dropdown closes on outside press, but its options are reached by Tab and Enter only; add arrow keys and Escape.
- Several backdrop blurs plus a huge rotating layer are expensive on weak GPUs; drop the rays or pause them when the tab is hidden.
- If the real product needs a server round trip, keep the running state honest: tie it to the request, not a timer.
