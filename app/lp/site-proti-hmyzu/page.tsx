import { Metadata } from 'next';
import { LpForm } from '@/components/lp-form';
import { CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { headers } from 'next/headers';
import db from '@/lib/db';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sítě proti hmyzu do oken a dveří',
  description: 'Zbavte se otravného hmyzu jednou provždy. Kvalitní sítě do oken a dveří na míru. Využijte naší akce na zaměření zdarma.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SiteProtiHmyzuLpPage() {
  // Track visit
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    await db.query(`
      INSERT INTO visits (source, ip, user_agent)
      VALUES ($1, $2, $3)
    `, ['lp_site_proti_hmyzu', ip, userAgent]);
  } catch (error) {
    console.error('Failed to log LP visit:', error);
  }

  return (
    <main className="min-h-screen bg-background relative flex flex-col pt-[80px]">
      <Navbar />
      
      <div className="flex-1 relative flex items-center justify-center py-20 pb-32">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-8 items-center">
            
            {/* Left column: Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AKCE PRO TENTO MĚSÍC: SLEVA AŽ 21%
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight">
                Zbavte se <span className="text-primary italic font-light">komárů a much</span> navždy
              </h1>
              
              <p className="text-xl text-white/70 font-light leading-relaxed">
                Pořiďte si elegantní a vysoce funkční sítě do oken i dveří na míru. Větrejte naplno, my se postaráme o to, aby zůstal hmyz venku.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <strong className="text-white">Zaměření a návrh zdarma</strong>
                    <p className="text-white/60 text-sm">Přijedeme, změříme a navrhneme nejlepší volbu.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                     <strong className="text-white">Produkty přesně na míru</strong>
                     <p className="text-white/60 text-sm">Zaručujeme tak stoprocentní těsnost po celém obvodu.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                   <div>
                     <strong className="text-white">Česká výroba</strong>
                     <p className="text-white/60 text-sm">Díky lokální výrobě nabízíme obrovskou variabilitu barev i typů sítí.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Form */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50" />
              <div className="relative">
                <LpForm 
                  formType="site"
                  leadMagnetName="Sítě do oken - Akce Sleva" 
                  buttonText="Zarezervuj si nezávaznou konzultaci" 
                  formTitle="Ozvěte se dokud platí sleva"
                  thankYouHeadline="Skvělé!"
                  thankYouText={
                    <>
                      Vaše odeslání bylo úspěšné.<br/><br/>
                      Nejpozději do 24 hodin Vám zavoláme a podíváme se na to společně.
                    </>
                  }
                  nextStepText="Prozkoumat ostatní produkty"
                  nextStepUrl="/"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
