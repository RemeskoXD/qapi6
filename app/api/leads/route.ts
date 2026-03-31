import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, type, color, date, time, name, phone, email, address, notes } = body;

    // Základní validace
    if (!service || !name || !phone || !email || !address) {
      return NextResponse.json({ error: 'Chybí povinné údaje' }, { status: 400 });
    }

    const finalType = type || 'Nezadáno';
    const finalDate = date || 'Nezadáno';
    const finalTime = time || 'Nezadáno';

    // Uložení do databáze
    const stmt = db.prepare(`
      INSERT INTO leads (service, type, color, date, time, name, phone, email, address, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(service, finalType, color || null, finalDate, finalTime, name, phone, email, address, notes || null);

    // Odeslání e-mailu
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Qapi.cz Web" <${process.env.GMAIL_USER}>`,
        to: 'info@qapi.cz, poptavky@qapi.cz, ludvikremesekwork@gmail.com',
        subject: `Nová poptávka z webu: ${service} - ${name}`,
        html: `
          <h2>Nová poptávka z webu Qapi.cz</h2>
          <p><strong>Služba:</strong> ${service}</p>
          <p><strong>Typ:</strong> ${finalType}</p>
          ${color ? `<p><strong>Barva:</strong> ${color}</p>` : ''}
          <p><strong>Datum:</strong> ${finalDate}</p>
          <p><strong>Čas:</strong> ${finalTime}</p>
          <hr />
          <h3>Kontaktní údaje:</h3>
          <p><strong>Jméno:</strong> ${name}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Adresa:</strong> ${address}</p>
          <hr />
          <h3>Poznámka:</h3>
          <p>${notes || 'Bez poznámky'}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn('E-mail nebyl odeslán: Chybí GMAIL_USER nebo GMAIL_PASS v proměnných prostředí.');
    }

    return NextResponse.json({ success: true, id: info.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error('Chyba při ukládání poptávky nebo odesílání e-mailu:', error);
    return NextResponse.json({ error: 'Interní chyba serveru' }, { status: 500 });
  }
}
