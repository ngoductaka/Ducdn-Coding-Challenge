import { cx, generateId } from '@company/utils';

export interface CardOptions {
  /**
   * Card variant
   */
  variant?: 'elevated' | 'outlined' | 'filled';
  
  /**
   * Card padding
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  
  /**
   * Card content (HTML string or element)
   */
  content: string | HTMLElement;
  
  /**
   * Additional class names
   */
  className?: string;
  
  /**
   * Click handler (makes card interactive)
   */
  onClick?: (event: MouseEvent) => void;
}

/**
 * Create a vanilla card element
 */
export function createCard(options: CardOptions): HTMLDivElement {
  const {
    variant = 'elevated',
    padding = 'md',
    content,
    className,
    onClick,
  } = options;

  const card = document.createElement('div');
  card.id = generateId('card');
  
  // Add classes
  card.className = cx(
    'ds-card',
    `ds-card--${variant}`,
    `ds-card--padding-${padding}`,
    onClick ? 'ds-card--interactive' : '',
    className
  );
  
  // Add content
  if (typeof content === 'string') {
    card.innerHTML = content;
  } else {
    card.appendChild(content);
  }
  
  // Add click handler
  if (onClick) {
    card.addEventListener('click', onClick);
    card.tabIndex = 0;
    card.role = 'button';
  }
  
  return card;
}

/**
 * Create card header element
 */
export function createCardHeader(content: string | HTMLElement): HTMLDivElement {
  const header = document.createElement('div');
  header.className = 'ds-card__header';
  
  if (typeof content === 'string') {
    header.innerHTML = content;
  } else {
    header.appendChild(content);
  }
  
  return header;
}

/**
 * Create card title element
 */
export function createCardTitle(text: string): HTMLHeadingElement {
  const title = document.createElement('h3');
  title.className = 'ds-card__title';
  title.textContent = text;
  return title;
}

/**
 * Create card content element
 */
export function createCardContent(content: string | HTMLElement): HTMLDivElement {
  const contentDiv = document.createElement('div');
  contentDiv.className = 'ds-card__content';
  
  if (typeof content === 'string') {
    contentDiv.innerHTML = content;
  } else {
    contentDiv.appendChild(content);
  }
  
  return contentDiv;
}
