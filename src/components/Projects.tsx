import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  selectedSkill: string | null;
}

export const Projects: React.FC<ProjectsProps> = ({ selectedSkill }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = selectedSkill
    ? projectsData.filter((p) =>
        p.technologies.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase()))
      )
    : projectsData;

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-[#7c5cfc]/15 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <p className="font-mono text-[#00e5c0] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-3">
            02 / Projects
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-white">
            Selected works & engineering projects.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={`reveal reveal-delay-${(idx % 2) + 1} bg-[#0d0d16]/85 backdrop-blur-md border border-[#7c5cfc]/20 hover:border-[#00e5c0]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer group glow-card shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{project.emoji}</span>
                  <span className="text-[10px] sm:text-xs font-mono tracking-wider text-[#00e5c0] uppercase bg-[#00e5c0]/10 border border-[#00e5c0]/20 px-2.5 py-0.5 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00e5c0] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#7c5cfc] mb-4 font-mono font-medium">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#dedbc8]/80 leading-relaxed mb-6 font-light">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#7c5cfc]/[0.1] border border-[#7c5cfc]/25 rounded text-[11px] text-[#dedbc8] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2.5 py-1 text-[11px] text-[#dedbc8]/50 font-mono">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#dedbc8]/10 text-xs text-[#dedbc8]/70">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#00e5c0] group-hover:underline">Explore Case Study</span>
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                      </span>
                    )}
                  </div>
                  <span className="group-hover:translate-x-1.5 text-[#00e5c0] transition-transform text-sm">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};
