import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
     
      {
        source: '/:lang(en|fr|ar)',
        destination: '/:lang/dashboards/crm',
        permanent: true,
        locale: false
      },
      {
        source: '/((?!(?:en|fr|ar|front-pages|logo_am.svg|favicon.ico)\\b)):path',
        destination: '/en/:path',
        permanent: true,
        locale: false
      }
    ]
  },
  async rewrites() {
    return [
      /**
       * Alias root -> landing page
       * URL browser tetap "/"
       */
      {
        source: '/',
        destination: '/front-pages/landing-page'
      },
    ]
  }
}

export default nextConfig
