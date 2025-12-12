import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import * as styles from './Radio.css';
import { clsx } from 'clsx';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Label for the radio
   */
  label?: string;

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
const RadioComponent = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
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
              {...props}
            />
            <span
              className={clsx(styles.radioControl, styles.radioSize[size])}
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
            <span className={clsx(styles.counter)} aria-label={`Count: ${counterValue}`}>
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

RadioComponent.displayName = 'Radio';

// RadioGroup Component Types
export interface RadioGroupOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /**
   * Current selected value (controlled)
   */
  value?: string;

  /**
   * Default selected value (uncontrolled)
   */
  defaultValue?: string;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;

  /**
   * Disable all radio buttons
   * @default false
   */
  disabled?: boolean;

  /**
   * Options array for rendering radios
   */
  options?: Array<RadioGroupOption | string>;

  /**
   * Radio components as children
   */
  children?: React.ReactNode;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Name attribute for all radios in the group
   */
  name?: string;
}

/**
 * RadioGroup component for managing a group of Radio components
 */
export const RadioGroup = ({
  value,
  defaultValue,
  onChange,
  disabled = false,
  options = [],
  children,
  className = '',
  name,
}: RadioGroupProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (value === undefined) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  // If options array is provided
  if (options.length > 0) {
    return (
      <div className={clsx(styles.radioGroupContainer, className)} role="radiogroup">
        {options.map(option => {
          const opt: RadioGroupOption =
            typeof option === 'string' ? { label: option, value: option } : option;
          return (
            <Radio
              key={opt.value}
              value={opt.value}
              checked={currentValue === opt.value}
              disabled={disabled || opt.disabled}
              onChange={handleChange}
              label={opt.label}
              name={name}
            />
          );
        })}
      </div>
    );
  }

  // If children are provided
  return (
    <div className={clsx(styles.radioGroupContainer, className)} role="radiogroup">
      {React.Children.map(children, child => {
        if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
          return React.cloneElement(child, {
            checked: currentValue === child.props.value,
            onChange: handleChange,
            disabled: disabled || child.props.disabled,
            name: name || child.props.name,
          });
        }
        return child;
      })}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';

export const Radio = RadioComponent as typeof RadioComponent & {
  RadioGroup: typeof RadioGroup;
};

Radio.RadioGroup = RadioGroup;
