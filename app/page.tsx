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
import { KontaktSection } from '@/components/kontakt-section';
import { MapSection } from '@/components/map-section';
import { ReviewsSection } from '@/components/reviews-section';
import { ThreeSteps } from '@/components/three-steps';
import { WindowSaving } from '@/components/window-saving';

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Partners />
      <WindowSaving />
      <ThreeSteps />
      <Guarantees />
      {/* <GarageDoorScroll /> */}
      <Services />
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
