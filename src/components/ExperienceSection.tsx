import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { GraduationCap, Code, Award } from "lucide-react";
import { TerminalRevealItem } from "./terminal";

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

interface TimelineCardItemProps {
  item: TimelineItem;
  idx: number;
  prefersReducedMotion: boolean;
}

const TimelineCardItem: React.FC<TimelineCardItemProps> = ({
  item,
  idx,
  prefersReducedMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    margin: "-15% 0px -25% 0px",
    once: false,
  });
  const IconComp = item.icon;

  return (
    <TerminalRevealItem order={1 + idx * 0.5} effect="slide-right" className="relative group">
      <div ref={cardRef}>
        {/* Milestone Node Icon with glow and scale effect when in view */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : isInView
              ? {
                  scale: 1.12,
                  borderColor: "rgba(34, 211, 238, 0.8)",
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.45), 0 0 10px rgba(16, 185, 129, 0.3)",
                }
              : {
                  scale: 1,
                  borderColor: "rgba(16, 185, 129, 0.35)",
                  boxShadow: "0 0 10px rgba(16, 185, 129, 0.15)",
                }
          }
          whileHover={prefersReducedMotion ? {} : { scale: 1.18 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute -left-[37px] md:-left-[53px] top-1 p-2 rounded-xl dark:bg-[#101014] bg-white border z-10 cursor-default"
        >
          <IconComp
            size={16}
            className={`transition-colors duration-300 ${
              isInView ? "text-cyan-400 dark:text-cyan-300" : "text-emerald-400"
            }`}
          />
        </motion.div>

        {/* Content Card */}
        <div className="p-6 md:p-8 rounded-2xl dark:bg-[#101014] bg-white border dark:border-white/10 border-zinc-200 hover:border-emerald-500/40 hover:shadow-[0_15px_35px_rgba(168,85,247,0.10)] transition-all duration-300 relative z-10">
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
      </div>
    </TerminalRevealItem>
  );
};

export const ExperienceSection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Scroll-linked progress calculated directly against the timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(scaleY, (v) => `${Math.min(Math.max(v * 100, 0), 100)}%`);
  const beaconOpacity = useTransform(scaleY, [0, 0.02, 0.98, 1], [0, 1, 1, 0.85]);

  return (
    <div id="journey" className="scroll-mt-24 py-20 md:py-28 bg-transparent border-b border-border/60 relative overflow-hidden">
      {/* React Bits Dotted Pattern */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <TerminalRevealItem order={0} className="max-w-3xl mb-14 md:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
            CAREER & EDUCATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-4">
            Journey & Background
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Academic milestones, full-stack software development history, and technical training.
          </p>
        </TerminalRevealItem>

        {/* Timeline List with Progressive Animated Connecting Line */}
        <div
          ref={timelineRef}
          className="relative ml-4 md:ml-8 space-y-12 pl-6 md:pl-10"
        >
          {/* Static Background Track (thin, muted line behind animated line) */}
          <div className="absolute left-0 top-2 bottom-4 w-[2px] dark:bg-white/10 bg-border rounded-full pointer-events-none" />

          {/* Progressive Animated Foreground Line with Cyan-to-Green Gradient */}
          <motion.div
            className="absolute left-0 top-2 w-[2.5px] rounded-full pointer-events-none z-0"
            style={{
              height: prefersReducedMotion ? "100%" : lineHeight,
              background: "linear-gradient(180deg, #22d3ee 0%, #10b981 70%, #059669 100%)",
              boxShadow: "0 0 10px rgba(34, 211, 238, 0.6), 0 0 20px rgba(16, 185, 129, 0.35)",
            }}
          >
            {/* Restrained Traveling Light / Beacon Bead at the Leading Edge */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute -left-[5px] -bottom-1.5 w-3 h-3 rounded-full bg-cyan-300 pointer-events-none"
                style={{
                  boxShadow: "0 0 12px #22d3ee, 0 0 24px #10b981, 0 0 35px rgba(34, 211, 238, 0.8)",
                  opacity: beaconOpacity,
                }}
              >
                <div className="absolute -inset-1 rounded-full bg-cyan-400/40 animate-pulse pointer-events-none" />
                <div className="absolute inset-0.5 rounded-full bg-white opacity-95 shadow-sm" />
              </motion.div>
            )}
          </motion.div>

          {timelineItems.map((item, idx) => (
            <TimelineCardItem
              key={item.title}
              item={item}
              idx={idx}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
