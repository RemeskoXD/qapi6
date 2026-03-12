'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, Check, Cookie } from 'lucide-react';

type ConsentSettings = {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  personalization_storage: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [settings, setSettings] = useState<ConsentSettings>({
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    personalization_storage: 'denied',
    functionality_storage: 'denied',
  });

  const applyConsent = (consentSettings: ConsentSettings) => {
    // Update dataLayer for Google Consent Mode / Sklik
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }
    
    gtag('consent', 'update', consentSettings);
    
    // Save to local storage
    localStorage.setItem('cookie-consent', JSON.stringify(consentSettings));
    setHasConsented(true);
  };

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    } else {
      // Apply existing consent
      const parsedConsent = JSON.parse(consent);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings(parsedConsent);
      applyConsent(parsedConsent);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasConsented(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allGranted: ConsentSettings = {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      personalization_storage: 'granted',
      functionality_storage: 'granted',
    };
    setSettings(allGranted);
    applyConsent(allGranted);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const allDenied: ConsentSettings = {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      personalization_storage: 'denied',
      functionality_storage: 'denied',
    };
    setSettings(allDenied);
    applyConsent(allDenied);
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    applyConsent(settings);
    setIsVisible(false);
  };

  const toggleSetting = (key: keyof ConsentSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: prev[key] === 'granted' ? 'denied' : 'granted'
    }));
  };

  const openSettings = () => {
    setShowSettings(true);
    setIsVisible(true);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
          >
            <div className="max-w-5xl mx-auto bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
              {!showSettings ? (
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Respektujeme vaše soukromí</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      K personalizaci obsahu a reklam, poskytování funkcí sociálních médií a analýze naší návštěvnosti využíváme soubory cookie. Informace o tom, jak náš web používáte, sdílíme se svými partnery pro sociální média, inzerci a analýzy.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-6 py-3 rounded-xl border border-white/20 text-white text-sm font-bold hover:bg-white/5 transition-colors"
                    >
                      Nastavení
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-3 rounded-xl border border-white/20 text-white text-sm font-bold hover:bg-white/5 transition-colors"
                    >
                      Odmítnout
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    >
                      Přijmout vše
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Nastavení cookies</h3>
                    <button onClick={() => hasConsented ? setIsVisible(false) : setShowSettings(false)} className="p-2 text-white/50 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <h4 className="text-white font-bold mb-1">Nezbytné cookies</h4>
                        <p className="text-white/60 text-xs">Tyto cookies jsou nutné pro správné fungování webu a nelze je vypnout.</p>
                      </div>
                      <div className="shrink-0 text-primary text-sm font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Vždy aktivní
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <h4 className="text-white font-bold mb-1">Analytické cookies (analytics_storage)</h4>
                        <p className="text-white/60 text-xs">Pomáhají nám pochopit, jak návštěvníci používají web.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('analytics_storage')}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.analytics_storage === 'granted' ? 'bg-primary' : 'bg-white/20'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.analytics_storage === 'granted' ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <h4 className="text-white font-bold mb-1">Marketingové cookies (ad_storage)</h4>
                        <p className="text-white/60 text-xs">Používají se ke sledování návštěvníků napříč weby. Záměrem je zobrazit reklamu, která je relevantní pro uživatele.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('ad_storage')}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.ad_storage === 'granted' ? 'bg-primary' : 'bg-white/20'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.ad_storage === 'granted' ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <h4 className="text-white font-bold mb-1">Uživatelská data pro reklamy (ad_user_data)</h4>
                        <p className="text-white/60 text-xs">Souhlas se zasíláním uživatelských dat reklamním systémům (např. Google, Sklik).</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('ad_user_data')}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.ad_user_data === 'granted' ? 'bg-primary' : 'bg-white/20'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.ad_user_data === 'granted' ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <h4 className="text-white font-bold mb-1">Personalizace reklam (ad_personalization)</h4>
                        <p className="text-white/60 text-xs">Souhlas s personalizovanou reklamou (remarketing).</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('ad_personalization')}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.ad_personalization === 'granted' ? 'bg-primary' : 'bg-white/20'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.ad_personalization === 'granted' ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-3 rounded-xl border border-white/20 text-white text-sm font-bold hover:bg-white/5 transition-colors"
                    >
                      Odmítnout vše
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      className="px-6 py-3 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors"
                    >
                      Uložit nastavení
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    >
                      Přijmout vše
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button to reopen settings */}
      <AnimatePresence>
        {!isVisible && hasConsented && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={openSettings}
            className="fixed bottom-4 left-4 z-50 p-3 bg-background/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg text-white/70 hover:text-white hover:bg-white/10 transition-all group"
            aria-label="Nastavení cookies"
          >
            <Cookie className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
