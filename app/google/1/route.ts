import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
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

  // Redirect to homepage
  return NextResponse.redirect(new URL('/', request.url));
}
