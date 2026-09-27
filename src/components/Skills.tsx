import React from 'react';
import { skillsData } from '../data/skills';

interface SkillsProps {
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}

export const Skills: React.FC<SkillsProps> = ({ selectedSkill, onSelectSkill }) => {
  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-[#7c5cfc]/15 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-[#00e5c0] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-3">
              01 / Skills
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-white">
              Technologies and tools I work with.
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-[#8a88a0] mt-1">
              Always learning. Always building.
            </h3>
          </div>

          {selectedSkill && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-xs font-mono uppercase text-[#dedbc8]/40">
                Filtering Projects:
              </span>
              <button
                onClick={() => onSelectSkill(null)}
                className="px-3 py-1 bg-[#7c5cfc]/20 border border-[#7c5cfc]/50 rounded-md text-[#00e5c0] text-xs flex items-center gap-2 hover:bg-[#7c5cfc]/30 transition-all cursor-pointer font-mono"
              >
                {selectedSkill} <span className="opacity-80 font-bold">&times;</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillsData.map((category, idx) => (
            <div
              key={category.title}
              className={`reveal reveal-delay-${(idx % 4) + 1} bg-[#0e0e18]/85 backdrop-blur-md border border-[#7c5cfc]/20 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group glow-card shadow-lg`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c5cfc]/20 to-[#00e5c0]/20 border border-[#7c5cfc]/30 flex items-center justify-center mb-6 text-[#00e5c0] group-hover:scale-110 transition-transform">
                  <span className="text-sm font-mono font-bold">&lt;/&gt;</span>
                </div>
                <h4 className="text-white text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 font-mono">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        onClick={() => onSelectSkill(isSelected ? null : skill)}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer font-mono ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#7c5cfc] to-[#00e5c0] text-black font-bold shadow-md'
                            : 'bg-[#7c5cfc]/[0.08] border border-[#7c5cfc]/25 text-[#dedbc8]/90 hover:border-[#00e5c0]/60 hover:text-white hover:bg-[#00e5c0]/[0.1]'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
