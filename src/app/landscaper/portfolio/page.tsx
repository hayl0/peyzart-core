'use client';

import { useState, useEffect } from 'react';
import { Plus, X, FolderOpen, Trash2 } from 'lucide-react';
import { api } from '@/lib/api-client';
import ShimmerSkeleton from '../_components/ShimmerSkeleton';
import EmptyState from '../_components/EmptyState';
import ErrorBanner from '../_components/ErrorBanner';
import TabFilter from '../_components/TabFilter';
import Toast from '../_components/Toast';

const CATEGORIES = ['Tümü', 'Bahçe Düzenleme', 'Çim Bakımı', 'Sulama', 'Ağaç Budama'];

interface PortfolioItem {
  id: string;
  url: string;
  category: string;
  description: string;
  createdAt: string;
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'empty' | 'success'>('loading');
  const [activeTab, setActiveTab] = useState('Tümü');
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('Bahçe Düzenleme');
  const [description, setDescription] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchItems = async () => {
    try {
      setStatus('loading');
      const data = await api.get<{ items: PortfolioItem[] }>('/api/landscaper/portfolio');
      if (data.items.length === 0) {
        setStatus('empty');
      } else {
        setItems(data.items);
        setStatus('success');
      }
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter(
    i => activeTab === 'Tümü' || i.category === activeTab
  );

  const handleUpload = async () => {
    if (!file || !description.trim()) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('description', description);

    try {
      const res = await fetch('/api/landscaper/portfolio/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Yükleme başarısız');
      setItems(prev => [...prev, json.data]);
      setToast({ message: 'Fotoğraf yüklendi', type: 'success' });
      setShowModal(false);
      setFile(null);
      setDescription('');
    } catch {
      setToast({ message: 'Yükleme sırasında bir hata oluştu', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/landscaper/portfolio/${id}`);
      setItems(prev => prev.filter(item => item.id !== id));
      if (items.length === 1) setStatus('empty');
      setToast({ message: 'Fotoğraf silindi', type: 'success' });
    } catch {
      setToast({ message: 'Silme sırasında bir hata oluştu', type: 'error' });
    }
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
        <ErrorBanner message="Portföy yüklenirken bir hata oluştu" onRetry={fetchItems} />
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

      {filteredItems.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          message="Henüz fotoğraf eklemediniz"
          actionLabel="Fotoğraf Ekle"
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredItems.map(item => (
            <div key={item.id}
              className="relative aspect-square rounded-[18px] border border-white/[0.08] overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.description}
                className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white text-xs font-semibold drop-shadow-lg">{item.category}</span>
              </div>
              <button onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/70">
                <Trash2 size={12} className="text-white" />
              </button>
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
            <form onSubmit={e => { e.preventDefault(); handleUpload(); }} className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-white/50 mb-2 block">Fotoğraf</label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)}
                  className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all file:mr-3 file:py-1 file:px-3 file:rounded-[10px] file:border-0 file:bg-bright-green file:text-white file:text-xs file:font-semibold hover:file:bg-bright-green/90" />
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
                <button type="submit"
                  className="flex-1 px-6 py-3 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
                  Yükle
                </button>
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-white/5 text-white/60 rounded-[12px] text-xs font-bold hover:bg-white/10 transition-all">
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
