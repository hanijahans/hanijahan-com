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
