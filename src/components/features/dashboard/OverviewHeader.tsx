/**
 * Peyzart Overview Header Component
 * A premium, high-fidelity header featuring Bento-grid style stats and smooth animations.
 * 
 * @module OverviewHeader
 */

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, BarChart2, Briefcase, ClipboardList, 
  Bell, Search, User, Droplets, Wind, Thermometer,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  delay?: number;
}

/**
 * Navigation Item Component with hover effects and active state indicators.
 */
const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => (
  <motion.button 
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={cn(
      "cursor-pointer flex items-center gap-2.5 transition-all duration-300 relative px-2 py-1",
      active ? 'text-white font-bold' : 'text-white/60 hover:text-white font-medium'
    )}
    aria-current={active ? 'page' : undefined}
  >
    {icon}
    <span className="text-sm tracking-wide">{label}</span>
    {active && (
      <motion.div 
        layoutId="nav-underline"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-greenish-lime rounded-full"
      />
    )}
  </motion.button>
);

/**
 * Bento-style Stat Item with subtle entrance animations and glass effects.
 */
const StatItem: React.FC<StatItemProps> = ({ icon, label, value, trend, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="group relative bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl flex flex-col gap-4 min-w-[200px] flex-1 hover:bg-white/10 transition-colors"
  >
    <div className="flex items-center justify-between">
      <div className="p-2.5 rounded-xl bg-greenish-lime/10 text-greenish-lime group-hover:scale-110 transition-transform">
        {icon}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-[10px] font-bold text-greenish-lime uppercase tracking-widest bg-greenish-lime/5 px-2 py-1 rounded-full">
          <ArrowUpRight className="w-3 h-3" />
          {trend}
        </div>
      )}
    </div>
    
    <div className="flex flex-col gap-1">
      <span className="text-white/40 font-bold text-[10px] uppercase tracking-[0.2em]">{label}</span>
      <div className="text-4xl font-bold tracking-tighter text-white group-hover:text-greenish-lime transition-colors">
        {value}
      </div>
    </div>
  </motion.div>
);

/**
 * Main Overview Header Component
 */
export const OverviewHeader: React.FC = () => {
  return (
    <header className="relative w-full p-8 md:p-12 text-white overflow-hidden bg-greenish-darkest">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-greenish-bright/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-greenish-lime/10 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />

      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-24 max-w-7xl mx-auto">
        <div className="flex items-center gap-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-greenish-lime rounded-2xl flex items-center justify-center shadow-lg shadow-greenish-lime/20">
                <div className="w-5 h-5 bg-greenish-darkest rounded-md rotate-45" />
            </div>
            <span className="text-2xl font-black tracking-tighter italic">PEYZART</span>
          </motion.div>
          
          <nav className="hidden lg:flex gap-10">
            <NavItem icon={<Home className="w-4 h-4" />} label="Dashboard" active />
            <NavItem icon={<BarChart2 className="w-4 h-4" />} label="Analytics" />
            <NavItem icon={<Briefcase className="w-4 h-4" />} label="Projects" />
            <NavItem icon={<ClipboardList className="w-4 h-4" />} label="History" />
          </nav>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="relative group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-greenish-lime transition-colors" />
            <input 
              type="text"
              placeholder="Quick search..."
              className="bg-white/5 border border-white/10 pl-12 pr-6 py-2.5 rounded-2xl w-64 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-greenish-lime/30 focus:bg-white/10 transition-all backdrop-blur-md"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
              <Bell className="w-5 h-5 text-white/80" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-greenish-darkest" />
            </button>
            <div className="w-11 h-11 bg-white rounded-2xl p-0.5 shadow-xl rotate-3 hover:rotate-0 transition-transform cursor-pointer overflow-hidden">
               <div className="w-full h-full bg-greenish-lime flex items-center justify-center rounded-xl">
                  <User className="w-6 h-6 text-greenish-darkest" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Bento Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-2 mb-12"
        >
          <span className="text-greenish-lime font-bold text-xs uppercase tracking-[0.3em]">Overview Dashboard</span>
          <h1 className="text-7xl font-black tracking-tighter text-white">
            System <span className="text-white/20">Pulse</span>
          </h1>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatItem 
            icon={<Droplets className="w-6 h-6" />} 
            label="Hydration Level" 
            value="85%" 
            trend="+2.4%"
            delay={0.1}
          />
          <StatItem 
            icon={<Wind className="w-6 h-6" />} 
            label="Soil PH Balance" 
            value="6.5" 
            trend="STABLE"
            delay={0.2}
          />
          <StatItem 
            icon={<Thermometer className="w-6 h-6" />} 
            label="Ambient Temp" 
            value="24°C" 
            trend="-1.2%"
            delay={0.3}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-greenish-lime p-8 rounded-[2rem] flex flex-col justify-between group cursor-pointer hover:bg-white transition-all duration-500"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-greenish-darkest rounded-2xl flex items-center justify-center text-greenish-lime group-hover:bg-greenish-lime group-hover:text-greenish-darkest transition-colors">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-greenish-darkest/40">Action Required</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-black text-greenish-darkest tracking-tight">Generate AI Report</div>
              <p className="text-greenish-darkest/60 text-xs font-medium">Ready for your weekly analysis</p>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
