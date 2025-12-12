# Scalable Design System Architecture Proposal

## Executive Summary

This proposal outlines a comprehensive architecture for an enterprise-grade design system built on React, utilizing CSS-in-JS with strict Content Security Policy (CSP) compliance. The system is designed to serve multiple products across diverse frameworks while maintaining security, scalability, and exceptional developer experience.

**Core Technologies:**

- React 18+ with TypeScript
- Vanilla Extract (CSS-in-JS with zero-runtime, CSP-compliant)
- Storybook 7+ for documentation and development
- Turborepo for monorepo management
- Changesets for versioning

---

## I. Architecture & Strategy

### 1. Reusability Across Multiple Applications and Frameworks

#### Multi-Package Monorepo Architecture

```
@company/
├── packages/
│   ├── tokens/              # Design tokens (framework-agnostic)
│   ├── core/                # Core React components
│   ├── vanilla/             # Framework-agnostic vanilla JS/CSS
│   ├── react/               # React-specific wrappers
│   ├── vue/                 # Vue adapters (future)
│   ├── angular/             # Angular adapters (future)
│   ├── icons/               # SVG icon library
│   └── utils/               # Shared utilities
├── apps/
│   └── storybook/           # Centralized Storybook documentation
└── tooling/
    ├── eslint-config/
    ├── tsconfig/
    └── build-tools/
```

#### **Strategy: Framework-Agnostic Core with Framework-Specific Adapters**

**Layer 1: Design Tokens (`@company/tokens`)**

- Framework-agnostic JSON/JS token definitions
- Compiled to multiple outputs: CSS variables, JS objects, SCSS
- Single source of truth for all visual properties

```typescript
// packages/tokens/src/colors.ts
export const colors = {
  brand: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      // ... full scale
      900: '#0c4a6e',
    },
  },
  semantic: {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
} as const;
```

**Layer 2: Vanilla Core (`@company/vanilla`)**

- Headless component logic using state machines (XState or similar)
- CSS stylesheets compiled at build time (Vanilla Extract)
- Zero runtime overhead
- Fully CSP-compliant

```typescript
// packages/vanilla/src/button/button.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@company/tokens';

export const button = style({
  padding: vars.spacing.md,
  borderRadius: vars.borderRadius.md,
  fontFamily: vars.fontFamily.base,
  transition: 'all 0.2s ease',

  selectors: {
    '&:hover': {
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const variants = {
  primary: style({
    backgroundColor: vars.colors.brand.primary[600],
    color: vars.colors.neutral.white,
  }),
  secondary: style({
    backgroundColor: vars.colors.neutral[100],
    color: vars.colors.neutral[900],
  }),
};
```

**Layer 3: React Components (`@company/react`)**

- Thin React wrappers around vanilla core
- React-specific features (hooks, context)
- Type-safe props with TypeScript

```typescript
// packages/react/src/Button/Button.tsx
import React from 'react';
import { button, variants } from '@company/vanilla/button.css';
import { clsx } from 'clsx';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', className, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(button, variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

#### **Cross-Framework Compatibility Strategy**

**For Vue/Angular/Svelte:**

**Web Components Wrapper** (standards-based approach)

- Compile core components to Web Components using Lit or Stencil
- Framework adapters provide typed wrappers
- Maintains single source of truth

```typescript
// packages/web-components/src/button.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonStyles } from '@company/vanilla';

@customElement('ds-button')
export class DSButton extends LitElement {
  @property() variant: 'primary' | 'secondary' = 'primary';

  static styles = css`
    ${buttonStyles}
  `;

  render() {
    return html`
      <button class="button ${this.variant}">
        <slot></slot>
      </button>
    `;
  }
}
```

---

### 2. Versioning & Upgrades Strategy

#### **Semantic Versioning with Independent Package Versions**

**Version Strategy:**

- Each package follows semantic versioning independently
- Monorepo managed with Changesets for coordinated releases
- Clear deprecation policy with migration guides

**Version Compatibility Matrix:**

```typescript
// packages/react/package.json
{
  "name": "@company/react",
  "version": "2.4.0",
  "peerDependencies": {
    "@company/tokens": "^3.0.0",
    "@company/vanilla": "^2.0.0"
  }
}
```

#### **Breaking Change Prevention Mechanisms**

**1. Codemods for Automated Migration**

```typescript
// tooling/codemods/v2-to-v3/button-variant.ts
import { API, FileInfo } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Transform old 'style' prop to new 'variant' prop
  root.find(j.JSXElement, { openingElement: { name: { name: 'Button' } } }).forEach(path => {
    const attrs = path.value.openingElement.attributes;
    const styleProp = attrs?.find(
      attr => attr.type === 'JSXAttribute' && attr.name.name === 'style'
    );

    if (styleProp) {
      styleProp.name.name = 'variant';
    }
  });

  return root.toSource();
}
```

#### **Release Process**

**1. Changesets Workflow**

```bash
pnpm changeset
# Select packages changed, type of change (major/minor/patch)
# On merge to main, changesets bot creates PR with:
# - Updated versions
# - Updated CHANGELOG.md
# - Package.json updates
```

**2. Version Strategy Matrix**

| Change Type         | Version Bump | Example           | Breaking?  |
| ------------------- | ------------ | ----------------- | ---------- |
| New component       | Minor        | 1.0.0 → 1.1.0     | No         |
| New prop (optional) | Minor        | 1.1.0 → 1.2.0     | No         |
| Bug fix             | Patch        | 1.2.0 → 1.2.1     | No         |
| Prop removed        | Major        | 1.2.1 → 2.0.0     | Yes        |
| Required prop added | Major        | 2.0.0 → 3.0.0     | Yes        |
| Token value changed | Patch/Minor  | Context-dependent | Usually No |

**3. Pre-release Channels**

```json
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  },
  "version": "2.4.0-beta.3"
}
```

- `alpha`: Experimental features, breaking changes expected
- `beta`: Feature complete, API stabilizing
- `rc`: Release candidate, production-ready testing
- `latest`: Stable release

**4. Compatibility Layer**

```typescript
// packages/react/src/compat/v1.ts
// Provide legacy exports for major version transitions

