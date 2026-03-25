---
title: From Satellite Data to Procedural Terrain
description: Converting satellite imagery and elevation data into structured procedural 3D terrain.
category: Terrain
categoryOrder: 1
order: 1
cover: "/portfolio/geo-data-terrain-mapping-ui-01.jpg"
mediaPreview: "hover"
videoEmbed: ""
---

# From Satellite Data to Procedural Terrain


I built this workflow to convert satellite imagery and elevation data into structured 3D terrain.

![Geo-data terrain mapping workflow UI](/portfolio/geo-data-terrain-mapping-ui-01.jpg)

The goal is to preserve real-world geography while still allowing procedural artistic control for look-dev and environment design.

### Pipeline

**input → processing → output**

- **input (satellite):** satellite imagery and terrain/elevation maps
- **processing:** remapping, normalization, and node-based procedural terrain generation
- **output (render):** structured 3D terrain that preserves real-world geography and supports creative control


<BeforeAfterSlider
  before-src="/portfolio/geo-data-terrain-mapping-mount-kilimanjaro-z9-01.png"
  after-src="/portfolio/geo-data-terrain-mapping-mount-kilimanjaro-z9-02.png"
  before-alt="Mount Kilimanjaro satellite terrain before processing (zoom level 9)"
  after-alt="Mount Kilimanjaro procedural terrain after processing (zoom level 9)"
  height="420px"
  :initial="50"
/>

<BeforeAfterSlider
  before-src="/portfolio/geo-data-terrain-mapping-mount-kilimanjaro-z12-01.png"
  after-src="/portfolio/geo-data-terrain-mapping-mount-kilimanjaro-z12-02.png"
  before-alt="Mount Kilimanjaro satellite terrain before processing (zoom level 12)"
  after-alt="Mount Kilimanjaro procedural terrain after processing (zoom level 12)"
  height="420px"
  :initial="50"
/>


## Problem

Raw satellite textures and elevation data are valuable, but they are not immediately production-friendly for procedural terrain pipelines.
I needed a system that could retain recognizable geographic forms while remaining art-directable.

## Approach

I treated the pipeline as a straightforward sequence:

## Tools

- Satellite imagery and elevation datasets
- Procedural node-based terrain workflow
- Render/visualization pass for validation and iteration

## Result

The final output keeps the identity of the original landscape while becoming flexible enough for procedural environment work.

## Next Direction

This dataset can be extended into:

- slope / height-based material systems
- erosion simulation and exaggeration
