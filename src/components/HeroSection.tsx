import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from "framer-motion";
import { ArrowDown, Send, Download, Code, Cpu, Database } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createTimeline, Timeline, stagger, set } from "animejs";
import InfiniteSpiral from './InfiniteSpiral';

gsap.registerPlugin(ScrollTrigger);

const TitleSparkles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[2px] h-[2px] bg-primary rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          boxShadow: '0 0 10px 1px rgba(0, 255, 128, 0.8)',
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
          y: [0, -30],
          x: [0, (Math.random() - 0.5) * 30],
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

const roles = ["Software Developer", "Software Engineering"];

const hero10Cards = [
  {
    id: "card-1",
    category: "SOFTWARE DEVELOPMENT",
    title: "Web & Mobile Applications",
    desc: "Building scalable web & cross-platform applications with React, Django, and REST APIs.",
    tech: ["React", "Django", "REST APIs", "React Native"],
    icon: Code,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    containerClass: "md:rotate-[-6deg] md:translate-y-6 z-10 hover:z-30 hover:rotate-[-2deg]",
    gradient: "from-emerald-500/10 via-primary/5 to-transparent",
  },
  {
    id: "card-2",
    category: "AI & MACHINE LEARNING",
    title: "AI-Powered Solutions",
    desc: "Developing intelligent algorithms, computer vision models, and data analytics pipelines.",
    tech: ["Python", "Machine Learning", "OpenCV", "Data Analytics"],
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    containerClass: "md:z-20 md:translate-y-0 md:scale-[1.03] hover:z-30 hover:scale-[1.05] border-primary/50 shadow-[0_16px_40px_rgba(0,255,128,0.2)] ring-1 ring-primary/30",
    gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
  {
    id: "card-3",
    category: "CLOUD & INFRASTRUCTURE",
    title: "Cloud & Database Architecture",
    desc: "Designing high-performance relational database schemas and cloud deployment workflows.",
    tech: ["AWS", "PostgreSQL", "Linux", "Docker"],
    icon: Database,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    containerClass: "md:rotate-[6deg] md:translate-y-6 z-10 hover:z-30 hover:rotate-[2deg]",
    gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
];

const techOrbitData = [
  // Frontend
  {
    name: "React",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    speed: 0.8,
    radius: 1.6,
    yOffset: 0.2,
    phase: 0,
  },
  {
    name: "React Native",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    speed: 0.7,
    radius: 1.6,
    yOffset: 0.45,
    phase: Math.PI / 3,
  },
  {
    name: "JavaScript",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    speed: 0.9,
    radius: 1.6,
    yOffset: 0.1,
    phase: (Math.PI * 2) / 3,
  },
  {
    name: "HTML5",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
    speed: 0.8,
    radius: 1.6,
    yOffset: 0.3,
    phase: Math.PI,
  },
  {
    name: "CSS3",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6",
    speed: 0.75,
    radius: 1.6,
    yOffset: 0.4,
    phase: (Math.PI * 4) / 3,
  },

  // Backend
  {
    name: "Node.js",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    speed: 0.8,
    radius: 2.1,
    yOffset: 0.3,
    phase: 0,
  },
  {
    name: "Express",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#ffffff",
    speed: 0.65,
    radius: 2.1,
    yOffset: 0.5,
    phase: Math.PI / 4,
  },
  {
    name: "Django",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    color: "#092E20",
    speed: 0.75,
    radius: 2.1,
    yOffset: 0.4,
    phase: Math.PI / 2,
  },
  {
    name: "Python",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#FFD43B",
    speed: 0.7,
    radius: 2.1,
    yOffset: 0.2,
    phase: (Math.PI * 3) / 4,
  },
  {
    name: "C",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    color: "#A8B9CC",
    speed: 0.6,
    radius: 2.1,
    yOffset: 0.6,
    phase: Math.PI,
  },

  // Databases
  {
    name: "PostgreSQL",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#336791",
    speed: 0.5,
    radius: 2.6,
    yOffset: 0.4,
    phase: 0,
  },
  {
    name: "MongoDB",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    speed: 0.65,
    radius: 2.6,
    yOffset: 0.3,
    phase: Math.PI / 4,
  },
  {
    name: "MySQL",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#4479A1",
    speed: 0.6,
    radius: 2.6,
    yOffset: 0.5,
    phase: Math.PI / 2,
  },

  // Cloud & DevOps
  {
    name: "AWS",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "#FF9900",
    speed: 0.55,
    radius: 3.1,
    yOffset: 0.5,
    phase: 0,
  },
  {
    name: "Docker",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
    speed: 0.7,
    radius: 3.1,
    yOffset: 0.2,
    phase: Math.PI / 5,
  },
  {
    name: "Git",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    speed: 0.85,
    radius: 3.1,
    yOffset: 0.6,
    phase: (Math.PI * 2) / 5,
  },
  {
    name: "GitHub",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#ffffff",
    speed: 0.75,
    radius: 3.1,
    yOffset: 0.4,
    phase: (Math.PI * 3) / 5,
  },
  {
    name: "Linux",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    color: "#FCC624",
    speed: 0.65,
    radius: 3.1,
    yOffset: 0.3,
    phase: (Math.PI * 4) / 5,
  },

  // AI & Tools
  {
    name: "OpenCV",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
    color: "#5C3EE8",
    speed: 0.75,
    radius: 3.6,
    yOffset: 0.5,
    phase: 0,
  },
  {
    name: "TensorFlow",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    color: "#FF6F00",
    speed: 0.7,
    radius: 3.6,
    yOffset: 0.4,
    phase: Math.PI / 2,
  },
  {
    name: "VS Code",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "#007ACC",
    speed: 0.8,
    radius: 3.6,
    yOffset: 0.2,
    phase: Math.PI,
  },
];

const HeroSection = () => {
  const { theme } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const animeTimelineRef = useRef<Timeline | null>(null);
  const [isModelFixed, setIsModelFixed] = useState(false);
  const [modelScaleProgress, setModelScaleProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const spiralItems = useMemo(
    () =>
      techOrbitData.map((item, idx) => ({
        id: idx,
        src: item.logoUrl,
        alt: item.name,
        title: item.name,
        color: item.color,
      })),
    []
  );

  const splitText = (text: string, isGradient: boolean = false) => {
    return text.split("").map((char, index) => {
      if (char === " ") return <span key={index}>&nbsp;</span>;
      return (
        <span
          key={index}
          className={`title-char inline-block ${
            isGradient
              ? "bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent"
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

    // Set initial states using anime.js to prevent animation jump
    set(".intro-badge", { opacity: 0, scale: 0.6, letterSpacing: "0.1em" });
    set(".title-char", { 
      opacity: 0, 
      translateY: 100, 
      rotateX: -75, 
      translateZ: -150, 
      scale: 0.3 
    });
    set(".intro-desc", { opacity: 0, translateY: 30 });
    set(".hero-card-wrapper", { opacity: 0, translateY: 30 });
    set(".hero-line", { scaleX: 0 });
    set(".hero-tag", { opacity: 0, translateX: -30 });
    set(".hero-role", { opacity: 0, translateY: 20 });
    set(".hero-marquee", { opacity: 0, translateY: 20 });
    if (buttonsRef.current) {
      set(buttonsRef.current, { opacity: 0, translateY: 20 });
    }

    const timeline = createTimeline({
      autoplay: true,
    });

    animeTimelineRef.current = timeline;

    timeline
      .add(".intro-badge", {
        opacity: [0, 1],
        scale: [0.6, 1],
        letterSpacing: ["0.1em", "0.35em"],
        duration: 900,
        easing: "easeOutExpo",
      })
      .add(".title-char", {
        opacity: [0, 1],
        translateY: [100, 0],
        rotateX: [-75, 0],
        translateZ: [-150, 0],
        scale: [0.3, 1],
        duration: 1300,
        delay: stagger(15),
        easing: "easeOutElastic(1, 0.75)",
      }, "-=700")
      .add(".intro-desc", {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: "easeOutExpo",
      }, "-=900")
      .add(".hero-card-wrapper", {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 900,
        delay: stagger(100),
        easing: "easeOutExpo",
      }, "-=800")
      .add(".hero-line", {
        scaleX: [0, 1],
        duration: 1000,
        easing: "easeOutExpo",
      }, "-=900")
      .add(".hero-tag", {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800,
        easing: "easeOutExpo",
      }, "-=900")
      .add(".hero-role", {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: "easeOutExpo",
      }, "-=900")
      .add(".hero-marquee", {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: "easeOutExpo",
      }, "-=900");

    if (buttonsRef.current) {
      timeline.add(buttonsRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: "easeOutExpo",
      }, "-=900");
    }

    return () => {
      timeline.pause();
    };
  }, []);

  useGSAP(() => {
    if (textRef.current) {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%", // Increased scroll distance to slow down the progress
          scrub: 2.5,    // Smoother and slower follow speed

          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const scaleStart = 0.05;
            const scaleEnd = 0.85;
            const progress = self.progress;
            const clampedProgress = gsap.utils.clamp(scaleStart, scaleEnd, progress);
            const newScale = gsap.utils.mapRange(scaleStart, scaleEnd, 0, 1, clampedProgress);
            setModelScaleProgress(newScale);
            setIsModelFixed(progress > scaleEnd);

            // Intro text scroll behavior
            if (introRef.current) {
              if (progress > 0) {
                // If the user scrolls while entrance is playing, snap to end of entrance
                if (animeTimelineRef.current) {
                  animeTimelineRef.current.seek(animeTimelineRef.current.duration);
                }

                // Scrub the text away over the first 15% of scroll
                const introScroll = gsap.utils.clamp(0, 1, progress / 0.15);
                gsap.set(introRef.current, {
                  opacity: 1 - introScroll,
                  y: -introScroll * 400, // Move upwards as it fades
                  scale: 1 + introScroll * 0.2
                });
              } else if (progress === 0) {
                // Reset to fully visible when scrolled all the way back up
                gsap.set(introRef.current, { opacity: 1, y: 0, scale: 1 });
              }
            }
          }
        }
      });
    }
  }, { scope: sectionRef });

  useEffect(() => {
    if (isModelFixed) {
      setText("Software Developer");
      return;
    }

    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setIsDeleting(true), 1500);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, isModelFixed]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-end px-4 sm:px-6 lg:px-20 xl:px-32 pb-4 overflow-hidden bg-background border-b border-border z-20 w-full max-w-full">
      <div className="absolute inset-x-0 top-0 h-px bg-border/40" />
      <div className="absolute inset-y-0 left-[10%] w-px bg-border/20 hidden md:block" />
      <div className="absolute inset-y-0 right-[10%] w-px bg-border/20 hidden md:block" />

      {/* Main Intro Text Overlay with React Bits Hero 10 Integration */}
      <div
        ref={introRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-20 xs:pt-24 md:pt-24 lg:pt-28 pb-12 md:pb-16 px-4 sm:px-6 text-center opacity-0 pointer-events-none overflow-y-auto md:overflow-hidden max-h-screen"
      >
        <span className="intro-badge mb-2 md:mb-3 rounded-full border border-primary/30 bg-primary/10 px-4 md:px-5 py-1 md:py-1.5 text-[10px] md:text-xs uppercase tracking-[0.35em] text-primary backdrop-blur-xl opacity-0">
          Software Developer
        </span>

        <h1
          className="max-w-5xl text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          <div className="block">{splitText("Building")}</div>
          <div className="block my-1 sm:my-1.5">{splitText("Scalable Digital", true)}</div>
          <div className="block">{splitText("Products")}</div>
        </h1>

        <p className="intro-desc mt-2 md:mt-3 max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed opacity-0">
          Building scalable web applications, mobile apps, REST APIs, and AI-powered
          solutions using React, Django, Python, PostgreSQL, and AWS.
        </p>

        {/* Hero 10 Curved 3-Card Visual Arc Composition */}
        <div className="relative w-full max-w-[1020px] mx-auto mt-3 md:mt-5 px-2 md:px-4 pointer-events-auto">
          {/* Ambient Curved Arc Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[950px] h-32 md:h-44 bg-gradient-to-r from-primary/10 via-cyan-500/20 to-blue-500/10 blur-3xl rounded-[100%] pointer-events-none -z-10 opacity-70" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5 items-start justify-center max-w-full">
            {hero10Cards.map((card) => {
              const IconComponent = card.icon;
              return (
                <div key={card.id} className="hero-card-wrapper w-full flex justify-center">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`hero-10-card relative flex flex-col w-full max-w-sm sm:max-w-md md:max-w-none min-h-[250px] md:min-h-[275px] lg:min-h-[290px] rounded-2xl md:rounded-[22px] glass border border-primary/25 hover:border-primary/60 transition-all duration-300 text-left bg-gradient-to-br ${card.gradient} backdrop-blur-xl group shadow-xl shadow-black/60 overflow-hidden origin-center ${card.containerClass}`}
                  >
                    {/* Top Visual Image Banner (45-50% height) */}
                    <div className="relative h-28 sm:h-32 md:h-36 w-full overflow-hidden rounded-t-2xl md:rounded-t-[22px]">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                      <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-background/80 backdrop-blur-md border border-primary/30 text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-md">
                        <IconComponent size={14} />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3 md:p-3.5 flex flex-col flex-1">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-primary font-semibold mb-1">
                        {card.category}
                      </span>
                      <h3 className="text-xs md:text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[11px] md:text-xs text-muted-foreground leading-snug mb-2 flex-1">
                        {card.desc}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {card.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-secondary/80 text-foreground/80 border border-border/50"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Infinite Spiral Tech Stack */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-auto select-none py-4"
        style={{
          opacity: modelScaleProgress,
          transform: `scale(${0.85 + modelScaleProgress * 0.15}) translateY(${(1 - modelScaleProgress) * 40}px)`,
          transition: "opacity 0.15s ease-out, transform 0.15s ease-out"
        }}
      >
        <div className="w-full h-full max-h-[600px] relative">
          <InfiniteSpiral
            items={spiralItems}
            animationMode="all"
            speed={0.55}
            radius={isMobile ? 140 : 180}
            cardWidth={isMobile ? 85 : 100}
            cardHeight={isMobile ? 85 : 100}
            verticalSpacing={isMobile ? 35 : 50}
            perspective={1000}
            cardRadius={12}
            centerScale={1.2}
            edgeFade={0.12}
            cardsPerTurn={7}
            pauseOnHover
            imageFit="contain"
          />
        </div>
      </div>

      <div ref={textRef} className="relative z-10 w-full max-w-[90rem] mx-auto pointer-events-none">
        <div className="border-t border-border pt-6 lg:pt-8 relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 min-h-[140px] lg:min-h-0 pointer-events-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:gap-24">
            {/* Desktop/Tablet Name Section */}
            <div className="hero-tag hidden lg:block">
              <div className="hero-line h-[2px] w-12 bg-primary mb-6" />
              <p className="text-muted-foreground font-medium tracking-widest uppercase text-xs mb-2"></p>
              <p className="text-foreground text-xl md:text-2xl font-bold">Santhosh Kannan</p>
            </div>

            <div className="hero-role flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-auto">
              <div className="hero-tag lg:hidden mb-4 flex flex-col items-center">
                <div className="hero-line h-[2px] w-12 bg-primary mb-4" />
                <p className="text-muted-foreground font-medium tracking-widest uppercase text-xs mb-2"></p>
                <p className="text-foreground text-xl font-bold">Santhosh Kannan</p>
              </div>
              <p className="text-xl lg:text-2xl text-muted-foreground h-8 font-sans font-light tracking-wide flex items-center justify-center lg:justify-start">
                <span className="text-foreground font-medium mr-2">Focus:</span> {text}<span className="animate-pulse text-primary ml-1">|</span>
              </p>
            </div>
          </div>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto pointer-events-auto">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="h-fit w-full lg:w-auto px-8 py-3.5 md:py-4 bg-primary text-black font-semibold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300 pointer-events-auto">View Projects</button>
            <div className="flex flex-row gap-3 sm:gap-4 w-full lg:w-auto pointer-events-auto">
              <a href="/SANTHOSH_KANNAN.pdf" download="SANTHOSH_KANNAN.pdf" className="flex-1 lg:flex-none px-4 lg:px-8 py-3.5 md:py-4 border border-border text-foreground font-medium text-sm hover:border-primary hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"><Download size={16} /> Resume</a>
              <a href="mailto:santhoshkannan.dev@gmail.com" className="flex-1 lg:flex-none px-4 lg:px-8 py-3.5 md:py-4 border border-border text-foreground font-medium text-sm hover:border-primary hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"><Send size={16} /> Contact</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 animate-bounce text-muted-foreground hover:text-primary transition-colors hidden md:block relative z-10">
          <ArrowDown size={32} strokeWidth={1} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
