import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@company/tokens';
import { radii, durations, easings } from '@company/tokens';

/**
 * Radio wrapper - container for the entire radio component
 */
export const radioWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[1],
});

/**
 * Radio label - clickable label containing radio and text
 */
export const radioLabel = style({
  display: 'inline-flex',
  alignItems: 'flex-start',
  gap: vars.spacing[2],
  cursor: 'pointer',
  position: 'relative',
  userSelect: 'none',
  width: '100%',

  selectors: {
    '&:has(input:disabled)': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

/**
 * Radio container - holds the input and custom control
 */
export const radioContainer = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  marginTop: '2px', // Align with text baseline
});

/**
 * Hidden radio input
 */
export const radioInput = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  cursor: 'pointer',

  ':disabled': {
    cursor: 'not-allowed',
  },
});

/**
 * Custom radio control (visible circle)
 */
export const radioControl = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  border: `2px solid ${vars.colors.border.default}`,
  backgroundColor: vars.colors.white,
  transition: `all ${durations.fast} ${easings.easeInOut}`,
  position: 'relative',
  flexShrink: 0,

  '::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: vars.colors.action.primary,
    transform: 'scale(0)',
    transition: `transform ${durations.fast} ${easings.easeInOut}`,
  },

  selectors: {
    [`${radioInput}:checked + &`]: {
      borderColor: vars.colors.action.primary,
      backgroundColor: vars.colors.white,
    },

    [`${radioInput}:checked + &::after`]: {
      transform: 'scale(1)',
    },

    [`${radioInput}:hover:not(:disabled) + &`]: {
      borderColor: vars.colors.action.primaryHover,
    },

    [`${radioInput}:focus-visible + &`]: {
      outline: `3px solid ${vars.colors.action.primary}`,
      outlineOffset: '3px',
    },

    [`${radioInput}:disabled + &`]: {
      cursor: 'not-allowed',
      borderColor: vars.colors.border.subtle,
      backgroundColor: vars.colors.background.tertiary,
    },

    [`${radioInput}:disabled:checked + &::after`]: {
      backgroundColor: vars.colors.text.disabled,
    },
  },
});

/**
 * Radio size variants
 */
export const radioSize = styleVariants({
  large: {
    width: '24px',
    height: '24px',

    '::after': {
      width: '12px',
      height: '12px',
    },
  },
  small: {
    width: '20px',
    height: '20px',

    '::after': {
      width: '10px',
      height: '10px',
    },
  },
});

/**
 * Label container - holds label and caption text
 */
export const labelContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[1],
  flex: 1,
  minWidth: 0,
});

/**
 * Label text.
 */
export const label = style({
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.colors.black,
  lineHeight: vars.typography.lineHeight.normal,
});

/**
 * Label size variants
 */
export const labelSize = styleVariants({
  large: {
    fontSize: vars.typography.fontSize.base,
  },
  small: {
    fontSize: vars.typography.fontSize.sm,
  },
});

/**
 * Caption text
 */
export const caption = style({
  color: vars.colors.text.secondary,
  lineHeight: vars.typography.lineHeight.tight,
});

/**
 * Caption size variants
 */
export const captionSize = styleVariants({
  large: {
    fontSize: vars.typography.fontSize.sm,
  },
  small: {
    fontSize: vars.typography.fontSize.xs,
  },
});

/**
 * Counter display
 */
export const counter = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.colors.text.secondary,
  fontWeight: vars.typography.fontWeight.normal,
  marginLeft: 'auto',
  flexShrink: 0,
  alignSelf: 'flex-start',
  marginTop: '2px', // Align with label
});

/**
 * Helper text styles
 */
export const helperText = style({
  display: 'block',
  fontSize: vars.typography.fontSize.sm,
  color: vars.colors.text.secondary,
  marginLeft: '32px', // Align with label text (24px radio + 8px gap)
});
