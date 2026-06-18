'use client';

import { ReactNode } from 'react';
import BottomTabBar from './BottomTabBar';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <Sidebar />
      <main className="lg:ml-64 pb-16 lg:pb-0">
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}
