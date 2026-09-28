import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '../data/navigation';

/** Floating glass "island" nav that drops in once the hero (and its built-in nav) has scrolled away. */
export const StickyNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  // Visibility keys off the hero leaving the viewport (no scroll listener needed)
  useEffect(() => {
    const hero = document.querySelector('main > section');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(!entry.isIntersecting), {
      rootMargin: '-40px 0px 0px 0px'
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Highlight the section currently crossing the middle of the viewport
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        // Centered with flex rather than translate-x, which Framer Motion's transform would override
        <motion.nav
          aria-label="Section navigation"
          className="fixed top-3 inset-x-0 z-[90] flex justify-center pointer-events-none px-3"
          // Opacity + transform only: a filter here would disable the backdrop blur on the pill inside
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          <ul className="pointer-events-auto glass-blur rounded-full p-1 flex items-center gap-0.5 max-w-full overflow-x-auto [scrollbar-width:none]">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative inline-flex items-center min-h-[36px] px-2.5 sm:px-3.5 rounded-full text-[11px] sm:text-xs md:text-[13px] whitespace-nowrap transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-primary/60 hover:text-primary'
                    }`}
                  >
                    {isActive && (
                      // Shared layoutId: the glass highlight glides between links as sections change
                      <motion.span
                        layoutId="sticky-nav-active"
                        className="absolute inset-0 rounded-full glass-chip"
                        transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
