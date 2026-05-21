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
  '/portfolio-archive/community-teaching-procedural-tools-outreach',
  '/portfolio-archive/visual-arts-theory-color-composition-layout-game-art'
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
