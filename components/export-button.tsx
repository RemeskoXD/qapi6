'use client';

import { Download } from 'lucide-react';

export function ExportButton({ data }: { data: any[] }) {
  const handleExport = () => {
    // Vytvoření CSV obsahu
    const headers = ['Datum a Čas', 'Zdroj', 'IP Adresa', 'Zařízení'];
    const csvRows = [headers.join(',')];

    data.forEach(visit => {
      const date = new Date(visit.created_at + 'Z').toLocaleString('cs-CZ').replace(/,/g, '');
      const source = visit.source;
      const ip = visit.ip;
      // Escape quotes in user agent
      const userAgent = `"${(visit.user_agent || '').replace(/"/g, '""')}"`;
      
      csvRows.push([date, source, ip, userAgent].join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `statistiky_qapi_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleExport}
      className="flex items-center gap-2 bg-primary/20 text-primary hover:bg-primary hover:text-background px-4 py-2 rounded-lg font-medium transition-colors text-sm"
    >
      <Download className="w-4 h-4" />
      Exportovat do CSV
    </button>
  );
}
