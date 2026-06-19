import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const CATEGORIES = [
  { name: 'Peyzaj Tasarımı', slug: 'peyzaj-tasarimi', description: 'Modern ve klasik peyzaj projeleri, 3D görselleştirme, konsept tasarım', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&q=85', icon: 'tree', order: 1 },
  { name: 'Zemin Düzenleme', slug: 'zemin-duzenleme', description: 'Parke yol, kaldırım, taş döşeme, mikro beton, bordür uygulamaları', image: 'https://images.unsplash.com/photo-1594623930571-f593e6b4a36c?w=500&q=85', icon: 'grid', order: 2 },
  { name: 'Bahçe Aydınlatma', slug: 'bahce-aydinlatma', description: 'Dekoratif aydınlatma, yol ışıklandırma, efekt aydınlatma, led uygulamaları', image: 'https://images.unsplash.com/photo-1547045662-e5a7f3e0a7a0?w=500&q=85', icon: 'sun', order: 3 },
  { name: 'Çim & Sulama', slug: 'cim-sulama', description: 'Çimlendirme, otomatik sulama sistemleri, damlama sulama, peyzaj sulama', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&q=85', icon: 'droplets', order: 4 },
  { name: 'Bitki & Çiçek', slug: 'bitki-cicek', description: 'Bitki öbekleri, mevsimlik çiçek, ağaç dikimi, budama, sera düzenleme', image: 'https://images.unsplash.com/photo-1557429287-b2e26467fc2b?w=500&q=85', icon: 'flower', order: 5 },
  { name: 'Bahçe Yapıları', slug: 'bahce-yapilari', description: 'Pergola, çardak, ahşap teras, havuz çevresi, kamelya, çit sistemleri', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=85', icon: 'home', order: 6 },
  { name: 'Dış Cephe', slug: 'dis-cephe', description: 'Cephe kaplama, dış dekorasyon, süsleme elemanları, cephe aydınlatma', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=500&q=85', icon: 'building', order: 7 },
  { name: 'Havuz & Su Öğeleri', slug: 'havuz-su-ogeleri', description: 'Havuz bakımı, şelale, gölet, su duvarı, çeşme, su arıtma sistemleri', image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=500&q=85', icon: 'waves', order: 8 },
  { name: 'Bahçe Bakımı', slug: 'bahce-bakimi', description: 'Düzenli bakım, budama, gübreleme, ilaçlama, yabani ot temizliği', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=85', icon: 'shield', order: 9 },
  { name: 'Ağaç & Budama', slug: 'agac-budama', description: 'Ağaç dikimi, budama, taç yönetimi, kök bakımı, ağaç sökümü', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=85', icon: 'leaf', order: 10 },
  { name: 'Çatı & Teras', slug: 'cati-teras', description: 'Çatı bahçesi, teras düzenleme, yeşil çatı, balkon peyzajı', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=85', icon: 'sun', order: 11 },
  { name: 'Drenaj & Altyapı', slug: 'drenaj-altyapi', description: 'Bahçe drenajı, yağmur suyu toplama, alt yapı çözümleri, istinat duvarı', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=85', icon: 'triangle', order: 12 },
]

async function main() {
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) })

  let count = 0
  for (const cat of CATEGORIES) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } })
    if (!existing) {
      await prisma.category.create({ data: cat })
      count++
      console.log(`  + ${cat.name}`)
    } else {
      console.log(`  ~ ${cat.name} (exists)`)
    }
  }

  console.log(`\n✅ ${count} new categories added`)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
