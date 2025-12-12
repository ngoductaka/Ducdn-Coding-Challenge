import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async config => {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
      define: {
        'process.env': {},
      },
      resolve: {
        alias: {
          '@company/core': path.resolve(__dirname, '../../../packages/core/src'),
          '@company/tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
          '@company/react': path.resolve(__dirname, '../../../packages/react/src'),
          '@company/utils': path.resolve(__dirname, '../../../packages/utils/src'),
        },
      },
      optimizeDeps: {
        exclude: ['@company/core', '@company/tokens', '@company/react'],
      },
    });
  },
};

export default config;
