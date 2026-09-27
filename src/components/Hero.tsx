import React, { useEffect, useState, useRef } from 'react';
import { profileData } from '../data/profile';
import { AvatarCanvas } from './AvatarCanvas';

export const Hero: React.FC = () => {
  const [cgpa, setCgpa] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
          setHasCounted(true);
          const duration = 1800;
          const target = 9.23;
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOut * target;
            setCgpa(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCgpa(target);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasCounted]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 pt-28 pb-16 overflow-hidden">
      {/* Radial glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[radial-gradient(ellipse,rgba(124,92,252,0.12)_0%,rgba(0,229,192,0.04)_40%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Typography, Taglines & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e5c0] shadow-[0_0_12px_#00e5c0] animate-pulse" />
            <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#00e5c0] font-medium">
              Available for opportunities &middot; 2025&ndash;2026
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.92] mb-4">
            PETLA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c5cfc] via-[#a28aff] to-[#00e5c0]">
              KEERTHI
            </span>
          </h1>

          {/* Role */}
          <p className="text-lg sm:text-2xl text-[#dedbc8]/90 font-light tracking-wide mb-6">
            <strong className="text-[#00e5c0] font-semibold">Full-Stack Developer</strong> &amp; IT Engineer
          </p>

          {/* Summary with typing cursor */}
          <p className="text-[#dedbc8]/75 text-sm sm:text-base max-w-xl leading-relaxed mb-8">
            Information Technology student building web applications that solve real problems.
            From music players to AI-powered legal tools &mdash; I turn ideas into interactive experiences.
            <span className="inline-block w-0.5 h-4 ml-1 bg-[#00e5c0] animate-pulse align-middle" />
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7c5cfc] to-[#6342e8] text-white font-medium text-sm tracking-wide shadow-[0_8px_25px_rgba(124,92,252,0.35)] hover:shadow-[0_12px_35px_rgba(124,92,252,0.5)] hover:-translate-y-0.5 transition-all duration-200"
            >
              View My Work &rarr;
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl border border-[#dedbc8]/20 bg-white/[0.03] text-[#dedbc8] hover:text-white hover:border-[#00e5c0]/60 hover:bg-[#00e5c0]/[0.05] font-medium text-sm tracking-wide transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>

          {/* Animated Statistics Bar */}
          <div
            ref={statsRef}
            className="pt-6 border-t border-[#dedbc8]/10 flex flex-wrap items-center gap-8 sm:gap-12"
          >
            <div>
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#00e5c0]">
                {cgpa > 0 ? cgpa.toFixed(2) : '0.00'}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#dedbc8]/50 uppercase tracking-widest">
                CGPA
              </span>
            </div>

            <div className="w-[1px] h-9 bg-[#dedbc8]/15" />

            <div>
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-white">
                {profileData.stats.projectsCount}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#dedbc8]/50 uppercase tracking-widest">
                Projects
              </span>
            </div>

            <div className="w-[1px] h-9 bg-[#dedbc8]/15" />

            <div>
              <span className="block font-mono text-2xl sm:text-3xl font-bold text-white">
                {profileData.stats.certsCount}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#dedbc8]/50 uppercase tracking-widest">
                Certifications
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Three.js Avatar */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <AvatarCanvas />
        </div>
      </div>
    </section>
  );
};
