import React, { forwardRef, InputHTMLAttributes } from 'react';
import * as styles from './Radio.css';
import { clsx } from 'clsx';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Label for the radio
   */
  label?: string;

  /**
   * Caption text shown below the label
   */
  caption?: string;

  /**
   * Helper text shown to the right (counter position)
   */
  helperText?: string;

  /**
   * Size variant
   * @default 'large'
   */
  size?: 'large' | 'small';

  /**
   * Whether to show a counter
   */
  counter?: boolean;

  /**
   * Counter value to display
   */
  counterValue?: number;

  /**
   * Whether the radio is required
   */
  required?: boolean;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Radio component for single selection from mutually exclusive options
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      caption,
      helperText,
      size = 'large',
      counter = false,
      counterValue = 9999,
      required,
      className,
      id,
      disabled,
      checked,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    const captionId = caption ? `${radioId}-caption` : undefined;

    return (
      <div className={clsx(styles.radioWrapper, className)}>
        <label htmlFor={radioId} className={styles.radioLabel}>
          <div className={styles.radioContainer}>
            <input
              ref={ref}
              id={radioId}
              type="radio"
              className={styles.radioInput}
              disabled={disabled}
              required={required}
              checked={checked}
              value={value}
              onChange={onChange}
              aria-describedby={captionId}
              {...props}
            />
            <span
              className={clsx(styles.radioControl, styles.radioSize[size])}
              aria-hidden="true"
            />
          </div>

          {(label || caption) && (
            <div className={styles.labelContainer}>
              {label && (
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
              )}
              {caption && (
                <span id={captionId} className={clsx(styles.caption, styles.captionSize[size])}>
                  {caption}
                </span>
              )}
            </div>
          )}

          {counter && counterValue && (
            <span className={styles.counter} aria-label={`Count: ${counterValue}`}>
              {counterValue}
            </span>
          )}
        </label>

        {helperText && <span className={styles.helperText}>{helperText}</span>}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
