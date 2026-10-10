import React from "react";
import { Monitor, Server, Cpu, Cloud } from "lucide-react";
import { TerminalRevealItem } from "./terminal";

const capabilities = [
  {
    num: "01",
    title: "WEB APPLICATIONS",
    desc: "Modern, high-performance responsive web applications built with React, TypeScript, Tailwind CSS, and Vite.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Next.js"],
    icon: Monitor,
  },
  {
    num: "02",
    title: "BACKEND & APIs",
    desc: "Scalable backend services, relational database schemas, and RESTful APIs using Python, Django, DRF, and PostgreSQL.",
    tags: ["Python", "Django", "Django REST", "PostgreSQL", "REST APIs"],
    icon: Server,
  },
  {
    num: "03",
    title: "AI & DATA",
    desc: "Intelligent prediction models, computer vision pipelines, and data analytics features integrated into practical web apps.",
    tags: ["Python", "Scikit-Learn", "OpenCV", "Pandas", "Machine Learning"],
    icon: Cpu,
  },
  {
    num: "04",
    title: "CLOUD & DEVOPS",
    desc: "Cloud-ready deployment workflows, containerized services, and Linux server management using AWS and Docker.",
    tags: ["AWS", "Docker", "Linux", "Git", "Nginx"],
    icon: Cloud,
  },
];

export const CapabilitiesSection: React.FC = () => {
  return (
    <div id="capabilities" className="py-20 md:py-28 bg-transparent border-b border-border/60 relative overflow-hidden">
      {/* React Bits Dotted Pattern & Ambient Aurora Glow */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-80" />
      <div className="aurora-glow-violet w-[600px] h-[600px] top-1/4 -right-32 opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <TerminalRevealItem order={0} className="max-w-3xl mb-14 md:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
            CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-4">
            What I Build
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            From frontend user experiences to backend architecture and AI-powered features, I build complete, scalable digital products.
          </p>
        </TerminalRevealItem>

        {/* Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {capabilities.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <TerminalRevealItem key={cap.num} order={1 + idx * 0.5}>
                <div
                  className="group relative p-6 sm:p-8 rounded-2xl dark:bg-[#101014] bg-white border dark:border-white/10 border-zinc-200 hover:border-emerald-500/50 hover:shadow-[0_15px_35px_rgba(168,85,247,0.12)] transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xl md:text-2xl font-mono font-bold text-emerald-400">
                        {cap.num}
                      </span>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                        <IconComponent size={22} />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 tracking-wide group-hover:text-emerald-400 transition-colors">
                      {cap.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] md:text-[11px] font-mono px-2.5 py-1 rounded-md bg-secondary/60 text-foreground/80 border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TerminalRevealItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesSection;
