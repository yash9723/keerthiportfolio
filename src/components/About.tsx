import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedSegments } from './AnimatedText';

const aboutBio = "Information Technology student with a strong foundation in web development and hands-on experience in full-stack development through internship. Built innovative web projects, demonstrating problem-solving skills and a commitment to continuous learning and real-world application of technology.";

const ScrollChar: React.FC<{
  char: string;
  index: number;
  totalChars: number;
  scrollYProgress: any;
}> = ({ char, index, totalChars, scrollYProgress }) => {
  const charProgress = index / totalChars;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.25, 1]
  );
  return (
    <motion.span style={{ opacity }} className="inline">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

export const About: React.FC = () => {
  const targetRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.85', 'end 0.3'],
  });
  const chars = aboutBio.split('');

  return (
    <section id="about" className="bg-black py-20 sm:py-28 md:py-36 px-4 md:px-6">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-2xl md:rounded-3xl px-6 sm:px-10 md:px-16 py-16 sm:py-20 md:py-28 text-center">
        <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8 sm:mb-10">
          About me
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12 sm:mb-16 md:mb-20">
          <AnimatedSegments
            segments={[
              { text: 'I am Petla Keerthi,', className: 'font-normal' },
              { text: 'a full-stack developer.', className: 'italic font-serif' },
              {
                text: 'I build web applications that solve real problems with clean code and creative thinking.',
                className: 'font-normal',
              },
            ]}
          />
        </h2>
        <p
          ref={targetRef}
          className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-[#DEDBC8]"
        >
          {chars.map((char, index) => (
            <ScrollChar
              key={index}
              char={char}
              index={index}
              totalChars={chars.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </section>
  );
};
