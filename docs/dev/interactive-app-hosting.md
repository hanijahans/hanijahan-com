---
title: Interactive App Hosting Architecture
---

# Interactive App Hosting Architecture

This website repo is the central shell for project presentation, writing, and lightweight static hosting. Treat it as the museum, launcher, and exhibition building for polished projects, not the messy workshop where every large app is built.

## Recommended project split

| Project | Recommended source repo strategy | Hosted under this website? | Landing page | Static app URL |
| --- | --- | --- | --- | --- |
| Genomo interactive map | Separate app repo once it becomes complex | Yes | `/genomo/` | `/apps/genomo/` |
| GeoNode | Definitely separate app repo | Yes | `/geonode/` | `/apps/geonode/` |
| WorldLattice 2D | Separate app repo | Yes | `/worldlattice-2d/` | `/apps/worldlattice-2d/` |
| HaniJahanWebsite | Portfolio shell, docs, landing pages | Yes | `/` | n/a |

The umbrella identity is intentional: procedural worlds, narrative systems, and interactive tools. The website makes the projects feel connected while separate app repositories keep each engine maintainable.

## What belongs in HaniJahanWebsite

Keep these materials in this repository:

- VitePress website configuration, theme files, and navigation.
- Portfolio pages, project writeups, documentation, and normal website pages.
- Blog posts and devlogs.
- Lightweight landing pages for interactive projects.
- Copied production builds for hosted apps under `docs/public/apps/<project-name>/`.
- Small placeholder `index.html` files when an app build has not been copied yet.

Blog posts and portfolio documents should stay in HaniJahanWebsite so the website remains the canonical presentation layer for the work.

## What belongs in separate app repositories

Interactive app source code should live in separate repositories when the app grows beyond a small website page. Keep source projects such as Vite, React, Vue, Unity WebGL, or other app code out of this website repo unless there is a specific reason to keep a tiny demo inline.

Recommended source repositories:

```text
hanijahans/HaniJahanWebsite        # VitePress shell
hanijahans/genomo                  # React/Vite or map app
hanijahans/geonode                 # React/Vite/node graph app
hanijahans/world-lattice-2d-web    # React/Vite app
```

This website may host the finished static output of those apps, but it should not contain their full source trees, development dependencies, generated caches, or heavy build artifacts.

## Hosted app paths

Production builds should be copied into these public directories:

| Project | Static build directory | Required app base path | Public URL |
| --- | --- | --- | --- |
| Genomo | `docs/public/apps/genomo/` | `/apps/genomo/` | `https://hanijahan.com/apps/genomo/` |
| GeoNode | `docs/public/apps/geonode/` | `/apps/geonode/` | `https://hanijahan.com/apps/geonode/` |
| WorldLattice 2D | `docs/public/apps/worldlattice-2d/` | `/apps/worldlattice-2d/` | `https://hanijahan.com/apps/worldlattice-2d/` |

Each app's Vite `base` value, router basename, asset paths, and service worker scope should match its hosted path.

```ts
// genomo/vite.config.ts
export default defineConfig({
  base: "/apps/genomo/",
})

// geonode/vite.config.ts
export default defineConfig({
  base: "/apps/geonode/",
})

// world-lattice-2d-web/vite.config.ts
export default defineConfig({
  base: "/apps/worldlattice-2d/",
})
```

If the base path is wrong, the app can load as a blank page because scripts, CSS, image assets, or service worker files are requested from the wrong URL.

## Landing pages

Use clean, human-readable VitePress landing pages for people and portfolio review:

- `/genomo/`
- `/geonode/`
- `/worldlattice-2d/`

Each page should explain the project in plain language and provide a prominent launch button to the static app path under `/apps/`.

## Publishing workflow

1. Develop the interactive app in its own repository.
2. Build the app for production with the correct hosted base path.
3. Remove the previous copied build from `docs/public/apps/<project-name>/` only when replacing it with a new build.
4. Copy the new static build output into `docs/public/apps/<project-name>/`.
5. Keep the matching landing page in this website repo updated with project context, screenshots, documentation links, and launch links.
6. Run the website build before publishing.

Do not commit heavy source trees, Unity project folders, generated caches, or large binary development assets to this website repo. Only commit the lightweight website content and the static app output that must be served publicly.

## Genomo image rules

For Genomo especially, do not publish raw giant source images directly into the interactive map.

- Convert most large artwork or map imagery to WebP or AVIF.
- Use JPEG only when needed and PNG mainly for transparency or UI assets.
- Resize large source images into practical web sizes, often around 1600–2400 px wide for detailed viewing.
- Load thumbnails first and open full images only after the user clicks a node.
- Use lazy image loading and async decoding in app UI.

```html
<img src="/path/to/image.webp" loading="lazy" decoding="async" alt="" />
```

This keeps the Genomo from becoming slow, memory-heavy, and painful to review.
