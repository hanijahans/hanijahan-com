---
title: Procedural Terrain System
description: Node-based terrain generation with slope-aware masks, settlement flattening, and art-directable controls.
category: Terrain
order: 1
tags: [Houdini, Procedural, Terrain]
cover: "/portfolio/procedural-land-02-8-final.png"
mediaPreview: "hover"
videoEmbed: ""
---

# Procedural Terrain System

A reusable terrain-authoring setup in Houdini for quickly building believable environments while keeping strong artistic control.

<BeforeAfterSlider
  before-src="/portfolio/procedural-land-02-1-heightmap.png"
  after-src="/portfolio/procedural-land-02-8-final.png"
  before-alt="Initial tree distribution mask"
  after-alt="Refined tree distribution mask"
  height="360px"
  :initial="45"
/>

## Problem

Manually sculpting each environment was slow and inconsistent. The key production issues were:

- Rebuilding similar terrain structures from scratch for each level.
- Keeping road, settlement, and playable-area surfaces readable.
- Distributing vegetation and props in a way that respected terrain slope.

## Approach

I built a modular heightfield workflow in Houdini with a clear processing order:

1. **Base Heightfield** – establish macro landforms and overall silhouette.
2. **Derived Masks** – generate slope, river, and vegetation masks from terrain attributes.
3. **Settlement Flattening** – carve and level specific gameplay/readability zones.
4. **Art-Direction Pass** – expose tunable parameters for quick non-destructive iteration.

This structure makes it easy to iterate globally while still allowing local overrides when needed.

## Terrain Build Breakdown

![Terrain heightmap stage](/portfolio/procedural-land-02-1-heightmap.png)
Primary elevation definition that drives downstream masks and procedural operations.

![Terrain slopemap stage](/portfolio/procedural-land-02-2-slopemap.png)
Slope-based mask used to control where vegetation, props, and traversal-friendly surfaces should appear.

![Terrain rivermask stage](/portfolio/procedural-land-02-3-rivermask.png)
Hydrology mask used to shape drainage lines and protect water-adjacent terrain behavior.

<BeforeAfterSlider
  before-src="/portfolio/procedural-land-02-4-treemask.png"
  after-src="/portfolio/procedural-land-02-5-treemask.png"
  before-alt="Initial tree distribution mask"
  after-alt="Refined tree distribution mask"
  height="360px"
  :initial="45"
/>
Vegetation Mask - Before/after refinement for cleaner biome boundaries and more natural vegetation clustering.

<BeforeAfterSlider
  before-src="/portfolio/procedural-land-02-6-settlement.png"
  after-src="/portfolio/procedural-land-02-8-final.png"
  before-alt="Terrain before final settlement and polish"
  after-alt="Final terrain with settlement integration"
  height="420px"
  :initial="50"
/>
Settlement - Final pass combines flattening, mask-driven scattering, and composition polish.

## Tools

- **Houdini** (HeightField workflow and procedural controls)

## Result

The system substantially improved environment iteration speed and consistency across scenes:

- Faster setup for new terrain variants.
- More predictable art direction outcomes.
- Cleaner, rule-driven distribution of vegetation and props.
- Better readability around settlements and gameplay-critical areas.
