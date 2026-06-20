'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Wallet, ShieldCheck, Check, ChevronLeft, Sprout, MapPin, Calendar, Lock } from 'lucide-react';

export default function OdemePage() {
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setLoading(false); setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-bright-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-bright-green/20">
            <Check size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--theme-text)] mb-2">Ödeme Başarılı!</h1>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-8">Peyzajcınız talebinizi onayladığında size haber vereceğiz.</p>
          <div className="flex flex-col gap-3">
            <Link href="/orders" className="btn-primary text-sm text-center">Siparişlerim</Link>
            <Link href="/home" className="text-sm font-semibold text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-colors">Ana Sayfa</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--theme-bg)]">
      <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
        {/* Back */}
        <Link href="/booking" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-colors mb-6">
          <ChevronLeft size={18} />
          Geri
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[var(--theme-text)]">Güvenli Ödeme</h1>
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck size={14} className="text-bright-green" />
                <span className="text-xs text-[var(--theme-text-muted)]">256-bit SSL ile korunuyor</span>
              </div>
            </div>

            {/* Method Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setMethod('card')}
                className={`p-4 rounded-[20px] border-2 text-left transition-all ${
                  method === 'card'
                    ? 'border-bright-green bg-bright-green/5'
                    : 'border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-bright-green/30'
                }`}>
                <CreditCard size={22} className={`mb-2 ${method === 'card' ? 'text-bright-green' : 'text-[var(--theme-text-muted)]'}`} />
                <p className="text-xs font-semibold text-[var(--theme-text-muted)]">Seçenek 1</p>
                <p className="text-sm font-bold text-[var(--theme-text)]">Kredi Kartı</p>
              </button>
              <button onClick={() => setMethod('wallet')}
                className={`p-4 rounded-[20px] border-2 text-left transition-all ${
                  method === 'wallet'
                    ? 'border-bright-green bg-bright-green/5'
                    : 'border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-bright-green/30'
                }`}>
                <Wallet size={22} className={`mb-2 ${method === 'wallet' ? 'text-bright-green' : 'text-[var(--theme-text-muted)]'}`} />
                <p className="text-xs font-semibold text-[var(--theme-text-muted)]">Seçenek 2</p>
                <p className="text-sm font-bold text-[var(--theme-text)]">Peyzart Cüzdan</p>
              </button>
            </div>

            {/* Card Form */}
            {method === 'card' && (
              <div className="nature-card p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">Kart Üzerindeki İsim</label>
                  <input type="text" placeholder="AD SOYAD"
                    className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">Kart Numarası</label>
                  <input type="text" placeholder="0000 0000 0000 0000"
                    className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] font-mono tracking-wider outline-none focus:border-bright-green/40 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">SKT (AA/YY)</label>
                    <input type="text" placeholder="AA/YY"
                      className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[var(--theme-text)] mb-1.5 block ml-1">CVC</label>
                    <div className="relative">
                      <input type="text" placeholder="***"
                        className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                      <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-100 rounded-[14px] p-3 flex items-start gap-2">
                  <ShieldCheck size={16} className="text-yellow-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-yellow-700 leading-tight">Kart bilgileriniz sistemde saklanmaz. Ödeme Iyzico güvencesiyle 3D Secure ile gerçekleşir.</p>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button onClick={handlePay} disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> İşleniyor...</>
              ) : (
                <>Ödemeyi Tamamla (₺450)</>
              )}
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="nature-card p-5 space-y-4 sticky top-6">
              <h3 className="font-bold text-sm text-[var(--theme-text)] border-b border-[var(--theme-border)] pb-3">Sipariş Özeti</h3>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[14px] overflow-hidden bg-[var(--theme-border)] shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/categories/bahce-peyzaj.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--theme-text)]">Bahçe Sanatı</p>
                  <p className="text-xs text-[var(--theme-text-muted)]">⭐ 4.8 (124 yorum)</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-[var(--theme-text-secondary)]">
                  <Sprout size={16} className="text-bright-green" />
                  <span>Çim Biçme & Budama</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--theme-text-secondary)]">
                  <MapPin size={16} className="text-bright-green" />
                  <span>Zekeriyaköy, Villa Cad.</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--theme-text-secondary)]">
                  <Calendar size={16} className="text-bright-green" />
                  <span>12 Nisan · 14:00</span>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-[var(--theme-border)]">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--theme-text-secondary)]">Hizmet Bedeli</span>
                  <span className="text-[var(--theme-text)] font-semibold">₺420</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--theme-text-secondary)]">İşlem Ücreti</span>
                  <span className="text-[var(--theme-text)] font-semibold">₺30</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--theme-border)]">
                  <span className="font-bold text-[var(--theme-text)]">Toplam</span>
                  <span className="font-extrabold text-xl text-bright-green">₺450</span>
                </div>
              </div>

              {/* Discount */}
              <div className="flex gap-2">
                <input type="text" placeholder="İndirim Kodu"
                    className="flex-1 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-[12px] px-3.5 py-3 text-xs text-[var(--theme-text)] outline-none focus:border-bright-green/40 transition-all" />
                <button className="px-4 py-2.5 bg-[var(--theme-text)] text-[var(--theme-card)] rounded-[12px] text-xs font-bold hover:opacity-90 transition-opacity">Uygula</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
