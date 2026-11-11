<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Evergrid — Home — Product Showcase 01

Evergrid — Home — Product Showcase 01 is the Product Showcase section on the Home page of the Evergrid Webflow template, sort order 5. The headline is “Building a Net-Zero Future, Powered by Intelligent Data.”.

Rebuild this as one section. The element tree, the class CSS, the breakpoint overrides, and the interactions below are taken from the capture. The file in **Full source code** is the Webflow clipboard payload (`@webflow/XscpData`). Create `webflow.json` with those contents exactly. Do not reformat, rename classes, or restyle it. Pasting that payload into Webflow Designer is the section. Rebuilding it in code means following the copy, the classes, and the asset URLs, with the JSON as the source of truth when the prose and the JSON disagree.

## Stack & dependencies

Webflow. There is no React app and no npm install for this section. Layout is Webflow classes. Breakpoints saved on the classes are `main` (desktop), `medium` (tablet, 991px and below), `small` (mobile landscape, 767px and below), and `tiny` (mobile portrait, 479px and below). Motion is Webflow interactions: IX2.

No `font-family` is set on these classes. Type comes from the site styles outside this paste.

## Layout & content

Capture note: Full-bleed imagery section. H2: "Building a Net-Zero Future, Powered by Intelligent Data."

Visible copy, first occurrence in document order. A string that is repeated in the tree is listed once here and still appears everywhere the tree shows it.

- `h2` — Building a Net-Zero Future, Powered by Intelligent Data.

Element tree. Indent is nesting. Class names are the Webflow class names.

```
Block div .Section
  Block div .Full Images Wrapper
    Block div .Full Images Con
      Block div .Full Image Overflow Hidden
        Block div .Full Images Container .Top
          Image img .Full Image Quote — alt "__wf_reserved_inherit" · https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5).jpg · Full Images (5).jpg
          Image img .Full Image Quote — alt "__wf_reserved_inherit" · https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7).jpg · Full Images (7).jpg
          Image img .Full Image Quote — alt "__wf_reserved_inherit" · https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4).jpg · Full Images (4).jpg
        Block div .Full Images Container .Middle
          Image img .Full Image Quote — alt "__wf_reserved_inherit" · https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1).jpg · Full Images (1).jpg
          Block div .Full Image Quote Holder
            Image img .Full Image Quote .100Width — alt "__wf_reserved_inherit" · https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9).jpg · Full Images (9).jpg
            Block div .Image Overlay Quote
              Block div .Max Width
                Heading h2 .White Text .Title
                  Text: Building a Net-Zero Future, Powered by Intelligent Data.
          Image img .Full Image Quote — alt "Large tree with dense leaves standing in a foggy field123 at sunrise with a wooden bench nearby." · https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2).jpg · Full Images (2).jpg
        Block div .Full Images Container .Bottom
          Image img .Full Image Quote — alt "__wf_reserved_inherit" · https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8).jpg · Full Images (8).jpg
          Image img .Full Image Quote — alt "__wf_reserved_inherit" · https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4).jpg · Full Images (4).jpg
          Image img .Full Image Quote — alt "__wf_reserved_inherit" · https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1).jpg · Full Images (5).jpg
```

Base styles (`main`). Breakpoint overrides are in **Responsive behaviour**, not repeated here.

**Middle** (combo `&`)

```css
justify-content: center; align-items: center;
```

**Full Images Wrapper**

```css
display: flex; height: 300vh; flex-direction: column; justify-content: flex-start; flex-wrap: nowrap; align-items: center; grid-column-gap: 15px; grid-row-gap: 15px; background-color: #173529;
```

**Max Width**

```css
max-width: 670px;
```

**Section**

```css
/* no base declarations */
```

**Image Overlay Quote**

```css
position: absolute; left: 0%; top: 0%; right: 0%; bottom: 0%; z-index: 2; display: flex; padding-top: 68px; padding-right: 68px; padding-bottom: 68px; padding-left: 68px; justify-content: center; align-items: center; background-color: hsla(0, 0.00%, 0.00%, 0.20); background-image: linear-gradient(to bottom, hsla(156.66666666666666, 40.19%, 26.92%, 0.67),hsla(156.66666666666666, 40.19%, 26.92%, 0.67)) /*, linear-gradient(0deg, #173529 12%, hsla(156, 39.47%, 14.90%, 0.00) 40%) */; pointer-events: none; text-align: center;
```

**Full Image Overflow Hidden**

```css
display: flex; overflow: hidden; height: 100vh; flex-direction: column; justify-content: center; flex-wrap: nowrap; align-items: center; grid-column-gap: 15px; grid-row-gap: 15px;
```

**Full Image Quote Holder**

```css
position: relative; overflow: hidden; width: 60%; flex-grow: 0; flex-shrink: 0; flex-basis: auto; border-top-left-radius: 16px; border-top-right-radius: 16px; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; vertical-align: baseline;
```

**White Text**

```css
margin-bottom: 0px; color: hsla(0, 0.00%, 100.00%, 1.00); font-weight: 400;
```

**Full Images Container**

```css
display: flex; justify-content: center; align-items: center; grid-column-gap: 15px; grid-row-gap: 15px;
```

**Top** (combo `&`)

```css
/* no base declarations */
```

**Full Images Con**

```css
position: sticky; top: 0px; display: flex; overflow: hidden; height: 100vh; flex-direction: column; justify-content: center; flex-wrap: nowrap; align-items: center; grid-column-gap: 15px; grid-row-gap: 15px;
```

**Bottom** (combo `&`)

```css
/* no base declarations */
```

**Full Image Quote**

```css
width: 60%; flex-grow: 0; flex-shrink: 0; flex-basis: auto; border-top-left-radius: 16px; border-top-right-radius: 16px; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; vertical-align: baseline;
```

**Title** (combo `&`)

```css
pointer-events: auto; font-weight: 400;
```

**100Width** (combo `&`)

```css
width: 100%;
```

## Interactions & animation timeline

IX2

- IX2 `SCROLLING_IN_VIEW` on `(element)` starts **Full Images Animation**. Breakpoints: main, medium, small, tiny.

**Full Images Animation**

## Responsive behaviour

Only classes that store an override are listed. A width with no entry for a class keeps the base styles. Webflow’s cascade is desktop, then tablet, then mobile landscape, then mobile portrait: a `tiny` override does not apply on tablet.

**Max Width**
- mobile portrait (tiny, 479px and below): `max-width: 50%;`

