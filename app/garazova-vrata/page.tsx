import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { VrataSection } from '@/components/vrata-section';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';

export default function GarazovaVrataPage() {
  return (
    <main className="flex-1 overflow-x-hidden pt-24">
      <Navbar />
      <VrataSection />
      <Suspense fallback={<div>Načítání...</div>}>
        <Booking />
      </Suspense>
      <Footer />
    </main>
  );
}
