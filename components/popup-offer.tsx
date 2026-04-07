'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function PopupOffer() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user already saw the popup
    const hasSeenPopup = localStorage.getItem('qapi_popup_seen');
    
    if (!hasSeenPopup) {
      // Set timer for 30 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Record 'show' event
        fetch('/api/stats/popup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'show' })
        }).catch(console.error);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (action: 'accept' | 'decline') => {
    setIsVisible(false);
    localStorage.setItem('qapi_popup_seen', 'true');
    
    // Record the action
    fetch('/api/stats/popup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    }).catch(console.error);

    if (action === 'accept') {
      // Redirect to booking form with pre-filled parameters
      const params = new URLSearchParams({
        service: 'kontrola',
        source: 'popup'
      });
      router.push(`/?${params.toString()}#rezervace`);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => handleClose('decline')}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-background border border-primary/30 rounded-3xl shadow-[0_20px_60px_-15px_rgba(212,175,55,0.4)] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => handleClose('decline')}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
              aria-label="Zavřít"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8 text-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
              
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/50 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-3xl font-display font-bold text-white mb-4 drop-shadow-lg">
                Kontrola oken <span className="text-primary">ZDARMA</span>
              </h2>
              
              <p className="text-white/80 mb-8 leading-relaxed">
                Ztrácíte teplo i peníze? Zjistěte okamžitě, zda vaše okna potřebují odborný zásah. Nečekejte na zimu!
              </p>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleClose('accept')}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-widest rounded-xl hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_15px_30px_rgba(212,175,55,0.3)] flex flex-col items-center justify-center"
                >
                  <span>Chci zdarma objednat</span>
                  <span className="text-[10px] opacity-80 font-normal mt-1 lowercase tracking-normal">(Nezávazné)</span>
                </button>
                
                <button
                  onClick={() => handleClose('decline')}
                  className="w-full px-6 py-3 bg-transparent text-white/60 font-medium text-sm hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  Odmítnout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
