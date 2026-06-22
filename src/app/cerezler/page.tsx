import { Cookie, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const SECTIONS = [
  {
    title: '1. Çerez Nedir?',
    content: 'Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınızda depolanan küçük metin dosyalarıdır. Bu dosyalar, siteyi tekrar ziyaret ettiğinizde sizi tanımamıza ve tercihlerinizi hatırlamamıza yardımcı olur.',
  },
  {
    title: '2. Kullandığımız Çerez Türleri',
    items: [
      'Zorunlu Çerezler: Platformun düzgün çalışması için gerekli olan temel çerezlerdir. Oturum yönetimi ve güvenlik amaçlı kullanılır.',
      'İşlevsel Çerezler: Tercihlerinizi hatırlayarak size daha iyi bir kullanıcı deneyimi sunar.',
      'Analitik Çerezler: Platform kullanımını analiz ederek hizmet kalitemizi artırmamıza yardımcı olur.',
      'Reklam ve Pazarlama Çerezleri: İlgi alanlarınıza göre kişiselleştirilmiş içerik ve reklamlar sunmak için kullanılır.',
    ],
  },
  {
    title: '3. Hangi Amaçla Kullanıyoruz?',
    content: 'Çerezleri aşağıdaki amaçlarla kullanmaktayız:',
    items: [
      'Platformun güvenli ve düzgün çalışmasını sağlamak',
      'Oturum bilgilerinizi yönetmek ve kimlik doğrulaması yapmak',
      'Tercihlerinizi hatırlayarak size kişiselleştirilmiş bir deneyim sunmak',
      'Platform kullanım istatistiklerini analiz etmek',
      'Hizmet kalitemizi ve kullanıcı deneyimini iyileştirmek',
    ],
  },
  {
    title: '4. Üçüncü Taraf Çerezler',
    content: 'Platformumuzda aşağıdaki üçüncü taraf hizmet sağlayıcıların çerezleri kullanılabilir:',
    items: [
      'Google Analytics: Kullanım istatistiklerini analiz etmek için',
      'Firebase: Kimlik doğrulama ve push bildirimleri için',
      'Sosyal Medya: İçerik paylaşım butonları için',
    ],
  },
  {
    title: '5. Çerezleri Nasıl Yönetebilirsiniz?',
    content: 'Çerez tercihlerinizi tarayıcı ayarlarından istediğiniz zaman değiştirebilirsiniz. Çerezleri devre dışı bırakmanız durumunda platformun bazı özellikleri düzgün çalışmayabilir.',
    items: [
      'Chrome: Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler',
      'Firefox: Tercihler &gt; Gizlilik & Güvenlik &gt; Çerezler',
      'Safari: Tercihler &gt; Gizlilik &gt; Çerezler',
      'Edge: Ayarlar &gt; Site İzinleri &gt; Çerezler',
    ],
  },
  {
    title: '6. Değişiklikler',
    content: 'İşbu Çerez Politikası, yasal düzenlemelere ve platform ihtiyaçlarına göre güncellenebilir. Değişiklikler, güncel politikanın platformumuzda yayınlanmasıyla birlikte yürürlüğe girer.',
  },
  {
    title: '7. İletişim',
    content: 'Çerez politikamız hakkında soru ve talepleriniz için bizimle iletişime geçebilirsiniz:',
    contact: true,
  },
]

export default function CerezlerPage() {
  return (
    <div className="min-h-screen bg-nature-bg">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex items-center gap-2 text-xs text-dark-forest/40 mb-6">
          <Link href="/" className="hover:text-dark-forest/60 transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <span className="text-dark-forest/60">Çerez Politikası</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bright-green to-lime flex items-center justify-center">
            <Cookie size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-forest">Çerez Politikası</h1>
            <p className="text-sm text-dark-forest/50">Son güncelleme: Haziran 2026</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-nature-border p-6 md:p-10 space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-dark-forest mb-3">{section.title}</h2>
              {section.content && (
                <p className="text-sm text-dark-forest/70 leading-relaxed mb-3">{section.content}</p>
              )}
              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-dark-forest/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-bright-green shrink-0 mt-1.5" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
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
