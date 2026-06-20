import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Ana kategoriler (parentId = null)
const MAIN_CATEGORIES = [
  {
    name: 'Bahçe & Peyzaj', slug: 'bahce-peyzaj',
    description: 'Bahçe tasarımı, düzenleme, bakım ve çevre düzenleme hizmetleri',
    image: '/images/categories/bahce-peyzaj.jpg', icon: 'tree', order: 1, isHeroSlide: true,
    children: [
      { name: 'Peyzaj Tasarımı', slug: 'peyzaj-tasarimi', description: 'Modern ve klasik peyzaj projeleri, 3D görselleştirme, konsept tasarım', image: '/images/services/peyzaj-tasarimi.jpg', icon: 'tree', order: 1 },
      { name: 'Zemin Düzenleme', slug: 'zemin-duzenleme', description: 'Parke yol, kaldırım, taş döşeme, mikro beton, bordür uygulamaları', image: '/images/services/zemin-duzenleme.jpg', icon: 'grid', order: 2 },
      { name: 'Bahçe Aydınlatma', slug: 'bahce-aydinlatma', description: 'Dekoratif aydınlatma, yol ışıklandırma, efekt aydınlatma, led uygulamaları', image: '/images/services/bahce-aydinlatma.jpg', icon: 'sun', order: 3 },
      { name: 'Çim & Sulama', slug: 'cim-sulama', description: 'Çimlendirme, otomatik sulama sistemleri, damlama sulama, peyzaj sulama', image: '/images/services/cim-sulama.jpg', icon: 'droplets', order: 4 },
      { name: 'Bitki & Çiçek', slug: 'bitki-cicek', description: 'Bitki öbekleri, mevsimlik çiçek, ağaç dikimi, budama, sera düzenleme', image: '/images/services/bitki-cicek.jpg', icon: 'flower', order: 5 },
      { name: 'Bahçe Yapıları', slug: 'bahce-yapilari', description: 'Pergola, çardak, ahşap teras, havuz çevresi, kamelya, çit sistemleri', image: '/images/services/bahce-yapilari.jpg', icon: 'home', order: 6 },
      { name: 'Havuz & Su Öğeleri', slug: 'havuz-su-ogeleri', description: 'Havuz bakımı, şelale, gölet, su duvarı, çeşme, su arıtma sistemleri', image: '/images/services/havuz-su-ogeleri.jpg', icon: 'waves', order: 7 },
      { name: 'Bahçe Bakımı', slug: 'bahce-bakimi', description: 'Düzenli bakım, budama, gübreleme, ilaçlama, yabani ot temizliği', image: '/images/services/bahce-bakimi.jpg', icon: 'shield', order: 8 },
      { name: 'Ağaç & Budama', slug: 'agac-budama', description: 'Ağaç dikimi, budama, taç yönetimi, kök bakımı, ağaç sökümü', image: '/images/services/agac-budama.jpg', icon: 'leaf', order: 9 },
      { name: 'Çatı & Teras', slug: 'cati-teras', description: 'Çatı bahçesi, teras düzenleme, yeşil çatı, balkon peyzajı', image: '/images/services/cati-teras.jpg', icon: 'sun', order: 10 },
      { name: 'Drenaj & Altyapı', slug: 'drenaj-altyapi', description: 'Bahçe drenajı, yağmur suyu toplama, alt yapı çözümleri, istinat duvarı', image: '/images/services/drenaj-altyapi.jpg', icon: 'triangle', order: 11 },
      { name: 'Çardak & Pergola', slug: 'cardak-pergola', description: 'Ahşap ve metal çardak, pergola, gölgelik sistemleri kurulum ve bakım', image: '/images/services/cardak-pergola.jpg', icon: 'home', order: 12 },
      { name: 'Havuz Bakımı', slug: 'havuz-bakimi', description: 'Havuz temizlik, kimyasal dengeleme, filtre bakımı, sezon açma/kapama', image: '/images/services/havuz-bakimi.jpg', icon: 'waves', order: 13 },
      { name: 'Sulama Sistemleri', slug: 'sulama-sistemleri', description: 'Otomatik sulama kurulumu, damlama sulama, mevcut sistem onarım ve bakım', image: '/images/services/sulama-sistemi.jpg', icon: 'droplets', order: 14 },
      { name: 'Dış Mekan Mobilyası', slug: 'dis-mekan-mobilya', description: 'Bahçe mobilyaları, şezlong, masa, sandalye, salıncak montaj ve bakım', image: '/images/services/dis-mekan-mobilya.jpg', icon: 'armchair', order: 15 },
      { name: 'Yapay Çim & Zemin', slug: 'yapay-cim', description: 'Yapay çim döşeme, lastik zemin, dekoratif taş, ahşap deck uygulaması', image: '/images/services/yapay-cim.jpg', icon: 'grid', order: 16 },
    ],
  },
  {
    name: 'Temizlik', slug: 'temizlik',
    description: 'Ev, ofis ve iş yeri temizlik hizmetleri, profesyonel ekip ve ekipman',
    image: '/images/categories/temizlik.jpg', icon: 'sparkles', order: 2, isHeroSlide: true,
    children: [
      { name: 'Ev Temizliği', slug: 'ev-temizligi', description: 'Düzenli ev temizliği, derinlemesine temizlik, paket temizlik hizmetleri', image: '/images/services/ev-temizligi.jpg', icon: 'home', order: 1 },
      { name: 'Ofis Temizliği', slug: 'ofis-temizligi', description: 'Ofis, iş yeri, plaza temizlik hizmetleri, düzenli veya tek seferlik', image: '/images/services/ofis-temizligi.jpg', icon: 'building', order: 2 },
      { name: 'Halı & Koltuk Yıkama', slug: 'hali-yikama', description: 'Halı, koltuk, kanepe, yatak yıkama, leke çıkarma, buharlı temizlik', image: '/images/services/hali-yikama.jpg', icon: 'carpet', order: 3 },
      { name: 'İnşaat Sonrası Temizlik', slug: 'insaat-sonrasi-temizlik', description: 'İnşaat, tadilat sonrası moloz alma, derin temizlik, cilalama', image: '/images/services/insaat-temizlik.jpg', icon: 'hard-hat', order: 4 },
      { name: 'Dış Cephe Temizliği', slug: 'dis-cephe-temizlik', description: 'Bina yıkama, cephe temizliği, basınçlı su ile yüzey temizliği', image: '/images/services/dis-cephe-temizlik.jpg', icon: 'warehouse', order: 5 },
    ],
  },
  {
    name: 'Boya & Badana', slug: 'boya-badana',
    description: 'İç ve dış cephe boya, badana, alçı, sıva ve dekoratif boya uygulamaları',
    image: '/images/categories/boya-badana.jpg', icon: 'paintbrush', order: 3, isHeroSlide: true,
    children: [
      { name: 'İç Cephe Boya', slug: 'ic-cephe-boya', description: 'Ev, ofis iç cephe boyama, badana, rulo ve fırça ile profesyonel uygulama', image: '/images/services/ic-cephe-boya.jpg', icon: 'wall', order: 1 },
      { name: 'Dış Cephe Boya', slug: 'dis-cephe-boya', description: 'Bina dış cephe boyama, silikonlu boyalar, dış cephe kaplama', image: '/images/services/dis-cephe-boya.jpg', icon: 'building', order: 2 },
      { name: 'Duvar Kağıdı', slug: 'duvar-kagidi', description: 'Duvar kağıdı kaplama, sökme, desen eşleme, tüm yüzeylerde uygulama', image: '/images/services/duvar-kagidi.jpg', icon: 'scroll', order: 3 },
      { name: 'Alçı & Sıva', slug: 'alci-siva', description: 'Alçıpan duvar, asma tavan, sıva, saten alçı, dekoratif alçı işleri', image: '/images/services/alci-siva.jpg', icon: 'square', order: 4 },
      { name: 'Dekoratif Boya', slug: 'dekoratif-boya', description: 'Dekoratif boya teknikleri, doku boyaları, özel efekt uygulamaları', image: '/images/services/dekoratif-boya.jpg', icon: 'palette', order: 5 },
    ],
  },
  {
    name: 'Tadilat & Onarım', slug: 'tadilat-onarim',
    description: 'Ev ve iş yeri tadilatı, mutfak-banyo yenileme, genel onarım hizmetleri',
    image: '/images/categories/tadilat-onarim.jpg', icon: 'tools', order: 4, isHeroSlide: true,
    children: [
      { name: 'Genel Tadilat', slug: 'genel-tadilat', description: 'Ev, ofis genel tadilat, yıkım, yenileme, anahtar teslim hizmet', image: '/images/services/genel-tadilat.jpg', icon: 'hammer', order: 1 },
      { name: 'Mutfak Tadilatı', slug: 'mutfak-tadilati', description: 'Mutfak dolabı, tezgah, fayans, tesisat, komple mutfak yenileme', image: '/images/services/mutfak-tadilati.jpg', icon: 'cooking-pot', order: 2 },
      { name: 'Banyo Tadilatı', slug: 'banyo-tadilati', description: 'Banyo yenileme, duşakabin, klozet, lavabo, fayans, su yalıtımı', image: '/images/services/banyo-tadilati.jpg', icon: 'bath', order: 3 },
      { name: 'Kapı & Pencere', slug: 'kapi-pencere', description: 'Kapı, pencere montaj ve onarım, PVC, ahşap, alüminyum işleri', image: '/images/services/kapi-pencere.jpg', icon: 'door', order: 4 },
      { name: 'Alçıpan & Bölme', slug: 'alcipan-bolme', description: 'Alçıpan duvar, bölme oda, asma tavan, dekoratif panel uygulamaları', image: '/images/services/alcipan-bolme.jpg', icon: 'panel', order: 5 },
    ],
  },
  {
    name: 'Elektrik', slug: 'elektrik',
    description: 'Elektrik tesisat, arıza onarım, panel kurulum ve akıllı ev sistemleri',
    image: '/images/categories/elektrik.jpg', icon: 'zap', order: 5, isHeroSlide: false,
    children: [
      { name: 'Tesisat & Kablo', slug: 'elektrik-tesisat', description: 'Elektrik tesisat çekimi, kablo döşeme, priz ve anahtar montajı', image: '/images/services/elektrik-tesisat.jpg', icon: 'cable', order: 1 },
      { name: 'Arıza Onarım', slug: 'elektrik-ariza', description: 'Elektrik arıza tespit ve onarım, sigorta atması, kaçak akım sorunları', image: '/images/services/elektrik-ariza.jpg', icon: 'alert-triangle', order: 2 },
      { name: 'Panel & Sigorta', slug: 'panel-sigorta', description: 'Sigorta kutusu, kaçak akım rölesi, panço montajı, güç artırımı', image: '/images/services/panel-sigorta.jpg', icon: 'box', order: 3 },
      { name: 'Akıllı Ev Sistemleri', slug: 'akilli-ev', description: 'Akıllı ev otomasyonu, akıllı aydınlatma, termostat, güvenlik sistemi', image: '/images/services/akilli-ev.jpg', icon: 'cpu', order: 4 },
    ],
  },
  {
    name: 'Tesisat', slug: 'tesisat',
    description: 'Su ve doğalgaz tesisatı, kombi bakımı, petek montaj ve tıkanıklık açma',
    image: '/images/categories/tesisat.jpg', icon: 'pipe', order: 6, isHeroSlide: true,
    children: [
      { name: 'Su Tesisatı', slug: 'su-tesisati', description: 'Su tesisat çekimi, vana montaj, musluk tamiri, tıkanıklık açma', image: '/images/services/su-tesisati.jpg', icon: 'droplet', order: 1 },
      { name: 'Doğalgaz Tesisatı', slug: 'dogalgaz-tesisati', description: 'Doğalgaz tesisatı, kombi bağlantısı, petek montaj, gaz sızdırmazlık', image: '/images/services/dogalgaz-tesisati.jpg', icon: 'flame', order: 2 },
      { name: 'Kombi Bakımı', slug: 'kombi-bakimi', description: 'Kombi periyodik bakım, arıza tespit, yedek parça değişimi, temizlik', image: '/images/services/kombi-bakimi.jpg', icon: 'thermometer', order: 3 },
      { name: 'Petek & Radyatör', slug: 'petek-radyator', description: 'Petek montaj, temizlik, hava alma, radyatör değişimi, ısıtma sistemi', image: '/images/services/petek-radyator.jpg', icon: 'grid-2x2', order: 4 },
      { name: 'Klozet & Lavabo', slug: 'klozet-lavabo', description: 'Klozet, lavabo, duş teknesi montaj ve onarım, su kaçak tespiti', image: '/images/services/klozet-lavabo.jpg', icon: 'toilet', order: 5 },
    ],
  },
  {
    name: 'Mobilya & Dekorasyon', slug: 'mobilya-dekorasyon',
    description: 'Mobilya montajı, iç dekorasyon, perde, yer döşeme ve duvar kaplama',
    image: '/images/categories/mobilya-dekorasyon.jpg', icon: 'armchair', order: 7, isHeroSlide: false,
    children: [
      { name: 'Mobilya Montajı', slug: 'mobilya-montaj', description: 'Yeni mobilya montaj, sökme, taşıma, demo mobilya kurulumu', image: '/images/services/mobilya-montaj.jpg', icon: 'tool', order: 1 },
      { name: 'Dekorasyon & Styling', slug: 'dekorasyon-styling', description: 'İç dekorasyon danışmanlığı, ev styling, aksesuar ve renk danışmanlığı', image: '/images/services/dekorasyon-styling.jpg', icon: 'sparkle', order: 2 },
      { name: 'Perde & Stor', slug: 'perde-stor', description: 'Perde, stor, jaluzi, zebra perde montaj ve imalat, perde tamiri', image: '/images/services/perde-stor.jpg', icon: 'curtain', order: 3 },
      { name: 'Yer Döşeme', slug: 'yer-doseme', description: 'Laminant, parke, fayans, seramik, LVT döşeme ve onarım hizmetleri', image: '/images/services/yer-doseme.jpg', icon: 'floor', order: 4 },
      { name: 'Duvar Kaplama', slug: 'duvar-kaplama', description: '3D panel, taş kaplama, ahşap kaplama, dekoratif duvar panelleri', image: '/images/services/duvar-kaplama.jpg', icon: 'wall', order: 5 },
    ],
  },
  {
    name: 'Dış Cephe', slug: 'dis-cephe',
    description: 'Çatı, yalıtım, cephe kaplama, pencere, bahçe kapısı ve çit sistemleri',
    image: '/images/categories/dis-cephe.jpg', icon: 'buildings', order: 8, isHeroSlide: false,
    children: [
      { name: 'Çatı & Yalıtım', slug: 'cati-yalitim', description: 'Çatı onarım, akıtma tamiri, ısı ve su yalıtımı, çatı kaplama', image: '/images/services/cati-yalitim.jpg', icon: 'hard-hat', order: 1 },
      { name: 'Cephe & Pencere', slug: 'cephe-pencere', description: 'Cephe kaplama, ısı yalıtım, pencere değişimi, dış cephe yenileme', image: '/images/services/cephe-pencere.jpg', icon: 'window', order: 2 },
      { name: 'Bahçe Kapısı & Çit', slug: 'bahce-kapisi-cit', description: 'Bahçe kapısı, otomatik kapı, çit, korkuluk, ferforje uygulamaları', image: '/images/services/bahce-kapisi-cit.jpg', icon: 'fence', order: 3 },
      { name: 'Veranda & Sundurma', slug: 'veranda-sundurma', description: 'Veranda camlama, sundurma, kış bahçesi, teras kapatma sistemleri', image: '/images/services/veranda-sundurma.jpg', icon: 'glass-water', order: 4 },
    ],
  },
];

