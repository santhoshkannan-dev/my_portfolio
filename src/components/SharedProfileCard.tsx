import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { CheckCircle2, RotateCw, ShieldCheck, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface SharedProfileCardProps {
  heroAvatarUrl?: string;
  aboutAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  onContactClick?: () => void;
}

export const SharedProfileCard: React.FC<SharedProfileCardProps> = ({
  heroAvatarUrl = "/santhosh_fullbody.jpg",
  aboutAvatarUrl = "/santhosh_sunglasses.jpg",
  name = "Santhosh Kannan",
  title = "Full Stack Developer",
  handle = "santhoshkannan007",
  status = "Open to Opportunities",
  contactText = "Contact Me",
  onContactClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const isDraggingRef = useRef(false);

  const handleContactClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onContactClick) {
        onContactClick();
      } else {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    [onContactClick]
  );

  // 3D Hover Tilt & Glare Tracking
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDraggingRef.current) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.35 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  // Flip card on click (if not dragged)
  const handleCardClick = () => {
    if (!isDraggingRef.current) {
      setIsFlipped((prev) => !prev);
    }
  };

  // GSAP ScrollTrigger Continuous Shared-Element Animation
  useEffect(() => {
    const card = cardRef.current;
    const main = document.querySelector("main");
    const heroSlot = document.getElementById("hero-profile-card-slot");
    const aboutSlot = document.getElementById("about-profile-card-slot");

    if (!card || !main || !heroSlot || !aboutSlot) return;

    // Helper to calculate exact coordinates relative to <main className="relative">
    const getCoords = () => {
      const hSlot = document.getElementById("hero-profile-card-slot");
      const aSlot = document.getElementById("about-profile-card-slot");
      const m = document.querySelector("main");
      if (!hSlot || !aSlot || !m) {
        return {
          originX: 0,
          originY: 0,
          originW: 350,
          originH: 540,
          targetX: 0,
          targetY: 0,
          targetW: 420,
          targetH: 580,
        };
      }

      const heroRect = hSlot.getBoundingClientRect();
      const aboutRect = aSlot.getBoundingClientRect();
      const mainRect = m.getBoundingClientRect();

      return {
        originX: heroRect.left - mainRect.left,
        originY: heroRect.top - mainRect.top,
        originW: heroRect.width || 350,
        originH: heroRect.height || 540,
        targetX: aboutRect.left - mainRect.left,
        targetY: aboutRect.top - mainRect.top,
        targetW: aboutRect.width || 420,
        targetH: aboutRect.height || 580,
      };
    };

    const ctx = gsap.context(() => {
      const c = getCoords();

      // Initial placement at Hero origin slot: FULLY VISIBLE, no secondary card
      gsap.set(card, {
        position: "absolute",
        top: 0,
        left: 0,
        x: c.originX,
        y: c.originY,
        width: c.originW,
        height: c.originH,
        borderRadius: 28,
        opacity: 1,
        pointerEvents: "auto",
        visibility: "visible",
        zIndex: 35,
      });

      // Strict initial layer states
      gsap.set(".shared-card-hero-photo", { opacity: 1 });
      gsap.set(".shared-card-about-photo", { opacity: 0 });

      const mm = gsap.matchMedia();

      // Desktop animation (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        buildScrollAnimation(true);
      });

      // Mobile / Tablet animation (< 1024px)
      mm.add("(max-width: 1023px)", () => {
        buildScrollAnimation(false);
      });

      function buildScrollAnimation(isDesktop: boolean) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            endTrigger: "#about-profile-card-slot",
            end: isDesktop ? "center 55%" : "top 30%",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              scrollProgressRef.current = self.progress;
              if (self.progress > 0.05 && isFlipped) {
                setIsFlipped(false);
              }
            },
          },
        });

        // 1. Travel card from Hero slot coordinates to About slot coordinates
        tl.fromTo(
          card,
          {
            x: () => getCoords().originX,
            y: () => getCoords().originY,
            width: () => getCoords().originW,
            height: () => getCoords().originH,
            borderRadius: 28,
            ease: "power1.inOut",
          },
          {
            x: () => getCoords().targetX,
            y: () => getCoords().targetY,
            width: () => getCoords().targetW,
            height: () => getCoords().targetH,
            borderRadius: 32,
            ease: "power1.inOut",
            duration: 1,
          },
          0
        );

        // 2. Cinematic 3D banking / flight rotation (Desktop only)
        if (isDesktop) {
          tl.to(
            card,
            {
              rotateZ: -3.5,
              ease: "power1.in",
              duration: 0.45,
            },
            0
          ).to(
            card,
            {
              rotateZ: 0,
              ease: "power1.out",
              duration: 0.55,
            },
            0.45
          );
        }

        // 3. Seamless photo crossfade: Hero linen shirt photo -> About sunglasses photo
        tl.fromTo(
          ".shared-card-hero-photo",
          { opacity: 1 },
          {
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut",
          },
          0.25
        );

        tl.fromTo(
          ".shared-card-about-photo",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: "power1.inOut",
          },
          0.25
        );

        // 4. Ambient behind-glow intensifies to About cyan glow
        tl.fromTo(
          ".shared-card-glow",
          { opacity: 0.25 },
          {
            opacity: 0.85,
            duration: 0.4,
            ease: "power2.out",
          },
          0.45
        );
      }
    }, main);

    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleRefresh);
    window.addEventListener("orientationchange", handleRefresh);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("orientationchange", handleRefresh);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="shared-profile-card select-none"
      style={{
        perspective: "1100px",
        willChange: "transform, width, height",
      }}
    >
      {/* Draggable Spring Physics Wrapper ("drag to anywhere") */}
      <motion.div
        drag
        dragConstraints={{ left: -120, right: 120, top: -80, bottom: 80 }}
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 450, bounceDamping: 24 }}
        whileDrag={{ scale: 1.02, cursor: "grabbing" }}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDragEnd={() => {
          setTimeout(() => {
            isDraggingRef.current = false;
          }, 150);
        }}
        onClick={handleCardClick}
        className="w-full h-full relative cursor-grab active:cursor-grabbing"
      >
        {/* Hanging Strap & Metal Clamp Assembly (Matches Reference Images 5, 6, 7, 8) */}
        <div className="shared-card-strap absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30">
          {/* Lanyard Fabric Band with Chevron Weave */}
          <div
            className="w-7 h-14 sm:h-18 shadow-md"
            style={{
              background:
                "repeating-linear-gradient(45deg, #181824, #181824 3px, #28283c 3px, #28283c 6px)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
              borderRight: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          />

          {/* Silver Metal Clamp with Center Dimple */}
          <div
            className="w-9 h-4 rounded-sm shadow-lg flex items-center justify-center relative -mt-0.5"
            style={{
              background:
                "linear-gradient(135deg, #f8fafc 0%, #94a3b8 40%, #cbd5e1 70%, #64748b 100%)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 shadow-inner" />
          </div>

          {/* Silver Split Ring */}
          <div
            className="w-5 h-5 rounded-full border-2 shadow-md -mt-1 z-40"
            style={{
              borderColor: "#cbd5e1 #94a3b8 #e2e8f0 #64748b",
            }}
          />
        </div>

        {/* Ambient Behind Cyan / Violet Glow */}
        <div
          className="shared-card-glow absolute -inset-4 rounded-[32px] pointer-events-none z-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.35) 0%, rgba(16, 185, 129, 0.15) 45%, transparent 70%)",
            filter: "blur(32px)",
          }}
        />

        {/* Card 3D Flip Wrapper */}
        <div
          className="relative z-10 w-full h-full rounded-[inherit]"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${(
              tilt.y + (isFlipped ? 180 : 0)
            ).toFixed(2)}deg)`,
            transition: isDraggingRef.current
              ? "none"
              : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {/* ======================================================== */}
          {/* FRONT FACE: Linen Shirt (Hero) -> Sunglasses (About)     */}
          {/* ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden border border-white/15 dark:border-white/15 dark:bg-[#090810] bg-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col justify-between p-4 sm:p-5"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Dynamic Lighting Glare Overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.24) 0%, transparent 60%)`,
              }}
            />

            {/* 1. Hero Fullbody Portrait */}
            <div className="shared-card-hero-photo absolute inset-0 z-10 overflow-hidden rounded-[inherit] pointer-events-none">
              <img
                src={heroAvatarUrl}
                alt={`${name} hero portrait`}
                loading="eager"
                className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090810]/70 via-transparent to-black/25 z-10" />
            </div>

            {/* 2. About Sunglasses Portrait (Smooth crossfade during scroll flight) */}
            <div className="shared-card-about-photo absolute inset-0 z-10 overflow-hidden rounded-[inherit] pointer-events-none opacity-0">
              <img
                src={aboutAvatarUrl}
                alt={`${name} about portrait`}
                loading="eager"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = heroAvatarUrl;
                }}
                className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090810] via-[#090810]/50 to-black/25 z-10" />
            </div>

            {/* TOP ROW: DEV PASS & PYTHON / DJANGO BADGES (Matches Reference Images) */}
            <div className="relative z-20 flex items-center justify-between w-full pt-1 pointer-events-none">
              {/* DEV PASS // 2026 */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-cyan-500/40 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-medium text-cyan-400 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>DEV PASS // 2026</span>
              </div>

              {/* Python & Django #007 */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-emerald-500/40 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-medium text-emerald-400 shadow-md">
                <CheckCircle2 size={12} className="text-emerald-400" />
                <span>Python & Django</span>
                <span className="text-[9px] text-zinc-400 font-mono">#007</span>
              </div>
            </div>

            {/* BOTTOM SECTION: Floating Contact Pill + Barcode + Name */}
            <div className="relative z-20 w-full flex flex-col justify-end space-y-2 pointer-events-none">
              {/* Floating Contact Glass Pill */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-black/85 border border-white/12 backdrop-blur-md flex items-center justify-between gap-2.5 shadow-2xl pointer-events-auto">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-emerald-400/60 shrink-0">
                    <img
                      src={aboutAvatarUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-[11px] sm:text-xs font-mono font-bold text-white truncate">
                      @{handle}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-emerald-400 flex items-center gap-1 font-sans font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="truncate">{status}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleContactClick}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.35)] hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] shrink-0 cursor-pointer"
                >
                  {contactText}
                </button>
              </div>

              {/* Flip Hint */}
              <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-cyan-400/80 tracking-widest uppercase">
                <RotateCw size={10} className="animate-spin text-cyan-400" style={{ animationDuration: "7s" }} />
                <span>CLICK TO FLIP ID</span>
              </div>

              {/* Developer Name */}
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none uppercase text-center font-sans drop-shadow-md">
                {name}
              </h3>

              {/* Crisp Barcode Graphic with Overlay Title */}
              <div className="relative flex items-center justify-center h-6 w-full">
                {/* Barcode Lines */}
                <div className="h-full flex items-center justify-center gap-[2px] opacity-75 w-full max-w-[260px]">
                  {[3, 1, 4, 2, 5, 1, 3, 2, 6, 1, 4, 3, 2, 5, 1, 3, 4, 2, 6, 1, 3, 2, 5, 4, 1, 3, 2, 4].map(
                    (w, i) => (
                      <div
                        key={i}
                        className="bg-white/90 h-full"
                        style={{ width: `${w}px` }}
                      />
                    )
                  )}
                </div>

                {/* Overlay Text in Emerald Green */}
                <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-black/60 px-2.5 py-0.5 rounded backdrop-blur-[2px]">
                  {title}
                </span>
              </div>

              {/* Subtitle Caption */}
              <div className="text-[8px] sm:text-[9px] font-mono text-zinc-400 tracking-[0.25em] uppercase text-center pb-0.5">
                SANTHOSH KANNAN • FULL STACK
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BACK FACE: Dark Carbon Developer Pass Specs             */}
          {/* ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden border border-white/15 dark:border-white/15 dark:bg-[#0c0c12] bg-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 flex flex-col justify-between"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.12) 0%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(16, 185, 129, 0.12) 0%, transparent 60%)",
            }}
          >
            {/* Top Magnetic Data Stripe */}
            <div className="w-full h-7 bg-zinc-950 border-y border-white/10 -mx-6 px-6 flex items-center justify-between">
              <span className="text-[8px] font-mono text-zinc-500 tracking-widest">
                DEV-SEC-PASS // MAGNETIC DATA TRACK
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Security Chip & Spec Header */}
            <div className="pt-2 flex items-center justify-between">
              {/* Holographic Security Microchip */}
              <div className="w-12 h-9 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-[1px] shadow-md relative overflow-hidden">
                <div className="w-full h-full bg-[#1e1e24] rounded-[5px] flex items-center justify-center relative">
                  <div className="w-6 h-4 border border-amber-400/40 rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
                    <div className="bg-amber-400/20" />
                    <div className="bg-amber-400/20" />
                    <div className="bg-amber-400/20" />
                    <div className="bg-amber-400/20" />
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 font-bold">
                  <ShieldCheck size={12} className="text-cyan-400" />
                  VERIFIED CREDENTIAL
                </span>
                <span className="text-[9px] font-mono text-zinc-500 block">
                  ID: SK-2026-DEV
                </span>
              </div>
            </div>

            {/* Developer Specs Grid */}
            <div className="space-y-3 my-auto py-3 border-y border-white/5">
              <div>
                <span className="text-[9px] font-mono uppercase text-zinc-500 block">
                  DEVELOPER NAME
                </span>
                <span className="text-sm font-bold text-white font-sans">{name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[9px] font-mono uppercase text-zinc-500 block">
                    SPECIALIZATION
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">
                    Full Stack & AI
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-zinc-500 block">
                    STATUS
                  </span>
                  <span className="text-xs font-semibold text-cyan-400 font-mono">
                    ALL SYSTEMS GO
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono uppercase text-zinc-500 block">
                  CORE PLATFORMS
                </span>
                <span className="text-[11px] text-zinc-300 font-mono">
                  React • Django • PostgreSQL • AWS
                </span>
              </div>
            </div>

            {/* QR Code & Flip Hint Footer */}
            <div className="flex items-center justify-between pt-1">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <Sparkles size={11} className="text-emerald-400" />
                  <span>DEV ACCESS LEVEL 4</span>
                </div>
                <span className="text-[8px] font-mono text-zinc-500 block">
                  TOUCH TO FLIP BACK TO FRONT
                </span>
              </div>

              {/* Stylized QR Code Graphic */}
              <div className="w-10 h-10 rounded bg-white p-1 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-black rounded-[2px] p-0.5 grid grid-cols-3 gap-0.5">
                  <div className="bg-white rounded-[1px]" />
                  <div className="bg-black" />
                  <div className="bg-white rounded-[1px]" />
                  <div className="bg-black" />
                  <div className="bg-white rounded-[1px]" />
                  <div className="bg-black" />
                  <div className="bg-white rounded-[1px]" />
                  <div className="bg-black" />
                  <div className="bg-white rounded-[1px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SharedProfileCard;
