import { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { StiniciSection } from '@/components/stinici-section';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';
import { PopupOffer } from '@/components/popup-offer';

export const metadata: Metadata = {
  title: 'Stínicí technika a venkovní rolety na míru | QAPI',
  description: 'Získejte absolutní kontrolu nad světlem a teplotou ve vašem domově. Prémiové vnitřní a venkovní stínění, markýzy a rolety na míru. Odborná montáž po celé ČR.',
};

export default function StiniciTechnikaPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Montáž stínicí techniky",
    "provider": {
      "@type": "LocalBusiness",
      "name": "QAPI s.r.o."
    },
    "description": "Prémiové vnitřní a venkovní stínění, markýzy a rolety na míru. Odborná montáž po celé ČR.",
    "areaServed": {
      "@type": "Country",
      "name": "Czech Republic"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "124"
    }
  };

  return (
    <main className="flex-1 overflow-x-hidden pt-24">
      <PopupOffer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <StiniciSection />
      <Suspense fallback={<div>Načítání...</div>}>
        <Booking />
      </Suspense>
      <Footer />
    </main>
  );
}
