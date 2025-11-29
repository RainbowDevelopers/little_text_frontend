'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Container from './Container';

export default function FooterPattern() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 25%, #1a1a1a 50%, #2d2d2d 75%, #1a1a1a 100%)'
              : 'linear-gradient(45deg, #f3f4f6 0%, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%, #f3f4f6 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 15s ease infinite'
          }}
        />
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-200 to-transparent" />
      
      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-200 to-transparent" />

      <Container>
        <div className="relative py-8 md:py-12 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-black dark:text-white">
              Stay Connected
            </h2>
            <p className="text-base md:text-lg mb-5 md:mb-6 text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for the latest stories and updates delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white placeholder-gray-500 focus:ring-black dark:focus:ring-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap bg-black dark:bg-white text-white dark:text-black"
              >
                Subscribe to Newsletter
              </button>
            </form>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
