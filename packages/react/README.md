# @company/react

React component library for the design system. This package provides React-specific wrappers and utilities built on top of `@company/core`.

## Installation

```bash
pnpm add @company/react react react-dom
```

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@company/react';

function App() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a card component from the design system.</p>
        <Button variant="primary" onClick={() => alert('Clicked!')}>
          Click me
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Components

All components from `@company/core` are re-exported:

- **Button** - Button component with multiple variants
- **Card** - Card container component
- **CardHeader** - Card header section
- **CardTitle** - Card title
- **CardDescription** - Card description
- **CardContent** - Card content area
- **CardFooter** - Card footer section

## Styling

Import the Vanilla Extract styles in your app:

```tsx
import '@company/core/styles.css';
```

Or if using a bundler that supports Vanilla Extract, styles will be automatically injected.
