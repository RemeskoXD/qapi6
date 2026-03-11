'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Shield, Lock, ShieldCheck, Play, ArrowRight, Wrench } from 'lucide-react';
import Link from 'next/link';

export function GarageDoorScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // Sledujeme progress scrollování v rámci tohoto kontejneru (výška 400vh pro delší scrollování)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Fáze (0.0 - 0.3): Vrata se otevírají
  const doorY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-100%']);
  
  // 2. Fáze (0.1 - 0.25): Text se objevuje
  // 3. Fáze (0.4 - 0.55): Text odjíždí nahoru a mizí
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.4, 0.55], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.25, 0.4, 0.55], [40, 0, 0, -100]);
  const textPointerEvents = useTransform(scrollYProgress, (v) => v > 0.5 ? 'none' : 'auto');

  // 4. Fáze (0.5 - 0.65): Video a tlačítko přijíždí zespodu
  const videoOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const videoY = useTransform(scrollYProgress, [0.5, 0.65], [100, 0]);
  const videoPointerEvents = useTransform(scrollYProgress, (v) => v > 0.5 ? 'auto' : 'none');

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Načteme iframe těsně předtím, než se objeví
    if (latest > 0.4 && !isVideoVisible) {
      setIsVideoVisible(true);
    }
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background">
      {/* Sticky kontejner, který zůstane na místě během scrollování celých 400vh */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden px-4 py-16 md:py-24 [@media(max-height:700px)]:py-6">
        
        <div className="text-center z-10 mb-4 md:mb-8 [@media(max-height:700px)]:mb-2 shrink-0">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-1 md:mb-2 leading-tight [@media(max-height:700px)]:text-xl">
            Nekompromisní <span className="text-primary italic">kvalita</span> v praxi
          </h2>
          <p className="text-white/50 text-xs sm:text-sm md:text-lg [@media(max-height:700px)]:text-[10px]">Scrollujte dolů a nahlédněte pod pokličku naší práce</p>
        </div>

        {/* Rám garáže - flex-1 zajistí, že se přizpůsobí výšce obrazovky */}
        <div className="relative w-full max-w-[1400px] flex-1 min-h-[200px] bg-[#1a1a1a] border-[8px] md:border-[16px] border-[#2a2a2a] rounded-t-xl md:rounded-t-2xl shadow-2xl overflow-hidden group">
          
          {/* Interiér garáže */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center overflow-hidden">
            
            {/* --- PŮVODNÍ TEXTOVÁ ČÁST --- */}
            <motion.div 
              style={{ opacity: textOpacity, y: textY, pointerEvents: textPointerEvents as any }}
              className="absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 text-center"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-20 md:h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-1 sm:mb-2 md:mb-4 shadow-[0_0_30px_rgba(212,175,55,0.2)] border border-primary/20">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-10 md:h-10 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-5xl font-display font-bold text-white mb-1 sm:mb-2 md:mb-6 leading-tight">
                Implicitní <span className="text-primary italic">důvěra</span>
              </h3>
              <p className="text-white/60 text-[10px] sm:text-xs md:text-lg max-w-lg mx-auto font-light mb-2 sm:mb-4 md:mb-8 hidden sm:block">
                Neříkáme, že jsme profesionálové. My vám to ukážeme. Čisté uniformy, špičkové nářadí a absolutní soustředění na detail.
              </p>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-6">
                <div className="flex items-center gap-1 md:gap-2 text-[8px] sm:text-[10px] md:text-sm text-white/80 bg-white/5 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-2 rounded-full border border-white/10">
                  <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-primary" />
                  <span>Certifikovaní technici</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2 text-[8px] sm:text-[10px] md:text-sm text-white/80 bg-white/5 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-2 rounded-full border border-white/10">
                  <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-primary" />
                  <span>Absolutní čistota práce</span>
                </div>
              </div>
            </motion.div>

            {/* --- VIDEO --- */}
            <motion.div 
              style={{ opacity: videoOpacity, pointerEvents: videoPointerEvents as any }}
              className="absolute inset-0 bg-black"
            >
              {isVideoVisible ? (
                <iframe 
                  src="https://www.youtube-nocookie.com/embed/cMQFYabS5eU?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1" 
                  title="QAPI Video"
                  className="absolute inset-0 w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-[#111] flex items-center justify-center">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                    <Play className="w-6 h-6 md:w-10 md:h-10 text-primary ml-1" />
                  </div>
                </div>
              )}
            </motion.div>

          </div>

          {/* Garážová vrata (Pohybují se nahoru) */}
          <motion.div 
            style={{ y: doorY }}
            className="absolute inset-0 w-full h-full bg-[#2a2a2a] flex flex-col z-20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-none"
          >
            {/* Panely vrat */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="flex-1 border-b border-[#1a1a1a] border-t border-[#3a3a3a] relative flex items-center justify-center"
              >
                {/* Textura/detail panelu */}
                <div className="absolute inset-x-1 md:inset-x-6 inset-y-0.5 md:inset-y-3 border border-[#222] rounded-sm bg-[#2d2d2d] shadow-inner"></div>
                
                {/* Klika na druhém panelu odspodu */}
                {i === 3 && (
                  <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 w-20 md:w-40 h-2 md:h-5 bg-primary rounded-sm shadow-[0_2px_15px_rgba(212,175,55,0.4)] flex items-center justify-center z-20">
                    <div className="w-10 md:w-20 h-1 md:h-1.5 bg-background/50 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Spodní hrana s 3D stínem */}
            <div className="h-3 md:h-8 bg-[#1a1a1a] border-t border-[#3a3a3a] relative z-20">
              {/* Plastický stín pod vraty */}
              <div className="absolute top-full left-0 right-0 h-4 md:h-10 bg-gradient-to-b from-black/80 to-transparent blur-[3px]"></div>
            </div>
          </motion.div>

        </div>

        {/* Tlačítko pod garáží */}
        <motion.div 
          style={{ opacity: videoOpacity, y: videoY, pointerEvents: videoPointerEvents as any }}
          className="mt-4 md:mt-8 [@media(max-height:700px)]:mt-2 w-full flex justify-center px-4 relative z-20 shrink-0"
        >
          <Link href="#rezervace" className="group cursor-pointer w-full max-w-xl">
            <div className="relative overflow-hidden rounded-full bg-secondary/20 backdrop-blur-xl border-2 border-secondary p-[1px] shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.7)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 via-transparent to-secondary/30 animate-pulse" />
              <div className="relative px-4 py-3 md:px-8 md:py-4 flex items-center justify-between gap-2 md:gap-4 bg-background/90 rounded-full">
                <div className="flex items-center gap-3 md:gap-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full bg-secondary flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]">
                    <Wrench className="w-5 h-5 md:w-7 md:h-7 text-secondary-foreground" />
                  </div>
                  <div className="text-left flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <p className="text-white font-bold text-xs sm:text-sm md:text-lg tracking-wide uppercase drop-shadow-md">Kontrola oken ZDARMA</p>
                    <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="text-primary text-[10px] sm:text-xs md:text-sm font-bold drop-shadow-md">a servis se slevou až 30%</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-primary transform group-hover:translate-x-2 transition-transform duration-300 ml-2" />
              </div>
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
