---
title: "Hani Jahan Portfolio"
description: "Technical art portfolio focused on procedural systems, Houdini-integrated pipelines, and data-driven tools for Unreal and Unity."
layout: page
---

<script setup>
import { getPortfolioByCategory } from '/data/portfolio'

const category = 'Portfolio'
const visibleItems = getPortfolioByCategory(category)
</script>

<PortfolioPage
  title="Hani Jahan Portfolio"
  description="Technical Artist focused on procedural systems design. I build Houdini-integrated pipelines for Unreal and Unity, creating data-driven systems that make hidden procedural logic visible and controllable for artists, with a strong emphasis on clarity, documentation, and long-term maintainability."
  summary=""
  skills="Houdini (VEX/Python) | Unreal & Unity | Procedural Content Generation | Data-Driven Systems | Artist-Friendly Tools | Pipeline Ownership"
  youtube-id=""
  :items="visibleItems"
/>
