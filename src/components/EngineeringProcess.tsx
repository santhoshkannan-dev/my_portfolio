import React from "react";
import { Search, Compass, Code2, Rocket } from "lucide-react";
import { TerminalRevealItem } from "./terminal";

const steps = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Understand project goals, user requirements, technical constraints, and data flows before writing code.",
    icon: Search,
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Plan system architecture, component hierarchies, database schemas, REST endpoints, and UI layouts.",
    icon: Compass,
  },
  {
    num: "03",
    title: "DEVELOP",
    desc: "Build responsive frontends, robust backends, API integrations, and AI models using modern engineering standards.",
    icon: Code2,
  },
  {
    num: "04",
    title: "DEPLOY & IMPROVE",
    desc: "Deploy applications to cloud infrastructure, monitor performance, gather feedback, and continuously refine.",
    icon: Rocket,
  },
];

export const EngineeringProcess: React.FC = () => {
  return (
    <div className="py-20 md:py-28 dark:bg-[#050505] bg-zinc-50 border-b border-border/60 relative overflow-hidden">
      {/* React Bits Dotted Pattern */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <TerminalRevealItem order={0} className="max-w-3xl mb-14 md:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
            ENGINEERING APPROACH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-4">
            How I Build
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A structured 4-step process for turning complex requirements into reliable, maintainable software products.
          </p>
        </TerminalRevealItem>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <TerminalRevealItem key={step.num} order={1 + idx * 0.5}>
                <div
                  className="relative p-6 rounded-2xl dark:bg-[#101014] bg-white border dark:border-white/10 border-zinc-200 hover:border-emerald-500/40 hover:shadow-[0_15px_35px_rgba(168,85,247,0.10)] transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-mono font-bold text-emerald-400">
                        {step.num}
                      </span>
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <IconComponent size={18} />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 tracking-wider">
                      {step.title}
                    </h3>

                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Connecting Line indicator on desktop */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-emerald-400/40 font-mono text-sm">
                      →
                    </div>
                  )}
                </div>
              </TerminalRevealItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EngineeringProcess;
