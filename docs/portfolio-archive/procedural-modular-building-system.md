---
title: Procedural Modular Building System
description: A Houdini building generator supporting both fully procedural and modular kit workflows, with attribute-driven variation and procedural UVs.
tags: [Houdini, Procedural, Modular]
cover: "/portfolio/modular-building.png"
category:
  - Portfolio, 2
  - Technical Art, 2
mediaPreview: "hover"
videoEmbed: "https://www.youtube.com/embed/IbOzfrEB_xQ?autoplay=1&mute=1&loop=1&playlist=IbOzfrEB_xQ&rel=0"
---

# Procedural Modular Building System

A collection of procedural building generation workflows developed in Houdini, exploring both fully procedural and hybrid modular approaches. While the individual generators target different architectural styles and use cases, they share a common focus on scalable variation, artist control, and reusable procedural logic.

![Modular Buildings](/portfolio/modular-building.png)

---

<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/IbOzfrEB_xQ"
  title="Modular Procedural Building"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

<div class="image-row2">
  <img src="/portfolio/building-urban-ui-01.png" alt="Procedural building HDA UI">
  <img src="/portfolio/building-urban-nodes-01.png" alt="Houdini node graph for building generation">
</div>

 The system supports both fully procedural workflows and hybrid modular-kit assembly for production-oriented environment creation.

### 1) Fully Procedural Mode
Designed for high-volume generation workflows where speed and variation are the priority:
- Procedural footprint interpretation and lot fitting
- Floor, facade, and roof generation from exposed controls
- High-volume seed variation for fast lookdev and layout exploration

### 2) Hybrid Mode
Use Hybrid Mode when you need to preserve hero building uniqueness or match specific concept art, while still benefiting from procedural layout and variation.

## Technical Highlights
- **Attribute-Driven Variation System**: per-building attributes (building scale, procedural modules size, style ID, floor class, facade rhythm, material set) drive deterministic variation and downstream shading.
- **Procedural UVs**: Automatic UV generation for facade strips, trims, and roof sections with stable texel density and repeat controls.
- **Data-Oriented Output**: Clean attribute schema for export to game engines and material pipelines.
- **Scalable Controls**: Seed, footprint, floor count, floor height, and window spacing exposed through an artist-friendly HDA interface.

### Attribute Driven Values
The HDA is based on a custom attribute-driven variation workflow. Artists can define attribute ranges, and the HDA systematically generates controlled procedural variations from those constraints.

<img src="/portfolio/attribute-driven-values-01.png" style="width:50%; height:auto;">
Artist friendly attribute naming

```
// VEX
// creates detail attributes dynamically based on user-defined attribute names
for(int i = 1; i <= chi('attributes'); i++){
    string num = itoa(i);
    
    string name = chs("../attribute_names/attrib_name" + num);
    //s@name = name;
    
    setdetailattrib(0, ('name'+num), name, 'set');
}
```
<img src="/portfolio/attribute-driven-values-02.png" style="width:50%; height:auto;">
set a range for each

```
// VEX
// assigns a random but deterministic value within a specified range
// ch("iteration") references the current iteration index of the main loop.
// using the iteration index to ensure per-building uniqueness.
int seed = int(chi('seed') + ch("iteration"));

for(int i = 1; i <= chi('attributes'); i++){
    string num = itoa(i);
    
    vector2 range = chu("../attribute_values/range_val" + num);

    float m = rand(i, seed);
 
    float value = trunc(lerp(range[0], range[1], m)*100)/100;
    //float value = trunc(fit01(rand(ch("iteration")+chi("seed")),range[0], range[1])*100)/100;
    setdetailattrib(0, chs("../attribute_names/attrib_name" + num), value, 'set');
}
```

<img src="/portfolio/attribute-driven-values-04-loop2.png" style="width:100%; height:auto;">

Example of generated attribute values for a specific iteration. ( values will be set for window and door and ... with the same workflow)

<img src="/portfolio/attribute-driven-values-03.png" style="width:30%; height:auto;">

These attributes drive everything from window placement to trim style and material assignments, without requiring manual overrides per building.

**PDG-Like Workflow Inside SOP**
I built a lightweight SOP-based workflow for testing procedural variations directly inside the SOP network. It helps artists explore different outcomes quickly without needing to set up a full PDG workflow.


## Unreal Implementation

Real-time use of building HDAs inside Unreal Engine 5 via Houdini Engine:

<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/2yyLws0-2CE"
  title="Unreal Integration Using Houdini Engine"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/RoD0syPQCtM"
  title="Unreal Integration Using Houdini Engine"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

## Architectural Variants

While the generators target different architectural aesthetics, many of them share similar procedural foundations and variation workflows underneath.

<!-- <div class="image-row3">
  <img src="/portfolio/building-desert-01.png" alt="Middle Eastern Architecture">
  <img src="/portfolio/building-modern-01.png" alt="Modern Architecture">
  <img src="/portfolio/building-urban-01.png" alt="Urban Architecture">
</div> -->

### Desert / Middle Eastern Architecture

<img src="/portfolio/building-desert-01.png" style="width:50%; height:auto;">

### Modern Architecture

<img src="/portfolio/building-modern-01.png" style="width:50%; height:auto;">

### Urban Architecture

<img src="/portfolio/building-urban-01.png" style="width:60%; height:auto;">

## Results
- Faster building creation versus manual modeling workflows
- Large batches of coherent building variants from compact rule + kit inputs
- Improved iteration speed for procedural, environment, and technical art teams
- Reusable pipeline-ready outputs for both procedural-only and modular-assisted production
