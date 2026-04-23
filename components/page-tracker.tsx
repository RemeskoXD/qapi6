'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function PageTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // Pokud je to stejná cesta jako minule (např. re-render), vynecháme
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    fetch('/api/track-page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: pathname,
      }),
    }).catch(console.error);

  }, [pathname]);

  return null;
}
