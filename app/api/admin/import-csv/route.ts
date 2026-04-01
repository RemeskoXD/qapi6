import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'Nebyl nahrán žádný soubor' }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split('\n');
    
    // Skip header row
    const dataLines = lines.slice(1).filter(line => line.trim() !== '');
    
    let importedCount = 0;
    
    const insertStmt = db.prepare(`
      INSERT INTO visits (source, ip, user_agent, created_at)
      VALUES (?, ?, ?, ?)
    `);

    // Parse CSV lines
    // Format: Datum a Čas,Zdroj,IP Adresa,Zařízení
    // Example: 1. 4. 2026 12:00:00,google/1,192.168.1.1,"Mozilla/5.0..."
    
    db.transaction(() => {
      for (const line of dataLines) {
        // Simple CSV parser (handles quotes for user_agent)
        const match = line.match(/^([^,]+),([^,]+),([^,]*),?(.*)$/);
        if (!match) continue;
        
        const [_, dateStr, source, ip, userAgentRaw] = match;
        
        // Clean user agent (remove surrounding quotes and unescape double quotes)
        let userAgent = userAgentRaw || '';
        if (userAgent.startsWith('"') && userAgent.endsWith('"')) {
          userAgent = userAgent.slice(1, -1).replace(/""/g, '"');
        }

        // Convert Czech date (1. 4. 2026 12:00:00) to SQLite format (2026-04-01 12:00:00)
        let sqliteDate = '';
        try {
          const parts = dateStr.split(' ');
          if (parts.length >= 4) {
            const day = parts[0].replace('.', '').padStart(2, '0');
            const month = parts[1].replace('.', '').padStart(2, '0');
            const year = parts[2];
            const time = parts[3];
            sqliteDate = `${year}-${month}-${day} ${time}`;
          }
        } catch (e) {
          // Fallback if parsing fails
          sqliteDate = new Date().toISOString().replace('T', ' ').split('.')[0];
        }

        if (!sqliteDate) {
          sqliteDate = new Date().toISOString().replace('T', ' ').split('.')[0];
        }

        insertStmt.run(source, ip || null, userAgent || null, sqliteDate);
        importedCount++;
      }
    })();

    return NextResponse.json({ success: true, count: importedCount });
  } catch (error) {
    console.error('Chyba při importu CSV:', error);
    return NextResponse.json({ success: false, error: 'Interní chyba serveru' }, { status: 500 });
  }
}
