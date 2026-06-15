import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Chybí ID formuláře' }, { status: 400 });
    }

    const { rows } = await db.query('SELECT * FROM leads WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Formulář nenalezen' }, { status: 404 });
    }

    const lead = rows[0];

    // Zjištění Test Mode (bezpečně)
    let isTestMode = false;
    try {
      const { rows: testModeRows } = await db.query("SELECT value FROM settings WHERE key = 'test_mode'");
      isTestMode = testModeRows[0]?.value === 'true';
    } catch (err) {
      console.warn('Nepodařilo se zjistit test_mode z DB, výchozí je false.');
    }

    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Qapi.cz Web (Znovu odesláno)" <${process.env.GMAIL_USER}>`,
        to: isTestMode ? 'ludvikremesekwork@gmail.com' : 'poptavky@qapi.cz, info@qapi.cz, ludvikremesekwork@gmail.com',
        subject: `${isTestMode ? '[TEST MODE] ' : ''}[ZNOVU ODESLÁNO Z ADMINU] Nová poptávka z webu: ${lead.service} - ${lead.name}`,
        html: `
          <h2>Znovu odeslaná poptávka z webu Qapi.cz</h2>
          <p><strong>Služba:</strong> ${lead.service}</p>
          <p><strong>Typ:</strong> ${lead.type || 'Nezadáno'}</p>
          ${lead.color ? `<p><strong>Barva:</strong> ${lead.color}</p>` : ''}
          <p><strong>Datum:</strong> ${lead.date || 'Nezadáno'}</p>
          <p><strong>Čas:</strong> ${lead.time || 'Nezadáno'}</p>
          <hr />
          <h3>Kontaktní údaje:</h3>
          <p><strong>Jméno:</strong> ${lead.name}</p>
          <p><strong>Telefon:</strong> ${lead.phone}</p>
          <p><strong>E-mail:</strong> ${lead.email}</p>
          <p><strong>Adresa:</strong> ${lead.address}</p>
          <hr />
          <h3>Poznámka:</h3>
          <p>${lead.notes || 'Bez poznámky'}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Chybí konfigurace e-mailu na serveru' }, { status: 500 });
    }
  } catch (error) {
    console.error('Chyba při znovu odesílání formuláře:', error);
    return NextResponse.json({ error: 'Interní chyba serveru' }, { status: 500 });
  }
}
