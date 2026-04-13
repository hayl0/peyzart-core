"use client";

import { useEffect, useRef } from 'react';
import { Sprout, Bell, Search, User, Droplets, Thermometer, Wind } from 'lucide-react';
import * as animeModule from 'animejs';
const anime = (animeModule as any).default || animeModule;

export const OverviewHeader = () => {
  const waterRef = useRef<HTMLSpanElement>(null);
  const phRef = useRef<HTMLSpanElement>(null);
  const tempRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Number Counters with Anime.js
    const animateValue = (targets: any, val: number) => {
        anime({
            targets,
            innerHTML: [0, val],
            round: 1,
            easing: 'easeOutExpo',
            duration: 2000,
            delay: 500
        });
    };

    if (waterRef.current) animateValue(waterRef.current, 85);
    if (phRef.current) animateValue(phRef.current, 6.5);
    if (tempRef.current) animateValue(tempRef.current, 24);
  }, []);

  return (
    <div className="relative w-full curved-header-bg p-8 md:p-12 text-white overflow-hidden min-h-[350px]">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <Sprout className="w-8 h-8 text-greenish-bright" />
          <span className="text-2xl font-black tracking-tight italic">greenish</span>
          <div className="h-6 w-px bg-white/20 mx-4 hidden md:block" />
          <nav className="hidden md:flex gap-8 text-sm font-bold text-white/70">
            <span className="text-white cursor-pointer flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-greenish-yellow rounded-full" />
              Dashboard
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">Analytics</span>
            <span className="hover:text-white transition-colors cursor-pointer">Management</span>
            <span className="hover:text-white transition-colors cursor-pointer">Task History</span>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded-full flex items-center gap-3 w-48 md:w-64 border border-white/10">
            <Search className="w-5 h-5 text-white/50" />
            <span className="text-sm font-bold text-white/50">Search</span>
          </div>
          <div className="bg-white p-1 rounded-full border-2 border-white/20">
            <div className="bg-greenish-dark p-1.5 rounded-full">
               <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <h1 className="text-6xl font-black tracking-tighter">Overview</h1>
        
        <div className="flex flex-wrap gap-12 mt-4">
          <StatItem icon={<Droplets className="w-5 h-5 text-greenish-yellow" />} label="Water (%)" value="85" suffix="%" refEl={waterRef} />
          <StatItem icon={<Wind className="w-5 h-5 text-greenish-yellow" />} label="PH Level" value="6.5" suffix=" pH" refEl={phRef} />
          <StatItem icon={<Thermometer className="w-5 h-5 text-greenish-yellow" />} label="Temperature (°C)" value="24" suffix="°C" refEl={tempRef} />
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value, suffix, refEl }: any) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2 text-white/60 font-bold text-sm uppercase tracking-wider">
      {icon}
      {label}
    </div>
    <div className="text-4xl font-black tracking-tight flex items-baseline">
        <span ref={refEl}>0</span>
        <span className="text-2xl ml-1">{suffix}</span>
    </div>
  </div>
);
