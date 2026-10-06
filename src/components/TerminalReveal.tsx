import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface TerminalRevealProps {
  sectionName: string;
  directory?: string;
  commands: string[];
  statusLines?: string[];
  children: React.ReactNode;
  className?: string;
}

export const TerminalReveal: React.FC<TerminalRevealProps> = ({
  sectionName,
  directory,
  commands,
  statusLines = [],
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const [hasStarted, setHasStarted] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const [displayedStatusIndex, setDisplayedStatusIndex] = useState(0);
  const [isCommandDone, setIsCommandDone] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const dirName = directory || sectionName.toLowerCase();
  const fullCommand = commands.join(" && ");

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setIsComplete(true);
    }
  }, []);

  // Trigger animation sequence when scrolled into view
  useEffect(() => {
    if (isInView && !hasStarted && !isReducedMotion) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted, isReducedMotion]);

  // Typing effect for command line
  useEffect(() => {
    if (!hasStarted || isReducedMotion || isCommandDone) return;

    if (typedCommand.length < fullCommand.length) {
      const timeout = setTimeout(() => {
        setTypedCommand(fullCommand.slice(0, typedCommand.length + 1));
      }, 25); // 25ms per char typing speed
      return () => clearTimeout(timeout);
    } else {
      setIsCommandDone(true);
    }
  }, [hasStarted, typedCommand, fullCommand, isCommandDone, isReducedMotion]);

  // Display status lines after command finishes typing
  useEffect(() => {
    if (!isCommandDone || isReducedMotion || isComplete) return;

    if (displayedStatusIndex < statusLines.length) {
      const timeout = setTimeout(() => {
        setDisplayedStatusIndex((prev) => prev + 1);
      }, 120); // 120ms delay per status line
      return () => clearTimeout(timeout);
    } else {
      // Brief pause after all status lines before revealing section content
      const completionTimeout = setTimeout(() => {
        setIsComplete(true);
      }, 350);
      return () => clearTimeout(completionTimeout);
    }
  }, [isCommandDone, displayedStatusIndex, statusLines.length, isReducedMotion, isComplete]);

  // If reduced motion or already completed, render children directly with smooth entry
  if (isReducedMotion || isComplete) {
    return (
      <div ref={containerRef} className={className}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative min-h-[120px] ${className}`}>
      {/* Terminal Boot Window Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-[92vw] max-w-[700px] mx-auto my-8 p-4 rounded-xl bg-zinc-950/95 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] font-mono text-xs sm:text-sm text-zinc-300 z-30 select-none overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
          </div>
          <span className="text-[11px] text-zinc-500 font-mono tracking-wider">
            santhosh@portfolio: ~/{dirName}
          </span>
          <span className="text-[10px] text-emerald-400/80 font-mono uppercase tracking-widest hidden sm:inline-block">
            bash
          </span>
        </div>

        {/* Terminal Body Output */}
        <div className="space-y-2 text-left">
          {/* Command Prompt */}
          <div className="flex flex-wrap items-center gap-1.5 leading-relaxed">
            <span className="text-emerald-400 font-bold">santhosh@portfolio:</span>
            <span className="text-cyan-400 font-bold">~/{dirName}$</span>
            <span className="text-zinc-100 font-medium">{typedCommand}</span>
            {!isCommandDone && (
              <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse" />
            )}
          </div>

          {/* Status Lines Output */}
          {isCommandDone && (
            <div className="space-y-1.5 pt-1 text-[11px] sm:text-xs">
              {statusLines.slice(0, displayedStatusIndex).map((line, idx) => (
                <div key={idx} className="flex items-center gap-2 text-emerald-400/90">
                  <span className="text-cyan-400">✓</span>
                  <span>{line}</span>
                </div>
              ))}
              {displayedStatusIndex < statusLines.length && (
                <div className="flex items-center gap-1 text-zinc-500">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>loading dependencies...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TerminalReveal;