export { Button as ButtonV1 } from './v1/Button';
export { Button as ButtonV2 } from './v2/Button';

// Allow consumers to import specific versions during migration
import { ButtonV1, ButtonV2 } from '@company/react/compat';
```

---

## II. Theming & Customization

### 1. Token Structure for Robust Theming

#### **Multi-Tier Token Architecture**

**Tier 1: Primitive Tokens** (Concrete values)

```typescript
// packages/tokens/src/primitives.ts
export const primitives = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... full scale
    900: '#1e3a8a',
  },
  gray: {
    50: '#f9fafb',
    // ... full scale
    900: '#111827',
  },
  spacing: {
    '0': '0',
    '1': '0.25rem', // 4px
    '2': '0.5rem', // 8px
    '4': '1rem', // 16px
    '8': '2rem', // 32px
  },
} as const;
```

**Tier 2: Semantic Tokens** (Purpose-driven aliases)

```typescript
// packages/tokens/src/semantic.ts
import { primitives } from './primitives';

export const semanticLight = {
  colors: {
    background: {
      primary: primitives.gray[50],
      secondary: primitives.white,
      tertiary: primitives.gray[100],
    },
    text: {
      primary: primitives.gray[900],
      secondary: primitives.gray[600],
      disabled: primitives.gray[400],
    },
    border: {
      default: primitives.gray[200],
      strong: primitives.gray[300],
    },
    action: {
      primary: primitives.blue[600],
      primaryHover: primitives.blue[700],
      secondary: primitives.gray[100],
      secondaryHover: primitives.gray[200],
    },
    feedback: {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
    },
  },
  spacing: primitives.spacing,
  typography: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'Monaco, Courier, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    lineHeight: {
      tight: '1.25',
      base: '1.5',
      relaxed: '1.75',
    },
  },
} as const;

export const semanticDark = {
  colors: {
    background: {
      primary: primitives.gray[900],
      secondary: primitives.gray[800],
      tertiary: primitives.gray[700],
    },
    text: {
      primary: primitives.gray[50],
      secondary: primitives.gray[300],
      disabled: primitives.gray[500],
    },
    // ... dark theme mappings
  },
  // Spacing and typography remain the same
  spacing: semanticLight.spacing,
  typography: semanticLight.typography,
} as const;
```

**Tier 3: Component Tokens** (Component-specific overrides)

```typescript
// packages/tokens/src/components/button.ts
export const buttonTokens = {
  padding: {
    sm: '0.5rem 1rem',
    md: '0.75rem 1.5rem',
    lg: '1rem 2rem',
  },
  fontSize: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
  },
  borderRadius: {
    default: '0.375rem',
    pill: '9999px',
  },
} as const;
```

#### **CSS Variables Strategy for Runtime Theming**

**Build-time Generation of CSS Custom Properties:**

```typescript
// packages/tokens/src/css-vars.ts
import { createGlobalTheme, createTheme } from '@vanilla-extract/css';
import { semanticLight, semanticDark } from './semantic';

// Generate CSS variables at build time
export const vars = createGlobalTheme(':root', semanticLight);

// Create theme variants
export const lightTheme = createTheme(vars, semanticLight);
export const darkTheme = createTheme(vars, semanticDark);

// Generated CSS output (build time):
// :root {
//   --colors-background-primary: #f9fafb;
//   --colors-text-primary: #111827;
//   ...
// }
//
// .lightTheme { /* same as :root */ }
// .darkTheme {
//   --colors-background-primary: #111827;
//   --colors-text-primary: #f9fafb;
//   ...
// }
```

**Component Usage:**

```typescript
// packages/vanilla/src/button/button.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@company/tokens';