**Image Overlay Quote**
- mobile landscape (small, 767px and below): `padding-right: 106px; padding-left: 106px;`
- mobile portrait (tiny, 479px and below): `padding-right: 47px; padding-left: 47px;`

**Full Image Overflow Hidden**
- mobile portrait (tiny, 479px and below): `grid-column-gap: 20px; grid-row-gap: 20px;`

**Full Image Quote Holder**
- tablet (medium, 991px and below): `width: 100%;`
- mobile landscape (small, 767px and below): `width: 120%; height: 100%;`
- mobile portrait (tiny, 479px and below): `width: 200%;`

**White Text**
- mobile portrait (tiny, 479px and below): `margin-top: 0px; font-weight: 300; letter-spacing: -0.2px;`
- mobile landscape (small, 767px and below): `font-weight: 400; letter-spacing: -0.3px;`

**Full Images Container**
- mobile landscape (small, 767px and below): `height: 100%;`

**Full Images Con**
- mobile portrait (tiny, 479px and below): `top: 0vh; overflow: hidden; height: 100vh;`

**Full Image Quote**
- tablet (medium, 991px and below): `width: 100%;`
- mobile landscape (small, 767px and below): `width: 120%; height: 100%; max-width: none; object-fit: cover;`
- mobile portrait (tiny, 479px and below): `width: 200%; height: 100%;`

## Accessibility & robustness

Image alt text that is not a Webflow reserved value:

- Large tree with dense leaves standing in a foggy field123 at sunrise with a wooden bench nearby.

Heading text, in document order:

- `h2` Building a Net-Zero Future, Powered by Intelligent Data.

## Full source code

Create this file exactly. Do not reformat it.

### `webflow.json`

