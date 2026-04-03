---
title: Procedural Modular Building System
description: A procedural building generator that can run fully procedural or blend with modular wall, window, and facade assets.
tags: [Houdini, Procedural]
cover: "/portfolio/modular-building.png"
category:
  - Portfolio, 2
  - Technical Art, 2
mediaPreview: "hover"
videoEmbed: "https://www.youtube.com/embed/IbOzfrEB_xQ?autoplay=1&mute=1&loop=1&playlist=IbOzfrEB_xQ&rel=0"
---

# Procedural Modular Building System  
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

A Houdini-based building system designed to generate architecture quickly while preserving a consistent visual language. The generator works as a fully procedural tool, or as a hybrid setup that combines rules with artist-made modular kits.

## Problem
Artists needed a way to create large numbers of city buildings quickly without losing stylistic consistency. Building every structure by hand was too slow for iteration-heavy world building.

## Approach
I built a procedural Houdini generator that creates complete buildings from a compact set of controls: footprint, floor count, floor height, facade rhythm, and window spacing.

The system supports two workflows:
- **Fully procedural** for fast exploration and high-volume variation.
- **Hybrid modular** that snaps and distributes artist-created walls, windows, doors, and facade pieces for art-directed results.

![Modular Buildings](/portfolio/modular-building.png)

The output is game-ready geometry suitable for import into real-time pipelines.

### Desert / Middle Eastern Architecture
![desert](/portfolio/building-desert-01.png)

### Modern Architecture
![modern](/portfolio/building-modern-01.png)

### Urban Architecture
![urban](/portfolio/building-urban-01.png)

This procedural building tool balances technical modularity with simple artist controls. Developed as a Houdini Digital Asset (HDA), it automates the creation of residential rows while allowing for quick, high-level art direction.

<div class="image-row2">
  <img src="/portfolio/building-urban-ui-01.png" alt="">
  <img src="/portfolio/building-urban-nodes-01.png" alt="">
</div>

Key Features
- HDA Interface: Control seeds, lot dimensions, and slope offsets.
- Modular Logic: Automatic assembly of wall segments and floor heights.
- Variation: Rule-based randomization for unique building profiles.
- Clean Data: Organized node network for easy debugging and scaling.

### 

## Tools
- Houdini
- VEX/Python

## Result
- Significantly faster building creation compared with manual workflows
- Hundreds of coherent building variations generated from a compact modular kit
- Better iteration speed for technical artists and environment teams
