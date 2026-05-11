import { DefaultTheme, defineConfig } from 'vitepress'

const navItems: DefaultTheme.NavItem[] = [
  // { text: 'Home', link: '/' },
  // { text: 'Blog', link: '/blog/' },
   { text: 'Portfolio', link: '/portfolio/' },
  // {
  //   text: 'Products',
  //   items: [{ text: 'Unity Free Pack', link: '/products/unity/free-pack/' }]
  // },
  // { text: 'GameDev', link: '/worldlattice/' },
  { text: 'Contact', link: '/contact/' }
]

export default defineConfig({
  // Site
  title: 'Hani Jahan Design',
  description: 'Worldbuilding, Houdini, Unity, Unreal, GameDev, Coffee',
  appearance: 'dark',

  cleanUrls: true,

  // Sitemap (top-level)
  sitemap: {
    hostname: 'https://hanijahan.com',
    transformItems: (items) =>
      items.map((item) => ({
        ...item,
        url:
          item.url.length > 1
            ? item.url.replace(/\/+$/, '')
            : item.url
      }))
  },

  // Inject MailerLite universal snippet and stylesheet into the <head> on every page.
  // The script loads MailerLite's universal JS and initialises the account.
  // Without this, the embedded newsletter form won't render on your static pages.
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'script',
      {},
      `// MailerLite Universal snippet\n(function(w,d,e,u,f,l,n){
        w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
        l=d.createElement(e);
        l.async=1;
        l.src=u;
        n=d.getElementsByTagName(e)[0];
        n.parentNode.insertBefore(l,n);
      })(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
      // Initialise your MailerLite account (replace with your account ID if different)
      ml('account','1722221');`
    ],
    [
      'link',
      { rel: 'stylesheet', href: 'https://assets.mailerlite.com/css/universal.css' }
    ]
  ],

  transformHead: ({ pageData }) => {
    const siteUrl = 'https://hanijahan.com'
    const relativePath = pageData.filePath || pageData.relativePath

    if (!relativePath) return

    const canonicalPath = relativePath
      .replace(/index\.md$/i, '')
      .replace(/\.md$/i, '')
      .replace(/\/+$/, '')
    const canonicalUrl = canonicalPath ? `${siteUrl}/${canonicalPath}` : `${siteUrl}`

    return [['link', { rel: 'canonical', href: canonicalUrl }]]
  },

  themeConfig: {
    logo: '/hjd/hjd-logo.png',
    nav: navItems,
    
    search: undefined, //{ provider: 'local' },

    footer: {
      // message: '© Hani Jahan Design'
      message:
        '<span class="footer-brand"><img class="footer-logo" src="/hjd/hjd-logo.png" alt="Hani Jahan Design logo" />© 2025 Hani Jahan Design</span>'
    },

    // Sidebar: map a section to a path prefix
    sidebar: {
      '/blog/': [
        {
          text: 'Blog',
          items: [{ text: 'All posts', link: '/blog/' }]
        }
      ],

      '/worldbuilding/': [{ text: 'Worldbuilding', items: [] }],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/hanijahans/' }]
  },
})
