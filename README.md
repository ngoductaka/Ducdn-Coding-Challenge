# Enterprise Design System

A comprehensive, CSP-compliant design system built with React, TypeScript, and Vanilla Extract. Features runtime theme switching, full accessibility support (WCAG 2.1 AA), and a framework-agnostic architecture.

> **Status**: In Active Development | **Version**: 0.1.0

## Key Features

- **Runtime Theme Switching** - Light/dark mode with system preference detection
- **CSP Compliant** - Zero-runtime CSS-in-JS with build-time extraction
- **Fully Accessible** - WCAG 2.1 AA compliant with keyboard navigation
- **Type-Safe** - Full TypeScript support from tokens to components
- **Monorepo Architecture** - Turborepo for efficient builds
- **Storybook** - Interactive component documentation
- **Framework-Agnostic Core** - Ready for React, Vue, Angular adapters

## Quick Start

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Start Storybook (port 6006)
npm run storybook

# Run unit test for core component
npm run test-core
```

### Basic Usage

```tsx
import { ThemeProvider, Button, Tabs, Checkbox, Radio } from '@company/react';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Button variant="primary">Click me</Button>
      <Checkbox label="Accept terms" />
      <Radio label="Option 1" name="options" value="1" />
      <Tabs
        items={[
          { label: 'Home', value: 'home' },
          { label: 'Profile', value: 'profile' },
          { label: 'Settings', value: 'settings' },
        ]}
      />
    </ThemeProvider>
  );
}
```

## Packages

| Package            | Description                                 | Status      |
| ------------------ | ------------------------------------------- | ----------- |
| `@company/tokens`  | Design tokens (colors, spacing, typography) | Complete    |
| `@company/core`    | Core React components with Vanilla Extract  | Active      |
| `@company/react`   | React-specific wrappers & ThemeProvider     | Active      |
| `@company/icons`   | SVG icon library (14 icons)                 | Complete    |
| `@company/utils`   | Shared utility functions                    | Complete    |
| `@company/vanilla` | Framework-agnostic JS/CSS                   | In Progress |

## Components

### Available Components

| Component         | Variants                                         | Accessibility       | Stories  |
| ----------------- | ------------------------------------------------ | ------------------- | -------- |
| **Checkbox**      | Default, indeterminate, disabled, sizes, grouped | Full ARIA, keyboard | Complete |
| **Radio**         | Single, grouped, disabled, sizes, keyboard nav   | Full ARIA, keyboard | Complete |
| **Tabs**          | Items array, icons, badges, scroll               | Keyboard navigation | Complete |
| **ThemeSwitcher** | Light/dark toggle                                | ARIA labels         | Complete |

### Component Examples

#### Button

```tsx
<Button variant="primary" size="md">Primary Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

#### Checkbox

```tsx
// Basic checkbox
<Checkbox label="Accept terms and conditions" />

// Controlled checkbox
<Checkbox
  label="Subscribe to newsletter"
  checked={isSubscribed}
  onChange={(e) => setIsSubscribed(e.target.checked)}
/>

// Disabled state
<Checkbox label="Unavailable option" disabled />

// CheckboxGroup with options array
<Checkbox.CheckboxGroup
  name="preferences"
  options={[
    { label: 'Email notifications', value: 'email' },
    { label: 'SMS notifications', value: 'sms' },
    { label: 'Push notifications', value: 'push' },
  ]}
  value={selectedPreferences}
  onChange={(values) => setSelectedPreferences(values)}
/>

// CheckboxGroup with children
<Checkbox.CheckboxGroup name="features" onChange={handleChange}>
  <Checkbox label="Feature A" value="a" />
  <Checkbox label="Feature B" value="b" />
  <Checkbox label="Feature C" value="c" disabled />
</Checkbox.CheckboxGroup>

// Size variants
<Checkbox label="Default size" size="default" />
<Checkbox label="Small size" size="small" />
```

#### Radio

