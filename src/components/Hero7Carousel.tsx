import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Database, ExternalLink, Sparkles, Layers } from "lucide-react";

export interface CarouselItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  tech: string[];
  image: string;
  icon?: React.ElementType;
  link?: string;
}

interface Hero7CarouselProps {
  items: CarouselItem[];
  autoRotateSpeed?: number; // degrees per frame (e.g. 0.3)
  radiusDesktop?: number;   // 3D cylinder radius in px (e.g. 360)
  radiusMobile?: number;    // 3D cylinder radius for mobile (e.g. 200)
  cardWidthDesktop?: number;// Card width px (e.g. 260)
  cardWidthMobile?: number; // Card width mobile px (e.g. 200)
}

export const Hero7Carousel: React.FC<Hero7CarouselProps> = ({
  items,
  autoRotateSpeed = 0.25,
  radiusDesktop = 380,
  radiusMobile = 210,
  cardWidthDesktop = 270,
  cardWidthMobile = 210,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotationY, setRotationY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartRotation, setDragStartRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  // Check window width for responsive sizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentRadius = isMobile ? radiusMobile : radiusDesktop;
  const currentCardWidth = isMobile ? cardWidthMobile : cardWidthDesktop;

  // Auto rotation loop
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = (now - lastTime) / 16.666;
      lastTime = now;

      if (!isHovered && !isDragging) {
        setRotationY((prev) => (prev + autoRotateSpeed * dt) % 360);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered, isDragging, autoRotateSpeed]);

  // Floating Ambient Green/Cyan Particles background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = containerRef.current?.clientWidth || 800);
    let height = (canvas.height = containerRef.current?.clientHeight || 400);

    const handleCanvasResize = () => {
      if (!containerRef.current || !canvas) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = containerRef.current.clientHeight;
    };
    window.addEventListener("resize", handleCanvasResize);

    const particleCount = isMobile ? 18 : 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? "#10b981" : "#06b6d4",
    }));

    let pAnimId: number;
    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      pAnimId = requestAnimationFrame(renderParticles);
    };

    renderParticles();

    return () => {
      window.removeEventListener("resize", handleCanvasResize);
      cancelAnimationFrame(pAnimId);
    };
  }, [isMobile]);

  // Pointer drag handlers for 3D spin
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartRotation(rotationY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    const sensitivity = 0.4;
    setRotationY((dragStartRotation + deltaX * sensitivity) % 360);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Click card to bring to front
  const handleCardClick = (index: number) => {
    const angleStep = 360 / items.length;
    const targetAngle = -index * angleStep;
    // Normalize target angle near current rotation
    const currentMod = rotationY % 360;
    let diff = (targetAngle - currentMod) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    setRotationY((prev) => prev + diff);
  };

  const stepAngle = 360 / items.length;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1100px] mx-auto py-2 md:py-4 flex flex-col items-center justify-center select-none overflow-hidden touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Floating Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Hero 7 Signature Cyan/Green Horizontal Glow Bar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[850px] h-20 md:h-28 bg-gradient-to-r from-emerald-500/25 via-cyan-400/35 to-blue-500/20 blur-3xl rounded-full pointer-events-none z-0 opacity-80" />

      {/* 3D Cylinder Carousel Container */}
      <div
        className="relative w-full h-[270px] sm:h-[300px] md:h-[330px] flex items-center justify-center z-10"
        style={{
          perspective: isMobile ? "700px" : "1100px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotationY}deg)`,
          }}
        >
          {items.map((item, index) => {
            const itemAngle = index * stepAngle;
            // Calculate relative angle to front
            const effectiveAngle = (itemAngle + rotationY) % 360;
            const normalizedAngle =
              effectiveAngle > 180
                ? effectiveAngle - 360
                : effectiveAngle < -180
                ? effectiveAngle + 360
                : effectiveAngle;
            const isFront = Math.abs(normalizedAngle) < stepAngle / 1.8;

            const IconComp = item.icon || Layers;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(index)}
                className="absolute top-1/2 left-1/2 cursor-pointer transition-shadow duration-300"
                style={{
                  width: `${currentCardWidth}px`,
                  height: isMobile ? "220px" : "260px",
                  marginLeft: `-${currentCardWidth / 2}px`,
                  marginTop: isMobile ? "-110px" : "-130px",
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${itemAngle}deg) translateZ(${currentRadius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className={`w-full h-full rounded-2xl md:rounded-[22px] glass border transition-all duration-300 text-left flex flex-col overflow-hidden bg-background/90 backdrop-blur-xl group ${
                    isFront
                      ? "border-primary/60 ring-2 ring-primary/40 shadow-[0_0_35px_rgba(0,255,128,0.25)] scale-[1.02]"
                      : "border-border/60 hover:border-primary/40 shadow-xl opacity-85 hover:opacity-100"
                  }`}
                >
                  {/* Card Image Banner (50% height) */}
                  <div className="relative h-[48%] w-full overflow-hidden rounded-t-2xl md:rounded-t-[22px] bg-zinc-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    
                    {/* Category Pill */}
                    <div className="absolute top-2 left-2.5 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-md border border-primary/30 text-[9px] font-mono text-primary font-semibold uppercase tracking-wider">
                      {item.category}
                    </div>

                    {/* Icon Badge */}
                    <div className="absolute top-2 right-2.5 p-1.5 rounded-lg bg-background/80 backdrop-blur-md border border-primary/30 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                      <IconComp size={13} />
                    </div>
                  </div>

                  {/* Card Info Body */}
                  <div className="p-3 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="text-xs md:text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] md:text-[11px] text-muted-foreground leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-secondary/80 text-foreground/80 border border-border/50"
                        >
                          {t}
                        </span>
                      ))}
                      {item.tech.length > 3 && (
                        <span className="text-[8.5px] font-mono px-1 py-0.5 text-muted-foreground">
                          +{item.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero7Carousel;
