import { LokalityClient } from '@/components/lokality-client';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MapSection } from '@/components/map-section';
import { Booking } from '@/components/booking';
import { KontaktSection } from '@/components/kontakt-section';
import { ThreeSteps } from '@/components/three-steps';
import { Guarantees } from '@/components/guarantees';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lokality působnosti | QAPI',
  description: 'Podívejte se, ve kterých městech v České republice poskytujeme servis oken, montáž garážových vrat a stínicí techniky.',
};

export default function LokalityPage() {
  return (
    <main className="flex-1 overflow-x-hidden pt-24">
      <Navbar />
      <section className="py-20 bg-background min-h-[60vh] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.05),transparent_50%)]" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 drop-shadow-lg">
              Kde všude <span className="text-primary italic font-light">působíme?</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Naše služby poskytujeme po celé České republice. Vyberte si své město pro více informací o servisu oken a montáži garážových vrat.
            </p>
          </div>

          <LokalityClient />
        </div>
      </section>
      
      <ThreeSteps />
      <Guarantees />
      <MapSection />
      
      <Suspense fallback={<div>Načítání...</div>}>
        <Booking />
      </Suspense>
      
      <KontaktSection />
      
      <Footer />
    </main>
  );
}
