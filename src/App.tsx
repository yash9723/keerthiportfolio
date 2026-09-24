import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceEducation } from './components/ExperienceEducation';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-[#dedbc8] selection:bg-[#dedbc8]/20 selection:text-[#dedbc8] font-sans antialiased">
      <Navbar />
      <main>
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
