import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů (GDPR) | QAPI',
  description: 'Zásady ochrany osobních údajů společnosti QAPI. Zjistěte, jak zpracováváme a chráníme vaše data v souladu s GDPR.',
};

export default function OchranaOsobnichUdaju() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">
            Zásady ochrany osobních údajů (GDPR)
          </h1>
          
          <div className="prose prose-invert max-w-none text-white/80 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Správce osobních údajů</h2>
              <p>
                Správcem vašich osobních údajů je společnost <strong>Ropemi s.r.o.</strong>, IČO: 22333941, se sídlem Varšavská 715/36, Vinohrady, 120 00 Praha 2, zapsaná u Městského soudu v Praze, spisová značka: C 414732 (dále jen „správce“).
              </p>
              <p>
                Kontaktní údaje správce:<br />
                E-mail: info@qapi.cz<br />
                Telefon: +420 702 835 964
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Jaké údaje zpracováváme a proč</h2>
              <p>
                Zpracováváme pouze osobní údaje, které nám sami poskytnete prostřednictvím kontaktních formulářů, při objednávce služeb nebo při komunikaci s námi. Nejčastěji jde o:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Jméno a příjmení</strong> (pro identifikaci a komunikaci)</li>
                <li><strong>E-mailová adresa a telefonní číslo</strong> (pro zaslání nabídky, potvrzení objednávky a domluvu termínu)</li>
                <li><strong>Adresa / Místo realizace</strong> (pro posouzení zakázky a samotný výkon služeb)</li>
              </ul>
              <p className="mt-4">
                <strong>Účel zpracování:</strong><br />
                - Vyřízení vaší poptávky nebo objednávky (plnění smlouvy).<br />
                - Plnění našich zákonných povinností (např. účetnictví a daně).<br />
                - Oprávněný zájem (např. ochrana našich práv, přímý marketing pro stávající zákazníky).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Doba uchování údajů</h2>
              <p>
                Vaše osobní údaje uchováváme po dobu nezbytně nutnou k výkonu práv a povinností vyplývajících ze smluvního vztahu, pro účely archivace dle příslušných zákonů (např. o účetnictví a daních) a pro ochranu našich oprávněných zájmů. Tyto údaje uchováváme po dobu <strong>až 10 let</strong> od ukončení smluvního vztahu nebo od poslední komunikace v případě nerealizovaných poptávek.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Kdo má k údajům přístup</h2>
              <p>
                K vašim osobním údajům mají přístup naši zaměstnanci a spolupracovníci, kteří jsou vázáni mlčenlivostí. Dále můžeme údaje předat zpracovatelům, kteří nám poskytují služby (např. poskytovatelé webhostingu, účetní systémy, marketingové nástroje jako Seznam Sklik). Všichni zpracovatelé splňují požadavky GDPR.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Soubory cookies a analytické nástroje</h2>
              <p>
                Naše webové stránky používají soubory cookies pro zajištění správného fungování webu, analýzu návštěvnosti a personalizaci reklam. K těmto účelům využíváme následující nástroje třetích stran, které mohou sbírat anonymizovaná data o vašem chování na webu:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Google Analytics a Google Ads</strong> (poskytovatel Google Ireland Limited) pro analýzu návštěvnosti, měření konverzí a cílení reklamy (retargeting).</li>
                <li><strong>Microsoft Clarity</strong> (poskytovatel Microsoft Corporation) pro analýzu uživatelského chování (např. teplotní mapy, nahrávání interakcí), abychom mohli náš web neustále vylepšovat.</li>
                <li><strong>Sklik</strong> (poskytovatel Seznam.cz, a.s.) pro měření konverzí a retargeting v reklamní síti Seznam.</li>
              </ul>
              <p className="mt-4">
                Zpracování těchto údajů probíhá na základě vašeho souhlasu (prostřednictvím cookie lišty), který můžete kdykoliv odvolat nebo změnit nastavení ve svém prohlížeči.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Vaše práva</h2>
              <p>
                Podle nařízení GDPR máte právo:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Požadovat od nás informaci, jaké vaše osobní údaje zpracováváme.</li>
                <li>Vyžádat si přístup k těmto údajům a nechat je aktualizovat nebo opravit.</li>
                <li>Požadovat výmaz těchto osobních údajů (právo být zapomenut).</li>
                <li>Omezit zpracování vašich údajů.</li>
                <li>Vznést námitku proti zpracování na základě oprávněného zájmu.</li>
                <li>Podat stížnost u Úřadu pro ochranu osobních údajů (ÚOOÚ).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Závěrečná ustanovení</h2>
              <p>
                Odesláním objednávky nebo poptávkového formuláře z internetového formuláře potvrzujete, že jste seznámeni s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte. Tyto podmínky nabývají účinnosti dnem 1. 1. 2024.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
