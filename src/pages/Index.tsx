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
              <CapabilitiesSection />

              {/* 4. Engineering Approach (How I Build) */}
              <EngineeringProcess />

              {/* 5. Featured Projects Case Studies */}
              <ProjectsSection />

              {/* 6. Technology Stack Grid */}
              <SkillsSection />

              {/* 7. About Me & Currently Exploring */}
              <AboutSection />

              {/* 8. Journey & Career Timeline */}
              <ExperienceSection />

              {/* 9. Resume Banner CTA */}
              <ResumeCTA />

              {/* 10. Contact Form Section */}
              <ContactSection />
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
