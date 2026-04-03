---
title: Smaller Tools
description:
tags: [Houdini, Procedural]
cover: ""
category:
  - Technical Art, 4
mediaPreview: ""
videoEmbed: ""
---

<script setup>
import { allPortfolioItems } from '../data/portfolio'

const assetToolSlugs = [
  '/portfolio-archive/procedural-building',
  '/portfolio-archive/procedural-vegetation'
]

const terrainAndGeoToolSlugs = [
  '/portfolio-archive/procedural-terrain-automated-houdini-unity',
  '/portfolio-archive/geo-lidar'
]

const assetTools = allPortfolioItems.filter((item) => assetToolSlugs.includes(item.url ?? ''))
const terrainAndGeoTools = allPortfolioItems.filter((item) => terrainAndGeoToolSlugs.includes(item.url ?? ''))
</script>

## Tool Portfolio

A quick look at smaller procedural tools, grouped the same way as before, but now shown as portfolio cards.

### Assets

<PortfolioGrid :items="assetTools" :columns="1" />

### Terrain and geospatial based

<PortfolioGrid :items="terrainAndGeoTools" :columns="1" />

## Tools & Tech
- Houdini
- Procedural workflows
