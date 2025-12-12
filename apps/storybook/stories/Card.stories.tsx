import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from '@company/react';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content area. You can put any content here.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary">Action</Button>
          <Button variant="outline">Cancel</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <CardHeader>
          <CardTitle>Outlined Card</CardTitle>
          <CardDescription>This card has a border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content with outlined variant.</p>
        </CardContent>
      </>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <>
        <CardHeader>
          <CardTitle>Filled Card</CardTitle>
          <CardDescription>This card has a background color</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content with filled variant.</p>
        </CardContent>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    interactive: true,
    onClick: () => alert('Card clicked!'),
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Click me!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card is clickable and focusable.</p>
        </CardContent>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    variant: 'elevated',
    padding: 'none',
    children: (
      <div style={{ padding: '24px' }}>
        <CardTitle>Custom Padding</CardTitle>
        <p style={{ marginTop: '8px' }}>
          This card has no default padding, allowing for custom layouts.
        </p>
      </div>
    ),
  },
};

export const Simple: Story = {
  args: {
    variant: 'elevated',
    children: (
      <CardContent>
        <p>A simple card with just content.</p>
      </CardContent>
    ),
  },
};
