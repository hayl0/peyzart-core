/**
 * Peyzart Animation Orchestrator
 * Centralized GSAP timelines and interactive logic for premium motion design.
 * 
 * @module Animations
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Page Transition Animation
 */
export const pageIn = () => {
  const tl = gsap.timeline();
  tl.fromTo("body", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.inOut" });
  return tl;
};

/**
 * Bento Grid Staggered Entrance
 * Meticulously timed reveal for grid elements.
 * 
 * @param {string} selector - CSS selector for grid items
 */
export const revealBento = (selector: string) => {
  return gsap.from(selector, {
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: "expo.out",
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
    }
  });
};

/**
 * Magnetic Button Effect
 * High-end interaction for primary call-to-actions.
 * 
 * @param {HTMLElement} el - The element to apply the effect to
 */
export const createMagnetic = (el: HTMLElement) => {
  const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
  const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

  el.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    xTo(x * 0.3);
    yTo(y * 0.3);
  });

  el.addEventListener("mouseleave", () => {
    xTo(0);
    yTo(0);
  });
};

/**
 * Text Split Reveal
 * Line-by-line reveal for headlines.
 */
export const revealText = (selector: string) => {
  return gsap.from(selector, {
    y: "100%",
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: selector,
      start: "top 90%",
    }
  });
};
