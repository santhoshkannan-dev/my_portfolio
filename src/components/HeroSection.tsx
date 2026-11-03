import React from "react";
import { motion } from "framer-motion";
import { Send, Download, ArrowUpRight, Github, Linkedin } from "lucide-react";
import CodeDemo, { Code, CodeHeader, CodeBlock, ReactIcon } from "./CodeDemo";
import Lanyard from "./Lanyard";

// Re-export imports as required by user prompt
export { Code, CodeHeader, CodeBlock, ReactIcon, CodeDemo };

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen bg-transparent pt-20 pb-12 lg:pt-24 lg:pb-16 px-3 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden z-10 transition-colors duration-300">
      {/* React Bits Fine Dotted Background Pattern & Grid */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-80" />
      <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Subtle Purple/Violet Ambient Aurora Glow Outside Container */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-r from-purple-600/10 via-violet-500/10 to-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Main Hero Card Container */}
      <div className="relative w-full max-w-[1400px] mx-auto rounded-[24px] sm:rounded-[32px] dark:bg-gradient-to-b dark:from-[#101014]/80 dark:via-[#101014]/70 dark:to-[#050505]/80 bg-white/85 backdrop-blur-xl border dark:border-white/10 border-zinc-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-6 sm:p-10 lg:p-12 xl:p-14 overflow-hidden transition-colors duration-300">
        
        {/* Subtle Violet Ambient Radial Glow Inside Hero Card */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-violet-600/15 via-emerald-500/15 to-cyan-500/15 blur-[130px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* 3-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center relative z-10">
          
          {/* LEFT COLUMN: Eyebrow, Headline, Intro, CTAs, Social Links & Stats (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-center text-left"
          >
            {/* Small Eyebrow Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SOFTWARE DEVELOPER • FULL STACK ENGINEER
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-[1.06] tracking-tight text-zinc-900 dark:text-white uppercase font-sans mb-5">
              BUILDING <br />
              <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
                DIGITAL PRODUCTS
              </span> <br />
              THAT SOLVE REAL PROBLEMS.
            </h1>

            {/* Personal Intro */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal mb-8 max-w-xl">
              Full Stack Software Developer specializing in high-performance web applications, mobile apps, REST APIs, and AI-powered solutions using React, Python, Django, PostgreSQL, Docker, AWS and modern cloud technologies.
            </p>

            {/* CTA Buttons & Social Links */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center gap-2 cursor-pointer group"
              >
                <span>View My Work</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3.5 rounded-xl border border-zinc-300 dark:border-white/20 hover:border-emerald-400 text-zinc-800 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Send size={15} />
                <span>Let's Talk</span>
              </button>

              <a
                href="/Santhosh_Kannan.pdf"
                download="Santhosh_Kannan.pdf"
                className="px-5 py-3.5 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Download size={15} />
                <span>Resume</span>
              </a>

              {/* Social Icon Links */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href="https://github.com/santhoshkannan-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-400 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/santhosh-kannan-r/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-400 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* Mobile CodeDemo: Stacked beneath intro & CTA buttons on mobile */}
            <div className="block lg:hidden my-6 w-full">
              <CodeDemo />
            </div>

            {/* Credibility / Quick Stats Block */}
            <div className="pt-6 border-t border-zinc-200 dark:border-white/10 grid grid-cols-3 gap-4">
              <div>
                <span className="block text-lg sm:text-xl font-bold font-mono text-zinc-900 dark:text-white">SOFTWARE</span>
                <span className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Developer</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">FULL STACK</span>
                <span className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">React & Django</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">AI & CLOUD</span>
                <span className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">AWS / DevOps</span>
              </div>
            </div>
          </motion.div>

          {/* CENTER COLUMN: Shared-Element ID Badge Origin Slot (3.5 cols on desktop) */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col items-center justify-center relative mt-6 lg:mt-0 w-full">
            {/* Ambient Backlight Glow behind Portrait */}
            <div className="absolute inset-0 bg-gradient-to-t from-violet-600/25 via-emerald-500/15 to-cyan-500/15 blur-2xl rounded-full pointer-events-none" />

            {/* Origin Slot Anchor for Shared-Element Profile Card with React Bits 3D Lanyard */}
            <div
              id="hero-profile-card-slot"
              className="relative z-20 w-full max-w-[340px] sm:max-w-[360px] h-[520px] sm:h-[560px] flex items-center justify-center pointer-events-auto"
            >
              <div id="hero-lanyard-wrapper" className="w-full h-full relative pointer-events-auto transition-opacity duration-300">
                <Lanyard
                  frontImage="/santhosh_fullbody.jpg"
                  backImage="/santhosh_fullbody.jpg"
                  cardColor="#101014"
                  strapColor="#181824"
                  metal="silver"
                  finish="glossy"
                  size={0.65}
                  strapLength={0.46}
                  strapWidth={0.65}
                  gravity={1}
                  damping={0.5}
                  elasticity={0.55}
                  breeze={0.35}
                  interactive={true}
                  intro={true}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Desktop CodeDemo Window (4 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="hidden lg:flex lg:col-span-4 xl:col-span-4 flex-col justify-center w-full"
          >
            <CodeDemo />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

