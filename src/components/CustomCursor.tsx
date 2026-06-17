import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    // Mouse position values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for smooth trailing effect
    const springConfig = { damping: 30, stiffness: 300, mass: 0.4 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handlePointerOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsPointer(true);
            } else {
                setIsPointer(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseover", handlePointerOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseover", handlePointerOver);
        };
    }, [cursorX, cursorY, isVisible]);

    // If on mobile/touch device, don't render the custom cursor
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* The outer glowing trail ring (Primary-colored soft glow) */}
            <motion.div
                className="fixed top-0 left-0 w-24 h-24 md:w-32 md:h-32 rounded-full pointer-events-none z-[9998] transition-opacity duration-300"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 0.25 : 0,
                    background: 'radial-gradient(circle, hsl(var(--primary)/0.4) 0%, rgba(0,0,0,0) 70%)'
                }}
            />

            {/* The custom code-themed cursor */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-25%",
                    translateY: "-25%",
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    scale: isPointer ? 1.25 : 1,
                }}
                transition={{ scale: { type: "spring", stiffness: 400, damping: 25 } }}
            >
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] filter"
                    fill="none"
                >
                    {/* Brackets and slash grouped under a motion.g with a primary glow */}
                    <g 
                      stroke="currentColor" 
                      strokeWidth="5.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-foreground"
                    >
                        {/* < Bracket */}
                        <motion.path
                            d="M 15 6 L 5 15 L 15 24"
                            animate={{ x: isPointer ? -4 : 0 }}
                            transition={{ duration: 0.2 }}
                            stroke="hsl(var(--primary))"
                            style={{ filter: "drop-shadow(0 0 3px hsl(var(--primary)/0.5))" }}
                        />
                        {/* / Slash */}
                        <motion.path
                            d="M 21 3 L 13 27"
                            animate={{ rotate: isPointer ? 12 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-foreground"
                        />
                        {/* > Bracket */}
                        <motion.path
                            d="M 25 6 L 35 15 L 25 24"
                            animate={{ x: isPointer ? 4 : 0 }}
                            transition={{ duration: 0.2 }}
                            stroke="hsl(var(--primary))"
                            style={{ filter: "drop-shadow(0 0 3px hsl(var(--primary)/0.5))" }}
                        />
                    </g>

                    {/* Pointer Arrow pointing to (25, 25) with neon border glow */}
                    <path
                        d="M 25 25 L 42 42 L 34 42 L 39 55 L 33 57 L 28 44 L 19 46 Z"
                        fill="hsl(var(--primary))"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        className="text-foreground"
                        style={{ filter: "drop-shadow(0 0 4px hsl(var(--primary)/0.6))" }}
                    />
                </svg>
            </motion.div>
        </>
    );
};

export default CustomCursor;
