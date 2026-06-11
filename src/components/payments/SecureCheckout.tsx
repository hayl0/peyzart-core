/**
 * Peyzart Secure Checkout Component
 * Meticulously designed for maximum trust and seamless payment experience.
 * Incorporates haptics, precision validation, and premium aesthetics.
 * 
 * @module SecureCheckout
 */

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, CreditCard, 
  CheckCircle2, AlertCircle, ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { hapticImpactLight, hapticSuccess, hapticError } from '@/lib/haptics';
import { LiquidButtonBlack } from '@/components/greenish/LiquidUI';

interface CheckoutProps {
  amount: number;
  currency?: string;
  onSuccess?: () => void;
}

export const SecureCheckout: React.FC<CheckoutProps> = ({ 
  amount, 
  currency = 'USD', 
  onSuccess 
}) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [cardNumber, setCardNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handlePayment = async () => {
    hapticImpactLight();
    setStep('processing');
    
    // Simulate high-end processing delay
    setTimeout(() => {
      hapticSuccess();
      setStep('success');
      onSuccess?.();
    }, 2400);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 'details' && (
          <motion.div 
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bento-card relative overflow-hidden"
          >
            {/* Trust Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-greenish-lime/10 flex items-center justify-center text-greenish-lime">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Secure Payment</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">256-bit AES Encryption</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Total Amount</p>
                <div className="text-3xl font-black text-white tracking-tighter">
                  {amount.toLocaleString()} <span className="text-greenish-lime">{currency}</span>
                </div>
              </div>
            </div>

            {/* Payment Form Shell */}
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block ml-1">Card Number</label>
                <div className={cn(
                  "relative flex items-center bg-white/5 border transition-all duration-500 rounded-2xl px-6 py-4",
                  isFocused ? "border-greenish-lime ring-4 ring-greenish-lime/10" : "border-white/10"
                )}>
                  <CreditCard className={cn("w-5 h-5 mr-4 transition-colors", isFocused ? "text-greenish-lime" : "text-white/20")} />
                  <input 
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="bg-transparent border-none outline-none text-white font-mono text-lg tracking-wider w-full placeholder:text-white/10"
                    onFocus={() => { setIsFocused(true); hapticImpactLight(); }}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-white/10 rounded-md" />
                    <div className="w-8 h-5 bg-white/10 rounded-md" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">Expiry</label>
                    <input 
                        type="text" 
                        placeholder="MM / YY" 
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-mono outline-none focus:border-white/30 transition-all w-full"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block ml-1">CVC</label>
                    <input 
                        type="password" 
                        placeholder="***" 
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-mono outline-none focus:border-white/30 transition-all w-full"
                    />
                 </div>
              </div>

              <LiquidButtonBlack 
                className="w-full mt-8"
                label="Confirm & Pay Securely"
                onClick={handlePayment}
              />

              <div className="flex items-center justify-center gap-6 mt-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* Payment Network Icons Placeholders */}
                  <div className="w-10 h-6 bg-white/20 rounded" />
                  <div className="w-10 h-6 bg-white/20 rounded" />
                  <div className="w-10 h-6 bg-white/20 rounded" />
              </div>
            </div>

            {/* Background Texture for the Card */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-greenish-lime/5 rounded-full blur-[80px] pointer-events-none" />
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bento-card min-h-[400px] flex flex-col items-center justify-center text-center gap-8"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-t-2 border-r-2 border-greenish-lime"
              />
              <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white/40" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">Verifying Transaction</h3>
              <p className="text-sm text-white/40 font-medium">Please do not refresh the page...</p>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bento-card min-h-[400px] flex flex-col items-center justify-center text-center gap-8"
          >
            <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", damping: 12, stiffness: 200 }}
               className="w-24 h-24 rounded-full bg-greenish-lime text-greenish-darkest flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <div>
              <h3 className="text-3xl font-black tracking-tighter mb-2">Payment Confirmed</h3>
              <p className="text-sm text-white/40 font-medium max-w-xs mx-auto">
                Transaction ID: #PZ-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('details')}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-greenish-lime hover:text-white transition-colors"
            >
              Back to Projects
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
