/**
 * Peyzart Smooth Scroll Provider
 * Uses Lenis for momentum-based, buttery smooth scrolling.
 * Essential for premium "High-End" feel.
 */

"use client";

import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <ReactLenis root options={{ 
      duration: 1.5, 
      lerp: 0.1, 
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false 
    }}>
      {children}
    </ReactLenis>
  );
}
