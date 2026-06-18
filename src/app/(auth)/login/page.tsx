'use client';

import { useState } from 'react';
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

  if (user && userRole) {
    const target = userRole === 'landscaper' ? '/landscaper/dashboard' : '/home';
    router.push(target);
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signIn(email, password, role);
      // Router will redirect via AuthContext's onAuthStateChanged
    } catch (err: any) {
      const msg =
        err.code === 'auth/user-not-found'
          ? 'Bu e-posta ile kayıtlı kullanıcı bulunamadı'
          : err.code === 'auth/wrong-password'
          ? 'Şifre hatalı'
          : err.code === 'auth/invalid-email'
          ? 'Geçersiz e-posta formatı'
          : err.code === 'auth/invalid-credential'
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
    } catch (err: any) {
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
          className="w-full py-3 border border-nature-input-border rounded-[14px] text-sm font-semibold text-[#555] hover:bg-nature-bg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>🔵</span>
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
