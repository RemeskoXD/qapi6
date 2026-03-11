'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, CheckCircle2, X, Search, Loader2, ArrowDown } from 'lucide-react';

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

const cityGroups = [
  {
    letter: "A - F",
    cities: [
      { name: 'Brno', region: 'JM' },
      { name: 'Břeclav', region: 'JM' },
      { name: 'Česká Lípa', region: 'LI' },
      { name: 'České Budějovice', region: 'JC' },
      { name: 'Český Těšín', region: 'MO' },
      { name: 'Děčín', region: 'US' },
      { name: 'Frýdek-Místek', region: 'MO' },
    ]
  },
  {
    letter: "H - L",
    cities: [
      { name: 'Havířov', region: 'MO' },
      { name: 'Havlíčkův Brod', region: 'VY' },
      { name: 'Hodonín', region: 'JM' },
      { name: 'Hradec Králové', region: 'KR' },
      { name: 'Cheb', region: 'KA' },
      { name: 'Chomutov', region: 'US' },
      { name: 'Jablonec nad Nisou', region: 'LI' },
      { name: 'Jihlava', region: 'VY' },
      { name: 'Karlovy Vary', region: 'KA' },
      { name: 'Karviná', region: 'MO' },
      { name: 'Kladno', region: 'ST' },
      { name: 'Kolín', region: 'ST' },
      { name: 'Kroměříž', region: 'ZL' },
      { name: 'Krnov', region: 'MO' },
      { name: 'Liberec', region: 'LI' },
      { name: 'Litoměřice', region: 'US' },
      { name: 'Litvínov', region: 'US' },
    ]
  },
  {
    letter: "M - P",
    cities: [
      { name: 'Mladá Boleslav', region: 'ST' },
      { name: 'Most', region: 'US' },
      { name: 'Nový Jičín', region: 'MO' },
      { name: 'Olomouc', region: 'OL' },
      { name: 'Opava', region: 'MO' },
      { name: 'Ostrava', region: 'MO' },
      { name: 'Pardubice', region: 'PA' },
      { name: 'Písek', region: 'JC' },
      { name: 'Plzeň', region: 'PL' },
      { name: 'Praha', region: 'PR' },
      { name: 'Prostějov', region: 'OL' },
      { name: 'Přerov', region: 'OL' },
      { name: 'Příbram', region: 'ST' },
    ]
  },
  {
    letter: "S - Z",
    cities: [
      { name: 'Sokolov', region: 'KA' },
      { name: 'Šumperk', region: 'OL' },
      { name: 'Tábor', region: 'JC' },
      { name: 'Teplice', region: 'US' },
      { name: 'Trutnov', region: 'KR' },
      { name: 'Třebíč', region: 'VY' },
      { name: 'Třinec', region: 'MO' },
      { name: 'Uherské Hradiště', region: 'ZL' },
      { name: 'Ústí nad Labem', region: 'US' },
      { name: 'Valašské Meziříčí', region: 'ZL' },
      { name: 'Vsetín', region: 'ZL' },
      { name: 'Zlín', region: 'ZL' },
      { name: 'Znojmo', region: 'JM' },
    ]
  }
];

