---
title: PORTFOLIO
description: PORTFOLIO description
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Algorithmic'
const categoryPortfolioItems = getPortfolioByCategory(category)
</script>

<PortfolioPage
  title="PORTFOLIO"
  description="Math / Algorithms"
  youtube-id=""
  :items="categoryPortfolioItems"
/>
