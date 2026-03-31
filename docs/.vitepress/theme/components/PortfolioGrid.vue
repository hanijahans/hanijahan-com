<script setup lang="ts">
import { computed, ref } from 'vue'
import BeforeAfterSlider from './BeforeAfterSlider.vue'
import { houdini, type PortfolioItem } from '../../../data/portfolio'

const props = defineProps<{ items?: PortfolioItem[] }>()
const gridItems = computed(() => props.items ?? houdini)

const youtubeFrames = ref<Record<number, HTMLIFrameElement | null>>({})
const htmlVideos = ref<Record<number, HTMLVideoElement | null>>({})
const hoveredCards = ref<Record<number, boolean>>({})

function withJsApiAndLoop(url: string) {
  const result = new URL(url)
  const videoId = result.pathname.split('/').filter(Boolean).pop()

  result.searchParams.set('enablejsapi', '1')
  result.searchParams.set('mute', '1')
  result.searchParams.set('loop', '1')

  if (videoId) {
    result.searchParams.set('playlist', videoId)
  }

  return result.toString()
}

function onCardEnter(index: number, item: PortfolioItem) {
  hoveredCards.value[index] = true
  if (item.videoEmbed) {
    const frame = youtubeFrames.value[index]
    frame?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
      '*'
    )
    return
  }

  htmlVideos.value[index]?.play().catch(() => {
    // noop: browser autoplay policy can still block in edge cases.
  })
}

function onCardLeave(index: number, item: PortfolioItem) {
  hoveredCards.value[index] = false
  if (item.videoEmbed) {
    const frame = youtubeFrames.value[index]
    frame?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
      '*'
    )
    return
  }

  htmlVideos.value[index]?.pause()
}


function shouldShowStaticCover(item: PortfolioItem): boolean {
  return Boolean(item.coverBefore && item.coverAfter)
}

function shouldShowMedia(index: number, item: PortfolioItem): boolean {
  if (!(item.videoEmbed || item.video)) return false

  // Default keeps previous behavior; hover mode displays the cover image until hover.
  if (item.mediaPreview === 'hover') {
    return Boolean(hoveredCards.value[index])
  }

  return true
}

</script>

<template>
  <div class="portfolio-grid">
    <component
      v-for="(it, i) in gridItems"
      :key="i"
      :is="it.url ? 'a' : 'div'"
      class="card"
      :class="{ 'card-clickable': Boolean(it.url) }"
      :href="it.url || undefined"
      @mouseenter="onCardEnter(i, it)"
      @mouseleave="onCardLeave(i, it)"
      :aria-label="it.url ? `Open ${it.title} details` : undefined"
    >
      <span v-if="it.url" class="corner" aria-hidden="true">↗</span>

      <div v-if="it.videoEmbed || it.video" class="cover">
        <BeforeAfterSlider
          v-if="shouldShowStaticCover(it)"
          class="cover-slider"
          :before-src="it.coverBefore!"
          :after-src="it.coverAfter!"
          :before-alt="`${it.title} before`"
          static
          height="220px"
        />
        <div v-else-if="shouldShowMedia(i, it)" class="cover-media">
          <iframe
            v-if="it.videoEmbed"
            :ref="(el) => youtubeFrames[i] = el as HTMLIFrameElement | null"
            :src="withJsApiAndLoop(it.videoEmbed)"
            :title="`${it.title} video`"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
          <video
            v-else
            :ref="(el) => htmlVideos[i] = el as HTMLVideoElement | null"
            :src="it.video"
            :poster="it.cover"
            muted
            playsinline
            loop
          />
        </div>
        <img
          v-else
          :src="it.cover"
          :alt="it.title"
          loading="lazy"
        />
      </div>
      <div v-else class="cover">
        <BeforeAfterSlider
          v-if="shouldShowStaticCover(it)"
          class="cover-slider"
          :before-src="it.coverBefore!"
          :after-src="it.coverAfter!"
          :before-alt="`${it.title} before`"
          static
          height="220px"
        />
        <img
          v-else
          :src="it.cover"
          :alt="it.title"
          loading="lazy"
        />
      </div>
      <div class="body">
        <h3 class="title">{{ it.title }}</h3>
        <p v-if="it.subtitle" class="subtitle">{{ it.subtitle }}</p>
        <p v-if="it.description" class="desc">{{ it.description }}</p>
        <div class="meta">
          <span v-if="it.role">{{ it.role }}</span>
          <span v-if="it.year">· {{ it.year }}</span>
        </div>
        <div v-if="it.tags?.length" class="tags">
          <span v-for="t in it.tags" :key="t" class="tag">{{ t }}</span>
        </div>
        <div v-if="it.url" class="cta">
          View project details <span aria-hidden="true">→</span>
        </div>
      </div>
    </component>
  </div>
</template>

<style scoped>
.portfolio-grid {
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); */
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 960px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .portfolio-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
.card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
  transition: transform .15s ease, box-shadow .15s ease;
  width: 100%;
  flex: 0 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.08); }

.card-clickable {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  position: relative;
}

.card-clickable:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.corner {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, .06);
  border: 1px solid var(--vp-c-divider);
  backdrop-filter: blur(6px);
}

.card:hover .corner {
  transform: translateY(-1px);
}

.cover :deep(.cover-slider.before-after-slider) {
  margin: 0;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.cover img {
  display: block;
  width: 100%;
  height: auto;
}
.cover-media {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}
.cover-media iframe,
.cover-media video {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.body { padding: 12px 14px; }
.title { margin:0 0 4px; font-size: 1rem; line-height:1.2; }
.subtitle { margin:0 0 6px; opacity:.8; }
.desc { margin:0 0 8px; font-size:.92rem; opacity:.9; }
.meta { font-size:.85rem; opacity:.8; margin-bottom:8px; }
.tags { display:flex; flex-wrap:wrap; gap:6px; }
.tag { font-size:.75rem; padding:2px 8px; border-radius:999px; border:1px solid var(--vp-c-divider); }

.cta {
  margin-top: 12px;
  font-size: .84rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: gap .15s ease, opacity .15s ease;
  opacity: .95;
}

.card-clickable:hover .cta {
  gap: 7px;
}
</style>