export const button = style({
  // All values are CSS variables, resolved at runtime
  backgroundColor: vars.colors.action.primary,
  color: vars.colors.text.primary,
  padding: vars.spacing['4'],
  borderRadius: '0.375rem',

  ':hover': {
    backgroundColor: vars.colors.action.primaryHover,
  },
});
```

#### **Brand-Specific Theme Overrides**

```typescript
// packages/tokens/src/brands/acme.ts
import { createTheme } from '@vanilla-extract/css';
import { vars } from '../css-vars';
import { primitives } from '../primitives';

export const acmeBrand = createTheme(vars, {
  colors: {
    action: {
      primary: '#FF6B35', // ACME brand orange
      primaryHover: '#E85D2F',
      // Inherit other semantic tokens
      secondary: vars.colors.action.secondary,
      secondaryHover: vars.colors.action.secondaryHover,
    },
    // Override only what's brand-specific
    background: vars.colors.background,
    text: vars.colors.text,
    border: vars.colors.border,
    feedback: vars.colors.feedback,
  },
  spacing: vars.spacing,
  typography: {
    ...vars.typography,
    fontFamily: {
      base: '"Acme Sans", -apple-system, sans-serif',
      mono: vars.typography.fontFamily.mono,
    },
  },
});

// packages/tokens/src/brands/globex.ts
export const globexBrand = createTheme(vars, {
  colors: {
    action: {
      primary: '#4A90E2', // Globex brand blue
      primaryHover: '#357ABD',
      secondary: vars.colors.action.secondary,
      secondaryHover: vars.colors.action.secondaryHover,
    },
    // ... similar structure
  },
  // ...
});
```

**Usage in Application:**

```typescript
// App.tsx
import { lightTheme, darkTheme, acmeBrand, globexBrand } from '@company/tokens';

function App() {
  const [theme, setTheme] = useState('light');
  const [brand, setBrand] = useState('acme');

  const themeClass = useMemo(() => {
    const baseTheme = theme === 'dark' ? darkTheme : lightTheme;
    const brandTheme = brand === 'acme' ? acmeBrand : globexBrand;

    // Combine themes - brand overrides base
    return `${baseTheme} ${brandTheme}`;
  }, [theme, brand]);

  return (
    <div className={themeClass}>
      <Button>Themed Button</Button>
    </div>
  );
}
```

---

### 2. Runtime Theme Switching Without Breaking CSP

#### **Strategy: Pre-Generated CSS Classes + Data Attributes**

The key insight: **All CSS must be generated at build time, not runtime.** We switch themes by changing CSS class names or data attributes, never by injecting styles.

**Implementation:**

**1. Theme Provider with Data Attributes**

```typescript
// packages/react/src/ThemeProvider/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '@company/tokens';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  brand?: string;
  setBrand: (brand: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
  defaultBrand?: string;
}> = ({ children, defaultTheme = 'light', defaultBrand }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme);
  const [brand, setBrand] = useState<string | undefined>(defaultBrand);

  useEffect(() => {
    // Apply theme class to document root
    document.documentElement.className =
      theme === 'dark' ? darkTheme : lightTheme;

    // Apply brand data attribute if specified
    if (brand) {
      document.documentElement.setAttribute('data-brand', brand);
    }

    // Persist to localStorage
    localStorage.setItem('theme-preference', theme);
  }, [theme, brand]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, brand, setBrand }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

**2. System Preference Detection**

```typescript
// packages/react/src/hooks/useSystemTheme.ts
import { useEffect, useState } from 'react';

export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return systemTheme;
}
```

**3. Theme Switcher Component**

```typescript
// packages/react/src/ThemeSwitcher/ThemeSwitcher.tsx
import React from 'react';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Button } from '../Button/Button';
import { MoonIcon, SunIcon } from '@company/icons';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='secondary'
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
```

**4. Advanced: Per-Component Theme Overrides**

For rare cases where individual components need theme overrides:

```typescript
// packages/vanilla/src/card/card.css.ts
import { style, createVar } from '@vanilla-extract/css';
import { vars } from '@company/tokens';

// Create local CSS variable for override
const cardBgVar = createVar();

export const card = style({
  // Default to theme variable
  backgroundColor: cardBgVar,

  // Fallback to semantic token
  vars: {
    [cardBgVar]: vars.colors.background.secondary,
  },
});

// Override variant
export const cardHighlighted = style({
  vars: {
    [cardBgVar]: vars.colors.background.tertiary,
  },
});
```

Usage:

```typescript
<Card className={cardHighlighted}>
  {/* This card has different background */}
</Card>
```

**5. Flash of Unstyled Content (FOUC) Prevention**

