import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/lp/kontrola-oken-zdarma',
        '/lp/tajny-trik-okna',
        '/lp/zabijaci-garazovych-vrat',
      ],
    },
    sitemap: 'https://qapi.cz/sitemap.xml',
  }
}
