'use client';

import { useState, useEffect } from 'react';
import { Camera, Save, LogOut, Trash2, Lock, X } from 'lucide-react';
import { api } from '@/lib/api-client';
import ShimmerSkeleton from '../_components/ShimmerSkeleton';
import ErrorBanner from '../_components/ErrorBanner';
import Toast from '../_components/Toast';
import ConfirmModal from '../_components/ConfirmModal';

const NOTIFICATION_ITEMS = [
  { key: 'newOrders', label: 'Yeni Sipariş Bildirimleri' },
  { key: 'payments', label: 'Ödeme Bildirimleri' },
  { key: 'comments', label: 'Yorum Bildirimleri' },
  { key: 'marketing', label: 'Pazarlama E-postaları' },
] as const;

type NotificationKey = (typeof NOTIFICATION_ITEMS)[number]['key'];

const API_KEY_MAP: Record<NotificationKey, string> = {
  newOrders: 'newOrder',
  payments: 'payment',
  comments: 'review',
  marketing: 'marketing',
};

const KEY_FROM_API: Record<string, NotificationKey> = {
  newOrder: 'newOrders',
  payment: 'payments',
  review: 'comments',
  marketing: 'marketing',
};

const DEFAULT_NOTIFICATIONS: Record<NotificationKey, boolean> = {
  newOrders: true,
  payments: true,
  comments: true,
  marketing: false,
};

export default function LandscaperSettingsPage() {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [notifications, setNotifications] = useState<Record<NotificationKey, boolean>>(DEFAULT_NOTIFICATIONS);

  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const fetchData = async () => {
    try {
      setStatus('loading');
      const [profile, notifData] = await Promise.all([
        api.get<{ name: string; email: string; phone: string; address: string }>('/api/landscaper/profile'),
        api.get<{ newOrder: boolean; payment: boolean; review: boolean; marketing: boolean }>('/api/landscaper/notifications'),
      ]);
      setName(profile.name);
      setEmail(profile.email);
      setPhone(profile.phone);
      setAddress(profile.address);
      setNotifications({
        newOrders: notifData.newOrder,
        payments: notifData.payment,
        comments: notifData.review,
        marketing: notifData.marketing,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      await api.patch('/api/landscaper/profile', { name, phone, address });
      setToast({ message: 'Profil bilgileri güncellendi', type: 'success' });
    } catch {
      setToast({ message: 'Profil güncellenirken bir hata oluştu', type: 'error' });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setToast({ message: 'Yeni şifreler eşleşmiyor', type: 'error' });
      return;
    }
    try {
      await api.post('/api/landscaper/password', { oldPassword, newPassword });
      setPasswordModal(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setToast({ message: 'Şifreniz başarıyla değiştirildi', type: 'success' });
    } catch {
      setToast({ message: 'Şifre değiştirilirken bir hata oluştu', type: 'error' });
    }
  };

  const toggleNotification = async (key: NotificationKey) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    const apiPrefs: Record<string, boolean> = {};
    for (const k of Object.keys(updated) as NotificationKey[]) {
      apiPrefs[API_KEY_MAP[k]] = updated[k];
    }
    try {
      await api.patch('/api/landscaper/notifications', apiPrefs);
    } catch {
      setNotifications(notifications);
      setToast({ message: 'Bildirim tercihleri güncellenirken bir hata oluştu', type: 'error' });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.post('/api/landscaper/account', { action: 'delete' });
      setDeleteModal(false);
      setToast({ message: 'Hesabınız silindi', type: 'success' });
    } catch {
      setToast({ message: 'Hesap silinirken bir hata oluştu', type: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white">Ayarlar</h1>
      </div>

      {status === 'loading' && (
        <ShimmerSkeleton variant="card" count={4} />
      )}

      {status === 'error' && (
        <ErrorBanner message="Ayarlar yüklenirken bir hata oluştu" onRetry={fetchData} />
      )}

      {status === 'success' && (
        <>
          {/* Profil Bilgileri */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase mb-5">Profil Bilgileri</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-bright-green to-lime flex items-center justify-center text-2xl font-bold text-dark-forest shrink-0">
                {name.charAt(0)}
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
                  <Camera size={12} className="text-white" />
                </button>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Profil Fotoğrafı</p>
                <p className="text-[11px] text-white/40">JPG, PNG veya GIF. Maksimum 2MB.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.3px] block mb-1.5">Ad Soyad</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.3px] block mb-1.5">E-posta</label>
                <input value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.3px] block mb-1.5">Telefon</label>
                <input value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.3px] block mb-1.5">Adres</label>
                <input value={address} onChange={e => setAddress(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
              </div>
              <button onClick={handleSaveProfile}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
                <Save size={14} />
                Kaydet
              </button>
            </div>
          </div>

          {/* Bildirim Tercihleri */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase mb-4">Bildirim Tercihleri</h2>
            <div className="space-y-3">
              {NOTIFICATION_ITEMS.map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-sm text-white/70">{item.label}</span>
                  <button type="button" onClick={() => toggleNotification(item.key)}
                    className={`relative w-10 h-5 rounded-full transition-all ${
                      notifications[item.key] ? 'bg-bright-green' : 'bg-white/10'
                    }`}>
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                      notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Şifre Değiştir */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase mb-4">Şifre Değiştir</h2>
            <p className="text-xs text-white/50 mb-4">Hesap güvenliğiniz için şifrenizi düzenli olarak değiştirmeniz önerilir.</p>
            <button onClick={() => setPasswordModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 text-white/70 rounded-[12px] text-xs font-semibold border border-white/10 hover:bg-white/10 hover:text-white transition-all">
              <Lock size={14} />
              Şifre Değiştir
            </button>
          </div>

          {/* Hesap İşlemleri */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-[18px]">
            <h2 className="text-[11px] font-bold tracking-[0.5px] text-white/50 uppercase mb-4">Hesap İşlemleri</h2>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 text-white/70 rounded-[12px] text-xs font-semibold border border-white/10 hover:bg-white/10 hover:text-white transition-all">
                <LogOut size={14} />
                Çıkış Yap
              </button>
              <button onClick={() => setDeleteModal(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-[12px] text-xs font-semibold border border-red-500/20 hover:bg-red-500/20 transition-all">
                <Trash2 size={14} />
                Hesabı Sil
              </button>
            </div>
          </div>
        </>
      )}

      {/* Şifre Değiştir Modal */}
      {passwordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0D2E1A] border border-white/10 rounded-[20px] p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">Şifre Değiştir</h3>
              <button onClick={() => setPasswordModal(false)} className="text-white/30 hover:text-white/60 transition-all"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.3px] block mb-1.5">Eski Şifre</label>
                <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.3px] block mb-1.5">Yeni Şifre</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.3px] block mb-1.5">Yeni Şifre (Tekrar)</label>
                <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-5">
              <button onClick={() => setPasswordModal(false)}
                className="px-4 py-2.5 bg-white/5 text-white/60 rounded-[10px] text-xs font-semibold hover:bg-white/10 transition-all">İptal</button>
              <button onClick={handleChangePassword}
                className="px-4 py-2.5 bg-bright-green text-white rounded-[10px] text-xs font-bold hover:bg-bright-green/90 transition-all">Değiştir</button>
            </div>
          </div>
        </div>
      )}

      {/* Hesap Silme Onayı */}
      {deleteModal && (
        <ConfirmModal
          title="Hesabı Sil"
          message="Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
          variant="danger"
          confirmLabel="Hesabı Sil"
          onConfirm={handleDeleteAccount}
          onCancel={() => setDeleteModal(false)}
        />
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
