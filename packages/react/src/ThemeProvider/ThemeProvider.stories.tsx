import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, ThemeSwitcher } from '@company/react';
import { Button } from '@company/core';

const meta = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Theme switcher demonstration
 */
export const WithThemeSwitcher: Story = {
  args: {
    defaultTheme: 'light',
    children: null,
  },
  render: () => {
    return (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', minWidth: '400px' }}>
          <div
            style={{
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ margin: 0 }}>Theme Demo</h2>
            <ThemeSwitcher showLabel />
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

/**
 * Dark theme by default
 */
export const DarkThemeDefault: Story = {
  args: {
    defaultTheme: 'dark',
    children: null,
  },
  render: () => {
    return (
      <ThemeProvider defaultTheme="dark">
        <div style={{ padding: '2rem', minWidth: '400px' }}>
          <div
            style={{
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ margin: 0 }}>Dark Theme</h2>
            <ThemeSwitcher showLabel />
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

/**
 * Multiple components showcasing theme
 */
export const ComponentShowcase: Story = {
  args: {
    defaultTheme: 'light',
    children: null,
  },
  render: () => {
    return (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: '2rem', maxWidth: '600px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
          >
            <h2 style={{ margin: 0 }}>Component Showcase</h2>
            <ThemeSwitcher />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <section>
              <h3>Buttons</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </section>

            <section>
              <h3>Button Sizes</h3>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </section>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
