---
id: "oversight-supply/portfolio-vinyl"
name: "Vinyl"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/portfolio-vinyl"
preview_url: "https://supply.madebyoversight.com/sections?preview=portfolio-vinyl"
kind: "portfolio-hero"
origin: "Studio Original"
access: "free-with-account"
theme: "dark"
summary: "Musician portfolio hero built around a CSS turntable: pressing play slides the record out of its sleeve, drops the tonearm and starts a generated beat with a radial spectrum; the disc can be scratched by hand."
tags: ["portfolio", "music", "skeuomorphic", "dark", "audio", "album-launch", "turntable"]
techniques: ["interactive-demo-in-hero", "draggable-elements", "audio-reactive-visual", "web-audio-synthesis", "canvas-2d-particles", "css-skeuomorphism", "glassmorphism", "oversized-type", "copy-to-clipboard"]
stack: ["react", "css", "canvas", "web-audio", "svg"]
complexity: "high"
---

# Vinyl

## What it is

An album-launch hero for a recording artist. The left third is conventional (kicker, album title, blurb, play button, streaming links, tracklist); the right two-thirds is a turntable drawn in CSS that actually plays. The page generates its own beat for each track in the browser, spins the record, moves the tonearm across the side as the album progresses and lets the visitor scratch. "Listen" stops being an outbound link and becomes the page's central interaction.

## Layout anatomy

- Root fills the viewport with no scroll on desktop. The background is the album artwork, enlarged and heavily blurred at low opacity under a dark vignette, so the page takes its colour from the cover.
- **Top bar:** uppercase wordmark, four muted links, a pill "booking" button at the right.
- **Info column** (left, about a third of the width, capped near 460px): kicker with a blinking dot, a large two-line title (about 63px at 1440), a short paragraph, a play pill with "listen on" links beside it, then a six-row tracklist (number, title, duration) separated by hairlines.
- **Deck** (right, vertically centred, about 662x517px at 1440x900): plinth with brand text and a status LED, a platter ringed with strobe dots, the record, a spindle, a tonearm pivoting from the top-right corner, a start/stop key and a 33/45 selector bottom-left, a pitch slider bottom-right. All parts keep their proportions as the deck scales.
- **Sleeve:** a square print of the artwork, slightly rotated, overlapping the deck's left edge with the record half inside it. A status caption sits under the deck.
- **Footer:** next show with an "all dates" popover at the left; a glass pill with avatar and booking email at the right.
- **At 900px and below** the hero becomes a normal scrolling column: deck first (smaller, nudged right to leave room for the sleeve), then the info block, then the footer; nav links and the pitch label hide. At 390px wide the page is about 1016px tall.

## Visual system

- **Type:** Unbounded (a wide display face) for wordmark, title, deck branding and the record label text; Onest for all interface text. Small uppercase tracked captions.
- **Colour:** near-black `#0a0c0f`, text `#eef3f4` with a muted tier and faint hairlines, one accent cyan `#5ee6e6` (current track, focus, stylus tip, spectrum, slider). Playing LED red `#ff4d3a`.
- **Materials, all CSS gradients:** a dark brushed plinth with a top highlight; a platter rim of alternating light and dark ticks; fine concentric grooves on the vinyl; a fixed sheen with two soft highlights laid over the spinning disc; a metallic tonearm rod, pivot and spindle. The record label is the artwork with text set around a circle in SVG.

## Motion and interaction

Exercised in the live preview:

