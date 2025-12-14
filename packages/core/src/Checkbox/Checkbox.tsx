import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
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

const CheckboxComponent = forwardRef<HTMLInputElement, CheckboxProps>(
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

CheckboxComponent.displayName = 'Checkbox';

export interface CheckboxGroupOption {
  label: string;
  value: string;
  disabled?: boolean;
  helperText?: string;
}

export interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  disabled?: boolean;
  options?: Array<CheckboxGroupOption | string>;
  children?: React.ReactNode;
  className?: string;
  name?: string;
}

export const CheckboxGroup = ({
  value,
  defaultValue,
  onChange,
  disabled = false,
  options = [],
  children,
  className = '',
  name,
}: CheckboxGroupProps) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue || []);
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (checkboxValue: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked
      ? [...currentValue, checkboxValue]
      : currentValue.filter(v => v !== checkboxValue);

    if (value === undefined) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  if (options.length > 0) {
    return (
      <div className={clsx(styles.checkboxWrapper, className)} role="group">
        {options.map(option => {
          const opt: CheckboxGroupOption =
            typeof option === 'string' ? { label: option, value: option } : option;
          return (
            <Checkbox
              key={opt.value}
              value={opt.value}
              checked={currentValue.includes(opt.value)}
              disabled={disabled || opt.disabled}
              onChange={handleChange(opt.value)}
              label={opt.label}
              helperText={opt.helperText}
              name={name}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={clsx(styles.checkboxWrapper, className)} role="group">
      {React.Children.map(children, child => {
        if (React.isValidElement<CheckboxProps>(child) && child.type === Checkbox) {
          const childValue = child.props.value?.toString() || '';
          return React.cloneElement(child as React.ReactElement<any>, {
            checked: currentValue.includes(childValue),
            onChange: handleChange(childValue),
            disabled: disabled || child.props.disabled,
            name: name || child.props.name,
          });
        }
        return child;
      })}
    </div>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export const Checkbox = CheckboxComponent as typeof CheckboxComponent & {
  CheckboxGroup: typeof CheckboxGroup;
};

Checkbox.CheckboxGroup = CheckboxGroup;
