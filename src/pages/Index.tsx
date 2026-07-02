import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import LiquidEther from "@/components/LiquidEther";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import { useTheme } from "next-themes";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const liquidColors = useMemo(() => {
    return theme === "dark"
      ? ['#00ff80', '#00f3ff', '#0b1528']
      : ['#86efac', '#93c5fd', '#f0fdf4'];
  }, [theme]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <div className="min-h-screen bg-background text-foreground relative">
            <LiquidEther
              colors={liquidColors}
              mouseForce={18}
              cursorSize={80}
              autoDemo={true}
              autoSpeed={0.4}
              autoIntensity={2.0}
            />
            <ScrollProgress />
            <CursorGlow />
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ExperienceSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;
