import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { onBeforeUnmount, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'
import PortfolioGrid from './components/PortfolioGrid.vue'
import PortfolioPage from './components/PortfolioPage.vue'
import YouTube from './components/YouTube.vue' // Ensure this file exists
import BeforeAfterSlider from './components/BeforeAfterSlider.vue'
import RelatedPortfolioLinks from './components/RelatedPortfolioLinks.vue'
import './custom.css'

// Your helper component
function DiscordCTA() {
  return h('div', { class: 'discord-cta' }, [
    h('p', { class: 'discord-title' }, '💬 Join the Conversation'),
    h('p', null, [
      'Want to chat, share your work, or connect with other creators? ',
      h('a', { 
        href: 'https://discord.gg/xd9BkW7z8m', 
        target: '_blank',
        style: 'text-decoration:none; display:inline-flex; align-items:center; gap:6px; font-weight:600;'
      }, [
        h('img', { 
          src: 'https://cdn-icons-png.flaticon.com/512/5968/5968756.png', 
          alt: 'Discord', 
          width: '20', 
          style: 'vertical-align:middle;' 
        }),
        'Join my Discord server'
      ]),
      '.'
    ])
  ])
}

// The single, merged export
export default {
  extends: DefaultTheme, // It is cleaner to use 'extends' than '...DefaultTheme'
  
  Layout() {
    const { frontmatter } = useData()
    const route = useRoute()
    const isDraft = frontmatter.value?.draft
    const isBlogIndex = route.path === '/blog/'
    let imageModal
    let imageModalImg
    let imageModalClose

    const closeImageModal = () => {
      if (!imageModal) return
      imageModal.classList.remove('is-open')
      imageModalImg.removeAttribute('src')
      imageModalImg.removeAttribute('alt')
      document.body.classList.remove('image-modal-open')
    }

    const openImageModal = (img) => {
      if (!imageModal || !img?.src) return
      imageModalImg.src = img.src
      imageModalImg.alt = img.alt || 'Expanded image'
      imageModal.classList.add('is-open')
      document.body.classList.add('image-modal-open')
    }

    const onDocumentClick = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const clickedContentImage = target.closest('.vp-doc img')
      if (clickedContentImage) {
        openImageModal(clickedContentImage)
        return
      }

      if (!imageModal || !imageModal.classList.contains('is-open')) return

      if (target === imageModal || target === imageModalClose) {
        closeImageModal()
      }
    }

    onMounted(() => {
      imageModal = document.createElement('div')
      imageModal.className = 'image-modal'
      imageModal.innerHTML = `
        <button type="button" class="image-modal-close" aria-label="Close image">×</button>
        <img class="image-modal-content" src="" alt="" />
      `

      imageModalImg = imageModal.querySelector('.image-modal-content')
      imageModalClose = imageModal.querySelector('.image-modal-close')
      document.body.appendChild(imageModal)
      document.addEventListener('click', onDocumentClick)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', onDocumentClick)
      if (imageModal?.parentNode) {
        imageModal.parentNode.removeChild(imageModal)
      }
      document.body.classList.remove('image-modal-open')
    })

    // Handle Drafts
    if (isDraft && !isBlogIndex) {
      return h(DefaultTheme.NotFound)
    }

    // Return Layout with slots
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => {
        const blocks = []

        // Add Related Projects for portfolio pages
        if (route.path.startsWith('/portfolio-archive/')) {
          blocks.push(h(RelatedPortfolioLinks))
        }

        // Add Discord CTA for blog pages
        if (frontmatter.value?.comments !== false && route.path.startsWith('/blog/')) {
          blocks.push(h(DiscordCTA))
        }

        return blocks.length ? h('div', { class: 'doc-after-wrapper' }, blocks) : null
      }
    })
  },

  enhanceApp({ app, router }) {
    // 1. Run the default theme's enhanceApp if it exists
    if (typeof DefaultTheme.enhanceApp === 'function') {
      DefaultTheme.enhanceApp({ app, router })
    }

    // 2. Register PortfolioGrid
    app.component('PortfolioGrid', PortfolioGrid)

    // 3. Register PortfolioPage
    app.component('PortfolioPage', PortfolioPage)

    // 4. Register YouTube (This is the new part added here)
    app.component('YouTube', YouTube)

    // 5. Register reusable before/after slider
    app.component('BeforeAfterSlider', BeforeAfterSlider)
  }
}
