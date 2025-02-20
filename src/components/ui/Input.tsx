import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  error,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      <input
        ref={ref}
        className={twMerge(clsx(
          'w-full px-4 py-2 rounded-lg bg-gray-700 border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors',
          error ? 'border-red-500' : 'border-gray-600',
          className
        ))}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;