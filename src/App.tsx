import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceEducation } from './components/ExperienceEducation';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { AudioPlayer } from './components/AudioPlayer';

export const App: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <main className="bg-black min-h-screen text-[#dedbc8] selection:bg-primary/20 selection:text-primary font-sans antialiased">
      <CustomCursor />
      <AudioPlayer />
      <Hero />
      <About />
      <Skills selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} />
      <Projects selectedSkill={selectedSkill} />
      <ExperienceEducation />
      <Certifications />
      <Contact />
    </main>
  );
};

export default App;
