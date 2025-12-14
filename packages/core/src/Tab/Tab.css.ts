import { style } from '@vanilla-extract/css';
import { vars } from '@company/tokens';
import { durations, easings } from '@company/tokens';

export const tabButton = style({
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '12px 16px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: `all ${durations.fast} ${easings.easeInOut}`,
  minHeight: '48px',
  borderBottom: '2px solid transparent',
  fontFamily: vars.typography.fontFamily.sans,
  userSelect: 'none',
  outline: 'none',

  ':hover': {
    backgroundColor: vars.colors.background.primary,
  },

  ':focus-visible': {
    outline: `2px solid ${vars.colors.action.primary}`,
    outlineOffset: '-2px',
    zIndex: 1,
  },
});

export const tabActive = style({
  color: vars.colors.action.primary,

  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.action.secondaryHover,
    },
  },
});

export const tabDisabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
  pointerEvents: 'none',
});

export const tabContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[2],
  width: '100%',
  position: 'relative',
  zIndex: 1,
});

export const tabIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  lineHeight: 1,
  flexShrink: 0,
});

export const tabLabels = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[1],
  flex: 1,
  minWidth: 0,
  textAlign: 'left',
});

export const tabLabel = style({
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.colors.black,
  lineHeight: vars.typography.lineHeight.tight,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  selectors: {
    [`${tabActive} &`]: {
      color: vars.colors.action.primary,
      fontWeight: vars.typography.fontWeight.semibold,
    },
    [`${tabDisabled} &`]: {
      color: vars.colors.text.disabled,
    },
  },
});

export const tabSubLabelWithIcon = style({
  marginLeft: '33px',
});
export const tabSubLabel = style({
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.colors.text.secondary,
  lineHeight: vars.typography.lineHeight.tight,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  selectors: {
    [`${tabDisabled} &`]: {
      color: vars.colors.text.disabled,
    },
  },
});

export const tabCounter = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '20px',
  height: '20px',
  padding: '0 6px',
  borderRadius: '10px',
  backgroundColor: vars.colors.feedback.error,
  color: vars.colors.white,
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.medium,
  lineHeight: 1,
  flexShrink: 0,

  selectors: {
    [`${tabDisabled} &`]: {
      backgroundColor: vars.colors.text.disabled,
    },
  },
});

export const tabActionIcon = style({
  color: vars.colors.black,
});
export const tabActionButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  padding: 0,
  border: 'none',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  color: vars.colors.text.secondary,
  cursor: 'pointer',
  transition: `all ${durations.fast} ${easings.easeInOut}`,
  flexShrink: 0,

  ':hover': {
    backgroundColor: vars.colors.background.tertiary,
    color: vars.colors.text.primary,
  },

  ':active': {
    backgroundColor: vars.colors.action.secondaryActive,
  },

  selectors: {
    [`${tabActive} &`]: {
      color: vars.colors.action.primary,
    },
    [`${tabActive} &:hover`]: {
      backgroundColor: vars.colors.action.primaryHover,
      color: vars.colors.white,
    },
    [`${tabDisabled} &`]: {
      color: vars.colors.text.disabled,
      cursor: 'not-allowed',
    },
  },
});

export const tabIndicator = style({
  position: 'absolute',
  bottom: '-2px',
  left: 0,
  right: 0,
  height: '2px',
  backgroundColor: vars.colors.action.primary,
  transition: `all ${durations.fast} ${easings.easeInOut}`,
});

export const tabsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderBottom: `1px solid ${vars.colors.border.default}`,
  position: 'relative',
});

export const tabsWrapper = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
});

export const tabList = style({
  display: 'flex',
  alignItems: 'stretch',
  gap: 0,
});

export const tabListScrollable = style({
  overflowX: 'auto',
  scrollbarWidth: 'none',
  scrollBehavior: 'smooth',
  flex: 1,

  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const tabsScrollable = style({});

export const iconScrollButton = style({
  color: vars.colors.black,
});

export const scrollButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '48px',
  padding: 0,
  border: 'none',
  backgroundColor: vars.colors.white,
  color: vars.colors.text.secondary,
  cursor: 'pointer',
  transition: `all ${durations.fast} ${easings.easeInOut}`,
  outline: 'none',
  flexShrink: 0,
  zIndex: 2,

  ':hover': {
    backgroundColor: vars.colors.background.tertiary,
    color: vars.colors.text.primary,
  },

  ':focus-visible': {
    outline: `2px solid ${vars.colors.action.primary}`,
    outlineOffset: '-2px',
  },

  ':disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
});

export const scrollButtonLeft = style({});

export const scrollButtonRight = style({});

export const addTabButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 16px',
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.colors.text.secondary,
  cursor: 'pointer',
  transition: `all ${durations.fast} ${easings.easeInOut}`,
  minHeight: '48px',
  outline: 'none',

  ':hover': {
    backgroundColor: vars.colors.background.tertiary,
    color: vars.colors.text.primary,
  },

  ':focus-visible': {
    outline: `2px solid ${vars.colors.action.primary}`,
    outlineOffset: '-2px',
  },
});
