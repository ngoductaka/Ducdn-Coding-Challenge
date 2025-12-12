import React, { useEffect, useRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import * as styles from './Modal.css';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Callback when modal should close
   */
  onClose: () => void;

  /**
   * Modal title (for accessibility)
   */
  title: string;

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Modal footer content
   */
  footer?: React.ReactNode;

  /**
   * Whether to close on overlay click
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Whether to close on Escape key
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Modal component with full accessibility support
 * Follows WAI-ARIA dialog pattern
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
}) => {
  const titleId = useRef(`modal-title-${Math.random().toString(36).substr(2, 9)}`);
  const contentId = useRef(`modal-content-${Math.random().toString(36).substr(2, 9)}`);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Store previously focused element
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    // Restore focus on unmount
    return () => {
      previouslyFocusedElement.current?.focus();
    };
  }, [isOpen]);

  // Escape key handling
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEsc, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Prevent scroll
    document.body.style.overflow = 'hidden';

    // Compensate for scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const modalElements = Array.from(focusableElements).filter(el =>
        el.closest('[role="dialog"]')
      );

      if (modalElements.length === 0) return;

      const firstElement = modalElements[0] as HTMLElement;
      const lastElement = modalElements[modalElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick} aria-hidden="false">
      <div
        className={className ? `${styles.modal} ${className}` : styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId.current}
        aria-describedby={contentId.current}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id={titleId.current} className={styles.title}>
            {title}
          </h2>

          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close dialog"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div id={contentId.current} className={styles.content}>
          {children}
        </div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
};
