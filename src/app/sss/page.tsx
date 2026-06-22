import { HelpCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const FAQS = [
  { q: 'Peyzart nedir?', a: 'Peyzart, profesyonel hizmet sağlayıcıları ile müşterileri bir araya getiren çevrimiçi bir platformdur. Bahçe düzenlemeden ev tadilatına, temizlikten havuz bakımına kadar geniş bir hizmet yelpazesinde uzman bulmanızı sağlar.' },
  { q: 'Peyzart ücretsiz mi?', a: 'Müşteriler için kayıt ve hizmet arama tamamen ücretsizdir. Profesyoneller için ise üyelik planları bulunmaktadır.' },
  { q: 'Nasıl hesap oluşturabilirim?', a: 'Ana sayfadaki "Kayıt Ol" butonuna tıklayarak e-posta adresiniz ve şifrenizle kolayca hesap oluşturabilirsiniz. Ayrıca Google hesabınızla da giriş yapabilirsiniz.' },
  { q: 'Hizmet sağlayıcılara nasıl ulaşabilirim?', a: 'İhtiyacınız olan hizmeti Keşfet sayfasından bulabilir, profil sayfasından iletişim bilgilerini görebilir ve doğrudan mesaj gönderebilirsiniz.' },
  { q: 'Ödeme nasıl yapılıyor?', a: 'Ödemeler platform üzerinden güvenli bir şekilde gerçekleştirilir. Kredi kartı, banka kartı ve havale seçenekleri mevcuttur.' },
  { q: 'İptal ve iade politikası nedir?', a: 'Hizmet başlamadan önce yapılan iptallerde ücret iadesi sağlanır. Hizmet başladıktan sonraki iptaller, hizmet sağlayıcı ile yapılan anlaşmaya bağlıdır.' },
  { q: 'Profesyonel olarak nasıl katılabilirim?', a: '"Profesyonel Ol" sayfasından başvuru yapabilirsiniz. Kimlik doğrulaması ve referans kontrollerinin ardından platformda hizmet vermeye başlayabilirsiniz.' },
  { q: 'Kullanıcı bilgilerim güvende mi?', a: 'Evet, tüm kişisel verileriniz KVKK kapsamında korunmakta ve SSL şifreleme ile güvence altına alınmaktadır. Detaylı bilgi için Gizlilik Politikamızı inceleyebilirsiniz.' },
  { q: 'Müşteri hizmetlerine nasıl ulaşırım?', a: 'İletişim sayfamızdaki formu doldurarak veya destek@peyzart.com adresine e-posta göndererek bizimle iletişime geçebilirsiniz.' },
  { q: 'Hizmet garantisi veriyor musunuz?', a: 'Platformumuzdaki tüm profesyoneller kimlik doğrulamasından geçmektedir. Ancak yaşanabilecek anlaşmazlıklarda tarafımıza bildirim yapmanız halinde çözüm sürecinde size destek oluruz.' },
]

export default function SSSPage() {
  return (
    <div className="min-h-screen bg-nature-bg">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex items-center gap-2 text-xs text-dark-forest/40 mb-6">
          <Link href="/" className="hover:text-dark-forest/60 transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <span className="text-dark-forest/60">Sıkça Sorulan Sorular</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bright-green to-lime flex items-center justify-center">
            <HelpCircle size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-forest">Sıkça Sorulan Sorular</h1>
            <p className="text-sm text-dark-forest/50">Merak edilenler ve cevapları</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-nature-border divide-y divide-nature-border shadow-sm">
          {FAQS.map((faq, i) => (
            <details key={i} className="group p-5 md:p-6">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-sm font-bold text-dark-forest pr-4 group-open:text-bright-green transition-colors">
                  {faq.q}
                </span>
                <ChevronRight size={16} className="text-dark-forest/30 shrink-0 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-dark-forest/70 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-nature-border p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-dark-forest mb-1">Başka bir sorunuz mu var?</p>
          <p className="text-xs text-dark-forest/50 mb-4">Size yardımcı olmaktan mutluluk duyarız.</p>
          <Link href="/iletisim"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark-forest text-white text-xs font-bold rounded-[50px] hover:opacity-90 transition-all">
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </div>
  )
}
