---
title: Houdini - Game Engine Workflow
description: 
tags: []
cover: "/portfolio/geo-data-terrain-automated-houdini-unity-01.png"
category:
mediaPreview: ""
videoEmbed: ""
---

<!-- // Remove later -->  
Shows:
- Learn existing tools and workflows in Houdini (mapbox and heightfield)
- A demonstrated passion for procedural processes and tools
- Fluency in using Houdini for creating tools/HDAs
- Experience using a game engine such as Unreal, Unity, or Godot
- Basic knowledge of VEX and Python  

---

# Houdini - Game Engine Workflow

A Unity-side geographic selection and data-acquisition layer that feeds Houdini terrain generation.  

separate high-level intent from low-level generation
separating intention from execution complexity.

I built the Unity editor side as the location-selection and data-acquisition layer, then used Houdini as the procedural reconstruction layer.

empower the artist by letting them define the macro rules (via simple viewport guides like proxy cones) while the technical system handles the micro details (erosion, blending, scattering) underneath.

real-world map data → Unity editor UX → tile/color/elevation acquisition → metadata → Houdini HDA terrain generation → Unity/Unreal output

<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/Ez4Oh8gTc3U"
  title="On-Demand Terrain Streaming Demo"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

## Problem
Terrain generation often starts with too much manual setup.

Artists or designers may need to jump between map websites, tile coordinates, elevation sources, file downloads, and Houdini import steps before they can even begin building terrain. That friction makes real-world terrain workflows slower, harder to debug, and less accessible to non-technical users.

The goal for this project was to make location-based terrain generation more artist-friendly:

- Pick a real-world location visually.
- Download synchronized color and elevation data.
- Preserve scale and geo-reference metadata.
- Send the data into Houdini for procedural terrain generation.
- Bring the result back into Unity or Unreal for real-time use.

## Approach

I built a custom Unity Editor map tool that acts as the front-end selection layer for a Houdini terrain pipeline.

The workflow is:

**Unity map selector → map/elevation tile download → metadata export → Houdini HDA → generated terrain → Unity / Unreal**

Inside Unity, the tool provides an interactive GIS-style panel directly in the editor. The user can pan, zoom, click a location, inspect latitude/longitude, get tile IDs, view neighboring tiles, and download the required map sources for terrain generation.

<img src="/portfolio/unity-terrain-mapbox-editor-01.png" style="width:50%; height:auto;">
image: GIS-style panel UI/UX

I tested the workflow with multiple map providers:

- **Mapbox / OpenStreetMap:** interactive preview, satellite color download, Terrain-RGB elevation download, and metadata export.
- **Esri:** imagery and elevation tile download using ArcGIS tile services.
- **Cesium:** endpoint-based tile loading prototype for testing provider abstraction and asset-driven map sources.

This makes the Unity side more than a preview window. It becomes a controlled data-acquisition layer for Houdini.

<img src="/portfolio/unity-terrain-data-01.png" style="width:100%; height:auto;">
image: data has been downloaded

meta.json file is the bridge between the map-selection stage and the Houdini reconstruction stage

```
{
            "sector": "Sector_01",
            "timestamp": "2026-03-06 17:20:41",
            "geo": {
                "lat": 50.7646067735562,
                "lon": -125.744293271564,
                "zoom": 9
            },
            "dimensions": {
                "widthMeters": 99014.7,
                "heightMeters": 99014.7,
                "metersPerPixel": 193.3881,
                "elevationMultiplier": 0.1
            },
            "mapping": {
                "tileX": 77,
                "tileY": 171
            }
        }
```

“This terrain came from THIS exact location, THIS exact zoom level, THIS exact tile, and THIS exact real-world scale.”

Without this file, your Houdini terrain generation becomes partially blind.

Here’s what each part actually does:

1. Sector Identity
"sector": "Sector_01"

This is just the logical name of the downloaded terrain chunk.

Useful for:

organizing streamed terrain sectors
saving/loading regions
procedural world partitioning
batching exports
2. Timestamp
"timestamp": "2026-03-06 17:20:41"

Tracks when the data was generated.

Useful for:

cache validation
debugging outdated terrain
regeneration/versioning
pipeline reproducibility

Very production-style thing to include actually.

3. Geo Coordinates
"geo": {
    "lat": 50.7646067735562,
    "lon": -125.744293271564,
    "zoom": 9
}

This is the most important conceptual part.

This tells Houdini:

WHERE on Earth the terrain came from
HOW zoomed-in the map source was

The zoom level changes:

terrain resolution
meters-per-pixel
terrain size
detail density

Higher zoom:

smaller area
more detail

Lower zoom:

huge area
less detail

This means your terrain generation is not arbitrary anymore.
It becomes:

geo-referenced
reproducible
deterministic

That’s a big workflow improvement.

4. Real-World Scale Data
"dimensions": {
    "widthMeters": 99014.7,
    "heightMeters": 99014.7,
    "metersPerPixel": 193.3881,
    "elevationMultiplier": 0.1
}

This section is extremely important.

It converts image pixels into real-world scale.

metersPerPixel
"metersPerPixel": 193.3881

Means:

Each pixel in the downloaded heightmap represents ~193 meters in the real world.

So if your image is 512 pixels wide:

512×193.3881≈99014.7

That gives your terrain width.

Without this:

terrain scale becomes fake/random
physics breaks
gameplay scale breaks
simulations become inconsistent

This metadata prevents that.

widthMeters / heightMeters
"widthMeters": 99014.7

This tells Houdini:

“Scale this terrain chunk to about 99km wide.”

That means:

