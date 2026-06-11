"use client";

import { MoreHorizontal, Droplets, Wind, Zap, Thermometer } from 'lucide-react';

const STATUS_DATA = [
  { id: 1, name: "№1", health: 96, water: 80, ph: 6.5, nutrient: 85, temp: 24 },
  { id: 2, name: "№2", health: 78, water: 70, ph: 6.5, nutrient: 67, temp: 21 },
];

export const StatusTable = () => {
  return (
    <div className="greenish-glass-white p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-greenish-dark italic">Active Containers Status</h3>
        <span className="text-xs font-bold text-greenish-dark/40 uppercase tracking-widest cursor-pointer hover:text-greenish-dark transition-colors underline">Explore all</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-greenish-dark/30 uppercase tracking-widest border-b border-greenish-dark/5">
              <th className="pb-4">№</th>
              <th className="pb-4">Health</th>
              <th className="pb-4">Water (%)</th>
              <th className="pb-4">PH Level</th>
              <th className="pb-4">Nutrient (%)</th>
              <th className="pb-4">Temperature (°C)</th>
              <th className="pb-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-bold text-greenish-dark">
            {STATUS_DATA.map((row) => (
              <tr key={row.id} className="border-b border-greenish-dark/5 last:border-0">
                <td className="py-6 font-black italic">{row.name}</td>
                <td className="py-6">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-greenish-bg rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${row.health > 80 ? 'bg-greenish-bright' : 'bg-red-400'}`} 
                                style={{ width: `${row.health}%` }} 
                            />
                        </div>
                        <span className="text-xs">{row.health}%</span>
                    </div>
                </td>
                <td className="py-6">
                    <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        {row.water}%
                    </div>
                </td>
                <td className="py-6">
                    <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-green-400" />
                        {row.ph} pH
                    </div>
                </td>
                <td className="py-6">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        {row.nutrient}%
                    </div>
                </td>
                <td className="py-6">
                    <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-orange-400" />
                        {row.temp}°C
                    </div>
                </td>
                <td className="py-6 text-right">
                    <button className="bg-greenish-dark text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
