import db from '@/lib/db';
import { StatsDashboard } from '@/components/stats-dashboard';
import { ImportExportButtons } from '@/components/import-export-buttons';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { ReportEmailButton } from '@/components/report-email-button';

export const dynamic = 'force-dynamic';

function getChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function TrendBadge({ current, previous, label }: {current: number, previous: number, label: string}) {
  const change = getChange(current, previous);
  const isPositive = change > 0;
  const isNeutral = change === 0;
  return (
    <div className="flex items-center gap-2 mt-2">
      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isPositive ? 'bg-green-500/20 text-green-400' : isNeutral ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-400'}`}>
        {isPositive ? '+' : ''}{change}%
      </span>
      <span className="text-[10px] text-white/40 uppercase">{label}</span>
    </div>
  );
}

export default async function AdminStatsPage() {
  let visits: any[] = [];
  let popupStats = { show: 0, accept: 0, decline: 0 };
  let popupLeadsCount = 0;
  let googleAdsLeadsCount = 0;
  let hasDbError = false;
  let topPagesMap: Record<string, number> = {};

  try {
    // Fetch all visits
    const { rows: visitsRaw } = await db.query('SELECT * FROM visits ORDER BY created_at ASC');
    visits = visitsRaw as any[];

    // Fetch popular pages (ignore /admin)
    const { rows: pageviewsRaw } = await db.query("SELECT path, COUNT(*) as count FROM pageviews WHERE path NOT LIKE '/admin%' AND path NOT LIKE '/api%' GROUP BY path ORDER BY count DESC LIMIT 10");
    pageviewsRaw.forEach((row: any) => {
      topPagesMap[row.path] = parseInt(row.count, 10);
    });

    // Fetch popup stats
    const { rows: popupStatsRows } = await db.query('SELECT action, COUNT(*) as count FROM popup_stats GROUP BY action');
    popupStatsRows.forEach((row: any) => {
      if (row.action in popupStats) {
        popupStats[row.action as keyof typeof popupStats] = parseInt(row.count, 10);
      }
    });

    const { rows: popupLeadsRows } = await db.query("SELECT COUNT(*) as count FROM leads WHERE notes LIKE '%[Z Pop-up okna]%'");
    popupLeadsCount = parseInt(popupLeadsRows[0].count, 10);

    const { rows: googleAdsLeadsRows } = await db.query("SELECT COUNT(*) as count FROM leads WHERE type = 'Bezplatná kontrola oken - Google Ads'");
    googleAdsLeadsCount = parseInt(googleAdsLeadsRows[0].count, 10);
  } catch (error) {
    console.error('Failed to load admin stats:', error);
    hasDbError = true;
  }

  // Process visits by day
  const visitsByDay = visits.reduce((acc: any, visit: any) => {
    // pg created_at is a Date object or string, adjust it safely
    const dateStr = visit.created_at instanceof Date ? visit.created_at.toISOString().split('T')[0] : String(visit.created_at).split(' ')[0].split('T')[0];
    const date = dateStr;
    if (!acc[date]) {
      acc[date] = { date, count: 0, sources: {} };
    }
    acc[date].count += 1;
    
    // Normalize banner clicks
    const source = visit.source;
    if (!acc[date].sources[source]) {
      acc[date].sources[source] = 0;
    }
    acc[date].sources[source] += 1;
    
    return acc;
  }, {});

  const chartData = Object.values(visitsByDay);
  
  const totalVisits = visits.length;
  const googleVisits = visits.filter(v => v.source === 'google/1').length;
  const googleAdsLpVisits = visits.filter(v => v.source === 'google_ads_lp').length;
  const bannerClicks = visits.filter(v => v.source === 'click_floating_banner').length;
  const phoneClicks = visits.filter(v => v.source === 'click_phone').length;
  const facebookVisits = visits.filter(v => v.source === 'facebook_ads').length;
  const seznamVisits = visits.filter(v => v.source === 'seznam_ads').length;

  return (
    <main className="min-h-screen bg-background p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Zpět do administrace
            </Link>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
              Statistiky návštěvnosti
            </h1>
          </div>
          <ImportExportButtons data={visits} />
        </div>
        
        {hasDbError && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-6 py-4 rounded-xl text-sm mb-8">
            <b>Upozornění:</b> Nepodařilo se připojit k databázi nebo tabulky nebyly ještě inicializovány. Statistiky jsou momentálně nedostupné.
          </div>
        )}
        
        <h2 className="text-xl font-bold text-white mb-6">Návštěvnost podle zdroje</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-muted/20 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-2">Celkem Návštěv</h3>
            <p className="text-3xl lg:text-4xl font-display font-bold text-white">{totalVisits}</p>
          </div>
          <div className="bg-muted/20 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-2">Google Ads</h3>
            <p className="text-3xl lg:text-4xl font-display font-bold text-primary">{googleVisits}</p>
          </div>
          <div className="bg-muted/20 border border-[#1877F2]/20 rounded-2xl p-6">
            <h3 className="text-[#1877F2] text-[10px] font-bold uppercase tracking-wider mb-2">Facebook Ads</h3>
            <p className="text-3xl lg:text-4xl font-display font-bold text-[#1877F2]">{facebookVisits}</p>
          </div>
          <div className="bg-muted/20 border border-[#CC0000]/20 rounded-2xl p-6">
            <h3 className="text-[#CC0000] text-[10px] font-bold uppercase tracking-wider mb-2">Seznam / Sklik</h3>
            <p className="text-3xl lg:text-4xl font-display font-bold text-[#CC0000]">{seznamVisits}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-muted/20 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-2">Promo (LP: Kontrola)</h3>
            <p className="text-3xl lg:text-4xl font-display font-bold text-[#4ade80]">{googleAdsLpVisits}</p>
          </div>
          <div className="bg-muted/20 border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full -mr-8 -mt-8" />
            <h3 className="text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-2">Plovoucí banner</h3>
            <p className="text-3xl lg:text-4xl font-display font-bold text-purple-500">{bannerClicks}</p>
          </div>
          <div className="bg-muted/20 border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-bl-full -mr-8 -mt-8" />
            <h3 className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-2">Kliky na telefon</h3>
            <p className="text-3xl lg:text-4xl font-display font-bold text-cyan-500">{phoneClicks}</p>
          </div>
        </div>

        <h2 className="text-2xl font-display font-bold text-white mb-6 mt-12">
          Google stats reklamy (Landing Page)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-muted/20 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Návštěvy stránky</h3>
            <p className="text-4xl font-display font-bold text-white">{googleAdsLpVisits}</p>
            <p className="text-white/40 text-sm mt-2">Lidé, kteří přišli na /lp/kontrola-oken-ads</p>
          </div>
          <div className="bg-muted/20 border border-green-500/20 rounded-2xl p-6">
            <h3 className="text-green-400/80 text-sm font-bold uppercase tracking-wider mb-2">Odeslané formuláře</h3>
            <p className="text-4xl font-display font-bold text-green-400">{googleAdsLeadsCount}</p>
            <div className="flex flex-col gap-1 mt-2">
              <p className="text-white/40 text-sm">
                {googleAdsLpVisits > 0 ? Math.round((googleAdsLeadsCount / googleAdsLpVisits) * 100) : 0}% konverze stránky
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-display font-bold text-white mb-6 mt-12">
          Statistiky Pop-up okna
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-muted/20 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Zobrazeno</h3>
            <p className="text-4xl font-display font-bold text-white">{popupStats.show}</p>
          </div>
          <div className="bg-muted/20 border border-green-500/20 rounded-2xl p-6">
            <h3 className="text-green-400/80 text-sm font-bold uppercase tracking-wider mb-2">Přijato (Chci zdarma)</h3>
            <p className="text-4xl font-display font-bold text-green-400">{popupStats.accept}</p>
            <div className="flex flex-col gap-1 mt-2">
              <p className="text-white/40 text-sm">
                {popupStats.show > 0 ? Math.round((popupStats.accept / popupStats.show) * 100) : 0}% konverze kliknutí
              </p>
              <p className="text-green-400/60 text-sm font-medium">
                {popupLeadsCount} odeslaných poptávek
              </p>
            </div>
          </div>
          <div className="bg-muted/20 border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-red-400/80 text-sm font-bold uppercase tracking-wider mb-2">Odmítnuto (Křížek / Ne)</h3>
            <p className="text-4xl font-display font-bold text-red-400">{popupStats.decline}</p>
          </div>
        </div>

        <div className="bg-muted/20 border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6">Vývoj návštěvnosti v čase</h2>
          <div className="h-[400px] w-full">
            <StatsDashboard data={chartData} />
          </div>
        </div>

        <div className="mt-12 bg-muted/20 border border-white/10 rounded-2xl p-6 md:p-8 overflow-x-auto">
          <h2 className="text-xl font-bold text-white mb-6">Nejnavštěvovanější stránky (Zobrazení)</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-white/60 font-bold text-sm uppercase tracking-wider">Stránka (Cesta)</th>
                <th className="py-3 px-4 text-white/60 font-bold text-sm uppercase tracking-wider text-right">Zobrazení</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(topPagesMap).length > 0 ? Object.entries(topPagesMap).sort((a,b) => b[1] - a[1]).map(([path, count], i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-primary font-medium">{path === '/' ? 'Hlavní stránka (/)' : path}</td>
                  <td className="py-3 px-4 text-white text-right font-bold">{count}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={2} className="py-8 text-center text-white/50">Zatím se sbírají data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 bg-muted/20 border border-white/10 rounded-2xl p-6 md:p-8 overflow-x-auto">
          <h2 className="text-xl font-bold text-white mb-6">Poslední prokliky</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-white/60 font-bold text-sm uppercase tracking-wider">Čas</th>
                <th className="py-3 px-4 text-white/60 font-bold text-sm uppercase tracking-wider">Zdroj</th>
                <th className="py-3 px-4 text-white/60 font-bold text-sm uppercase tracking-wider">IP / Zařízení</th>
              </tr>
            </thead>
            <tbody>
              {visits.slice().reverse().slice(0, 50).map((visit, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white/80">{visit.created_at instanceof Date ? visit.created_at.toLocaleString('cs-CZ') : new Date(visit.created_at).toLocaleString('cs-CZ')}</td>
                  <td className="py-3 px-4 text-primary font-medium">{visit.source}</td>
                  <td className="py-3 px-4 text-white/50 text-sm">{visit.ip} <br/> <span className="text-xs truncate max-w-[200px] inline-block">{visit.user_agent}</span></td>
                </tr>
              ))}
              {visits.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-white/50">Zatím žádné prokliky</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
