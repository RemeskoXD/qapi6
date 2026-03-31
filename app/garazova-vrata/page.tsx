import { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { VrataSection } from '@/components/vrata-section';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Garážová vrata na míru | Sekční a rolovací vrata | QAPI',
  description: 'Česká sekční, rolovací a průmyslová garážová vrata špičkové kvality. Spojení bezpečnosti, izolace a dokonalého designu. Záruka až 10 let a montáž po celé ČR.',
};

export default function GarazovaVrataPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Montáž a servis garážových vrat",
    "provider": {
      "@type": "LocalBusiness",
      "name": "QAPI s.r.o."
    },
    "description": "Česká sekční, rolovací a průmyslová garážová vrata špičkové kvality. Záruka až 10 let a montáž po celé ČR.",
    "areaServed": {
      "@type": "Country",
      "name": "Czech Republic"
    }
  };

  return (
    <main className="flex-1 overflow-x-hidden pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <VrataSection />
      <Suspense fallback={<div>Načítání...</div>}>
        <Booking />
      </Suspense>
      <Footer />
    </main>
  );
}
