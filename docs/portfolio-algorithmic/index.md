---
title: "Algorithmic Art Portfolio"
description: "Algorithmic portfolio projects exploring math-driven procedural generation, emergent forms, and systems."
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
