import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStrip from "@/components/TechStrip";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import EngineeringProcess from "@/components/EngineeringProcess";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ResumeCTA from "@/components/ResumeCTA";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";

import TerminalReveal from "@/components/TerminalReveal";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <div className="min-h-screen bg-background text-foreground relative selection:bg-emerald-500 selection:text-black">
            <ScrollProgress />
            <Navbar />
            <main>
              {/* 1. Hero Section */}
              <HeroSection />

              {/* 2. Technology Strip */}
              <TechStrip />

              {/* 3. Capabilities (What I Build) */}
              <TerminalReveal
                sectionName="capabilities"
                directory="capabilities"
                commands={["cd ~/capabilities", "./initialize.sh"]}
                statusLines={[
                  "[ OK ] React",
                  "[ OK ] Django",
                  "[ OK ] REST APIs",
                  "[ OK ] AI / ML",
                  "[ OK ] Mobile",
                  "[ OK ] Cloud",
                  "system ready."
                ]}
              >
                <CapabilitiesSection />
              </TerminalReveal>

              {/* 4. Engineering Approach (How I Build) */}
              <EngineeringProcess />

              {/* 5. Featured Projects Case Studies */}
              <TerminalReveal
                sectionName="projects"
                directory="projects"
                commands={["cd ~/projects", "ls"]}
                statusLines={[
                  "[ OK ] Marian Excellence Grid",
                  "[ OK ] NavaKrishi AI",
                  "[ OK ] VLink Inventory",
                  "[ OK ] NavaYatra",
                  "[ OK ] NeXGeaR",
                  "project registry ready."
                ]}
              >
                <ProjectsSection />
              </TerminalReveal>

              {/* 6. Technology Stack Grid */}
              <TerminalReveal
                sectionName="stack"
                directory="stack"
                commands={["cd ~/stack", "./load-stack.sh"]}
                statusLines={[
                  "Frontend ........ [OK]",
                  "Backend ......... [OK]",
                  "Database ........ [OK]",
                  "AI / ML ......... [OK]",
                  "Mobile .......... [OK]",
                  "Cloud ........... [OK]",
                  "stack initialized."
                ]}
              >
                <SkillsSection />
              </TerminalReveal>

              {/* 7. About Me & Currently Exploring */}
              <TerminalReveal
                sectionName="about"
                directory="santhosh"
                commands={["cd ~/santhosh", "whoami"]}
                statusLines={[
                  "software developer",
                  "full stack builder",
                  "profile loaded",
                  "developer identity initialized."
                ]}
              >
                <AboutSection />
              </TerminalReveal>

              {/* 8. Journey & Career Timeline */}
              <TerminalReveal
                sectionName="journey"
                directory="journey"
                commands={["cd ~/journey", "cat journey.log"]}
                statusLines={[
                  "Full Stack Development",
                  "AI / ML",
                  "Cloud Architecture",
                  "journey loaded."
                ]}
              >
                <ExperienceSection />
              </TerminalReveal>

              {/* 9. Resume Banner CTA */}
              <ResumeCTA />

              {/* 10. Contact Form Section */}
              <TerminalReveal
                sectionName="contact"
                directory="contact"
                commands={["cd ~/contact", "./connect.sh"]}
                statusLines={[
                  "checking communication channel...",
                  "Email ........ [READY]",
                  "GitHub ....... [READY]",
                  "LinkedIn ..... [READY]",
                  "connection interface ready."
                ]}
              >
                <ContactSection />
              </TerminalReveal>
            </main>
            
            {/* 11. Corporate Footer */}
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;
