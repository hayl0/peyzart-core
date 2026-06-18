# Faz 1: Tasarım Sistemi & Auth Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the Nature-First design system across all pages and build a working authentication flow (register/login/logout) with Firebase.

**Architecture:**
- CSS design tokens live in `globals.css` (`@theme`) and `tailwind.config.ts`
- Billabong font via CDN for brand logo, Sora for body text
- Auth flows use existing `AuthContext.tsx` + Firebase, with new login page, fixed register page, AuthProvider in layout
- All pages in the `(auth)` route group get the new Nature-First theme

**Tech Stack:** Next.js 16, Tailwind CSS v4, Firebase Auth, Billabong font (CDN), Sora (next/font)

---

## Chunk 1: Design System Foundation

### Task 1.1: Update globals.css with Nature-First theme

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Replace theme configuration**

Update the `@theme` block to use the new Nature-First palette with Billabong font:

```css
@import "tailwindcss";
@import url('https://fonts.cdnfonts.com/css/billabong');

@theme {
  --font-sans: 'Sora', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Billabong', 'Sora', sans-serif;
  --font-script: 'Billabong', cursive;
  --font-mono: 'JetBrains Mono', monospace;

  --color-nature-bg: #F5F7F0;
  --color-nature-white: #FFFFFF;
  --color-nature-border: #E8EDE0;
  --color-nature-input-border: #E0E6D8;
  --color-dark-forest: #0A2E1A;
  --color-peyzart-green: #1B5E20;
  --color-medium-green: #2E7D32;
  --color-bright-green: #4CAF50;
  --color-lime: #CDDC39;
  --color-warning-yellow: #FBC02D;
  --color-error-red: #EF4444;

  --radius-card: 24px;
  --radius-input: 14px;
  --radius-button: 50px;
  --radius-badge: 50px;
}
```

- [ ] **Add logo-gradient utility class**

```css
.logo-gradient {
  font-family: 'Billabong', cursive;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #0a2e1a 0%, #1b5e20 25%, #4caf50 50%, #cddc39 75%, #fbc02d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.06));
}
```

- [ ] **Add nature-card, btn-primary, and btn-secondary classes**

```css
.nature-card {
  background: #FFFFFF;
  border: 1px solid #E8EDE0;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.nature-card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.btn-primary {
  background: linear-gradient(135deg, #CDDC39 0%, #4CAF50 100%);
  border: none;
  border-radius: 50px;
  padding: 14px 28px;
  color: #1B5E20;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(205, 220, 57, 0.25);
  transition: all 0.2s;
}

.btn-secondary {
  background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);
  border: none;
  border-radius: 50px;
  padding: 14px 28px;
  color: white;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.25);
  transition: all 0.2s;
}
```

- [ ] **Commit**

```bash
git add src/styles/globals.css
git commit -m "feat(design): add Nature-First theme with Billabong font and component classes"
```

### Task 1.2: Verify Tailwind v4 compatibility

**Files:**
- Read: `tailwind.config.ts` (check for duplicate color tokens with globals.css)
- Run: Build test to detect conflicts

Tailwind CSS v4 uses `@theme` in CSS for design tokens. The existing `tailwind.config.ts` still has `greenish` and `peyzart` color definitions that may conflict with the new `@theme` tokens. Need to verify.

- [ ] **Check for conflicting color tokens**

```bash
grep -n "colors" tailwind.config.ts | head -5
grep -n "greenish\|peyzart\|nature\|bright\|lime\|dark-forest" tailwind.config.ts | head -20
```

If the config defines `nature-bg`, `bright-green`, `lime`, or other tokens that are now in `globals.css` `@theme`, remove the duplicate ones from `tailwind.config.ts` to avoid confusion.

- [ ] **Run typecheck to catch any TS issues**

```bash
npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Commit**

```bash
git add tailwind.config.ts
git commit -m "chore: clean up Tailwind v4 config - remove duplicate color tokens"
```

---

## Chunk 2: AuthProvider in Root Layout

### Task 2.1: Wrap AuthProvider in layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Add AuthProvider import and wrapper**

```tsx
import { AuthProvider } from '@/lib/auth/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className="...">
        <AuthProvider>
          <SmoothScroll>
            ...
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
```

- [ ] **Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(auth): wrap root layout with AuthProvider"
```

---

## Chunk 3: Login Page (Nature-First)

### Task 3.1: Create login page.tsx

**Files:**
- Create: `src/app/(auth)/login/page.tsx`

