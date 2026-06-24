'use client';

import { motion } from 'framer-motion';

export interface CategoryOption {
  id: string;
  emoji: string;
  name: string;
  description: string;
}

interface CategoryPickerProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

const categories: CategoryOption[] = [
  { id: 'bahce-peyzaj', emoji: '🌿', name: 'Bahçe & Peyzaj', description: 'Tasarım, düzenleme, bakım' },
  { id: 'temizlik', emoji: '✨', name: 'Temizlik', description: 'Ev, ofis, halı yıkama' },
  { id: 'boya-badana', emoji: '🎨', name: 'Boya & Badana', description: 'İç/dış cephe, alçı, sıva' },
  { id: 'tadilat-onarim', emoji: '🔧', name: 'Tadilat & Onarım', description: 'Mutfak, banyo, genel tadilat' },
  { id: 'elektrik', emoji: '⚡', name: 'Elektrik', description: 'Tesisat, arıza, akıllı ev' },
  { id: 'tesisat', emoji: '🔩', name: 'Tesisat', description: 'Su, doğalgaz, kombi bakımı' },
  { id: 'mobilya-dekorasyon', emoji: '🪑', name: 'Mobilya & Dekorasyon', description: 'Montaj, iç dekorasyon, perde' },
  { id: 'dis-cephe', emoji: '🏠', name: 'Dış Cephe', description: 'Çatı, yalıtım, cephe kaplama' },
];

export default function CategoryPicker({ selected, onChange }: CategoryPickerProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div>
      <label className="text-xs font-semibold text-[#444] ml-1 block mb-3">
        Hizmet Kategorileri <span className="text-[#999] font-normal">(birden fazla seçebilirsiniz)</span>
      </label>

      <div className="grid grid-cols-2 gap-2.5">
        {categories.map((cat) => {
          const isSelected = selected.includes(cat.id);
          return (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => toggle(cat.id)}
              whileTap={{ scale: 0.97 }}
              className={`relative text-left p-3 rounded-[14px] border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-bright-green bg-bright-green/5 shadow-[0_0_0_2px_rgba(76,175,80,0.1)]'
                  : 'border-nature-input-border bg-white hover:border-[#ccc] hover:shadow-sm'
              }`}
            >
              {/* Checkmark */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-bright-green flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <span className="text-lg mt-0.5">{cat.emoji}</span>
                <div className="min-w-0">
                  <div className={`text-sm font-semibold transition-colors ${isSelected ? 'text-peyzart-green' : 'text-[#333]'}`}>
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-[#999] mt-0.5 leading-tight">
                    {cat.description}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <p className="text-[11px] text-bright-green font-medium mt-2.5 ml-1">
          {selected.length} kategori seçildi
        </p>
      )}
    </div>
  );
}
