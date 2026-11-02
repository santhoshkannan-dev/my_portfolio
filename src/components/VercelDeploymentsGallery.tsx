import React, { useState } from 'react';
import CircularGallery, { CircularGalleryItem } from './CircularGallery';
import { TerminalRevealItem } from './terminal';
import { ExternalLink, Github, Radio, Layers, Sparkles } from 'lucide-react';

const vercelProjects: CircularGalleryItem[] = [
  {
    image: '/cineverse.png',
    text: 'Cineverse 3D',
    description: 'Next-generation 3D cinema booking web app with real-time seat selection, cylindrical panorama hero, and multi-city showtimes.',
    url: 'https://cineverse-3d.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/cineverse-3d',
    framework: 'Next.js 15',
    category: '3D Web / Three.js'
  },
  {
    image: '/vlink.png',
    text: 'VLink Inventory',
    description: 'Telecom operations logistics & equipment tracking system with technician dispatch safety checks and report exports.',
    url: 'https://vlink-inventory.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/vlink_inventory',
    framework: 'React / Vite',
    category: 'Full Stack MERN'
  },
  {
    image: '/nexgear.jpg',
    text: 'NeXGeaR',
    description: 'Custom gaming PC hardware builder with component compatibility validation and inventory cart management.',
    url: 'https://nexgear.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/nexgear',
    framework: 'React / Vite',
    category: 'E-Commerce'
  },
  {
    image: '/gallery/subscription-manager.svg',
    text: 'Subscription Manager',
    description: 'Centralized recurring subscription tracking, monthly expenditure metrics, renewal alerts, and tier management.',
    url: 'https://subscription-management-system-wine.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/Subscription_Management_System',
    framework: 'React / Vite',
    category: 'SaaS Platform'
  },
  {
    image: '/gallery/iot-dashboard.svg',
    text: 'IoT Metrics Dashboard',
    description: 'Live hardware sensor telemetry monitoring dashboard featuring real-time data streaming and node diagnostics.',
    url: 'https://io-t-dashboard-eight.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/IoT-Dashboard',
    framework: 'React / Vite',
    category: 'IoT & Analytics'
  },
  {
    image: '/gallery/solor-system.svg',
    text: 'Solar System 3D',
    description: 'Interactive celestial simulation modeled with WebGL and Three.js featuring accurate orbits, lighting, and textures.',
    url: 'https://solor-system-eta.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/solor-system',
    framework: 'Three.js / WebGL',
    category: 'Creative Dev'
  },
  {
    image: '/gallery/bytetasks.svg',
    text: 'ByteTasks',
    description: 'Modern developer-centric task board with drag-and-drop workflow states, priority tagging, and persistence.',
    url: 'https://bytetasks-git-main-santhoshkannans-projects.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/bytetasks',
    framework: 'React / Vite',
    category: 'Productivity'
  },
  {
    image: '/gallery/weather-app.svg',
    text: 'Weather Live App',
    description: 'Real-time meteorology tracking with browser geolocation lookup, 7-day forecasts, atmospheric pressure, and radar.',
    url: 'https://weather-app-g6u6-git-main-santhoshkannans-projects.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/weather-app',
    framework: 'React / Vite',
    category: 'API Integration'
  },
  {
    image: '/scroll-animation-paused.png',
    text: 'Scroll Animation 3D',
    description: 'Cinematic scroll-driven 3D experience with viewport-linked rotation transforms and high-performance RAF loop.',
    url: 'https://scroll-animation-one-psi.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/Scroll-Animation',
    framework: 'Canvas / Motion',
    category: 'Interactive Motion'
  },
  {
    image: '/gallery/credit-card.svg',
    text: 'Credit Card 3D UI',
    description: 'Interactive realistic credit card simulator with dynamic chip lighting, 3D flip rotation, and number formatting.',
    url: 'https://credit-card-lemon-gamma.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/credit-card',
    framework: 'CSS3 3D / JS',
    category: 'UI Component'
  },
  {
    image: '/gallery/animated-fanta.svg',
    text: 'Animated Fanta 3D',
    description: 'High-impact product landing page with floating fruit physics, parallax scroll triggers, and fluid animation.',
    url: 'https://animated-fanta-git-main-santhoshkannans-projects.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/animated-fanta',
    framework: 'GSAP / Motion',
    category: 'Creative Web'
  },
  {
    image: '/gallery/book-tracker.svg',
    text: 'Book Tracker',
    description: 'Personal digital library tracker for organizing reading progress, bookmarks, authors, and completed books.',
    url: 'https://book-tracker-five-silk.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/book-tracker',
    framework: 'React / Vite',
    category: 'Productivity'
  },
  {
    image: '/gallery/animated-tesla.svg',
    text: 'Animated Tesla UI',
    description: 'Automotive vehicle visualizer showcasing responsive view transitions, specs telemetry, and sleek minimalism.',
    url: 'https://animated-tesla-page.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/animated-tesla-page',
    framework: 'WebGL / Motion',
    category: 'Product Showcase'
  },
  {
    image: '/gallery/3d-bee.svg',
    text: '3D Bee Animation',
    description: 'Spatial insect model animation with procedural flight trajectories, wing flapping kinematics, and 3D lighting.',
    url: 'https://3d-bee-animated-santhoshkannans-projects.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/3d-bee-animated',
    framework: 'Three.js / 3D',
    category: 'Computer Graphics'
  },
  {
    image: '/gallery/gocart.svg',
    text: 'GoCart E-Commerce',
    description: 'Next.js dynamic shopping experience with instant catalog search, responsive basket drawer, and modern UI.',
    url: 'https://gocart-santhoshkannans-projects.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/gocart',
    framework: 'Next.js 14',
    category: 'E-Commerce'
  },
  {
    image: '/gallery/trofiko.svg',
    text: 'Trofiko Web App',
    description: 'Organic agricultural marketplace web interface with clean typography, responsive layout, and fresh aesthetic.',
    url: 'https://trofiko-git-main-santhoshkannans-projects.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/trofiko',
    framework: 'React / CSS',
    category: 'Web Design'
  },
  {
    image: '/gallery/passwd-generator.svg',
    text: 'Password Generator',
    description: 'Cryptographic client-side password tool with entropy scoring, symbol toggling, and one-click copy.',
    url: 'https://passwd-generator-git-main-santhoshkannans-projects.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/passwd-generator',
    framework: 'Web Tool',
    category: 'Security Utility'
  },
  {
    image: '/gallery/thengu-trails.svg',
    text: 'Thengu Trails',
    description: 'Regional travel discovery platform highlighting curated Kerala eco-destinations and tourist trail itineraries.',
    url: 'https://thengu-trails-git-main-santhoshkannans-projects.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/thengu-trails',
    framework: 'Web UI',
    category: 'Travel / Tourism'
  },
  {
    image: '/gallery/love-story.svg',
    text: 'Love Story Timeline',
    description: 'Romantic storytelling visual diary featuring chronologically staged memories and delicate typography.',
    url: 'https://love-story-git-main-santhoshkannans-projects.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/love-story',
    framework: 'React / Vite',
    category: 'Creative Story'
  },
  {
    image: '/gallery/login-motion.svg',
    text: 'Interactive Auth UI',
    description: 'Dynamic user authentication portal with smooth field transition states, floating labels, and feedback effects.',
    url: 'https://login-git-main-santhoshkannans-projects.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/login',
    framework: 'Motion / UI',
    category: 'Auth Experience'
  },
  {
    image: '/gallery/fun-experiments.svg',
    text: 'Creative Web Lab',
    description: 'Sandbox of generative code, creative canvas algorithms, micro-interactions, and visual web prototypes.',
    url: 'https://fun-gamma-nine.vercel.app',
    github: 'https://github.com/santhoshkannan-dev/fun',
    framework: 'Creative Dev',
    category: 'Experiments'
  }
];

