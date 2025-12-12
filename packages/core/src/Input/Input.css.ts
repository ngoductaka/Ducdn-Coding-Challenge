import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@company/tokens';
import { radii, durations, easings } from '@company/tokens';

/**
 * Input base styles
 */
export const inputBase = style({
  width: '100%',
  fontFamily: vars.typography.fontFamily.sans,
  fontSize: vars.typography.fontSize.base,
  lineHeight: vars.typography.lineHeight.normal,
  color: vars.colors.text.primary,
  backgroundColor: vars.colors.background.secondary,
  border: `1px solid ${vars.colors.border.default}`,
  borderRadius: radii.md,
  padding: `${vars.spacing[3]} ${vars.spacing[4]}`,
  transition: `all ${durations.fast} ${easings.easeInOut}`,
  outline: 'none',

  selectors: {
    '&::placeholder': {
      color: vars.colors.text.disabled,
    },

    '&:hover:not(:disabled)': {
      borderColor: vars.colors.border.strong,
    },

    '&:focus': {
      borderColor: vars.colors.action.primary,
      boxShadow: `0 0 0 3px ${vars.colors.action.primary}15`,
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: vars.colors.background.tertiary,
    },
  },
});

/**
 * Input size variants
 */
export const inputSize = styleVariants({
  sm: {
    fontSize: vars.typography.fontSize.sm,
    padding: `${vars.spacing[2]} ${vars.spacing[3]}`,
  },
  md: {
    fontSize: vars.typography.fontSize.base,
    padding: `${vars.spacing[3]} ${vars.spacing[4]}`,
  },
  lg: {
    fontSize: vars.typography.fontSize.lg,
    padding: `${vars.spacing[4]} ${vars.spacing[5]}`,
  },
});

/**
 * Input state variants
 */
export const inputState = styleVariants({
  default: {},
  error: {
    borderColor: vars.colors.feedback.error,
    ':focus': {
      borderColor: vars.colors.feedback.error,
      boxShadow: `0 0 0 3px ${vars.colors.feedback.error}15`,
    },
  },
  success: {
    borderColor: vars.colors.feedback.success,
    ':focus': {
      borderColor: vars.colors.feedback.success,
      boxShadow: `0 0 0 3px ${vars.colors.feedback.success}15`,
    },
  },
});

/**
 * Label styles
 */
export const label = style({
  display: 'block',
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.colors.text.primary,
  marginBottom: vars.spacing[2],
});

/**
 * Helper text styles
 */
export const helperText = style({
  display: 'block',
  fontSize: vars.typography.fontSize.sm,
  color: vars.colors.text.secondary,
  marginTop: vars.spacing[2],
});

/**
 * Error message styles
 */
export const errorMessage = style({
  display: 'block',
  fontSize: vars.typography.fontSize.sm,
  color: vars.colors.feedback.error,
  marginTop: vars.spacing[2],
});

/**
 * Input wrapper for icon support
 */
export const inputWrapper = style({
  position: 'relative',
  width: '100%',
});

export const inputWithIcon = style({
  paddingLeft: vars.spacing[10],
});

export const iconLeft = style({
  position: 'absolute',
  left: vars.spacing[3],
  top: '50%',
  transform: 'translateY(-50%)',
  color: vars.colors.text.secondary,
  pointerEvents: 'none',
});

export const iconRight = style({
  position: 'absolute',
  right: vars.spacing[3],
  top: '50%',
  transform: 'translateY(-50%)',
  color: vars.colors.text.secondary,
  pointerEvents: 'none',
});
