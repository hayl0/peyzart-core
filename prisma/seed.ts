import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

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
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
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

  // Seed categories
  const createdCategories = await Promise.all(
    CATEGORIES.map(c => prisma.category.create({ data: c }))
  );
  console.log(`  - ${createdCategories.length} categories`);

  // Create LANDSCAPER user (id matches BYPASS_AUTH dev-user)
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
        name: 'Zeynep Kaya',
        email: 'zeynep@example.com',
        password: '',
        role: 'CUSTOMER',
        phone: '+90 536 456 78 90',
        address: 'Etiler Mah. Nispetiye Cad. No:25, İstanbul',
        lat: 41.083,
        lng: 29.032,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Mehmet Demir',
        email: 'mehmet@example.com',
        password: '',
        role: 'CUSTOMER',
        phone: '+90 533 789 01 23',
        address: 'Kadıköy Mah. Bağdat Cad. No:150, İstanbul',
        lat: 40.991,
        lng: 29.027,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Elif Yıldız',
        email: 'elif@example.com',
        password: '',
        role: 'CUSTOMER',
        phone: '+90 505 234 56 78',
        address: 'Beşiktaş Mah. Çırağan Cad. No:3, İstanbul',
        lat: 41.045,
        lng: 29.000,
      },
    }),
  ]);

  // Create LandscaperProfile
  const profile = await prisma.landscaperProfile.create({
    data: {
      userId: landscaper.id,
      companyName: 'Yeşil Alan Peyzaj',
      bio: '10 yıllık deneyimle profesyonel bahçe ve peyzaj hizmetleri. Modern tasarım anlayışıyla doğal güzellikleri birleştiriyoruz.',
      experience: 10,
      rating: 4.8,
      reviewCount: 0,
      isVerified: true,
      isOpen: true,
      workingHours: {
        monday: { start: '09:00', end: '18:00', isOpen: true },
        tuesday: { start: '09:00', end: '18:00', isOpen: true },
        wednesday: { start: '09:00', end: '18:00', isOpen: true },
        thursday: { start: '09:00', end: '18:00', isOpen: true },
        friday: { start: '09:00', end: '18:00', isOpen: true },
        saturday: { start: '10:00', end: '16:00', isOpen: true },
        sunday: { start: '10:00', end: '16:00', isOpen: false },
      },
      notificationPrefs: {
        newOrder: true,
        payment: true,
        review: true,
        marketing: false,
      },
    },
  });

  // Helper to get category by slug
  const cat = (slug: string) => createdCategories.find(c => c.slug === slug)!;

  // Create services
  await prisma.landscaperService.createMany({
    data: [
      { name: 'Çim Biçme', description: 'Profesyonel çim biçme ve bakım hizmeti, düzenli aralıklarla bakım paketleri', price: 350, unit: 'seans', categoryId: cat('cim-sulama').id, landscaperProfileId: profile.id },
      { name: 'Bitki Dikimi', description: 'Mevsimine uygun çiçek, ağaç ve süs bitkisi dikimi, peyzaj düzenlemesi', price: 450, unit: 'm²', categoryId: cat('bitki-cicek').id, landscaperProfileId: profile.id },
      { name: 'Ağaç Budama', description: 'Büyük ağaçlar için profesyonel budama, şekillendirme ve bakım', price: 800, unit: 'adet', categoryId: cat('agac-budama').id, landscaperProfileId: profile.id },
      { name: 'Sulama Sistemi', description: 'Otomatik sulama sistemi kurulumu, mevcut sistemlerin bakım ve onarımı', price: 1200, unit: 'proje', categoryId: cat('cim-sulama').id, landscaperProfileId: profile.id },
    ],
  });

  // Create orders
  const now = new Date();
  const days = (n: number) => new Date(now.getTime() - n * 86400000);
  const future = (n: number) => new Date(now.getTime() + n * 86400000);

  const orders = await Promise.all([
    prisma.order.create({
      data: {
        status: 'PENDING',
        totalPrice: 350,
        serviceName: 'Çim Biçme',
        serviceDate: future(1),
        notes: 'Arka bahçeye özellikle dikkat edilmesi gerekiyor',
        address: 'Etiler Mah. Nispetiye Cad. No:25, İstanbul',
        lat: 41.083, lng: 29.032,
        customerId: customers[0].id,
        landscaperId: profile.id,
      },
    }),
    prisma.order.create({
      data: {
        status: 'ACCEPTED',
        totalPrice: 450,
        serviceName: 'Bitki Dikimi',
        serviceDate: future(2),
        notes: 'Müşteri önceden bilgi verdi, ek alet gerekebilir',
        address: 'Kadıköy Mah. Bağdat Cad. No:150, İstanbul',
        lat: 40.991, lng: 29.027,
        customerId: customers[1].id,
        landscaperId: profile.id,
      },
    }),
    prisma.order.create({
      data: {
        status: 'IN_PROGRESS',
        totalPrice: 1200,
        serviceName: 'Sulama Sistemi',
        serviceDate: days(0),
        notes: 'Sistem planı hazır, kurulum başladı',
        address: 'Beşiktaş Mah. Çırağan Cad. No:3, İstanbul',
        lat: 41.045, lng: 29.000,
        customerId: customers[2].id,
        landscaperId: profile.id,
      },
    }),
    prisma.order.create({
      data: {
        status: 'COMPLETED',
        totalPrice: 350,
        serviceName: 'Çim Biçme',
        serviceDate: days(5),
        notes: 'Düzenli bakım sözleşmesi kapsamında',
        address: 'Etiler Mah. Nispetiye Cad. No:25, İstanbul',
        lat: 41.083, lng: 29.032,
        customerId: customers[0].id,
        landscaperId: profile.id,
      },
    }),
    prisma.order.create({
      data: {
        status: 'COMPLETED',
        totalPrice: 750,
        serviceName: 'Peyzaj Tasarım',
        serviceDate: days(12),
        address: 'Kadıköy Mah. Bağdat Cad. No:150, İstanbul',
        lat: 40.991, lng: 29.027,
        customerId: customers[1].id,
        landscaperId: profile.id,
      },
    }),
    prisma.order.create({
      data: {
        status: 'COMPLETED',
        totalPrice: 1200,
        serviceName: 'Sulama Sistemi',
        serviceDate: days(20),
        address: 'Beşiktaş Mah. Çırağan Cad. No:3, İstanbul',
        lat: 41.045, lng: 29.000,
        customerId: customers[2].id,
        landscaperId: profile.id,
      },
    }),
  ]);

  // Create payments for completed orders
  await prisma.payment.create({
    data: {
      orderId: orders[3].id,
      amount: 350,
      status: 'SUCCESS',
      provider: 'IYZICO',
    },
  });
  await prisma.payment.create({
    data: {
      orderId: orders[4].id,
      amount: 750,
      status: 'SUCCESS',
      provider: 'IYZICO',
    },
  });
  await prisma.payment.create({
    data: {
      orderId: orders[5].id,
      amount: 1200,
      status: 'SUCCESS',
      provider: 'STRIPE',
    },
  });

  // Create reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Harika bir iş çıkardılar! Çimler mükemmel görünüyor, çok memnun kaldık.',
        customerId: customers[0].id,
        landscaperId: profile.id,
        createdAt: days(4),
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Profesyonel ekip, zamanında geldiler ve işlerini çok iyi yaptılar. Kesinlikle tavsiye ederim.',
        customerId: customers[1].id,
        landscaperId: profile.id,
        createdAt: days(10),
        reply: 'Teşekkür ederiz Mehmet Bey! Sizin için her zaman en iyisini yapmaya çalışıyoruz.',
        repliedAt: days(8),
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: 'Sulama sistemi kurulumu gayet başarılı. Sadece biraz gecikme oldu.',
        customerId: customers[2].id,
        landscaperId: profile.id,
        createdAt: days(18),
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Uzun süredir peyzaj işlerinde Ahmet Bey ile çalışıyorum. Her zaman memnun kaldım.',
        customerId: customers[0].id,
        landscaperId: profile.id,
        createdAt: days(25),
        reply: 'Çok teşekkürler Zeynep Hanım! Uzun süreli iş birliğimiz için biz teşekkür ederiz.',
        repliedAt: days(23),
      },
    }),
  ]);

  // Update review count and rating on profile
  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  await prisma.landscaperProfile.update({
    where: { id: profile.id },
    data: { reviewCount: reviews.length, rating: avgRating },
  });

  // Create portfolio items
  await prisma.portfolioImage.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80', category: 'Bahçe Düzenleme', description: 'Modern bahçe tasarımı, doğal taş döşeme', landscaperProfileId: profile.id },
      { url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80', category: 'Peyzaj', description: 'Havuzlu bahçe düzenlemesi, tropikal bitkiler', landscaperProfileId: profile.id },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80', category: 'Sulama Sistemleri', description: 'Otomatik sulama sistemi kurulumu, smart kontrol', landscaperProfileId: profile.id },
    ],
  });

  // Create blocked dates
  await prisma.blockedDate.createMany({
    data: [
      { date: future(15), reason: 'Yıllık izin', landscaperProfileId: profile.id },
      { date: future(16), reason: 'Yıllık izin', landscaperProfileId: profile.id },
    ],
  });

  // Create wallet for landscaper
  const wallet = await prisma.wallet.create({
    data: {
      userId: landscaper.id,
      balance: 2300,
    },
  });

  await prisma.transaction.createMany({
    data: [
      { amount: 1200, type: 'PAYMENT', status: 'SUCCESS', description: 'Sulama Sistemi — Beşiktaş', walletId: wallet.id, createdAt: days(18) },
      { amount: 750, type: 'PAYMENT', status: 'SUCCESS', description: 'Peyzaj Tasarım — Kadıköy', walletId: wallet.id, createdAt: days(10) },
      { amount: 350, type: 'PAYMENT', status: 'SUCCESS', description: 'Çim Biçme — Etiler', walletId: wallet.id, createdAt: days(4) },
    ],
  });

  console.log('✅ Seed completed successfully');
  console.log(`  - ${createdCategories.length} categories`);
  console.log(`  - 1 landscaper (${landscaper.email})`);
  console.log(`  - ${customers.length} customers`);
  console.log(`  - 4 services`);
  console.log(`  - ${orders.length} orders`);
  console.log(`  - ${reviews.length} reviews`);
  console.log(`  - 3 portfolio images`);
  console.log(`  - 2 blocked dates`);
  console.log(`  - 1 wallet with 3 transactions`);
  console.log(`  - 3 payments`);
}

main()
  .catch(e => { console.error(e); process.exit(1); });
