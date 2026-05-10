<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Organisms/SearchInput',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import SearchInput from '$lib/SearchInput.svelte';
</script>

<!-- Default: standalone at a typical header width -->
<Story name="Default">
  <div class="w-72">
    <SearchInput />
  </div>
</Story>

<!-- Wide: full header-span width -->
<Story name="Wide">
  <div class="w-[32rem]">
    <SearchInput />
  </div>
</Story>

<!-- InHeader: shown inside the app header chrome for full context -->
<Story name="InHeader">
  <header class="border-b border-surface-200-800 px-4 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4 w-full">
    <span class="font-bold text-lg justify-self-start opacity-30">Site Title</span>
    <div class="w-72">
      <SearchInput />
    </div>
    <div class="justify-self-end"></div>
  </header>
</Story>
