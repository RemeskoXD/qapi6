import { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { VrataSection } from '@/components/vrata-section';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Garážová vrata na míru | QAPI',
  description: 'Sekční, rolovací a průmyslová vrata špičkové kvality. Spojení bezpečnosti, izolace a dokonalého designu. Záruka až 10 let.',
};

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
