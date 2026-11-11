---
id: "oversight-supply/prompt-murmur"
name: "Murmur"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/prompt-murmur"
preview_url: "https://supply.madebyoversight.com/sections?preview=prompt-murmur"
kind: "hero"
origin: "Studio Original"
access: "free-with-account"
theme: "dark"
summary: "Voice-assistant hero centred on a WebGL orb whose surface, glow and colour follow a listen / think / speak cycle driven by the microphone, with a clearly labelled scripted fallback."
tags: ["ai-product", "voice", "webgl", "orb", "dark", "centered", "audio-reactive"]
techniques: ["three-js-scene", "webgl-shader-background", "interactive-demo-in-hero", "audio-reactive-visual", "voice-state-machine", "pointer-tracking", "accent-theme-switching", "graceful-capability-fallback"]
stack: ["react", "three.js", "glsl", "web-audio", "web-speech", "css"]
complexity: "high"
---

# Murmur

## What it is

A centred, single-screen hero for a voice product. Instead of a screenshot it shows the one thing a voice interface has to show: a presence that visibly reacts when you talk. Tapping the mic or the orb, or holding Space, starts a listen, think, speak cycle with a live transcript and a reply revealed word by word. If the browser provides no microphone or speech recognition, the same choreography runs on simulated input and says so.

## Layout anatomy

A viewport-height flex column with everything on one centre axis and no scroll:

1. Nav in three columns: logo with a tiny animated equaliser, three links, a pill button.
2. Headline (64px at 1440 wide) and one supporting sentence in a narrow measure.
3. Stage that takes the remaining height: a square canvas (about 414px at 1440x900) with a status pill overlapping its lower edge.
4. A fixed-height words area: the heard phrase in quotes, and the spoken reply beneath in a muted tone. The reserved height stops the layout jumping.
5. Controls in three columns: a small round speaker toggle, a large round mic button, and a "type instead" pill input that widens on focus.
6. A keyboard hint with a key cap, then a three-option voice picker inside a pill container.

A large blurred halo sits behind the orb and a sparse star field behind that. At 640px and below the nav links hide and the text input moves to its own centred row under the two round buttons; at 390x844 the composition still fits one screen.

## Visual system

- **Type:** Manrope (variable) throughout. Bold headline with tight tracking, filled with a white-to-lilac vertical gradient; small bold uppercase tracked labels for status.
- **Colour:** a deep indigo radial background (`#1a1550` through `#0c0a2a` to `#07061a`); text `#f1eefc` at three opacities for hierarchy. Each voice has a two-colour identity used by both the page accents and the orb: pink `#ff3d7f` with violet `#8a5cff`; blue `#2b5cff` with cyan `#36e0ff`; green `#1aa36b` with lime `#d8f05a`. Recording dot red `#ff4d5e`.
- **Shape and depth:** circles and full pills only. Controls are faint white fills with hairline borders; the mic button is the single light object, with a soft shadow tinted by the active voice colour.

## Motion and interaction

Exercised in the live preview in a browser without a microphone, so this is the simulated path:

