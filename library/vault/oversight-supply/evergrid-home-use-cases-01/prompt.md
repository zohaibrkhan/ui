<!-- Imported 2026-11-11 from oversight-supply. Licensed material: for use in your own or client projects; do not redistribute. -->

# Evergrid — Home — Use Cases 01

Evergrid — Home — Use Cases 01 is the Use Cases section on the Home page of the Evergrid Webflow template, sort order 7. The headline is “The Industry Use Cases”.

Rebuild this as one section. The element tree, the class CSS, the breakpoint overrides, and the interactions below are taken from the capture. The file in **Full source code** is the Webflow clipboard payload (`@webflow/XscpData`). Create `webflow.json` with those contents exactly. Do not reformat, rename classes, or restyle it. Pasting that payload into Webflow Designer is the section. Rebuilding it in code means following the copy, the classes, and the asset URLs, with the JSON as the source of truth when the prose and the JSON disagree.

## Stack & dependencies

Webflow. There is no React app and no npm install for this section. Layout is Webflow classes. Breakpoints saved on the classes are `main` (desktop), `medium` (tablet, 991px and below), `small` (mobile landscape, 767px and below), and `tiny` (mobile portrait, 479px and below). Motion is Webflow interactions: IX2.

No `font-family` is set on these classes. Type comes from the site styles outside this paste.

## Layout & content

Capture note: H2: "The Industry Use Cases"

Visible copy, first occurrence in document order. A string that is repeated in the tree is listed once here and still appears everywhere the tree shows it.

- `h2` — The Industry Use Cases
- `p` — Velit auctor vestibulum vel in est. Nec commodo tellus eu sed metus erat. Nisl nunc feugiat netus cursus purus hendrerit metus.
- `div` — No items found.

Element tree. Indent is nesting. Class names are the Webflow class names.

```
Block div .Section
  Block div .Section Spacing .No Space Top
    Block div .Container
      Block div .Section Inside
        Block div .Left Title
          Block div .Fade In On Scroll
            Heading h2 .Title
              Text: The Industry Use Cases
          Block div .Fade In On Scroll
            Block div .Feature Paragraph holder
              Paragraph p
                Text: Velit auctor vestibulum vel in est. Nec commodo tellus eu sed metus erat. Nisl nunc feugiat netus cursus purus hendrerit metus.
        DynamoWrapper div .Case Study Grid Holder
          DynamoList div .Case Study Grid
            DynamoItem div .Case Study
          DynamoEmpty div
            Block div
              Text: No items found.
```

Base styles (`main`). Breakpoint overrides are in **Responsive behaviour**, not repeated here.

**Left Title**

```css
display: flex; max-width: 530px; flex-direction: column; justify-content: center; align-items: flex-start; grid-column-gap: 12px; grid-row-gap: 12px; text-align: left;
```

**Case Study**

```css
/* no base declarations */
```

**Section Spacing**

```css
padding-top: 64px; padding-bottom: 64px;
```

**Feature Paragraph holder**

```css
max-width: 80%;
```

**Case Study Grid**

```css
display: grid; grid-auto-columns: 1fr; grid-column-gap: 40px; grid-row-gap: 40px; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto;
```

**Container**

```css
position: relative; z-index: 3; max-width: 1440px; margin-right: auto; margin-left: auto; padding-top: 3em; padding-right: 3em; padding-bottom: 3em; padding-left: 3em;
```

**Section**

```css
/* no base declarations */
```

**No Space Top** (combo `&`)

```css
padding-top: 0px;
```

**Case Study Grid Holder**

```css
/* no base declarations */
```

**Fade In On Scroll**

```css
/* no base declarations */
```

**Section Inside**

```css
display: flex; flex-direction: column; flex-wrap: nowrap; grid-column-gap: 40px; grid-row-gap: 40px;
```

**Title**

```css
margin-top: 0px; margin-bottom: 0px; line-height: 110%; font-weight: 500; letter-spacing: 0.1px;
```

## Interactions & animation timeline

IX2

- IX2 `SCROLL_INTO_VIEW` on `Fade In On Scroll`, scroll offset 10% starts **👁 Fade In On Scroll**. Breakpoints: main, medium, small, tiny.
- IX2 `SCROLL_OUT_OF_VIEW` on `Fade In On Scroll`, scroll offset 0% (no action on this event). Breakpoints: main, medium, small, tiny.
- IX2 `SCROLL_INTO_VIEW` on `(element)`, scroll offset 15% starts **👁 Fade In On Scroll**. Breakpoints: main, medium, small, tiny.
- IX2 `SCROLL_OUT_OF_VIEW` on `(element)`, scroll offset 0% (no action on this event). Breakpoints: main, medium, small, tiny.

**👁 Fade In On Scroll**
1. TRANSFORM_MOVE · 500ms · y 45px · on TRIGGER_ELEMENT; STYLE_FILTER · 500ms · blur 10px · on TRIGGER_ELEMENT; STYLE_OPACITY · 500ms · opacity 0% · on TRIGGER_ELEMENT
2. STYLE_FILTER · 800ms · delay 150ms · outExpo · blur 0px · on TRIGGER_ELEMENT; TRANSFORM_MOVE · 800ms · delay 150ms · outExpo · y 0px · on TRIGGER_ELEMENT; STYLE_OPACITY · 800ms · delay 150ms · outExpo · opacity 100% · on TRIGGER_ELEMENT

