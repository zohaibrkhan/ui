<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Evergrid — Case Studies — Use Cases 01

Evergrid — Case Studies — Use Cases 01 is the Use Cases section on the Case Studies page of the Evergrid Webflow template, sort order 25. The headline is “Sustainability wins you can measure”.

Rebuild this as one section. The element tree, the class CSS, the breakpoint overrides, and the interactions below are taken from the capture. The file in **Full source code** is the Webflow clipboard payload (`@webflow/XscpData`). Create `webflow.json` with those contents exactly. Do not reformat, rename classes, or restyle it. Pasting that payload into Webflow Designer is the section. Rebuilding it in code means following the copy, the classes, and the asset URLs, with the JSON as the source of truth when the prose and the JSON disagree.

## Stack & dependencies

Webflow. There is no React app and no npm install for this section. Layout is Webflow classes. Breakpoints saved on the classes are `main` (desktop), `medium` (tablet, 991px and below), `small` (mobile landscape, 767px and below), and `tiny` (mobile portrait, 479px and below). Motion is Webflow interactions: IX2 and IX3.

No `font-family` is set on these classes. Type comes from the site styles outside this paste.

## Layout & content

Capture note: Single outer section includes hero title ("Sustainability wins you can measure") + case study CMS grid. Confirm Use Cases vs Hero split.

Visible copy, first occurrence in document order. A string that is repeated in the tree is listed once here and still appears everywhere the tree shows it.

- `h1` — Sustainability wins you can measure
- `p` — From multi-site energy tracking to audit-ready reporting, explore real stories of teams turning ESG work into clear outcomes.
- `div` — No items found.

Element tree. Indent is nesting. Class names are the Webflow class names.

```
Block div .Section .White Section
  Block div .Container
    Block div .Section Inside
      Block div .About Hero Content
        Block div .Animate On Load
          Heading h1 .Big TItle
            Text: Sustainability wins you can measure
        Block div .About Hero Paragraph Holder 
          Block div .Animate On Load
            Paragraph p .Paragraph
              Text: From multi-site energy tracking to audit-ready reporting, explore real stories of teams turning ESG work into clear outcomes.
      DynamoWrapper div .Case Study Grid Holder
        DynamoList div .Case Study Grid
          DynamoItem div .Case Study .Animate On Load
        DynamoEmpty div
          Block div
            Text: No items found.
```

Base styles (`main`). Breakpoint overrides are in **Responsive behaviour**, not repeated here.

**White Section** (combo `&`)

```css
position: relative; z-index: 3; background-color: #f5f4ec;
```

**Case Study**

```css
/* no base declarations */
```

**Case Study Grid**

```css
display: grid; grid-auto-columns: 1fr; grid-column-gap: 40px; grid-row-gap: 40px; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto;
```

**Container**

```css
position: relative; z-index: 3; max-width: 1440px; margin-right: auto; margin-left: auto; padding-top: 3em; padding-right: 3em; padding-bottom: 3em; padding-left: 3em;
```

**About Hero Paragraph Holder **

```css
max-width: 650px;
```

**Big TItle**

```css
margin-top: 0px; margin-bottom: 0px; font-size: 60px;
```

**Section**

```css
/* no base declarations */
```

**About Hero Content**

```css
display: flex; padding-top: 0px; flex-direction: column; justify-content: flex-start; flex-wrap: nowrap; align-items: center; grid-column-gap: 12px; grid-row-gap: 12px; text-align: center;
```

**Animate On Load**

```css
/* no base declarations */
```

**Animate On Load** (combo `&`)

```css
/* no base declarations */
```

**Case Study Grid Holder**

```css
/* no base declarations */
```

**Section Inside**

```css
display: flex; flex-direction: column; flex-wrap: nowrap; grid-column-gap: 40px; grid-row-gap: 40px;
```

**Paragraph**

```css
margin-bottom: 0px;
```

## Interactions & animation timeline

IX3

