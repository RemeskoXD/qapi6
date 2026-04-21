import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { action } = await request.json();
    
    if (!['show', 'accept', 'decline'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    await db.query(`INSERT INTO popup_stats (action) VALUES ($1)`, [action]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving popup stat:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { rows } = await db.query(`
      SELECT action, COUNT(*) as count 
      FROM popup_stats 
      GROUP BY action
    `);
    
    const stats: any = {
      show: 0,
      accept: 0,
      decline: 0
    };
    
    rows.forEach((row: any) => {
      if (row.action in stats) {
        stats[row.action] = parseInt(row.count, 10);
      }
    });
    
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching popup stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
