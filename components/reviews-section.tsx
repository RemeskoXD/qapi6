'use client';

import { motion } from 'motion/react';
import { Star, StarHalf, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ReviewsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 2xl:py-32 relative bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03),transparent_70%)]" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-8"
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
              Hodnocení zákazníků
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Co o nás říkají <span className="text-primary italic font-light">klienti</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl text-white/60 font-light max-w-2xl mx-auto"
          >
            Zakládáme si na skvělé zákaznické zkušenosti. Přečtěte si nezávislá hodnocení naší práce.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Google Reviews */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link 
              href="https://share.google/a6PrBkTTCxqzsY4Gl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-muted/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-muted/30 hover:border-primary/30 transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Google Recenze</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-white font-bold mr-1">4.8</span>
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                      ))}
                      <StarHalf className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-white/70 font-light italic">
                &quot;Skvělá komunikace, rychlé jednání a profesionální přístup při montáži garážových vrat v Praze. Vřele doporučuji!&quot;
              </p>
              <div className="mt-6 text-primary text-sm font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                Číst všechny recenze <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>

          {/* Seznam Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              href="https://www.firmy.cz/detail/13869248-qapi-praha-vinohrady.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-muted/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-muted/30 hover:border-primary/30 transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#cc0000] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    S
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Firmy.cz (Seznam)</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-white font-bold mr-1">4.7</span>
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                      ))}
                      <StarHalf className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-white/70 font-light italic">
                &quot;Velmi spolehlivá firma. Servis oken ve Středočeském kraji proběhl na jedničku. Určitě využijeme znovu.&quot;
              </p>
              <div className="mt-6 text-primary text-sm font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                Číst všechny recenze <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
