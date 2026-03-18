import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ropemi s.r.o. - Servis oken a garážová vrata",
    "image": "https://web2.itnahodinu.cz/QAPI/Logo-Bile.webp",
    "@id": "https://qapi.cz",
    "url": "https://qapi.cz",
    "telephone": "+420702835964",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Varšavská 715/36, Vinohrady",
      "addressLocality": "Praha 2",
      "postalCode": "120 00",
      "addressCountry": "CZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.087811,
      "longitude": 14.420460
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.facebook.com/qapi.cz",
      "https://www.instagram.com/qapi.cz"
    ]
  };

  return (
    <footer className="bg-background border-t border-white/5 pt-24 pb-12 relative overflow-hidden [perspective:1000px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 [transform-style:preserve-3d]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="space-y-6 transform transition-transform duration-500 hover:translate-z-10">
            <Link href="/" className="flex items-center gap-2 group inline-block">
              <div className="relative w-64 h-20 md:w-80 md:h-24 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-y-10">
                <Image
                  src="https://web2.itnahodinu.cz/QAPI/Logo-Bile.webp"
                  alt="QAPI Logo"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
            <p className="text-white/60 font-light leading-relaxed max-w-xs">
              Luxusní garážová vrata, stínicí technika a profesionální servis oken s důrazem na detail a kvalitu.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/qapi.cz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(207,175,108,0.4)]" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/qapi.cz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(207,175,108,0.4)]" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 transform transition-transform duration-500 hover:translate-z-10">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Služby</h4>
            <ul className="space-y-4">
              {[
                { name: 'Garážová vrata', href: '/garazova-vrata' },
                { name: 'Servis oken', href: '/servis-oken' },
                { name: 'Stínicí technika', href: '/stinici-technika' },
                { name: 'Průmyslová vrata', href: '/garazova-vrata' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/60 hover:text-primary transition-colors font-light relative group inline-block">
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2 inline-block">{item.name}</span>
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6 transform transition-transform duration-500 hover:translate-z-10">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Společnost</h4>
            <ul className="space-y-4">
              {[
                { name: 'O nás', href: '/#o-nas' },
                { name: 'Kontakt', href: '/#kontakt' },
                { name: 'Reference', href: '/#o-nas' },
                { name: 'Obchodní podmínky', href: '/obchodni-podminky' },
                { name: 'Ochrana osobních údajů', href: '/ochrana-osobnich-udaju' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/60 hover:text-primary transition-colors font-light relative group inline-block">
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2 inline-block">{item.name}</span>
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6 transform transition-transform duration-500 hover:translate-z-10">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Kontakt</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+420702835964" className="flex items-center gap-3 text-white/60 hover:text-primary transition-all duration-300 font-light group hover:translate-x-2">
                  <Phone className="w-4 h-4 group-hover:text-primary transition-colors group-hover:scale-110 group-hover:rotate-12" />
                  +420 702 835 964
                </a>
              </li>
              <li>
                <a href="mailto:info@qapi.cz" className="flex items-center gap-3 text-white/60 hover:text-primary transition-all duration-300 font-light group hover:translate-x-2">
                  <Mail className="w-4 h-4 group-hover:text-primary transition-colors group-hover:scale-110 group-hover:-rotate-12" />
                  info@qapi.cz
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 font-light group transition-all duration-300 hover:translate-x-2 hover:text-white/80">
                <MapPin className="w-4 h-4 mt-1 shrink-0 group-hover:text-primary transition-colors group-hover:scale-110 group-hover:rotate-12" />
                <span>
                  Ropemi s.r.o.<br />
                  Varšavská 715/36, Vinohrady<br />
                  120 00 Praha 2<br />
                  IČO: 22333941<br />
                  <span className="text-xs opacity-70 mt-1 block">Společnost vedená u Městského soudu v Praze, spisová značka: C 414732</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-light">
            © {new Date().getFullYear()} QAPI. Všechna práva vyhrazena.
          </p>
          <div className="text-white/30 text-xs font-light text-center md:text-left max-w-2xl">
            <strong>Obsluhované regiony:</strong> Servis oken Praha, Brno, Ostrava, Plzeň, Liberec, Olomouc, České Budějovice, Hradec Králové. Montáž garážových vrat a stínicí techniky po celé ČR.
          </div>
          <p className="text-white/40 text-sm font-light group">
            Vytvořeno s důrazem na <span className="text-primary italic font-bold group-hover:drop-shadow-[0_0_8px_rgba(207,175,108,0.8)] transition-all duration-300 inline-block group-hover:scale-110">dokonalost</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
