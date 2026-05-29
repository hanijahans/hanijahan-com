<template>
  <figure
    ref="sliderEl"
    class="before-after-slider"
    :class="{ 'is-static': !isInteractive }"
    :style="frameStyle"
    @pointerdown="isInteractive ? onPointerDown : null"
  >
    <picture class="slider-picture">
      <source v-if="beforeSources.avif" :srcset="beforeSources.avif" type="image/avif" />
      <source v-if="beforeSources.webp" :srcset="beforeSources.webp" type="image/webp" />
      <img
        class="slider-image"
        :src="beforeSources.fallback"
        :alt="beforeAlt || 'Before image'"
        draggable="false"
        loading="lazy"
        decoding="async"
      />
    </picture>

    <div class="after-layer" :style="afterLayerStyle" aria-hidden="true">
      <picture class="slider-picture">
        <source v-if="afterSources.avif" :srcset="afterSources.avif" type="image/avif" />
        <source v-if="afterSources.webp" :srcset="afterSources.webp" type="image/webp" />
        <img
          class="slider-image"
          :src="afterSources.fallback"
          alt=""
          draggable="false"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>

    <div class="divider" :style="dividerStyle" aria-hidden="true">
      <span class="handle" />
    </div>

    <input
      v-if="isInteractive"
      class="slider-range"
      type="range"
      min="0"
      max="100"
      step="1"
      :value="value"
      :aria-label="comparisonLabel"
      @input="onInput"
    />
  </figure>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getOptimizedImageSources } from '../imageVariants'

const props = defineProps({
  beforeSrc: {
    type: String,
    required: true
  },
  afterSrc: {
    type: String,
    required: true
  },
  beforeAlt: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '420px'
  },
  initial: {
    type: Number,
    default: 50,
    validator: (value) => value >= 0 && value <= 100
  },
  comparisonLabel: {
    type: String,
    default: 'Before and after image comparison'
  },
  interactive: {
    type: Boolean,
    default: true
  },
  static: {
    type: Boolean,
    default: false
  }
})

const sliderEl = ref(null)
const value = ref(clamp(props.initial))
const isInteractive = computed(() => props.interactive && !props.static)
const beforeSources = computed(() => getOptimizedImageSources(props.beforeSrc))
const afterSources = computed(() => getOptimizedImageSources(props.afterSrc))

const reveal = computed(() => `${value.value}%`)
const frameStyle = computed(() => ({ height: props.height }))
const afterLayerStyle = computed(() => ({
  clipPath: `inset(0 ${100 - value.value}% 0 0)`
}))
const dividerStyle = computed(() => ({ left: reveal.value }))

function clamp(next) {
  return Math.min(100, Math.max(0, Number(next) || 0))
}

function setFromClientX(clientX) {
  if (!sliderEl.value) return

  const rect = sliderEl.value.getBoundingClientRect()
  if (!rect.width) return

  const percentage = ((clientX - rect.left) / rect.width) * 100
  value.value = clamp(percentage)
}

function onInput(event) {
  value.value = clamp(event.target.value)
}


function onPointerDown(event) {
  if (!sliderEl.value) return

  sliderEl.value.setPointerCapture?.(event.pointerId)
  setFromClientX(event.clientX)

  const move = (moveEvent) => setFromClientX(moveEvent.clientX)
  const up = () => {
    sliderEl.value?.releasePointerCapture?.(event.pointerId)
    sliderEl.value?.removeEventListener('pointermove', move)
    sliderEl.value?.removeEventListener('pointerup', up)
    sliderEl.value?.removeEventListener('pointercancel', up)
  }

  sliderEl.value.addEventListener('pointermove', move)
  sliderEl.value.addEventListener('pointerup', up)
  sliderEl.value.addEventListener('pointercancel', up)
}
</script>

<style scoped>
.before-after-slider {
  position: relative;
  width: 100%;
  margin: 1.25rem 0;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.14);
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.slider-picture,
.slider-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.slider-image {
  object-fit: cover;
  pointer-events: none;
  user-select: none;
}

.after-layer {
  position: absolute;
  inset: 0;
}

.divider {
  position: absolute;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  width: 2px;
  background: rgb(255 255 255 / 0.95);
  box-shadow: 0 0 0 1px rgb(0 0 0 / 0.25);
  z-index: 3;
  pointer-events: none;
}

.handle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2.2rem;
  height: 2.2rem;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  border: 2px solid rgb(255 255 255 / 0.95);
  background: rgb(0 0 0 / 0.42);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.25);
}

.handle::before,
.handle::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 0;
  height: 0;
  transform: translateY(-50%);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}

.handle::before {
  left: 0.38rem;
  border-right: 7px solid rgb(255 255 255 / 0.92);
}

.handle::after {
  right: 0.38rem;
  border-left: 7px solid rgb(255 255 255 / 0.92);
}

.slider-range {
  position: absolute;
  inset: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: ew-resize;
  z-index: 5;
  touch-action: pan-y;
}

.before-after-slider.is-static {
  cursor: default;
}

.before-after-slider.is-static .handle {
  display: none;
}

.before-after-slider:focus-within {
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent),
    0 8px 20px rgb(0 0 0 / 0.14);
}

.slider-range:focus-visible {
  outline: none;
}

.label {
  position: absolute;
  top: 0.75rem;
  z-index: 4;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgb(255 255 255 / 0.95);
  background: rgb(0 0 0 / 0.45);
  user-select: none;
  pointer-events: none;
}

.label.before {
  left: 0.75rem;
}

.label.after {
  right: 0.75rem;
}

@media (max-width: 640px) {
  .before-after-slider {
    border-radius: 12px;
    margin: 1rem 0;
  }

  .handle {
    width: 2rem;
    height: 2rem;
  }
}
</style>
