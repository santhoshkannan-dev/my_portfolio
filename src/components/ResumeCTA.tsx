import React from "react";
import { motion } from "framer-motion";
import { Download, FileText, ArrowRight } from "lucide-react";

export const ResumeCTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 dark:bg-gradient-to-br dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100 border-b border-border/60 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
          TECHNICAL PROFILE
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.15] mb-4">
          Interested in My Work & Technical Background?
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
          Download my resume to review full technical skills, academic projects, coursework, and development history.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/Santhosh_Kannan.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText size={16} /> View Resume
          </a>

          <a
            href="/Santhosh_Kannan.pdf"
            download="Santhosh_Kannan.pdf"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-300 dark:border-white/20 hover:border-emerald-400 text-foreground hover:text-emerald-500 font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download size={16} /> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResumeCTA;