**Fade In On Load** — trigger `wf:load`.
- `Fade In`. class `Animate On Load`. duration 0.8s. starts at 0.3s. stagger 0.35s. ease id 26. opacity 0% → 100%. y 65px → 0px.
- `Hero Text`. class `50d75125-1fc7-1531-856b-f0846199f43c`. duration 0.5s. starts at 0.05s. stagger 0.3s. ease id 26. opacity 0% → 100%. y 120px → 0px.
- `Navbar`. class `5db79913-ce1f-b210-8717-ee76f7ca6cdf`. duration 0.5s. starts at 0.94s. ease id 26. y -100% → 0%.
- `Navbar Links`. class `648be50e-e418-48d7-460f-adf3576a3188`. duration 0.2s. starts at 1.16s. stagger 0.2s. ease id 26. y -100% → 0%.
- `Hero Icons`. class `6a4f1a58-2fdd-8ec7-bd59-4c99c82ee9f3`. duration 1.1s. starts at 0.8s. stagger 0.4s. ease id 26. opacity 0% → 100%. y 50px → 0px. scale 1.

## Responsive behaviour

Only classes that store an override are listed. A width with no entry for a class keeps the base styles. Webflow’s cascade is desktop, then tablet, then mobile landscape, then mobile portrait: a `tiny` override does not apply on tablet.

**Case Study Grid**
- tablet (medium, 991px and below): `grid-template-columns: 1fr 1fr;`
- mobile landscape (small, 767px and below): `display: flex; flex-direction: column; flex-wrap: nowrap;`
- mobile portrait (tiny, 479px and below): `grid-column-gap: 30px; grid-row-gap: 30px;`

**Big TItle**
- mobile landscape (small, 767px and below): `font-size: 40px;`

**About Hero Content**
- mobile portrait (tiny, 479px and below): `justify-content: flex-start; align-items: flex-start; text-align: left;`

**Section Inside**
- mobile portrait (tiny, 479px and below): `grid-column-gap: 30px; grid-row-gap: 30px;`
- tablet (medium, 991px and below): `grid-column-gap: 30px; grid-row-gap: 30px;`
- mobile landscape (small, 767px and below): `grid-column-gap: 12px; grid-row-gap: 12px;`

## Accessibility & robustness

Images in this capture use Webflow reserved alt values (`__wf_reserved_inherit` or `__wf_reserved_decorative`) or have no alt stored on the node. Do not invent descriptive alt text that the capture does not have.

Heading text, in document order:

- `h1` Sustainability wins you can measure

## Full source code

Create this file exactly. Do not reformat it.

### `webflow.json`

