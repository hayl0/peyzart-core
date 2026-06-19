'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Sprout, Award, Users, Star } from 'lucide-react'

const GRADIENTS = [
  'from-emerald-700 to-green-600',
  'from-stone-700 to-stone-500',
  'from-amber-800 to-amber-600',
  'from-green-600 to-lime-500',
  'from-rose-600 to-green-600',
  'from-amber-700 to-brown-600',
  'from-slate-700 to-slate-500',
  'from-cyan-600 to-blue-500',
  'from-teal-700 to-teal-500',
  'from-orange-700 to-amber-500',
  'from-lime-700 to-green-500',
  'from-blue-800 to-blue-600',
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [categories, setCategories] = useState<{ name: string; slug: string; description: string | null; image: string | null }[]>([])
  useState(() => { queueMicrotask(() => setMounted(true)) })

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(d => { if (d?.categories) setCategories(d.categories) })
      .catch(() => {})
  }, [])

  const cats = categories.length > 0 ? categories : []

  return (
    <div className="min-h-screen bg-nature-bg font-sans">
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
        <div className="logo-gradient text-[32px] md:text-[38px]">Peyzart</div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="text-sm font-bold text-dark-forest/60 hover:text-dark-forest transition-colors px-4 py-2.5">
            Giriş Yap
          </Link>
          <Link href="/register" className="btn-primary text-sm !px-5 !py-2.5">
            Kayıt Ol <ArrowRight size={14} className="inline" />
          </Link>
        </div>
      </nav>

      <section className="relative px-6 md:px-12 max-w-7xl mx-auto pt-10 md:pt-20 pb-20 md:pb-32">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-bright-green/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-lime/6 rounded-full blur-[120px]" />
        </div>

        <div className={`relative transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-bright-green/10 border border-bright-green/20 rounded-full px-4 py-1.5 mb-6">
              <Sprout size={12} className="text-bright-green" />
              <span className="text-[10px] font-semibold text-dark-forest/60 uppercase tracking-widest">Peyzaj & Çevre Düzenleme Platformu</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-dark-forest leading-[1.05] tracking-tight mb-6">
              Bahçenize,<br />
              <span className="bg-gradient-to-r from-bright-green via-medium-green to-lime bg-clip-text text-transparent">Profesyonel</span> Dokunuş
            </h1>

            <p className="text-lg md:text-xl text-dark-forest/60 max-w-xl mb-10 leading-relaxed">
              Peyzaj tasarımından zemin düzenlemeye, aydınlatmadan sulama sistemlerine
              kadar tüm dış mekan ihtiyaçlarınız için uzman bulun.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-bright-green to-medium-green text-white font-bold text-sm rounded-[50px] shadow-xl shadow-bright-green/25 hover:shadow-bright-green/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Ücretsiz Kayıt Ol
                <ArrowRight size={16} />
              </Link>
              <Link href="/kesfet"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-nature-border text-dark-forest font-bold text-sm rounded-[50px] hover:border-bright-green/40 hover:shadow-lg transition-all">
                Hizmetleri Keşfet
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-12 mt-16 md:mt-24 max-w-lg">
            {[
              { icon: Users, value: '500+', label: 'Uzman Peyzajcı' },
              { icon: Award, value: '98%', label: 'Müşteri Memnuniyeti' },
              { icon: Star, value: '2.5K+', label: 'Tamamlanan Proje' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-bright-green/10 flex items-center justify-center mx-auto mb-2">
                  <s.icon size={18} className="text-bright-green" />
                </div>
                <p className="text-xl font-extrabold text-dark-forest">{s.value}</p>
                <p className="text-xs font-semibold text-dark-forest/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {cats.length > 0 && (
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-forest mb-3">Tüm Hizmetlerimiz</h2>
              <p className="text-dark-forest/60">Peyzaj ve çevre düzenleme sektörünün tüm ihtiyaçları tek platformda</p>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              {cats.map((s, i) => (
                <Link key={s.name} href={`/kesfet?kategori=${s.slug}`}
                  className="snap-start shrink-0 w-[280px] md:w-[320px] nature-card overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="h-40 md:h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${s.image || ''})` }}>
                    <div className={`absolute inset-0 bg-gradient-to-t ${GRADIENTS[i % GRADIENTS.length]} opacity-60 group-hover:opacity-70 transition-opacity`} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-dark-forest text-base mb-1">{s.name}</h3>
                    <p className="text-sm text-dark-forest/60 leading-relaxed">{s.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white/60 border-t border-nature-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-forest mb-3">Neden Peyzart?</h2>
            <p className="text-dark-forest/60">Binlerce kullanıcı ve profesyonel güveniyor</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { emoji: '🔍', title: 'Kolay Bulma', desc: 'Konumuna ve ihtiyacına göre en uygun uzmanı anında bul.' },
              { emoji: '⭐', title: 'Güvenilir Profiller', desc: 'Puan, yorum ve portföylerle karşılaştır, bilinçli seç.' },
              { emoji: '💬', title: 'Doğrudan İletişim', desc: 'Uzmanla birebir iletişim kur, fiyat görüşmesi yap.' },
              { emoji: '📱', title: 'Tam Dijital', desc: 'Teklif, sipariş, takvim ve bildirim hepsi dijital.' },
            ].map(f => (
              <div key={f.title} className="nature-card p-8 hover:shadow-xl">
                <div className="text-3xl mb-4">{f.emoji}</div>
                <h3 className="text-lg font-bold text-dark-forest mb-2">{f.title}</h3>
                <p className="text-sm text-dark-forest/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-forest">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Peyzajcı mısın?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Binlerce potansiyel müşteriye ulaş, işini büyüt. Profesyonel panelinle tüm siparişlerini ve portföyünü yönet.
          </p>
          <Link href="/register/landscaper"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-bright-green to-lime text-dark-forest font-bold text-sm rounded-[50px] shadow-xl shadow-bright-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Peyzajcı Olarak Katıl
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="bg-dark-forest border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <div className="logo-gradient text-xl">Peyzart</div>
          <p className="text-[11px] text-white/30 font-semibold">&copy; 2026 Peyzart | Peyzaj & Çevre Düzenleme Platformu</p>
        </div>
      </footer>
    </div>
  )
}
