'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ChevronLeft, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { sendEmailVerification } from 'firebase/auth';

export default function VerifyPage() {
  const router = useRouter();
  const { user, userRole, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'sent' | 'checking' | 'verified' | 'error'>('sent');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  const checkVerification = async () => {
    if (!user) {
      setStatus('error');
      setError('Oturum bulunamadı. Lütfen giriş yapın.');
      return;
    }
    setStatus('checking');
    try {
      await user.reload();
      if (user.emailVerified) {
        setStatus('verified');
        const target = userRole === 'landscaper' ? '/landscaper/dashboard' : '/home';
        setTimeout(() => router.push(target), 1500);
      } else {
        setStatus('sent');
        setError('E-posta henüz doğrulanmamış. Lütfen gelen kutunuzu kontrol edin.');
      }
    } catch {
      setStatus('error');
      setError('Kontrol edilirken hata oluştu. Tekrar deneyin.');
    }
  };

  const resendVerification = async () => {
    if (!user) return;
    try {
      await sendEmailVerification(user);
      setStatus('sent');
      setError('');
    } catch {
      setError('Tekrar gönderilemedi. Daha sonra deneyin.');
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-nature-bg flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm font-semibold text-[#999] hover:text-[#333] transition-colors mb-8">
          <ChevronLeft size={18} />
          Geri
        </button>

        <div className="bg-white rounded-[24px] border border-nature-border shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 text-center">
          {status === 'verified' ? (
            <>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={28} className="text-medium-green" />
              </div>
              <h1 className="text-xl font-bold text-[#222] mb-2">E-posta Doğrulandı!</h1>
              <p className="text-sm text-[#888]">Yönlendiriliyorsunuz...</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-bright-green/10 flex items-center justify-center mx-auto mb-5">
                {status === 'checking' ? (
                  <RefreshCw size={28} className="text-bright-green animate-spin" />
                ) : (
                  <Mail size={28} className="text-bright-green" />
                )}
              </div>

              <h1 className="text-xl font-bold text-[#222] mb-2">E-postanı Doğrula</h1>
              <p className="text-sm text-[#888] mb-6">
                Doğrulama bağlantısı <strong className="text-[#222]">{email}</strong> adresine gönderildi.
              </p>

              <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-[12px] p-3 mb-6 text-left flex items-start gap-2">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>Spam kutusunu da kontrol edin. Doğrulama bağlantısına tıkladıktan sonra aşağıdaki butona basın.</span>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-[12px] p-3 mb-4">
                  {error}
                </div>
              )}

              <button
                onClick={checkVerification}
                disabled={status === 'checking'}
                className="btn-primary w-full text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === 'checking' ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Kontrol ediliyor...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Doğruladım, Kontrol Et
                  </>
                )}
              </button>

              <div className="mt-4 space-y-2">
                <button onClick={resendVerification} className="text-xs text-bright-green font-semibold hover:underline">
                  Tekrar Gönder
                </button>
                <p className="text-xs text-[#bbb]">
                  Farklı bir e-posta mı kullanmak istiyorsunuz?{' '}
                  <button onClick={handleLogout} className="text-bright-green font-semibold hover:underline">
                    Çıkış Yap
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
