---
title: PORTFOLIO
description: PORTFOLIO description
layout: page
---

<script setup>
import { allPortfolioItems } from '/data/portfolio-indiegame'
</script>

<PortfolioPage
  title="PORTFOLIO"
  description="Indie Game Dev"
  summary=""
  youtube-id=""
  :items="allPortfolioItems"
/>
