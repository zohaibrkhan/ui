---
id: "oversight-supply/evergrid-about-us-features-01"
name: "Evergrid About Us Features 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-about-us-features-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-about-us-features-01"
kind: "features"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "Numbered three-step story: portrait image left, text and checklist right, joined by a centre rail whose dark fill tracks scroll past numbered nodes."
tags: ["saas", "about", "numbered-steps", "cream-and-green", "editorial"]
techniques: ["timeline-steps", "scroll-scrubbed-animation", "sticky-progress-line", "editorial-serif-display", "fade-in-on-scroll", "text-roll-button"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "medium"
---

# Evergrid About Us Features 01

## What it is

An about-page feature sequence that tells a three-part story (purpose, method, result). Each step is a row with a tall image on one side and a heading, paragraph, three-point checklist and button on the other. A vertical rail runs down the middle with a numbered disc per step, turning three ordinary alternating rows into one continuous timeline.

> Evidence basis: the catalogue thumbnail (a desktop render) plus the DOM of the public preview. The template stylesheet, fonts and scripts sit on a third-party CDN that was unreachable from the analysis environment, so the preview rendered unstyled: hover, scroll and sub-desktop behaviour below are inferred from markup and marked as such, and pixel values are estimates from the thumbnail.

## Layout anatomy

- A relatively-positioned wrapper holds three step grids stacked vertically, plus one absolutely-positioned rail element that spans the full wrapper height at the horizontal centre.
- Each step grid has three tracks: image (about 40% of the container), a narrow rail column holding the numbered disc (about 8%), and content (about 32%, with empty margin beyond). In the thumbnail every step keeps the image on the left; the rows do not alternate.
- Image: portrait, about 4:5, rounded corners. The content column starts slightly lower than the image top, so the heading aligns just below the disc.
- Content order: h2/h3 in serif (two to three lines), muted paragraph, a gap, three checklist lines each with a small green tick disc, a gap, pill button.
- Steps are separated by roughly 150px of air at desktop, so step 2 begins while step 1's image is still leaving the viewport.
- The rail has two layers: a light grey track the full height and a near-black fill. In the thumbnail the fill runs from disc 1 to about 40% of the first step, consistent with a fill that grows with scroll. The active disc is larger and darker; upcoming discs are smaller and lighter.
- Mobile: not determined.

## Visual system

- **Type:** Lora regular for step headings (roughly 2x body); grotesque sans for paragraph (muted grey) and checklist (near-black, medium weight, slightly smaller than body).
- **Colour:** background cream #f5f4eb; rail track light grey #c7c7c7; rail fill near-black #1c1c1a; discs deep green #244636 with white numerals; tick badges bright green around #3ac31c on a pale green disc; button deep green #254636.
- **Shape and depth:** image radius about 16px; discs fully round, about 40px; rail about 4px wide; no shadows anywhere.

## Motion and interaction

- The first step's pieces are wrapped in load-reveal containers and later steps in scroll-reveal containers, with a delayed variant for text so the image leads and the copy follows.
- The class names on the wrapper and rail (sticky wrapper, centre line) and the two-layer rail indicate a scroll-linked fill, most likely a ScrollTrigger scrub scaling the dark layer from the top. Whether the rail or the discs are position: sticky was not determined.
- Button hover: label roll with arrow chip swap (shared template button, inferred from duplicated label markup).
- Reduced motion: not determined.

## Techniques worth reusing

- **Rail as a separate absolutely-positioned layer** - keeping the progress line outside the step grids means steps can vary in height without breaking the line, and the fill is one transform to animate.
- **Disc state as progress feedback** - scaling and darkening the current number gives a second, discrete signal on top of the continuous fill.
- **Checklist between paragraph and button** - three short verifiable claims do more than a longer paragraph and keep the column scannable.
- **Timeline steps** - see `../../../patterns/timeline-steps.md` if present.

## Build brief

```text
Build a numbered story section with [N=3] steps for [BRAND].

Structure: a wrapper with position: relative. Inside, an ordered list of steps. Each step is a 3-track grid
(5fr / 80px / 4fr): a 4:5 rounded image ([IMAGE_n]), a rail cell containing a 40px numbered disc, and a
content cell with a serif heading "[STEP_TITLE_n]", a muted paragraph, a 3-item checklist with tick icons
([POINT_n_1..3]) and a pill button "[CTA_LABEL]". Leave 120-160px between steps. Behind the rail cells place
one absolutely-positioned 4px vertical track spanning the wrapper, with a second element on top as the fill.

Behaviour: scale the fill on the Y axis (transform-origin top) from 0 to 1 in proportion to scroll progress
through the wrapper, using animation-timeline: view() with a ScrollTrigger-style JS fallback. When the fill
reaches a disc, mark that step current: disc scales 0.8 -> 1 and switches from muted to the brand colour.
Images fade up first; text follows 120ms later.

Responsive: below 900px collapse to a single column; move the rail to the left edge (24px gutter) with
discs beside each heading and images full width above the text.

Reduced motion: render the rail fully filled, all discs current, no fade transforms.

Quality: use <ol> and real headings in order; the number is decorative if the list is ordered
(aria-hidden); images lazy-loaded with width/height set; only transform and opacity are animated; no scroll
listeners without passive: true.
```

## Adaptation notes

Good for process, mission/values or onboarding narratives of three to five steps; beyond that the rail gets long and the pattern becomes a chore. Decide early whether rows alternate: this one does not, which keeps the rail honest and the reading path a straight line. The checklist text in the thumbnail is small (about 13px); raise it to at least 15px. Do not hide step content behind the scroll animation: every step should be readable with JS disabled.
