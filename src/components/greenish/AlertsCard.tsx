"use client";

import { CheckCircle2, XCircle, Droplets, Leaf, Activity } from 'lucide-react';

const ALERTS = [
  { id: 1, icon: <Leaf className="w-5 h-5" />, title: "Container #12", subtitle: "Optimal growth", status: "ok" },
  { id: 2, icon: <Droplets className="w-5 h-5" />, title: "Container #8", subtitle: "Low water level", status: "error" },
  { id: 3, icon: <Activity className="w-5 h-5" />, title: "Container #14", subtitle: "pH above normal", status: "ok" },
];

export const AlertsCard = () => {
  return (
    <div className="bg-greenish-yellow p-8 flex flex-col gap-8 h-full min-h-[400px] rounded-[2.5rem] shadow-liquid">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-bold text-greenish-darkest tracking-tight">Critical Alerts</h3>
        <span className="text-xs font-bold text-greenish-darkest/40 uppercase tracking-widest cursor-pointer hover:text-greenish-darkest transition-colors">See All</span>
      </div>

      <div className="flex flex-col gap-4 mt-2 px-2">
        {ALERTS.map((alert) => (
          <div key={alert.id} className="flex items-center gap-4 py-4 border-b border-greenish-darkest/5 last:border-0">
            <div className="bg-white/20 p-3 rounded-full text-greenish-darkest">
              {alert.icon}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-greenish-darkest/40 uppercase tracking-widest leading-none mb-1">{alert.title}</p>
              <p className="text-sm font-bold text-greenish-darkest">{alert.subtitle}</p>
            </div>
            {alert.status === 'ok' ? (
              <CheckCircle2 className="w-5 h-5 text-greenish-darkest" />
            ) : (
              <XCircle className="w-5 h-5 text-greenish-darkest" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
