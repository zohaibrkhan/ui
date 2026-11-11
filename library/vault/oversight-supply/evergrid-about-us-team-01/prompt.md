<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Evergrid — About Us — Team 01

Evergrid — About Us — Team 01 is the Team section on the About Us page of the Evergrid Webflow template, sort order 19. The headline is “Our Team.”.

Rebuild this as one section. The element tree, the class CSS, the breakpoint overrides, and the interactions below are taken from the capture. The file in **Full source code** is the Webflow clipboard payload (`@webflow/XscpData`). Create `webflow.json` with those contents exactly. Do not reformat, rename classes, or restyle it. Pasting that payload into Webflow Designer is the section. Rebuilding it in code means following the copy, the classes, and the asset URLs, with the JSON as the source of truth when the prose and the JSON disagree.

## Stack & dependencies

Webflow. There is no React app and no npm install for this section. Layout is Webflow classes. Breakpoints saved on the classes are `main` (desktop), `medium` (tablet, 991px and below), `small` (mobile landscape, 767px and below), and `tiny` (mobile portrait, 479px and below). Motion is Webflow interactions: IX2.

Type named in the classes:

- `42 Dotsans`

## Layout & content

Capture note: H2: "Our Team."

Visible copy, first occurrence in document order. A string that is repeated in the tree is listed once here and still appears everywhere the tree shows it.

- `h2` — Our Team.
- `p` — We believe that true growth comes from calculated risk. Whether you're a startup or a legacy brand, our data becomes your leverage.
- `div` — ALEX STERLING
- `div` — Managing Partner
- `div` — Carla Kenter
- `div` — CEO
- `div` — Maren Dokidis

Element tree. Indent is nesting. Class names are the Webflow class names.

```
Block div .Section .White Section
  Block div .Section Spacing
    Block div .Container
      Block div .Section Inside
        Block div .Center Title
          Block div .Fade In On Scroll
            Heading h2 .Title
              Text: Our Team.
          Block div .Paragraph Holder .Medium
            Block div .Fade In On Scroll
              Paragraph p
                Text: We believe that true growth comes from calculated risk. Whether you're a startup or a legacy brand, our data becomes your leverage.
        Block div .Team Grid Holder
          Block div .Team Item
            Block div .Team Image Holder
              Image img .Team Image — alt "__wf_reserved_inherit" · Team (6).avif
              Block div .Team Socials
                Block div .Team Socials Holder
                  Link a .Team Social Link — Facebook.com
                    Image img .Team Social Icon — alt "__wf_reserved_inherit" · Facebook Icon.svg
                  Link a .Team Social Link — Facebook.com
                    Image img .Team Social Icon — alt "__wf_reserved_inherit" · Instagram Icon.svg
                  Link a .Team Social Link — Facebook.com
                    Image img .Team Social Icon — alt "__wf_reserved_inherit" · LinkedIn Icon.svg
            Block div .Team Content
              Block div .Team Name
                Text: ALEX STERLING
              Block div .Team Job Position
                Text: Managing Partner
          Block div .Team Item
            Block div .Team Image Holder
              Image img .Team Image — alt "__wf_reserved_inherit" · Team (4).avif
              Block div .Team Socials
                Block div .Team Socials Holder
                  Link a .Team Social Link — Facebook.com
                    Image img .Team Social Icon — alt "__wf_reserved_inherit" · Facebook Icon.svg
                  Link a .Team Social Link — Facebook.com
                    Image img .Team Social Icon — alt "__wf_reserved_inherit" · Instagram Icon.svg
                  Link a .Team Social Link — Facebook.com
                    Image img .Team Social Icon — alt "__wf_reserved_inherit" · LinkedIn Icon.svg
            Block div .Team Content
              Block div .Team Name
                Text: Carla Kenter
              Block div .Team Job Position
                Text: CEO
          Block div .Team Item
            Block div .Team Image Holder
              Image img .Team Image — alt "__wf_reserved_inherit" · Team (3).avif
              Block div .Team Socials
                Block div .Team Socials Holder
                  Link a .Team Social Link — Facebook.com
                    Image img .Team Social Icon — alt "__wf_reserved_inherit" · Facebook Icon.svg
                  Link a .Team Social Link — Facebook.com
                    Image img .Team Social Icon — alt "__wf_reserved_inherit" · Instagram Icon.svg
                  Link a .Team Social Link — Facebook.com
                    Image img .Team Social Icon — alt "__wf_reserved_inherit" · LinkedIn Icon.svg
            Block div .Team Content
              Block div .Team Name
                Text: Maren Dokidis
              Block div .Team Job Position
                Text: Managing Partner
```

Base styles (`main`). Breakpoint overrides are in **Responsive behaviour**, not repeated here.

**White Section** (combo `&`)

```css
position: relative; z-index: 3; background-color: #f5f4ec;
```

**Team Socials Holder**

```css
display: flex; overflow: hidden; grid-column-gap: 20px; grid-row-gap: 20px;
```

**Section Spacing**

```css
padding-top: 64px; padding-bottom: 64px;
```

**Team Name**

```css
font-family: 42 Dotsans; color: #1e382c; font-size: 18px; line-height: 110%; font-weight: 600;
```

**Team Job Position**

```css
font-family: 42 Dotsans; font-size: 16px; line-height: 110%;
```

**Container**

```css
position: relative; z-index: 3; max-width: 1440px; margin-right: auto; margin-left: auto; padding-top: 3em; padding-right: 3em; padding-bottom: 3em; padding-left: 3em;
```

**Team Item**

```css
display: flex; flex-direction: column; flex-wrap: nowrap; grid-column-gap: 12px; grid-row-gap: 12px;
```

**Section**

```css
/* no base declarations */
```

**Team Social Icon**

```css
width: 18px; height: 18px; min-height: 18px; min-width: 18px;
```

**Team Image Holder**

```css
position: relative; width: 100%;
```

**Center Title**

```css
display: flex; flex-direction: column; justify-content: flex-start; align-items: center; grid-column-gap: 12px; grid-row-gap: 12px; text-align: center;
```

**Team Socials**

```css
position: absolute; left: 20px; top: 20px; right: auto; bottom: auto; min-width: 60px; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; border-top-left-radius: 300px; border-top-right-radius: 300px; border-bottom-left-radius: 300px; border-bottom-right-radius: 300px; background-color: #24483a;
```

**Paragraph Holder**

```css
display: flex; max-width: 90%; flex-direction: column; justify-content: flex-end; flex-wrap: nowrap; align-items: flex-start; grid-column-gap: 12px; grid-row-gap: 12px;
```

**Fade In On Scroll**

```css
/* no base declarations */
```

**Team Image**

```css
width: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;
```

**Team Content**

```css
display: flex; flex-direction: column; flex-wrap: nowrap; grid-column-gap: 0px; grid-row-gap: 0px;
```

**Section Inside**

```css
display: flex; flex-direction: column; flex-wrap: nowrap; grid-column-gap: 40px; grid-row-gap: 40px;
```

**Medium** (combo `&`)

```css
max-width: 500px;
```

**Team Social Link**

```css
display: flex; width: 20px; height: 20px; min-height: 20px; min-width: 20px; justify-content: center; align-items: center;
```

**Team Grid Holder**

```css
display: grid; grid-auto-columns: 1fr; grid-column-gap: 16px; grid-row-gap: 16px; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto;
```

**Title**

```css
margin-top: 0px; margin-bottom: 0px; line-height: 110%; font-weight: 500; letter-spacing: 0.1px;
```

## Interactions & animation timeline

IX2

- IX2 `SCROLL_INTO_VIEW` on `Fade In On Scroll`, scroll offset 10% starts **👁 Fade In On Scroll**. Breakpoints: main, medium, small, tiny.
- IX2 `SCROLL_OUT_OF_VIEW` on `Fade In On Scroll`, scroll offset 0% (no action on this event). Breakpoints: main, medium, small, tiny.
- IX2 `SCROLL_INTO_VIEW` on `Paragraph Holder`, scroll offset 15% starts **👁 Fade In On Scroll**. Breakpoints: main, medium, small, tiny.
- IX2 `SCROLL_OUT_OF_VIEW` on `Paragraph Holder`, scroll offset 0% (no action on this event). Breakpoints: main, medium, small, tiny.
- IX2 `MOUSE_OVER` on `Team Item` starts **Team -> Hover On**. Breakpoints: main.
- IX2 `MOUSE_OUT` on `Team Item` starts **Team -> Hover Out**. Breakpoints: main.
- IX2 `SCROLL_INTO_VIEW` on `Team Item`, scroll offset 15% starts **👁 Fade In On Scroll**. Breakpoints: main, medium, small, tiny.
- IX2 `SCROLL_OUT_OF_VIEW` on `Team Item`, scroll offset 0% (no action on this event). Breakpoints: main, medium, small, tiny.

