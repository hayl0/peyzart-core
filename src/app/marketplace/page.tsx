"use client";
import { Search, MapPin, Sprout, Star } from 'lucide-react';
import Link from 'next/link';

export default function Marketplace() {
  return (
    <div className="min-h-screen p-10">
       <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2 font-black text-2xl italic"><Sprout /> PEYZART</div>
          <div className="flex gap-4">
            <Link href="/login" className="font-bold underline">Giriş Yap</Link>
          </div>
       </nav>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
             {[1,2,3,4].map(i => (
                <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow">
                   <div className="h-40 bg-gray-100 rounded-[1.5rem] mb-4" />
                   <h3 className="font-black text-lg">Profesyonel Bahçe Bakımı</h3>
                   <div className="flex justify-between mt-4">
                      <span className="text-primary font-black">₺450</span>
                      <span className="flex items-center text-xs"><Star className="w-3 h-3 text-yellow-500" /> 4.9</span>
                   </div>
                </div>
             ))}
          </div>
          <div className="bg-black text-white p-8 rounded-[3rem] h-[600px] flex items-center justify-center">
             <MapPin className="text-primary w-16 h-16 animate-bounce" />
          </div>
       </div>
    </div>
  );
}