```json
{
  "type": "@webflow/XscpData",
  "payload": {
    "nodes": [
      {
        "_id": "dc1f46eb-1e58-9e4a-0187-65dc4a8f4712",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d8"
        ],
        "children": [
          "f3d4b86e-9b6f-afd4-af83-66031deccba1"
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
        "_id": "f3d4b86e-9b6f-afd4-af83-66031deccba1",
        "type": "Block",
        "tag": "div",
        "classes": [
          "03efd9b0-7e1c-a22d-a78c-aa78a35e37e0"
        ],
        "children": [
          "7b93a792-0093-5e5e-8cb8-079f30181a98"
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
        "_id": "7b93a792-0093-5e5e-8cb8-079f30181a98",
        "type": "Block",
        "tag": "div",
        "classes": [
          "5cb65130-2068-0ee8-733a-eb66c0f88139"
        ],
        "children": [
          "12015eb9-1553-d75e-4018-800c46d09a2a"
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
        "_id": "12015eb9-1553-d75e-4018-800c46d09a2a",
        "type": "Block",
        "tag": "div",
        "classes": [
          "9434806d-abd7-02f3-0bb6-5fa73e7a0686"
        ],
        "children": [
          "bb05a7d4-cdf2-f0ca-43d5-13180ccef67a",
          "33eb9a59-9864-2aa9-be3e-aeb3f54736fe",
          "85bdd2f1-0bd8-9684-f522-2dcff3abb914"
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
        "_id": "bb05a7d4-cdf2-f0ca-43d5-13180ccef67a",
        "type": "Block",
        "tag": "div",
        "classes": [
          "5b74c963-5d99-ca6d-6159-39b995282d67",
          "b99fe866-6b9a-a416-1c1e-6c74b7517ec7"
        ],
        "children": [
          "803d4ac9-36f6-03c4-9c47-ac0b40ea8261",
          "ed376a5a-a97a-dfd7-d6cb-e2db1682d045",
          "b3c71436-4521-a39c-c65c-fffee566d78e"
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
        "_id": "803d4ac9-36f6-03c4-9c47-ac0b40ea8261",
        "type": "Image",
        "tag": "img",
        "classes": [
          "c801d48a-a0c5-40ed-73fa-1e8951ae3946"
        ],
        "children": [],
        "data": {
          "attr": {
            "src": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5).jpg",
            "loading": "lazy",
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit"
          },
          "img": {
            "id": "69a612edd4151d1facffd7cc"
          },
          "srcsetDisabled": false,
          "sizes": [
            {
              "max": 10000,
              "size": "100vw"
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
        "_id": "ed376a5a-a97a-dfd7-d6cb-e2db1682d045",
        "type": "Image",
        "tag": "img",
        "classes": [
          "c801d48a-a0c5-40ed-73fa-1e8951ae3946"
        ],
        "children": [],
        "data": {
          "attr": {
            "src": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7).jpg",
            "loading": "lazy",
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit"
          },
          "img": {
            "id": "69a612ec7ac54e969537e004"
          },
          "srcsetDisabled": false,
          "sizes": [
            {
              "max": 10000,
              "size": "100vw"
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
        "_id": "b3c71436-4521-a39c-c65c-fffee566d78e",
        "type": "Image",
        "tag": "img",
        "classes": [
          "c801d48a-a0c5-40ed-73fa-1e8951ae3946"
        ],
        "children": [],
        "data": {
          "attr": {
            "src": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4).jpg",
            "loading": "lazy",
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit"
          },
          "img": {
            "id": "69a612ed4a1c74c8347028ea"
          },
          "srcsetDisabled": false,
          "sizes": [
            {
              "max": 10000,
              "size": "100vw"
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
        "_id": "33eb9a59-9864-2aa9-be3e-aeb3f54736fe",
        "type": "Block",
        "tag": "div",
        "classes": [
          "5b74c963-5d99-ca6d-6159-39b995282d67",
          "34d5b801-34fe-d4d1-e38f-b574f73839e3"
        ],
        "children": [
          "2de7067f-6969-3424-6d33-5f1e1c9a8f5e",
          "18091fc0-f89d-48a8-8c40-f50be7b59828",
          "c7ec13a2-c97e-8d9a-5e23-5bd110bcee75"
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
        "_id": "2de7067f-6969-3424-6d33-5f1e1c9a8f5e",
        "type": "Image",
        "tag": "img",
        "classes": [
          "c801d48a-a0c5-40ed-73fa-1e8951ae3946"
        ],
        "children": [],
        "data": {
          "attr": {
            "src": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1).jpg",
            "loading": "lazy",
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit"
          },
          "img": {
            "id": "69a612ecd7384e47bc86d22b"
          },
          "srcsetDisabled": false,
          "sizes": [
            {
              "max": 10000,
              "size": "100vw"
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
        "_id": "18091fc0-f89d-48a8-8c40-f50be7b59828",
        "type": "Block",
        "tag": "div",
        "classes": [
          "7842b928-61f7-2bdc-2e70-46b21ac3200b"
        ],
        "children": [
          "3dc039a0-7e2c-8e3b-5d13-24632a2fa856",
          "b92533a5-f907-bbc9-681d-763df959bc97"
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
        "_id": "3dc039a0-7e2c-8e3b-5d13-24632a2fa856",
        "type": "Image",
        "tag": "img",
        "classes": [
          "c801d48a-a0c5-40ed-73fa-1e8951ae3946",
          "144de26a-1422-9132-b96b-2ee12a55b16e"
        ],
        "children": [],
        "data": {
          "attr": {
            "src": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9).jpg",
            "loading": "lazy",
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit"
          },
          "img": {
            "id": "69a612f5259c89c8eb32bcc5"
          },
          "srcsetDisabled": false,
          "sizes": [
            {
              "max": 10000,
              "size": "100vw"
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
        "_id": "b92533a5-f907-bbc9-681d-763df959bc97",
        "type": "Block",
        "tag": "div",
        "classes": [
          "fcc124f7-dfcf-7e99-3587-3885cd7268fb"
        ],
        "children": [
          "58bbb05b-be85-2be0-fdd9-a3d04125f041"
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
        "_id": "58bbb05b-be85-2be0-fdd9-a3d04125f041",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a45be265-d734-fbe6-6de4-aa2fbd4b812a"
        ],
        "children": [
          "4360f831-405b-63c8-445b-2f1f4ee99a85"
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
        "_id": "4360f831-405b-63c8-445b-2f1f4ee99a85",
        "type": "Heading",
        "tag": "h2",
        "classes": [
          "cf550ac2-a2f0-46c1-f19a-1037036edd68",
          "12fa4f39-4cb9-861a-a585-fc7e7ccda641"
        ],
        "children": [
          "2ac15375-f5df-4866-c606-36d4a379bcde"
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
        "_id": "2ac15375-f5df-4866-c606-36d4a379bcde",
        "text": true,
        "v": "Building a Net-Zero Future, Powered by Intelligent Data."
      },
      {
        "_id": "c7ec13a2-c97e-8d9a-5e23-5bd110bcee75",
        "type": "Image",
        "tag": "img",
        "classes": [
          "c801d48a-a0c5-40ed-73fa-1e8951ae3946"
        ],
        "children": [],
        "data": {
          "attr": {
            "src": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2).jpg",
            "loading": "lazy",
            "width": "auto",
            "height": "auto",
            "alt": "Large tree with dense leaves standing in a foggy field123 at sunrise with a wooden bench nearby."
          },
          "img": {
            "id": "69a612edd7384e47bc86d25d"
          },
          "srcsetDisabled": false,
          "sizes": [
            {
              "max": 10000,
              "size": "100vw"
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
        "_id": "85bdd2f1-0bd8-9684-f522-2dcff3abb914",
        "type": "Block",
        "tag": "div",
        "classes": [
          "5b74c963-5d99-ca6d-6159-39b995282d67",
          "a47ef66a-84cd-1c87-fe85-5b7a6add2b01"
        ],
        "children": [
          "2f103ba3-7d17-97df-d74d-2e2f46fcc5b0",
          "95b91723-2dce-11ab-85c2-eee5a5cb0689",
          "0abc6fe5-30f2-4840-dba5-686fc4f17cb5"
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
        "_id": "2f103ba3-7d17-97df-d74d-2e2f46fcc5b0",
        "type": "Image",
        "tag": "img",
        "classes": [
          "c801d48a-a0c5-40ed-73fa-1e8951ae3946"
        ],
        "children": [],
        "data": {
          "attr": {
            "src": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8).jpg",
            "loading": "lazy",
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit"
          },
          "img": {
            "id": "69a612eb979cabfbe9aed861"
          },
          "srcsetDisabled": false,
          "sizes": [
            {
              "max": 10000,
              "size": "100vw"
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
        "_id": "95b91723-2dce-11ab-85c2-eee5a5cb0689",
        "type": "Image",
        "tag": "img",
        "classes": [
          "c801d48a-a0c5-40ed-73fa-1e8951ae3946"
        ],
        "children": [],
        "data": {
          "attr": {
            "src": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4).jpg",
            "loading": "lazy",
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit"
          },
          "img": {
            "id": "69a612ed4a1c74c8347028ea"
          },
          "srcsetDisabled": false,
          "sizes": [
            {
              "max": 10000,
              "size": "100vw"
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
        "_id": "0abc6fe5-30f2-4840-dba5-686fc4f17cb5",
        "type": "Image",
        "tag": "img",
        "classes": [
          "c801d48a-a0c5-40ed-73fa-1e8951ae3946"
        ],
        "children": [],
        "data": {
          "attr": {
            "src": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1).jpg",
            "loading": "lazy",
            "width": "auto",
            "height": "auto",
            "alt": "__wf_reserved_inherit"
          },
          "img": {
            "id": "69a612edd4151d1facffd7cc"
          },
          "srcsetDisabled": false,
          "sizes": [
            {
              "max": 10000,
              "size": "100vw"
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
      }
    ],
    "styles": [
      {
        "_id": "34d5b801-34fe-d4d1-e38f-b574f73839e3",
        "fake": false,
        "type": "class",
        "name": "Middle",
        "namespace": "",
        "comb": "&",
        "styleLess": "justify-content: center; align-items: center;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "03efd9b0-7e1c-a22d-a78c-aa78a35e37e0",
        "fake": false,
        "type": "class",
        "name": "Full Images Wrapper",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; height: 300vh; flex-direction: column; justify-content: flex-start; flex-wrap: nowrap; align-items: center; grid-column-gap: 15px; grid-row-gap: 15px; background-color: #173529;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "a45be265-d734-fbe6-6de4-aa2fbd4b812a",
        "fake": false,
        "type": "class",
        "name": "Max Width",
        "namespace": "",
        "comb": "",
        "styleLess": "max-width: 670px;",
        "variants": {
          "tiny": {
            "styleLess": "max-width: 50%;"
          }
        },
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
        "_id": "fcc124f7-dfcf-7e99-3587-3885cd7268fb",
        "fake": false,
        "type": "class",
        "name": "Image Overlay Quote",
        "namespace": "",
        "comb": "",
        "styleLess": "position: absolute; left: 0%; top: 0%; right: 0%; bottom: 0%; z-index: 2; display: flex; padding-top: 68px; padding-right: 68px; padding-bottom: 68px; padding-left: 68px; justify-content: center; align-items: center; background-color: hsla(0, 0.00%, 0.00%, 0.20); background-image: linear-gradient(to bottom, hsla(156.66666666666666, 40.19%, 26.92%, 0.67),hsla(156.66666666666666, 40.19%, 26.92%, 0.67)) /*, linear-gradient(0deg, #173529 12%, hsla(156, 39.47%, 14.90%, 0.00) 40%) */; pointer-events: none; text-align: center;",
        "variants": {
          "small": {
            "styleLess": "padding-right: 106px; padding-left: 106px;"
          },
          "tiny": {
            "styleLess": "padding-right: 47px; padding-left: 47px;"
          }
        },
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "9434806d-abd7-02f3-0bb6-5fa73e7a0686",
        "fake": false,
        "type": "class",
        "name": "Full Image Overflow Hidden",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; overflow: hidden; height: 100vh; flex-direction: column; justify-content: center; flex-wrap: nowrap; align-items: center; grid-column-gap: 15px; grid-row-gap: 15px;",
        "variants": {
          "tiny": {
            "styleLess": "grid-column-gap: 20px; grid-row-gap: 20px;"
          }
        },
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "7842b928-61f7-2bdc-2e70-46b21ac3200b",
        "fake": false,
        "type": "class",
        "name": "Full Image Quote Holder",
        "namespace": "",
        "comb": "",
        "styleLess": "position: relative; overflow: hidden; width: 60%; flex-grow: 0; flex-shrink: 0; flex-basis: auto; border-top-left-radius: 16px; border-top-right-radius: 16px; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; vertical-align: baseline;",
        "variants": {
          "medium": {
            "styleLess": "width: 100%;"
          },
          "small": {
            "styleLess": "width: 120%; height: 100%;"
          },
          "tiny": {
            "styleLess": "width: 200%;"
          }
        },
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "cf550ac2-a2f0-46c1-f19a-1037036edd68",
        "fake": false,
        "type": "class",
        "name": "White Text",
        "namespace": "",
        "comb": "",
        "styleLess": "margin-bottom: 0px; color: hsla(0, 0.00%, 100.00%, 1.00); font-weight: 400;",
        "variants": {
          "tiny": {
            "styleLess": "margin-top: 0px; font-weight: 300; letter-spacing: -0.2px;"
          },
          "small": {
            "styleLess": "font-weight: 400; letter-spacing: -0.3px;"
          }
        },
        "children": [
          "37d2b20e-cf62-c7f8-2170-fb4c9a00200f",
          "12fa4f39-4cb9-861a-a585-fc7e7ccda641",
          "08c64daa-3706-a47f-a92b-32c40cbdb554"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "5b74c963-5d99-ca6d-6159-39b995282d67",
        "fake": false,
        "type": "class",
        "name": "Full Images Container",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; justify-content: center; align-items: center; grid-column-gap: 15px; grid-row-gap: 15px;",
        "variants": {
          "small": {
            "styleLess": "height: 100%;"
          }
        },
        "children": [
          "34d5b801-34fe-d4d1-e38f-b574f73839e3",
          "b99fe866-6b9a-a416-1c1e-6c74b7517ec7",
          "a47ef66a-84cd-1c87-fe85-5b7a6add2b01"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "b99fe866-6b9a-a416-1c1e-6c74b7517ec7",
        "fake": false,
        "type": "class",
        "name": "Top",
        "namespace": "",
        "comb": "&",
        "styleLess": "",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "5cb65130-2068-0ee8-733a-eb66c0f88139",
        "fake": false,
        "type": "class",
        "name": "Full Images Con",
        "namespace": "",
        "comb": "",
        "styleLess": "position: sticky; top: 0px; display: flex; overflow: hidden; height: 100vh; flex-direction: column; justify-content: center; flex-wrap: nowrap; align-items: center; grid-column-gap: 15px; grid-row-gap: 15px;",
        "variants": {
          "tiny": {
            "styleLess": "top: 0vh; overflow: hidden; height: 100vh;"
          }
        },
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "a47ef66a-84cd-1c87-fe85-5b7a6add2b01",
        "fake": false,
        "type": "class",
        "name": "Bottom",
        "namespace": "",
        "comb": "&",
        "styleLess": "",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "c801d48a-a0c5-40ed-73fa-1e8951ae3946",
        "fake": false,
        "type": "class",
        "name": "Full Image Quote",
        "namespace": "",
        "comb": "",
        "styleLess": "width: 60%; flex-grow: 0; flex-shrink: 0; flex-basis: auto; border-top-left-radius: 16px; border-top-right-radius: 16px; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; vertical-align: baseline;",
        "variants": {
          "medium": {
            "styleLess": "width: 100%;"
          },
          "small": {
            "styleLess": "width: 120%; height: 100%; max-width: none; object-fit: cover;"
          },
          "tiny": {
            "styleLess": "width: 200%; height: 100%;"
          }
        },
        "children": [
          "144de26a-1422-9132-b96b-2ee12a55b16e"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "12fa4f39-4cb9-861a-a585-fc7e7ccda641",
        "fake": false,
        "type": "class",
        "name": "Title",
        "namespace": "",
        "comb": "&",
        "styleLess": "pointer-events: auto; font-weight: 400;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "144de26a-1422-9132-b96b-2ee12a55b16e",
        "fake": false,
        "type": "class",
        "name": "100Width",
        "namespace": "",
        "comb": "&",
        "styleLess": "width: 100%;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      }
    ],
    "assets": [
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5).jpg",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 2214,
        "isHD": false,
        "height": 1020,
        "fileName": "69a612edd4151d1facffd7cc_Full Images (5).jpg",
        "createdOn": "2026-03-02T22:45:01.621Z",
        "origFileName": "Full Images (5).jpg",
        "alt": "",
        "fileHash": "7ad7d477228a9548c6736eb83af66aee",
        "translationLoading": false,
        "variants": [
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-500.jpg",
            "origFileName": "Full%20Images%20(5)-p-500.jpg",
            "fileName": "69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-500.jpg",
            "format": "jpg",
            "width": 500,
            "size": 24068,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-500.jpg",
            "_id": "69a612f8f607233c9c724e14"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-800.jpg",
            "origFileName": "Full%20Images%20(5)-p-800.jpg",
            "fileName": "69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-800.jpg",
            "format": "jpg",
            "width": 800,
            "size": 59759,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-800.jpg",
            "_id": "69a612f8f607233c9c724e15"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-1080.jpg",
            "origFileName": "Full%20Images%20(5)-p-1080.jpg",
            "fileName": "69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-1080.jpg",
            "format": "jpg",
            "width": 1080,
            "size": 105258,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-1080.jpg",
            "_id": "69a612f8f607233c9c724e16"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-1600.jpg",
            "origFileName": "Full%20Images%20(5)-p-1600.jpg",
            "fileName": "69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-1600.jpg",
            "format": "jpg",
            "width": 1600,
            "size": 217932,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-1600.jpg",
            "_id": "69a612f8f607233c9c724e17"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-2000.jpg",
            "origFileName": "Full%20Images%20(5)-p-2000.jpg",
            "fileName": "69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-2000.jpg",
            "format": "jpg",
            "width": 2000,
            "size": 323476,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-2000.jpg",
            "_id": "69a612f8f607233c9c724e18"
          }
        ],
        "mimeType": "image/jpeg",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5).jpg",
        "thumbUrl": "https://daks2k3a4ib2z.cloudfront.net/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5)-p-130x130q80.jpg",
        "_id": "69a612edd4151d1facffd7cc",
        "updatedOn": "2026-03-03T01:15:04.349Z",
        "fileSize": 2362989,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7).jpg",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 2214,
        "isHD": false,
        "height": 1020,
        "fileName": "69a612ec7ac54e969537e004_Full Images (7).jpg",
        "createdOn": "2026-03-02T22:45:00.155Z",
        "origFileName": "Full Images (7).jpg",
        "alt": "",
        "fileHash": "3b20e16222e278fb4919543a3e180edd",
        "translationLoading": false,
        "variants": [
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-500.jpg",
            "origFileName": "Full%20Images%20(7)-p-500.jpg",
            "fileName": "69a612ec7ac54e969537e004_Full%20Images%20(7)-p-500.jpg",
            "format": "jpg",
            "width": 500,
            "size": 11113,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-500.jpg",
            "_id": "69a612f12acc780f1ca01a28"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-800.jpg",
            "origFileName": "Full%20Images%20(7)-p-800.jpg",
            "fileName": "69a612ec7ac54e969537e004_Full%20Images%20(7)-p-800.jpg",
            "format": "jpg",
            "width": 800,
            "size": 24168,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-800.jpg",
            "_id": "69a612f12acc780f1ca01a29"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-1080.jpg",
            "origFileName": "Full%20Images%20(7)-p-1080.jpg",
            "fileName": "69a612ec7ac54e969537e004_Full%20Images%20(7)-p-1080.jpg",
            "format": "jpg",
            "width": 1080,
            "size": 40231,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-1080.jpg",
            "_id": "69a612f12acc780f1ca01a2a"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-1600.jpg",
            "origFileName": "Full%20Images%20(7)-p-1600.jpg",
            "fileName": "69a612ec7ac54e969537e004_Full%20Images%20(7)-p-1600.jpg",
            "format": "jpg",
            "width": 1600,
            "size": 81289,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-1600.jpg",
            "_id": "69a612f12acc780f1ca01a2b"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-2000.jpg",
            "origFileName": "Full%20Images%20(7)-p-2000.jpg",
            "fileName": "69a612ec7ac54e969537e004_Full%20Images%20(7)-p-2000.jpg",
            "format": "jpg",
            "width": 2000,
            "size": 124679,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-2000.jpg",
            "_id": "69a612f12acc780f1ca01a2c"
          }
        ],
        "mimeType": "image/jpeg",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7).jpg",
        "thumbUrl": "https://daks2k3a4ib2z.cloudfront.net/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7)-p-130x130q80.jpg",
        "_id": "69a612ec7ac54e969537e004",
        "updatedOn": "2026-03-03T01:15:04.011Z",
        "fileSize": 1165300,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4).jpg",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 2214,
        "isHD": false,
        "height": 1020,
        "fileName": "69a612ed4a1c74c8347028ea_Full Images (4).jpg",
        "createdOn": "2026-03-02T22:45:01.636Z",
        "origFileName": "Full Images (4).jpg",
        "alt": "",
        "fileHash": "fc35a5df578e6e908abf1ae226ab1df2",
        "translationLoading": false,
        "variants": [
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-500.jpg",
            "origFileName": "Full%20Images%20(4)-p-500.jpg",
            "fileName": "69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-500.jpg",
            "format": "jpg",
            "width": 500,
            "size": 27735,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-500.jpg",
            "_id": "69a612f46782e87bbcc0c34f"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-800.jpg",
            "origFileName": "Full%20Images%20(4)-p-800.jpg",
            "fileName": "69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-800.jpg",
            "format": "jpg",
            "width": 800,
            "size": 68161,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-800.jpg",
            "_id": "69a612f46782e87bbcc0c350"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-1080.jpg",
            "origFileName": "Full%20Images%20(4)-p-1080.jpg",
            "fileName": "69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-1080.jpg",
            "format": "jpg",
            "width": 1080,
            "size": 121307,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-1080.jpg",
            "_id": "69a612f46782e87bbcc0c351"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-1600.jpg",
            "origFileName": "Full%20Images%20(4)-p-1600.jpg",
            "fileName": "69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-1600.jpg",
            "format": "jpg",
            "width": 1600,
            "size": 249155,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-1600.jpg",
            "_id": "69a612f46782e87bbcc0c352"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-2000.jpg",
            "origFileName": "Full%20Images%20(4)-p-2000.jpg",
            "fileName": "69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-2000.jpg",
            "format": "jpg",
            "width": 2000,
            "size": 362949,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-2000.jpg",
            "_id": "69a612f46782e87bbcc0c353"
          }
        ],
        "mimeType": "image/jpeg",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4).jpg",
        "thumbUrl": "https://daks2k3a4ib2z.cloudfront.net/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4)-p-130x130q80.jpg",
        "_id": "69a612ed4a1c74c8347028ea",
        "updatedOn": "2026-03-03T01:15:04.344Z",
        "fileSize": 2095331,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1).jpg",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 2214,
        "isHD": false,
        "height": 1020,
        "fileName": "69a612ecd7384e47bc86d22b_Full Images (1).jpg",
        "createdOn": "2026-03-02T22:45:00.179Z",
        "origFileName": "Full Images (1).jpg",
        "alt": "",
        "fileHash": "09df6b53ba140e8111ba047e13ff3e9a",
        "translationLoading": false,
        "variants": [
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-500.jpg",
            "origFileName": "Full%20Images%20(1)-p-500.jpg",
            "fileName": "69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-500.jpg",
            "format": "jpg",
            "width": 500,
            "size": 14743,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-500.jpg",
            "_id": "69a612f40699369642a55dda"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-800.jpg",
            "origFileName": "Full%20Images%20(1)-p-800.jpg",
            "fileName": "69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-800.jpg",
            "format": "jpg",
            "width": 800,
            "size": 36021,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-800.jpg",
            "_id": "69a612f40699369642a55ddb"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-1080.jpg",
            "origFileName": "Full%20Images%20(1)-p-1080.jpg",
            "fileName": "69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-1080.jpg",
            "format": "jpg",
            "width": 1080,
            "size": 62929,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-1080.jpg",
            "_id": "69a612f40699369642a55ddc"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-1600.jpg",
            "origFileName": "Full%20Images%20(1)-p-1600.jpg",
            "fileName": "69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-1600.jpg",
            "format": "jpg",
            "width": 1600,
            "size": 126608,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-1600.jpg",
            "_id": "69a612f40699369642a55ddd"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-2000.jpg",
            "origFileName": "Full%20Images%20(1)-p-2000.jpg",
            "fileName": "69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-2000.jpg",
            "format": "jpg",
            "width": 2000,
            "size": 182489,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-2000.jpg",
            "_id": "69a612f40699369642a55dde"
          }
        ],
        "mimeType": "image/jpeg",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1).jpg",
        "thumbUrl": "https://daks2k3a4ib2z.cloudfront.net/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1)-p-130x130q80.jpg",
        "_id": "69a612ecd7384e47bc86d22b",
        "updatedOn": "2026-03-03T01:15:04.000Z",
        "fileSize": 1123447,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9).jpg",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 2214,
        "isHD": false,
        "height": 1020,
        "fileName": "69a612f5259c89c8eb32bcc5_Full Images (9).jpg",
        "createdOn": "2026-03-02T22:45:09.382Z",
        "origFileName": "Full Images (9).jpg",
        "alt": "",
        "fileHash": "4b58d44b4eed144d5c9062abb7e3adeb",
        "translationLoading": false,
        "variants": [
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-500.jpg",
            "origFileName": "Full%20Images%20(9)-p-500.jpg",
            "fileName": "69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-500.jpg",
            "format": "jpg",
            "width": 500,
            "size": 19785,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-500.jpg",
            "_id": "69a612fbf4b8ac2bd497c36e"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-800.jpg",
            "origFileName": "Full%20Images%20(9)-p-800.jpg",
            "fileName": "69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-800.jpg",
            "format": "jpg",
            "width": 800,
            "size": 48226,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-800.jpg",
            "_id": "69a612fbf4b8ac2bd497c36f"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-1080.jpg",
            "origFileName": "Full%20Images%20(9)-p-1080.jpg",
            "fileName": "69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-1080.jpg",
            "format": "jpg",
            "width": 1080,
            "size": 82598,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-1080.jpg",
            "_id": "69a612fbf4b8ac2bd497c370"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-1600.jpg",
            "origFileName": "Full%20Images%20(9)-p-1600.jpg",
            "fileName": "69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-1600.jpg",
            "format": "jpg",
            "width": 1600,
            "size": 163280,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-1600.jpg",
            "_id": "69a612fbf4b8ac2bd497c371"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-2000.jpg",
            "origFileName": "Full%20Images%20(9)-p-2000.jpg",
            "fileName": "69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-2000.jpg",
            "format": "jpg",
            "width": 2000,
            "size": 237771,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-2000.jpg",
            "_id": "69a612fbf4b8ac2bd497c372"
          }
        ],
        "mimeType": "image/jpeg",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9).jpg",
        "thumbUrl": "https://daks2k3a4ib2z.cloudfront.net/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9)-p-130x130q80.jpg",
        "_id": "69a612f5259c89c8eb32bcc5",
        "updatedOn": "2026-03-03T01:15:04.662Z",
        "fileSize": 1873235,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2).jpg",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 2214,
        "isHD": false,
        "height": 1020,
        "fileName": "69a612edd7384e47bc86d25d_Full Images (2).jpg",
        "createdOn": "2026-03-02T22:45:01.331Z",
        "origFileName": "Full Images (2).jpg",
        "alt": "",
        "fileHash": "8a080ee1e48ee4a79a84c3ee1635c2ee",
        "translationLoading": false,
        "variants": [
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-500.jpg",
            "origFileName": "Full%20Images%20(2)-p-500.jpg",
            "fileName": "69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-500.jpg",
            "format": "jpg",
            "width": 500,
            "size": 18670,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-500.jpg",
            "_id": "69a612f16d3d9b57db6defae"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-800.jpg",
            "origFileName": "Full%20Images%20(2)-p-800.jpg",
            "fileName": "69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-800.jpg",
            "format": "jpg",
            "width": 800,
            "size": 44862,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-800.jpg",
            "_id": "69a612f16d3d9b57db6defaf"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-1080.jpg",
            "origFileName": "Full%20Images%20(2)-p-1080.jpg",
            "fileName": "69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-1080.jpg",
            "format": "jpg",
            "width": 1080,
            "size": 78263,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-1080.jpg",
            "_id": "69a612f16d3d9b57db6defb0"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-1600.jpg",
            "origFileName": "Full%20Images%20(2)-p-1600.jpg",
            "fileName": "69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-1600.jpg",
            "format": "jpg",
            "width": 1600,
            "size": 160267,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-1600.jpg",
            "_id": "69a612f16d3d9b57db6defb1"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-2000.jpg",
            "origFileName": "Full%20Images%20(2)-p-2000.jpg",
            "fileName": "69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-2000.jpg",
            "format": "jpg",
            "width": 2000,
            "size": 237222,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-2000.jpg",
            "_id": "69a612f16d3d9b57db6defb2"
          }
        ],
        "mimeType": "image/jpeg",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2).jpg",
        "thumbUrl": "https://daks2k3a4ib2z.cloudfront.net/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2)-p-130x130q80.jpg",
        "_id": "69a612edd7384e47bc86d25d",
        "updatedOn": "2026-03-03T01:15:04.002Z",
        "fileSize": 1815074,
        "localizedSettings": {}
      },
      {
        "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8).jpg",
        "siteId": "69a5e88d484cbf5ba1c535db",
        "width": 2214,
        "isHD": false,
        "height": 1020,
        "fileName": "69a612eb979cabfbe9aed861_Full Images (8).jpg",
        "createdOn": "2026-03-02T22:44:59.908Z",
        "origFileName": "Full Images (8).jpg",
        "alt": "",
        "fileHash": "64983f73d940a64ce149b27df3e03549",
        "translationLoading": false,
        "variants": [
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-500.jpg",
            "origFileName": "Full%20Images%20(8)-p-500.jpg",
            "fileName": "69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-500.jpg",
            "format": "jpg",
            "width": 500,
            "size": 12097,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-500.jpg",
            "_id": "69a612ee2329ec09fb4a0ffd"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-800.jpg",
            "origFileName": "Full%20Images%20(8)-p-800.jpg",
            "fileName": "69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-800.jpg",
            "format": "jpg",
            "width": 800,
            "size": 24433,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-800.jpg",
            "_id": "69a612ee2329ec09fb4a0ffe"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-1080.jpg",
            "origFileName": "Full%20Images%20(8)-p-1080.jpg",
            "fileName": "69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-1080.jpg",
            "format": "jpg",
            "width": 1080,
            "size": 38122,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-1080.jpg",
            "_id": "69a612ee2329ec09fb4a0fff"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-1600.jpg",
            "origFileName": "Full%20Images%20(8)-p-1600.jpg",
            "fileName": "69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-1600.jpg",
            "format": "jpg",
            "width": 1600,
            "size": 67533,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-1600.jpg",
            "_id": "69a612ee2329ec09fb4a1000"
          },
          {
            "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-2000.jpg",
            "origFileName": "Full%20Images%20(8)-p-2000.jpg",
            "fileName": "69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-2000.jpg",
            "format": "jpg",
            "width": 2000,
            "size": 92966,
            "quality": 100,
            "cdnUrl": "https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-2000.jpg",
            "_id": "69a612ee2329ec09fb4a1001"
          }
        ],
        "mimeType": "image/jpeg",
        "isFromWellKnownFolder": false,
        "s3Url": "https://s3.amazonaws.com/webflow-prod-assets/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8).jpg",
        "thumbUrl": "https://daks2k3a4ib2z.cloudfront.net/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8)-p-130x130q80.jpg",
        "_id": "69a612eb979cabfbe9aed861",
        "updatedOn": "2026-03-03T01:15:04.006Z",
        "fileSize": 942976,
        "localizedSettings": {}
      }
    ],
    "ix1": [],
    "ix2": {
      "interactions": [
        {
          "id": "i-379",
          "interactionTypeId": "SCROLLING_IN_VIEW_INTERACTION",
          "eventIds": [
            "e-741"
          ],
          "target": "69a5e88d484cbf5ba1c535c7|f3d4b86e-9b6f-afd4-af83-66031deccba1",
          "createdOn": 1772491875542
        }
      ],
      "events": [
        {
          "id": "e-741",
          "name": "",
          "animationType": "custom",
          "eventTypeId": "SCROLLING_IN_VIEW",
          "action": {
            "id": "",
            "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
            "instant": true,
            "config": {
              "actionListId": "a-121",
              "affectedElements": {}
            }
          },
          "mediaQueries": [
            "main",
            "medium",
            "small",
            "tiny"
          ],
          "target": {
            "id": "69a5e88d484cbf5ba1c535c7|f3d4b86e-9b6f-afd4-af83-66031deccba1",
            "appliesTo": "ELEMENT",
            "styleBlockIds": []
          },
          "targets": [
            {
              "id": "69a5e88d484cbf5ba1c535c7|f3d4b86e-9b6f-afd4-af83-66031deccba1",
              "appliesTo": "ELEMENT",
              "styleBlockIds": []
            }
          ],
          "config": [
            {
              "continuousParameterGroupId": "a-121-p",
              "smoothing": 83,
              "startsEntering": false,
              "addStartOffset": false,
              "addOffsetValue": 50,
              "startsExiting": false,
              "addEndOffset": true,
              "endOffsetValue": 30
            }
          ],
          "createdOn": 1772491875543
        }
      ],
      "actionLists": [
        {
          "id": "a-121",
          "title": "Full Images Animation",
          "continuousParameterGroups": [
            {
              "id": "a-121-p",
              "type": "SCROLL_PROGRESS",
              "parameterLabel": "Scroll",
              "continuousActionGroups": [
                {
                  "keyframe": 0,
                  "actionItems": [
                    {
                      "id": "a-121-n",
                      "actionTypeId": "TRANSFORM_SCALE",
                      "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                          "nodeId": "69a5e88d484cbf5ba1c535c7|12015eb9-1553-d75e-4018-800c46d09a2a",
                          "appliesTo": "ELEMENT_CLASS",
                          "styleBlockIds": [
                            "9434806d-abd7-02f3-0bb6-5fa73e7a0686"
                          ],
                          "useEventTarget": "CHILDREN",
                          "boundaryMode": false
                        },
                        "xValue": 2.75,
                        "yValue": 2.75,
                        "locked": true
                      },
                      "instant": false
                    },
                    {
                      "id": "a-121-n-3",
                      "actionTypeId": "STYLE_OPACITY",
                      "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                          "nodeId": "69a5e88d484cbf5ba1c535c7|b92533a5-f907-bbc9-681d-763df959bc97",
                          "appliesTo": "ELEMENT_CLASS",
                          "styleBlockIds": [
                            "fcc124f7-dfcf-7e99-3587-3885cd7268fb"
                          ],
                          "useEventTarget": "CHILDREN",
                          "boundaryMode": false
                        },
                        "value": 0,
                        "unit": "%"
                      },
                      "instant": false
                    },
                    {
                      "id": "a-121-n-4",
                      "actionTypeId": "TRANSFORM_MOVE",
                      "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                          "nodeId": "69a5e88d484cbf5ba1c535c7|bb05a7d4-cdf2-f0ca-43d5-13180ccef67a",
                          "appliesTo": "ELEMENT_CLASS",
                          "styleBlockIds": [
                            "5b74c963-5d99-ca6d-6159-39b995282d67",
                            "b99fe866-6b9a-a416-1c1e-6c74b7517ec7"
                          ],
                          "useEventTarget": "CHILDREN",
                          "boundaryMode": false
                        },
                        "xValue": -80,
                        "xUnit": "%",
                        "yUnit": "PX",
                        "zUnit": "PX"
                      },
                      "instant": false
                    },
                    {
                      "id": "a-121-n-6",
                      "actionTypeId": "TRANSFORM_MOVE",
                      "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                          "nodeId": "69a5e88d484cbf5ba1c535c7|85bdd2f1-0bd8-9684-f522-2dcff3abb914",
                          "appliesTo": "ELEMENT_CLASS",
                          "styleBlockIds": [
                            "5b74c963-5d99-ca6d-6159-39b995282d67",
                            "a47ef66a-84cd-1c87-fe85-5b7a6add2b01"
                          ],
                          "useEventTarget": "CHILDREN",
                          "boundaryMode": false
                        },
                        "xValue": 50,
                        "xUnit": "%",
                        "yUnit": "PX",
                        "zUnit": "PX"
                      },
                      "instant": false
                    }
                  ]
                },
                {
                  "keyframe": 50,
                  "actionItems": [
                    {
                      "id": "a-121-n-8",
                      "actionTypeId": "STYLE_OPACITY",
                      "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                          "nodeId": "69a5e88d484cbf5ba1c535c7|b92533a5-f907-bbc9-681d-763df959bc97",
                          "appliesTo": "ELEMENT_CLASS",
                          "styleBlockIds": [
                            "fcc124f7-dfcf-7e99-3587-3885cd7268fb"
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
                  "keyframe": 70,
                  "actionItems": [
                    {
                      "id": "a-121-n-9",
                      "actionTypeId": "STYLE_OPACITY",
                      "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                          "nodeId": "69a5e88d484cbf5ba1c535c7|b92533a5-f907-bbc9-681d-763df959bc97",
                          "appliesTo": "ELEMENT_CLASS",
                          "styleBlockIds": [
                            "fcc124f7-dfcf-7e99-3587-3885cd7268fb"
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
                },
                {
                  "keyframe": 80,
                  "actionItems": [
                    {
                      "id": "a-121-n-2",
                      "actionTypeId": "TRANSFORM_SCALE",
                      "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                          "nodeId": "69a5e88d484cbf5ba1c535c7|12015eb9-1553-d75e-4018-800c46d09a2a",
                          "appliesTo": "ELEMENT_CLASS",
                          "styleBlockIds": [
                            "9434806d-abd7-02f3-0bb6-5fa73e7a0686"
                          ],
                          "useEventTarget": "CHILDREN",
                          "boundaryMode": false
                        },
                        "xValue": 1,
                        "yValue": 1,
                        "locked": true
                      },
                      "instant": false
                    }
                  ]
                },
                {
                  "keyframe": 100,
                  "actionItems": [
                    {
                      "id": "a-121-n-5",
                      "actionTypeId": "TRANSFORM_MOVE",
                      "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                          "nodeId": "69a5e88d484cbf5ba1c535c7|bb05a7d4-cdf2-f0ca-43d5-13180ccef67a",
                          "appliesTo": "ELEMENT_CLASS",
                          "styleBlockIds": [
                            "5b74c963-5d99-ca6d-6159-39b995282d67",
                            "b99fe866-6b9a-a416-1c1e-6c74b7517ec7"
                          ],
                          "useEventTarget": "CHILDREN",
                          "boundaryMode": false
                        },
                        "xValue": 40,
                        "xUnit": "%",
                        "yUnit": "PX",
                        "zUnit": "PX"
                      },
                      "instant": false
                    },
                    {
                      "id": "a-121-n-7",
                      "actionTypeId": "TRANSFORM_MOVE",
                      "config": {
                        "delay": 0,
                        "easing": "",
                        "duration": 500,
                        "target": {
                          "nodeId": "69a5e88d484cbf5ba1c535c7|85bdd2f1-0bd8-9684-f522-2dcff3abb914",
                          "appliesTo": "ELEMENT_CLASS",
                          "styleBlockIds": [
                            "5b74c963-5d99-ca6d-6159-39b995282d67",
                            "a47ef66a-84cd-1c87-fe85-5b7a6add2b01"
                          ],
                          "useEventTarget": "CHILDREN",
                          "boundaryMode": false
                        },
                        "xValue": -40,
                        "xUnit": "%",
                        "yUnit": "PX",
                        "zUnit": "PX"
                      },
                      "instant": false
                    }
                  ]
                }
              ]
            }
          ],
          "createdOn": 1772491879838
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
    "unlinkedSymbolCount": 0,
    "codeComponentsRemovedCount": 0,
    "richTextComponentsStripped": false
  }
}
```

