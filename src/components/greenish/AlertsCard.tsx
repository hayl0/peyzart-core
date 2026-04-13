"use client";

import { CheckCircle2, XCircle, Droplets, Leaf, Activity } from 'lucide-react';

const ALERTS = [
  { id: 1, icon: <Leaf className="w-5 h-5" />, title: "Container #12", subtitle: "Optimal growth", status: "ok" },
  { id: 2, icon: <Droplets className="w-5 h-5" />, title: "Container #8", subtitle: "Low water level", status: "error" },
  { id: 3, icon: <Activity className="w-5 h-5" />, title: "Container #14", subtitle: "pH above normal", status: "ok" },
];

export const AlertsCard = () => {
  return (
    <div className="greenish-glass-yellow p-8 flex flex-col gap-6 h-full min-h-[400px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-greenish-dark italic">Critical Alerts</h3>
        <span className="text-xs font-bold text-greenish-dark/40 uppercase tracking-widest cursor-pointer hover:text-greenish-dark transition-colors underline">See All</span>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {ALERTS.map((alert) => (
          <div key={alert.id} className="flex items-center gap-4 bg-white/30 backdrop-blur-md p-4 rounded-[2rem] border border-white/20">
            <div className="bg-white p-3 rounded-full text-greenish-dark">
              {alert.icon}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-greenish-dark/40 uppercase tracking-widest">{alert.title}</p>
              <p className="text-sm font-black text-greenish-dark italic">{alert.subtitle}</p>
            </div>
            {alert.status === 'ok' ? (
              <CheckCircle2 className="w-6 h-6 text-greenish-dark" />
            ) : (
              <XCircle className="w-6 h-6 text-greenish-dark" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
