import React from 'react';
import { certificationsData } from '../data/certifications';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-[#7c5cfc]/15 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <p className="font-mono text-[#00e5c0] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-3">
            04 / Certifications
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-white">
            Credentials that validate the craft.
          </h2>
        </div>

        <div className="space-y-3.5 max-w-4xl">
          {certificationsData.map((cert, index) => (
            <div
              key={index}
              className={`reveal reveal-delay-${(index % 4) + 1} bg-[#0d0d16]/85 backdrop-blur-md border border-[#7c5cfc]/20 hover:border-[#00e5c0]/50 rounded-2xl px-6 py-5 flex items-center justify-between gap-4 transition-all duration-300 hover:translate-x-2 shadow-md glow-card`}
            >
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-[#dedbc8]/40" />
                <div>
                  <h4 className="text-[#dedbc8] text-sm sm:text-base font-medium">
                    {cert.name}
                  </h4>
                  <p className="text-gray-500 text-[10px] sm:text-xs tracking-wider uppercase font-mono">
                    {cert.issuer}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#dedbc8]/[0.06] border border-[#dedbc8]/10 rounded-full text-[#dedbc8]/60 text-xs font-mono">
                {cert.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
