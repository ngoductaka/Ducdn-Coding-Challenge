import React, { forwardRef, InputHTMLAttributes } from 'react';
import * as styles from './Checkbox.css';
import { clsx } from 'clsx';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  label?: string;
  helperText?: string;
  size?: 'default' | 'small';
  counter?: boolean;
  counterValue?: number;
  required?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      size = 'default',
      counter = false,
      counterValue = 9999,
      required,
      indeterminate = false,
      className,
      id,
      disabled,
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36)}`;

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={clsx(styles.checkboxWrapper, className)}>
        <label htmlFor={checkboxId} className={styles.checkboxLabel}>
          <div className={styles.checkboxContainer}>
            <input
              ref={inputRef}
              id={checkboxId}
              type="checkbox"
              className={styles.checkboxInput}
              disabled={disabled}
              required={required}
              checked={checked}
              onChange={onChange}
              {...props}
            />
            <span
              className={clsx(
                styles.checkboxControl,
                styles.checkboxSize[size],
                indeterminate && styles.indeterminateState
              )}
              aria-hidden="true"
            />
          </div>

          {label && (
            <div className={styles.labelContainer}>
              <span className={clsx(styles.label, styles.labelSize[size])}>
                {label}
                {required && (
                  <span
                    aria-label="required"
                    style={{ color: 'var(--colors-feedback-error)', marginLeft: '0.25rem' }}
                  >
                    *
                  </span>
                )}
              </span>
            </div>
          )}

          {counter && counterValue && (
            <span className={styles.counter} aria-label={`Count: ${counterValue}`}>
              {counterValue}
            </span>
          )}
        </label>

        {helperText && (
          <span className={clsx(styles.helperText, styles.helperGap[size])}>{helperText}</span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