export function MapSection() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [activeAlert, setActiveAlert] = useState<{ regionId: string, orders: number } | null>(null);
  
  // Search State
  const [address, setAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

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

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddress(val);
    
    if (val.length > 3) {
      try {
        const response = await fetch(`/api/geocode?q=${encodeURIComponent(val)}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectAddress = (selected: any) => {
    setAddress(selected.display_name);
    setSuggestions([]);
    setIsSearching(true);
    
    setTimeout(() => {
      setIsSearching(false);
      setSearchSuccess(true);
      
      setTimeout(() => {
        document.getElementById('rezervace')?.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    }, 1500);
  };

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

        {/* Cities List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h3 className="text-white/80 font-medium uppercase tracking-widest text-sm mb-2">Působíme ve více než 50 městech po celé ČR</h3>
            <p className="text-white/40 text-sm">Vyberte své město a zjistěte dostupnost bezplatné kontroly</p>
          </div>
          
          <div className="space-y-8 max-w-6xl mx-auto">
            {cityGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h4 className="text-primary font-medium mb-6 flex items-center gap-3">
                  <div className="h-px bg-primary/30 flex-1" />
                  <span className="uppercase tracking-widest text-sm font-bold">{group.letter}</span>
                  <div className="h-px bg-primary/30 flex-1" />
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
                  {group.cities.map((city, cityIdx) => {
                    const region = regions.find(r => r.id === city.region);
                    return (
                      <button
                        key={cityIdx}
                        onClick={() => region && setSelectedRegion(region)}
                        className="flex items-center gap-2 py-2 border-b border-white/5 hover:border-primary/50 group transition-all text-left"
                      >
                        <MapPin className="w-3.5 h-3.5 text-white/20 group-hover:text-primary transition-colors flex-shrink-0" />
                        <span className="text-white/70 group-hover:text-white font-medium transition-colors text-sm sm:text-base truncate">{city.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search Input (LocationIQ Integration) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-2xl mx-auto text-center"
        >
          <div className="mb-4 inline-flex items-center gap-3 bg-primary/10 border border-primary/30 px-4 py-2.5 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              <ArrowDown className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-white font-bold text-sm sm:text-base uppercase tracking-wider drop-shadow-md">
              Ověřte si dostupnost bezplatné kontroly oken u vás doma:
            </span>
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}>
              <ArrowDown className="w-5 h-5 text-primary" />
            </motion.div>
          </div>
          
          <div className="relative w-full text-left">
            <div className={`search-input-group border-2 transition-all duration-300 ${searchSuccess ? 'border-green-500/50' : 'border-white/10 focus-within:border-primary/50'}`}>
              <div className="flex items-center px-4 gap-3 bg-white rounded-md">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  disabled={isSearching || searchSuccess}
                  placeholder="Zadejte vaši adresu (např. Václavské nám. 1, Praha)"
                  className="w-full py-4 text-gray-900 text-base sm:text-lg font-medium focus:outline-none bg-transparent disabled:opacity-70"
                />
              </div>
              <button
                onClick={() => address && handleSelectAddress({ display_name: address })}
                disabled={!address || isSearching || searchSuccess}
                className="bg-primary hover:bg-[#b5952f] text-primary-foreground font-bold px-6 sm:px-8 py-4 rounded-md uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSearching ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> <span className="hidden sm:inline">Ověřuji...</span></>
                ) : searchSuccess ? (
                  <><CheckCircle2 className="w-5 h-5" /> <span className="hidden sm:inline">Dostupné</span></>
                ) : (
                  <><Search className="w-5 h-5" /> <span className="hidden sm:inline">Ověřit</span></>
                )}
              </button>
            </div>

            {/* Suggestions Dropdown (LocationIQ) */}
            {suggestions.length > 0 && (
               <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl overflow-hidden z-[100] text-left max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAddress(suggestion)}
                    className="w-full px-6 py-4 text-gray-800 hover:bg-gray-100 flex items-center gap-3 border-b border-gray-100 last:border-0 transition-colors text-left"
                  >
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-sm">{suggestion.display_name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Status Messages */}
            {isSearching && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-4 text-white font-medium flex items-center justify-center gap-2 drop-shadow-md"
              >
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                Ověřuji dostupnost techniků v této lokalitě...
              </motion.div>
            )}
            
            {searchSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-4 text-green-400 font-bold flex items-center justify-center gap-2 drop-shadow-md text-lg"
              >
                <CheckCircle2 className="w-5 h-5" />
                Dostupné! Máme volné termíny ve vaší lokalitě. Přesměrovávám...
              </motion.div>
            )}
          </div>
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

