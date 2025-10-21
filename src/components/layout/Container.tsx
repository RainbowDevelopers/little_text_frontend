import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

/**
 * Container component with consistent max-width and padding
 * Follows the design system: wider max-width for better content display
 */
export default function Container({
  children,
  className,
  size = 'default'
}: ContainerProps) {
  const maxWidth = {
    default: 'max-w-[1440px]', // 1440px for wider content area
    narrow: 'max-w-3xl',       // 768px for About/Contact
    wide: 'max-w-full',        // Full width
  };

  return (
    <div
      className={cn(
        'mx-auto w-full',
        'px-6 md:px-10 lg:px-12',
        maxWidth[size],
        className
      )}
    >
      {children}
    </div>
  );
}
