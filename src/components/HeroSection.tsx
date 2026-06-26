import { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from "framer-motion";
import { ArrowDown, Send, Download } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Sparkles, PresentationControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const TitleSparkles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[2px] h-[2px] bg-primary rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          boxShadow: '0 0 10px 1px rgba(0, 255, 128, 0.8)',
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
          y: [0, -30],
          x: [0, (Math.random() - 0.5) * 30],
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

const roles = ["AI/ML Engineer", "Software Developer"];

// Individual Laser Beam Component
const LaserBeam = ({ direction, onComplete }: { direction: THREE.Vector3, onComplete: () => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef(Date.now());
  const speed = 50;
  const lifetime = 1000; // 1 second

  useFrame(() => {
    if (!meshRef.current) return;
    const elapsed = Date.now() - startTime.current;

    if (elapsed > lifetime) {
      onComplete();
      return;
    }

    // Move laser in its direction
    meshRef.current.position.addScaledVector(direction, speed * 0.016);

    // Fade out as it ages
    const opacity = 1 - (elapsed / lifetime);
    if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
      meshRef.current.material.opacity = opacity;
    }
  });

  return (
    <mesh ref={meshRef} rotation-z={Math.atan2(direction.y, direction.x) - Math.PI / 2}>
      <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
      <meshBasicMaterial color="#ff0000" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      {/* Laser Glow */}
      <pointLight color="#ff0000" intensity={3} distance={1.5} />
    </mesh>
  );
};

const Hotspot = ({ label, onClick, position }: { label: string, onClick: () => void, position: [number, number, number] }) => (
  <Html position={position} center distanceFactor={10}>
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="group relative flex flex-col items-center justify-center p-4 cursor-pointer"
    >
      {/* Subtle Outer Glow */}
      <div className="absolute inset-0 w-12 h-12 rounded-full bg-primary/5 animate-pulse blur-lg group-hover:bg-primary/10 transition-colors duration-500" />
      <div className="absolute inset-0 w-8 h-8 m-auto rounded-full bg-primary/10 animate-ping opacity-30" />

      {/* Elegant Light Gradient Button */}
      <div className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-br from-white via-primary/30 to-primary/10 shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_5px_rgba(255,255,255,0.1),inset_0_0_2px_rgba(255,255,255,0.5)] border border-white/20 transition-all duration-500 group-hover:scale-125" />

      {/* Subtle Label HUD - Always visible on mobile */}
      <div className="mt-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 shadow-lg">
        <span className="text-[10px] md:text-[9px] font-bold tracking-[0.2em] uppercase text-white/90 whitespace-nowrap">
          {label}
        </span>
      </div>
    </button>
  </Html>
);

