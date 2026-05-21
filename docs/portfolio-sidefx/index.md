---
title: PORTFOLIO
description: SideFX portfolio
layout: page
---

<script setup>
import { allPortfolioItems } from '/data/portfolio'

const sidefxSlugs = [
  '/portfolio-archive/houdini-unity-mapbox-terrain-streaming',
  '/portfolio-archive/houdini-for-game-development',
  '/portfolio-archive/community-teaching-procedural-tools-outreach',
  '/portfolio-archive/visual-arts-theory-color-composition-layout-game-art'
]

const sidefxItems = sidefxSlugs
  .map((slug) => allPortfolioItems.find((item) => item.url === slug))
  .filter(Boolean)
</script>

<PortfolioPage
  title="SideFX Portfolio"
  description="Selected projects for SideFX."
  summary=""
  youtube-id=""
  :items="sidefxItems"
/>
