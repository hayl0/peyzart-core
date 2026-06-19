'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, ClipboardList, Briefcase, DollarSign,
  Calendar, Images, Star, Settings, Bell, User
} from 'lucide-react';

const NAV = [
  { href: '/landscaper/dashboard', label: 'Kontrol Paneli', icon: LayoutDashboard },
  { href: '/landscaper/orders', label: 'Siparişler', icon: ClipboardList },
  { href: '/landscaper/services', label: 'Hizmetler', icon: Briefcase },
  { href: '/landscaper/earnings', label: 'Kazançlar', icon: DollarSign },
  { href: '/landscaper/calendar', label: 'Takvim', icon: Calendar },
  { href: '/landscaper/portfolio', label: 'Portföy', icon: Images },
  { href: '/landscaper/profile', label: 'Profilim', icon: User },
  { href: '/landscaper/reviews', label: 'Yorumlar', icon: Star },
  { href: '/landscaper/settings', label: 'Ayarlar', icon: Settings },
];

const MOBILE_NAV = [
  NAV[0], NAV[1], NAV[2], NAV[3], NAV[7],
];

export default function LandscaperLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0a2e1a]">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0a2e1a]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 md:px-6 h-14">
          <div className="flex items-center gap-3">
            <Link href="/landscaper/dashboard" className="logo-gradient text-[28px] md:text-[32px]">Peyzart</Link>
            <span className="hidden md:block text-[10px] font-semibold tracking-[0.5px] text-white/25 uppercase">Peyzajcı Paneli</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <Bell size={15} className="text-white/50" />
              <span className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] bg-bright-green rounded-full shadow-[0_0_6px_rgba(76,175,80,0.5)]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bright-green to-lime flex items-center justify-center text-[11px] font-bold text-dark-forest">
              H
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Mini Sidebar (desktop) */}
        <aside className="hidden md:flex flex-col items-center gap-1 w-14 pt-4 border-r border-white/5 shrink-0 min-h-[calc(100vh-3.5rem)]">
          {NAV.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href} title={item.label}
                className={`group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-bright-green/15 text-bright-green'
                    : 'text-white/30 hover:text-white hover:bg-white/5'
                }`}>
                <item.icon size={16} />
                <span className="absolute left-full ml-2 px-2 py-1 bg-[#0D2E1A] border border-white/10 rounded-lg text-[10px] font-semibold text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-3.5rem)] px-4 md:px-6 py-6 md:py-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0a2e1a]/95 backdrop-blur-md border-t border-white/5 pb-safe bottom-0">
        <div className="flex">
          {MOBILE_NAV.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href}
                className="flex-1 flex flex-col items-center py-2 text-[10px] font-semibold transition-colors gap-0.5 relative">
                {isActive && <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-bright-green rounded-full" />}
                <item.icon size={18} className={isActive ? 'text-bright-green' : 'text-white/40'} />
                <span className={isActive ? 'text-bright-green' : 'text-white/40'}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
