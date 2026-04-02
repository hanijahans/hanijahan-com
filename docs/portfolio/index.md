---
title: PORTFOLIO
description: PORTFOLIO description
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Portfolio'
const visibleItems = getPortfolioByCategory(category)
</script>

<PortfolioPage
  title="Hani Jahan Portfolio"
  description="Technical Artist focused on Procedural Content Generation (PCG). I build Houdini-integrated pipelines for Unreal and Unity, creating data-driven systems that bridge the gap between complex algorithms and artist-friendly tools, with a strong emphasis on performance, documentation, and long-term maintainability."
  summary=""
  skills="Houdini (VEX/Python) | Unreal & Unity | Procedural Content Generation (PCG) | Data-Driven Systems | Pipeline Ownership | Performance Optimization"
  youtube-id=""
  :items="visibleItems"
/>
Houdini (VEX/Python) | Unreal Engine | Procedural Content Generation (PCG) | Data-Driven Systems | Pipeline Ownership | Performance Optimization
