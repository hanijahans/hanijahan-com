---
title: From Satellite Data to Procedural Terrain
description: Converting satellite imagery and elevation data into structured procedural 3D terrain.
category: Terrain
categoryOrder: 1
order: 1
cover: "/portfolio/geo-data-terrain-mapping-mount-kilimanjaro-z12-02.png"
mediaPreview: "hover"
videoEmbed: ""
---

# 🏔️ From Satellite Data to Procedural Terrain  

A procedural system for reconstructing real-world terrain from geospatial data.
Designed as a reusable pipeline applicable to any real-world terrain dataset.
Transforms messy real-world data into production-ready terrain.

![Mount Kilimanjaro Render](/portfolio/geo-data-terrain-mapping-mount-kilimanjaro-z9-00.png)

## Problem

Raw satellite textures and elevation data contain useful information, but they are rarely production-ready.
Without a structured pipeline, each new location becomes a manual one-off build.

## System Design Focus

This project is less about a single terrain output and more about the system behind it:

- convert raw satellite data into consistent terrain
- preserve geographic identity through processing
- expose controls for non-destructive iteration

## Real-World Reference → Data → System → Result

### 1. Real-World Reference

![Mount Kilimanjaro real-world reference](/portfolio/geo-data-terrain-mount-kilimanjaro.jpg)

*Mount Kilimanjaro — real-world reference used for terrain reconstruction*

### 2. Spatial Context

![Mount Kilimanjaro Google Earth View](/portfolio/geo-data-terrain-mount-kilimanjaro-google-earth.jpg)

*Satellite view showing the full spatial footprint and surrounding terrain context*

![Mount Kilimanjaro Mapbox API](/portfolio/geo-data-terrain-mapping-ui-01.jpg)


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


## System Approach

I designed the workflow as a modular procedural pipeline:

1. Ingest – import elevation + color
2. Normalize – clean and remap heightfield
3. Process – apply procedural terrain operations
4. Control – expose parameters for art direction
5. Validate – compare with real-world reference

## Result

The result is a repeatable terrain-building system that reconstructs real places while staying flexible for creative direction.
**Key Result:** Preserves geographic identity while enabling procedural control.

## Next Direction

This system can be extended into:

- slope / height-based material systems
- erosion simulation and exaggeration
