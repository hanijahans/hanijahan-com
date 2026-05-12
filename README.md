# Hani Jahan Website

This repository is the main VitePress website for `hanijahan.com`. It also orchestrates deployment of standalone static apps that live in separate repositories.

## WorldLattice 2D integration architecture

WorldLattice 2D is intentionally **not** part of this repository. It remains an independent standalone app in:

<https://github.com/hanijahans/world-lattice-2d-web>

The production URL for the app is:

<https://hanijahan.com/worldlattice-2d/>


### Why keep separate repositories?

The separate-repo approach keeps responsibilities clear:

- The website can deploy multiple static experiences without becoming a monorepo.
- WorldLattice 2D can be developed, tested, and released as a standalone app.
- GitHub Actions can pin or update the exact app revision used by production.
- Generated app output is produced during deployment and is not committed to this repository.


## Recommended local workflow

### Website-only development

Use this for normal VitePress content and theme work:

```bash
npm run docs:dev
```

`docs:dev` starts the VitePress development server directly from source. It is fast and ideal for website pages, but it does **not** automatically build the separate WorldLattice 2D repository. Static copied assets only appear if `docs/public/worldlattice-2d` already exists from a previous build.


## Build scripts

- `npm run docs:dev` — runs the VitePress development server for website source files.
- `npm run build:worldlattice2d` — installs dependencies in the external app, runs its build, and copies `dist` to `docs/public/worldlattice-2d`.
- `npm run docs:build` — builds the VitePress site.
- `npm run docs:preview` — previews the built VitePress output.
- `npm run build:all` — builds WorldLattice 2D first, then builds VitePress.

## Adding future standalone apps with this pattern

For each new standalone app:

1. Keep the app in its own repository.
2. Choose exactly one canonical production route.
3. Configure the app build base path to match that route.
4. Have GitHub Actions check out the app repository into `.external/<app-name>`.
5. Add a small build script that only installs dependencies, builds the app, validates output, and copies `dist` into `docs/public/<route-name>`.
6. Ignore the generated `docs/public/<route-name>` directory in git.
7. Add only one-way legacy redirects into the canonical route when compatibility is needed.
8. Document the ownership boundary so future changes do not move deployment or git checkout logic into the app repository.
