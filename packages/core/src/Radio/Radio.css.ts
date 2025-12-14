import { durations, easings, vars } from '@company/tokens';
import { style, styleVariants } from '@vanilla-extract/css';

export const radioWrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

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

export const radioContainer = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  marginTop: '2px',
});

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

export const radioControl = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  border: `3px solid ${vars.colors.action.primaryHover}`,
  backgroundColor: vars.colors.white,
  transition: `all ${durations.fast} ${easings.easeInOut}`,
  position: 'relative',
  flexShrink: 0,
  cursor: 'pointer',

  '::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: vars.colors.action.primary,
    transform: 'scale(0)',
    transition: `transform ${durations.fast} ${easings.easeInOut}`,
  },

  selectors: {
    [`${radioInput}:hover:not(:disabled):not(:checked) + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.white,
    },

    [`${radioInput}:checked + &`]: {
      borderColor: vars.colors.action.primary,
      backgroundColor: vars.colors.white,
    },

    [`${radioInput}:checked + &::after`]: {
      transform: 'scale(1)',
    },

    [`${radioInput}:checked:hover:not(:disabled) + &`]: {
      borderColor: vars.colors.action.primaryActive,
    },

    [`${radioInput}:checked:hover:not(:disabled) + &::after`]: {
      backgroundColor: vars.colors.action.primaryActive,
    },

    [`${radioInput}:focus-visible + &`]: {
      outline: `3px solid ${vars.colors.action.primary}`,
      outlineOffset: '3px',
    },

    [`${radioInput}:disabled + &`]: {
      cursor: 'not-allowed',
      borderColor: vars.colors.border.subtle,
      backgroundColor: vars.colors.white,
    },

    [`${radioInput}:disabled:checked + &`]: {
      borderColor: vars.colors.border.subtle,
      backgroundColor: vars.colors.white,
    },

    [`${radioInput}:disabled:checked + &::after`]: {
      backgroundColor: vars.colors.text.disabled,
      transform: 'scale(1)',
    },
  },
});

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
      width: '9px',
      height: '9px',
    },
  },
});

export const labelContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[1],
  flex: 1,
  minWidth: 0,
  marginTop: '4px',
});

export const label = style({
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.colors.black,
  lineHeight: vars.typography.lineHeight.normal,
  fontFamily: vars.typography.fontFamily.sans,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
});

export const labelSize = styleVariants({
  large: {
    fontSize: vars.typography.fontSize.base,
  },
  small: {
    fontSize: vars.typography.fontSize.sm,
  },
});

export const counter = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.colors.black,
  fontFamily: vars.typography.fontFamily.sans,
  fontWeight: vars.typography.fontWeight.normal,
  marginLeft: 'auto',
  flexShrink: 0,
  alignSelf: 'flex-start',
  marginTop: '2px',
});

export const helperText = style({
  display: 'block',
  fontSize: vars.typography.fontSize.sm,
  color: vars.colors.black,
  fontFamily: vars.typography.fontFamily.sans,
});
export const helperSize = styleVariants({
  large: {
    marginLeft: '36px',
    fontSize: vars.typography.fontSize.base,
  },
  small: {
    marginLeft: '33px',
    fontSize: vars.typography.fontSize.sm,
  },
});

export const radioGroupContainer = style({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: vars.spacing[2],
});
