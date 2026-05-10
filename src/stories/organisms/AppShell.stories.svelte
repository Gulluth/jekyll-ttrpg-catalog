<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Organisms/AppShell',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<script lang="ts">
  import AppShell from '$lib/AppShell.svelte';
</script>

<!-- Default: header + footer with empty main — use the Theme and Mode toolbar controls to preview across themes -->
<Story name="Default">
  <AppShell>
    <div class="px-4 py-12 text-center opacity-40 text-sm">page content</div>
  </AppShell>
</Story>