- **States** appear as a class on the root (idle, listening, thinking, speaking). The status pill is a live region and the canvas's accessible label mirrors it.
- **Idle:** the orb breathes gently, rotates slowly and leans slightly toward the pointer. A ring pulses out from the mic button as an invitation.
- **Listening:** the mic icon becomes level bars, a two-colour gradient ring spins around the button, the status dot turns red and pings. An input level is published continuously and several things follow it at once: halo size, ring size, bar heights, and the orb's ripple strength, scale and rim brightness. The transcript fills in word by word. The status reads as a demo when the input is simulated.
- **Thinking** (about a second): the surface becomes busier and twists; the halo breathes; the dot blinks.
- **Speaking:** the reply appears a word at a time and the orb throbs once per word. With the speaker toggle on, the page is set up to read the reply aloud. It returns to idle shortly after the last word.
- **Interrupt:** pressing the mic while thinking or speaking stops and returns to idle. Holding Space listens; releasing ends the turn. Successive simulated turns cycled through different sample phrases, each with a fitting canned answer.
- **Voice picker** (a `radiogroup`): the page accents switch immediately and the orb's colours blend to the new pair over about a second.
- **Fallbacks:** the stylesheet carries a pure-CSS gradient sphere for when WebGL is unavailable. Under reduced motion the orb is a still, slightly bumpy sphere, CSS animation is removed, and transcript and reply appear essentially at once.
- **Not verified:** real microphone input, speech recognition and spoken output (unavailable in the test browser), and the typed-input form (form submission is blocked by the preview's sandbox policy).

## Techniques worth reusing

- **One scalar, many consumers** - publish the audio level once, as a CSS variable and as a shader input. DOM glow, ring, bars and the 3D mesh stay in sync with no per-element scripting.
- **Per-state targets with continuous easing** - each state only declares where the visual parameters should be; the render loop eases toward them every frame, so state changes blend and interruptions never snap.
- **Displaced sphere with a view-angle rim** - a finely subdivided sphere pushed along its normals by animated noise, shaded with two blended colours, a tight highlight and a bright rim. Cheap, and reads as alive at any size.
- **Capability ladder** - real mic and recognition, then level only, then fully simulated; WebGL, then CSS. The interface states which rung it is on.
- **Push-to-talk on a key**, guarded so it never fires while focus is in an input or on a button.
- **Reserved space for streaming text** so nothing below it moves.

## Build brief

```text
Build a centred, single-viewport hero for [PRODUCT], a voice interface, whose focal point is an audio-reactive visual "presence".

Structure on one centre axis: minimal nav; headline [HEADLINE] with one supporting sentence; a square stage sized to the smaller of roughly half the viewport height or most of its width, containing the presence, with a small status indicator at its lower edge; a fixed-height transcript area with two lines (what was heard, what is being said); a control row with a spoken-output toggle, a large primary talk button and a compact "type instead" field; a keyboard hint; a segmented picker for [N VOICES OR MODES], each with its own colour pair.

Presence: [ORB / WAVEFORM / CHARACTER] rendered in WebGL with a small custom shader, or in CSS if that is enough. Expose a handful of parameters (motion amount, detail, speed, scale, glow, colours) and ease them toward per-state targets every frame.

States: idle (calm, talk button invites), listening (visual follows input level, talk button shows level, live transcript), thinking (visibly busier), speaking (reply revealed progressively, visual pulses with it). Talk button, clicking the presence and holding [KEY] start listening; pressing again stops or interrupts at any point.

Input: ask for the microphone only on explicit click; compute a level from an analyser; use speech recognition where available. If either is missing or refused, run a scripted demonstration with a simulated level and label it as a demo. Replies come from [REAL BACKEND or KEYWORD RULES]. Optionally speak replies when the toggle is on.

Responsive: on narrow screens hide nav links and move the text field under the buttons; never scroll.

Fallbacks and quality: static or CSS presence when WebGL is unavailable; under prefers-reduced-motion freeze the visual and show text immediately. Cap pixel ratio, pause rendering when off-screen or hidden, release the mic and audio context on stop, announce state changes in a live region, label every control and keep visible focus. Visual style: [PROJECT STYLE].
```

## Adaptation notes

- The pattern generalises to any "presence" product (assistants, meditation, music): keep the state machine and swap the visual.
- three.js dominates the payload here (the preview's inlined script is roughly 680KB before compression). For a single mesh, use raw WebGL or a slim build, or lazy-load after first paint with a CSS placeholder.
- Requesting the microphone from a marketing page is a trust moment: explain why beside the button and give the demo path equal polish.
- The reference appears to render continuously; add visibility and intersection pausing.
- The canvas is exposed as an image yet is clickable; treat the mic button as the real control and either make the canvas a proper button or drop its click handler.
