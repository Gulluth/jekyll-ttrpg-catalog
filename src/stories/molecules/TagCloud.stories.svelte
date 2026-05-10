<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Molecules/TagCloud',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import TagCloud from '$lib/TagCloud.svelte';

  const fewCategories  = ['Adventure', 'Horror', 'Mystery', 'Romance', 'Sci-Fi'];
  const manyCategories = [
    'Adventure', 'Horror', 'Mystery', 'Romance', 'Sci-Fi',
    'Fantasy', 'Thriller', 'Drama', 'Comedy', 'Western',
    'Historical', 'Contemporary', 'Gothic', 'Pulp', 'Noir',
  ];
</script>

<!-- Default: "All" pill active, no selection -->
<Story name="Default">
  <TagCloud categories={fewCategories} selected="all" />
</Story>

<!-- WithSelection: one category highlighted -->
<Story name="WithSelection">
  <TagCloud categories={fewCategories} selected="Horror" />
</Story>

<!-- ManyCategories: tests wrapping with a long list -->
<Story name="ManyCategories">
  <TagCloud categories={manyCategories} selected="all" />
</Story>

<!-- Empty: no categories — the component renders nothing -->
<Story name="Empty">
  <div class="flex min-h-8 items-center justify-center rounded border border-dashed border-surface-300-700">
    <TagCloud categories={[]} selected="all" />
    <span class="text-xs opacity-40">No categories — nothing renders</span>
  </div>
</Story>
