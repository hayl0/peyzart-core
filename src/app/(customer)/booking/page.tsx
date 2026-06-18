'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, MapPin, CreditCard, Check } from 'lucide-react';

const STEPS = ['Tarih & Adres', 'Ödeme', 'Onay'];

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ date: '', address: '', notes: '', cardNum: '', cardName: '', cardExp: '', cardCvc: '' });

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!form.date) { setError('Lütfen bir tarih seçin'); return; }
      if (!form.address) { setError('Adres gerekli'); return; }
    }
    if (step === 2) {
      if (!form.cardNum.replace(/\s/g, '') || form.cardNum.replace(/\s/g, '').length < 16) { setError('Geçerli bir kart numarası girin'); return; }
      if (!form.cardName) { setError('Kart üzerindeki isim gerekli'); return; }
      if (!form.cardExp) { setError('Son kullanma tarihi gerekli'); return; }
      if (!form.cardCvc) { setError('CVC kodu gerekli'); return; }
    }
    if (step === 3) {
      setLoading(true);
      setLoading(false); router.push('/orders');
      return;
    }
    setStep(step + 1);
  };

  const formatCard = (val: string) => {
    const nums = val.replace(/\D/g, '').slice(0, 16);
    return nums.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-lg mx-auto p-4 md:p-6 pb-32">
        {/* Stepper */}
        <div className="flex items-center gap-3 mb-8">
          {STEPS.map((label, i) => {
            const num = i + 1;
            const isActive = step === num;
            const isDone = step > num;
            return (
              <div key={num} className="flex items-center gap-3 flex-1">
                <div className={`flex items-center gap-2 ${isActive ? 'flex-1' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isDone ? 'bg-bright-green text-white' :
                    isActive ? 'bg-bright-green text-white shadow-lg shadow-bright-green/20' :
                    'bg-[var(--theme-border)] text-[var(--theme-text-muted)]'
                  }`}>
                    {isDone ? <Check size={14} /> : num}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block ${
                    isActive ? 'text-[var(--theme-text)]' : 'text-[var(--theme-text-muted)]'
                  }`}>{label}</span>
                </div>
                {num < 3 && <div className={`flex-1 h-0.5 rounded-full ${isDone ? 'bg-bright-green' : 'bg-[var(--theme-border)]'}`} />}
              </div>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-[14px] p-3 mb-4 flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Tarih & Adres */}
        {step === 1 && (
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-[var(--theme-text)]">Rezervasyon Bilgileri</h1>
            <div className="nature-card p-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">Tarih</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
                  <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})}
                    className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] pl-10 pr-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">Adres</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-3 text-[var(--theme-text-muted)]" />
                  <textarea value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} rows={2} placeholder="Bahçe adresinizi girin..."
                    className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] pl-10 pr-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all resize-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">Not (isteğe bağlı)</label>
                <textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} rows={2} placeholder="Peyzajcıya iletmek istediğiniz bir not..."
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all resize-none" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Ödeme */}
        {step === 2 && (
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-[var(--theme-text)]">Ödeme Bilgileri</h1>
            <div className="nature-card p-4 space-y-4">
              <div className="flex justify-between pb-4 border-b border-[var(--theme-border)]">
                <span className="text-sm text-[var(--theme-text-secondary)]">Hizmet Bedeli</span>
                <span className="text-lg font-extrabold text-[var(--theme-text)]">₺350</span>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">Kart Numarası</label>
                <div className="relative">
                  <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
                  <input type="text" value={form.cardNum} onChange={(e) => setForm({...form, cardNum: formatCard(e.target.value)})} placeholder="0000 0000 0000 0000"
                    className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] pl-10 pr-4 py-3 text-sm text-[var(--theme-text)] font-mono tracking-wider outline-none focus:border-bright-green/40 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">Kart Üzerindeki İsim</label>
                <input type="text" value={form.cardName} onChange={(e) => setForm({...form, cardName: e.target.value})} placeholder="Ad Soyad"
                  className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">SKT (AA/YY)</label>
                  <input type="text" value={form.cardExp} onChange={(e) => setForm({...form, cardExp: e.target.value.slice(0, 5)})} placeholder="AA/YY"
                    className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">CVC</label>
                  <input type="text" value={form.cardCvc} onChange={(e) => setForm({...form, cardCvc: e.target.value.replace(/\D/g, '').slice(0, 3)})} placeholder="***"
                    className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Onay */}
        {step === 3 && (
          <div className="text-center py-10 space-y-6">
            <div className="w-20 h-20 bg-bright-green rounded-full flex items-center justify-center mx-auto shadow-lg shadow-bright-green/20">
              <Check size={36} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--theme-text)] mb-2">Rezervasyon Alındı!</h1>
              <p className="text-sm text-[var(--theme-text-secondary)] max-w-xs mx-auto">Peyzajcı en kısa sürede sizinle iletişime geçecek.</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--theme-card)] border-t border-[var(--theme-border)] p-4 lg:static lg:border-none lg:bg-transparent lg:p-0 lg:mt-6">
          <div className="max-w-lg mx-auto flex gap-3">
            {step > 1 && step < 3 && (
              <button onClick={() => { setStep(step - 1); setError(''); }}
                className="flex-1 py-3 border border-[var(--theme-border)] rounded-[50px] text-sm font-semibold text-[var(--theme-text)] hover:bg-[var(--theme-bg)] transition-all">
                Geri
              </button>
            )}
            {step === 1 && (
              <Link href="/home" className="flex-1 py-3 border border-[var(--theme-border)] rounded-[50px] text-sm font-semibold text-[var(--theme-text)] hover:bg-[var(--theme-bg)] transition-all text-center">
                İptal
              </Link>
            )}
            {step < 3 ? (
              <button onClick={handleNext} className="flex-1 btn-primary text-center text-sm flex items-center justify-center gap-2">
                {step === 1 ? 'Devam Et' : step === 2 ? 'Ödemeyi Tamamla' : ''}
                <ChevronRight size={16} />
              </button>
            ) : (
              <div className="flex gap-3 w-full">
                <Link href="/orders" className="flex-1 btn-primary text-center text-sm">Siparişlerim</Link>
                <Link href="/home" className="flex-1 py-3 border border-[var(--theme-border)] rounded-[50px] text-sm font-semibold text-[var(--theme-text)] hover:bg-[var(--theme-bg)] transition-all text-center">Ana Sayfa</Link>
              </div>
            )}
          </div>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-[var(--theme-card)] rounded-[24px] p-8 text-center shadow-xl">
              <div className="w-8 h-8 border-2 border-bright-green/30 border-t-bright-green rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-semibold text-[var(--theme-text)]">Sipariş oluşturuluyor...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
