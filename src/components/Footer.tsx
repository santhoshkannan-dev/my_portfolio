import React from "react";
import { Github, Linkedin, Mail, FileText, ArrowUp } from "lucide-react";
import { TerminalRevealItem } from "./terminal";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 md:py-16 bg-transparent border-t dark:border-white/10 border-zinc-200 dark:text-zinc-400 text-zinc-600 text-xs relative overflow-hidden">
      {/* React Bits Dotted Pattern */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <TerminalRevealItem order={0}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b dark:border-white/5 border-zinc-200">
            {/* Brand Info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-base font-bold dark:text-white text-zinc-900 tracking-tight">
                Santhosh Kannan
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mt-0.5">
                Software Developer · Full Stack Engineer
              </span>
              <p className="text-xs dark:text-zinc-400 text-zinc-600 max-w-sm mt-2 leading-relaxed">
                Building scalable web applications, REST APIs, mobile apps, and AI solutions with modern technologies.
              </p>
            </div>

            {/* Navigation & Social Links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs font-mono">
              <a
                href="https://github.com/santhoshkannan-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/santhosh-kannan-r/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
              <a
                href="mailto:santhoshkannan.dev@gmail.com"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Mail size={14} /> Email
              </a>
              <a
                href="/Santhosh_Kannan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <FileText size={14} /> Resume
              </a>
            </div>
          </div>
        </TerminalRevealItem>

        {/* Bottom copyright row */}
        <TerminalRevealItem order={1}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px]">
            <p>© {new Date().getFullYear()} Santhosh Kannan. All rights reserved.</p>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors font-mono cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </TerminalRevealItem>
      </div>
    </footer>
  );
};

export default Footer;
