---
title: "Technical Art Portfolio"
description: "Technical art projects focused on Houdini workflows, procedural systems, artist-friendly tools, and real-time production pipelines."
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Technical Art'
const technicalArtPortfolioItems = [
  ...getPortfolioByCategory(category),
  ...getPortfolioByCategory('Geospatial').filter((item) => item.url === '/portfolio-archive/on-demand-terrain-streaming-houdini-unity-mapbox')
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
