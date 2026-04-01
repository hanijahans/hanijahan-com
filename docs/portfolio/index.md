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
  title="PORTFOLIO"
  description="Scientific Visualization TD (Houdini)"
  summary="I build procedural Houdini systems that convert scientific and spatial data into simulations, structures, and visual understanding for research, analysis, and communication."
  skills="Procedural Systems • Tool and pipeline development"
  youtube-id=""
  :items="visibleItems"
/>
