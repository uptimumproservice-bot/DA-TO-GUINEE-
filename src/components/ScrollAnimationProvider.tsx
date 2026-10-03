import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollAnimationProvider() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section');

      sections.forEach((section) => {
        const children = section.querySelectorAll('h1, h2, h3, h4, p, img, .card-hover, article, form, .grid > div, button');
        
        children.forEach((child) => {
          const el = child as HTMLElement;
          if (el.classList.contains('anim-reveal')) return;

          el.classList.add('anim-reveal');

          const rect = el.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

          if (isVisible) {
            el.classList.add('revealed');
          }
        });
      });

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const section = entry.target;
              const revealElements = section.querySelectorAll('.anim-reveal:not(.revealed)');
              revealElements.forEach((el, idx) => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.transitionDelay = `${idx * 120}ms`;
                htmlEl.classList.add('revealed');
              });
              obs.unobserve(section);
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
      );

      sections.forEach((section) => {
        observer.observe(section);
      });

      return () => {
        observer.disconnect();
      };
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