**👁 Fade In On Scroll**
1. TRANSFORM_MOVE · 500ms · y 45px · on TRIGGER_ELEMENT; STYLE_FILTER · 500ms · blur 10px · on TRIGGER_ELEMENT; STYLE_OPACITY · 500ms · opacity 0% · on TRIGGER_ELEMENT
2. STYLE_FILTER · 800ms · delay 150ms · outExpo · blur 0px · on TRIGGER_ELEMENT; TRANSFORM_MOVE · 800ms · delay 150ms · outExpo · y 0px · on TRIGGER_ELEMENT; STYLE_OPACITY · 800ms · delay 150ms · outExpo · opacity 100% · on TRIGGER_ELEMENT

**Team -> Hover On**
1. STYLE_SIZE · 500ms · on ELEMENT_CLASS; STYLE_OPACITY · 500ms · opacity 0% · on ELEMENT_CLASS
2. STYLE_SIZE · 1200ms · outExpo · on ELEMENT_CLASS; STYLE_OPACITY · 1200ms · outExpo · opacity 100% · on ELEMENT_CLASS

**Team -> Hover Out**
1. STYLE_SIZE · 900ms · outExpo · on ELEMENT_CLASS; STYLE_OPACITY · 400ms · outExpo · opacity 0% · on ELEMENT_CLASS

## Responsive behaviour

Only classes that store an override are listed. A width with no entry for a class keeps the base styles. Webflow’s cascade is desktop, then tablet, then mobile landscape, then mobile portrait: a `tiny` override does not apply on tablet.

**Section Inside**
- mobile portrait (tiny, 479px and below): `grid-column-gap: 30px; grid-row-gap: 30px;`
- tablet (medium, 991px and below): `grid-column-gap: 30px; grid-row-gap: 30px;`
- mobile landscape (small, 767px and below): `grid-column-gap: 12px; grid-row-gap: 12px;`

**Team Grid Holder**
- mobile landscape (small, 767px and below): `grid-template-columns: 1fr 1fr;`
- mobile portrait (tiny, 479px and below): `display: flex; flex-direction: column; flex-wrap: nowrap; grid-column-gap: 30px; grid-row-gap: 30px;`

**Title**
- mobile landscape (small, 767px and below): `letter-spacing: -2px;`

## Accessibility & robustness

Images in this capture use Webflow reserved alt values (`__wf_reserved_inherit` or `__wf_reserved_decorative`) or have no alt stored on the node. Do not invent descriptive alt text that the capture does not have.

Heading text, in document order:

- `h2` Our Team.

## Full source code

Create this file exactly. Do not reformat it.

### `webflow.json`

