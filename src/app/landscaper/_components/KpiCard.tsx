'use client';
import { type LucideIcon } from 'lucide-react';

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  iconBg: string;
  iconColor: string;
  changeColor?: string;
}

export default function KpiCard({ icon: Icon, label, value, change, iconBg, iconColor, changeColor = 'text-bright-green' }: KpiCardProps) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-[18px] p-4 hover:bg-white/[0.05] transition-all">
      <div className="flex items-center gap-2.5 mb-2">
        <div className={`p-[7px] rounded-[9px] ${iconBg}`}>
          <Icon size={13} className={iconColor} />
        </div>
        <span className="text-[9px] font-semibold tracking-[0.3px] text-white/30 uppercase">{label}</span>
      </div>
      <div className="text-[22px] font-bold text-white">{value}</div>
      <div className={`text-[9px] mt-[3px] flex items-center gap-1 ${changeColor}`}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"/></svg>
        {change}
      </div>
    </div>
  );
}
