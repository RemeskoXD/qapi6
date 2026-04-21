import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Guarantees } from '@/components/guarantees';
import { Partners } from '@/components/partners';
import { Services } from '@/components/services';
import { About } from '@/components/about';
import { Process } from '@/components/process';
import { Footer } from '@/components/footer';
// import { GarageDoorScroll } from '@/components/garage-door-scroll';
import { KontaktSection } from '@/components/kontakt-section';
import { MapSection } from '@/components/map-section';
import { ReviewsSection } from '@/components/reviews-section';
import { FaqSection } from '@/components/faq-section';
import { ThreeSteps } from '@/components/three-steps';
import { WindowSaving } from '@/components/window-saving';
import { PopupOffer } from '@/components/popup-offer';

const Booking = dynamic(() => import('@/components/booking').then(mod => mod.Booking), {
  loading: () => <div className="py-20 text-center text-white/50">Načítání rezervačního formuláře...</div>
});

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "QAPI s.r.o.",
    "image": "https://web2.itnahodinu.cz/QAPI/vrata-qapi-uvod-original.webp",
    "@id": "https://qapi.cz",
    "url": "https://qapi.cz",
    "telephone": "+420 735 901 901",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CZ"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Czech Republic"
    },
    "description": "Česká garážová vrata na míru, moderní stínicí technika a profesionální servis oken. Rychlá montáž, záruka až 10 let a doprava po celé ČR.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "124"
    }
  };

  return (
    <main className="flex-1 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <PopupOffer />
      <Navbar />
      <Hero />
      <Partners />
      <WindowSaving />
      <Booking id="rezervace-top" />
      <ThreeSteps />
      <Guarantees />
      {/* <GarageDoorScroll /> */}
      <Services />
      <About />
      <Process />
      <FaqSection />
      <MapSection />
      <ReviewsSection />
      <Booking />
      <KontaktSection />
      <Footer />
    </main>
  );
}
