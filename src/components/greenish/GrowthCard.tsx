"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
    <div className="greenish-glass-dark p-8 flex flex-col gap-6 h-full min-h-[400px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-white italic">Growth analytics</h3>
        <span className="text-xs font-bold text-white/40 uppercase tracking-widest cursor-pointer hover:text-white transition-colors underline">Details</span>
      </div>

      <div className="flex-1 relative mt-4">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 flex items-center gap-2 z-10">
          <Sprout className="w-4 h-4 text-greenish-bright" />
          <span className="text-xs font-black text-white italic">1.2 cm/day</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} 
                label={{ value: 'Days', position: 'insideBottom', offset: -10, fill: 'rgba(255,255,255,0.2)' }}
            />
            <YAxis hide />
            <Tooltip 
                contentStyle={{backgroundColor: '#1E2D24', border: 'none', borderRadius: '12px', color: 'white'}}
                itemStyle={{color: '#4CAF50'}}
            />
            <Area 
                type="monotone" 
                dataKey="val" 
                stroke="#4CAF50" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorVal)" 
                dot={{fill: '#4CAF50', r: 4}}
                activeDot={{r: 6, stroke: 'white', strokeWidth: 2}}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-widest">
        <span>0 days</span>
        <span>42 days</span>
        <span>70 days</span>
      </div>
    </div>
  );
};
