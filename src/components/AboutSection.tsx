import React from "react";
import { motion } from "framer-motion";
import { Code, BookOpen, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const exploringTopics = [
  "Advanced React & Next.js Ecosystems",
  "Django REST Framework & Microservices",
  "Cloud Deployment & Docker Containerization",
  "Applied Machine Learning & Predictive Models",
  "System Architecture & Scalable Database Design",
  "Cross-Platform Mobile App Optimization"
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background border-b border-border/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Main Story */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
              BIOGRAPHY & BACKGROUND
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-6">
              About Me
            </h2>

            <div className="prose prose-invert max-w-none text-muted-foreground text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                I am <strong className="text-foreground font-semibold">Santhosh Kannan</strong>, a Software Developer and Master of Computer Applications (MCA) student at Marian College Kuttikkanam (Autonomous).
              </p>
              <p>
                My engineering focus centers on building reliable full-stack web applications, scalable backend REST APIs, cross-platform mobile tools, and AI-powered data solutions using <span className="text-emerald-400 font-mono">React</span>, <span className="text-emerald-400 font-mono">Python</span>, <span className="text-emerald-400 font-mono">Django</span>, <span className="text-emerald-400 font-mono">PostgreSQL</span>, and cloud services.
              </p>
              <p>
                Whether architecting database schemas, crafting responsive frontend interfaces, or training predictive machine learning models for agricultural and academic platforms, I emphasize clean code, functional UX, and system security.
              </p>
            </div>

            {/* Quick Metrics / Focus Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono uppercase text-muted-foreground block mb-1">Education</span>
                <span className="text-sm font-bold text-foreground">MCA Student</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono uppercase text-muted-foreground block mb-1">Core Tech</span>
                <span className="text-sm font-bold text-emerald-400">React + Django</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-xs font-mono uppercase text-muted-foreground block mb-1">Location</span>
                <span className="text-sm font-bold text-foreground">Kerala, India</span>
              </div>
            </div>
          </div>

          {/* Right Column - Currently Exploring */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl glass border border-border/80 bg-zinc-950/80 shadow-2xl relative">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <Sparkles size={18} className="text-emerald-400 animate-pulse" />
                <h3 className="text-base font-mono font-bold uppercase tracking-wider text-foreground">
                  Currently Exploring
                </h3>
              </div>

              <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                As a developer continuously refining my craft, here are the technical topics and architectures I am actively mastering:
              </p>

              <div className="space-y-3">
                {exploringTopics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-zinc-200">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
