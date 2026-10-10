import React from "react";
import { ArrowRight } from "lucide-react";
import { TerminalRevealItem } from "./terminal";

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
    <div id="about" className="py-24 lg:py-36 dark:bg-black bg-zinc-50 border-b dark:border-white/10 border-zinc-200/80 relative overflow-hidden z-10">
      {/* Background Grid Line Subtleties */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#88888810_1px,transparent_1px),linear-gradient(to_bottom,#88888810_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/5 via-emerald-500/5 to-transparent blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN: Close-Up Sunglasses Editorial Portrait (5 cols) */}
          <TerminalRevealItem order={1} effect="scale" className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-[420px] lg:max-w-[460px] group">
              {/* Cyan/Green Ambient Rim Backlight Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/30 via-teal-400/20 to-cyan-500/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] sm:rounded-[40px]" />

              {/* Main Portrait Framing */}
              <div className="relative z-10 w-full aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden border dark:border-white/15 border-zinc-300 dark:bg-zinc-950 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                <img
                  src="/santhosh_sunglasses.jpg"
                  alt="Santhosh Kannan wearing sunglasses outdoors"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Subtle Bottom Gradient Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t dark:from-zinc-950 dark:via-zinc-950/60 from-black/80 via-black/40 to-transparent pointer-events-none" />

                {/* Overlapping Pill Badge */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-2xl dark:bg-zinc-950/85 bg-zinc-900/90 backdrop-blur-md border border-white/10 flex items-center justify-between text-white">
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
          </TerminalRevealItem>

          {/* RIGHT COLUMN: Editorial About Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            {/* Eyebrow Label & Headline */}
            <TerminalRevealItem order={0}>
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-md">
                  01 / ABOUT ME
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black dark:text-white text-zinc-900 tracking-tight uppercase leading-[1.08] mb-4 font-sans">
                I BUILD WITH <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  CURIOSITY, PRECISION
                </span> <br />
                & PURPOSE.
              </h2>
            </TerminalRevealItem>

            {/* Personal Introduction Paragraphs */}
            <TerminalRevealItem order={1}>
              <div className="space-y-3">
                <p className="text-sm sm:text-base dark:text-zinc-300 text-zinc-700 leading-relaxed font-normal">
                  I'm <strong className="dark:text-white text-zinc-900 font-semibold">Santhosh Kannan</strong>, a software developer focused on building practical digital products across web, mobile, backend, and AI solutions.
                </p>
                <p className="text-sm sm:text-base dark:text-zinc-400 text-zinc-600 leading-relaxed font-normal">
                  I enjoy turning complex ideas into intuitive, scalable products — from responsive user interfaces and REST APIs to data-driven and AI-powered applications.
                </p>
              </div>
            </TerminalRevealItem>

            {/* CURRENTLY FOCUSED ON (Numbered Items) */}
            <TerminalRevealItem order={2}>
              <div>
                <span className="text-[11px] font-mono font-semibold tracking-[0.25em] text-emerald-400 uppercase block mb-3">
                  CURRENTLY FOCUSED ON
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {focusAreas.map((item, idx) => (
                    <TerminalRevealItem key={item.num} order={2 + idx * 0.5}>
                      <div className="p-3.5 rounded-xl dark:bg-white/[0.02] bg-white border dark:border-white/5 border-zinc-200 hover:border-emerald-500/30 transition-colors group shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-emerald-400">{item.num}</span>
                          <span className="text-xs font-bold dark:text-white text-zinc-900 group-hover:text-cyan-500 transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-[11px] dark:text-zinc-400 text-zinc-600 leading-tight">{item.desc}</p>
                      </div>
                    </TerminalRevealItem>
                  ))}
                </div>
              </div>
            </TerminalRevealItem>

            {/* TECH STACK PILLS */}
            <TerminalRevealItem order={3}>
              <div>
                <span className="text-[11px] font-mono font-semibold tracking-[0.25em] dark:text-zinc-400 text-zinc-500 uppercase block mb-3">
                  CORE TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-2">
                  {techPills.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-lg dark:bg-white/[0.03] bg-zinc-100 border dark:border-white/10 border-zinc-200 dark:text-zinc-300 text-zinc-700 hover:border-emerald-400/50 hover:text-emerald-500 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TerminalRevealItem>

            {/* PERSONAL DETAILS QUICK GRID */}
            <TerminalRevealItem order={4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t dark:border-white/10 border-zinc-200">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">ROLE</span>
                  <span className="text-xs font-bold dark:text-white text-zinc-900">Software Developer</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">EDUCATION</span>
                  <span className="text-xs font-bold dark:text-zinc-200 text-zinc-800">Computer Science</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">FOCUS</span>
                  <span className="text-xs font-bold text-emerald-400">Full Stack • AI</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">LOCATION</span>
                  <span className="text-xs font-bold dark:text-zinc-200 text-zinc-800">Kerala, India</span>
                </div>
              </div>
            </TerminalRevealItem>

            {/* CTAs */}
            <TerminalRevealItem order={5}>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 cursor-pointer group"
                >
                  <span>Explore My Journey</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 rounded-xl border dark:border-white/20 border-zinc-300 hover:border-emerald-400 dark:text-white text-zinc-900 hover:text-emerald-500 font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  View Projects
                </button>
              </div>
            </TerminalRevealItem>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutSection;

