import React from 'react';
import { certificationsData } from '../data/certifications';

export const Certifications: React.FC = () => {
  return (
    <section className="bg-black py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-[#dedbc8]/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[#dedbc8] text-[10px] sm:text-xs tracking-widest uppercase mb-3">
            04 / Certifications
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-[#dedbc8]">
            Credentials that validate the craft.
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          {certificationsData.map((cert, index) => (
            <div
              key={index}
              className="bg-[#101010] border border-[#dedbc8]/[0.06] hover:border-[#dedbc8]/20 rounded-2xl px-6 py-5 flex items-center justify-between gap-4 transition-all duration-300 hover:translate-x-1"
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
