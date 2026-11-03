import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

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
  const [isReady, setIsReady] = useState(false);

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

  // Flip card when resting in Hero section
  const handleCardClick = () => {
    if (scrollProgressRef.current < 0.08) {
      setIsFlipped((prev) => !prev);
    }
  };

  // GSAP ScrollTrigger Shared-Element Animation
  useEffect(() => {
    const heroSlot = document.getElementById("hero-profile-card-slot");
    const aboutSlot = document.getElementById("about-profile-card-slot");
    const heroSection = document.getElementById("hero") || heroSlot?.closest("section");
    const card = cardRef.current;
    const main = document.querySelector("main");

    if (!heroSlot || !aboutSlot || !heroSection || !card || !main) {
      const retryTimer = setTimeout(() => {
        setIsReady((prev) => !prev);
      }, 100);
      return () => clearTimeout(retryTimer);
    }

    const ctx = gsap.context(() => {
      const getCoords = () => {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const scrollX = window.scrollX || window.pageXOffset || 0;

        const heroRect = heroSlot.getBoundingClientRect();
        const aboutRect = aboutSlot.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();

        const mainDocTop = mainRect.top + scrollY;
        const mainDocLeft = mainRect.left + scrollX;

        const heroDocTop = heroRect.top + scrollY;
        const heroDocLeft = heroRect.left + scrollX;

        const aboutDocTop = aboutRect.top + scrollY;
        const aboutDocLeft = aboutRect.left + scrollX;

        return {
          originX: heroDocLeft - mainDocLeft,
          originY: heroDocTop - mainDocTop,
          originW: heroRect.width || 340,
          originH: heroRect.height || 480,
          targetX: aboutDocLeft - mainDocLeft,
          targetY: aboutDocTop - mainDocTop,
          targetW: aboutRect.width || 420,
          targetH: aboutRect.height || 520,
        };
      };

      const c = getCoords();

      // Initial placement at Hero slot coordinates (invisible initially until scroll starts)
      gsap.set(card, {
        position: "absolute",
        top: 0,
        left: 0,
        x: c.originX,
        y: c.originY,
        width: c.originW,
        height: c.originH,
        borderRadius: 24,
        opacity: 0,
        pointerEvents: "none",
        visibility: "visible",
        zIndex: 35,
      });

      // Strict initial element states
      gsap.set(".shared-card-hero-photo", { opacity: 1 });
      gsap.set(".shared-card-about-photo", { opacity: 0 });
      gsap.set(".shared-card-about-layer", { opacity: 0, y: 24 });
      gsap.set(".shared-card-strap", { opacity: 1, y: 0, scaleY: 1 });
      gsap.set(".shared-card-tech-badge", { opacity: 1, scale: 1 });

      const mm = gsap.matchMedia();

      // Desktop layout transition (screens >= 1024px)
      mm.add("(min-width: 1024px)", () => {
        buildScrollAnimation(true);
      });

      // Mobile/Tablet layout transition (screens < 1024px)
      mm.add("(max-width: 1023px)", () => {
        buildScrollAnimation(false);
      });

      function buildScrollAnimation(isDesktop: boolean) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            endTrigger: aboutSlot,
            end: () => (isDesktop ? "center 55%" : "top 30%"),
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              scrollProgressRef.current = self.progress;
              // When user scrolls away from hero, unflip to front side
              if (self.progress > 0.03) {
                setIsFlipped(false);
              }
            },
          },
        });

        // Seamless handoff from interactive 3D Lanyard to traveling scroll card
        tl.fromTo(
          "#hero-lanyard-wrapper",
          { opacity: 1, pointerEvents: "auto" },
          {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.1,
            ease: "power1.out",
          },
          0
        );

        tl.fromTo(
          card,
          {
            x: () => getCoords().originX,
            y: () => getCoords().originY,
            width: () => getCoords().originW,
            height: () => getCoords().originH,
            borderRadius: 24,
            opacity: 0,
            pointerEvents: "none",
          },
          {
            x: () => getCoords().targetX,
            y: () => getCoords().targetY,
            width: () => getCoords().targetW,
            height: () => getCoords().targetH,
            borderRadius: 28,
            opacity: 1,
            pointerEvents: "auto",
            ease: "power2.inOut",
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

        // 3. Hanging strap retracts upward and fades out cleanly
        tl.fromTo(
          ".shared-card-strap",
          { y: 0, opacity: 1, scaleY: 1 },
          {
            y: -120,
            opacity: 0,
            scaleY: 0.1,
            duration: 0.22,
            ease: "power2.in",
          },
          0
        );

        // 4. Hero Tech Badges fade out cleanly as card leaves Hero
        tl.fromTo(
          ".shared-card-tech-badge",
          { opacity: 1, scale: 1 },
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.22,
            ease: "power2.in",
          },
          0.05
        );

        // 5. Seamless photo crossfade: Hero linen shirt photo -> About sunglasses photo
        tl.fromTo(
          ".shared-card-hero-photo",
          { opacity: 1 },
          {
            opacity: 0,
            duration: 0.45,
            ease: "power1.inOut",
          },
          0.20
        );

        tl.fromTo(
          ".shared-card-about-photo",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.45,
            ease: "power1.inOut",
          },
          0.20
        );

        // 6. About ProfileCard details slide up and bloom in
        tl.fromTo(
          ".shared-card-about-layer",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          0.50
        );

        // 7. Ambient behind-glow intensifies to About cyan glow
        tl.fromTo(
          ".shared-card-glow",
          { opacity: 0.25 },
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          0.50
        );
      }
    }, main);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      ctx.revert();
    };
  }, [isReady]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleCardClick}
      className="shared-profile-card select-none cursor-pointer"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Hanging Strap & Metal Clamp Assembly (Retracts on Scroll) */}
      <div className="shared-card-strap absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30">
        <div
          className="w-7 h-20 rounded-t-sm shadow-md"
          style={{
            background:
              "repeating-linear-gradient(45deg, #181824, #181824 3px, #252536 3px, #252536 6px)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        />

        <div
          className="w-9 h-4.5 rounded-sm shadow-lg flex items-center justify-center relative -mt-0.5"
          style={{
            background:
              "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 40%, #cbd5e1 70%, #64748b 100%)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 shadow-inner" />
        </div>

        <div
          className="w-5 h-5 rounded-full border-2 shadow-md -mt-1 z-40"
          style={{
            background: "transparent",
            borderColor: "#d1d5db #9ca3af #cbd5e1 #6b7280",
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
          transition: "transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {/* ======================================================== */}
        {/* FRONT FACE: Linen Shirt (Hero) -> Sunglasses (About)     */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden border dark:border-white/12 border-zinc-300/80 dark:bg-[#0a0a0f] bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl flex flex-col justify-between"
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
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`,
            }}
          />

          {/* 1. Hero Fullbody Photo (Linen shirt with blue sky) */}
          <div className="shared-card-hero-photo absolute inset-0 z-10 overflow-hidden rounded-[inherit] pointer-events-none">
            <img
              src={heroAvatarUrl}
              alt={`${name} hero portrait`}
              loading="eager"
              className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090810]/40 via-transparent to-transparent z-10" />
          </div>

          {/* 2. About Photo (Cross-faded during scroll flight) */}
          <div className="shared-card-about-photo absolute inset-0 z-10 overflow-hidden rounded-[inherit] pointer-events-none opacity-0">
            <img
              src={aboutAvatarUrl}
              alt={`${name} about portrait`}
              loading="eager"
              onError={(e) => {
                // Failover if sunglasses image is not found
                (e.currentTarget as HTMLImageElement).src = heroAvatarUrl;
              }}
              className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090810] via-[#090810]/45 to-transparent z-10" />
          </div>

          {/* FLOATING TECH BADGE 1: Python & Django (Top Right) */}
          <div className="shared-card-tech-badge absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-emerald-500/40 backdrop-blur-md shadow-lg text-[11px] font-mono font-medium text-emerald-400 pointer-events-none">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Python & Django</span>
          </div>

          {/* FLOATING TECH BADGE 2: React & TypeScript (Bottom Left) */}
          <div className="shared-card-tech-badge absolute bottom-6 left-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-cyan-500/40 backdrop-blur-md shadow-lg text-[11px] font-mono font-medium text-cyan-400 pointer-events-none">
            <CheckCircle2 size={13} className="text-cyan-400" />
            <span>React & TypeScript</span>
          </div>

          {/* CAMERA FOCUS RETICLE (Hero Aesthetic Accent) */}
          <div className="shared-card-tech-badge absolute top-[36%] right-[22%] w-7 h-7 pointer-events-none opacity-60">
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-300/80" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-300/80" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-amber-300/80" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-300/80" />
          </div>

          {/* ABOUT SECTION PROFILECARD SPECIFICS (Blooms in during scroll) */}
          <div className="shared-card-about-layer absolute inset-0 z-20 w-full h-full flex flex-col justify-end p-5 sm:p-6 pointer-events-none opacity-0">
            {/* User Info Bar with Mini Avatar, Handle, Status & Contact CTA Button */}
            <div className="p-3 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-md flex items-center justify-between gap-3 shadow-xl mb-3 pointer-events-auto">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-emerald-400/50 shrink-0">
                  <img
                    src={aboutAvatarUrl}
                    alt={`${name} avatar mini`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono font-bold text-white truncate">
                    @{handle}
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-sans font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="truncate">{status}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleContactClick}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-[11px] uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] shrink-0 cursor-pointer"
              >
                {contactText}
              </button>
            </div>

            {/* Name & Title Typography */}
            <div className="space-y-0.5 pointer-events-none">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                {name}
              </h3>
              <p className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                {title}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BACK FACE: Dark Carbon Developer Pass Specs             */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden border dark:border-white/12 border-zinc-400/50 dark:bg-[#0c0c12] bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 flex flex-col justify-between"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.12) 0%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(16, 185, 129, 0.12) 0%, transparent 60%)",
          }}
        >
          {/* Top Magnetic Data Stripe */}
          <div className="w-full h-8 bg-zinc-950 border-y border-white/10 -mx-6 px-6 flex items-center justify-between">
            <span className="text-[8px] font-mono text-zinc-500 tracking-widest">
              DEV-SEC-PASS // MAGNETIC DATA TRACK
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Security Chip & Spec Header */}
          <div className="pt-4 flex items-center justify-between">
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
          <div className="space-y-3.5 my-auto py-4 border-y border-white/5">
            <div>
              <span className="text-[9px] font-mono uppercase text-zinc-500 block">DEVELOPER NAME</span>
              <span className="text-sm font-bold text-white font-sans">{name}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[9px] font-mono uppercase text-zinc-500 block">SPECIALIZATION</span>
                <span className="text-xs font-semibold text-emerald-400 font-mono">Full Stack & AI</span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase text-zinc-500 block">STATUS</span>
                <span className="text-xs font-semibold text-cyan-400 font-mono">ALL SYSTEMS GO</span>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-mono uppercase text-zinc-500 block">CORE PLATFORMS</span>
              <span className="text-[11px] text-zinc-300 font-mono">React • Django • PostgreSQL • AWS</span>
            </div>
          </div>

          {/* QR Code & Flip Hint Footer */}
          <div className="flex items-center justify-between pt-2">
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
    </div>
  );
};

export default SharedProfileCard;
