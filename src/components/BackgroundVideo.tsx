import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface VideoSource {
  src: string;
  /** Media query for picking this source, e.g. '(min-width: 768px)'. First match wins. */
  media?: string;
}

interface BackgroundVideoProps {
  sources: VideoSource[];
  /** Poster frame shown until the video plays (and permanently for reduced-motion users). */
  poster: string;
  /** Optional responsive candidates for the poster, e.g. "a-960.webp 960w, a-1920.webp 1920w". */
  posterSrcSet?: string;
  /** Mark the poster as the page's LCP image so it's fetched first. */
  priority?: boolean;
  /** Defer downloading the video until it's near the viewport. */
  lazy?: boolean;
  className?: string;
}

/**
 * Decorative, muted, looping video. Shows the poster frame until the video can play,
 * waits for the viewport when `lazy`, and stays on the still poster for reduced-motion users.
 */
export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  sources,
  poster,
  posterSrcSet,
  priority = false,
  lazy = false,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isNear = useInView(ref, { once: true, margin: '300px' });
  const prefersReducedMotion = useReducedMotion();
  const shouldPlay = !prefersReducedMotion && (!lazy || isNear);

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`} aria-hidden="true">
      <img
        src={poster}
        srcSet={posterSrcSet}
        sizes={posterSrcSet ? '100vw' : undefined}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        decoding={priority ? 'sync' : 'async'}
        loading={priority ? 'eager' : 'lazy'}
        // Lower-case attribute so React 18 passes it straight through to the DOM
        {...(priority ? { fetchpriority: 'high' } : {})}
      />
      {shouldPlay && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload={lazy ? 'none' : 'auto'}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          tabIndex={-1}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} media={source.media} type="video/mp4" />
          ))}
        </video>
      )}
    </div>
  );
};
