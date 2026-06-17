import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Users, Target, Calendar, MapPin, Cpu, CheckCircle2, GraduationCap, Quote, BookOpen } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: Cpu,
    title: "AI Powered Applications",
    desc: "Developed AI-integrated applications including crop prediction and recommendation systems using Python and Machine Learning."
  },
  {
    icon: Trophy,
    title: "Academic Projects",
    desc: "Successfully completed multiple full-stack web and mobile projects using React, Django, PostgreSQL and React Native."
  },
  {
    icon: Users,
    title: "Continuous Learning",
    desc: "Actively improving problem-solving skills through LeetCode, HackerRank, NPTEL, Cisco, AWS and self-learning."
  },
  {
    icon: Target,
    title: "Open Source & GitHub",
    desc: "Publishing projects on GitHub while continuously learning modern development practices."
  }
];

const certifications = [
  "Python Essentials — Cisco",
  "Python for Data Science",
  "Networking Fundamentals",
  "SAP S4/HANA",
  "Tally Essential",
  "NPTEL Introduction to Machine Learning"
];

const timeline = [
  {
    year: "2021",
    title: "Bachelor of Computer Applications",
    subtitle: "Marian College",
    details: null
  },
  {
    year: "2024",
    title: "Completed BCA",
    subtitle: "Marian College",
    details: null
  },
  {
    year: "2025",
    title: "Started MCA",
    subtitle: "Marian College Kuttikkanam Autonomous",
    details: null
  },
  {
    year: "Present",
    title: "Building & Learning",
    subtitle: "Marian College Kuttikkanam Autonomous",
    details: [
      "Building Full Stack Projects",
      "Learning AWS",
      "Machine Learning",
      "React Native"
    ]
  }
];

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, margin: "-100px" });

  useGSAP(() => {
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
    <section id="journey" className="border-b border-border bg-background relative overflow-hidden" ref={containerRef}>
      <div className="max-w-[90rem] mx-auto border-x border-border grid grid-cols-1 md:grid-cols-12 relative">

        {/* Left Column - Pinned */}
        <div
          ref={leftColRef}
          className="md:col-span-4 p-6 lg:p-10 border-b md:border-b-0 md:border-r border-border h-fit md:h-screen flex flex-col justify-center bg-glass backdrop-blur-md relative z-10"
        >
          <div ref={inViewRef}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-primary font-medium tracking-widest uppercase text-xs mb-4">Portfolio</p>
              <h2 className="font-display text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold uppercase leading-[0.9] tracking-tighter text-foreground">
                Learning<br />
                &<br />
                <span className="text-primary">Achievements</span>
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Scrolling Content */}
        <div ref={rightColRef} className="md:col-span-8 flex flex-col p-6 md:p-12 justify-center gap-16">
          
          {/* Academic Journey (Education & Learning Journey) */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-primary uppercase mb-8 flex items-center gap-2">
              <GraduationCap size={16} /> Education & Learning Journey
            </h3>
            
            <div className="relative space-y-8">
              {/* MCA Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass rounded-xl p-6 md:p-10 border border-border hover:border-primary/30 transition-all duration-500 hover:neon-glow"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border pb-6">
                  <div>
                    <h4 className="font-display font-semibold text-2xl md:text-3xl text-foreground">Master of Computer Applications (MCA)</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-primary font-medium text-lg hover:underline cursor-pointer">Marian College Kuttikkanam Autonomous</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground flex items-center gap-1 border border-border">
                        <MapPin size={12} className="text-primary" />
                        <span>Kuttikkanam, Kerala</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium bg-card px-4 py-2 border border-border rounded-lg self-start md:self-center">
                    <Calendar size={14} className="text-primary" />
                    <span>2025 - Present</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground md:text-lg leading-relaxed mb-6 whitespace-pre-line">
                  Currently pursuing MCA with a strong focus on Full Stack Development, Cloud Computing, Machine Learning, Data Analytics, and Software Engineering.
                  {"\n\n"}
                  Building modern web and mobile applications while continuously improving problem-solving skills through real-world projects.
                </p>

                {/* Technologies */}
                <div>
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Technologies</h5>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "React Native",
                      "Django",
                      "Node.js",
                      "PostgreSQL",
                      "MongoDB",
                      "AWS",
                      "Linux",
                      "Git",
                      "Python"
                    ].map((tech) => (
                      <span key={tech} className="text-xs px-3 py-1 bg-secondary text-secondary-foreground uppercase tracking-wider font-semibold border border-border hover:border-primary/30 transition-colors duration-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-primary uppercase mb-8 flex items-center gap-2">
              <BookOpen size={16} /> Education Timeline
            </h3>
            
            <div className="relative border-l border-border pl-6 md:pl-10 ml-4 md:ml-6 space-y-12">
              {timeline.map((item, idx) => {
                const elementRef = useRef(null);
                const isInView = useInView(elementRef, { once: true, margin: "-50px" });

                return (
                  <div key={idx} ref={elementRef} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[33px] md:-left-[49px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background animate-pulse shadow-[0_0_10px_hsl(var(--primary))]" />
                    
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                      className="glass rounded-xl p-5 border border-border hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                          {item.year}
                        </span>
                        <h4 className="font-display font-semibold text-lg text-foreground">{item.title}</h4>
                      </div>
                      
                      {item.subtitle && (
                        <p className="text-sm text-muted-foreground mb-2 font-medium">{item.subtitle}</p>
                      )}

                      {item.details && (
                        <ul className="mt-3 space-y-1.5">
                          {item.details.map((detail, index) => (
                            <li key={index} className="flex gap-2 text-sm text-muted-foreground items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-primary uppercase mb-8 flex items-center gap-2">
              <Trophy size={16} /> Achievements & Milestones
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((item, i) => {
                const cardRef = useRef(null);
                const inView = useInView(cardRef, { once: true, margin: "-50px" });

                return (
                  <motion.div
                    key={item.title}
                    ref={cardRef}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
                    whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.3 } }}
                    className="glass rounded-xl p-6 md:p-8 group border border-border hover:border-primary/30 transition-all duration-500 hover:neon-glow"
                  >
                    <div className="flex gap-4 items-center mb-4">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300"
                        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                      >
                        <item.icon className="text-primary" size={20} />
                      </motion.div>
                      <h4 className="font-display font-semibold text-lg md:text-xl text-foreground">{item.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-primary uppercase mb-8 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" /> Certifications
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => {
                const cardRef = useRef(null);
                const inView = useInView(cardRef, { once: true, margin: "-50px" });

                return (
                  <motion.div
                    key={index}
                    ref={cardRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="glass rounded-xl p-4 flex items-center gap-3 border border-border hover:border-primary/20 transition-all duration-300 hover:neon-glow-small"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-foreground text-sm font-medium">{cert}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Final Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative glass rounded-2xl p-8 md:p-12 border border-border/80 hover:border-primary/20 transition-all duration-500 overflow-hidden group hover:neon-glow"
          >
            <div className="absolute right-6 bottom-6 text-primary/5 group-hover:text-primary/10 transition-colors duration-500">
              <Quote size={120} style={{ transform: "rotate(180deg)" }} />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <Quote size={32} className="text-primary" />
              <p className="text-xl md:text-2xl font-display font-medium text-foreground max-w-2xl leading-relaxed italic">
                "I believe every project is an opportunity to learn, improve, and build something meaningful."
              </p>
              <div className="flex flex-col items-center">
                <span className="w-8 h-[2px] bg-primary mb-3" />
                <span className="font-semibold text-lg text-foreground tracking-wider uppercase">Santhosh Kannan</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">MCA Student & Developer</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
