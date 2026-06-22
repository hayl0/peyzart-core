import { MessageCircle, ChevronRight, Mail, Phone, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

const CONTACT_ITEMS = [
  { icon: Mail, label: 'E-posta', value: 'destek@peyzart.com', desc: 'Genel sorularınız için bize e-posta gönderin.' },
  { icon: Phone, label: 'Telefon', value: '+90 (212) 555 0 555', desc: 'Hafta içi 09:00 - 18:00 arası bizi arayın.' },
  { icon: MapPin, label: 'Adres', value: 'İstanbul, Türkiye', desc: 'Merkez ofisimizi ziyaret edin.' },
  { icon: Clock, label: 'Çalışma Saatleri', value: 'Hafta içi 09:00 - 18:00', desc: 'Cumartesi 10:00 - 16:00, Pazar kapalı.' },
]

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-nature-bg">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex items-center gap-2 text-xs text-dark-forest/40 mb-6">
          <Link href="/" className="hover:text-dark-forest/60 transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <span className="text-dark-forest/60">İletişim</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bright-green to-lime flex items-center justify-center">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-forest">İletişim</h1>
            <p className="text-sm text-dark-forest/50">Bizimle iletişime geçin</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {CONTACT_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="bg-white rounded-2xl border border-nature-border p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-nature-bg flex items-center justify-center mb-4">
                  <Icon size={20} className="text-bright-green" />
                </div>
                <h3 className="font-bold text-dark-forest text-sm mb-1">{item.label}</h3>
                <p className="text-sm font-semibold text-dark-forest mb-1">{item.value}</p>
                <p className="text-xs text-dark-forest/50">{item.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-2xl border border-nature-border p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-dark-forest mb-4">Bize Mesaj Gönderin</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Adınız"
                className="w-full bg-nature-bg border border-nature-border rounded-[14px] px-4 py-3 text-sm text-dark-forest outline-none focus:border-bright-green/50 transition-all placeholder:text-dark-forest/30" />
              <input type="email" placeholder="E-posta adresiniz"
                className="w-full bg-nature-bg border border-nature-border rounded-[14px] px-4 py-3 text-sm text-dark-forest outline-none focus:border-bright-green/50 transition-all placeholder:text-dark-forest/30" />
            </div>
            <input type="text" placeholder="Konu"
              className="w-full bg-nature-bg border border-nature-border rounded-[14px] px-4 py-3 text-sm text-dark-forest outline-none focus:border-bright-green/50 transition-all placeholder:text-dark-forest/30" />
            <textarea rows={4} placeholder="Mesajınız..."
              className="w-full bg-nature-bg border border-nature-border rounded-[14px] px-4 py-3 text-sm text-dark-forest outline-none focus:border-bright-green/50 transition-all placeholder:text-dark-forest/30 resize-none" />
            <button
              className="px-6 py-3 bg-dark-forest text-white text-sm font-bold rounded-[14px] hover:opacity-90 transition-all shadow-sm">
              Mesajı Gönder
            </button>
          </div>
          <p className="text-[11px] text-dark-forest/40 mt-4">
            Mesajınız en kısa sürede yanıtlanacaktır. Acil durumlarda telefonla iletişime geçiniz.
          </p>
        </div>
      </div>
    </div>
  )
}
