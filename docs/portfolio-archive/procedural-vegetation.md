---
title: Procedural Vegetation
description: Procedural vegetation toolkit for stylized environments with controllable grass, vines, and path-aware asset scattering.
category: Technical Art
order: 2
tags: [Houdini, Procedural, Vegetation]
cover: "/portfolio/procedural-vegetation.png"
mediaPreview: "hover"
videoEmbed: "https://www.youtube.com/embed/53yyat49Ru4?autoplay=1&mute=1&loop=1&playlist=TkJvMCo8u10&rel=0"
---

# Procedural Vegetation
![Preview](/portfolio/procedural-vegetation.png)

A Houdini-based procedural vegetation workflow for building stylized environments quickly while preserving art direction.

## Problem
Hand-placing vegetation in stylized scenes is slow, hard to iterate on, and often inconsistent across large spaces. The challenge was to create vegetation that feels natural while still being highly controllable for composition, readability, and gameplay-friendly paths.

## Approach
I built a modular procedural system in Houdini with two connected workflows:

<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/TkJvMCo8u10"
  title="Procedural Grass"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

1. **Procedural Grass Generation**
   - Layered grass generation with controls for density, height, clumping, scale, and patch breakup.
   - Artist-friendly parameters for rapidly switching between sparse fields, overgrown areas, and curated hero zones.

<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/bCy0iySzYdc"
  title="Procedural Path and Vegetation Scattering"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

2. **Path-Based Environment Scattering**
   - A path-driven setup that uses curves and masks to scatter grass, rocks, and trees around walkable routes.
   - Supports fast blockout and diorama development by combining predictable placement with organic variation.

## Tools
- Houdini
- Procedural scattering systems
- Path-driven masks and curve workflows
- Stylized environment art workflows

## Result
The toolkit significantly reduced scene assembly time while improving consistency and visual quality. It enabled fast iteration from layout to final look, making it practical to generate stylized environments that still feel handcrafted.
