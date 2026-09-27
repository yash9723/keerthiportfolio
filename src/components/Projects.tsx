import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { AnimatedSegments } from './AnimatedText';

interface ProjectsProps {
  selectedSkill: string | null;
}

const ProjectCardWrapper: React.FC<{
  children: React.ReactNode;
  index: number;
  className?: string;
  onClick?: () => void;
}> = ({ children, index, className = '', onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      className={`rounded-2xl overflow-hidden cursor-pointer group ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      data-cursor={onClick ? 'view' : undefined}
    >
      {children}
    </motion.div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ selectedSkill }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const getProject = (id: string) => projectsData.find((p) => p.id === id) || projectsData[0];

  const matchesSkill = (projectId: string) => {
    if (!selectedSkill) return true;
    const p = projectsData.find((proj) => proj.id === projectId);
    if (!p) return false;
    const skill = selectedSkill.toLowerCase();
    if (skill === 'full-stack') return projectId === 'legal-lens' || projectId === 'edufeedback-erp';
    if (skill === 'python') return projectId === 'legal-lens';
    if (skill === 'javascript') {
      return p.technologies.some(
        (t) =>
          t.toLowerCase() === 'javascript' ||
          t.toLowerCase() === 'react' ||
          t.toLowerCase() === 'vite'
      );
    }
    if (skill === 'css') {
      return p.technologies.some((t) => t.toLowerCase() === 'css' || t.toLowerCase() === 'tailwind css');
    }
    if (skill === 'html') {
      return p.technologies.some((t) => t.toLowerCase() === 'html' || t.toLowerCase() === 'react');
    }
    return p.technologies.some((t) => t.toLowerCase().includes(skill));
  };

  const isFiltering = selectedSkill !== null;
  const legalLens = getProject('legal-lens');
  const eduFeedback = getProject('edufeedback-erp');
  const rapidAid = getProject('rapidaid');
  const musicPlayer = getProject('music-player');

  return (
    <section id="projects" className="bg-black relative px-4 md:px-6 py-20 sm:py-28 md:py-36">
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4">
            02 / Projects
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <AnimatedSegments
              segments={[{ text: 'Work that solves real problems.', className: 'text-primary' }]}
              containerClassName="justify-start"
            />
          </h2>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mt-1">
            <AnimatedSegments
              segments={[{ text: 'Built with passion. Shipped with purpose.', className: 'text-gray-500' }]}
              containerClassName="justify-start"
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-2 md:gap-1">
          {/* Card 0: Legal Lens AI (Featured, Row Span 2) */}
          <ProjectCardWrapper
            index={0}
            className={`bg-[#212121] lg:row-span-2 transition-all duration-500 ${
              isFiltering && !matchesSkill('legal-lens')
                ? 'opacity-10 scale-[0.98] blur-[1px] pointer-events-none'
                : ''
            }`}
            onClick={() => setActiveProject(legalLens)}
          >
            <div className="p-6 sm:p-8 flex flex-col h-full relative">
              {isFiltering && matchesSkill('legal-lens') && (
                <span className="absolute top-8 right-8 px-2.5 py-0.5 bg-primary/20 border border-primary/45 rounded-full text-primary text-[9px] tracking-wider uppercase font-semibold">
                  Matching skill
                </span>
              )}
              <div className="flex items-center justify-between mb-6">
                <span className="text-primary/40 text-[10px] sm:text-xs tracking-widest uppercase">
                  P-01 / Featured
                </span>
                <span className="px-3 py-1 bg-primary/[0.08] border border-primary/15 rounded-full text-primary text-[10px] sm:text-xs tracking-wider uppercase">
                  AI-Powered
                </span>
              </div>
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-primary text-xl sm:text-2xl font-bold mb-3">{legalLens.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                {legalLens.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Built with React (Vite) and MongoDB for full-stack document analysis
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Automatic summarization and key clause extraction engine
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Redesigned readability of complex legal text for non-experts
                  </span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-6">
                {['React', 'Vite', 'MongoDB', 'AI / NLP'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/[0.06] border border-primary/15 rounded-md text-primary/60 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 text-primary text-xs sm:text-sm hover:opacity-80 transition-opacity w-fit mt-auto">
                View project details <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </ProjectCardWrapper>

          {/* Card 1: EduFeedback ERP */}
          <ProjectCardWrapper
            index={1}
            className={`bg-[#181818] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ${
              isFiltering && !matchesSkill('edufeedback-erp')
                ? 'opacity-10 scale-[0.98] blur-[1px] pointer-events-none'
                : ''
            }`}
            onClick={() => setActiveProject(eduFeedback)}
          >
            <div className="relative">
              {isFiltering && matchesSkill('edufeedback-erp') && (
                <span className="absolute top-0 right-0 px-2.5 py-0.5 bg-primary/20 border border-primary/45 rounded-full text-primary text-[9px] tracking-wider uppercase font-semibold">
                  Matching skill
                </span>
              )}
              <div className="flex items-center justify-between mb-4">
                <span className="text-primary/40 text-[10px] sm:text-xs tracking-widest uppercase">
                  P-02 / Management
                </span>
                <span className="text-primary text-xs tracking-wide group-hover:underline flex items-center gap-1">
                  View <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-primary text-lg sm:text-xl font-bold mb-2">{eduFeedback.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                {eduFeedback.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Recharts', 'Socket.IO', 'Drag-and-Drop'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-black border border-primary/15 rounded-md text-primary/60 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ProjectCardWrapper>

          {/* Card 2: RapidAid */}
          <ProjectCardWrapper
            index={2}
            className={`bg-[#212121] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ${
              isFiltering && !matchesSkill('rapidaid')
                ? 'opacity-10 scale-[0.98] blur-[1px] pointer-events-none'
                : ''
            }`}
            onClick={() => setActiveProject(rapidAid)}
          >
            <div className="relative">
              {isFiltering && matchesSkill('rapidaid') && (
                <span className="absolute top-0 right-0 px-2.5 py-0.5 bg-primary/20 border border-primary/45 rounded-full text-primary text-[9px] tracking-wider uppercase font-semibold">
                  Matching skill
                </span>
              )}
              <div className="flex items-center justify-between mb-4">
                <span className="text-primary/40 text-[10px] sm:text-xs tracking-widest uppercase">
                  P-03 / Social Good
                </span>
                <span className="text-primary text-xs tracking-wide group-hover:underline flex items-center gap-1">
                  View <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-primary text-lg sm:text-xl font-bold mb-2">{rapidAid.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                {rapidAid.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Vite', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-black border border-primary/15 rounded-md text-primary/60 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ProjectCardWrapper>

          {/* Card 3: Music Player App with Authentic Video Background */}
          <ProjectCardWrapper
            index={3}
            className={`relative min-h-[280px] lg:min-h-0 transition-all duration-500 ${
              isFiltering && !matchesSkill('music-player')
                ? 'opacity-10 scale-[0.98] blur-[1px] pointer-events-none'
                : ''
            }`}
            onClick={() => setActiveProject(musicPlayer)}
          >
            {musicPlayer.videoUrl && (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={musicPlayer.videoUrl} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              {isFiltering && matchesSkill('music-player') && (
                <span className="absolute top-6 right-6 px-2.5 py-0.5 bg-primary/20 border border-primary/45 rounded-full text-primary text-[9px] tracking-wider uppercase font-semibold">
                  Matching skill
                </span>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary/40 text-[10px] sm:text-xs tracking-widest uppercase">
                  P-04 / Media
                </span>
                <span className="text-primary text-xs tracking-wide flex items-center gap-1">
                  View Details <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-primary text-lg sm:text-xl font-bold mb-2">{musicPlayer.title}</h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 max-w-md">
                {musicPlayer.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JavaScript'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-black/60 border border-primary/15 rounded-md text-primary/70 text-xs backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ProjectCardWrapper>

          {/* Card 4: Project Philosophy */}
          <ProjectCardWrapper
            index={4}
            className={`bg-[#181818] p-6 sm:p-8 transition-all duration-500 ${isFiltering ? 'opacity-30' : ''}`}
          >
            <div className="flex items-center justify-between h-full">
              <div>
                <p className="text-primary/40 text-[10px] sm:text-xs tracking-widest uppercase mb-3">
                  Project Philosophy
                </p>
                <p className="text-primary text-base sm:text-lg font-light leading-relaxed max-w-sm">
                  Every project starts with a problem worth solving. I focus on clean architecture, intuitive interfaces, and code that scales.
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-center gap-1 ml-6">
                <span className="text-primary text-3xl font-bold">4</span>
                <span className="text-primary/40 text-[9px] tracking-widest uppercase">Shipped</span>
              </div>
            </div>
          </ProjectCardWrapper>
        </div>
      </div>

      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </section>
  );
};
