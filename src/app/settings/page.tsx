'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell, ChevronRight, Moon, Sun, Monitor, LogOut, Trash2, Info } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'

type ThemeType = 'light' | 'dark' | 'system'

const THEMES: { value: ThemeType; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Açık', icon: Sun },
  { value: 'dark', label: 'Koyu', icon: Moon },
  { value: 'system', label: 'Sistem', icon: Monitor },
]

const NOTIFICATION_ITEMS = [
  { key: 'orderUpdates', label: 'Sipariş Güncellemeleri' },
  { key: 'promotions', label: 'Kampanya ve Fırsatlar' },
  { key: 'newServices', label: 'Yeni Hizmetler' },
]

function getStoredTheme(): ThemeType {
  if (typeof window === 'undefined') return 'system'
  return (localStorage.getItem('peyzart-theme') as ThemeType) || 'system'
}

function getStoredNotifs(): Record<string, boolean> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem('peyzart-notif-prefs') || '{}')
  } catch {
    return {}
  }
}

export default function SettingsPage() {
  const { logout } = useAuth()
  const [theme, setTheme] = useState<ThemeType>('system')
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    orderUpdates: true,
    promotions: false,
    newServices: true,
  })

  useEffect(() => {
    setTheme(getStoredTheme())
    setNotifications(prev => ({ ...prev, ...getStoredNotifs() }))
  }, [])

  const applyTheme = (t: ThemeType) => {
    setTheme(t)
    localStorage.setItem('peyzart-theme', t)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = t === 'dark' || (t === 'system' && prefersDark)
    document.documentElement.classList.toggle('dark', isDark)
  }

  const toggleNotif = (key: string) => {
    const updated = { ...notifications, [key]: !notifications[key] }
    setNotifications(updated)
    localStorage.setItem('peyzart-notif-prefs', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/profile" className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-colors">
            <ChevronRight size={20} className="rotate-180" />
          </Link>
          <h1 className="text-2xl font-bold text-[var(--theme-text)]">Ayarlar</h1>
        </div>

        {/* Theme */}
        <div className="nature-card p-5 mb-4">
          <h3 className="font-bold text-sm text-[var(--theme-text)] mb-4">Görünüm</h3>
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map(t => {
              const Icon = t.icon
              return (
                <button key={t.value} onClick={() => applyTheme(t.value)}
                  className={`flex flex-col items-center gap-2 py-3 rounded-[14px] text-xs font-semibold transition-all border ${
                    theme === t.value
                      ? 'bg-bright-green text-white border-bright-green'
                      : 'bg-[var(--theme-card)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-bright-green/40'
                  }`}>
                  <Icon size={18} />
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="nature-card p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-bright-green" />
            <h3 className="font-bold text-sm text-[var(--theme-text)]">Bildirim Tercihleri</h3>
          </div>
          <div className="space-y-3">
            {NOTIFICATION_ITEMS.map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-sm text-[var(--theme-text)]">{item.label}</span>
                <button type="button" onClick={() => toggleNotif(item.key)}
                  className={`relative w-10 h-5 rounded-full transition-all ${
                    notifications[item.key] ? 'bg-bright-green' : 'bg-[var(--theme-border)]'
                  }`}>
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                    notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="nature-card p-5 mb-4">
          <h3 className="font-bold text-sm text-[var(--theme-text)] mb-3">Hesap</h3>
          <div className="space-y-2">
            <button onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-semibold text-red-500 hover:bg-red-50 transition-all">
              <LogOut size={16} />
              Oturumu Kapat
            </button>
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-semibold text-[var(--theme-text-secondary)] hover:bg-[var(--theme-card)] transition-all">
              <Trash2 size={16} className="text-red-400" />
              Hesabı Sil
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="nature-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info size={16} className="text-[var(--theme-text-muted)]" />
            <h3 className="font-bold text-sm text-[var(--theme-text)]">Uygulama Hakkında</h3>
          </div>
          <div className="space-y-2 text-xs text-[var(--theme-text-secondary)]">
            <div className="flex justify-between"><span>Sürüm</span><span className="font-semibold">Peyzart v1.0.0</span></div>
            <div className="flex justify-between"><span>Gizlilik Politikası</span><span className="text-bright-green hover:underline cursor-pointer">Görüntüle</span></div>
            <div className="flex justify-between"><span>Kullanım Koşulları</span><span className="text-bright-green hover:underline cursor-pointer">Görüntüle</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
