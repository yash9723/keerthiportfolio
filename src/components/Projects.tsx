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
    <section id="projects" className="bg-black py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-[#dedbc8]/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[#dedbc8] text-[10px] sm:text-xs tracking-widest uppercase mb-3">
            02 / Projects
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-[#dedbc8]">
            Selected works & engineering projects.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="bg-[#101010] border border-[#dedbc8]/[0.08] hover:border-[#dedbc8]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl">{project.emoji}</span>
                  <span className="text-[10px] sm:text-xs font-mono tracking-wider text-[#dedbc8]/40 uppercase">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#dedbc8] group-hover:text-white transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#dedbc8]/60 mb-4 font-mono">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#dedbc8]/80 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-[#dedbc8]/[0.04] border border-[#dedbc8]/10 rounded text-[10px] text-[#dedbc8]/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 text-[10px] text-[#dedbc8]/40">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#dedbc8]/10 text-xs text-[#dedbc8]/60">
                  <span className="font-mono">Explore Details</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
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
