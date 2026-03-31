'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, CheckCircle2, X, ArrowDown } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  city: string;
  stats: string;
}

const regions: Region[] = [
  { id: 'US', name: 'Ústecký kraj', city: 'Ústí nad Labem', stats: '3 150' },
  { id: 'LI', name: 'Liberecký kraj', city: 'Liberec', stats: '2 100' },
  { id: 'KR', name: 'Královéhradecký kraj', city: 'Hradec Králové', stats: '2 340' },
  { id: 'KA', name: 'Karlovarský kraj', city: 'Karlovy Vary', stats: '1 240' },
  { id: 'ST', name: 'Středočeský kraj', city: 'Kladno', stats: '4 820' },
  { id: 'PR', name: 'Hlavní město Praha', city: 'Praha', stats: '12 450' },
  { id: 'PA', name: 'Pardubický kraj', city: 'Pardubice', stats: '2 150' },
  { id: 'OL', name: 'Olomoucký kraj', city: 'Olomouc', stats: '2 760' },
  { id: 'MO', name: 'Moravskoslezský kraj', city: 'Ostrava', stats: '5 420' },
  { id: 'PL', name: 'Plzeňský kraj', city: 'Plzeň', stats: '2 940' },
  { id: 'JC', name: 'Jihočeský kraj', city: 'České Budějovice', stats: '2 680' },
  { id: 'VY', name: 'Kraj Vysočina', city: 'Jihlava', stats: '1 890' },
  { id: 'JM', name: 'Jihomoravský kraj', city: 'Brno', stats: '6 890' },
  { id: 'ZL', name: 'Zlínský kraj', city: 'Zlín', stats: '2 010' },
];

export function MapSection() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [activeAlert, setActiveAlert] = useState<{ regionId: string, orders: number } | null>(null);

  // Live Alert Logic
  useEffect(() => {
    const isBusinessHours = () => {
      const now = new Date();
      const czTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Prague' }));
      const hour = czTime.getHours();
      return hour >= 9 && hour < 18;
    };

    const checkAndTriggerAlert = () => {
      if (!isBusinessHours()) return;
      
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      const randomOrders = Math.floor(Math.random() * 10) + 1;
      
      setActiveAlert({ regionId: randomRegion.id, orders: randomOrders });
      
      setTimeout(() => {
        setActiveAlert(null);
      }, 5000);
    };

    const timeout = setTimeout(checkAndTriggerAlert, 3000);
    const interval = setInterval(() => {
      checkAndTriggerAlert();
    }, 12000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const getOrderWord = (count: number) => {
    if (count === 1) return 'objednávka';
    if (count >= 2 && count <= 4) return 'objednávky';
    return 'objednávek';
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 2xl:py-32 relative bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03),transparent_70%)]" />
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-[40]">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-8"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
              Kde působíme
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Působíme po celé <span className="text-primary italic font-light">ČR</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl text-white/60 font-light max-w-2xl mx-auto"
          >
            Ať už jste z Prahy, Brna, Ostravy nebo menšího města, naši technici jsou připraveni vyrazit k vám.
          </motion.p>
        </div>

        {/* Simple Region Grid instead of complex map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-24 mt-12"
        >
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region)}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <MapPin className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-white font-bold mb-1 group-hover:text-primary transition-colors">{region.name}</h3>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">{region.city}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-white/60 text-[10px] uppercase tracking-wider">Technici v terénu</span>
              </div>
              
              {/* Active Alert Indicator */}
              {activeAlert?.regionId === region.id && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] text-green-400 font-bold uppercase">Live</span>
                </motion.div>
              )}
            </button>
          ))}
        </motion.div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedRegion(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-primary/30 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-green-500" />
              <button 
                onClick={() => setSelectedRegion(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">ZDE FUNGUJEME!</h3>
              </div>
              
              <p className="text-lg text-white/90 mb-4">
                V lokalitě <strong className="text-primary">{selectedRegion.name}</strong> provádíme:
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-white font-bold uppercase tracking-wide">SERVIS OKEN</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-white font-bold uppercase tracking-wide">Garážové vrata</span>
                </div>
              </div>

              <div className="bg-primary/10 rounded-xl p-5 mb-6 border border-primary/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
                  <ArrowDown className="w-12 h-12 text-primary" />
                </div>
                <p className="text-primary font-bold text-lg mb-1 uppercase tracking-tight">Akční nabídka!</p>
                <p className="text-white text-sm leading-relaxed">
                  Máte možnost prozatím čerpat <strong className="text-primary text-lg">až 30% slevu</strong> na servis oken.
                </p>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedRegion(null);
                  document.getElementById('rezervace')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-primary hover:bg-[#b5952f] text-primary-foreground font-bold py-4 rounded-xl uppercase tracking-widest transition-colors"
              >
                Rezervovat kontrolu zdarma
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

