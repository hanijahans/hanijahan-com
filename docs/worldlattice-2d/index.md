---
title: WorldLattice 2D
description: "Landing page for WorldLattice 2D, the browser-hosted version of the WorldLattice worldbuilding tool."
---

# WorldLattice 2D

WorldLattice 2D is the browser-hosted 2D version of the WorldLattice worldbuilding tool. This website page is the stable landing page for notes, documentation links, and portfolio context; the runnable app is hosted as copied static output.

[Launch WorldLattice 2D](/apps/worldlattice-2d/){.hero-button .primary}

## Hosting plan

The interactive app source should remain in the separate `world-lattice-2d-web` repository. When the app is ready to publish, copy its production `dist/` output into `docs/public/apps/worldlattice-2d/` so it is available at `/apps/worldlattice-2d/`.

For a Vite app, configure the production base path as:

```ts
export default defineConfig({
  base: "/apps/worldlattice-2d/",
})
```

For broader WorldLattice notes, see the [main WorldLattice page](/worldlattice/).
