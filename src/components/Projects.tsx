import React, { useCallback, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, CircleCheck } from 'lucide-react';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { SectionHeader } from './SectionHeader';
import { BackgroundVideo } from './BackgroundVideo';
import { AmbientGlow } from './AmbientGlow';
import { getProjectIcon } from './projectIcons';

interface ProjectsProps {
  selectedSkill: string | null;
}

const titleId = (project: Project) => `project-title-${project.id}`;

interface BentoCardProps {
  index: number;
  /** Styles for the inner glass plate (padding, layout, extra tint). */
  className?: string;
  /** Grid placement, e.g. row/column spans. */
  wrapperClassName?: string;
  /** Faded out because it doesn't match the selected skill. */
  dimmed?: boolean;
  /** When set, the card opens this project's details on click, Enter or Space. */
  project?: Project;
  onOpen?: (project: Project) => void;
  children: React.ReactNode;
}

/**
 * Double-bezel card. The outer tray (glass-shell) owns dimming, hover and press via CSS; the inner
 * plate (glass-core) owns the scroll-in entrance. Keeping them apart matters: Framer writes inline
 * opacity/transform, which would silently override Tailwind opacity/scale classes on the same element.
 */
const BentoCard: React.FC<BentoCardProps> = ({
  index,
  className = '',
  wrapperClassName = '',
  dimmed = false,
  project,
  onOpen,
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isInteractive = Boolean(project && onOpen);

  const open = () => {
    if (project && onOpen) onOpen(project);
  };

  return (
    <div
      onClick={isInteractive ? open : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
              }
            }
          : undefined
      }
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-haspopup={isInteractive ? 'dialog' : undefined}
      // Named by its visible title so voice-control users can say what they see ("click Legal Lens AI")
      aria-labelledby={project ? titleId(project) : undefined}
      data-cursor={isInteractive ? 'view' : undefined}
      className={`group glass-shell transition-[opacity,transform,filter,box-shadow] duration-300 ease-out-strong ${
        isInteractive ? 'is-interactive cursor-pointer active:scale-[0.99]' : ''
      } ${dimmed ? 'opacity-25 scale-[0.98] saturate-0 hover:opacity-60' : ''} ${wrapperClassName}`}
    >
      <motion.div
        ref={ref}
        className={`glass-core h-full overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: index * 0.08, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/** Whether a project should stay highlighted for the skill picked in the Skills section. */
const projectMatchesSkill = (project: Project, skill: string): boolean => {
  const s = skill.toLowerCase();
  const techs = project.technologies.map((t) => t.toLowerCase());

  if (s === 'full-stack') return ['legal-lens', 'edufeedback-erp', 'hirehub'].includes(project.id);
  if (s === 'python') return project.id === 'legal-lens';
  if (s === 'javascript') return techs.some((t) => t === 'javascript' || t === 'react' || t === 'vite');
  if (s === 'css') return techs.some((t) => t === 'css' || t === 'tailwind css');
  if (s === 'html') return techs.some((t) => t === 'html' || t === 'react');
  return techs.some((t) => t.includes(s));
};

const MatchBadge: React.FC = () => (
  <span className="px-2.5 py-1 bg-primary text-black rounded-full text-[10px] tracking-wider uppercase font-bold whitespace-nowrap">
    Matching skill
  </span>
);

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="glass-chip px-3 py-1 rounded-full text-xs text-primary/80">{label}</span>
);

const CategoryLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-primary/60 text-[10px] sm:text-xs tracking-[0.2em] uppercase">{children}</span>
);

/** Arrow inside its own glass circle that drifts toward its corner when the card is hovered. */
const HoverArrow: React.FC = () => (
  <span className="w-8 h-8 rounded-full glass-chip flex items-center justify-center flex-shrink-0 transition-transform duration-300 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
    <ArrowUpRight className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
  </span>
);

const featuredHighlights = [
  'Built with React (Vite) and MongoDB for full-stack document analysis',
  'Automatic summarization and key clause extraction engine',
  'Redesigned readability of complex legal text for non-experts'
];

// Short tag lists shown on the cards; the full stack lives in the details modal
const cardTags: Record<string, string[]> = {
  'legal-lens': ['React', 'Vite', 'MongoDB', 'AI / NLP'],
  'edufeedback-erp': ['React', 'Recharts', 'Socket.IO', 'Drag-and-Drop'],
  rapidaid: ['React', 'Vite', 'TypeScript'],
  'music-player': ['HTML', 'CSS', 'JavaScript'],
  hirehub: ['React', 'Express.js', 'MongoDB', 'JWT']
};

const findProject = (id: string): Project => projectsData.find((p) => p.id === id) ?? projectsData[0];

export const Projects: React.FC<ProjectsProps> = ({ selectedSkill }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const closeModal = useCallback(() => setActiveProject(null), []);

  const isFiltering = selectedSkill !== null;
  const matches = (project: Project) => !selectedSkill || projectMatchesSkill(project, selectedSkill);
  const isDimmed = (project: Project) => isFiltering && !matches(project);
  const showBadge = (project: Project) => isFiltering && matches(project);

  const legalLens = findProject('legal-lens');
  const musicPlayer = findProject('music-player');
  const FeaturedIcon = getProjectIcon(legalLens.icon);

  const renderCompactCard = (project: Project, index: number) => {
    const Icon = getProjectIcon(project.icon);
    return (
      <BentoCard
        key={project.id}
        index={index}
        project={project}
        onOpen={setActiveProject}
        dimmed={isDimmed(project)}
        className="p-6 sm:p-7 flex flex-col"
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl glass-chip flex items-center justify-center">
              <Icon className="w-[18px] h-[18px] text-primary" aria-hidden="true" />
            </span>
            <CategoryLabel>{project.category}</CategoryLabel>
          </div>
          <div className="flex items-center gap-2">
            {showBadge(project) && <MatchBadge />}
            <HoverArrow />
          </div>
        </div>
        <h3 id={titleId(project)} className="text-primary text-lg sm:text-xl font-bold mb-2">
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 text-pretty">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {cardTags[project.id].map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </BentoCard>
    );
  };

  return (
    <section id="projects" className="relative px-4 md:px-6 py-24 sm:py-28 md:py-40">
      <AmbientGlow tone="amber" intensity={0.16} className="-left-48 top-40 w-[56rem] h-[48rem]" />
      <AmbientGlow tone="rose" intensity={0.1} className="-right-40 bottom-20 w-[46rem] h-[40rem]" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="02 / Projects"
          lines={[{ text: 'Work that solves real problems.' }, { text: 'Built with passion. Shipped with purpose.', muted: true }]}
          className="mb-12 sm:mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* P-01: featured, spans two rows, with a warm light pooling at the top */}
          <BentoCard
            index={0}
            project={legalLens}
            onOpen={setActiveProject}
            dimmed={isDimmed(legalLens)}
            wrapperClassName="lg:row-span-2"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-2/3 pointer-events-none"
              style={{ background: 'radial-gradient(80% 60% at 20% 0%, rgba(214,140,72,0.16), transparent 70%)' }}
            />
            <div className="relative p-6 sm:p-9 flex flex-col h-full">
              <div className="flex items-start justify-between gap-3 mb-8">
                <div className="flex items-center gap-2 flex-wrap">
                  <CategoryLabel>{legalLens.category}</CategoryLabel>
                  <span className="glass-chip px-2.5 py-1 rounded-full text-primary text-[10px] tracking-[0.18em] uppercase">
                    AI-Powered
                  </span>
                  {showBadge(legalLens) && <MatchBadge />}
                </div>
                <HoverArrow />
              </div>
              <div className="w-14 h-14 rounded-2xl glass-chip flex items-center justify-center mb-6">
                <FeaturedIcon className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <h3 id={titleId(legalLens)} className="text-primary text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
                {legalLens.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-7 max-w-lg text-pretty">
                {legalLens.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {featuredHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CircleCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-300 text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {cardTags[legalLens.id].map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </div>
          </BentoCard>

          {renderCompactCard(findProject('edufeedback-erp'), 1)}
          {renderCompactCard(findProject('rapidaid'), 2)}

          {/* P-04: video-backed card */}
          <BentoCard
            index={3}
            project={musicPlayer}
            onOpen={setActiveProject}
            dimmed={isDimmed(musicPlayer)}
            className="min-h-[300px] lg:min-h-[280px]"
          >
            {musicPlayer.videoUrl && musicPlayer.videoPoster && (
              <BackgroundVideo
                sources={[{ src: musicPlayer.videoUrl }]}
                poster={musicPlayer.videoPoster}
                lazy
                className="transition-transform duration-700 ease-out-strong group-hover:scale-[1.03]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
            <div className="absolute top-5 right-5 flex items-center gap-2">
              {showBadge(musicPlayer) && <MatchBadge />}
              <HoverArrow />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
              <CategoryLabel>{musicPlayer.category}</CategoryLabel>
              <h3 id={titleId(musicPlayer)} className="text-primary text-lg sm:text-xl font-bold mt-2 mb-2">
                {musicPlayer.title}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 max-w-md text-pretty">
                {musicPlayer.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {cardTags[musicPlayer.id].map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </div>
          </BentoCard>

          {renderCompactCard(findProject('hirehub'), 4)}

          {/* Philosophy card spans the full row */}
          <BentoCard
            index={5}
            wrapperClassName={`lg:col-span-2 ${isFiltering ? 'opacity-40' : ''}`}
            className="p-6 sm:p-9"
          >
            <div className="flex items-center justify-between gap-6 h-full">
              <div>
                <p className="text-primary/60 text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-3">Project Philosophy</p>
                <p className="text-primary text-lg sm:text-2xl font-light leading-snug max-w-2xl text-pretty">
                  Every project starts with a problem worth solving. I focus on{' '}
                  <span className="font-serif italic">clean architecture</span>, intuitive interfaces, and code that
                  scales.
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-center gap-1 ml-6 glass-chip rounded-2xl px-6 py-4">
                <span className="text-primary text-4xl font-bold tabular-nums leading-none">{projectsData.length}</span>
                <span className="text-primary/60 text-[10px] tracking-[0.2em] uppercase">Shipped</span>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={closeModal} />
    </section>
  );
};
