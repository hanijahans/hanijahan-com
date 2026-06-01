---
# https://vitepress.dev/reference/default-theme-home-page
layout: page
pageClass: home-full-hero
title: false
description: "Hani Jahan procedural technical art portfolio preview" 
heroShade: 0.5
heroTextTone: 0.6
head:
  - - meta
    - http-equiv: refresh
      content: "0;url=/portfolio/"
---

<!-- <div
  class="home-hero-image" / "/hjd/social-preview.jpg"
  :style="{ '--home-hero-shade-control': heroShade }"
>
  <div
    class="home-hero-content"
    :style="{ '--home-hero-text-tone': heroTextTone }"
  >
    <h1>Worldbuilding &amp; Procedural Tools</h1>
    </div>
</div>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const heroShade = computed(() => {
  const raw = Number(frontmatter.value.heroShade ?? 0)

  if (!Number.isFinite(raw)) {
    return 0
  }

  return Math.max(-1, Math.min(1, raw))
})

const fallbackTone = computed(() => (heroShade.value < 0 ? 0 : 1))

const heroTextTone = computed(() => {
  const raw = Number(frontmatter.value.heroTextTone ?? fallbackTone.value)

  if (!Number.isFinite(raw)) {
    return fallbackTone.value
  }

  return Math.max(0, Math.min(1, raw))
})
</script> -->

<noscript>
  <meta http-equiv="refresh" content="0;url=/portfolio/" />
</noscript>
