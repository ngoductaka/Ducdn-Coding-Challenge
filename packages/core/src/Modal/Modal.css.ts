import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@company/tokens';
import { radii, shadows, durations } from '@company/tokens';

/**
 * Animations
 */
const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-20px) scale(0.95)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },
});

/**
 * Overlay (backdrop)
 */
export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: vars.spacing[4],

  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${fadeIn} 200ms ease-out`,
    },
  },
});

/**
 * Modal container
 */
export const modal = style({
  backgroundColor: vars.colors.background.primary,
  borderRadius: radii.lg,
  boxShadow: shadows.xl,
  maxWidth: '600px',
  width: '100%',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  ':focus': {
    outline: 'none',
  },

  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${slideIn} 200ms ease-out`,
    },
  },
});

/**
 * Modal header
 */
export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: vars.spacing[6],
  borderBottom: `1px solid ${vars.colors.border.default}`,
  flexShrink: 0,
});

/**
 * Modal title
 */
export const title = style({
  fontSize: vars.typography.fontSize['2xl'],
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.text.primary,
  margin: 0,
});

/**
 * Close button
 */
export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '44px',
  minHeight: '44px',
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: vars.colors.text.secondary,
  cursor: 'pointer',
  borderRadius: radii.md,
  transition: `all ${durations.fast}`,

  ':hover': {
    backgroundColor: vars.colors.background.tertiary,
    color: vars.colors.text.primary,
  },

  ':focus-visible': {
    outline: `2px solid ${vars.colors.action.primary}`,
    outlineOffset: '2px',
  },
});

/**
 * Modal content
 */
export const content = style({
  padding: vars.spacing[6],
  overflowY: 'auto',
  flex: 1,
  color: vars.colors.text.primary,
});

/**
 * Modal footer
 */
export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: vars.spacing[3],
  padding: vars.spacing[6],
  borderTop: `1px solid ${vars.colors.border.default}`,
  flexShrink: 0,
});
