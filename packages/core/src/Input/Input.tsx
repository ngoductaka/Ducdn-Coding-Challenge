import React, { forwardRef, InputHTMLAttributes } from 'react';
import * as styles from './Input.css';
import { clsx } from 'clsx';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Label for the input
   */
  label?: string;

  /**
   * Helper text shown below the input
   */
  helperText?: string;

  /**
   * Error message (shows error state when provided)
   */
  error?: string;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Icon to display on the left
   */
  iconLeft?: React.ReactNode;

  /**
   * Icon to display on the right
   */
  iconRight?: React.ReactNode;

  /**
   * Whether the input is required
   */
  required?: boolean;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Input component with label, helper text, and error states
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      iconLeft,
      iconRight,
      required,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const hasError = !!error;
    const state = hasError ? 'error' : 'default';

    return (
      <div className={className}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && (
              <span
                aria-label="required"
                style={{ color: 'var(--colors-feedback-error)', marginLeft: '0.25rem' }}
              >
                *
              </span>
            )}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {iconLeft && (
            <span className={styles.iconLeft} aria-hidden="true">
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={clsx(
              styles.inputBase,
              styles.inputSize[size],
              styles.inputState[state],
              iconLeft && styles.inputWithIcon
            )}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            {...props}
          />

          {iconRight && (
            <span className={styles.iconRight} aria-hidden="true">
              {iconRight}
            </span>
          )}
        </div>

        {error && (
          <span id={errorId} className={styles.errorMessage} role="alert">
            {error}
          </span>
        )}

        {helperText && !error && (
          <span id={helperId} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
