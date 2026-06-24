'use client';

import { motion } from 'framer-motion';

const categories = [
  { emoji: '🌿', name: 'Bahçe & Peyzaj' },
  { emoji: '✨', name: 'Temizlik' },
  { emoji: '🎨', name: 'Boya & Badana' },
  { emoji: '🔧', name: 'Tadilat & Onarım' },
  { emoji: '⚡', name: 'Elektrik' },
  { emoji: '🔩', name: 'Tesisat' },
  { emoji: '🪑', name: 'Mobilya & Dekorasyon' },
  { emoji: '🏠', name: 'Dış Cephe' },
];

interface SplitAuthLayoutProps {
  children: React.ReactNode;
}

export default function SplitAuthLayout({ children }: SplitAuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left: Hero Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-dark-forest via-[#14532d] to-peyzart-green relative overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-lime/15 rounded-full blur-[100px] animate-float" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-bright-green/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/3 right-8 w-40 h-40 bg-white/[0.03] rounded-full blur-[60px] animate-float" style={{ animationDelay: '5s' }} />
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-lime/10 rounded-full blur-[40px] animate-float" style={{ animationDelay: '7s' }} />
        </div>

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          {/* Logo */}
          <div>
            <div className="text-white text-[64px] md:text-[72px] font-[Billabong] tracking-wide drop-shadow-2xl leading-none">
              Peyzart
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                <span className="text-white/60 text-xs font-medium tracking-wide uppercase">
                  8 Hizmet Kategorisi
                </span>
              </div>

              <h1 className="text-white text-4xl font-bold leading-[1.1] tracking-tight">
                Profesyonel Hizmet
                <br />
                Bulmanın En Kolay Yolu
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-md">
                Bahçe düzenlemeden ev temizliğine, tadilattan elektrik
                tesisatına kadar tüm ev ve iş yeri hizmetleriniz için güvenilir
                profesyonelleri keşfedin.
              </p>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="group flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-sm rounded-[12px] px-3.5 py-2.5 border border-white/[0.06] hover:bg-white/[0.12] hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
                >
                  <span className="text-lg">{cat.emoji}</span>
                  <span className="text-white/70 group-hover:text-white/90 text-sm font-medium transition-colors">
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Footer */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/40 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-lime/60" />
              Güvenilir Profesyoneller
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-lime/60" />
              Garantili Hizmet
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-lime/60" />
              Uygun Fiyatlar
            </span>
          </div>
        </div>
      </div>

      {/* Right: Auth Panel */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-nature-bg via-white to-nature-bg flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
        {/* Subtle decorative dots on right panel */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #1B5E20 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 w-full max-w-[420px]">
          {/* Logo - her iki tarafta da görünür */}
          <div className="text-center mb-8">
            <div className="logo-gradient text-[48px] md:text-[56px] font-[Billabong] tracking-wide drop-shadow-lg leading-none">
              Peyzart
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
