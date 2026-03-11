'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Shield, Wrench, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Bezpečnost bez kompromisů',
    description: 'Nejvyšší standardy zabezpečení pro váš absolutní klid a ochranu majetku.',
  },
  {
    icon: Wrench,
    title: 'Milimetrová přesnost',
    description: 'Náš tým certifikovaných techniků zaručuje bezchybnou instalaci na první dobrou.',
  },
  {
    icon: Clock,
    title: 'Prémiový klientský servis',
    description: 'Jsme tu pro vás 24/7. Rychlá reakce a osobní přístup ke každému klientovi.',
  },
  {
    icon: Award,
    title: 'Materiály, které vydrží',
    description: 'Používáme výhradně prémiové komponenty od prověřených evropských výrobců.',
  },
];

export function About() {
  return (
    <section id="o-nas" className="py-16 md:py-20 lg:py-24 2xl:py-32 bg-background relative overflow-hidden border-y border-white/5 [perspective:1000px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[400px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden group shadow-[0_20px_50px_-20px_rgba(212,175,55,0.3)] border border-white/5 [transform-style:preserve-3d]"
          >
            <motion.div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(-30px)" }}>
              <Image
                src="https://qapi.cz/wp-content/uploads/2025/10/IMG_7942.jpg"
                alt="Precizní práce QAPI"
                fill
                className="object-cover transition-transform duration-[2s] ease-[0.16,1,0.3,1] group-hover:scale-105 mix-blend-luminosity group-hover:mix-blend-normal opacity-80"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-background/80 backdrop-blur-2xl p-6 md:p-10 rounded-2xl border border-white/10 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:border-primary/30" style={{ transform: "translateZ(30px)" }}>
              <div className="flex items-center gap-4 md:gap-8">
                <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">10+</div>
                <div className="text-white/80 font-light leading-relaxed text-sm md:text-lg">
                  Let zkušeností v oboru<br />
                  <span className="text-white font-bold">garážových vrat a stínící techniky</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="space-y-16 [transform-style:preserve-3d]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <span className="w-8 h-[2px] bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">O společnosti QAPI</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg"
              >
                Nekompromisní kvalita <br />
                <span className="text-primary italic font-light">bez výmluv</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1 }}
                className="mt-8 text-xl text-white/60 font-light leading-relaxed"
              >
                Nejsme jen montéři. Jsme inženýři vašeho domácího komfortu. Od prvního zaměření až po finální úklid garantujeme absolutní preciznost. Naše práce končí až ve chvíli, kdy jste 100% spokojeni.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 40, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    className="space-y-5 group p-6 rounded-3xl bg-muted/20 border border-white/5 hover:border-primary/20 hover:bg-muted/40 transition-all duration-700 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-background/50 flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors duration-700 shadow-inner">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white tracking-tight">{feature.title}</h3>
                    <p className="text-white/60 font-light leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
