import { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { StiniciSection } from '@/components/stinici-section';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Stínicí technika a venkovní rolety | QAPI',
  description: 'Získejte absolutní kontrolu nad světlem a teplotou ve vašem domově. Prémiové stínění, markýzy a venkovní rolety na míru.',
};

export default function StiniciTechnikaPage() {
  return (
    <main className="flex-1 overflow-x-hidden pt-24">
      <Navbar />
      <StiniciSection />
      <Suspense fallback={<div>Načítání...</div>}>
        <Booking />
      </Suspense>
      <Footer />
    </main>
  );
}
