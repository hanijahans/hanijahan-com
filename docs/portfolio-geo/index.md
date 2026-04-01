---
title: PORTFOLIO
description: PORTFOLIO description
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Geospatial'
const houdini = getPortfolioByCategory(category)
</script>

<PortfolioPage
  title="PORTFOLIO"
  description="I build procedural Houdini systems that convert spatial data into simulations, structures, and visual understanding for research, analysis, and communication. Geospatial Data Visualization / Mapping / Analytics"
  youtube-id=""
  :items="houdini"
/>
