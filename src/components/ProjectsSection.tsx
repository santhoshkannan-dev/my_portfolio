import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { TerminalRevealItem } from "./terminal";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "WEB" | "MOBILE" | "AI / ML" | "FULL STACK";
  desc: string;
  problem: string;
  solution: string;
  tech: string[];
  features: string[];
  role: string;
  github: string;
  live: string;
  image?: string;
  mockupType?: string;
}

const NavaKrishiMockup = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[320px] bg-zinc-950/90 border border-emerald-500/30 rounded-2xl overflow-hidden p-5 flex flex-col justify-between font-sans shadow-2xl">
    <div className="flex justify-between items-center border-b border-white/10 pb-3">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-[10px] text-zinc-400 font-mono tracking-wider">NAVAKRISHI_AI_ANALYTICS_v1.0</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">AI Yield Predictor Live</span>
      </div>
    </div>

    <div className="flex-grow flex flex-col justify-center min-h-[110px] relative my-2">
      <div className="absolute top-0 left-0 text-[9px] text-zinc-400 font-mono uppercase">Soil Moisture & Crop Forecast Curve</div>
      <svg viewBox="0 0 300 100" className="w-full h-24 stroke-emerald-400 fill-none stroke-[2.5] drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">
        <path d="M 0 80 Q 30 70 60 50 T 120 60 T 180 30 T 240 25 T 300 10" />
        <path d="M 0 80 Q 30 70 60 50 T 120 60 T 180 30 T 240 25 T 300 10 L 300 100 L 0 100 Z" className="fill-emerald-500/10 stroke-none" />
        <circle cx="240" cy="25" r="5" className="fill-emerald-400" />
        <circle cx="240" cy="25" r="10" className="stroke-emerald-400/50 fill-none animate-ping" />
      </svg>
    </div>

    <div className="grid grid-cols-2 gap-3 pt-2">
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-2.5">
        <span className="text-[9px] text-zinc-400 uppercase font-mono block">Moisture Index</span>
        <span className="text-sm font-bold text-emerald-400 font-mono">42.8% <span className="text-[9px] font-normal text-emerald-500/80">Optimal</span></span>
      </div>
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-2.5">
        <span className="text-[9px] text-zinc-400 uppercase font-mono block">AI Recommendation</span>
        <span className="text-xs font-bold text-white">Sow Wheat Seeds</span>
      </div>
    </div>
  </div>
);

const VLinkInventoryMockup = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[320px] bg-zinc-950/90 border border-amber-500/30 rounded-2xl overflow-hidden p-5 flex flex-col justify-between font-sans shadow-2xl">
    <div className="flex justify-between items-center border-b border-white/10 pb-3">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-[10px] text-zinc-400 font-mono tracking-wider">VLINK_INVENTORY_LOGISTICS_v2.0</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-[9px] text-amber-400 font-mono font-bold uppercase tracking-wider">Telecom Stock Live</span>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2.5 my-3">
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-2.5">
        <span className="text-[9px] text-zinc-400 uppercase font-mono block">Total Stock</span>
        <span className="text-sm font-bold text-white font-mono">14,250 <span className="text-[9px] text-emerald-400 font-normal">Units</span></span>
      </div>
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-2.5">
        <span className="text-[9px] text-zinc-400 uppercase font-mono block">Dispatched</span>
        <span className="text-sm font-bold text-amber-400 font-mono">180 Pcs</span>
      </div>
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-2.5">
        <span className="text-[9px] text-zinc-400 uppercase font-mono block">Alert Threshold</span>
        <span className="text-sm font-bold text-red-400 font-mono">3 Items</span>
      </div>
    </div>

    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 flex-grow font-mono text-[10px] text-zinc-300">
      <div className="flex justify-between font-bold text-[9px] text-zinc-400 border-b border-white/10 pb-1.5 mb-2 uppercase">
        <span>Technician</span>
        <span>Material</span>
        <span>Qty</span>
        <span>Status</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span>Rahul M.</span>
          <span>CAT-6 Cable</span>
          <span>2 Rolls</span>
          <span className="text-emerald-400 font-bold">Approved</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Justin K.</span>
          <span>Fiber ONT</span>
          <span>5 Units</span>
          <span className="text-emerald-400 font-bold">Approved</span>
        </div>
      </div>
    </div>
  </div>
);

