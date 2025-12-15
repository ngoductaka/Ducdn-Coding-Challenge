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

## Technology Selection & Framework Analysis

### UI Framework: React

**Why React:** Component library focus + largest ecosystem (25M NPM downloads/week) + 65% job market share + framework-agnostic via vanilla layer.

---

#### **1. React** ✓ **SELECTED**

**Key Strengths:**
- **Ecosystem Leader**: 25M weekly downloads, 65% job market share, 95% Fortune 500 adoption
- **Component-First Architecture**: Perfect for design system libraries
- **Developer Availability**: Largest talent pool, minimal onboarding
- **Framework-Agnostic Path**: Easy vanilla JS layer extraction
- **TypeScript Excellence**: Best-in-class type safety and IDE support
- **Stable & Mature**: React 18+ with minimal breaking changes

**Trade-offs:**
- Larger bundle (~45KB) vs alternatives
- Requires build tooling (standard practice)

---

#### **2. Vue 3**

**Key Strengths:**
- Excellent DX with intuitive API
- Smaller bundle (~35KB) and faster benchmarks
- Growing ecosystem (5M weekly downloads, 15% job market)

**Limitations:**
- Smaller talent pool and enterprise adoption
- SFC approach less suitable for design systems
- Harder to create framework-agnostic layer

---

#### **3. Angular**

**Key Strengths:**
- Full-featured framework with everything included
- TypeScript-native with strong typing

**Limitations:**
- Declining adoption (~8% market share)
- Largest bundle (~60-80KB) and steeper learning curve
- Not optimized for component library architecture
- Difficult framework-agnostic extraction

---

### **Decision Rationale: Why React**

**Primary Reasons:**

1. **Largest Ecosystem (Critical)**: 
   - 25M+ weekly NPM downloads
   - Unmatched library availability
   - Design system specific tooling (Storybook, React Aria, Radix UI, etc.)
   - Most community resources and solutions to common problems

2. **Developer Availability (Critical)**:
   - 65% of frontend job postings require React
   - Easiest to hire experienced developers
   - Minimal onboarding time for most frontend engineers
   - Large internal knowledge base in most companies

3. **Enterprise Adoption (Critical)**:
   - 95% of Fortune 500 use React in some capacity
   - Meta-backed with long-term commitment
   - Battle-tested at massive scale
   - Clear roadmap and stability guarantees

4. **Component Library Focus (High Priority)**:
   - React's component model is perfect for design systems
   - Easy to create composable, reusable components
   - Props-based API is intuitive for consumers
   - Ref forwarding, context, hooks all support library patterns

5. **Framework-Agnostic Strategy (High Priority)**:
   - React components can wrap vanilla JS/CSS layer
   - Easy to create adapters for other frameworks
   - Web Components can be built from React components
   - Doesn't lock consumers into React-only approach

6. **TypeScript Excellence (High Priority)**:
   - Industry-leading TypeScript support
   - Excellent type inference for props and components
   - Strong typing helps prevent API misuse
   - Great IDE experience with autocomplete

7. **Tooling Maturity (High Priority)**:
   - Vite for lightning-fast builds
   - Storybook for component documentation
   - Jest + React Testing Library for testing
   - React DevTools for debugging
   - Best-in-class development experience

8. **Stability and Longevity**:
   - React 18+ is mature and stable
   - Minimal breaking changes between versions
   - Long-term support guaranteed by Meta
   - Clear upgrade paths with codemods

**Trade-offs Accepted:**

-  **Larger Bundle Size**: React is ~45KB vs Svelte's ~2KB
  - *Acceptable because*: Most apps already use React, incremental cost is minimal
  
-  **Not the Fastest**: Vue and Svelte benchmark better
  - *Acceptable because*: React performance is excellent for 99% of use cases, React Compiler improves this further

---

### **Hybrid Architecture: React + Web Components**

**Recommended Approach:**

