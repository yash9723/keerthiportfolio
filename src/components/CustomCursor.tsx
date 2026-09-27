import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 350, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], [data-cursor]');
      if (interactive) {
        setCursorType(interactive.getAttribute('data-cursor') || 'pointer');
      } else {
        setCursorType(null);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const cursorStyles = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'transparent',
      borderColor: 'rgba(222, 219, 200, 0.35)',
      borderWidth: 1,
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(222, 219, 200, 0.08)',
      borderColor: 'rgba(222, 219, 200, 0.8)',
      borderWidth: 1.5,
    },
    view: {
      width: 70,
      height: 70,
      backgroundColor: 'rgba(222, 219, 200, 0.95)',
      borderColor: 'rgba(222, 219, 200, 1)',
      borderWidth: 0,
    },
  };

  const activeStyle =
    cursorType === 'view'
      ? cursorStyles.view
      : cursorType === 'pointer'
      ? cursorStyles.pointer
      : cursorStyles.default;

  return (
    <>
      {/* Central pointer dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: cursorType === 'view' ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Smooth outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] flex items-center justify-center overflow-hidden"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        animate={activeStyle}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      >
        {cursorType === 'view' && (
          <span className="text-[10px] text-black tracking-widest font-bold uppercase select-none">
            View
          </span>
        )}
      </motion.div>
    </>
  );
};
