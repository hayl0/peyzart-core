"use client";

import { Sprout } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-12">
       <nav className="flex justify-between items-center mb-24 border-b-4 border-black pb-8">
          <div className="flex items-center gap-2">
             <Sprout className="w-8 h-8" />
             <span className="text-3xl font-black uppercase tracking-tighter">Peyzart</span>
          </div>
          <button className="bg-black text-white px-8 py-3">Launch Console</button>
       </nav>

       <div className="space-y-12">
          <h1 className="text-[120px] font-black leading-[0.9] tracking-tighter italic">GET <br/> SHIT <br/> DONE.</h1>
          <div className="flex gap-4">
            <input className="gsd-input w-96" placeholder="Task description..." />
            <button className="bg-black text-white px-10 py-4">Create Task</button>
          </div>
       </div>

       <div className="grid grid-cols-3 gap-8 mt-24">
          <div className="gsd-card">
            <h2 className="text-xl font-black mb-4">Marketplace</h2>
            <p className="mb-6">Browse landscapers and book instantly.</p>
            <Link href="/marketplace" className="underline font-black">Go to marketplace</Link>
          </div>
          <div className="gsd-card">
             <h2 className="text-xl font-black mb-4">Landscaper Panel</h2>
             <p className="mb-6">Manage your ongoing projects and earnings.</p>
             <Link href="/landscaper/dashboard" className="underline font-black">Open panel</Link>
          </div>
          <div className="gsd-card">
             <h2 className="text-xl font-black mb-4">Analytics</h2>
             <p className="mb-6">Data-driven performance tracking.</p>
             <Link href="/admin/dashboard" className="underline font-black">View data</Link>
          </div>
       </div>
    </div>
  );
}
