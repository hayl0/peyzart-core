'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="relative min-h-screen bg-[#07130c] overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Arkaplan gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-15%] w-[80vw] h-[80vw] bg-greenish-bright/8 rounded-full blur-[200px]" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[70vw] h-[70vw] bg-greenish-lime/6 rounded-full blur-[180px]" />
      </div>

      {/* İçerik */}
      <div className={`relative z-10 text-center max-w-md transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {/* Logo */}
        <div className="mb-6 inline-flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-greenish-lime to-greenish-bright flex items-center justify-center shadow-lg shadow-greenish-lime/20">
            <span className="text-[28px] font-bold text-dark-forest">P</span>
          </div>
        </div>

        <h1 className="text-[40px] font-extrabold tracking-tight text-white mb-3 leading-[1.1]">
          Peyzart
        </h1>
        <p className="text-[15px] text-white/50 leading-relaxed mb-10 max-w-xs mx-auto">
          Profesyonel peyzaj hizmetlerini keşfedin, yeşil alanlarınızı tasarlayın.
        </p>

        <div className="space-y-3">
          <Link href="/login"
            className="block w-full py-3.5 bg-gradient-to-r from-greenish-lime to-greenish-bright text-dark-forest font-bold text-sm rounded-[16px] hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-greenish-lime/20">
            Giriş Yap
          </Link>
          <Link href="/register"
            className="block w-full py-3.5 bg-white/5 border border-white/10 text-white font-semibold text-sm rounded-[16px] hover:bg-white/10 transition-all active:scale-[0.98]">
            Hesap Oluştur
          </Link>
        </div>

        <p className="mt-8 text-[11px] text-white/20">
          Peyzajcı mısın?{' '}
          <Link href="/register/landscaper" className="text-greenish-lime/60 hover:text-greenish-lime underline underline-offset-2 transition-colors">
            Buradan katıl
          </Link>
        </p>
      </div>
    </div>
  )
}
