import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import GlobalGradientBackground from "@/components/GlobalGradientBackground";
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

import { TerminalSection } from "@/components/terminal";

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
            <GlobalGradientBackground />
            <ScrollProgress />
            <Navbar />
            <main>
              {/* 1. Hero Section */}
              <HeroSection />

              {/* 2. Technology Strip */}
              <TerminalSection
                sectionName="tech"
                directory="technologies"
                command="./load-stack-strip.sh"
              >
                <TechStrip />
              </TerminalSection>

              {/* 3. Capabilities (What I Build) */}
              <TerminalSection
                sectionName="capabilities"
                directory="capabilities"
                command="./initialize-capabilities.sh"
                statusLines={[
                  "[OK] Full Stack Development",
                  "[OK] AI & Machine Learning",
                  "[OK] Mobile Development",
                  "[OK] Cloud & DevOps"
                ]}
              >
                <CapabilitiesSection />
              </TerminalSection>

              {/* 4. Engineering Approach (How I Build) */}
              <TerminalSection
                sectionName="process"
                directory="process"
                command="./load-process.sh"
                statusLines={[
                  "[01] DISCOVER [OK]",
                  "[02] DESIGN [OK]",
                  "[03] DEVELOP [OK]",
                  "[04] DEPLOY & IMPROVE [OK]"
                ]}
              >
                <EngineeringProcess />
              </TerminalSection>

              {/* 5. Featured Projects Case Studies */}
              <TerminalSection
                sectionName="projects"
                directory="projects"
                command="./scan-projects.sh"
                statusLines={[
                  "[01] Marian Excellence Grid [OK]",
                  "[02] NavaKrishi AI [OK]",
                  "[03] VLink Inventory [OK]",
                  "[04] NavaYatra [OK]",
                  "[05] NeXGeaR [OK]"
                ]}
              >
                <ProjectsSection />
              </TerminalSection>

              {/* 6. Technology Stack Grid */}
              <TerminalSection
                sectionName="stack"
                directory="stack"
                command="./load-stack.sh"
                statusLines={[
                  "FRONTEND ........ [OK]",
                  "BACKEND ......... [OK]",
                  "DATABASE ........ [OK]",
                  "AI / ML ......... [OK]",
                  "CLOUD ........... [OK]",
                  "MOBILE .......... [OK]"
                ]}
              >
                <SkillsSection />
              </TerminalSection>

              {/* 7. About Me & Currently Exploring */}
              <TerminalSection
                sectionName="about"
                directory="santhosh"
                command="whoami"
                statusLines={[
                  "role: software developer",
                  "education: MCA",
                  "focus: full stack / AI / cloud",
                  "profile loaded."
                ]}
              >
                <AboutSection />
              </TerminalSection>

              {/* 8. Journey & Career Timeline */}
              <TerminalSection
                sectionName="journey"
                directory="journey"
                command="cat ~/journey.log"
                statusLines={[
                  "[01] MCA Studies [OK]",
                  "[02] Full-Stack Projects [OK]",
                  "[03] BCA Graduation [OK]",
                  "[04] Continuous Learning [OK]"
                ]}
              >
                <ExperienceSection />
              </TerminalSection>

              {/* 9. Resume Banner CTA */}
              <TerminalSection
                sectionName="resume"
                directory="profile"
                command="cat resume.meta"
              >
                <ResumeCTA />
              </TerminalSection>

              {/* 10. Contact Form Section */}
              <TerminalSection
                sectionName="contact"
                directory="contact"
                command="./connect.sh"
                statusLines={[
                  "Email ........ [READY]",
                  "GitHub ....... [READY]",
                  "LinkedIn ..... [READY]",
                  "contact.module loaded."
                ]}
              >
                <ContactSection />
              </TerminalSection>
            </main>
            
            {/* 11. Corporate Footer */}
            <TerminalSection
              sectionName="system"
              directory="system"
              command="exit"
              statusLines={["session complete."]}
            >
              <Footer />
            </TerminalSection>
          </div>
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;