## Responsive behaviour

Only classes that store an override are listed. A width with no entry for a class keeps the base styles. Webflow’s cascade is desktop, then tablet, then mobile landscape, then mobile portrait: a `tiny` override does not apply on tablet.

**Left Title**
- mobile landscape (small, 767px and below): `margin-bottom: 0px;`
- tablet (medium, 991px and below): `max-width: 520px; text-align: left;`
- mobile portrait (tiny, 479px and below): `grid-column-gap: 7px; grid-row-gap: 7px;`

**Feature Paragraph holder**
- mobile portrait (tiny, 479px and below): `max-width: 100%;`

**Case Study Grid**
- tablet (medium, 991px and below): `grid-template-columns: 1fr 1fr;`
- mobile landscape (small, 767px and below): `display: flex; flex-direction: column; flex-wrap: nowrap;`
- mobile portrait (tiny, 479px and below): `grid-column-gap: 30px; grid-row-gap: 30px;`

**Section Inside**
- mobile portrait (tiny, 479px and below): `grid-column-gap: 30px; grid-row-gap: 30px;`
- tablet (medium, 991px and below): `grid-column-gap: 30px; grid-row-gap: 30px;`
- mobile landscape (small, 767px and below): `grid-column-gap: 12px; grid-row-gap: 12px;`

**Title**
- mobile landscape (small, 767px and below): `letter-spacing: -2px;`

## Accessibility & robustness

Images in this capture use Webflow reserved alt values (`__wf_reserved_inherit` or `__wf_reserved_decorative`) or have no alt stored on the node. Do not invent descriptive alt text that the capture does not have.

Heading text, in document order:

- `h2` The Industry Use Cases

## Full source code

Create this file exactly. Do not reformat it.

### `webflow.json`

