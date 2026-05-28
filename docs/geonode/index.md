---
title: GeoNode
---

# GeoNode

GeoNode is an interactive node-based lab for experimenting with procedural data workflows, visual networks, and geospatial thinking.

[Launch GeoNode](/apps/geonode/){.hero-button .primary}

## Hosting plan

The GeoNode source should live in a separate `geonode` app repository, especially if it gains complex state, graph serialization, save/load, WebGL, or backend needs. Build the app as static files and copy its `dist/` output into `docs/public/apps/geonode/` so it is served from `/apps/geonode/`.

For a Vite app, configure the production base path as:

```ts
export default defineConfig({
  base: "/apps/geonode/",
})
```
