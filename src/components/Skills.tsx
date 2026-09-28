import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Code, Cpu, Globe, LucideIcon, X } from 'lucide-react';
import { skillsData } from '../data/skills';
import { SkillCategory } from '../types';
import { SectionHeader } from './SectionHeader';
import { AmbientGlow } from './AmbientGlow';

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  globe: Globe,
  cpu: Cpu,
  award: Award
};

interface SkillsProps {
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}

interface SkillCardProps extends SkillsProps {
  category: SkillCategory;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, index, selectedSkill, onSelectSkill }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = iconMap[category.icon] ?? Code;

  return (
    <motion.div
      ref={ref}
      className="glass-shell h-full"
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 24, filter: 'blur(8px)' }}
      transition={{ delay: index * 0.08, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="glass-core p-5 sm:p-6 flex flex-col h-full">
        <div className="w-11 h-11 rounded-2xl glass-chip flex items-center justify-center mb-6">
          <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-primary text-xs sm:text-[13px] font-medium tracking-[0.18em] uppercase mb-4">
          {category.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => {
            const isSelected = selectedSkill === skill;
            const isDimmed = selectedSkill !== null && !isSelected;
            const stateClass = isSelected
              ? 'bg-primary text-black shadow-[0_8px_24px_-8px_rgba(222,219,200,0.45)]'
              : isDimmed
                ? 'glass-chip text-primary/50 hover:text-primary'
                : 'glass-chip text-primary/85 hover:text-primary hover:bg-primary/10';

            return (
              <button
                key={skill}
                onClick={() => onSelectSkill(isSelected ? null : skill)}
                aria-pressed={isSelected}
                className={`pressable min-h-[36px] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium ${stateClass}`}
                data-cursor="pointer"
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export const Skills: React.FC<SkillsProps> = ({ selectedSkill, onSelectSkill }) => {
  return (
    <section id="skills" className="relative px-4 md:px-6 py-24 sm:py-28 md:py-40">
      <AmbientGlow tone="amber" intensity={0.12} className="-right-40 top-10 w-[46rem] h-[36rem]" />
      <AmbientGlow tone="cream" intensity={0.06} className="-left-32 bottom-0 w-[40rem] h-[30rem]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 md:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeader
            eyebrow="01 / Skills"
            lines={[{ text: 'Technologies and tools I work with.' }, { text: 'Always learning. Always building.', muted: true }]}
          >
            <p className="text-primary/60 text-xs sm:text-sm mt-4">Select a skill to highlight the projects that use it.</p>
          </SectionHeader>

          {selectedSkill && (
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="text-[10px] sm:text-xs font-mono uppercase text-primary/60">Filtering projects:</span>
              <button
                onClick={() => onSelectSkill(null)}
                aria-label={`Clear ${selectedSkill} filter`}
                className="pressable glass-chip min-h-[36px] pl-3.5 pr-2 py-1 rounded-full text-primary text-xs flex items-center gap-1.5 hover:bg-primary/10"
                data-cursor="pointer"
              >
                {selectedSkill}
                <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <X className="w-3 h-3" aria-hidden="true" />
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillsData.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              selectedSkill={selectedSkill}
              onSelectSkill={onSelectSkill}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
