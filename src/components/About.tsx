import React from 'react';
import { profileData } from '../data/profile';

export const About: React.FC = () => {
  return (
    <section id="about" className="bg-black py-24 sm:py-32 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-3xl p-8 sm:p-14 md:p-20 border border-[#dedbc8]/[0.08] text-center relative overflow-hidden">
        {/* Subtle noise */}
        <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />

        <p className="text-[#dedbc8] text-[10px] sm:text-xs tracking-widest uppercase mb-8">
          About Me
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-[1.05] tracking-tight mb-12 text-[#dedbc8]">
          <span className="font-normal">I am Petla Keerthi, </span>
          <span className="italic font-serif">a full-stack developer. </span>
          <span className="font-normal text-[#dedbc8]/80">
            I build web applications that solve real problems with clean code and creative thinking.
          </span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-[#DEDBC8]/90">
          {profileData.aboutText}
        </p>
      </div>
    </section>
  );
};
