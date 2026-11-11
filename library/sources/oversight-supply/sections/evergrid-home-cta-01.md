---
id: "oversight-supply/evergrid-home-cta-01"
name: "Evergrid Home CTA 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-home-cta-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-home-cta-01"
kind: "cta"
origin: "Evergrid template"
access: "free-with-account"
theme: "dark"
summary: "Closing call to action over a full-bleed aerial photo that fades from the cream page at the top into deep green at the bottom, with centred serif headline, line of copy and one light button."
tags: ["cta", "closing-section", "photo-background", "saas", "dark-green"]
techniques: ["photo-background-with-tint", "gradient-blend-into-footer", "editorial-serif-display", "single-action-cta"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "low"
---

# Evergrid Home CTA 01

## What it is

The last persuasive section on a home page. A large landscape photograph sits behind a centred headline and one button, and the image is graded with two gradients: it emerges out of the cream page above and dissolves into the dark green footer below. The call to action therefore doubles as the transition between the light page body and the dark footer.

> Evidence basis: this entry is based on a single static public thumbnail (a desktop render); the live preview was unavailable. Colour values are sampled from that screenshot and sizes are estimates or proportions, not measured CSS.

The thumbnail shows the CTA together with the dark footer that follows it (logo and three link columns), because the two share one surface; the footer is catalogued separately.

## Layout anatomy

- A full-width rounded block with a cover photograph behind centred content.
- Content is a centred column, vertically centred within the image area: h2 on two lines, a two-line paragraph held to about 25% of the section width, then the button.
- The section is tall: the image area is roughly 55-60% as tall as the section is wide, and the text block occupies only its middle fifth, leaving the photograph mostly unobstructed.
- Gradients: the top 10-15% fades from cream to transparent; the bottom 25% fades from transparent to the footer colour. The footer begins after a generous dark gap with a hairline divider.
- Tablet and mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** h2 in Lora regular, white, about 3x body with about 1.1 leading; paragraph in the grotesque sans, white, small; button label medium weight.
- **Colour:** top blend cream #f5f4eb; photo dominated by greens; bottom blend and footer very dark green #1a3029 (darker than the #234839 used for panels elsewhere); button warm off-white #f9f6ea with dark label.
- **Shape and depth:** the button is a compact rectangle with about 6px radius (not the pill used elsewhere in the template). No shadows. Text has no backing plate: legibility relies on the image being dark enough mid-frame.

## Motion and interaction

Not determined (live preview unavailable). The only related fact observed is that the template is a Webflow build whose page loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion is plausible, but none of it was seen running. Hover, focus, open/close and reduced-motion behaviour were not observed.

## Techniques worth reusing

- **Gradient blend at both edges** - masking the photo into the surfaces above and below removes hard section boundaries and lets one image bridge a light-to-dark page transition.
- **Image plus separate overlay layer** - a recommendation: keep the gradients in CSS, so the same photo can be reused and the blend colours can follow theme tokens.
- **Single action** - one button and at most one line of reassurance; nothing competes at the end of the page.

## Build brief

```text
Build a closing call-to-action section for [PRODUCT] that bridges a light page body and a dark footer.

Structure: <section> with position: relative, min-height clamp(520px, 60vw, 820px), display grid,
place-items: center. Background layer (absolute, inset 0, z-index 0): a cover image ([BACKGROUND_IMAGE],
alt="", decorative) and an overlay with three stacked gradients: page colour -> transparent over the top
15%, transparent -> [FOOTER_COLOUR] over the bottom 30%, and a subtle radial darkening behind the text
(about 25% black). Content (z-index 1): centred column, max-width 640px, with serif h2 "[HEADLINE]" (max 2
lines), paragraph "[SUPPORT]" (max 40ch), one primary button "[CTA_LABEL]" in a light fill, and an optional
small reassurance line "[REASSURANCE]". The footer follows directly with the same [FOOTER_COLOUR] so there
is no visible seam.

Behaviour: button hover/focus-visible shifts fill one step and nudges its arrow 4px; focus ring visible on
both the image and the dark colour.

Responsive: below 640px min-height 440px, h2 clamp(30px, 8vw, 48px), 20px side padding; use
object-position to keep the image's subject off the text; serve a smaller portrait crop via <picture>.

Motion: h2, paragraph and button fade up 20px in sequence when 30% of the section is visible. Optional
slow background scale from 1.06 to 1 tied to scroll. prefers-reduced-motion: static image, no fades.

Quality: text contrast 4.5:1 against the brightest pixels behind it (test with the real photo);
image lazy-loaded with a dominant-colour background fallback; AVIF/WebP at no more than about 250KB for
desktop; the section must still read correctly with the image missing.
```

## Adaptation notes

Use at the very end of a marketing page, immediately above a dark footer; on a light footer, flip the bottom gradient or drop it. The reference places white text over mid-green grass with no scrim, which will fail contrast on brighter photos: add the radial darkening from the brief. Because the blend colours must match neighbouring sections exactly, drive them from the same tokens rather than hard-coding hex values. Avoid stacking this directly under another photo-backed section.
