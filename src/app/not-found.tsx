import Link from 'next/link'
import { Compass, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-nature-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex p-5 bg-white rounded-2xl border border-nature-border shadow-sm mb-8">
          <Compass size={48} className="text-dark-forest/30" />
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-dark-forest mb-2">404</h1>
        <p className="text-xl font-bold text-dark-forest mb-2">Sayfa Bulunamadı</p>
        <p className="text-sm text-dark-forest/50 mb-8 max-w-xs mx-auto">
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olmuş olabilir.
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-dark-forest text-white text-sm font-bold rounded-[50px] hover:opacity-90 transition-all shadow-sm">
          <ArrowLeft size={16} />
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
}
