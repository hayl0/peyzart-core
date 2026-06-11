/**
 * Peyzart Booking Page - Final Build Ready
 * Cleaned from redundant wrappers and fully typed.
 */

"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Calendar, MapPin, Clock, CreditCard } from 'lucide-react';
import { LiquidButtonRed, LiquidButtonBlack } from '@/components/features/dashboard/LiquidUI';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '12 Nisan 2024',
    address: '',
    notes: ''
  });

  return (
    <div className="min-h-screen bg-[#0a0e14] p-6 md:p-12 max-w-4xl mx-auto">
      {/* Progress Stepper */}
      <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 ${step >= s ? 'bg-greenish-lime text-black shadow-lg shadow-greenish-lime/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
              {s}
            </div>
            {s < 3 && <div className={`w-12 h-0.5 rounded-full ${step > s ? 'bg-greenish-lime' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <h1 className="text-5xl font-black tracking-tighter text-white">Service <span className="text-white/20">Details</span></h1>
          
          <div className="bento-card space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Preferred Date</label>
              <div className="relative group">
                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-greenish-lime transition-colors" />
                <input 
                  type="text" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white font-medium outline-none focus:border-greenish-lime/30 transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Delivery Address</label>
              <div className="relative group">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-greenish-lime transition-colors" />
                <input 
                  type="text" 
                  placeholder="Enter your garden address..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white font-medium outline-none focus:border-greenish-lime/30 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Link href="/home" className="flex-1">
              <LiquidButtonBlack label="Cancel" className="w-full" />
            </Link>
            <LiquidButtonRed label="Next Step" className="flex-1" onClick={() => setStep(2)} />
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <h1 className="text-5xl font-black tracking-tighter text-white">Finalize <span className="text-white/20">Order</span></h1>
          
          <div className="bento-card space-y-8">
            <div className="flex justify-between items-center pb-6 border-b border-white/5">
               <div className="text-white/40 text-sm font-medium">Service Fee</div>
               <div className="text-white font-bold text-xl">$350.00</div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Card Details</label>
              <div className="relative group">
                <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-greenish-lime transition-colors" />
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white font-mono tracking-widest outline-none focus:border-greenish-lime/30 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <LiquidButtonBlack label="Back" className="flex-1" onClick={() => setStep(1)} />
            <LiquidButtonRed label="Pay & Confirm" className="flex-1" onClick={() => setStep(3)} />
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 space-y-8">
          <div className="w-24 h-24 bg-greenish-lime rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-greenish-lime/20 text-black">
            <ChevronRight className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-6xl font-black tracking-tighter text-white mb-4">Confirmed!</h1>
            <p className="text-white/40 text-xl font-medium max-w-md mx-auto">Your garden professional will contact you within 24 hours.</p>
          </div>
          <div className="flex flex-col gap-4 max-w-xs mx-auto pt-8">
            <Link href="/orders">
              <LiquidButtonRed label="View My Orders" className="w-full" />
            </Link>
            <Link href="/home">
              <LiquidButtonBlack label="Back to Home" className="w-full" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
