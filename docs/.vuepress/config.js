module.exports = {
  title: 'Cloud Guide',
  description: 'Just playing around cloud',
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
        'iam',
        's3',
        'ec2',
        'database',
        'route53',
        'vpcs',
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