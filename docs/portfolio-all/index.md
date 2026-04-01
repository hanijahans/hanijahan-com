---
title: PORTFOLIO ALL
description: PORTFOLIO description
layout: page
---

<script setup>
import { houdini } from '/data/portfolio'

const visibleItems = houdini
</script>

<PortfolioPage
  title="PORTFOLIO"
  description=""
  summary=""
  skills=""
  youtube-id=""
  :items="visibleItems"
/>
