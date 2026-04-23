'use client';

import { useEffect } from 'react';

export function PhoneTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      // Pokus zachytit kliknutí na odkaz typu tel:
      if (anchor && anchor.getAttribute('href')?.startsWith('tel:')) {
        // Fire and forget tracking to our custom DB
        fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'phone',
            url: window.location.href,
          }),
        }).catch(console.error);
        
        // Optional: Trigger Google Ads or Analytics event
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'phone_click', {
            'event_category': 'contact',
            'event_label': anchor.getAttribute('href')
          });
        }
      }
    };

    // Nasloucháme kliknutím globálně na celém dokumentu
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null; // Komponenta nemá žádné UI, běží jen na pozadí
}
