import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
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
  title: 'QAPI | Luxusní Garážová Vrata, Stínící Technika a Servis Oken',
  description: 'Specializujeme se na dodávku a montáž garážových vrat, stínící techniky a profesionální servis oken. Získejte kalkulaci do 2 minut. Působíme po celé ČR.',
  keywords: 'garážová vrata, servis oken, stínící technika, rolovací vrata, sekční vrata, markýzy, venkovní rolety, QAPI',
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
  openGraph: {
    title: 'QAPI | Nekompromisní kvalita pro váš domov',
    description: 'Špičková garážová vrata, stínící technika a profesionální servis oken s důrazem na detail a kvalitu. Působíme po celé ČR.',
    url: 'https://qapi.cz',
    siteName: 'QAPI',
    images: [
      {
        url: 'https://qapi.cz/wp-content/uploads/2025/10/Logo-Bile.png',
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
    title: 'QAPI | Luxusní Garážová Vrata a Servis',
    description: 'Špičková garážová vrata, stínící technika a profesionální servis oken.',
    images: ['https://qapi.cz/wp-content/uploads/2025/10/Logo-Bile.png'],
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
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
