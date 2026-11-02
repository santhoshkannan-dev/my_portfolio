import React, { useState } from 'react';
import SphereGallery3D from './SphereGallery3D';
import { CircularGalleryItem } from './CircularGallery';
import { TerminalRevealItem } from './terminal';
import { ExternalLink, Github, Radio, Layers } from 'lucide-react';
import { vercelProjects } from '../data/vercelProjects';

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
              Explore 20+ live applications, interactive 3D simulations, and production systems hosted across Vercel edge networks. Drag to rotate the 3D sphere, switch projection modes, or click any card to inspect and launch.
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
                  onClick={() => {
                    setActiveFilter(tab.id);
                    const matching = tab.id === 'ALL'
                      ? vercelProjects
                      : vercelProjects.filter(p => {
                          if (tab.id === 'NEXTJS') return p.framework?.toLowerCase().includes('next');
                          if (tab.id === '3D') return p.category?.toLowerCase().includes('3d') || p.framework?.toLowerCase().includes('three') || p.category?.toLowerCase().includes('motion');
                          if (tab.id === 'VITE') return p.framework?.toLowerCase().includes('vite');
                          return true;
                        });
                    if (matching.length > 0) setSelectedProject(matching[0]);
                  }}
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

        {/* 3D Sphere / Dome Gallery Canvas Container */}
        <TerminalRevealItem order={2}>
          <div className="w-full rounded-3xl overflow-hidden border dark:border-white/10 border-zinc-200 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <SphereGallery3D
              items={filteredProjects}
              defaultMode="SPHERE"
              autoRotateSpeed={0.24}
              onItemClick={(item) => {
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

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {selectedProject.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold border dark:border-white/10 border-zinc-200 hover:border-zinc-400 dark:hover:bg-white/5 hover:bg-zinc-100 transition-all cursor-pointer"
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>
                )}

                {selectedProject.url && (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] cursor-pointer"
                  >
                    <span>Launch Live App</span>
                    <ExternalLink size={14} />
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
