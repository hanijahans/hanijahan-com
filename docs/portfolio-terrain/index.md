---
title: PORTFOLIO
description: PORTFOLIO description
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Terrain'
const houdini = getPortfolioByCategory(category)
</script>

## Terrain as a System

I design terrain through multiple approaches — from procedural generation to real-world data extraction and engine integration.

Each project explores a different aspect of how terrain can be defined, analyzed, and deployed.

<PortfolioPage
  title="PORTFOLIO"
  description=""
  youtube-id=""
  :items="houdini"
/>
