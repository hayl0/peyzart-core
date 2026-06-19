'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, LogOut, CheckCircle, XCircle, X, Settings } from 'lucide-react';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth/AuthContext';

const TABS = ['Bilgiler', 'Adresler', 'Güvenlik'];

interface Address {
  id: number;
  type: string;
  address: string;
  default: boolean;
}

export default function ProfilePage() {
  const { user: firebaseUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Bilgiler');
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (firebaseUser) {
      setName(firebaseUser.displayName || '')
      setEmail(firebaseUser.email || '')
      setPhone(firebaseUser.phoneNumber || '')
    }
    api.get<{ user: { name: string; email: string; phone: string | null; address: string | null } }>('/api/profile')
      .then(r => {
        setName(r.user.name || '')
        setEmail(r.user.email)
        setPhone(r.user.phone || '')
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [firebaseUser])

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch('/api/profile', { name, phone });
      showToast('Profil güncellendi', 'success');
      setEditing(false);
    } catch {
      showToast('Kaydedilemedi', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      showToast('Şifreler eşleşmiyor', 'error');
      return;
    }
    setChangingPassword(true);
    try {
      await api.post('/api/landscaper/password', { oldPassword, newPassword });
      showToast('Şifre güncellendi', 'success');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch {
      showToast('Şifre değiştirilemedi', 'error');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-bright-green/30 border-t-bright-green rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-2xl mx-auto p-4 md:p-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--theme-text)]">Profilim</h1>
          <Link href="/settings" className="p-2 rounded-xl text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-card)] transition-all">
            <Settings size={20} />
          </Link>
        </div>

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
              {!editing ? (
                <button onClick={() => setEditing(true)}
                  className="text-xs font-semibold px-4 py-2 rounded-full border text-[var(--theme-text-secondary)] border-[var(--theme-border)] transition-all">
                  Düzenle
                </button>
              ) : (
                <button onClick={handleSave} disabled={saving}
                  className="text-xs font-semibold px-4 py-2 rounded-full border bg-bright-green text-white border-bright-green transition-all disabled:opacity-50">
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              )}
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
            {addresses.length === 0 ? (
              <div className="nature-card p-6 text-center">
                <p className="text-sm text-[var(--theme-text-secondary)] mb-3">Kayıtlı adres bulunamadı</p>
                <button className="w-full py-3 border border-dashed border-[var(--theme-border)] rounded-[16px] text-sm font-semibold text-[var(--theme-text-secondary)] hover:border-bright-green/40 hover:text-bright-green transition-all">
                  + Yeni Adres Ekle
                </button>
              </div>
            ) : (
              addresses.map(addr => (
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
              ))
            )}
          </div>
        )}

        {/* Güvenlik */}
        {activeTab === 'Güvenlik' && (
          <div className="space-y-4">
            <div className="nature-card p-5">
              <h3 className="font-bold text-sm text-[var(--theme-text)] mb-4">Şifre Değiştir</h3>
              <div className="space-y-3">
                <input type="password" placeholder="Mevcut şifre" value={oldPassword} onChange={e => setOldPassword(e.target.value)}
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                <input type="password" placeholder="Yeni şifre" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                <input type="password" placeholder="Şifre tekrar" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                <button onClick={handlePasswordChange} disabled={changingPassword}
                  className="btn-primary w-full text-xs disabled:opacity-50">
                  {changingPassword ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                </button>
              </div>
            </div>
            <div className="nature-card p-5 border-red-200">
              <button onClick={logout} className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors w-full">
                <LogOut size={16} />
                Oturumu Kapat
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-[14px] border backdrop-blur-md transition-all duration-300 ${
          toast.type === 'success'
            ? 'bg-bright-green/10 border-bright-green/20 text-bright-green'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
          <span className="text-xs font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="opacity-50 hover:opacity-100"><X size={14} /></button>
        </div>
      )}
    </div>
  );
}
