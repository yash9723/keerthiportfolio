import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { profileData } from '../data/profile';
import { WordsPullUpMultiStyle } from './AnimatedText';
import { AmbientGlow } from './AmbientGlow';

interface ScrollCharProps {
  char: string;
  index: number;
  totalChars: number;
  scrollYProgress: MotionValue<number>;
}

/** A single character that brightens from 25% to full opacity as the paragraph scrolls past. */
const ScrollChar: React.FC<ScrollCharProps> = ({ char, index, totalChars, scrollYProgress }) => {
  const position = index / totalChars;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, position - 0.1), Math.min(1, position + 0.05)],
    [0.25, 1]
  );

  return (
    <motion.span style={{ opacity }} className="inline">
      {char}
    </motion.span>
  );
};

export const About: React.FC = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.85', 'end 0.3']
  });
  const chars = profileData.aboutText.split('');

  return (
    <section id="about" className="relative py-24 sm:py-28 md:py-40 px-4 md:px-6">
      <AmbientGlow tone="amber" intensity={0.16} className="left-1/2 -translate-x-1/2 top-0 w-[70rem] max-w-[140vw] h-[46rem]" />
      <AmbientGlow tone="rose" intensity={0.1} className="-left-40 bottom-0 w-[36rem] h-[30rem]" />
      <div className="relative max-w-6xl mx-auto glass-shell">
        <div className="glass-core px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-28 text-center">
        <p className="eyebrow glass-chip mb-8 sm:mb-10">
          <span className="w-1 h-1 rounded-full bg-primary/70" aria-hidden="true" />
          About me
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12 sm:mb-16 md:mb-20">
          <WordsPullUpMultiStyle
            segments={[
              { text: `I am ${profileData.name},`, className: 'font-normal' },
              { text: 'a full-stack developer.', className: 'italic font-serif' },
              { text: profileData.tagline, className: 'font-normal' }
            ]}
          />
        </h2>
        <p
          ref={paragraphRef}
          className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-primary"
        >
          <span className="sr-only">{profileData.aboutText}</span>
          <span aria-hidden="true">
            {chars.map((char, i) => (
              <ScrollChar key={i} char={char} index={i} totalChars={chars.length} scrollYProgress={scrollYProgress} />
            ))}
          </span>
        </p>
        </div>
      </div>
    </section>
  );
};
