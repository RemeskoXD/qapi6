import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const start = Date.now();
    const { rows } = await db.query('SELECT version()');
    const end = Date.now();
    
    return NextResponse.json({ 
      success: true, 
      version: rows[0]?.version,
      latency: `${end - start}ms`
    });
  } catch (error) {
    console.error('DB Test failed:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      success: false, 
      error: errMsg 
    }, { status: 500 });
  }
}
