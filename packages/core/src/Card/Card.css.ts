import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { colors, spacing, radii, typography, shadows, durations, easings } from '@company/tokens';

/**
 * Card base styles
 */
export const cardBase = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  borderRadius: radii.lg,
  overflow: 'hidden',
  transition: `all ${durations.base} ${easings.easeInOut}`,
});

/**
 * Card variants
 */
export const card = recipe({
  base: cardBase,
  
  variants: {
    variant: {
      elevated: {
        boxShadow: shadows.md,
        ':hover': {
          boxShadow: shadows.lg,
        },
      },
      outlined: {
        border: `1px solid ${colors.neutral[200]}`,
      },
      filled: {
        backgroundColor: colors.neutral[50],
      },
    },
    
    padding: {
      none: {},
      sm: {
        padding: spacing[4],
      },
      md: {
        padding: spacing[6],
      },
      lg: {
        padding: spacing[8],
      },
    },
    
    interactive: {
      true: {
        cursor: 'pointer',
        ':focus-visible': {
          outline: `2px solid ${colors.brand[500]}`,
          outlineOffset: '2px',
        },
      },
    },
  },
  
  defaultVariants: {
    variant: 'elevated',
    padding: 'md',
  },
});

export const cardHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
});

export const cardTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  margin: 0,
});

export const cardDescription = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
  margin: 0,
});

export const cardContent = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
});

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[3],
  paddingTop: spacing[4],
  borderTop: `1px solid ${colors.neutral[200]}`,
});
