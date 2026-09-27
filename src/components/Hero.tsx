import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedTitle } from './AnimatedText';

const heroVideoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const Hero: React.FC = () => {
  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Authentic Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>

        {/* Ambient Noise and Gradient Overlays */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Top Floating Navigation */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap transition-colors duration-200 text-[#E1E0CC]/80 hover:text-[#E1E0CC]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Hero Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 lg:col-span-8">
              <motion.p
                className="text-primary/60 text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                ● Available for opportunities
              </motion.p>
              <h1
                className="text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] xl:text-[11vw] 2xl:text-[12vw] font-medium leading-[0.85] tracking-[-0.05em] select-none"
                style={{ color: '#E1E0CC' }}
              >
                <AnimatedTitle text="Petla Keerthi" showAsterisk={true} />
              </h1>
              <motion.p
                className="text-primary/70 text-xs sm:text-sm md:text-base max-w-lg mt-4 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Information Technology student &amp; Full-Stack Web Developer. Passionate about building responsive, user-friendly digital experiences.
              </motion.p>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-medium text-xs sm:text-sm hover:bg-[#D4D1BD] transition-colors"
                data-cursor="pointer"
              >
                Get in touch
              </a>
              <motion.div
                className="flex gap-6 mt-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-center">
                  <span className="block text-primary text-lg sm:text-xl font-bold">9.23</span>
                  <span className="text-primary/40 text-[9px] sm:text-[10px] tracking-widest uppercase">CGPA</span>
                </div>
                <div className="text-center">
                  <span className="block text-primary text-lg sm:text-xl font-bold">4</span>
                  <span className="text-primary/40 text-[9px] sm:text-[10px] tracking-widest uppercase">Projects</span>
                </div>
                <div className="text-center">
                  <span className="block text-primary text-lg sm:text-xl font-bold">5</span>
                  <span className="text-primary/40 text-[9px] sm:text-[10px] tracking-widest uppercase">Certs</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
