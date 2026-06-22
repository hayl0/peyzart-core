'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PasswordInput } from '@/components/ui/PasswordInput';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle, user, userRole } = useAuth();
  const [role, setRole] = useState<'customer' | 'landscaper'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Only redirect after successful login, not on initial page load
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  useEffect(() => {
    if (justLoggedIn && user && userRole) {
      const target = userRole === 'landscaper' ? '/landscaper/dashboard' : '/home';
      router.push(target);
    }
  }, [justLoggedIn, user, userRole, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signIn(email, password, role);
      setJustLoggedIn(true);
    } catch (err) {
      const error = err as { code?: string };
      const msg =
        error.code === 'auth/user-not-found'
          ? 'Bu e-posta ile kayıtlı kullanıcı bulunamadı'
          : error.code === 'auth/wrong-password'
          ? 'Şifre hatalı'
          : error.code === 'auth/invalid-email'
          ? 'Geçersiz e-posta formatı'
          : error.code === 'auth/invalid-credential'
          ? 'E-posta veya şifre hatalı'
          : 'Giriş yapılırken bir hata oluştu';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await signInWithGoogle(role);
    } catch {
      setError('Google ile giriş başarısız oldu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nature-bg flex items-center justify-center p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-white rounded-[24px] border border-nature-border shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 sm:p-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="logo-gradient text-[36px] md:text-[48px]">Peyzart</div>
          <div className="w-[60px] h-[3px] bg-gradient-to-r from-bright-green to-lime rounded-full mx-auto mt-3" />
          <p className="text-[#888] text-sm mt-3">Tekrar hoş geldiniz 👋</p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-nature-bg rounded-[12px] p-1 mb-6">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 text-center py-3 text-sm font-semibold rounded-[10px] transition-all ${
              role === 'customer'
                ? 'bg-white text-peyzart-green shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                : 'text-[#999] hover:text-[#666]'
            }`}
          >
            Müşteri
          </button>
          <button
            onClick={() => setRole('landscaper')}
            className={`flex-1 text-center py-2.5 text-sm font-semibold rounded-[10px] transition-all ${
              role === 'landscaper'
                ? 'bg-white text-peyzart-green shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                : 'text-[#999] hover:text-[#666]'
            }`}
          >
            Peyzajcı
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-[12px] p-3 mb-4 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#222] mb-1.5 block ml-1">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                required
                disabled={isLoading}
                className="w-full bg-white border border-nature-input-border rounded-[14px] pl-11 pr-4 py-3.5 text-sm text-[#333] outline-none focus:border-bright-green/40 focus:ring-2 focus:ring-bright-green/10 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="text-xs font-semibold text-[#222]">Şifre</label>
              <Link href="/sifre-sifirla" className="text-xs text-bright-green font-semibold hover:underline">
                Şifremi Unuttum?
              </Link>
            </div>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="bg-white border border-nature-input-border text-[#333] placeholder:text-[#bbb]"
            />
          </div>

          <Button
            type="submit"
            loading={isLoading}
            fullWidth
            size="md"
            disabled={isLoading}
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-nature-border" />
          <span className="text-xs text-[#bbb] font-medium">veya devam et</span>
          <div className="flex-1 h-px bg-nature-border" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-3.5 border border-nature-input-border rounded-[14px] text-sm font-semibold text-[#333] hover:bg-[#f8f9fa] hover:border-[#dadce0] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-sm"
        >
          <svg viewBox="0 0 48 48" className="w-5 h-5">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.54 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.77.87 7.35 2.56 10.56l7.98-5.97z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.97C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Google ile Giriş Yap
        </button>

        {/* Register Link */}
        <p className="text-center mt-6 text-sm text-[#888]">
          Hesabın yok mu?{' '}
          <Link href="/register" className="font-extrabold bg-gradient-to-r from-bright-green to-lime bg-clip-text text-transparent">
            Kayıt Ol
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
