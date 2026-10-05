import React from "react";
import { Github, Linkedin, Mail, FileText, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 md:py-16 bg-zinc-950 border-t border-white/10 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-base font-bold text-white tracking-tight">
              Santhosh Kannan
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mt-0.5">
              Software Developer · MCA Student
            </span>
            <p className="text-xs text-zinc-400 max-w-sm mt-2 leading-relaxed">
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
              href="/SANTHOSH_KANNAN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <FileText size={14} /> Resume
            </a>
          </div>
        </div>

        {/* Bottom copyright row */}
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
      </div>
    </footer>
  );
};

export default Footer;
