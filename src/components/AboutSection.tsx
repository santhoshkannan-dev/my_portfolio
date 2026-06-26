import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";
import { Sparkles, Brain, Palette, Code } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import InteractiveModel from "./ui/InteractiveModel";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProfileImage = memo(() => (
  <div className="flex justify-center md:justify-start items-center mb-8 w-full z-10">
    <div className="relative group">
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative z-10">
        <div className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105 bg-zinc-950 border border-white/10">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105 pointer-events-none" />
          
          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block pointer-events-none" />
          
          <img
            src="/kannan.png"
            alt="Santhosh Kannan"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 select-none"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const timeline = [
  {
    year: "2021",
    title: "Started BCA",
    desc: "Began Bachelor of Computer Applications at Marian College Kuttikkanam Autonomous, building strong foundations in programming and software development.",
  },
  {
    year: "2024",
    title: "Full Stack Developer",
    desc: "Built multiple full-stack web and mobile applications using React, Django, PostgreSQL, React Native, and REST APIs.",
  },
  {
    year: "2025",
    title: "Master of Computer Applications",
    desc: "Started MCA while expanding expertise in cloud computing, machine learning, Linux administration, and scalable application development.",
  },
  {
    year: "Present",
    title: "MERN & AI Developer",
    desc: "Focused on building modern web experiences, AI-powered applications, cross-platform mobile apps, and continuously improving problem-solving skills.",
  },
];

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, margin: "-100px" });

  useGSAP(() => {
    // Only apply pinning on larger screens to avoid mobile jank
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="about" className="border-b border-border bg-background relative z-10 overflow-hidden" ref={containerRef}>
      <div className="max-w-[90rem] mx-auto border-x border-border grid grid-cols-1 md:grid-cols-2 relative">

        {/* Left Column - Pinned */}
        <div
          ref={leftColRef}
          className="md:col-span-1 p-8 md:p-16 border-b md:border-b-0 md:border-r border-border h-fit md:h-screen flex flex-col justify-center relative overflow-hidden"
        >
          {/* Subtle 3D background integrated into the pinned section */}
          <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <InteractiveModel color="hsl(151, 55%, 52%)" distort={0.4} speed={1} />
            </Canvas>
          </div>

          <div className="relative z-10" ref={inViewRef}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ProfileImage />

              <p className="text-primary font-medium tracking-widest uppercase text-xs mb-4">
                About Me
              </p>

              <h2 className="font-display text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold uppercase leading-[0.9] tracking-tighter mb-8 text-foreground">
                Software
                <br />
                <span className="text-primary">Developer</span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-md font-sans font-light">
                I'm <span className="text-white font-medium">Santhosh Kannan</span>, a passionate
                Full Stack Developer currently pursuing my Master of Computer Applications.
                I specialize in building scalable web and mobile applications using the MERN
                stack, React Native, Django, and PostgreSQL while exploring Artificial
                Intelligence, Cloud Computing, and modern software architecture. I enjoy
                transforming ideas into fast, responsive, and user-focused digital products.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Scrolling Content */}
        <div ref={rightColRef} className="md:col-span-1 flex flex-col">

          {/* Skills Grid - Bento Sub-grid */}
          <div className="grid grid-cols-2 border-b border-border">
            {[
              {
                icon: Code,
                label: "Full Stack",
                desc: "React, Node.js, Django, MERN",
              },
              {
                icon: Brain,
                label: "AI & ML",
                desc: "Machine Learning, Python, OpenCV",
              },
              {
                icon: Sparkles,
                label: "Mobile Apps",
                desc: "React Native, Android & iOS",
              },
              {
                icon: Palette,
                label: "Cloud & DevOps",
                desc: "AWS, Linux, Git, PostgreSQL",
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`p-8 md:p-12 border-border hover:bg-card transition-colors duration-500 flex flex-col justify-center
                  ${i % 2 === 0 ? "border-r" : ""} 
                  ${i < 2 ? "border-b" : ""}
                `}
                style={{ minHeight: "250px" }}
              >
                <item.icon className="mb-6 text-primary" size={32} strokeWidth={1.5} />
                <h3 className="font-display font-bold text-xl mb-2 text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline Section */}
          <div className="p-8 md:p-16 flex-grow flex flex-col justify-center min-h-screen">
            <h3 className="font-display text-2xl font-bold uppercase mb-12 tracking-wider">The Journey</h3>

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 * i }}
                  className="relative pl-8 border-l border-border hover:border-primary transition-colors duration-300"
                >
                  <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-border" />
                  <span className="text-primary font-display font-bold text-lg leading-none block mb-2">{item.year}</span>
                  <h4 className="font-display font-semibold text-xl mb-2 text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
