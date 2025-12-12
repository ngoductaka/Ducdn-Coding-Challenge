/**
 * Semantic tokens - purpose-driven aliases for primitive tokens
 * These provide meaning and context to the design tokens
 */

import { colors as primitiveColors, spacing, typography } from './tokens';

export const semanticLight = {
  colors: {
    // Basic colors
    black: primitiveColors.black,
    white: primitiveColors.white,
    transparent: primitiveColors.transparent,

    background: {
      primary: primitiveColors.neutral[50],
      secondary: primitiveColors.white,
      tertiary: primitiveColors.neutral[100],
      inverse: primitiveColors.neutral[900],
    },
    text: {
      primary: primitiveColors.neutral[900],
      secondary: primitiveColors.neutral[800],
      tertiary: primitiveColors.neutral[500],
      disabled: primitiveColors.neutral[400],
      inverse: primitiveColors.neutral[50],
    },
    border: {
      default: primitiveColors.neutral[200],
      strong: primitiveColors.neutral[300],
      subtle: primitiveColors.neutral[100],
    },
    action: {
      primary: primitiveColors.blue[600],
      primaryHover: primitiveColors.blue[500],
      primaryActive: primitiveColors.blue[700],
      primaryDefault: primitiveColors.blue[200],
      secondary: primitiveColors.brand[300],
      secondaryHover: primitiveColors.brand[100],
      secondaryActive: primitiveColors.neutral[300],
    },
    feedback: {
      success: primitiveColors.success[500],
      successBg: primitiveColors.success[50],
      error: primitiveColors.error[500],
      errorBg: primitiveColors.error[50],
      warning: primitiveColors.warning[500],
      warningBg: primitiveColors.warning[50],
      info: primitiveColors.info[500],
      infoBg: primitiveColors.info[50],
    },
  },
  spacing,
  typography,
} as const;

export const semanticDark = {
  colors: {
    // Basic colors
    black: primitiveColors.black,
    white: primitiveColors.white,
    transparent: primitiveColors.transparent,

    background: {
      primary: primitiveColors.neutral[50],
      secondary: primitiveColors.white,
      tertiary: primitiveColors.neutral[100],
      inverse: primitiveColors.neutral[900],
    },
    text: {
      primary: primitiveColors.neutral[50],
      secondary: primitiveColors.neutral[300],
      tertiary: primitiveColors.neutral[400],
      disabled: primitiveColors.neutral[500],
      inverse: primitiveColors.neutral[900],
    },
    border: {
      default: primitiveColors.neutral[700],
      strong: primitiveColors.neutral[600],
      subtle: primitiveColors.neutral[800],
    },
    action: {
      primary: primitiveColors.brand[700],
      primaryHover: primitiveColors.brand[400],
      primaryActive: primitiveColors.brand[700],
      secondary: primitiveColors.brand[300],
      secondaryHover: primitiveColors.brand[100],
      secondaryActive: primitiveColors.neutral[500],
    },
    feedback: {
      success: primitiveColors.success[500],
      successBg: primitiveColors.success[700],
      error: primitiveColors.error[500],
      errorBg: primitiveColors.error[700],
      warning: primitiveColors.warning[500],
      warningBg: primitiveColors.warning[700],
      info: primitiveColors.info[500],
      infoBg: primitiveColors.info[700],
    },
  },
  spacing,
  typography,
} as const;

export type SemanticTokens = typeof semanticLight;
