<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Molecules/ResourceCard',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import ResourceCard from '$lib/ResourceCard.svelte';
  import type { Post } from '$lib/posts.js';

  const base: Post = {
    slug: 'the-black-hack',
    date: '2023-04-01',
    name: 'The Black Hack',
    category: ['RPG', 'OSR'],
    summary: 'A super-streamlined roleplaying game that uses the original 1970s rules as a base. Simple, fast, lethal.',
    author: 'David Black',
    source: 'itch.io',
    'source-url': 'https://www.itch.io',
    genre: 'fantasy',
    cost: 'PWYW',
    license: 'CC BY 4.0',
    'cover-image': null,
    tags: ['osr', 'dungeon-crawl'],
    stats: null,
    subtexts: [],
    body: '',
    featured: false,
    sort_priority: null,
    meta: {},
  };
</script>

<!-- Default: full metadata, gradient cover placeholder -->
<Story name="Default">
  <div class="w-56">
    <ResourceCard post={base} />
  </div>
</Story>

<!-- Featured: primary ring accent for highlighted entries -->
<Story name="Featured">
  <div class="w-56">
    <ResourceCard post={{ ...base, featured: true }} />
  </div>
</Story>

<!-- Minimal: only slug and name — no summary, author, or categories -->
<Story name="Minimal">
  <div class="w-56">
    <ResourceCard post={{ ...base, summary: null, author: null, cost: null, category: [] }} />
  </div>
</Story>

<!-- ThreeUp: side-by-side to preview grid spacing and card proportions -->
<Story name="ThreeUp">
  <div class="grid grid-cols-3 gap-6 max-w-md">
    <ResourceCard post={base} />
    <ResourceCard post={{ ...base, slug: 'knave', name: 'Knave', author: 'Ben Milton', featured: true }} />
    <ResourceCard post={{ ...base, slug: 'maze-rats', name: 'Maze Rats', author: 'Ben Milton', category: ['Toolkit'], summary: null }} />
  </div>
</Story>
