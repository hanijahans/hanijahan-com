<script setup lang="ts">
import { computed } from 'vue'
import { getOptimizedImageSources } from '../imageVariants'

const props = defineProps<{
  src: string
  alt?: string
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'auto' | 'sync'
}>()

const sources = computed(() => getOptimizedImageSources(props.src))
</script>

<template>
  <picture class="portfolio-optimized-picture">
    <source v-if="sources.avif" :srcset="sources.avif" type="image/avif" />
    <source v-if="sources.webp" :srcset="sources.webp" type="image/webp" />
    <img
      :src="sources.fallback"
      :data-original-src="props.src"
      :alt="props.alt || ''"
      :loading="props.loading || 'lazy'"
      :decoding="props.decoding || 'async'"
    />
  </picture>
</template>
