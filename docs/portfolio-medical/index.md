---
title: "Scientific Visualization TD Portfolio"
description: "Scientific visualization portfolio work using procedural Houdini systems to turn research data into clear visual structures."
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Medical'
const categoryPortfolioItems = getPortfolioByCategory(category)
</script>

<PortfolioPage
  title="Scientific Visualization TD (Houdini)"
  description="I build procedural Houdini systems that convert scientific data into structures, and visual understanding for research, analysis, and communication "
  youtube-id=""
  :items="categoryPortfolioItems"
/>