```typescript
// packages/react/src/ThemeScript.tsx
export const ThemeScript = () => {
  // Inline script that runs before React hydration
  const scriptContent = `
    (function() {
      try {
        const savedTheme = localStorage.getItem('theme-preference');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = savedTheme || systemTheme;

        document.documentElement.className = theme === 'dark' ? '${darkTheme}' : '${lightTheme}';
      } catch (e) {}
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: scriptContent }}
      // This is allowed even with strict CSP via nonce or hash
    />
  );
};

// Usage in _document.tsx (Next.js) or index.html
<head>
  <ThemeScript />
</head>;
```

**CSP Configuration for Theme Script:**

```typescript
// next.config.js or server configuration
const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}';
  style-src 'self';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`;

// The theme script gets a nonce:
<script nonce={nonce}>...</script>;
```

## III. Security & CSP Compliance

### 1. Preventing Inline Style Injection

#### **Vanilla Extract: Zero-Runtime CSS-in-JS**

**Why Vanilla Extract?**

- Extracts CSS at build time to static `.css` files
- Zero runtime (no style injection)
- Type-safe styles with TypeScript
- CSS Modules-like scoping
- Full CSS feature support (animations, media queries, pseudo-selectors)

**Build Process:**

```typescript
// 1. Write styles with Vanilla Extract
// packages/vanilla/src/button/button.css.ts
import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@company/tokens';

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const button = style({
  animation: `${fadeIn} 0.2s ease-in`,
  backgroundColor: vars.colors.action.primary,
  // ... more styles
});

// 2. Vanilla Extract processes this at BUILD TIME

// 3. Output: Static CSS file
// dist/button.css
.button__abc123 {
  animation: fadeIn__xyz789 0.2s ease-in;
  background-color: var(--colors-action-primary);
}

@keyframes fadeIn__xyz789 {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

// 4. Component imports CSS class name (build-time constant)
import { button } from './button.css';
// button === 'button__abc123'
```

**Complete Build Configuration:**

```typescript
// packages/vanilla/vite.config.ts
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [
    vanillaExtractPlugin({
      // Optimize CSS output
      identifiers: process.env.NODE_ENV === 'production' ? 'short' : 'debug',
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
    },
    cssCodeSplit: true, // Split CSS by chunk
    rollupOptions: {
      output: {
        assetFileNames: 'styles/[name]-[hash][extname]',
      },
    },
  },
});
```

**Component Integration:**

```typescript
// packages/react/src/Button/Button.tsx
import React from 'react';
import * as styles from '@company/vanilla/button.css';

// CSS is imported as static .css file via <link> tag
// No runtime injection, fully CSP-compliant

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  ...props
}) => {
  return (
    <button
      className={styles.button} // Just a string class name
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  );
};
```

**Forbidden Patterns:**

```typescript
// Runtime style object (creates inline styles)
<button style={{ backgroundColor: color }}>Click</button>;

const StyledButton = styled.button`
  background-color: ${(props) => props.color};
`;

// Build-time CSS with CSS variables
const button = style({
  backgroundColor: vars.colors.action.primary,
});
const variants = {
  primary: style({ backgroundColor: vars.colors.action.primary }),
  secondary: style({ backgroundColor: vars.colors.action.secondary }),
};
```

---

### 2. Dynamic Styles and Runtime Overrides (CSP-Safe)

#### **Strategy 1: CSS Custom Properties for Dynamic Values**

```typescript
import { style, createVar } from '@vanilla-extract/css';
import { vars } from '@company/tokens';

// Create CSS custom property placeholder
export const progressValue = createVar();

export const progressBar = style({
  width: progressValue, // Dynamic value
  backgroundColor: vars.colors.action.primary,
  height: '8px',
  borderRadius: '4px',
  transition: 'width 0.3s ease',
});

// Generated CSS:
// .progressBar {
//   width: var(--progressValue__xyz);
//   background-color: var(--colors-action-primary);
// }
```

**Component Usage:**

```typescript
// packages/react/src/Progress/Progress.tsx
import React from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from '@company/vanilla/progress.css';

interface ProgressProps {
  value: number; // 0-100
  max?: number;
}

export const Progress: React.FC<ProgressProps> = ({ value, max = 100 }) => {
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div className={styles.progressContainer}>
      <div
        className={styles.progressBar}
        role='progressbar'
        aria-valuenow={value}
        aria-valuemax={max}
        style={assignInlineVars({
          [styles.progressValue]: `${percentage}%`,
        })}
      />
    </div>
  );
};

// Generated HTML:
// <div class="progressBar" style="--progressValue__xyz: 75%;"></div>
```

**How This Is CSP-Compliant:**

- `assignInlineVars` only sets CSS custom properties, not arbitrary styles
- CSP allows setting CSS variables via inline style attribute
- The actual styles (width, background, etc.) are in static CSS
- Only the variable VALUE changes at runtime

**Strategy 2: Pre-Generated Style Variants:**

For cases with limited dynamic variations:

