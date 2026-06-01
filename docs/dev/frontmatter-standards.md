---
title: Frontmatter Standards
description: "Developer reference for required and recommended Markdown frontmatter fields across the website."
---

# Frontmatter Standards

Use frontmatter on every Markdown route page to keep page metadata, archive cards, and listing pages consistent. Run the audit before publishing:

```bash
npm run audit:frontmatter
```

The audit checks Markdown route pages under `docs/` for missing, empty, or placeholder `title` and `description` values. It skips `docs/public/`, which is reserved for static public assets.

## Normal pages

Normal pages are standard documentation, landing, contact, product, or project pages that are not portfolio archive entries or blog posts.

Required fields:

* `title` — the page title used by VitePress metadata, browser tabs, and page/listing context. Use a clear human-readable title. If a page intentionally hides the visible title through layout behavior, it should still provide meaningful metadata unless there is a specific VitePress layout exception.
* `description` — a concise page summary for SEO, social previews, and internal metadata. Prefer one complete sentence that explains what the page contains.

Example:

```yaml
---
title: Contact
description: "Contact information and links for reaching Hani Jahan about technical art, procedural systems, and portfolio work."
---
```

## Portfolio archive pages

Portfolio archive pages live under `docs/portfolio-archive/` and provide project metadata for portfolio cards, category pages, and project detail pages.

Recommended fields:

* `title` — project title shown on the detail page and cards.
* `description` — primary project summary. Use this for SEO and as the default card/listing description.
* `shortDescription` — optional shorter card text when the archive card should differ from the full `description`.
* `tags` — project technologies, disciplines, and topics used for context and filtering-style displays.
* `cover` — primary image path for portfolio cards and previews.
* `category` — one or more portfolio category placements. Keep the existing list format of category name plus ordering number.
* `mediaPreview` / `videoEmbed` — include when a card or page has hover media, embedded video, or another media preview mode. Leave blank only when the project intentionally has no media preview.

Example:

```yaml
---
title: Wave Function Collapse
description: "Custom Houdini Wave Function Collapse experiments using overlapping models to generate procedural patterns and structures."
shortDescription: Procedural tile-based generation experiments
tags: [Houdini, Algorithmic, WFC, Procedural]
cover: "/portfolio/wfc-01.png"
category:
  - Algorithmic, 3
mediaPreview: "hover"
videoEmbed: "https://www.youtube.com/embed/example-id?autoplay=1&mute=1&loop=1&playlist=example-id&rel=0"
---
```

## Blog posts

Blog posts live under `docs/blog/` and should include enough metadata for chronological archives, tag displays, and preview cards.

Recommended fields:

* `title` — full post title.
* `description` — concise SEO and preview description.
* `date` — publication date in `YYYY-MM-DD` format.
* `tags` — topics, tools, series keywords, or disciplines associated with the post.
* `summary` — optional listing-page summary when a blog listing should use text that differs from `description`.

Example:

```yaml
---
title: WorldLattice Devlog 01 — Building a World-Building Tool
description: "How WorldLattice began as a modular, constraint-based world generation tool for faster Unity worldbuilding."
date: 2025-10-16
tags:
  - worldbuilding
  - devlog
  - worldlattice
  - unity
summary: "The first WorldLattice devlog, covering the tool's origin and early procedural worldbuilding goals."
---
```
