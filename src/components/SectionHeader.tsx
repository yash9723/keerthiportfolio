import React from 'react';
import { WordsPullUpMultiStyle } from './AnimatedText';

interface HeadlineLine {
  text: string;
  muted?: boolean;
}

interface SectionHeaderProps {
  eyebrow: string;
  lines: HeadlineLine[];
  align?: 'left' | 'center';
  size?: 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const sizeClasses = {
  md: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  lg: 'text-3xl sm:text-4xl lg:text-5xl'
};

/** Numbered eyebrow + pull-up headline shared by every content section. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  lines,
  align = 'left',
  size = 'md',
  className = '',
  children
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`${isCenter ? 'text-center' : ''} ${className}`}>
      <p className="eyebrow glass-chip mb-5">
        <span className="w-1 h-1 rounded-full bg-primary/70" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className={`${sizeClasses[size]} font-normal leading-tight`}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${i > 0 ? 'mt-1' : ''}`}>
            <WordsPullUpMultiStyle
              segments={[{ text: line.text, className: line.muted ? 'text-gray-500' : 'text-primary' }]}
              containerClassName={isCenter ? 'justify-center' : 'justify-start'}
            />
          </span>
        ))}
      </h2>
      {children}
    </div>
  );
};
