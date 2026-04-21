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
    const dataLines = lines.slice(1).filter((line: string) => line.trim() !== '');
    
    let importedCount = 0;
    
    const client = await db.connect();

    try {
      await client.query('BEGIN');
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
        
        // Remove invalid unicode/non-printable characters that can break Postgres inserts
        userAgent = userAgent.replace(/[^\x20-\x7E\s]/g, '');

        // Convert Czech date (8. 4. 2026 13:50:44) to DB format (2026-04-08 13:50:44)
        let dbDate = '';
        try {
          const cleanDateStr = dateStr.trim().replace(/\s+/g, ' '); // Normalize spaces
          const parts = cleanDateStr.split(' ');
          if (parts.length >= 4) {
            const day = parts[0].replace(/[^0-9]/g, '').padStart(2, '0');
            const month = parts[1].replace(/[^0-9]/g, '').padStart(2, '0');
            const year = parts[2].replace(/[^0-9]/g, '');
            
            // Format time correctly (ensure zero padding for hour, minute, second if they are short)
            const rawTime = parts[3].split(':');
            const hour = (rawTime[0] || '00').padStart(2, '0');
            const min = (rawTime[1] || '00').padStart(2, '0');
            const sec = (rawTime[2] || '00').padStart(2, '0');
            const time = `${hour}:${min}:${sec}`;

            dbDate = `${year}-${month}-${day} ${time}`;
          }
        } catch (e) {
          // Fallback if parsing fails
          dbDate = new Date().toISOString().replace('T', ' ').split('.')[0];
        }

        // Validate DB format YYYY-MM-DD HH:MM:SS using regex just to be sure we don't break postgres
        if (!dbDate || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dbDate)) {
          console.warn('Nahrazuji neplatný čas:', dateStr);
          dbDate = new Date().toISOString().replace('T', ' ').split('.')[0];
        }
        
        try {
          await client.query(`
            INSERT INTO visits (source, ip, user_agent, created_at)
            VALUES ($1, $2, $3, $4)
          `, [
            source.trim(), 
            ip ? ip.trim() : null, 
            userAgent ? userAgent.trim() : null, 
            dbDate
          ]);
          importedCount++;
        } catch (rowErr) {
          console.error(`Chyba při vkládání řádku do databáze (záznam s datem ${dbDate}):`, rowErr);
          throw rowErr; // Reroute to rollback
        }
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      console.error('Chyba během transakce vkládání CSV, provádím rollback:', e);
      throw e;
    } finally {
      client.release();
    }

    return NextResponse.json({ success: true, count: importedCount });
  } catch (error) {
    console.error('Chyba při importu CSV:', error);
    return NextResponse.json({ success: false, error: 'Interní chyba serveru' }, { status: 500 });
  }
}
