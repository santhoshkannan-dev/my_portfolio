import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, Database as DbIcon, Cpu, Cloud, Smartphone } from "lucide-react";

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
    <section id="stack" className="py-20 md:py-28 bg-zinc-950/80 border-b border-border/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
            TECHNICAL EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-4">
            Technology Stack
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Core programming languages, frameworks, databases, and deployment tools I utilize across production software development.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 md:p-7 rounded-2xl glass border border-border/60 hover:border-emerald-500/40 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
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
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] text-zinc-200 border border-white/10 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
