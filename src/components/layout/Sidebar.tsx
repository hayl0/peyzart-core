'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Compass, Heart, Package, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme/ThemeContext';

const NAV_ITEMS = [
  { href: '/home', label: 'Ana Sayfa', icon: Home },
  { href: '/kesfet', label: 'Keşfet', icon: Compass },
  { href: '/favorites', label: 'Favoriler', icon: Heart },
  { href: '/orders', label: 'Siparişler', icon: Package },
  { href: '/profile', label: 'Profil', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-[var(--theme-card)] border-r border-[var(--theme-border)] z-50 p-6">
      <div className="logo-gradient text-[28px] mb-10 mt-2">Peyzart</div>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-bright-green/10 text-bright-green'
                  : 'text-[var(--theme-text-secondary)] hover:bg-[var(--theme-bg)]'
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={toggleTheme}
        className="flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-semibold text-[var(--theme-text-secondary)] hover:bg-[var(--theme-bg)] transition-all mb-2"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        {theme === 'light' ? 'Karanlık Mod' : 'Aydınlık Mod'}
      </button>

      <div className="flex items-center gap-3 px-4 py-3 border-t border-[var(--theme-border)] pt-4">
        <div className="w-10 h-10 rounded-full bg-bright-green/20 flex items-center justify-center text-bright-green font-bold">
          <User size={18} />
        </div>
        <div className="text-sm">
          <div className="font-semibold text-[var(--theme-text)]">Kullanıcı</div>
          <div className="text-xs text-[var(--theme-text-muted)]">Müşteri</div>
        </div>
      </div>
    </aside>
  );
}
