'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ChevronLeft } from 'lucide-react';

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleChange = (i: number, v: string) => {
    if (v.length <= 1 && /^\d*$/.test(v)) {
      const newCode = [...code];
      newCode[i] = v;
      setCode(newCode);
      if (v && i < 5) {
        const next = document.getElementById(`code-${i + 1}`);
        next?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm font-semibold text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] transition-colors mb-8">
          <ChevronLeft size={18} />
          Geri
        </button>

        <div className="nature-card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-bright-green/10 flex items-center justify-center mx-auto mb-5">
            <Mail size={28} className="text-bright-green" />
          </div>

          <h1 className="text-xl font-bold text-[var(--theme-text)] mb-2">E-postanı Doğrula</h1>
          <p className="text-sm text-[var(--theme-text-secondary)] mb-6">
            6 haneli kodu <strong className="text-[var(--theme-text)]">ornek@email.com</strong> adresine gönderdik.
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {code.map((d, i) => (
              <input key={i} id={`code-${i}`} type="text" value={d} onChange={e => handleChange(i, e.target.value)}
                maxLength={1}
                className="w-11 h-12 text-center text-lg font-bold rounded-[14px] bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text)] outline-none focus:border-bright-green focus:ring-2 focus:ring-bright-green/10 transition-all" />
            ))}
          </div>

          <button onClick={() => router.push('/home')}
            className="btn-primary w-full text-sm">
            Doğrula
          </button>

          <p className="text-xs text-[var(--theme-text-muted)] mt-4">
            Kod gelmedi mi? <button className="text-bright-green font-semibold hover:underline">Tekrar Gönder</button>
          </p>
        </div>
      </div>
    </div>
  );
}
