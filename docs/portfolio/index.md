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
  description="Procedural Systems (Houdini) & Procedural Content Generation (PCG) for World-Building. Building algorithmic and data-driven systems to automate the creation of game environments, assets, and details rather than placing every element manually - "
  summary=""
  skills="Houdini | VEX | Python | Unreal & Unity | Procedural Content Generation (PCG) | Tool and pipeline development | Data-Driven Generation"
  youtube-id=""
  :items="visibleItems"
/>
