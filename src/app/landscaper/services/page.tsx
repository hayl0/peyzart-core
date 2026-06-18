'use client';

import { useState } from 'react';
import { Plus, Power, Edit2, Clock, Star, ChevronDown, ChevronUp } from 'lucide-react';
import ShimmerSkeleton from '../_components/ShimmerSkeleton';
import EmptyState from '../_components/EmptyState';
import ErrorBanner from '../_components/ErrorBanner';
import Toast from '../_components/Toast';

interface Service {
  id: number;
  name: string;
  desc: string;
  price: number;
  unit: string;
  active: boolean;
  duration: string;
  rating: number;
}

interface DayHours {
  day: string;
  start: string;
  end: string;
  isOpen: boolean;
}

const INITIAL_SERVICES: Service[] = [
  { id: 1, name: 'Çim Biçme', desc: 'Profesyonel çim biçme ve bakım', price: 350, unit: 'seans', active: true, duration: '2-3 saat', rating: 4.8 },
  { id: 2, name: 'Bitki Dikimi', desc: 'Ağaç, çiçek ve peyzaj düzenlemesi', price: 450, unit: 'm²', active: true, duration: '3-4 saat', rating: 4.9 },
  { id: 3, name: 'Ağaç Budama', desc: 'Büyük ağaçlar için özel budama', price: 800, unit: 'adet', active: true, duration: '4-5 saat', rating: 4.7 },
  { id: 4, name: 'Sulama Sistemi', desc: 'Otomatik sulama sistemi kurulumu', price: 1200, unit: 'proje', active: false, duration: '6-8 saat', rating: 4.6 },
];

const DEFAULT_HOURS: DayHours[] = [
  { day: 'Pzt', start: '09:00', end: '18:00', isOpen: true },
  { day: 'Sal', start: '09:00', end: '18:00', isOpen: true },
  { day: 'Çar', start: '09:00', end: '18:00', isOpen: true },
  { day: 'Per', start: '09:00', end: '18:00', isOpen: true },
  { day: 'Cum', start: '09:00', end: '18:00', isOpen: true },
  { day: 'Cmt', start: '10:00', end: '16:00', isOpen: true },
  { day: 'Paz', start: '10:00', end: '16:00', isOpen: false },
];

