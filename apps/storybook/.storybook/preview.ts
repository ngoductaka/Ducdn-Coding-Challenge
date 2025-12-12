import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@company/react';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
    backgrounds: {
      disable: true, // Disable default backgrounds, use theme system instead
    },
  },
  tags: ['autodocs'],

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      return React.createElement(
        ThemeProvider,
        { defaultTheme: theme as 'light' | 'dark' },
        React.createElement('div', { style: { padding: '2rem' } }, React.createElement(Story))
      );
    },
  ],
};

export default preview;
