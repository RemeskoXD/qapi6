import { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { ServisOkenSection } from '@/components/servis-oken-section';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';
import { PopupOffer } from '@/components/popup-offer';
import { FaqSection } from '@/components/faq-section';

export const metadata: Metadata = {
  title: 'Servis oken a dveří | Profesionální oprava a seřízení | QAPI',
  description: 'Expresní servis oken a dveří po celé ČR. Zastavte úniky tepla a peněz. Opravy, seřízení, promazání kování a výměna těsnění. Získejte kalkulaci zdarma.',
};

export default function ServisOkenPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Servis oken a dveří",
    "provider": {
      "@type": "LocalBusiness",
      "name": "QAPI s.r.o."
    },
    "description": "Expresní servis oken a dveří po celé ČR. Opravy, seřízení, promazání kování a výměna těsnění.",
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
      <ServisOkenSection />
      <FaqSection />
      <Suspense fallback={<div>Načítání...</div>}>
        <Booking />
      </Suspense>
      <Footer />
    </main>
  );
}
