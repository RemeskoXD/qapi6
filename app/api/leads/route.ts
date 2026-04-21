import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, type, color, date, time, name, phone, email, address, notes } = body;

    // Základní validace
    if (!service || !name || !phone || !email || !address) {
      console.warn('Pokus o odeslání leadu s chybějícími poli:', { service: !!service, name: !!name, phone: !!phone, email: !!email, address: !!address });
      return NextResponse.json({ error: 'Chybí povinné údaje (jméno, telefon, email nebo adresa)' }, { status: 400 });
    }

    const finalType = type || 'Nezadáno';
    const finalDate = date || 'Nezadáno';
    const finalTime = time || 'Nezadáno';

    let leadId = null;
    let dbError = null;

    // 1. Uložení do databáze (s chycením chyby, aby neblokovala zbytek)
    try {
      const { rows: savedRows } = await db.query(`
        INSERT INTO leads (service, type, color, date, time, name, phone, email, address, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `, [service, finalType, color || null, finalDate, finalTime, name, phone, email, address, notes || null]);
      leadId = savedRows[0]?.id;
    } catch (err) {
      console.error('Kritická chyba při zápisu Lead do DB:', err);
      dbError = err;
    }

    // 2. Zjištění Test Mode (bezpečně)
    let isTestMode = false;
    try {
      const { rows: testModeRows } = await db.query("SELECT value FROM settings WHERE key = 'test_mode'");
      isTestMode = testModeRows[0]?.value === 'true';
    } catch (err) {
      console.warn('Nepodařilo se zjistit test_mode z DB, výchozí je false.');
    }

    // 3. Odeslání e-mailu
    let emailSent = false;
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Qapi.cz Web" <${process.env.GMAIL_USER}>`,
          to: isTestMode ? 'ludvikremesekwork@gmail.com' : 'info@qapi.cz, poptavky@qapi.cz, ludvikremesekwork@gmail.com',
          subject: `${isTestMode ? '[TEST MODE] ' : ''}Nová poptávka z webu: ${service} - ${name}`,
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
            ${dbError ? `<p style="color:red"><strong>Upozornění:</strong> Data se nepodařilo uložit do databáze, ale e-mail byl doručen.</p>` : ''}
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (err) {
        console.error('Chyba při odesílání e-mailu:', err);
      }
    } else {
      console.warn('E-mail nebyl odeslán: Chybí GMAIL_USER nebo GMAIL_PASS.');
    }

    // Pokud selhalo úplně všechno (DB i Email), pak nahlásíme chybu, jinak vracíme success
    if (dbError && !emailSent) {
      throw new Error('Nepodařilo se uložit data ani odeslat e-mail.');
    }

    return NextResponse.json({ 
      success: true, 
      id: leadId,
      warning: dbError ? 'Uloženo pouze do e-mailu' : undefined 
    }, { status: 201 });
  } catch (error) {
    console.error('Chyba v leads/route.ts:', error);
    return NextResponse.json({ error: 'Interní chyba serveru' }, { status: 500 });
  }
}
