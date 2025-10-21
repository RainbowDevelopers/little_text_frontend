'use client';

import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

/**
 * MouseSparkles component
 * Creates a sparkling effect that follows the mouse cursor on desktop
 * Automatically disabled on mobile/touch devices for better performance
 */
export default function MouseSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/tablet
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024; // Disable on screens smaller than 1024px
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Don't add sparkles on mobile devices
    if (isMobile) return;

    let sparkleId = 0;
    let lastSparkleTime = 0;
    const sparkleInterval = 50; // Create a sparkle every 50ms

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const now = Date.now();
      if (now - lastSparkleTime > sparkleInterval) {
        lastSparkleTime = now;

        const newSparkle: Sparkle = {
          id: sparkleId++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4, // Random size between 4-12px
          duration: Math.random() * 400 + 400, // Random duration 400-800ms
          delay: 0,
        };

        setSparkles((prev) => [...prev, newSparkle]);

        // Remove sparkle after animation completes
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
        }, newSparkle.duration);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            animationDuration: `${sparkle.duration}ms`,
          }}
        >
          {/* Star shape sparkle */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              className="fill-yellow-400 dark:fill-yellow-300"
              style={{
                filter: 'drop-shadow(0 0 2px rgba(250, 204, 21, 0.8))',
              }}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
