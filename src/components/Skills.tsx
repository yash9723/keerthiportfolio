import React from 'react';
import { skillsData } from '../data/skills';

interface SkillsProps {
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}

export const Skills: React.FC<SkillsProps> = ({ selectedSkill, onSelectSkill }) => {
  return (
    <section id="skills" className="bg-black py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-[#dedbc8]/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[#dedbc8] text-[10px] sm:text-xs tracking-widest uppercase mb-3">
              01 / Skills
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-[#dedbc8]">
              Technologies and tools I work with.
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-gray-500 mt-1">
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
                className="px-3 py-1 bg-[#dedbc8]/10 border border-[#dedbc8]/25 rounded-md text-[#dedbc8] text-xs flex items-center gap-2 hover:bg-[#dedbc8]/20 transition-all cursor-pointer"
              >
                {selectedSkill} <span className="opacity-60 font-bold">&times;</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillsData.map((category) => (
            <div
              key={category.title}
              className="bg-[#101010] border border-[#dedbc8]/[0.08] hover:border-[#dedbc8]/25 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#dedbc8]/10 flex items-center justify-center mb-6 text-[#dedbc8]">
                  <span className="text-sm font-mono">&lt;/&gt;</span>
                </div>
                <h4 className="text-[#dedbc8] text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        onClick={() => onSelectSkill(isSelected ? null : skill)}
                        className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#dedbc8] text-black font-semibold'
                            : 'bg-[#dedbc8]/[0.04] border border-[#dedbc8]/10 text-[#dedbc8]/80 hover:border-[#dedbc8]/40 hover:text-[#dedbc8]'
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
