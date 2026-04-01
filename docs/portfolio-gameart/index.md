---
title: PORTFOLIO
description: PORTFOLIO description
layout: page
---

<script setup>
import { allPortfolioItems } from '/data/portfolio-gameart'
</script>

<PortfolioPage
  title="PORTFOLIO"
  description="Game Artist"
  summary=""
  youtube-id=""
  :items="allPortfolioItems"
/>
