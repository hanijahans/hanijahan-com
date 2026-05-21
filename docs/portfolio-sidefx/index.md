---
title: PORTFOLIO
description: SideFX portfolio
layout: page
---

<script setup>
import { allPortfolioItems } from '/data/portfolio'

const sidefxSlugs = [
  '/portfolio-archive/procedural-geospatial-terrain-system',
  '/portfolio-archive/indie-game-development-projects'
]

const sidefxItems = allPortfolioItems.filter((item) => sidefxSlugs.includes(item.url ?? ''))
</script>

<PortfolioPage
  title="SideFX Portfolio"
  description="Selected projects for SideFX."
  summary=""
  youtube-id=""
  :items="sidefxItems"
/>