```typescript
// packages/vanilla/src/avatar/avatar.css.ts
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@company/tokens';

const baseAvatar = style({
  borderRadius: '50%',
  objectFit: 'cover',
});
export const avatarSizes = styleVariants({
  xs: [baseAvatar, { width: '24px', height: '24px' }],
  sm: [baseAvatar, { width: '32px', height: '32px' }],
  md: [baseAvatar, { width: '40px', height: '40px' }],
  lg: [baseAvatar, { width: '48px', height: '48px' }],
  xl: [baseAvatar, { width: '64px', height: '64px' }],
});
// Usage <img className={avatarSizes.md} src={url} alt={name} />
```

#### **Strategy 3: Data Attributes + CSS Selectors**

```typescript
// packages/vanilla/src/badge/badge.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@company/tokens';

export const badge = style({
  padding: '0.25rem 0.5rem',
  borderRadius: vars.borderRadius.sm,
  fontSize: vars.fontSize.xs,
  fontWeight: 600,

  selectors: {
    '&[data-variant="success"]': {
      backgroundColor: vars.colors.feedback.success,
      color: vars.colors.neutral.white,
    },
    '&[data-variant="error"]': {
      backgroundColor: vars.colors.feedback.error,
      color: vars.colors.neutral.white,
    },
    '&[data-variant="warning"]': {
      backgroundColor: vars.colors.feedback.warning,
      color: vars.colors.neutral.white,
    },
  },
});

// Usage
<span className={badge} data-variant='success'>
  Active
</span>;
```

#### **Strategy 4: CSS Grid/Flexbox for Layout**

Avoid inline positioning styles:

```typescript
// WRONG: Inline positioning
<div style={{ gridColumn: `span ${columns}` }}>

// CORRECT: Pre-generated grid classes
export const gridSpans = styleVariants({
  '1': { gridColumn: 'span 1' },
  '2': { gridColumn: 'span 2' },
  '3': { gridColumn: 'span 3' },
  // ... up to max columns
});

<div className={gridSpans[columns]}>
```

#### **Strategy 5: Complex Dynamic Scenarios**

For truly dynamic scenarios (e.g., drag-and-drop positioning):

```typescript
// Use transform via CSS variable (CSP-safe)
const draggableItem = createVar();
const draggableItemX = createVar();
const draggableItemY = createVar();

export const draggable = style({
  transform: `translate(${draggableItemX}, ${draggableItemY})`,
});

// Usage
<div
  className={styles.draggable}
  style={assignInlineVars({
    [styles.draggableItemX]: `${x}px`,
    [styles.draggableItemY]: `${y}px`,
  })}
/>;
```

---

### CSP Configuration Reference

**Recommended CSP Header:**

```typescript
const csp = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'nonce-{RANDOM_NONCE}'", // For critical inline scripts only
    'https://trusted-cdn.com',
  ],
  'style-src': [
    "'self'",
    // Note: No 'unsafe-inline'!
  ],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'connect-src': ["'self'", 'https://api.company.com'],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
};

// Express.js example
app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;

  res.setHeader(
    'Content-Security-Policy',
    Object.entries(csp)
      .map(([key, values]) => `${key} ${values.join(' ').replace('{RANDOM_NONCE}', nonce)}`)
      .join('; ')
  );

  next();
});
```

**CSP Violation Monitoring:**

```typescript
// packages/react/src/utils/cspReporting.ts
export function setupCSPReporting() {
  if (typeof window === 'undefined') return;

  document.addEventListener('securitypolicyviolation', e => {
    const violation = {
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      originalPolicy: e.originalPolicy,
      sourceFile: e.sourceFile,
      lineNumber: e.lineNumber,
    };

    // Send to monitoring service
    fetch('/api/csp-violation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(violation),
    });

    console.error('CSP Violation:', violation);
  });
}
```

---

## IV. Bonus Considerations

### 1. Accessibility (WCAG 2.1 AA Compliance)

#### **Comprehensive Accessibility Strategy**

**A. Token-Level Accessibility**

```typescript
// packages/tokens/src/accessibility.ts
export const a11yTokens = {
  // WCAG AA compliant contrast ratios
  contrastRatios: {
    normalText: 4.5, // WCAG AA for normal text
    largeText: 3, // WCAG AA for large text (18pt+)
    aa: 4.5,
    aaa: 7,
  },

  // Focus indicators
  focus: {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
    outlineColor: '#4A90E2', // High contrast blue
  },

  // Touch targets (WCAG 2.5.5)
  touchTarget: {
    minSize: '44px', // Minimum 44x44px
  },

  // Motion preferences
  motion: {
    reducedTransition: '0.01ms', // Nearly instant for prefers-reduced-motion
    normalTransition: '200ms',
  },
};
```

**B. Automatic Contrast Validation**

