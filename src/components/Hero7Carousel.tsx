import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Layers, Code, ExternalLink, Database, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  tech: string[];
  image: string;
  icon?: React.ElementType;
}

interface Hero7CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const Hero7Carousel: React.FC<Hero7CarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 3500,
}) => {
  const [activeIndex, setActiveIndex] = useState(2); // Center on 3rd item initially
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHovered, items.length]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div
      className="relative w-full max-w-[1200px] mx-auto py-4 md:py-8 flex flex-col items-center justify-center select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hero 7 Signature Vertical Neon Laser Glow Beam in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-0">
        {/* Vertical Laser Beam Line */}
        <div className="w-[3px] h-48 md:h-64 bg-gradient-to-b from-transparent via-cyan-400 to-emerald-400 shadow-[0_0_20px_#10b981,0_0_35px_#06b6d4] rounded-full animate-pulse" />
        
        {/* Glowing Spark Particles around the Beam */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#06b6d4]"
              style={{
                top: `${20 + i * 8}%`,
                left: `calc(50% + ${(i % 2 === 0 ? 1 : -1) * (Math.random() * 16 + 4)}px)`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.4, 0.8],
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Ambient Radial Cyan/Green Glow behind Carousel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-36 md:h-48 bg-gradient-to-r from-emerald-500/20 via-cyan-400/25 to-blue-500/20 blur-3xl rounded-full pointer-events-none z-0 opacity-75" />

      {/* 3D Arc Perspective Carousel Track */}
      <div
        className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] flex items-center justify-center z-10"
        style={{
          perspective: isMobile ? "600px" : "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {items.map((item, index) => {
            // Compute offset relative to current activeIndex
            let offset = index - activeIndex;
            const total = items.length;
            
            // Wrap offset for smooth infinite loop calculation
            if (offset > Math.floor(total / 2)) offset -= total;
            if (offset < -Math.floor(total / 2)) offset += total;

            // Only show cards within distance of 2 from center (-2, -1, 0, 1, 2)
            const isVisible = Math.abs(offset) <= (isMobile ? 1 : 2);
            if (!isVisible) return null;

            // Calculate 3D transforms based on offset
            const rotateY = offset * (isMobile ? -14 : -18); // Tilted towards center
            const translateX = offset * (isMobile ? 140 : 230);
            const translateZ = -Math.abs(offset) * (isMobile ? 35 : 55);
            const scale = offset === 0 ? (isMobile ? 1.05 : 1.08) : offset === 1 || offset === -1 ? 0.94 : 0.85;
            const opacity = offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.88 : 0.65;
            const zIndex = 30 - Math.abs(offset) * 10;
            const isCenter = offset === 0;

            const IconComp = item.icon || Layers;

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                initial={false}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 24,
                }}
                style={{
                  position: "absolute",
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                }}
                className={`cursor-pointer w-[210px] sm:w-[270px] md:w-[320px] aspect-[16/10] rounded-2xl md:rounded-[22px] overflow-hidden glass border transition-shadow duration-300 text-left bg-zinc-950/90 shadow-2xl group ${
                  isCenter
                    ? "border-emerald-400/70 shadow-[0_0_35px_rgba(16,185,129,0.35)] ring-2 ring-emerald-400/40"
                    : "border-border/60 hover:border-primary/50"
                }`}
              >
                {/* Image Banner */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-emerald-500/30 text-[9px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    {item.category}
                  </div>

                  {/* Top Icon Badge */}
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-all duration-300">
                    <IconComp size={13} />
                  </div>

                  {/* Bottom Text Details */}
                  <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col justify-end bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent">
                    <h4 className="text-xs md:text-sm font-bold text-white mb-0.5 group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[10px] md:text-[11px] text-zinc-300/90 line-clamp-1 leading-tight mb-2">
                      {item.desc}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1">
                      {item.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Manual Navigation Controls */}
      <div className="flex items-center gap-3 mt-3 md:mt-4 z-20">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="p-2 rounded-full border border-border/60 bg-background/80 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 text-muted-foreground shadow-md cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Indicators */}
        <div className="flex gap-1.5 items-center">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-6 bg-emerald-400 shadow-[0_0_8px_#10b981]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="p-2 rounded-full border border-border/60 bg-background/80 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 text-muted-foreground shadow-md cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Hero7Carousel;
