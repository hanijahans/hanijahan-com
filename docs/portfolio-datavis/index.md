---
title: "Data Visualization Portfolio"
description: "Data visualization portfolio projects that transform spatial, network, and urban datasets into readable visual systems."
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Data Visualization'
const categoryPortfolioItems = getPortfolioByCategory(category)
</script>

<PortfolioPage
  title="Data Visualization Portfolio"
  description=""
  youtube-id=""
  :items="categoryPortfolioItems"
/>
