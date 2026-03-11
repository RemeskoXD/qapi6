'use client';

import { motion } from 'motion/react';

const partners = [
  'Roto',
  'Siegenia',
  'Maco',
  'Winkhaus',
  'Gretsch-Unitas',
  'Schuco',
  'Aubi',
  'Sobinco',
  'Giesse',
  'Fapim',
  'Dr. Hahn',
];

export function Partners() {
  return (
    <section className="py-20 border-y border-white/5 bg-background overflow-hidden relative [perspective:1000px]">
      <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex w-full [transform-style:preserve-3d]">
        <motion.div
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
          className="flex whitespace-nowrap items-center gap-16 md:gap-24 px-8 md:px-12 w-max"
        >
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10, translateZ: 20 }}
              className="text-2xl md:text-4xl font-display font-bold text-white/10 tracking-widest uppercase hover:text-primary transition-all duration-500 cursor-default drop-shadow-[0_0_10px_rgba(212,175,55,0)] hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            >
              {partner}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