- [ ] **Build the login page component**

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle, user, userRole } = useAuth();
  const [role, setRole] = useState<'customer' | 'landscaper'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
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
      await signIn(email, password);
      // signIn does NOT set role yet — Chunk 7 cleanup will update this
      localStorage.setItem('peyzart_user_role', role);
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
    <div className="min-h-screen bg-nature-bg flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-white rounded-[24px] border border-nature-border shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 sm:p-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="logo-gradient text-[42px]">Peyzart</div>
          <div className="w-[60px] h-[3px] bg-gradient-to-r from-bright-green to-lime rounded-full mx-auto mt-3" />
          <p className="text-[#888] text-sm mt-3">Tekrar hoş geldiniz 👋</p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-nature-bg rounded-[12px] p-1 mb-6">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 text-center py-2.5 text-sm font-semibold rounded-[10px] transition-all ${
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
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Giriş yapılıyor...
              </>
            ) : (
              'Giriş Yap'
            )}
          </button>
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
```

- [ ] **Commit**

```bash
git add src/app/(auth)/login/page.tsx
git commit -m "feat(auth): add Nature-First login page with Firebase auth"
```

---

## Chunk 4: Fix Register Page

### Task 4.1: Rewrite register page with Nature-First theme + Firebase

**Files:**
- Modify: `src/app/(auth)/register/page.tsx`

- [ ] **Replace entire file with working register page**

```tsx
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
    } catch (err: any) {
      const msg =
        err.code === 'auth/email-already-in-use'
          ? 'Bu e-posta zaten kayıtlı'
          : err.code === 'auth/weak-password'
          ? 'Şifre çok zayıf'
          : err.code === 'auth/invalid-email'
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
    <div className="min-h-screen bg-nature-bg flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-white rounded-[24px] border border-nature-border shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 sm:p-10"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="logo-gradient text-[38px]">Peyzart</div>
          <p className="text-[#888] text-sm mt-2">Hesap oluştur ve başla ✨</p>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-nature-bg rounded-[12px] p-1 mb-6">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 text-center py-2.5 text-sm font-semibold rounded-[10px] transition-all ${
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
          className="w-full py-3 border border-nature-input-border rounded-[14px] text-sm font-semibold text-[#555] hover:bg-nature-bg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>🔵</span>
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
```

- [ ] **Commit**

```bash
git add src/app/(auth)/register/page.tsx
git commit -m "feat(auth): rewrite register page with Firebase auth and Nature-First design"
```

---

## Chunk 5: AuthContext Improvements

### Task 5.1: Fix role persistence after signIn

**Files:**
- Modify: `src/lib/auth/AuthContext.tsx`

- [ ] **Update signIn to accept and persist role**

```typescript
const signIn = async (email: string, password: string, role: 'customer' | 'landscaper' = 'customer') => {
  await signInWithEmailAndPassword(auth, email, password);
  localStorage.setItem('peyzart_user_role', role);
  setUserRole(role);
};
```

- [ ] **Add sendPasswordReset method**

```typescript
import { sendPasswordResetEmail } from 'firebase/auth';

// Inside AuthContextType interface:
resetPassword: (email: string) => Promise<void>;

// Implementation:
const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
```

- [ ] **Commit**

```bash
git add src/lib/auth/AuthContext.tsx
git commit -m "fix(auth): persist role on signIn, add password reset method"
```

---

## Chunk 6: Landing Page Logo Update

### Task 6.1: Update landing page with Billabong gradient logo

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Replace all "PEYZART" / "Peyzart" logo text instances with logo-gradient class**

Search the entire file for every logo/brand text reference. There may be multiple: navbar link, hero heading, CTA sections, footer. **Replace all instances.**

Example (navbar logo):
```tsx
{/* Before */}
<Link href="/" className="text-2xl font-black tracking-tighter text-white italic">PEYZART</Link>

{/* After */}
<Link href="/" className="logo-gradient text-2xl">Peyzart</Link>
```

Verify no remaining plain "PEYZART" or "Peyzart" text in landing page after changes.

- [ ] **Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(brand): update landing page logo to Billabong gradient"
```

---

## Chunk 7: Verify & Build

### Task 7.1: Reconcile post-Chunk-5 login page

After Chunk 5 updated `signIn` to accept a role parameter, the login page (from Chunk 3) still uses manual localStorage. Fix this.

- [ ] **Update login page to use 3-arg signIn and remove manual role handling**

```tsx
// In src/app/(auth)/login/page.tsx, change:
await signIn(email, password);
// signIn does NOT set role — Chunk 7 cleanup will update this
localStorage.setItem('peyzart_user_role', role);

// To:
await signIn(email, password, role);
```

- [ ] **Commit**

```bash
git add src/app/(auth)/login/page.tsx
git commit -m "fix: reconcile login page with signIn role parameter"
```

### Task 7.2: TypeScript check

- [ ] **Run typecheck**

```bash
npx tsc --noEmit
```

Expected: Only pre-existing errors (SearchBar, Navbar props). No new errors from auth changes.

### Task 7.2: Build test

- [ ] **Run build**

```bash
npm run build
```

Expected: Build succeeds.

### Task 7.3: Final commit

- [ ] **Commit any remaining fixes**

```bash
git add -A
git commit -m "chore: finalize Faz 1 design system and auth implementation"
```

---

## Summary

After this plan, the following will be complete:

| Output | Status |
|--------|--------|
| Nature-First CSS theme (`@theme` tokens + utility classes) | ✅ |
| Billabong font via CDN | ✅ |
| Login page (email + Google, role switcher, validation, states) | ✅ |
| Register page (working Firebase signUp) | ✅ |
| AuthProvider wrapping root layout | ✅ |
| AuthContext improvements (role persistence, password reset) | ✅ |
| Landing page logo updated | ✅ |
| All pages in `(auth)` route group themed | ✅ |
