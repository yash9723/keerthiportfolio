import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { certificationsData } from '../data/certifications';
import { navLinks } from '../data/navigation';
import { WordsPullUp } from './AnimatedText';
import { BackgroundVideo } from './BackgroundVideo';
import { ActionLink } from './ActionLink';

const heroVideoSources = [
  { src: 'media/hero-1920.mp4', media: '(min-width: 768px)' },
  { src: 'media/hero-960.mp4' }
];
const heroPosterSrcSet =
  'media/hero-poster-960.webp 960w, media/hero-poster-1440.webp 1440w, media/hero-poster-1920.webp 1920w';

const EASE = [0.23, 1, 0.32, 1] as const;

// No `filter` in these entrances: any filter on an element (even blur(0px) left behind after the
// animation) breaks backdrop-filter on it and its children, which would kill the glass blur.
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: EASE }
});

export const Hero: React.FC = () => {
  const stats = [
    { value: profileData.stats.cgpa, label: 'CGPA' },
    { value: projectsData.length, label: 'Projects' },
    { value: certificationsData.length, label: 'Certs' }
  ];

  return (
    <section className="h-[100dvh] min-h-[560px] p-3 md:p-5">
      <div className="relative w-full h-full rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden bg-[#1a150f] ring-1 ring-inset ring-primary/10">
        <BackgroundVideo
          sources={heroVideoSources}
          poster="media/hero-poster-1440.webp"
          posterSrcSet={heroPosterSrcSet}
          priority
        />
        <div className="absolute inset-0 noise-overlay opacity-[0.6] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/75 pointer-events-none" />

        {/* Notched nav tab hanging from the top edge — the site's signature element */}
        <nav aria-label="Primary" className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-3 md:px-8">
            <ul className="flex items-center gap-1 sm:gap-4 md:gap-10 lg:gap-12">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center min-h-[40px] px-1.5 text-[11px] sm:text-xs md:text-sm whitespace-nowrap transition-colors duration-200 text-primary/80 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-9 pb-5 md:pb-9">
          <div className="grid grid-cols-12 gap-5 items-end">
            <div className="col-span-12 lg:col-span-8">
              <motion.p className="eyebrow glass-blur mb-4" {...fadeUp(0.15)}>
                <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
                  <span className="pulse-ring absolute inset-0 rounded-full bg-primary" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-primary" />
                </span>
                Available for opportunities
              </motion.p>
              <h1 className="text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] xl:text-[11vw] 2xl:text-[12vw] font-medium leading-[0.85] tracking-[-0.05em] text-primary [text-shadow:0_2px_40px_rgba(0,0,0,0.35)]">
                <WordsPullUp text={profileData.name} showAsterisk />
              </h1>
              <motion.p
                className="text-primary/85 text-sm md:text-base max-w-lg mt-5 leading-relaxed text-pretty"
                {...fadeUp(0.4)}
              >
                Information Technology student &amp; Full-Stack Web Developer. Passionate about building responsive,{' '}
                <span className="font-serif italic text-primary text-[1.15em]">user-friendly</span> digital experiences.
              </motion.p>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-5">
              {/* On phones the primary CTA takes its own full-width row; the two profile links pair below it */}
              <motion.div className="flex flex-wrap items-center gap-2 lg:justify-end max-sm:w-full" {...fadeUp(0.5)}>
                <ActionLink href="#contact" className="max-sm:w-full max-sm:justify-between">
                  Get in touch
                </ActionLink>
                <ActionLink href={profileData.github} variant="glass" external>
                  GitHub
                </ActionLink>
                <ActionLink href={profileData.linkedin} variant="glass" external>
                  LinkedIn
                </ActionLink>
              </motion.div>

              {/* Real frosted glass: it sits over the moving video, so the blur has something to work with */}
              <motion.dl className="glass-blur rounded-2xl flex divide-x divide-primary/10 max-sm:w-full" {...fadeUp(0.65)}>
                {stats.map((stat) => (
                  <div key={stat.label} className="px-5 py-3 flex flex-col-reverse items-center max-sm:flex-1">
                    <dt className="text-primary/70 text-[10px] tracking-[0.2em] uppercase mt-1">{stat.label}</dt>
                    <dd className="text-primary text-xl sm:text-2xl font-bold tabular-nums leading-none">{stat.value}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
