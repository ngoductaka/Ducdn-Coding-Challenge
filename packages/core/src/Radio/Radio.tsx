import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import * as styles from './Radio.css';
import { clsx } from 'clsx';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  helperText?: string;
  size?: 'large' | 'small';
  counter?: boolean;
  counterValue?: number;
  required?: boolean;
  className?: string;
}

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
              onChange={e => {
                if (!disabled && onChange) {
                  onChange(e);
                }
              }}
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

export interface RadioGroupOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  options?: Array<RadioGroupOption | string>;
  children?: React.ReactNode;
  className?: string;
  name?: string;
}

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
