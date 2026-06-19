'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import BottomTabBar from './BottomTabBar';
import Sidebar from './Sidebar';

const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false })
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false })

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)]">
        <Sidebar />
        <main className="lg:ml-64 pb-16 lg:pb-0">
          {children}
        </main>
        <BottomTabBar />
      </div>
      {/* Kinetic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-greenish-bright/5 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-greenish-lime/5 rounded-full blur-[150px]" />
      </div>
    </SmoothScroll>
  );
}
