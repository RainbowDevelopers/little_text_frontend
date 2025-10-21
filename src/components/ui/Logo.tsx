'use client';

import React from 'react';
import { useTheme } from 'next-themes';

interface LogoProps {
  className?: string;
  withSpotlight?: boolean;
}

/**
 * LittleText Logo Component
 * Simple, elegant text-based logo with optional spotlight effect
 * Automatically adapts to light/dark mode
 */
export default function Logo({ className = '', withSpotlight = false }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`relative inline-block ${className}`}>
      {withSpotlight ? (
        <div className="relative overflow-hidden inline-block">
          <div
            className="logo-spotlight-text"
            style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
              background: 'linear-gradient(90deg, #555 0%, #555 30%, #fff 50%, #555 70%, #555 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'spotlight-slide 3s linear infinite'
            }}
          >
            LittleText
          </div>
        </div>
      ) : (
        <svg
          viewBox="0 0 200 60"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#171717', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="logoGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#E5E5E5', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={isDark ? 'url(#logoGradientDark)' : 'url(#logoGradientLight)'}
            style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif'
            }}
          >
            LittleText
          </text>
        </svg>
      )}
    </div>
  );
}
