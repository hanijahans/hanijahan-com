---
title: PORTFOLIO
description: PORTFOLIO description
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Technical Art'
const technicalArtPortfolioItems = [
  ...getPortfolioByCategory(category),
  ...getPortfolioByCategory('Geospatial').filter((item) => item.url === '/portfolio-archive/procedural-terrain-automated-houdini-unity')
]
</script>

<PortfolioPage
  title="Technical Art Portfolio"
  description=""
  summary=""
  skills=""
  youtube-id=""
  :items="technicalArtPortfolioItems"
/>
