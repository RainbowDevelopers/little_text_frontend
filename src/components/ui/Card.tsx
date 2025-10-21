import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card component with subtle shadow and optional hover effect
 * Follows minimalist design: white background, subtle shadows
 */
export default function Card({
  children,
  className,
  hover = false,
  padding = 'md',
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800',
        'shadow-sm',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
