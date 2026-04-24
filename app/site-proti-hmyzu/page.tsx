import { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';
import { PopupOffer } from '@/components/popup-offer';
import { SiteHmyzSection } from '@/components/site-hmyz-section';

export const metadata: Metadata = {
  title: 'Sítě proti hmyzu do oken a dveří | QAPI',
  description: 'Zbavte se komárů a much navždy. Elegantní a funkční sítě do oken i dveří na míru. Česká výroba, zaměření zdarma a sleva až 21%. Odborná montáž.',
};

export default function SiteProtiHmyzuPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Montáž sítí proti hmyzu",
    "provider": {
      "@type": "LocalBusiness",
      "name": "QAPI s.r.o."
    },
    "description": "Sítě proti hmyzu do oken i dveří na míru. Česká výroba, zaměření zdarma a instalace po celé ČR.",
    "areaServed": {
      "@type": "Country",
      "name": "Czech Republic"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "89"
    }
  };

  return (
    <main className="flex-1 overflow-x-hidden pt-[80px]">
      <PopupOffer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <SiteHmyzSection />
      <Suspense fallback={<div>Načítání...</div>}>
        <Booking />
      </Suspense>
      <Footer />
    </main>
  );
}
