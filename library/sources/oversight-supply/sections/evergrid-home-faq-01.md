---
id: "oversight-supply/evergrid-home-faq-01"
name: "Evergrid Home FAQ 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-home-faq-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-home-faq-01"
kind: "faq"
origin: "Evergrid template"
access: "free-with-account"
theme: "light"
summary: "Cream-panel FAQ: left-aligned serif heading, a stack of white full-width question bars with plus icons, and a closing contact row with a pill button."
tags: ["saas", "calm", "cream-and-green", "faq", "support"]
techniques: ["accordion", "editorial-serif-display", "pill-button-with-arrow-chip"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "low"
---

# Evergrid Home FAQ 01

## What it is

A frequently-asked-questions block for a SaaS home page. Four questions sit as separate white bars on a cream panel, and the list ends with a fifth bar that is not a question at all but a "still stuck?" row with a contact button. The idea that carries it: the escape hatch is styled as the last item of the list, so nobody reaches the end without a next step.

> Evidence basis: this entry is based on a single static public thumbnail (a desktop render); the live preview was unavailable. Colour values are sampled from that screenshot and sizes are estimates or proportions, not measured CSS.

## Layout anatomy

- One container, single column. Heading block (h2 plus a two-line paragraph capped at roughly 30% of the container width) is left-aligned, followed by a gap about 1.5x the heading height.
- The list is a vertical stack of full-width bars with a constant gap of roughly a quarter of a bar's height. Each bar is a row: a small plus icon, then the question, both left-aligned with generous inline padding; nothing on the right edge.
- All four questions are closed in the thumbnail; the plus icon implies each bar expands to show its answer, but the open state was not seen.
- The final bar is a two-column row: bold question-weight line plus muted sub-line on the left, pill button pushed to the far right. It is about 1.6x the height of a question bar.
- Tablet and mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** Lora (serif, regular weight) for the heading at roughly 3x the question size; a neutral grotesque sans for everything else (family not determined). Questions are medium weight, about 1.15x body size; answers and helper copy are regular and muted.
- **Colour:** panel cream #f5f4eb; bars pure white #ffffff; heading ink deep green near #173225; body grey around #5a5f5a; button fill deep green #234839 with white label and a white circular arrow chip.
- **Shape and depth:** bars have a small radius (about 8px at desktop), no border and no shadow: separation is purely white on cream. The outer panel has a slightly larger radius. The button is a full pill.

## Motion and interaction

Not determined (live preview unavailable). The only related fact observed is that the template is a Webflow build whose page loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion is plausible, but none of it was seen running. Hover, focus, open/close and reduced-motion behaviour were not observed.

## Techniques worth reusing

- **CTA as the last list item** - give the contact prompt the same container treatment as the questions so it reads as the natural end of the list rather than a separate banner.
- **Separated bars instead of ruled rows** - white bars on a tinted panel avoid hairlines entirely and give each question a large, obvious hit area.
- **Leading plus icon** - putting the affordance before the text keeps it adjacent to the label on very wide bars, where a right-aligned chevron would be a long way from the words.
- **Accordion** - see `../../../patterns/accordion.md` if present; build it on native disclosure semantics rather than div click handlers.

## Build brief

```text
Build an FAQ section for [PRODUCT].

Structure: a tinted panel (background [SURFACE_TINT]) with a left-aligned serif h2 "[HEADING]" and a short
supporting paragraph limited to ~32ch. Below it, a vertical stack of [N] white bars with 16-20px gaps. Each
bar is a disclosure: a <button aria-expanded aria-controls> spanning the full bar that contains a 16px plus
icon followed by the question text ([QUESTION_n]); the answer ([ANSWER_n]) lives in a region underneath,
inside the same bar, indented to align with the question text. After the last question add one more bar in
the same style that is NOT a disclosure: bold line "[STILL_STUCK_TITLE]", muted line "[STILL_STUCK_BODY]",
and a pill button "[CONTACT_LABEL]" aligned right.

Behaviour: clicking a bar opens its answer with a 250-300ms height and opacity transition and rotates the
plus 45 degrees; allow several open at once; Enter/Space toggle; Home/End not required. Use the
grid-template-rows 0fr -> 1fr technique or <details> so no JS height measurement is needed.

Responsive: bars keep 20-24px inline padding down to 360px; question text wraps, icon stays top-aligned
with the first line; the contact bar stacks and its button becomes full width below 640px.

Motion: heading and bars fade up 16px once on entering the viewport, staggered 60ms. With
prefers-reduced-motion, show everything immediately and switch open/close to an instant toggle.

Quality: visible focus ring on each bar, 44px minimum hit height, 4.5:1 text contrast, no layout shift when
fonts load, no JS required to read the answers (content in the DOM, crawlable, FAQPage JSON-LD optional).
```

## Adaptation notes

Works anywhere near the bottom of a marketing page, directly above a CTA or footer. Build the toggles as real buttons with aria-expanded; the reference's semantics could not be inspected. With more than eight questions, group them or add a search field; the bar treatment gets heavy when long. The white-on-cream contrast between bar and panel is subtle (about 1.1:1), so do not rely on it alone to signal interactivity: keep the icon and a hover tint.
