import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@company/core';
import { SearchIcon, UserIcon, AlertCircleIcon, CheckIcon, XIcon } from '@company/icons';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input with label
 */
export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

/**
 * Input with helper text providing additional context
 */
export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Choose a unique username between 3-20 characters',
  },
};

/**
 * Input in error state with error message
 */
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

/**
 * Required input with asterisk indicator
 */
export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    required: true,
  },
};

/**
 * Disabled input that cannot be edited
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'Read-only value',
  },
};

/**
 * Small size variant
 */
export const SmallSize: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
};

/**
 * Medium size variant (default)
 */
export const MediumSize: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size',
    size: 'md',
  },
};

/**
 * Large size variant
 */
export const LargeSize: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
};

/**
 * Password input type
 */
export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters with one uppercase and one number',
    required: true,
  },
};

/**
 * Search input with search icon
 */
export const Search: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search for anything...',
    iconLeft: <SearchIcon size={20} />,
  },
};

/**
 * User input with user icon
 */
export const WithUserIcon: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    iconLeft: <UserIcon size={20} />,
    helperText: 'Your unique identifier',
  },
};

/**
 * Input with icon on the right side
 */
export const WithRightIcon: Story = {
  args: {
    label: 'Verification Code',
    placeholder: 'Enter code',
    iconRight: <CheckIcon size={20} />,
    helperText: 'Code sent to your email',
  },
};

/**
 * Input with both left and right icons
 */
export const WithBothIcons: Story = {
  args: {
    label: 'Search Users',
    placeholder: 'Type to search...',
    iconLeft: <SearchIcon size={20} />,
    iconRight: <XIcon size={20} />,
  },
};

/**
 * Error state with error icon
 */
export const ErrorWithIcon: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
    value: 'invalid@',
    error: 'Please provide a valid email address',
    iconRight: <AlertCircleIcon size={20} color="var(--colors-feedback-error)" />,
  },
};

/**
 * Number input for numeric values
 */
export const NumberInput: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '18',
    min: 0,
    max: 120,
    helperText: 'Enter your age',
  },
};

/**
 * Telephone input
 */
export const TelephoneInput: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
    helperText: 'Include country code',
  },
};

/**
 * URL input
 */
export const URLInput: Story = {
  args: {
    label: 'Website',
    type: 'url',
    placeholder: 'https://example.com',
    helperText: 'Enter your website URL',
  },
};

/**
 * Date input
 */
export const DateInput: Story = {
  args: {
    label: 'Date of Birth',
    type: 'date',
  },
};

/**
 * Input without label (aria-label provided)
 */
export const WithoutLabel: Story = {
  args: {
    placeholder: 'Search...',
    'aria-label': 'Search',
    iconLeft: <SearchIcon size={20} />,
  },
};

/**
 * Input with maximum length
 */
export const WithMaxLength: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    maxLength: 100,
    helperText: 'Maximum 100 characters',
  },
};

/**
 * Read-only input
 */
export const ReadOnly: Story = {
  args: {
    label: 'User ID',
    value: 'usr_1234567890',
    readOnly: true,
    helperText: 'This value cannot be changed',
  },
};

/**
 * Small input with icon and error
 */
export const SmallWithIconAndError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    size: 'sm',
    iconLeft: <UserIcon size={16} />,
    error: 'Username is already taken',
    value: 'john',
  },
};

/**
 * Large input with search icon
 */
export const LargeWithSearch: Story = {
  args: {
    label: 'Global Search',
    placeholder: 'Search across all content...',
    size: 'lg',
    iconLeft: <SearchIcon size={24} />,
  },
};
