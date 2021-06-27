module.exports = {
  title: 'Cloud Guide',
  description: 'Just playing around cloud',
  head: [['link', { rel: 'icon', href: `/icons/icon.png` }]],
  plugins: ['@vuepress/last-updated', '@vuepress/back-to-top'],
  themeConfig: {
    sidebarDepth: 3,
    smoothScroll: true,
    searchPlaceholder: 'Tìm kiếm...',
    displayAllHeaders: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Developer', link: '/developer/' },
      { text: 'Solutions Architect', link: '/solutions-architect/' },
      { text: 'About me', link: 'https://github.com/phanduc0908' }
    ],
    sidebar: {
      '/developer/': [
        '',
        'introduction',
        'iam',
        'vpcs',
        's3',
        'ec2',
        'database',
        'route53',
        'ha-architect',
        'application',
        'security',
        'serverless'
      ],
      '/solutions-architect/': [
        ''
      ]
    },
  }
}
