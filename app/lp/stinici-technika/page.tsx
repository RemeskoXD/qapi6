import { Metadata } from 'next';
import { LpForm } from '@/components/lp-form';
import { CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { headers } from 'next/headers';
import db from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Stínicí technika na míru',
  description: 'Zlepšete komfort svého bydlení s moderní stínicí technikou. Žaluzie, rolety, markýzy na míru. Zaměření zdarma.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StiniciTechnikaLpPage() {
  // Track visit
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    await db.query(`
      INSERT INTO visits (source, ip, user_agent)
      VALUES ($1, $2, $3)
    `, ['lp_stinici_technika', ip, userAgent]);
  } catch (error) {
    console.error('Failed to log LP visit:', error);
  }

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative flex items-center justify-center py-24 md:py-32">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left column: Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Dopřejte si příjemný stín
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight">
                Moderní <span className="text-primary italic font-light">stínicí technika</span> na míru
              </h1>
              
              <p className="text-xl text-white/70 font-light leading-relaxed">
                Získejte dokonalou kontrolu nad světlem a teplotou ve vašem domově. Nabízíme špičkové venkovní i vnitřní stínění.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-white/80">Zaměření a odborný návrh řešení u vás doma <strong>zdarma</strong>.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-white/80">Česká výroba a prvotřídní kvalita materiálů.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-white/80">Záruka profesionální a čisté montáže.</p>
                </div>
              </div>
            </div>

            {/* Right column: Form */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50" />
              <div className="relative">
                <LpForm 
                  formType="stineni"
                  leadMagnetName="Stínicí technika - LP" 
                  buttonText="Objednat zaměření Zdarma" 
                  formTitle="Ozvěte se nám"
                  thankYouHeadline="Výborně!"
                  thankYouText={
                    <>
                      Vaše poptávka byla úspěšně odeslána.<br/><br/>
                      Brzy se vám ozveme, abychom domluvili termín bezplatného zaměření.
                    </>
                  }
                  nextStepText="Zpět na hlavní web"
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