```typescript
// packages/tokens/src/utils/contrastChecker.ts
import { getLuminance, getContrastRatio } from 'polished';

export function validateContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText = false
): { isValid: boolean; ratio: number; required: number } {
  const ratio = getContrastRatio(foreground, background);

  const required = level === 'AAA' ? (isLargeText ? 4.5 : 7) : isLargeText ? 3 : 4.5;

  return {
    isValid: ratio >= required,
    ratio,
    required,
  };
}

// Build-time validation
const textOnPrimary = validateContrast(
  semanticLight.colors.text.primary,
  semanticLight.colors.background.primary
);

if (!textOnPrimary.isValid) {
  throw new Error(
    `Insufficient contrast ratio: ${textOnPrimary.ratio.toFixed(2)} ` +
      `(required: ${textOnPrimary.required})`
  );
}
```

**C. Accessible Component Patterns**

#### **Example 1: Modal Component**

```typescript
// packages/react/src/Modal/Modal.tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import * as styles from '@company/vanilla/modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  const titleId = useRef(
    `modal-title-${Math.random().toString(36).substr(2, 9)}`
  );
  const descriptionId = useRef(
    `modal-desc-${Math.random().toString(36).substr(2, 9)}`
  );

  // A11y: Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Store previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    return () => {
      // Restore focus on close
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  // A11y: Keyboard navigation
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEsc, onClose]);

  // A11y: Prevent body scroll when modal open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={closeOnOverlayClick ? onClose : undefined}
      // A11y: Inert background
      aria-hidden='false'
    >
      <FocusTrap
        focusTrapOptions={{
          // A11y: Trap focus within modal
          initialFocus: false,
          returnFocusOnDeactivate: false,
          clickOutsideDeactivates: closeOnOverlayClick,
        }}
      >
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          role='dialog'
          aria-modal='true'
          // A11y: Associate title and description
          aria-labelledby={titleId.current}
          aria-describedby={descriptionId.current}
        >
          <div className={styles.header}>
            <h2 id={titleId.current} className={styles.title}>
              {title}
            </h2>

            <button
              className={styles.closeButton}
              onClick={onClose}
              // A11y: Accessible button label
              aria-label='Close dialog'
              type='button'
            >
              <CloseIcon aria-hidden='true' />
            </button>
          </div>

          <div id={descriptionId.current} className={styles.content}>
            {children}
          </div>
        </div>
      </FocusTrap>
    </div>,
    document.body
  );
};
```

**Modal Styles with A11y Features:**

```typescript
// packages/vanilla/src/modal/modal.css.ts
import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@company/tokens';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,

  // A11y: Respect prefers-reduced-motion
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: 'fadeIn 200ms ease-out',
    },
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

export const modal = style({
  backgroundColor: vars.colors.background.primary,
  borderRadius: vars.borderRadius.lg,
  maxWidth: '600px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto',
  boxShadow: vars.shadows.xl,

  // A11y: Focus indicator
  ':focus': {
    outline: `${vars.focus.outlineWidth} ${vars.focus.outlineStyle} ${vars.focus.outlineColor}`,
    outlineOffset: vars.focus.outlineOffset,
  },

  ':focus:not(:focus-visible)': {
    outline: 'none', // Remove outline for mouse users
  },
});

export const closeButton = style({
  // A11y: Minimum touch target size
  minWidth: '44px',
  minHeight: '44px',
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  borderRadius: vars.borderRadius.sm,

  // A11y: High contrast focus
  ':focus-visible': {
    outline: `2px solid ${vars.colors.action.primary}`,
    outlineOffset: '2px',
  },

  // A11y: Clear hover state
  ':hover': {
    backgroundColor: vars.colors.background.tertiary,
  },
});
```

#### **Example 2: Dropdown/Select Component**

