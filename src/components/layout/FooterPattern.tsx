'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import Container from './Container';

export default function FooterPattern() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`relative overflow-hidden border-b ${
      isDark
        ? 'bg-gradient-to-b from-gray-900 to-black border-gray-800'
        : 'bg-gradient-to-b from-gray-100 to-white border-gray-200'
    }`}>
      <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-10'}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: isDark
            ? `
              linear-gradient(to right, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px),
              linear-gradient(to right, #ffffff 1px, transparent 1px)
            `
            : `
              linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%),
              linear-gradient(to bottom, #000000 1px, transparent 1px),
              linear-gradient(to right, #000000 1px, transparent 1px)
            `,
          backgroundSize: '200% 100%, 40px 40px, 40px 40px',
          animation: 'shimmer 8s linear infinite'
        }}></div>
      </div>
      <Container>
        <div className="relative py-12 md:py-16 lg:py-24 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              Stay Connected
            </h2>
            <p className={`text-base md:text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Join our community and never miss an update
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
