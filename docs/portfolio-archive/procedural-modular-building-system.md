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

<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/IbOzfrEB_xQ"
  title="Modular Procedural Building"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

A Houdini Digital Asset (HDA) for technical artists to generate production-ready buildings at scale while keeping strong art direction. The system is designed to work in **two modes**: fully procedural generation and modular-kit assembly.

## Production Goal
Create dense, style-consistent architecture quickly for world-building, while preserving flexibility for environment artists and level teams.

## Workflow Support
### 1) Fully Procedural Workflow
Use rule-driven generation when speed and volume are the priority:
- Procedural footprint interpretation and lot fitting
- Floor, facade, and roof generation from exposed controls
- High-volume seed variation for fast lookdev and layout exploration

### 2) Modular / Hybrid Workflow
Use authored pieces when you need stronger art direction:
- Snap and distribute modular wall, window, door, and trim assets
- Blend kit pieces with procedural rules for controlled variation
- Keep outputs consistent across districts while preserving hero moments

![Modular Buildings](/portfolio/modular-building.png)

## Technical Highlights
- **Attribute-Based Variation**: Per-primitive and per-building attributes (style ID, floor class, facade rhythm, material set, damage/wear masks) drive deterministic variation and downstream shading.
- **Procedural UVs**: Automatic UV generation for facade strips, trims, and roof sections with stable texel density and repeat controls.
- **Data-Oriented Output**: Clean attribute schema for export to game engines and material pipelines.
- **Scalable Controls**: Seed, footprint, floor count, floor height, and window spacing exposed through an artist-friendly HDA interface.

## Ureal implementation

<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/2yyLws0-2CE"
  title="Unreal Integration Using Houdini Engine"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

Tower
<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/RoD0syPQCtM"
  title="Unreal Integration Using Houdini Engine"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

## Style Presets
### Desert / Middle Eastern Architecture
![desert](/portfolio/building-desert-01.png)

### Modern Architecture
![modern](/portfolio/building-modern-01.png)

### Urban Architecture
![urban](/portfolio/building-urban-01.png)

<div class="image-row2">
  <img src="/portfolio/building-urban-ui-01.png" alt="Procedural building HDA UI">
  <img src="/portfolio/building-urban-nodes-01.png" alt="Houdini node graph for building generation">
</div>

## Tools
- Houdini
- VEX / Python

## Results
- Faster building creation versus manual modeling workflows
- Large batches of coherent building variants from compact rule + kit inputs
- Improved iteration speed for procedural, environment, and technical art teams
- Reusable pipeline-ready outputs for both procedural-only and modular-assisted production