const projects: Project[] = [
  {
    id: "meg",
    title: "Marian Excellence Grid",
    subtitle: "Class Evaluation & Academic Analytics Platform",
    category: "WEB",
    desc: "A centralized digital evaluation & performance tracking platform engineered for Marian College Kuttikkanam to streamline role-based class achievement records, activity verification, and student recognition.",
    problem: "Manual paper-based academic evaluation processes created data silos, delayed activity verification, and made class performance tracking inefficient.",
    solution: "Designed a secure role-based web system with automated evaluation workflows, real-time analytics grid dashboards, and Google OAuth integration.",
    tech: ["React", "Django", "PostgreSQL", "Google OAuth", "REST API", "Tailwind CSS"],
    features: [
      "Role-Based Access Control (Admin, Faculty, Student)",
      "Automated evaluation score calculations",
      "Interactive analytics grid dashboard",
      "Official production cloud deployment"
    ],
    role: "Full-Stack Developer & System Architect",
    github: "https://github.com/santhoshkannan-dev/Marian-Excellence-Grid.git",
    live: "https://excellence.marian.cloud",
    image: "/MEG.png",
  },
  {
    id: "navakrishi",
    title: "NavaKrishi AI",
    subtitle: "AI-Powered Agriculture & Yield Prediction Platform",
    category: "AI / ML",
    desc: "An intelligent smart-agriculture web ecosystem connecting farmers and consumers while leveraging machine learning algorithms to predict soil health and recommended crop yields.",
    problem: "Small-scale farmers lack data-driven insights into soil moisture, crop suitability, and direct-to-consumer marketplace pricing.",
    solution: "Built an integrated web portal featuring Scikit-Learn prediction models, machine learning advisory algorithms, and a direct buyer-farmer marketplace.",
    tech: ["Python", "Machine Learning", "Scikit-Learn", "React", "Django", "PostgreSQL"],
    features: [
      "AI soil moisture & crop suitability predictions",
      "Farmer marketplace & inventory tracking",
      "Machine learning recommendation engine",
      "Responsive analytics dashboard"
    ],
    role: "Lead Full-Stack & ML Developer",
    github: "https://github.com/santhoshkannan-dev/NavaKrishi",
    live: "#",
    mockupType: "agriculture",
  },
  {
    id: "vlink",
    title: "VLink Inventory",
    subtitle: "Telecom Logistics & Inventory System",
    category: "FULL STACK",
    desc: "A MERN stack inventory tracking web app engineered for telecom operations logistics management. Features stock logs, supplier shipments, technician dispatches with safety checks, RBAC controls, and automated PDF/Excel reports.",
    problem: "Telecom service operators require real-time tracking of technician stock dispatches, material allocation logs, and automated depletion alerts.",
    solution: "Engineered a MERN stack logistics application with role-based access controls, technician dispatch approvals, dynamic stock logs, and report exports.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST API"],
    features: [
      "Role-Based Access Control (Admin, Supervisor, Technician)",
      "Technician dispatch & material allocation approvals",
      "Real-time stock logs & inventory depletion alerts",
      "Automated PDF & Excel report exports"
    ],
    role: "Full-Stack MERN Developer",
    github: "https://github.com/santhoshkannan-dev/vlink_inventory",
    live: "https://vlink-inventory.vercel.app",
    mockupType: "vlink",
  },
  {
    id: "navayatra",
    title: "NavaYatra",
    subtitle: "KSRTC Bus Booking & Travel Management Mobile App",
    category: "MOBILE",
    desc: "A cross-platform mobile booking application engineered for KSRTC passengers featuring seat reservation, live route details, digital ticket generation, and REST API integration.",
    problem: "Public transit passengers face inconvenient offline ticket booking procedures and lack mobile-friendly schedule tracking.",
    solution: "Developed a cross-platform mobile app with intuitive seat layout selection, instant ticket booking, history tracking, and Django REST APIs.",
    tech: ["React Native", "Django REST Framework", "PostgreSQL", "Expo", "REST API"],
    features: [
      "Interactive seat reservation layout",
      "Secure user authentication & booking history",
      "Digital ticket QR generation",
      "Optimized mobile UI/UX design"
    ],
    role: "Mobile App Developer",
    github: "https://github.com/santhoshkannan-dev/NavaYatra",
    live: "#",
    image: "/nava1.png",
  },
  {
    id: "nexgear",
    title: "NeXGeaR",
    subtitle: "Gaming PC Customization & E-Commerce Platform",
    category: "FULL STACK",
    desc: "A full-featured e-commerce platform dedicated to custom gaming PC hardware building, part compatibility checking, shopping cart management, and admin inventory control.",
    problem: "PC builders require clear component compatibility checks, specs visualization, and streamlined online purchasing.",
    solution: "Engineered a responsive e-commerce web platform with dynamic component filtering, shopping cart/wishlist management, and relational database schema.",
    tech: ["React", "Django", "PostgreSQL", "REST API", "Tailwind CSS"],
    features: [
      "Custom PC component compatibility checker",
      "Shopping cart & wishlist management",
      "Admin inventory management dashboard",
      "Relational database schema"
    ],
    role: "Full-Stack Developer",
    github: "https://github.com/santhoshkannan-dev/NeXGeaR",
    live: "#",
    image: "/nexgear.jpg",
  },
];

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<"ALL" | "WEB" | "MOBILE" | "AI / ML" | "FULL STACK">("ALL");

  const filteredProjects = projects.filter(
    (p) => filter === "ALL" || p.category === filter
  );

  return (
    <div id="projects" className="py-20 md:py-28 dark:bg-[#050505] bg-zinc-50 border-b border-border/60 relative overflow-hidden">
      {/* React Bits Dotted Pattern & Ambient Aurora Glow */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-80" />
      <div className="aurora-glow-violet w-[750px] h-[750px] top-1/3 left-1/2 -translate-x-1/2 opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <TerminalRevealItem order={0} className="max-w-3xl">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
              CASE STUDIES & WORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-4">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Selected digital products and software systems I've designed, architected, and built.
            </p>
          </TerminalRevealItem>

          {/* Filter Tabs */}
          <TerminalRevealItem order={1}>
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl dark:bg-white/[0.03] bg-zinc-100 border dark:border-white/10 border-zinc-200 shrink-0">
              {(["ALL", "WEB", "MOBILE", "AI / ML", "FULL STACK"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-300 cursor-pointer ${
                    filter === tab
                      ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "text-muted-foreground dark:hover:text-white hover:text-zinc-900 dark:hover:bg-white/5 hover:bg-zinc-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </TerminalRevealItem>
        </div>

        {/* Case Studies ScrollStack Container */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={30}
          itemStackDistance={24}
          stackPosition="12%"
          scaleEndPosition="8%"
          baseScale={0.92}
          itemScale={0.035}
          rotationAmount={0}
          blurAmount={0}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <ScrollStackItem key={project.id}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center p-6 md:p-10 rounded-3xl dark:bg-[#101014] bg-white border dark:border-white/10 border-zinc-200 hover:border-emerald-500/40 hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)] transition-all duration-500 shadow-2xl min-h-[460px]`}
                  >
                    {/* Media Showcase Column */}
                    <div
                      className={`lg:col-span-6 w-full h-full flex items-center justify-center ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div className="relative w-full rounded-2xl overflow-hidden border dark:border-white/10 border-zinc-300 dark:bg-zinc-950 bg-zinc-900 group">
                        {project.image ? (
                          <div className="relative w-full aspect-[16/10] overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                          </div>
                        ) : project.mockupType === "vlink" ? (
                          <div className="p-2 w-full h-full min-h-[260px] flex items-center justify-center">
                            <VLinkInventoryMockup />
                          </div>
                        ) : (
                          <div className="p-2 w-full h-full min-h-[260px] flex items-center justify-center">
                            <NavaKrishiMockup />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Case Study Details Column */}
                    <div
                      className={`lg:col-span-6 flex flex-col justify-between ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {project.category}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground">{project.role}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-1 tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-emerald-400/90 mb-4 uppercase tracking-wider font-semibold">
                          {project.subtitle}
                        </p>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {project.desc}
                        </p>

                        {/* Problem & Solution */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-xl dark:bg-white/[0.02] bg-zinc-100/80 border dark:border-white/5 border-zinc-200 font-sans">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-red-500 font-bold block mb-1">Problem</span>
                            <p className="text-xs dark:text-zinc-300 text-zinc-700 leading-snug">{project.problem}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase text-emerald-500 font-bold block mb-1">Solution</span>
                            <p className="text-xs dark:text-zinc-300 text-zinc-700 leading-snug">{project.solution}</p>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-1.5 mb-6">
                          {project.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs dark:text-zinc-300 text-zinc-700">
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-8">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-secondary/80 text-foreground/80 border border-border/50"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 pt-4 border-t dark:border-white/10 border-border">
                        {project.live && project.live !== "#" && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-1.5 cursor-pointer"
                          >
                            <ExternalLink size={14} /> Live Demo
                          </a>
                        )}
                        {project.github && project.github !== "#" && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl border dark:border-white/20 border-zinc-300 hover:border-emerald-400 dark:text-white text-zinc-900 hover:text-emerald-500 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                          >
                            <Github size={14} /> View Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              );
            })}
          </AnimatePresence>
        </ScrollStack>
      </div>
    </div>
  );
};

export default ProjectsSection;
