<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Molecules/InputGroup',
    tags: ['autodocs'],
  });
</script>

<!-- Search: exact pattern from SearchInput.svelte — text field + icon submit -->
<Story name="Search">
  <form class="input-group w-72 grid-cols-[1fr_auto]">
    <input type="search" class="ig-input" placeholder="Search…" aria-label="Search" />
    <button type="submit" class="ig-cell preset-tonal" aria-label="Submit search">
      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path stroke-linecap="round" d="m21 21-4.35-4.35" />
      </svg>
    </button>
  </form>
</Story>

<!-- WithLabel: URL field + labelled action button -->
<Story name="WithLabel">
  <div class="input-group w-72 grid-cols-[1fr_auto]">
    <input type="url" class="ig-input" placeholder="https://…" />
    <button type="button" class="ig-cell preset-filled">Go</button>
  </div>
</Story>

<!-- WithSelect: select + apply button -->
<Story name="WithSelect">
  <div class="input-group w-72 grid-cols-[1fr_auto]">
    <select class="ig-input" aria-label="ig-input">
      <option value="">Choose an option…</option>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
    </select>
    <button type="button" class="ig-cell preset-tonal">Apply</button>
  </div>
</Story>
