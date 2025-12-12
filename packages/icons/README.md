# @company/icons

SVG icon library for the design system. Provides a collection of commonly used icons as React components.

## Installation

```bash
pnpm add @company/icons react
```

## Usage

```tsx
import {
  CheckIcon,
  XIcon,
  SearchIcon,
  SettingsIcon,
  HomeIcon,
} from '@company/icons';

function App() {
  return (
    <div>
      <CheckIcon size={24} color="green" />
      <SearchIcon size={20} />
      <SettingsIcon className="icon" />
    </div>
  );
}
```

## Available Icons

- **CheckIcon** - Checkmark icon
- **XIcon** - Close/X icon
- **PlusIcon** - Plus/add icon
- **MinusIcon** - Minus/subtract icon
- **ChevronRightIcon** - Right chevron
- **ChevronLeftIcon** - Left chevron
- **ChevronDownIcon** - Down chevron
- **ChevronUpIcon** - Up chevron
- **SearchIcon** - Search/magnifying glass
- **SettingsIcon** - Settings/gear icon
- **HomeIcon** - Home icon
- **UserIcon** - User/profile icon
- **AlertCircleIcon** - Alert/warning icon
- **InfoIcon** - Information icon

## Props

All icons accept the following props:

- `size` - Icon size (number or string, default: 24)
- `color` - Icon color (default: 'currentColor')
- `className` - Additional CSS class
- All standard SVG element props

## Custom Icons

Use the base `Icon` component to create custom icons:

```tsx
import { Icon, IconProps } from '@company/icons';

export const CustomIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="..." />
    </Icon>
  );
};
```
