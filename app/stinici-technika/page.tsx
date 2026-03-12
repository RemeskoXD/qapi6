import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { StiniciSection } from '@/components/stinici-section';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';

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
