import { MetadataRoute } from 'next'
import { cities } from '@/lib/cities'
 
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

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/mesto/${city.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...cityPages];
}
