'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export function ReportEmailButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const handleSend = async () => {
    setIsLoading(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/admin/send-report');
      const data = await res.json();
      
      setStatus('success');
      
      // If we got HTML back, it means we show a preview (SMTP probably missing in testing env)
      if (data.html) {
        setPreviewHtml(data.html);
      }
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (e) {
      console.error(e);
      alert('Chyba při odesílání.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={handleSend}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 hover:border-primary/50 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
      >
        {status === 'success' ? (
          <><CheckCircle2 className="w-4 h-4" /> Odesláno (Zobrazuji Náhled)</>
        ) : (
          <><Mail className="w-4 h-4" /> {isLoading ? 'Generuji...' : 'Náhled Report E-mailu'}</>
        )}
      </button>

      {/* Modal Preview */}
      {previewHtml && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
          <div className="bg-white rounded-xl w-full max-w-3xl h-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50 text-gray-800">
              <div className="flex flex-col">
                <span className="font-bold">Náhled e-mailu</span>
                <span className="text-xs text-gray-500">Tento e-mail se pošle každou neděli (pokud nastavíte GMAIL_USER a GMAIL_PASS).</span>
              </div>
              <button 
                onClick={() => setPreviewHtml(null)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
              {/* Vykreslení vygenerovaného HTML e-mailu z API přímo v okně */}
              <div 
                className="w-full max-w-2xl mx-auto rounded-xl shadow-sm border border-gray-100 bg-white min-h-full"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-sm text-gray-500 rounded-b-xl flex items-start gap-3">
               <div>
                 <strong>Jak spustit automat?</strong><br/>
                 Zavolejte cron job na URL adresu tohoto webu s cestou <code>/api/admin/send-report</code> pomocí služby jako cron-job.org nebo Google Cloud Scheduler každou neděli o půlnoci.
               </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
