import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Cpu, Layers, Sparkles, MapPin, Briefcase, GraduationCap, Code2 } from "lucide-react";

const focusAreas = [
  { num: "01", title: "Full Stack Development", desc: "React, TypeScript, Django & REST APIs" },
  { num: "02", title: "AI & Machine Learning", desc: "Python, OpenCV & Predictive Analytics" },
  { num: "03", title: "Cloud & Backend Engineering", desc: "PostgreSQL, AWS, Docker & Microservices" },
  { num: "04", title: "Modern UI / UX Architecture", desc: "Tailwind CSS, Framer Motion & Responsive UX" },
];

const techPills = [
  "React",
  "TypeScript",
  "Python",
  "Django",
  "Django REST Framework",
  "PostgreSQL",
  "JavaScript",
  "React Native",
  "AWS",
  "Docker",
  "Git",
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 lg:py-36 bg-black border-b border-white/10 relative overflow-hidden z-10">
      {/* Background Grid Line Subtleties */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/5 via-emerald-500/5 to-transparent blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN: Close-Up Sunglasses Editorial Portrait (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start"
          >
            <div className="relative w-full max-w-[420px] lg:max-w-[460px] group">
              {/* Cyan/Green Ambient Rim Backlight Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/30 via-teal-400/20 to-cyan-500/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] sm:rounded-[40px]" />

              {/* Main Portrait Framing */}
              <div className="relative z-10 w-full aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-zinc-950 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                <img
                  src="/santhosh_sunglasses.jpg"
                  alt="Santhosh Kannan wearing sunglasses outdoors"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Subtle Bottom Gradient Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />

                {/* Overlapping Pill Badge */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-zinc-200 font-semibold tracking-wide uppercase">
                      Santhosh Kannan
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                    Developer
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Editorial About Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Eyebrow Label */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-md">
                01 / ABOUT ME
              </span>
            </div>

            {/* Editorial Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] mb-6 font-sans">
              I BUILD WITH <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                CURIOSITY, PRECISION
              </span> <br />
              & PURPOSE.
            </h2>

            {/* Personal Introduction Paragraphs */}
            <div className="space-y-4 mb-8">
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                I'm <strong className="text-white font-semibold">Santhosh Kannan</strong>, a software developer focused on building practical digital products across web, mobile, backend, and AI solutions.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                I enjoy turning complex ideas into intuitive, scalable products — from responsive user interfaces and REST APIs to data-driven and AI-powered applications.
              </p>
            </div>

            {/* CURRENTLY FOCUSED ON (Numbered Items) */}
            <div className="mb-8">
              <span className="text-[11px] font-mono font-semibold tracking-[0.25em] text-emerald-400 uppercase block mb-4">
                CURRENTLY FOCUSED ON
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {focusAreas.map((item) => (
                  <div
                    key={item.num}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-emerald-400">{item.num}</span>
                      <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TECH STACK PILLS */}
            <div className="mb-8">
              <span className="text-[11px] font-mono font-semibold tracking-[0.25em] text-zinc-400 uppercase block mb-3">
                CORE TECHNOLOGIES
              </span>
              <div className="flex flex-wrap gap-2">
                {techPills.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-300 hover:border-emerald-400/50 hover:text-emerald-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* PERSONAL DETAILS QUICK GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 mb-8">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">ROLE</span>
                <span className="text-xs font-bold text-white">Software Developer</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">EDUCATION</span>
                <span className="text-xs font-bold text-zinc-200">Computer Science</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">FOCUS</span>
                <span className="text-xs font-bold text-emerald-400">Full Stack • AI</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">LOCATION</span>
                <span className="text-xs font-bold text-zinc-200">Kerala, India</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-white text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 cursor-pointer group"
              >
                <span>Explore My Journey</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 rounded-xl border border-white/20 hover:border-emerald-400 text-white hover:text-emerald-400 font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                View Projects
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;

