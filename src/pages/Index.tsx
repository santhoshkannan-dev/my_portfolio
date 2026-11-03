import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import GlobalParticlesBackground from "@/components/GlobalParticlesBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStrip from "@/components/TechStrip";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import EngineeringProcess from "@/components/EngineeringProcess";
import ProjectsSection from "@/components/ProjectsSection";
import VercelDeploymentsGallery from "@/components/VercelDeploymentsGallery";
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
            <GlobalParticlesBackground />
            <ScrollProgress />
            <Navbar />
            <main className="relative">
              {/* 1. Hero Section */}
              <HeroSection />

              {/* 2. Technology Strip */}
              <TechStrip />

              {/* 3. About Me & ProfileCard */}
              <AboutSection />

              {/* 4. Capabilities (What I Build) */}
              <CapabilitiesSection />

              {/* 5. Engineering Approach (How I Build) */}
              <EngineeringProcess />

              {/* 6. Featured Projects Case Studies */}
              <ProjectsSection />

              {/* 7. Vercel Cloud Deployments & 3D Interactive Lab */}
              <VercelDeploymentsGallery />

              {/* 8. Technology Stack Grid */}
              <SkillsSection />

              {/* 9. Journey & Career Timeline */}
              <ExperienceSection />

              {/* 10. Resume Banner CTA */}
              <ResumeCTA />

              {/* 11. Contact Form Section */}
              <ContactSection />
            </main>

            {/* 12. Corporate Footer */}
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;
