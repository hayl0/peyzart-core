'use client';

import { useEffect, useRef, useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

interface CounterProps {
  target: number;
  suffix?: string;
  label: string;
}

function AnimatedCounter({ target, suffix = '', label }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-extrabold text-bright-green">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs md:text-sm text-[var(--theme-text-secondary)] mt-1">
        {label}
      </div>
    </div>
  );
}

const STATS = [
  { target: 1000, suffix: '+', label: 'Mutlu Müşteri' },
  { target: 98, suffix: '%', label: 'Memnuniyet' },
  { target: 250, suffix: '+', label: 'Uzman Peyzajcı' },
];

export default function StatsSection() {
  return (
    <section className="py-10 md:py-14 bg-[var(--theme-card)] border-t border-[var(--theme-border)]">
      <AnimateOnScroll delay={400}>
        <div className="px-4 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
