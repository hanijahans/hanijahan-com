---
title: PORTFOLIO ALL
description: "A complete cross-disciplinary portfolio of procedural, technical art, geospatial, visualization, and game development projects."
layout: page
---

<script setup>
import { allPortfolioItems } from '/data/portfolio'

const visibleItems = allPortfolioItems
// const visibleItems = allPortfolioItems.filter((item) => !item.categories?.includes('Medical'))
</script>

<PortfolioPage
  title="PORTFOLIO ALL"
  description="A cross-disciplinary collection of procedural, technical art, geospatial, and visualization projects."
  summary="Work centered on Procedural Content Generation (PCG), scalable world-building, data-driven automation, and end-to-end tool/pipeline ownership."
  skills=""
  youtube-id=""
  :items="visibleItems"
/>
