'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Key, Phone, CheckCircle2, MapPin, Loader2, Search, Wrench, ArrowDown } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
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
    
    // Simulate API check
    setTimeout(() => {
      setIsSearching(false);
      setSearchSuccess(true);
      
      // Auto-scroll to form after a short delay
      setTimeout(() => {
        router.push(`/?address=${encodeURIComponent(selected.display_name)}#rezervace`);
      }, 1500);
    }, 1500);
  };

  return (
    <section ref={containerRef} className="hero-section">
      {/* Background Video - Fixed Fullscreen */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {isMounted && (
            <iframe
              src="https://www.youtube-nocookie.com/embed/cMQFYabS5eU?autoplay=1&mute=1&controls=0&loop=1&playlist=cMQFYabS5eU&wmode=transparent&enablejsapi=1&rel=0&origin=https://qapi.cz"
              title="QAPI Background Video"
              allow="autoplay; encrypted-media"
              className="hero-video-bg mix-blend-luminosity"
              style={{ border: 'none' }}
              tabIndex={-1}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="hero-overlay" />
        
        {/* Subtle Luxury Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-[3]" />
      </div>

      {/* Content */}
      <div className="relative z-[40] container mx-auto px-4 sm:px-6 md:px-12">
        <div className="interactive-search-wrapper !mx-0 !max-w-3xl flex flex-col items-start text-left">
          
          <h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.05] tracking-tight drop-shadow-2xl animate-fade-in-up animate-delay-300"
          >
            Ztrácíte teplo i peníze?
            <span className="text-primary italic font-light tracking-normal mt-3 mb-3 block">Zjistěte okamžitě,</span>
            zda vaše okna potřebují<br className="hidden lg:block" /> odborný zásah.
          </h1>

          <p
            className="mt-6 text-lg sm:text-xl text-white/80 font-light leading-relaxed tracking-wide max-w-2xl animate-fade-in-up animate-delay-400"
          >
            Špatně seřízená okna vás mohou stát tisíce korun ročně na energiích. Nečekejte na zimu. Naši experti odhalí skryté úniky a prodlouží životnost vašich oken.
          </p>

          <div
            className="mt-10 w-full max-w-2xl animate-fade-in-up animate-delay-500"
          >
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 20px rgba(16,185,129,0.1)", "0 0 40px rgba(16,185,129,0.3)", "0 0 20px rgba(16,185,129,0.1)"],
                borderColor: ["rgba(16,185,129,0.4)", "rgba(16,185,129,0.8)", "rgba(16,185,129,0.4)"]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mb-4 inline-flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/40 px-4 py-2.5 rounded-xl"
            >
              <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                <ArrowDown className="w-5 h-5 text-emerald-400" />
              </motion.div>
              <span className="text-emerald-400 font-black text-sm sm:text-base uppercase tracking-wider drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                Ověřte si dostupnost bezplatné kontroly oken u vás doma:
              </span>
              <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}>
                <ArrowDown className="w-5 h-5 text-emerald-400" />
              </motion.div>
            </motion.div>
            
            <div className="relative w-full">
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
                  onClick={() => address && handleSelectAddress(address)}
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

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl overflow-hidden z-[100] text-left max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAddress(suggestion)}
                      className="w-full px-6 py-4 text-gray-800 hover:bg-gray-100 flex items-center gap-3 border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="font-medium text-sm text-left">{suggestion.display_name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Status Messages */}
              {isSearching && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-4 text-white font-medium flex items-center justify-start gap-2 drop-shadow-md"
                >
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  Ověřuji dostupnost techniků v této lokalitě...
                </motion.div>
              )}
              
              {searchSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-4 text-green-400 font-bold flex items-center justify-start gap-2 drop-shadow-md text-lg"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Dostupné! Máme volné termíny ve vaší lokalitě. Přesměrovávám...
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Image Bleeding to Edge */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-[50%] xl:w-[45%] h-full z-10 pointer-events-none">
        <div
          className="relative w-full h-full animate-slide-in-right animate-delay-400"
        >
          <Image 
            src="https://web2.itnahodinu.cz/OKNA/kluci.webp" 
            alt="Náš tým techniků QAPI" 
            fill 
            sizes="(max-width: 1024px) 0vw, 50vw"
            className="object-contain object-right-bottom"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
      </div>

      {/* Trust Bar (Halo Effect) */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 bg-background/90 backdrop-blur-xl border-t border-white/10 py-4 md:py-5 animate-fade-in-up animate-delay-1200"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
          
          {/* Realizace */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden relative">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Klient" fill sizes="32px" className="object-cover opacity-80" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">5 000+</span>
              <span className="text-white/50 text-xs uppercase tracking-wider">Úspěšných realizací</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-8 bg-white/10" />

          {/* Google Rating */}
          <a href="https://www.google.com/search?num=10&hl=cs-CZ&sca_esv=3eb9bc99a534cb7d&cs=1&output=search&tbm=lcl&kgmid=/g/11xnxbbpwt&q=Qapi&shndl=30&source=sh/x/loc/uni/m1/1&kgs=79ba16d9f2bc28ca&utm_source=sh/x/loc/uni/m1/1#lkt=LocalPoiReviews&rlfi=hd:;si:7840798460343583537,l,CgRRYXBpkgENZG9vcl9zdXBwbGllcg;mv:[[51.0557185,18.859236100000004],[48.5518092,12.090589]]" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2 shadow-md group-hover:scale-110 transition-transform">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width={24} height={24} />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-sm mr-1">4.9/5</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-3 h-3 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/50 text-xs uppercase tracking-wider group-hover:text-white/80 transition-colors">Hodnocení na Google</span>
            </div>
          </a>

          <div className="hidden md:block w-px h-8 bg-white/10" />

          {/* Seznam Rating */}
          <a href="https://www.firmy.cz/detail/13869248-qapi-praha-vinohrady.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md group-hover:scale-110 transition-transform">
              <Image src="https://web2.itnahodinu.cz/OKNA/seznam.svg" alt="Seznam.cz" width={28} height={28} className="object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-sm mr-1">4.7/5</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-3 h-3 text-[#CC0000]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/50 text-xs uppercase tracking-wider group-hover:text-white/80 transition-colors">Hodnocení na Seznam.cz</span>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}

