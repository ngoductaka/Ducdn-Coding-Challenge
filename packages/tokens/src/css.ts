import {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  breakpoints,
  zIndices,
  durations,
  easings,
} from './tokens';

/**
 * Generate CSS custom properties from tokens
 */
export function generateCSSVariables(): string {
  const vars: string[] = [];

  // Colors
  Object.entries(colors).forEach(([category, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      vars.push(`  --color-${category}-${shade}: ${value};`);
    });
  });

  // Typography
  Object.entries(typography.fontSize).forEach(([size, value]) => {
    vars.push(`  --font-size-${size}: ${value};`);
  });

  Object.entries(typography.fontWeight).forEach(([weight, value]) => {
    vars.push(`  --font-weight-${weight}: ${value};`);
  });

  vars.push(`  --font-family-sans: ${typography.fontFamily.sans};`);
  vars.push(`  --font-family-mono: ${typography.fontFamily.mono};`);

  // Spacing
  Object.entries(spacing).forEach(([key, value]) => {
    vars.push(`  --spacing-${key}: ${value};`);
  });

  // Radii
  Object.entries(radii).forEach(([key, value]) => {
    vars.push(`  --radius-${key}: ${value};`);
  });

  // Shadows
  Object.entries(shadows).forEach(([key, value]) => {
    vars.push(`  --shadow-${key}: ${value};`);
  });

  // Z-indices
  Object.entries(zIndices).forEach(([key, value]) => {
    vars.push(`  --z-index-${key}: ${value};`);
  });

  // Durations
  Object.entries(durations).forEach(([key, value]) => {
    vars.push(`  --duration-${key}: ${value};`);
  });

  // Easings
  Object.entries(easings).forEach(([key, value]) => {
    vars.push(`  --easing-${key}: ${value};`);
  });

  return `:root {\n${vars.join('\n')}\n}`;
}

export const cssVariables = generateCSSVariables();
