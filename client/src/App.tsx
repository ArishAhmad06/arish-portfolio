import { useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { navIds } from '@/components/layout/navigation';
import { About } from '@/components/sections/About';
import { Certifications } from '@/components/sections/Certifications';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Mindset } from '@/components/sections/Mindset';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useTheme } from '@/hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useScrollSpy(navIds);

  // Shared by Skills and Projects so hovering either highlights the other.
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header activeId={activeSection} theme={theme} onToggleTheme={toggleTheme} />

      <main id="main">
        <Hero />
        <About />
        <Skills
          activeSkill={activeSkill}
          activeProjectSlug={activeProjectSlug}
          onSkillChange={setActiveSkill}
        />
        <Projects activeSkill={activeSkill} onProjectChange={setActiveProjectSlug} />
        <Experience />
        <Certifications />
        <Mindset onToggleTheme={toggleTheme} />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
