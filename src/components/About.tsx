import React from 'react';
import { profileData } from '../data/profile';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative z-10">
      <div className="reveal max-w-6xl mx-auto bg-[#0d0d16]/90 backdrop-blur-md rounded-3xl p-8 sm:p-14 md:p-20 border border-[#7c5cfc]/20 text-center relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] glow-card">
        {/* Subtle noise */}
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />

        <p className="font-mono text-[#00e5c0] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-8">
          About Me
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-[1.08] tracking-tight mb-12 text-[#dedbc8]">
          <span className="font-normal">I am Petla Keerthi, </span>
          <span className="italic font-serif text-[#00e5c0]">a full-stack developer. </span>
          <span className="font-normal text-[#dedbc8]/80">
            I build web applications that solve real problems with clean code and creative thinking.
          </span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-[#dedbc8]/80 font-light">
          {profileData.aboutText}
        </p>
      </div>
    </section>
  );
};
