import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Log the visit
    await db.query(`
      INSERT INTO visits (source, ip, user_agent)
      VALUES ($1, $2, $3)
    `, ['google/1', ip, userAgent]);
  } catch (error) {
    console.error('Failed to log visit:', error);
    // Continue to redirect even if logging fails
  }

  // Podpora pro Google Ads Měřicí šablonu (Tracking template)
  const searchParams = request.nextUrl.searchParams;
  const targetUrl = searchParams.get('url');

  if (targetUrl) {
    try {
      const parsedUrl = new URL(targetUrl);
      // Povolit pouze http a https protokoly pro bezpečnost
      if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
        return NextResponse.redirect(parsedUrl.toString());
      }
    } catch (e) {
      // Ignorovat neplatné URL a pokračovat na výchozí přesměrování
    }
  }

  // Získání správné domény z hlaviček (řeší problém s localhostem za proxy)
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = forwardedHost || request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https');

  if (host) {
    return NextResponse.redirect(`${protocol}://${host}/`);
  }

  // Záložní řešení přesměrování na hlavní stranu
  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}