erosion sims can use proper scale
scattering systems become more believable
gameplay distances make sense
terrain streaming can align properly
elevationMultiplier
"elevationMultiplier": 0.1

This is probably your vertical scaling factor.

Terrain RGB heightmaps usually encode height values into color channels.

You need a multiplier to convert those values into usable elevation ranges.

Something like:

height = rgbHeight * elevationMultiplier

Without it:

mountains could become tiny
OR
absurdly huge
5. Tile Mapping
"mapping": {
    "tileX": 77,
    "tileY": 171
}

This identifies the exact map tile.

This matters because map systems work using tile grids.

Useful for:

neighbor stitching
terrain streaming
loading adjacent sectors
deterministic reconstruction
cache systems

You already exposed neighbor logic in your editor scripts too.

That actually makes this feel more like a scalable terrain system rather than “download image → make terrain.”

## Unity Editor Tool Features

- **Interactive map navigation:** pan, zoom, and click to select a precise real-world location.
- **Coordinate extraction:** converts screen clicks into latitude/longitude and tile coordinates.
- **Tile inspection:** displays selected tile ID and 3x3 neighboring tiles for terrain-sector planning.
- **Provider testing:** supports Mapbox/OpenStreetMap, Esri, and Cesium-style tile sources.
- **Asynchronous tile loading:** queues and caches map tile requests to keep the editor responsive.
- **Fallback tile display:** uses parent/child tile fallback where possible while high-resolution tiles load.
- **One-click data download:** exports color and elevation sources for the selected location.
- **Metadata export:** writes geo-reference data such as latitude, longitude, zoom level, tile ID, meters-per-pixel, and terrain scale.
- **Houdini handoff:** prepares downloaded raster data so a Houdini HDA can reconstruct terrain consistently.

---

## Houdini Workflow

The downloaded data is passed into a Houdini Digital Asset that converts elevation imagery into terrain geometry.

The HDA uses the exported metadata to preserve scale and alignment, then processes the height source into geometry that can be used for simulation, layout, or real-time environment prototyping.

This separates the workflow into two clear layers:

- **Unity:** location selection, UX, tile preview, download, and metadata.
- **Houdini:** procedural terrain generation, geometry processing, optimization, and output.

That separation makes the workflow easier to debug and easier to extend.

<img src="/portfolio/unity-terrain-houdini-01.png" style="width:50%; height:auto;">
image: HDA parameters

<img src="/portfolio/unity-terrain-houdini-02.png" style="width:50%; height:auto;">
image: network

<img src="/portfolio/unity-terrain-houdini-03.png" style="width:50%; height:auto;">

image: attribute from houdini to Unity  
unity_hf_terrainlayer_file  
unity_hf_texture_diffuse  
unity_hf_tile_size (from Python scale)  


Houdini Python node  
```
import json
import os

node = hou.pwd()
geo = node.geometry()

# 1. Correct way to read a parameter in a Python SOP
# Assuming your parameter name is "json_file"
raw_path = node.evalParm("json_file")
path = hou.text.expandString(raw_path)

# 2. Add a safety check to prevent Houdini from crashing if the path is empty/wrong
if os.path.exists(path) and os.path.isfile(path):
    with open(path, 'r') as f:
        data = json.load(f)

    # 3. Access the nested dimensions dictionary
    dims = data.get('dimensions', {})
    
    # Store values as Detail Attributes
    # Using float() ensures they are stored as floating point numbers in VEX
    geo.addAttrib(hou.attribType.Global, "widthMeters", float(dims.get('widthMeters', 0)))
    geo.addAttrib(hou.attribType.Global, "metersPerPixel", float(dims.get('metersPerPixel', 0)))
    
else:
    # Optional: print a warning to the Houdini console
    print(f"Warning: JSON file not found at {path}")

```

---

## Why This Matters

This project is about reducing the friction between real-world data and procedural worldbuilding.

Instead of asking the user to manually find tile coordinates, download files, organize sources, and remember scale values, the tool captures the location context and prepares the data automatically.

For a technical artist, the important part is not just that the tool downloads maps. The important part is that it turns a messy multi-step workflow into a repeatable pipeline that connects engine-side interaction with Houdini-side procedural generation.

---

## Tools

- **Unity EditorWindow / C#:** custom editor interface, map interaction, click selection, tile preview, and download controls.
- **UnityWebRequest:** asynchronous map tile loading and file download management.
- **Mapbox / OpenStreetMap:** map preview, satellite imagery, and Terrain-RGB elevation source.
- **Esri ArcGIS services:** imagery and elevation tile source testing.
- **Cesium ion prototype:** endpoint-driven tile-source experiment.
- **Houdini Digital Asset:** converts downloaded elevation and map sources into terrain geometry.
- **JSON metadata:** preserves tile ID, geo-reference, meters-per-pixel, scale, and reconstruction data.

---

## Result

- Faster setup for real-world terrain sectors.
- More artist-friendly location selection directly inside Unity.
- Consistent handoff between selected map location and Houdini terrain generation.
- Reduced manual file organization and coordinate lookup.
- Reusable pipeline that can scale from single-tile tests to larger terrain-sector workflows.
- Clearer bridge between procedural Houdini tools and real-time engine production.

---

## What I Learned

This project helped me think more clearly about where a tool should live in a pipeline.

Not every procedural workflow needs to start inside Houdini. Sometimes the best user-facing control belongs in the game engine, especially when the user needs to select, preview, or validate something spatially.

The Houdini side can then focus on what it does best: procedural reconstruction, terrain processing, and controlled generation.

This is the kind of workflow I am most interested in: tools that connect artist intent, real-world data, and procedural systems in a way that is easier to understand and iterate on.

