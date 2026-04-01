---
title: Procedural Modular Building System
description: A procedural building generator that can run fully procedural or blend with modular wall, window, and facade assets.
category: Technical Art
order: 2
tags: [Houdini, Procedural]
cover: "/portfolio/modular-building.png"
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

![Preview](/portfolio/modular-building.png)

The output is game-ready geometry suitable for import into real-time pipelines.

## Tools
- Houdini
- Python
- Unreal Engine

## Result
- Significantly faster building creation compared with manual workflows
- Hundreds of coherent building variations generated from a compact modular kit
- Better iteration speed for technical artists and environment teams