- **Three phases** as a class on the root: in sleeve, playing, paused.
- **First play:** the record slides out of the sleeve onto the platter, the sleeve tucks behind the deck at an angle, the tonearm swings from its rest to the lead-in groove, and after about a second and a half playback begins. The play pill becomes Pause, the deck key flips from Start to Stop, the LED lights, the background brightens, the caption shows track number and name, and the current row swaps its number for a small animated equaliser and shows elapsed and total time.
- **Rotation:** the disc spins up and coasts down with inertia; on pause the arm returns to rest.
- **Tonearm as progress:** the arm's angle reflects position across the whole side; jumping to the fourth track moved the stylus visibly inward.
- **Audio-reactive visuals:** a ring of accent ticks radiates around the record, their lengths following the sound's spectrum, and a soft accent halo behind the platter pulses with loudness.
- **Speed:** the 33/45 radio pair speeds everything up and tags the caption; the pitch slider (a labelled range input of a few percent either way, keyboard operable) fine-tunes it.
- **Scratch:** once the record is out, dragging on it turns the disc with the pointer and playback follows the hand; on release it eases back to normal speed.
- **Tracklist:** clicking a row plays that track, taking the record out first if needed.
- **Secondary:** "all dates" opens a blurred popover with ticket links; the booking button and email copy the address and confirm inline for a couple of seconds.
- **Reduced motion:** CSS animation and transitions are removed (record and sleeve jump into place, no pulses or equaliser) and the tonearm snaps; the disc still rotates while playing.
- Sound could not be heard in the headless test; the loudness-driven halo value rose and fell during play, which indicates the audio graph was running. No audio files are requested by the page.

## Techniques worth reusing

- **Proportional skeuomorphism** - size every part as a fraction of one width variable; the object scales cleanly across a wide range with no breakpoints of its own.
- **Static highlight over rotating texture** - keep the sheen separate from the spinning element. It is the largest single contributor to the vinyl illusion.
- **Procedural audio for demos** - a simple step sequencer of oscillators and filtered noise needs no audio files or licensing, weighs almost nothing, and its rate can be bent live for scratching.
- **A physical part as the progress indicator** (the tonearm) instead of a scrub bar.
- **Pointer angle to velocity to playback rate** for scratch or jog-wheel controls.
- **Ambient colour from artwork** - blur the cover as the page background rather than hand-picking a gradient.
- **Two controls for one action** - a conventional play button in the text column and a skeuomorphic key on the object, kept in sync.

## Build brief

```text
Build a full-viewport hero for [ARTIST OR PRODUCT]'s release [TITLE] centred on a playable, skeuomorphic [PLAYER OBJECT, e.g. turntable, tape deck, radio].

Text column (about a third of the width): status kicker, large display title, one-sentence blurb, a primary play/pause button, links to [EXTERNAL SERVICES], and a list of [N] tracks or chapters (number, title, duration). Opposite: the player object built from CSS gradients and a little SVG, with its moving parts as separate layers: a rotating medium carrying [ARTWORK], a fixed highlight above it, an indicator arm or needle, a start/stop key, a speed selector and a fine-tune slider. Size every part as a fraction of one width variable. Show the packaging ([ARTWORK]) beside it with the medium partly inside. Use the blurred artwork as page background under a dark overlay. Footer: [NEXT EVENT] with a details popover, and a copy-to-clipboard contact.

Behaviour: three phases (packaged, playing, paused). First play animates the medium into the player, moves the packaging aside, engages the indicator and then starts audio. Rotation eases up and down with inertia. The indicator's position maps to elapsed time across the whole release. Selecting a list item jumps there. Speed and fine-tune change playback rate. Dragging the medium scrubs or scratches: it follows the pointer and playback rate follows angular velocity.

Audio: either play [TRACK FILES] through an analyser, or synthesise a short loop per track with Web Audio. Create the audio context only after a user gesture, never autoplay, and include volume or mute. Draw a spectrum visual around the player on a canvas and pulse a glow from overall level.

Responsive: on narrow screens stack player, text, footer and let the page scroll; consider disabling drag-scratch on touch so the page can scroll.

Reduced motion: no slide-in, pulses or equaliser animation; keep only the rotation that indicates playback. Accessibility: play state via aria-pressed, current item via aria-current, labelled slider and radio group; the object is decorative for assistive tech and every function has a standard button equivalent. Pause audio when the tab is hidden. Visual style: [PROJECT STYLE].
```

## Adaptation notes

- Direct fit for musicians, podcasts, labels and audio products; the "object you operate" idea transfers to cameras, synths, watches or any product with a tactile control.
- The reference has no volume or mute control; add one.
- Scratching is pointer-driven and the record area blocks touch scrolling; keep it small on phones or switch scratch off there.
- With real recordings, expect licensing and payload costs, and use buffer playback rate for the scratch effect.
- The spectrum redraws continuously; skip drawing when silent and pause off-screen.
- A heavily blurred full-bleed image is cheap once rasterised but costly to animate; change only its opacity.
