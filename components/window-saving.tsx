'use client';

import { motion } from 'motion/react';
import { X, Check, Star, AlertTriangle, ShieldCheck } from 'lucide-react';

const negativePoints = [
  'Týdny čekání na výrobu a dodání',
  'Vybourání starých rámů a zničená fasáda',
  'Všudypřítomný prach a stavební nepořádek',
  'Skryté vícenáklady za zednické zapravení'
];

const positivePoints = [
  'Hotovo za jediné odpoledne',
  'Zcela bez bourání, prachu a nepořádku',
  'Okamžité zastavení úniku tepla a hluku',
  'Prodloužení životnosti oken o dalších 5-10 let'
];

export function WindowSaving() {
  return (
    <section className="py-20 md:py-32 bg-[#0A0F1C] relative overflow-hidden">
      {/* Subtle vertical grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Glowing background accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-8"
          >
            <AlertTriangle className="w-4 h-4 text-primary" />
            Nenechte se napálit prodejci nových oken
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
          >
            Nová okna vás budou stát <br className="hidden md:block" />
            <span className="relative inline-block mt-2 md:mt-4">
              <span className="text-[#FF3131] opacity-50">150 000 Kč</span>
              <span className="absolute top-1/2 left-0 w-full h-1.5 md:h-2 bg-[#FF3131] -rotate-6 transform -translate-y-1/2 rounded-full shadow-[0_0_15px_rgba(255,49,49,0.5)]"></span>
            </span>
            <span className="text-[#FF3131] opacity-50">.</span>
            <br />
            <span className="text-primary font-serif italic font-normal text-5xl md:text-6xl lg:text-8xl mt-4 block drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              Jejich záchrana jen zlomek této ceny.
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Většina firem vám radí okna vyměnit. Proč? Protože na tom vydělají. Pravda je ale taková, že <strong className="text-white font-medium">87 % oken, kterými táhne, stačí pouze odborně seřídit a přetěsnit</strong>.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Negative Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0f1629]/50 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3131]/5 rounded-full blur-[50px] -mr-10 -mt-10 transition-all duration-500 group-hover:bg-[#FF3131]/10" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FF3131]/10 flex items-center justify-center">
                <X className="w-6 h-6 text-[#FF3131]" />
              </div>
              <h3 className="text-2xl font-bold text-white/90">Kompletní výměna oken</h3>
            </div>
            
            <div className="text-4xl md:text-5xl font-bold text-white/40 mb-10 flex items-baseline gap-2">
              150 000 Kč <span className="text-2xl">+</span>
            </div>
            
            <ul className="space-y-6 relative z-10">
              {negativePoints.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#FF3131]/10 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3 text-[#FF3131]" />
                  </div>
                  <span className="text-white/60 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Positive Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0f1629] border-2 border-primary/40 rounded-3xl p-8 md:p-12 relative shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -mr-20 -mt-20 transition-all duration-500 group-hover:bg-primary/20" />
            
            <div className="absolute -top-4 left-8 bg-[#1A1F2C] border border-primary/50 text-primary text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Star className="w-3 h-3 fill-primary" /> DOPORUČUJEME
            </div>
            
            <div className="flex items-center gap-4 mb-6 mt-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white">Profesionální Qapi servis</h3>
            </div>
            
            <div className="text-4xl md:text-5xl font-bold text-primary mb-10 flex items-baseline gap-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              od 199 Kč <span className="text-xl text-white/50 font-normal">/ okno</span>
            </div>
            
            <ul className="space-y-6 relative z-10">
              {positivePoints.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/90 leading-relaxed font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#0f1629]/30 border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col relative"
          >
            <div className="absolute top-8 right-8 text-primary/10">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21L16.411 14.182C16.914 12.727 17.165 11.455 17.165 10.364C17.165 8.909 16.763 7.727 15.959 6.818C15.155 5.909 14.1 5.455 12.793 5.455C11.989 5.455 11.236 5.682 10.533 6.136C9.83 6.591 9.328 7.227 9.026 8.045C8.725 8.864 8.574 9.773 8.574 10.773C8.574 11.773 8.725 12.636 9.026 13.364C9.328 14.091 9.78 14.682 10.383 15.136C10.986 15.591 11.689 15.818 12.493 15.818C12.895 15.818 13.246 15.773 13.548 15.682L11.84 21H14.017ZM5.443 21L7.837 14.182C8.34 12.727 8.591 11.455 8.591 10.364C8.591 8.909 8.189 7.727 7.385 6.818C6.581 5.909 5.526 5.455 4.219 5.455C3.415 5.455 2.662 5.682 1.959 6.136C1.256 6.591 0.754 7.227 0.452 8.045C0.151 8.864 0 9.773 0 10.773C0 11.773 0.151 12.636 0.452 13.364C0.754 14.091 1.206 14.682 1.809 15.136C2.412 15.591 3.115 15.818 3.919 15.818C4.321 15.818 4.673 15.773 4.974 15.682L3.266 21H5.443Z" />
              </svg>
            </div>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-primary fill-primary" />
              ))}
            </div>
            <p className="text-white/80 italic leading-relaxed mb-8 flex-grow text-lg">
              &quot;Myslel jsem, že budeme muset měnit všechna okna v domě. Táhlo nám do obýváku a topení jelo naplno. Technik z Qapi přijel, okna seřídil, vyměnil těsnění a rázem máme doma teplo. Ušetřili nám minimálně sto tisíc za nová okna. Naprostá profesionalita.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1A1F2C] border border-primary/30 flex items-center justify-center text-primary font-bold">
                JJ
              </div>
              <div>
                <div className="text-white font-bold">Jan Jícha</div>
                <div className="text-white/40 text-sm">Ověřený zákazník</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#0f1629]/30 border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col relative"
          >
            <div className="absolute top-8 right-8 text-primary/10">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21L16.411 14.182C16.914 12.727 17.165 11.455 17.165 10.364C17.165 8.909 16.763 7.727 15.959 6.818C15.155 5.909 14.1 5.455 12.793 5.455C11.989 5.455 11.236 5.682 10.533 6.136C9.83 6.591 9.328 7.227 9.026 8.045C8.725 8.864 8.574 9.773 8.574 10.773C8.574 11.773 8.725 12.636 9.026 13.364C9.328 14.091 9.78 14.682 10.383 15.136C10.986 15.591 11.689 15.818 12.493 15.818C12.895 15.818 13.246 15.773 13.548 15.682L11.84 21H14.017ZM5.443 21L7.837 14.182C8.34 12.727 8.591 11.455 8.591 10.364C8.591 8.909 8.189 7.727 7.385 6.818C6.581 5.909 5.526 5.455 4.219 5.455C3.415 5.455 2.662 5.682 1.959 6.136C1.256 6.591 0.754 7.227 0.452 8.045C0.151 8.864 0 9.773 0 10.773C0 11.773 0.151 12.636 0.452 13.364C0.754 14.091 1.206 14.682 1.809 15.136C2.412 15.591 3.115 15.818 3.919 15.818C4.321 15.818 4.673 15.773 4.974 15.682L3.266 21H5.443Z" />
              </svg>
            </div>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-primary fill-primary" />
              ))}
            </div>
            <p className="text-white/80 italic leading-relaxed mb-8 flex-grow text-lg">
              &quot;Skvělý a profesionální přístup. Pánové přijeli přesně na čas, vysvětlili mi, v čem je problém, a rovnou ho bez jakéhokoliv nepořádku vyřešili. Okna teď těsní jako nová a konečně neslyšíme hluk z ulice. Doporučuji všemi deseti.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1A1F2C] border border-primary/30 flex items-center justify-center text-primary font-bold">
                MP
              </div>
              <div>
                <div className="text-white font-bold">Monika Pavlišová</div>
                <div className="text-white/40 text-sm">Ověřená zákaznice</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
