import React from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#101010] border border-[#dedbc8]/20 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative text-[#dedbc8]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#dedbc8]/50 hover:text-[#dedbc8] text-2xl font-bold cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-[#dedbc8]/5 hover:bg-[#dedbc8]/15 transition-all"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{project.emoji}</span>
          <span className="text-xs uppercase tracking-widest text-[#dedbc8]/40 font-mono">
            {project.category}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#dedbc8] mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-[#dedbc8]/60 mb-6">{project.tagline}</p>

        {/* Detailed Narrative */}
        <div className="space-y-6 border-t border-[#dedbc8]/10 pt-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#dedbc8]/40 mb-2">
              Overview
            </h4>
            <p className="text-sm leading-relaxed text-[#dedbc8]/80">
              {project.longDescription}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#dedbc8]/40 mb-2">
              My Role & Contributions
            </h4>
            <p className="text-sm leading-relaxed text-[#dedbc8]/80">
              {project.role}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#dedbc8]/40 mb-2">
              Key Features
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#dedbc8]/70">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dedbc8]/40" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#dedbc8]/40 mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#dedbc8]/5 border border-[#dedbc8]/10 rounded-md text-[11px] text-[#dedbc8]/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#dedbc8]/10">
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#dedbc8] text-black font-semibold text-xs rounded-xl hover:bg-white transition-all flex items-center gap-2"
              >
                GitHub Repository ↗
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#dedbc8]/10 border border-[#dedbc8]/20 text-[#dedbc8] font-semibold text-xs rounded-xl hover:bg-[#dedbc8]/20 transition-all flex items-center gap-2"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
