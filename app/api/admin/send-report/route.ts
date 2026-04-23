import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

function getChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function getBadge(change: number) {
  if (change > 0) return `<span style="color: #10b981; font-weight: bold;">+${change}% 🚀</span>`;
  if (change < 0) return `<span style="color: #ef4444; font-weight: bold;">${change}% 📉</span>`;
  return `<span style="color: #6b7280; font-weight: bold;">0% - Beze změny</span>`;
}

export async function GET(request: Request) {
  try {
    // 1. Získejte návštěvy za poslední týden a ten předchozí (14 dní)
    const { rows: visits } = await db.query('SELECT created_at, source FROM visits WHERE created_at >= NOW() - INTERVAL \'14 days\'');
    
    // Získejte zájemce / poptávky za posledních 14 dní
    const { rows: leads } = await db.query('SELECT created_at, service, type, notes FROM leads WHERE created_at >= NOW() - INTERVAL \'14 days\'');

    // Pop-up stats a Pageviews jen za posledních 7 dnů
    const { rows: currPopupRaw } = await db.query("SELECT action, COUNT(*) as count FROM popup_stats WHERE created_at >= NOW() - INTERVAL '7 days' GROUP BY action");
    const { rows: currPagesRaw } = await db.query("SELECT path, COUNT(*) as count FROM pageviews WHERE created_at >= NOW() - INTERVAL '7 days' AND path NOT LIKE '/admin%' AND path NOT LIKE '/api%' GROUP BY path ORDER BY count DESC LIMIT 5");

    const now = new Date();
    const t7DaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Kbelíky návštěvnosti
    const currVisits = visits.filter(v => new Date(v.created_at) >= t7DaysAgo);
    const prevVisits = visits.filter(v => new Date(v.created_at) < t7DaysAgo);

    // Kbelíky Poptávek
    const currLeads = leads.filter(l => new Date(l.created_at) >= t7DaysAgo);
    const prevLeads = leads.filter(l => new Date(l.created_at) < t7DaysAgo);

    const visitChange = getChange(currVisits.length, prevVisits.length);
    const leadChange = getChange(currLeads.length, prevLeads.length);

    // Zdrojová rozpadávka za tento týden
    const currGoogle = currVisits.filter(v => v.source === 'google/1' || v.source.startsWith('google')).length;
    const currFB = currVisits.filter(v => v.source === 'facebook_ads').length;
    const currSeznam = currVisits.filter(v => v.source === 'seznam_ads').length;
    const currBanner = currVisits.filter(v => v.source === 'click_floating_banner').length;
    const currPhone = currVisits.filter(v => v.source === 'click_phone').length;
    const currLPOkna = currVisits.filter(v => v.source === 'google_ads_lp').length;
    const currLPStineni = currVisits.filter(v => v.source === 'lp_stinici_technika').length;
    const currLPSite = currVisits.filter(v => v.source === 'lp_site_do_oken' || v.source === 'lp_site_proti_hmyzu').length;

    // Pop-up data
    let popupShow = 0, popupAccept = 0, popupDecline = 0;
    currPopupRaw.forEach((r: any) => {
      if(r.action === 'show') popupShow = parseInt(r.count, 10);
      if(r.action === 'accept') popupAccept = parseInt(r.count, 10);
      if(r.action === 'decline') popupDecline = parseInt(r.count, 10);
    });

    // Poptávky podle Služby
    const leadsByService: Record<string, number> = {};
    currLeads.forEach(l => {
        const s = l.service || 'Neznámé';
        leadsByService[s] = (leadsByService[s] || 0) + 1;
    });

    // Sestavte pěknej HTML report
    const htmlReport = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 12px;">
      <h1 style="color: #111827; margin-bottom: 5px;">Týdenní report návštěvnosti</h1>
      <p style="color: #6b7280; font-size: 14px; margin-top: 0; margin-bottom: 30px;">Zde je souhrn všeho podstatného, co se na webu QAPI událo za posledních 7 dní.</p>
      
      <!-- SOUHRN -->
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h2 style="margin-top: 0; color: #374151; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Klíčové metriky</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 12px 0; color: #4b5563;">Celková návštěvnost</td>
            <td style="padding: 12px 0; text-align: right; font-weight: bold; font-size: 20px;">${currVisits.length}</td>
            <td style="padding: 12px 0; text-align: right; font-size: 14px;">${getBadge(visitChange)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #4b5563;">Odeslané Poptávky</td>
            <td style="padding: 12px 0; text-align: right; font-weight: bold; font-size: 20px;">${currLeads.length}</td>
            <td style="padding: 12px 0; text-align: right; font-size: 14px;">${getBadge(leadChange)}</td>
          </tr>
        </table>
      </div>

      <!-- ZDROJE -->
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h2 style="margin-top: 0; color: #374151; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Odkud se lidé berou?</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #4b5563;">Google Ads</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold;">${currGoogle}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #4b5563;">Facebook Ads</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold;">${currFB}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #4b5563;">Seznam Sklik</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold;">${currSeznam}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #4b5563;">Návštěvy Landing Page (Okna)</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold;">${currLPOkna}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #4b5563;">Návštěvy Landing Page (Stínění)</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold;">${currLPStineni}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #4b5563;">Návštěvy Landing Page (Sítě)</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold;">${currLPSite}</td>
          </tr>
        </table>
      </div>

      <!-- AKCE -->
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h2 style="margin-top: 0; color: #374151; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Na co lidé klikají</h2>
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <div style="flex: 1; background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
               <div style="font-size: 24px; font-weight: bold; color: #111827;">${currBanner}</div>
               <div style="font-size: 12px; color: #6b7280; text-transform: uppercase;">Zájem o Banner</div>
            </div>
            <div style="flex: 1; background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
               <div style="font-size: 24px; font-weight: bold; color: #111827;">${currPhone}</div>
               <div style="font-size: 12px; color: #6b7280; text-transform: uppercase;">Kliknutí na telefon</div>
            </div>
        </div>

        <h3 style="color: #4b5563; font-size: 14px; margin-bottom: 10px;">Úspěšnost Pop-Up okna</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
           <tr><td style="padding: 5px 0; color: #6b7280;">Zobrazeno</td><td style="text-align: right;">${popupShow}x</td></tr>
           <tr><td style="padding: 5px 0; color: #10b981; font-weight: bold;">Přijato</td><td style="text-align: right; color: #10b981; font-weight: bold;">${popupAccept}x</td></tr>
           <tr><td style="padding: 5px 0; color: #ef4444;">Odmítnuto</td><td style="text-align: right; color: #ef4444;">${popupDecline}x</td></tr>
        </table>
      </div>

       <!-- POPTAVKY DETAIL -->
       ${currLeads.length > 0 ? `
       <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <h2 style="margin-top: 0; color: #374151; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Struktura poptávek</h2>
        <ul style="list-style: none; padding: 0; margin: 0; color: #4b5563;">
           ${Object.entries(leadsByService).map(([srv, count]) => `
             <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between;">
               <span>${srv}</span>
               <strong>${count}x</strong>
             </li>
           `).join('')}
        </ul>
      </div>
      ` : ''}

      <!-- TOP STRÁNKY -->
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;">
        <h2 style="margin-top: 0; color: #374151; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Top 5 navštěvovaných stránek</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          ${currPagesRaw.map((p: any) => `
            <tr>
              <td style="padding: 8px 0; color: #4b5563; border-bottom: 1px solid #f3f4f6;">${p.path === '/' ? 'Hlavní stránka (/)' : p.path}</td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${p.count}</td>
            </tr>
          `).join('')}
        </table>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://qapi.cz/admin/stats" style="background-color: #D4AF37; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Přejít do detailních statistik</a>
      </div>
      
      <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px;">Toto je automaticky generovaný report aplikací QAPI.</p>
    </div>
    `;

    // Try to send via Nodemailer if SMTP is configured. Otherwise return HTML layout preview.
    // Očividně v rámci AI Studio dema nemáme reálné heslo a server.
    const user = process.env.SMTP_USER || process.env.GMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.GMAIL_PASS;
    const host = process.env.SMTP_HOST || (process.env.GMAIL_USER ? 'smtp.gmail.com' : undefined);
    const port = parseInt(process.env.SMTP_PORT || '587');
    const secure = process.env.SMTP_PORT === '465'; // true for 465, false for other ports

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: secure,
        auth: {
          user: user,
          pass: pass,
        },
      });

      await transporter.sendMail({
        from: '"QAPI Report" <report@qapi.cz>',
        to: "ludvikremesekwork@gmail.com, info@qapi.cz",
        subject: "QAPI - Týdenní přehled: " + currVisits.length + " návštěv a " + currLeads.length + " poptávek",
        html: htmlReport,
      });

      return NextResponse.json({ success: true, message: 'Odesláno přes Gmail', html: htmlReport });
    } else {
      // V případě preview / pokud nenastavili SMTP, vrátím HTML kód k vykreslení do vyskakovacího okna na webu
      return NextResponse.json({ 
        success: true, 
        message: 'Credentials chybí (GMAIL_USER a GMAIL_PASS). Zobrazuji jako HTML string.',
        html: htmlReport
      });
    }

  } catch (error) {
    console.error('Failed to generate/send report:', error);
    return NextResponse.json({ error: 'Internal server error', html: null }, { status: 500 });
  }
}
