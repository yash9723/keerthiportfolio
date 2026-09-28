import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'pointer' | 'view';

const ringStyles: Record<CursorVariant, Record<string, string | number>> = {
  default: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
    borderColor: 'rgba(222, 219, 200, 0.35)',
    borderWidth: 1
  },
  pointer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(222, 219, 200, 0.08)',
    borderColor: 'rgba(222, 219, 200, 0.8)',
    borderWidth: 1.5
  },
  view: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(222, 219, 200, 0.95)',
    borderColor: 'rgba(222, 219, 200, 1)',
    borderWidth: 0
  }
};

/**
 * Dot + trailing ring cursor. Interactive elements can opt into a variant
 * with `data-cursor="pointer" | "view"`. Disabled on touch devices.
 */
export const CustomCursor: React.FC = () => {
  const [variant, setVariant] = useState<CursorVariant | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 35, stiffness: 350, mass: 0.35 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const touch =
      window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouch(touch || reducedMotion);
    if (touch || reducedMotion) return;

    // Hides the native arrow so only the custom cursor shows (see index.css)
    document.documentElement.classList.add('has-custom-cursor');

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);
    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a, button, [role="button"], [data-cursor]');
      setVariant(target ? ((target.getAttribute('data-cursor') as CursorVariant | null) ?? 'pointer') : null);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mouseover', handleOver);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={variant === 'view' ? { scale: 0.5, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] flex items-center justify-center overflow-hidden"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={ringStyles[variant ?? 'default']}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      >
        {variant === 'view' && (
          <span className="text-[10px] text-black tracking-widest font-bold uppercase select-none">View</span>
        )}
      </motion.div>
    </>
  );
};