```json
{
  "type": "@webflow/XscpData",
  "payload": {
    "nodes": [
      {
        "_id": "54282b77-bff7-8a1e-f37d-9baef854fe91",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d8",
          "dd1f84b8-3d80-ddf1-a40a-1ca96fddd21c"
        ],
        "children": [
          "e52a317f-aff4-b530-3b8f-80965eb07cc8"
        ],
        "data": {
          "tag": "div",
          "text": false,
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "e52a317f-aff4-b530-3b8f-80965eb07cc8",
        "type": "Block",
        "tag": "div",
        "classes": [
          "9d11d053-7cae-47c1-0246-2f9461d3aad6"
        ],
        "children": [
          "75a671fe-e46f-051a-018d-838dfbb27b3d"
        ],
        "data": {
          "tag": "div",
          "text": false,
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "75a671fe-e46f-051a-018d-838dfbb27b3d",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d0"
        ],
        "children": [
          "4ce92649-a934-2ac1-444e-e087be87ca7e"
        ],
        "data": {
          "tag": "div",
          "text": false,
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "4ce92649-a934-2ac1-444e-e087be87ca7e",
        "type": "Block",
        "tag": "div",
        "classes": [
          "3afe05c4-ead2-5155-82fc-8449ca8645dc"
        ],
        "children": [
          "0e3962d5-26cd-eff3-ee29-27dc2923b0ad",
          "6401f9db-1885-6106-26f0-6c3bf8d1aeae"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "0e3962d5-26cd-eff3-ee29-27dc2923b0ad",
        "type": "Block",
        "tag": "div",
        "classes": [
          "aa3b3ada-8089-9c61-438d-8848cae4ab3a"
        ],
        "children": [
          "f9bd7340-e240-02aa-bdc2-e85777f5584c",
          "7630d1f5-7596-03c1-78f9-4805e0186101"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "f9bd7340-e240-02aa-bdc2-e85777f5584c",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d2"
        ],
        "children": [
          "92bccb70-9ce7-ba39-4383-a041dac163d2"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "92bccb70-9ce7-ba39-4383-a041dac163d2",
        "type": "Heading",
        "tag": "h2",
        "classes": [
          "302cee7a-e577-a487-8985-db033a6755be"
        ],
        "children": [
          "95255059-1d38-b2f0-7548-d0597ba6257d"
        ],
        "data": {
          "tag": "h2",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "95255059-1d38-b2f0-7548-d0597ba6257d",
        "text": true,
        "v": "Our Team."
      },
      {
        "_id": "7630d1f5-7596-03c1-78f9-4805e0186101",
        "type": "Block",
        "tag": "div",
        "classes": [
          "5ccf1946-e80f-c31b-dc17-7bafedcc6275",
          "47054f60-c289-a77c-5cd2-f0c0b16a9f3e"
        ],
        "children": [
          "2bf78a6b-c014-99ff-18e7-2d7e8fdc34ae"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "2bf78a6b-c014-99ff-18e7-2d7e8fdc34ae",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d2"
        ],
        "children": [
          "0e783557-bf6a-3fd9-0cb4-10809f75a917"
        ],
        "data": {
          "tag": "div",
          "text": false,
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "0e783557-bf6a-3fd9-0cb4-10809f75a917",
        "type": "Paragraph",
        "tag": "p",
        "classes": [],
        "children": [
          "b1c77dd1-2388-2653-19ee-a88d6749ff40"
        ],
        "data": {
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "b1c77dd1-2388-2653-19ee-a88d6749ff40",
        "text": true,
        "v": "We believe that true growth comes from calculated risk. Whether you're a startup or a legacy brand, our data becomes your leverage."
      },
      {
        "_id": "6401f9db-1885-6106-26f0-6c3bf8d1aeae",
        "type": "Block",
        "tag": "div",
        "classes": [
          "178807bd-2dfb-c127-66a1-136b162de762"
        ],
        "children": [
          "4dec99d6-2b8a-aef3-2d70-c5b139570b88",
          "176a42f2-cb1a-9d11-64cd-5cc96497be87",
          "0e537322-6bc8-27c6-f792-d980a7aa524b"
        ],
        "data": {
          "tag": "div",
          "text": false,
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "4dec99d6-2b8a-aef3-2d70-c5b139570b88",
        "type": "Block",
        "tag": "div",
        "classes": [
          "3e7a748c-329c-651d-b16e-0e48176bb063"
        ],
        "children": [
          "7591190b-b23a-8525-82f7-d16be9531b62",
          "4c31be88-a57e-1edf-113f-fd439e778681"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "7591190b-b23a-8525-82f7-d16be9531b62",
        "type": "Block",
        "tag": "div",
        "classes": [
          "4aeed15b-ac24-d125-3651-48318195422c"
        ],
        "children": [
          "69c4cd86-3e89-7924-bdd6-aa096f995ce7",
          "c7c579e9-32ef-6eb0-3972-b9d693bd588a"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "69c4cd86-3e89-7924-bdd6-aa096f995ce7",
        "type": "Image",
        "tag": "img",
        "classes": [
          "e6ee6aaf-5f87-2638-acb8-663529b92e6a"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a73a52f47d35675c8e089f"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 740,
              "size": "100vw"
            },
            {
              "max": 10000,
              "size": "740px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "c7c579e9-32ef-6eb0-3972-b9d693bd588a",
        "type": "Block",
        "tag": "div",
        "classes": [
          "54ea3c01-7338-fbcf-910e-e39566cf7135"
        ],
        "children": [
          "93965a9e-89da-4b3a-59af-e9e7427e8530"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "93965a9e-89da-4b3a-59af-e9e7427e8530",
        "type": "Block",
        "tag": "div",
        "classes": [
          "5f999f84-5a76-52a8-56f3-2b32359a324c"
        ],
        "children": [
          "8a212dca-023f-557b-bcfb-0f4625c66c2e",
          "be904919-34b9-fbb3-f063-7dc02c98f308",
          "57176188-0697-c75f-9ef8-40ebb1c676b1"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "8a212dca-023f-557b-bcfb-0f4625c66c2e",
        "type": "Link",
        "tag": "a",
        "classes": [
          "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
        ],
        "children": [
          "fd5535e5-37da-8f31-55c7-dc089c74bf35"
        ],
        "data": {
          "button": false,
          "block": "inline",
          "link": {
            "mode": "external",
            "url": "Facebook.com",
            "target": "_blank"
          },
          "eventIds": [],
          "attr": {
            "id": ""
          },
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "fd5535e5-37da-8f31-55c7-dc089c74bf35",
        "type": "Image",
        "tag": "img",
        "classes": [
          "6959389b-dfff-057c-78de-7e67f2967443"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a5e88d484cbf5ba1c53708"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 991,
              "size": "24px"
            },
            {
              "max": 1439,
              "size": "2vw"
            },
            {
              "max": 10000,
              "size": "24px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "be904919-34b9-fbb3-f063-7dc02c98f308",
        "type": "Link",
        "tag": "a",
        "classes": [
          "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
        ],
        "children": [
          "7a02404d-d0b9-9bbb-c22e-0c3b06160efb"
        ],
        "data": {
          "button": false,
          "block": "inline",
          "link": {
            "mode": "external",
            "url": "Facebook.com",
            "target": "_blank"
          },
          "eventIds": [],
          "attr": {
            "id": ""
          },
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "7a02404d-d0b9-9bbb-c22e-0c3b06160efb",
        "type": "Image",
        "tag": "img",
        "classes": [
          "6959389b-dfff-057c-78de-7e67f2967443"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a5e88d484cbf5ba1c535e9"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 767,
              "size": "25px"
            },
            {
              "max": 991,
              "size": "3vw"
            },
            {
              "max": 10000,
              "size": "25px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "57176188-0697-c75f-9ef8-40ebb1c676b1",
        "type": "Link",
        "tag": "a",
        "classes": [
          "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
        ],
        "children": [
          "2a973ac4-9b9e-40e4-fcde-0a3ad4ec3967"
        ],
        "data": {
          "button": false,
          "block": "inline",
          "link": {
            "mode": "external",
            "url": "Facebook.com",
            "target": "_blank"
          },
          "eventIds": [],
          "attr": {
            "id": ""
          },
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "2a973ac4-9b9e-40e4-fcde-0a3ad4ec3967",
        "type": "Image",
        "tag": "img",
        "classes": [
          "6959389b-dfff-057c-78de-7e67f2967443"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a5e88d484cbf5ba1c53707"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 991,
              "size": "24px"
            },
            {
              "max": 1439,
              "size": "2vw"
            },
            {
              "max": 10000,
              "size": "24px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "4c31be88-a57e-1edf-113f-fd439e778681",
        "type": "Block",
        "tag": "div",
        "classes": [
          "0d47eccf-6c79-d7cf-499b-28f2e3e9f698"
        ],
        "children": [
          "160ad4fa-3a3e-7ea4-c6ec-243d1b62f345",
          "d9b60973-a6b5-094e-e84d-60c0c29e8d1d"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "160ad4fa-3a3e-7ea4-c6ec-243d1b62f345",
        "type": "Block",
        "tag": "div",
        "classes": [
          "fd27a269-620c-789d-7208-4ad1e5b31cfd"
        ],
        "children": [
          "b2b13497-f7bf-bf1b-c1bf-edff8d2ce137"
        ],
        "data": {
          "text": true,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "b2b13497-f7bf-bf1b-c1bf-edff8d2ce137",
        "text": true,
        "v": "ALEX STERLING"
      },
      {
        "_id": "d9b60973-a6b5-094e-e84d-60c0c29e8d1d",
        "type": "Block",
        "tag": "div",
        "classes": [
          "2f5c61aa-751f-b34d-6778-852615875ac4"
        ],
        "children": [
          "dbdbfec3-e68b-f97a-6019-de5fd02eaca0"
        ],
        "data": {
          "text": true,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "dbdbfec3-e68b-f97a-6019-de5fd02eaca0",
        "text": true,
        "v": "Managing Partner"
      },
      {
        "_id": "176a42f2-cb1a-9d11-64cd-5cc96497be87",
        "type": "Block",
        "tag": "div",
        "classes": [
          "3e7a748c-329c-651d-b16e-0e48176bb063"
        ],
        "children": [
          "7464d2e5-ce67-8967-927c-82bb034cb5bb",
          "b8ad7343-bd59-da50-4853-f98f7178ac1a"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "7464d2e5-ce67-8967-927c-82bb034cb5bb",
        "type": "Block",
        "tag": "div",
        "classes": [
          "4aeed15b-ac24-d125-3651-48318195422c"
        ],
        "children": [
          "d89eb0fb-254c-0882-a819-affc8ff3d72e",
          "04298156-221b-cb48-4557-bf62807846ee"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "d89eb0fb-254c-0882-a819-affc8ff3d72e",
        "type": "Image",
        "tag": "img",
        "classes": [
          "e6ee6aaf-5f87-2638-acb8-663529b92e6a"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a73a52b4631f1593524a9e"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 740,
              "size": "100vw"
            },
            {
              "max": 10000,
              "size": "740px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "04298156-221b-cb48-4557-bf62807846ee",
        "type": "Block",
        "tag": "div",
        "classes": [
          "54ea3c01-7338-fbcf-910e-e39566cf7135"
        ],
        "children": [
          "d6e980d7-4778-13da-8643-f94279e85acb"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "d6e980d7-4778-13da-8643-f94279e85acb",
        "type": "Block",
        "tag": "div",
        "classes": [
          "5f999f84-5a76-52a8-56f3-2b32359a324c"
        ],
        "children": [
          "e268c654-c52a-a4f5-7d93-5147f9814107",
          "b60ba038-51df-6d35-1d72-9a54f4a7c33c",
          "6b5ab2c0-335e-1ab4-36f6-8a138157a8b8"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "e268c654-c52a-a4f5-7d93-5147f9814107",
        "type": "Link",
        "tag": "a",
        "classes": [
          "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
        ],
        "children": [
          "513f5c42-b1f0-9535-012f-81a9f4e58f21"
        ],
        "data": {
          "button": false,
          "block": "inline",
          "link": {
            "mode": "external",
            "url": "Facebook.com",
            "target": "_blank"
          },
          "eventIds": [],
          "attr": {
            "id": ""
          },
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "513f5c42-b1f0-9535-012f-81a9f4e58f21",
        "type": "Image",
        "tag": "img",
        "classes": [
          "6959389b-dfff-057c-78de-7e67f2967443"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a5e88d484cbf5ba1c53708"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 991,
              "size": "24px"
            },
            {
              "max": 1439,
              "size": "2vw"
            },
            {
              "max": 10000,
              "size": "24px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "b60ba038-51df-6d35-1d72-9a54f4a7c33c",
        "type": "Link",
        "tag": "a",
        "classes": [
          "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
        ],
        "children": [
          "87d6b2f9-00ff-2f80-0eb1-942b4ab8852e"
        ],
        "data": {
          "button": false,
          "block": "inline",
          "link": {
            "mode": "external",
            "url": "Facebook.com",
            "target": "_blank"
          },
          "eventIds": [],
          "attr": {
            "id": ""
          },
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "87d6b2f9-00ff-2f80-0eb1-942b4ab8852e",
        "type": "Image",
        "tag": "img",
        "classes": [
          "6959389b-dfff-057c-78de-7e67f2967443"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a5e88d484cbf5ba1c535e9"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 767,
              "size": "25px"
            },
            {
              "max": 991,
              "size": "3vw"
            },
            {
              "max": 10000,
              "size": "25px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "6b5ab2c0-335e-1ab4-36f6-8a138157a8b8",
        "type": "Link",
        "tag": "a",
        "classes": [
          "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
        ],
        "children": [
          "b2628f41-e9fe-5277-8e00-905ce7da95b8"
        ],
        "data": {
          "button": false,
          "block": "inline",
          "link": {
            "mode": "external",
            "url": "Facebook.com",
            "target": "_blank"
          },
          "eventIds": [],
          "attr": {
            "id": ""
          },
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "b2628f41-e9fe-5277-8e00-905ce7da95b8",
        "type": "Image",
        "tag": "img",
        "classes": [
          "6959389b-dfff-057c-78de-7e67f2967443"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a5e88d484cbf5ba1c53707"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 991,
              "size": "24px"
            },
            {
              "max": 1439,
              "size": "2vw"
            },
            {
              "max": 10000,
              "size": "24px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "b8ad7343-bd59-da50-4853-f98f7178ac1a",
        "type": "Block",
        "tag": "div",
        "classes": [
          "0d47eccf-6c79-d7cf-499b-28f2e3e9f698"
        ],
        "children": [
          "984d0a48-522c-4fdd-0cef-7c8a452b1ee7",
          "cfadff8e-f0ad-05ad-db25-ef71ce8b30ec"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "984d0a48-522c-4fdd-0cef-7c8a452b1ee7",
        "type": "Block",
        "tag": "div",
        "classes": [
          "fd27a269-620c-789d-7208-4ad1e5b31cfd"
        ],
        "children": [
          "990949e3-e0f3-1683-8e7d-72beecdee1ce"
        ],
        "data": {
          "text": true,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "990949e3-e0f3-1683-8e7d-72beecdee1ce",
        "text": true,
        "v": "Carla Kenter"
      },
      {
        "_id": "cfadff8e-f0ad-05ad-db25-ef71ce8b30ec",
        "type": "Block",
        "tag": "div",
        "classes": [
          "2f5c61aa-751f-b34d-6778-852615875ac4"
        ],
        "children": [
          "85d2f7bc-c4e9-7101-61aa-812a42bf92be"
        ],
        "data": {
          "text": true,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "85d2f7bc-c4e9-7101-61aa-812a42bf92be",
        "text": true,
        "v": "CEO"
      },
      {
        "_id": "0e537322-6bc8-27c6-f792-d980a7aa524b",
        "type": "Block",
        "tag": "div",
        "classes": [
          "3e7a748c-329c-651d-b16e-0e48176bb063"
        ],
        "children": [
          "653618ac-0d11-faa5-1f09-dd649fe0be8f",
          "e1629785-1e70-4ba8-bbb6-9edf5e46aba4"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "653618ac-0d11-faa5-1f09-dd649fe0be8f",
        "type": "Block",
        "tag": "div",
        "classes": [
          "4aeed15b-ac24-d125-3651-48318195422c"
        ],
        "children": [
          "fe28fab1-eacc-9d06-d310-e8382e55067b",
          "765ee952-c55b-e755-4adb-97b7db9c51a5"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "fe28fab1-eacc-9d06-d310-e8382e55067b",
        "type": "Image",
        "tag": "img",
        "classes": [
          "e6ee6aaf-5f87-2638-acb8-663529b92e6a"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a73a52c6f08b62f5619dd6"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 740,
              "size": "100vw"
            },
            {
              "max": 10000,
              "size": "740px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "765ee952-c55b-e755-4adb-97b7db9c51a5",
        "type": "Block",
        "tag": "div",
        "classes": [
          "54ea3c01-7338-fbcf-910e-e39566cf7135"
        ],
        "children": [
          "10c814e7-2a6a-ea54-534c-3cb818105676"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "10c814e7-2a6a-ea54-534c-3cb818105676",
        "type": "Block",
        "tag": "div",
        "classes": [
          "5f999f84-5a76-52a8-56f3-2b32359a324c"
        ],
        "children": [
          "fd76ccad-b285-d58b-15a3-3428b5ee17f5",
          "d9e12ed9-940f-7b40-be43-a94a7b125c7e",
          "d535fc4b-808b-613f-1eeb-9ff2b2c3a6e1"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "fd76ccad-b285-d58b-15a3-3428b5ee17f5",
        "type": "Link",
        "tag": "a",
        "classes": [
          "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
        ],
        "children": [
          "0b0c6a67-2f48-b1e1-36cf-5bce1bd9b9bb"
        ],
        "data": {
          "button": false,
          "block": "inline",
          "link": {
            "mode": "external",
            "url": "Facebook.com",
            "target": "_blank"
          },
          "eventIds": [],
          "attr": {
            "id": ""
          },
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "0b0c6a67-2f48-b1e1-36cf-5bce1bd9b9bb",
        "type": "Image",
        "tag": "img",
        "classes": [
          "6959389b-dfff-057c-78de-7e67f2967443"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a5e88d484cbf5ba1c53708"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 991,
              "size": "24px"
            },
            {
              "max": 1439,
              "size": "2vw"
            },
            {
              "max": 10000,
              "size": "24px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "d9e12ed9-940f-7b40-be43-a94a7b125c7e",
        "type": "Link",
        "tag": "a",
        "classes": [
          "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
        ],
        "children": [
          "25f60baf-996a-ea85-6947-a3c367f7712c"
        ],
        "data": {
          "button": false,
          "block": "inline",
          "link": {
            "mode": "external",
            "url": "Facebook.com",
            "target": "_blank"
          },
          "eventIds": [],
          "attr": {
            "id": ""
          },
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "25f60baf-996a-ea85-6947-a3c367f7712c",
        "type": "Image",
        "tag": "img",
        "classes": [
          "6959389b-dfff-057c-78de-7e67f2967443"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a5e88d484cbf5ba1c535e9"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 767,
              "size": "25px"
            },
            {
              "max": 991,
              "size": "3vw"
            },
            {
              "max": 10000,
              "size": "25px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "d535fc4b-808b-613f-1eeb-9ff2b2c3a6e1",
        "type": "Link",
        "tag": "a",
        "classes": [
          "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
        ],
        "children": [
          "a1ecb15c-7597-0300-0b1d-fd9205cf05b7"
        ],
        "data": {
          "button": false,
          "block": "inline",
          "link": {
            "mode": "external",
            "url": "Facebook.com",
            "target": "_blank"
          },
          "eventIds": [],
          "attr": {
            "id": ""
          },
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "a1ecb15c-7597-0300-0b1d-fd9205cf05b7",
        "type": "Image",
        "tag": "img",
        "classes": [
          "6959389b-dfff-057c-78de-7e67f2967443"
        ],
        "children": [],
        "data": {
          "img": {
            "id": "69a5e88d484cbf5ba1c53707"
          },
          "srcsetDisabled": false,
          "attr": {
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit",
            "loading": "lazy",
            "id": ""
          },
          "sizes": [
            {
              "max": 991,
              "size": "24px"
            },
            {
              "max": 1439,
              "size": "2vw"
            },
            {
              "max": 10000,
              "size": "24px"
            }
          ],
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "e1629785-1e70-4ba8-bbb6-9edf5e46aba4",
        "type": "Block",
        "tag": "div",
        "classes": [
          "0d47eccf-6c79-d7cf-499b-28f2e3e9f698"
        ],
        "children": [
          "90930668-23c1-70e4-ace8-0f510fc91a79",
          "efe3d192-e861-6080-dbdf-63ceb31a139c"
        ],
        "data": {
          "text": false,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "90930668-23c1-70e4-ace8-0f510fc91a79",
        "type": "Block",
        "tag": "div",
        "classes": [
          "fd27a269-620c-789d-7208-4ad1e5b31cfd"
        ],
        "children": [
          "504e570c-2a4a-00b0-891c-36502a72bf92"
        ],
        "data": {
          "text": true,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "504e570c-2a4a-00b0-891c-36502a72bf92",
        "text": true,
        "v": "Maren Dokidis"
      },
      {
        "_id": "efe3d192-e861-6080-dbdf-63ceb31a139c",
        "type": "Block",
        "tag": "div",
        "classes": [
          "2f5c61aa-751f-b34d-6778-852615875ac4"
        ],
        "children": [
          "9101e4d5-ecd3-a2eb-f095-f44698d0cad1"
        ],
        "data": {
          "text": true,
          "tag": "div",
          "devlink": {
            "runtimeProps": {},
            "slot": ""
          },
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "search": {
            "exclude": false
          },
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          }
        }
      },
      {
        "_id": "9101e4d5-ecd3-a2eb-f095-f44698d0cad1",
        "text": true,
        "v": "Managing Partner"
      }
    ],
    "styles": [
      {
        "_id": "dd1f84b8-3d80-ddf1-a40a-1ca96fddd21c",
        "fake": false,
        "type": "class",
        "name": "White Section",
        "namespace": "",
        "comb": "&",
        "styleLess": "position: relative; z-index: 3; background-color: #f5f4ec;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "5f999f84-5a76-52a8-56f3-2b32359a324c",
        "fake": false,
        "type": "class",
        "name": "Team Socials Holder",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; overflow: hidden; grid-column-gap: 20px; grid-row-gap: 20px;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "9d11d053-7cae-47c1-0246-2f9461d3aad6",
        "fake": false,
        "type": "class",
        "name": "Section Spacing",
        "namespace": "",
        "comb": "",
        "styleLess": "padding-top: 64px; padding-bottom: 64px;",
        "variants": {},
        "children": [
          "d9d85a82-f825-11d3-3fe6-b798b1992cd6",
          "14926c18-1427-c798-0a73-9ac2e6193f96"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "fd27a269-620c-789d-7208-4ad1e5b31cfd",
        "fake": false,
        "type": "class",
        "name": "Team Name",
        "namespace": "",
        "comb": "",
        "styleLess": "font-family: 42 Dotsans; color: #1e382c; font-size: 18px; line-height: 110%; font-weight: 600;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "2f5c61aa-751f-b34d-6778-852615875ac4",
        "fake": false,
        "type": "class",
        "name": "Team Job Position",
        "namespace": "",
        "comb": "",
        "styleLess": "font-family: 42 Dotsans; font-size: 16px; line-height: 110%;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "a4083756-4a2d-f846-9988-48f343c7c9d0",
        "fake": false,
        "type": "class",
        "name": "Container",
        "namespace": "",
        "comb": "",
        "styleLess": "position: relative; z-index: 3; max-width: 1440px; margin-right: auto; margin-left: auto; padding-top: 3em; padding-right: 3em; padding-bottom: 3em; padding-left: 3em;",
        "variants": {},
        "children": [
          "f90f4f90-f729-3523-ef67-f5cbc8cf4aab",
          "b6f5b02d-b839-60ed-05d5-05532cc55e52",
          "124e5381-cd08-77de-afe4-66b304481c92",
          "bffb3d83-c2e7-0a1d-cb7c-c143b43deff3",
          "c548dc2d-f636-3063-78de-297b1d40591c",
          "6c4301b3-bcff-2cfd-f06d-eb6f91fe63ec",
          "99379f23-6789-a48a-3c82-3e0cba4a8bb9"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "3e7a748c-329c-651d-b16e-0e48176bb063",
        "fake": false,
        "type": "class",
        "name": "Team Item",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; flex-direction: column; flex-wrap: nowrap; grid-column-gap: 12px; grid-row-gap: 12px;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "a4083756-4a2d-f846-9988-48f343c7c9d8",
        "fake": false,
        "type": "class",
        "name": "Section",
        "namespace": "",
        "comb": "",
        "styleLess": "",
        "variants": {},
        "children": [
          "e127c0cb-66cf-73dd-1fa6-18e298aa2e74",
          "a099acfc-f819-4189-80a7-9efb32136afa",
          "064515b1-6399-cb29-1721-5ecfec82e8eb",
          "1c6ca3ca-3019-b0ca-bf4b-6f45c734e738",
          "dd1f84b8-3d80-ddf1-a40a-1ca96fddd21c",
          "643974e5-ee6a-5043-7e94-99bb316220d5",
          "47c2a0bb-5822-5e1a-e8b8-99e1c8f5054b"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "6959389b-dfff-057c-78de-7e67f2967443",
        "fake": false,
        "type": "class",
        "name": "Team Social Icon",
        "namespace": "",
        "comb": "",
        "styleLess": "width: 18px; height: 18px; min-height: 18px; min-width: 18px;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "4aeed15b-ac24-d125-3651-48318195422c",
        "fake": false,
        "type": "class",
        "name": "Team Image Holder",
        "namespace": "",
        "comb": "",
        "styleLess": "position: relative; width: 100%;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "aa3b3ada-8089-9c61-438d-8848cae4ab3a",
        "fake": false,
        "type": "class",
        "name": "Center Title",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; flex-direction: column; justify-content: flex-start; align-items: center; grid-column-gap: 12px; grid-row-gap: 12px; text-align: center;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "54ea3c01-7338-fbcf-910e-e39566cf7135",
        "fake": false,
        "type": "class",
        "name": "Team Socials",
        "namespace": "",
        "comb": "",
        "styleLess": "position: absolute; left: 20px; top: 20px; right: auto; bottom: auto; min-width: 60px; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; border-top-left-radius: 300px; border-top-right-radius: 300px; border-bottom-left-radius: 300px; border-bottom-right-radius: 300px; background-color: #24483a;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "5ccf1946-e80f-c31b-dc17-7bafedcc6275",
        "fake": false,
        "type": "class",
        "name": "Paragraph Holder",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; max-width: 90%; flex-direction: column; justify-content: flex-end; flex-wrap: nowrap; align-items: flex-start; grid-column-gap: 12px; grid-row-gap: 12px;",
        "variants": {},
        "children": [
          "47054f60-c289-a77c-5cd2-f0c0b16a9f3e",
          "dc97286d-908a-7753-bf5c-32a21445bfc1"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "a4083756-4a2d-f846-9988-48f343c7c9d2",
        "fake": false,
        "type": "class",
        "name": "Fade In On Scroll",
        "namespace": "",
        "comb": "",
        "styleLess": "",
        "variants": {},
        "children": [
          "2d4361de-2eb7-3937-af85-62a9703213ea"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "e6ee6aaf-5f87-2638-acb8-663529b92e6a",
        "fake": false,
        "type": "class",
        "name": "Team Image",
        "namespace": "",
        "comb": "",
        "styleLess": "width: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "0d47eccf-6c79-d7cf-499b-28f2e3e9f698",
        "fake": false,
        "type": "class",
        "name": "Team Content",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; flex-direction: column; flex-wrap: nowrap; grid-column-gap: 0px; grid-row-gap: 0px;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "3afe05c4-ead2-5155-82fc-8449ca8645dc",
        "fake": false,
        "type": "class",
        "name": "Section Inside",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; flex-direction: column; flex-wrap: nowrap; grid-column-gap: 40px; grid-row-gap: 40px;",
        "variants": {
          "tiny": {
            "styleLess": "grid-column-gap: 30px; grid-row-gap: 30px;"
          },
          "medium": {
            "styleLess": "grid-column-gap: 30px; grid-row-gap: 30px;"
          },
          "small": {
            "styleLess": "grid-column-gap: 12px; grid-row-gap: 12px;"
          }
        },
        "children": [
          "93479951-0334-bb75-07ec-6896dbbb1e48"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "47054f60-c289-a77c-5cd2-f0c0b16a9f3e",
        "fake": false,
        "type": "class",
        "name": "Medium",
        "namespace": "",
        "comb": "&",
        "styleLess": "max-width: 500px;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7",
        "fake": false,
        "type": "class",
        "name": "Team Social Link",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; width: 20px; height: 20px; min-height: 20px; min-width: 20px; justify-content: center; align-items: center;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "178807bd-2dfb-c127-66a1-136b162de762",
        "fake": false,
        "type": "class",
        "name": "Team Grid Holder",
        "namespace": "",
        "comb": "",
        "styleLess": "display: grid; grid-auto-columns: 1fr; grid-column-gap: 16px; grid-row-gap: 16px; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto;",
        "variants": {
          "small": {
            "styleLess": "grid-template-columns: 1fr 1fr;"
          },
          "tiny": {
            "styleLess": "display: flex; flex-direction: column; flex-wrap: nowrap; grid-column-gap: 30px; grid-row-gap: 30px;"
          }
        },
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "302cee7a-e577-a487-8985-db033a6755be",
        "fake": false,
        "type": "class",
        "name": "Title",
        "namespace": "",
        "comb": "",
        "styleLess": "margin-top: 0px; margin-bottom: 0px; line-height: 110%; font-weight: 500; letter-spacing: 0.1px;",
        "variants": {
          "small": {
            "styleLess": "letter-spacing: -2px;"
          }
        },
        "children": [
          "8fef7c4e-ed6b-123c-3e6a-b96629c38767"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      }
    ],
    "assets": [
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a73a52f47d35675c8e089f_Team%20(6).avif",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 740,
        "isHD": false,
        "height": 880,
        "fileName": "69a73a52f47d35675c8e089f_Team (6).avif",
        "createdOn": "2026-03-03T19:45:22.526Z",
        "origFileName": "Team (6).avif",
        "alt": "",
        "fileHash": "6ad39010999cffd4cc052a3cca8d7505",
        "translationLoading": false,
        "variants": [
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a73a52f47d35675c8e089f_Team%20(6)-p-500.avif",
            "origFileName": "Team%20(6)-p-500.avif",
            "fileName": "69a73a52f47d35675c8e089f_Team (6)-p-500.avif",
            "format": "avif",
            "width": 500,
            "size": 34166,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a73a52f47d35675c8e089f_Team%20(6)-p-500.avif",
            "_id": "69a73a55dcf985dd372ee9aa"
          }
        ],
        "mimeType": "image/avif",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a73a52f47d35675c8e089f_Team%20(6).avif",
        "thumbUrl": "https://webflow-files-prod.global.ssl.fastly.net/69a5e88d484cbf5ba1c535db/69a73a52f47d35675c8e089f_Team%20(6).avif",
        "_id": "69a73a52f47d35675c8e089f",
        "updatedOn": "2026-03-07T18:54:20.914Z",
        "fileSize": 45998,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c53708_Facebook%20Icon.svg",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 24,
        "isHD": false,
        "height": 24,
        "fileName": "69a5e88d484cbf5ba1c53708_Facebook Icon.svg",
        "createdOn": "2025-01-04T17:19:57.742Z",
        "origFileName": "Facebook Icon.svg",
        "alt": "Social Media Image",
        "fileHash": "55aec2d0fab6808e2cb1a1eb956016cb",
        "translationLoading": false,
        "variants": [],
        "mimeType": "image/svg+xml",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c53708_Facebook%20Icon.svg",
        "thumbUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c53708_Facebook%20Icon.svg",
        "_id": "69a5e88d484cbf5ba1c53708",
        "updatedOn": "2026-03-02T19:44:16.294Z",
        "markedAsDeleted": false,
        "fileSize": 405,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c535e9_Instagram%20Icon.svg",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 25,
        "isHD": false,
        "height": 26,
        "fileName": "69a5e88d484cbf5ba1c535e9_Instagram Icon.svg",
        "createdOn": "2023-04-24T21:47:50.813Z",
        "origFileName": "Instagram Icon.svg",
        "alt": "Social Media Icon",
        "fileHash": "7d3290313fe33c353249f194bcd0ad7e",
        "translationLoading": false,
        "variants": [],
        "mimeType": "image/svg+xml",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c535e9_Instagram%20Icon.svg",
        "thumbUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c535e9_Instagram%20Icon.svg",
        "_id": "69a5e88d484cbf5ba1c535e9",
        "updatedOn": "2026-03-02T19:44:15.015Z",
        "markedAsDeleted": false,
        "fileSize": 1691,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c53707_LinkedIn%20Icon.svg",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 24,
        "isHD": false,
        "height": 24,
        "fileName": "69a5e88d484cbf5ba1c53707_LinkedIn Icon.svg",
        "createdOn": "2025-01-04T17:19:57.741Z",
        "origFileName": "LinkedIn Icon.svg",
        "alt": "Social Media Image",
        "fileHash": "86eb498e0c5e0d2b1f658210f420204b",
        "translationLoading": false,
        "variants": [],
        "mimeType": "image/svg+xml",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c53707_LinkedIn%20Icon.svg",
        "thumbUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c53707_LinkedIn%20Icon.svg",
        "_id": "69a5e88d484cbf5ba1c53707",
        "updatedOn": "2026-03-02T19:44:16.319Z",
        "markedAsDeleted": false,
        "fileSize": 736,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a73a52b4631f1593524a9e_Team%20(4).avif",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 740,
        "isHD": false,
        "height": 880,
        "fileName": "69a73a52b4631f1593524a9e_Team (4).avif",
        "createdOn": "2026-03-03T19:45:22.517Z",
        "origFileName": "Team (4).avif",
        "alt": "",
        "fileHash": "6f93f15385a9ab121bf72285e3885216",
        "translationLoading": false,
        "variants": [
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a73a52b4631f1593524a9e_Team%20(4)-p-500.avif",
            "origFileName": "Team%20(4)-p-500.avif",
            "fileName": "69a73a52b4631f1593524a9e_Team (4)-p-500.avif",
            "format": "avif",
            "width": 500,
            "size": 29198,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a73a52b4631f1593524a9e_Team%20(4)-p-500.avif",
            "_id": "69a73a553483556a7e387db8"
          }
        ],
        "mimeType": "image/avif",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a73a52b4631f1593524a9e_Team%20(4).avif",
        "thumbUrl": "https://webflow-files-prod.global.ssl.fastly.net/69a5e88d484cbf5ba1c535db/69a73a52b4631f1593524a9e_Team%20(4).avif",
        "_id": "69a73a52b4631f1593524a9e",
        "updatedOn": "2026-03-07T18:54:20.333Z",
        "fileSize": 36888,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a73a52c6f08b62f5619dd6_Team%20(3).avif",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 740,
        "isHD": false,
        "height": 880,
        "fileName": "69a73a52c6f08b62f5619dd6_Team (3).avif",
        "createdOn": "2026-03-03T19:45:22.205Z",
        "origFileName": "Team (3).avif",
        "alt": "",
        "fileHash": "8cc0d98caa74e681b65909d8fc11edc3",
        "translationLoading": false,
        "variants": [
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a73a52c6f08b62f5619dd6_Team%20(3)-p-500.avif",
            "origFileName": "Team%20(3)-p-500.avif",
            "fileName": "69a73a52c6f08b62f5619dd6_Team (3)-p-500.avif",
            "format": "avif",
            "width": 500,
            "size": 22344,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a73a52c6f08b62f5619dd6_Team%20(3)-p-500.avif",
            "_id": "69a73a5534ddccff7b9f9910"
          }
        ],
        "mimeType": "image/avif",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a73a52c6f08b62f5619dd6_Team%20(3).avif",
        "thumbUrl": "https://webflow-files-prod.global.ssl.fastly.net/69a5e88d484cbf5ba1c535db/69a73a52c6f08b62f5619dd6_Team%20(3).avif",
        "_id": "69a73a52c6f08b62f5619dd6",
        "updatedOn": "2026-03-07T18:54:20.403Z",
        "fileSize": 28639,
        "localizedSettings": {}
      }
    ],
    "ix1": [],
    "ix2": {
      "interactions": [
        {
          "id": "i-354",
          "interactionTypeId": "SCROLL_INTO_VIEW_INTERACTION",
          "eventIds": [
            "e-694",
            "e-695"
          ],
          "target": "77d18a97-103f-ebc1-9fff-5d58fb41f6ed",
          "createdOn": 1770916872213
        },
        {
          "id": "i-321",
          "interactionTypeId": "SCROLL_INTO_VIEW_INTERACTION",
          "eventIds": [
            "e-625",
            "e-626"
          ],
          "target": "dd677402-925f-e436-e39e-14f90412b8df",
          "createdOn": 1763590680129
        },
        {
          "id": "i-368",
          "interactionTypeId": "MOUSE_HOVER_INTERACTION",
          "eventIds": [
            "e-719",
            "e-720"
          ],
          "target": "840a2e9d-4c68-08ff-8638-815dcad7af62",
          "createdOn": 1770936394257
        },
        {
          "id": "i-373",
          "interactionTypeId": "SCROLL_INTO_VIEW_INTERACTION",
          "eventIds": [
            "e-729",
            "e-730"
          ],
          "target": "840a2e9d-4c68-08ff-8638-815dcad7af62",
          "createdOn": 1770939022839
        }
      ],
      "events": [
        {
          "id": "e-694",
          "name": "",
          "animationType": "custom",
          "eventTypeId": "SCROLL_INTO_VIEW",
          "action": {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "instant": true,
            "config": {
              "delay": 0,
              "easing": "",
              "duration": 0,
              "actionListId": "a-76",
              "affectedElements": {},
              "playInReverse": false,
              "autoStopEventId": "e-695"
            }
          },
          "mediaQueries": [
            "main",
            "medium",
            "small",
            "tiny"
          ],
          "target": {
            "id": "77d18a97-103f-ebc1-9fff-5d58fb41f6ed",
            "appliesTo": "CLASS",
            "styleBlockIds": [
              "a4083756-4a2d-f846-9988-48f343c7c9d2"
            ]
          },
          "targets": [
            {
              "id": "77d18a97-103f-ebc1-9fff-5d58fb41f6ed",
              "appliesTo": "CLASS",
              "styleBlockIds": [
                "a4083756-4a2d-f846-9988-48f343c7c9d2"
              ]
            }
          ],
          "config": {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": 10,
            "scrollOffsetUnit": "%",
            "delay": null,
            "direction": null,
            "effectIn": null
          },
          "createdOn": 1770916872214
        },
        {
          "id": "e-695",
          "name": "",
          "animationType": "preset",
          "eventTypeId": "SCROLL_OUT_OF_VIEW",
          "action": null,
          "mediaQueries": [
            "main",
            "medium",
            "small",
            "tiny"
          ],
          "target": {
            "id": "77d18a97-103f-ebc1-9fff-5d58fb41f6ed",
            "appliesTo": "CLASS",
            "styleBlockIds": [
              "a4083756-4a2d-f846-9988-48f343c7c9d2"
            ]
          },
          "targets": [
            {
              "id": "77d18a97-103f-ebc1-9fff-5d58fb41f6ed",
              "appliesTo": "CLASS",
              "styleBlockIds": [
                "a4083756-4a2d-f846-9988-48f343c7c9d2"
              ]
            }
          ],
          "config": {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": 0,
            "scrollOffsetUnit": "%",
            "delay": null,
            "direction": null,
            "effectIn": null
          },
          "createdOn": 1770916872215
        },
        {
          "id": "e-625",
          "name": "",
          "animationType": "custom",
          "eventTypeId": "SCROLL_INTO_VIEW",
          "action": {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "instant": true,
            "config": {
              "delay": 0,
              "easing": "",
              "duration": 0,
              "actionListId": "a-76",
              "affectedElements": {},
              "playInReverse": false,
              "autoStopEventId": "e-626"
            }
          },
          "mediaQueries": [
            "main",
            "medium",
            "small",
            "tiny"
          ],
          "target": {
            "id": "dd677402-925f-e436-e39e-14f90412b8df",
            "appliesTo": "CLASS",
            "styleBlockIds": [
              "5ccf1946-e80f-c31b-dc17-7bafedcc6275"
            ]
          },
          "targets": [
            {
              "id": "dd677402-925f-e436-e39e-14f90412b8df",
              "appliesTo": "CLASS",
              "styleBlockIds": [
                "5ccf1946-e80f-c31b-dc17-7bafedcc6275"
              ]
            }
          ],
          "config": {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": 15,
            "scrollOffsetUnit": "%",
            "delay": null,
            "direction": null,
            "effectIn": null
          },
          "createdOn": 1763590680130
        },
        {
          "id": "e-626",
          "name": "",
          "animationType": "preset",
          "eventTypeId": "SCROLL_OUT_OF_VIEW",
          "action": null,
          "mediaQueries": [
            "main",
            "medium",
            "small",
            "tiny"
          ],
          "target": {
            "id": "dd677402-925f-e436-e39e-14f90412b8df",
            "appliesTo": "CLASS",
            "styleBlockIds": [
              "5ccf1946-e80f-c31b-dc17-7bafedcc6275"
            ]
          },
          "targets": [
            {
              "id": "dd677402-925f-e436-e39e-14f90412b8df",
              "appliesTo": "CLASS",
              "styleBlockIds": [
                "5ccf1946-e80f-c31b-dc17-7bafedcc6275"
              ]
            }
          ],
          "config": {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": 0,
            "scrollOffsetUnit": "%",
            "delay": null,
            "direction": null,
            "effectIn": null
          },
          "createdOn": 1763590680130
        },
        {
          "id": "e-719",
          "name": "",
          "animationType": "custom",
          "eventTypeId": "MOUSE_OVER",
          "action": {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "instant": true,
            "config": {
              "delay": 0,
              "easing": "",
              "duration": 0,
              "actionListId": "a-115",
              "affectedElements": {},
              "playInReverse": false,
              "autoStopEventId": "e-720"
            }
          },
          "mediaQueries": [
            "main"
          ],
          "target": {
            "id": "840a2e9d-4c68-08ff-8638-815dcad7af62",
            "appliesTo": "CLASS",
            "styleBlockIds": [
              "3e7a748c-329c-651d-b16e-0e48176bb063"
            ]
          },
          "targets": [
            {
              "id": "840a2e9d-4c68-08ff-8638-815dcad7af62",
              "appliesTo": "CLASS",
              "styleBlockIds": [
                "3e7a748c-329c-651d-b16e-0e48176bb063"
              ]
            }
          ],
          "config": {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": null,
            "scrollOffsetUnit": null,
            "delay": null,
            "direction": null,
            "effectIn": null
          },
          "createdOn": 1770936394258
        },
        {
          "id": "e-720",
          "name": "",
          "animationType": "custom",
          "eventTypeId": "MOUSE_OUT",
          "action": {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "instant": true,
            "config": {
              "delay": 0,
              "easing": "",
              "duration": 0,
              "actionListId": "a-116",
              "affectedElements": {},
              "playInReverse": false,
              "autoStopEventId": "e-719"
            }
          },
          "mediaQueries": [
            "main"
          ],
          "target": {
            "id": "840a2e9d-4c68-08ff-8638-815dcad7af62",
            "appliesTo": "CLASS",
            "styleBlockIds": [
              "3e7a748c-329c-651d-b16e-0e48176bb063"
            ]
          },
          "targets": [
            {
              "id": "840a2e9d-4c68-08ff-8638-815dcad7af62",
              "appliesTo": "CLASS",
              "styleBlockIds": [
                "3e7a748c-329c-651d-b16e-0e48176bb063"
              ]
            }
          ],
          "config": {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": null,
            "scrollOffsetUnit": null,
            "delay": null,
            "direction": null,
            "effectIn": null
          },
          "createdOn": 1770936394259
        },
        {
          "id": "e-729",
          "name": "",
          "animationType": "custom",
          "eventTypeId": "SCROLL_INTO_VIEW",
          "action": {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "instant": true,
            "config": {
              "delay": 0,
              "easing": "",
              "duration": 0,
              "actionListId": "a-76",
              "affectedElements": {},
              "playInReverse": false,
              "autoStopEventId": "e-730"
            }
          },
          "mediaQueries": [
            "main",
            "medium",
            "small",
            "tiny"
          ],
          "target": {
            "id": "840a2e9d-4c68-08ff-8638-815dcad7af62",
            "appliesTo": "CLASS",
            "styleBlockIds": [
              "3e7a748c-329c-651d-b16e-0e48176bb063"
            ]
          },
          "targets": [
            {
              "id": "840a2e9d-4c68-08ff-8638-815dcad7af62",
              "appliesTo": "CLASS",
              "styleBlockIds": [
                "3e7a748c-329c-651d-b16e-0e48176bb063"
              ]
            }
          ],
          "config": {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": 15,
            "scrollOffsetUnit": "%",
            "delay": null,
            "direction": null,
            "effectIn": null
          },
          "createdOn": 1770939022840
        },
        {
          "id": "e-730",
          "name": "",
          "animationType": "preset",
          "eventTypeId": "SCROLL_OUT_OF_VIEW",
          "action": null,
          "mediaQueries": [
            "main",
            "medium",
            "small",
            "tiny"
          ],
          "target": {
            "id": "840a2e9d-4c68-08ff-8638-815dcad7af62",
            "appliesTo": "CLASS",
            "styleBlockIds": [
              "3e7a748c-329c-651d-b16e-0e48176bb063"
            ]
          },
          "targets": [
            {
              "id": "840a2e9d-4c68-08ff-8638-815dcad7af62",
              "appliesTo": "CLASS",
              "styleBlockIds": [
                "3e7a748c-329c-651d-b16e-0e48176bb063"
              ]
            }
          ],
          "config": {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": 0,
            "scrollOffsetUnit": "%",
            "delay": null,
            "direction": null,
            "effectIn": null
          },
          "createdOn": 1770939022841
        }
      ],
      "actionLists": [
        {
          "id": "a-76",
          "title": "👁 Fade In On Scroll",
          "actionItemGroups": [
            {
              "actionItems": [
                {
                  "id": "a-76-n",
                  "actionTypeId": "TRANSFORM_MOVE",
                  "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 500,
                    "target": {
                      "nodeId": "628f30d838105f7cb3ae8e71|454f8225-bb8a-57f8-70b9-84f4d3b4544e",
                      "appliesTo": "TRIGGER_ELEMENT",
                      "styleBlockIds": [
                        "a4083756-4a2d-f846-9988-48f343c7c9d2"
                      ],
                      "boundaryMode": false
                    },
                    "yValue": 45,
                    "xUnit": "PX",
                    "yUnit": "px",
                    "zUnit": "PX"
                  },
                  "instant": false
                },
                {
                  "id": "a-76-n-2",
                  "actionTypeId": "STYLE_FILTER",
                  "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 500,
                    "target": {
                      "nodeId": "68c48dcf8a82f445b610f5af|1ae191e2-c1aa-9138-35ad-86683ba5b50f",
                      "appliesTo": "TRIGGER_ELEMENT",
                      "styleBlockIds": [
                        "075bce64-cb6f-014a-1874-0281367202a9"
                      ],
                      "boundaryMode": false
                    },
                    "filters": [
                      {
                        "type": "blur",
                        "filterId": "5d7e",
                        "value": 10,
                        "unit": "px"
                      }
                    ]
                  },
                  "instant": false
                },
                {
                  "id": "a-76-n-3",
                  "actionTypeId": "STYLE_OPACITY",
                  "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 500,
                    "target": {
                      "nodeId": "628f30d838105f7cb3ae8e71|454f8225-bb8a-57f8-70b9-84f4d3b4544e",
                      "appliesTo": "TRIGGER_ELEMENT",
                      "styleBlockIds": [
                        "a4083756-4a2d-f846-9988-48f343c7c9d2"
                      ],
                      "boundaryMode": false
                    },
                    "value": 0,
                    "unit": "%"
                  },
                  "instant": false
                }
              ]
            },
            {
              "actionItems": [
                {
                  "id": "a-76-n-4",
                  "actionTypeId": "STYLE_FILTER",
                  "config": {
                    "delay": 150,
                    "easing": "outExpo",
                    "duration": 800,
                    "target": {
                      "nodeId": "68c48dcf8a82f445b610f5af|1ae191e2-c1aa-9138-35ad-86683ba5b50f",
                      "appliesTo": "TRIGGER_ELEMENT",
                      "styleBlockIds": [
                        "075bce64-cb6f-014a-1874-0281367202a9"
                      ],
                      "boundaryMode": false
                    },
                    "filters": [
                      {
                        "type": "blur",
                        "filterId": "5d7e",
                        "value": 0,
                        "unit": "px"
                      }
                    ]
                  },
                  "instant": false
                },
                {
                  "id": "a-76-n-5",
                  "actionTypeId": "TRANSFORM_MOVE",
                  "config": {
                    "delay": 150,
                    "easing": "outExpo",
                    "duration": 800,
                    "target": {
                      "nodeId": "628f30d838105f7cb3ae8e71|454f8225-bb8a-57f8-70b9-84f4d3b4544e",
                      "appliesTo": "TRIGGER_ELEMENT",
                      "styleBlockIds": [
                        "a4083756-4a2d-f846-9988-48f343c7c9d2"
                      ],
                      "boundaryMode": false
                    },
                    "yValue": 0,
                    "xUnit": "PX",
                    "yUnit": "px",
                    "zUnit": "PX"
                  },
                  "instant": false
                },
                {
                  "id": "a-76-n-6",
                  "actionTypeId": "STYLE_OPACITY",
                  "config": {
                    "delay": 150,
                    "easing": "outExpo",
                    "duration": 800,
                    "target": {
                      "nodeId": "628f30d838105f7cb3ae8e71|454f8225-bb8a-57f8-70b9-84f4d3b4544e",
                      "appliesTo": "TRIGGER_ELEMENT",
                      "styleBlockIds": [
                        "a4083756-4a2d-f846-9988-48f343c7c9d2"
                      ],
                      "boundaryMode": false
                    },
                    "value": 100,
                    "unit": "%"
                  },
                  "instant": false
                }
              ]
            }
          ],
          "useFirstGroupAsInitialState": true,
          "createdOn": 1659003970898
        },
        {
          "id": "a-115",
          "title": "Team -> Hover On",
          "actionItemGroups": [
            {
              "actionItems": [
                {
                  "id": "a-115-n",
                  "actionTypeId": "STYLE_SIZE",
                  "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 500,
                    "target": {
                      "nodeId": "10c814e7-2a6a-ea54-534c-3cb818105676",
                      "appliesTo": "ELEMENT_CLASS",
                      "styleBlockIds": [
                        "5f999f84-5a76-52a8-56f3-2b32359a324c"
                      ],
                      "useEventTarget": "CHILDREN",
                      "boundaryMode": false
                    },
                    "widthValue": 0,
                    "widthUnit": "px",
                    "heightUnit": "px",
                    "locked": false
                  },
                  "instant": false
                },
                {
                  "id": "a-115-n-3",
                  "actionTypeId": "STYLE_OPACITY",
                  "config": {
                    "delay": 0,
                    "easing": "",
                    "duration": 500,
                    "target": {
                      "nodeId": "fd76ccad-b285-d58b-15a3-3428b5ee17f5",
                      "appliesTo": "ELEMENT_CLASS",
                      "styleBlockIds": [
                        "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
                      ],
                      "useEventTarget": "CHILDREN",
                      "boundaryMode": false
                    },
                    "value": 0,
                    "unit": "%"
                  },
                  "instant": false
                }
              ]
            },
            {
              "actionItems": [
                {
                  "id": "a-115-n-2",
                  "actionTypeId": "STYLE_SIZE",
                  "config": {
                    "delay": 0,
                    "easing": "outExpo",
                    "duration": 1200,
                    "target": {
                      "nodeId": "10c814e7-2a6a-ea54-534c-3cb818105676",
                      "appliesTo": "ELEMENT_CLASS",
                      "styleBlockIds": [
                        "5f999f84-5a76-52a8-56f3-2b32359a324c"
                      ],
                      "useEventTarget": "CHILDREN",
                      "boundaryMode": false
                    },
                    "widthUnit": "AUTO",
                    "heightUnit": "px",
                    "locked": false
                  },
                  "instant": false
                },
                {
                  "id": "a-115-n-4",
                  "actionTypeId": "STYLE_OPACITY",
                  "config": {
                    "delay": 0,
                    "easing": "outExpo",
                    "duration": 1200,
                    "target": {
                      "nodeId": "fd76ccad-b285-d58b-15a3-3428b5ee17f5",
                      "appliesTo": "ELEMENT_CLASS",
                      "styleBlockIds": [
                        "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
                      ],
                      "useEventTarget": "CHILDREN",
                      "boundaryMode": false
                    },
                    "value": 100,
                    "unit": "%"
                  },
                  "instant": false
                }
              ]
            }
          ],
          "useFirstGroupAsInitialState": true,
          "createdOn": 1770936398551
        },
        {
          "id": "a-116",
          "title": "Team -> Hover Out",
          "actionItemGroups": [
            {
              "actionItems": [
                {
                  "id": "a-116-n",
                  "actionTypeId": "STYLE_SIZE",
                  "config": {
                    "delay": 0,
                    "easing": "outExpo",
                    "duration": 900,
                    "target": {
                      "nodeId": "10c814e7-2a6a-ea54-534c-3cb818105676",
                      "appliesTo": "ELEMENT_CLASS",
                      "styleBlockIds": [
                        "5f999f84-5a76-52a8-56f3-2b32359a324c"
                      ],
                      "useEventTarget": "CHILDREN",
                      "boundaryMode": false
                    },
                    "widthValue": 0,
                    "widthUnit": "px",
                    "heightUnit": "px",
                    "locked": false
                  },
                  "instant": false
                },
                {
                  "id": "a-116-n-2",
                  "actionTypeId": "STYLE_OPACITY",
                  "config": {
                    "delay": 0,
                    "easing": "outExpo",
                    "duration": 400,
                    "target": {
                      "nodeId": "fd76ccad-b285-d58b-15a3-3428b5ee17f5",
                      "appliesTo": "ELEMENT_CLASS",
                      "styleBlockIds": [
                        "92c4ea5d-2014-d51c-d3da-eb4b92ec7fd7"
                      ],
                      "useEventTarget": "CHILDREN",
                      "boundaryMode": false
                    },
                    "value": 0,
                    "unit": "%"
                  },
                  "instant": false
                }
              ]
            }
          ],
          "useFirstGroupAsInitialState": false,
          "createdOn": 1770936398551
        }
      ]
    }
  },
  "meta": {
    "droppedLinks": 0,
    "dynBindRemovedCount": 0,
    "dynListBindRemovedCount": 0,
    "paginationRemovedCount": 0,
    "universalBindingsRemovedCount": 0,
    "unlinkedSymbolCount": 3,
    "codeComponentsRemovedCount": 0,
    "richTextComponentsStripped": false
  }
}
```

