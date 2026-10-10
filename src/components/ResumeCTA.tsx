import React from "react";
import { Download, FileText } from "lucide-react";
import { TerminalRevealItem } from "./terminal";

export const ResumeCTA: React.FC = () => {
  return (
    <div className="py-16 md:py-24 dark:bg-gradient-to-br dark:from-[#101014] dark:via-[#17171D] dark:to-[#050505] bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100 border-b border-border/60 relative overflow-hidden">
      {/* React Bits Dotted Pattern & Ambient Aurora Glow */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-80" />
      <div className="aurora-glow-violet w-[600px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
        <TerminalRevealItem order={0}>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
            TECHNICAL PROFILE
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.15] mb-4">
            Interested in My Work & Technical Background?
          </h2>
        </TerminalRevealItem>

        <TerminalRevealItem order={1}>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            Download my resume to review full technical skills, academic projects, coursework, and development history.
          </p>
        </TerminalRevealItem>

        <TerminalRevealItem order={2}>
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
        </TerminalRevealItem>
      </div>
    </div>
  );
};

export default ResumeCTA;
