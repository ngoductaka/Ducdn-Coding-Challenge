import React, { forwardRef } from 'react';
import { cx } from '@company/utils';
import * as styles from './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

  /**
   * Button size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Makes button full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Button component with multiple variants and sizes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(
          styles.button({
            variant,
            size,
            fullWidth,
          }),
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
