---
title: Houdini - Unity Terrain Streaming
description: Built a Unity-to-Houdini terrain streaming workflow that captures geospatial data, packages metadata, and reconstructs terrain procedurally for real-time engines.
tags: [houdini, unity, mapbox, tools, procedural]
cover: "/portfolio/geo-data-terrain-automated-houdini-unity-01.png"
category:
mediaPreview: ""
videoEmbed: ""
---

<!-- 
- Learn existing tools and workflows in Houdini (mapbox and heightfield)
- A demonstrated passion for procedural processes and tools
- Fluency in using Houdini for creating tools/HDAs
- Experience using a game engine such as Unreal, Unity, or Godot
- Basic knowledge of VEX and Python   
-->

# Houdini - Unity Terrain Streaming

Procedural terrain workflow that separates designer-controlled geographic layout from automated terrain reconstruction using metadata-driven generation.

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

## 

Designed a Unity Editor map tool that captures tile data, geo metadata, and terrain scale inputs for Houdini-driven generation.
- **Learn existing tools and workflows in Houdini:** I learned mapbox node (before beome discontinued) - the whole thing inspired by that node, heightfield nodes, HDA creation, Houdini engine
- **Identify, document, and develop tools/workflows:** this document
- **Build demo projects:** Delivered a full demo pipeline from map selection to generated terrain output in real-time engines.
- **Procedural mindset:** the whole project
- **Engine experience:** Implemented and tested directly in Unity, with output prepared for Unity/Unreal runtime contexts.
- **Technical scripting foundation:** Structured metadata bridges and pipeline logic with a Python/VEX-friendly HDA integration mindset.

## Problem
Core Idea

Most real-world terrain workflows are fragmented across map tools, manual downloads, coordinate conversion, and reconstruction steps.

I wanted to reduce that friction by separating:

- **High-level intent:** Where and what region the artist wants.
- **Low-level generation:** How terrain is reconstructed procedurally.

This created a metadata-driven workflow where geographic selection becomes an abstract procedural input rather than a manual setup process, reducing the friction between real-world data and procedural worldbuilding by turning a messy multi-step workflow into a repeatable pipeline that connects engine-side interaction with Houdini-side procedural generation.

## Solution

### System design

#### Acquisition layer (Unity)

A lightweight Unity editor tool was used for:

- Real-world location selection
- Imagery/elevation acquisition
- Metadata standardization

The Unity side intentionally stayed minimal — its role was only to capture spatial intent and export deterministic terrain metadata.

**Unity map selector → imagery/elevation download → metadata export (`meta.json`) → Houdini HDA reconstruction → Unity/Unreal-ready terrain**

<img src="/portfolio/unity-terrain-mapbox-editor-01.png" style="width:50%; height:auto;">

<img src="/portfolio/unity-terrain-data-01.png" style="width:100%; height:auto;">
image: data has been downloaded

meta.json file is the bridge between the map-selection stage and the Houdini reconstruction stage


“This terrain came from THIS exact location, THIS exact zoom level, THIS exact tile, and THIS exact real-world scale.”

Without this file, your Houdini terrain generation becomes partially blind.

## Core Technical Decisions

1. **Deterministic metadata bridge**
   - Exported `lat`, `lon`, `zoom`, `tileX`, `tileY`, and real-world dimensions.
   - Made terrain reconstruction reproducible and debuggable.

2. **Provider-flexible acquisition**
   - Tested with Mapbox/OpenStreetMap, Esri, and Cesium-style service endpoints.
   - Kept the acquisition layer abstract enough for different data backends.

3. **Artist-focused UX**
   - Enabled location picking and terrain setup from inside Unity Editor.
   - Reduced context switching and manual data wrangling.

## Example Metadata Payload

```json
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

### Technical Deep Dive

#### How Zoom Level Changes Output

Zoom level directly controls how much land each tile represents and how dense the resulting terrain detail will be.

- **Higher zoom** → smaller area, more detail
- **Lower zoom** → huge area, less detail

It directly affects:

- terrain resolution
- meters-per-pixel
- detail density

This makes zoom one of the most important controls in the entire acquisition-to-reconstruction pipeline.

#### metersPerPixel in Practice

`metersPerPixel` converts downloaded image pixels into real-world scale.

If your image is **512 pixels** wide and `metersPerPixel = 193.3881`:

`512 × 193.3881 ≈ 99014.7`

That gives a terrain width of about **99 km**, which is then used by Houdini for physically meaningful terrain scale.

#### Tile Mapping and Neighbor Stitching

`tileX` / `tileY` identify the exact source tile and make reconstruction deterministic.

Beyond single-tile generation, this also supports neighbor-aware workflows like terrain streaming and brief neighbor tile stitching across adjacent sectors.

#### Reconstruction layer (Houdini)

Houdini became the procedural reconstruction system.

Using exported metadata:

- Terrain scale
- Geographic coordinates
- Tile mapping
- Elevation references

the HDA could reproducibly reconstruct terrain inside Houdini and prepare outputs for Unity/Unreal pipelines.

This separated artist intent from technical reconstruction complexity.

<img src="/portfolio/unity-terrain-houdini-01.png" style="width:50%; height:auto;">
image: HDA parameters

<img src="/portfolio/unity-terrain-houdini-02.png" style="width:50%; height:auto;">
image: network

<img src="/portfolio/unity-terrain-houdini-03.png" style="width:50%; height:auto;">

image: attribute from houdini to Unity  
unity_hf_terrainlayer_file  
unity_hf_texture_diffuse  
unity_hf_tile_size (from Python scale)  

### Python SOP Reference Snippet

The following pattern (parameter read + path expansion + safety checks) is useful when extending the HDA with metadata-driven logic:

```python
import json
import os

node = hou.pwd()
geo = node.geometry()

raw_path = node.evalParm("json_file")
path = hou.text.expandString(raw_path)

if os.path.exists(path) and os.path.isfile(path):
    with open(path, "r") as f:
        data = json.load(f)

    dims = data.get("dimensions", {})

    geo.addAttrib(hou.attribType.Global, "widthMeters", float(dims.get("widthMeters", 0)))
    geo.addAttrib(hou.attribType.Global, "metersPerPixel", float(dims.get("metersPerPixel", 0)))
else:
    print(f"Warning: JSON file not found at {path}")
```

## Impact

- Reduced terrain setup friction.
- Improved reproducibility through metadata-driven workflows.
- Faster iteration between acquisition and reconstruction.
- Demonstrated procedural pipeline/tool development for real-time environments.
