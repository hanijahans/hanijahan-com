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

# 🏔️ From Satellite Data to Procedural Terrain  
Bridging real-world geospatial data and art-directable terrain systems.

## Real-World Reference → Data → System → Result

### 1. Real-World Reference

![Mount Kilimanjaro real-world reference](/portfolio/geo-data-terrain-mount-kilimanjaro.jpg)

*Mount Kilimanjaro — real-world reference used for terrain reconstruction*

### 2. Spatial Context (Google Earth)

![Mount Kilimanjaro Google Earth context](/portfolio/geo-data-terrain-mount-kilimanjaro-google-earth.jpg)

*Satellite view showing the full spatial footprint and surrounding terrain context*

### 3. Raw Data Inputs

| Height map | Color (albedo) map |
| --- | --- |
| ![Mount Kilimanjaro height map input](/portfolio/geo-data-terrain-mount-kilimanjaro-maps-height.png) | ![Mount Kilimanjaro color albedo map input](/portfolio/geo-data-terrain-mount-kilimanjaro-maps-color.png) |

*Raw satellite-derived data used as input (elevation + color)*

<sub>elevation = heightfield</sub>  
<sub>color = surface reference</sub>

### 4. Procedural System (Houdini)

![Mount Kilimanjaro Houdini node network](/portfolio/geo-data-terrain-mount-kilimanjaro-houdini-network.png)

*Procedural pipeline for terrain reconstruction and processing*

### 5. Final Output

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

*Final generated terrain inside the procedural system*

This system converts real-world geospatial data into a controllable terrain inside Houdini.

**Pipeline:**

- Import satellite height and color data
- Process elevation into a usable heightfield
- Apply filtering and shaping operations
- Generate terrain with adjustable parameters

The system allows reconstruction of real locations while maintaining procedural control.

### Pipeline

**input → processing → output**

- **input (satellite):** satellite imagery and terrain/elevation maps
- **processing:** remapping, normalization, and node-based procedural terrain generation
- **output (render):** structured 3D terrain that preserves real-world geography and supports creative control


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