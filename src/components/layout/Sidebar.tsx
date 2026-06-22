'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Compass, Heart, Package, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

const NAV_ITEMS = [
  { href: '/home', label: 'Ana Sayfa', icon: Home },
  { href: '/kesfet', label: 'Keşfet', icon: Compass },
  { href: '/favorites', label: 'Favoriler', icon: Heart },
  { href: '/orders', label: 'Siparişler', icon: Package },
  { href: '/profile', label: 'Profil', icon: User },
  { href: '/settings', label: 'Ayarlar', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, userRole, logout } = useAuth();

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Kullanıcı';
  const roleLabel = userRole === 'landscaper' ? 'Peyzajcı' : userRole === 'admin' ? 'Admin' : 'Müşteri';

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-nature-border z-50 p-6">
      <div className="logo-gradient text-[34px] mb-10 mt-2">Peyzart</div>

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
                  : 'text-dark-forest/60 hover:bg-nature-bg'
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 px-4 py-3 border-t border-nature-border pt-4">
        <div className="w-10 h-10 rounded-full bg-bright-green/20 flex items-center justify-center text-bright-green font-bold">
          <User size={18} />
        </div>
        <div className="text-sm flex-1 min-w-0">
          <div className="font-semibold text-dark-forest truncate">{displayName}</div>
          <div className="text-xs text-dark-forest/50">{roleLabel}</div>
        </div>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-semibold text-red-500 hover:bg-red-50 transition-all mt-1"
      >
        <LogOut size={20} />
        Çıkış Yap
      </button>
    </aside>
  );
}
