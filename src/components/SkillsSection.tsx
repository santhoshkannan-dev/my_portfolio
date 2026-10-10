import React from "react";
import { Layout, Server, Database as DbIcon, Cpu, Cloud, Smartphone } from "lucide-react";
import { TerminalRevealItem } from "./terminal";

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: { name: string; level?: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "FRONTEND",
    icon: Layout,
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "HTML5 & CSS3" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
      { name: "Next.js" },
    ],
  },
  {
    title: "BACKEND",
    icon: Server,
    skills: [
      { name: "Python" },
      { name: "Django" },
      { name: "Django REST Framework" },
      { name: "RESTful APIs" },
      { name: "Node.js" },
      { name: "Express.js" },
    ],
  },
  {
    title: "DATABASE",
    icon: DbIcon,
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Database Schema Design" },
      { name: "ORMs & Querying" },
    ],
  },
  {
    title: "AI / DATA",
    icon: Cpu,
    skills: [
      { name: "Machine Learning" },
      { name: "Scikit-Learn" },
      { name: "OpenCV" },
      { name: "Pandas & NumPy" },
      { name: "Data Analytics" },
    ],
  },
  {
    title: "CLOUD / DEVOPS",
    icon: Cloud,
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Linux Server Administration" },
      { name: "Git & GitHub" },
      { name: "CI/CD Workflows" },
    ],
  },
  {
    title: "MOBILE",
    icon: Smartphone,
    skills: [
      { name: "React Native" },
      { name: "Expo" },
      { name: "Mobile UI Design" },
      { name: "Cross-Platform Build" },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <div id="stack" className="py-20 md:py-28 dark:bg-[#050505] bg-zinc-50 border-b border-border/60 relative overflow-hidden">
      {/* React Bits Dotted Pattern */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <TerminalRevealItem order={0} className="max-w-3xl mb-14 md:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
            TECHNICAL EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-4">
            Technology Stack
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Core programming languages, frameworks, databases, and deployment tools I utilize across production software development.
          </p>
        </TerminalRevealItem>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <TerminalRevealItem key={cat.title} order={1 + idx * 0.4}>
                <div
                  className="p-6 md:p-7 rounded-2xl dark:bg-[#101014] bg-white border dark:border-white/10 border-zinc-200 hover:border-emerald-500/40 hover:shadow-[0_15px_35px_rgba(168,85,247,0.10)] transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b dark:border-white/10 border-border">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <IconComponent size={20} />
                      </div>
                      <h3 className="text-base font-mono font-bold tracking-wider text-foreground">
                        {cat.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="text-xs font-mono px-3 py-1.5 rounded-lg dark:bg-white/[0.04] bg-secondary/80 text-foreground border dark:border-white/10 border-border hover:border-emerald-500/40 hover:text-emerald-500 transition-colors"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
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

export default SkillsSection;
