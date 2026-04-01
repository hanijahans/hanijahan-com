---
title: New York Buildings
description: 
category: Geospatial
order: 4
cover: "/portfolio/data-buildings-footprints-newyork-02.png"
mediaPreview: "hover"
videoEmbed: ""
---

# Houdini Geojson Tool: Convert data to 3D models

Custom GeoJSON pipeline built in Houdini (Python), including reprojection logic, attribute handling, and geometry reconstruction.

![Preview](/portfolio/data-buildings-footprints-newyork-02.png)

Transforms GeoJSON building data into structured 3D geometry by handling coordinate reprojection, attribute mapping, and geometry reconstruction inside Houdini.

[Raw GeoJSON snippet] → [2D footprint view] → [3D generated buildings]

### Raw Data (GeoJSON)

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
![Preview](/portfolio/data-building-footprint-newyork-01.png)


Data building footprint  
https://github.com/microsoft/USBuildingFootprints?tab=readme-ov-file