import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const links = ["About", "Skills", "Projects", "Journey", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [visible, setVisible] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for transition
      setScrolled(currentScrollY > 20);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Section tracker
      const sections = links.map((l) => l.toLowerCase());
      const scrollPosition = currentScrollY + 150; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
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
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-6 flex justify-center pointer-events-none"
    >
      <div
        className={`w-full max-w-5xl flex items-center justify-between pointer-events-auto transition-all duration-500 ${scrolled
            ? "glass-strong rounded-full px-6 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-border/60 backdrop-blur-lg"
            : "px-6 py-2 bg-transparent"
          }`}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Avatar button - opens full size profile image lightbox */}
          <button
            onClick={() => setImageModalOpen(true)}
            className="relative group focus:outline-none active:scale-95 transition-transform duration-150"
            title="Click to view full image"
          >
            <div 
              className="relative h-11 w-11 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_10px_hsl(var(--primary)/0.3)] group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)] transition-all duration-500 shrink-0 isolate z-0"
              style={{ maskImage: "radial-gradient(circle, white 100%, transparent 100%)", WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
            >
              <img
                src="/kannan.png"
                alt="Santhosh Kannan"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-zoom-in"
              />
              {/* Elegant metallic sheen sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </div>
          </button>
          
          {/* Name & Title button - scrolls to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start leading-tight focus:outline-none text-left group/text"
          >
            <span className="text-sm font-bold tracking-tight text-foreground group-hover/text:text-primary transition-colors duration-300">
              Santhosh Kannan
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-muted-foreground uppercase">
              Portfolio
            </span>
          </button>
        </div>

        {/* Desktop Links (Floating Pill Layout) */}
        <div className="hidden md:flex items-center gap-1 bg-secondary/20 border border-border/20 rounded-full p-1 backdrop-blur-md">
          {links.map((l) => {
            const isActive = activeSection === l.toLowerCase();
            return (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className={`relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 ${isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {l}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-secondary/30 hover:bg-secondary/60 text-foreground border border-border/40 transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none"
            title="Toggle Light/Dark Theme"
          >
            {!mounted ? (
              <div className="w-[18px] h-[18px]" />
            ) : theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-indigo-600" />
            )}
          </button>

          {/* Quick Contact Button */}
          <button
            onClick={() => scrollTo("Contact")}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300 text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            <Send size={12} /> Let's Talk
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 rounded-full bg-secondary/50 text-foreground border border-border/40 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-4 right-4 glass-strong p-6 rounded-2xl border border-border/60 flex flex-col gap-4 shadow-2xl pointer-events-auto"
          >
            {links.map((l) => {
              const isActive = activeSection === l.toLowerCase();
              return (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all ${isActive
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-secondary/40"
                    }`}
                >
                  {l}
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
              className="relative max-w-lg w-full max-h-[85vh] overflow-hidden rounded-2xl border border-border/40 shadow-2xl bg-card flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setImageModalOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/60 hover:bg-background border border-border/40 text-foreground transition-colors cursor-pointer focus:outline-none"
              >
                <X size={18} />
              </button>
              
              {/* Image Container */}
              <div className="w-full flex-1 overflow-hidden bg-black/40 flex items-center justify-center p-2">
                <img
                  src="/kannan.png"
                  alt="Santhosh Kannan"
                  className="max-w-full max-h-[60vh] object-contain rounded-lg"
                />
              </div>
              
              {/* Metadata */}
              <div className="p-4 border-t border-border/40 text-center bg-secondary/10">
                <h4 className="font-display font-semibold text-lg text-foreground">Santhosh Kannan</h4>
                <p className="text-xs text-primary font-medium tracking-wide mt-0.5">MCA Student & Full Stack Developer</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
