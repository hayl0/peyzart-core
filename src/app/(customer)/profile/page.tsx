'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, LogOut } from 'lucide-react';

const TABS = ['Bilgiler', 'Adresler', 'Güvenlik'];

const SAVED_ADDRESSES = [
  { id: 1, type: 'Ev', address: 'Gümüşsuyu Mah. Çevre Yolu No:45, İstanbul', default: true },
  { id: 2, type: 'İş', address: 'Ataköy Mah. Londra Asfaltı No:12, İstanbul', default: false },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Bilgiler');
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Ahmet Yılmaz');
  const [email] = useState('ahmet@example.com');
  const [phone, setPhone] = useState('+90 555 123 4567');

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24">
        <h1 className="text-2xl font-bold text-[var(--theme-text)] mb-6">Profilim</h1>

        {/* Profile Card */}
        <div className="nature-card p-6 text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-bright-green/20 flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-bright-green" />
          </div>
          <h2 className="text-lg font-bold text-[var(--theme-text)]">{name}</h2>
          <p className="text-sm text-[var(--theme-text-secondary)]">{email}</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className="text-[var(--theme-text-muted)]">⭐ 4.6 <span className="text-[var(--theme-text-secondary)]">puan</span></span>
            <span className="text-[var(--theme-text-muted)]">📋 12 <span className="text-[var(--theme-text-secondary)]">sipariş</span></span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-[50px] text-xs font-semibold whitespace-nowrap transition-all border ${
                activeTab === tab
                  ? 'bg-bright-green text-white border-bright-green'
                  : 'bg-[var(--theme-card)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-bright-green/40'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Bilgiler */}
        {activeTab === 'Bilgiler' && (
          <div className="nature-card p-5 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm text-[var(--theme-text)]">Kişisel Bilgiler</h3>
              <button onClick={() => setEditing(!editing)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                  editing ? 'bg-bright-green text-white border-bright-green' : 'text-[var(--theme-text-secondary)] border-[var(--theme-border)]'
                }`}>
                {editing ? 'Kaydet' : 'Düzenle'}
              </button>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} disabled={!editing}
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] pl-9 pr-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all disabled:opacity-60" />
              </div>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
                <input type="email" value={email} disabled
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] pl-9 pr-4 py-3 text-sm text-[var(--theme-text)] outline-none opacity-60 cursor-not-allowed" />
              </div>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} disabled={!editing}
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] pl-9 pr-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all disabled:opacity-60" />
              </div>
            </div>
          </div>
        )}

        {/* Adresler */}
        {activeTab === 'Adresler' && (
          <div className="space-y-3">
            {SAVED_ADDRESSES.map(addr => (
              <div key={addr.id} className={`nature-card p-4 ${addr.default ? 'border-bright-green/40' : ''}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-[var(--theme-text)]">{addr.type}</span>
                  {addr.default && <span className="text-[10px] font-semibold text-bright-green bg-bright-green/10 px-2 py-0.5 rounded-full">Varsayılan</span>}
                </div>
                <p className="text-xs text-[var(--theme-text-secondary)] mb-2">{addr.address}</p>
                <div className="flex gap-3">
                  <button className="text-xs font-semibold text-bright-green hover:underline">Düzenle</button>
                  <button className="text-xs font-semibold text-red-500 hover:underline">Sil</button>
                </div>
              </div>
            ))}
            <button className="w-full py-3 border border-dashed border-[var(--theme-border)] rounded-[16px] text-sm font-semibold text-[var(--theme-text-secondary)] hover:border-bright-green/40 hover:text-bright-green transition-all">
              + Yeni Adres Ekle
            </button>
          </div>
        )}

        {/* Güvenlik */}
        {activeTab === 'Güvenlik' && (
          <div className="space-y-4">
            <div className="nature-card p-5">
              <h3 className="font-bold text-sm text-[var(--theme-text)] mb-4">Şifre Değiştir</h3>
              <div className="space-y-3">
                <input type="password" placeholder="Mevcut şifre"
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                <input type="password" placeholder="Yeni şifre"
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                <input type="password" placeholder="Şifre tekrar"
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                <button className="btn-primary w-full text-xs">Şifreyi Güncelle</button>
              </div>
            </div>
            <div className="nature-card p-5 border-red-200">
              <button className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors w-full">
                <LogOut size={16} />
                Oturumu Kapat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