```
Layer 1: Vanilla JS/CSS (Vanilla Extract)
         
Layer 2: React Components (@company/react)
         
Layer 3: Web Components (@company/web-components) [Optional]
         
Layer 4: Framework Adapters (Vue, Angular, etc.)
```

**Why This Works:**

1. **Primary consumers use React directly** - Best DX, smallest bundle
2. **Non-React apps can use Web Components** - Framework agnostic
3. **Single source of truth** - All implementations wrap same vanilla layer
4. **Progressive adoption** - Teams can migrate at their own pace

**Example Implementation:**

```typescript
// Layer 1: Vanilla (framework-agnostic)
// packages/vanilla/src/button/button.css.ts
export const button = style({ /* styles */ });

// Layer 2: React (primary)
// packages/react/src/Button/Button.tsx
export const Button = ({ children, ...props }) => (
  <button className={button} {...props}>
    {children}
  </button>
);

// Layer 3: Web Component (for non-React)
// packages/web-components/src/button.ts
@customElement('ds-button')
export class DSButton extends LitElement {
  render() {
    return html`<button class="${button}"><slot></slot></button>`;
  }
}

// Layer 4: Vue Adapter (if needed)
// packages/vue/src/Button.vue
<template>
  <ds-button><slot /></ds-button>
</template>
```

---

### **Alternative Scenario Recommendations**

**If starting fresh with no existing React investment:**
- **Still choose React** - Ecosystem and hiring advantages outweigh performance differences

**If performance is absolute top priority:**
- **Consider Svelte or Solid** - But accept significant ecosystem trade-offs

**If you need true framework-agnostic from day one:**
- **Start with Lit (Web Components)** - But wrap with React for React consumers

**If your organization is Vue-heavy:**
- **Consider Vue** - But you'll struggle with third-party library availability

**If building for internal use only:**
- **Match your organization's primary framework** - Developer familiarity trumps ecosystem size

---

### CSS-in-JS Framework Comparison

This section provides a comprehensive analysis of styling solutions evaluated for the design system, with focus on CSP compliance, performance, developer experience, and production readiness.

#### **Evaluation Criteria**

| Criteria | Weight | Description |
|----------|--------|-------------|
| CSP Compliance | Critical | Must work with `style-src 'self'` (no `'unsafe-inline'`) |
| Performance |  High | Bundle size, runtime overhead, build time |
| Developer Experience |  High | TypeScript support, IDE tooling, learning curve |
| Framework Agnostic |  High | Ability to support React, Vue, Angular, etc. |
| Production Ready | Critical | Stability, maintenance, community support |
| Theming Support | Medium | Runtime theme switching capabilities |

---

#### **1. Vanilla Extract**
**Overview:**
Zero-runtime CSS-in-JS library that extracts styles to static CSS files at build time, using TypeScript for type-safe styling.

**Pros:**
-  **Perfect CSP Compliance**: All CSS extracted at build time, zero runtime injection
-  **Zero Runtime Overhead**: No JavaScript executed for styling at runtime
-  **Type Safety**: Full TypeScript integration with autocomplete
-  **Small Bundle Size**: Only CSS class name strings in JS bundle (~1-2KB per component)
-  **CSS Variables Support**: First-class support for CSS custom properties
-  **Framework Agnostic**: Outputs standard CSS that works everywhere
-  **Modern CSS Features**: Supports all modern CSS including container queries, layers
-  **Great DX**: Excellent IDE support, clear error messages
-  **Active Development**: Maintained by Seek (large Australian company)

**Cons:**
-  **Build Time Required**: Cannot generate styles dynamically at runtime (by design)
-  **Learning Curve**: New API to learn vs standard CSS
-  **Smaller Ecosystem**: Fewer third-party integrations compared to Styled Components

**CSP Compatibility:**  **100%** - No inline styles generated

#### **2. Styled Components**

**Overview:**
Popular CSS-in-JS library using tagged template literals, with runtime style injection.

