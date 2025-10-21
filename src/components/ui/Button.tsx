import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Button component with multiple variants
 * Follows Apple-inspired design: clean, high contrast, generous padding
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  onClick,
  disabled = false,
  className,
  icon,
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  );

  const variantStyles = {
    primary: cn(
      'bg-gradient-dark dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 text-white',
      'hover:bg-gradient-subtle hover:scale-[1.02]',
      'active:scale-[0.98]',
      'shadow-md hover:shadow-lg'
    ),
    secondary: cn(
      'bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white',
      'hover:bg-gradient-to-r hover:from-gray-50 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800 hover:scale-[1.02]',
      'active:scale-[0.98]'
    ),
    ghost: cn(
      'bg-transparent text-black dark:text-white',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      'active:bg-gray-200 dark:active:bg-gray-700'
    ),
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  // Render as Link if href is provided
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {icon && <span>{icon}</span>}
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
