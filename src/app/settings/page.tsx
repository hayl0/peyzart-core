'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Shield, Globe, Palette, ChevronRight, Moon, Sun } from 'lucide-react';

const SETTINGS_ITEMS = [
  { icon: Bell, label: 'Bildirimler', desc: 'E-posta ve push bildirim tercihleri' },
  { icon: Shield, label: 'Gizlilik', desc: 'Profil görünürlüğü ve veri ayarları' },
  { icon: Globe, label: 'Dil & Bölge', desc: 'Türkiye / Türkçe' },
  { icon: Palette, label: 'Tema', desc: 'Açık / Koyu / Sistem' },
];

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/profile" className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-colors">
            <ChevronRight size={20} className="rotate-180" />
          </Link>
          <h1 className="text-2xl font-bold text-[var(--theme-text)]">Ayarlar</h1>
        </div>

        <div className="space-y-1 mb-6">
          {SETTINGS_ITEMS.map(item => (
            <button key={item.label}
              className="w-full nature-card p-4 flex items-center gap-4 hover:shadow-md transition-all text-left">
              <div className="w-10 h-10 rounded-xl bg-bright-green/10 flex items-center justify-center flex-shrink-0">
                <item.icon size={18} className="text-bright-green" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--theme-text)]">{item.label}</p>
                <p className="text-xs text-[var(--theme-text-secondary)]">{item.desc}</p>
              </div>
              <ChevronRight size={16} className="text-[var(--theme-text-muted)] flex-shrink-0" />
            </button>
          ))}
        </div>

        <div className="nature-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-bright-green/10 flex items-center justify-center">
              {theme === 'light' ? <Sun size={18} className="text-bright-green" /> : <Moon size={18} className="text-bright-green" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--theme-text)]">Görünüm</p>
              <p className="text-xs text-[var(--theme-text-secondary)]">{theme === 'light' ? 'Açık' : theme === 'dark' ? 'Koyu' : 'Sistem'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {(['light', 'dark', 'system'] as const).map(t => (
              <button key={t} onClick={() => setTheme(t)}
                className={`flex-1 py-2.5 rounded-[12px] text-xs font-semibold transition-all border ${
                  theme === t
                    ? 'bg-bright-green text-white border-bright-green'
                    : 'bg-[var(--theme-card)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-bright-green/40'
                }`}>
                {t === 'light' ? 'Açık' : t === 'dark' ? 'Koyu' : 'Sistem'}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-[var(--theme-text-muted)] mt-8">Peyzart v1.0.0</p>
      </div>
    </div>
  );
}