**Pros:**
-  **Large Ecosystem**: Extensive community, plugins, tooling
-  **Familiar Syntax**: CSS syntax in JavaScript
-  **Dynamic Styling**: Easy to use props for conditional styling
-  **Great DX**: Mature tooling, good documentation
-  **Server-Side Rendering**: Good SSR support

**Cons:**
-  **CSP Incompatible**: Requires `'unsafe-inline'` or complex nonce/hash setup
-  **Runtime Overhead**: ~15-20KB base + parsing CSS at runtime
-  **Performance Issues**: Style injection causes layout thrashing
-  **Bundle Size**: Larger JavaScript bundles
-  **Server Overhead**: Increases SSR time

**CSP Compatibility:**  **0%** - Requires `unsafe-inline` or per-request nonces

**Verdict:**  **Not suitable for strict CSP environments**

---

#### **3. CSS Modules**

**Overview:**
Traditional CSS files with scoped class names, no JavaScript involved.

**Pros:**
-  **Perfect CSP**: Standard CSS, no runtime
-  **Zero Runtime**: Pure CSS
-  **Universal Support**: Works with all build tools
-  **Simple**: Just regular CSS
-  **Fast Build**: No extra processing
-  **Easy Migration**: Can use existing CSS

**Cons:**
-  **No Type Safety**: No TypeScript integration for styles
-  **No Dynamic Values**: Can't access JS variables
-  **Theming Complexity**: Requires CSS variables or duplicate files
-  **Boilerplate**: Separate files for each component
-  **Limited Composition**: Harder to share styles between components
-  **No Autocomplete**: No IDE suggestions for class names

**CSP Compatibility:**  **100%** - Standard CSS

---

#### **4. Tailwind CSS**

**Overview:**
Utility-first CSS framework with no JavaScript runtime.

**Pros:**
-  **Perfect CSP**: Pure CSS
-  **Zero Runtime**: No JavaScript
-  **Small Production Bundles**: Purged unused styles
-  **Fast Development**: Pre-built utilities
-  **Great Ecosystem**: Plugins, tools, community
-  **Easy Learning**: Just CSS classes

**Cons:**
-  **Not CSS-in-JS**: Doesn't meet the requirement
-  **Verbose JSX**: Long className strings
-  **No Type Safety**: Class names are strings
-  **Component Abstraction**: Harder to create reusable components
-  **Design Token Management**: Different approach than traditional design systems
-  **Framework Specificity**: Harder to make truly framework-agnostic

**CSP Compatibility:**  **100%** - Standard CSS
**Verdict:**  **Not suitable for component-based design system architecture**

---

### **Decision Rationale: Why Vanilla Extract**

**Primary Reasons:**

1. **CSP Compliance** (Critical): Only solution that achieves 100% CSP compliance with zero compromises. No nonces, no hashes, no `unsafe-inline` needed.

2. **Performance** (High Priority): 
   - Zero runtime overhead
   - Smallest JavaScript bundle size
   - All CSS can be cached and served via CDN
   - No FOUC (Flash of Unstyled Content) issues

3. **Developer Experience** (High Priority):
   - Full TypeScript integration with type-safe styles
   - Excellent IDE autocomplete and error checking
   - Clear and helpful error messages
   - Modern API that feels natural

4. **Framework Agnostic** (High Priority):
   - Outputs standard CSS that works anywhere
   - Can be consumed by React, Vue, Angular, Web Components
   - No framework-specific runtime requirements

5. **Production Readiness** (Critical):
   - Used by major companies (Seek, etc.)
   - Active development and maintenance
   - Stable API with semantic versioning
   - Good documentation and examples

6. **Design Token Integration**:
   - First-class CSS variables support
   - Perfect for design token systems
   - Easy theme switching without runtime overhead

7. **Modern CSS Features**:
   - CSS Container Queries
   - CSS Cascade Layers
   - CSS Nesting (via PostCSS)
   - All future CSS features work automatically

**Trade-offs Accepted:**

