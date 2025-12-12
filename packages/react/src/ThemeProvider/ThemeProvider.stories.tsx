import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, ThemeSwitcher } from '@company/react';
import { Button } from '@company/core';
import { Card, CardHeader, CardTitle, CardContent } from '@company/core';

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

          <Card style={{ marginBottom: '1rem' }}>
            <CardHeader>
              <CardTitle>Sample Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This card will update its colors when you switch themes.</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Button variant="primary" size="sm">
                  Primary
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="outline" size="sm">
                  Outline
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p>
                <strong>Features:</strong>
              </p>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                <li>Automatic system theme detection</li>
                <li>LocalStorage persistence</li>
                <li>Smooth theme transitions</li>
                <li>CSP-compliant (no inline styles)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    );
  },
};

/**
 * Dark theme by default
 */
export const DarkThemeDefault: Story = {
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

          <Card>
            <CardHeader>
              <CardTitle>Dark Mode Active</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This example starts with dark theme enabled.</p>
              <p>All components automatically adapt to the active theme.</p>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    );
  },
};

/**
 * Multiple components showcasing theme
 */
export const ComponentShowcase: Story = {
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

            <section>
              <h3>Cards</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Card 1</CardTitle>
                  </CardHeader>
                  <CardContent>Content adapts to theme</CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Card 2</CardTitle>
                  </CardHeader>
                  <CardContent>Seamless transitions</CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
