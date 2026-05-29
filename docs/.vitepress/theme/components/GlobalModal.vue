<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isOpen = ref(false)
const imgSrc = ref('')
const imgAlt = ref('')

const open = (event) => {
  const target = event.target

  if (!(target instanceof HTMLImageElement)) return

  if (!target.closest('.vp-doc')) return

  imgSrc.value = target.dataset.originalSrc || target.getAttribute('src') || target.src
  imgAlt.value = target.alt || 'Expanded view'
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

const close = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  document.addEventListener('click', open)
})

onUnmounted(() => {
  document.removeEventListener('click', open)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="image-modal" @click="close">
        <button type="button" class="close-btn" aria-label="Close image">&times;</button>
        <img :src="imgSrc" :alt="imgAlt" class="modal-content" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

.modal-content {
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: 18px;
  right: 22px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
