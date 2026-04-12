"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Upload, Sparkles, 
  Sprout, Droplets, Sun, AlertTriangle, 
  ChevronRight, RefreshCcw, CheckCircle2
} from 'lucide-react';

export const GardenAnalyzer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        startAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setResults(null);
    // Simulate AI Analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        health: 85,
        plants: ['Çim (Lolium Perenne)', 'Şimşir', 'Gül'],
        issues: ['Hafif Demir Eksikliği', 'Düzensiz Sulama'],
        recommendations: [
          'Haftada 3 kez, sabah saatlerinde sulama yapın.',
          'Demir içerikli gübre takviyesi uygulayın.',
          'Çim boyunu 4cm seviyesinde tutun.'
        ]
      });
    }, 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl space-y-8 overflow-hidden relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">AI Bahçe Uzmanı</span>
          </div>
          <h2 className="text-3xl font-black text-primary-dark tracking-tighter uppercase italic">Bahçe Analizi</h2>
          <p className="text-primary-dark/40 font-bold">Fotoğraf yükleyin, AI bahçenizi tarasın ve reçete hazırlasın.</p>
        </div>
        {!image && (
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            <Camera className="w-5 h-5" />
            Fotoğraf Seç
          </button>
        )}
      </div>

      <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />

      <div className="relative aspect-video rounded-[2.5rem] bg-primary/5 border-2 border-dashed border-primary/10 overflow-hidden flex items-center justify-center group">
        <AnimatePresence mode="wait">
          {!image ? (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="p-6 bg-white rounded-3xl shadow-sm text-primary group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10" />
              </div>
              <p className="text-sm font-bold text-primary-dark/30 uppercase tracking-widest">Sürükle bırak veya tıklayarak yükle</p>
            </motion.div>
          ) : (
            <motion.div 
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full h-full"
            >
              <img src={image} className="w-full h-full object-cover" alt="Garden" />
              
              {/* Scanning Laser Animation */}
              {isAnalyzing && (
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(46,125,50,1)] z-10"
                />
              )}

              {/* Analyzing Overlay */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-white/90 p-8 rounded-[2rem] shadow-xl flex flex-col items-center gap-4">
                    <RefreshCcw className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-sm font-black text-primary-dark uppercase tracking-widest">Bahçe Analiz Ediliyor...</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Analysis Results */}
      <AnimatePresence>
        {results && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-primary/5"
          >
            {/* Health Score */}
            <div className="p-8 bg-nature-mesh rounded-3xl border border-primary/10 text-center space-y-4 shadow-sm">
               <div className="relative inline-flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#E8F5E9" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="48" cy="48" r="40" stroke="#2E7D32" strokeWidth="8" fill="transparent" 
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 * (1 - results.health / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xl font-black text-primary-dark">{results.health}%</span>
               </div>
               <p className="text-xs font-black text-primary uppercase tracking-widest">Genel Sağlık Skoru</p>
            </div>

            {/* AI Insights */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/60 rounded-2xl border border-primary/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sprout className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black uppercase text-primary-dark/40">Tespit Edilen Türler</span>
                  </div>
                  <p className="text-sm font-bold text-primary-dark">{results.plants.join(', ')}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-[10px] font-black uppercase text-red-700/40">Olası Sorunlar</span>
                  </div>
                  <p className="text-sm font-bold text-red-700">{results.issues.join(', ')}</p>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-4">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest">AI Önerileri</h4>
                <div className="space-y-3">
                  {results.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                      <p className="text-sm font-bold text-primary-dark/70 leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/30 flex items-center justify-center gap-3 group">
                Bu Bahçeye Uzman Bul
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
