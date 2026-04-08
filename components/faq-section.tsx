'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const faqs = [
  {
    question: "Jak poznám, že potřebuji seřídit nebo přetěsnit plastová okna?",
    answer: "Pokud cítíte průvan, okna jdou ztuha zavírat, drhnou o rám, nebo se mlží mezi skly, je čas na odborný servis. Pravidelné seřízení prodlužuje životnost kování a šetří nemalé částky za vytápění."
  },
  {
    question: "Kolik stojí oprava a servis oken?",
    answer: "Cena servisu se odvíjí od rozsahu práce a stavu oken. Nabízíme bezplatnou a nezávaznou kontrolu oken přímo u vás doma. Náš technik okna prohlédne a na místě vám vypracuje přesnou cenovou kalkulaci."
  },
  {
    question: "Proč mi táhne oknem, i když je pevně zavřené?",
    answer: "Nejčastější příčinou je opotřebované, zpuchřelé těsnění nebo povolené kování, které nedoléhá správně k rámu. Náš technik kování odborně seřídí a v případě potřeby vymění těsnění za nové, čímž úniky tepla okamžitě zastaví."
  },
  {
    question: "Jak dlouho trvá oprava oken a přijedete i do mého města?",
    answer: "Běžný servis a seřízení oken zvládneme během několika hodin. Působíme po celé České republice, takže naši technici k vám přijedou, ať už jste z Prahy, Brna, Ostravy, nebo z menšího města či vesnice."
  },
  {
    question: "Opravujete i garážová vrata a stínicí techniku?",
    answer: "Ano, kromě servisu oken a dveří se specializujeme také na dodávku, montáž a servis garážových vrat (sekčních i rolovacích) a veškeré stínicí techniky, včetně venkovních rolet a žaluzií."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    <section className="py-24 bg-background relative overflow-hidden" id="faq">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6">
            <MessageCircleQuestion className="w-4 h-4" />
            Časté dotazy
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Na co se nás <span className="text-primary italic font-light">nejčastěji ptáte</span>
          </h2>
          <p className="text-lg text-white/60 font-light">
            Odpovědi na otázky, které zajímají naše zákazníky nejvíce. Nenašli jste, co jste hledali? Neváhejte nás kontaktovat.
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
