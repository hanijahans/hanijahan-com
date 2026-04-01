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
  title="PORTFOLIO"
  description="Procedural Technical Artist"
  summary="Technical Artist specializing in procedural content generation using Houdini, with practical experience in VEX and Python. Strong focus on creating scalable, data-driven assets and integrating procedural systems into real-time pipelines including Unreal and Unity, leveraging AI-assisted workflows to accelerate iteration and problem-solving where appropriate."
  skills="Houdini • VEX • Python • Procedural Systems • Tool and pipeline development • Unity & Unreal Engine"
  youtube-id=""
  :items="technicalArtPortfolioItems"
/>
