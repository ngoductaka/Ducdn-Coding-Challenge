# 🎨 Enterprise Design System

A comprehensive, CSP-compliant design system built with React, TypeScript, and Vanilla Extract. Features runtime theme switching, full accessibility support (WCAG 2.1 AA), and a framework-agnostic architecture.

> **Status**: 🚧 In Active Development | **Version**: 0.1.0

## ✨ Key Features

- 🎨 **Runtime Theme Switching** - Light/dark mode with system preference detection
- 🔒 **CSP Compliant** - Zero-runtime CSS-in-JS with build-time extraction
- ♿ **Fully Accessible** - WCAG 2.1 AA compliant with keyboard navigation
- 🎯 **Type-Safe** - Full TypeScript support from tokens to components
- 📦 **Monorepo Architecture** - Turborepo for efficient builds
- 🎭 **Storybook** - Interactive component documentation
- 🌐 **Framework-Agnostic Core** - Ready for React, Vue, Angular adapters

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Start Storybook (port 6006 or 6007)
npm run storybook
```

### Basic Usage

```tsx
import { ThemeProvider, Button, Input, Modal } from '@company/react';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Button variant="primary">Click me</Button>
      <Input label="Email" type="email" />
    </ThemeProvider>
  );
}
```

## 📦 Packages

| Package            | Description                                 | Status         |
| ------------------ | ------------------------------------------- | -------------- |
| `@company/tokens`  | Design tokens (colors, spacing, typography) | ✅ Complete    |
| `@company/core`    | Core React components with Vanilla Extract  | ✅ Active      |
| `@company/react`   | React-specific wrappers & ThemeProvider     | ✅ Active      |
| `@company/icons`   | SVG icon library (14 icons)                 | ✅ Complete    |
| `@company/utils`   | Shared utility functions                    | ✅ Complete    |
| `@company/vanilla` | Framework-agnostic JS/CSS                   | 🚧 In Progress |

## 🎨 Components

### Available Components

| Component         | Variants                            | Accessibility           | Stories     |
| ----------------- | ----------------------------------- | ----------------------- | ----------- |
| **Button**        | 5 variants, 3 sizes                 | ✅ Full ARIA            | ✅ Complete |
| **Input**         | Text, email, password, etc.         | ✅ Labels, errors       | ✅ Complete |
| **Modal**         | Dialog with footer support          | ✅ Focus trap, keyboard | ✅ Complete |
| **Card**          | With header, title, content, footer | ✅ Semantic HTML        | ✅ Complete |
| **ThemeSwitcher** | Light/dark toggle                   | ✅ ARIA labels          | ✅ Complete |

### Component Examples

#### Button

```tsx
<Button variant="primary" size="md">Primary Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

#### Input

```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  error="Please enter a valid email"
  required
/>
```

#### Modal

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmation"
  footer={
    <>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>;
```

## 🎨 Theme System

### Using ThemeProvider

```tsx
import { ThemeProvider, ThemeSwitcher, useTheme } from '@company/react';

// Wrap your app
function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Header />
      <Main />
    </ThemeProvider>
  );
}

// Use the theme hook
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <h1>My App - {theme} mode</h1>
      <ThemeSwitcher showLabel />
    </header>
  );
}
```

### Theme Architecture

The system uses a **three-tier token architecture**:

```typescript
// 1. Primitive tokens (raw values)
import { colors, spacing } from '@company/tokens';
colors.brand[500]; // #0284c7
spacing[4]; // 1rem (16px)

// 2. Semantic tokens (purpose-driven)
import { semanticLight, semanticDark } from '@company/tokens';
semanticLight.colors.action.primary; // Maps to brand[600]
semanticDark.colors.background.primary; // Maps to neutral[900]

// 3. CSS Variables (runtime theming)
import { vars } from '@company/tokens';
vars.colors.action.primary; // CSS var that switches with theme
vars.spacing[4]; // CSS var for spacing
vars.typography.fontSize.base; // CSS var for font size
```

### Custom Component Styling

```tsx
import { style } from '@vanilla-extract/css';
import { vars } from '@company/tokens';

