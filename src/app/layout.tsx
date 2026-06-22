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
  themeColor: '#4CAF50',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: 'Peyzart | Profesyonel Hizmet Platformu',
    template: '%s | Peyzart',
  },
  description: 'Peyzart ile bahçe düzenlemeden ev tadilatına, temizlikten havuz bakımına kadar tüm hizmetler için güvenilir profesyoneller bulun.',
  openGraph: {
    title: 'Peyzart | Profesyonel Hizmet Platformu',
    description: 'Bahçe düzenlemeden ev tadilatına, temizlikten havuz bakımına kadar tüm hizmetler için güvenilir profesyoneller bulun.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Peyzart',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${sora.variable} ${jetbrains.variable} scroll-smooth`}>
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/billabong" />
      </head>
      <body className="bg-nature-bg text-dark-forest antialiased selection:bg-bright-green/20 selection:text-dark-forest overflow-x-hidden">
        <ThemeProvider>
          <CapacitorProvider>
          <AuthProvider>
            <main className="min-h-screen">
              {children}
            </main>
          </AuthProvider>
          </CapacitorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
