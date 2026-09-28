import React from 'react';
import { Award } from 'lucide-react';
import { certificationsData } from '../data/certifications';
import { SectionHeader } from './SectionHeader';
import { AmbientGlow } from './AmbientGlow';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="relative py-24 sm:py-28 md:py-40 px-4 md:px-6">
      <AmbientGlow tone="rose" intensity={0.1} className="-left-40 top-20 w-[40rem] h-[34rem]" />
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <SectionHeader
          eyebrow="04 / Certifications"
          lines={[{ text: 'Credentials that' }, { text: 'validate the craft.', muted: true }]}
          className="lg:col-span-4 lg:sticky lg:top-28"
        >
          <p className="text-primary/60 text-xs sm:text-sm mt-4 max-w-xs">
            Industry and university certifications earned alongside coursework.
          </p>
        </SectionHeader>

        <div className="lg:col-span-8 glass-shell">
          <ul className="glass-core p-2 sm:p-3">
            {certificationsData.map((cert) => (
              <li
                key={cert.name}
                className="flex items-center justify-between gap-4 px-3 sm:px-4 py-4 rounded-2xl border-b border-primary/[0.06] last:border-0 transition-[background-color,transform] duration-200 ease-out-strong hover:bg-primary/[0.04] hover:translate-x-1"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="w-10 h-10 rounded-xl glass-chip flex items-center justify-center flex-shrink-0">
                    <Award className="w-[18px] h-[18px] text-primary" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-primary text-sm sm:text-base font-medium">{cert.name}</h3>
                    <p className="text-gray-400 text-[11px] sm:text-xs tracking-wider uppercase font-mono mt-0.5">{cert.issuer}</p>
                  </div>
                </div>
                <span className="glass-chip px-3 py-1 rounded-full text-primary/80 text-xs font-mono tabular-nums flex-shrink-0">
                  {cert.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