```tsx
// Radio group
<div>
  <Radio label="Option 1" name="choice" value="1" />
  <Radio label="Option 2" name="choice" value="2" />
  <Radio label="Option 3" name="choice" value="3" />
</div>

// Controlled radio
<Radio
  label="Selected option"
  name="controlled"
  value="option"
  checked={selectedValue === 'option'}
  onChange={(e) => setSelectedValue(e.target.value)}
/>

// Disabled radio
<Radio label="Unavailable" name="choice" value="disabled" disabled />

// RadioGroup with options array
<Radio.RadioGroup
  name="plan"
  options={[
    { label: 'Free Plan', value: 'free', helperText: '$0/month' },
    { label: 'Pro Plan', value: 'pro', helperText: '$10/month' },
    { label: 'Enterprise', value: 'enterprise', helperText: 'Custom pricing' },
  ]}
  value={selectedPlan}
  onChange={(value) => setSelectedPlan(value)}
/>

// RadioGroup with children (supports arrow key navigation)
<Radio.RadioGroup name="theme" onChange={handleThemeChange}>
  <Radio label="Light" value="light" />
  <Radio label="Dark" value="dark" />
  <Radio label="System" value="system" />
</Radio.RadioGroup>

// Size variants
<Radio label="Large (default)" size="large" value="lg" />
<Radio label="Small" size="small" value="sm" />
```

#### Tabs

```tsx
// Basic tabs with items array
<Tabs
  items={[
    { label: 'Overview', value: 'overview' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Reports', value: 'reports' },
    { label: 'Settings', value: 'settings', disabled: true },
  ]}
  defaultActiveKey="overview"
  onChange={(key) => console.log('Active tab:', key)}
/>

// Tabs with icons and counters
<Tabs
  items={[
    {
      label: 'Inbox',
      value: 'inbox',
      icon: <MailIcon />,
      counter: 12,
    },
    {
      label: 'Notifications',
      value: 'notifications',
      icon: <BellIcon />,
      counter: 3,
    },
  ]}
/>

// Scrollable tabs with navigation buttons
<Tabs
  scrollable
  items={[
    { label: 'Tab 1', value: '1' },
    { label: 'Tab 2', value: '2' },
    // ... many more tabs
  ]}
/>
```

## Theme System

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

## Security & CSP Compliance

This design system is built with **strict Content Security Policy** compliance:

- **Zero Runtime** - All CSS extracted at build time
- **No Style Injection** - Theme switching via CSS class names
- **CSS Custom Properties** - For dynamic values (CSP-safe)
- **No `unsafe-inline`** - Works with strict CSP headers
- **No `eval()`** - No code generation at runtime

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

## Accessibility (WCAG 2.1 AA)

All components follow WCAG 2.1 AA guidelines:

- **Semantic HTML** - Proper element usage
- **ARIA Attributes** - Roles, labels, states
- **Keyboard Navigation** - Tab, Enter, Escape, Arrows
- **Focus Management** - Visible indicators, logical order
- **Screen Reader Support** - Descriptive labels and announcements
- **Touch Targets** - Minimum 44x44px
- **Color Contrast** - 4.5:1 ratio for normal text
- **Motion Preferences** - Respects `prefers-reduced-motion`

### Accessibility Features by Component

| Component         | Features                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **Checkbox**      | Native input, keyboard toggle (Space), indeterminate state, CheckboxGroup with multi-select |
| **Radio**         | Native input, arrow key navigation in RadioGroup, grouped ARIA roles, Home/End keys         |
| **Button**        | Focus-visible states, disabled handling, ARIA labels                                        |
| **Tabs**          | Keyboard navigation (arrows), focus management, ARIA roles                                  |
| **ThemeSwitcher** | ARIA label for current theme state                                                          |

## Documentation

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

## Development

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
│   │   │   ├── Checkbox/
│   │   │   ├── Radio/
│   │   │   ├── Card/
│   │   │   └── Tab/
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

# Testing
npm run test             # Run all tests
npm run test:watch       # Run tests in watch mode
pnpm test -- --coverage  # Run tests with coverage report

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

## Testing

Comprehensive testing infrastructure using Jest and React Testing Library.

### Test Stack

- **Jest** - Test runner with jsdom environment
- **React Testing Library** - Component testing with user-centric queries
- **@testing-library/jest-dom** - Custom matchers for DOM assertions
- **@testing-library/user-event** - Advanced user interaction simulation
- **ts-jest** - TypeScript support for Jest

### Running Tests

