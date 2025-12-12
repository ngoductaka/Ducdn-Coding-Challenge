const fs = require('fs');
const path = require('path');
// Import from source to avoid Vanilla Extract runtime issues
const tokens = require('@company/tokens/src/tokens.ts');
const { colors, typography, spacing, radii, shadows } = tokens;

// Generate CSS from tokens
const css = `
/* Design System - Vanilla CSS */

/* Button Styles */
.ds-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${typography.fontFamily.sans};
  font-weight: ${typography.fontWeight.medium};
  border-radius: ${radii.md};
  border: none;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  text-decoration: none;
  user-select: none;
  outline: none;
}

.ds-button:focus-visible {
  outline: 2px solid ${colors.brand[500]};
  outline-offset: 2px;
}

.ds-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Button Variants */
.ds-button--primary {
  background-color: ${colors.brand[500]};
  color: white;
}

.ds-button--primary:hover:not(:disabled) {
  background-color: ${colors.brand[600]};
}

.ds-button--secondary {
  background-color: ${colors.neutral[100]};
  color: ${colors.neutral[900]};
}

.ds-button--secondary:hover:not(:disabled) {
  background-color: ${colors.neutral[200]};
}

.ds-button--outline {
  background-color: transparent;
  color: ${colors.brand[500]};
  border: 1px solid ${colors.brand[500]};
}

.ds-button--outline:hover:not(:disabled) {
  background-color: ${colors.brand[50]};
}

.ds-button--ghost {
  background-color: transparent;
  color: ${colors.brand[500]};
}

.ds-button--ghost:hover:not(:disabled) {
  background-color: ${colors.brand[50]};
}

.ds-button--danger {
  background-color: ${colors.error[500]};
  color: white;
}

.ds-button--danger:hover:not(:disabled) {
  background-color: ${colors.error[600]};
}

/* Button Sizes */
.ds-button--sm {
  font-size: ${typography.fontSize.sm};
  padding: ${spacing[2]} ${spacing[3]};
  gap: ${spacing[2]};
}

.ds-button--md {
  font-size: ${typography.fontSize.base};
  padding: ${spacing[3]} ${spacing[4]};
  gap: ${spacing[2]};
}

.ds-button--lg {
  font-size: ${typography.fontSize.lg};
  padding: ${spacing[4]} ${spacing[6]};
  gap: ${spacing[3]};
}

/* Card Styles */
.ds-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: ${radii.lg};
  overflow: hidden;
  transition: all 0.25s ease-in-out;
}

.ds-card--elevated {
  box-shadow: ${shadows.md};
}

.ds-card--elevated:hover {
  box-shadow: ${shadows.lg};
}

.ds-card--outlined {
  border: 1px solid ${colors.neutral[200]};
}

.ds-card--filled {
  background-color: ${colors.neutral[50]};
}

.ds-card--padding-sm {
  padding: ${spacing[4]};
}

.ds-card--padding-md {
  padding: ${spacing[6]};
}

.ds-card--padding-lg {
  padding: ${spacing[8]};
}

.ds-card--interactive {
  cursor: pointer;
}

.ds-card--interactive:focus-visible {
  outline: 2px solid ${colors.brand[500]};
  outline-offset: 2px;
}

.ds-card__header {
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
}

.ds-card__title {
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[900]};
  margin: 0;
}

.ds-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
}
`;

// Write CSS file
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, 'styles.css'), css.trim());
console.log('✓ Generated styles.css');
