import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import { CookieBanner } from '@/components/cookie-banner';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'QAPI | Poctivá garážová vrata, stínicí technika a servis oken',
  description: 'Česká garážová vrata na míru, moderní stínicí technika a profesionální servis oken. Rychlá montáž, záruka až 10 let a doprava po celé ČR. Získejte kalkulaci zdarma.',
  keywords: 'garážová vrata, stínicí technika, servis oken, rolovací vrata, sekční vrata, markýzy, venkovní rolety, QAPI, vrata na míru, montáž vrat, česká vrata',
  authors: [{ name: 'QAPI s.r.o.' }],
  creator: 'QAPI s.r.o.',
  publisher: 'QAPI s.r.o.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://qapi.cz'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: 'https://web2.itnahodinu.cz/QAPI/favicon.ico', sizes: '32x32' },
      { url: 'https://web2.itnahodinu.cz/QAPI/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: 'https://web2.itnahodinu.cz/QAPI/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['https://web2.itnahodinu.cz/QAPI/favicon.ico'],
    apple: [
      { url: 'https://web2.itnahodinu.cz/QAPI/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: 'https://web2.itnahodinu.cz/QAPI/apple-touch-icon.png',
      },
    ],
  },
  manifest: 'https://web2.itnahodinu.cz/QAPI/site.webmanifest',
  appleWebApp: {
    title: 'QAPI',
  },
  openGraph: {
    title: 'QAPI | Poctivá garážová vrata, stínicí technika a servis oken',
    description: 'Česká garážová vrata na míru, moderní stínicí technika a profesionální servis oken. Rychlá montáž, záruka až 10 let a doprava po celé ČR.',
    url: 'https://qapi.cz',
    siteName: 'QAPI',
    images: [
      {
        url: 'https://web2.itnahodinu.cz/QAPI/vrata-qapi-uvod-original.webp',
        width: 1200,
        height: 630,
        alt: 'QAPI - Garážová vrata a servis oken',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QAPI | Poctivá garážová vrata a stínicí technika',
    description: 'Česká garážová vrata na míru, moderní stínicí technika a profesionální servis oken.',
    images: ['https://web2.itnahodinu.cz/QAPI/vrata-qapi-uvod-original.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="cs" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <Script id="cookie-consent-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Výchozí nastavení pro zbytek světa (povoleno)
            gtag('consent', 'default', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted',
              'personalization_storage': 'granted',
              'functionality_storage': 'granted',
              'wait_for_update': 500
            });

            // Výchozí nastavení pro EHP (Evropský hospodářský prostor), UK a Švýcarsko (zamítnuto)
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'personalization_storage': 'denied',
              'functionality_storage': 'denied',
              'region': ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'CH', 'GB', 'UK'],
              'wait_for_update': 500
            });

            gtag('set', 'ads_data_redaction', true);
          `}
        </Script>
        
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TRH5JB3G');
          `}
        </Script>

        {/* Google Analytics (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0S31HS6T6E" strategy="lazyOnload" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18019878591" strategy="lazyOnload" />
        <Script id="ga-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0S31HS6T6E');
            gtag('config', 'AW-18019878591');
          `}
        </Script>

        <Script id="clarity-script" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vukr8pkccp");
          `}
        </Script>

        {/* Seznam Retargeting & Conversion */}
        <Script id="seznam-rc" src="https://c.seznam.cz/js/rc.js" strategy="lazyOnload" />
        <Script id="seznam-tracking" strategy="lazyOnload">
          {`
            var seznamRetries = 0;
            function initSeznamTracking() {
              if (window.rc && window.sznIVA && window.sznIVA.IS) {
                window.sznIVA.IS.updateIdentities({ eid: null });

                var retargetingConf = {
                  rtgId: 1641331,
                  consent: null
                };
                window.rc.retargetingHit(retargetingConf);
              } else if (seznamRetries < 50) {
                seznamRetries++;
                setTimeout(initSeznamTracking, 100);
              }
            }
            initSeznamTracking();
          `}
        </Script>

        {/* Facebook Pixel Code */}
        <Script id="facebook-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '1206070651293931'); 
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {/* Facebook Pixel Code (noscript) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: 'none' }} alt=""
          src="https://www.facebook.com/tr?id=1206070651293931&ev=PageView&noscript=1"/>
        </noscript>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TRH5JB3G"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
