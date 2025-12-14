import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@company/tokens';
import { radii, durations, easings } from '@company/tokens';

export const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: vars.typography.fontFamily.sans,
  fontWeight: vars.typography.fontWeight.medium,
  borderRadius: radii.md,
  border: 'none',
  cursor: 'pointer',
  transition: `all ${durations.base} ${easings.easeInOut}`,
  textDecoration: 'none',
  userSelect: 'none',
  outline: 'none',

  ':focus-visible': {
    outline: `2px solid ${vars.colors.action.primary}`,
    outlineOffset: '2px',
  },

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const button = recipe({
  base: buttonBase,

  variants: {
    variant: {
      primary: {
        backgroundColor: vars.colors.action.primary,
        color: vars.colors.text.inverse,
        ':hover:not(:disabled)': {
          backgroundColor: vars.colors.action.primaryHover,
        },
        ':active:not(:disabled)': {
          backgroundColor: vars.colors.action.primaryActive,
        },
      },
      secondary: {
        backgroundColor: vars.colors.action.secondary,
        color: vars.colors.text.primary,
        ':hover:not(:disabled)': {
          backgroundColor: vars.colors.action.secondaryHover,
        },
        ':active:not(:disabled)': {
          backgroundColor: vars.colors.action.secondaryActive,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: vars.colors.action.primary,
        border: `1px solid ${vars.colors.action.primary}`,
        ':hover:not(:disabled)': {
          backgroundColor: vars.colors.background.tertiary,
        },
        ':active:not(:disabled)': {
          backgroundColor: vars.colors.action.secondaryHover,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: vars.colors.action.primary,
        ':hover:not(:disabled)': {
          backgroundColor: vars.colors.background.tertiary,
        },
        ':active:not(:disabled)': {
          backgroundColor: vars.colors.action.secondaryHover,
        },
      },
      danger: {
        backgroundColor: vars.colors.feedback.error,
        color: vars.colors.text.inverse,
        ':hover:not(:disabled)': {
          backgroundColor: vars.colors.feedback.error,
          filter: 'brightness(0.9)',
        },
        ':active:not(:disabled)': {
          backgroundColor: vars.colors.feedback.error,
          filter: 'brightness(0.8)',
        },
      },
    },

    size: {
      sm: {
        fontSize: vars.typography.fontSize.sm,
        padding: `${vars.spacing[2]} ${vars.spacing[3]}`,
        gap: vars.spacing[2],
      },
      md: {
        fontSize: vars.typography.fontSize.base,
        padding: `${vars.spacing[3]} ${vars.spacing[4]}`,
        gap: vars.spacing[2],
      },
      lg: {
        fontSize: vars.typography.fontSize.lg,
        padding: `${vars.spacing[4]} ${vars.spacing[6]}`,
        gap: vars.spacing[3],
      },
    },

    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
