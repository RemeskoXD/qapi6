'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Servis oken', href: '/servis-oken' },
    { name: 'Garážová vrata', href: '/garazova-vrata' },
    { name: 'Stínicí technika', href: '/stinici-technika' },
    { name: 'Lokality', href: '/lokality' },
    { name: 'O nás', href: '/#o-nas' },
    { name: 'Kontakt', href: '/#rezervace' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 [perspective:1000px] ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-background/90 backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)]' 
          : 'bg-gradient-to-b from-background/90 via-background/50 to-transparent py-4 md:py-6 lg:py-8'
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 flex items-center justify-between relative [transform-style:preserve-3d]">
        <Link href="/" className="flex items-center gap-2 group z-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="relative w-[210px] h-[63px] sm:w-[230px] sm:h-[69px] md:w-[250px] md:h-[75px] lg:w-[270px] lg:h-[81px] 2xl:w-[290px] 2xl:h-[87px] transition-transform duration-300"
          >
            <Image
              src="https://web2.itnahodinu.cz/QAPI/Logo-Bile.webp"
              alt="QAPI Logo"
              fill
              sizes="(max-width: 768px) 230px, 290px"
              className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              referrerPolicy="no-referrer"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Right Side (Nav + Contact) */}
        <div className="hidden 2xl:flex items-center gap-6 2xl:gap-10 z-10">
          {/* Nav Links */}
          <nav className={`flex items-center gap-2 2xl:gap-4 transition-all duration-500 ${isScrolled ? 'bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.2)]' : 'px-2 py-1.5'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-[11px] 2xl:text-[13px] font-bold text-white/80 hover:text-white transition-colors uppercase tracking-[0.2em] group"
              >
                <span className="relative z-10">{link.name}</span>
                {/* Hover pill background */}
                <span className="absolute inset-0 bg-white/10 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out" />
                {/* Subtle bottom glow dot */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(212,175,55,1)] transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Separator */}
          <div className="w-[1px] h-8 bg-white/10 hidden 2xl:block" />

          {/* Contact */}
          <div className="flex items-center gap-4 2xl:gap-6">
            <a href="tel:+420702835964" className="flex items-center gap-3 text-white hover:text-primary transition-colors group">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]">
                <Phone className="w-4 h-4 text-primary group-hover:text-background transition-colors" />
              </div>
              <span className="text-sm 2xl:text-base font-bold tracking-widest whitespace-nowrap">+420 702 835 964</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="2xl:hidden text-white p-2 hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] 2xl:hidden origin-top [transform-style:preserve-3d] max-h-[calc(100dvh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-bold text-white/80 hover:text-primary transition-colors uppercase tracking-wider py-3 border-b border-white/5"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link
                  href="/#rezervace"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mt-6 px-6 py-4 bg-primary text-primary-foreground font-bold text-center uppercase tracking-wider rounded-xl shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
                >
                  Získat cenu
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
