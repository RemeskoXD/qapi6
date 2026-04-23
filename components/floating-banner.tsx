'use client';

import { ArrowUp } from 'lucide-react';
import Link from 'next/link';

export function FloatingBanner() {
  const handleClick = () => {
    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'floating_banner',
        url: window.location.href,
      }),
    }).catch(console.error);
    
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'floating_banner_click', {
        'event_category': 'engagement',
        'event_label': 'Kontrola oken zdarma side banner'
      });
    }
  };

  return (
    <Link 
      href="/?service=kontrola#rezervace"
      onClick={handleClick}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.25)] transition-all duration-300 rounded-l-2xl py-5 px-3 group overflow-hidden border border-r-0 border-gray-200 hover:-translate-x-1"
    >
      <ArrowUp className="w-6 h-6 text-red-600 mb-3 group-hover:-translate-y-1 transition-transform duration-300" />
      <span 
        className="text-gray-900 font-extrabold tracking-wide uppercase text-[15px] group-hover:text-primary transition-colors whitespace-nowrap"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        Kontrola oken zdarma
      </span>
      
      {/* Gentle green decorative glow/accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Link>
  );
}
