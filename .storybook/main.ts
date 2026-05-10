import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  "core": {
    disableTelemetry: true,
  },
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
  "addons": [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        }
      }
    }
  ],
  "framework": "@storybook/sveltekit"
};
export default config;
