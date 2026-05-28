---
title: Interactive App Hosting Architecture
---

# Interactive App Hosting

This website repo is the public shell for portfolio pages, project writeups, docs, and hosted static app builds.

Keep interactive app source code in separate repositories. Copy only the finished static build into this website repo.

## Project structure

| Project          | Source repo              | Landing page        | App URL                  |
| ---------------- | ------------------------ | ------------------- | ------------------------ |
| Genomo           | Separate app repo        | `/genomo/`          | `/apps/genomo/`          |
| GeoNode          | Separate app repo        | `/geonode/`         | `/apps/geonode/`         |
| WorldLattice 2D  | Separate app repo        | `/worldlattice-2d/` | `/apps/worldlattice-2d/` |
| HaniJahanWebsite | Website, docs, portfolio | `/`                 | n/a                      |

## What belongs here

Keep this in `HaniJahanWebsite`:

* Portfolio pages
* Blog posts and devlogs
* Project landing pages
* VitePress config and theme files
* Static app builds under `docs/public/apps/<project-name>/`

Do **not** keep full app source code, Unity projects, large raw assets, generated caches, or development dependencies here.

## App hosting paths

Static app builds go here:

```text
docs/public/apps/<project-name>/
```

Public URLs:

```text
/apps/genomo/
/apps/geonode/
/apps/worldlattice-2d/
```

Each app must be built with the matching base path.

Example for WorldLattice 2D:

```ts
export default defineConfig({
  base: "/apps/worldlattice-2d/",
})
```

If the base path is wrong, the app may load as a blank page because JavaScript, CSS, or image assets are requested from the wrong location.

## Manual build process

Use this when updating WorldLattice 2D manually on Windows.

```powershell
cd ..._WorldLattice_2D\worldlattice-2d
npm install
npm run build

cd ..._PuGit_HaniJahanWebsite\HaniJahanWebsite

Remove-Item -Recurse -Force docs/public/apps/worldlattice-2d
New-Item -ItemType Directory -Force docs/public/apps/worldlattice-2d
Copy-Item -Recurse ..._WorldLattice_2D\worldlattice-2d\dist\* docs/public/apps/worldlattice-2d

npm run docs:build
npm run docs:preview
```

Then open:

```text
http://localhost:4173/apps/worldlattice-2d/
```

Do not use `/worldlattice-2d/` for the runnable app. That path is the landing page.

## Automatic build process

Use GitHub Actions when you want the website repo to build and copy the external app automatically.

Basic workflow:

1. Check out `HaniJahanWebsite`.
2. Check out the app repo into `.external/<app-name>`.
3. Install the app dependencies.
4. Build the app with the correct base path.
5. Copy the app `dist/` folder into `docs/public/apps/<project-name>/`.
6. Build the VitePress website.
7. Deploy the final website.

Example target paths:

```text
.external/world-lattice-2d/
docs/public/apps/worldlattice-2d/
```

The app repo owns the app source.
The website repo owns the landing page and hosted static output.

## Local testing

For website pages:

```bash
npm run docs:dev
```

For the closest test to production:

```bash
npm run docs:build
npm run docs:preview
```

Open the app at:

```text
/apps/worldlattice-2d/
```

If the page is blank, check DevTools → Network.

Correct asset paths should look like:

```text
/apps/worldlattice-2d/assets/index-xxxxx.js
```

Wrong paths usually look like:

```text
/assets/index-xxxxx.js
```

That means the app was built with the wrong Vite `base`.