export const myComponent = style({
  backgroundColor: vars.colors.background.primary,
  color: vars.colors.text.primary,
  padding: vars.spacing[4],
  borderRadius: '0.375rem',

  ':hover': {
    backgroundColor: vars.colors.background.tertiary,
  },
});
```

## 🔒 Security & CSP Compliance

This design system is built with **strict Content Security Policy** compliance:

✅ **Zero Runtime** - All CSS extracted at build time  
✅ **No Style Injection** - Theme switching via CSS class names  
✅ **CSS Custom Properties** - For dynamic values (CSP-safe)  
✅ **No `unsafe-inline`** - Works with strict CSP headers  
✅ **No `eval()`** - No code generation at runtime

### Recommended CSP Header

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self';
  img-src 'self' data: https:;
  font-src 'self';
```

**How It Works:**

1. Vanilla Extract generates CSS at build time → `styles.css`
2. CSS variables defined in static stylesheet
3. Theme switching changes CSS class on `<html>` element
4. CSS variables update automatically (no inline styles)

## ♿ Accessibility (WCAG 2.1 AA)

All components follow WCAG 2.1 AA guidelines:

- ✅ **Semantic HTML** - Proper element usage
- ✅ **ARIA Attributes** - Roles, labels, states
- ✅ **Keyboard Navigation** - Tab, Enter, Escape, Arrows
- ✅ **Focus Management** - Visible indicators, logical order
- ✅ **Screen Reader Support** - Descriptive labels and announcements
- ✅ **Touch Targets** - Minimum 44x44px
- ✅ **Color Contrast** - 4.5:1 ratio for normal text
- ✅ **Motion Preferences** - Respects `prefers-reduced-motion`

### Accessibility Features by Component

| Component         | Features                                                    |
| ----------------- | ----------------------------------------------------------- |
| **Modal**         | Focus trap, Escape key, focus restoration                   |
| **Input**         | Associated labels, error announcements, required indicators |
| **Button**        | Focus-visible states, disabled handling, ARIA labels        |
| **ThemeSwitcher** | ARIA label for current theme state                          |

## 📖 Documentation

### Storybook

Interactive component documentation with live examples:

```bash
npm run storybook
# Opens http://localhost:6006 (or 6007 if 6006 is busy)
```

**Features:**

- Live component previews
- Editable props/controls
- Theme switcher in toolbar
- Auto-generated documentation
- Code examples

### Architecture Docs

- **[solution.md](./solution.md)** - Complete architecture proposal (2,300+ lines)
- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Current implementation status
- **Storybook** - Component API documentation

## 🛠️ Development

### Project Structure

```
design-system/
├── packages/
│   ├── tokens/              # Design tokens & theme system
│   │   ├── src/
│   │   │   ├── tokens.ts    # Primitive tokens
│   │   │   ├── semantic.ts  # Semantic layers
│   │   │   └── theme.css.ts # Vanilla Extract themes
│   │   └── package.json
│   │
│   ├── core/                # Core React components
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── Card/
│   │   └── package.json
│   │
│   └── react/               # React utilities
│       ├── src/
│       │   ├── ThemeProvider/
│       │   └── ThemeSwitcher/
│       └── package.json
│
├── apps/
│   └── storybook/           # Documentation site
│
└── tooling/
    ├── eslint-config/       # Shared linting
    └── tsconfig/            # Shared TypeScript config
```

### Available Scripts

```bash
# Development
npm run dev              # Watch mode for all packages
npm run build            # Build all packages
npm run lint             # Lint all code
npm run type-check       # TypeScript validation
npm run clean            # Remove build artifacts

# Documentation
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build static Storybook

# Versioning (Changesets)
npm run changeset        # Create a changeset
npm run version-packages # Update package versions
npm run release          # Build and publish packages
```

### Adding a New Component

1. **Create component structure:**

   ```bash
   packages/core/src/NewComponent/
   ├── NewComponent.tsx
   ├── NewComponent.css.ts
   ├── NewComponent.stories.tsx
   └── index.ts
   ```

