import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Move3d, ExternalLink } from 'lucide-react';
import { CircularGalleryItem } from './CircularGallery';

export type GalleryMode = 'SPHERE' | 'RING' | 'BARREL' | 'HELIX';

export interface SphereGallery3DProps {
  items: CircularGalleryItem[];
  defaultMode?: GalleryMode;
  autoRotateSpeed?: number;
  onItemClick?: (item: CircularGalleryItem, index: number) => void;
  onActiveChange?: (index: number) => void;
  onHoverItem?: (item: CircularGalleryItem | null, index: number | null) => void;
  className?: string;
}

interface CardTransform {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
}

export const SphereGallery3D: React.FC<SphereGallery3DProps> = ({
  items,
  defaultMode = 'HELIX',
  autoRotateSpeed = 0.22,
  onItemClick,
  onActiveChange,
  onHoverItem,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<GalleryMode>(defaultMode);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  // Rotation angles (degrees)
  const rotYRef = useRef(0);
  const rotXRef = useRef(-4);
  const targetRotYRef = useRef(0);
  const targetRotXRef = useRef(-4);

  // Drag interaction trackers
  const isPointerDownRef = useRef(false);
  const lastPointerPos = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Dimensions & Sphere Radius
  const [radius, setRadius] = useState(360);
  const [cardDim, setCardDim] = useState({ width: 165, height: 220 });

  // Update sizes based on viewport width
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      if (w < 480) {
        setRadius(230);
        setCardDim({ width: 130, height: 175 });
      } else if (w < 768) {
        setRadius(290);
        setCardDim({ width: 145, height: 195 });
      } else {
        setRadius(360);
        setCardDim({ width: 165, height: 220 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer: Only run RAF when section is visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute 3D Coordinates ensuring cards are NEVER upside down
  const cardTransforms = useMemo<CardTransform[]>(() => {
    const count = items.length;
    if (count === 0) return [];

    return items.map((_, i) => {
      if (mode === 'SPHERE') {
        // Clamped latitude distribution (-45deg to +45deg) so cards never bunch or flip at poles
        const v = (i + 0.5) / count;
        const yNorm = 0.65 - v * 1.30; // Bounded between -0.65 and +0.65
        const rXZ = Math.sqrt(Math.max(0.2, 1 - yNorm * yNorm));
        const goldenAngle = 2.3999632;
        const theta = i * goldenAngle;

        const x = radius * rXZ * Math.sin(theta);
        const z = radius * rXZ * Math.cos(theta);
        const y = radius * yNorm * 0.9;

        // Azimuth (yaw) points outward radially from Y-axis
        const ry = (Math.atan2(x, z) * 180) / Math.PI;

        // Gentle elevation tilt (-18deg to +18deg max) - guarantees card stays upright!
        const distXZ = Math.sqrt(x * x + z * z);
        const elevation = Math.atan2(y, distXZ);
        const rx = -(elevation * 180 / Math.PI) * 0.5;

        return { x, y, z, rx, ry };
      }

      if (mode === 'RING') {
        // Single circular horizontal ring
        const angle = (i / count) * 2 * Math.PI;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        const y = 0;
        const ry = (angle * 180) / Math.PI;

        return { x, y, z, rx: 0, ry };
      }

      if (mode === 'BARREL') {
        // 3 cylindrical stacked tiers
        const tiers = 3;
        const perTier = Math.ceil(count / tiers);
        const tierIndex = Math.floor(i / perTier);
        const indexInTier = i % perTier;

        const angle = (indexInTier / perTier) * 2 * Math.PI + tierIndex * 0.5;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        const y = (tierIndex - 1) * (cardDim.height + 26);
        const ry = (angle * 180) / Math.PI;
        const rx = -(y / radius) * 10;

        return { x, y, z, rx, ry };
      }

      if (mode === 'HELIX') {
        // Vertical 3D helix spiral
        const angle = i * 0.52;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        const y = (i - (count - 1) / 2) * 38;
        const ry = (angle * 180) / Math.PI;

        return { x, y, z, rx: 0, ry };
      }

      return { x: 0, y: 0, z: 0, rx: 0, ry: 0 };
    });
  }, [items, mode, radius, cardDim.height]);

  // Main 3D Animation Loop with smooth inertia and auto-rotation
  useEffect(() => {
    let active = true;

    const animate = (timestamp: number) => {
      if (!active) return;

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      // Auto-rotation logic (pauses on card hover or active drag)
      if (isAutoRotating && !isPointerDownRef.current && hoveredIndex === null && isInViewport) {
        targetRotYRef.current += autoRotateSpeed * 60 * dt;
        // Subtle undulating pitch wobble (-7deg to +1deg)
        targetRotXRef.current = -3 + Math.sin(timestamp * 0.0006) * 4;
      }

      // Drag inertia / momentum damping
      if (!isPointerDownRef.current) {
        targetRotYRef.current += velocityRef.current.x;
        targetRotXRef.current += velocityRef.current.y;
        velocityRef.current.x *= 0.92;
        velocityRef.current.y *= 0.92;

        // Pitch angle clamp to prevent upside-down flip
        targetRotXRef.current = Math.max(-30, Math.min(30, targetRotXRef.current));
      }

      // Smooth Lerp towards target
      rotYRef.current += (targetRotYRef.current - rotYRef.current) * 0.12;
      rotXRef.current += (targetRotXRef.current - rotXRef.current) * 0.12;

      // Apply 3D transform directly to the stage DOM element
      if (stageRef.current) {
        stageRef.current.style.transform = `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    if (isInViewport) {
      rafIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isAutoRotating, hoveredIndex, autoRotateSpeed, isInViewport]);

  // Pointer & Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    setIsDragging(false);
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;

    const dx = e.clientX - lastPointerPos.current.x;
    const dy = e.clientY - lastPointerPos.current.y;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      setIsDragging(true);
    }

    targetRotYRef.current += dx * 0.35;
    targetRotXRef.current = Math.max(-30, Math.min(30, targetRotXRef.current - dy * 0.35));

    velocityRef.current = { x: dx * 0.25, y: -dy * 0.25 };
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    setTimeout(() => setIsDragging(false), 50);
  };

  const resetView = () => {
    targetRotYRef.current = 0;
    targetRotXRef.current = -4;
    velocityRef.current = { x: 0, y: 0 };
  };

  const handleCardClick = (item: CircularGalleryItem, index: number) => {
    if (isDragging) return;
    setSelectedIndex(index);
    if (onActiveChange) onActiveChange(index);
    if (onItemClick) onItemClick(item, index);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[640px] md:h-[700px] overflow-hidden select-none bg-gradient-to-b from-[#090810] via-[#0d0c18] to-[#080710] flex flex-col justify-between ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* 3D Depth Lighting & Ambience */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-70 z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-20 flex items-center justify-between px-5 md:px-8 pt-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md shadow-lg">
            <Sparkles size={13} className="text-emerald-400" />
            <span className="font-semibold tracking-wide">
              3D Vercel {mode === 'HELIX' ? 'Helix' : mode === 'SPHERE' ? 'Sphere' : mode === 'RING' ? 'Ring' : 'Barrel'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              {items.length} ENDPOINTS
            </span>
          </div>
        </div>

        {/* Play/Pause & Reset Rotation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all backdrop-blur-md border cursor-pointer ${
              isAutoRotating
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-700 hover:text-white'
            }`}
            title={isAutoRotating ? 'Pause Orbit' : 'Resume Orbit'}
          >
            {isAutoRotating ? <Pause size={12} /> : <Play size={12} />}
            <span className="hidden sm:inline">{isAutoRotating ? 'Auto-Orbiting' : 'Paused'}</span>
          </button>

          <button
            onClick={resetView}
            className="p-1.5 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-700/80 backdrop-blur-md transition-colors cursor-pointer"
            title="Reset Perspective"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* 3D SCENE VIEWPORT & STAGE */}
      <div
        className="relative flex-1 w-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* 3D ROTATING CONTAINER */}
        <div
          ref={stageRef}
          className="relative w-0 h-0 transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg)`,
          }}
        >
          {items.map((item, index) => {
            const t = cardTransforms[index] || { x: 0, y: 0, z: 0, rx: 0, ry: 0 };
            const isHovered = hoveredIndex === index;
            const isSelected = selectedIndex === index;

            return (
              <div
                key={item.text + index}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  if (onHoverItem) onHoverItem(item, index);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  if (onHoverItem) onHoverItem(null, null);
                }}
                onClick={() => handleCardClick(item, index)}
                className="absolute top-0 left-0 transition-transform duration-500 ease-out cursor-pointer group"
                style={{
                  width: `${cardDim.width}px`,
                  height: `${cardDim.height}px`,
                  marginLeft: `-${cardDim.width / 2}px`,
                  marginTop: `-${cardDim.height / 2}px`,
                  transform: `translate3d(${t.x}px, ${t.y}px, ${t.z}px) rotateY(${t.ry}deg) rotateX(${t.rx}deg) ${
                    isHovered ? 'scale3d(1.18, 1.18, 1.18)' : 'scale3d(1, 1, 1)'
                  }`,
                  transformStyle: 'preserve-3d',
                  zIndex: isHovered ? 50 : 1,
                }}
              >
                {/* 1. FRONT FACE (VISIBLE ONLY WHEN FACING TOWARDS CAMERA - NEVER MIRRORED) */}
                <div
                  className={`absolute inset-0 rounded-2xl overflow-hidden border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-2xl ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_35px_rgba(16,185,129,0.45)]'
                      : isHovered
                      ? 'border-cyan-400 bg-zinc-900/95 shadow-[0_0_30px_rgba(34,211,238,0.35)]'
                      : 'border-white/10 bg-[#0e0d16]/95 hover:border-white/30'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(1px)',
                  }}
                >
                  {/* Top Header Mockup Bar */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-black/50">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>

                  {/* Showcase Image Container */}
                  <div className="relative flex-1 w-full overflow-hidden bg-black/60 flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Vignette for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                    {/* Category Floating Pill */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2 py-0.5 rounded text-[8px] font-mono font-semibold bg-black/85 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm truncate max-w-[90%]">
                        {item.category || item.framework || 'Vercel App'}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Info Bar */}
                  <div className="p-3 bg-zinc-950/95 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="text-xs font-bold text-white tracking-tight truncate group-hover:text-emerald-400 transition-colors">
                        {item.text}
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-400 truncate">
                        {item.framework || 'Next.js / Vite'}
                      </p>
                    </div>
                    <ExternalLink size={12} className="text-zinc-500 group-hover:text-emerald-400 shrink-0 transition-colors" />
                  </div>

                  {/* Glowing Border ring on Hover / Selected */}
                  {(isHovered || isSelected) && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-emerald-400/80" />
                  )}
                </div>

                {/* 2. BACK FACE (VISIBLE WHEN CARD FACES AWAY IN 3D SPACE - SLEEK FROSTED VERCEL BACKPLATE) */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0c0b14]/90 backdrop-blur-md flex flex-col items-center justify-center p-4 shadow-xl select-none"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg) translateZ(1px)',
                  }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 shadow-inner">
                    {/* Glowing Vercel Triangle Logo */}
                    <svg width="22" height="20" viewBox="0 0 76 65" fill="none">
                      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="url(#vercelBackGrad)" />
                      <defs>
                        <linearGradient id="vercelBackGrad" x1="0" y1="0" x2="76" y2="65" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#34d399" />
                          <stop offset="1" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                    VERCEL
                  </span>
                  <span className="text-[8px] font-mono text-emerald-400/80 mt-1">
                    ENDPOINT
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CONTROL BAR: MODE SELECTOR (HELIX, BARREL, RING, SPHERE) */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between px-5 md:px-8 pb-5 gap-3">
        {/* Drag Hint */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-black/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <Move3d size={12} className="text-cyan-400" />
          <span>Drag in 3D to spin · Click card to launch</span>
        </div>

        {/* Mode Selector Tabs (Matches User Screenshot) */}
        <div className="flex items-center p-1 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md shadow-xl">
          {(['HELIX', 'BARREL', 'RING', 'SPHERE'] as GalleryMode[]).map((m) => {
            const isActive = mode === m;
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(52,211,153,0.45)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SphereGallery3D;
