'use client';

import { motion } from 'motion/react';
import { PhoneCall, CalendarCheck, Users, Clock } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: PhoneCall,
    title: '1. Rychlá poptávka',
    description: 'Vyplníte krátký formulář nebo nám zavoláte. Ozveme se do 24 hodin.',
  },
  {
    icon: CalendarCheck,
    title: '2. Zaměření ZDARMA',
    description: 'Přijedeme k vám, vše zaměříme a navrhneme nejlepší řešení. Nezávazně.',
  },
  {
    icon: Clock,
    title: '3. Precizní montáž',
    description: 'Rychlá a čistá instalace našimi certifikovanými techniky.',
  },
];

export function Process() {
  return (
    <section className="py-16 md:py-20 lg:py-24 2xl:py-32 bg-background relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">Služby</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Jak to u nás funguje?
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-muted/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center relative group hover:border-primary/30 hover:bg-muted/50 transition-all duration-500 shadow-xl"
                >
                  <div className="absolute -top-4 -left-4 text-6xl font-display font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500 pointer-events-none">
                    {index + 1}
                  </div>
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.1)] group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug mb-3">{step.title}</h3>
                  <p className="text-white/60 font-light text-sm">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-10"
        >
          <div className="text-center md:text-left">
            <p className="text-white/80 text-lg md:text-xl font-light">
              Odborné zaměření a poradenství naším kvalifikovaným<br className="hidden md:block" />
              technikem nabízíme <strong className="text-primary font-bold uppercase tracking-wider ml-1">Zcela zdarma a nezávazně</strong>
            </p>
          </div>
          <Link
            href="#rezervace"
            className="px-8 py-4 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white transition-colors shadow-[0_10px_20px_rgba(212,175,55,0.2)] whitespace-nowrap"
          >
            Získat cenu do 2 minut
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
