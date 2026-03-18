import { Metadata } from 'next';
import { LpForm } from '@/components/lp-form';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Checklist: 5 tichých zabijáků garážových vrat',
  description: 'Zastavte tiché zabijáky garážových vrat, kteří vás brzy budou stát desetitisíce.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ZabijaciGaratovychVratPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center py-12 md:py-24">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left column: Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              ZDARMA KESTAŽENÍ
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight">
              5 tichých zabijáků <span className="text-primary italic font-light">garážových vrat</span>.
            </h1>
            
            <p className="text-xl text-white/70 font-light leading-relaxed">
              Stáhněte si bezplatný checklist a odhalte skryté závady, které vás brzy mohou stát desetitisíce korun za opravy.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-white/80">Odhalte praskající pružiny dříve, než vám spadnou vrata.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-white/80">Zjistěte, proč váš motor zní podivně a jak předejít jeho spálení.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-white/80">Jednoduchá kontrola na 3 minuty, která zachrání vaši garáž.</p>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 relative">
              <div className="text-primary text-4xl absolute -top-4 -left-2 opacity-50">"</div>
              <p className="text-white/80 italic relative z-10">
                Díky checklistu jsem zjistil, že mám úplně povolená lanka. Technik mi řekl, že to bylo za pět dvanáct, jinak bych musel měnit celý motor.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  PK
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Petr Kovář</div>
                  <div className="text-white/50 text-xs">Spokojený zákazník</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50" />
            <div className="relative">
              <LpForm 
                leadMagnetName="Checklist: 5 zabijáků vrat" 
                buttonText="Ano, chci poslat checklist zdarma" 
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

import { CheckCircle2, AlertTriangle } from 'lucide-react';
