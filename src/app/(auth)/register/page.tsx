'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import { Mail, Lock, User, Phone, Eye, EyeOff, ChevronRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle, user } = useAuth();

  const [role, setRole] = useState<'customer' | 'landscaper'>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    router.push('/home');
    return null;
  }

  const passwordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabel = ['', 'Zayıf', 'Orta', 'İyi', 'Güçlü'];
  const strengthColor = ['', '#EF4444', '#F59E0B', '#3B82F6', '#4CAF50'];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) { setError('Ad ve soyad gerekli'); return; }
    if (!email.includes('@')) { setError('Geçerli bir e-posta girin'); return; }
    if (password.length < 8) { setError('Şifre en az 8 karakter olmalı'); return; }
    if (password !== confirmPassword) { setError('Şifreler eşleşmiyor'); return; }

    setIsLoading(true);
    try {
      await signUp(email, password, name, role);
      router.push('/verify');
    } catch (err) {
      const error = err as { code?: string };
      const msg =
        error.code === 'auth/email-already-in-use'
          ? 'Bu e-posta zaten kayıtlı'
          : error.code === 'auth/weak-password'
          ? 'Şifre çok zayıf'
          : error.code === 'auth/invalid-email'
          ? 'Geçersiz e-posta formatı'
          : 'Kayıt olurken bir hata oluştu';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    setIsLoading(true);
    try {
      await signInWithGoogle(role);
      router.push('/home');
    } catch {
      setError('Google ile kayıt başarısız');
    } finally {
      setIsLoading(false);
    }
  };

  const score = passwordStrength();

  return (
    <div className="min-h-screen bg-nature-bg flex items-center justify-center p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-white rounded-[24px] border border-nature-border shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 sm:p-10"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="logo-gradient text-[36px] md:text-[46px]">Peyzart</div>
          <p className="text-[#888] text-sm mt-2">Hesap oluştur ve başla ✨</p>
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

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-3.5">
          {/* Name */}
          <div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ad Soyad"
                required
                disabled={isLoading}
                className="w-full bg-white border border-nature-input-border rounded-[14px] pl-11 pr-4 py-3.5 text-sm text-[#333] outline-none focus:border-bright-green/40 focus:ring-2 focus:ring-bright-green/10 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta Adresi"
                required
                disabled={isLoading}
                className="w-full bg-white border border-nature-input-border rounded-[14px] pl-11 pr-4 py-3.5 text-sm text-[#333] outline-none focus:border-bright-green/40 focus:ring-2 focus:ring-bright-green/10 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon (isteğe bağlı)"
                disabled={isLoading}
                className="w-full bg-white border border-nature-input-border rounded-[14px] pl-11 pr-4 py-3.5 text-sm text-[#333] outline-none focus:border-bright-green/40 focus:ring-2 focus:ring-bright-green/10 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre (min. 8 karakter)"
                required
                disabled={isLoading}
                className="w-full bg-white border border-nature-input-border rounded-[14px] pl-11 pr-11 py-3.5 text-sm text-[#333] outline-none focus:border-bright-green/40 focus:ring-2 focus:ring-bright-green/10 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#bbb] hover:text-[#666]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Password Strength */}
            {password.length > 0 && (
              <div className="flex gap-2 mt-2 ml-1">
                <div className="flex-1 h-1.5 rounded-full bg-nature-border overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${(score / 4) * 100}%`, background: strengthColor[score] }}
                  />
                </div>
                <span className="text-[10px] font-semibold" style={{ color: strengthColor[score] }}>
                  {strengthLabel[score]}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Şifre Tekrar"
                required
                disabled={isLoading}
                className="w-full bg-white border border-nature-input-border rounded-[14px] pl-11 pr-4 py-3.5 text-sm text-[#333] outline-none focus:border-bright-green/40 focus:ring-2 focus:ring-bright-green/10 transition-all disabled:opacity-50"
              />
            </div>
            {confirmPassword.length > 0 && password !== confirmPassword && (
              <p className="text-[10px] text-error-red mt-1 ml-1">Şifreler eşleşmiyor</p>
            )}
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {password.length >= 8 ? (
              <span className="bg-green-50 text-medium-green rounded-[50px] px-2.5 py-1 text-[10px] font-semibold">✅ 8+ karakter</span>
            ) : password.length > 0 ? (
              <span className="bg-red-50 text-error-red rounded-[50px] px-2.5 py-1 text-[10px] font-semibold">⚠️ En az 8 karakter</span>
            ) : null}
            {/[A-Z]/.test(password) && password.length > 0 && (
              <span className="bg-green-50 text-medium-green rounded-[50px] px-2.5 py-1 text-[10px] font-semibold">✅ Büyük harf</span>
            )}
            {/[0-9]/.test(password) && password.length > 0 && (
              <span className="bg-green-50 text-medium-green rounded-[50px] px-2.5 py-1 text-[10px] font-semibold">✅ Rakam</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-peyzart-green/30 border-t-peyzart-green rounded-full animate-spin" />
                Hesap oluşturuluyor...
              </>
            ) : (
              <>
                Hesap Oluştur
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-nature-border" />
          <span className="text-xs text-[#bbb] font-medium">veya</span>
          <div className="flex-1 h-px bg-nature-border" />
        </div>

        {/* Google Register */}
        <button
          onClick={handleGoogleRegister}
          disabled={isLoading}
          className="w-full py-3.5 border border-nature-input-border rounded-[14px] text-sm font-semibold text-[#333] hover:bg-[#f8f9fa] hover:border-[#dadce0] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-sm"
        >
          <svg viewBox="0 0 48 48" className="w-5 h-5">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.54 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.77.87 7.35 2.56 10.56l7.98-5.97z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.97C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Google ile Kayıt Ol
        </button>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-[#888]">
          Zaten hesabın var mı?{' '}
          <Link href="/login" className="font-extrabold bg-gradient-to-r from-bright-green to-lime bg-clip-text text-transparent">
            Giriş Yap
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
