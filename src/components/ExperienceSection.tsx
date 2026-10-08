import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Code, Award, Calendar } from "lucide-react";

interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
  desc: string;
  tech?: string[];
  icon: React.ElementType;
}

const timelineItems: TimelineItem[] = [
  {
    period: "PRESENT",
    title: "Master of Computer Applications (MCA)",
    subtitle: "Marian College Kuttikkanam (Autonomous)",
    desc: "Advanced postgraduate studies focusing on enterprise software architecture, full-stack web engineering, database administration, and artificial intelligence.",
    tech: ["Advanced Java", "Python", "Web Frameworks", "Software Engineering"],
    icon: GraduationCap,
  },
  {
    period: "2024 - PRESENT",
    title: "Full-Stack & AI Project Development",
    subtitle: "Autonomous & Academic Projects",
    desc: "Designed, architected, and built production web platforms including Marian Excellence Grid, NavaKrishi AI, NavaYatra bus booking app, and NeXGeaR PC marketplace.",
    tech: ["React", "Django", "PostgreSQL", "Machine Learning", "REST APIs"],
    icon: Code,
  },
  {
    period: "COMPLETED",
    title: "Bachelor of Computer Applications (BCA)",
    subtitle: "Undergraduate Computer Science Education",
    desc: "Graduated with foundational expertise in algorithms, relational databases, object-oriented programming, data structures, and web technologies.",
    tech: ["C++", "Java", "SQL", "Web Fundamentals"],
    icon: GraduationCap,
  },
  {
    period: "ONGOING",
    title: "Certifications & Technical Workshops",
    subtitle: "Continuous Professional Development",
    desc: "Participated in hands-on technical workshops, full-stack development certifications, cloud deployment practice, and AI application development.",
    tech: ["AWS Fundamentals", "Docker", "Python AI", "REST Architecture"],
    icon: Award,
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="journey" className="py-20 md:py-28 bg-background border-b border-border/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
            CAREER & EDUCATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-4">
            Journey & Background
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Academic milestones, full-stack software development history, and technical training.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 dark:border-white/10 border-border ml-4 md:ml-8 space-y-12 pl-6 md:pl-10">
          {timelineItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Timeline Node Icon */}
                <div className="absolute -left-[37px] md:-left-[53px] top-1 p-2 rounded-xl dark:bg-zinc-950 bg-white border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                  <IconComp size={16} />
                </div>

                {/* Content Card */}
                <div className="p-6 md:p-8 rounded-2xl glass border border-border/60 hover:border-emerald-500/40 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-fit">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono text-emerald-400/90 mb-4 font-semibold">
                    {item.subtitle}
                  </p>

                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {item.tech && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[9.5px] font-mono px-2.5 py-0.5 rounded bg-secondary/60 text-foreground/80 border border-border/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
