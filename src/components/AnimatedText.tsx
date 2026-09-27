import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const AnimatedTitle: React.FC<{
  text: string;
  className?: string;
  showAsterisk?: boolean;
}> = ({ text, className = '', showAsterisk = false }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: 24, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {i === words.length - 1 && showAsterisk ? (
              <span className="relative">
                {word}
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
              </span>
            ) : (
              word
            )}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const AnimatedSegments: React.FC<{
  segments: { text: string; className?: string }[];
  containerClassName?: string;
}> = ({ segments, containerClassName = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const wordsList: { word: string; className: string }[] = [];

  segments.forEach((seg) => {
    seg.text.split(' ').filter(Boolean).forEach((w) => {
      wordsList.push({ word: w, className: seg.className || '' });
    });
  });

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {wordsList.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${item.className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {item.word}
            {i < wordsList.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
