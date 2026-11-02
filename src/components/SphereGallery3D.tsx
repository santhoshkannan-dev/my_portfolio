import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Play, Pause, RotateCcw, ExternalLink, Sparkles, Move3d } from 'lucide-react';
import { CircularGalleryItem } from './CircularGallery';

export type GalleryMode = 'SPHERE' | 'RING' | 'BARREL' | 'HELIX';

export interface SphereGallery3DProps {
  items: CircularGalleryItem[];
  defaultMode?: GalleryMode;
  autoRotateSpeed?: number;
  onItemClick?: (item: CircularGalleryItem, index: number) => void;
  onActiveChange?: (index: number) => void;
  className?: string;
}

interface CardTransform {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
}

export const SphereGallery3D: React.FC<SphereGallery3DProps> = ({
  items,
  defaultMode = 'SPHERE',
  autoRotateSpeed = 0.22,
  onItemClick,
  onActiveChange,
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
  const rotXRef = useRef(-6);
  const targetRotYRef = useRef(0);
  const targetRotXRef = useRef(-6);

  // Drag interaction trackers
  const isPointerDownRef = useRef(false);
  const lastPointerPos = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Dimensions & Sphere Radius
  const [radius, setRadius] = useState(380);
  const [cardDim, setCardDim] = useState({ width: 175, height: 235 });

  // Update sizes based on viewport width
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      if (w < 480) {
        setRadius(230);
        setCardDim({ width: 130, height: 180 });
      } else if (w < 768) {
        setRadius(290);
        setCardDim({ width: 150, height: 205 });
      } else {
        setRadius(380);
        setCardDim({ width: 175, height: 235 });
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

  // Compute 3D Coordinates for each card based on the active mode
  const cardTransforms = useMemo<CardTransform[]>(() => {
    const count = items.length;
    if (count === 0) return [];

    return items.map((_, i) => {
      if (mode === 'SPHERE') {
        // Fibonacci sphere distribution for uniform spherical coverage
        const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
        const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad
        const theta = i * goldenAngle;

        // Position on sphere
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi) * 0.95;
        const z = radius * Math.sin(phi) * Math.sin(theta);

        // Angle card to face outward from sphere center
        const ry = -(theta * (180 / Math.PI)) + 90;
        const rx = -(phi * (180 / Math.PI) - 90) * 0.85;

        return { x, y, z, rx, ry, rz: 0 };
      }

      if (mode === 'RING') {
        // Single circular horizontal ring
        const angle = (i / count) * 2 * Math.PI;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        const y = 0;
        const ry = (angle * 180) / Math.PI;

        return { x, y, z, rx: 0, ry, rz: 0 };
      }

      if (mode === 'BARREL') {
        // 3 cylindrical stacked tiers
        const tiers = 3;
        const perTier = Math.ceil(count / tiers);
        const tierIndex = Math.floor(i / perTier);
        const indexInTier = i % perTier;

        const angle = (indexInTier / perTier) * 2 * Math.PI + tierIndex * 0.45;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        const y = (tierIndex - (tiers - 1) / 2) * (cardDim.height + 30);
        const ry = (angle * 180) / Math.PI;
        const rx = -(y / radius) * 12;

        return { x, y, z, rx, ry, rz: 0 };
      }

      if (mode === 'HELIX') {
        // DNA-style vertical 3D spiral
        const angle = i * 0.48;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        const y = (i - (count - 1) / 2) * 44;
        const ry = (angle * 180) / Math.PI;

        return { x, y, z, rx: 0, ry, rz: 0 };
      }

      return { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 };
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

      // Auto-rotation logic (pauses on hover or manual drag)
      if (isAutoRotating && !isPointerDownRef.current && hoveredIndex === null && isInViewport) {
        targetRotYRef.current += autoRotateSpeed * 60 * dt;
        // Subtle undulating pitch wobble for organic 3D movement
        targetRotXRef.current = -6 + Math.sin(timestamp * 0.0008) * 5;
      }

      // Drag inertia / momentum damping
      if (!isPointerDownRef.current) {
        targetRotYRef.current += velocityRef.current.x;
        targetRotXRef.current += velocityRef.current.y;
        velocityRef.current.x *= 0.92;
        velocityRef.current.y *= 0.92;

        // Pitch angle clamp to prevent upside-down flip
        targetRotXRef.current = Math.max(-65, Math.min(65, targetRotXRef.current));
      }

      // Smooth Lerp towards target
      rotYRef.current += (targetRotYRef.current - rotYRef.current) * 0.12;
      rotXRef.current += (targetRotXRef.current - rotXRef.current) * 0.12;

      // Apply 3D transform directly to the stage DOM element for 60-120fps performance
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

    // Update target angles
    targetRotYRef.current += dx * 0.35;
    targetRotXRef.current = Math.max(-65, Math.min(65, targetRotXRef.current - dy * 0.35));

    velocityRef.current = { x: dx * 0.25, y: -dy * 0.25 };
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    setTimeout(() => setIsDragging(false), 50);
  };

  const resetView = () => {
    targetRotYRef.current = 0;
    targetRotXRef.current = -6;
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
      {/* Subtle 3D Depth Lighting Gradients */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-70 z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-20 flex items-center justify-between px-5 md:px-8 pt-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md shadow-lg">
            <Sparkles size={13} className="text-emerald-400" />
            <span className="font-semibold tracking-wide">3D Vercel Sphere</span>
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
        style={{ perspective: '1100px', perspectiveOrigin: '50% 50%' }}
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
            const t = cardTransforms[index] || { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 };
            const isHovered = hoveredIndex === index;
            const isSelected = selectedIndex === index;

            return (
              <div
                key={item.text + index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
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
                  backfaceVisibility: 'visible',
                  zIndex: isHovered ? 50 : 1,
                }}
              >
                {/* CARD BODY WITH SHOWCASE IMAGE & METADATA */}
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-2xl ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_35px_rgba(16,185,129,0.45)]'
                      : isHovered
                      ? 'border-cyan-400 bg-zinc-900/95 shadow-[0_0_30px_rgba(34,211,238,0.35)]'
                      : 'border-white/10 bg-zinc-950/85 hover:border-white/30'
                  }`}
                  style={{
                    // Dim cards slightly that face away for realistic 3D volumetric depth
                    opacity: isHovered || isSelected ? 1 : 0.88,
                  }}
                >
                  {/* Top Header Mockup Bar */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-white/10 bg-black/40">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>

                  {/* Showcase Image Container */}
                  <div className="relative flex-1 w-full overflow-hidden bg-black/60 flex items-center justify-center p-1.5">
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Category Floating Pill */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold bg-black/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm truncate max-w-[90%]">
                        {item.category || item.framework || 'Vercel App'}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Info Bar */}
                  <div className="p-2.5 bg-zinc-950/90 border-t border-white/5 space-y-0.5">
                    <h4 className="text-xs font-bold text-white tracking-tight truncate group-hover:text-emerald-400 transition-colors">
                      {item.text}
                    </h4>
                    <p className="text-[10px] font-mono text-zinc-400 truncate">
                      {item.framework || 'Next.js / Vite'}
                    </p>
                  </div>

                  {/* Highlight Glow Border on Selected/Hovered */}
                  {(isHovered || isSelected) && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-emerald-400/80" />
                  )}
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
          <span>Drag to spin 3D · Click card to launch</span>
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
