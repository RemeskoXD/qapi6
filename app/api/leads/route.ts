import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, type, color, date, time, name, phone, email, address, notes } = body;

    // Základní validace
    if (!service || !type || !date || !time || !name || !phone || !email || !address) {
      return NextResponse.json({ error: 'Chybí povinné údaje' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO leads (service, type, color, date, time, name, phone, email, address, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(service, type, color || null, date, time, name, phone, email, address, notes || null);

    return NextResponse.json({ success: true, id: info.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error('Chyba při ukládání poptávky:', error);
    return NextResponse.json({ error: 'Interní chyba serveru' }, { status: 500 });
  }
}
