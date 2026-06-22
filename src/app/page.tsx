import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Mail, Phone, MapPin, Camera, Globe, Hash, Play, ExternalLink, ArrowRight, Search, Shield, Sparkles, Compass } from 'lucide-react'

const STATS = [
  { icon: Shield, value: '500+', label: 'Uzman Profesyonel' },
  { icon: Compass, value: '2.5K+', label: 'Tamamlanan İş' },
  { icon: Sparkles, value: '98%', label: 'Müşteri Memnuniyeti' },
]

const CATEGORY_TILES = [
  { emoji: '🌿', name: 'Bahçe & Peyzaj', slug: 'bahce-peyzaj', desc: 'Peyzaj tasarımı, çim, bitki', gradient: 'from-emerald-600 to-green-500', icon: 'Trees' },
  { emoji: '🧹', name: 'Temizlik', slug: 'temizlik', desc: 'Ev, ofis, halı, klima', gradient: 'from-cyan-500 to-blue-400', icon: 'Wind' },
  { emoji: '🔧', name: 'Tadilat', slug: 'tadilat', desc: 'İç mekan, banyo, mutfak', gradient: 'from-amber-600 to-orange-500', icon: 'Wrench' },
  { emoji: '🎨', name: 'Boya & Badana', slug: 'boya-badana', desc: 'İç cephe, dış cephe, dekoratif', gradient: 'from-rose-500 to-pink-500', icon: 'Paintbrush' },
  { emoji: '⚡', name: 'Elektrik', slug: 'elektrik', desc: 'Tesisat, arıza, montaj', gradient: 'from-yellow-500 to-amber-400', icon: 'Zap' },
  { emoji: '🔩', name: 'Tesisat', slug: 'tesisat', desc: 'Su, doğalgaz, tamirat', gradient: 'from-sky-600 to-blue-500', icon: 'Droplets' },
  { emoji: '🏊', name: 'Havuz', slug: 'havuz', desc: 'Bakım, onarım, ekipman', gradient: 'from-teal-500 to-cyan-400', icon: 'PenTool' },
  { emoji: '🏗️', name: 'Dış Cephe', slug: 'dis-cephe', desc: 'Kaplama, izolasyon, cephe', gradient: 'from-stone-600 to-stone-500', icon: 'Home' },
]

