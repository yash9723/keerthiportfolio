import React from 'react';

// Colours sampled from the hero video's sunset: warm amber, the cream text colour, and a dusk rose
const tones = {
  amber: '214, 140, 72',
  cream: '222, 219, 200',
  rose: '168, 92, 74'
};

// Global dial for all glows; per-section intensities are relative to this
const GLOW_STRENGTH = 1.45;

interface AmbientGlowProps {
  tone?: keyof typeof tones;
  intensity?: number;
  /** Position and size, e.g. "-top-40 left-[-10%] w-[60rem] h-[40rem]". */
  className?: string;
}

/**
 * Soft light behind glass surfaces so they have something to catch. A plain radial gradient
 * (no blur filter) that fades to transparent inside its own box, so it never shows a hard edge.
 */
export const AmbientGlow: React.FC<AmbientGlowProps> = ({ tone = 'amber', intensity = 0.14, className = '' }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute ${className}`}
    style={{
      background: `radial-gradient(closest-side, rgba(${tones[tone]}, ${intensity * GLOW_STRENGTH}), rgba(${tones[tone]}, 0))`
    }}
  />
);
