import React, { useState, useEffect, useRef } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
    onFinished?: () => void;
    onComplete?: () => void;
    duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
    onFinished,
    onComplete,
    duration = 4200,
}) => {
    const [count, setCount] = useState<number>(0);
    const [fillPercent, setFillPercent] = useState<number>(0);
    const [status, setStatus] = useState<string>('INITIALIZING');
    const [isCompleting, setIsCompleting] = useState<boolean>(false);
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const [isFadeIn, setIsFadeIn] = useState<boolean>(false);

    const animationIdRef = useRef<number | null>(null);

    useEffect(() => {
        let currentProgress = 0;
        let targetProgress = 0;
        const startTime = performance.now();
        let lastFrameTime = performance.now();
        let isRunning = true;
        const timeouts: NodeJS.Timeout[] = [];

        const tick = (now: number) => {
            if (!isRunning) return;

            const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
            lastFrameTime = now;

            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);

            // Smooth cubic easing
            const easedT = t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;

            targetProgress = easedT * 100;

            const lerpSpeed = 7.5;
            const lerpFactor = 1 - Math.exp(-lerpSpeed * dt);
            currentProgress += (targetProgress - currentProgress) * lerpFactor;

            if (t >= 1 && (100 - currentProgress) < 0.25) {
                currentProgress = 100;
                updateDisplay(100);
                finish();
                return;
            }

            updateDisplay(currentProgress);
            animationIdRef.current = requestAnimationFrame(tick);
        };

        const updateDisplay = (val: number) => {
            const intVal = Math.min(Math.floor(val), 100);
            setCount(intVal);
            setFillPercent(val);

            if (intVal < 25) {
                setStatus('INITIALIZING');
            } else if (intVal < 60) {
                setStatus('LOADING');
            } else if (intVal < 90) {
                setStatus('SYNCING');
            } else if (intVal < 100) {
                setStatus('FINALIZING');
            } else {
                setStatus('READY');
            }
        };

        const finish = () => {
            isRunning = false;
            setIsCompleting(true);

            // 1. Expand circular iris reveal
            const t1 = setTimeout(() => {
                setIsRevealed(true);
            }, 200);

            // 2. Fade in "SANTHOSH KANNAN"
            const t2 = setTimeout(() => {
                setIsFadeIn(true);
            }, 550);

            // 3. Complete preloader and hand off to main portfolio
            const t3 = setTimeout(() => {
                if (onComplete) onComplete();
                if (onFinished) onFinished();
            }, 1650);

            timeouts.push(t1, t2, t3);
        };

        // Start animation loop
        animationIdRef.current = requestAnimationFrame(tick);

        return () => {
            isRunning = false;
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            timeouts.forEach(clearTimeout);
        };
    }, [duration, onComplete, onFinished]);

    return (
        <>
            {/* 1. Preloader Overlay */}
            <div
                id="km-preloader"
                className={`km-preloader ${isCompleting ? 'km-completing' : ''}`}
                role="progressbar"
                aria-label="Loading"
                aria-valuenow={count}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div className="km-container">
                    {/* Geometric Morphing Tiles Stage */}
                    <div className="km-stage-wrapper">
                        <span className="km-reticle km-reticle-tl" />
                        <span className="km-reticle km-reticle-tr" />
                        <span className="km-reticle km-reticle-bl" />
                        <span className="km-reticle km-reticle-br" />
                        <div className="km-stage">
                            <div className="km-tile km-tile-1" />
                            <div className="km-tile km-tile-2" />
                            <div className="km-tile km-tile-3" />
                            <div className="km-tile km-tile-4" />
                        </div>
                    </div>

                    {/* Tabular Progress Counter */}
                    <div className="km-counter-wrap">
                        <span id="km-count" className="km-number">
                            {count}
                        </span>
                        <span className="km-percent">%</span>
                    </div>

                    {/* Telemetry Status & Progress Track */}
                    <div className="km-telemetry-box">
                        <div className="km-meta-row">
                            <span className="km-title-tag">Loading...</span>
                            <span id="km-status" className="km-status-tag">
                                {status}
                            </span>
                        </div>
                        <div className="km-track-line">
                            <div
                                id="km-fill"
                                className="km-fill-line"
                                style={{ width: `${fillPercent.toFixed(2)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Revealed White Page (Circular Iris Reveal with SANTHOSH KANNAN) */}
            <main
                id="white-page"
                className={`km-white-page ${isRevealed ? 'km-reveal' : ''}`}
            >
                <h1 className={`km-greeting ${isFadeIn ? 'km-fade-in' : ''}`}>
                    SANTHOSH KANNAN
                </h1>
                <div className={`km-subgreeting ${isFadeIn ? 'km-fade-in' : ''}`}>
                    SOFTWARE DEVELOPER // FULL STACK
                </div>
            </main>
        </>
    );
};

export default LoadingScreen;
