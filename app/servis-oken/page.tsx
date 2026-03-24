import { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { ServisOkenSection } from '@/components/servis-oken-section';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Servis oken a dveří | QAPI',
  description: 'Expresní servis oken a dveří. Zastavte úniky tepla a peněz. Opravy, seřízení, promazání kování a výměna těsnění. Získejte kalkulaci zdarma.',
};

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