## Assets

These files are already hosted. Use the URL. Do not download replacements and do not swap the art.

- `Full Images (5).jpg` — 2214×1020 — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd4151d1facffd7cc_Full%20Images%20(5).jpg
- `Full Images (7).jpg` — 2214×1020 — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ec7ac54e969537e004_Full%20Images%20(7).jpg
- `Full Images (4).jpg` — 2214×1020 — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ed4a1c74c8347028ea_Full%20Images%20(4).jpg
- `Full Images (1).jpg` — 2214×1020 — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612ecd7384e47bc86d22b_Full%20Images%20(1).jpg
- `Full Images (9).jpg` — 2214×1020 — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612f5259c89c8eb32bcc5_Full%20Images%20(9).jpg
- `Full Images (2).jpg` — 2214×1020 — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612edd7384e47bc86d25d_Full%20Images%20(2).jpg
- `Full Images (8).jpg` — 2214×1020 — https://cdn.prod.website-files.com/69a5e88d484cbf5ba1c535db/69a612eb979cabfbe9aed861_Full%20Images%20(8).jpg

## Build / run

The payload is `@webflow/XscpData`. In Webflow Designer it is the clipboard format of a copied section. An agent that can paste that format should paste `webflow.json` unchanged onto a blank page, as the only section, unless the page already has the shared navbar or footer this component belongs to.

`meta.json` in the same folder is the library record (name, category, page, sort order). It is not part of the Designer paste.

## Limitations

- The capture meta does not record removed CMS bindings.
- Images and icons resolve from `cdn.prod.website-files.com`. If a URL 404s, that asset is gone; do not substitute a different picture.
- Site-wide body type, color variables, and classes that are not in this payload are not included. Only the classes listed above ship with the paste.
