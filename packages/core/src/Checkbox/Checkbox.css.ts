import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@company/tokens';
import { radii, durations, easings } from '@company/tokens';

/**
 * Checkbox wrapper - container for the entire checkbox component
 */
export const checkboxWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[1],
});

/**
 * Checkbox label - clickable label containing checkbox and text
 */
export const checkboxLabel = style({
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
 * Checkbox container - holds the input and custom control
 */
export const checkboxContainer = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  marginTop: '2px', // Align with text baseline
});

/**
 * Hidden checkbox input
 */
export const checkboxInput = style({
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
 * Custom checkbox control (visible square)
 */
export const checkboxControl = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: radii.base,
  border: `3px solid ${vars.colors.action.primaryDefault}`,
  backgroundColor: vars.colors.white,
  transition: `all ${durations.fast} ${easings.easeInOut}`,
  position: 'relative',
  flexShrink: 0,
  cursor: 'pointer',

  '::after': {
    content: '""',
    position: 'absolute',
    display: 'none',
    width: '5px',
    height: '10px',
    border: `solid ${vars.colors.white}`,
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
    top: '2px',
  },

  selectors: {
    // Hover state
    [`${checkboxInput}:hover:not(:disabled):not(:checked):not(:indeterminate) + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.white,
    },

    // Checked state
    [`${checkboxInput}:checked + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.action.primaryActive,
    },

    [`${checkboxInput}:checked + &::after`]: {
      display: 'block',
    },

    // Indeterminate state
    [`${checkboxInput}:indeterminate + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.action.primaryActive,
    },

    [`${checkboxInput}:indeterminate + &::after`]: {
      display: 'block',
      width: '10px',
      height: '2px',
      border: 'none',
      backgroundColor: vars.colors.white,
      transform: 'none',
      top: '50%',
      left: '50%',
      marginLeft: '-5px',
      marginTop: '-1px',
    },

    // Checked hover state
    [`${checkboxInput}:checked:hover:not(:disabled) + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.action.primaryActive,
    },

    // Focus state
    [`${checkboxInput}:focus-visible + &`]: {
      outline: `2px solid ${vars.colors.action.primaryActive}`,
      outlineOffset: '2px',
    },

    // Disabled state
    [`${checkboxInput}:disabled + &`]: {
      cursor: 'not-allowed',
      borderColor: vars.colors.border.subtle,
      backgroundColor: vars.colors.background.tertiary,
    },

    // Disabled checked state
    [`${checkboxInput}:disabled:checked + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.action.primaryActive,
    },

    [`${checkboxInput}:disabled:checked + &::after`]: {
      borderColor: vars.colors.white,
    },

    // Disabled indeterminate state
    [`${checkboxInput}:disabled:indeterminate + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.action.primaryActive,
    },

    [`${checkboxInput}:disabled:indeterminate + &::after`]: {
      backgroundColor: vars.colors.white,
    },
  },
});

/**
 * Indeterminate state class
 */
export const indeterminateState = style({});

/**
 * Checkbox size variants
 */
export const checkboxSize = styleVariants({
  default: {
    width: '20px',
    height: '20px',
  },
  small: {
    width: '16px',
    height: '16px',

    '::after': {
      width: '4px',
      height: '8px',
      top: '1px',
    },
  },
});

/**
 * Label container - holds label text
 */
export const labelContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[1],
  flex: 1,
  minWidth: 0,
});

/**
 * Label text
 */
export const label = style({
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.colors.black,
  fontFamily: vars.typography.fontFamily.sans,
  lineHeight: vars.typography.lineHeight.normal,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
});

/**
 * Label size variants
 */
export const labelSize = styleVariants({
  default: {
    fontSize: vars.typography.fontSize.base,
    marginTop: '2px',
  },
  small: {
    fontSize: vars.typography.fontSize.sm,
    marginTop: '3px',
  },
});

/**
 * Counter display
 */
export const counter = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.colors.black,
  fontFamily: vars.typography.fontFamily.sans,
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
  color: vars.colors.black,
  fontFamily: vars.typography.fontFamily.sans,
});

/**
 * Helper text gap variants
 */
export const helperGap = styleVariants({
  default: {
    marginLeft: '33px', // Align with label text (20px checkbox + 8px gap)
  },
  small: {
    marginLeft: '28px', // Align with label text (16px checkbox + 8px gap)
  },
});
