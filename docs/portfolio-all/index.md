---
title: PORTFOLIO ALL
description: PORTFOLIO description
layout: page
---

<script setup>
import { allPortfolioItems } from '/data/portfolio'

const visibleItems = allPortfolioItems
// const visibleItems = allPortfolioItems.filter((item) => !item.categories?.includes('Medical'))
</script>

<PortfolioPage
  title="PORTFOLIO"
  description=""
  summary=""
  skills=""
  youtube-id=""
  :items="visibleItems"
/>
