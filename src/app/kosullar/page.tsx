import { FileText, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const SECTIONS = [
  {
    title: '1. Taraflar ve Kapsam',
    content: 'İşbu Kullanım Koşulları ("Koşullar"), Peyzart platformunu ("Peyzart", "biz", "bizim") kullanan tüm kullanıcılar ("Kullanıcı", "siz") için geçerlidir. Platformu kullanarak bu koşulları kabul etmiş sayılırsınız.',
  },
  {
    title: '2. Hizmet Tanımı',
    content: 'Peyzart, profesyonel hizmet sağlayıcıları ile hizmet almak isteyen müşterileri bir araya getiren çevrimiçi bir platformdur. Platform üzerinden bahçe düzenleme, temizlik, tadilat, boya, elektrik, tesisat, havuz bakımı ve dış cephe gibi çeşitli kategorilerde hizmetler sunulmaktadır.',
  },
  {
    title: '3. Kullanıcı Hesapları',
    content: 'Platformu kullanabilmek için hesap oluşturmanız gerekmektedir. Hesap oluştururken:',
    items: [
      'Doğru, güncel ve eksiksiz bilgi vermekle yükümlüsünüz',
      'Hesap bilgilerinizin gizliliğinden siz sorumlusunuz',
      'Hesabınızda gerçekleşen tüm işlemlerden siz sorumlusunuz',
      'Herhangi bir güvenlik ihlalini derhal bize bildirmelisiniz',
      'Birden fazla hesap açmak yasaktır',
    ],
  },
  {
    title: '4. Hizmet Sağlayıcı Koşulları',
    content: 'Platformda hizmet sağlayıcı ("Profesyonel") olarak kaydolan kullanıcılar aşağıdaki koşulları kabul eder:',
    items: [
      'Sunduğunuz hizmetlerin doğru ve güncel bilgilerini paylaşmakla yükümlüsünüz',
      'Tüm yasal izin, lisans ve sertifikalara sahip olmalısınız',
      'Verdiğiniz hizmetlerin kalitesinden ve zamanında tesliminden siz sorumlusunuz',
      'Müşterilerle yapılan anlaşmalara uymak zorundasınız',
      'Platform komisyon ve hizmet bedellerini zamanında ödemelisiniz',
      'Müşteri memnuniyetini ön planda tutmalı, profesyonel davranmalısınız',
    ],
  },
  {
    title: '5. Müşteri Koşulları',
    content: 'Platformda hizmet alan kullanıcılar ("Müşteri") aşağıdaki koşulları kabul eder:',
    items: [
      'Talep ettiğiniz hizmetlerin doğru bilgilerini sağlamalısınız',
      'Hizmet sağlayıcı ile mutabık kalınan ödeme koşullarına uymalısınız',
      'Hizmet sağlayıcıya saygılı ve profesyonel davranmalısınız',
      'Yorum ve değerlendirmeleriniz dürüst ve objektif olmalıdır',
      'Hizmet iptal ve değişikliklerini zamanında bildirmelisiniz',
    ],
  },
  {
    title: '6. Ödemeler ve Ücretler',
    content: 'Platform üzerinden gerçekleştirilen ödemelerle ilgili koşullar:',
    items: [
      'Hizmet bedelleri, hizmet sağlayıcı ile müşteri arasında belirlenir',
      'Ödemeler platform üzerinden güvenli bir şekilde gerçekleştirilir',
      'İptal ve iade politikaları, hizmet türüne göre değişiklik gösterebilir',
      'Platform, sunduğu hizmetler karşılığında belirlenen komisyon oranlarını uygulama hakkını saklı tutar',
      'Tüm ücretler Türk Lirası (TRY) olarak belirtilmiştir',
    ],
  },
  {
    title: '7. Fikri Mülkiyet',
    content: 'Platformda yer alan tüm içerik, logo, tasarım, yazılım ve diğer materyallerin fikri mülkiyet hakları Peyzart\'a aittir. Kullanıcılar, bu materyalleri izinsiz kullanamaz, çoğaltamaz, dağıtamaz veya ticari amaçla kullanamaz.',
  },
  {
    title: '8. Sorumluluk Reddi',
    content: 'Peyzart, platform üzerinden sunulan hizmetlerin kalitesi, zamanında teslimi veya hizmet sağlayıcıların performansı konusunda doğrudan sorumluluk kabul etmez. Platform, yalnızca hizmet sağlayıcılar ile müşterileri bir araya getiren bir aracı konumundadır.',
  },
  {
    title: '9. Yasaklanmış Faaliyetler',
    content: 'Platform üzerinde aşağıdaki faaliyetler kesinlikle yasaktır:',
    items: [
      'Yasa dışı veya hileli faaliyetlerde bulunmak',
      'Başka kullanıcıların hesaplarına yetkisiz erişim sağlamaya çalışmak',
      'Platforma veya diğer kullanıcılara zarar verecek yazılım veya kod kullanmak',
      'Yanıltıcı veya sahte bilgi paylaşmak',
      'Başka kullanıcıları taciz etmek veya rahatsız etmek',
      'Platformun işleyişini bozmaya yönelik faaliyetlerde bulunmak',
    ],
  },
  {
    title: '10. Hesap Feshi',
    content: 'Peyzart, bu koşulları ihlal ettiğiniz takdirde hesabınızı askıya alma veya sonlandırma hakkını saklı tutar. Ayrıca, herhangi bir sebeple hesabınızı istediğiniz zaman sonlandırabilirsiniz. Hesap sonlandırıldığında, bu koşullar kapsamındaki yükümlülükleriniz sona ermez.',
  },
  {
    title: '11. Uyuşmazlık Çözümü',
    content: 'İşbu koşullardan doğan uyuşmazlıklarda İstanbul (Çağlayan) Adliyesi mahkemeleri ve icra daireleri yetkilidir. Uyuşmazlıkların çözümünde Türkiye Cumhuriyeti kanunları uygulanır.',
  },
  {
    title: '12. Değişiklikler',
    content: 'Peyzart, bu kullanım koşullarını önceden bildirim yapmaksızın değiştirme hakkını saklı tutar. Değişiklikler, platformda yayınlandığı andan itibaren geçerlidir. Platformu kullanmaya devam etmeniz, güncellenen koşulları kabul ettiğiniz anlamına gelir.',
  },
  {
    title: '13. İletişim',
    content: 'Kullanım koşulları hakkında soru, görüş ve talepleriniz için bizimle iletişime geçebilirsiniz:',
    contact: true,
  },
]

export default function KosullarPage() {
  return (
    <div className="min-h-screen bg-nature-bg">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex items-center gap-2 text-xs text-dark-forest/40 mb-6">
          <Link href="/" className="hover:text-dark-forest/60 transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <span className="text-dark-forest/60">Kullanım Koşulları</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-forest">Kullanım Koşulları</h1>
            <p className="text-sm text-dark-forest/50">Son güncelleme: Haziran 2026</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-nature-border p-6 md:p-10 space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-dark-forest mb-3">{section.title}</h2>
              <p className="text-sm text-dark-forest/70 leading-relaxed mb-3">{section.content}</p>
              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-dark-forest/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-dark-forest/30 shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.contact && (
                <div className="bg-nature-bg rounded-xl p-4 mt-3 space-y-1">
                  <p className="text-sm text-dark-forest/70"><strong>E-posta:</strong> destek@peyzart.com</p>
                  <p className="text-sm text-dark-forest/70"><strong>Adres:</strong> İstanbul, Türkiye</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
