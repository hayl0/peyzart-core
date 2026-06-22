import { Shield, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const SECTIONS = [
  {
    title: '1. Veri Sorumlusu',
    content: 'Peyzart ("Peyzart", "biz", "bizim") olarak, kişisel verilerinizin güvenliğine önem veriyoruz. İşbu Gizlilik Politikası, Peyzart platformunu kullanırken toplanan, işlenen ve paylaşılan kişisel verilerinize ilişkin bilgilendirme amacı taşımaktadır.',
  },
  {
    title: '2. Hangi Verileri Topluyoruz?',
    content: 'Platformumuzu kullanırken aşağıdaki kişisel verileriniz toplanabilir:',
    items: [
      'Kimlik Bilgileri: Ad, soyad, kullanıcı adı',
      'İletişim Bilgileri: E-posta adresi, telefon numarası, adres',
      'Hesap Bilgileri: Kullanıcı şifresi (şifrelenmiş olarak saklanır), profil fotoğrafı',
      'Konum Bilgileri: Yakınınızdaki hizmet sağlayıcıları bulabilmeniz için yaklaşık konum verileri',
      'Kullanım Verileri: Platformda gerçekleştirdiğiniz işlemler, hizmet tercihleri, değerlendirmeler',
      'Cihaz Bilgileri: IP adresi, tarayıcı türü, işletim sistemi bilgileri',
    ],
  },
  {
    title: '3. Verilerinizi Nasıl Kullanıyoruz?',
    content: 'Topladığımız kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:',
    items: [
      'Hesap oluşturma ve yönetimi',
      'Hizmet sağlayıcıları ile müşterileri eşleştirme',
      'Ödeme işlemlerinin gerçekleştirilmesi',
      'Kullanıcı desteği ve iletişim',
      'Platform güvenliğinin sağlanması',
      'Yasal yükümlülüklerin yerine getirilmesi',
      'Hizmet kalitesinin artırılması ve analiz',
    ],
  },
  {
    title: '4. Verilerinizin Saklanması',
    content: 'Kişisel verileriniz, KVKK ve ilgili mevzuata uygun olarak, işlenme amaçları için gerekli olan süre boyunca güvenli bir şekilde saklanır. Saklama süresi sona eren veriler, periyodik imha politikalarımız kapsamında silinir, yok edilir veya anonim hale getirilir.',
  },
  {
    title: '5. Verilerinizin Paylaşılması',
    content: 'Kişisel verileriniz, açık rızanız olmaksızın üçüncü kişilerle paylaşılmaz. Ancak aşağıdaki durumlarda verileriniz paylaşılabilir:',
    items: [
      'Hukuki yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu kurum ve kuruluşları ile',
      'Hizmet sağlayıcıları ile iletişim kurabilmeniz için gerekli bilgiler (ad, telefon)',
      'Ödeme işlemlerinin gerçekleştirilmesi için entegre ödeme kuruluşları ile',
      'Açık rızanız doğrultusunda belirlediğiniz diğer durumlar',
    ],
  },
  {
    title: '6. Veri Güvenliği',
    content: 'Kişisel verilerinizin güvenliği için gerekli teknik ve idari tedbirleri almaktayız. Verileriniz, SSL/TLS şifreleme teknolojisi ile korunmakta, yetkisiz erişime karşı güvenlik duvarları ve erişim kontrolleri ile muhafaza edilmektedir.',
  },
  {
    title: '7. Kullanıcı Hakları',
    content: 'KVKK kapsamında aşağıdaki haklara sahipsiniz:',
    items: [
      'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
      'İşlenmişse buna ilişkin bilgi talep etme',
      'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
      'Yurt içinde / yurt dışında aktarıldığı üçüncü kişileri bilme',
      'Eksik / yanlış işlenmişse düzeltilmesini isteme',
      'KVKK 7. maddede belirtilen şartlar çerçevesinde silinmesini / yok edilmesini isteme',
      'İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesine itiraz etme',
      'Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme',
    ],
  },
  {
    title: '8. Çerezler (Cookies)',
    content: 'Platformumuz, kullanıcı deneyimini iyileştirmek ve hizmet kalitemizi artırmak amacıyla çerezler kullanmaktadır. Çerez tercihlerinizi tarayıcı ayarlarından yönetebilirsiniz. Detaylı bilgi için Çerez Politikamızı inceleyebilirsiniz.',
  },
  {
    title: '9. Değişiklikler',
    content: 'İşbu Gizlilik Politikası, yasal düzenlemelere ve platform ihtiyaçlarına göre güncellenebilir. Değişiklikler, güncel politikanın platformumuzda yayınlanmasıyla birlikte yürürlüğe girer.',
  },
  {
    title: '10. İletişim',
    content: 'Kişisel verilerinizle ilgili soru, görüş ve talepleriniz için bizimle iletişime geçebilirsiniz:',
    contact: true,
  },
]

export default function GizlilikPage() {
  return (
    <div className="min-h-screen bg-nature-bg">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex items-center gap-2 text-xs text-dark-forest/40 mb-6">
          <Link href="/" className="hover:text-dark-forest/60 transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <span className="text-dark-forest/60">Gizlilik Politikası</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bright-green to-lime flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-forest">Gizlilik Politikası</h1>
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
                      <span className="w-1.5 h-1.5 rounded-full bg-bright-green shrink-0 mt-1.5" />
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