```bash
# Run all tests
npm run test
# or
pnpm test

# Run tests in watch mode
npm run test:watch
# or
pnpm test --watch

# Run tests with coverage
pnpm test -- --coverage
```

### Test Coverage

Current test coverage for core components:

| Component    | Tests | Coverage Areas                                                     |
| ------------ | ----- | ------------------------------------------------------------------ |
| **Checkbox** | 20+   | Rendering, states, sizes, events, groups, accessibility, themes    |
| **Radio**    | 20+   | Rendering, states, sizes, events, groups, keyboard nav, themes     |
| **Tab**      | 15+   | Rendering, active/disabled states, events, icons, counters, themes |

### Test Examples

```tsx
// Basic rendering test
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

test('renders checkbox with label', () => {
  render(<Checkbox label="Accept terms" />);
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
  expect(screen.getByText('Accept terms')).toBeInTheDocument();
});

// User interaction test
import { fireEvent } from '@testing-library/react';

test('calls onChange when clicked', () => {
  const handleChange = jest.fn();
  render(<Checkbox label="Accept" onChange={handleChange} />);

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  expect(handleChange).toHaveBeenCalledTimes(1);
});

// Accessibility test
test('has proper ARIA attributes', () => {
  render(<Radio label="Option" value="opt" />);
  const radio = screen.getByRole('radio');

  expect(radio).toHaveAttribute('type', 'radio');
  expect(radio).toHaveAttribute('value', 'opt');
});

// Theme integration test
import { ThemeProvider } from '@company/react';

test('renders correctly in dark theme', () => {
  render(
    <ThemeProvider defaultTheme="dark">
      <Checkbox label="Dark mode checkbox" />
    </ThemeProvider>
  );
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
});
```

### Test Configuration

Tests are configured to:

- Mock Vanilla Extract CSS imports
- Support TypeScript with JSX
- Handle CSS modules with identity-obj-proxy
- Mock theme classes for consistent testing
- Collect coverage from all component files (excluding stories and styles)

See [jest.config.js](packages/core/jest.config.js) and [jest.setup.js](packages/core/jest.setup.js) for full configuration.

## Browser Support

- **Chrome** - Latest 2 versions
- **Firefox** - Latest 2 versions
- **Safari** - Latest 2 versions
- **Edge** - Latest 2 versions

Requires ES6+ support. IE11 is not supported.

## Roadmap

### Completed (v0.1)

- [x] Theme system with CSS variables
- [x] Light/dark theme switching
- [x] Button component (5 variants)
- [x] Checkbox component with indeterminate state, sizes, and CheckboxGroup
- [x] Radio component with RadioGroup and keyboard navigation
- [x] Card component with sub-components
- [x] Tabs component with scroll navigation
- [x] ThemeProvider and ThemeSwitcher
- [x] Storybook integration
- [x] CSP compliance
- [x] Testing infrastructure (Jest + React Testing Library)
- [x] Comprehensive test coverage for core components

### In Progress (v0.2)

- [ ] Select component with keyboard nav
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Expanded test coverage (Button, Card)
- [ ] Additional components:
  - [ ] Switch/Toggle
  - [ ] Textarea
  - [ ] Badge
  - [ ] Dropdown
  - [ ] DatePicker

### Future (v0.3+)

- [ ] Toast/Alert component
- [ ] Tooltip component
- [ ] Accordion component
- [ ] Vue adapter package
- [ ] Web Components wrapper
- [ ] Visual regression testing (Chromatic/Playwright)
- [ ] Bundle size monitoring
- [ ] Figma token sync
- [ ] Component generator CLI
- [ ] Accessibility testing with jest-axe

## Contributing

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

## License

MIT © 2025

## Acknowledgments

- **[Vanilla Extract](https://vanilla-extract.style/)** - Zero-runtime CSS-in-JS
- **[Turborepo](https://turbo.build/)** - High-performance monorepo
- **[Storybook](https://storybook.js.org/)** - Component development & docs
- **[Radix UI](https://www.radix-ui.com/)** - Accessibility patterns inspiration
- **[Shadcn UI](https://ui.shadcn.com/)** - Component API inspiration

---

**Built with TypeScript, React, and Vanilla Extract**

For detailed architecture information, see [solution.md](./solution.md).
