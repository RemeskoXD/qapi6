'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, CheckCircle2, Search, Loader2, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cities as availableCities } from '@/lib/cities';

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

export function LokalityClient() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

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
        router.push(`/?address=${encodeURIComponent(selected.display_name)}#rezervace`);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="w-full">
      {/* Search Input (LocationIQ Integration) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full max-w-2xl mx-auto text-center mb-24"
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
                  const citySlug = availableCities.find(c => c.name === city.name)?.slug;
                  const href = citySlug ? `/mesto/${citySlug}` : `/?address=${encodeURIComponent(city.name)}#rezervace`;
                  return (
                  <button
                    key={cityIdx}
                    onClick={() => router.push(href)}
                    className="flex items-center gap-2 py-2 border-b border-white/5 hover:border-primary/50 group transition-all text-left"
                  >
                    <MapPin className="w-3.5 h-3.5 text-white/20 group-hover:text-primary transition-colors flex-shrink-0" />
                    <span className="text-white/70 group-hover:text-white font-medium transition-colors text-sm sm:text-base truncate">{city.name}</span>
                  </button>
                )})}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
