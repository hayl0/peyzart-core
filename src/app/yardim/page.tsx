import { HelpCircle, ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  { title: 'Hesap Yönetimi', items: ['Kayıt olma', 'Giriş yapma', 'Şifre sıfırlama', 'Profil düzenleme'] },
  { title: 'Hizmet Alma', items: ['Hizmet arama', 'Fiyat teklifi alma', 'Rezervasyon yapma', 'Ödeme işlemleri'] },
  { title: 'Profesyonel Paneli', items: ['Profil oluşturma', 'Hizmet ekleme', 'Sipariş yönetimi', 'Portföy yükleme'] },
  { title: 'Güvenlik ve Gizlilik', items: ['Hesap güvenliği', 'Kişisel veriler', 'Çerez politikası', 'KVKK başvuruları'] },
]

export default function YardimPage() {
  return (
    <div className="min-h-screen bg-nature-bg">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex items-center gap-2 text-xs text-dark-forest/40 mb-6">
          <Link href="/" className="hover:text-dark-forest/60 transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <span className="text-dark-forest/60">Yardım Merkezi</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bright-green to-lime flex items-center justify-center">
            <HelpCircle size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-forest">Yardım Merkezi</h1>
            <p className="text-sm text-dark-forest/50">Sık sorulan sorular ve destek kaynakları</p>
          </div>
        </div>

        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-forest/40" />
          <input type="text" placeholder="Yardım konusu ara..."
            className="w-full bg-white border border-nature-border rounded-xl pl-10 pr-4 py-3.5 text-sm text-dark-forest outline-none focus:border-bright-green/50 focus:shadow-md transition-all placeholder:text-dark-forest/30" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="bg-white rounded-2xl border border-nature-border p-6 shadow-sm">
              <h3 className="font-bold text-dark-forest text-sm mb-3">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item}>
                    <Link href="/sss"
                      className="flex items-center gap-2 text-xs text-dark-forest/60 hover:text-dark-forest transition-colors">
                      <ChevronRight size={10} className="text-bright-green shrink-0" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-br from-bright-green/5 to-lime/5 border border-bright-green/10 rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-dark-forest mb-1">İhtiyacın olan cevabı bulamadın mı?</p>
          <p className="text-xs text-dark-forest/50 mb-4">Destek ekibimiz sana yardımcı olmaktan mutluluk duyacaktır.</p>
          <Link href="/iletisim"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark-forest text-white text-xs font-bold rounded-[50px] hover:opacity-90 transition-all">
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </div>
  )
}