export default function ServicesPage() {
  const [status, setStatus] = useState<'loading' | 'error' | 'empty' | 'success'>('success');
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', desc: '', price: '', unit: 'seans', duration: '' });
  const [showHours, setShowHours] = useState(false);
  const [workHours, setWorkHours] = useState<DayHours[]>(DEFAULT_HOURS);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const toggleService = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({ name: '', desc: '', price: '', unit: 'seans', duration: '' });
    setShowForm(true);
  };

  const openEditForm = (service: Service) => {
    setEditingId(service.id);
    setForm({ name: service.name, desc: service.desc, price: String(service.price), unit: service.unit, duration: service.duration });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ name: '', desc: '', price: '', unit: 'seans', duration: '' });
  };

  const saveService = () => {
    if (!form.name || !form.price) return;
    const { name, desc, price, unit, duration } = form;
    if (editingId) {
      setServices(services.map(s => s.id === editingId ? { ...s, name, desc, price: Number(price), unit, duration } : s));
      setToast({ message: 'Hizmet güncellendi', type: 'success' });
    } else {
      setServices([...services, { id: Date.now(), name, desc, price: Number(price), unit, duration, active: true, rating: 0 }]);
      setToast({ message: 'Hizmet eklendi', type: 'success' });
    }
    closeForm();
  };

  const toggleDay = (index: number) => {
    setWorkHours(workHours.map((d, i) => i === index ? { ...d, isOpen: !d.isOpen } : d));
  };

  const updateDay = (index: number, field: 'start' | 'end', value: string) => {
    setWorkHours(workHours.map((d, i) => i === index ? { ...d, [field]: value } : d));
  };

  if (status === 'loading') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-white">Hizmetlerim</h1>
          <button onClick={openAddForm} className="flex items-center gap-1.5 px-5 py-3 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
            <Plus size={16} />
            Hizmet Ekle
          </button>
        </div>
        <ShimmerSkeleton variant="card" count={3} />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-white">Hizmetlerim</h1>
          <button onClick={openAddForm} className="flex items-center gap-1.5 px-5 py-3 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
            <Plus size={16} />
            Hizmet Ekle
          </button>
        </div>
        <ErrorBanner message="Hizmetler yüklenirken bir hata oluştu" onRetry={() => setStatus('success')} />
      </div>
    );
  }

  const isEmpty = services.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-white">Hizmetlerim</h1>
        <button onClick={openAddForm} className="flex items-center gap-1.5 px-5 py-3 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
          <Plus size={16} />
          Hizmet Ekle
        </button>
      </div>

      {isEmpty ? (
        <EmptyState message="Henüz hizmet eklemediniz" actionLabel="Hizmet Ekle" onAction={openAddForm} />
      ) : (
        <>
          {showForm && (
            <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">{editingId ? 'Hizmeti Düzenle' : 'Yeni Hizmet'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Hizmet adı"
                  className="bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
                <input value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="Fiyat (₺)"
                  className="bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
              </div>
              <textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} rows={2} placeholder="Açıklama"
                className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30 resize-none" />
              <div className="flex gap-3">
                <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all">
                  <option value="seans">Seans</option>
                  <option value="m²">m²</option>
                  <option value="adet">Adet</option>
                  <option value="proje">Proje</option>
                </select>
                <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="Süre"
                  className="flex-1 bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-bright-green/40 transition-all placeholder:text-white/30" />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={saveService} className="px-6 py-3 bg-bright-green text-white rounded-[12px] text-xs font-bold hover:bg-bright-green/90 transition-all">
                  {editingId ? 'Güncelle' : 'Kaydet'}
                </button>
                <button onClick={closeForm} className="px-6 py-3 bg-white/5 text-white/60 rounded-[12px] text-xs font-bold hover:bg-white/10 transition-all">İptal</button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {services.map(s => (
              <div key={s.id} className={`bg-white/5 border rounded-[16px] p-4 md:p-5 transition-all ${s.active ? 'border-white/10' : 'border-white/5 opacity-50'}`}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm">{s.name}</h3>
                    {s.rating > 0 && (
                      <span className="flex items-center gap-0.5 text-[10px] text-yellow-400">
                        <Star size={10} className="fill-yellow-400" /> {s.rating}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/50">{s.desc}</p>
                  <div className="flex items-center gap-1 text-[11px] text-white/40">
                    <Clock size={11} /> {s.duration} / {s.unit}
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-1">
                    <span className="text-lg font-extrabold text-white">₺{s.price}</span>
                    <button onClick={() => toggleService(s.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${s.active ? 'bg-bright-green/20 text-bright-green' : 'bg-white/5 text-white/30'}`}>
                      <Power size={14} />
                    </button>
                    <button onClick={() => openEditForm(s)}
                      className="w-10 h-10 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all">
                      <Edit2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Çalışma Saatleri */}
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] overflow-hidden">
        <button onClick={() => setShowHours(!showHours)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-all">
          <span className="text-sm font-bold text-white">Çalışma Saatleri</span>
          {showHours ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
        </button>
        {showHours && (
          <div className="px-5 pb-4 space-y-2">
            {workHours.map((day, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-12 text-[11px] font-semibold text-white/60 shrink-0">{day.day}</span>
                <input type="time" value={day.start} onChange={e => updateDay(i, 'start', e.target.value)}
                  disabled={!day.isOpen}
                  className="flex-1 bg-white/5 border border-white/10 rounded-[12px] px-3 py-2 text-xs text-white outline-none focus:border-bright-green/40 transition-all disabled:opacity-30" />
                <span className="text-[11px] text-white/30 shrink-0">—</span>
                <input type="time" value={day.end} onChange={e => updateDay(i, 'end', e.target.value)}
                  disabled={!day.isOpen}
                  className="flex-1 bg-white/5 border border-white/10 rounded-[12px] px-3 py-2 text-xs text-white outline-none focus:border-bright-green/40 transition-all disabled:opacity-30" />
                <button onClick={() => toggleDay(i)}
                  className={`w-[52px] h-8 rounded-[10px] text-[10px] font-bold shrink-0 transition-all ${day.isOpen ? 'bg-bright-green/20 text-bright-green' : 'bg-white/5 text-white/30'}`}>
                  {day.isOpen ? 'Açık' : 'Kapalı'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
