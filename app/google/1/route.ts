import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Log the visit
    const stmt = db.prepare(`
      INSERT INTO visits (source, ip, user_agent)
      VALUES (?, ?, ?)
    `);
    
    stmt.run('google/1', ip, userAgent);
  } catch (error) {
    console.error('Failed to log visit:', error);
    // Continue to redirect even if logging fails
  }

  // Získání správné domény z hlaviček (řeší problém s localhostem za proxy)
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = forwardedHost || request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https');

  if (host) {
    return NextResponse.redirect(`${protocol}://${host}/`);
  }

  // Záložní řešení
  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}