-  **No Dynamic Styles**: Cannot generate completely new styles at runtime (use CSS variables instead)
-  **Build Step Required**: Adds ~2-3 seconds to build time
-  **New API**: Team needs to learn Vanilla Extract API

**These trade-offs are acceptable because:**
- Design systems rarely need truly dynamic styles (CSS variables handle 99% of use cases)
- Build time is negligible compared to security and performance benefits
- API is intuitive and well-documented, team ramp-up time is minimal

---

### **Alternative Scenario Recommendations**

**If CSP is NOT a hard requirement:**
- **Use Emotion** - More mature ecosystem, good DX, acceptable performance

**If targeting a single framework (React only):**
- **Consider Panda CSS** - Modern DX, great performance, growing ecosystem

**If simplicity is paramount:**
- **Use CSS Modules** - Simple, fast, universally supported

**If you need the absolute smallest bundles:**
- **Monitor StyleX** - Best performance metrics, but wait for ecosystem maturity

**If you want utility-first approach:**
- **Use Tailwind** - But with component wrapper layer for design system APIs

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
- Git tags for tracking releases and enabling rollbacks
- Automated npm publishing via CI/CD pipeline
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

---

#### **Git Tagging Strategy**

**Automated Tags:**
- Format: `@company/react@2.4.0`
- Created automatically by Changesets
- Includes changelog in tag annotation
- Pushed with `--follow-tags`

---

#### **Automated Publishing Pipeline**

**On Tag Push (`@company/*@*.*.*`):**
1. Run tests + type-check + build
2. Upload coverage to Codecov
3. Verify bundle sizes
4. Publish to NPM with provenance
5. Create GitHub release
6. Deploy Storybook
7. Notify team via Slack

**Package Configuration Essentials:**
```json
{
  "publishConfig": { "access": "public", "provenance": true },
  "exports": {
    ".": { "import": "./dist/index.js", "types": "./dist/index.d.ts" },
    "./styles.css": "./dist/styles.css"
  },
  "sideEffects": ["*.css"]
}
```

---

#### **Quality Gates**

**Pre-commit (Husky + Lint-staged):**
- Auto-fix: ESLint + Prettier
- Type-check changed files
- Block console.log statements
- Enforce conventional commits: `feat(scope): description`

**Commit Scopes:** core, react, tokens, icons, vanilla, utils

**CI/CD Pipeline (Parallel Jobs):**
- Lint (ESLint + Prettier)
- Type-check (TypeScript)
- Test (Jest, 80% coverage minimum)
- Build verification
- Bundle size check (fails if >50KB increase)
- Visual regression (Chromatic)

**4. Bundle Size Monitoring**

```typescript
// scripts/size-check.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { gzipSize } from 'gzip-size';

const execAsync = promisify(exec);

interface SizeReport {
  package: string;
  size: number;
  gzipSize: number;
  delta: number;
}

async function checkBundleSize() {
  const packages = ['core', 'react', 'tokens', 'vanilla', 'icons'];
  const reports: SizeReport[] = [];

  for (const pkg of packages) {
    const distPath = path.join(process.cwd(), 'packages', pkg, 'dist');

    try {
      // Get main bundle size
      const indexPath = path.join(distPath, 'index.js');
      const content = await fs.readFile(indexPath);

      const size = content.length;
      const gzip = await gzipSize(content);

      // Compare with baseline
      const baselinePath = path.join(process.cwd(), '.size-snapshot.json');
      let baseline: Record<string, number> = {};

      try {
        baseline = JSON.parse(await fs.readFile(baselinePath, 'utf-8'));
      } catch {
        // No baseline exists
      }

      const previousSize = baseline[pkg] || 0;
      const delta = size - previousSize;

      reports.push({
        package: pkg,
        size,
        gzipSize: gzip,
        delta,
      });

      // Update baseline
      baseline[pkg] = size;
      await fs.writeFile(baselinePath, JSON.stringify(baseline, null, 2));
    } catch (error) {
      console.error(`Failed to check size for ${pkg}:`, error);
    }
  }

  // Print report
  console.log('\n Bundle Size Report\n');
  console.table(
    reports.map((r) => ({
      Package: r.package,
      'Size (KB)': (r.size / 1024).toFixed(2),
      'Gzip (KB)': (r.gzipSize / 1024).toFixed(2),
      'Delta (KB)': (r.delta / 1024).toFixed(2),
    }))
  );

  // Check if any package exceeded threshold
  const threshold = 50 * 1024; // 50KB increase limit
  const exceeded = reports.filter((r) => r.delta > threshold);

  if (exceeded.length > 0) {
    console.error('\n Bundle size increased significantly:');
    exceeded.forEach((r) => {
      console.error(`  - ${r.package}: +${(r.delta / 1024).toFixed(2)}KB`);
    });
    process.exit(1);
  }

  console.log('\n Bundle sizes are within acceptable limits\n');
}

checkBundleSize().catch(console.error);
```

