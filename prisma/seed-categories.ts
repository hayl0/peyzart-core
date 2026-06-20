import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const CATEGORIES = [
  { name: 'Peyzaj Tasarımı', slug: 'peyzaj-tasarimi', description: 'Modern ve klasik peyzaj projeleri, 3D görselleştirme, konsept tasarım', image: '/images/categories/bahce-peyzaj.jpg', icon: 'tree', order: 1 },
  { name: 'Zemin Düzenleme', slug: 'zemin-duzenleme', description: 'Parke yol, kaldırım, taş döşeme, mikro beton, bordür uygulamaları', image: '/images/services/zemin-duzenleme.jpg', icon: 'grid', order: 2 },
  { name: 'Bahçe Aydınlatma', slug: 'bahce-aydinlatma', description: 'Dekoratif aydınlatma, yol ışıklandırma, efekt aydınlatma, led uygulamaları', image: '/images/services/bahce-aydinlatma.jpg', icon: 'sun', order: 3 },
  { name: 'Çim & Sulama', slug: 'cim-sulama', description: 'Çimlendirme, otomatik sulama sistemleri, damlama sulama, peyzaj sulama', image: '/images/services/cim-sulama.jpg', icon: 'droplets', order: 4 },
  { name: 'Bitki & Çiçek', slug: 'bitki-cicek', description: 'Bitki öbekleri, mevsimlik çiçek, ağaç dikimi, budama, sera düzenleme', image: '/images/services/bitki-cicek.jpg', icon: 'flower', order: 5 },
  { name: 'Bahçe Yapıları', slug: 'bahce-yapilari', description: 'Pergola, çardak, ahşap teras, havuz çevresi, kamelya, çit sistemleri', image: '/images/services/bahce-yapilari.jpg', icon: 'home', order: 6 },
  { name: 'Dış Cephe', slug: 'dis-cephe', description: 'Cephe kaplama, dış dekorasyon, süsleme elemanları, cephe aydınlatma', image: '/images/services/dis-cephe.jpg', icon: 'building', order: 7 },
  { name: 'Havuz & Su Öğeleri', slug: 'havuz-su-ogeleri', description: 'Havuz bakımı, şelale, gölet, su duvarı, çeşme, su arıtma sistemleri', image: '/images/services/havuz-bakimi.jpg', icon: 'waves', order: 8 },
  { name: 'Bahçe Bakımı', slug: 'bahce-bakimi', description: 'Düzenli bakım, budama, gübreleme, ilaçlama, yabani ot temizliği', image: '/images/services/bahce-bakimi.jpg', icon: 'shield', order: 9 },
  { name: 'Ağaç & Budama', slug: 'agac-budama', description: 'Ağaç dikimi, budama, taç yönetimi, kök bakımı, ağaç sökümü', image: '/images/services/agac-budama.jpg', icon: 'leaf', order: 10 },
  { name: 'Çatı & Teras', slug: 'cati-teras', description: 'Çatı bahçesi, teras düzenleme, yeşil çatı, balkon peyzajı', image: '/images/services/cati-teras.jpg', icon: 'sun', order: 11 },
  { name: 'Drenaj & Altyapı', slug: 'drenaj-altyapi', description: 'Bahçe drenajı, yağmur suyu toplama, alt yapı çözümleri, istinat duvarı', image: '/images/services/drenaj-altyapi.jpg', icon: 'triangle', order: 12 },
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
