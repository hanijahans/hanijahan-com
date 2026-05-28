# Hani Jahan Website

This repository is the main VitePress website for `hanijahan.com`. It is the portfolio shell, docs hub, and hosting surface for polished static builds from standalone apps that live in separate repositories.

## Interactive app hosting architecture

The website should act as the museum / launcher / exhibition building for selected projects. Their larger app source code should stay in independent repositories; this repo owns the landing pages and copied production builds.

The detailed working note lives at [`docs/dev/interactive-app-hosting.md`](docs/dev/interactive-app-hosting.md).


## Recommended local workflow

### Production-like verification

`docs:dev` is not a true production simulation. Assets can behave differently in dev than they do in the built site, so the real local test is:

```bash
npm run docs:build
npm run docs:preview
```

## Build scripts

- `npm run docs:dev` — runs the VitePress development server for website source files.
- `npm run build:worldlattice2d` — installs dependencies in the external app, runs its build, and copies `dist` to `docs/public/apps/worldlattice-2d`.
- `npm run docs:build` — builds the VitePress site.
- `npm run docs:preview` — previews the built VitePress output.
- `npm run build:all` — builds WorldLattice 2D first, then builds VitePress.