**5. Changesets Configuration**

```json
// .changeset/config.json
{
  "changelog": [
    "@changesets/changelog-github",
    {
      "repo": "company/design-system"
    }
  ],
  "commit": false,
  "fixed": [],
  "linked": [
    ["@company/core", "@company/react"]
  ],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": [
    "@company/storybook"
  ]
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

---

#### **Testing Strategy**

**Coverage Requirements:**
- Minimum: 80% (branches, functions, lines, statements)
- Excludes: `.stories.tsx`, `.css.ts`, `dist/`

**Test Types:**
- Unit tests: Jest + React Testing Library
- Smoke tests: Verify build artifacts exist and import correctly
- Visual regression: Chromatic on Storybook stories
- Accessibility: Automated a11y checks in Storybook

---

#### **Developer Workflow**

```bash
# 1. Create branch
git checkout -b feat/add-tooltip

# 2. Develop + add changeset
pnpm changeset  # Select package, type (major/minor/patch), description

# 3. Local checks (auto-run on commit)
pnpm run lint && pnpm run test && pnpm run build

# 4. Commit
git commit -m "feat(core): add Tooltip component"
# Pre-commit hook: lint-staged, type-check, no console.log

# 5. Push + PR
git push origin feat/add-tooltip
# CI: lint, test, type-check, build, bundle size, visual regression

# 6. Merge → Auto-publish
# Changesets → version bump → git tag → NPM publish → Storybook deploy
```

**Version Strategy Matrix**

| Change Type         | Version Bump | Git Tag                     | Example           | Breaking?  |
| ------------------- | ------------ | --------------------------- | ----------------- | ---------- |
| New component       | Minor        | @company/core@1.1.0         | 1.0.0 → 1.1.0     | No         |
| New prop (optional) | Minor        | @company/react@1.2.0        | 1.1.0 → 1.2.0     | No         |
| Bug fix             | Patch        | @company/tokens@1.2.1       | 1.2.0 → 1.2.1     | No         |
| Prop removed        | Major        | @company/core@2.0.0         | 1.2.1 → 2.0.0     | Yes        |
| Required prop added | Major        | @company/react@3.0.0        | 2.0.0 → 3.0.0     | Yes        |
| Token value changed | Patch/Minor  | @company/tokens@3.1.0       | Context-dependent | Usually No |

**Pre-release Tags**

```bash
# Alpha releases (experimental)
@company/react@2.4.0-alpha.1
@company/react@2.4.0-alpha.2

# Beta releases (feature complete)
@company/react@2.4.0-beta.1
@company/react@2.4.0-beta.2

# Release candidates (production testing)
@company/react@2.4.0-rc.1
@company/react@2.4.0-rc.2

# Stable release
@company/react@2.4.0
```

**Compatibility Layer**

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

#### **Strategy 2: Data Attributes + CSS Selectors**

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

#### **Strategy 3: CSS Grid/Flexbox for Layout**

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

#### **Strategy 4: Complex Dynamic Scenarios**

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

## IV. Storybook Implementation

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

## V. Performance

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
