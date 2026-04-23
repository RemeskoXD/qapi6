import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path } = body;
    
    if (!path) {
      return NextResponse.json({ error: 'Missing path' }, { status: 400 });
    }

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    await db.query(`
      INSERT INTO pageviews (path, ip, user_agent)
      VALUES ($1, $2, $3)
    `, [path, ip, userAgent]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log pageview:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
