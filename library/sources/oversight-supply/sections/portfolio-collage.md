---
id: "oversight-supply/portfolio-collage"
name: "Collage"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/portfolio-collage"
preview_url: "https://supply.madebyoversight.com/sections?preview=portfolio-collage"
kind: "portfolio-hero"
origin: "Studio Original"
access: "free-with-account"
theme: "light"
summary: "Photographer portfolio hero as an endless, draggable table of prints: category labels are tied to their photos by live hairlines, a switch re-flows scatter into a filmstrip, and thumbnails fly into a lightbox."
tags: ["portfolio", "photography", "editorial", "minimal", "gallery", "infinite-canvas", "warm-neutral"]
techniques: ["draggable-elements", "image-collage", "infinite-wrap-canvas", "pointer-tracking", "parallax-layers", "flip-lightbox", "svg-connector-lines", "layout-mode-morph", "inertia-drag"]
stack: ["react", "css", "svg", "web-animations-api"]
complexity: "high"
---

# Collage

## What it is

A full-viewport portfolio opener in which the work itself is the navigation. Sixteen photographs drift slowly across a warm paper-coloured surface that wraps in every direction; the visitor drags it around, filters by category, flips to a tidy horizontal strip, or opens any image large. Chrome is reduced to a spaced-out name, three nav words and one footer line. It suits photographers, illustrators and studios with strongly visual work and little need for copy.

## Layout anatomy

- Root fills the viewport; the page itself never scrolls.
- **Stage:** fills the root. Every photograph is an absolutely positioned button moved by transforms; nothing is in normal flow.
- **Top bar** in three columns: one "work" link, the name centred in light, very widely tracked capitals, and About and Contact buttons that open small panels anchored top-right. The bar's background fades from solid paper to transparent, so photos dissolve as they pass beneath; the footer mirrors this from below.
- **Category labels:** five small uppercase buttons, each with a superscript count, pinned at fixed spots around the edges (two left, one top-centre, two right).
- **Connector lines:** a full-size SVG with one hairline per photo, from its category label to the photo's centre.
- **Footer:** city with live local time, a two-state layout switch, photo count plus a "drag" hint.
- **Scatter mode** (default): photos of mixed sizes (roughly 115-270px wide at 1440) spread over an area larger than the viewport, some cropped by the edges.
- **Strip mode:** all photos at a common height just under half the viewport, in one row with small gaps, vertically centred, with a numbered caption under each; the five labels slide into a row above the strip.
- **Under 720px:** the top bar tightens and the name shrinks, photos become larger relative to the screen, the footer stacks and drops its right-hand line, and lightbox arrows move to the bottom edge.

## Visual system

- **Type:** Jost (variable) only. The name is light weight at about 22px; every label is 10-11px uppercase with generous tracking; panel body about 13px; lightbox title about 18px.
- **Colour:** paper `#e7dfcb` with a lighter wash in the centre, ink `#211d17`, a muted ink for secondary text, faint ink hairlines. Panel surface `#f3eddd`. Availability dot green `#5d9a5b`; button hover fill brown `#8a5a2b`.
- **Shape and depth:** square corners everywhere; photos carry a long, soft, warm shadow that deepens on hover; lines are sub-pixel thin.

## Motion and interaction

Exercised in the live preview:

- **Intro:** photos scale up and fade in one after another; the name's letters drop in with a blur.
- **Idle drift:** when nothing is hovered the surface glides slowly on its own.
- **Depth:** larger photos travel further than small ones for the same drag and sit higher in the stack; the pointer adds a slight extra offset.
- **Drag:** a small movement threshold separates click from drag. Release carries momentum that decays smoothly. While dragging, every frame tilts in perspective toward the direction of travel and shrinks slightly, then settles. Strip mode locks movement to horizontal.
- **Wrap:** photos leaving one edge return from the opposite one; after several full-width drags the same sixteen were still filling the view.
- **Other inputs:** arrow keys on the focused stage nudge it; horizontal wheel moves it.
- **Hover or focus a photo:** it zooms slightly inside its frame, shows a numbered caption, rises to the top, and all other photos fade and desaturate; its category label and line become prominent.
- **Hover or click a category:** the same dimming for everything outside that category, with that category's lines emphasised. A click latches the filter (`aria-pressed`).
- **Layout switch** (`role="switch"`): each photo travels from wherever it currently is to its place in the other layout over about a second, slightly staggered; the lines follow throughout.
- **Lightbox:** clicking a photo opens a modal dialog; the image grows from the thumbnail's exact position and size to the centre while the page veils, and returns the same way on close. The small image shows instantly and a sharper one fades over it. The caption gives index, title, category, year and film stock. Arrow keys, on-screen arrows and swipe change image; Escape closes and focus returns to the thumbnail.
- **Contact panel:** the email row copies to the clipboard and confirms inline; panels close on outside press or Escape.
- **Reduced motion:** no intro, drift, tilt or pointer parallax; manual drag still works.

