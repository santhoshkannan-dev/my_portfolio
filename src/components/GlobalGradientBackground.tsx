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
        opacity: 0.65,
      }
    : {
        horizonColor: '#E9E4FF',
        waveColor: '#F4C7ED',
        crestColor: '#FFFFFF',
        opacity: 0.35,
      };

  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <GradientWaves
        {...themeColors}
        speed={0.4}
        amplitude={2.5}
        waveScale={0.6}
        waveRatio={0.9}
        swell={35}
        turbulence={20}
        tilt={1.11}
        zoom={1.0}
        height={5.5}
        fogDepth={15}
        detail="medium"
        brightness={1.0}
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
