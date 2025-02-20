import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'hover:bg-gray-800 text-gray-300 hover:text-white'
  };

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-11 px-8 text-lg'
  };

  return (
    <button
      ref={ref}
      className={twMerge(clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      ))}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </>
      ) : children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;