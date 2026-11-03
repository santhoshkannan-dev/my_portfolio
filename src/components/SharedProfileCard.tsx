import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
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

  // Subtle 3D tilt tracking when docked in About section
  const handlePointerMove = (e: React.PointerEvent) => {
    if (scrollProgress < 0.9) {
      setTilt({ x: 0, y: 0 });
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // GSAP ScrollTrigger Shared-Element Animation
  useEffect(() => {
    const heroSlot = document.getElementById("hero-profile-card-slot");
    const aboutSlot = document.getElementById("about-profile-card-slot");
    const card = cardRef.current;
    const main = document.querySelector("main");

    if (!heroSlot || !aboutSlot || !card || !main) {
      const retryTimer = setTimeout(() => {
        setIsReady((prev) => !prev);
      }, 100);
      return () => clearTimeout(retryTimer);
    }

    // Window scroll fail-safe: Whenever user is near top of page, Lanyard owns all interactions
    const handleWindowScroll = () => {
      const lanyardWrapper = document.getElementById("hero-lanyard-wrapper");
      if (window.scrollY < 20) {
        if (card) {
          card.style.display = "none";
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
        }
        if (lanyardWrapper) {
          lanyardWrapper.style.opacity = "1";
          lanyardWrapper.style.pointerEvents = "auto";
        }
      }
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    handleWindowScroll();

    const ctx = gsap.context(() => {
      const getCoords = () => {
        const heroRect = heroSlot.getBoundingClientRect();
        const aboutRect = aboutSlot.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();

        return {
          originX: heroRect.left - mainRect.left,
          originY: heroRect.top - mainRect.top,
          originW: heroRect.width || 340,
          originH: heroRect.height || 480,
          targetX: aboutRect.left - mainRect.left,
          targetY: aboutRect.top - mainRect.top,
          targetW: aboutRect.width || 380,
          targetH: aboutRect.height || 520,
        };
      };

      const c = getCoords();

      // Initial placement at Hero slot - completely hidden while Lanyard handles Hero
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
        display: "none",
        pointerEvents: "none",
        zIndex: 35,
      });

      const mm = gsap.matchMedia();

      // Desktop layout transition
      mm.add("(min-width: 1024px)", () => {
        buildScrollAnimation(true);
      });

      // Mobile/Tablet layout transition
      mm.add("(max-width: 1023px)", () => {
        buildScrollAnimation(false);
      });

      function buildScrollAnimation(isDesktop: boolean) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSlot,
            start: () => (isDesktop ? "top 40px" : "top 30%"),
            endTrigger: aboutSlot,
            end: () => (isDesktop ? "center 50%" : "top 25%"),
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              const lanyardWrapper = document.getElementById("hero-lanyard-wrapper");
              if (self.progress <= 0.01 || window.scrollY < 20) {
                if (card) {
                  card.style.display = "none";
                  card.style.opacity = "0";
                  card.style.pointerEvents = "none";
                }
                if (lanyardWrapper) {
                  lanyardWrapper.style.opacity = "1";
                  lanyardWrapper.style.pointerEvents = "auto";
                }
              } else {
                if (card) {
                  card.style.display = "block";
                  // Enable pointer events on the card only when docked in About
                  if (self.progress > 0.95) {
                    card.style.pointerEvents = "auto";
                  } else {
                    card.style.pointerEvents = "none";
                  }
                }
              }
            },
          },
        });

        // 0. Seamless Handoff from Hero 3D Lanyard to Traveling Shared Card
        tl.to(
          "#hero-lanyard-wrapper",
          {
            opacity: 0,
            duration: 0.1,
            ease: "power1.out",
          },
          0
        );

        tl.fromTo(
          card,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.1,
            ease: "power1.in",
          },
          0
        );

        // 1. Move card from Hero slot coordinates to About slot coordinates (responsive fromTo)
        tl.fromTo(
          card,
          {
            x: () => getCoords().originX,
            y: () => getCoords().originY,
            width: () => getCoords().originW,
            height: () => getCoords().originH,
            borderRadius: 24,
          },
          {
            x: () => getCoords().targetX,
            y: () => getCoords().targetY,
            width: () => getCoords().targetW,
            height: () => getCoords().targetH,
            borderRadius: 28,
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
              rotateZ: -3.8,
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

        // 3. Hanging strap retracts upward and fades out
        tl.to(
          ".shared-card-strap",
          {
            y: -75,
            opacity: 0,
            scaleY: 0.2,
            duration: 0.24,
            ease: "power2.in",
          },
          0
        );

        // 4. Seamless photo transition: Hero fullbody photo morphs into About photo
        tl.to(
          ".shared-card-hero-photo",
          {
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
          },
          0.32
        );

        tl.fromTo(
          ".shared-card-about-photo",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.45,
            ease: "power2.inOut",
          },
          0.32
        );

        // 5. About ProfileCard details slide up and bloom in
        tl.fromTo(
          ".shared-card-about-layer",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          0.52
        );

        // 6. Ambient behind-glow intensifies to About cyan glow
        tl.fromTo(
          ".shared-card-glow",
          { opacity: 0.2 },
          {
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          0.48
        );
      }
    }, main);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [isReady]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="shared-profile-card select-none"
      style={{
        display: "none",
        opacity: 0,
        pointerEvents: "none",
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

      {/* Behind Cyan / Violet Ambient Glow */}
      <div
        className="shared-card-glow absolute -inset-4 rounded-[32px] pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.35) 0%, rgba(16, 185, 129, 0.15) 45%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      {/* Card Body Shell */}
      <div
        className="relative z-10 w-full h-full rounded-[inherit] overflow-hidden border dark:border-white/12 border-zinc-300/80 dark:bg-[#0a0a0f] bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl flex flex-col justify-between"
        style={{
          transform: `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Holographic Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 z-30"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 50%, rgba(34, 211, 238, 0.08) 100%)",
          }}
        />

        {/* 1. Hero Fullbody Photo (Santhosh in linen shirt with blue sky) */}
        <div className="shared-card-hero-photo absolute inset-0 z-10 overflow-hidden rounded-[inherit] pointer-events-none">
          <img
            src={heroAvatarUrl}
            alt={`${name} hero portrait`}
            loading="eager"
            className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090810] via-[#090810]/35 to-transparent z-10" />
        </div>

        {/* 2. About Photo (Cross-faded during scroll flight) */}
        <div className="shared-card-about-photo absolute inset-0 z-10 overflow-hidden rounded-[inherit] opacity-0 pointer-events-none">
          <img
            src={aboutAvatarUrl}
            alt={`${name} about portrait`}
            loading="eager"
            className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090810] via-[#090810]/45 to-transparent z-10" />
        </div>

        {/* Verified Floating Tech Badges (Only these two clean badges on photo) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/65 border border-emerald-500/35 backdrop-blur-md shadow-lg text-[10px] sm:text-[11px] font-mono font-medium text-emerald-400 pointer-events-none">
          <CheckCircle2 size={13} className="text-emerald-400" />
          <span>Python & Django</span>
        </div>

        <div className="absolute bottom-20 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/65 border border-cyan-500/35 backdrop-blur-md shadow-lg text-[10px] sm:text-[11px] font-mono font-medium text-cyan-400 pointer-events-none">
          <CheckCircle2 size={13} className="text-cyan-400" />
          <span>React & TypeScript</span>
        </div>

        {/* ABOUT SECTION PROFILECARD SPECIFICS (Blooms in during scroll) */}
        <div
          className={`shared-card-about-layer absolute inset-0 z-20 w-full h-full flex flex-col justify-end p-5 sm:p-6 opacity-0 ${
            scrollProgress > 0.95 ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* User Info Bar with Mini Avatar, Handle, Status & Contact CTA Button */}
          <div className="p-3 rounded-2xl bg-black/75 border border-white/10 backdrop-blur-md flex items-center justify-between gap-3 shadow-xl mb-3">
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
          <div className="space-y-0.5">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              {name}
            </h3>
            <p className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedProfileCard;