```typescript
// packages/react/src/Select/Select.tsx
import React, { useState, useRef, useEffect } from 'react';
import * as styles from '@company/vanilla/select.css';

interface SelectProps {
  label: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  error,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectId = useRef(`select-${Math.random().toString(36).substr(2, 9)}`);
  const listId = useRef(`listbox-${Math.random().toString(36).substr(2, 9)}`);

  // A11y: Keyboard navigation (ARIA 1.2 compliant)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0) {
          onChange(options[focusedIndex].value);
          setIsOpen(false);
        }
        e.preventDefault();
        break;

      case 'ArrowDown':
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
        }
        e.preventDefault();
        break;

      case 'ArrowUp':
        if (isOpen) {
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          e.preventDefault();
        }
        break;

      case 'Home':
        if (isOpen) {
          setFocusedIndex(0);
          e.preventDefault();
        }
        break;

      case 'End':
        if (isOpen) {
          setFocusedIndex(options.length - 1);
          e.preventDefault();
        }
        break;

      case 'Escape':
        setIsOpen(false);
        triggerRef.current?.focus();
        e.preventDefault();
        break;
    }
  };

  // A11y: Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const option = listRef.current?.children[focusedIndex] as HTMLElement;
      option?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  // A11y: Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={styles.selectWrapper}>
      {/* A11y: Associated label */}
      <label htmlFor={selectId.current} className={styles.label}>
        {label}
        {required && <span aria-label='required'> *</span>}
      </label>

      {/* A11y: Combobox pattern (ARIA 1.2) */}
      <button
        ref={triggerRef}
        id={selectId.current}
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-labelledby={`${selectId.current}-label`}
        aria-controls={listId.current}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId.current}-error` : undefined}
        type='button'
      >
        <span className={styles.selectedValue}>
          {selectedOption?.label || placeholder || 'Select...'}
        </span>
        <ChevronIcon aria-hidden='true' className={styles.chevron} />
      </button>

      {/* A11y: Error message */}
      {error && (
        <div
          id={`${selectId.current}-error`}
          className={styles.error}
          role='alert'
        >
          {error}
        </div>
      )}

      {/* A11y: Listbox with proper ARIA */}
      {isOpen && (
        <ul
          ref={listRef}
          id={listId.current}
          className={styles.list}
          role='listbox'
          aria-labelledby={selectId.current}
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className={styles.option}
              role='option'
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              data-focused={index === focusedIndex}
              onClick={() => {
                if (!option.disabled) {
                  onChange(option.value);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }
              }}
              onMouseEnter={() => setFocusedIndex(index)}
            >
              {option.label}
              {option.value === value && (
                <CheckIcon aria-hidden='true' className={styles.checkIcon} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

**D. Automated Accessibility Testing**

```typescript
// packages/react/src/__tests__/a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Modal, Button, Select } from '../index';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('Modal should have no accessibility violations', async () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}} title='Test Modal'>
        <p>Modal content</p>
      </Modal>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Button should meet WCAG AA contrast requirements', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('Select should support keyboard navigation', async () => {
    const { getByRole } = render(
      <Select
        label='Choose option'
        options={[{ value: '1', label: 'Option 1' }]}
        onChange={() => {}}
      />
    );

    const trigger = getByRole('button');
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    expect(trigger).toHaveAttribute('aria-expanded');
  });
});
```

**E. Storybook Accessibility Addon**

```typescript
// .storybook/main.ts
export default {
  addons: [
    '@storybook/addon-a11y', // Automated a11y testing in Storybook
    '@storybook/addon-essentials',
  ],
};

// Modal.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    // Configure a11y addon
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'aria-required-attr',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default meta;
```

---

### 2. Collaboration & Governance

#### **Design-Development Workflow**

**A. Design Token Synchronization**

```typescript
// tooling/token-sync/figma-to-tokens.ts
import { Api } from 'figma-api';
import fs from 'fs/promises';

interface FigmaVariable {
  name: string;
  resolvedType: string;
  valuesByMode: Record<string, any>;
}

async function syncFigmaTokens() {
  const api = new Api({ personalAccessToken: process.env.FIGMA_TOKEN });

  // Fetch variables from Figma
  const file = await api.getFileVariables(process.env.FIGMA_FILE_KEY!);

  const tokens = {
    colors: {},
    spacing: {},
    typography: {},
  };

  // Transform Figma variables to design tokens
  Object.values(file.meta.variables).forEach((variable: FigmaVariable) => {
    const [category, ...path] = variable.name.split('/');

    if (category === 'color') {
      // Extract RGB values
      const rgb = variable.valuesByMode[Object.keys(variable.valuesByMode)[0]];
      tokens.colors[path.join('.')] = rgbToHex(rgb);
    }
    // ... handle spacing, typography, etc.
  });

  // Write to tokens package
  await fs.writeFile('packages/tokens/src/generated/figma.json', JSON.stringify(tokens, null, 2));

  console.log('Tokens synced from Figma');
}

// Run as GitHub Action on Figma webhook
```

**B. Contribution Guidelines**

````markdown
# CONTRIBUTING.md

## Design System Contribution Guidelines

### For Designers

#### 1. Proposing New Components

1. Create component spec in Figma with all states:
   - Default, hover, active, focus, disabled
   - Light and dark themes
   - All size variants
   - Error states
2. Document in RFC template:
   - Use cases
   - Accessibility requirements
   - Interaction patterns
   - Open questions

3. Present in Design System Guild meeting

#### 2. Token Changes

- All token changes must go through Figma
- Update documentation with rationale
- Consider backward compatibility

### For Developers

#### 1. Adding Components

```bash
# Use generator
pnpm run generate:component

# This creates:
# - packages/vanilla/src/ComponentName/
#   - component.css.ts
#   - index.ts
# - packages/react/src/ComponentName/
#   - ComponentName.tsx
#   - ComponentName.test.tsx
#   - ComponentName.stories.tsx
# - Documentation stubs
```

#### 2. Component Checklist

- [ ] TypeScript types with JSDoc
- [ ] WCAG 2.1 AA compliant
- [ ] Unit tests (>80% coverage)
- [ ] Integration tests for complex interactions
- [ ] Storybook stories with all variants
- [ ] Documentation with code examples
- [ ] Changeset added
- [ ] Reviewed by Design System team

#### 3. Code Review Requirements

- 2 approvals required (1 designer, 1 engineer)
- Automated checks must pass:
  - Linting (ESLint + Prettier)
  - Type checking (TypeScript)
  - Tests (Jest)
  - Visual regression (Chromatic)
  - Accessibility (axe)
  - Bundle size impact
````

**C. Governance Structure**

```typescript
// RFC (Request for Comments) Template
/**
 * RFC: [Component Name]
 *
 * Author: [Name]
 * Date: [YYYY-MM-DD]
 * Status: [Draft | In Review | Approved | Implemented]
 *
 * ## Summary
 * Brief description of the proposed component/change.
 *
 * ## Motivation
 * Why is this needed? What problem does it solve?
 *
 * ## Detailed Design
 * - Component API
 * - Props/variants
 * - Accessibility considerations
 * - Example usage
 *
 * ## Alternatives Considered
 * What other approaches were considered?
 *
 * ## Adoption Strategy
 * - Migration path for existing consumers
 * - Breaking changes (if any)
 * - Deprecation timeline
 *
 * ## Open Questions
 * Unresolved issues or areas needing discussion
 */
```

**D. Release Process**

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v2

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build packages
        run: pnpm run build

      - name: Run tests
        run: pnpm run test

      - name: Visual regression tests
        run: pnpm run test:visual

      - name: Create Release PR
        uses: changesets/action@v1
        with:
          publish: pnpm run release
          commit: 'chore: release packages'
          title: 'chore: release packages'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Deploy Storybook
        run: pnpm run deploy:storybook
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_TOKEN }}
```

**E. Communication Channels**

```typescript
// Slack Integration for Releases
// .github/workflows/notify-release.yml
- name: Notify Slack
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "Design System v${{ steps.version.outputs.version }} released!",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Design System Release*\n\nVersion: `${{ steps.version.outputs.version }}`\n\n*Changes:*\n${{ steps.changelog.outputs.changes }}"
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "View Changelog"
                },
                "url": "${{ steps.release.outputs.url }}"
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "View Storybook"
                },
                "url": "https://storybook.company.com"
              }
            ]
          }
        ]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