async function main() {
  const dbUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL!;
  const adapter = new PrismaPg({ connectionString: dbUrl });
  const prisma = new PrismaClient({ adapter });

  // Clean existing data
  await prisma.payment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.blockedDate.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.order.deleteMany();
  await prisma.portfolioImage.deleteMany();
  await prisma.landscaperService.deleteMany();
  await prisma.category.deleteMany();
  await prisma.landscaperProfile.deleteMany();
  await prisma.user.deleteMany();

  // Seed main categories with children
  let totalCategories = 0;
  for (const mainCat of MAIN_CATEGORIES) {
    const { children, ...mainData } = mainCat;
    const created = await prisma.category.create({
      data: {
        ...mainData,
        children: {
          create: children.map(child => ({
            ...child,
            isHeroSlide: false,
          })),
        },
      },
    });
    totalCategories += 1 + children.length;
  }
  console.log(`  - ${totalCategories} categories`);

  // Create LANDSCAPER user
  const landscaper = await prisma.user.create({
    data: {
      id: 'dev-user',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@peyzart.com',
      password: '',
      role: 'LANDSCAPER',
      phone: '+90 532 123 45 67',
      address: 'Levent Mah. Büyükdere Cad. No:10, İstanbul',
      lat: 41.085,
      lng: 29.008,
    },
  });

  // Create customers
  const customers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Zeynep Kaya', email: 'zeynep@example.com', password: '', role: 'CUSTOMER',
        phone: '+90 536 456 78 90', address: 'Etiler Mah. Nispetiye Cad. No:25, İstanbul', lat: 41.083, lng: 29.032,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Mehmet Demir', email: 'mehmet@example.com', password: '', role: 'CUSTOMER',
        phone: '+90 533 789 01 23', address: 'Kadıköy Mah. Bağdat Cad. No:150, İstanbul', lat: 40.991, lng: 29.027,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Elif Yıldız', email: 'elif@example.com', password: '', role: 'CUSTOMER',
        phone: '+90 505 234 56 78', address: 'Beşiktaş Mah. Çırağan Cad. No:3, İstanbul', lat: 41.045, lng: 29.000,
      },
    }),
  ]);

  // Create LandscaperProfile
  const profile = await prisma.landscaperProfile.create({
    data: {
      userId: landscaper.id,
      companyName: 'Yeşil Alan Peyzaj',
      bio: '10 yıllık deneyimle profesyonel bahçe ve peyzaj hizmetleri.',
      experience: 10, rating: 4.8, reviewCount: 0, isVerified: true, isOpen: true,
      workingHours: {
        monday: { start: '09:00', end: '18:00', isOpen: true },
        tuesday: { start: '09:00', end: '18:00', isOpen: true },
        wednesday: { start: '09:00', end: '18:00', isOpen: true },
        thursday: { start: '09:00', end: '18:00', isOpen: true },
        friday: { start: '09:00', end: '18:00', isOpen: true },
        saturday: { start: '10:00', end: '16:00', isOpen: true },
        sunday: { start: '10:00', end: '16:00', isOpen: false },
      },
      notificationPrefs: { newOrder: true, payment: true, review: true, marketing: false },
    },
  });

  // Get subcategories by slug for service creation
  const allCats = await prisma.category.findMany({ where: { parentId: { not: null } } });
  const catBySlug = Object.fromEntries(allCats.map(c => [c.slug, c]));

  // Create services
  await prisma.landscaperService.createMany({
    data: [
      { name: 'Çim Biçme', description: 'Profesyonel çim biçme ve bakım hizmeti', price: 350, unit: 'seans', categoryId: catBySlug['cim-sulama'].id, landscaperProfileId: profile.id },
      { name: 'Bitki Dikimi', description: 'Mevsimine uygun çiçek, ağaç ve süs bitkisi dikimi', price: 450, unit: 'm²', categoryId: catBySlug['bitki-cicek'].id, landscaperProfileId: profile.id },
      { name: 'Ağaç Budama', description: 'Büyük ağaçlar için profesyonel budama', price: 800, unit: 'adet', categoryId: catBySlug['agac-budama'].id, landscaperProfileId: profile.id },
      { name: 'Sulama Sistemi', description: 'Otomatik sulama sistemi kurulumu', price: 1200, unit: 'proje', categoryId: catBySlug['sulama-sistemleri'].id, landscaperProfileId: profile.id },
    ],
  });

  // Create orders
  const now = new Date();
  const days = (n: number) => new Date(now.getTime() - n * 86400000);
  const future = (n: number) => new Date(now.getTime() + n * 86400000);

  const orders = await Promise.all([
    prisma.order.create({ data: { status: 'PENDING', totalPrice: 350, serviceName: 'Çim Biçme', serviceDate: future(1), notes: 'Arka bahçeye dikkat', address: 'Etiler Mah. Nispetiye Cad. No:25, İstanbul', lat: 41.083, lng: 29.032, customerId: customers[0].id, landscaperId: profile.id } }),
    prisma.order.create({ data: { status: 'ACCEPTED', totalPrice: 450, serviceName: 'Bitki Dikimi', serviceDate: future(2), address: 'Kadıköy Mah. Bağdat Cad. No:150, İstanbul', lat: 40.991, lng: 29.027, customerId: customers[1].id, landscaperId: profile.id } }),
    prisma.order.create({ data: { status: 'IN_PROGRESS', totalPrice: 1200, serviceName: 'Sulama Sistemi', serviceDate: days(0), address: 'Beşiktaş Mah. Çırağan Cad. No:3, İstanbul', lat: 41.045, lng: 29.000, customerId: customers[2].id, landscaperId: profile.id } }),
    prisma.order.create({ data: { status: 'COMPLETED', totalPrice: 350, serviceName: 'Çim Biçme', serviceDate: days(5), address: 'Etiler Mah. Nispetiye Cad. No:25, İstanbul', lat: 41.083, lng: 29.032, customerId: customers[0].id, landscaperId: profile.id } }),
    prisma.order.create({ data: { status: 'COMPLETED', totalPrice: 750, serviceName: 'Peyzaj Tasarım', serviceDate: days(12), address: 'Kadıköy Mah. Bağdat Cad. No:150, İstanbul', lat: 40.991, lng: 29.027, customerId: customers[1].id, landscaperId: profile.id } }),
    prisma.order.create({ data: { status: 'COMPLETED', totalPrice: 1200, serviceName: 'Sulama Sistemi', serviceDate: days(20), address: 'Beşiktaş Mah. Çırağan Cad. No:3, İstanbul', lat: 41.045, lng: 29.000, customerId: customers[2].id, landscaperId: profile.id } }),
  ]);

  // Payments
  await prisma.payment.createMany({
    data: [
      { orderId: orders[3].id, amount: 350, status: 'SUCCESS', provider: 'IYZICO' },
      { orderId: orders[4].id, amount: 750, status: 'SUCCESS', provider: 'IYZICO' },
      { orderId: orders[5].id, amount: 1200, status: 'SUCCESS', provider: 'STRIPE' },
    ],
  });

  // Reviews
  const reviews = await Promise.all([
    prisma.review.create({ data: { rating: 5, comment: 'Harika iş çıkardılar!', customerId: customers[0].id, landscaperId: profile.id, createdAt: days(4) } }),
    prisma.review.create({ data: { rating: 5, comment: 'Profesyonel ekip, çok iyi iş.', customerId: customers[1].id, landscaperId: profile.id, createdAt: days(10), reply: 'Teşekkür ederiz!', repliedAt: days(8) } }),
    prisma.review.create({ data: { rating: 4, comment: 'Gayet başarılı.', customerId: customers[2].id, landscaperId: profile.id, createdAt: days(18) } }),
    prisma.review.create({ data: { rating: 5, comment: 'Her zamanki gibi mükemmel.', customerId: customers[0].id, landscaperId: profile.id, createdAt: days(25) } }),
  ]);

  // Update profile rating
  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  await prisma.landscaperProfile.update({
    where: { id: profile.id },
    data: { reviewCount: reviews.length, rating: avgRating },
  });

  // Portfolio
  await prisma.portfolioImage.createMany({
    data: [
      { url: '/images/portfolio/bahce-duzenleme.jpg', category: 'Bahçe Düzenleme', description: 'Modern bahçe tasarımı', landscaperProfileId: profile.id },
      { url: '/images/portfolio/havuzlu-bahce.jpg', category: 'Peyzaj', description: 'Havuzlu bahçe düzenlemesi', landscaperProfileId: profile.id },
      { url: '/images/portfolio/sulama-sistemi.jpg', category: 'Sulama Sistemleri', description: 'Otomatik sulama sistemi', landscaperProfileId: profile.id },
    ],
  });

  // Blocked dates
  await prisma.blockedDate.createMany({
    data: [
      { date: future(15), reason: 'Yıllık izin', landscaperProfileId: profile.id },
      { date: future(16), reason: 'Yıllık izin', landscaperProfileId: profile.id },
    ],
  });

  // Wallet
  const wallet = await prisma.wallet.create({ data: { userId: landscaper.id, balance: 2300 } });
  await prisma.transaction.createMany({
    data: [
      { amount: 1200, type: 'PAYMENT', status: 'SUCCESS', description: 'Sulama Sistemi', walletId: wallet.id, createdAt: days(18) },
      { amount: 750, type: 'PAYMENT', status: 'SUCCESS', description: 'Peyzaj Tasarım', walletId: wallet.id, createdAt: days(10) },
      { amount: 350, type: 'PAYMENT', status: 'SUCCESS', description: 'Çim Biçme', walletId: wallet.id, createdAt: days(4) },
    ],
  });

  console.log('✅ Seed completed successfully');
  console.log(`  - ${totalCategories} categories (8 main + ${totalCategories - 8} sub)`);
  console.log(`  - 1 landscaper, ${customers.length} customers`);
  console.log(`  - 4 services, ${orders.length} orders`);
  console.log(`  - ${reviews.length} reviews, 3 portfolio images`);
  console.log(`  - 1 wallet with 3 transactions, 3 payments`);
}

main()
  .catch(e => { console.error(e); process.exit(1); });
