'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { MapPin, CheckCircle2 } from 'lucide-react';

export function CityHero({ cityName }: { cityName: string }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Působíme v lokalitě {cityName} a okolí</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Servis oken a garážová vrata <br className="hidden md:block" />
            <span className="text-primary italic font-light">{cityName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto"
          >
            Ztrácíte teplo kvůli špatně seřízeným oknům? Potřebujete spolehlivá garážová vrata? Naši technici jsou připraveni vyrazit k vám v lokalitě {cityName}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#rezervace"
              className="w-full sm:w-auto bg-primary hover:bg-[#b5952f] text-primary-foreground font-bold px-8 py-4 rounded-md uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              Nezávazná kalkulace
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/60"
          >
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Rychlý dojezd do lokality {cityName}</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Zaměření zdarma</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Záruka kvality</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