const TerminalContent = () => {
  const [lines, setLines] = useState<string[]>([
    "// Welcome to Santhosh's workspace",
    "import React from 'react';",
    "const Portfolio = () => {",
    "  const status = 'Building Scalable Apps';",
    "  const tools = ['React', 'Django', 'AWS'];",
    "  console.log('Success! Connected.');",
    "  return <CodePortfolio />;",
    "};"
  ]);

  useEffect(() => {
    const codeSnippets = [
      "const model = tf.sequential();",
      "model.add(tf.layers.dense({units: 64}));",
      "await model.fit(x, y, {epochs: 10});",
      "INFO: AWS instances scaled successfully.",
      "git commit -m 'feat: developer custom 3D model'",
      "GET /api/v1/projects 200 OK",
      "DATABASE: PostgreSQL connected pool active",
      "npm run dev --host",
      "VITE v5.4.19 ready in 150ms"
    ];

    const interval = setInterval(() => {
      setLines(prev => {
        const nextLines = [...prev.slice(1)];
        const randomCode = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        nextLines.push(randomCode);
        return nextLines;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[340px] h-[200px] bg-black/95 text-[7.5px] font-mono text-green-400 p-3 flex flex-col justify-between select-none pointer-events-none border border-primary/30 rounded-lg shadow-[inset_0_0_15px_hsl(var(--primary)/0.4)]">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1 text-white/40">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        </div>
        <span className="text-[6.5px] tracking-wider uppercase">santhosh-port @ terminal</span>
        <div className="w-4" />
      </div>
      <div className="flex-1 flex flex-col gap-1 overflow-hidden">
        {lines.map((line, idx) => {
          let colorClass = "text-green-400";
          if (line.startsWith("//") || line.startsWith("/*")) colorClass = "text-muted-foreground italic";
          else if (line.includes("INFO") || line.includes("DATABASE")) colorClass = "text-yellow-400";
          else if (line.includes("GET") || line.includes("Success")) colorClass = "text-cyan-400";
          else if (line.startsWith("import") || line.startsWith("const") || line.startsWith("return")) colorClass = "text-pink-400";

          return (
            <div key={idx} className={`${colorClass} whitespace-nowrap overflow-hidden text-ellipsis`}>
              {line}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-1 text-[7px] text-white/50 border-t border-white/5 pt-1 mt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping shrink-0" />
        <span>System active | 60 FPS | local:5173</span>
      </div>
    </div>
  );
};

const techOrbitData = [
  // Frontend
  {
    name: "React",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    speed: 0.8,
    radius: 1.6,
    yOffset: 0.2,
    phase: 0,
  },
  {
    name: "React Native",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    speed: 0.7,
    radius: 1.6,
    yOffset: 0.45,
    phase: Math.PI / 3,
  },
  {
    name: "JavaScript",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    speed: 0.9,
    radius: 1.6,
    yOffset: 0.1,
    phase: (Math.PI * 2) / 3,
  },
  {
    name: "HTML5",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
    speed: 0.8,
    radius: 1.6,
    yOffset: 0.3,
    phase: Math.PI,
  },
  {
    name: "CSS3",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6",
    speed: 0.75,
    radius: 1.6,
    yOffset: 0.4,
    phase: (Math.PI * 4) / 3,
  },

  // Backend
  {
    name: "Node.js",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    speed: 0.8,
    radius: 2.1,
    yOffset: 0.3,
    phase: 0,
  },
  {
    name: "Express",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#ffffff",
    speed: 0.65,
    radius: 2.1,
    yOffset: 0.5,
    phase: Math.PI / 4,
  },
  {
    name: "Django",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    color: "#092E20",
    speed: 0.75,
    radius: 2.1,
    yOffset: 0.4,
    phase: Math.PI / 2,
  },
  {
    name: "Python",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#FFD43B",
    speed: 0.7,
    radius: 2.1,
    yOffset: 0.2,
    phase: (Math.PI * 3) / 4,
  },
  {
    name: "C",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    color: "#A8B9CC",
    speed: 0.6,
    radius: 2.1,
    yOffset: 0.6,
    phase: Math.PI,
  },

  // Databases
  {
    name: "PostgreSQL",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#336791",
    speed: 0.5,
    radius: 2.6,
    yOffset: 0.4,
    phase: 0,
  },
  {
    name: "MongoDB",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    speed: 0.65,
    radius: 2.6,
    yOffset: 0.3,
    phase: Math.PI / 4,
  },
  {
    name: "MySQL",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#4479A1",
    speed: 0.6,
    radius: 2.6,
    yOffset: 0.5,
    phase: Math.PI / 2,
  },

  // Cloud & DevOps
  {
    name: "AWS",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "#FF9900",
    speed: 0.55,
    radius: 3.1,
    yOffset: 0.5,
    phase: 0,
  },
  {
    name: "Docker",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
    speed: 0.7,
    radius: 3.1,
    yOffset: 0.2,
    phase: Math.PI / 5,
  },
  {
    name: "Git",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    speed: 0.85,
    radius: 3.1,
    yOffset: 0.6,
    phase: (Math.PI * 2) / 5,
  },
  {
    name: "GitHub",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#ffffff",
    speed: 0.75,
    radius: 3.1,
    yOffset: 0.4,
    phase: (Math.PI * 3) / 5,
  },
  {
    name: "Linux",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    color: "#FCC624",
    speed: 0.65,
    radius: 3.1,
    yOffset: 0.3,
    phase: (Math.PI * 4) / 5,
  },

  // AI & Tools
  {
    name: "OpenCV",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
    color: "#5C3EE8",
    speed: 0.75,
    radius: 3.6,
    yOffset: 0.5,
    phase: 0,
  },
  {
    name: "TensorFlow",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    color: "#FF6F00",
    speed: 0.7,
    radius: 3.6,
    yOffset: 0.4,
    phase: Math.PI / 2,
  },
  {
    name: "VS Code",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "#007ACC",
    speed: 0.8,
    radius: 3.6,
    yOffset: 0.2,
    phase: Math.PI,
  },
];

const FloatingTechBadge = ({ data }: { data: typeof techOrbitData[0] }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime * data.speed;

    // Smooth orbit paths
    ref.current.position.x = Math.sin(time + data.phase) * data.radius;
    ref.current.position.z = Math.cos(time + data.phase) * data.radius;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.5 + data.phase) * 0.15 + data.yOffset;

    // Face the viewer
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 + data.phase;
  });

  return (
    <group ref={ref}>
      {/* 3D Glass Disc Holder */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.03, 32]} />
        <meshPhysicalMaterial
          color="#06060c"
          roughness={0.15}
          metalness={0.2}
          transmission={0.8}
          thickness={0.5}
          transparent
          opacity={0.85}
          clearcoat={1}
        />
      </mesh>

      {/* Glowing Neon Outline Border */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.012, 8, 32]} />
        <meshBasicMaterial color={data.color} />
      </mesh>

      {/* HTML Logo Content Projected onto Disc */}
      <Html
        transform
        distanceFactor={3.5}
        position={[0, 0, 0.02]}
        className="pointer-events-none select-none"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center bg-black/80 p-2"
          style={{
            boxShadow: `inset 0 0 10px ${data.color}80, 0 0 15px ${data.color}40`,
            border: `1px solid ${data.color}50`
          }}
        >
          <img
            src={data.logoUrl}
            alt={data.name}
            className="w-10 h-10 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            onError={(e) => {
              // Fallback to text initials in case of loading error
              const target = e.target as HTMLElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent && !parent.querySelector(".fallback-txt")) {
                const span = document.createElement("span");
                span.innerText = data.name.substring(0, 2);
                span.className = "fallback-txt text-white font-bold text-xs uppercase select-none";
                parent.appendChild(span);
              }
            }}
          />
        </div>
      </Html>
    </group>
  );
};

function StarfighterModel({ isFixed, scrollScale = 1, targetBaseRotation = [0, 0, 0], currentView = 'front', onViewChange, ...props }: { isFixed: boolean, scrollScale?: number, targetBaseRotation?: [number, number, number], currentView?: string, onViewChange?: (view: string) => void } & Record<string, unknown>) {
  const [scale, setScale] = useState<[number, number, number]>([1, 1, 1]);
  const groupRef = useRef<THREE.Group>(null);
  const baseRotationRef = useRef(new THREE.Euler(0, 0, 0));
  const [lasers, setLasers] = useState<{ id: number, dir: THREE.Vector3 }[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 768 ? [1.1, 1.1, 1.1] : [1.8, 1.8, 1.8]);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    baseRotationRef.current.x = THREE.MathUtils.lerp(baseRotationRef.current.x, targetBaseRotation[0], 0.05);
    baseRotationRef.current.y = THREE.MathUtils.lerp(baseRotationRef.current.y, targetBaseRotation[1], 0.05);
    baseRotationRef.current.z = THREE.MathUtils.lerp(baseRotationRef.current.z, targetBaseRotation[2], 0.05);

    if (isFixed) {
      const isFront = currentView === 'front';
      const targetRotationX = isFront ? (-state.pointer.y * 0.4 + baseRotationRef.current.x) : baseRotationRef.current.x;
      const targetRotationY = isFront ? (state.pointer.x * 0.4 + baseRotationRef.current.y) : baseRotationRef.current.y;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);

      const targetPosX = state.pointer.x * 0.5;
      const targetPosY = (state.pointer.y * 0.5);

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.05);

      groupRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.05;

      const px = state.pointer.x;
      const py = state.pointer.y;
      const mag = Math.sqrt(px * px + py * py);

      if (!groupRef.current.userData.hasFired && mag > 0.7) {
        groupRef.current.userData.hasFired = true;
        const dir = new THREE.Vector3();
        const angle = Math.atan2(py, px);
        const quantizedAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);
        dir.set(Math.cos(quantizedAngle), Math.sin(quantizedAngle), 0).normalize();
        const count = Math.floor(Math.random() * 3) + 1;
        const newLasers = Array.from({ length: count }).map((_, i) => ({
          id: Date.now() + Math.random() + i,
          dir: dir.clone()
        }));
        setLasers(prev => [...prev.slice(-10), ...newLasers]);
      } else if (mag < 0.5) {
        groupRef.current.userData.hasFired = false;
      }
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, baseRotationRef.current.x, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, baseRotationRef.current.y, 0.05);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.05);
    }
  });

  return (
    <group ref={groupRef} scale={scrollScale}>
      {/* Wrap everything in a responsive scale group */}
      <group scale={scale}>

        {/* Laptop Body Group */}
        <group position={[0, -0.4, 0]}>
          {/* Base of laptop */}
          <mesh position={[0, -0.02, 0]}>
            <boxGeometry args={[1.8, 0.04, 1.2]} />
            <meshPhysicalMaterial
              color="#0d0d12"
              roughness={0.2}
              metalness={0.9}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>

          {/* Keyboard recessed tray */}
          <mesh position={[0, 0.005, -0.05]}>
            <boxGeometry args={[1.6, 0.01, 0.7]} />
            <meshStandardMaterial color="#040406" roughness={0.8} />
          </mesh>

          {/* Trackpad */}
          <mesh position={[0, 0.005, 0.42]}>
            <boxGeometry args={[0.45, 0.01, 0.28]} />
            <meshStandardMaterial color="#161620" roughness={0.4} metalness={0.2} />
          </mesh>

          {/* Hinge */}
          <mesh position={[0, 0.01, -0.55]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 1.4, 16]} />
            <meshStandardMaterial color="#08080c" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Laptop Screen Lid */}
          <group position={[0, 0.01, -0.55]} rotation={[-Math.PI / 2.3, 0, 0]}>
            {/* Screen Lid Back */}
            <mesh position={[0, 0.55, -0.01]}>
              <boxGeometry args={[1.8, 1.1, 0.03]} />
              <meshPhysicalMaterial
                color="#0d0d12"
                roughness={0.2}
                metalness={0.9}
                clearcoat={1}
              />
            </mesh>

            {/* Glowing Logo on Lid Back (only visible from rear) */}
            <mesh position={[0, 0.55, -0.03]}>
              <boxGeometry args={[0.15, 0.15, 0.015]} />
              <meshBasicMaterial color="#00ff80" />
            </mesh>

            {/* Screen Bezel Front */}
            <mesh position={[0, 0.55, 0.01]}>
              <boxGeometry args={[1.76, 1.06, 0.015]} />
              <meshStandardMaterial color="#040406" roughness={0.9} />
            </mesh>

            {/* Glowing Screen Panel */}
            <mesh position={[0, 0.55, 0.02]}>
              <planeGeometry args={[1.7, 1.0]} />
              <meshBasicMaterial color="#040408" />
            </mesh>

            {/* Html overlay inside the screen displaying a terminal & code output */}
            <Html
              transform
              occlude
              distanceFactor={1.1}
              position={[0, 0.55, 0.022]}
              className="pointer-events-none select-none"
            >
              <TerminalContent />
            </Html>
          </group>
        </group>

        {/* Floating Developer Icons orbiting the workspace */}
        {techOrbitData.map((data, idx) => (
          <FloatingTechBadge key={idx} data={data} />
        ))}

        {/* Ambient code flow sparkles rising from keyboard */}
        <Sparkles count={100} scale={[1.8, 0.6, 1.2]} size={1.5} speed={2} color="#00ff80" opacity={0.6} />

        {lasers.map(laser => (
          <LaserBeam key={laser.id} direction={laser.dir} onComplete={() => setLasers(prev => prev.filter(l => l.id !== laser.id))} />
        ))}

        {/* Dynamic View Hotspots (Normalized coordinates) */}
        {isFixed && (
          <group>
            {currentView === 'front' && (
              <>
                <Hotspot label="Left" position={[-1.1, 0, 0]} onClick={() => onViewChange?.('left')} />
                <Hotspot label="Right" position={[1.1, 0, 0]} onClick={() => onViewChange?.('right')} />
                <Hotspot label="Top" position={[0, 0.8, 0]} onClick={() => onViewChange?.('top')} />
              </>
            )}

            {currentView === 'back' && (
              <>
                <Hotspot label="Right" position={[-1.1, 0, 0]} onClick={() => onViewChange?.('right')} />
                <Hotspot label="Left" position={[1.1, 0, 0]} onClick={() => onViewChange?.('left')} />
                <Hotspot label="Top" position={[0, 0.8, 0]} onClick={() => onViewChange?.('top')} />
                <Hotspot label="Front" position={[0, 0.2, 1.1]} onClick={() => onViewChange?.('front')} />
              </>
            )}

            {(currentView === 'left' || currentView === 'right' || currentView === 'top') && (
              <>
                <Hotspot label="Front" position={[0, 0.2, 1.0]} onClick={() => onViewChange?.('front')} />
                <Hotspot label="Rear" position={[0, 0.3, -1.1]} onClick={() => onViewChange?.('back')} />
              </>
            )}
          </group>
        )}
      </group>
    </group>
  );
}

