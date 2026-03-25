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

<PortfolioPage
  title="PORTFOLIO"
  description=""
  youtube-id=""
  :items="houdini"
/>
