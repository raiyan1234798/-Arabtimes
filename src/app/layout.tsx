import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import LuxuryLoader from '@/components/LuxuryLoader';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import BackToTop from '@/components/BackToTop';
import { siteConfig } from '@/data/siteConfig';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: '%s | Arab Times',
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: 'Arab Times', url: siteConfig.url }],
  creator: 'Arab Times',
  publisher: 'Arab Times',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [{ url: 'https://m.media-amazon.com/images/X/bxt1/M/Cbxt1B3D$MtJcUc.jpg', width: 1200, height: 630, alt: 'Arab Times — Quality Branded Watches' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ['https://m.media-amazon.com/images/X/bxt1/M/Cbxt1B3D$MtJcUc.jpg'],
  },
  alternates: { canonical: '/' },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Arab Times',
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  description: siteConfig.seo.description,
  foundingDate: '2015',
  foundingLocation: 'Colachel, Tamil Nadu, India',
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '30/1F Main Road',
    addressLocality: 'Colachel',
    addressRegion: 'Tamil Nadu',
    postalCode: '629251',
    addressCountry: 'IN',
  },
  sameAs: [siteConfig.instagram, siteConfig.facebook],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.phone,
    contactType: 'customer service',
    availableLanguage: ['English', 'Tamil'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans" style={{ background: '#FAFAF8', color: '#1A1A1A' }}>
        <LuxuryLoader />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </body>
    </html>
  );
}
