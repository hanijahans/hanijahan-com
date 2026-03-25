---
title: Procedural Terrain System
description: Terrain generator with flattening, and slope-aware scattering.
category: Terrain
categoryOrder: 1
order: 1
tags: [Houdini, Procedural, Terrain]
---

# Procedural Terrain System
![Preview](/portfolio/procedural-terrain.png)

A procedural terrain workflow for building environments quickly while preserving artistic control.

## Problem
Creating terrain by hand for every scene made iteration slow and inconsistent. It was difficult to:
- Maintain a cohesive look across multiple environments
- Populate terrain with vegetation and props in a way that respected slope and readability

## Approach
I built a node-based terrain generation system that combined controlled randomness with artist-friendly overrides:
1. **Baseform generation** to establish macro shapes and visual rhythm
2. **Flattening operators** for roads, buildings, and points of interest
3. **Slope-aware masking** to drive biome placement and prop density

This structure enabled fast exploration while still allowing targeted edits when a scene required specific composition beats.

## Tools
- **Houdini**

## Result
The system reduced environment setup time and made look development more consistent. It produced readable terrains with:
- More predictable art direction outcomes
- Faster iteration on layout and landmark placement
- Cleaner procedural distribution of vegetation and props based on slope and terrain rules
