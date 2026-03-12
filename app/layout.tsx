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
      { url: 'https://web2.itnahodinu.cz/QAPI/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: 'https://web2.itnahodinu.cz/QAPI/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['https://web2.itnahodinu.cz/QAPI/favicon.ico'],
    apple: [
      { url: 'https://web2.itnahodinu.cz/QAPI/apple-touch-icon.png', sizes: '180x180' }
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
        url: 'https://qapi.cz/wp-content/uploads/2025/10/vrata-qapi-uvod-original.jpg',
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
    images: ['https://qapi.cz/wp-content/uploads/2025/10/vrata-qapi-uvod-original.jpg'],
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
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'personalization_storage': 'denied',
              'functionality_storage': 'denied',
              'wait_for_update': 500
            });
            gtag('set', 'ads_data_redaction', true);
          `}
        </Script>
        
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TRH5JB3G');
          `}
        </Script>

        {/* Google Analytics (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0S31HS6T6E" strategy="afterInteractive" />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0S31HS6T6E');
          `}
        </Script>

        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vukr8pkccp");
          `}
        </Script>
      </head>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
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
