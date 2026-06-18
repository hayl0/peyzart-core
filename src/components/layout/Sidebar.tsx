'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-[var(--theme-card)] border-r border-[var(--theme-border)] z-50 p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="logo-gradient text-[34px] mb-10 mt-2"
      >
        Peyzart
      </motion.div>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }, i) => {
          const isActive = pathname === href;
          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.25, ease: 'easeOut' }}
            >
              <Link
                href={href}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-bright-green'
                    : 'text-[var(--theme-text-secondary)] hover:bg-[var(--theme-bg)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-bright-green/10 rounded-[14px]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={20} className="relative z-10" />
                <span className="relative z-10">{label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        onClick={toggleTheme}
        className="flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm font-semibold text-[var(--theme-text-secondary)] hover:bg-[var(--theme-bg)] transition-all mb-2"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        {theme === 'light' ? 'Karanlık Mod' : 'Aydınlık Mod'}
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="flex items-center gap-3 px-4 py-3 border-t border-[var(--theme-border)] pt-4"
      >
        <div className="w-10 h-10 rounded-full bg-bright-green/20 flex items-center justify-center text-bright-green font-bold">
          <User size={18} />
        </div>
        <div className="text-sm">
          <div className="font-semibold text-[var(--theme-text)]">Kullanıcı</div>
          <div className="text-xs text-[var(--theme-text-muted)]">Müşteri</div>
        </div>
      </motion.div>
    </motion.aside>
  );
}
