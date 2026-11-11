---
id: "oversight-supply/evergrid-contact-contact-01"
name: "Evergrid Contact Contact 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-contact-contact-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-contact-contact-01"
kind: "contact"
origin: "Evergrid template"
access: "free-with-account"
theme: "mixed"
summary: "Contact page block: a large rounded deep-green panel on cream holding a tag pill, serif title and a white form card with cream fields and a full-width pill submit."
tags: ["contact", "lead-form", "saas", "dark-green", "cream-and-green"]
techniques: ["form-with-validation", "editorial-serif-display", "inset-panel", "pill-button-with-arrow-chip"]
stack: ["webflow", "gsap", "scrolltrigger", "css"]
complexity: "medium"
---

# Evergrid Contact Contact 01

## What it is

The main block of a contact page: heading, short pitch and an enquiry form, all inside one inset dark panel. The form itself sits on a white card within that panel, giving three nested surfaces (cream page, green panel, white card) that walk the eye inward to the fields.

> Evidence basis: this entry is based on a single static public thumbnail (a desktop render); the live preview was unavailable. Colour values are sampled from that screenshot and sizes are estimates or proportions, not measured CSS.

## Layout anatomy

- Cream page with about 70px margin around a full-width panel with a large radius (about 28px).
- Everything is centred in the panel. Tag pill, then h1, then a two-line paragraph, then the form card at about 66% of the panel width.
- Form grid: two columns. First and last name share a row; email spans both; a "reason" select spans both; message textarea spans both and is about 4x the height of an input.
- Each field: a label row (a tiny square or dot marker plus bold small label) above the control.
- Below the fields: a consent line in small centred text, then the submit control spanning the full card width.
- Tablet and mobile reflow: not determined (live preview unavailable).

## Visual system

- **Type:** h1 in Lora regular, white, at the template's largest size; paragraph in the grotesque sans at about 1.15x body; labels small and semibold; placeholders mid grey.
- **Colour:** page cream #f5f4eb; panel deep green #234839; form card white #ffffff; field fill cream #f5f4eb with a 1px border one step darker (#edece3); tag pill beige #e3dfcc with a bright green dot #3ac31c; submit deep green #254636 with white label and white arrow chip.
- **Shape and depth:** panel radius about 28px; card about 10px; fields about 4px (noticeably squarer than everything else); submit is a full pill about 56px tall; no shadows.

## Motion and interaction

Not determined (live preview unavailable). The only related fact observed is that the template is a Webflow build whose page loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion is plausible, but none of it was seen running. Hover, focus, open/close and reduced-motion behaviour were not observed.

## Techniques worth reusing

- **Nested surfaces to focus a form** - page, panel, card, field alternate light/dark/light/tint, so the form is the brightest object without any shadow.
- **Tinted fields on a white card** - filled inputs read as "type here" more clearly than outlined ones and tie the form back to the page colour.
- **Qualifying selects** - two short dropdowns (size, goal) route leads without lengthening the form much.
- **Form with validation** - see `../../../patterns/form-with-validation.md` if present.

## Build brief

```text
Build a contact section for [COMPANY].

Structure: on the page background, an inset panel ([SURFACE_DARK], 28px radius, 24-72px outer margin).
Inside: a small tag pill with a status dot "[TAG]", a serif h1 "[HEADING]", a 2-line intro "[INTRO]", and
a white form card (max-width 780px, 10px radius, 32px padding). Optional side column listing
[EMAIL], [ADDRESS], [HOURS] as label/value pairs using real mailto/tel/map links.

Form: 2-column grid, 16px gaps. Fields: first name*, last name, email* (full width), [SELECT_1] and
[SELECT_2] (optional qualifiers), message* (full width textarea, 5 rows, vertical resize). Every control has
a visible <label for> matching its own id, autocomplete tokens, and required marked in the label text, not
only in the placeholder. Then a consent checkbox with a link to [PRIVACY_URL], then a full-width pill
submit "[SUBMIT_LABEL]" with a trailing circular arrow chip.

Behaviour: validate on blur and on submit; show inline messages under the field linked by
aria-describedby, set aria-invalid, and move focus to the first invalid field. While sending, disable the
button and change its label to "[SENDING_LABEL]". On success replace the form with a confirmation that
receives focus (role="status"); on failure show an alert above the button and keep all input.

States: fields have tinted fill and 1px border; focus-visible adds a 2px brand outline with offset; invalid
uses a colour with 3:1 against the fill plus an icon or text.

Responsive: below 640px one column, panel margin 12px, card padding 20px, 16px font size in inputs to stop
iOS zoom.

Motion: stagger the header pieces then the card on load (60ms steps). prefers-reduced-motion: none.
Works without JS via a normal POST to [ENDPOINT]; include a honeypot field for spam.
```

## Adaptation notes

Suits demo-request, sales-contact and support-intake pages. The centred, minimal composition suits a single purpose; add a side column only when address and hours matter. The thumbnail marks required fields with an asterisk inside the placeholder, which disappears on typing: move that to the label. Validation, focus and error states could not be observed, so specify them yourself (the brief does). The dot before each label is decorative only; do not let it imply "required".
