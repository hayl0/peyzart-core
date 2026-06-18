'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Compass, Heart, Package, User } from 'lucide-react';

const TABS = [
  { href: '/home', label: 'Ana Sayfa', icon: Home },
  { href: '/kesfet', label: 'Keşfet', icon: Compass },
  { href: '/favorites', label: 'Favoriler', icon: Heart },
  { href: '/orders', label: 'Siparişler', icon: Package },
  { href: '/profile', label: 'Profil', icon: User },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--theme-card)] border-t border-[var(--theme-border)] lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around h-16">
        {TABS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-0.5 min-w-0 px-2"
            >
              <Icon
                size={22}
                className={isActive ? 'text-bright-green' : 'text-[var(--theme-text-muted)]'}
              />
              <span
                className={`text-[10px] font-semibold ${
                  isActive ? 'text-bright-green' : 'text-[var(--theme-text-muted)]'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
