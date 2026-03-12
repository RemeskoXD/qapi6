'use client';

import { motion } from 'motion/react';
import { Wind, Sun, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    id: 'okna',
    icon: Wind,
    title: 'Záchrana oken a dveří',
    description: 'Zastavíme průvan, hluk z ulice a úniky tepla. Vaše rodina bude v teple a bezpečí, aniž byste museli investovat statisíce do nových oken.',
    tag: 'Ušetříte až 25 % za vytápění',
    linkText: 'ZJISTIT VÍCE O ZÁCHRANĚ OKEN',
    href: '/servis-oken',
  },
  {
    id: 'stineni',
    icon: Sun,
    title: 'Inteligentní stínění',
    description: 'Získejte absolutní kontrolu nad světlem a teplotou ve vašem domově. Vytvořte si intimní atmosféru pro odpočinek a chraňte své soukromí před zraky sousedů.',
    tag: 'Dokonalý spánek a soukromí',
    linkText: 'PROZKOUMAT MOŽNOSTI STÍNĚNÍ',
    href: '/stinici-technika',
  },
  {
    id: 'vrata',
    icon: Shield,
    title: 'Bezpečná garážová vrata',
    description: 'Proměňte svou garáž v nedobytnou pevnost, která navíc skvěle vypadá. Tichý chod, který nevzbudí děti, a izolace, která udrží teplo uvnitř.',
    tag: 'Až 5 let záruka na bezpečí',
    linkText: 'VYBRAT NOVÁ VRATA',
    href: '/garazova-vrata',
  },
];

export function ThreeSteps() {
  return (
    <section className="py-20 md:py-32 bg-[#0c162d] relative overflow-hidden">
      {/* Subtle vertical grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Tři kroky k <span className="text-primary font-serif italic font-normal">dokonalému</span> domovu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto"
          >
            Zapomeňte na technické parametry. Zaměřujeme se na to, co je skutečně důležité: vaše pohodlí, bezpečí a úsporu peněz.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-[#0f1629]/50 border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col h-full hover:bg-[#0f1629] hover:border-white/10 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              
              <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                {step.description}
              </p>
              
              <div className="mt-auto">
                <div className="inline-block w-full px-4 py-3 rounded-lg bg-[#1A1F2C] border border-primary/30 text-primary text-xs font-medium mb-6">
                  {step.tag}
                </div>
                
                <Link 
                  href={step.href}
                  className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/50 hover:text-white uppercase transition-colors group/link"
                >
                  {step.linkText}
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
