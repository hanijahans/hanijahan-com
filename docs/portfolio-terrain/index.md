---
title: PORTFOLIO
description: PORTFOLIO description
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Terrain'
const categoryPortfolioItems = getPortfolioByCategory(category)

const terrainSummary = [
  'I design terrain through multiple approaches — from procedural generation to real-world data extraction and engine integration.',
  'Each project explores a different aspect of how terrain can be defined, analyzed, and deployed.'
]
</script>

<PortfolioPage
  title="Terrain Artist Portfolio"
  description="Terrain as a System"
  :summary=""
  youtube-id=""
  :items="categoryPortfolioItems"
/>