2. **Implement the component:**

   ```tsx
   // NewComponent.tsx
   import React from 'react';
   import * as styles from './NewComponent.css';

   export interface NewComponentProps {
     variant?: 'default' | 'primary';
     children: React.ReactNode;
   }

   export const NewComponent: React.FC<NewComponentProps> = ({ variant = 'default', children }) => {
     return <div className={styles.root}>{children}</div>;
   };
   ```

3. **Add styles with theme variables:**

   ```tsx
   // NewComponent.css.ts
   import { style } from '@vanilla-extract/css';
   import { vars } from '@company/tokens';

   export const root = style({
     backgroundColor: vars.colors.background.primary,
     color: vars.colors.text.primary,
     padding: vars.spacing[4],
   });
   ```

4. **Export from index:**

   ```typescript
   // packages/core/src/index.ts
   export * from './NewComponent';
   ```

5. **Add Storybook story:**

   ```tsx
   // NewComponent.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { NewComponent } from './NewComponent';

   const meta: Meta<typeof NewComponent> = {
     title: 'Components/NewComponent',
     component: NewComponent,
   };

   export default meta;

   export const Default: StoryObj<typeof meta> = {
     args: {
       children: 'Hello World',
     },
   };
   ```

6. **Build and test:**
   ```bash
   npm run build
   npm run storybook
   ```

## 🧪 Testing (Planned)

Testing setup is planned but not yet implemented. Proposed stack:

- **Jest** - Test runner
- **React Testing Library** - Component testing
- **jest-axe** - Accessibility testing
- **Chromatic** - Visual regression testing

Example test structure:

```tsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

test('Button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 📊 Browser Support

- **Chrome** - Latest 2 versions
- **Firefox** - Latest 2 versions
- **Safari** - Latest 2 versions
- **Edge** - Latest 2 versions

Requires ES6+ support. IE11 is not supported.

## 🗺️ Roadmap

### ✅ Completed (v0.1)

- [x] Theme system with CSS variables
- [x] Light/dark theme switching
- [x] Button component (5 variants)
- [x] Input component with validation
- [x] Modal component with accessibility
- [x] Card component with sub-components
- [x] ThemeProvider and ThemeSwitcher
- [x] Storybook integration
- [x] CSP compliance

### 🚧 In Progress (v0.2)

- [ ] Select component with keyboard nav
- [ ] Testing infrastructure (Jest + RTL)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Additional components:
  - [ ] Checkbox
  - [ ] Radio
  - [ ] Switch/Toggle
  - [ ] Textarea
  - [ ] Badge

### 🔮 Future (v0.3+)

- [ ] Toast/Alert component
- [ ] Tooltip component
- [ ] Tabs component
- [ ] Accordion component
- [ ] Vue adapter package
- [ ] Web Components wrapper
- [ ] Visual regression testing (Chromatic)
- [ ] Bundle size monitoring
- [ ] Figma token sync
- [ ] Component generator CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Add tests (when testing is set up)
5. Create a changeset: `npm run changeset`
6. Commit your changes: `git commit -am 'Add new feature'`
7. Push to the branch: `git push origin feature/my-feature`
8. Submit a pull request

### Contribution Guidelines

- Follow existing code style
- Write TypeScript with strict types
- Ensure accessibility (WCAG 2.1 AA)
- Add Storybook stories for new components
- Update documentation
- Create changesets for versioned packages

## 📄 License

MIT © 2025

## 🙏 Acknowledgments

- **[Vanilla Extract](https://vanilla-extract.style/)** - Zero-runtime CSS-in-JS
- **[Turborepo](https://turbo.build/)** - High-performance monorepo
- **[Storybook](https://storybook.js.org/)** - Component development & docs
- **[Radix UI](https://www.radix-ui.com/)** - Accessibility patterns inspiration
- **[Shadcn UI](https://ui.shadcn.com/)** - Component API inspiration

---

**Built with ❤️ using TypeScript, React, and Vanilla Extract**

For detailed architecture information, see [solution.md](./solution.md).
