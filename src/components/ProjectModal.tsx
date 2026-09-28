import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '../types';
import { getProjectIcon } from './projectIcons';
import { ActionLink } from './ActionLink';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const sectionLabel = 'text-xs font-mono uppercase tracking-wider text-primary/60 mb-2';
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Keep Tab focus cycling inside the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  const Icon = project ? getProjectIcon(project.icon) : null;
  const hasGithub = project?.githubUrl && project.githubUrl !== '#';
  const hasLive = project?.liveUrl && project.liveUrl !== '#';

  return (
    <AnimatePresence>
      {project && Icon && (
        <motion.div
          key="project-modal"
          // The backdrop does the heavy blur; the dialog inside can't blur the page (backdrop roots don't nest)
          className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="glass-shell max-w-2xl w-full text-primary"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            // Exit is quicker than entry: the system responds, the user isn't waiting on it
            exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] } }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="glass-core max-h-[85vh] overflow-y-auto p-6 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-64 pointer-events-none"
              style={{ background: 'radial-gradient(70% 80% at 15% 0%, rgba(214,140,72,0.14), transparent 70%)' }}
            />
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close project details"
              className="pressable glass-chip absolute top-5 right-5 z-10 text-primary/70 hover:text-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/15"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="relative flex items-center gap-3 mb-4 pr-12">
              <span className="w-11 h-11 rounded-2xl glass-chip flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </span>
              <span className="text-xs uppercase tracking-widest text-primary/60 font-mono">{project.category}</span>
            </div>
            <h3 id="project-modal-title" className="relative text-2xl sm:text-3xl font-bold text-primary mb-1 tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-primary/70 mb-6">{project.tagline}</p>

            <div className="space-y-6 border-t border-primary/10 pt-6">
              <div>
                <h4 className={sectionLabel}>Overview</h4>
                <p className="text-sm leading-relaxed text-primary/85">{project.longDescription}</p>
              </div>

              <div>
                <h4 className={sectionLabel}>My Role &amp; Contributions</h4>
                <p className="text-sm leading-relaxed text-primary/85">{project.role}</p>
              </div>

              <div>
                <h4 className={sectionLabel}>Key Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-primary/80">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className={sectionLabel}>Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="glass-chip px-3 py-1 rounded-full text-[11px] text-primary/85">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(hasGithub || hasLive) && (
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-primary/10">
                  {hasLive && (
                    <ActionLink href={project.liveUrl} external>
                      Live Demo
                    </ActionLink>
                  )}
                  {hasGithub && (
                    <ActionLink href={project.githubUrl} variant="glass" external>
                      Source on GitHub
                    </ActionLink>
                  )}
                </div>
              )}
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
