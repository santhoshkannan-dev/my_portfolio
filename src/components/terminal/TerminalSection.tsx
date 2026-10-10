import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TerminalContext } from "./TerminalContext";

export interface TerminalSectionProps {
  id?: string;
  sectionName: string;
  directory?: string;
  command: string;
  statusLines?: string[];
  children: React.ReactNode;
  className?: string;
}

export const TerminalSection: React.FC<TerminalSectionProps> = ({
  id,
  sectionName,
  directory,
  command,
  statusLines = [],
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const [hasStarted, setHasStarted] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const [displayedStatusCount, setDisplayedStatusCount] = useState(0);
  const [isCommandDone, setIsCommandDone] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const dirName = directory || sectionName.toLowerCase();

  // 1. Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setIsComplete(true);
      setStepIndex(99);
    }
  }, []);

  // 2. Trigger animation sequence when section scrolls into viewport
  useEffect(() => {
    if (isInView && !hasStarted && !isReducedMotion) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted, isReducedMotion]);

  // 3. Fast typing effect for command prompt line (~20ms per char)
  useEffect(() => {
    if (!hasStarted || isReducedMotion || isCommandDone) return;

    if (typedCommand.length < command.length) {
      const timeout = setTimeout(() => {
        setTypedCommand(command.slice(0, typedCommand.length + 1));
      }, 18);
      return () => clearTimeout(timeout);
    } else {
      setIsCommandDone(true);
      setStepIndex(1); // Command typed -> Begin content reveal step 1
    }
  }, [hasStarted, typedCommand, command, isCommandDone, isReducedMotion]);

  // 4. Staggered status lines and progressive content step increment
  useEffect(() => {
    if (!isCommandDone || isReducedMotion || isComplete) return;

    if (displayedStatusCount < statusLines.length) {
      const timeout = setTimeout(() => {
        setDisplayedStatusCount((prev) => prev + 1);
        setStepIndex((prev) => prev + 1);
      }, 80); // Fast 80ms per status line
      return () => clearTimeout(timeout);
    } else {
      // Step increment to reveal final elements & completion
      const finishTimeout = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
        setIsComplete(true);
      }, 300);
      return () => clearTimeout(finishTimeout);
    }
  }, [isCommandDone, displayedStatusCount, statusLines.length, isReducedMotion, isComplete]);

  return (
    <TerminalContext.Provider
      value={{
        isStarted: hasStarted || isReducedMotion,
        isComplete,
        isReducedMotion,
        stepIndex: isReducedMotion ? 99 : stepIndex,
      }}
    >
      <section id={id} ref={containerRef} className={`relative ${className}`}>
        {/* TERMINAL HEADER & STATUS OVERLAY BAR */}
        {!isReducedMotion && (
          <AnimatePresence>
            {hasStarted && !isComplete && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full max-w-2xl mx-auto mb-6 px-4 py-2.5 rounded-xl dark:bg-zinc-950/90 bg-zinc-900/95 border dark:border-white/10 border-zinc-700 shadow-xl font-mono text-xs text-zinc-200 z-30 select-none overflow-hidden"
              >
                {/* Window Bar Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
                    santhosh@portfolio: ~/{dirName}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">
                    bash
                  </span>
                </div>

                {/* Command & Execution Output */}
                <div className="space-y-1 text-left text-[11px] sm:text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-100">
                    <span className="text-emerald-400 font-bold">santhosh@portfolio:</span>
                    <span className="text-cyan-400 font-bold">~/{dirName}$</span>
                    <span className="font-semibold text-white">{typedCommand}</span>
                    {!isCommandDone && (
                      <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse" />
                    )}
                  </div>

                  {isCommandDone && statusLines.length > 0 && (
                    <div className="space-y-0.5 pt-1 text-[10px] sm:text-[11px]">
                      {statusLines.slice(0, displayedStatusCount).map((line, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-emerald-400/90">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* REVEAL CONTENT AREA */}
        <div className="w-full">
          {children}
        </div>
      </section>
    </TerminalContext.Provider>
  );
};

export default TerminalSection;
