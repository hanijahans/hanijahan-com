---
title: Interactive App Hosting Architecture
---

# Interactive App Hosting Architecture

This website repo is the central shell for project presentation, writing, and lightweight static hosting. It should stay focused on public website content rather than becoming a monorepo for every interactive app.

## What belongs in HaniJahanWebsite

Keep these materials in this repository:

- VitePress website configuration, theme files, and navigation.
- Portfolio pages, project writeups, documentation, and normal website pages.
- Blog posts and devlogs.
- Lightweight landing pages for interactive projects.
- Copied production builds for hosted apps under `docs/public/apps/<project-name>/`.

Blog posts and portfolio documents should stay in HaniJahanWebsite so the website remains the canonical presentation layer for the work.

## What belongs in separate app repositories

Interactive app source code should live in separate repositories when the app grows beyond a small website page. Keep source projects such as Vite, React, Vue, Unity WebGL, or other app code out of this website repo unless there is a specific reason to keep a tiny demo inline.

This website may host the finished static output of those apps, but it should not contain their full source trees, development dependencies, generated caches, or heavy build artifacts.

## Hosted app paths

Production builds should be copied into these public directories:

| Project | Hosted URL | Static build directory | Required app base path |
| --- | --- | --- | --- |
| Genomo | `/apps/genomo/` | `docs/public/apps/genomo/` | `/apps/genomo/` |
| GeoNode | `/apps/geonode/` | `docs/public/apps/geonode/` | `/apps/geonode/` |
| WorldLattice 2D | `/apps/worldlattice-2d/` | `docs/public/apps/worldlattice-2d/` | `/apps/worldlattice-2d/` |

Each app's Vite `base` value, router basename, asset paths, and service worker scope should match its hosted path. For example, the Genomo app should build with `/apps/genomo/` as its base path.

## Publishing workflow

1. Develop the interactive app in its own repository.
2. Build the app for production with the correct hosted base path.
3. Remove the previous copied build from `docs/public/apps/<project-name>/` only when replacing it with a new build.
4. Copy the new static build output into `docs/public/apps/<project-name>/`.
5. Keep the matching landing page in this website repo updated with project context, screenshots, documentation links, and launch links.
6. Run the website build before publishing.

Do not commit heavy source trees, Unity project folders, generated caches, or large binary development assets to this website repo. Only commit the lightweight website content and the static app output that must be served publicly.
