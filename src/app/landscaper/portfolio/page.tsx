'use client';

import { useState } from 'react';
import { Plus, Image, Upload, X, FolderOpen } from 'lucide-react';
import ShimmerSkeleton from '../_components/ShimmerSkeleton';
import EmptyState from '../_components/EmptyState';
import ErrorBanner from '../_components/ErrorBanner';
import TabFilter from '../_components/TabFilter';
import Toast from '../_components/Toast';

const CATEGORIES = ['Tümü', 'Bahçe Düzenleme', 'Çim Bakımı', 'Sulama', 'Ağaç Budama'];

const SAMPLE_ITEMS = [
  { id: 1, category: 'Bahçe Düzenleme', gradient: 'from-emerald-900/40 to-green-800/30' },
  { id: 2, category: 'Çim Bakımı', gradient: 'from-green-800/40 to-lime-900/30' },
  { id: 3, category: 'Sulama', gradient: 'from-teal-800/40 to-cyan-900/30' },
  { id: 4, category: 'Ağaç Budama', gradient: 'from-emerald-900/50 to-green-700/30' },
  { id: 5, category: 'Bahçe Düzenleme', gradient: 'from-green-700/40 to-emerald-900/30' },
  { id: 6, category: 'Çim Bakımı', gradient: 'from-lime-900/40 to-green-800/30' },
];

export default function PortfolioPage() {
  const [status, setStatus] = useState<'loading' | 'error' | 'empty' | 'success'>('success');
  const [activeTab, setActiveTab] = useState('Tümü');
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('Bahçe Düzenleme');
  const [description, setDescription] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const items = SAMPLE_ITEMS.filter(
    i => activeTab === 'Tümü' || i.category === activeTab
  );

  const handleUpload = () => {
    if (!description.trim()) return;
    setToast({ message: 'Fotoğraf yüklendi', type: 'success' });
    setShowModal(false);
    setDescription('');
  };

  if (status === 'loading') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-white">Portföyüm</h1>
          <button className="flex items-center gap-1.5 px-5 py-3 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
            <Plus size={16} />
            Fotoğraf Ekle
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <ShimmerSkeleton variant="card" count={6} />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-white">Portföyüm</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-5 py-3 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
            <Plus size={16} />
            Fotoğraf Ekle
          </button>
        </div>
        <ErrorBanner message="Portföy yüklenirken bir hata oluştu" onRetry={() => setStatus('success')} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-white">Portföyüm</h1>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-5 py-3 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
          <Plus size={16} />
          Fotoğraf Ekle
        </button>
      </div>

      <TabFilter tabs={CATEGORIES} active={activeTab} onChange={setActiveTab} />

      {items.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          message="Henüz fotoğraf eklemediniz"
          actionLabel="Fotoğraf Ekle"
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map(item => (
            <div key={item.id}
              className={`relative aspect-square rounded-[18px] bg-gradient-to-br ${item.gradient} border border-white/[0.08] overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]`}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Image size={28} className="text-white/50" />
                <span className="text-white/70 text-xs font-semibold">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1a2e1a] border border-white/[0.08] rounded-[24px] p-6 w-full max-w-lg space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Fotoğraf Yükle</h3>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center">
                <X size={16} />
              </button>
            </div>
            <div className="border-2 border-dashed border-white/[0.12] rounded-[18px] p-10 text-center hover:border-bright-green/40 transition-all cursor-pointer">
              <Upload size={32} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/30 text-xs">Sürükle bırak veya tıkla</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 mb-2 block">Kategori</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all">
                {CATEGORIES.slice(1).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 mb-2 block">Açıklama</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Fotoğraf hakkında kısa bir açıklama..."
                className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30 resize-none" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleUpload}
                className="flex-1 px-6 py-3 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
                Yükle
              </button>
              <button onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-white/5 text-white/60 rounded-[12px] text-xs font-bold hover:bg-white/10 transition-all">
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
