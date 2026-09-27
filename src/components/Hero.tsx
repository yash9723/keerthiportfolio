import React from 'react';
import { profileData } from '../data/profile';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black flex flex-col justify-between px-4 sm:px-6 md:px-12 pt-28 pb-12 overflow-hidden">
      {/* Subtle radial ambient background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(222,219,200,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Tagline */}
      <div className="max-w-7xl mx-auto w-full pt-8">
        <p className="text-[#dedbc8]/50 text-xs sm:text-sm tracking-[0.25em] uppercase font-light">
          Portfolio &middot; 2025 &ndash; 2026
        </p>
      </div>

      {/* Center Giant Typography */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12">
        <h1 className="text-[16vw] sm:text-[14vw] lg:text-[12vw] font-medium leading-[0.85] tracking-[-0.05em] text-[#E1E0CC] select-none">
          {profileData.name}
        </h1>
        <p className="text-[#dedbc8]/60 text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase mt-6 font-light">
          {profileData.headline}
        </p>
      </div>

      {/* Bottom Summary Bar with Quick Stats */}
      <div className="max-w-7xl mx-auto w-full border-t border-[#dedbc8]/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="max-w-md">
          <p className="text-[#dedbc8]/70 text-xs sm:text-sm leading-relaxed">
            {profileData.tagline}
          </p>
        </div>

        <div className="flex items-center gap-8 self-end sm:self-auto">
          <div className="text-center">
            <span className="block text-[#dedbc8] text-xl sm:text-2xl font-bold">
              {profileData.stats.cgpa}
            </span>
            <span className="text-[#dedbc8]/40 text-[10px] tracking-widest uppercase">
              CGPA
            </span>
          </div>

          <div className="w-[1px] h-8 bg-[#dedbc8]/15" />

          <div className="text-center">
            <span className="block text-[#dedbc8] text-xl sm:text-2xl font-bold">
              {profileData.stats.projectsCount}
            </span>
            <span className="text-[#dedbc8]/40 text-[10px] tracking-widest uppercase">
              Projects
            </span>
          </div>

          <div className="w-[1px] h-8 bg-[#dedbc8]/15" />

          <div className="text-center">
            <span className="block text-[#dedbc8] text-xl sm:text-2xl font-bold">
              {profileData.stats.certsCount}
            </span>
            <span className="text-[#dedbc8]/40 text-[10px] tracking-widest uppercase">
              Certifications
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