const HeroStarStreaks = ({ progress }: { progress: number }) => {
  const count = 400;
  const [lines, colors] = useMemo(() => {
    const positions = new Float32Array(count * 6);
    const colors = new Float32Array(count * 6);
    const colorPalette = ["#00f3ff", "#ffffff", "#0078ff", "#a5f3fc", "#ffffff"];

    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 30;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.random() * -1000;
      const length = 40 + Math.random() * 60;
      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = z - length;
      const color = new THREE.Color(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
      colors[i * 6] = color.r;
      colors[i * 6 + 1] = color.g;
      colors[i * 6 + 2] = color.b;
      colors[i * 6 + 3] = color.r * 0.1;
      colors[i * 6 + 4] = color.g * 0.1;
      colors[i * 6 + 5] = color.b * 0.1;
    }
    return [positions, colors];
  }, []);

  const meshRef = useRef<THREE.LineSegments>(null);
  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    const speed = 5;
    for (let i = 0; i < count; i++) {
      pos[i * 6 + 2] += speed;
      pos[i * 6 + 5] += speed;
      if (pos[i * 6 + 2] > 100) {
        pos[i * 6 + 2] = -1000;
        pos[i * 6 + 5] = -1060;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={[0, 2, 0]}>
      <lineSegments ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={lines.length / 3} array={lines} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={Math.min(0.3, progress) * (1 - Math.pow(progress, 15))} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
};

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [isModelFixed, setIsModelFixed] = useState(false);
  const [modelScaleProgress, setModelScaleProgress] = useState(0);
  const [activeView, setActiveView] = useState<'front' | 'back' | 'left' | 'right' | 'top'>('front');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const splitText = (text: string, isGradient: boolean = false) => {
    return text.split("").map((char, index) => {
      if (char === " ") return <span key={index}>&nbsp;</span>;
      return (
        <span
          key={index}
          className={`title-char inline-block ${
            isGradient
              ? "bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent"
              : "text-white"
          }`}
        >
          {char}
        </span>
      );
    });
  };

  const viewRotations: Record<string, [number, number, number]> = {
    front: [0.2, 0, 0], // Slight tilt downwards
    back: [0, Math.PI, 0],
    left: [0, -Math.PI / 2, 0],
    right: [0, Math.PI / 2, 0],
    top: [Math.PI / 2, 0, 0],
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Sequence 1: Intro Text Entrance with Split Character stagger
    tl.set(introRef.current, { opacity: 1 })
      .fromTo(".intro-badge", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" })
      .fromTo(".title-char",
        { opacity: 0, y: 60, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.015, duration: 1.0, ease: "back.out(1.5)" },
        "-=0.4"
      )
      .fromTo(".intro-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      // Sequence 2: Reveal rest of Hero UI
      .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 1.5, transformOrigin: "left center" }, "-=0.5")
      .fromTo(".hero-tag", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8 }, "-=1.0")
      .fromTo(".hero-role", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.8")
      .fromTo(".hero-marquee", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

    // Marquee scroll translation
    gsap.to(".hero-marquee-wrapp", {
      xPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 2.5,
      }
    });

    if (textRef.current) {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%", // Increased scroll distance to slow down the progress
          scrub: 2.5,    // Smoother and slower follow speed

          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const scaleStart = 0.05;
            const scaleEnd = 0.85;
            const progress = self.progress;
            const clampedProgress = gsap.utils.clamp(scaleStart, scaleEnd, progress);
            const newScale = gsap.utils.mapRange(scaleStart, scaleEnd, 0, 1, clampedProgress);
            setModelScaleProgress(newScale);
            setIsModelFixed(progress > scaleEnd);

            // Intro text scroll behavior
            if (introRef.current) {
              if (progress > 0) {
                // If the user scrolls while entrance is playing, snap to end of entrance
                if (tl.isActive()) tl.progress(1);

                // Scrub the text away over the first 15% of scroll
                const introScroll = gsap.utils.clamp(0, 1, progress / 0.15);
                gsap.set(introRef.current, {
                  opacity: 1 - introScroll,
                  y: -introScroll * 400, // Move upwards as it fades
                  scale: 1 + introScroll * 0.2, // Expand slightly
                  filter: `blur(${introScroll * 15}px)`
                });
              } else if (progress === 0 && !tl.isActive()) {
                // Reset to fully visible when scrolled all the way back up
                gsap.set(introRef.current, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
              }
            }
          }
        }
      });
    }
  }, { scope: sectionRef });

  useEffect(() => {
    if (isModelFixed) {
      setText("AI/ML Developer");
      return;
    }

    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setIsDeleting(true), 1500);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, isModelFixed]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-end px-4 sm:px-6 lg:px-20 xl:px-32 pb-4 overflow-hidden bg-background border-b border-border z-20 w-full max-w-full">
      <div className="absolute inset-x-0 top-0 h-px bg-border/40" />
      <div className="absolute inset-y-0 left-[10%] w-px bg-border/20 hidden md:block" />
      <div className="absolute inset-y-0 right-[10%] w-px bg-border/20 hidden md:block" />

      {/* Main Intro Text Overlay */}
      <div
        ref={introRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-start md:justify-center pt-16 xs:pt-20 md:pt-0 px-6 text-center opacity-0"
      >
        <span className="intro-badge mb-2 md:mb-4 rounded-full border border-primary/30 bg-primary/10 px-4 md:px-5 py-1.5 md:py-2 text-[10px] md:text-xs uppercase tracking-[0.35em] text-primary backdrop-blur-xl opacity-0">
          Software Developer • MCA Student
        </span>

        <h1
          className="max-w-6xl text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight"
          style={{ fontFamily: "'Rubik Mono One'" }}
        >
          <div className="block">{splitText("Building")}</div>
          <div className="block my-1 sm:my-2">{splitText("Scalable Digital", true)}</div>
          <div className="block">{splitText("Products")}</div>
        </h1>

        <p className="intro-desc mt-4 md:mt-8 max-w-3xl text-xs xs:text-sm md:text-lg lg:text-xl text-gray-400 leading-6 xs:leading-7 md:leading-8 opacity-0">
          Passionate about creating scalable web applications, cross-platform
          mobile apps, and AI-driven solutions using React, Django, Node.js,
          PostgreSQL, and AWS.
        </p>
      </div>

      <div className="middle-3d-model absolute inset-0 z-0 pointer-events-auto flex items-center justify-center overflow-hidden transition-opacity duration-500" style={{ opacity: modelScaleProgress > 0.01 ? 1 : 0 }}>
        <Canvas dpr={[1, 2]} camera={{ fov: 45, position: [0, 0, 15] }} className="w-full h-full">
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={1.5 + (modelScaleProgress * 2)} />
          <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2 + (modelScaleProgress * 10)} color="#ffffff" />
          <spotLight position={[0, 5, 5]} angle={0.3} penumbra={0.8} intensity={modelScaleProgress * 15} color="#00f3ff" />
          <pointLight position={[-10, -10, -10]} intensity={1 + (modelScaleProgress * 3)} />
          <Stars radius={100} depth={50} count={Math.floor(modelScaleProgress * 5000)} factor={4} saturation={0} fade speed={1} />
          <group position={[0, isMobile ? 1.8 : 0, 0]}>
            <HeroStarStreaks progress={modelScaleProgress} />
          </group>
          <PresentationControls global cursor={false} speed={4} config={{ mass: 1, tension: 1000 }} snap={{ mass: 2, tension: 1500 }} rotation={[0, 0, 0]} polar={[-Math.PI / 2, Math.PI / 2]} azimuth={[-Math.PI, Math.PI]}>
            <group position={[0, isMobile ? 1.8 : 0, 0]}>
              <StarfighterModel isFixed={isModelFixed} scrollScale={modelScaleProgress} targetBaseRotation={viewRotations[activeView]} currentView={activeView} onViewChange={setActiveView} />
            </group>
          </PresentationControls>
        </Canvas>
      </div>

      {/* Horizontal Sliding Marquee from other project */}
      <div className="hero-marquee absolute bottom-[185px] lg:bottom-[155px] left-0 w-full overflow-hidden bg-black/45 py-3 border-y border-white/5 pointer-events-none z-10 opacity-0">
        <div className="hero-marquee-wrapp flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-500/85 px-6">
              <span>React</span>
              <span className="text-primary">•</span>
              <span>Django</span>
              <span className="text-primary">•</span>
              <span>PostgreSQL</span>
              <span className="text-primary">•</span>
              <span>React Native</span>
              <span className="text-primary">•</span>
              <span>AWS</span>
              <span className="text-primary">•</span>
              <span>AI & Machine Learning</span>
              <span className="text-primary">•</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={textRef} className="relative z-10 w-full max-w-[90rem] mx-auto pointer-events-none">
        <div className="border-t border-border pt-6 lg:pt-8 relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 min-h-[140px] lg:min-h-0 pointer-events-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:gap-24">
            {/* Desktop/Tablet Name Section */}
            <div className="hero-tag hidden lg:block">
              <div className="hero-line h-[2px] w-12 bg-primary mb-6" />
              <p className="text-muted-foreground font-medium tracking-widest uppercase text-xs mb-2"></p>
              <p className="text-foreground text-xl md:text-2xl font-bold">Santhosh Kannan</p>
            </div>

            <div className="hero-role flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-auto">
              <div className="hero-tag lg:hidden mb-4 flex flex-col items-center">
                <div className="hero-line h-[2px] w-12 bg-primary mb-4" />
                <p className="text-muted-foreground font-medium tracking-widest uppercase text-xs mb-2"></p>
                <p className="text-foreground text-xl font-bold">Santhosh Kannan</p>
              </div>
              <p className="text-xl lg:text-2xl text-muted-foreground h-8 font-sans font-light tracking-wide flex items-center justify-center lg:justify-start">
                <span className="text-foreground font-medium mr-2">Role:</span> {text}<span className="animate-pulse text-primary ml-1">|</span>
              </p>
            </div>
          </div>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto pointer-events-auto">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="h-fit w-full lg:w-auto px-8 py-3.5 md:py-4 bg-primary text-black font-semibold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300 pointer-events-auto">View Projects</button>
            <div className="flex flex-row gap-3 sm:gap-4 w-full lg:w-auto pointer-events-auto">
              <a href="/SANTHOSH_KANNAN.pdf" download="SANTHOSH_KANNAN.pdf" className="flex-1 lg:flex-none px-4 lg:px-8 py-3.5 md:py-4 border border-border text-foreground font-medium text-sm hover:border-primary hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"><Download size={16} /> Resume</a>
              <a href="mailto:santhoshkannan.dev@gmail.com" className="flex-1 lg:flex-none px-4 lg:px-8 py-3.5 md:py-4 border border-border text-foreground font-medium text-sm hover:border-primary hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"><Send size={16} /> Contact</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 animate-bounce text-muted-foreground hover:text-primary transition-colors hidden md:block relative z-10">
          <ArrowDown size={32} strokeWidth={1} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
