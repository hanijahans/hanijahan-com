import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useData, useRoute } from 'vitepress'
import PortfolioGrid from './components/PortfolioGrid.vue'
import PortfolioPage from './components/PortfolioPage.vue'
import YouTube from './components/YouTube.vue' // Ensure this file exists
import BeforeAfterSlider from './components/BeforeAfterSlider.vue'
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

    // Handle Drafts
    if (isDraft && !isBlogIndex) {
      return h(DefaultTheme.NotFound)
    }

    // Return Layout with slots
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => {
        if (frontmatter.value?.comments === false) return null
        if (!route.path.startsWith('/blog/')) return null
        return h(DiscordCTA)
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
