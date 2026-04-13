"use client";

import { GardenScene } from '@/components/visuals/GardenScene';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle2, MoreHorizontal } from 'lucide-react';

const MINI_DATA = [
  { time: 10, val: 5 },
  { time: 11, val: 3 },
  { time: 12, val: 8 },
  { time: 13, val: 4 },
  { time: 14, val: 6 },
  { time: 15, val: 5 },
  { time: 16, val: 7 },
  { time: 17, val: 6 },
  { time: 18, val: 5 },
];

export const ActivitySidebar = () => {
  return (
    <div className="greenish-glass-white p-8 flex flex-col gap-8 h-full">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-greenish-dark italic">Activity Overview</h3>
        <span className="text-xs font-bold text-greenish-dark/40 uppercase tracking-widest cursor-pointer hover:text-greenish-dark transition-colors underline">Details</span>
      </div>

      {/* 3D Visual Section */}
      <div className="h-64 bg-greenish-bg/50 rounded-[3rem] overflow-hidden relative border border-white">
        <GardenScene />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-greenish-dark border border-white flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full" /> Health
            </span>
            <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-greenish-dark border border-white flex items-center gap-1">
                <div className="w-2 h-2 bg-greenish-bright rounded-full" /> Water
            </span>
            <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-greenish-dark border border-white flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full" /> pH Level
            </span>
        </div>
      </div>

      {/* Mini Graph Section */}
      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-black text-greenish-dark/30 uppercase tracking-widest">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span className="text-greenish-dark bg-greenish-dark/10 px-2 rounded-full">Fri</span><span>Sat</span>
        </div>
        <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MINI_DATA}>
                    <Area type="monotone" dataKey="val" stroke="#1E2D24" strokeWidth={2} fill="#F1F5F9" fillOpacity={0.5} dot={{fill: '#1E2D24', r: 2}} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-[10px] font-black text-greenish-dark/30 uppercase tracking-widest">
            <span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span>
        </div>
      </div>

      {/* Schedule Items */}
      <div className="flex flex-col gap-4">
        <ScheduleItem 
            title="Watering System Adjustment" 
            time="10:30–11:00" 
            status="Scheduled" 
            statusColor="bg-greenish-bg text-greenish-dark" 
        />
        <ScheduleItem 
            title="Fertilizer Check" 
            time="11:30–12:00" 
            status="Completed" 
            statusColor="bg-greenish-bg text-greenish-dark/40" 
            icon={<CheckCircle2 className="w-4 h-4" />}
        />
        <ScheduleItem 
            title="Lighting Adjustment" 
            time="18:00–18:30" 
            status="In Progress" 
            statusColor="bg-greenish-bg text-greenish-dark" 
        />
      </div>
    </div>
  );
};

const ScheduleItem = ({ title, time, status, statusColor, icon }: any) => (
  <div className="flex flex-col gap-1 p-4 rounded-3xl bg-greenish-bg/20 border border-white/50 hover:bg-white/40 transition-colors cursor-pointer group">
    <div className="flex justify-between items-start">
        <div className="space-y-1">
            <h4 className="text-sm font-black text-greenish-dark italic">{title}</h4>
            <div className="flex items-center gap-2 text-[10px] font-bold text-greenish-dark/40 uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                {time}
            </div>
        </div>
        <div className={`px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-tighter ${statusColor} border border-white`}>
            {status}
        </div>
    </div>
  </div>
);
