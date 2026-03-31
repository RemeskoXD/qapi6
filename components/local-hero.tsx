'use client';

import { motion } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function LocalHero({ cityName }: { cityName: string }) {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-background border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">Působíme v lokalitě {cityName} a okolí</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg"
          >
            Servis oken a garážová vrata <br/>
            <span className="text-primary italic font-light">{cityName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Hledáte spolehlivého partnera pro opravu oken, montáž nových garážových vrat nebo stínicí techniky v lokalitě {cityName}? Jsme tu pro vás s rychlým dojezdem a profesionálním přístupem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="#rezervace" 
              className="bg-primary hover:bg-[#b5952f] text-primary-foreground px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Nezávazná poptávka <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
