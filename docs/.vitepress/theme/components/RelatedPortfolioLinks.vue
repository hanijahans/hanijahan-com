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

const toNormalizedSet = (values?: string[]): Set<string> =>
  new Set((values ?? []).map((value) => value.trim().toLowerCase()).filter(Boolean))

const countOverlap = (left: Set<string>, right: Set<string>): number => {
  let count = 0
  for (const value of left) {
    if (right.has(value)) count++
  }
  return count
}

const currentPath = computed(() => normalizePath(route.path))

const currentItem = computed(() =>
  allPortfolioItems.find((item) => normalizePath(item.url ?? '') === currentPath.value)
)

const relatedItems = computed<PortfolioItem[]>(() => {
  const current = currentItem.value
  if (!current?.url) return []

  const currentUrl = normalizePath(current.url)
  const currentCategories = toNormalizedSet(current.categories)
  const currentTags = toNormalizedSet(current.tags)

  return allPortfolioItems
    .filter((item) => item.url && normalizePath(item.url) !== currentUrl)
    .map((item) => {
      const categoryOverlap = countOverlap(currentCategories, toNormalizedSet(item.categories))
      const tagOverlap = countOverlap(currentTags, toNormalizedSet(item.tags))

      return {
        item,
        score: categoryOverlap * 10 + tagOverlap
      }
    })
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, 3)
    .map((entry) => entry.item)
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
