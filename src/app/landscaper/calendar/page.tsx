'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Circle, Plus } from 'lucide-react';
import ShimmerSkeleton from '@/app/landscaper/_components/ShimmerSkeleton';
import EmptyState from '@/app/landscaper/_components/EmptyState';
import ErrorBanner from '@/app/landscaper/_components/ErrorBanner';

interface Appointment {
  time: string;
  customer: string;
  service: string;
}

interface DayInfo {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: Appointment[];
}

const SAMPLE_APPOINTMENTS: Record<string, Appointment[]> = {
  '2026-5-5': [
    { time: '10:00', customer: 'Ahmet Yılmaz', service: 'Çim Biçme' },
    { time: '14:00', customer: 'Zeynep Kaya', service: 'Bitki Dikimi' },
  ],
  '2026-5-12': [
    { time: '09:30', customer: 'Can Demir', service: 'Sulama Sistemi' },
  ],
  '2026-5-15': [
    { time: '11:00', customer: 'Mehmet Şahin', service: 'Çim Biçme' },
    { time: '15:30', customer: 'Elif Demirtaş', service: 'Peyzaj Tasarım' },
  ],
  '2026-5-22': [
    { time: '13:00', customer: 'Ali Yıldız', service: 'Ağaç Budama' },
  ],
  '2026-5-28': [
    { time: '08:00', customer: 'Ayşe Kara', service: 'Çim Biçme' },
    { time: '10:00', customer: 'Burak Öztürk', service: 'Bitki Dikimi' },
    { time: '16:00', customer: 'Cemre Ak', service: 'Sulama Sistemi' },
  ],
};

const DAY_HEADERS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const MONTHS_TR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

const TODAY = new Date(2026, 5, 18);

function getCalendarDays(year: number, month: number): DayInfo[] {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;

  const days: DayInfo[] = [];

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
      isToday: false,
      appointments: [],
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    days.push({
      day: d,
      month,
      year,
      isCurrentMonth: true,
      isToday:
        date.getFullYear() === TODAY.getFullYear() &&
        date.getMonth() === TODAY.getMonth() &&
        date.getDate() === TODAY.getDate(),
      appointments: SAMPLE_APPOINTMENTS[`${year}-${month}-${d}`] || [],
    });
  }

  const remaining = 42 - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let d = 1; d <= remaining; d++) {
    days.push({
      day: d,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
      isToday: false,
      appointments: [],
    });
  }

  return days;
}

const DEFAULT_WORK_DAYS: { day: string; isOpen: boolean }[] = [
  { day: 'Pzt', isOpen: true },
  { day: 'Sal', isOpen: true },
  { day: 'Çar', isOpen: true },
  { day: 'Per', isOpen: true },
  { day: 'Cum', isOpen: true },
  { day: 'Cmt', isOpen: true },
  { day: 'Paz', isOpen: false },
];

