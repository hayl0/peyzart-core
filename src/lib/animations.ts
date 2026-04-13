import * as animeModule from 'animejs';
const anime = (animeModule as any).default || animeModule;

/**
 * PEYZART ANIMATION ENGINE
 * Nature-inspired movements using Anime.js
 */

export const animateCounter = (el: string, value: number) => {
  anime({
    targets: el,
    innerHTML: [0, value],
    easing: 'linear',
    round: 1, // Will round decimal numbers
    duration: 2000
  });
};

export const animateStagger = (el: string) => {
  anime({
    targets: el,
    translateY: [20, 0],
    opacity: [0, 1],
    delay: anime.stagger(100), // 100ms delay per element
    easing: 'easeOutExpo',
    duration: 1200
  });
};

export const animatePlantGrowth = (el: string) => {
  anime({
    targets: el,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el: any, i: number) { return i * 250 },
    direction: 'alternate',
    loop: true
  });
};
