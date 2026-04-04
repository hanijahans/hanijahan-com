<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import PortfolioGrid from './PortfolioGrid.vue'
import { allPortfolioItems, type PortfolioItem } from '../../../data/portfolio'

const route = useRoute()

const normalizePath = (value: string): string => {
  if (!value) return '/'
  return value.endsWith('/') ? value.slice(0, -1) || '/' : value
}

const currentPath = computed(() => normalizePath(route.path))

const currentItem = computed(() =>
  allPortfolioItems.find((item) => normalizePath(item.url ?? '') === currentPath.value)
)

const relatedItems = computed<PortfolioItem[]>(() => {
  const current = currentItem.value
  if (!current?.url) return []

  const currentUrl = normalizePath(current.url)
  const currentCategories = current.categories ?? []
  const currentTags = (current.tags ?? []).map((tag) => tag.toLowerCase())

  const candidates = allPortfolioItems.filter((item) => normalizePath(item.url ?? '') !== currentUrl)

  const scored = candidates.map((item) => {
    const categories = item.categories ?? []
    const tags = (item.tags ?? []).map((tag) => tag.toLowerCase())

    const sharedCategoryCount = categories.filter((category) => currentCategories.includes(category)).length
    const sharedTagCount = tags.filter((tag) => currentTags.includes(tag)).length

    return {
      item,
      score: sharedCategoryCount * 10 + sharedTagCount
    }
  })

  const withCategoryOrTagOverlap = scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .map((entry) => entry.item)

  const unique = new Map<string, PortfolioItem>()

  for (const item of withCategoryOrTagOverlap) {
    unique.set(item.url ?? item.title, item)
    if (unique.size >= 3) break
  }

  if (unique.size < 2) {
    for (const fallback of candidates) {
      unique.set(fallback.url ?? fallback.title, fallback)
      if (unique.size >= 3) break
    }
  }

  return Array.from(unique.values()).slice(0, 3)
})
</script>

<template>
  <section v-if="relatedItems.length" class="related-projects">
    <h2>Related Projects</h2>
    <p>Explore 2–3 more projects from this portfolio.</p>
    <PortfolioGrid :items="relatedItems" :columns="1" />
  </section>
</template>

<style scoped>
.related-projects {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.related-projects h2 {
  margin: 0 0 0.35rem;
}

.related-projects p {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
}
</style>
