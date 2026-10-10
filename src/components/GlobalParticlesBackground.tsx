import React, { useEffect, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import Particles from './Particles';

const darkColors = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#67E8F9', '#86EFAC'];
const lightColors = ['#8B5CF6', '#0891B2', '#059669', '#8B5CF6'];

const GlobalParticlesBackground: React.FC = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? (resolvedTheme || theme) : 'dark';
  const isDark = activeTheme !== 'light';

  const particleColors = useMemo(() => {
    return isDark ? darkColors : lightColors;
  }, [isDark]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <Particles
        particleColors={particleColors}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        particleHoverFactor={1}
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1}
        className="w-full h-full"
      />
    </div>
  );
};

export default GlobalParticlesBackground;
