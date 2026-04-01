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
  description="Procedural Systems (Houdini)"
  summary=""
  skills="Procedural Systems • Tool and pipeline development"
  youtube-id=""
  :items="visibleItems"
/>
