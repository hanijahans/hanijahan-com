import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { DefaultTheme, defineConfig } from 'vitepress'

const siteUrl = 'https://hanijahan.com'
const socialPreviewImage = `${siteUrl}/hjd/social-preview.jpg`
const configDir = dirname(fileURLToPath(import.meta.url))
const portfolioImageVariants = loadPortfolioImageVariants()


function loadPortfolioImageVariants() {
  const manifestPath = resolve(configDir, '../data/portfolio-image-variants.ts')
  const manifestSource = readFileSync(manifestPath, 'utf8')
  const match = manifestSource.match(/portfolioImageVariants:\s*Record<string, PortfolioImageVariant>\s*=\s*([\s\S]*)\n$/)

  if (!match) return {}

  try {
    return JSON.parse(match[1]) as Record<string, { webp?: string; avif?: string }>
  } catch {
    return {}
  }
}

function escapeHtmlAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function parseHtmlAttributes(attrs: string) {
  const parsed: Record<string, string> = {}
  const attrPattern = /([:@\w-]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g
  let match: RegExpExecArray | null

  while ((match = attrPattern.exec(attrs)) !== null) {
    const [, name, rawValue] = match
    if (!name) continue

    if (rawValue === undefined) {
      parsed[name] = ''
      continue
    }

    parsed[name] = rawValue.replace(/^(["'])([\s\S]*)\1$/, '$2')
  }

  return parsed
}

function serializeHtmlAttributes(attrs: Record<string, string>) {
  return Object.entries(attrs)
    .map(([name, value]) => value === '' ? name : `${name}="${escapeHtmlAttribute(value)}"`)
    .join(' ')
}

function renderOptimizedPortfolioPicture(src: string, attrs: Record<string, string>) {
  const variant = portfolioImageVariants[src]
  if (!variant?.avif && !variant?.webp) return null

  const imgAttrs = {
    ...attrs,
    src,
    loading: attrs.loading || 'lazy',
    decoding: attrs.decoding || 'async',
  }
  const serializedAttrs = serializeHtmlAttributes(imgAttrs)

  return `<picture class="portfolio-optimized-picture">${variant.avif ? `<source srcset="${escapeHtmlAttribute(variant.avif)}" type="image/avif">` : ''}${variant.webp ? `<source srcset="${escapeHtmlAttribute(variant.webp)}" type="image/webp">` : ''}<img ${serializedAttrs}></picture>`
}

function transformPortfolioHtmlImages(html: string) {
  return html.replace(/<img\s+([^>]*?)\s*\/?\s*>/gi, (match, rawAttrs) => {
    const attrs = parseHtmlAttributes(rawAttrs)
    if (!attrs.src) return match

    return renderOptimizedPortfolioPicture(attrs.src, attrs) || match
  })
}

// These paths are omitted from sitemap.xml
// These paths stay published on the site but are hidden from search indexing.
// They are omitted from sitemap.xml and get a robots noindex meta tag.
const sitemapExcludedPaths = new Set([
  '/api-examples',
  '/markdown-examples',
  '/public',
  '/dev/interactive-app-hosting',
  '/dev/frontmatter-standards',

  '/portfolio-all',
  '/portfolio-datavis',
  '/portfolio-gameart',
  '/portfolio-geo',
  '/portfolio-indiegame',
  '/portfolio-medical',
  '/portfolio-ta',

  '/portfolio-archive/community',
  '/portfolio-archive/portfolio-algorithmic',
  '/portfolio-archive/procedural-utility-tools-collection',
  '/portfolio-archive/space-colonization-algorithm',
  '/portfolio-archive/superformula-algorithm-generative-design',
  '/portfolio-archive/procedural-infrastructure-system-modular-parametric',

  '/genomo',
  '/geonode',
  '/apps/genomo',
  '/apps/geonode',
  '/worldlattice/worldlattice-2d-manual-update',
  '/worldlattice/documentation',
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

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/hjd/favicon-32.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/hjd/apple-touch-icon.png' }],

    ['meta', { property: 'og:title', content: 'Hani Jahan Portfolio | Hani Jahan Design' }],
    ['meta', { property: 'og:description', content: 'Technical Artist focused on procedural systems, Houdini tools, geospatial workflows, and real-time environments.' }],
    ['meta', { property: 'og:image', content: socialPreviewImage }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:url', content: `${siteUrl}/` }],
    ['meta', { property: 'og:type', content: 'website' }],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Hani Jahan Portfolio | Hani Jahan Design' }],
    ['meta', { name: 'twitter:description', content: 'Technical Artist focused on procedural systems, Houdini tools, geospatial workflows, and real-time environments.' }],
    ['meta', { name: 'twitter:image', content: socialPreviewImage }],
  ],

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
      const standaloneItems = standaloneSitemapUrls
        .map(url => ({
          url: normalizeSitemapUrl(url)
        }))
        .filter((item) => !isSitemapExcludedPath(sitemapUrlPath(item.url)))

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
    if (canonicalPath === '') {
      canonicalUrl = `${siteUrl}/`
    } else {
      canonicalUrl = `${siteUrl}/${canonicalPath}`
    }

    return [['link', { rel: 'canonical', href: canonicalUrl }]]
  },


  markdown: {
    config(md) {
      const defaultImageRenderer = md.renderer.rules.image
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const src = token.attrGet('src')

        if (src) {
          const attrs: Record<string, string> = {}
          for (const [name, value] of token.attrs || []) {
            attrs[name] = value || ''
          }
          attrs.alt = self.renderInlineAsText(token.children || [], options, env)

          const optimizedPicture = renderOptimizedPortfolioPicture(src, attrs)
          if (optimizedPicture) return optimizedPicture
        }

        return defaultImageRenderer
          ? defaultImageRenderer(tokens, idx, options, env, self)
          : self.renderToken(tokens, idx, options)
      }

      md.core.ruler.after('inline', 'portfolio_image_html_variants', (state) => {
        for (const token of state.tokens) {
          if (token.type === 'html_block' || token.type === 'html_inline') {
            token.content = transformPortfolioHtmlImages(token.content)
          }
        }
      })
    },
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

// Helper function for sitemap path normalization
function sitemapUrlPath(url: string) {
  // Normalize URL first to ensure consistent format
  const normalizedUrl = normalizeSitemapUrl(url)
  const path = normalizedUrl.startsWith(siteUrl)
    ? normalizedUrl.slice(siteUrl.length) || '/'
    : normalizedUrl

  const withoutExtension = path
    .replace(/index\.html$/i, '')
    .replace(/\.html$/i, '')
    .replace(/\/+$/, '')

  if (!withoutExtension || withoutExtension === '/') return '/'

  return withoutExtension.startsWith('/')
    ? withoutExtension
    : `/${withoutExtension}`
}

const standaloneSitemapUrls = [
  `${siteUrl}/apps/genomo`,
  `${siteUrl}/apps/geonode`,
  `${siteUrl}/apps/worldlattice-2d`,
]

const navItems = [
  { text: 'Portfolio', link: '/portfolio/' },
  {
    text: 'Labs',
    items: [
      { text: 'Genomo', link: '/genomo/' },
      { text: 'GeoNode', link: '/geonode/' },
      { text: 'WorldLattice 2D', link: '/worldlattice-2d/' },
    ],
  },
  { text: 'Contact', link: '/contact/' },
]
