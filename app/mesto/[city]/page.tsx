import { cities } from '@/lib/cities';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Booking } from '@/components/booking';
import { Suspense } from 'react';
import { LocalHero } from '@/components/local-hero';
import { Services } from '@/components/services';
import { Process } from '@/components/process';
import { ReviewsSection } from '@/components/reviews-section';
import { PopupOffer } from '@/components/popup-offer';

export function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityObj = cities.find(c => c.slug === city);
  if (!cityObj) return {};

  return {
    title: `Servis oken, garážová vrata a stínění ${cityObj.name} | QAPI`,
    description: `Profesionální servis oken, montáž garážových vrat a stínicí techniky v lokalitě ${cityObj.name}. Rychlý zásah, záruka kvality a doprava zdarma.`,
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityObj = cities.find(c => c.slug === city);
  if (!cityObj) {
    notFound();
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `QAPI s.r.o. - ${cityObj.name}`,
    "image": "https://web2.itnahodinu.cz/QAPI/vrata-qapi-uvod-original.webp",
    "@id": `https://qapi.cz/mesto/${cityObj.slug}`,
    "url": `https://qapi.cz/mesto/${cityObj.slug}`,
    "telephone": "+420 735 901 901",
    "areaServed": {
      "@type": "City",
      "name": cityObj.name
    },
    "description": `Servis oken a dveří, garážová vrata a stínicí technika v lokalitě ${cityObj.name}.`
  };

  return (
    <main className="flex-1 overflow-x-hidden pt-24">
      <PopupOffer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <LocalHero cityName={cityObj.name} />
      <Services />
      <Process />
      <ReviewsSection />
      <Suspense fallback={<div>Načítání...</div>}>
        <Booking />
      </Suspense>
      <Footer />
    </main>
  );
}
