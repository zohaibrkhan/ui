---
id: "oversight-supply/prompt-parlor"
name: "Parlor"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/prompt-parlor"
preview_url: "https://supply.madebyoversight.com/sections?preview=prompt-parlor"
kind: "hero"
origin: "Studio Original"
access: "free-with-account"
theme: "light"
summary: "Character-chat hero: three illustrated faces act as a radio group that re-themes the page, beside a working scripted chat window that lets visitors try the product before signing up."
tags: ["playful", "chat-ui", "neo-brutalist", "ai-product", "mascots", "interactive-demo"]
techniques: ["interactive-demo-in-hero", "hard-offset-shadows", "pointer-tracking", "accent-theme-switching", "scripted-chat-demo", "svg-character-faces", "emoji-burst"]
stack: ["react", "css", "svg"]
complexity: "medium"
---

# Parlor

## What it is

A full-viewport hero for a conversational AI product in which the product is the hero: one half is a functioning, scripted, offline chat window and the other is a headline plus a small cast of selectable personas. Choosing a persona recolours the section and changes who answers. It suits consumer AI, companion and tutoring products, or anything where personality is the selling point.

## Layout anatomy

- A viewport-height flex column on a cream field with a fine dot grid and four decorative geometric shapes (a large circle bleeding off the right edge, a rotated rounded square, a triangle, a small circle).
- Nav row: wordmark left, three text links pushed right, a small CTA button.
- Main area: a centred two-column grid (roughly equal columns, about 1180px max, vertically centred).
  - Left: a status pill, a three-line headline with one word set in a tilted highlight box, a short paragraph, then a row of three persona cards (face, name, role), each about 150px wide.
  - Right: a chat card about 505x560px at 1440x900, stacked as accent-coloured header (avatar, name, live status, reset button), scrolling message list, a row of suggestion chips, and an input with send button.
- At 900px and below the grid becomes one column, the nav links hide and the chat takes a fixed height. At 390px the page scrolls (about 1060px tall), the three cards share the row equally and the chip row scrolls sideways. No horizontal overflow observed.

## Visual system

- **Type:** one family, Bricolage Grotesque (variable). Display at 82px/800 with tight negative tracking on desktop; body 16px/500 in softened ink; UI labels 13-14px at 600-700.
- **Colour:** background `#fff4e0`, ink `#141414`, white surfaces. The accent is a pair (fill plus dark on-accent text) that changes with the persona: yellow `#ffd23f` / `#2b2100`, blue `#5ec8ff` / `#002537`, pink `#ff7eb6` / `#3a0020`. Decorative fills: lime `#b9f27c`, orange `#ff7a4d`, violet `#9d8cff`.
- **Shape and depth:** every surface has a thick ink outline and a hard, unblurred offset shadow, largest on the chat window and smallest on bubbles and pills. Radii run from about 12px (buttons) to 22px (cards), with full pills for tags and chips. Bubbles square off the bottom corner on the speaker's side; the visitor's bubbles are ink-coloured with an accent shadow.

## Motion and interaction

Exercised in the live preview:

- **Load:** nav drops in, text blocks rise in sequence, the chat window springs up with a slight rotation.
- **Ambient:** shapes float or spin slowly, the highlighted word wobbles, faces blink at irregular intervals.
- **Pointer:** the pupils of every face follow the cursor within a small radius. While the input is focused and has text, the faces look at the input instead and track along it as the text grows, with wider pupils and raised brows, so they appear to read what is being typed.
- **Persona cards** (a `radiogroup` of `radio` buttons): selecting one lifts and tilts that card, swaps the accent pair (header, highlight, CTA, send button and the big circle all cross-fade), updates the chat header, placeholder and accessible label, and adds that persona's greeting to the thread. Earlier bubbles keep their sender's colour, so a thread can become multi-coloured.
- **Suggestion chips:** a click posts the chip as the visitor's message; after a beat a three-dot typing bubble appears and the header status changes to a typing state; one to two seconds later the reply pops in, the status changes to a talking state and the active face's mouth animates for a time that scales with reply length. Chips are disabled while a reply is pending.
- **Replies** are produced in the browser with no network: each persona answers the same prompts in its own voice, and unmatched input gets a generic in-character response.
- **Reactions:** hovering or focusing a bot bubble reveals a small emoji bar; choosing one pins a badge to the bubble (toggleable) and throws a short burst of that emoji from the click point.
- **Reset** clears the thread back to the current persona's greeting.
- **Reduced motion:** all animation and transition durations collapse, nothing loops, and replies arrive almost immediately.
- **Not verified:** sending free text. The public preview is served with a sandbox policy that blocks form submission, so only the chip path could be triggered.

## Techniques worth reusing

- **Accent pair as custom properties on the section root** - one fill and one on-fill text colour drive a dozen elements; changing persona is a single state change and CSS transitions do the rest.
- **Faces that read the input** - the same look-at maths used for the pointer, retargeted to the text caret while typing. Tiny cost, large personality.
- **Scripted demo with an honest fallback** - keyword-matched canned replies plus a catch-all make a demo feel alive with zero backend. Say that it is a demo.
- **Hard-offset press states** - hover nudges the element away from its shadow and grows the shadow; pressing moves it onto the shadow's position and removes the shadow, reading as a physical button.
- **One status value** (idle / typing / talking) feeding both the header text and the character animation, so they cannot disagree.

## Build brief

```text
Build a full-viewport hero for [PRODUCT], a conversational product, that embeds a scripted mini-demo visitors can use without signing up.

Layout: simple nav, then two columns centred in the viewport. One column holds a small status pill, a short headline with one emphasised word, a supporting sentence, and a row of [N PERSONAS OR MODES] selectable cards (illustration or icon, name, one-word role). The other holds a chat card: header with avatar, name, live status and a reset control; scrolling message list; a row of [3-4] suggested prompts; a text input with send button. Below about 900px stack to one column, hide nav links, and let the prompt row scroll horizontally.

Behaviour: the persona cards are a radio group with proper arrow-key handling. Each persona defines an accent colour and an on-accent text colour, exposed as two CSS variables on the section root; selecting a persona transitions those variables, updates the chat header and input placeholder, and posts that persona's greeting. Sending a prompt (chip or typed) adds the visitor's bubble, shows a typing indicator for roughly a second, then a reply chosen from per-persona keyword rules with a generic fallback. No network requests. Bot messages offer a small reaction bar on hover and keyboard focus. If personas are drawn as characters, make their eyes follow the pointer and, while the visitor types, follow the caret.

Visual direction: [PROJECT STYLE]. Keep one strong accent at a time and make every interactive element's pressed state physically obvious.

Motion: staggered entrance, a quick pop for new messages, gentle ambient movement on decorative elements. Under prefers-reduced-motion remove loops and springs, deliver replies immediately and scroll without smoothing.

Quality bars: message list is a polite live region; visible focus rings; AA contrast for text on every accent; no layout shift when messages arrive; pointer tracking throttled to animation frames; the demo is labelled as a demo.
```

## Adaptation notes

- Works when the product has two to four distinct voices, agents or modes; with only one, drop the cards and keep the chat demo.
- If you later wire a real model behind it, keep the scripted path as the offline and rate-limit fallback.
- In the reference all three radio buttons stay in the tab order and arrow keys did not move the selection in testing; implement roving tabindex properly.
- Pointer movement re-renders the component tree every frame there; for a heavier page write eye offsets straight to CSS variables or SVG attributes.
- Emoji render differently per platform; use SVG icons if consistency matters.
