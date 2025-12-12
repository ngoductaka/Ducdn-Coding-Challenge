/**
 * Theme system using Vanilla Extract
 * Creates CSS custom properties for runtime theme switching
 */

import { createGlobalTheme, createTheme } from '@vanilla-extract/css';
import { semanticLight, semanticDark } from './semantic';

/**
 * Create global theme contract with light theme as default
 * This generates CSS custom properties that can be switched at runtime
 */
export const vars = createGlobalTheme(':root', {
  colors: {
    // Basic colors
    black: semanticLight.colors.black,
    white: semanticLight.colors.white,
    transparent: semanticLight.colors.transparent,

    background: {
      primary: semanticLight.colors.background.primary,
      secondary: semanticLight.colors.background.secondary,
      tertiary: semanticLight.colors.background.tertiary,
      inverse: semanticLight.colors.background.inverse,
    },
    text: {
      primary: semanticLight.colors.text.primary,
      secondary: semanticLight.colors.text.secondary,
      tertiary: semanticLight.colors.text.tertiary,
      disabled: semanticLight.colors.text.disabled,
      inverse: semanticLight.colors.text.inverse,
    },
    border: {
      default: semanticLight.colors.border.default,
      strong: semanticLight.colors.border.strong,
      subtle: semanticLight.colors.border.subtle,
    },
    action: {
      primary: semanticLight.colors.action.primary,
      primaryHover: semanticLight.colors.action.primaryHover,
      primaryActive: semanticLight.colors.action.primaryActive,
      primaryDefault: semanticLight.colors.action.primaryDefault,
      secondary: semanticLight.colors.action.secondary,
      secondaryHover: semanticLight.colors.action.secondaryHover,
      secondaryActive: semanticLight.colors.action.secondaryActive,
    },
    feedback: {
      success: semanticLight.colors.feedback.success,
      successBg: semanticLight.colors.feedback.successBg,
      error: semanticLight.colors.feedback.error,
      errorBg: semanticLight.colors.feedback.errorBg,
      warning: semanticLight.colors.feedback.warning,
      warningBg: semanticLight.colors.feedback.warningBg,
      info: semanticLight.colors.feedback.info,
      infoBg: semanticLight.colors.feedback.infoBg,
    },
  },
  spacing: semanticLight.spacing,
  typography: {
    fontFamily: {
      sans: semanticLight.typography.fontFamily.sans,
      mono: semanticLight.typography.fontFamily.mono,
    },
    fontSize: semanticLight.typography.fontSize,
    fontWeight: semanticLight.typography.fontWeight,
    lineHeight: semanticLight.typography.lineHeight,
    letterSpacing: semanticLight.typography.letterSpacing,
  },
});

/**
 * Light theme class (same as root)
 */
export const lightTheme = createTheme(vars, {
  colors: {
    black: semanticLight.colors.black,
    white: semanticLight.colors.white,
    transparent: semanticLight.colors.transparent,
    background: semanticLight.colors.background,
    text: semanticLight.colors.text,
    border: semanticLight.colors.border,
    action: semanticLight.colors.action,
    feedback: semanticLight.colors.feedback,
  },
  spacing: semanticLight.spacing,
  typography: {
    fontFamily: semanticLight.typography.fontFamily,
    fontSize: semanticLight.typography.fontSize,
    fontWeight: semanticLight.typography.fontWeight,
    lineHeight: semanticLight.typography.lineHeight,
    letterSpacing: semanticLight.typography.letterSpacing,
  },
});

/**
 * Dark theme class
 */
export const darkTheme = createTheme(vars, {
  colors: {
    black: semanticDark.colors.black,
    white: semanticDark.colors.white,
    transparent: semanticDark.colors.transparent,
    background: semanticDark.colors.background,
    text: semanticDark.colors.text,
    border: semanticDark.colors.border,
    action: {
      ...semanticDark.colors.action,
      primaryDefault: semanticDark.colors.action.primary, // Add the missing property
    },
    feedback: semanticDark.colors.feedback,
  },
  spacing: semanticDark.spacing,
  typography: {
    fontFamily: semanticDark.typography.fontFamily,
    fontSize: semanticDark.typography.fontSize,
    fontWeight: semanticDark.typography.fontWeight,
    lineHeight: semanticDark.typography.lineHeight,
    letterSpacing: semanticDark.typography.letterSpacing,
  },
});
