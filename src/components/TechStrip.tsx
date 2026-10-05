import React from "react";
import { motion } from "framer-motion";

const technologies = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Django REST Framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
];

export const TechStrip: React.FC = () => {
  return (
    <section className="relative w-full py-8 md:py-12 bg-zinc-950/80 border-y border-white/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="text-[10px] md:text-xs font-mono font-semibold tracking-[0.25em] uppercase text-emerald-400/90">
          TECHNOLOGIES I WORK WITH
        </span>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div className="flex space-x-8 md:space-x-12 animate-marquee whitespace-nowrap py-2">
          {technologies.concat(technologies).map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group/item"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-5 h-5 object-contain filter group-hover/item:brightness-125 transition-all"
                loading="lazy"
              />
              <span className="text-xs md:text-sm font-medium text-zinc-300 group-hover/item:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStrip;
