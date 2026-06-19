/**
 * Peyzart Root Layout - Design Engineering Edition
 * Orchestrates the intersection of aesthetic brilliance and technical performance.
 */

import type { Metadata, Viewport } from 'next';
import { Sora, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import { CapacitorProvider } from '@/lib/capacitor/CapacitorProvider';

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
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Peyzart | Design Your Outdoor Vision',
  description: 'AI-driven premium landscape architecture platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrains.variable} scroll-smooth`}>
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/billabong" />
      </head>
      <body className="bg-[#0a0e14] text-[#f8fafc] antialiased selection:bg-greenish-lime selection:text-black overflow-x-hidden">
        <ThemeProvider>
          <CapacitorProvider>
          <AuthProvider>
            <main className="relative z-10 min-h-screen">
              {children}
            </main>
          </AuthProvider>
          </CapacitorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
