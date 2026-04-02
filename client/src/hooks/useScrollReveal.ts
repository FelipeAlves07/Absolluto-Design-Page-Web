import { useEffect, useRef } from 'react';

/**
 * Adds Intersection Observer to elements with .reveal, .reveal-left, .reveal-right classes,
 * adding .visible when they enter the viewport.
 */
export function useScrollReveal(deps: any[] = []) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);

  return containerRef;
}