**F. Version Migration Guides**

````markdown
# Migration Guide: v2.x to v3.x

## Breaking Changes

### Button Component

**Changed:** `style` prop renamed to `variant`

```diff
- <Button style="primary">Click</Button>
+ <Button variant="primary">Click</Button>
```

**Automated migration:**

```bash
npx @company/codemods v2-to-v3
```

### Theme API

**Changed:** Theme provider now requires explicit brand

```diff
- <ThemeProvider>
+ <ThemeProvider brand="acme">
```

## New Features

### Select Component

New accessible select component with keyboard navigation.

```tsx
<Select label="Choose option" options={options} value={value} onChange={setValue} />
```

See full documentation: https://storybook.company.com
````

**G. Design System Guild**

```typescript
// Guild Structure
const guild = {
  meetings: {
    frequency: 'Bi-weekly',
    duration: '1 hour',
    agenda: ['RFC reviews', 'Component demos', 'Adoption metrics', 'Q&A'],
  },

  roles: {
    chair: 'Rotates quarterly',
    designers: '2-3 representatives',
    engineers: '2-3 representatives',
    productManagers: '1 representative',
  },

  responsibilities: [
    'Review and approve RFCs',
    'Prioritize roadmap',
    'Maintain documentation',
    'Support consumers',
  ],
};
```

---

## V. Storybook Implementation

### Storybook Configuration

```typescript
// apps/storybook/.storybook/main.ts
import { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const config: StorybookConfig = {
  stories: ['../../../packages/react/src//*.stories.@(ts|tsx)', '../stories//*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    config.plugins = [...(config.plugins || []), vanillaExtractPlugin()];
    return config;
  },
  docs: {
    autodocs: true,
  },
};
export default config;
```

**Theme Switcher in Storybook:**

```typescript
// apps/storybook/.storybook/preview.tsx
import { Preview } from '@storybook/react';
import { ThemeProvider } from '@company/react';
import { lightTheme, darkTheme } from '@company/tokens';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      disable: true, // Use our theme system instead
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      return (
        <ThemeProvider defaultTheme={theme}>
          <div style={{ padding: '2rem' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
```

---

## VI. Performance

### Code Splitting Strategy

```typescript
// packages/react/src/index.ts

// Core exports (always included)
export { Button } from './Button/Button';
export { Input } from './Input/Input';

// Heavy components (lazy loadable)
export const Modal = lazy(() => import('./Modal/Modal'));
export const DataTable = lazy(() => import('./DataTable/DataTable'));

// Tree-shakeable icons
export * from '@company/icons';
```
