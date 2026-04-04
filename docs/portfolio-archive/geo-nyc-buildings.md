---
title: New York Buildings
description: 
tags: [Houdini, Geospatial, GIS, GeoJSON, Procedural]
cover: "/portfolio/data-buildings-footprints-newyork-02.png"
category:
  - Portfolio, 5
  - Terrain, 4
  - Geospatial, 4
mediaPreview: "hover"
videoEmbed: ""
---

# Houdini GeoJSON Tool: `From GIS footprints to 3D city blocks`

Custom GeoJSON pipeline built in Houdini (Python), including reprojection logic, attribute handling, and geometry reconstruction.

![Generated NYC buildings preview](/portfolio/data-buildings-footprints-newyork-02.png)

Transforms GeoJSON building data into structured 3D geometry by handling coordinate reprojection, attribute mapping, and geometry reconstruction inside Houdini.

## Data flow

`Raw GeoJSON` → `2D footprint reconstruction` → `attribute-driven 3D extrusion`

## Example source feature (GeoJSON)

```json
{
  "type": "Feature",
  "properties": {
    "heightroof": 29.75,
    "cnstrct_yr": 1925
  },
  "geometry": {
    "type": "MultiPolygon",
    "coordinates": [[[...]]]
  }
}
```

### 2D footprint

![2D building footprint](/portfolio/data-building-footprint-newyork-01.png)

### 3D Generated Buildings

- **`heightroof` → extrusion height:** Procedural extrusion is driven by the `heightroof` attribute when available.

<BeforeAfterSlider
  before-src="/portfolio/data-buildings-footprints-newyork-03.png"
  after-src="/portfolio/data-buildings-footprints-newyork-04.png"
  before-alt="2D footprint"
  after-alt="3D Generated Buildings"
  height="420px"
  :initial="50"
/>

## Dataset reference

- Microsoft US Building Footprints: https://github.com/microsoft/USBuildingFootprints?tab=readme-ov-file