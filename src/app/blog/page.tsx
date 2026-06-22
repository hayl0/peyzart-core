import { BookOpen, ChevronRight, ArrowRight, Calendar, User } from 'lucide-react'
import Link from 'next/link'

const POSTS = [
  {
    title: 'Bahçe Peyzajında 2026 Trendleri',
    excerpt: 'Sürdürülebilir bahçe tasarımı, su tasarruflu bitkilendirme ve akıllı sulama sistemleri ile bahçenizi geleceğe hazırlayın.',
    date: '15 Haziran 2026',
    author: 'Peyzart Ekibi',
    gradient: 'from-emerald-600 to-green-500',
  },
  {
    title: 'Ev Tadilatında Dikkat Edilmesi Gerekenler',
    excerpt: 'Bütçe planlamasından malzeme seçimine, ev tadilatı sürecinde bilmeniz gereken tüm püf noktaları.',
    date: '8 Haziran 2026',
    author: 'Peyzart Ekibi',
    gradient: 'from-amber-600 to-orange-500',
  },
  {
    title: 'Havuz Bakımı İçin Pratik İpuçları',
    excerpt: 'Yaz sezonuna girmeden havuz bakımınızı ihmal etmeyin. pH dengesinden filtre temizliğine her şey bu yazıda.',
    date: '1 Haziran 2026',
    author: 'Peyzart Ekibi',
    gradient: 'from-teal-500 to-cyan-400',
  },
  {
    title: 'Profesyonel Hizmet Alırken Nelere Dikkat Etmeli?',
    excerpt: 'Doğru profesyoneli seçmek için puanlama, yorumlar, portföy ve iletişim gibi kriterleri nasıl değerlendirmelisiniz?',
    date: '25 Mayıs 2026',
    author: 'Peyzart Ekibi',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    title: 'Kışa Hazırlık: Ev ve Bahçe Bakımı',
    excerpt: 'Kış ayları öncesinde evinizde ve bahçenizde yapmanız gereken bakım çalışmaları hakkında kapsamlı rehber.',
    date: '18 Mayıs 2026',
    author: 'Peyzart Ekibi',
    gradient: 'from-sky-600 to-blue-500',
  },
  {
    title: 'Dış Cephe Kaplama Seçenekleri ve Avantajları',
    excerpt: 'Mantolama, ahşap kaplama, taş kaplama ve daha fazlası — dış cephe yenileme seçeneklerini karşılaştırın.',
    date: '10 Mayıs 2026',
    author: 'Peyzart Ekibi',
    gradient: 'from-stone-600 to-stone-500',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-nature-bg">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex items-center gap-2 text-xs text-dark-forest/40 mb-6">
          <Link href="/" className="hover:text-dark-forest/60 transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <span className="text-dark-forest/60">Blog</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bright-green to-lime flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-forest">Blog</h1>
            <p className="text-sm text-dark-forest/50">İpuçları, trendler ve rehberler</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.map((post) => (
            <article key={post.title}
              className="bg-white rounded-2xl border border-nature-border overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className={`h-40 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                <BookOpen size={36} className="text-white/60" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-[10px] text-dark-forest/40 mb-2">
                  <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
                  <span className="flex items-center gap-1"><User size={10} />{post.author}</span>
                </div>
                <h3 className="font-bold text-dark-forest text-sm leading-snug mb-2 group-hover:text-bright-green transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-dark-forest/60 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-bright-green group-hover:gap-2 transition-all">
                  Devamını Oku <ArrowRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
