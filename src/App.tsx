import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceEducation } from './components/ExperienceEducation';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';

export const App: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    // Scroll reveal observer
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#06060c] text-[#dedbc8] selection:bg-[#7c5cfc]/30 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Background Dynamic Grid, Noise & Ambient Glow Orbs */}
      <BackgroundEffects />

      {/* Smooth Magnetic Cursor */}
      <CustomCursor />

      {/* Top Gradient Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Capsule Navbar */}
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} />
        <Projects selectedSkill={selectedSkill} />
        <ExperienceEducation />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