## Techniques worth reusing

- **Wrapped canvas** - keep one pan offset and take each item's position modulo a virtual area larger than the viewport. An apparently infinite surface from a small, fixed set of elements.
- **Labels wired to items** - lines redrawn each frame from a fixed label to moving items turn a tag list into a diagram and make filtering self-explanatory.
- **Velocity as style** - feed drag velocity into a couple of CSS variables for tilt and squash; the whole table reacts physically for almost no code.
- **Rect-to-rect lightbox** with thumbnail-first progressive loading (sketch below).
- **Morph from the last rendered state** when changing layout, so switching mid-drag stays seamless.
- **Edge fades instead of bars** - chrome with gradient backgrounds lets content pass under it without a hard line.

```js
// rect-to-rect open, written generically
function flyFrom(el, fromRect, ms = 600) {
  const to = el.getBoundingClientRect();
  const t = `translate(${fromRect.left - to.left}px, ${fromRect.top - to.top}px) ` +
            `scale(${fromRect.width / to.width}, ${fromRect.height / to.height})`;
  el.style.transformOrigin = "0 0";
  return el.animate([{ transform: t }, { transform: "none" }],
                    { duration: ms, easing: "ease-in-out" });
}
```

## Build brief

```text
Build a full-viewport portfolio hero for [NAME], a [DISCIPLINE], in which [12-20] images float on an endless draggable surface.

Chrome: a top bar with a primary nav link, the name centred, and About / Contact buttons that open small anchored panels. A bottom bar with [LOCATION + LOCAL TIME or other live detail], a two-state layout switch and an item count. Both bars fade the surface out with a gradient so images pass beneath them.

Surface: position every image absolutely and update transforms in an animation-frame loop. Scatter layout: each image has a fixed normalised position and size; positions wrap around a virtual area somewhat larger than the viewport so panning never reaches an edge. Larger images move further and stack above smaller ones. Strip layout: all images at a common height in one wrapping row with captions. The switch interpolates each image from its current rect to its target with a small stagger.

Input: pointer drag with a click threshold, momentum on release, slow automatic drift when idle, arrow keys and horizontal wheel. Let drag velocity drive a subtle tilt and scale-down of all frames.

Categories: place [4-6] category labels around the edges, each with a count. Draw a hairline from each label to every image in that category, updated per frame. Hovering or focusing an image or a label dims everything unrelated; clicking a label latches the filter.

Lightbox: clicking an image opens a modal dialog. Animate the picture from its thumbnail rect to its final rect, load the large file over the thumbnail, show index, title and metadata, support arrows, swipe and Escape, and restore focus on close.

Responsive: on narrow screens enlarge images relative to the viewport, simplify the footer, move lightbox arrows to the bottom, and in strip layout let vertical touch gestures scroll the page.

Reduced motion: no drift, tilt, parallax or flying transitions; dragging still works. Accessibility: each image is a button with a descriptive label, the stage carries an instruction label, closed panels are inert. Performance: small thumbnails, promoted layers for frames, pause the loop when the lightbox is open or the hero is off-screen. Visual style: [PROJECT STYLE].
```

## Adaptation notes

- Works with roughly 12-24 strong images of mixed aspect ratios; fewer and the wrap repeats visibly, many more and both the frame loop and the web of lines get heavy.
- All images are in the DOM and tabbable from the start; add a skip link past the gallery and virtualise for larger sets.
- Thumbnails use empty alt text inside labelled buttons, which is fine as long as the labels are real descriptions.
- Measure label positions on resize or layout change rather than every frame.
- The dimming effect depends on `:has()`; provide a class-based fallback if older browsers matter.
- Hover never fires on touch, so in scatter mode captions are effectively desktop-only; show them on tap or always on phones.
