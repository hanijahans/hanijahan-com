---
title: Genomo
---

# Genomo

Genomo is the narrative storyworld side of this site: a public landing page for map-based exploration of characters, locations, permits, restricted transfers, and hidden archive data. The website keeps the human-readable project context here while the actual interactive map can be developed in a separate app repository.

[Launch the Interactive Map](/apps/genomo/){.hero-button .primary}

## Hosting plan

The Genomo map source should live in `genomo` when it grows beyond a small page experiment. Build that app as static files, then copy its `dist/` output into `docs/public/apps/genomo/` so it is served from `/apps/genomo/`.

For a Vite app, configure the production base path as:

```ts
export default defineConfig({
  base: "/apps/genomo/",
})
```

Keep large Genomo images optimized for the web: prefer WebP or AVIF, use thumbnails in the map, lazy-load archive images, and open full-size art only when the user asks for it.
