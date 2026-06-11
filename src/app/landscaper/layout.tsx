"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LandscaperLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/landscaper/dashboard', label: 'Kontrol Paneli' },
    { href: '/landscaper/services', label: 'Hizmetler' },
    { href: '/landscaper/orders', label: 'Siparişler' },
    { href: '/profile', label: 'Profil' },
  ];

  return (
    <div className="min-h-screen bg-nature-v3">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/landscaper/dashboard" className="flex items-center gap-3">
            <span className="text-2xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Peyzart Pro
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-semibold transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-10">{children}</main>
    </div>
  );
}
