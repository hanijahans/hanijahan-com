---
title: New York Buildings
description: 
category: Geospatial
order: 4
cover: "/portfolio/data-buildings-footprints-newyork-02.png"
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

## Dataset reference

- Microsoft US Building Footprints: https://github.com/microsoft/USBuildingFootprints?tab=readme-ov-file