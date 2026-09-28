import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

/** Splits text into words that slide up from a clipped line when scrolled into view. */
export const WordsPullUp: React.FC<WordsPullUpProps> = ({ text, className = '', showAsterisk = false }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: 24, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              {isLast && showAsterisk ? (
                <span className="relative">
                  {word}
                  <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
                </span>
              ) : (
                word
              )}
              {!isLast && ' '}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  containerClassName?: string;
}

/** Same pull-up reveal, but each segment can carry its own styling (e.g. an italic serif phrase). */
export const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({ segments, containerClassName = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const words = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className || '' }))
  );

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {words.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${item.className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            {item.word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
