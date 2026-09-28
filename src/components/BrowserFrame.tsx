import React from 'react';

interface BrowserFrameProps {
  /** Screenshot base path; `-640.webp` and `-1280.webp` variants must exist. */
  src: string;
  alt: string;
  /** Live URL; its hostname is shown in the address pill. */
  url: string;
  /** Rendered width hint for srcset selection. */
  sizes?: string;
  className?: string;
}

const hostname = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

/** Screenshot of a live project inside a minimal glass browser window, always at its native 16:10. */
export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  src,
  alt,
  url,
  sizes = '(min-width: 1024px) 600px, 100vw',
  className = ''
}) => (
  <div className={`glass-chip rounded-2xl overflow-hidden ${className}`}>
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-primary/10">
      <span className="w-2 h-2 rounded-full bg-primary/25" aria-hidden="true" />
      <span className="w-2 h-2 rounded-full bg-primary/20" aria-hidden="true" />
      <span className="w-2 h-2 rounded-full bg-primary/15" aria-hidden="true" />
      <span className="mx-auto max-w-[70%] truncate rounded-full bg-primary/[0.06] px-3 py-0.5 text-[10px] text-primary/70 tracking-wide">
        {hostname(url)}
      </span>
      <span className="w-[42px]" aria-hidden="true" />
    </div>
    <img
      src={`${src}-640.webp`}
      srcSet={`${src}-640.webp 640w, ${src}-1280.webp 1280w`}
      sizes={sizes}
      alt={alt}
      width={1280}
      height={800}
      loading="lazy"
      decoding="async"
      className="block w-full aspect-[16/10] object-cover object-top"
    />
  </div>
);
