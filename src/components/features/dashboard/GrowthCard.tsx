"use client";

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Sprout } from 'lucide-react';

const DATA = [
  { day: 0, val: 5 },
  { day: 10, val: 8 },
  { day: 25, val: 15 },
  { day: 42, val: 32 },
  { day: 55, val: 28 },
  { day: 70, val: 45 },
];

export const GrowthCard = () => {
  return (
    <div className="bg-greenish-darkest p-8 flex flex-col gap-6 h-full min-h-[400px] rounded-[2.5rem] shadow-liquid border border-white/5">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-bold text-white tracking-tight">Growth analytics</h3>
        <span className="text-xs font-semibold text-white/40 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Details</span>
      </div>

      <div className="flex-1 relative mt-10">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 z-10 shadow-lg">
          <Sprout className="w-4 h-4 text-greenish-dark" />
          <span className="text-xs font-bold text-greenish-dark">1.2 cm/day</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA}>
            <XAxis dataKey="day" hide />
            <YAxis hide />
            <Area 
                type="monotone" 
                dataKey="val" 
                stroke="#cddc39" 
                strokeWidth={3} 
                fillOpacity={0.2} 
                fill="#cddc39" 
                dot={{fill: '#cddc39', r: 4}}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-2">
        <span>0 days</span>
        <span>42 days</span>
        <span>70 days</span>
      </div>
    </div>
  );
};
