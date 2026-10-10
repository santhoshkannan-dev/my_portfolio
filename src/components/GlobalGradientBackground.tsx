import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import GradientWaves from './GradientWaves';

const GlobalGradientBackground: React.FC = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? (resolvedTheme || theme) : 'dark';
  const isDark = activeTheme !== 'light';

  const themeColors = isDark
    ? {
        horizonColor: '#5227FF',
        waveColor: '#FF9FFC',
        crestColor: '#FFFFFF',
        opacity: 0.75,
        brightness: 1.15,
        amplitude: 3.2,
      }
    : {
        horizonColor: '#E9E4FF',
        waveColor: '#F4C7ED',
        crestColor: '#FFFFFF',
        opacity: 0.45,
        brightness: 1.05,
        amplitude: 2.8,
      };

  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <GradientWaves
        {...themeColors}
        speed={0.45}
        waveScale={0.65}
        waveRatio={0.9}
        swell={35}
        turbulence={22}
        tilt={1.11}
        zoom={1.0}
        height={5.2}
        fogDepth={16}
        detail="medium"
        mouseInteraction={true}
        parallaxStrength={0.35}
        grain={true}
        grainIntensity={0.035}
        className="w-full h-full"
      />
    </div>
  );
};

export default GlobalGradientBackground;
