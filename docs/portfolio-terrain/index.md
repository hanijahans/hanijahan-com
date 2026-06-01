---
title: "Terrain Artist Portfolio"
description: "Terrain portfolio projects spanning procedural generation, real-world data extraction, Houdini workflows, and engine integration."
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
  description="I design terrain through multiple approaches — from procedural generation to real-world data extraction and engine integration. Each project explores a different aspect of how terrain can be defined, analyzed, and deployed."
  summary=""
  youtube-id=""
  :items="categoryPortfolioItems"
/>
