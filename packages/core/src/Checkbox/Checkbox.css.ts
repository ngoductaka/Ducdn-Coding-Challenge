import { style, styleVariants } from '@vanilla-extract/css';
import { vars, radii, durations, easings } from '@company/tokens';

export const checkboxWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '8px',
});

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

export const checkboxContainer = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  marginTop: '2px',
});

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
    [`${checkboxInput}:hover:not(:disabled):not(:checked):not(:indeterminate) + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.white,
    },

    [`${checkboxInput}:checked + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.action.primaryActive,
    },

    [`${checkboxInput}:checked + &::after`]: {
      display: 'block',
    },

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

    [`${checkboxInput}:checked:hover:not(:disabled) + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.action.primaryActive,
    },

    [`${checkboxInput}:focus-visible + &`]: {
      outline: `2px solid ${vars.colors.action.primaryActive}`,
      outlineOffset: '2px',
    },

    [`${checkboxInput}:disabled + &`]: {
      cursor: 'not-allowed',
      borderColor: vars.colors.border.subtle,
      backgroundColor: vars.colors.background.tertiary,
    },

    [`${checkboxInput}:disabled:checked + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.action.primaryActive,
    },

    [`${checkboxInput}:disabled:checked + &::after`]: {
      borderColor: vars.colors.white,
    },

    [`${checkboxInput}:disabled:indeterminate + &`]: {
      borderColor: vars.colors.action.primaryActive,
      backgroundColor: vars.colors.action.primaryActive,
    },

    [`${checkboxInput}:disabled:indeterminate + &::after`]: {
      backgroundColor: vars.colors.white,
    },
  },
});

export const indeterminateState = style({});

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

export const labelContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[1],
  flex: 1,
  minWidth: 0,
});

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
  color: vars.colors.text.secondary,
  fontFamily: vars.typography.fontFamily.sans,
});

export const helperGap = styleVariants({
  default: {
    fontSize: vars.typography.fontSize.base,
    marginLeft: '33px',
  },
  small: {
    fontSize: vars.typography.fontSize.sm,
    marginLeft: '28px',
  },
});