```json
{
  "type": "@webflow/XscpData",
  "payload": {
    "nodes": [
      {
        "_id": "e5b6d90b-fb59-7f19-7848-b859a42bf1f2",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d8",
          "dd1f84b8-3d80-ddf1-a40a-1ca96fddd21c"
        ],
        "children": [
          "52cda909-d718-f4fc-0f1a-603d6c2648bd"
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
        "_id": "52cda909-d718-f4fc-0f1a-603d6c2648bd",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d0"
        ],
        "children": [
          "7e71f8fc-d98b-68bf-a6c1-bb39a9fa6a37"
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
        "_id": "7e71f8fc-d98b-68bf-a6c1-bb39a9fa6a37",
        "type": "Block",
        "tag": "div",
        "classes": [
          "3afe05c4-ead2-5155-82fc-8449ca8645dc"
        ],
        "children": [
          "25aede33-4a77-e653-65ab-2d65b44fcfb4",
          "67ce2397-28ec-067a-692c-786b5955372c"
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
        "_id": "25aede33-4a77-e653-65ab-2d65b44fcfb4",
        "type": "Block",
        "tag": "div",
        "classes": [
          "c48cf0d6-9020-2298-1d3a-0038483386f5"
        ],
        "children": [
          "c5b964d9-df3f-1d1b-7612-157d0fc8e35e",
          "429307f7-3c1c-7669-d00d-719ea1dc0c81"
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
        "_id": "c5b964d9-df3f-1d1b-7612-157d0fc8e35e",
        "type": "Block",
        "tag": "div",
        "classes": [
          "0e9e8af5-5f53-bb4b-acbf-0702424c3d0f"
        ],
        "children": [
          "5c015ca4-ef96-e3e6-65e1-b876e4d4bb15"
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
        "_id": "5c015ca4-ef96-e3e6-65e1-b876e4d4bb15",
        "type": "Heading",
        "tag": "h1",
        "classes": [
          "c48cf0d6-9020-2298-1d3a-003848338708"
        ],
        "children": [
          "415c3381-b8b5-2b6d-be08-31629817fc03"
        ],
        "data": {
          "tag": "h1",
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
        "_id": "415c3381-b8b5-2b6d-be08-31629817fc03",
        "text": true,
        "v": "Sustainability wins you can measure"
      },
      {
        "_id": "429307f7-3c1c-7669-d00d-719ea1dc0c81",
        "type": "Block",
        "tag": "div",
        "classes": [
          "c48cf0d6-9020-2298-1d3a-003848338703"
        ],
        "children": [
          "a59b261c-0958-115d-e476-f703ef415fce"
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
        "_id": "a59b261c-0958-115d-e476-f703ef415fce",
        "type": "Block",
        "tag": "div",
        "classes": [
          "0e9e8af5-5f53-bb4b-acbf-0702424c3d0f"
        ],
        "children": [
          "7323c3a1-432f-01a3-8fef-c1d4684db861"
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
        "_id": "7323c3a1-432f-01a3-8fef-c1d4684db861",
        "type": "Paragraph",
        "tag": "p",
        "classes": [
          "620fe35d-59c7-ff43-bfd9-dfbb6ca46721"
        ],
        "children": [
          "7292577e-a31e-dc84-068e-30c6dce1f452"
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
        "_id": "7292577e-a31e-dc84-068e-30c6dce1f452",
        "text": true,
        "v": "From multi-site energy tracking to audit-ready reporting, explore real stories of teams turning ESG work into clear outcomes."
      },
      {
        "_id": "67ce2397-28ec-067a-692c-786b5955372c",
        "type": "DynamoWrapper",
        "tag": "div",
        "classes": [
          "a4396af6-5f7c-1c57-d414-880d41c3e19a"
        ],
        "children": [
          "89e09c91-04bf-da39-ce5f-2b283c4e81a9",
          "a2520408-8d08-58ac-1aec-73f322f6565e"
        ],
        "data": {
          "search": {
            "exclude": true
          },
          "tag": "div",
          "displayName": "",
          "attr": {
            "id": ""
          },
          "xattr": [],
          "visibility": {
            "conditions": [],
            "keepInHtml": {
              "tag": "False",
              "val": {}
            }
          },
          "dyn": {
            "type": "wrapper"
          }
        }
      },
      {
        "_id": "89e09c91-04bf-da39-ce5f-2b283c4e81a9",
        "type": "DynamoList",
        "tag": "div",
        "classes": [
          "d521dbbf-34ff-401a-5ac5-e713615f808d"
        ],
        "children": [
          "103915b4-c872-16c3-8cf8-dfd428596687"
        ],
        "data": {
          "tag": "div",
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
          },
          "dyn": {
            "type": "list"
          }
        }
      },
      {
        "_id": "103915b4-c872-16c3-8cf8-dfd428596687",
        "type": "DynamoItem",
        "tag": "div",
        "classes": [
          "b4d34e5b-73a2-d95f-dd27-0b2ac36e4244",
          "46150027-d510-f7ed-50bc-1b125989fc85"
        ],
        "children": [],
        "data": {
          "dyn": {
            "type": "item",
            "grid": 12
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
          },
          "style": {
            "base": {
              "main": {
                "first-child": {
                  "gridRowEnd": "span 1",
                  "gridRowStart": "span 1",
                  "gridColumnEnd": "span 1",
                  "gridColumnStart": "span 1"
                }
              }
            }
          }
        }
      },
      {
        "_id": "a2520408-8d08-58ac-1aec-73f322f6565e",
        "type": "DynamoEmpty",
        "tag": "div",
        "classes": [],
        "children": [
          "b0ee9373-3d39-016e-9803-2441f8c60f13"
        ],
        "data": {
          "tag": "div",
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
          },
          "dyn": {
            "type": "empty"
          }
        }
      },
      {
        "_id": "b0ee9373-3d39-016e-9803-2441f8c60f13",
        "type": "Block",
        "tag": "div",
        "classes": [],
        "children": [
          "e19319e9-7944-ce9e-c545-99d4c4f3dca9"
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
        "_id": "e19319e9-7944-ce9e-c545-99d4c4f3dca9",
        "text": true,
        "v": "No items found."
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
        "_id": "b4d34e5b-73a2-d95f-dd27-0b2ac36e4244",
        "fake": false,
        "type": "class",
        "name": "Case Study",
        "namespace": "",
        "comb": "",
        "styleLess": "",
        "variants": {},
        "children": [
          "46150027-d510-f7ed-50bc-1b125989fc85"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "d521dbbf-34ff-401a-5ac5-e713615f808d",
        "fake": false,
        "type": "class",
        "name": "Case Study Grid",
        "namespace": "",
        "comb": "",
        "styleLess": "display: grid; grid-auto-columns: 1fr; grid-column-gap: 40px; grid-row-gap: 40px; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto;",
        "variants": {
          "medium": {
            "styleLess": "grid-template-columns: 1fr 1fr;"
          },
          "small": {
            "styleLess": "display: flex; flex-direction: column; flex-wrap: nowrap;"
          },
          "tiny": {
            "styleLess": "grid-column-gap: 30px; grid-row-gap: 30px;"
          }
        },
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
        "_id": "c48cf0d6-9020-2298-1d3a-003848338703",
        "fake": false,
        "type": "class",
        "name": "About Hero Paragraph Holder ",
        "namespace": "",
        "comb": "",
        "styleLess": "max-width: 650px;",
        "variants": {},
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "c48cf0d6-9020-2298-1d3a-003848338708",
        "fake": false,
        "type": "class",
        "name": "Big TItle",
        "namespace": "",
        "comb": "",
        "styleLess": "margin-top: 0px; margin-bottom: 0px; font-size: 60px;",
        "variants": {
          "small": {
            "styleLess": "font-size: 40px;"
          }
        },
        "children": [
          "bc098029-aedc-f3b8-82b3-bf628093f559"
        ],
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
        "_id": "c48cf0d6-9020-2298-1d3a-0038483386f5",
        "fake": false,
        "type": "class",
        "name": "About Hero Content",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; padding-top: 0px; flex-direction: column; justify-content: flex-start; flex-wrap: nowrap; align-items: center; grid-column-gap: 12px; grid-row-gap: 12px; text-align: center;",
        "variants": {
          "tiny": {
            "styleLess": "justify-content: flex-start; align-items: flex-start; text-align: left;"
          }
        },
        "children": [],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "0e9e8af5-5f53-bb4b-acbf-0702424c3d0f",
        "fake": false,
        "type": "class",
        "name": "Animate On Load",
        "namespace": "",
        "comb": "",
        "styleLess": "",
        "variants": {},
        "children": [
          "792c4e18-8c19-2898-d17a-8e4c80844880",
          "01442f19-c45b-bfa3-d613-60f26df9165b",
          "cb778281-88bd-fb22-b345-65682d2ffc02",
          "572f192a-4373-7634-a538-97acdbcd77c4",
          "1e2305f0-e724-806a-de24-63fd9ea299b3",
          "9adaa81d-72ab-1ca9-251f-5b78d11bc9cd",
          "8f9412bc-f839-1ba3-ee24-9fba5d1e2b76",
          "3f19970b-64a6-3d3c-5400-fbf043921085"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      },
      {
        "_id": "46150027-d510-f7ed-50bc-1b125989fc85",
        "fake": false,
        "type": "class",
        "name": "Animate On Load",
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
        "_id": "a4396af6-5f7c-1c57-d414-880d41c3e19a",
        "fake": false,
        "type": "class",
        "name": "Case Study Grid Holder",
        "namespace": "",
        "comb": "",
        "styleLess": "",
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
        "_id": "620fe35d-59c7-ff43-bfd9-dfbb6ca46721",
        "fake": false,
        "type": "class",
        "name": "Paragraph",
        "namespace": "",
        "comb": "",
        "styleLess": "margin-bottom: 0px;",
        "variants": {},
        "children": [
          "f80e19b7-6b89-dc23-710a-e487e664cdfc",
          "e0350ec2-f838-a596-9caa-7231726285e9"
        ],
        "createdBy": "615cc527672e40307e04bd36",
        "origin": null,
        "selector": null
      }
    ],
    "assets": [],
    "ix1": [],
    "ix2": {
      "interactions": [],
      "events": [],
      "actionLists": []
    },
    "ix3": {
      "interactions": [
        {
          "id": "i-ff1fe5ea",
          "version": 17,
          "name": "Fade In On Load",
          "pageId": "69a5e88d484cbf5ba1c535d5",
          "scope": {
            "type": "site"
          },
          "triggers": [
            [
              "wf:load",
              {
                "controlType": "load"
              }
            ]
          ],
          "timelineIds": [
            "t-d1409585"
          ],
          "conditionalPlayback": [],
          "deleted": false
        }
      ],
      "timelines": [
        {
          "id": "t-d1409585",
          "pageId": "69a5e88d484cbf5ba1c535d5",
          "actions": [
            {
              "id": "ta-ab1dca49",
              "name": "Fade In",
              "color": "pink",
              "targets": [
                [
                  "wf:class",
                  [
                    "0e9e8af5-5f53-bb4b-acbf-0702424c3d0f"
                  ],
                  {
                    "relationship": "none",
                    "filterBy": [
                      "wf:class",
                      []
                    ],
                    "firstMatchOnly": false
                  }
                ]
              ],
              "timing": {
                "duration": 0.8,
                "position": 0.3,
                "stagger": {
                  "amount": 0.35
                },
                "ease": 26
              },
              "tt": 2,
              "properties": {
                "wf:transform": {
                  "opacity": [
                    "0%",
                    "100%"
                  ],
                  "x": null,
                  "y": [
                    "65px",
                    "0px"
                  ],
                  "scale": null
                }
              }
            },
            {
              "id": "ta-b113aedb",
              "name": "Hero Text",
              "color": "blue",
              "targets": [
                [
                  "wf:class",
                  [
                    "50d75125-1fc7-1531-856b-f0846199f43c"
                  ],
                  {
                    "relationship": "none",
                    "filterBy": [
                      "wf:class",
                      []
                    ],
                    "firstMatchOnly": false
                  }
                ]
              ],
              "timing": {
                "duration": 0.5,
                "position": 0.05,
                "stagger": {
                  "amount": 0.3
                },
                "ease": 26
              },
              "tt": 2,
              "properties": {
                "wf:transform": {
                  "opacity": [
                    "0%",
                    "100%"
                  ],
                  "x": null,
                  "y": [
                    "120px",
                    "0px"
                  ],
                  "scale": null
                }
              },
              "splitText": {
                "type": "chars"
              }
            },
            {
              "id": "ta-8fca3a8b",
              "name": "Navbar",
              "color": "orange",
              "targets": [
                [
                  "wf:class",
                  [
                    "5db79913-ce1f-b210-8717-ee76f7ca6cdf"
                  ],
                  {
                    "relationship": "none",
                    "filterBy": [
                      "wf:class",
                      []
                    ],
                    "firstMatchOnly": false
                  }
                ]
              ],
              "timing": {
                "duration": 0.5,
                "position": 0.94,
                "ease": 26
              },
              "tt": 2,
              "properties": {
                "wf:transform": {
                  "y": [
                    "-100%",
                    "0%"
                  ]
                },
                "wf:style": {
                  "backgroundColor": [
                    "hsla(0, 0.00%, 100.00%, 0.00)",
                    "hsla(0, 0.00%, 100.00%, 0.00)"
                  ]
                }
              }
            },
            {
              "id": "ta-d029c5ff",
              "name": "Navbar Links",
              "color": "purple",
              "targets": [
                [
                  "wf:class",
                  [
                    "648be50e-e418-48d7-460f-adf3576a3188"
                  ],
                  {
                    "relationship": "none",
                    "filterBy": [
                      "wf:class",
                      []
                    ],
                    "firstMatchOnly": false
                  }
                ]
              ],
              "timing": {
                "duration": 0.2,
                "position": 1.16,
                "stagger": {
                  "amount": 0.2
                },
                "ease": 26
              },
              "tt": 2,
              "properties": {
                "wf:transform": {
                  "opacity": null,
                  "x": null,
                  "y": [
                    "-100%",
                    "0%"
                  ],
                  "scale": null
                }
              }
            },
            {
              "id": "ta-81ae05a3",
              "name": "Hero Icons",
              "color": "pink",
              "targets": [
                [
                  "wf:class",
                  [
                    "6a4f1a58-2fdd-8ec7-bd59-4c99c82ee9f3"
                  ],
                  {
                    "relationship": "none",
                    "filterBy": [
                      "wf:class",
                      [
                        "6a4f1a58-2fdd-8ec7-bd59-4c99c82ee9f3",
                        "fee78aea-5945-beb9-89a7-a1fa8b9d6c69"
                      ]
                    ],
                    "firstMatchOnly": false
                  }
                ]
              ],
              "timing": {
                "duration": 1.1,
                "position": 0.8,
                "stagger": {
                  "amount": 0.4,
                  "ease": 26,
                  "from": "end"
                },
                "ease": 26
              },
              "tt": 2,
              "properties": {
                "wf:transform": {
                  "opacity": [
                    "0%",
                    "100%"
                  ],
                  "x": null,
                  "y": [
                    "50px",
                    "0px"
                  ],
                  "scale": [
                    0,
                    1
                  ]
                }
              }
            }
          ],
          "deleted": false,
          "version": 45
        }
      ]
    }
  },
  "meta": {
    "droppedLinks": 0,
    "dynBindRemovedCount": 0,
    "dynListBindRemovedCount": 1,
    "paginationRemovedCount": 1,
    "universalBindingsRemovedCount": 1,
    "unlinkedSymbolCount": 0,
    "codeComponentsRemovedCount": 0,
    "richTextComponentsStripped": false
  }
}
```

## Assets

This section has no asset records. Do not add images.

## Build / run

The payload is `@webflow/XscpData`. In Webflow Designer it is the clipboard format of a copied section. An agent that can paste that format should paste `webflow.json` unchanged onto a blank page, as the only section, unless the page already has the shared navbar or footer this component belongs to.

`meta.json` in the same folder is the library record (name, category, page, sort order). It is not part of the Designer paste.

## Limitations

- The capture meta records removed bindings: dynListBindRemovedCount 1, paginationRemovedCount 1, universalBindingsRemovedCount 1. Live CMS or component bindings that were stripped are not in `webflow.json`.
- Images and icons resolve from `cdn.prod.website-files.com`. If a URL 404s, that asset is gone; do not substitute a different picture.
- Site-wide body type, color variables, and classes that are not in this payload are not included. Only the classes listed above ship with the paste.
