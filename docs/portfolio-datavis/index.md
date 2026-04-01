---
title: PORTFOLIO
description: PORTFOLIO description
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Data Visualization'
const categoryPortfolioItems = getPortfolioByCategory(category)
</script>

<PortfolioPage
  title="PORTFOLIO"
  description=""
  youtube-id=""
  :items="categoryPortfolioItems"
/>
