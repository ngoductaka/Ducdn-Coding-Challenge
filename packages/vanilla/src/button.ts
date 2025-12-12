import { cx, generateId } from '@company/utils';

export interface ButtonOptions {
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Button text
   */
  text: string;
  
  /**
   * Click handler
   */
  onClick?: (event: MouseEvent) => void;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Additional class names
   */
  className?: string;
}

/**
 * Create a vanilla button element
 */
export function createButton(options: ButtonOptions): HTMLButtonElement {
  const {
    variant = 'primary',
    size = 'md',
    text,
    onClick,
    disabled = false,
    className,
  } = options;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = text;
  button.disabled = disabled;
  button.id = generateId('btn');
  
  // Add classes
  button.className = cx(
    'ds-button',
    `ds-button--${variant}`,
    `ds-button--${size}`,
    className
  );
  
  // Add click handler
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  
  return button;
}

/**
 * Update button properties
 */
export function updateButton(
  button: HTMLButtonElement,
  updates: Partial<ButtonOptions>
): void {
  if (updates.text !== undefined) {
    button.textContent = updates.text;
  }
  
  if (updates.disabled !== undefined) {
    button.disabled = updates.disabled;
  }
  
  if (updates.variant !== undefined) {
    // Remove old variant class
    button.className = button.className
      .split(' ')
      .filter(cls => !cls.startsWith('ds-button--'))
      .join(' ');
    
    // Add new variant class
    button.classList.add(`ds-button--${updates.variant}`);
  }
  
  if (updates.size !== undefined) {
    // Remove old size class
    button.className = button.className
      .split(' ')
      .filter(cls => !cls.match(/ds-button--(sm|md|lg)$/))
      .join(' ');
    
    // Add new size class
    button.classList.add(`ds-button--${updates.size}`);
  }
}
