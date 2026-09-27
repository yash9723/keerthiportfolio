import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Globe, Cpu, Award } from 'lucide-react';
import { AnimatedSegments } from './AnimatedText';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  index: number;
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  icon,
  title,
  skills,
  index,
  selectedSkill,
  onSelectSkill,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="bg-[#101010] border border-primary/[0.06] rounded-2xl p-5 sm:p-6 flex flex-col h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => {
          const isSelected = selectedSkill === skill;
          return (
            <button
              key={skill}
              onClick={() => onSelectSkill(isSelected ? null : skill)}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition-all duration-300 border font-medium ${
                isSelected
                  ? 'bg-primary text-black border-primary shadow-lg shadow-primary/10'
                  : selectedSkill !== null && !isSelected
                  ? 'bg-primary/[0.02] border-primary/5 text-primary/30 opacity-40 hover:opacity-100 hover:text-primary hover:border-primary/20'
                  : 'bg-primary/[0.06] border-primary/15 text-primary/70 hover:bg-primary/[0.12] hover:text-primary hover:border-primary/30'
              }`}
              data-cursor="pointer"
            >
              {skill}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

const skillCategories = [
  {
    icon: <Code className="w-5 h-5 text-primary" />,
    title: 'Languages',
    skills: ['Java', 'Python', 'SQL', 'JavaScript'],
  },
  {
    icon: <Globe className="w-5 h-5 text-primary" />,
    title: 'Web Technologies',
    skills: ['React', 'Vite', 'HTML', 'CSS'],
  },
  {
    icon: <Cpu className="w-5 h-5 text-primary" />,
    title: 'Concepts',
    skills: ['OOP', 'Core Java', 'MongoDB', 'Full-Stack'],
  },
  {
    icon: <Award className="w-5 h-5 text-primary" />,
    title: 'Coding Platforms',
    skills: ['CodeChef', 'LeetCode', 'HackerRank'],
  },
];

export const Skills: React.FC<{
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
}> = ({ selectedSkill, onSelectSkill }) => {
  return (
    <section id="skills" className="bg-black relative px-4 md:px-6 py-20 sm:py-28 md:py-36">
      <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 md:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4">
              01 / Skills
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
              <AnimatedSegments
                segments={[{ text: 'Technologies and tools I work with.', className: 'text-primary' }]}
                containerClassName="justify-start"
              />
            </h2>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mt-1">
              <AnimatedSegments
                segments={[{ text: 'Always learning. Always building.', className: 'text-gray-500' }]}
                containerClassName="justify-start"
              />
            </h2>
          </div>

          {selectedSkill && (
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="text-[10px] sm:text-xs font-mono uppercase text-primary/40">
                Filtering Projects:
              </span>
              <button
                onClick={() => onSelectSkill(null)}
                className="px-2.5 py-1 bg-primary/10 border border-primary/25 rounded-md text-primary text-xs flex items-center gap-1.5 hover:bg-primary/20 transition-all"
                data-cursor="pointer"
              >
                {selectedSkill} <span className="opacity-60">×</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1">
          {skillCategories.map((cat, idx) => (
            <SkillCard
              key={cat.title}
              {...cat}
              index={idx}
              selectedSkill={selectedSkill}
              onSelectSkill={onSelectSkill}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
