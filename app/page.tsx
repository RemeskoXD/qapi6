import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Guarantees } from '@/components/guarantees';
import { Partners } from '@/components/partners';
import { Services } from '@/components/services';
import { About } from '@/components/about';
import { Process } from '@/components/process';
import { Booking } from '@/components/booking';
import { Footer } from '@/components/footer';
// import { GarageDoorScroll } from '@/components/garage-door-scroll';
import { VrataSection } from '@/components/vrata-section';
import { ServisOkenSection } from '@/components/servis-oken-section';
import { StiniciSection } from '@/components/stinici-section';
import { KontaktSection } from '@/components/kontakt-section';
import { MapSection } from '@/components/map-section';
import { ReviewsSection } from '@/components/reviews-section';

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Guarantees />
      <Partners />
      {/* <GarageDoorScroll /> */}
      <Services />
      <VrataSection />
      <ServisOkenSection />
      <StiniciSection />
      <About />
      <Process />
      <MapSection />
      <ReviewsSection />
      <Suspense fallback={<div>Načítání...</div>}>
        <Booking />
      </Suspense>
      <KontaktSection />
      <Footer />
    </main>
  );
}
