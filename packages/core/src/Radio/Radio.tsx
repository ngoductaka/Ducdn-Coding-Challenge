import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import * as styles from './Radio.css';
import { clsx } from 'clsx';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  helperText?: string;
  size?: 'large' | 'small';
  counter?: number;
  required?: boolean;
  className?: string;
}

const RadioComponent = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      helperText,
      size = 'large',
      counter,
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

          {counter !== undefined && (
            <span className={clsx(styles.counter)} aria-label={`Count: ${counter}`}>
              {counter}
            </span>
          )}
        </label>

        {helperText && (
          <span className={clsx(styles.helperText, styles.helperSize[size])}>{helperText}</span>
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
  const radioRefs = React.useRef<Map<string, HTMLInputElement>>(new Map());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (value === undefined) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const radioValues = Array.from(radioRefs.current.keys()).filter(val => {
      const radio = radioRefs.current.get(val);
      return radio && !radio.disabled;
    });

    if (radioValues.length === 0) return;

    const currentIndex = radioValues.indexOf(currentValue || '');

    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = currentIndex < radioValues.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : radioValues.length - 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = radioValues.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== -1 && nextIndex !== currentIndex) {
      const nextValue = radioValues[nextIndex];
      const nextRadio = radioRefs.current.get(nextValue);

      if (nextRadio) {
        nextRadio.click();
        nextRadio.focus();
      }
    }
  };

  if (options.length > 0) {
    return (
      <div
        className={clsx(styles.radioGroupContainer, className)}
        role="radiogroup"
        onKeyDown={handleKeyDown}
      >
        {options.map(option => {
          const opt: RadioGroupOption =
            typeof option === 'string' ? { label: option, value: option } : option;
          return (
            <Radio
              key={opt.value}
              ref={(el: HTMLInputElement | null) => {
                if (el) {
                  radioRefs.current.set(opt.value, el);
                } else {
                  radioRefs.current.delete(opt.value);
                }
              }}
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
    <div
      className={clsx(styles.radioGroupContainer, className)}
      role="radiogroup"
      onKeyDown={handleKeyDown}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
          const childValue = String(child.props.value || '');
          return React.cloneElement(child, {
            checked: currentValue === child.props.value,
            onChange: handleChange,
            disabled: disabled || child.props.disabled,
            name: name || child.props.name,
            ref: (el: HTMLInputElement | null) => {
              if (el) {
                radioRefs.current.set(childValue, el);
              } else {
                radioRefs.current.delete(childValue);
              }
            },
          } as any);
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
