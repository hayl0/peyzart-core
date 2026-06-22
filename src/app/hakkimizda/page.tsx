import { Info, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const VALUES = [
  { emoji: '🔍', title: 'Şeffaflık', desc: 'Tüm hizmet bedelleri ve profesyonel bilgileri şeffaf bir şekilde sunulur.' },
  { emoji: '⭐', title: 'Kalite', desc: 'Her hizmet, titizlikle seçilmiş profesyoneller tarafından sağlanır.' },
  { emoji: '💚', title: 'Güven', desc: 'Kullanıcı yorumları ve puanlama sistemiyle güvenli bir platform sunar.' },
  { emoji: '🚀', title: 'İnovasyon', desc: 'Teknolojiyi kullanarak hizmet sektöründe çığır açan çözümler üretir.' },
]

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-nature-bg">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex items-center gap-2 text-xs text-dark-forest/40 mb-6">
          <Link href="/" className="hover:text-dark-forest/60 transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <span className="text-dark-forest/60">Hakkımızda</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bright-green to-lime flex items-center justify-center">
            <Info size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-forest">Hakkımızda</h1>
            <p className="text-sm text-dark-forest/50">Peyzart&apos;ı tanıyın</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-nature-border p-6 md:p-10 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-dark-forest mb-3">Biz Kimiz?</h2>
            <p className="text-sm text-dark-forest/70 leading-relaxed">
              Peyzart, profesyonel hizmet sağlayıcıları ile hizmet arayışındaki müşterileri bir araya getiren 
              Türkiye&apos;nin lider hizmet platformudur. 2024 yılında kurulan platformumuz, bahçe düzenlemeden 
              ev tadilatına, temizlikten havuz bakımına kadar geniş bir hizmet yelpazesinde, güvenilir ve 
              kaliteli hizmeti tek tıkla ayağınıza getiriyor.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-dark-forest mb-3">Misyonumuz</h2>
            <p className="text-sm text-dark-forest/70 leading-relaxed">
              Herkesin ihtiyaç duyduğu profesyonel hizmete, güvenilir ve uygun fiyatlarla, en kısa sürede 
              ulaşabilmesini sağlamak. Profesyonellere dijital bir iş platformu sunarak işlerini büyütmelerine 
              yardımcı olmak.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-dark-forest mb-3">Vizyonumuz</h2>
            <p className="text-sm text-dark-forest/70 leading-relaxed">
              Türkiye&apos;nin en güvenilir ve en kapsamlı hizmet platformu olmak. Teknolojiyi kullanarak 
              hizmet sektöründe standartları yeniden belirlemek ve milyonlarca kullanıcıya ulaşmak.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-dark-forest mb-3">Değerlerimiz</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-nature-bg rounded-xl p-5">
                  <div className="text-2xl mb-3">{v.emoji}</div>
                  <h3 className="font-bold text-dark-forest text-sm mb-1.5">{v.title}</h3>
                  <p className="text-xs text-dark-forest/60 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-dark-forest mb-3">Neden Peyzart?</h2>
            <div className="space-y-3">
              {[
                { q: 'Geniş Hizmet Ağı', a: 'Bahçe peyzajından eve tadilata, temizlikten havuz bakımına yüzlerce hizmet kategorisi.' },
                { q: 'Güvenilir Profesyoneller', a: 'Her profesyonel, kimlik doğrulaması ve referans kontrollerinden geçer.' },
                { q: 'Uygun Fiyat Garantisi', a: 'Rekabetçi fiyatlandırma ve şeffaf ücret politikası ile bütçenize uygun seçenekler.' },
                { q: 'Kolay Kullanım', a: 'Akıllı arama, filtreleme ve karşılaştırma araçlarıyla dakikalar içinde profesyonel bulun.' },
              ].map((item) => (
                <div key={item.q} className="bg-nature-bg rounded-xl p-4">
                  <h3 className="font-bold text-dark-forest text-sm mb-1">{item.q}</h3>
                  <p className="text-xs text-dark-forest/60 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-bright-green/5 to-lime/5 rounded-xl p-6 text-center">
            <p className="text-xs font-semibold text-dark-forest/50 mb-2">İletişim</p>
            <p className="text-sm text-dark-forest/70"><strong>E-posta:</strong> destek@peyzart.com</p>
            <p className="text-sm text-dark-forest/70"><strong>Adres:</strong> İstanbul, Türkiye</p>
          </section>
        </div>
      </div>
    </div>
  )
}
