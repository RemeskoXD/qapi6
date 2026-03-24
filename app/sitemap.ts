import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://qapi.cz';
  const lastModified = new Date();

  const routes = [
    '',
    '/servis-oken',
    '/garazova-vrata',
    '/stinici-technika',
    '/lp/kontrola-oken-zdarma',
    '/lp/tajny-trik-okna',
    '/lp/zabijaci-garazovych-vrat',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
