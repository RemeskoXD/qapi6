'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export function CampaignTracker() {
  const searchParams = useSearchParams();
  const tracked = useRef(false);

  useEffect(() => {
    // Only track once per page load
    if (tracked.current) return;

    let source = null;

    // Detect Facebook Ads (fbclid) or specific UTM
    if (searchParams.has('fbclid') || searchParams.get('utm_source')?.toLowerCase().includes('facebook') || searchParams.get('utm_source')?.toLowerCase() === 'fb') {
      source = 'facebook_ads';
    } 
    // Detect Seznam / Sklik campaigns
    else if (searchParams.get('utm_source')?.toLowerCase() === 'seznam' || searchParams.get('utm_medium')?.toLowerCase() === 'sklik') {
      source = 'seznam_ads';
    }

    if (source) {
      tracked.current = true;
      
      // Fire and forget tracking
      fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_override: source,
          url: window.location.href,
        }),
      }).catch(console.error);
    }
  }, [searchParams]);

  return null;
}
