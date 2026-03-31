import db from '@/lib/db';
import { StatsDashboard } from '@/components/stats-dashboard';
import { ExportButton } from '@/components/export-button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminStatsPage() {
  // Fetch all visits
  const visits = db.prepare('SELECT * FROM visits ORDER BY created_at ASC').all() as any[];
  
  // Process visits by day
  const visitsByDay = visits.reduce((acc: any, visit: any) => {
    // SQLite created_at is in 'YYYY-MM-DD HH:MM:SS' format
    const date = visit.created_at.split(' ')[0];
    if (!acc[date]) {
      acc[date] = { date, count: 0, sources: {} };
    }
    acc[date].count += 1;
    
    if (!acc[date].sources[visit.source]) {
      acc[date].sources[visit.source] = 0;
    }
    acc[date].sources[visit.source] += 1;
    
    return acc;
  }, {});

  const chartData = Object.values(visitsByDay);
  
  const totalVisits = visits.length;
  const googleVisits = visits.filter(v => v.source === 'google/1').length;

  // Fetch popup stats
  const popupStatsRows = db.prepare('SELECT action, COUNT(*) as count FROM popup_stats GROUP BY action').all() as any[];
  const popupStats = {
    show: 0,
    accept: 0,
    decline: 0
  };
  popupStatsRows.forEach((row: any) => {
    if (row.action in popupStats) {
      popupStats[row.action as keyof typeof popupStats] = row.count;
    }
  });

  const popupLeadsCount = (db.prepare("SELECT COUNT(*) as count FROM leads WHERE notes LIKE '%[Z Pop-up okna]%'").get() as any).count;

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
          <ExportButton data={visits} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-muted/20 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Celkem prokliků</h3>
            <p className="text-4xl font-display font-bold text-white">{totalVisits}</p>
          </div>
          <div className="bg-muted/20 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Z Google kampaně (/google/1)</h3>
            <p className="text-4xl font-display font-bold text-primary">{googleVisits}</p>
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
                  <td className="py-3 px-4 text-white/80">{new Date(visit.created_at + 'Z').toLocaleString('cs-CZ')}</td>
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
