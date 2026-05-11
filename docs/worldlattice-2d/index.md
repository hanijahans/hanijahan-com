---
layout: page
pageClass: worldlattice-hero-page
title: false
heroShade: 0.4        # tweak darkness if needed
heroTextTone: 0.7     # how light/dark the text should be 
# The "4-Space" Rule: In standard Markdown, there is a strict rule: If you leave a blank line and then indent text by 4 spaces (or 1 tab), that text is treated as a Code Block.
---

<div class="home-hero-image" :style="{ '--home-hero-shade-control': heroShade }">
<div class="home-hero-content" :style="{ '--home-hero-text-tone': heroTextTone }">
<h1>WorldLattice</h1>
<p>
A fast, rule-driven worldbuilding toy for painting samples and generating
tiny worlds.
</p>

<div class="hero-buttons">
<a class="hero-button primary" href="/worldlattice-2d/">
Play 2D
</a>

<a class="hero-button secondary" href="/blog/">
Devlog
</a>
</div>

</div>
</div>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const heroShade = computed(() => {
  const raw = Number(frontmatter.value.heroShade ?? 0)
  if (!Number.isFinite(raw)) return 0
  return Math.max(-1, Math.min(1, raw))
})

const fallbackTone = computed(() => (heroShade.value < 0 ? 0 : 1))

const heroTextTone = computed(() => {
  const raw = Number(frontmatter.value.heroTextTone ?? fallbackTone.value)
  if (!Number.isFinite(raw)) return fallbackTone.value
  return Math.max(0, Math.min(1, raw))
})
</script>