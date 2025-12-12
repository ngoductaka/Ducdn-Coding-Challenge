# @company/tokens

Design tokens for the design system. Framework-agnostic design values including colors, typography, spacing, and more.

## Installation

```bash
pnpm add @company/tokens
```

## Usage

### JavaScript/TypeScript

```typescript
import { colors, typography, spacing } from '@company/tokens';

const buttonStyles = {
  backgroundColor: colors.brand[500],
  padding: `${spacing[3]} ${spacing[6]}`,
  fontSize: typography.fontSize.base,
};
```

### CSS Variables

```typescript
import { cssVariables } from '@company/tokens/css';

// Inject into your app
const style = document.createElement('style');
style.textContent = cssVariables;
document.head.appendChild(style);
```

Then use in CSS:

```css
.button {
  background-color: var(--color-brand-500);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-base);
}
```

## Tokens

- **colors** - Brand, neutral, and semantic color scales
- **typography** - Font families, sizes, weights, line heights
- **spacing** - Consistent spacing scale (4px grid)
- **radii** - Border radius values
- **shadows** - Box shadow presets
- **breakpoints** - Responsive breakpoints
- **zIndices** - Z-index layering system
- **durations** - Animation durations
- **easings** - Animation easing functions
