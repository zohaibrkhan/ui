---
id: "oversight-supply/portfolio-folio"
name: "Folio"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/portfolio-folio"
preview_url: "https://supply.madebyoversight.com/sections?preview=portfolio-folio"
kind: "portfolio-hero"
origin: "Studio Original"
access: "free-with-account"
theme: "light"
summary: "Writer-illustrator portfolio hero staged as a small printed magazine: a 3D book whose pages bend and cast shadows as you drag, click or key through cover, contents, essay, work, press and contact spreads."
tags: ["portfolio", "editorial", "magazine", "skeuomorphic", "serif", "two-colour", "book"]
techniques: ["page-flip-3d", "draggable-elements", "editorial-serif-display", "container-query-units", "spring-physics", "scroll-snap-carousel", "form-with-validation", "tabs-with-preview"]
stack: ["react", "css", "css-3d-transforms", "container-queries"]
complexity: "high"
---

# Folio

## What it is

A one-screen portfolio in which the whole site is a ten-page zine lying on a cream desk. The cover is the hero image; turning pages reveals an intro letter, a table of contents, a feature essay, a drawings grid, a book promo, press quotes, a contact page and a back cover. It is aimed at writers, illustrators and small-press people whose audience enjoys print conventions, and it replaces "scroll to learn more" with "turn the page".

## Layout anatomy

- Root fills the viewport with no scroll, with a soft lighter glow behind the book.
- **Top bar** in three columns: four text links, the name as an italic serif wordmark, and an underlined inline newsletter field with an arrow submit.
- **Stage:** previous arrow, the book, next arrow, all vertically centred.
- **Book:** two 3:4 pages side by side; each page is sized from the smaller of a share of viewport width and the available height (about 418x555px per page at 1440x900). Closed on the cover, the book shifts so the single cover is centred; open, the spine is centred; on the back cover it shifts the other way.
- **Leaves:** five sheets hinged at the spine, each with a front and a back page. Beneath them, two page-block shadows (left and right) appear only when there are pages on that side.
- **Pages** behave like scalable posters: type, padding, rules and images all scale with page width, so a page looks the same at any size. Pages carry running heads, folios, kickers, a drop cap, pull quote, a two-column image grid, a tilted book cover, a barcode on the back.
- **Bottom bar:** a heart "save" toggle with the current spread's title, six dot tabs (`role="tablist"`), and a social link.
- **Responsive:** at 900px and below the nav links hide. On narrow containers (about 720px and below) the 3D book is replaced by a horizontal, centre-snapping carousel of the ten single pages; the arrows disappear, the dots move above the save row and shrink, tapping a dot scrolls the carousel and scrolling updates the dots.

## Visual system

- **Type:** Literata (variable, optical sizing) for everything: extra-bold roman for the cover masthead, medium italic for the wordmark and quotes, small tracked uppercase for kickers, running heads and folios.
- **Colour:** two inks on two papers: desk `#ebe5c9`, page `#fbf8ee`, text `#1f1c16`, and one saturated blue `#2340d8` used for all chrome, rules, links and the full-bleed covers. Small status green `#2bb36a`; error red `#d6392c`.
- **Shape and depth:** barely rounded page corners; an inner gutter shadow on the spine side of every page; a paper-edge strip under the book; a folded corner at bottom-right that grows when the book is hovered; a shade across each page that deepens as it turns.

## Motion and interaction

Exercised in the live preview:

