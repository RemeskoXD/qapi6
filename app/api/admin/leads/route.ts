import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}
