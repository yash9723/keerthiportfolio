import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ChevronDown, GraduationCap } from 'lucide-react';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { academicFocusData } from '../data/academicFocus';
import { SectionHeader } from './SectionHeader';
import { AmbientGlow } from './AmbientGlow';

const columnLabel = 'text-primary/70 text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4';

export const ExperienceEducation: React.FC = () => {
  const [openFocusId, setOpenFocusId] = useState<string | null>(null);

  return (
    <section id="experience" className="relative py-24 sm:py-28 md:py-40 px-4 md:px-6">
      <AmbientGlow tone="amber" intensity={0.12} className="-right-32 top-24 w-[44rem] h-[36rem]" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="03 / Experience & Education"
          lines={[{ text: 'Where I have contributed & learned.' }]}
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7">
            <h3 className={columnLabel}>Work Experience</h3>
            <div className="space-y-4">
              {experienceData.map((job) => (
                <article key={`${job.company}-${job.role}`} className="glass-shell">
                  <div className="glass-core p-6 sm:p-9">
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-7">
                      <div className="flex items-start gap-4">
                        <span className="w-11 h-11 rounded-2xl glass-chip flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-primary" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="text-primary text-lg sm:text-xl font-bold mb-1">{job.role}</h4>
                          <p className="text-primary/70 text-sm sm:text-base">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="glass-chip rounded-full px-3 py-1 text-xs text-primary tabular-nums">{job.period}</span>
                        <span className="text-xs text-primary/60">{job.location}</span>
                      </div>
                    </div>
                    <ul className="space-y-3.5">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 flex-shrink-0" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className={columnLabel}>Education</h3>
              <div className="space-y-4">
                {educationData.map((edu) => (
                  <article key={edu.degree} className="glass-shell">
                    <div className="glass-core p-5 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-9 h-9 rounded-xl glass-chip flex items-center justify-center">
                          <GraduationCap className="w-[18px] h-[18px] text-primary" aria-hidden="true" />
                        </span>
                        <span className="glass-chip rounded-full px-2.5 py-1 text-primary text-[10px] tracking-[0.18em] uppercase">
                          {edu.status}
                        </span>
                      </div>
                      <h4 className="text-primary text-sm sm:text-base font-bold mb-1">{edu.degree}</h4>
                      <p className="text-gray-400 text-xs mb-4">{edu.institution}</p>
                      <div className="flex items-end justify-between">
                        <span className="text-primary text-3xl font-bold tabular-nums leading-none">
                          {edu.score}
                          <span className="text-primary/60 text-[10px] ml-1.5 font-normal tracking-wider uppercase">
                            {edu.scoreType}
                          </span>
                        </span>
                        <span className="text-primary/60 text-xs tabular-nums">{edu.period}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h3 className={columnLabel}>Academic Focus Areas</h3>
              <div className="glass-shell">
                <div className="glass-core p-2 sm:p-3">
                  {academicFocusData.map((item) => {
                    const isOpen = openFocusId === item.id;
                    const panelId = `focus-panel-${item.id}`;
                    return (
                      <div
                        key={item.id}
                        className={`rounded-2xl transition-colors duration-200 ${isOpen ? 'bg-primary/[0.04]' : ''}`}
                      >
                        <h4>
                          <button
                            onClick={() => setOpenFocusId(isOpen ? null : item.id)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            className="w-full flex items-center justify-between text-left px-3 py-3 rounded-2xl hover:bg-primary/[0.04] transition-colors duration-200"
                          >
                            <span>
                              <span className="block text-primary text-xs sm:text-sm font-semibold">{item.title}</span>
                              <span className="block text-[10px] text-primary/60 font-mono tracking-wider mt-0.5">
                                {item.status}
                              </span>
                            </span>
                            <span className="w-7 h-7 rounded-full glass-chip flex items-center justify-center flex-shrink-0">
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-primary/80 transition-transform duration-200 ease-out-strong ${isOpen ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                              />
                            </span>
                          </button>
                        </h4>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={panelId}
                              className="overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } }}
                              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                            >
                              <div className="px-3 pb-4 space-y-2.5 text-xs">
                                <p className="text-gray-300">{item.description}</p>
                                <p className="text-gray-400 text-[11px] italic glass-chip p-3 rounded-xl">{item.details}</p>
                                <div className="text-primary/70 text-[10px] uppercase tracking-wider font-medium">✓ {item.cert}</div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
