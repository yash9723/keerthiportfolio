import React, { useState } from 'react';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { academicFocusData } from '../data/academicFocus';

export const ExperienceEducation: React.FC = () => {
  const [openFocusId, setOpenFocusId] = useState<string | null>(null);

  return (
    <section id="experience" className="bg-black py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-[#dedbc8]/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[#dedbc8] text-[10px] sm:text-xs tracking-widest uppercase mb-3">
            03 / Experience &amp; Education
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-[#dedbc8]">
            Where I have contributed &amp; learned.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Work Experience Column */}
          <div className="lg:col-span-7">
            <p className="text-[#dedbc8] text-[10px] sm:text-xs tracking-widest uppercase mb-4">
              Work Experience
            </p>
            <div className="space-y-4">
              {experienceData.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-[#101010] rounded-2xl p-6 sm:p-8 border border-[#dedbc8]/[0.06] hover:border-[#dedbc8]/15 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                    <div>
                      <h3 className="text-[#dedbc8] text-lg sm:text-xl font-bold mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-[#dedbc8]/60 text-sm sm:text-base">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-xs text-[#dedbc8]/40">
                      <span>{exp.period}</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                        <span className="text-[#dedbc8]/40 mt-1 flex-shrink-0">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Focus Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Education */}
            <div>
              <p className="text-[#dedbc8] text-[10px] sm:text-xs tracking-widest uppercase mb-4">
                Education
              </p>
              <div className="space-y-3">
                {educationData.map((edu, idx) => (
                  <div
                    key={idx}
                    className="bg-[#101010] rounded-2xl p-5 sm:p-6 border border-[#dedbc8]/[0.06] hover:border-[#dedbc8]/15 transition-colors duration-300"
                  >
                    <span className="inline-block px-2.5 py-1 bg-[#dedbc8]/[0.08] border border-[#dedbc8]/15 rounded-full text-[#dedbc8] text-[9px] sm:text-[10px] tracking-widest uppercase mb-3">
                      {edu.status}
                    </span>
                    <h4 className="text-[#dedbc8] text-sm sm:text-base font-bold mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-gray-500 text-xs mb-3">{edu.institution}</p>
                    <div className="flex items-end justify-between">
                      <span className="text-[#dedbc8] text-2xl font-bold">
                        {edu.score}
                        <span className="text-[#dedbc8]/40 text-[10px] ml-1 font-normal tracking-wider uppercase">
                          {edu.scoreType}
                        </span>
                      </span>
                      <span className="text-[#dedbc8]/30 text-xs">{edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Focus */}
            <div>
              <p className="text-[#dedbc8] text-[10px] sm:text-xs tracking-widest uppercase mb-4">
                Academic Focus Areas
              </p>
              <div className="bg-[#101010] border border-[#dedbc8]/[0.06] rounded-2xl p-4 sm:p-6 space-y-3">
                {academicFocusData.map((focus) => {
                  const isOpen = openFocusId === focus.id;
                  return (
                    <div key={focus.id} className="border-b border-[#dedbc8]/[0.04] last:border-0 pb-3 last:pb-0">
                      <button
                        onClick={() => setOpenFocusId(isOpen ? null : focus.id)}
                        className="w-full flex items-center justify-between text-left py-1 hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <div>
                          <h5 className="text-[#dedbc8] text-xs sm:text-sm font-semibold">
                            {focus.title}
                          </h5>
                          <p className="text-[10px] text-[#dedbc8]/40 font-mono tracking-wider">
                            {focus.status}
                          </p>
                        </div>
                        <span className="text-[#dedbc8]/40 text-xs">
                          {isOpen ? '▲' : '▼'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="pt-3 pb-1 space-y-2 text-xs">
                          <p className="text-gray-400">{focus.description}</p>
                          <p className="text-gray-500 text-[11px] italic bg-black/40 p-2.5 rounded-lg border border-[#dedbc8]/[0.03]">
                            {focus.details}
                          </p>
                          <div className="text-[#dedbc8]/60 text-[10px] uppercase font-medium">
                            ✓ {focus.cert}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
