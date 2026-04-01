'use client';

import { Download, Upload, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';

export function ImportExportButtons({ data }: { data: any[] }) {
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/import-csv', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        alert(`Úspěšně importováno ${result.count} záznamů. Stránka se nyní obnoví.`);
        window.location.reload();
      } else {
        alert('Chyba při importu: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Došlo k chybě při nahrávání souboru.');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input 
        type="file" 
        accept=".csv" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button 
        onClick={handleImportClick}
        disabled={isImporting}
        className="flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
      >
        {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        Importovat CSV
      </button>
      <button 
        onClick={handleExport}
        className="flex items-center gap-2 bg-primary/20 text-primary hover:bg-primary hover:text-background px-4 py-2 rounded-lg font-medium transition-colors text-sm"
      >
        <Download className="w-4 h-4" />
        Exportovat do CSV
      </button>
    </div>
  );
}