const FOOTER_LINKS = [
  {
    title: 'Hizmetler',
    links: [
      { label: 'Bahçe & Peyzaj', href: '/kesfet?kategori=bahce-peyzaj' },
      { label: 'Temizlik', href: '/kesfet?kategori=temizlik' },
      { label: 'Tadilat', href: '/kesfet?kategori=tadilat' },
      { label: 'Boya & Badana', href: '/kesfet?kategori=boya-badana' },
      { label: 'Elektrik', href: '/kesfet?kategori=elektrik' },
      { label: 'Tesisat', href: '/kesfet?kategori=tesisat' },
    ],
  },
  {
    title: 'Kurumsal',
    links: [
      { label: 'Hakkımızda', href: '/hakkimizda' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kariyer', href: '/kariyer' },
      { label: 'İletişim', href: '/iletisim' },
      { label: 'Profesyonel Ol', href: '/register/landscaper' },
    ],
  },
  {
    title: 'Destek',
    links: [
      { label: 'Yardım Merkezi', href: '/yardim' },
      { label: 'Kullanım Şartları', href: '/kosullar' },
      { label: 'Gizlilik Politikası', href: '/gizlilik' },
      { label: 'Çerez Politikası', href: '/cerezler' },
      { label: 'Sıkça Sorulan Sorular', href: '/sss' },
    ],
  },
]

export default function LandingPage() {
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

      <section className="relative px-6 md:px-12 max-w-7xl mx-auto pt-10 md:pt-20 pb-20 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-bright-green/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-lime/6 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] right-[15%] w-[30vw] h-[30vw] bg-accent-purple/5 rounded-full blur-[100px]" />
        </div>

        <div>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-bright-green/10 border border-bright-green/20 rounded-full px-4 py-1.5 mb-6">
                <Sparkles size={12} className="text-bright-green" />
                <span className="text-[10px] font-semibold text-dark-forest/60 uppercase tracking-widest">Tüm Hizmetler Tek Platformda</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-dark-forest leading-[1.05] tracking-tight mb-6">
                Profesyonel Hizmet,<br />
                <span className="bg-gradient-to-r from-bright-green via-medium-green to-lime bg-clip-text text-transparent">Güvenilir Ustalar</span>
              </h1>

              <p className="text-lg md:text-xl text-dark-forest/60 max-w-xl mb-8 leading-relaxed">
                Bahçe düzenlemeden ev tadilatına, havuz bakımından dış cepheye kadar tüm hizmetler için uzman bulun.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-bright-green to-medium-green text-white font-bold text-sm rounded-[50px] shadow-xl shadow-bright-green/25 hover:shadow-bright-green/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Ücretsiz Kayıt Ol
                  <ArrowRight size={16} />
                </Link>
                <Link href="/kesfet"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-nature-border text-dark-forest font-bold text-sm rounded-[50px] hover:border-bright-green/40 hover:shadow-lg transition-all">
                  <Search size={16} />
                  Hizmetleri Keşfet
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-lg">
                {STATS.map(s => (
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

            <div className="flex-1 max-w-lg w-full">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-bright-green/8 via-accent-purple/5 to-lime/8 rounded-[32px] blur-2xl" />
                <div className="relative rounded-[20px] overflow-hidden shadow-xl bg-white/5 backdrop-blur border border-white/20">
                  <Image
                    src="/images/hero-service.jpg"
                    alt="Profesyonel hizmet"
                    width={600}
                    height={500}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/40 via-black/5 to-transparent">
                    <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                      <Shield size={14} className="text-white/80" />
                      <span className="text-xs font-semibold text-white/80">Güvenilir Profesyoneller</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white/80 backdrop-blur-md border border-white/60 rounded-xl px-4 py-2.5 shadow-md hidden md:block">
                  <p className="text-xs font-bold text-dark-forest">⭐ 4.9 Ortalama Puan</p>
                  <p className="text-[10px] text-dark-forest/50">2,500+ tamamlanan iş</p>
                </div>
                <div className="absolute -top-3 -right-3 bg-white/80 backdrop-blur-md border border-white/60 rounded-full px-3.5 py-1.5 shadow-md hidden md:block">
                  <div className="flex items-center gap-1">
                    <Sparkles size={11} className="text-bright-green" />
                    <span className="text-xs font-bold text-dark-forest">Hızlı & Güvenilir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-forest mb-3">Tüm Hizmetlerimiz</h2>
            <p className="text-dark-forest/60">Bahçeden eve, havuzdan dış cepheye tüm ihtiyaçlar tek platformda</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {CATEGORY_TILES.map((cat) => (
              <Link key={cat.slug} href={`/kesfet?kategori=${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white border border-nature-border hover:shadow-xl hover:border-bright-green/30 transition-all duration-300">
                <div className={`h-28 md:h-36 bg-gradient-to-br ${cat.gradient} flex items-center justify-center relative`}>
                  <span className="text-4xl md:text-5xl">{cat.emoji}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-dark-forest text-sm md:text-base mb-0.5">{cat.name}</h3>
                  <p className="text-xs text-dark-forest/50">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-forest mb-3">Bizi Takip Edin</h2>
            <p className="text-dark-forest/60">Sosyal medyada Peyzart topluluğuna katılın</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Instagram', username: '@peyzart', color: 'from-pink-500 to-purple-600', bg: 'bg-gradient-to-br from-pink-50 to-purple-50' },
              { name: 'Twitter', username: '@peyzart', color: 'from-blue-400 to-blue-600', bg: 'bg-gradient-to-br from-blue-50 to-sky-50' },
              { name: 'Facebook', username: '/peyzart', color: 'from-blue-600 to-blue-800', bg: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
              { name: 'YouTube', username: 'Peyzart TV', color: 'from-red-500 to-red-700', bg: 'bg-gradient-to-br from-red-50 to-rose-50' },
              { name: 'LinkedIn', username: '/company/peyzart', color: 'from-blue-700 to-blue-900', bg: 'bg-gradient-to-br from-blue-50 to-sky-50' },
            ].map(s => (
              <a key={s.name} href="#"
                className={`${s.bg} rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 border border-white/60`}>
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}>
                  <span className="text-white text-lg font-bold">{s.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-dark-forest text-sm">{s.name}</p>
                  <p className="text-xs text-dark-forest/50">{s.username}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-forest">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Profesyonel misin?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Binlerce potansiyel müşteriye ulaş, işini büyüt. Profesyonel panelinle tüm siparişlerini ve portföyünü yönet.
          </p>
          <Link href="/register/landscaper"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-bright-green to-lime text-dark-forest font-bold text-sm rounded-[50px] shadow-xl shadow-bright-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Profesyonel Olarak Katıl
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="bg-[#0a1a0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <div className="logo-gradient text-2xl mb-4">Peyzart</div>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
                Peyzart, profesyonel hizmet sağlayıcıları ile müşterileri bir araya getiren Türkiye&apos;nin lider hizmet platformudur. 
                Bahçe düzenlemeden ev tadilatına, temizlikten havuz bakımına kadar geniş hizmet yelpazesiyle, 
                güvenilir ve kaliteli hizmeti tek tıkla ayağınıza getiriyoruz.
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Mail size={13} />
                  <span>destek@peyzart.com</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Phone size={13} />
                  <span>+90 (212) 555 0 555</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <MapPin size={13} />
                  <span>İstanbul, Türkiye</span>
                </div>
              </div>
            </div>

            {FOOTER_LINKS.map(col => (
              <div key={col.title}>
                <h4 className="text-white font-bold text-sm mb-4">{col.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <Link href={link.href}
                        className="text-white/40 hover:text-white/70 text-xs transition-colors flex items-center gap-1">
                        <ChevronRight size={10} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/30 font-semibold">
              &copy; {new Date().getFullYear()} Peyzart. Tüm hakları saklıdır. | 
              Profesyonel Hizmet Platformu
            </p>
            <div className="flex items-center gap-3">
              {[Camera, Globe, Hash, Play, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors">
                  <Icon size={13} className="text-white/40 hover:text-white/70 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
