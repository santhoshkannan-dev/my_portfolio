import React from "react";
import { TerminalContext } from "./TerminalContext";

export interface TerminalSectionProps {
  id?: string;
  sectionName?: string;
  directory?: string;
  command?: string;
  statusLines?: string[];
  children: React.ReactNode;
  className?: string;
}

export const TerminalSection: React.FC<TerminalSectionProps> = ({
  id,
  children,
  className = "",
}) => {
  return (
    <TerminalContext.Provider
      value={{
        isStarted: true,
        isComplete: true,
        isReducedMotion: false,
        stepIndex: 99,
      }}
    >
      <section id={id} className={`relative ${className}`}>
        <div className="w-full">
          {children}
        </div>
      </section>
    </TerminalContext.Provider>
  );
};

export default TerminalSection;
