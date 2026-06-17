import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Github, ExternalLink, Sparkles, Cpu, Layers, TrendingUp, Monitor } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. High-Fidelity CSS/SVG Interactive Mockups
// ==========================================

const NavaKrishiMockup = () => {
  return (
    <div className="relative w-full h-full min-h-[200px] bg-zinc-950/90 border border-emerald-500/20 rounded-2xl overflow-hidden p-4 flex flex-col justify-between font-sans">
      {/* Top Header Bar */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/60" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-[9px] text-zinc-500 font-mono tracking-wider">NAVAKRISHI_AI_v1.0</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-wider">Predicting Mode</span>
        </div>
      </div>

      {/* Main Graph Card */}
      <div className="flex-grow flex flex-col justify-center min-h-[90px] relative">
        <div className="absolute top-1 left-1 text-[8px] text-zinc-500 uppercase font-semibold">Yield Forecast</div>
        <svg viewBox="0 0 300 100" className="w-full h-20 stroke-emerald-500 fill-none stroke-[2] drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
          <path d="M 0 80 Q 30 70 60 50 T 120 60 T 180 30 T 240 25 T 300 10" />
          <path d="M 0 80 Q 30 70 60 50 T 120 60 T 180 30 T 240 25 T 300 10 L 300 100 L 0 100 Z" className="fill-emerald-500/5 stroke-none" />
          <circle cx="240" cy="25" r="4.5" className="fill-emerald-400" />
          <circle cx="240" cy="25" r="9" className="stroke-emerald-400/50 fill-none animate-ping" />
        </svg>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 flex flex-col justify-between">
          <span className="text-[8px] text-zinc-500 uppercase font-semibold">Moisture Index</span>
          <span className="text-xs font-bold text-emerald-400 font-display">42.8% <span className="text-[8px] font-normal text-emerald-500/70">Optimal</span></span>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 flex flex-col justify-between">
          <span className="text-[8px] text-zinc-500 uppercase font-semibold">ML Recommendation</span>
          <span className="text-xs font-bold text-white font-display">Sow Wheat Seeds</span>
        </div>
      </div>
    </div>
  );
};

const NavaYatraMockup = () => {
  return (
    <div className="relative w-full max-w-[200px] h-[230px] mx-auto bg-zinc-950 border border-blue-500/20 rounded-[2.2rem] p-2 flex flex-col shadow-2xl overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-zinc-950 rounded-b-xl z-20 flex justify-center items-center">
        <span className="w-10 h-0.5 bg-white/20 rounded-full" />
      </div>

      {/* Inner Screen */}
      <div className="flex-grow flex flex-col bg-zinc-900 rounded-[1.8rem] overflow-hidden relative z-10 border border-white/5 mt-1">
        <img
          src="/nava1.png"
          alt="NavaYatra UI"
          className="w-full h-full object-cover object-top select-none pointer-events-none"
        />
      </div>
    </div>
  );
};

const NeXGeaRMockup = () => {
  return (
    <div className="relative w-full h-full min-h-[200px] bg-zinc-950 border border-purple-500/20 rounded-2xl overflow-hidden flex flex-col shadow-xl">
      <div className="flex-grow rounded-xl overflow-hidden border border-white/5 m-2.5 relative">
        <img
          src="/nex1.png"
          alt="NeXGeaR E-Store UI"
          className="w-full h-full object-cover object-top select-none pointer-events-none"
        />
      </div>
    </div>
  );
};

const PortfolioMockup = () => {
  return (
    <div className="relative w-full h-full min-h-[200px] bg-zinc-950/90 border border-orange-500/20 rounded-2xl overflow-hidden p-4 flex flex-col justify-between font-mono">
      {/* Terminal Title */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 font-sans">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
        </div>
        <span className="text-[8px] text-zinc-500 font-semibold uppercase font-mono">portfolio_build.sh</span>
      </div>

      {/* Code Area */}
      <div className="flex-grow flex flex-col justify-start text-[9px] text-orange-400 font-mono leading-relaxed select-none overflow-hidden">
        <p className="text-zinc-500 font-semibold">$ npx vite build</p>
        <p className="text-emerald-500">✓ 8 chunks generated successfully</p>
        <p className="text-zinc-500 mt-1">$ cat info.json</p>
        <div className="text-[8px] text-orange-300/90 pl-2 mt-0.5 leading-normal">
          <span>{"{"}</span>
          <p className="pl-3">"name": <span className="text-emerald-400">"Santhosh"</span>,</p>
          <p className="pl-3">"role": <span className="text-emerald-400">"Full Stack Developer"</span>,</p>
          <p className="pl-3">"focus": <span className="text-emerald-400">["React", "Django", "AI"]</span></p>
          <span>{"}"}</span>
        </div>
      </div>

      {/* Bar footer */}
      <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-2 text-[8px] text-zinc-500 font-sans font-semibold uppercase">
        <span>Web Server</span>
        <span className="text-emerald-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>
    </div>
  );
};

const ProjectMockup = ({ type }: { type: string }) => {
  switch (type) {
    case "agriculture":
      return <NavaKrishiMockup />;
    case "mobile-booking":
      return <NavaYatraMockup />;
    case "ecommerce":
      return <NeXGeaRMockup />;
    case "portfolio":
      return <PortfolioMockup />;
    default:
      return null;
  }
};

// ==========================================
// 2. Project Data Definitions
// ==========================================

const projects = [
  {
    title: "NavaKrishi",
    subtitle: "AI Smart Agriculture Platform",
    desc: "An AI-powered agriculture ecosystem connecting farmers and consumers. Features crop prediction, machine learning recommendations, secure authentication, marketplace management, and responsive dashboards.",
    tech: ["React", "Django", "PostgreSQL", "Python", "Machine Learning"],
    github: "https://github.com/santhoshkannan007/NavaKrishi",
    live: "#",
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    glowColor: "rgba(16, 185, 129, 0.15)",
    badgeColor: "text-emerald-400 bg-emerald-950/30 border-emerald-500/20",
    borderColor: "group-hover:border-emerald-500/30",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    mockupType: "agriculture",
  },
  {
    title: "NavaYatra",
    subtitle: "KSRTC Booking Platform",
    desc: "Cross-platform mobile application for KSRTC ticket booking featuring authentication, seat reservation, ticket history, REST APIs, and optimized travel management.",
    tech: ["React Native", "Django", "PostgreSQL", "REST API"],
    github: "https://github.com/santhoshkannan007/NavaYatra",
    live: "#",
    gradient: "from-blue-500/20 via-cyan-500/10 to-sky-500/20",
    glowColor: "rgba(59, 130, 246, 0.15)",
    badgeColor: "text-blue-400 bg-blue-950/30 border-blue-500/20",
    borderColor: "group-hover:border-blue-500/30",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    mockupType: "mobile-booking",
  },
  {
    title: "NeXGeaR",
    subtitle: "Gaming PC E-Commerce",
    desc: "Complete gaming computer marketplace with authentication, shopping cart, wishlist, product management, admin dashboard, and secure checkout.",
    tech: ["React", "Django", "PostgreSQL"],
    github: "https://github.com/santhoshkannan007/NeXGeaR",
    live: "#",
    gradient: "from-purple-500/20 via-violet-500/10 to-pink-500/20",
    glowColor: "rgba(139, 92, 246, 0.15)",
    badgeColor: "text-purple-400 bg-purple-950/30 border-purple-500/20",
    borderColor: "group-hover:border-purple-500/30",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    mockupType: "ecommerce",
  },
  // {
  //   title: "Developer Portfolio",
  //   subtitle: "Personal Website",
  //   desc: "Modern animated portfolio built with React, TypeScript, TailwindCSS, GSAP, and Framer Motion featuring premium UI interactions, grid systems, and responsive layouts.",
  //   tech: ["React", "TypeScript", "GSAP", "Framer Motion", "TailwindCSS"],
  //   github: "https://github.com/yourusername",
  //   live: "https://yourportfolio.com",
  //   gradient: "from-orange-500/20 via-red-500/10 to-pink-500/20",
  //   glowColor: "rgba(249, 115, 22, 0.15)",
  //   badgeColor: "text-orange-400 bg-orange-950/30 border-orange-500/20",
  //   borderColor: "group-hover:border-orange-500/30",
  //   colSpan: "md:col-span-2",
  //   rowSpan: "md:row-span-1",
  //   mockupType: "portfolio",
  // },
];

// ==========================================
// 3. Project Card Component (3D Tilt & Spotlights)
// ==========================================

const ProjectCard = ({ project, i }: { project: typeof projects[0]; i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  const [hovered, setHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  // 3D Tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 15 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // 3D rotation coordinates
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);

    // Spotlight cursor tracking position
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const isLarge = project.colSpan === "md:col-span-2";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`
        relative overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-950/40 backdrop-blur-md p-6 md:p-8 flex flex-col justify-between transition-all duration-500 group cursor-none
        ${project.colSpan} ${project.rowSpan} ${project.borderColor} min-h-[360px]
      `}
    >
      {/* Background Gradient Blob */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`}
        style={{ transform: "translateZ(-10px)" }}
      />

      {/* Cursor-Tracking Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${project.glowColor}, transparent 80%)`,
        }}
      />

      {/* Floating Shimmer Sweep */}
      <motion.div
        animate={{
          x: hovered ? "180%" : "-180%",
        }}
        transition={{
          duration: 1.4,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
      />

      {/* Interactive Layout */}
      {isLarge ? (
        // For larger grids (2 columns): Render text on left, mockup on right (stacked on mobile)
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full w-full relative z-20" style={{ transform: "translateZ(30px)" }}>
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <p className="uppercase tracking-[3px] text-[10px] text-primary font-bold mb-2.5 font-display flex items-center gap-1.5">
                <Sparkles size={12} className="text-primary animate-pulse" />
                {project.subtitle}
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none mb-4">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                {project.desc}
              </p>
            </div>

            <div>
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide font-sans ${project.badgeColor}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 border border-white/10 hover:bg-zinc-800 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition-all duration-300 cursor-none"
                >
                  <Github size={14} />
                  GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-all duration-300 cursor-none shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div className="w-full max-w-[280px] lg:max-w-none group-hover:scale-[1.03] transition-transform duration-500">
              <ProjectMockup type={project.mockupType} />
            </div>
          </div>
        </div>
      ) : (
        // For smaller grids (1 column): Text and visual mockup stacked
        <div className="flex flex-col h-full justify-between w-full relative z-20" style={{ transform: "translateZ(30px)" }}>
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="uppercase tracking-[3px] text-[9px] text-primary font-bold mb-1 font-display">
                  {project.subtitle}
                </p>
                <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-none">
                  {project.title}
                </h3>
              </div>
              <motion.div
                animate={{ rotate: hovered ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-zinc-900/60 text-zinc-400 group-hover:text-primary group-hover:border-primary transition-colors"
              >
                <ArrowUpRight size={16} />
              </motion.div>
            </div>

            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 font-sans">
              {project.desc}
            </p>
          </div>

          {/* Embedded Mockup Widget */}
          <div className="w-full my-4 group-hover:scale-[1.03] transition-transform duration-500">
            <ProjectMockup type={project.mockupType} />
          </div>

          <div className="mt-auto">
            {/* Badges */}
            <div className="flex flex-wrap gap-1 mb-5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-1 rounded-full border text-[10px] font-semibold font-sans ${project.badgeColor}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-900 border border-white/5 hover:bg-zinc-800 hover:border-white/15 text-zinc-300 hover:text-white text-[11px] font-bold transition-all duration-300 cursor-none flex-grow justify-center"
              >
                <Github size={12} />
                GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-[11px] font-bold transition-all duration-300 cursor-none shadow-md flex-grow justify-center"
              >
                <ExternalLink size={12} />
                Live
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ==========================================
// 4. Main Component (GSAP ScrollTrigger Pinning)
// ==========================================

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });

  useGSAP(() => {
    // Only pin on desktop viewports to avoid mobile viewport issues
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative border-b border-white/5 bg-black py-20 overflow-hidden"
    >
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-emerald-500/5 filter blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-blue-500/5 filter blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />

      <div className="max-w-[85rem] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">

        {/* Left Column (GSAP Pinned Column) */}
        <div
          ref={leftColRef}
          className="md:col-span-4 h-fit md:h-[85vh] flex flex-col justify-center py-8 relative z-20"
        >
          <div ref={headingRef} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isHeadingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
                <Monitor size={12} className="text-emerald-400" />
                Featured Works
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter text-white leading-none">
                Real World
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 font-extrabold">
                  Solutions
                </span>
              </h2>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm">
                A selection of modular, production-ready applications engineered with React,
                Django, PostgreSQL, React Native, and high-performance UI toolkits.
              </p>
            </motion.div>

            {/* Interactive Stats Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 max-w-sm"
            >
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white font-display flex items-center gap-1.5">
                  <Layers size={18} className="text-emerald-500" />
                  04+
                </div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 font-sans">Full Builds</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white font-display flex items-center gap-1.5">
                  <Cpu size={18} className="text-blue-500" />
                  10+
                </div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 font-sans">Tech Integrations</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column (Scrolling Bento Grid) */}
        <div ref={rightColRef} className="md:col-span-8 w-full flex flex-col justify-start relative z-10 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} i={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