```json
{
  "type": "@webflow/XscpData",
  "payload": {
    "nodes": [
      {
        "_id": "59f49798-57b5-211c-59d5-1cb494204de3",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d8"
        ],
        "children": [
          "427e9e88-f2ac-f30b-b421-1295f7f6d0a2"
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
        "_id": "427e9e88-f2ac-f30b-b421-1295f7f6d0a2",
        "type": "Block",
        "tag": "div",
        "classes": [
          "9d11d053-7cae-47c1-0246-2f9461d3aad6",
          "d9d85a82-f825-11d3-3fe6-b798b1992cd6"
        ],
        "children": [
          "c9abf1ed-0cf6-48e2-3caf-0be54bf8c387"
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
        "_id": "c9abf1ed-0cf6-48e2-3caf-0be54bf8c387",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d0"
        ],
        "children": [
          "d4fa9068-6f89-190f-2afe-5d2cfc090cf2"
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
        "_id": "d4fa9068-6f89-190f-2afe-5d2cfc090cf2",
        "type": "Block",
        "tag": "div",
        "classes": [
          "3afe05c4-ead2-5155-82fc-8449ca8645dc"
        ],
        "children": [
          "e0add333-da26-0754-1547-6e695ea0f674",
          "3a0716d6-5685-caca-49d7-b2347071969a"
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
        "_id": "e0add333-da26-0754-1547-6e695ea0f674",
        "type": "Block",
        "tag": "div",
        "classes": [
          "8c77dc21-4b76-a12b-d522-b25f048f2169"
        ],
        "children": [
          "d8648126-8e1b-5c8d-edc8-6c2c2a020c3c",
          "35abab76-a3fb-d234-ecea-29f8028ddac3"
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
        "_id": "d8648126-8e1b-5c8d-edc8-6c2c2a020c3c",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d2"
        ],
        "children": [
          "6871a07d-6d6c-4b2e-fe49-1c1606735393"
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
        "_id": "6871a07d-6d6c-4b2e-fe49-1c1606735393",
        "type": "Heading",
        "tag": "h2",
        "classes": [
          "302cee7a-e577-a487-8985-db033a6755be"
        ],
        "children": [
          "e5865969-183a-f9cf-ec8a-e7320040b6a1"
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
        "_id": "e5865969-183a-f9cf-ec8a-e7320040b6a1",
        "text": true,
        "v": "The Industry Use Cases"
      },
      {
        "_id": "35abab76-a3fb-d234-ecea-29f8028ddac3",
        "type": "Block",
        "tag": "div",
        "classes": [
          "a4083756-4a2d-f846-9988-48f343c7c9d2"
        ],
        "children": [
          "4adb65bc-3a05-818b-639e-71d9ad3bb283"
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
        "_id": "4adb65bc-3a05-818b-639e-71d9ad3bb283",
        "type": "Block",
        "tag": "div",
        "classes": [
          "8c77dc21-4b76-a12b-d522-b25f048f2168"
        ],
        "children": [
          "5a0aa7f3-dd95-f2da-507c-b0ec47ba4a80"
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
        "_id": "5a0aa7f3-dd95-f2da-507c-b0ec47ba4a80",
        "type": "Paragraph",
        "tag": "p",
        "classes": [],
        "children": [
          "8251c971-ae64-0d60-5651-b8189a77703c"
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
        "_id": "8251c971-ae64-0d60-5651-b8189a77703c",
        "text": true,
        "v": "Velit auctor vestibulum vel in est. Nec commodo tellus eu sed metus erat. Nisl nunc feugiat netus cursus purus hendrerit metus."
      },
      {
        "_id": "3a0716d6-5685-caca-49d7-b2347071969a",
        "type": "DynamoWrapper",
        "tag": "div",
        "classes": [
          "a4396af6-5f7c-1c57-d414-880d41c3e19a"
        ],
        "children": [
          "7e843e0a-7cd5-38bb-406c-36e932624676",
          "7afd4601-8f6d-f3fd-29c3-3eb5d838febd"
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
        "_id": "7e843e0a-7cd5-38bb-406c-36e932624676",
        "type": "DynamoList",
        "tag": "div",
        "classes": [
          "d521dbbf-34ff-401a-5ac5-e713615f808d"
        ],
        "children": [
          "b144515f-c8bd-71c9-e9ad-183c4b1f0ba5"
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
        "_id": "b144515f-c8bd-71c9-e9ad-183c4b1f0ba5",
        "type": "DynamoItem",
        "tag": "div",
        "classes": [
          "b4d34e5b-73a2-d95f-dd27-0b2ac36e4244"
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
          }
        }
      },
      {
        "_id": "7afd4601-8f6d-f3fd-29c3-3eb5d838febd",
        "type": "DynamoEmpty",
        "tag": "div",
        "classes": [],
        "children": [
          "42425363-913e-effe-b4d0-07f14deca48d"
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
        "_id": "42425363-913e-effe-b4d0-07f14deca48d",
        "type": "Block",
        "tag": "div",
        "classes": [],
        "children": [
          "b48da1d4-103b-a67b-c152-355f21d0af1a"
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
        "_id": "b48da1d4-103b-a67b-c152-355f21d0af1a",
        "text": true,
        "v": "No items found."
      }
    ],
    "styles": [
      {
        "_id": "8c77dc21-4b76-a12b-d522-b25f048f2169",
        "fake": false,
        "type": "class",
        "name": "Left Title",
        "namespace": "",
        "comb": "",
        "styleLess": "display: flex; max-width: 530px; flex-direction: column; justify-content: center; align-items: flex-start; grid-column-gap: 12px; grid-row-gap: 12px; text-align: left;",
        "variants": {
          "small": {
            "styleLess": "margin-bottom: 0px;"
          },
          "medium": {
            "styleLess": "max-width: 520px; text-align: left;"
          },
          "tiny": {
            "styleLess": "grid-column-gap: 7px; grid-row-gap: 7px;"
          }
        },
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
        "_id": "8c77dc21-4b76-a12b-d522-b25f048f2168",
        "fake": false,
        "type": "class",
        "name": "Feature Paragraph holder",
        "namespace": "",
        "comb": "",
        "styleLess": "max-width: 80%;",
        "variants": {
          "tiny": {
            "styleLess": "max-width: 100%;"
          }
        },
        "children": [],
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
        "_id": "d9d85a82-f825-11d3-3fe6-b798b1992cd6",
        "fake": false,
        "type": "class",
        "name": "No Space Top",
        "namespace": "",
        "comb": "&",
        "styleLess": "padding-top: 0px;",
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
    "assets": [],
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
          "id": "i-367",
          "interactionTypeId": "SCROLL_INTO_VIEW_INTERACTION",
          "eventIds": [
            "e-717",
            "e-718"
          ],
          "target": "69a5e88d484cbf5ba1c535c7|b144515f-c8bd-71c9-e9ad-183c4b1f0ba5",
          "createdOn": 1770926963452
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
          "id": "e-717",
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
              "autoStopEventId": "e-718"
            }
          },
          "mediaQueries": [
            "main",
            "medium",
            "small",
            "tiny"
          ],
          "target": {
            "id": "69a5e88d484cbf5ba1c535c7|b144515f-c8bd-71c9-e9ad-183c4b1f0ba5",
            "appliesTo": "ELEMENT",
            "styleBlockIds": []
          },
          "targets": [
            {
              "id": "69a5e88d484cbf5ba1c535c7|b144515f-c8bd-71c9-e9ad-183c4b1f0ba5",
              "appliesTo": "ELEMENT",
              "styleBlockIds": []
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
          "createdOn": 1770926963453
        },
        {
          "id": "e-718",
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
            "id": "69a5e88d484cbf5ba1c535c7|b144515f-c8bd-71c9-e9ad-183c4b1f0ba5",
            "appliesTo": "ELEMENT",
            "styleBlockIds": []
          },
          "targets": [
            {
              "id": "69a5e88d484cbf5ba1c535c7|b144515f-c8bd-71c9-e9ad-183c4b1f0ba5",
              "appliesTo": "ELEMENT",
              "styleBlockIds": []
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
          "createdOn": 1770926963454
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
