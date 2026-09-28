import React from 'react';
import { ArrowUpRight, LucideIcon } from 'lucide-react';

interface ActionLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'glass';
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  /** Icon inside the trailing circle; defaults to an up-right arrow. */
  icon?: LucideIcon;
  className?: string;
}

const variants = {
  primary: {
    button: 'bg-primary text-black hover:bg-[#e8e5d3]',
    circle: 'bg-black/10'
  },
  glass: {
    button: 'glass-blur text-primary hover:bg-[rgba(34,30,26,0.6)]',
    circle: 'bg-primary/10'
  }
};

/**
 * Pill link with its icon nested in its own circle ("button-in-button"). On hover the circle
 * drifts toward the arrow's direction; on press the whole pill dips.
 */
export const ActionLink: React.FC<ActionLinkProps> = ({
  href,
  children,
  variant = 'primary',
  external = false,
  icon: Icon = ArrowUpRight,
  className = ''
}) => {
  const styles = variants[variant];

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-cursor="pointer"
      className={`pressable group inline-flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap ${styles.button} ${className}`}
    >
      {children}
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 ${styles.circle}`}
      >
        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      </span>
    </a>
  );
};
