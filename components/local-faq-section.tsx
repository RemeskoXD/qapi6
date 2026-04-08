'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MapPin } from 'lucide-react';

interface LocalFaqSectionProps {
  cityName: string;
}

export function LocalFaqSection({ cityName }: LocalFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: `Provádíte servis a opravy oken přímo v lokalitě ${cityName}?`,
      answer: `Ano, v lokalitě ${cityName} a blízkém okolí poskytujeme rychlý a profesionální servis plastových, hliníkových i dřevěných oken. Naši technici k vám dorazí v co nejkratším čase.`
    },
    {
      question: `Jak dlouho trvá příjezd technika do města ${cityName}?`,
      answer: `Snažíme se reagovat co nejrychleji. Ve většině případů jsme schopni naplánovat výjezd do lokality ${cityName} do několika pracovních dnů od vaší poptávky. V případě havarijních stavů (např. nejdou zavřít okna) se snažíme o expresní řešení.`
    },
    {
      question: `Montujete v lokalitě ${cityName} také garážová vrata a stínění?`,
      answer: `Samozřejmě. Kromě servisu oken nabízíme pro zákazníky z lokality ${cityName} také kompletní dodávku a montáž sekčních i rolovacích garážových vrat, venkovních rolet a žaluzií na míru.`
    },
    {
      question: `Účtujete si dopravu do města ${cityName}?`,
      answer: `Dopravu se snažíme držet na minimu a často ji v rámci větších zakázek nebo speciálních akcí neúčtujeme vůbec. Přesnou kalkulaci včetně případné dopravy do lokality ${cityName} se dozvíte předem, žádné skryté poplatky u nás nenajdete.`
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generování Schema.org pro AI a vyhledávače (FAQPage)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-20 bg-muted/10 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
            <MapPin className="w-4 h-4" />
            Časté dotazy pro {cityName}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Servis oken <span className="text-primary italic font-light">{cityName}</span> a okolí
          </h2>
          <p className="text-lg text-white/60 font-light">
            Hledáte spolehlivou firmu pro opravu oken, montáž vrat nebo stínění v lokalitě {cityName}? Zde jsou odpovědi na nejčastější dotazy našich místních zákazníků.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-2xl transition-colors duration-300 ${
                openIndex === index 
                  ? 'bg-white/5 border-primary/30' 
                  : 'bg-transparent border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-white pr-8">{faq.question}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'bg-primary text-background rotate-180' : 'bg-white/5 text-white/60'
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-white/70 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
