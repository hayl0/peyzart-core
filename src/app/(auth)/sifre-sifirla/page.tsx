'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-nature-bg flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-[420px] bg-white rounded-[24px] border border-nature-border shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 sm:p-10">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#999] hover:text-[#555] transition-colors mb-8">
          <ArrowLeft size={14} />
          Girişe Dön
        </Link>

        {sent ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} className="text-bright-green" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#222]">E-posta Gönderildi</h1>
              <p className="text-sm text-[#888]">
                <strong className="text-[#555]">{email}</strong> adresine şifre sıfırlama bağlantısı gönderdik.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#222]">Şifreni Sıfırla</h1>
              <p className="text-sm text-[#888]">E-posta adresini gir, sana sıfırlama bağlantısı gönderelim.</p>
            </div>

            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bbb]" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-posta adresin"
                className="w-full bg-white border border-nature-input-border rounded-[14px] pl-11 pr-4 py-3.5 text-sm text-[#333] outline-none focus:border-bright-green/40 focus:ring-2 focus:ring-bright-green/10 transition-all" />
            </div>

            <button onClick={() => setSent(true)} disabled={!email.includes('@')}
              className="btn-primary w-full text-sm disabled:opacity-50">
              Sıfırlama Bağlantısı Gönder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
