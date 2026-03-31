export const cities = [
  { name: 'Praha', slug: 'praha' },
  { name: 'Brno', slug: 'brno' },
  { name: 'Ostrava', slug: 'ostrava' },
  { name: 'Plzeň', slug: 'plzen' },
  { name: 'Liberec', slug: 'liberec' },
  { name: 'Olomouc', slug: 'olomouc' },
  { name: 'České Budějovice', slug: 'ceske-budejovice' },
  { name: 'Hradec Králové', slug: 'hradec-kralove' },
  { name: 'Ústí nad Labem', slug: 'usti-nad-labem' },
  { name: 'Pardubice', slug: 'pardubice' },
  { name: 'Zlín', slug: 'zlin' },
  { name: 'Havířov', slug: 'havirov' },
  { name: 'Kladno', slug: 'kladno' },
  { name: 'Most', slug: 'most' },
  { name: 'Opava', slug: 'opava' },
  { name: 'Frýdek-Místek', slug: 'frydek-mistek' },
  { name: 'Karviná', slug: 'karvina' },
  { name: 'Jihlava', slug: 'jihlava' },
  { name: 'Teplice', slug: 'teplice' },
  { name: 'Děčín', slug: 'decin' },
  { name: 'Karlovy Vary', slug: 'karlovy-vary' },
  { name: 'Chomutov', slug: 'chomutov' },
  { name: 'Jablonec nad Nisou', slug: 'jablonec-nad-nisou' },
  { name: 'Mladá Boleslav', slug: 'mlada-boleslav' },
  { name: 'Prostějov', slug: 'prostejov' },
  { name: 'Přerov', slug: 'prerov' },
  { name: 'Třinec', slug: 'trinec' },
  { name: 'Česká Lípa', slug: 'ceska-lipa' },
  { name: 'Třebíč', slug: 'trebic' },
  { name: 'Tábor', slug: 'tabor' }
];

export function getCityBySlug(slug: string) {
  return cities.find(c => c.slug === slug);
}
