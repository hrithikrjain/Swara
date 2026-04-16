import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://swara.pages.dev'),
  title: {
    default: 'Swara — Premium Women\'s Ethnic Wear',
    template: '%s | Swara',
  },
  description:
    'Swara is a premium women\'s ethnic wear brand offering exquisite Bridal Lehengas, Ethnic Kurtis, Indo-Western outfits, Lehenga Cholis, and Navratri collections. Crafted with love, worn with pride.',
  keywords: [
    'women ethnic wear',
    'bridal lehenga',
    'ethnic kurti',
    'indo western',
    'navratri chaniya choli',
    'lehenga choli',
    'swara fashion',
    'luxury ethnic wear',
    'Indian women fashion',
  ],
  authors: [{ name: 'Swara Ethnic Wear' }],
  creator: 'Swara',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://swara.pages.dev',
    siteName: 'Swara',
    title: 'Swara — Premium Women\'s Ethnic Wear',
    description: 'Exquisite ethnic wear crafted for the modern Indian woman.',
    images: [{ url: '/images/Logo.jpg', width: 800, height: 600, alt: 'Swara Ethnic Wear' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swara — Premium Women\'s Ethnic Wear',
    description: 'Exquisite ethnic wear crafted for the modern Indian woman.',
    images: ['/images/Logo.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/Logo.jpg" type="image/jpeg" />
      </head>
      <body className="bg-cream text-brand-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
