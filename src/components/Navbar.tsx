import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
  { label: "About", id: "about" },
  { label: "Capabilities", id: "capabilities" },
  { label: "Projects", id: "projects" },
  { label: "Stack", id: "stack" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [visible, setVisible] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Section tracking
      const scrollPosition = currentScrollY + 150;
      for (const item of links) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:py-4 flex justify-center pointer-events-none"
    >
      <div
        className={`w-full max-w-6xl flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-2xl ${
          scrolled
            ? "glass-strong px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-border/80 backdrop-blur-xl bg-background/80"
            : "px-4 py-2.5 bg-transparent"
        }`}
      >
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Avatar button */}
          <button
            onClick={() => setImageModalOpen(true)}
            className="relative group focus:outline-none transition-transform duration-150 active:scale-95"
            title="Click to view profile image"
          >
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.4)] group-hover:border-emerald-400 transition-all duration-300">
              <img
                src="/kannan.png"
                alt="Santhosh Kannan"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-zinc-950 animate-pulse" />
          </button>

          {/* Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start leading-tight focus:outline-none text-left group/text"
          >
            <span className="text-sm font-bold tracking-tight text-foreground group-hover/text:text-emerald-400 transition-colors duration-300">
              Santhosh Kannan
            </span>
            <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
              Software Developer
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
          {links.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Buttons & Controls */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-secondary/40 hover:bg-secondary/70 text-foreground border border-border/50 transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none"
            title="Toggle Light/Dark Theme"
          >
            {!mounted ? (
              <div className="w-4 h-4" />
            ) : currentTheme === "dark" ? (
              <Sun size={16} className="text-yellow-400" />
            ) : (
              <Moon size={16} className="text-indigo-600" />
            )}
          </button>

          {/* Let's Talk CTA */}
          <button
            onClick={() => scrollTo("contact")}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-black hover:bg-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            <Send size={12} /> Let's Talk
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden p-2 rounded-xl bg-secondary/50 text-foreground border border-border/50 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-4 right-4 glass-strong p-5 rounded-2xl border border-border/80 flex flex-col gap-2.5 shadow-2xl pointer-events-auto bg-zinc-950/95 backdrop-blur-xl"
          >
            {links.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 border-l-2 border-emerald-400"
                      : "text-muted-foreground hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox / Full-screen Image Modal */}
      <AnimatePresence>
        {imageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setImageModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 cursor-zoom-out pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-md w-full overflow-hidden rounded-2xl border border-border/60 shadow-2xl bg-zinc-950 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setImageModalOpen(false)}
                className="absolute top-3 right-3 z-50 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
              
              <div className="w-full p-3 bg-black/40 flex items-center justify-center">
                <img
                  src="/kannan.png"
                  alt="Santhosh Kannan"
                  className="max-w-full max-h-[55vh] object-contain rounded-lg"
                />
              </div>
              
              <div className="p-4 text-center border-t border-white/10">
                <h4 className="font-bold text-base text-foreground">Santhosh Kannan</h4>
                <p className="text-xs text-emerald-400 font-mono tracking-wider mt-0.5 uppercase">Software Developer</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
