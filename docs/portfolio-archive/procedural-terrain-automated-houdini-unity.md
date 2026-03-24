---
title: Mapbox On-Demand Terrain Streaming
description: Streams, assembles, and geo-aligns terrain tiles on demand for rapid world-building
category: Geospatial
categoryOrder: 1
order: 1
cover: "/portfolio/geo-data-terrain-automated-houdini-unity-01.png"
mediaPreview: "hover"
videoEmbed: "https://www.youtube.com/embed/Ez4Oh8gTc3U?autoplay=1&mute=1&loop=1&playlist=GBCFRYMkSrY&rel=0"
---

# Mapbox On-Demand Terrain Streaming

I built this workflow to turn real-world map data into terrain sectors in Unity, with a focus on speed, geospatial accuracy, and iterative world-building.

<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/Ez4Oh8gTc3U"
  title="On-Demand Terrain Streaming Demo"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

---

## Problem

Large terrains are expensive to author and load manually. I needed a way to:

- Pick any location in the world.
- Preview and inspect tile boundaries interactively.
- Download synchronized color + elevation sources.
- Convert that data into optimized geometry for simulation use.

Doing this by hand was too slow and error-prone when building many sectors.

## Approach

I created a Unity Editor tool that behaves like an interactive GIS panel inside the engine:

Mapbox tool → automated DEM download → Houdini → terrain generation → Unity / Unreal Terrain

- **Interactive map navigation:** pan, zoom, and click to get precise latitude/longitude + tile IDs.
- **Tile intelligence:** 3x3 neighbor lookup, cache management, and parent/child tile fallback while streaming.
- **Download pipeline:** one-click export of satellite color + Terrain-RGB elevation tiles, plus metadata (`meta.json`) with scale and geo-reference.
- **Data handoff:** exported raster data is passed into a **Houdini HDA workflow** that converts height data into clean terrain geometry for downstream use in Unity.

This reduced world-building setup from a manual multi-tool process to a repeatable editor-driven pipeline.

## Tools

- **Unity EditorWindow (C#):** custom interface, request queueing, tile cache, click-marker UX.
- **Mapbox tiles:** hybrid map rendering and terrain source acquisition.
- **UnityWebRequest:** asynchronous tile fetching and concurrent download management.
- **Houdini Digital Asset (HDA):** converts downloaded terrain maps into production-ready geometry.
- **JSON metadata export:** preserves geo alignment and scale for deterministic reconstruction.

## Result

- Faster sector creation for large environments.
- Consistent geo-referenced outputs between map selection and generated terrain.
- Better iteration speed for simulation terrain prototyping.
- A reusable workflow that can scale from single-tile tests to multi-sector world expansion.
