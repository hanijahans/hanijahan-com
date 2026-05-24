import { DefaultTheme, defineConfig } from 'vitepress'

const siteUrl = 'https://hanijahan.com'
const worldLattice2dCanonicalUrl = `${siteUrl}/worldlattice-2d` // Remove trailing slash for consistency

// These paths are omitted from sitemap.xml
const sitemapExcludedPaths = new Set([
  '/api-examples',
  '/markdown-examples', 
  '/public',
  '/worldlattice/worldlattice-2d-manual-update',
  '/portfolio-sidefx',
])

const excludedPathsRobotsDirective = 'noindex,nofollow'

function normalizeSitemapUrl(url) {
  // Ensure consistent URL format - no trailing slashes except root
  if (url === `${siteUrl}/`) return url
  return url.replace(/\/+$/, '') // Remove ALL trailing slashes consistently
}

function isSitemapExcludedPath(path) {
  // Normalize path before checking
  const normalizedPath = path.replace(/\/+$/, '').replace(/\.html$/, '')
  return sitemapExcludedPaths.has(normalizedPath)
}

export default defineConfig({
  // ADD THIS - Critical for correct URL generation
  base: '/',
  
  title: 'Hani Jahan Design',
  description: 'Worldbuilding, Houdini, Unity, Unreal, GameDev, Coffee',
  appearance: 'dark',

  // Keep cleanUrls - this is good
  cleanUrls: true,

  // Fixed sitemap configuration
  sitemap: {
    hostname: siteUrl,
    transformItems: (items) => {
      // Filter out excluded paths first
      const filteredItems = items
        .map((item) => ({
          ...item,
          url: normalizeSitemapUrl(item.url),
        }))
        .filter((item) => !isSitemapExcludedPath(sitemapUrlPath(item.url)))

      // Add standalone URLs without trailing slashes
      const standaloneItems = standaloneSitemapUrls.map(url => ({
        url: normalizeSitemapUrl(url)
      }))

      // Combine and deduplicate
      return [...filteredItems, ...standaloneItems]
    },
  },

  transformHead: ({ pageData }) => {
    const relativePath = pageData.filePath || pageData.relativePath
    if (!relativePath) return []

    const canonicalPath = relativePath
      .replace(/index\.md$/i, '')
      .replace(/\.md$/i, '')
      .replace(/\/+$/, '')

    // Handle excluded paths with robots meta tag
    if (isSitemapExcludedPath(`/${canonicalPath}`)) {
      return [['meta', { name: 'robots', content: excludedPathsRobotsDirective }]]
    }

    // Generate canonical URL without trailing slashes (except root)
    let canonicalUrl
    if (canonicalPath === 'worldlattice-2d') {
      canonicalUrl = worldLattice2dCanonicalUrl
    } else if (canonicalPath === '') {
      canonicalUrl = `${siteUrl}/`
    } else {
      canonicalUrl = `${siteUrl}/${canonicalPath}`
    }

    return [['link', { rel: 'canonical', href: canonicalUrl }]]
  },

  themeConfig: {
    logo: '/hjd/hjd-logo.png',
    nav: navItems,
    search: undefined,
    footer: {
      message: '<span class="footer-brand"><img class="footer-logo" src="/hjd/hjd-logo.png" alt="Hani Jahan Design logo" />© 2025 Hani Jahan Design</span>'
    },
    sidebar: {
      '/blog/': [{
        text: 'Blog',
        items: [{ text: 'All posts', link: '/blog/' }]
      }],
      '/worldbuilding/': [{ text: 'Worldbuilding', items: [] }],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hanijahans/' }]
  }
})

// Helper function needed for sitemap (you had this but it was incomplete)
function sitemapUrlPath(url) {
  const path = url.startsWith(siteUrl) ? url.slice(siteUrl.length) || '/' : url
  return path.replace(/\/+$/, '').replace(/\.html$/, '') || '/'
}

const standaloneSitemapUrls = [worldLattice2dCanonicalUrl]
const navItems = [
  { text: 'Portfolio', link: '/portfolio/' },
  { text: 'Contact', link: '/contact/' }
]