export default function CalendarPage() {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(5);
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const [workDays, setWorkDays] = useState(DEFAULT_WORK_DAYS);
  const [showHolidayPicker, setShowHolidayPicker] = useState(false);
  const [holidayDate, setHolidayDate] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setStatus('success'), 800);
    return () => clearTimeout(timer);
  }, []);

  const calendarDays = useMemo(() => getCalendarDays(viewYear, viewMonth), [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
    setSelectedDay(null);
  };

  const toggleWorkDay = (index: number) => {
    setWorkDays(workDays.map((d, i) => (i === index ? { ...d, isOpen: !d.isOpen } : d)));
  };

  const addHoliday = () => {
    if (!holidayDate) return;
    setShowHolidayPicker(false);
    setHolidayDate('');
  };

  if (status === 'loading') {
    return (
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-bold text-white">Takvim</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <ShimmerSkeleton variant="card" count={1} />
          <ShimmerSkeleton variant="card" count={1} />
        </div>
        <ShimmerSkeleton variant="card" count={1} />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-bold text-white">Takvim</h1>
        <ErrorBanner message="Takvim yüklenirken bir hata oluştu" onRetry={() => setStatus('loading')} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-white">Takvim</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Calendar Grid */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <ChevronLeft size={16} className="text-white/60" />
            </button>
            <h2 className="text-sm font-bold text-white">{MONTHS_TR[viewMonth]} {viewYear}</h2>
            <button onClick={nextMonth} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <ChevronRight size={16} className="text-white/60" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAY_HEADERS.map((d, i) => (
              <div key={i} className="text-center text-[10px] font-bold text-white/40 uppercase tracking-wide py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((day, i) => {
              const isSelected =
                selectedDay?.day === day.day &&
                selectedDay?.month === day.month &&
                selectedDay?.year === day.year;
              const hasAppointments = day.appointments.length > 0;

              return (
                <button
                  key={i}
                  onClick={() => day.isCurrentMonth && setSelectedDay(day)}
                  disabled={!day.isCurrentMonth}
                  className="relative flex items-center justify-center py-1"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all ${
                      isSelected
                        ? 'bg-lime-500/30 text-lime-300'
                        : day.isToday
                        ? 'border border-bright-green text-white'
                        : day.isCurrentMonth
                        ? 'text-white/80 hover:bg-white/10'
                        : 'text-white/20'
                    }`}
                  >
                    {day.day}
                  </div>
                  {hasAppointments && (
                    <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-bright-green" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Panel */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-4 md:p-5">
          {selectedDay ? (
            <>
              <h3 className="text-xs font-bold text-white/60 uppercase tracking-wide mb-1">
                {selectedDay.day} {MONTHS_TR[selectedDay.month]} {selectedDay.year}
              </h3>
              <p className="text-sm font-bold text-white mb-4">Günün Randevuları</p>
              {selectedDay.appointments.length > 0 ? (
                <div className="space-y-2">
                  {selectedDay.appointments.map((apt, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-[12px] p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Circle size={6} className="fill-bright-green text-bright-green shrink-0" />
                        <span className="text-xs font-bold text-white">{apt.time}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-bright-green mb-0.5">{apt.customer}</p>
                      <p className="text-[10px] text-white/40">{apt.service}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="Bu günde randevu bulunmuyor" />
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <p className="text-xs text-white/30">Bir gün seçin</p>
            </div>
          )}
        </div>
      </div>

      {/* Müsaitlik Yönetimi */}
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-[18px] p-4 md:p-5">
        <h2 className="text-sm font-bold text-white mb-4">Müsaitlik Yönetimi</h2>
        <div className="space-y-2 mb-4">
          {workDays.map((wd, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-white/60 w-12">{wd.day}</span>
              <button
                onClick={() => toggleWorkDay(i)}
                className={`px-4 py-1.5 rounded-[10px] text-[10px] font-bold transition-all ${
                  wd.isOpen ? 'bg-bright-green/20 text-bright-green' : 'bg-white/5 text-white/30'
                }`}
              >
                {wd.isOpen ? 'Çalışıyor' : 'Kapalı'}
              </button>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-4">
          {showHolidayPicker ? (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={holidayDate}
                onChange={e => setHolidayDate(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-[12px] px-3 py-2 text-xs text-white outline-none focus:border-bright-green/40 transition-all"
              />
              <button onClick={addHoliday} className="px-4 py-2 bg-bright-green text-white rounded-[10px] text-[10px] font-bold hover:bg-bright-green/90 transition-all">
                Ekle
              </button>
              <button onClick={() => { setShowHolidayPicker(false); setHolidayDate(''); }} className="px-4 py-2 bg-white/5 text-white/50 rounded-[10px] text-[10px] font-bold hover:bg-white/10 transition-all">
                İptal
              </button>
            </div>
          ) : (
            <button onClick={() => setShowHolidayPicker(true)} className="flex items-center gap-1.5 text-[11px] font-semibold text-bright-green hover:text-bright-green/80 transition-all">
              <Plus size={14} />
              Tatil Ekle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
