import React, { createContext, useContext } from "react";

interface TerminalContextType {
  isStarted: boolean;
  isComplete: boolean;
  isReducedMotion: boolean;
  stepIndex: number;
}

export const TerminalContext = createContext<TerminalContextType>({
  isStarted: false,
  isComplete: true,
  isReducedMotion: false,
  stepIndex: 99,
});

export const useTerminalContext = () => useContext(TerminalContext);
