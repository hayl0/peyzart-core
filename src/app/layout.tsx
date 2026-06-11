/**
 * Peyzart Root Layout - Design Engineering Edition
 * Orchestrates the intersection of aesthetic brilliance and technical performance.
 */

import type { Metadata, Viewport } from 'next';
import { Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CustomCursor from '@/components/layout/CustomCursor';

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
      <body className="bg-[#0a0e14] text-[#f8fafc] antialiased selection:bg-greenish-lime selection:text-black overflow-x-hidden">
        <SmoothScroll>
          <CustomCursor />
          
          {/* Global Texture Overlays */}
          <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay noise-bg" />
          
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Kinetic Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-greenish-bright/5 rounded-full blur-[180px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-greenish-lime/5 rounded-full blur-[150px]" />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
