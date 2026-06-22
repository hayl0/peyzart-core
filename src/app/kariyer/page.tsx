import { Briefcase, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const VALUES = [
  { emoji: '🌱', title: 'Büyüme', desc: 'Sürekli öğrenme ve gelişim odaklı bir çalışma kültürü.' },
  { emoji: '💡', title: 'Yaratıcılık', desc: 'Fikirlerini özgürce paylaşabileceğin yenilikçi bir ortam.' },
  { emoji: '🤝', title: 'Takım Ruhu', desc: 'Güçlü iş birliği ve destekleyici ekip dinamiği.' },
  { emoji: '⚡', title: 'Dinamizm', desc: 'Hızlı karar alma ve çevik çalışma prensipleri.' },
]

const POSITIONS = [
  { title: 'Frontend Developer', type: 'Tam Zamanlı', location: 'İstanbul / Hibrit', desc: 'React, Next.js ve TypeScript ile kullanıcı arayüzü geliştirme.' },
  { title: 'Full Stack Developer', type: 'Tam Zamanlı', location: 'İstanbul / Hibrit', desc: 'Node.js, PostgreSQL ve bulut teknolojileri ile backend geliştirme.' },
  { title: 'UI/UX Tasarımcı', type: 'Tam Zamanlı', location: 'İstanbul / Ofis', desc: 'Kullanıcı odaklı tasarım süreçlerinde deneyimli ekip arkadaşı.' },
  { title: 'Pazarlama Uzmanı', type: 'Tam Zamanlı', location: 'İstanbul / Hibrit', desc: 'Dijital pazarlama stratejileri ve büyüme odaklı pazarlama.' },
]

export default function KariyerPage() {
  return (
    <div className="min-h-screen bg-nature-bg">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex items-center gap-2 text-xs text-dark-forest/40 mb-6">
          <Link href="/" className="hover:text-dark-forest/60 transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <span className="text-dark-forest/60">Kariyer</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bright-green to-lime flex items-center justify-center">
            <Briefcase size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-forest">Kariyer</h1>
            <p className="text-sm text-dark-forest/50">Ekibimize katıl, fark yarat</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-nature-border p-6 md:p-10 space-y-6 mb-8">
          <section>
            <h2 className="text-lg font-bold text-dark-forest mb-3">Neden Peyzart?</h2>
            <p className="text-sm text-dark-forest/70 leading-relaxed">
              Peyzart olarak, Türkiye&apos;nin hizmet sektörünü dijital dönüşümle buluşturan yenilikçi bir ekibiz. 
              Teknoloji ve girişimcilik tutkusuyla hareket eden ekibimizle, milyonlarca kullanıcının hayatını 
              kolaylaştırmak için çalışıyoruz. Sen de bu yolculukta bize katılmak ister misin?
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-dark-forest mb-3">Değerlerimiz</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-nature-bg rounded-xl p-5">
                  <div className="text-2xl mb-3">{v.emoji}</div>
                  <h3 className="font-bold text-dark-forest text-sm mb-1">{v.title}</h3>
                  <p className="text-xs text-dark-forest/60">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section>
          <h2 className="text-xl font-bold text-dark-forest mb-5">Açık Pozisyonlar</h2>
          <div className="space-y-4">
            {POSITIONS.map((pos) => (
              <div key={pos.title}
                className="bg-white rounded-2xl border border-nature-border p-5 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-dark-forest text-base">{pos.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-semibold bg-bright-green/10 text-bright-green px-2 py-0.5 rounded-full">{pos.type}</span>
                      <span className="text-xs text-dark-forest/50">{pos.location}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-bright-green group-hover:gap-2 transition-all">
                    Başvur <ArrowRight size={12} />
                  </span>
                </div>
                <p className="text-xs text-dark-forest/60 mt-2">{pos.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 bg-gradient-to-br from-bright-green/5 to-lime/5 border border-bright-green/10 rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-dark-forest mb-1">Aradığın pozisyonu bulamadın mı?</p>
          <p className="text-xs text-dark-forest/50 mb-4">Yine de başvurunu bekleriz — yetenekli insanlara her zaman açığız!</p>
          <Link href="/iletisim"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark-forest text-white text-xs font-bold rounded-[50px] hover:opacity-90 transition-all">
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </div>
  )
}
