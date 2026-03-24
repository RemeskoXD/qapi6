import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Obchodní podmínky | QAPI',
  description: 'Všeobecné obchodní podmínky společnosti QAPI pro prodej a montáž garážových vrat, stínicí techniky a servisu oken.',
};

export default function ObchodniPodminky() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">
            Obchodní podmínky
          </h1>
          
          <div className="prose prose-invert max-w-none text-white/80 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Základní ustanovení</h2>
              <p>
                Tyto všeobecné obchodní podmínky (dále jen „obchodní podmínky“) upravují práva a povinnosti smluvních stran vyplývající ze smluv o dílo, kupních smluv a smluv o poskytování služeb uzavřených mezi společností <strong>Ropemi s.r.o.</strong>, IČO: 22333941, se sídlem Varšavská 715/36, Vinohrady, 120 00 Praha 2, zapsanou u Městského soudu v Praze, spisová značka: C 414732 (dále jen „zhotovitel“ nebo „prodávající“) a objednatelem (dále jen „objednatel“ nebo „kupující“).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Předmět smlouvy</h2>
              <p>
                Předmětem smlouvy je dodávka, montáž a servis garážových vrat, stínicí techniky, oken a souvisejících produktů a služeb specifikovaných v nabídce nebo objednávce.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Objednávka a uzavření smlouvy</h2>
              <p>
                Návrhem na uzavření smlouvy je umístění nabízených služeb zhotovitelem na stránky. Smlouva vzniká potvrzením objednávky zhotovitelem. Zhotovitel si vyhrazuje právo na zrušení objednávky nebo její části před uzavřením smlouvy v případě, že se služba již neposkytuje nebo se výrazným způsobem změnila cena.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Cena a platební podmínky</h2>
              <p>
                Cena za dílo nebo zboží je sjednána na základě cenové nabídky odsouhlasené objednatelem. Zhotovitel je oprávněn požadovat zálohu před zahájením prací nebo dodáním zboží. Zbývající část ceny je splatná na základě faktury vystavené po předání díla nebo zboží.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Dodací podmínky a realizace díla</h2>
              <p>
                Termín dodání a realizace je sjednán individuálně a závisí na dostupnosti materiálů a kapacitách zhotovitele. Objednatel je povinen zajistit stavební připravenost a přístup na místo realizace v dohodnutém termínu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Práva z vadného plnění a záruka</h2>
              <p>
                Zhotovitel odpovídá za to, že dílo nebo zboží nemá při převzetí vady. Na dodané zboží a montážní práce se vztahuje záruka, jejíž délka je specifikována v předávacím protokolu nebo záručním listě. Práva z vadného plnění se řídí příslušnými ustanoveními občanského zákoníku.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Odstoupení od smlouvy</h2>
              <p>
                Objednatel, který je spotřebitelem, má právo odstoupit od smlouvy uzavřené distančním způsobem nebo mimo obchodní prostory ve lhůtě 14 dnů. Toto právo se však nevztahuje na smlouvy o dodávce zboží, které bylo upraveno podle přání spotřebitele nebo pro jeho osobu (např. vrata nebo stínicí technika na míru).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Závěrečná ustanovení</h2>
              <p>
                Tyto obchodní podmínky jsou platné a účinné od 1. 1. 2024. Zhotovitel si vyhrazuje právo obchodní podmínky měnit. Právní vztahy výslovně neupravené těmito podmínkami se řídí příslušnými ustanoveními zákona č. 89/2012 Sb., občanský zákoník, v platném znění.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
