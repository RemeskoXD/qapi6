import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { action } = await request.json();
    
    if (!['show', 'accept', 'decline'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    const stmt = db.prepare(`INSERT INTO popup_stats (action) VALUES (?)`);
    stmt.run(action);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving popup stat:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stmt = db.prepare(`
      SELECT action, COUNT(*) as count 
      FROM popup_stats 
      GROUP BY action
    `);
    const rows = stmt.all();
    
    const stats = {
      show: 0,
      accept: 0,
      decline: 0
    };
    
    rows.forEach((row: any) => {
      if (row.action in stats) {
        stats[row.action as keyof typeof stats] = row.count;
      }
    });
    
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching popup stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
