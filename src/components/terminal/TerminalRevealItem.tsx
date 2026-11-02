import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export interface TerminalRevealItemProps {
  children: React.ReactNode;
  order?: number; // Sequence delay index (0, 1, 2, 3...)
  className?: string;
  effect?: "fade-up" | "fade-in" | "scale" | "slide-right";
}

export const TerminalRevealItem: React.FC<TerminalRevealItemProps> = ({
  children,
  order = 0,
  className = "",
  effect = "fade-up",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
    }
  }, []);

  // If reduced motion is requested, render children immediately with zero animation delay
  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Animation variants based on requested effect
  const variants = {
    hidden: {
      opacity: 0,
      y: effect === "fade-up" ? 20 : 0,
      x: effect === "slide-right" ? -20 : 0,
      scale: effect === "scale" ? 0.96 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        delay: Math.min(order * 0.08, 0.4),
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default TerminalRevealItem;
