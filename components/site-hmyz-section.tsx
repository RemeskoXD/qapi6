'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, ThumbsUp, Wind, Hammer } from 'lucide-react';
import { motion } from 'motion/react';

export function SiteHmyzSection() {
  return (
    <section id="site-proti-hmyzu" className="py-16 md:py-20 lg:py-24 2xl:py-32 relative [perspective:1000px] bg-background border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_5px_rgba(212,175,55,0.8)]" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
              Život bez komárů
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white tracking-tight drop-shadow-lg"
          >
            Sítě <span className="text-primary italic font-light">proti hmyzu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Větrejte naplno bez otravného bzučení a štípanců. Naše sítě na míru perfektně sednou na vaše okna i dveře a poskytnou vám 100% ochranu po celou sezónu.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[600px] rounded-3xl overflow-hidden group shadow-[0_20px_50px_-20px_rgba(212,175,55,0.3)] border border-white/5 [transform-style:preserve-3d]"
          >
            <motion.div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(-30px)" }}>
              <Image
                src="https://web2.itnahodinu.cz/QAPI/sit.jpeg"
                alt="Ukázka sítí do oken a dveří"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[2s] ease-[0.16,1,0.3,1] group-hover:scale-105 mix-blend-luminosity group-hover:mix-blend-normal opacity-80"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 [transform-style:preserve-3d]"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 30, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl font-bold text-white tracking-tight drop-shadow-lg"
            >
              Proč si vybrat <span className="text-primary italic font-light">naše sítě?</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/60 font-light leading-relaxed text-lg"
            >
              Nejde jen o síťku. Jde o robustní hliníkové rámy s dlouhou životností, neviditelnou pevnou síťovinu a montáž bez poškození vašich oken.
            </motion.p>
            <ul className="space-y-6 pt-4">
              <motion.li 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)] mt-1">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Česká výroba a odolnost</h4>
                    <p className="text-white/60 font-light text-sm mt-1">Sítě vyrábíme v ČR z prvotřídních materiálů. Zaručujeme maximální tvarovou stálost a dlouhou životnost rámů i síťoviny na slunci.</p>
                  </div>
              </motion.li>

              <motion.li 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)] mt-1">
                    <Hammer className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Produkty přesně na míru</h4>
                    <p className="text-white/60 font-light text-sm mt-1">Žádné uni řešení. Vyrábíme sítě na milimetr přesně pro vaše specifická okna, čímž eliminujeme jakékoliv mezery.</p>
                  </div>
              </motion.li>

              <motion.li 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)] mt-1">
                    <ThumbsUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                     <h4 className="text-white font-bold text-lg">Zaměření a návrh zdarma</h4>
                     <p className="text-white/60 font-light text-sm mt-1">Přijedeme, zkonzultujeme vhodné řešení pro vaše okna a dveře a zaměříme. Toto první setkání je vždy zcela nezávazné.</p>
                  </div>
              </motion.li>

              <motion.li 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)] mt-1">
                    <Wind className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg text-primary">Sleva až 21% na objednávky z webu</h4>
                    <p className="text-white/60 font-light text-sm mt-1">Chraňte svůj domov a ušetřete. Běžným větráním se vzduch u vás doma mění efektivněji bez obav o spánek a s dodatečnou slevou.</p>
                  </div>
              </motion.li>
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link href="/#rezervace" className="inline-flex items-center gap-3 text-primary uppercase tracking-[0.2em] font-bold text-xs hover:text-white transition-colors pt-8 group">
                Objednat nezávazné zaměření 
                <span className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300 group-hover:translate-x-2 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
