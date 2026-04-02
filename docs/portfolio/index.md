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
  description="Procedural Content Generation (PCG) for scalable world-building, focused on algorithmic and data-driven systems to automate the creation of game environments, assets, and details rather than placing every element manually."
  summary="Technical Artist specialized in Procedural Content Generation (PCG) with Houdini, VEX, and Python. I build data-driven generation systems, author Houdini-to-Unreal/Unity workflows, and ship tools with strong usability, documentation, and long-term maintainability."
  skills="Houdini | VEX | Python | Unreal & Unity | Procedural Content Generation (PCG) | Data-Driven Generation | Pipeline & Tool Ownership | Performance & Stability"
  youtube-id=""
  :items="visibleItems"
/>

