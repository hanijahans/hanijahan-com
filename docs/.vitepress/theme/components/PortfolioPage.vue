<script setup lang="ts">
import { computed } from 'vue'
import PortfolioGrid from './PortfolioGrid.vue'
import type { PortfolioItem } from '../../../data/portfolio1'

const props = defineProps<{
  title: string
  description?: string
  summary?: string | string[]
  skills?: string | string[]
  youtubeId?: string
  items?: PortfolioItem[]
  heading?: string
}>()

const headingText = computed(() => props.heading ?? props.title)
const summaryParagraphs = computed(() => {
  if (!props.summary) return []
  return Array.isArray(props.summary) ? props.summary : [props.summary]
})
const skillsText = computed(() =>
  Array.isArray(props.skills) ? props.skills.join(' • ') : props.skills
)
</script>

<template>
  <section class="portfolio-page">
    <header class="hero">
      <h1>{{ headingText }}</h1>
      <p v-if="description" class="hero-description">{{ description }}</p>
      <div v-if="summaryParagraphs.length" class="hero-summary">
        <p v-for="(paragraph, index) in summaryParagraphs" :key="index">{{ paragraph }}</p>
      </div>
      <p v-if="skillsText" class="hero-skills"><strong>Skills:</strong> {{ skillsText }}</p>
      <div v-if="youtubeId" class="hero-video">
        <YouTube :id="youtubeId" width="70%" />
      </div>
    </header>

    <PortfolioGrid :items="items" />
  </section>
</template>

<style scoped>
.portfolio-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px;
}
.hero {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.hero-description,
.hero-summary,
.hero-skills {
  max-inline-size: min(100%, clamp(68ch, 82vw, 96ch));
}
.hero-description {
  opacity: 0.85;
}
.hero-summary {
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0.9;
  line-height: 1.65;
}
.hero-summary p {
  margin: 0;
}
.hero-skills {
  opacity: 0.95;
}
.hero-video {
  margin-top: 8px;
}
</style>
