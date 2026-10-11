import React from "react";
import { TerminalRevealItem } from "./terminal";
import MagicBento from "./MagicBento";

export const SkillsSection: React.FC = () => {
  return (
    <div id="stack" className="scroll-mt-24 py-20 md:py-28 bg-transparent border-b border-border/60 relative overflow-hidden">
      {/* React Bits Dotted Pattern & Ambient Aurora Glow */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-80" />
      <div className="aurora-glow-violet w-[600px] h-[600px] top-1/4 -right-32 opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <TerminalRevealItem order={0} className="max-w-3xl mb-12 md:mb-16">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
            TECHNICAL EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-4">
            Technology Stack
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Core programming languages, frameworks, databases, and deployment tools I utilize across production software development.
          </p>
        </TerminalRevealItem>

        {/* Interactive Magic Bento Grid */}
        <TerminalRevealItem order={1}>
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="34, 211, 238"
          />
        </TerminalRevealItem>
      </div>
    </div>
  );
};

export default SkillsSection;
