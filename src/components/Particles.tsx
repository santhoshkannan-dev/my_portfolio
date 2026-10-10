'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';
import './Particles.css';

export interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
  className?: string;
}

interface ParticlesContext {
  renderer: Renderer;
  camera: Camera;
  geometry: Geometry;
  program: Program;
  mesh: Mesh;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
}

const defaultColors = ['#ffffff', '#ffffff', '#ffffff'];

const hexToRgb = (hex: string): [number, number, number] => {
  let cleaned = hex.replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map(c => c + c)
      .join('');
  }
  const int = parseInt(cleaned.slice(0, 6), 16);
  if (isNaN(int)) return [1, 1, 1];
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

const ctxMap = new WeakMap<HTMLDivElement, ParticlesContext>();

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio = 1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer | null = null;
    try {
      renderer = new Renderer({
        dpr: pixelRatio,
        depth: false,
        alpha: true
      });
    } catch {
      setWebGlSupported(false);
      return;
    }

    if (!renderer || !renderer.gl) {
      setWebGlSupported(false);
      return;
    }

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      if (!renderer || !container) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };

    window.addEventListener('resize', resize, false);
    resize();

    // Window-level mouse movement listener so pointer-events: none on container allows hover tracking
    const handleMouseMove = (e: MouseEvent | PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current = { x, y };
      }
    };

    if (moveParticlesOnHover) {
      window.addEventListener('pointermove', handleMouseMove, { passive: true });
    }

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

    for (let i = 0; i < count; i++) {
      let x: number, y: number, z: number, len: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors }
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * pixelRatio },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 }
      },
      transparent: true,
      depthTest: false
    });

    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    ctxMap.set(container, { renderer, camera, geometry, program, mesh, gl });

    let animationFrameId = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    let lastTime = performance.now();
    let elapsed = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = (t: number) => {
      const delta = t - lastTime;
      lastTime = t;
      const activeSpeed = prefersReducedMotion ? 0.01 : speed;
      elapsed += delta * activeSpeed;

      program.uniforms.uTime.value = elapsed * 0.001;

      if (moveParticlesOnHover) {
        mesh.position.x = -mouseRef.current.x * particleHoverFactor;
        mesh.position.y = -mouseRef.current.y * particleHoverFactor;
      } else {
        mesh.position.x = 0;
        mesh.position.y = 0;
      }

      if (!disableRotation && !prefersReducedMotion) {
        mesh.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        mesh.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        mesh.rotation.z += 0.01 * activeSpeed;
      }

      renderer.render({ scene: mesh, camera });
      animationFrameId = requestAnimationFrame(update);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && animationFrameId === 0) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(update);
      }
    };

    const tryStop = () => {
      if (animationFrameId !== 0) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          tryStart();
        } else {
          tryStop();
        }
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        tryStart();
      } else {
        tryStop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    tryStart();

    return () => {
      tryStop();
      window.removeEventListener('resize', resize);
      if (moveParticlesOnHover) {
        window.removeEventListener('pointermove', handleMouseMove);
      }
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      ctxMap.delete(container);
      try {
        if (canvas.parentNode === container) {
          container.removeChild(canvas);
        }
      } catch (err) {
        void err;
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    pixelRatio
  ]);

  // Safely update particle colors when particleColors changes without re-creating WebGL renderer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = ctxMap.get(container);
    if (!ctx) return;
    const { geometry } = ctx;

    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;
    const colorAttr = geometry.attributes.color;
    if (colorAttr && colorAttr.data) {
      const data = colorAttr.data as Float32Array;
      const count = particleCount;
      for (let i = 0; i < count; i++) {
        const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
        data[i * 3] = col[0];
        data[i * 3 + 1] = col[1];
        data[i * 3 + 2] = col[2];
      }
      colorAttr.needsUpdate = true;
    }
  }, [particleColors, particleCount]);

  if (!webGlSupported) {
    return (
      <div
        className={`particles-container ${className}`.trim()}
        style={{
          background: 'radial-gradient(circle at center, rgba(103, 232, 249, 0.15) 0%, transparent 70%)'
        }}
      />
    );
  }

  return <div ref={containerRef} className={`particles-container ${className}`.trim()} />;
};

export default Particles;