export const VercelDeploymentsGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<CircularGalleryItem>(vercelProjects[0]);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredProjects = activeFilter === 'ALL'
    ? vercelProjects
    : vercelProjects.filter(p => {
        if (activeFilter === 'NEXTJS') return p.framework?.toLowerCase().includes('next');
        if (activeFilter === '3D') return p.category?.toLowerCase().includes('3d') || p.framework?.toLowerCase().includes('three') || p.category?.toLowerCase().includes('motion');
        if (activeFilter === 'VITE') return p.framework?.toLowerCase().includes('vite');
        return true;
      });

  return (
    <div id="deployments" className="scroll-mt-24 py-16 md:py-24 bg-transparent border-b border-border/60 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-60" />
      <div className="aurora-glow-violet w-[650px] h-[650px] top-1/4 -left-32 opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <TerminalRevealItem order={0} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold block">
                VERCEL CLOUD LAB
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Radio size={10} className="animate-pulse text-emerald-400" />
                21 Live Endpoints
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-4">
              All Vercel Deployments
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Explore 20+ live applications, interactive 3D simulations, and production systems hosted across Vercel edge networks. Drag or scroll to spin the 3D gallery.
            </p>
          </TerminalRevealItem>

          {/* Quick Filter Tabs */}
          <TerminalRevealItem order={1}>
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl dark:bg-white/[0.03] bg-zinc-100 border dark:border-white/10 border-zinc-200 shrink-0">
              {[
                { id: 'ALL', label: 'All Projects (21)' },
                { id: '3D', label: '3D & Motion' },
                { id: 'NEXTJS', label: 'Next.js' },
                { id: 'VITE', label: 'React / Vite' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-300 cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'text-muted-foreground dark:hover:text-white hover:text-zinc-900 dark:hover:bg-white/5 hover:bg-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </TerminalRevealItem>
        </div>

        {/* 3D CircularGallery Canvas Container */}
        <TerminalRevealItem order={2}>
          <div
            style={{ height: '600px', position: 'relative' }}
            className="w-full rounded-3xl overflow-hidden border dark:border-white/10 border-zinc-200 dark:bg-[#0c0a12]/90 bg-zinc-950/90 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl group"
          >
            {/* Top Control Bar with Drag Hint */}
            <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md">
                <Sparkles size={12} className="text-cyan-400" />
                <span className="hidden sm:inline">Interactive 3D Curved Gallery</span>
                <span className="sm:hidden">3D Gallery</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <span>Drag or Wheel to spin</span>
              </div>
            </div>

            {/* CircularGallery Component */}
            <CircularGallery
              items={filteredProjects}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.05}
              onItemClick={(item, index) => {
                console.log(item.text, index);
                setSelectedProject(item);
                if (item.url) {
                  window.open(item.url as string, '_blank', 'noopener,noreferrer');
                }
              }}
              onActiveChange={(index) => {
                const item = filteredProjects[index % filteredProjects.length];
                if (item) setSelectedProject(item);
              }}
            />
          </div>
        </TerminalRevealItem>

        {/* Active Deployment Launchpad Card */}
        {selectedProject && (
          <TerminalRevealItem order={3} className="mt-6">
            <div className="p-5 md:p-6 rounded-2xl dark:bg-[#101014]/90 bg-white/90 border dark:border-white/10 border-zinc-200 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all duration-300">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    {selectedProject.category || 'Vercel Deployment'}
                  </span>
                  {selectedProject.framework && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 flex items-center gap-1">
                      <Layers size={11} /> {selectedProject.framework}
                    </span>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
                  {selectedProject.text}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
                {selectedProject.url && (
                  <a
                    href={selectedProject.url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ExternalLink size={14} /> Launch Live Demo
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl border dark:border-white/20 border-zinc-300 hover:border-emerald-400 dark:text-white text-zinc-900 hover:text-emerald-500 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Github size={14} /> View Code
                  </a>
                )}
              </div>
            </div>
          </TerminalRevealItem>
        )}
      </div>
    </div>
  );
};

export default VercelDeploymentsGallery;
