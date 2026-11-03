import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  // Card Flip Handler
  const toggleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  // GSAP ScrollTrigger Shared-Element Flight Transition
  useEffect(() => {
    let timeline: gsap.core.Timeline | null = null;

    const setupFlightTransition = () => {
      const card = cardRef.current;
      const main = document.querySelector("main");
      const heroSlot = document.getElementById("hero-profile-card-slot");
      const aboutSlot = document.getElementById("about-profile-card-slot");

      if (!card || !main || !heroSlot || !aboutSlot) return false;

      const mainRect = main.getBoundingClientRect();
      const heroRect = heroSlot.getBoundingClientRect();
      const aboutRect = aboutSlot.getBoundingClientRect();

      // Ensure geometry has settled and elements have valid non-zero layout
      if (heroRect.width === 0 || aboutRect.width === 0) return false;

      const originX = heroRect.left - mainRect.left;
      const originY = heroRect.top - mainRect.top;
      const originW = heroRect.width || 350;
      const originH = heroRect.height || 540;

      const targetX = aboutRect.left - mainRect.left;
      const targetY = aboutRect.top - mainRect.top;
      const targetW = aboutRect.width || 420;
      const targetH = aboutRect.height || 580;

      // Position card initially over Hero origin slot
      gsap.set(card, {
        position: "absolute",
        top: 0,
        left: 0,
        x: originX,
        y: originY,
        width: originW,
        height: originH,
        borderRadius: 28,
        opacity: 1,
        visibility: "visible",
        zIndex: 35,
        pointerEvents: "auto",
      });

      // Strict initial photo opacities
      gsap.set(".shared-card-hero-photo", { opacity: 1 });
      gsap.set(".shared-card-about-photo", { opacity: 0 });

      // Kill previous timeline if re-initializing
      if (timeline) {
        timeline.kill();
        timeline = null;
      }

      const isDesktop = window.innerWidth >= 1024;

      // GSAP ScrollTrigger Timeline scrubbed from Hero to About
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "shared-profile-flight",
          trigger: heroSlot,
          start: "top 25%",
          endTrigger: aboutSlot,
          end: isDesktop ? "center 52%" : "top 30%",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
            // If flipped, auto unflip when user scrolls away from resting sections
            if (self.progress > 0.05 && self.progress < 0.95) {
              setIsFlipped(false);
            }
          },
        },
      });

      // 1. Travel card from Hero slot coordinates to About slot coordinates
      tl.fromTo(
        card,
        {
          x: originX,
          y: originY,
          width: originW,
          height: originH,
          borderRadius: 28,
        },
        {
          x: targetX,
          y: targetY,
          width: targetW,
          height: targetH,
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

      // 3. Seamless photo crossfade: Hero fullbody photo -> About sunglasses photo
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

      // 4. Subtle ambient glow boost when reaching About
      tl.fromTo(
        ".shared-card-glow",
        { opacity: 0.35 },
        {
          opacity: 0.9,
          duration: 0.4,
          ease: "power2.out",
        },
        0.45
      );

      timeline = tl;
      return true;
    };

    // Attempt initialization on mount and after layout paints
    setupFlightTransition();
    const t1 = setTimeout(setupFlightTransition, 100);
    const t2 = setTimeout(setupFlightTransition, 400);
    const t3 = setTimeout(setupFlightTransition, 1000);
    const t4 = setTimeout(setupFlightTransition, 1800);

    const handleResize = () => {
      setupFlightTransition();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        setupFlightTransition();
        ScrollTrigger.refresh();
      });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (timeline) {
        timeline.kill();
      }
      ScrollTrigger.getById("shared-profile-flight")?.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="shared-profile-card select-none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        perspective: "1200px",
        willChange: "transform, width, height",
      }}
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

        {/* Silver Metal Clamp with Center Hole */}
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

      {/* 3D Flip Card Container */}
      <div
        className="relative z-10 w-full h-full rounded-[inherit] cursor-pointer"
        onClick={() => toggleFlip()}
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${(
            tilt.y + (isFlipped ? 180 : 0)
          ).toFixed(2)}deg)`,
          transition: "transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {/* ======================================================== */}
        {/* FRONT FACE: Fullbody (Hero) -> Sunglasses (About)       */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden border border-white/15 dark:border-white/15 dark:bg-[#090810] bg-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col justify-between p-4 sm:p-5 transition-opacity duration-300"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            opacity: isFlipped ? 0 : 1,
            pointerEvents: isFlipped ? "none" : "auto",
            zIndex: isFlipped ? 1 : 2,
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

          {/* 1. Hero Fullbody Portrait (santhosh_fullbody.jpg) */}
          <div className="shared-card-hero-photo absolute inset-0 z-10 overflow-hidden rounded-[inherit] pointer-events-none">
            <img
              src={heroAvatarUrl}
              alt={`${name} hero portrait`}
              loading="eager"
              className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090810]/75 via-transparent to-black/25 z-10" />
          </div>

          {/* 2. About Sunglasses Portrait (santhosh_sunglasses.jpg crossfade) */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#090810] via-[#090810]/55 to-black/25 z-10" />
          </div>

          {/* TOP ROW: DEV PASS & PYTHON / DJANGO BADGES (Reference Images 5, 6, 7, 8) */}
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

          {/* BOTTOM SECTION: Floating Contact Pill + CLICK TO FLIP ID + Name + Barcode */}
          <div className="relative z-20 w-full flex flex-col justify-end space-y-2 pointer-events-auto">
            {/* Floating Contact Glass Pill */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-black/85 border border-white/12 backdrop-blur-md flex items-center justify-between gap-2.5 shadow-2xl">
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

            {/* CLICK TO FLIP ID (Interactive Clickable Button with Rotate Icon) */}
            <button
              type="button"
              onClick={toggleFlip}
              className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-cyan-400 hover:text-cyan-300 tracking-widest uppercase transition-colors py-0.5 cursor-pointer group w-full"
              title="Click to flip card and view verified developer pass credentials"
            >
              <RotateCw size={11} className="text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
              <span className="underline decoration-cyan-400/40 underline-offset-2">CLICK TO FLIP ID</span>
            </button>

            {/* Developer Name: SANTHOSH KANNAN */}
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none uppercase text-center font-sans drop-shadow-md">
              {name}
            </h3>

            {/* SVG Barcode Graphic with FULL STACK DEVELOPER Overlay */}
            <div className="relative flex items-center justify-center h-6 w-full">
              {/* Barcode lines */}
              <div className="h-full flex items-center justify-center gap-[2px] opacity-75 w-full max-w-[260px]">
                {[3, 1, 4, 2, 5, 1, 3, 2, 6, 1, 4, 3, 2, 5, 1, 3, 4, 2, 6, 1, 3, 2, 5, 4, 1, 3, 2, 4].map(
                  (w, i) => (
                    <div
                      key={i}
                      className="bg-white/90 h-full rounded-[0.5px]"
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

            {/* Letterspaced Sub-Caption: SANTHOSH KANNAN • FULL STACK */}
            <div className="text-[8px] sm:text-[9px] font-mono text-zinc-400 tracking-[0.25em] uppercase text-center pb-0.5">
              SANTHOSH KANNAN • FULL STACK
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BACK FACE: Dark Carbon Developer Pass Specs             */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden border border-white/15 dark:border-white/15 dark:bg-[#0c0c12] bg-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 flex flex-col justify-between transition-opacity duration-300"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            opacity: isFlipped ? 1 : 0,
            pointerEvents: isFlipped ? "auto" : "none",
            zIndex: isFlipped ? 2 : 1,
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.15) 0%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)",
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
          <div className="space-y-3 my-auto py-3 border-y border-white/5 text-left">
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
            <button
              type="button"
              onClick={toggleFlip}
              className="space-y-0.5 text-left cursor-pointer group"
              title="Click to flip back to front"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 group-hover:text-emerald-300">
                <Sparkles size={11} className="text-emerald-400" />
                <span>DEV ACCESS LEVEL 4</span>
              </div>
              <span className="text-[8px] font-mono text-cyan-400 group-hover:underline block">
                TOUCH TO FLIP BACK TO FRONT ↺
              </span>
            </button>

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
    </div>
  );
};

export default SharedProfileCard;
