import React from "react";
import { motion } from "framer-motion";
import { Send, Download, Code, Cpu, Smartphone, Database, ArrowUpRight, CheckCircle2 } from "lucide-react";

const capabilities = [
  {
    num: "01",
    title: "FULL STACK DEVELOPMENT",
    desc: "React, TypeScript, Django, REST APIs and modern web applications.",
    icon: Code,
  },
  {
    num: "02",
    title: "AI & DATA SOLUTIONS",
    desc: "Python, Machine Learning, Data Analytics and AI-powered applications.",
    icon: Cpu,
  },
  {
    num: "03",
    title: "MOBILE APPLICATIONS",
    desc: "React Native, Expo and API-driven mobile applications.",
    icon: Smartphone,
  },
  {
    num: "04",
    title: "CLOUD & DATABASE",
    desc: "AWS, PostgreSQL, Docker and scalable backend infrastructure.",
    icon: Database,
  },
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-black pt-20 pb-12 lg:pt-24 lg:pb-16 px-3 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden z-10">
      {/* Background Subtle Line Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Ambient Background Glow Outside Container */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Main Hero Card Container */}
      <div className="relative w-full max-w-[1400px] mx-auto rounded-[24px] sm:rounded-[32px] bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-black border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-6 sm:p-10 lg:p-12 xl:p-14 overflow-hidden">
        
        {/* Subtle Ambient Radial Glow Inside Hero Card */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/15 via-teal-400/20 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

        {/* 3-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center relative z-10">
          
          {/* LEFT COLUMN: Eyebrow, Headline, Intro, CTAs & Credibility (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-center text-left"
          >
            {/* Small Eyebrow Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SOFTWARE DEVELOPER • MCA STUDENT
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-[1.06] tracking-tight text-white uppercase font-sans mb-5">
              BUILDING <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                DIGITAL PRODUCTS
              </span> <br />
              THAT SOLVE REAL PROBLEMS.
            </h1>

            {/* Personal Intro */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-normal mb-8 max-w-xl">
              Full Stack Software Developer and MCA student specializing in high-performance web applications, mobile apps, REST APIs, and AI-powered solutions using React, Python, Django, PostgreSQL and modern cloud technologies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-white text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center gap-2 cursor-pointer group"
              >
                <span>View My Work</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3.5 rounded-xl border border-white/20 hover:border-emerald-400 text-white hover:text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Send size={15} />
                <span>Let's Talk</span>
              </button>

              <a
                href="/Santhosh_Kannan.pdf"
                download="Santhosh_Kannan.pdf"
                className="px-5 py-3.5 rounded-xl border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Download size={15} />
                <span>Resume</span>
              </a>
            </div>

            {/* Credibility / Quick Stats Block */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <span className="block text-lg sm:text-xl font-bold font-mono text-white">MCA</span>
                <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">Student</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-mono text-emerald-400">FULL STACK</span>
                <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">React & Django</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-mono text-cyan-400">AI / ML</span>
                <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">Solutions</span>
              </div>
            </div>
          </motion.div>

          {/* CENTER COLUMN: Overlapping Portrait Anchor (4 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-4 flex flex-col items-center justify-end relative mt-6 lg:mt-0"
          >
            {/* Ambient Backlight Glow behind Portrait */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/25 via-cyan-500/15 to-transparent blur-2xl rounded-full pointer-events-none" />

            {/* Floating Tech Pill 1 (Top Right) */}
            <div className="absolute top-4 right-2 sm:right-6 z-30 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-emerald-500/40 backdrop-blur-md shadow-lg text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 hidden sm:flex">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Python & Django</span>
            </div>

            {/* Floating Tech Pill 2 (Left Middle) */}
            <div className="absolute bottom-20 left-2 sm:left-4 z-30 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-cyan-500/40 backdrop-blur-md shadow-lg text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 hidden sm:flex">
              <CheckCircle2 size={13} className="text-cyan-400" />
              <span>React & TypeScript</span>
            </div>

            {/* Integrated Portrait Card Container */}
            <div className="relative z-20 w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] aspect-[3/4] rounded-t-[32px] sm:rounded-t-[40px] overflow-hidden border-t border-x border-white/15 bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-black shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-end justify-center">
              <img
                src="/santhosh_fullbody.jpg"
                alt="Santhosh Kannan - Full Stack Developer"
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              {/* Bottom Gradient Overlay for Seamless Blend */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Capabilities "What I Build" (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-3 flex flex-col justify-center space-y-3.5 mt-6 lg:mt-0"
          >
            <div className="mb-1">
              <span className="text-[11px] font-mono font-semibold tracking-[0.25em] text-emerald-400 uppercase block">
                WHAT I BUILD
              </span>
            </div>

            {capabilities.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.num}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-emerald-400 group-hover:text-cyan-400 transition-colors">
                      {item.num} — {item.title}
                    </span>
                    <IconComponent size={14} className="text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

