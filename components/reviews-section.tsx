'use client';

import { motion } from 'motion/react';
import { Star, StarHalf, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function ReviewsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 2xl:py-32 relative bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03),transparent_70%)]" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-8"
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
              Hodnocení zákazníků
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Co o nás říkají <span className="text-primary italic font-light">klienti</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl text-white/60 font-light max-w-2xl mx-auto"
          >
            Zakládáme si na skvělé zákaznické zkušenosti. Přečtěte si nezávislá hodnocení naší práce.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Google Review 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a href="https://www.google.com/search?num=10&hl=cs-CZ&sca_esv=3eb9bc99a534cb7d&cs=1&output=search&tbm=lcl&kgmid=/g/11xnxbbpwt&q=Qapi&shndl=30&source=sh/x/loc/uni/m1/1&kgs=79ba16d9f2bc28ca&utm_source=sh/x/loc/uni/m1/1#lkt=LocalPoiReviews&rlfi=hd:;si:7840798460343583537,l,CgRRYXBpkgENZG9vcl9zdXBwbGllcg;mv:[[51.0557185,18.859236100000004],[48.5518092,12.090589]]" target="_blank" rel="noopener noreferrer" className="block bg-muted/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-muted/30 hover:border-primary/30 transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image 
                      src="https://lh3.googleusercontent.com/a-/ALV-UjVKH68CJh1pOcqlxuheOG--3j3sNw9R4u8Q8VxLZGfPNisaXUk7=w90-h90-p-rp-mo-br100" 
                      alt="Vojtěch Štecher" 
                      fill 
                      sizes="48px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">Vojtěch Štecher</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
              </div>
              <p className="text-white/70 font-light italic flex-grow">
                &quot;Naprostá spokojenost. Přijeli na čas, okna vyčistili, přetěsnili, seřídili, uklidili a zametli po sobě a ještě mi dobře poradili. Plus velice slušné jednání. Rád doporučuji&quot;
              </p>
            </a>
          </motion.div>

          {/* Google Review 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="https://www.google.com/search?num=10&hl=cs-CZ&sca_esv=3eb9bc99a534cb7d&cs=1&output=search&tbm=lcl&kgmid=/g/11xnxbbpwt&q=Qapi&shndl=30&source=sh/x/loc/uni/m1/1&kgs=79ba16d9f2bc28ca&utm_source=sh/x/loc/uni/m1/1#lkt=LocalPoiReviews&rlfi=hd:;si:7840798460343583537,l,CgRRYXBpkgENZG9vcl9zdXBwbGllcg;mv:[[51.0557185,18.859236100000004],[48.5518092,12.090589]]" target="_blank" rel="noopener noreferrer" className="block bg-muted/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-muted/30 hover:border-primary/30 transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image 
                      src="https://lh3.googleusercontent.com/a-/ALV-UjWxaZfE3KP4teWxvLhX34P4kkrMmfNAKFrHFU1IhVyRO_2tIzGj=w90-h90-p-rp-mo-ba3-br100" 
                      alt="Petra Wiederová" 
                      fill 
                      sizes="48px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">Petra Wiederová</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
              </div>
              <p className="text-white/70 font-light italic flex-grow">
                &quot;S firmou jsem moc spokojená. Jeden den změřili a druhý den jsme měli těsnění na oknech. Férové jednání a můžu jen doporučit&quot;
              </p>
            </a>
          </motion.div>

          {/* Seznam Review 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a href="https://www.firmy.cz/detail/13869248-qapi-praha-vinohrady.html" target="_blank" rel="noopener noreferrer" className="block bg-muted/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-muted/30 hover:border-primary/30 transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image 
                      src="https://i.im.cz/ac/WidrUtJEb-1Fpvq7pzNb2zrcU1iuT7uyQyjWeQIFnte1NA/64%7D" 
                      alt="Jan Jícha" 
                      fill 
                      sizes="48px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">Jan Jícha</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-[#CC0000] fill-[#CC0000]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1.5">
                  <Image src="https://web2.itnahodinu.cz/OKNA/seznam.svg" alt="Seznam.cz" width={20} height={20} className="object-contain" />
                </div>
              </div>
              <p className="text-white/70 font-light italic flex-grow">
                &quot;Skvělá domluva, rychlé jednání a profesionální přístup. Okna po servisu fungují jako nová. Určitě doporučuji všem, kdo hledají spolehlivou firmu.&quot;
              </p>
            </a>
          </motion.div>

          {/* Seznam Review 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="https://www.firmy.cz/detail/13869248-qapi-praha-vinohrady.html" target="_blank" rel="noopener noreferrer" className="block bg-muted/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-muted/30 hover:border-primary/30 transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image 
                      src="https://i.im.cz/ac/3PvM1jo9IMpCqPr8pjsJimyoYVjuQ7OmQyjWeQULns03/64%7D" 
                      alt="Monika Pavlišová" 
                      fill 
                      sizes="48px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">Monika Pavlišová</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-[#CC0000] fill-[#CC0000]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1.5">
                  <Image src="https://web2.itnahodinu.cz/OKNA/seznam.svg" alt="Seznam.cz" width={20} height={20} className="object-contain" />
                </div>
              </div>
              <p className="text-white/70 font-light italic flex-grow">
                &quot;Moc děkuji za rychlou opravu. Pánové byli velmi ochotní a vše mi vysvětlili. Jsem nadmíru spokojená a firmu QAPI mohu jen chválit.&quot;
              </p>
            </a>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="https://www.google.com/search?num=10&hl=cs-CZ&sca_esv=3eb9bc99a534cb7d&cs=1&output=search&tbm=lcl&kgmid=/g/11xnxbbpwt&q=Qapi&shndl=30&source=sh/x/loc/uni/m1/1&kgs=79ba16d9f2bc28ca&utm_source=sh/x/loc/uni/m1/1#lkt=LocalPoiReviews&rlfi=hd:;si:7840798460343583537,l,CgRRYXBpkgENZG9vcl9zdXBwbGllcg;mv:[[51.0557185,18.859236100000004],[48.5518092,12.090589]]" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-medium uppercase tracking-wider text-sm"
          >
            Hodnocení na Google <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="hidden sm:block text-white/20">|</span>
          <Link 
            href="https://www.firmy.cz/detail/13869248-qapi-praha-vinohrady.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-medium uppercase tracking-wider text-sm"
          >
            Hodnocení na Seznam.cz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
