/**
 * Peyzart Fluid Custom Cursor
 * An intelligent cursor that interacts with the UI.
 */

"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power3.out"
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Interactive elements interaction
    const targets = document.querySelectorAll('button, a, .interactive');
    targets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        gsap.to(follower, {
          scale: 3,
          backgroundColor: "rgba(205, 220, 57, 0.2)",
          duration: 0.3
        });
        gsap.to(cursor, { scale: 0.5, duration: 0.3 });
      });
      
      target.addEventListener('mouseleave', () => {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          duration: 0.3
        });
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-greenish-lime rounded-full pointer-events-none z-[9999] mix-blend-difference opacity-0 -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-greenish-lime/30 rounded-full pointer-events-none z-[9998] opacity-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
      />
    </>
  );
}
