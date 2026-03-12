import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { ServisOkenSection } from '@/components/servis-oken-section';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';

export default function ServisOkenPage() {
  return (
    <main className="flex-1 overflow-x-hidden pt-24">
      <Navbar />
      <ServisOkenSection />
      <Suspense fallback={<div>Načítání...</div>}>
        <Booking />
      </Suspense>
      <Footer />
    </main>
  );
}
