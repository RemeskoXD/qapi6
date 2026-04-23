import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, url, source_override } = body;
    
    if (!event && !source_override) {
      return NextResponse.json({ error: 'Missing event name or source' }, { status: 400 });
    }

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    // Log the click into the visits table with a special source prefix or override
    const source = source_override || `click_${event}`;
    
    await db.query(`
      INSERT INTO visits (source, ip, user_agent)
      VALUES ($1, $2, $3)
    `, [source, ip, userAgent]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
