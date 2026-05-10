/// <reference types="vite/client" />
import type { Preview, Decorator } from '@storybook/sveltekit'
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { addons } from 'storybook/preview-api';

import '../src/app.css';

// Docs pages never run decorators, so data-theme is never set by withThemeByDataAttribute.
// Apply it here at module load and keep it in sync with toolbar globals via the channel.
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', 'cerberus');

  try {
    const channel = addons.getChannel();
    const applyGlobals = (globals: Record<string, string>) => {
      if (globals.theme) {
        document.documentElement.setAttribute('data-theme', globals.theme);
      }
      document.documentElement.classList.toggle('dark', globals.colorScheme === 'dark');
    };
    channel.on('updateGlobals', ({ globals }: { globals: Record<string, string> }) => applyGlobals(globals));
    channel.on('setGlobals',    ({ globals }: { globals: Record<string, string> }) => applyGlobals(globals));
  } catch { /* non-browser / test context */ }
}

export const globalTypes = {
  colorScheme: {
    name: 'Mode',
    toolbar: {
      icon: 'contrast',
      items: [
        { value: 'light', icon: 'sun',  title: 'Light' },
        { value: 'dark',  icon: 'moon', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
};

const withColorScheme: Decorator = (Story, context) => {
  const isDark = context.globals.colorScheme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  return Story();
};

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      cerberus: 'cerberus',
      wintry:   'wintry',
      vintage:  'vintage',
      crimson:  'crimson',
      pine:     'pine',
      modern:   'modern',
    },
    defaultTheme: 'cerberus',
    attributeName: 'data-theme',
  }),
  withColorScheme,
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    options: {
      storySort: {
        order: [
          'Introduction',
          'Design Tokens', [
            'Colors',
            'Typography',
            'Spacing',
            'Grid',
            'Depth',
            'Shapes',
            'Motion',
            'Layers',
            'Dark Mode',
            'Icons',
          ],
          'Atoms', ['Button', 'Badge', 'Chip', 'Card', 'Divider', 'Input', 'Select', 'Textarea'],
          'Molecules', ['InputGroup', 'ResourceCard', 'TagCloud', 'Pagination', 'Feedback'],
          'Organisms', ['AppShell', 'SearchInput', 'FilterBar', 'CardGrid', 'Navigation', 'Footer'],
          'Pages', ['Home', 'ResourceDetail'],
          '*',
        ],
      },
    },
  },
};

export default preview;