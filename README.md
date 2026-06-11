# Peyzart - Bahçeler Gerçekleşiyor ✨

Peyzart, peyzaj ve bahçe tasarımı süreçlerini profesyonelleştiren, AI destekli ve yüksek etkileşimli bir SaaS platformudur.

## 🚀 Öne Çıkan Özellikler

- **AI-Driven Design Insights**: Bahçeniz için akıllı analizler ve öneriler.
- **Ultra-Modern UI**: GSAP, Three.js ve Framer Motion ile güçlendirilmiş, akıcı kullanıcı deneyimi.
- **Cross-Platform**: Capacitor ile iOS ve Android desteği.
- **Enterprise Grade Security**: NextAuth ve güvenli API katmanları.
- **Scalable Infrastructure**: Next.js 16, Prisma ve Docker desteği.

## 🛠️ Teknoloji Yığını

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Animation**: [GSAP](https://greensock.com/), [Framer Motion](https://www.framer.com/motion/)
- **3D**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [Prisma](https://www.prisma.io/) + PostgreSQL
- **Auth**: [Next-Auth](https://next-auth.js.org/)
- **Mobile**: [Capacitor](https://capacitorjs.com/)

## 📦 Kurulum

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. `.env` dosyasını oluşturun:
   ```bash
   cp .env.example .env
   ```

3. Veritabanını hazırlayın:
   ```bash
   npm run db:push
   ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## 🧪 Scriptler

- `npm run dev`: Geliştirme modu.
- `npm run build`: Production build.
- `npm run lint`: Kod kalitesi kontrolü.
- `npm run format`: Otomatik kod formatlama.
- `npm run typecheck`: TypeScript tip kontrolü.

## 📄 Lisans

Peyzart © 2026. Tüm Hakları Saklıdır.
