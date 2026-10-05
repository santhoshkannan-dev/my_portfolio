import { useEffect, useRef } from 'react';
import { Send, Download, Cpu, Database, Layers, ExternalLink, Code } from "lucide-react";
import { createTimeline, Timeline, stagger, set } from "animejs";
import Hero7Carousel, { CarouselItem } from './Hero7Carousel';

const hero7Items: CarouselItem[] = [
  {
    id: "navakrishi",
    category: "AI & AGRICULTURE",
    title: "NavaKrishi AI",
    desc: "Smart agriculture platform predicting soil health & crop yields with ML models.",
    tech: ["Python", "Machine Learning", "OpenCV", "Django"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    icon: Cpu,
  },
  {
    id: "meg",
    category: "ACADEMIC ANALYTICS",
    title: "Marian Excellence Grid",
    desc: "Class evaluation & performance tracking platform with analytics grid.",
    tech: ["React", "Django", "PostgreSQL", "REST APIs"],
    image: "/MEG.png",
    icon: Layers,
  },
  {
    id: "navayatra",
    category: "MOBILE & TRAVEL",
    title: "NavaYatra App",
    desc: "KSRTC bus booking & live passenger travel management app.",
    tech: ["React Native", "REST APIs", "Node.js", "MongoDB"],
    image: "/nava1.png",
    icon: Code,
  },
  {
    id: "nexgear",
    category: "E-COMMERCE & PC",
    title: "NeXGeaR PC Platform",
    desc: "Custom PC building & hardware e-commerce store with real-time specs.",
    tech: ["React", "Django REST", "PostgreSQL", "Tailwind"],
    image: "/nex1.png",
    icon: ExternalLink,
  },
  {
    id: "web-mobile",
    category: "SOFTWARE DEVELOPMENT",
    title: "Scalable Web Applications",
    desc: "Building high-performance responsive web & mobile apps with React & Django.",
    tech: ["React", "Django", "Python", "Tailwind"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    icon: Code,
  },
  {
    id: "cloud-infra",
    category: "CLOUD & INFRASTRUCTURE",
    title: "Cloud & Database Architecture",
    desc: "Designing scalable cloud deployment workflows & relational databases.",
    tech: ["AWS", "PostgreSQL", "Docker", "Linux"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    icon: Database,
  },
];

const HeroSection = () => {
  const introRef = useRef<HTMLDivElement>(null);

  const splitText = (text: string, isGradient: boolean = false) => {
    return text.split("").map((char, index) => {
      if (char === " ") return <span key={index}>&nbsp;</span>;
      return (
        <span
          key={index}
          className={`title-char inline-block ${
            isGradient
              ? "bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
              : "text-foreground"
          }`}
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        >
          {char}
        </span>
      );
    });
  };

  useEffect(() => {
    if (introRef.current) {
      introRef.current.style.opacity = "1";
    }

    set(".intro-badge", { opacity: 0, scale: 0.6, letterSpacing: "0.1em" });
    set(".title-char", { 
      opacity: 0, 
      translateY: 60, 
      rotateX: -45, 
      scale: 0.8 
    });
    set(".intro-desc", { opacity: 0, translateY: 20 });
    set(".hero-cta-group", { opacity: 0, translateY: 20 });
    set(".hero-7-carousel-wrapper", { opacity: 0, translateY: 30 });

    const timeline = createTimeline({
      autoplay: true,
    });

    timeline
      .add(".intro-badge", {
        opacity: [0, 1],
        scale: [0.6, 1],
        letterSpacing: ["0.1em", "0.35em"],
        duration: 800,
        easing: "easeOutExpo",
      })
      .add(".title-char", {
        opacity: [0, 1],
        translateY: [60, 0],
        rotateX: [-45, 0],
        scale: [0.8, 1],
        duration: 1000,
        delay: stagger(15),
        easing: "easeOutElastic(1, 0.75)",
      }, "-=600")
      .add(".intro-desc", {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: "easeOutExpo",
      }, "-=700")
      .add(".hero-cta-group", {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: "easeOutExpo",
      }, "-=700")
      .add(".hero-7-carousel-wrapper", {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 900,
        delay: stagger(100),
        easing: "easeOutExpo",
      }, "-=600");
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-start pt-24 xs:pt-28 md:pt-28 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden bg-background border-b border-border/60 z-20 w-full max-w-full">
      {/* Background Subtle Lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-border/40" />
      <div className="absolute inset-y-0 left-[10%] w-px bg-border/15 hidden md:block pointer-events-none" />
      <div className="absolute inset-y-0 right-[10%] w-px bg-border/15 hidden md:block pointer-events-none" />

      {/* Hero Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1000px] h-64 bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Main Intro Overlay */}
      <div
        ref={introRef}
        className="w-full max-w-7xl mx-auto flex flex-col items-center text-center opacity-0 z-20"
      >
        <span className="intro-badge mb-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 md:px-5 py-1.5 text-[10px] md:text-xs font-mono font-semibold uppercase tracking-[0.35em] text-emerald-400 backdrop-blur-xl opacity-0">
          Software Developer
        </span>

        <h1
          className="max-w-5xl text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          <div className="block">{splitText("Building")}</div>
          <div className="block my-1 sm:my-1.5">{splitText("Digital Products", true)}</div>
          <div className="block">{splitText("That Solve Real Problems.")}</div>
        </h1>

        <p className="intro-desc mt-3 md:mt-4 max-w-2xl text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed opacity-0">
          I build scalable web applications, mobile apps, REST APIs, and AI-powered solutions using modern technologies.
        </p>

        {/* Hero CTA Action Buttons */}
        <div className="hero-cta-group mt-6 flex flex-wrap items-center justify-center gap-3.5 opacity-0 z-30">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-white text-black font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
          >
            View My Work
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-xl border border-white/20 hover:border-emerald-400 text-white hover:text-emerald-400 font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Send size={14} /> Let's Talk
          </button>
          <a
            href="/SANTHOSH_KANNAN.pdf"
            download="SANTHOSH_KANNAN.pdf"
            className="px-5 py-3 rounded-xl border border-white/10 hover:border-white/30 text-muted-foreground hover:text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} /> Resume
          </a>
        </div>

        {/* React Bits Pro Hero 7 3D Rotating Image Carousel */}
        <div className="hero-7-carousel-wrapper relative w-full max-w-[1100px] mx-auto mt-6 md:mt-8">
          <Hero7Carousel items={hero7Items} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