- **Turning:** a page does not swing like a door. Mid-turn it bows, as if cut into several vertical strips that each rotate a little more than the last, with the bend strongest halfway and its direction following the direction of travel. Strips darken with their angle, a cast shadow sweeps across the neighbouring page, and the book slides sideways when opening from or closing to a cover. A turn settles in about a second with a soft spring feel and no bounce.
- **Ways to turn:** the arrows (disabled at either end), Left and Right keys anywhere outside inputs, the dot tabs, rows on the contents page (jumping several spreads turns the leaves in quick succession), clicking near the outer edge of either page, and dragging horizontally across the book. A drag moves the page with the pointer and, on release, completes or cancels depending on distance and flick speed.
- **Labels:** the book's accessible label and the bottom-left title update to the current spread's name; the dots reflect `aria-selected`.
- **Save heart:** toggles `aria-pressed`, fills, pops, emits a ring of small dots and changes its caption to a saved state.
- **Small touches:** underline wipes on links, the wordmark tilts on hover, contents rows indent on hover, pill buttons fill from below, the promo book cover straightens on hover, the email row copies to the clipboard with confirmation, a status chip has a blinking dot.
- **Newsletter:** the stylesheet provides an error state (red underline with a shake) and a success message; neither could be triggered because the preview's sandbox policy blocks form submission.
- **Reduced motion:** spreads change instantly with no curl; CSS animation is removed; the mobile carousel scrolls without smoothing.

## Techniques worth reusing

- **Strip-based page curl in CSS 3D** - nest a handful of vertical strips, each hinged on its left edge at the right edge of its parent, and share a bend angle among them. Each strip shows its slice of the page. No canvas or WebGL, and real HTML text stays on the page.
- **One progress value drives the scene** - leaf rotation, stacking order, shadows, book offset and labels all derive from a single number, so drag, keys and buttons need no special cases.
- **Pages as container-query posters** - make each page a size container and express inner sizes in container units; the same page components then work in the book and in the mobile carousel.
- **Change the interaction model per width** - a native scroll-snap deck on phones instead of a shrunken 3D book.
- **Spring toward a target** instead of fixed-duration tweens, so interrupted or chained turns stay continuous.
- **Contents page as real navigation** - the table of contents is both content and menu.

## Build brief

```text
Build a single-viewport portfolio hero for [NAME], a [ROLE], presented as a small publication that the visitor pages through.

Frame: a slim top bar (nav links, wordmark, an inline email signup with validation), a bottom bar (a save/like toggle with the current spread title, one dot per spread, a secondary link). One typeface family and one accent colour for all chrome; visual style otherwise [PROJECT STYLE].

Book: centred, two portrait pages wide, sized from the smaller of viewport width and height. Content is [8-12] pages on [4-6] leaves, for example: cover with [HERO IMAGE] and title, introduction, contents list, feature opener, feature text, work grid, featured product, testimonials, contact, back cover. Make each page a size container and express all inner sizes in container units so a page scales as one piece.

Turning: keep one floating progress value from first cover to back cover and animate it toward the target with a damped spring. Each leaf is hinged at the spine with front and back faces. While a leaf is mid-turn, render it as several nested vertical strips sharing a bend so the page curves, and darken strips by angle. Add cast shadows on neighbouring pages, and offset the closed book so a lone cover sits centred.

Controls: previous/next buttons, Left/Right keys, dot tabs, contents entries that jump to a spread, clicking a page's outer edge, and horizontal drag that follows the pointer and settles by distance and velocity. Announce the current spread name via a live label.

Small screens: replace the book with a horizontal scroll-snap carousel of single pages and keep the dots in sync both ways.

Reduced motion: change spreads instantly, no curl or springs. Accessibility: real headings and text on pages; only the visible spread is focusable (everything else inert, including any duplicated strip content); comfortable touch targets. Performance: build strips only for the leaf that is turning, promote leaves to their own layers, lazy-load images beyond the first spreads. Provide a readable linear fallback without JavaScript.
```

## Adaptation notes

- Strong fit for personal sites, annual reports, lookbooks and catalogues of about five to eight spreads. Beyond that, add a proper index and deep links per spread.
- In the reference the page content exists several times in the DOM (flat faces plus strip slices); more than fifty contents buttons were present in the test. Hide the copies from assistive tech and keep off-spread pages out of the tab order.
- Text on 3D-transformed layers can blur at fractional sizes; snap page dimensions to whole pixels.
- Only one spread is visible at a time, so do not bury primary contact details on the last page alone; the reference repeats a contact link in the top bar.
- Drag-to-turn competes with text selection; the reference disables selection on the book, which you may want to relax on the long-form pages.
