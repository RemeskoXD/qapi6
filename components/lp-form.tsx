'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LpFormProps {
  leadMagnetName: string;
  buttonText: string;
  formTitle?: string;
  thankYouHeadline?: string;
  thankYouText?: React.ReactNode;
  nextStepText?: string;
  nextStepUrl?: string;
  formType?: 'okna' | 'site' | 'stineni';
}

export function LpForm({ leadMagnetName, buttonText, formTitle, thankYouHeadline, thankYouText, nextStepText, nextStepUrl, formType = 'okna' }: LpFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonePrefix: '+420',
    phone: '',
    address: '',
    category: formType === 'stineni' ? 'Exteriérové stínění' : formType === 'site' ? 'Rolovací' : 'Plast',
    subCategory: formType === 'stineni' ? 'Žaluzie' : '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const changes: any = { [name]: value };
      
      // Auto-update subcategory default when category changes (Stínění)
      if (name === 'category' && formType === 'stineni') {
        if (value === 'Exteriérové stínění') changes.subCategory = 'Žaluzie';
        if (value === 'Interiérové stínění') changes.subCategory = 'Horizontální žaluzie';
      }
      
      return { ...prev, ...changes };
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError('Vyplňte prosím všechny údaje.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Neplatný formát e-mailu. Zadejte prosím platnou e-mailovou adresu.');
      return;
    }

    // Validate phone: clean all non-digits and check for exactly 9 digits
    const rawPhoneDigits = formData.phone.replace(/\D/g, '');
    if (rawPhoneDigits.length !== 9) {
      setError('Telefonní číslo musí obsahovat přesně 9 číslic (např. 123 456 789).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let notesText = `Lead z reklamy: ${leadMagnetName}\n`;
      let finalTypeForApi = leadMagnetName;

      if (formType === 'stineni') {
        notesText += `Kategorie: ${formData.category}\nTyp: ${formData.subCategory}`;
        finalTypeForApi = `${leadMagnetName} - ${formData.subCategory}`;
      } else if (formType === 'site') {
        notesText += `Typ sítě: ${formData.category}`;
        finalTypeForApi = `${leadMagnetName} - ${formData.category}`;
      } else {
        notesText += `Typ okna: ${formData.category}`;
        finalTypeForApi = `${leadMagnetName} - ${formData.category}`;
      }

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'Lead Magnet',
          type: finalTypeForApi,
          category: formData.category,
          ...formData,
          phone: `${formData.phonePrefix} ${rawPhoneDigits}`,
          notes: notesText
        }),
      });

      if (!response.ok) {
        throw new Error('Nepodařilo se odeslat.');
      }

      // Google Ads Conversion Hit
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-18019878591/QQoqCO6jxpccEL-NxpBD',
          'value': 1.0,
          'currency': 'CZK',
          'event_callback': function() {
            console.log('Google Ads conversion sent');
          },
          'event_timeout': 2000
        });
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Něco se pokazilo. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    const queryParams = new URLSearchParams({
      service: 'kontrola',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    }).toString();

    const defaultThankYouText = (
      <>
        Váš materiál je na cestě do e-mailu. <br/><br/>
        <span className="text-primary font-bold">Máme pro vás bonus:</span> Nechcete se s nastavováním a špiněním rukou trápit sami? 
        Získejte nyní <strong>bezplatnou kontrolu oken u vás doma</strong>.
      </>
    );

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background/80 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-primary/30 shadow-[0_20px_60px_-15px_rgba(212,175,55,0.3)] text-center"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-display font-bold text-white mb-4">{thankYouHeadline || 'Děkujeme!'}</h3>
        <p className="text-white/80 text-lg mb-8">
          {thankYouText || defaultThankYouText}
        </p>
        <a 
          href={nextStepUrl || `/?${queryParams}#rezervace`}
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-widest rounded-xl hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_15px_30px_rgba(212,175,55,0.3)]"
        >
          {nextStepText || 'Chci bezplatnou kontrolu oken'}
          <ArrowRight className="w-5 h-5" />
        </a>
      </motion.div>
    );
  }

  return (
    <div className="bg-background/80 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
      <h3 className="text-2xl font-display font-bold text-white mb-6">{formTitle || 'Kam vám to máme poslat?'}</h3>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {formType === 'okna' && (
          <div>
            <label className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2 block">Materiál okna</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleInputChange}
              className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all appearance-none cursor-pointer"
            >
              <option value="Plast">Plast</option>
              <option value="Hliník">Hliník</option>
              <option value="Dřevěná">Dřevěná</option>
              <option value="Jiné">Jiné</option>
            </select>
          </div>
        )}

        {formType === 'site' && (
          <div>
            <label className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2 block">Typ sítě</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleInputChange}
              className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all appearance-none cursor-pointer"
            >
              <option value="Rolovací">Rolovací</option>
              <option value="Okenní">Okenní</option>
              <option value="Plisé">Plisé</option>
              <option value="Posuvné">Posuvné</option>
              <option value="Dveřní">Dveřní</option>
            </select>
          </div>
        )}

        {formType === 'stineni' && (
          <>
            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2 block">Kategorie</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
                className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all appearance-none cursor-pointer mb-5"
              >
                <option value="Exteriérové stínění">Exteriérové stínění</option>
                <option value="Interiérové stínění">Interiérové stínění</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2 block">Typ stínění</label>
              <select 
                name="subCategory" 
                value={formData.subCategory} 
                onChange={handleInputChange}
                className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all appearance-none cursor-pointer"
              >
                {formData.category === 'Exteriérové stínění' ? (
                  <>
                    <option value="Žaluzie">Žaluzie</option>
                    <option value="Rolety">Rolety</option>
                    <option value="Screenové rolety">Screenové rolety</option>
                    <option value="Markýzy">Markýzy</option>
                    <option value="Jiné">Jiné</option>
                  </>
                ) : (
                  <>
                    <option value="Horizontální žaluzie">Horizontální žaluzie</option>
                    <option value="Rolety">Rolety</option>
                    <option value="Rolety den a noc">Rolety den a noc</option>
                    <option value="Vertikální žaluzie">Vertikální žaluzie</option>
                    <option value="Jiné">Jiné</option>
                  </>
                )}
              </select>
            </div>
          </>
        )}

        <div>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="Vaše jméno" 
            className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all placeholder:text-white/30"
            required 
          />
        </div>
        <div>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            placeholder="Váš e-mail" 
            className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all placeholder:text-white/30"
            required 
          />
        </div>
        <div className="flex bg-background/50 border border-white/5 rounded-xl shadow-inner overflow-hidden focus-within:border-primary/50 focus-within:bg-background/80 transition-all">
          <select 
            name="phonePrefix" 
            value={formData.phonePrefix} 
            onChange={handleInputChange}
            className="bg-transparent text-white px-3 py-4 border-r border-white/10 focus:outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors"
          >
            <option value="+420" className="bg-background text-white">+420</option>
            <option value="+421" className="bg-background text-white">+421</option>
          </select>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleInputChange} 
            placeholder="Vaše telefonní číslo (9 číslic)" 
            className="w-full bg-transparent px-4 py-4 text-white focus:outline-none placeholder:text-white/30"
            required 
          />
        </div>
        <div>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleInputChange} 
            placeholder="Adresa realizace (stačí Město)" 
            className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary/50 focus:bg-background/80 transition-all placeholder:text-white/30"
            required 
          />
        </div>

        <div className="flex items-start gap-3 mt-4">
          <div className="flex items-center h-5">
            <input
              id="lp-terms"
              type="checkbox"
              required
              className="w-4 h-4 border border-white/20 rounded bg-background/50 checked:bg-primary checked:border-primary focus:ring-primary focus:ring-offset-background transition-colors cursor-pointer"
            />
          </div>
          <label htmlFor="lp-terms" className="text-xs text-white/60 font-light cursor-pointer">
            Souhlasím se <a href="/ochrana-osobnich-udaju" target="_blank" className="text-primary hover:underline">zpracováním osobních údajů</a> a beru na vědomí <a href="/obchodni-podminky" target="_blank" className="text-primary hover:underline">obchodní podmínky</a>.
          </label>
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full px-8 py-5 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(212,175,55,0.3)] disabled:opacity-50 transform hover:-translate-y-1"
          >
            {isSubmitting ? 'Odesílám...' : buttonText}
            {!isSubmitting && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-white/40 text-xs mt-4">
          <ShieldCheck className="w-4 h-4" />
          <span>Vaše údaje jsou u nás v bezpečí.</span>
        </div>
      </form>
    </div>
  );
}
