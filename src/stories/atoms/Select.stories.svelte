<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Atoms/Select',
    tags: ['autodocs'],
  });
</script>

<!-- Default: labelled select with options -->
<Story name="Default">
  <label class="label w-72">
    <span class="label-text">Category</span>
    <select class="select">
      <option value="all">All categories</option>
      <option value="rpg">RPG</option>
      <option value="adventure">Adventure</option>
      <option value="toolkit">Toolkit</option>
      <option value="horror">Horror</option>
    </select>
  </label>
</Story>

<!-- AsFilter: flex-1 dropdowns used in FilterBar — fill available space -->
<Story name="AsFilter">
  <div class="flex w-full max-w-2xl flex-wrap gap-2">
    <select class="select flex-1" aria-label="AsFilter">
      <option value="all">Categories</option>
      <option value="rpg">RPG</option>
      <option value="adventure">Adventure</option>
    </select>
    <select class="select flex-1" aria-label="AsFilter">
      <option value="all">Authors</option>
      <option value="a">Alex Smith</option>
      <option value="b">Jordan Lee</option>
    </select>
    <select class="select flex-1" aria-label="AsFilter">
      <option value="all">Genres</option>
      <option value="fantasy">Fantasy</option>
      <option value="sci-fi">Sci-Fi</option>
    </select>
  </div>
</Story>

<!-- SortBy: the compact inline variant used in FilterBar's sort control -->
<Story name="SortBy">
  <div class="flex items-center gap-2">
    <label for="sort-select" class="whitespace-nowrap text-xs opacity-60">Sort by</label>
    <select id="sort-select" class="select w-auto text-sm">
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="az">A–Z</option>
      <option value="za">Z–A</option>
    </select>
  </div>
</Story>
