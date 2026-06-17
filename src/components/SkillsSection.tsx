import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "React.js",
      "React Native",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Responsive UI",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Django",
      "Django REST Framework",
      "REST APIs",
      "Authentication",
    ],
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Databases",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Database Design",
      "SQL",
      "Optimization",
    ],
    color: "from-orange-500 to-yellow-500",
  },
  {
    title: "Programming",
    skills: [
      "Python",
      "JavaScript",
      "C",
      "SQL",
      "Problem Solving",
      "Data Structures",
    ],
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS",
      "Linux",
      "Git",
      "GitHub",
      "Docker",
      "Deployment",
    ],
    color: "from-sky-500 to-indigo-500",
  },
  {
    title: "Machine Learning",
    skills: [
      "Machine Learning",
      "Python",
      "Data Analytics",
      "OpenCV",
      "AI Fundamentals",
      "Model Integration",
    ],
    color: "from-pink-500 to-rose-500",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["60px", "-60px"]) }}
        className="absolute -left-40 top-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[130px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          style={{ y: parallaxY }}
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Technical Skills
          </p>

          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Technologies I
            <span className="gradient-text"> Work With</span>
          </h2>

          <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
            I enjoy building scalable full-stack web and mobile applications using modern
            technologies while continuously expanding my expertise in cloud computing,
            machine learning, and software engineering.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
              className="glass rounded-xl p-6 group hover:border-primary/30 transition-all duration-500 hover:neon-glow relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <h3 className="font-display font-semibold text-lg mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 * i + 0.05 * si }}
                    className="px-3 py-1.5 rounded-md text-sm bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:text-primary transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
