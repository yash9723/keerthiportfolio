import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { AudioPlayer } from './components/AudioPlayer';
import { StickyNav } from './components/StickyNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceEducation } from './components/ExperienceEducation';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';

export const App: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    // reducedMotion="user" drops transform animations for visitors who ask their OS for less motion
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      <StickyNav />
      <AudioPlayer />
      {/* One fixed film-grain layer over everything, instead of per-section noise */}
      <div className="grain-overlay bg-noise" aria-hidden="true" />
      {/* overflow-x-clip keeps the oversized ambient glows from creating horizontal scroll */}
      <main className="bg-black min-h-screen overflow-x-clip text-primary selection:bg-primary/20 selection:text-primary font-sans antialiased">
        <Hero />
        <About />
        <Skills selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} />
        <Projects selectedSkill={selectedSkill} />
        <ExperienceEducation />
        <Certifications />
        <Contact />
      </main>
    </MotionConfig>
  );
};

export default App;
