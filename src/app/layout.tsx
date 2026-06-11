/**
 * Peyzart Root Layout - Performance Optimized
 * Implements high-end font loading, SEO orchestration, and global design context.
 */

import type { Metadata, Viewport } from 'next';
import { Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// 1. Font Optimization - Loading local variable fonts for sub-100ms FCP
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0e14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover', // Critical for native mobile feel
};

export const metadata: Metadata = {
  metadataBase: new URL('https://peyzart.com'),
  title: {
    default: 'Peyzart | Professional Landscape Architecture & AI Insights',
    template: '%s | Peyzart'
  },
  description: 'AI-driven landscape design platform connecting elite architects with ambitious homeowners.',
  keywords: ['landscape architecture', 'AI garden design', 'premium outdoor living', 'Peyzart'],
  authors: [{ name: 'Peyzart Engineering' }],
  creator: 'Peyzart',
  openGraph: {
    title: 'Peyzart | Professional Landscape Architecture',
    description: 'Transform your outdoor spaces with AI-driven insights and elite professionals.',
    url: 'https://peyzart.com',
    siteName: 'Peyzart',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Peyzart Premium UI' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peyzart | Professional Landscape Architecture',
    description: 'The future of garden design is here.',
    images: ['/og-image.png'],
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

/**
 * Structured Data for SEO - Proving technical authority
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'Peyzart',
  'url': 'https://peyzart.com',
  'description': 'AI-driven landscape design platform.',
  'applicationCategory': 'DesignApplication',
  'operatingSystem': 'iOS, Android, Windows, macOS',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrains.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-[#0a0e14] text-[#f8fafc] antialiased selection:bg-greenish-lime selection:text-black">
        {/* Global Design Overlays */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-greenish-bright/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-greenish-lime/5 rounded-full blur-[120px]" />
        </div>
        
        {children}
      </body>
    </html>
  );
}
