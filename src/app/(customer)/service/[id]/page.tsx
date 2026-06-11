'use client';

import { useState } from 'react';
import Image from 'next/image';
import LiquidButton from '@/components/ui/LiquidButton';

const mockLandscaper = {
  id: 1,
  name: 'Ali Çimen',
  service: 'Çim Biçme',
  rating: 4.8,
  reviews: 156,
  price: 350,
  description: 'Profesyonel çim biçme ve bahçe bakımı hizmeti sunuyorum.',
  gallery: ['🌱', '🌿', '🌳', '🌲'],
  availability: {
    tomorrow: true,
    nextDay: true,
    inWeek: true,
  },
  reviews_list: [
    {
      id: 1,
      author: 'Mehmet K.',
      rating: 5,
      date: '2 gün önce',
      text: 'Çok profesyonel ve hızlı çalışan bir peyzajcı. Tavsiye ederim!',
      avatar: '👨',
    },
    {
      id: 2,
      author: 'Zeynep A.',
      rating: 5,
      date: '1 hafta önce',
      text: 'Bahçe tamamen yenilendi. Sonuçtan çok memnunum.',
      avatar: '👩',
    },
    {
      id: 3,
      author: 'Can D.',
      rating: 4,
      date: '2 hafta önce',
      text: 'İyi çalışma, zamanlama biraz sorun yaşadık ama düzeltildi.',
      avatar: '👨',
    },
  ],
};

export default function ServiceDetailPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-200 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-green-900">{mockLandscaper.name}'s Service</h1>
        <Image
          src="/landscaper.jpg"
          alt="Landscaper"
          width={100}
          height={100}
          className="rounded-full shadow-lg"
        />
      </header>

      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800 mb-6">
          {mockLandscaper.service}
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          {mockLandscaper.description}
        </p>
        <LiquidButton
          label="Book Now"
          onClick={() => alert('Booking Service!')}
          variant="primary"
          className="hover:scale-105 transition-transform"
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Service Description</h3>
          <p className="text-gray-600">{mockLandscaper.description}</p>
        </div>
        <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Customer Reviews</h3>
          <ul className="space-y-4">
            {mockLandscaper.reviews_list.map((review) => (
              <li key={review.id} className="text-gray-600">
                <span className="font-bold">{review.author}</span>: {review.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mt-16 text-center text-gray-600">
        <p>&copy; 2026 Peyzart. All rights reserved.</p>
      </footer>
    </div>
  );
}