## Assets

These files are already hosted. Use the URL. Do not download replacements and do not swap the art.

- `Team (6).avif` — 740×880 — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a73a52f47d35675c8e089f_Team%20(6).avif
- `Facebook Icon.svg` — 24×24 alt "Social Media Image" — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c53708_Facebook%20Icon.svg
- `Instagram Icon.svg` — 25×26 alt "Social Media Icon" — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c535e9_Instagram%20Icon.svg
- `LinkedIn Icon.svg` — 24×24 alt "Social Media Image" — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a5e88d484cbf5ba1c53707_LinkedIn%20Icon.svg
- `Team (4).avif` — 740×880 — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a73a52b4631f1593524a9e_Team%20(4).avif
- `Team (3).avif` — 740×880 — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a73a52c6f08b62f5619dd6_Team%20(3).avif

## Build / run

The payload is `@webflow/XscpData`. In Webflow Designer it is the clipboard format of a copied section. An agent that can paste that format should paste `webflow.json` unchanged onto a blank page, as the only section, unless the page already has the shared navbar or footer this component belongs to.

`meta.json` in the same folder is the library record (name, category, page, sort order). It is not part of the Designer paste.

## Limitations

- The capture meta records removed bindings: unlinkedSymbolCount 3. Live CMS or component bindings that were stripped are not in `webflow.json`.
- Images and icons resolve from `cdn.prod.website-files.com`. If a URL 404s, that asset is gone; do not substitute a different picture.
- Site-wide body type, color variables, and classes that are not in this payload are not included. Only the classes listed above ship with the paste.
