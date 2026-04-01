---
title: PORTFOLIO ALL
description: PORTFOLIO description
layout: page
---

<script setup>
import { allPortfolioItems } from '/data/portfolio'

const visibleItems = allPortfolioItems
</script>

<PortfolioPage
  title="PORTFOLIO"
  description=""
  summary=""
  skills=""
  youtube-id=""
  :items="visibleItems"
/>
